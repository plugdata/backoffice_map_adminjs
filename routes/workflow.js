import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken, requirePermission } from '../config/auth.js'
import {
  submitForHRReview,
  completeHRReview,
  submitForCEOApproval,
  completeCEOApproval,
  returnForRevision,
  getDocumentWorkflowStatus,
  getPendingDocuments
} from '../utils/documentWorkflow.js'

const router = express.Router()
const prisma = new PrismaClient()

// ========================================
// Workflow Routes
// ========================================

/**
 * ส่งเอกสารให้ HR ตรวจสอบโครงสร้าง
 */
router.post('/submit-hr-review', authenticateToken, requirePermission('document:approve'), async (req, res) => {
  try {
    const { documentId, hrReviewerId } = req.body
    const userId = req.user.id

    const document = await submitForHRReview(documentId, hrReviewerId, userId)

    res.json({
      success: true,
      message: 'ส่งเอกสารให้ HR ตรวจสอบโครงสร้างแล้ว',
      document
    })
  } catch (error) {
    console.error('Error submitting for HR review:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการส่งเอกสารให้ HR ตรวจสอบ',
      error: error.message
    })
  }
})

/**
 * HR ตรวจสอบโครงสร้างเอกสารเสร็จสิ้น
 */
router.post('/complete-hr-review', authenticateToken, requirePermission('document:approve'), async (req, res) => {
  try {
    const { documentId, reviewComments, isApproved } = req.body
    const hrReviewerId = req.user.id

    const document = await completeHRReview(documentId, hrReviewerId, reviewComments, isApproved)

    res.json({
      success: true,
      message: isApproved 
        ? 'HR ตรวจสอบโครงสร้างเอกสารเสร็จสิ้น ส่งให้ CEO อนุมัติ'
        : 'HR ส่งกลับเอกสารให้แก้ไข',
      document
    })
  } catch (error) {
    console.error('Error completing HR review:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการตรวจสอบโครงสร้างเอกสาร',
      error: error.message
    })
  }
})

/**
 * ส่งเอกสารให้ CEO อนุมัติ
 */
router.post('/submit-ceo-approval', authenticateToken, requirePermission('document:approve'), async (req, res) => {
  try {
    const { documentId, ceoApproverId } = req.body
    const userId = req.user.id

    const document = await submitForCEOApproval(documentId, ceoApproverId, userId)

    res.json({
      success: true,
      message: 'ส่งเอกสารให้ CEO อนุมัติแล้ว',
      document
    })
  } catch (error) {
    console.error('Error submitting for CEO approval:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการส่งเอกสารให้ CEO อนุมัติ',
      error: error.message
    })
  }
})

/**
 * CEO อนุมัติหรือไม่อนุมัติเอกสาร
 */
router.post('/complete-ceo-approval', authenticateToken, requirePermission('document:approve'), async (req, res) => {
  try {
    const { documentId, isApproved, approvalComments } = req.body
    const ceoApproverId = req.user.id

    const document = await completeCEOApproval(documentId, ceoApproverId, isApproved, approvalComments)

    res.json({
      success: true,
      message: isApproved ? 'CEO อนุมัติเอกสารแล้ว' : 'CEO ไม่อนุมัติเอกสาร',
      document
    })
  } catch (error) {
    console.error('Error completing CEO approval:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการอนุมัติเอกสาร',
      error: error.message
    })
  }
})

/**
 * ส่งกลับเอกสารให้แก้ไข
 */
router.post('/return-for-revision', authenticateToken, requirePermission('document:approve'), async (req, res) => {
  try {
    const { documentId, returnReason } = req.body
    const userId = req.user.id

    const document = await returnForRevision(documentId, userId, returnReason)

    res.json({
      success: true,
      message: 'ส่งกลับเอกสารให้แก้ไขแล้ว',
      document
    })
  } catch (error) {
    console.error('Error returning document for revision:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการส่งกลับเอกสาร',
      error: error.message
    })
  }
})

/**
 * ดึงข้อมูล workflow status ของเอกสาร
 */
router.get('/document-status/:documentId', authenticateToken, async (req, res) => {
  try {
    const { documentId } = req.params

    const document = await getDocumentWorkflowStatus(documentId)

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบเอกสาร'
      })
    }

    res.json({
      success: true,
      document
    })
  } catch (error) {
    console.error('Error getting document workflow status:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถานะเอกสาร',
      error: error.message
    })
  }
})

/**
 * ดึงรายการเอกสารที่รอการดำเนินการ
 */
router.get('/pending-documents', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    const userRole = req.user.role?.name || 'Document Creator'

    const documents = await getPendingDocuments(userId, userRole)

    res.json({
      success: true,
      documents,
      userRole
    })
  } catch (error) {
    console.error('Error getting pending documents:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงรายการเอกสารที่รอการดำเนินการ',
      error: error.message
    })
  }
})

/**
 * ดึงรายการผู้ใช้ตาม role
 */
router.get('/users-by-role/:roleName', authenticateToken, async (req, res) => {
  try {
    const { roleName } = req.params

    const users = await prisma.user.findMany({
      where: {
        role: {
          name: roleName
        },
        isActive: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        employeeId: true
      }
    })

    res.json({
      success: true,
      users
    })
  } catch (error) {
    console.error('Error getting users by role:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงรายการผู้ใช้',
      error: error.message
    })
  }
})

export default router 