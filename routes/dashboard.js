// ========================================
// Dashboard API Routes
// ========================================

import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../config/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// ========================================
// GET /api/dashboard/stats - ข้อมูลสถิติหลัก
// ========================================
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // ข้อมูลพื้นที่จัดเก็บ
    const storageStats = await getStorageStats()
    
    // ข้อมูลการอัปโหลด
    const uploadStats = await getUploadStats()
    
    // ข้อมูลการใช้งาน
    const usageStats = await getUsageStats()

    res.json({
      success: true,
      data: {
        storage: storageStats,
        uploads: uploadStats,
        usage: usageStats
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ'
    })
  }
})

// ========================================
// GET /api/dashboard/upload-trend - แนวโน้มการอัปโหลด
// ========================================
router.get('/upload-trend', authenticateToken, async (req, res) => {
  try {
    const { days = 7 } = req.query
    const trendData = await getUploadTrend(parseInt(days))
    
    res.json({
      success: true,
      data: trendData
    })
  } catch (error) {
    console.error('Error fetching upload trend:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแนวโน้ม'
    })
  }
})

// ========================================
// GET /api/dashboard/storage-distribution - การกระจายพื้นที่จัดเก็บ
// ========================================
router.get('/storage-distribution', authenticateToken, async (req, res) => {
  try {
    const distribution = await getStorageDistribution()
    
    res.json({
      success: true,
      data: distribution
    })
  } catch (error) {
    console.error('Error fetching storage distribution:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลการกระจายพื้นที่'
    })
  }
})

// ========================================
// GET /api/dashboard/department-usage - การใช้งานตามแผนก
// ========================================
router.get('/department-usage', authenticateToken, async (req, res) => {
  try {
    const usage = await getDepartmentUsage()
    
    res.json({
      success: true,
      data: usage
    })
  } catch (error) {
    console.error('Error fetching department usage:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลการใช้งานแผนก'
    })
  }
})

// ========================================
// GET /api/dashboard/monthly-uploads - การอัปโหลดรายเดือน
// ========================================
router.get('/monthly-uploads', authenticateToken, async (req, res) => {
  try {
    const { months = 6 } = req.query
    const monthlyData = await getMonthlyUploads(parseInt(months))
    
    res.json({
      success: true,
      data: monthlyData
    })
  } catch (error) {
    console.error('Error fetching monthly uploads:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลรายเดือน'
    })
  }
})

// ========================================
// Helper Functions
// ========================================

/**
 * ดึงข้อมูลสถิติพื้นที่จัดเก็บ
 */
async function getStorageStats() {
  // นับจำนวนเอกสารและไฟล์
  const documentCount = await prisma.document.count()
  const fileCount = await prisma.document.count({
    where: {
      filePath: { not: null }
    }
  })

  // คำนวณขนาดไฟล์ทั้งหมด (MB)
  const fileSizes = await prisma.document.aggregate({
    where: {
      fileSize: { not: null }
    },
    _sum: {
      fileSize: true
    }
  })

  const totalSizeMB = Math.round((fileSizes._sum.fileSize || 0) / (1024 * 1024))
  const maxStorageMB = 1024 // 1GB

  return {
    used: totalSizeMB,
    total: maxStorageMB,
    documents: documentCount,
    files: fileCount
  }
}

/**
 * ดึงข้อมูลสถิติการอัปโหลด
 */
async function getUploadStats() {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

  const [todayCount, weekCount, monthCount, totalCount] = await Promise.all([
    prisma.document.count({
      where: { createdAt: { gte: today } }
    }),
    prisma.document.count({
      where: { createdAt: { gte: weekAgo } }
    }),
    prisma.document.count({
      where: { createdAt: { gte: monthAgo } }
    }),
    prisma.document.count()
  ])

  return {
    today: todayCount,
    week: weekCount,
    month: monthCount,
    total: totalCount
  }
}

/**
 * ดึงข้อมูลสถิติการใช้งาน
 */
async function getUsageStats() {
  const [activeUsers, totalUsers, departments, documentTypes] = await Promise.all([
    prisma.user.count({
      where: { 
        lastLoginAt: { 
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 วันล่าสุด
        }
      }
    }),
    prisma.user.count(),
    prisma.department.count(),
    prisma.documentType.count()
  ])

  return {
    activeUsers,
    totalUsers,
    departments,
    documentTypes
  }
}

/**
 * ดึงข้อมูลแนวโน้มการอัปโหลด
 */
async function getUploadTrend(days = 7) {
  const trendData = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)

    const uploads = await prisma.document.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay
        }
      }
    })

    const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์']
    const dayName = dayNames[date.getDay()]

    trendData.push({
      name: dayName,
      uploads,
      downloads: Math.floor(uploads * 0.7) // Mock download data
    })
  }

  return trendData
}

/**
 * ดึงข้อมูลการกระจายพื้นที่จัดเก็บ
 */
async function getStorageDistribution() {
  const mimeTypes = await prisma.document.groupBy({
    by: ['mimeType'],
    _sum: {
      fileSize: true
    },
    where: {
      mimeType: { not: null },
      fileSize: { not: null }
    }
  })

  const distribution = []
  const typeNames = {
    'application/pdf': 'เอกสาร PDF',
    'image/': 'รูปภาพ',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'เอกสาร Word',
    'application/msword': 'เอกสาร Word',
    'application/vnd.ms-excel': 'เอกสาร Excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'เอกสาร Excel'
  }

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

  mimeTypes.forEach((type, index) => {
    const sizeMB = Math.round((type._sum.fileSize || 0) / (1024 * 1024))
    const typeName = typeNames[type.mimeType] || 'ไฟล์อื่นๆ'
    
    distribution.push({
      name: typeName,
      value: sizeMB,
      color: colors[index % colors.length]
    })
  })

  return distribution
}

/**
 * ดึงข้อมูลการใช้งานตามแผนก
 */
async function getDepartmentUsage() {
  const usage = await prisma.department.findMany({
    select: {
      name: true,
      documents: {
        select: {
          _count: true
        }
      }
    }
  })

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4']

  return usage.map((dept, index) => ({
    name: dept.name,
    documents: dept.documents._count,
    color: colors[index % colors.length]
  }))
}

/**
 * ดึงข้อมูลการอัปโหลดรายเดือน
 */
async function getMonthlyUploads(months = 6) {
  const monthlyData = []
  const now = new Date()
  const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 
                     'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const [uploads, approved] = await Promise.all([
      prisma.document.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth
          }
        }
      }),
      prisma.document.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth
          },
          status: 'APPROVED'
        }
      })
    ])

    monthlyData.push({
      month: monthNames[date.getMonth()],
      uploads,
      approved
    })
  }

  return monthlyData
}

export default router 