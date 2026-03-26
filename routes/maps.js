import express from 'express'
import { createPrismaClient } from '../config/database.js'
import { getProvinces} from '../api/owner/joinString.js'
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





// ════════════════════════════════════════
// GET /filter — ดึงข้อมูลแผนที่แยกตามประเภท
// query: ?year=2567
// output:
//   markers   : buildingControlId → lat/lng marker
//   layers    :
//     riskZone        → KML/GeoJSON
//     zoningPlan      → KML/GeoJSON
//     planProject     → KML/GeoJSON
//     approvedProject → KML/GeoJSON
//     buildPlan       → KML/GeoJSON + marker (ถ้ามีพิกัด)
// ════════════════════════════════════════
router.get('/filter', async (req, res) => {
  try {
    const { year } = req.query

    // validate year
    let fiscalYearId = null
    if (year !== undefined && year !== '') {
      const parsedYear = parseInt(year, 10)
      if (isNaN(parsedYear) || parsedYear < 2500 || parsedYear > 2700) {
        return res.status(400).json({ success: false, message: 'ปีงบประมาณไม่ถูกต้อง' })
      }
      const fiscalYear = await prisma.fiscalYear.findFirst({ where: { year: parsedYear } })
      if (!fiscalYear) {
        return res.json({
          success: true,
          markers: [],
          layers: { riskZone: [], zoningPlan: [], planProject: [], approvedProject: [], buildPlan: [] },
          total: 0,
          filterYear: parsedYear
        })
      }
      fiscalYearId = fiscalYear.id
    }

    // build where — ถ้ามี year filter ให้กรองจาก relation ที่ตรงกัน
    const whereClause = fiscalYearId
      ? {
          OR: [
            { buildingControl: { fiscalYearId } },
            { riskZone:        { fiscalYearId } },
            { zoningPlan:      { fiscalYearId } },
            { planProject:     { fiscalYearId } },
            { approvedProject: { fiscalYearId } },
            { palnbuildId:     { not: null } }    // BuildPlan ไม่มี fiscalYear ให้ include เสมอ
          ]
        }
      : {}

    const maps = await prisma.map.findMany({
      where: whereClause,
      select: {
        id: true,
        latitude: true,
        longitude: true,
        name_local: true,
        house_no: true,
        address: true,
        colors: true,
        geoJsonData: true,
        image_before: true,
        image_after: true,
        buildingControlId: true,
        riskZoneId: true,
        zoningPlanId: true,
        planProjectId: true,
        approvedProjectId: true,
        palnbuildId: true,
        directUploads: {
          select: { id: true, namefile: true, url: true, fileType: true }
        },
        buildingControl: {
          select: {
            id: true, building_type: true, use_purpose: true, fiscalYearId: true, status: true, license_number: true,
            uploads: { select: { id: true, namefile: true, url: true, fileType: true } }
          }
        },
        riskZone: {
          select: {
            id: true, zoneType: true, zone_code: true, description: true, fiscalYearId: true, status: true,
            uploads: { select: { id: true, namefile: true, url: true, fileType: true } }
          }
        },
        zoningPlan: {
          select: {
            id: true, areaName: true, notes: true, fiscalYearId: true, status: true,
            uploads: { select: { id: true, namefile: true, url: true, fileType: true } }
          }
        },
        planProject: {
          select: {
            id: true, name: true, category: true, fiscalYearId: true, status: true, budget: true,
            supervisor: true, startDate: true, endDate: true,
            uploads: { select: { id: true, namefile: true, url: true, fileType: true } }
          }
        },
        approvedProject: {
          select: {
            id: true, title_project: true, category: true, fiscalYearId: true, status: true, budget: true,
            supervisor: true,
            uploads: { select: { id: true, namefile: true, url: true, fileType: true } }
          }
        },
        buildpaln: {
          select: {
            id: true, areabuild: true, notes: true,
            uploads: { select: { id: true, namefile: true, url: true, fileType: true } }
          }
        }
      }
    })

    // รวบรวม fiscalYearId ที่ใช้ เพื่อ lookup ปี
    const fyIds = [...new Set(maps.flatMap(m => [
      m.buildingControl?.fiscalYearId,
      m.riskZone?.fiscalYearId,
      m.zoningPlan?.fiscalYearId,
      m.planProject?.fiscalYearId,
      m.approvedProject?.fiscalYearId
    ].filter(Boolean)))]

    let fyMap = {}
    if (fyIds.length) {
      const fys = await prisma.fiscalYear.findMany({
        where: { id: { in: fyIds } },
        select: { id: true, year: true }
      })
      fyMap = Object.fromEntries(fys.map(f => [f.id, f.year]))
    }

    // แยกข้อมูลเป็น markers และ layers
    const markers = []
    const layers = { riskZone: [], zoningPlan: [], planProject: [], approvedProject: [], buildPlan: [] }

    maps.forEach(m => {
      // รวม uploads จากทุก relation + deduplicate
      const allUploads = [
        ...(m.directUploads || []),
        ...(m.buildingControl?.uploads || []),
        ...(m.riskZone?.uploads || []),
        ...(m.zoningPlan?.uploads || []),
        ...(m.planProject?.uploads || []),
        ...(m.approvedProject?.uploads || []),
        ...(m.buildpaln?.uploads || [])
      ]
      const seenUploadIds = new Set()
      const uploads = allUploads.filter(u => { if (seenUploadIds.has(u.id)) return false; seenUploadIds.add(u.id); return true })

      const base = {
        mapId: m.id,
        latitude: m.latitude,
        longitude: m.longitude,
        name_local: m.name_local,
        house_no: m.house_no,
        address: m.address,
        colors: m.colors,
        geoJsonData: m.geoJsonData,
        image_before: m.image_before,
        image_after: m.image_after,
        uploads
      }

      if (m.buildingControlId && m.buildingControl) {
        const yr = fyMap[m.buildingControl.fiscalYearId]
        markers.push({ ...base, type: 'buildingControl', year: yr,
          buildingControl: { ...m.buildingControl, year: yr } })
      }
      if (m.riskZoneId && m.riskZone) {
        const yr = fyMap[m.riskZone.fiscalYearId]
        layers.riskZone.push({ ...base, type: 'riskZone', year: yr,
          riskZone: { ...m.riskZone, year: yr } })
      }
      if (m.zoningPlanId && m.zoningPlan) {
        const yr = fyMap[m.zoningPlan.fiscalYearId]
        layers.zoningPlan.push({ ...base, type: 'zoningPlan', year: yr,
          zoningPlan: { ...m.zoningPlan, year: yr } })
      }
      if (m.planProjectId && m.planProject) {
        const yr = fyMap[m.planProject.fiscalYearId]
        layers.planProject.push({ ...base, type: 'planProject', year: yr,
          planProject: { ...m.planProject, year: yr } })
      }
      if (m.approvedProjectId && m.approvedProject) {
        const yr = fyMap[m.approvedProject.fiscalYearId]
        layers.approvedProject.push({ ...base, type: 'approvedProject', year: yr,
          approvedProject: { ...m.approvedProject, year: yr } })
      }
      if (m.palnbuildId && m.buildpaln) {
        layers.buildPlan.push({ ...base, type: 'buildPlan', buildPlan: m.buildpaln })
      }
    })

    res.json({
      success: true,
      markers,
      layers,
      total: maps.length,
      filterYear: year !== undefined && year !== '' ? parseInt(year, 10) : null
    })
  } catch (error) {
    console.error('Map filter error:', error)
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูล', error: error.message })
  }
})

export default router