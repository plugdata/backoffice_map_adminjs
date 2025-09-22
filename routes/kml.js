import express from 'express'
import { createPrismaClient } from '../config/database.js'
import { DOMParser } from 'xmldom'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const prisma = createPrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * @swagger
 * components:
 *   schemas:
 *     KMLData:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID ของ KML
 *         name:
 *           type: string
 *           description: ชื่อ KML
 *         description:
 *           type: string
 *           description: คำอธิบาย
 *         geojson:
 *           type: object
 *           description: ข้อมูล GeoJSON
 *         coordinates:
 *           type: array
 *           items:
 *             type: array
 *             items:
 *               type: number
 *           description: พิกัดที่แปลงแล้ว
 *         bounds:
 *           type: object
 *           properties:
 *             north:
 *               type: number
 *             south:
 *               type: number
 *             east:
 *               type: number
 *             west:
 *               type: number
 *         mapId:
 *           type: integer
 *           description: ID ของ Map ที่ผูกกับ KML
 *         createdAt:
 *           type: string
 *           format: date-time
 *     KMLResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/KMLData'
 *     KMLListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/KMLData'
 */

// Helper function to parse KML and convert to GeoJSON
function parseKMLToGeoJSON(kmlContent) {
  try {
    const parser = new DOMParser()
    const kmlDoc = parser.parseFromString(kmlContent, 'text/xml')
    
    const features = []
    const coordinates = []
    let bounds = { north: -90, south: 90, east: -180, west: 180 }
    
    // Parse Placemarks
    const placemarks = kmlDoc.getElementsByTagName('Placemark')
    
    for (let i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i]
      const name = getTextContent(placemark, 'name') || `Feature ${i + 1}`
      const description = getTextContent(placemark, 'description') || ''
      
      // Parse different geometry types
      const geometry = parseGeometry(placemark)
      if (geometry) {
        features.push({
          type: 'Feature',
          properties: { name, description },
          geometry
        })
        
        // Extract coordinates for bounds calculation
        if (geometry.type === 'LineString' && geometry.coordinates) {
          geometry.coordinates.forEach(coord => {
            coordinates.push(coord)
            updateBounds(bounds, coord[1], coord[0]) // lat, lng
          })
        } else if (geometry.type === 'Polygon' && geometry.coordinates) {
          geometry.coordinates[0].forEach(coord => {
            coordinates.push(coord)
            updateBounds(bounds, coord[1], coord[0]) // lat, lng
          })
        }
      }
    }
    
    return {
      type: 'FeatureCollection',
      features,
      coordinates,
      bounds: bounds.north === -90 ? null : bounds
    }
  } catch (error) {
    console.error('Error parsing KML:', error)
    throw new Error('ไม่สามารถแปลง KML ได้')
  }
}

// Helper function to get text content from XML element
function getTextContent(parent, tagName) {
  const element = parent.getElementsByTagName(tagName)[0]
  return element ? element.textContent : ''
}

// Helper function to parse geometry from placemark
function parseGeometry(placemark) {
  // Try LineString first
  const lineString = placemark.getElementsByTagName('LineString')[0]
  if (lineString) {
    const coordinates = parseCoordinates(lineString)
    return coordinates.length > 0 ? {
      type: 'LineString',
      coordinates
    } : null
  }
  
  // Try Polygon
  const polygon = placemark.getElementsByTagName('Polygon')[0]
  if (polygon) {
    const outerBoundary = polygon.getElementsByTagName('outerBoundaryIs')[0]
    if (outerBoundary) {
      const coordinates = parseCoordinates(outerBoundary)
      return coordinates.length > 0 ? {
        type: 'Polygon',
        coordinates: [coordinates]
      } : null
    }
  }
  
  // Try Point
  const point = placemark.getElementsByTagName('Point')[0]
  if (point) {
    const coordinates = parseCoordinates(point)
    return coordinates.length > 0 ? {
      type: 'Point',
      coordinates: coordinates[0]
    } : null
  }
  
  return null
}

// Helper function to parse coordinates from KML
function parseCoordinates(element) {
  const coordElement = element.getElementsByTagName('coordinates')[0]
  if (!coordElement) return []
  
  const coordText = coordElement.textContent.trim()
  const coords = coordText.split(/\s+/).map(coord => {
    const parts = coord.split(',')
    return [
      parseFloat(parts[0]), // longitude
      parseFloat(parts[1]), // latitude
      parseFloat(parts[2]) || 0 // altitude
    ]
  })
  
  return coords.filter(coord => !isNaN(coord[0]) && !isNaN(coord[1]))
}

// Helper function to update bounds
function updateBounds(bounds, lat, lng) {
  bounds.north = Math.max(bounds.north, lat)
  bounds.south = Math.min(bounds.south, lat)
  bounds.east = Math.max(bounds.east, lng)
  bounds.west = Math.min(bounds.west, lng)
}

