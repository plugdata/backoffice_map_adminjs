// ========================================
// Authentication API Routes
// API สำหรับการยืนยันตัวตนและการจัดการผู้ใช้
// ========================================

import express from 'express'
import { 
  authenticateUser, 
  authenticateToken, 
  requirePermission, 
  requireSuperAdmin,
  createUser,
  updateUser,
  changePassword
} from '../config/auth.js'
import { getUserRolesAndPermissions } from '../utils/permissions.js'
import forgotPasswordRoutes from './forgotPassword.js'

const router = express.Router()

// ========================================
// FORGOT PASSWORD ROUTES
// ========================================
router.use('/', forgotPasswordRoutes)

// ========================================
// AUTHENTICATION ROUTES
// ========================================

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: เข้าสู่ระบบ
 *     description: ใช้สำหรับการเข้าสู่ระบบด้วยอีเมลหรือชื่อผู้ใช้และรหัสผ่าน
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: "admin123"
 *             password: "1234"
 *     responses:
 *       200:
 *         description: เข้าสู่ระบบสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               success: true
 *               message: "เข้าสู่ระบบสำเร็จ"
 *               data:
 *                 user:
 *                   id: 5
 *                   username: "admin123"
 *                   email: "admin123@example.com"
 *                   fullName: "ผู้ทดสอบระบบ"
 *                   role: "admin"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: ข้อมูลไม่ครบถ้วน
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "กรุณากรอกอีเมลและรหัสผ่าน"
 *       401:
 *         description: ข้อมูลเข้าสู่ระบบไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
 *       500:
 *         description: เกิดข้อผิดพลาดในระบบ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกอีเมลและรหัสผ่าน'
      })
    }

    // ตรวจสอบการเข้าสู่ระบบ
    const result = await authenticateUser(email, password)

    if (!result.success) {
      return res.status(401).json(result)
    }

    res.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      data: {
        user: result.user,
        token: result.token
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
    })
  }
})

/**
 * POST /api/auth/logout
 * ออกจากระบบ
 */
router.post('/logout', authenticateToken, (req, res) => {
  try {
    // ในระบบ JWT ไม่จำเป็นต้องทำอะไรเพิ่มเติม
    // Client จะต้องลบ token ออกจาก localStorage
    res.json({
      success: true,
      message: 'ออกจากระบบสำเร็จ'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการออกจากระบบ'
    })
  }
})

/**
 * GET /api/auth/me
 * ดึงข้อมูลผู้ใช้ปัจจุบัน
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userRolesAndPermissions = await getUserRolesAndPermissions(req.user.userId)
    
    if (!userRolesAndPermissions) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลผู้ใช้'
      })
    }

    res.json({
      success: true,
      data: userRolesAndPermissions
    })
  } catch (error) {
    console.error('Get user profile error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้'
    })
  }
})

/**
 * POST /api/auth/change-password
 * เปลี่ยนรหัสผ่าน
 */
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกรหัสผ่านปัจจุบันและรหัสผ่านใหม่'
      })
    }

    // ตรวจสอบความยาวรหัสผ่านใหม่
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร'
      })
    }

    const result = await changePassword(req.user.userId, currentPassword, newPassword)
    
    if (!result.success) {
      return res.status(400).json(result)
    }

    res.json(result)
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน'
    })
  }
})

// ========================================
// USER MANAGEMENT ROUTES (สำหรับ Super Admin และ HR Manager)
// ========================================

/**
 * POST /api/auth/users
 * สร้างผู้ใช้ใหม่
 */
router.post('/users', authenticateToken, requirePermission('user', 'create'), async (req, res) => {
  try {
    const { email, username, password, firstName, lastName, employeeId, departmentId, roleIds } = req.body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน'
      })
    }

    // ตรวจสอบความยาวรหัสผ่าน
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร'
      })
    }

    const result = await createUser({
      email,
      username,
      password,
      firstName,
      lastName,
      employeeId,
      departmentId,
      roleIds
    })

    if (!result.success) {
      return res.status(400).json(result)
    }

    res.status(201).json(result)
  } catch (error) {
    console.error('Create user error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้'
    })
  }
})

/**
 * GET /api/auth/users
 * ดึงรายการผู้ใช้ทั้งหมด
 */
router.get('/users', authenticateToken, requirePermission('user', 'read'), async (req, res) => {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true
          }
        },
        department: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // ลบรหัสผ่านออกจากข้อมูล
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user
      return safeUser
    })

    res.json({
      success: true,
      data: safeUsers
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงรายการผู้ใช้'
    })
  }
})

/**
 * GET /api/auth/users/:id
 * ดึงข้อมูลผู้ใช้ตาม ID
 */
router.get('/users/:id', authenticateToken, requirePermission('user', 'read'), async (req, res) => {
  try {
    const { id } = req.params
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true
          }
        },
        department: true
      }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบผู้ใช้'
      })
    }

    // ลบรหัสผ่านออกจากข้อมูล
    const { password, ...safeUser } = user

    res.json({
      success: true,
      data: safeUser
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้'
    })
  }
})

/**
 * PUT /api/auth/users/:id
 * อัปเดตข้อมูลผู้ใช้
 */
router.put('/users/:id', authenticateToken, requirePermission('user', 'update'), async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, email, username, employeeId, departmentId, isActive, roleIds } = req.body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!firstName || !lastName || !email || !username) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน'
      })
    }

    const result = await updateUser(id, {
      firstName,
      lastName,
      email,
      username,
      employeeId,
      departmentId,
      isActive,
      roleIds
    })

    if (!result.success) {
      return res.status(400).json(result)
    }

    res.json(result)
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้'
    })
  }
})

/**
 * DELETE /api/auth/users/:id
 * ลบผู้ใช้
 */
router.delete('/users/:id', authenticateToken, requirePermission('user', 'delete'), async (req, res) => {
  try {
    const { id } = req.params
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบผู้ใช้'
      })
    }

    // ลบผู้ใช้
    await prisma.user.delete({
      where: { id }
    })

    res.json({
      success: true,
      message: 'ลบผู้ใช้สำเร็จ'
    })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบผู้ใช้'
    })
  }
})

// ========================================
// ROLE & PERMISSION ROUTES
// ========================================

/**
 * GET /api/auth/roles
 * ดึงรายการ roles ทั้งหมด
 */
router.get('/roles', authenticateToken, requirePermission('role', 'read'), async (req, res) => {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    const roles = await prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true
          }
        },
        users: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    res.json({
      success: true,
      data: roles
    })
  } catch (error) {
    console.error('Get roles error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงรายการ roles'
    })
  }
})

/**
 * GET /api/auth/permissions
 * ดึงรายการ permissions ทั้งหมด
 */
router.get('/permissions', authenticateToken, requirePermission('permission', 'read'), async (req, res) => {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    const permissions = await prisma.permission.findMany({
      include: {
        roles: {
          include: {
            role: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: [
        { resource: 'asc' },
        { action: 'asc' }
      ]
    })

    res.json({
      success: true,
      data: permissions
    })
  } catch (error) {
    console.error('Get permissions error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงรายการ permissions'
    })
  }
})

export default router 