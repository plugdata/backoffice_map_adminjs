// ========================================
// Dashboard API Routes (Prisma models that exist)
// ========================================

import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../config/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Summary counts for main entities
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const [users, owners, fiscalYears, buildings, risks, zonings, uploads, maps] = await Promise.all([
      prisma.user.count(),
      prisma.owner.count(),
      prisma.fiscalYear.count(),
      prisma.buildingControl.count(),
      prisma.riskZone.count(),
      prisma.zoningPlan.count(),
      prisma.uploads.count(),
      prisma.map.count(),
    ])

    res.json({
      success: true,
      data: {
        users, owners, fiscalYears,
        buildingControls: buildings,
        riskZones: risks,
        zoningPlans: zonings,
        uploads,
        maps,
      }
    })
  } catch (error) {
    console.error('Error fetching summary:', error)
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงสรุปข้อมูล' })
  }
})

// BuildingControl grouped by FiscalYear
router.get('/building-by-year', authenticateToken, async (req, res) => {
  try {
    const groups = await prisma.buildingControl.groupBy({
      by: ['fiscalYearId'],
      _count: { _all: true }
    })
    const years = await prisma.fiscalYear.findMany({ select: { id: true, year: true } })
    const yearMap = new Map(years.map(y => [y.id, y.year]))
    const data = groups.map(g => ({ fiscalYearId: g.fiscalYearId, year: yearMap.get(g.fiscalYearId) || g.fiscalYearId, count: g._count._all }))
    res.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching building-by-year:', error)
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลอาคารตามปีงบประมาณ' })
  }
})

// Uploads trend by month
router.get('/uploads-trend', authenticateToken, async (req, res) => {
  try {
    const months = Number(req.query.months || 6)
    const result = []
    const now = new Date()
    const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const start = new Date(date.getFullYear(), date.getMonth(), 1)
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      const count = await prisma.uploads.count({
        where: { createdAt: { gte: start, lt: end } }
      })
      result.push({ month: monthNames[date.getMonth()], uploads: count })
    }

    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Error fetching uploads-trend:', error)
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงแนวโน้มการอัปโหลด' })
  }
})

// Recent building controls
router.get('/recent-buildings', authenticateToken, async (req, res) => {
  try {
    const take = Number(req.query.limit || 10)
    const records = await prisma.buildingControl.findMany({
      take,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        building_type: true,
        use_purpose: true,
        license_number: true,
        createdAt: true,
        owner_id: true,
        fiscalYearId: true,
      }
    })
    res.json({ success: true, data: records })
  } catch (error) {
    console.error('Error fetching recent-buildings:', error)
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงรายการล่าสุด' })
  }
})

export default router

// ========================================
// Extra: entity recent and summary endpoints
// ========================================

const modelMap = {
  BuildingControl: (prisma) => prisma.buildingControl,
  RiskZone: (prisma) => prisma.riskZone,
  ZoningPlan: (prisma) => prisma.zoningPlan,
  PlanProject: (prisma) => prisma.planProject,
  ApprovedProject: (prisma) => prisma.approvedProject,
}

router.get('/entity/recent', authenticateToken, async (req, res) => {
  try {
    const model = req.query.model
    const take = Number(req.query.limit || 10)
    if (!modelMap[model]) return res.status(400).json({ success: false, message: 'invalid model' })

    const client = modelMap[model](prisma)
    const orderByField = 'updatedAt' in (client.fields || {}) ? 'updatedAt' : 'createdAt'
    const records = await client.findMany({ take, orderBy: { [orderByField]: 'desc' } })
    res.json({ success: true, data: records })
  } catch (e) {
    console.error('entity/recent error', e)
    res.status(500).json({ success: false, message: 'server error' })
  }
})

router.get('/entity/summary', authenticateToken, async (req, res) => {
  try {
    const model = req.query.model
    if (!modelMap[model]) return res.status(400).json({ success: false, message: 'invalid model' })

    const client = modelMap[model](prisma)
    const [total, latest, uploadsTotal, latestUpload] = await Promise.all([
      client.count(),
      client.findFirst({ orderBy: { updatedAt: 'desc' } }).catch(() => null),
      prisma.uploads.count(),
      prisma.uploads.findFirst({ orderBy: { createdAt: 'desc' } }).catch(() => null)
    ])

    res.json({
      success: true,
      data: {
        total,
        latestUpdatedAt: latest?.updatedAt || latest?.createdAt || null,
        uploads: {
          total: uploadsTotal,
          latestCreatedAt: latestUpload?.createdAt || null
        }
      }
    })
  } catch (e) {
    console.error('entity/summary error', e)
    res.status(500).json({ success: false, message: 'server error' })
  }
})