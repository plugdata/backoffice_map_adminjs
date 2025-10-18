import express from 'express'
import { createPrismaClient } from '../config/database.js'
import { getProvinces, getAmphoes, getDistricts} from '../page/owner/joinString.js'
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

export default router