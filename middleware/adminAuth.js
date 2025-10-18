// ========================================
// AdminJS Custom Authentication Middleware
// ระบบการยืนยันตัวตนสำหรับ AdminJS
// ========================================

import { verifyToken } from '../config/auth.js'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

/**
 * AdminJS Authentication Middleware
 * ตรวจสอบการยืนยันตัวตนสำหรับ AdminJS
 */
export const adminAuth = {
  /**
   * ตรวจสอบการเข้าสู่ระบบ
   * @param {string} email - อีเมลหรือ username
   * @param {string} password - รหัสผ่าน
   * @returns {Promise<Object>} - ข้อมูลผู้ใช้และ session
   */
  async authenticate(email, password) {
    try {
      console.log('🔐 AdminJS Authentication attempt:', { email })
      
      // ค้นหาผู้ใช้จากอีเมลหรือ username
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email },
            { username: email }
          ]
        }
      })

      if (!user) {
        console.log('❌ User not found:', email)
        return false
      }

      // ตรวจสอบรหัสผ่าน
      const isPasswordValid = await bcrypt.compare(password, user.password)
      
      if (!isPasswordValid) {
        console.log('❌ Invalid password for user:', email)
        return false
      }

      console.log('✅ AdminJS Authentication successful:', { userId: user.id, email: user.email })

      // สร้าง session object สำหรับ AdminJS
      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          title_use: user.title_use,
          position: user.position,
          phone: user.phone,
          role: user.role
        }
      }
    } catch (error) {
      console.error('❌ AdminJS Authentication error:', error)
      return false
    }
  },

  /**
   * ตรวจสอบ session
   * @param {Object} session - session object
   * @returns {Promise<Object|null>} - ข้อมูลผู้ใช้หรือ null
   */
  async session(session) {
    try {
      if (!session || !session.user) {
        return null
      }

      // ตรวจสอบว่าผู้ใช้ยังคงใช้งานอยู่
      const user = await prisma.user.findUnique({
        where: { 
          id: session.user.id
        }
      })

      if (!user) {
        return null
      }

      // อัปเดตข้อมูลผู้ใช้ใน session
      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          title_use: user.title_use,
          position: user.position,
          phone: user.phone,
          role: user.role
        }
      }
    } catch (error) {
      console.error('❌ AdminJS Session error:', error)
      return null
    }
  }
}

/**
 * JWT-based Authentication for AdminJS
 * ใช้ JWT token สำหรับการยืนยันตัวตน
 */
export const adminJwtAuth = {
  /**
   * ตรวจสอบ JWT token
   * @param {string} token - JWT token
   * @returns {Promise<Object|null>} - ข้อมูลผู้ใช้หรือ null
   */
  async authenticate(token) {
    try {
      if (!token) {
        return null
      }

      // ตรวจสอบ JWT token
      const decoded = verifyToken(token)
      if (!decoded) {
        return null
      }

      // ค้นหาผู้ใช้
      const user = await prisma.user.findUnique({
        where: { 
          id: decoded.userId
        }
      })

      if (!user) {
        return null
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          title_use: user.title_use,
          position: user.position,
          phone: user.phone,
          role: user.role
        }
      }
    } catch (error) {
      console.error('❌ AdminJS JWT Authentication error:', error)
      return null
    }
  }
}

/**
 * Permission-based Access Control
 * ตรวจสอบสิทธิ์การเข้าถึง
 */
export const adminPermissions = {
  /**
   * ตรวจสอบสิทธิ์การเข้าถึง resource
   * @param {Object} user - ข้อมูลผู้ใช้
   * @param {string} resource - resource name
   * @param {string} action - action (list, show, edit, delete, new)
   * @returns {boolean} - true ถ้ามีสิทธิ์
   */
  hasPermission(user, resource, action) {
    if (!user || !user.permissions) {
      return false
    }

    // ตรวจสอบสิทธิ์ system:admin (Super Admin)
    const isSuperAdmin = user.permissions.some(p => p.name === 'system:admin')
    if (isSuperAdmin) {
      return true
    }

    // ตรวจสอบสิทธิ์เฉพาะ
    const permissionName = `${resource}:${action}`
    return user.permissions.some(p => p.name === permissionName)
  },

  /**
   * ตรวจสอบสิทธิ์การเข้าถึง AdminJS resource
   * @param {Object} user - ข้อมูลผู้ใช้
   * @param {string} resourceId - AdminJS resource ID
   * @param {string} action - action
   * @returns {boolean} - true ถ้ามีสิทธิ์
   */
  hasAdminJSPermission(user, resourceId, action) {
    // Map AdminJS resources to our permission system
    const resourceMap = {
      'User': 'user',
      'Role': 'role',
      'Permission': 'permission',
      'Department': 'department',
      'Owner': 'owner',
      'Building': 'building',
      'Project': 'project'
    }

    const mappedResource = resourceMap[resourceId] || resourceId.toLowerCase()
    return this.hasPermission(user, mappedResource, action)
  }
}

export default {
  adminAuth,
  adminJwtAuth,
  adminPermissions
}