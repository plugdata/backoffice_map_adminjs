// ========================================
// Permission & Role-Based Access Control Utilities
// ========================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ========================================
// PERMISSION CHECKING FUNCTIONS
// ========================================

/**
 * ตรวจสอบว่าผู้ใช้มีสิทธิ์สำหรับ resource และ action ที่ระบุหรือไม่
 * @param {string} userId - ID ของผู้ใช้
 * @param {string} resource - resource ที่ต้องการตรวจสอบ (e.g., 'document', 'user')
 * @param {string} action - action ที่ต้องการตรวจสอบ (e.g., 'create', 'read', 'update', 'delete')
 * @returns {Promise<boolean>} - true ถ้ามีสิทธิ์, false ถ้าไม่มี
 */
export async function hasPermission(userId, resource, action) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!user || !user.isActive) {
      return false
    }

    // ตรวจสอบสิทธิ์จาก roles ของผู้ใช้
    for (const userRole of user.roles) {
      if (!userRole.role.isActive) continue

      for (const rolePermission of userRole.role.permissions) {
        const permission = rolePermission.permission
        if (permission.isActive && 
            permission.resource === resource && 
            permission.action === action) {
          return true
        }
      }
    }

    return false
  } catch (error) {
    console.error('Error checking permission:', error)
    return false
  }
}

/**
 * ตรวจสอบว่าผู้ใช้มีสิทธิ์ Super Admin หรือไม่
 * @param {string} userId - ID ของผู้ใช้
 * @returns {Promise<boolean>} - true ถ้าเป็น Super Admin
 */
export async function isSuperAdmin(userId) {
  return await hasPermission(userId, 'system', 'admin')
}

/**
 * ตรวจสอบว่าผู้ใช้มีสิทธิ์ HR Manager หรือไม่
 * @param {string} userId - ID ของผู้ใช้
 * @returns {Promise<boolean>} - true ถ้าเป็น HR Manager
 */
export async function isHRManager(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          role: true
        }
      }
    }
  })

  if (!user || !user.isActive) return false

  return user.roles.some(userRole => 
    userRole.role.isActive && userRole.role.name === 'HR Manager'
  )
}

/**
 * ตรวจสอบว่าผู้ใช้มีสิทธิ์ Department Manager หรือไม่
 * @param {string} userId - ID ของผู้ใช้
 * @returns {Promise<boolean>} - true ถ้าเป็น Department Manager
 */
export async function isDepartmentManager(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          role: true
        }
      }
    }
  })

  if (!user || !user.isActive) return false

  return user.roles.some(userRole => 
    userRole.role.isActive && userRole.role.name === 'Department Manager'
  )
}

// ========================================
// DOCUMENT PERMISSION FUNCTIONS
// ========================================

/**
 * ตรวจสอบว่าผู้ใช้สามารถดูเอกสารได้หรือไม่
 * @param {string} userId - ID ของผู้ใช้
 * @param {Object} document - ข้อมูลเอกสาร
 * @returns {Promise<boolean>} - true ถ้าสามารถดูได้
 */
export async function canViewDocument(userId, document) {
  // Super Admin สามารถดูทุกเอกสาร
  if (await isSuperAdmin(userId)) return true

  // HR Manager สามารถดูทุกเอกสาร
  if (await isHRManager(userId)) return true

  // ผู้สร้างเอกสารสามารถดูเอกสารของตนเอง
  if (document.creatorId === userId) return true

  // Department Manager สามารถดูเอกสารในแผนกของตนเอง
  if (await isDepartmentManager(userId)) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { departmentId: true }
    })
    return user?.departmentId === document.departmentId
  }

  // ตรวจสอบสิทธิ์ document:read
  return await hasPermission(userId, 'document', 'read')
}

/**
 * ตรวจสอบว่าผู้ใช้สามารถแก้ไขเอกสารได้หรือไม่
 * @param {string} userId - ID ของผู้ใช้
 * @param {Object} document - ข้อมูลเอกสาร
 * @returns {Promise<boolean>} - true ถ้าสามารถแก้ไขได้
 */
