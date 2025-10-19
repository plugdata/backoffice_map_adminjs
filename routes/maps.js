import express from 'express'
import { createPrismaClient } from '../config/database.js'
import { getProvinces} from '../page/owner/joinString.js'
const router = express.Router()
const prisma = createPrismaClient()

router.get('/provinces', async (req, res) => {
  res.json(await getProvinces())
})
router.get('/api/provinces', async (req, res) => {
  res.json(await getProvinces())
})

router.get('/api/amphoes/:provinceCode', async (req, res) => {
  res.json(await getAmphoes(req.params.provinceCode))
})

router.get('/api/districts/:amphoeCode', async (req, res) => {
  res.json(await getDistricts(req.params.amphoeCode))
})


 router.get('/', async (req, res) => {
  const { year, province } = req.query

  const fiscalYear = year
    ? await prisma.fiscalYear.findFirst({ where: { year: Number(year) } })
    : null

  const fiscalYearId = fiscalYear?.id

  const building = await prisma.buildingControl.findMany({
    where: { fiscalYearId, maps: { province: { contains: String(province) } } },
    select: { id: true, building_type: true, use_purpose: true, status: true, maps: true } // 👈 เลือก field ที่ปลอดภัย
  })

  const riskZones = await prisma.riskZone.findMany({
    where: { fiscalYearId },
    select: { id: true, zoneType: true, description: true, maps: true }
  })

  const zoningPlans = await prisma.zoningPlan.findMany({
    where: { fiscalYearId },
    select: { id: true, areaName: true, notes: true, maps: true }
  })

  res.json({ building, riskZones, zoningPlans })
}) 

router.get('/local', async (req, res) => {
  const { latitude, longitude, name_local, q  } = req.query

  try {
    let whereCondition = {}

    // ✅ Layer 1: GET ข้อมูลทั้งหมด (ไม่มี query parameters)
    if (!latitude && !longitude && !name_local && !q) {
      const map = await prisma.map.findMany({
        select: {
          id: true,
          latitude: true,
          longitude: true,
          name_local: true,
          house_no: true,
          address: true,
          image_after: true,
          image_before: true,
         

          // ✅ join BuildingControl
          buildingControl: {
            select: {
              id: true,
              building_type: true,
              use_purpose: true,
              fiscalYearId: true
            }
          },
          riskZone: {
            select: {
              id: true,
              zoneType: true,
              description: true,
              fiscalYearId: true
            }
          },
          zoningPlan: {
            select: {
              id: true,
              areaName: true,
              notes: true,
              fiscalYearId: true
            }
          }
        }
      })

      // Get fiscal year data for all building controls
      const fiscalYearIds = [...new Set(map.flatMap(m => m.buildingControl ? [m.buildingControl.fiscalYearId] : []))]
      const fiscalYears = await prisma.fiscalYear.findMany({
        where: { id: { in: fiscalYearIds } },
        select: { id: true, year: true }
      })
      
      // Create a map for quick lookup
      const fiscalYearMap = fiscalYears.reduce((acc, fy) => {
        acc[fy.id] = fy.year
        return acc
      }, {})

      // Add year to buildingControl data
      const mapWithYears = map.map(m => ({
        ...m,
        buildingControl: m.buildingControl ? {
          ...m.buildingControl,
          year: fiscalYearMap[m.buildingControl.fiscalYearId]
        } : null,
        riskZone: m.riskZone ? {
          ...m.riskZone,
          year: fiscalYearMap[m.riskZone.fiscalYearId]
        } : null,
        zoningPlan: m.zoningPlan ? {
          ...m.zoningPlan,
          year: fiscalYearMap[m.zoningPlan.fiscalYearId]
        } : null
      }))

      return res.json({
        success: true,
        data: mapWithYears,
        message: 'ดึงข้อมูล Map + BuildingControl ทั้งหมดสำเร็จ',
        total: mapWithYears.length
      })
    }

    // ✅ Layer 2: search keyword (q)
    if (q && String(q).trim() !== '') {
      whereCondition.OR = [
        { name_local: { contains: String(q), mode: 'insensitive' } },
        { house_no: { contains: String(q), mode: 'insensitive' } },
        { address: { contains: String(q), mode: 'insensitive' } },
      ]
    }

    // ✅ Layer 3: filter เฉพาะ name_local
    if (name_local && name_local !== 'undefined') {
      const decodedNameLocal = decodeURIComponent(String(name_local))
      whereCondition.name_local = {
        contains: decodedNameLocal,
        mode: 'insensitive'
      }
    }

    const map = await prisma.map.findMany({
      where: whereCondition,
      take: 50,
      select: {
        id: true,
        latitude: true,
        longitude: true,
        name_local: true,
        house_no: true,
        address: true,
        image_after: true,
        image_before: true,

        // ✅ join BuildingControl
        buildingControl: {
          select: {
            id: true,
            building_type: true,
            use_purpose: true,
            fiscalYearId: true
          }
        },
        riskZone: {
          select: {
            id: true,
            zoneType: true,
            description: true,
            fiscalYearId: true
          }
        },
        zoningPlan: {
          select: {
            id: true,
            areaName: true,
            notes: true,
            fiscalYearId: true
          }
        }
      }
    })

    // Get fiscal year data for all building controls
    const fiscalYearIds = [...new Set(map.flatMap(m => m.buildingControl ? [m.buildingControl.fiscalYearId] : []))]
    
    const fiscalYears = await prisma.fiscalYear.findMany({
      where: { id: { in: fiscalYearIds } },
      select: { id: true, year: true }
    })
    
    // Create a map for quick lookup
    const fiscalYearMap = fiscalYears.reduce((acc, fy) => {
      acc[fy.id] = fy.year
      return acc
    }, {})

    // Add year to buildingControl data
    const mapWithYears = map.map(m => ({
      ...m,
      buildingControl: m.buildingControl ? {
        ...m.buildingControl,
        year: fiscalYearMap[m.buildingControl.fiscalYearId]
      } : null
    }))

    res.json({
      success: true,
      data: mapWithYears,
      message: 'ดึงข้อมูล Map + BuildingControl สำเร็จ',
      total: mapWithYears.length
    })
  } catch (error) {
    console.error('Error fetching map:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูล Map',
      error: error.message
    })
  }
})


router.get('/building', async (req, res) => {
  try {
    const { year } = req.query

    // ถ้ามี year -> หา fiscalYear ก่อน
    let fiscalYear
    if (year) {
      fiscalYear = await prisma.fiscalYear.findFirst({
        where: { year: parseInt(year) }
      })
      if (!fiscalYear) {
        return res.json({ building: [] })
      }
    }

    // query building ตาม fiscalYearId
    const buildings = await prisma.buildingControl.findMany({
      where: fiscalYear ? { fiscalYearId: fiscalYear.id } : {},
      select: {
        id: true,
        building_type: true,
        use_purpose: true,
        createdAt: true,
        fiscalYearId: true
      }
    })

    // ดึง year จาก FiscalYear ตาม fiscalYearId ของแต่ละ building
    const result = await Promise.all(
      buildings.map(async (b) => {
        const fy = await prisma.fiscalYear.findUnique({
          where: { id: b.fiscalYearId },
          select: { year: true }
        })
        return { ...b, year: fy?.year }
      })
    )

    res.json({
      building: result,
      filterYear: fiscalYear?.year || null
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})




export default router