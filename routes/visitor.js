/**
 * Visitor Tracking API
 * POST /api/visitor/track  — บันทึกการเข้าชม
 * GET  /api/visitor/stats  — ดึงสถิติ ผู้เข้าชมสัปดาห์ / ทั้งหมด
 */
import express from 'express'
import { createPrismaClient } from '../config/database.js'

const router = express.Router()
const prisma = createPrismaClient()

/* ─────────────────────────────────────────
   POST /api/visitor/track
   body: { visitorId: string }
   - upsert Visitor (unique UUID per browser)
   - insert VisitLog (every session visit)
───────────────────────────────────────── */
router.post('/track', async (req, res) => {
  try {
    const { visitorId } = req.body
    if (!visitorId || typeof visitorId !== 'string' || visitorId.length > 64) {
      return res.status(400).json({ success: false, message: 'Invalid visitorId' })
    }

    // upsert visitor record (เพิ่มถ้าใหม่, อัพเดต updatedAt ถ้าเคยมีแล้ว)
    await prisma.visitor.upsert({
      where:  { visitorId },
      update: { updatedAt: new Date() },
      create: { visitorId }
    })

    // บันทึก visit log ทุกครั้ง (ใช้นับ session)
    await prisma.visitLog.create({ data: { visitorId } })

    res.json({ success: true })
  } catch (err) {
    console.error('[visitor/track]', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

/* ─────────────────────────────────────────
   GET /api/visitor/stats
   Returns:
   {
     weekly:  number,   // unique visitors ใน 7 วันที่ผ่านมา
     total:   number    // unique visitors ทั้งหมดตลอดกาล
   }
───────────────────────────────────────── */
router.get('/stats', async (req, res) => {
  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    // unique visitors สัปดาห์ (distinct visitorId ใน VisitLog 7 วันล่าสุด)
    const weeklyResult = await prisma.visitLog.groupBy({
      by: ['visitorId'],
      where: { createdAt: { gte: since } }
    })
    const weekly = weeklyResult.length

    // unique visitors ทั้งหมด (จำนวน Visitor records)
    const total = await prisma.visitor.count()

    res.json({ success: true, weekly, total })
  } catch (err) {
    console.error('[visitor/stats]', err)
    res.status(500).json({ success: false, weekly: 0, total: 0 })
  }
})

export default router
