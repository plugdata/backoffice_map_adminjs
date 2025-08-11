// ========================================
// API Routes
// จัดการ API endpoints สำหรับแอปพลิเคชัน
// ========================================

import express from 'express'
import { PrismaClient } from '@prisma/client'
import authRoutes from './auth.js'
import documentRoutes from './documents.js'

const router = express.Router()
const prisma = new PrismaClient()

// ========================================
// AUTHENTICATION ROUTES
// ========================================

router.use('/auth', authRoutes)

// ========================================
// DOCUMENT ROUTES
// ========================================

router.use('/documents', documentRoutes)

// ========================================
// USER ROUTES
// ========================================

// GET /api/users - ดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true
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
    
    // Remove password from response
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user
      return {
        ...safeUser,
        roles: user.roles.map(ur => ur.role.name)
      }
    })
    
    res.json({
      success: true,
      data: safeUsers
    })
  } catch (err) {
    console.error('Get users error:', err)
    res.status(500).json({ 
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' 
    })
  }
})

// GET /api/users/:id - ดึงข้อมูลผู้ใช้ตาม ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true
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
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'ไม่พบผู้ใช้นี้'
      })
    }
    
    // Remove password from response
    const { password, ...safeUser } = user
    res.json({
      success: true,
      data: {
        ...safeUser,
        roles: user.roles.map(ur => ur.role.name)
      }
    })
  } catch (err) {
    console.error('Get user error:', err)
    res.status(500).json({ 
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' 
    })
  }
})

// ========================================
// ROLE ROUTES
// ========================================

// GET /api/roles - ดึงข้อมูลบทบาททั้งหมด
router.get('/roles', async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    })
    
    const formattedRoles = roles.map(role => ({
      ...role,
      permissions: role.permissions.map(rp => rp.permission.name)
    }))
    
    res.json({
      success: true,
      data: formattedRoles
    })
  } catch (err) {
    console.error('Get roles error:', err)
    res.status(500).json({ 
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลบทบาท' 
    })
  }
})

// ========================================
// NOTIFICATION ROUTES
// ========================================

// GET /api/notifications - ดึงข้อมูลการแจ้งเตือน
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        document: {
          select: {
            id: true,
            documentCode: true,
            projectName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    res.json({
      success: true,
      data: notifications
    })
  } catch (err) {
    console.error('Get notifications error:', err)
    res.status(500).json({ 
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลการแจ้งเตือน' 
    })
  }
})

// ========================================
// HEALTH CHECK
// ========================================

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  })
})

export default router 