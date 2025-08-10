// ========================================
// API Routes
// จัดการ API endpoints สำหรับแอปพลิเคชัน
// ========================================

import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// ========================================
// USER ROUTES
// ========================================

// GET /api/users - ดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
  }
})

// POST /api/users - สร้างผู้ใช้ใหม่
router.post('/users', async (req, res) => {
  const { email, name } = req.body
  try {
    const user = await prisma.user.create({
      data: { email, name },
    })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'ไม่สามารถสร้างผู้ใช้ได้' })
  }
})

export default router 