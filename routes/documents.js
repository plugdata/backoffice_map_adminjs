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
// GET ALL DOCUMENTS (OPTIMIZED)
// ========================================

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, status = '', type = '', search = '' } = req.query
    const offset = (page - 1) * limit
    
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=60') // Cache for 1 minute
    
    // Build where clause
    const where = {}
    if (status) {
      where.status = status
    }
    if (type) {
      where.documentType = {
        name: { contains: type, mode: 'insensitive' }
      }
    }
    if (search) {
      where.OR = [
        { documentCode: { contains: search, mode: 'insensitive' } },
        { projectName: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    // Optimized query with pagination
    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        select: {
          id: true,
          documentCode: true,
          title: true,
          projectName: true,
          status: true,
          createdAt: true,
          updatedAt: true,
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
          _count: {
            select: {
              approvals: true,
              history: true
            }
          }
        },
        skip: offset,
        take: parseInt(limit),
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.document.count({ where })
    ])
    
    res.json({
      success: true,
      data: documents,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      count: documents.length
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
// GET DOCUMENT BY ID (OPTIMIZED)
// ========================================

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=300') // Cache for 5 minutes
    
    const document = await prisma.document.findUnique({
      where: { id },
      select: {
        id: true,
        documentCode: true,
        title: true,
        projectName: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
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
          select: {
            id: true,
            status: true,
            comment: true,
            createdAt: true,
            approver: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        },
        history: {
          select: {
            id: true,
            action: true,
            actionDate: true,
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
          },
          take: 10 // Limit to last 10 actions
        }
      }
    })
    
    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'ไม่พบเอกสารนี้'
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
// CREATE DOCUMENT (OPTIMIZED)
// ========================================

router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      documentCode,
      title,
      projectName,
      description,
      documentTypeId,
      confidentialityLevelId,
      departmentId
    } = req.body
    
    // Validate required fields
    if (!documentCode || !title || !projectName) {
      return res.status(400).json({
        success: false,
        error: 'กรุณากรอกข้อมูลที่จำเป็น'
      })
    }
    
    // Create document with optimized transaction
    const document = await prisma.document.create({
      data: {
        documentCode,
        title,
        projectName,
        description,
        status: 'DRAFT',
        creatorId: req.user.id,
        documentTypeId,
        confidentialityLevelId,
        departmentId
      },
      select: {
        id: true,
        documentCode: true,
        title: true,
        projectName: true,
        status: true,
        createdAt: true,
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })
    
    // Create history record
    await prisma.documentHistory.create({
      data: {
        documentId: document.id,
        userId: req.user.id,
        action: 'CREATED',
        actionDate: new Date()
      }
    })
    
    res.status(201).json({
      success: true,
      message: 'สร้างเอกสารสำเร็จ',
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
// UPDATE DOCUMENT (OPTIMIZED)
// ========================================

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body
    
    // Check if document exists
    const existingDocument = await prisma.document.findUnique({
      where: { id },
      select: { id: true, status: true }
    })
    
    if (!existingDocument) {
      return res.status(404).json({
        success: false,
        error: 'ไม่พบเอกสารนี้'
      })
    }
    
    // Update document
    const document = await prisma.document.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        documentCode: true,
        title: true,
        projectName: true,
        status: true,
        updatedAt: true
      }
    })
    
    // Create history record
    await prisma.documentHistory.create({
      data: {
        documentId: id,
        userId: req.user.id,
        action: 'UPDATED',
        actionDate: new Date()
      }
    })
    
    res.json({
      success: true,
      message: 'อัปเดตเอกสารสำเร็จ',
      data: document
    })
  } catch (error) {
    console.error('Update document error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการอัปเดตเอกสาร'
    })
  }
})

// ========================================
// DELETE DOCUMENT (OPTIMIZED)
// ========================================

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    
    // Check if document exists
    const existingDocument = await prisma.document.findUnique({
      where: { id },
      select: { id: true, status: true }
    })
    
    if (!existingDocument) {
      return res.status(404).json({
        success: false,
        error: 'ไม่พบเอกสารนี้'
      })
    }
    
    // Delete document with cascade
    await prisma.document.delete({
      where: { id }
    })
    
    res.json({
      success: true,
      message: 'ลบเอกสารสำเร็จ'
    })
  } catch (error) {
    console.error('Delete document error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการลบเอกสาร'
    })
  }
})

// ========================================
// DOCUMENT TYPES (NEW)
// ========================================

router.get('/types/list', async (req, res) => {
  try {
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=600') // Cache for 10 minutes
    
    const types = await prisma.documentType.findMany({
      select: {
        id: true,
        name: true,
        description: true
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    res.json({
      success: true,
      data: types,
      count: types.length
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
// DOCUMENT STATISTICS (NEW)
// ========================================

router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=300') // Cache for 5 minutes
    
    const [total, draft, pending, approved, rejected] = await Promise.all([
      prisma.document.count(),
      prisma.document.count({ where: { status: 'DRAFT' } }),
      prisma.document.count({ where: { status: 'PENDING' } }),
      prisma.document.count({ where: { status: 'APPROVED' } }),
      prisma.document.count({ where: { status: 'REJECTED' } })
    ])
    
    res.json({
      success: true,
      data: {
        total,
        draft,
        pending,
        approved,
        rejected
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Get document stats error:', error)
    res.status(500).json({
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติเอกสาร'
    })
  }
})

export default router 