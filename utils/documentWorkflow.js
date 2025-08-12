import { PrismaClient } from '@prisma/client'
import { logDocumentAction } from './documentHistory.js'

const prisma = new PrismaClient()

// ========================================
// Document Workflow Functions
// ========================================

/**
 * ส่งเอกสารให้ HR ตรวจสอบโครงสร้าง
 */
export const submitForHRReview = async (documentId, hrReviewerId, userId) => {
  try {
    const document = await prisma.document.update({
      where: { id: documentId },
      data: {
        status: 'UNDER_REVIEW',
        reviewStatus: 'HR_REVIEWING',
        hrReviewerId: hrReviewerId
      }
    })

    // บันทึกประวัติ
    await logDocumentAction(
      documentId,
      userId,
      'ASSIGNED_HR_REVIEWER',
      `มอบหมายให้ HR ตรวจสอบโครงสร้างเอกสาร`,
      `HR Reviewer ID: ${hrReviewerId}`
    )

    return document
  } catch (error) {
    console.error('Error submitting for HR review:', error)
    throw error
  }
}

/**
 * HR ตรวจสอบโครงสร้างเอกสารเสร็จสิ้น
 */
export const completeHRReview = async (documentId, hrReviewerId, reviewComments, isApproved) => {
  try {
    const reviewStatus = isApproved ? 'HR_REVIEWED_TO_CEO' : 'RETURNED_FOR_REVISION'
    const documentStatus = isApproved ? 'UNDER_REVIEW' : 'DRAFT'

    const document = await prisma.document.update({
      where: { id: documentId },
      data: {
        status: documentStatus,
        reviewStatus: reviewStatus,
        reviewComments: reviewComments
      }
    })

    // บันทึกประวัติ
    const actionType = isApproved ? 'HR_REVIEW_COMPLETED' : 'RETURNED_FOR_REVISION'
    const actionDetails = isApproved 
      ? 'HR ตรวจสอบโครงสร้างเอกสารเสร็จสิ้น ส่งให้ CEO อนุมัติ'
      : 'HR ส่งกลับให้แก้ไขโครงสร้างเอกสาร'
    
    await logDocumentAction(
      documentId,
      hrReviewerId,
      actionType,
      actionDetails,
      reviewComments
    )

    return document
  } catch (error) {
    console.error('Error completing HR review:', error)
    throw error
  }
}

/**
 * ส่งเอกสารให้ CEO อนุมัติ
 */
export const submitForCEOApproval = async (documentId, ceoApproverId, userId) => {
  try {
    const document = await prisma.document.update({
      where: { id: documentId },
      data: {
        status: 'UNDER_REVIEW',
        reviewStatus: 'PENDING_CEO_APPROVAL',
        ceoApproverId: ceoApproverId
      }
    })

    // บันทึกประวัติ
    await logDocumentAction(
      documentId,
      userId,
      'SENT_TO_CEO_APPROVAL',
      `ส่งเอกสารให้ CEO อนุมัติ`,
      `CEO Approver ID: ${ceoApproverId}`
    )

    return document
  } catch (error) {
    console.error('Error submitting for CEO approval:', error)
    throw error
  }
}

/**
 * CEO อนุมัติหรือไม่อนุมัติเอกสาร
 */
export const completeCEOApproval = async (documentId, ceoApproverId, isApproved, approvalComments) => {
  try {
    const reviewStatus = isApproved ? 'CEO_APPROVED' : 'CEO_REJECTED'
    const documentStatus = isApproved ? 'APPROVED' : 'REJECTED'

    const document = await prisma.document.update({
      where: { id: documentId },
      data: {
        status: documentStatus,
        reviewStatus: reviewStatus,
        reviewComments: approvalComments
      }
    })

    // บันทึกประวัติ
    const actionType = isApproved ? 'CEO_APPROVED' : 'CEO_REJECTED'
    const actionDetails = isApproved 
      ? 'CEO อนุมัติเอกสาร'
      : 'CEO ไม่อนุมัติเอกสาร'
    
    await logDocumentAction(
      documentId,
      ceoApproverId,
      actionType,
      actionDetails,
      approvalComments
    )

    return document
  } catch (error) {
    console.error('Error completing CEO approval:', error)
    throw error
  }
}

/**
 * ส่งกลับเอกสารให้แก้ไข
 */
export const returnForRevision = async (documentId, userId, returnReason) => {
  try {
    const document = await prisma.document.update({
      where: { id: documentId },
      data: {
        status: 'DRAFT',
        reviewStatus: 'RETURNED_FOR_REVISION',
        reviewComments: returnReason
      }
    })

    // บันทึกประวัติ
    await logDocumentAction(
      documentId,
      userId,
      'RETURNED_FOR_REVISION',
      'ส่งกลับเอกสารให้แก้ไข',
      returnReason
    )

    return document
  } catch (error) {
    console.error('Error returning document for revision:', error)
    throw error
  }
}

/**
 * ดึงข้อมูล workflow status ของเอกสาร
 */
export const getDocumentWorkflowStatus = async (documentId) => {
  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        creator: {
          select: { firstName: true, lastName: true, email: true }
        },
        hrReviewer: {
          select: { firstName: true, lastName: true, email: true }
        },
        ceoApprover: {
          select: { firstName: true, lastName: true, email: true }
        },
        history: {
          include: {
            user: {
              select: { firstName: true, lastName: true }
            }
          },
          orderBy: { actionDate: 'desc' }
        }
      }
    })

    return document
  } catch (error) {
    console.error('Error getting document workflow status:', error)
    throw error
  }
}

/**
 * ดึงรายการเอกสารที่รอการดำเนินการตาม role
 */
export const getPendingDocuments = async (userId, userRole) => {
  try {
    let whereClause = {}

    switch (userRole) {
      case 'HR Manager':
        whereClause = {
          OR: [
            { reviewStatus: 'PENDING_HR_REVIEW' },
            { reviewStatus: 'HR_REVIEWING', hrReviewerId: userId }
          ]
        }
        break
      
      case 'CEO':
        whereClause = {
          OR: [
            { reviewStatus: 'PENDING_CEO_APPROVAL' },
            { reviewStatus: 'HR_REVIEWED_TO_CEO', ceoApproverId: userId }
          ]
        }
        break
      
      case 'Document Creator':
        whereClause = {
          creatorId: userId,
          OR: [
            { reviewStatus: 'RETURNED_FOR_REVISION' },
            { status: 'DRAFT' }
          ]
        }
        break
      
      default:
        whereClause = { creatorId: userId }
    }

    const documents = await prisma.document.findMany({
      where: whereClause,
      include: {
        creator: {
          select: { firstName: true, lastName: true }
        },
        hrReviewer: {
          select: { firstName: true, lastName: true }
        },
        ceoApprover: {
          select: { firstName: true, lastName: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return documents
  } catch (error) {
    console.error('Error getting pending documents:', error)
    throw error
  }
} 