// ========================================
// Forgot Password Routes
// ระบบลืมรหัสผ่านและรีเซ็ตรหัสผ่าน
// ========================================

import express from 'express'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../config/auth.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const router = express.Router()
const prisma = new PrismaClient()

// ========================================
// EMAIL CONFIGURATION
// ========================================

// Create email transporter
const createEmailTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// ========================================
// FORGOT PASSWORD ROUTE
// ========================================

/**
 * POST /api/auth/forgot-password
 * ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมล
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกอีเมล'
      })
    }

    // ค้นหาผู้ใช้
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: email }
        ]
      }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบผู้ใช้ที่ใช้อีเมลนี้'
      })
    }

    // สร้าง reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // บันทึก reset token ในฐานข้อมูล
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })

    // สร้าง reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3002'}/reset-password?token=${resetToken}`

    // ส่งอีเมล
    try {
      const transporter = createEmailTransporter()
      
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: user.email,
        subject: 'รีเซ็ตรหัสผ่าน - ระบบจัดการอาคาร',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">รีเซ็ตรหัสผ่าน</h2>
            <p>สวัสดี ${user.fullName || user.username},</p>
            <p>คุณได้ขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณในระบบจัดการอาคาร</p>
            <p>กรุณาคลิกที่ลิงก์ด้านล่างเพื่อรีเซ็ตรหัสผ่านใหม่:</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
              รีเซ็ตรหัสผ่าน
            </a>
            <p>ลิงก์นี้จะหมดอายุใน 1 ชั่วโมง</p>
            <p>หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาเพิกเฉยต่ออีเมลนี้</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              ระบบจัดการอาคาร<br>
              หากมีข้อสงสัย กรุณาติดต่อผู้ดูแลระบบ
            </p>
          </div>
        `
      }

      await transporter.sendMail(mailOptions)

      res.json({
        success: true,
        message: 'ลิงก์รีเซ็ตรหัสผ่านได้ถูกส่งไปยังอีเมลของคุณแล้ว'
      })

    } catch (emailError) {
      console.error('Email sending error:', emailError)
      
      // ลบ reset token ถ้าส่งอีเมลไม่สำเร็จ
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: null,
          resetTokenExpiry: null
        }
      })

      res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้ง'
      })
    }

  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในระบบ'
    })
  }
})

// ========================================
// RESET PASSWORD ROUTE
// ========================================

/**
 * POST /api/auth/reset-password
 * รีเซ็ตรหัสผ่านด้วย token
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
      })
    }

    // ค้นหาผู้ใช้ด้วย reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date() // ตรวจสอบว่า token ยังไม่หมดอายุ
        }
      }
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'โทเค็นรีเซ็ตไม่ถูกต้องหรือหมดอายุ'
      })
    }

    // เข้ารหัสผ่านใหม่
    const hashedPassword = await hashPassword(password)

    // อัปเดตรหัสผ่านและลบ reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    })

    res.json({
      success: true,
      message: 'รีเซ็ตรหัสผ่านสำเร็จ'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในระบบ'
    })
  }
})

// ========================================
// VERIFY RESET TOKEN ROUTE
// ========================================

/**
 * GET /api/auth/verify-reset-token/:token
 * ตรวจสอบว่า reset token ถูกต้องหรือไม่
 */
router.get('/verify-reset-token/:token', async (req, res) => {
  try {
    const { token } = req.params

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      },
      select: {
        id: true,
        email: true,
        username: true
      }
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'โทเค็นรีเซ็ตไม่ถูกต้องหรือหมดอายุ'
      })
    }

    res.json({
      success: true,
      message: 'โทเค็นรีเซ็ตถูกต้อง',
      user: {
        email: user.email,
        username: user.username
      }
    })

  } catch (error) {
    console.error('Verify reset token error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในระบบ'
    })
  }
})

export default router
