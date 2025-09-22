import express from 'express'
import { createPrismaClient } from '../config/database.js'

const router = express.Router()
const prisma = createPrismaClient()

/**
 * @swagger
 * components:
 *   schemas:
 *     Map:
 *       type: object
 *       required:
 *         - id
 *         - name_local
 *         - latitude
 *         - longitude
 *       properties:
 *         id:
 *           type: integer
 *           description: ID ของ Map
 *         name_local:
 *           type: string
 *           description: ชื่อสถานที่
 *         latitude:
 *           type: number
 *           description: ละติจูด
 *         longitude:
 *           type: number
 *           description: ลองจิจูด
 *         house_no:
 *           type: string
 *           description: หมายเลขบ้าน
 *         road:
 *           type: string
 *           description: ถนน
 *         subdistrict:
 *           type: string
 *           description: ตำบล
 *         district:
 *           type: string
 *           description: อำเภอ
 *         province:
 *           type: string
 *           description: จังหวัด
 *         postcode:
 *           type: string
 *           description: รหัสไปรษณีย์
 *         colors:
 *           type: string
 *           description: สีที่เลือก
 *         data:
 *           type: object
 *           description: ข้อมูล GeoJSON
 *         buildingControl:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             building_type:
 *               type: string
 *             use_purpose:
 *               type: string
 *             license_number:
 *               type: string
 *             quantity:
 *               type: integer
 *             date:
 *               type: string
 *               format: date-time
 *             status:
 *               type: string
 *         fiscalYear:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             year:
 *               type: integer
 *             detail:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     MapResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Map'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             limit:
 *               type: integer
 *             offset:
 *               type: integer
 *             hasMore:
 *               type: boolean
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: ข้อความข้อผิดพลาด
 */

