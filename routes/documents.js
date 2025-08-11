// ========================================
// Document Routes
// API endpoints สำหรับระบบการส่งเอกสาร
// ========================================

import express from 'express'
import { createPrismaClient } from '../config/database.js'
import { authenticateToken } from '../config/auth.js'

const router = express.Router()
const prisma = createPrismaClient()

// ========================================
// GET ALL DOCUMENTS
// ========================================

router.get('/', authenticateToken, async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            department: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        documentType: {
          select: {
            id: true,
            name: true
          }
        },
        confidentialityLevel: {
          select: {
            id: true,
            name: true
          }
        },
        department: {
          select: {
            id: true,
            name: true
          }
        },
        approvals: {
          include: {
            approver: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        history: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: {
            actionDate: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    res.json({
      success: true,
      data: documents
    })
  } catch (error) {
    console.error('Get documents error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลเอกสาร'
    })
  }
})

// ========================================
// GET DOCUMENT BY ID
// ========================================

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    
    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            department: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        documentType: {
          select: {
            id: true,
            name: true
          }
        },
        confidentialityLevel: {
          select: {
            id: true,
            name: true
          }
        },
        department: {
          select: {
            id: true,
            name: true
          }
        },
        approvals: {
          include: {
            approver: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        history: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: {
            actionDate: 'desc'
          }
        }
      }
    })
    
    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'ไม่พบเอกสารถูกต้อง'
      })
    }
    
    res.json({
      success: true,
      data: document
    })
  } catch (error) {
    console.error('Get document error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลเอกสาร'
    })
  }
})

// ========================================
// CREATE NEW DOCUMENT
// ========================================

router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      documentCode,
      documentTypeId,
      projectName,
      details,
      confidentialityLevelId,
      departmentId
    } = req.body

    // Validate required fields
    if (!documentCode || !documentTypeId || !projectName || !confidentialityLevelId || !departmentId) {
      return res.status(400).json({
        success: false,
        error: 'กรุณากรอกข้อมูลให้ครบถ้วน'
      })
    }

    // Check if document code already exists
    const existingDocument = await prisma.document.findUnique({
      where: { documentCode }
    })

    if (existingDocument) {
      return res.status(400).json({
        success: false,
        error: 'รหัสเอกสารนี้มีอยู่แล้ว'
      })
    }

    // Create document
    const document = await prisma.document.create({
      data: {
        documentCode,
        documentTypeId,
        projectName,
        details,
        confidentialityLevelId,
        departmentId,
        status: 'PENDING_HR_REVIEW',
        creatorId: req.user.id
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        documentType: {
          select: {
            id: true,
            name: true
          }
        },
        confidentialityLevel: {
          select: {
            id: true,
            name: true
          }
        },
        department: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Create document history
    await prisma.documentHistory.create({
      data: {
        documentId: document.id,
        actionBy: req.user.id,
        action: 'ส่งเอกสาร',
        remark: 'เอกสารถูกส่งไปยัง HR แล้ว'
      }
    })

    // Create notification for HR
    await prisma.notification.create({
      data: {
        userId: req.user.id, // For now, notify the creator
        type: 'DOCUMENT_SUBMITTED',
        title: 'เอกสารถูกส่งแล้ว',
        message: `เอกสาร ${documentCode} ถูกส่งไปยัง HR แล้ว`,
        documentId: document.id
      }
    })

    res.status(201).json({
      success: true,
      message: 'เอกสารถูกส่งเรียบร้อยแล้ว',
      data: document
    })

  } catch (error) {
    console.error('Create document error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการสร้างเอกสาร'
    })
  }
})

// ========================================
// UPDATE DOCUMENT STATUS (HR/CEO)
// ========================================

