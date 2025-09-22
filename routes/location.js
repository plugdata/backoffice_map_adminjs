import express from 'express'
import { createPrismaClient } from '../config/database.js'

const router = express.Router()
const prisma = createPrismaClient()

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID ของสถานที่
 *         name:
 *           type: string
 *           description: ชื่อสถานที่
 *         address:
 *           type: string
 *           description: ที่อยู่สถานที่
 *         coordinates:
 *           type: array
 *           items:
 *             type: number
 *           description: พิกัด [latitude, longitude]
 *         type:
 *           type: string
 *           description: ประเภทสถานที่ (buildingControl, zoningPlan)
 *         description:
 *           type: string
 *           description: รายละเอียดสถานที่
 *         year:
 *           type: integer
 *           description: ปีงบประมาณ
 *         yearBE:
 *           type: integer
 *           description: ปีงบประมาณ พ.ศ.
 *         currentYear:
 *           type: integer
 *           description: ปีปัจจุบัน ค.ศ.
 *         currentYearBE:
 *           type: integer
 *           description: ปีปัจจุบัน พ.ศ.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: วันที่สร้าง
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: วันที่อัปเดต
 *     LocationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Location'
 *     LocationListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Location'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             total:
 *               type: integer
 *             totalPages:
 *               type: integer
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: ข้อความข้อผิดพลาด
 */

// Helper function to convert AD to BE
function adToBE(year) {
  return year + 543
}

// Helper function to get current year
function getCurrentYear() {
  return new Date().getFullYear()
}

