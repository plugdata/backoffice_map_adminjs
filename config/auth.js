// ========================================
// Authentication & Authorization Configuration
// ระบบการยืนยันตัวตนและการตรวจสอบสิทธิ์
// ========================================

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { hasPermission, getUserRolesAndPermissions } from '../utils/permissions.js'

const prisma = new PrismaClient()

// ========================================
// AUTHENTICATION FUNCTIONS
// ========================================

/**
 * เข้ารหัสผ่าน
 * @param {string} password - รหัสผ่านที่ต้องการเข้ารหัส
 * @returns {Promise<string>} - รหัสผ่านที่เข้ารหัสแล้ว
 */
export async function hashPassword(password) {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

/**
 * ตรวจสอบรหัสผ่าน
 * @param {string} password - รหัสผ่านที่ผู้ใช้กรอก
 * @param {string} hashedPassword - รหัสผ่านที่เข้ารหัสแล้วในฐานข้อมูล
 * @returns {Promise<boolean>} - true ถ้ารหัสผ่านถูกต้อง
 */
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

/**
 * สร้าง JWT token
 * @param {Object} payload - ข้อมูลที่จะใส่ใน token
 * @returns {string} - JWT token
 */
export function generateToken(payload) {
  const secret = process.env.JWT_SECRET || 'your-secret-key'
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h'
  
  return jwt.sign(payload, secret, { expiresIn })
}

/**
 * ตรวจสอบ JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} - ข้อมูลใน token หรือ null ถ้าไม่ถูกต้อง
 */
export function verifyToken(token) {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    return jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

// ========================================
// LOGIN & AUTHENTICATION
// ========================================

/**
 * ตรวจสอบการเข้าสู่ระบบ
 * @param {string} email - อีเมล
 * @param {string} password - รหัสผ่าน
 * @returns {Promise<Object|null>} - ข้อมูลผู้ใช้และ token หรือ null
 */
export async function authenticateUser(email, password) {
  try {
    // ค้นหาผู้ใช้จากอีเมลหรือ username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: email }
        ]
      }
    })

    // ตรวจสอบว่าผู้ใช้มีอยู่
    if (!user) {
      return { success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }
    }

    // สร้าง token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        title_use: user.title_use,
        position: user.position,
        phone: user.phone,
        role: user.role
      },
      token
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return { success: false, message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' }
  }
}

// ========================================
// MIDDLEWARE FUNCTIONS
// ========================================

/**
 * Middleware สำหรับตรวจสอบการยืนยันตัวตน
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'ไม่พบ token การยืนยันตัวตน' 
      })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token ไม่ถูกต้องหรือหมดอายุ' 
      })
    }

    // เพิ่มข้อมูลผู้ใช้ใน request
    req.user = decoded
    next()
  } catch (error) {
    console.error('Token authentication error:', error)
    return res.status(401).json({ 
      success: false, 
      message: 'เกิดข้อผิดพลาดในการยืนยันตัวตน' 
    })
  }
}

/**
 * Middleware สำหรับตรวจสอบสิทธิ์
 * @param {string} resource - resource ที่ต้องการตรวจสอบ
 * @param {string} action - action ที่ต้องการตรวจสอบ
 * @returns {Function} - Express middleware function
 */
export function requirePermission(resource, action) {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ 
          success: false, 
          message: 'ไม่พบข้อมูลผู้ใช้' 
        })
      }

      const hasAccess = await hasPermission(req.user.userId, resource, action)
      if (!hasAccess) {
        return res.status(403).json({ 
          success: false, 
          message: 'ไม่มีสิทธิ์เข้าถึง' 
        })
      }

      next()
    } catch (error) {
      console.error('Permission middleware error:', error)
      return res.status(500).json({ 
        success: false, 
        message: 'เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์' 
      })
    }
  }
}

/**
 * Middleware สำหรับตรวจสอบว่าเป็น Super Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export async function requireSuperAdmin(req, res, next) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'ไม่พบข้อมูลผู้ใช้' 
      })
    }

    const userRolesAndPermissions = await getUserRolesAndPermissions(req.user.userId)
    const isSuperAdmin = userRolesAndPermissions.permissions.includes('system:admin')

    if (!isSuperAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: 'ต้องเป็น Super Admin เท่านั้น' 
      })
    }

    next()
  } catch (error) {
    console.error('Super admin check error:', error)
    return res.status(500).json({ 
      success: false, 
      message: 'เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์' 
    })
  }
}

// ========================================
// USER MANAGEMENT FUNCTIONS
// ========================================

/**
 * สร้างผู้ใช้ใหม่
 * @param {Object} userData - ข้อมูลผู้ใช้
 * @returns {Promise<Object>} - ผลลัพธ์การสร้างผู้ใช้
 */
