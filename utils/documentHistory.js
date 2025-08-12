// ========================================
// Document History Management
// ระบบจัดการประวัติการเคลื่อนไหวเอกสาร
// ========================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ========================================
// DOCUMENT HISTORY TRACKING
// ========================================

/**
 * บันทึกประวัติการเคลื่อนไหวเอกสาร
 * @param {string} documentId - ID ของเอกสาร
 * @param {string} actionBy - ID ของผู้กระทำ
 * @param {string} action - ประเภทการกระทำ
 * @param {string} actionDetails - รายละเอียดการกระทำ
 * @param {string} remark - หมายเหตุ
 * @param {Object} metadata - ข้อมูลเพิ่มเติม
 */
export const logDocumentAction = async (documentId, actionBy, action, actionDetails = null, remark = null, metadata = null) => {
  try {
    await prisma.documentHistory.create({
      data: {
        documentId,
        actionBy,
        action,
        actionDetails,
        remark,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : null
      }
    })
    
    console.log(`📝 Document action logged: ${action} for document ${documentId}`)
  } catch (error) {
    console.error('Error logging document action:', error)
    throw error
  }
}

/**
 * บันทึกการสร้างเอกสาร
 */
export const logDocumentCreated = async (documentId, actionBy, documentData) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'CREATED',
    'สร้างเอกสารใหม่',
    null,
    { documentData }
  )
}

/**
 * บันทึกการแก้ไขเอกสาร
 */
export const logDocumentUpdated = async (documentId, actionBy, changes, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'UPDATED',
    'แก้ไขเอกสาร',
    remark,
    { changes }
  )
}

/**
 * บันทึกการส่งเอกสาร
 */
export const logDocumentSubmitted = async (documentId, actionBy, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'SUBMITTED',
    'ส่งเอกสารเพื่อตรวจสอบ',
    remark
  )
}

/**
 * บันทึกการมอบหมายผู้ตรวจสอบ
 */
export const logReviewerAssigned = async (documentId, actionBy, reviewerId, reviewerName, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'ASSIGNED_REVIEWER',
    `มอบหมายให้ ${reviewerName} เป็นผู้ตรวจสอบ`,
    remark,
    { reviewerId, reviewerName }
  )
}

/**
 * บันทึกการเริ่มตรวจสอบ
 */
export const logReviewStarted = async (documentId, actionBy, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'REVIEW_STARTED',
    'เริ่มตรวจสอบเอกสาร',
    remark
  )
}

/**
 * บันทึกการตรวจสอบเสร็จสิ้น
 */
export const logReviewCompleted = async (documentId, actionBy, reviewStatus, reviewComments, remark = null) => {
  const actionDetails = reviewStatus === 'REVIEWED_APPROVED' 
    ? 'ตรวจสอบเสร็จสิ้น - อนุมัติ' 
    : 'ตรวจสอบเสร็จสิ้น - ไม่อนุมัติ'
  
  return await logDocumentAction(
    documentId,
    actionBy,
    'REVIEW_COMPLETED',
    actionDetails,
    remark,
    { reviewStatus, reviewComments }
  )
}

/**
 * บันทึกการอนุมัติ
 */
export const logDocumentApproved = async (documentId, actionBy, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'APPROVED',
    'อนุมัติเอกสาร',
    remark
  )
}

/**
 * บันทึกการไม่อนุมัติ
 */
export const logDocumentRejected = async (documentId, actionBy, reason, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'REJECTED',
    'ไม่อนุมัติเอกสาร',
    remark,
    { reason }
  )
}

/**
 * บันทึกการส่งกลับแก้ไข
 */
export const logDocumentReturned = async (documentId, actionBy, reason, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'RETURNED_FOR_REVISION',
    'ส่งกลับเพื่อแก้ไข',
    remark,
    { reason }
  )
}

/**
 * บันทึกการเปลี่ยนสถานะ
 */
export const logStatusChanged = async (documentId, actionBy, oldStatus, newStatus, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'STATUS_CHANGED',
    `เปลี่ยนสถานะจาก ${oldStatus} เป็น ${newStatus}`,
    remark,
    { oldStatus, newStatus }
  )
}

/**
 * บันทึกการอัปโหลดไฟล์
 */
export const logFileUploaded = async (documentId, actionBy, fileName, fileSize, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'FILE_UPLOADED',
    `อัปโหลดไฟล์: ${fileName}`,
    remark,
    { fileName, fileSize }
  )
}

/**
 * บันทึกการลบไฟล์
 */
export const logFileRemoved = async (documentId, actionBy, fileName, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'FILE_REMOVED',
    `ลบไฟล์: ${fileName}`,
    remark,
    { fileName }
  )
}

/**
 * บันทึกการเพิ่มความคิดเห็น
 */
export const logCommentAdded = async (documentId, actionBy, comment, remark = null) => {
  return await logDocumentAction(
    documentId,
    actionBy,
    'COMMENT_ADDED',
    'เพิ่มความคิดเห็น',
    remark,
    { comment }
  )
}

// ========================================
// DOCUMENT HISTORY QUERYING
// ========================================

/**
 * ดึงประวัติการเคลื่อนไหวของเอกสาร
 */
export const getDocumentHistory = async (documentId) => {
  try {
    const history = await prisma.documentHistory.findMany({
      where: { documentId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true
          }
        }
      },
      orderBy: {
        actionDate: 'desc'
      }
    })
    
    return history
  } catch (error) {
    console.error('Error getting document history:', error)
    throw error
  }
}

/**
 * ดึงประวัติการเคลื่อนไหวของผู้ใช้
 */
export const getUserDocumentHistory = async (userId, limit = 50) => {
  try {
    const history = await prisma.documentHistory.findMany({
      where: { actionBy: userId },
      include: {
        document: {
          select: {
            id: true,
            documentCode: true,
            projectName: true
          }
        }
      },
      orderBy: {
        actionDate: 'desc'
      },
      take: limit
    })
    
    return history
  } catch (error) {
    console.error('Error getting user document history:', error)
    throw error
  }
}

export default {
  logDocumentAction,
  logDocumentCreated,
  logDocumentUpdated,
  logDocumentSubmitted,
  logReviewerAssigned,
  logReviewStarted,
  logReviewCompleted,
  logDocumentApproved,
  logDocumentRejected,
  logDocumentReturned,
  logStatusChanged,
  logFileUploaded,
  logFileRemoved,
  logCommentAdded,
  getDocumentHistory,
  getUserDocumentHistory
} 