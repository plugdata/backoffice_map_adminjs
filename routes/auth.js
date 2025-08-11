// ========================================
// Authentication Routes
// API endpoints สำหรับการเข้าสู่ระบบและจัดการผู้ใช้
// ========================================

import express from 'express'
import { createPrismaClient } from '../config/database.js'
import { 
  hashPassword, 
  comparePassword, 
  generateToken, 
  validateLoginData, 
  checkUserStatus,
  authenticateToken 
} from '../config/auth.js'

const router = express.Router()
const prisma = createPrismaClient()

// ========================================
// LOGIN ENDPOINT
// ========================================

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input data
    const validationErrors = validateLoginData(email, password)
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    })

    // Check user status
    const statusCheck = checkUserStatus(user)
    if (!statusCheck.valid) {
      return res.status(401).json({
        success: false,
        message: statusCheck.message
      })
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    // Generate JWT token
    const token = generateToken(user)

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          employeeId: user.employeeId,
          roles: user.roles.map(ur => ur.role.name)
        },
        token
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// ========================================
// REGISTER ENDPOINT
// ========================================

router.post('/register', async (req, res) => {
  try {
    const { 
      email, 
      username, 
      password, 
      firstName, 
      lastName, 
      employeeId 
    } = req.body

    // Validate required fields
    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password: hashedPassword,
        firstName,
        lastName,
        employeeId: employeeId || null,
        isActive: true
      },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    })

    // Generate token
    const token = generateToken(newUser)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          employeeId: newUser.employeeId,
          roles: newUser.roles.map(ur => ur.role.name)
        },
        token
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// ========================================
// GET CURRENT USER
// ========================================

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          employeeId: user.employeeId,
          isActive: user.isActive,
          lastLoginAt: user.lastLoginAt,
          roles: user.roles.map(ur => ur.role.name)
        }
      }
    })

  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// ========================================
// LOGOUT ENDPOINT
// ========================================

router.post('/logout', (req, res) => {
  // In a real application, you might want to blacklist the token
  res.json({
    success: true,
    message: 'Logged out successfully'
  })
})

// ========================================
// CHANGE PASSWORD
// ========================================

router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      })
    }

    // Get user with current password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    })

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword)

    // Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedNewPassword }
    })

    res.json({
      success: true,
      message: 'Password changed successfully'
    })

  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

export default router 