/**
 * @swagger
 * /api/maps:
 *   get:
 *     summary: ดึงข้อมูล Map พร้อม join BuildingControl และ FiscalYear
 *     tags: [Maps]
 *     parameters:
 *       - in: query
 *         name: fiscalYear
 *         schema:
 *           type: integer
 *         description: กรองตามปีงบประมาณ
 *       - in: query
 *         name: buildingType
 *         schema:
 *           type: string
 *         description: กรองตามประเภทอาคาร
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: กรองตามสถานะอาคาร
 *       - in: query
 *         name: programId
 *         schema:
 *           type: integer
 *         description: กรองตามโครงการ
 *       - in: query
 *         name: latMin
 *         schema:
 *           type: number
 *         description: ละติจูดต่ำสุด (bounding box)
 *       - in: query
 *         name: latMax
 *         schema:
 *           type: number
 *         description: ละติจูดสูงสุด (bounding box)
 *       - in: query
 *         name: lngMin
 *         schema:
 *           type: number
 *         description: ลองจิจูดต่ำสุด (bounding box)
 *       - in: query
 *         name: lngMax
 *         schema:
 *           type: number
 *         description: ลองจิจูดสูงสุด (bounding box)
 *       - in: query
 *         name: distance
 *         schema:
 *           type: integer
 *         description: ระยะทางสูงสุดจากจุด reference
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: ค้นหาข้อความ (name_local, road, house_no)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: จำนวน record ต่อ page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: pagination offset
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MapResponse'
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', async (req, res) => {
  try {
    const {
      fiscalYear,
      buildingType,
      status,
      programId,
      latMin,
      latMax,
      lngMin,
      lngMax,
      distance,
      search,
      limit = 100,
      offset = 0
    } = req.query

    // Build where clause
    const whereConditions = []

    // Fiscal year filter
    if (fiscalYear) {
      whereConditions.push({
        buildingControl: {
          fiscalYearId: parseInt(fiscalYear)
        }
      })
    }

    // Building type filter
    if (buildingType) {
      whereConditions.push({
        buildingControl: {
          building_type: buildingType
        }
      })
    }

    // Status filter
    if (status) {
      whereConditions.push({
        buildingControl: {
          status: status
        }
      })
    }

    // Program ID filter (if needed)
    if (programId) {
      whereConditions.push({
        OR: [
          { planProjectId: parseInt(programId) },
          { approvedProjectId: parseInt(programId) }
        ]
      })
    }

    // Bounding box filter
    if (latMin && latMax) {
      whereConditions.push({
        latitude: {
          gte: parseFloat(latMin),
          lte: parseFloat(latMax)
        }
      })
    }

    if (lngMin && lngMax) {
      whereConditions.push({
        longitude: {
          gte: parseFloat(lngMin),
          lte: parseFloat(lngMax)
        }
      })
    }

    // Search filter
    if (search) {
      whereConditions.push({
        OR: [
          { name_local: { contains: search, mode: 'insensitive' } },
          { road: { contains: search, mode: 'insensitive' } },
          { house_no: { contains: search, mode: 'insensitive' } },
          { subdistrict: { contains: search, mode: 'insensitive' } },
          { district: { contains: search, mode: 'insensitive' } },
          { province: { contains: search, mode: 'insensitive' } }
        ]
      })
    }

    // Build final where clause
    const where = whereConditions.length > 0 ? { AND: whereConditions } : {}

    // Execute query
    const [maps, total] = await Promise.all([
      prisma.map.findMany({
        where,
        include: {
          buildingControl: {
            include: {
              fiscalYear: true
            }
          },
          riskZone: {
            include: {
              fiscalYear: true
            }
          },
          zoningPlan: {
            include: {
              fiscalYear: true
            }
          },
          planProject: {
            include: {
              fiscalYear: true
            }
          },
          approvedProject: {
            include: {
              fiscalYear: true
            }
          }
        },
        skip: parseInt(offset),
        take: parseInt(limit),
        orderBy: { created_at: 'desc' }
      }),
      prisma.map.count({ where })
    ])

    // Transform data to include fiscalYear from related data
    const transformedMaps = maps.map(map => {
      const relatedData = map.buildingControl || map.riskZone || map.zoningPlan || map.planProject || map.approvedProject
      const fiscalYear = relatedData?.fiscalYear || null

      return {
        id: map.id,
        name_local: map.name_local,
        latitude: map.latitude,
        longitude: map.longitude,
        house_no: map.house_no,
        road: map.road,
        subdistrict: map.subdistrict,
        district: map.district,
        province: map.province,
        postcode: map.postcode,
        colors: map.colors,
        data: map.data,
        buildingControl: map.buildingControl ? {
          id: map.buildingControl.id,
          building_type: map.buildingControl.building_type,
          use_purpose: map.buildingControl.use_purpose,
          license_number: map.buildingControl.license_number,
          quantity: map.buildingControl.quantity,
          date: map.buildingControl.date,
          status: map.buildingControl.status
        } : null,
        riskZone: map.riskZone ? {
          id: map.riskZone.id,
          name_zone: map.riskZone.name_zone,
          zoneType: map.riskZone.zoneType,
          description: map.riskZone.description,
          status: map.riskZone.status
        } : null,
        zoningPlan: map.zoningPlan ? {
          id: map.zoningPlan.id,
          areaName: map.zoningPlan.areaName,
          notes: map.zoningPlan.notes
        } : null,
        planProject: map.planProject ? {
          id: map.planProject.id,
          code: map.planProject.code,
          name: map.planProject.name,
          category: map.planProject.category,
          startDate: map.planProject.startDate,
          endDate: map.planProject.endDate,
          supervisor: map.planProject.supervisor,
          budget: map.planProject.budget,
          status: map.planProject.status,
          documentCount: map.planProject.documentCount,
          details: map.planProject.details
        } : null,
        approvedProject: map.approvedProject ? {
          id: map.approvedProject.id,
          code: map.approvedProject.code,
          name: map.approvedProject.name,
          category: map.approvedProject.category,
          supervisor: map.approvedProject.supervisor,
          budget: map.approvedProject.budget,
          status: map.approvedProject.status,
          documentCount: map.approvedProject.documentCount,
          details: map.approvedProject.details
        } : null,
        fiscalYear: fiscalYear ? {
          id: fiscalYear.id,
          year: fiscalYear.year,
          detail: fiscalYear.detail
        } : null,
        createdAt: map.created_at,
        updatedAt: map.updated_at
      }
    })

    // Calculate distance if requested (basic implementation)
    let finalMaps = transformedMaps
    if (distance && req.query.lat && req.query.lng) {
      const referenceLat = parseFloat(req.query.lat)
      const referenceLng = parseFloat(req.query.lng)
      const maxDistance = parseFloat(distance)

      finalMaps = transformedMaps.filter(map => {
        if (!map.latitude || !map.longitude) return false
        
        const mapDistance = calculateDistance(
          referenceLat, referenceLng,
          map.latitude, map.longitude
        )
        
        return mapDistance <= maxDistance
      })
    }

    res.json({
      success: true,
      data: finalMaps,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < total
      }
    })
  } catch (error) {
    console.error('Get maps error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนที่' })
  }
})

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export default router