export async function canEditDocument(userId, document) {
  // Super Admin สามารถแก้ไขทุกเอกสาร
  if (await isSuperAdmin(userId)) return true

  // HR Manager สามารถแก้ไขทุกเอกสาร
  if (await isHRManager(userId)) return true

  // ผู้สร้างเอกสารสามารถแก้ไขเอกสารของตนเอง
  if (document.creatorId === userId) {
    return await hasPermission(userId, 'document', 'update')
  }

  return false
}

/**
 * ตรวจสอบว่าผู้ใช้สามารถอนุมัติเอกสารได้หรือไม่
 * @param {string} userId - ID ของผู้ใช้
 * @param {Object} document - ข้อมูลเอกสาร
 * @returns {Promise<boolean>} - true ถ้าสามารถอนุมัติได้
 */
export async function canApproveDocument(userId, document) {
  // Super Admin สามารถอนุมัติทุกเอกสาร
  if (await isSuperAdmin(userId)) return true

  // HR Manager สามารถอนุมัติทุกเอกสาร
  if (await isHRManager(userId)) return true

  // Department Manager สามารถอนุมัติเอกสารในแผนกของตนเอง
  if (await isDepartmentManager(userId)) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { departmentId: true }
    })
    if (user?.departmentId === document.departmentId) {
      return await hasPermission(userId, 'document', 'approve')
    }
  }

  return false
}

// ========================================
// USER PERMISSION FUNCTIONS
// ========================================

/**
 * ตรวจสอบว่าผู้ใช้สามารถจัดการผู้ใช้อื่นได้หรือไม่
 * @param {string} userId - ID ของผู้ใช้
 * @returns {Promise<boolean>} - true ถ้าสามารถจัดการได้
 */
export async function canManageUsers(userId) {
  return await isSuperAdmin(userId) || await isHRManager(userId)
}

/**
 * ตรวจสอบว่าผู้ใช้สามารถจัดการ roles ได้หรือไม่
 * @param {string} userId - ID ของผู้ใช้
 * @returns {Promise<boolean>} - true ถ้าสามารถจัดการได้
 */
export async function canManageRoles(userId) {
  return await isSuperAdmin(userId)
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * ดึงข้อมูล roles และ permissions ของผู้ใช้
 * @param {string} userId - ID ของผู้ใช้
 * @returns {Promise<Object>} - ข้อมูล roles และ permissions
 */
export async function getUserRolesAndPermissions(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true
                }
              }
            }
          }
        }
      }
    }
  })

  if (!user) return null

  const roles = user.roles
    .filter(userRole => userRole.role.isActive)
    .map(userRole => ({
      id: userRole.role.id,
      name: userRole.role.name,
      description: userRole.role.description
    }))

  const permissions = new Set()
  user.roles.forEach(userRole => {
    if (userRole.role.isActive) {
      userRole.role.permissions.forEach(rolePermission => {
        if (rolePermission.permission.isActive) {
          permissions.add(`${rolePermission.permission.resource}:${rolePermission.permission.action}`)
        }
      })
    }
  })

  return {
    userId: user.id,
    username: user.username,
    email: user.email,
    roles,
    permissions: Array.from(permissions)
  }
}

/**
 * สร้าง middleware สำหรับตรวจสอบสิทธิ์
 * @param {string} resource - resource ที่ต้องการตรวจสอบ
 * @param {string} action - action ที่ต้องการตรวจสอบ
 * @returns {Function} - Express middleware function
 */
export function requirePermission(resource, action) {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id // สมมติว่ามี user ใน request
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const hasAccess = await hasPermission(userId, resource, action)
      if (!hasAccess) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      next()
    } catch (error) {
      console.error('Permission middleware error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export default {
  hasPermission,
  isSuperAdmin,
  isHRManager,
  isDepartmentManager,
  canViewDocument,
  canEditDocument,
  canApproveDocument,
  canManageUsers,
  canManageRoles,
  getUserRolesAndPermissions,
  requirePermission
} 