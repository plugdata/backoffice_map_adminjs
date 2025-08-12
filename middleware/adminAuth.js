// ========================================
// AdminJS Authentication Middleware
// ========================================

import { verifyPassword } from '../config/auth.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ========================================
// AUTHENTICATION FUNCTION FOR ADMINJS
// ========================================

/**
 * Authentication function สำหรับ AdminJS Express
 * รับ email และ password จาก login form
 * @param {string} email - อีเมลผู้ใช้
 * @param {string} password - รหัสผ่าน
 * @returns {Promise<Object|false>} - ข้อมูลผู้ใช้หรือ false
 */
export const authenticateAdmin = async (email, password) => {
  try {
    console.log(`Attempting login for: ${email}`)

    // ค้นหาผู้ใช้จากอีเมล
    const user = await prisma.user.findUnique({
      where: { email },
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
        },
        department: true
      }
    })

    // ตรวจสอบว่าผู้ใช้มีอยู่และยังใช้งานอยู่
    if (!user || !user.isActive) {
      console.log('User not found or inactive')
      return false
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      console.log('Invalid password')
      return false
    }

    // อัปเดตเวลาล็อกอินล่าสุด
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    console.log(`User authenticated successfully: ${user.email}`)
    
    // ส่งคืนข้อมูลผู้ใช้ที่จำเป็นสำหรับ AdminJS
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      employeeId: user.employeeId,
      department: user.department,
      roles: user.roles.map(ur => ur.role.name),
      permissions: user.roles.flatMap(ur => 
        ur.role.permissions.map(rp => `${rp.permission.resource}:${rp.permission.action}`)
      )
    }

  } catch (error) {
    console.error('Authentication error:', error)
    return false
  }
}

// ========================================
// SESSION CONFIGURATION
// ========================================

/**
 * สร้าง session configuration สำหรับ AdminJS
 * @returns {Object} - session configuration
 */
export const getSessionConfig = () => {
  return {
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'adminjs-secret-key',
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    name: 'adminjs',
  }
}

// ========================================
// AUTHENTICATION CONFIGURATION
// ========================================

/**
 * สร้าง authentication configuration สำหรับ AdminJS
 * @returns {Object} - authentication configuration
 */
export const getAuthConfig = () => {
  return {
    authenticate: authenticateAdmin,
    cookieName: 'adminjs',
    cookiePassword: process.env.COOKIE_SECRET || 'adminjs-secret-key',
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึง resource และ action หรือไม่
 * @param {Object} user - ข้อมูลผู้ใช้
 * @param {string} resource - resource ที่ต้องการตรวจสอบ
 * @param {string} action - action ที่ต้องการตรวจสอบ
 * @returns {boolean} - true ถ้ามีสิทธิ์
 */
export const hasPermission = (user, resource, action) => {
  if (!user || !user.permissions) {
    return false
  }

  const permission = `${resource}:${action}`
  return user.permissions.includes(permission)
}

/**
 * ตรวจสอบว่าผู้ใช้เป็น Super Admin หรือไม่
 * @param {Object} user - ข้อมูลผู้ใช้
 * @returns {boolean} - true ถ้าเป็น Super Admin
 */
export const isSuperAdmin = (user) => {
  return hasPermission(user, 'system', 'admin')
}

export default {
  authenticateAdmin,
  getSessionConfig,
  getAuthConfig,
  hasPermission,
  isSuperAdmin
} 