/**
 * @swagger
 * /api/kml/parse:
 *   post:
 *     summary: แปลง KML เป็น GeoJSON
 *     tags: [KML]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               kmlFile:
 *                 type: string
 *                 format: binary
 *                 description: ไฟล์ KML
 *               mapId:
 *                 type: integer
 *                 description: ID ของ Map (optional)
 *               name:
 *                 type: string
 *                 description: ชื่อ KML (optional)
 *     responses:
 *       200:
 *         description: แปลงสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KMLResponse'
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
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
router.post('/parse', async (req, res) => {
  try {
    const { mapId, name } = req.body
    const kmlFile = req.files?.kmlFile
    
    if (!kmlFile) {
      return res.status(400).json({ error: 'กรุณาเลือกไฟล์ KML' })
    }
    
    // Read KML content
    const kmlContent = kmlFile.data.toString('utf8')
    
    // Parse KML to GeoJSON
    const geojson = parseKMLToGeoJSON(kmlContent)
    
    if (!geojson.features || geojson.features.length === 0) {
      return res.status(400).json({ error: 'ไม่พบข้อมูลในไฟล์ KML' })
    }
    
    // Save to database
    const kmlRecord = await prisma.kmlData.create({
      data: {
        name: name || kmlFile.name,
        description: `KML imported from ${kmlFile.name}`,
        geojson: geojson,
        coordinates: geojson.coordinates,
        bounds: geojson.bounds,
        mapId: mapId ? parseInt(mapId) : null
      }
    })
    
    res.json({
      success: true,
      data: {
        id: kmlRecord.id,
        name: kmlRecord.name,
        description: kmlRecord.description,
        geojson: kmlRecord.geojson,
        coordinates: kmlRecord.coordinates,
        bounds: kmlRecord.bounds,
        mapId: kmlRecord.mapId,
        createdAt: kmlRecord.created_at
      }
    })
  } catch (error) {
    console.error('Parse KML error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแปลง KML' })
  }
})

/**
 * @swagger
 * /api/kml/data:
 *   get:
 *     summary: ดึงรายการ KML ทั้งหมด
 *     tags: [KML]
 *     parameters:
 *       - in: query
 *         name: mapId
 *         schema:
 *           type: integer
 *         description: ID ของ Map (optional)
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
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KMLListResponse'
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/data', async (req, res) => {
  try {
    const { mapId, page = 1, limit = 10 } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const where = mapId ? { mapId: parseInt(mapId) } : {}
    
    const [kmlData, total] = await Promise.all([
      prisma.kmlData.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' },
        include: {
          map: {
            select: {
              id: true,
              name_local: true,
              latitude: true,
              longitude: true
            }
          }
        }
      }),
      prisma.kmlData.count({ where })
    ])
    
    res.json({
      success: true,
      data: kmlData,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Get KML data error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล KML' })
  }
})

/**
 * @swagger
 * /api/kml/data/{id}:
 *   get:
 *     summary: ดึงข้อมูล KML ตาม ID
 *     tags: [KML]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของ KML
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KMLResponse'
 *       404:
 *         description: ไม่พบ KML
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
router.get('/data/:id', async (req, res) => {
  try {
    const { id } = req.params
    const kmlId = parseInt(id)
    
    if (isNaN(kmlId)) {
      return res.status(400).json({ error: 'ID ต้องเป็นตัวเลข' })
    }
    
    const kmlData = await prisma.kmlData.findUnique({
      where: { id: kmlId },
      include: {
        map: {
          select: {
            id: true,
            name_local: true,
            latitude: true,
            longitude: true
          }
        }
      }
    })
    
    if (!kmlData) {
      return res.status(404).json({ error: 'ไม่พบข้อมูล KML' })
    }
    
    res.json({
      success: true,
      data: kmlData
    })
  } catch (error) {
    console.error('Get KML data error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล KML' })
  }
})

/**
 * @swagger
 * /api/kml/convert:
 *   post:
 *     summary: แปลง KML string เป็น GeoJSON
 *     tags: [KML]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kmlContent:
 *                 type: string
 *                 description: เนื้อหา KML
 *               name:
 *                 type: string
 *                 description: ชื่อ KML
 *     responses:
 *       200:
 *         description: แปลงสำเร็จ
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
 *                     geojson:
 *                       type: object
 *                     coordinates:
 *                       type: array
 *                     bounds:
 *                       type: object
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
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
router.post('/convert', async (req, res) => {
  try {
    const { kmlContent, name } = req.body
    
    if (!kmlContent) {
      return res.status(400).json({ error: 'กรุณาใส่เนื้อหา KML' })
    }
    
    // Parse KML to GeoJSON
    const geojson = parseKMLToGeoJSON(kmlContent)
    
    if (!geojson.features || geojson.features.length === 0) {
      return res.status(400).json({ error: 'ไม่พบข้อมูลใน KML' })
    }
    
    res.json({
      success: true,
      data: {
        name: name || 'KML Data',
        geojson: geojson,
        coordinates: geojson.coordinates,
        bounds: geojson.bounds
      }
    })
  } catch (error) {
    console.error('Convert KML error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแปลง KML' })
  }
})

export default router
