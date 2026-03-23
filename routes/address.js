import express from 'express'
import { createPrismaClient } from '../config/database.js'
import { getProvinces, getAmphoes, getDistricts} from '../api/owner/joinString.js'
const router = express.Router()
const prisma = createPrismaClient()

router.get('/provinces', async (req, res) => {
  res.json(await getProvinces())
})

router.get('/amphoes/:provinceCode', async (req, res) => {
  res.json(await getAmphoes(req.params.provinceCode))
})
// ✅ ดึงตำบลทั้งหมด (ไม่มี filter)
router.get('/districts', async (req, res) => {
  try {
    const data = await getDistricts() // ถ้าไม่ส่ง amphoeCode/districtCode → return ทั้งหมด
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch districts' })
  }
})
router.get('/districts/:amphoeCode', async (req, res) => {
  res.json(await getDistricts(req.params.amphoeCode))
})

// 📌 ดึงข้อมูลรวม (logic a→b→c / c→b→a)
/* router.get('/all', async (req, res) => {
  try {
    const { provinceCode, amphoeCode, districtCode } = req.query
    const data = await allAddress({ provinceCode, amphoeCode, districtCode })
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch all address' })
  }
}) */

// ✅ ค้นหาที่อยู่แบบ full-text (ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์)
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query
    if (!q || String(q).trim().length < 1) return res.json([])
    const keyword = String(q).trim()

    const rows = await prisma.districts.findMany({
      where: {
        OR: [
          { district: { contains: keyword, mode: 'insensitive' } },
          { amphoe:   { contains: keyword, mode: 'insensitive' } },
          { province: { contains: keyword, mode: 'insensitive' } },
          { zipcode:  { contains: keyword } }
        ]
      },
      orderBy: [{ province_code: 'asc' }, { amphoe_code: 'asc' }],
      take: 30
    })

    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Search failed' })
  }
})

export default router