/**
 * @swagger
 * /api/location:
 *   get:
 *     summary: ดึงรายการสถานที่ทั้งหมด (Building Control และ Zoning Plan)
 *     tags: [Location]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: หน้าที่ต้องการ
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: จำนวนรายการต่อหน้า
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [buildingControl, zoningPlan, all]
 *           default: all
 *         description: ประเภทสถานที่
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: ปีงบประมาณ
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: ค้นหาจากชื่อหรือที่อยู่
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationListResponse'
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, type = 'all', year, search } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)
    const currentYear = getCurrentYear()
    const currentYearBE = adToBE(currentYear)
    
    // Build where clause
    const where = {}
    
    // Type filter
    if (type === 'buildingControl') {
      where.buildingControlId = { not: null }
    } else if (type === 'zoningPlan') {
      where.zoningPlanId = { not: null }
    } else if (type === 'all') {
      where.OR = [
        { buildingControlId: { not: null } },
        { zoningPlanId: { not: null } }
      ]
    }
    
    // Year filter
    if (year) {
      const yearInt = parseInt(year)
      // Get fiscal year IDs for the given year
      const fiscalYears = await prisma.fiscalYear.findMany({
        where: { year: yearInt },
        select: { id: true }
      })
      const fiscalYearIds = fiscalYears.map(fy => fy.id)
      
      where.OR = [
        ...(where.OR || []),
        { buildingControl: { fiscalYearId: { in: fiscalYearIds } } },
        { zoningPlan: { fiscalYear: { year: yearInt } } }
      ]
    }
    
    // Search filter
    if (search) {
      where.OR = [
        ...(where.OR || []),
        { name_local: { contains: search, mode: 'insensitive' } },
        { road: { contains: search, mode: 'insensitive' } },
        { subdistrict: { contains: search, mode: 'insensitive' } },
        { district: { contains: search, mode: 'insensitive' } },
        { province: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [locations, total] = await Promise.all([
      prisma.map.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' },
        include: {
          buildingControl: true,
          zoningPlan: {
            include: {
              fiscalYear: true
            }
          },
          images: true
        }
      }),
      prisma.map.count({ where })
    ])

    // Get fiscal years for building controls
    const buildingControlIds = locations
      .filter(loc => loc.buildingControl)
      .map(loc => loc.buildingControl.fiscalYearId)
    
    const fiscalYears = await prisma.fiscalYear.findMany({
      where: { id: { in: buildingControlIds } }
    })
    
    const fiscalYearMap = new Map(fiscalYears.map(fy => [fy.id, fy.year]))

    // Transform data
    const transformedLocations = locations.map(location => {
      const relatedData = location.buildingControl || location.zoningPlan
      let fiscalYear = currentYear
      
      if (location.zoningPlan?.fiscalYear?.year) {
        fiscalYear = location.zoningPlan.fiscalYear.year
      } else if (location.buildingControl?.fiscalYearId) {
        fiscalYear = fiscalYearMap.get(location.buildingControl.fiscalYearId) || currentYear
      }
      
      return {
        id: location.id,
        name: location.name_local || 'ไม่ระบุชื่อ',
        address: `${location.house_no || ''} ${location.road || ''} ตำบล${location.subdistrict || ''} อำเภอ${location.district || ''} จังหวัด${location.province || ''} ${location.postcode || ''}`.trim(),
        coordinates: [location.latitude || 0, location.longitude || 0],
        type: location.buildingControl ? 'buildingControl' : 'zoningPlan',
        description: relatedData?.description || location.name_local || '',
        year: fiscalYear,
        yearBE: adToBE(fiscalYear),
        currentYear: currentYear,
        currentYearBE: currentYearBE,
        images: location.images || [],
        createdAt: location.created_at,
        updatedAt: location.updated_at
      }
    })

    res.json({
      success: true,
      data: transformedLocations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      },
      meta: {
        currentYear,
        currentYearBE,
        filters: {
          type,
          year: year ? parseInt(year) : null,
          search: search || ''
        }
      }
    })
  } catch (error) {
    console.error('Get locations error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถานที่' })
  }
})

/**
 * @swagger
 * /api/location/{id}:
 *   get:
 *     summary: ดึงข้อมูลสถานที่ตาม ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของสถานที่
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationResponse'
 *       404:
 *         description: ไม่พบสถานที่
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const currentYear = getCurrentYear()
    const currentYearBE = adToBE(currentYear)
    
    // Validate ID
    const locationId = parseInt(id)
    if (isNaN(locationId)) {
      return res.status(400).json({ error: 'ID ต้องเป็นตัวเลข' })
    }
    
    const location = await prisma.map.findUnique({
      where: { id: locationId },
      include: {
        buildingControl: true,
        zoningPlan: {
          include: {
            fiscalYear: true
          }
        }
      }
    })

    if (!location) {
      return res.status(404).json({ error: 'ไม่พบสถานที่' })
    }

    const relatedData = location.buildingControl || location.zoningPlan
    let fiscalYear = currentYear
    
    // Get fiscal year from related data
    if (location.zoningPlan?.fiscalYear?.year) {
      fiscalYear = location.zoningPlan.fiscalYear.year
    } else if (location.buildingControl?.fiscalYearId) {
      // For BuildingControl, we need to get fiscal year separately
      const fiscalYearData = await prisma.fiscalYear.findUnique({
        where: { id: location.buildingControl.fiscalYearId }
      })
      if (fiscalYearData) {
        fiscalYear = fiscalYearData.year
      }
    }
    
    const transformedLocation = {
        id: location.id,
        name: location.name_local || 'ไม่ระบุชื่อ',
        address: `${location.house_no || ''} ${location.road || ''} ตำบล${location.subdistrict || ''} อำเภอ${location.district || ''} จังหวัด${location.province || ''} ${location.postcode || ''}`.trim(),
        coordinates: [location.latitude || 0, location.longitude || 0],
      type: location.buildingControl ? 'buildingControl' : 'zoningPlan',
        description: relatedData?.description || location.name_local || '',
      year: fiscalYear,
      yearBE: adToBE(fiscalYear),
      currentYear: currentYear,
      currentYearBE: currentYearBE,
        createdAt: location.created_at,
        updatedAt: location.updated_at
      }

    res.json({
      success: true,
      data: transformedLocation,
      meta: {
        currentYear,
        currentYearBE
      }
    })
  } catch (error) {
    console.error('Get location error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถานที่' })
  }
})

/**
 * @swagger
 * /api/location/search:
 *   get:
 *     summary: ค้นหาสถานที่แบบละเอียด
 *     tags: [Location]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: คำค้นหา (ชื่อสถานที่, ที่อยู่)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [buildingControl, zoningPlan, all]
 *           default: all
 *         description: ประเภทสถานที่
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: ปีงบประมาณ
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *         description: จังหวัด
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *         description: อำเภอ
 *       - in: query
 *         name: subdistrict
 *         schema:
 *           type: string
 *         description: ตำบล
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: หน้าที่ต้องการ
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: จำนวนรายการต่อหน้า
 *     responses:
 *       200:
 *         description: ค้นหาสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationListResponse'
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search', async (req, res) => {
  try {
    const { 
      q, type = 'all', year, province, district, subdistrict, 
      page = 1, limit = 10 
    } = req.query
    
    const skip = (parseInt(page) - 1) * parseInt(limit)
    const currentYear = getCurrentYear()
    const currentYearBE = adToBE(currentYear)
    
    // Build where clause for search
    const where = {}
    
    // Text search
    if (q) {
      where.OR = [
        { name_local: { contains: q, mode: 'insensitive' } },
        { road: { contains: q, mode: 'insensitive' } },
        { subdistrict: { contains: q, mode: 'insensitive' } },
        { district: { contains: q, mode: 'insensitive' } },
        { province: { contains: q, mode: 'insensitive' } }
      ]
    }
    
    // Type filter
    if (type === 'buildingControl') {
      where.buildingControlId = { not: null }
    } else if (type === 'zoningPlan') {
      where.zoningPlanId = { not: null }
    } else if (type === 'all') {
      where.OR = [
        ...(where.OR || []),
        { buildingControlId: { not: null } },
        { zoningPlanId: { not: null } }
      ]
    }
    
    // Location filters
    if (province) where.province = { contains: province, mode: 'insensitive' }
    if (district) where.district = { contains: district, mode: 'insensitive' }
    if (subdistrict) where.subdistrict = { contains: subdistrict, mode: 'insensitive' }
    
    // Year filter (from related data)
    if (year) {
      const yearInt = parseInt(year)
      // Get fiscal year IDs for the given year
      const fiscalYears = await prisma.fiscalYear.findMany({
        where: { year: yearInt },
        select: { id: true }
      })
      const fiscalYearIds = fiscalYears.map(fy => fy.id)
      
      where.OR = [
        ...(where.OR || []),
        { buildingControl: { fiscalYearId: { in: fiscalYearIds } } },
        { zoningPlan: { fiscalYear: { year: yearInt } } }
      ]
    }

    const [locations, total] = await Promise.all([
      prisma.map.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' },
        include: {
          buildingControl: true,
          zoningPlan: {
            include: {
              fiscalYear: true
            }
          },
          images: true
        }
      }),
      prisma.map.count({ where })
    ])

    // Get fiscal years for building controls
    const buildingControlIds = locations
      .filter(loc => loc.buildingControl)
      .map(loc => loc.buildingControl.fiscalYearId)
    
    const fiscalYears = await prisma.fiscalYear.findMany({
      where: { id: { in: buildingControlIds } }
    })
    
    const fiscalYearMap = new Map(fiscalYears.map(fy => [fy.id, fy.year]))

    // Transform data to match the required format
    const transformedLocations = locations.map(location => {
      const relatedData = location.buildingControl || location.zoningPlan
      let fiscalYear = currentYear
      
      if (location.zoningPlan?.fiscalYear?.year) {
        fiscalYear = location.zoningPlan.fiscalYear.year
      } else if (location.buildingControl?.fiscalYearId) {
        fiscalYear = fiscalYearMap.get(location.buildingControl.fiscalYearId) || currentYear
      }
      
      return {
        id: location.id,
        name: location.name_local || 'ไม่ระบุชื่อ',
        address: `${location.house_no || ''} ${location.road || ''} ตำบล${location.subdistrict || ''} อำเภอ${location.district || ''} จังหวัด${location.province || ''} ${location.postcode || ''}`.trim(),
        coordinates: [location.latitude || 0, location.longitude || 0],
        type: location.buildingControl ? 'buildingControl' : 'zoningPlan',
        description: relatedData?.description || location.name_local || '',
        year: fiscalYear,
        yearBE: adToBE(fiscalYear),
        currentYear: currentYear,
        currentYearBE: currentYearBE,
        createdAt: location.created_at,
        updatedAt: location.updated_at
      }
    })

    res.json({
      success: true,
      data: transformedLocations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      },
      meta: {
        currentYear,
        currentYearBE,
        filters: {
          q: q || '',
          type,
          year: year ? parseInt(year) : null,
          province: province || '',
          district: district || '',
          subdistrict: subdistrict || ''
        }
      }
    })
  } catch (error) {
    console.error('Search locations error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการค้นหาสถานที่' })
  }
})

/**
 * @swagger
 * /api/location/stats:
 *   get:
 *     summary: ดึงสถิติข้อมูลสถานที่
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalLocations:
 *                       type: integer
 *                     buildingControlCount:
 *                       type: integer
 *                     zoningPlanCount:
 *                       type: integer
 *                     currentYear:
 *                       type: integer
 *                     currentYearBE:
 *                       type: integer
 *                     yearStats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           year:
 *                             type: integer
 *                           yearBE:
 *                             type: integer
 *                           count:
 *                             type: integer
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/stats', async (req, res) => {
  try {
    const currentYear = getCurrentYear()
    const currentYearBE = adToBE(currentYear)
    
    // Get counts
    const [totalLocations, buildingControlCount, zoningPlanCount] = await Promise.all([
      prisma.map.count({
        where: {
          OR: [
            { buildingControlId: { not: null } },
            { zoningPlanId: { not: null } }
          ]
        }
      }),
      prisma.map.count({ where: { buildingControlId: { not: null } } }),
      prisma.map.count({ where: { zoningPlanId: { not: null } } })
    ])
    
    // Get year statistics
    const yearStats = await prisma.fiscalYear.findMany({
      select: {
        year: true,
        _count: {
          select: {
            zoningPlan: true
          }
        }
      },
      orderBy: { year: 'desc' }
    })
    
    // Get building control counts by fiscal year
    const buildingControlStats = await prisma.buildingControl.groupBy({
      by: ['fiscalYearId'],
      _count: {
        id: true
      }
    })
    
    // Get fiscal years for building controls
    const buildingControlFiscalYears = await prisma.fiscalYear.findMany({
      where: { id: { in: buildingControlStats.map(stat => stat.fiscalYearId) } }
    })
    
    const buildingControlYearMap = new Map(
      buildingControlStats.map(stat => [
        stat.fiscalYearId, 
        stat._count.id
      ])
    )
    
    const fiscalYearMap = new Map(
      buildingControlFiscalYears.map(fy => [fy.id, fy.year])
    )
    
    // Combine year statistics
    const allYears = new Set()
    yearStats.forEach(stat => allYears.add(stat.year))
    buildingControlFiscalYears.forEach(fy => allYears.add(fy.year))
    
    const yearStatsFormatted = Array.from(allYears).map(year => {
      const zoningPlanCount = yearStats.find(stat => stat.year === year)?._count?.zoningPlan || 0
      const buildingControlCount = buildingControlFiscalYears
        .filter(fy => fy.year === year)
        .reduce((sum, fy) => sum + (buildingControlYearMap.get(fy.id) || 0), 0)
      
      return {
        year,
        yearBE: adToBE(year),
        count: zoningPlanCount + buildingControlCount
      }
    }).sort((a, b) => b.year - a.year)

    res.json({
      success: true,
      data: {
        totalLocations,
        buildingControlCount,
        zoningPlanCount,
        currentYear,
        currentYearBE,
        yearStats: yearStatsFormatted
      }
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ' })
  }
})

/**
 * @swagger
 * /api/location/years:
 *   get:
 *     summary: ดึงรายการปีงบประมาณที่มีข้อมูล
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       year:
 *                         type: integer
 *                       yearBE:
 *                         type: integer
 *                       count:
 *                         type: integer
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/years', async (req, res) => {
  try {
    const currentYear = getCurrentYear()
    const currentYearBE = adToBE(currentYear)
    
    // Get years with data
    const [zoningPlanYears, buildingControlYears] = await Promise.all([
      prisma.fiscalYear.findMany({
        where: {
          zoningPlan: { some: {} }
        },
        select: {
          year: true,
          _count: {
            select: {
              zoningPlan: true
            }
          }
        },
      orderBy: { year: 'desc' }
      }),
      prisma.buildingControl.groupBy({
        by: ['fiscalYearId'],
        _count: {
          id: true
        }
      })
    ])
    
    // Get fiscal years for building controls
    const buildingControlFiscalYears = await prisma.fiscalYear.findMany({
      where: { id: { in: buildingControlYears.map(stat => stat.fiscalYearId) } }
    })
    
    const buildingControlYearMap = new Map(
      buildingControlYears.map(stat => [
        stat.fiscalYearId, 
        stat._count.id
      ])
    )
    
    // Combine years
    const allYears = new Set()
    zoningPlanYears.forEach(stat => allYears.add(stat.year))
    buildingControlFiscalYears.forEach(fy => allYears.add(fy.year))
    
    const yearsFormatted = Array.from(allYears).map(year => {
      const zoningPlanCount = zoningPlanYears.find(stat => stat.year === year)?._count?.zoningPlan || 0
      const buildingControlCount = buildingControlFiscalYears
        .filter(fy => fy.year === year)
        .reduce((sum, fy) => sum + (buildingControlYearMap.get(fy.id) || 0), 0)
      
      return {
        year,
        yearBE: adToBE(year),
        count: zoningPlanCount + buildingControlCount
      }
    }).sort((a, b) => b.year - a.year)

    res.json({
      success: true,
      data: yearsFormatted,
      meta: {
        currentYear,
        currentYearBE
      }
    })
  } catch (error) {
    console.error('Get years error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลปีงบประมาณ' })
  }
})

export default router