router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { status, rejectionReason } = req.body

    // Validate status
    const validStatuses = [
      'PENDING_HR_REVIEW',
      'PENDING_CEO_APPROVAL',
      'APPROVED',
      'REJECTED_HR',
      'REJECTED_CEO'
    ]

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'สถานะไม่ถูกต้อง'
      })
    }

    // Get current document
    const currentDocument = await prisma.document.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    if (!currentDocument) {
      return res.status(404).json({
        success: false,
        error: 'ไม่พบเอกสารถูกต้อง'
      })
    }

    // Update document status
    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        status,
        rejectionReason: rejectionReason || null
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        documentType: {
          select: {
            id: true,
            name: true
          }
        },
        confidentialityLevel: {
          select: {
            id: true,
            name: true
          }
        },
        department: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Create document history
    let action = ''
    let remark = ''

    switch (status) {
      case 'PENDING_CEO_APPROVAL':
        action = 'HR ตรวจสอบผ่าน'
        remark = 'เอกสารถูกส่งไปยัง CEO เพื่ออนุมัติ'
        break
      case 'APPROVED':
        action = 'CEO อนุมัติ'
        remark = 'เอกสารถูกอนุมัติแล้ว'
        break
      case 'REJECTED_HR':
        action = 'HR ไม่อนุมัติ'
        remark = rejectionReason || 'เอกสารถูกปฏิเสธโดย HR'
        break
      case 'REJECTED_CEO':
        action = 'CEO ไม่อนุมัติ'
        remark = rejectionReason || 'เอกสารถูกปฏิเสธโดย CEO'
        break
      default:
        action = 'อัปเดตสถานะ'
        remark = `สถานะเปลี่ยนเป็น ${status}`
    }

    await prisma.documentHistory.create({
      data: {
        documentId: id,
        actionBy: req.user.id,
        action,
        remark
      }
    })

    // Create notification
    let notificationTitle = ''
    let notificationMessage = ''

    switch (status) {
      case 'PENDING_CEO_APPROVAL':
        notificationTitle = 'เอกสารถูกตรวจสอบแล้ว'
        notificationMessage = `เอกสาร ${currentDocument.documentCode} ถูกตรวจสอบและส่งไปยัง CEO แล้ว`
        break
      case 'APPROVED':
        notificationTitle = 'เอกสารถูกอนุมัติแล้ว'
        notificationMessage = `เอกสาร ${currentDocument.documentCode} ถูกอนุมัติแล้ว`
        break
      case 'REJECTED_HR':
      case 'REJECTED_CEO':
        notificationTitle = 'เอกสารถูกปฏิเสธ'
        notificationMessage = `เอกสาร ${currentDocument.documentCode} ถูกปฏิเสธ: ${rejectionReason || 'ไม่มีเหตุผล'}`
        break
    }

    await prisma.notification.create({
      data: {
        userId: currentDocument.creatorId,
        type: status === 'APPROVED' ? 'DOCUMENT_CEO_APPROVED' : 
              status === 'REJECTED_HR' || status === 'REJECTED_CEO' ? 'DOCUMENT_REJECTED' : 
              'DOCUMENT_STATUS_CHANGED',
        title: notificationTitle,
        message: notificationMessage,
        documentId: id
      }
    })

    res.json({
      success: true,
      message: 'อัปเดตสถานะเอกสารเรียบร้อยแล้ว',
      data: updatedDocument
    })

  } catch (error) {
    console.error('Update document status error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการอัปเดตสถานะเอกสาร'
    })
  }
})

// ========================================
// GET DOCUMENT TYPES
// ========================================

router.get('/types/list', authenticateToken, async (req, res) => {
  try {
    const documentTypes = await prisma.documentType.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })
    
    res.json({
      success: true,
      data: documentTypes
    })
  } catch (error) {
    console.error('Get document types error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประเภทเอกสาร'
    })
  }
})

// ========================================
// GET CONFIDENTIALITY LEVELS
// ========================================

router.get('/confidentiality-levels/list', authenticateToken, async (req, res) => {
  try {
    const confidentialityLevels = await prisma.confidentialityLevel.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })
    
    res.json({
      success: true,
      data: confidentialityLevels
    })
  } catch (error) {
    console.error('Get confidentiality levels error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลระดับความลับ'
    })
  }
})

// ========================================
// GET DEPARTMENTS
// ========================================

router.get('/departments/list', authenticateToken, async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })
    
    res.json({
      success: true,
      data: departments
    })
  } catch (error) {
    console.error('Get departments error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก'
    })
  }
})

export default router 