export async function createUser(userData) {
  try {
    const { email, username, password, firstName, lastName, employeeId, departmentId, roleIds } = userData

    // ตรวจสอบว่าอีเมลหรือ username ซ้ำหรือไม่
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
          ...(employeeId ? [{ employeeId }] : [])
        ]
      }
    })

    if (existingUser) {
      return { 
        success: false, 
        message: 'อีเมล, username หรือรหัสพนักงานซ้ำกับที่มีอยู่แล้ว' 
      }
    }

    // เข้ารหัสผ่าน
    const hashedPassword = await hashPassword(password)

    // สร้างผู้ใช้
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        employeeId,
        departmentId,
        isActive: true
      }
    })

    // กำหนด roles ให้ผู้ใช้
    if (roleIds && roleIds.length > 0) {
      const userRoles = roleIds.map(roleId => ({
        userId: user.id,
        roleId
      }))

      await prisma.userRole.createMany({
        data: userRoles
      })
    }

    return { 
      success: true, 
      message: 'สร้างผู้ใช้สำเร็จ',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        employeeId: user.employeeId
      }
    }
  } catch (error) {
    console.error('Create user error:', error)
    return { 
      success: false, 
      message: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้' 
    }
  }
}

/**
 * อัปเดตข้อมูลผู้ใช้
 * @param {string} userId - ID ของผู้ใช้
 * @param {Object} updateData - ข้อมูลที่ต้องการอัปเดต
 * @returns {Promise<Object>} - ผลลัพธ์การอัปเดต
 */
export async function updateUser(userId, updateData) {
  try {
    const { firstName, lastName, email, username, employeeId, departmentId, isActive, roleIds } = updateData

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return { 
        success: false, 
        message: 'ไม่พบผู้ใช้' 
      }
    }

    // อัปเดตข้อมูลผู้ใช้
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        username,
        employeeId,
        departmentId,
        isActive
      }
    })

    // อัปเดต roles ถ้ามีการเปลี่ยนแปลง
    if (roleIds) {
      // ลบ roles เดิม
      await prisma.userRole.deleteMany({
        where: { userId }
      })

      // เพิ่ม roles ใหม่
      if (roleIds.length > 0) {
        const userRoles = roleIds.map(roleId => ({
          userId,
          roleId
        }))

        await prisma.userRole.createMany({
          data: userRoles
        })
      }
    }

    return { 
      success: true, 
      message: 'อัปเดตข้อมูลผู้ใช้สำเร็จ',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        employeeId: updatedUser.employeeId,
        isActive: updatedUser.isActive
      }
    }
  } catch (error) {
    console.error('Update user error:', error)
    return { 
      success: false, 
      message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้' 
    }
  }
}

/**
 * เปลี่ยนรหัสผ่าน
 * @param {string} userId - ID ของผู้ใช้
 * @param {string} currentPassword - รหัสผ่านปัจจุบัน
 * @param {string} newPassword - รหัสผ่านใหม่
 * @returns {Promise<Object>} - ผลลัพธ์การเปลี่ยนรหัสผ่าน
 */
export async function changePassword(userId, currentPassword, newPassword) {
  try {
    // ดึงข้อมูลผู้ใช้
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return { 
        success: false, 
        message: 'ไม่พบผู้ใช้' 
      }
    }

    // ตรวจสอบรหัสผ่านปัจจุบัน
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return { 
        success: false, 
        message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' 
      }
    }

    // เข้ารหัสผ่านใหม่
    const hashedNewPassword = await hashPassword(newPassword)

    // อัปเดตรหัสผ่าน
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    })

    return { 
      success: true, 
      message: 'เปลี่ยนรหัสผ่านสำเร็จ' 
    }
  } catch (error) {
    console.error('Change password error:', error)
    return { 
      success: false, 
      message: 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน' 
    }
  }
}

export default {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  authenticateUser,
  authenticateToken,
  requirePermission,
  requireSuperAdmin,
  createUser,
  updateUser,
  changePassword
} 