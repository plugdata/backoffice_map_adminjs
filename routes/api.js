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
// HEALTH CHECK ENDPOINT (OPTIMIZED)
// ========================================

router.get('/health', async (req, res) => {
  try {
    // Quick database connection check
    await prisma.$queryRaw`SELECT 1`
    
    res.json({
      success: true,
      message: 'API is healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: '1.0.0'
    })
  } catch (error) {
    console.error('Health check error:', error)
    res.status(500).json({
      success: false,
      message: 'API is unhealthy',
      error: error.message
    })
  }
})

// ========================================
// AUTHENTICATION ROUTES
// ========================================

router.use('/auth', authRoutes)

// ========================================
// DOCUMENT ROUTES
// ========================================

router.use('/documents', documentRoutes)

// ========================================
// USER ROUTES (HIGHLY OPTIMIZED)
// ========================================

// GET /api/users - ดึงข้อมูลผู้ใช้ทั้งหมด (with pagination and caching)
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', department = '' } = req.query
    const offset = (page - 1) * limit
    
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=300') // Cache for 5 minutes
    
    // Build where clause for search
    const where = {}
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (department) {
      where.department = {
        name: { contains: department, mode: 'insensitive' }
      }
    }
    
    // Optimized query with pagination
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          roles: {
            select: {
              role: {
                select: {
                  name: true
                }
              }
            }
          },
          department: {
            select: {
              id: true,
              name: true
            }
          }
        },
        skip: offset,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ])
    
    // Transform data for better performance
    const safeUsers = users.map(user => ({
      ...user,
      roles: user.roles.map(ur => ur.role.name)
    }))
    
    res.json({
      success: true,
      data: safeUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      count: safeUsers.length
    })
  } catch (err) {
    console.error('Get users error:', err)
    res.status(500).json({ 
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' 
    })
  }
})

// GET /api/users/:id - ดึงข้อมูลผู้ใช้ตาม ID (optimized)
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=300') // Cache for 5 minutes
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        roles: {
          select: {
            role: {
              select: {
                name: true
              }
            }
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
    
    // Transform data
    const safeUser = {
      ...user,
      roles: user.roles.map(ur => ur.role.name)
    }
    
    res.json({
      success: true,
      data: safeUser
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
// ROLE ROUTES (OPTIMIZED)
// ========================================

// GET /api/roles - ดึงข้อมูลบทบาททั้งหมด (optimized)
router.get('/roles', async (req, res) => {
  try {
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=600') // Cache for 10 minutes
    
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        permissions: {
          select: {
            permission: {
              select: {
                name: true
              }
            }
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
      data: formattedRoles,
      count: formattedRoles.length
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
// NOTIFICATION ROUTES (OPTIMIZED)
// ========================================

// GET /api/notifications - ดึงข้อมูลการแจ้งเตือน (with pagination)
router.get('/notifications', async (req, res) => {
  try {
    const { page = 1, limit = 20, userId = '' } = req.query
    const offset = (page - 1) * limit
    
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=60') // Cache for 1 minute
    
    const where = {}
    if (userId) {
      where.userId = userId
    }
    
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        select: {
          id: true,
          message: true,
          type: true,
          isRead: true,
          createdAt: true,
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
        skip: offset,
        take: parseInt(limit),
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.notification.count({ where })
    ])
    
    res.json({
      success: true,
      data: notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      count: notifications.length
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
// DEPARTMENT ROUTES (NEW)
// ========================================

// GET /api/departments - ดึงข้อมูลแผนกทั้งหมด
router.get('/departments', async (req, res) => {
  try {
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=600') // Cache for 10 minutes
    
    const departments = await prisma.department.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            users: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    res.json({
      success: true,
      data: departments,
      count: departments.length
    })
  } catch (err) {
    console.error('Get departments error:', err)
    res.status(500).json({ 
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก' 
    })
  }
})

// ========================================
// STATISTICS ROUTES (NEW)
// ========================================

// GET /api/stats - ดึงสถิติต่างๆ
router.get('/stats', async (req, res) => {
  try {
    // Add cache headers
    res.set('Cache-Control', 'public, max-age=300') // Cache for 5 minutes
    
    const [userCount, documentCount, notificationCount, departmentCount] = await Promise.all([
      prisma.user.count(),
      prisma.document.count(),
      prisma.notification.count(),
      prisma.department.count()
    ])
    
    res.json({
      success: true,
      data: {
        users: userCount,
        documents: documentCount,
        notifications: notificationCount,
        departments: departmentCount
      },
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    console.error('Get stats error:', err)
    res.status(500).json({ 
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ' 
    })
  }
})

export default router 