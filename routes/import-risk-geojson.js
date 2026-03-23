/**
 * Import road.geojson → RiskZone + Map
 *
 * GeoJSON properties mapping:
 *   name_pro  → RiskZone.zone_code   (รหัสโครงการ เช่น "ตง.ถ.2-0001")
 *   name_road → RiskZone.zoneType    (ประเภทพื้นที่ เช่น "ถนนราชดำเนิน")
 *   geometry  → Map.geoJsonData      (LineString coordinates)
 */

import express from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { createPrismaClient } from '../config/database.js'

const router = express.Router()
const prisma = createPrismaClient()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const GEOJSON_PATH = path.join(__dirname, '../mrokupdata/road.geojson')

// ============================================================
// GET /api/risk-geojson/preview
// ดูข้อมูลใน road.geojson ก่อน import
// ============================================================
router.get('/preview', (req, res) => {
  try {
    const raw = readFileSync(GEOJSON_PATH, 'utf8')
    const geo = JSON.parse(raw)

    const summary = geo.features.map((f, i) => ({
      index: i,
      zone_code: f.properties?.name_pro || null,
      zoneType: f.properties?.name_road || null,
      geometryType: f.geometry?.type || null,
      coordCount: f.geometry?.coordinates?.length || 0,
      stroke: f.properties?.stroke || null
    }))

    res.json({
      success: true,
      total: geo.features.length,
      features: summary
    })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

// ============================================================
// GET /api/risk-geojson/query?zone_code=ตง.ถ.2-0001
// Query feature จาก road.geojson ตาม zone_code (name_pro)
// ============================================================
router.get('/query', (req, res) => {
  try {
    const { zone_code, name_road } = req.query
    const raw = readFileSync(GEOJSON_PATH, 'utf8')
    const geo = JSON.parse(raw)

    let features = geo.features

    if (zone_code) {
      features = features.filter(f =>
        f.properties?.name_pro?.toLowerCase().includes(String(zone_code).toLowerCase())
      )
    }
    if (name_road) {
      features = features.filter(f =>
        f.properties?.name_road?.toLowerCase().includes(String(name_road).toLowerCase())
      )
    }

    res.json({
      success: true,
      total: features.length,
      features: features.map(f => ({
        zone_code: f.properties?.name_pro,
        zoneType: f.properties?.name_road,
        geometry: f.geometry,
        properties: f.properties
      }))
    })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

// ============================================================
// POST /api/risk-geojson/import
// Import road.geojson ทั้งหมด หรือ filter ด้วย zone_code
// Body: { zone_code?, fiscalYearId?, status?, dryRun? }
// ============================================================
router.post('/import', async (req, res) => {
  try {
    const { zone_code, fiscalYearId, status = 'รอดำเนินการ', dryRun = false } = req.body

    const raw = readFileSync(GEOJSON_PATH, 'utf8')
    const geo = JSON.parse(raw)

    // Filter features ถ้ามี zone_code
    let features = geo.features
    if (zone_code) {
      features = features.filter(f =>
        f.properties?.name_pro === zone_code ||
        f.properties?.name_pro?.includes(zone_code)
      )
    }

    if (features.length === 0) {
      return res.json({ success: false, message: 'ไม่พบข้อมูลที่ตรงกับ zone_code ที่ระบุ' })
    }

    if (dryRun) {
      return res.json({
        success: true,
        dryRun: true,
        willCreate: features.length,
        features: features.map(f => ({
          zone_code: f.properties?.name_pro,
          zoneType: f.properties?.name_road
        }))
      })
    }

    // Import จริง
    const created = []
    const errors = []

    for (const feature of features) {
      const zoneProp = feature.properties || {}
      const featureZoneCode = zoneProp.name_pro || null
      const featureZoneType = zoneProp.name_road || 'ไม่ระบุ'

      try {
        // 1. สร้าง RiskZone
        const riskZone = await prisma.riskZone.create({
          data: {
            zone_code: featureZoneCode,
            zoneType: featureZoneType,
            description: `นำเข้าจาก road.geojson (${featureZoneCode || 'ไม่มีรหัส'})`,
            fiscalYearId: fiscalYearId ? parseInt(fiscalYearId) : null,
            status,
            owner_id: null
          }
        })

        // 2. สร้าง Map พร้อม geoJsonData
        const geoJsonFeature = {
          type: 'Feature',
          properties: zoneProp,
          geometry: feature.geometry
        }

        await prisma.map.create({
          data: {
            riskZoneId: riskZone.id,
            name_local: featureZoneType,
            geoJsonData: geoJsonFeature,
            colors: zoneProp.stroke || '#ff0000'
          }
        })

        created.push({
          riskZoneId: riskZone.id,
          zone_code: featureZoneCode,
          zoneType: featureZoneType
        })
      } catch (err) {
        errors.push({ zone_code: zoneProp.name_pro, error: err.message })
      }
    }

    res.json({
      success: true,
      created: created.length,
      errors: errors.length,
      data: created,
      errorDetails: errors.length ? errors : undefined
    })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

// ============================================================
// POST /api/risk-geojson/import-features
// Import GeoJSON features จาก client (KML แปลงแล้ว หรือ GeoJSON upload)
// Body: { features: [...], fiscalYearId?, status?, zoneTypeField?, zoneCodeField?, dryRun? }
// ============================================================
router.post('/import-features', async (req, res) => {
  try {
    const {
      features,
      fiscalYearId,
      status = 'รอดำเนินการ',
      zoneTypeField = 'name_road',  // property key → zoneType
      zoneCodeField = 'name_pro',   // property key → zone_code
      dryRun = false
    } = req.body

    if (!Array.isArray(features) || features.length === 0) {
      return res.status(400).json({ success: false, message: 'ต้องส่ง features array' })
    }

    if (dryRun) {
      return res.json({
        success: true,
        dryRun: true,
        willCreate: features.length,
        features: features.map(f => {
          const p = f.properties || {}
          return {
            zone_code: p[zoneCodeField] || p.name_pro || p.name || null,
            zoneType: p[zoneTypeField] || p.name_road || p.name || 'ไม่ระบุ',
            geometryType: f.geometry?.type || null
          }
        })
      })
    }

    const created = []
    const errors = []

    for (const feature of features) {
      const p = feature.properties || {}
      const featureZoneCode = p[zoneCodeField] || p.name_pro || p.name || null
      const featureZoneType = p[zoneTypeField] || p.name_road || p.name || 'ไม่ระบุ'

      if (!feature.geometry) {
        errors.push({ zone_code: featureZoneCode, error: 'ไม่มี geometry' })
        continue
      }

      try {
        // Transaction: ทั้ง RiskZone และ Map ต้องสำเร็จพร้อมกัน
        const result = await prisma.$transaction(async (tx) => {
          const riskZone = await tx.riskZone.create({
            data: {
              zone_code: featureZoneCode,
              zoneType: featureZoneType,
              description: `นำเข้าจากไฟล์ (${featureZoneCode || 'ไม่มีรหัส'})`,
              fiscalYearId: fiscalYearId ? parseInt(fiscalYearId) : null,
              status,
              owner_id: null
            }
          })

          const map = await tx.map.create({
            data: {
              riskZoneId: riskZone.id,
              name_local: featureZoneType,
              geoJsonData: { type: 'Feature', properties: p, geometry: feature.geometry },
              colors: p.stroke || p.color || '#ff0000'
            }
          })

          return { riskZoneId: riskZone.id, mapId: map.id }
        })

        created.push({ riskZoneId: result.riskZoneId, mapId: result.mapId, zone_code: featureZoneCode, zoneType: featureZoneType })
      } catch (err) {
        errors.push({ zone_code: featureZoneCode, error: err.message })
      }
    }

    res.json({
      success: true,
      created: created.length,
      errors: errors.length,
      data: created,
      errorDetails: errors.length ? errors : undefined
    })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

// ============================================================
// GET /api/risk-geojson/db-query
// Query RiskZone จาก database พร้อม Map (geoJsonData แยกออกมา)
// ?zone_code=ตง.ถ.2-0030&zoneType=ถนน
// ============================================================
router.get('/db-query', async (req, res) => {
  try {
    const { zone_code, zoneType, fiscalYearId } = req.query

    const where = {}
    if (zone_code) where.zone_code = { contains: String(zone_code), mode: 'insensitive' }
    if (zoneType) where.zoneType = { contains: String(zoneType), mode: 'insensitive' }
    if (fiscalYearId) where.fiscalYearId = parseInt(fiscalYearId)

    const riskZones = await prisma.riskZone.findMany({
      where,
      include: {
        maps: {
          select: {
            id: true,
            name_local: true,
            geoJsonData: true,
            colors: true,
            latitude: true,
            longitude: true
          }
        }
      },
      orderBy: { zone_code: 'asc' }
    })

    // แยก geoJsonData ออกจาก map metadata ให้ชัดเจน
    const result = riskZones.map(rz => ({
      id: rz.id,
      zone_code: rz.zone_code,
      zoneType: rz.zoneType,
      description: rz.description,
      status: rz.status,
      fiscalYearId: rz.fiscalYearId,
      // Map metadata (ไม่มี geometry)
      map: rz.maps ? {
        id: rz.maps.id,
        name_local: rz.maps.name_local,
        colors: rz.maps.colors,
        latitude: rz.maps.latitude,
        longitude: rz.maps.longitude
      } : null,
      // GeoJSON geometry แยกออกมาชัดเจน
      geometry: rz.maps?.geoJsonData ?? null
    }))

    res.json({
      success: true,
      total: result.length,
      data: result
    })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

// ============================================================
// GET /api/risk-geojson/db-geojson
// ส่งกลับเป็น FeatureCollection สำหรับ Leaflet โดยตรง
// ============================================================
router.get('/db-geojson', async (req, res) => {
  try {
    const { zone_code, fiscalYearId } = req.query

    const where = {}
    if (zone_code) where.zone_code = { contains: String(zone_code), mode: 'insensitive' }
    if (fiscalYearId) where.fiscalYearId = parseInt(fiscalYearId)

    const riskZones = await prisma.riskZone.findMany({
      where,
      include: { maps: { select: { geoJsonData: true, colors: true, name_local: true } } }
    })

    const basePropsFor = (rz) => ({
      id: rz.id,
      zone_code: rz.zone_code,
      zoneType: rz.zoneType,
      status: rz.status,
      stroke: rz.maps.colors || '#ff0000',
      'stroke-opacity': 1,
      'fill-opacity': 0
    })

    const features = riskZones
      .filter(rz => rz.maps?.geoJsonData)
      .flatMap(rz => {
        const geo = rz.maps.geoJsonData
        const baseProps = basePropsFor(rz)

        // กรณี FeatureCollection (KML ที่มีหลาย feature)
        if (geo.type === 'FeatureCollection' && Array.isArray(geo.features)) {
          return geo.features
            .filter(f => f.geometry)
            .map(f => ({
              type: 'Feature',
              properties: { ...f.properties, ...baseProps },
              geometry: f.geometry
            }))
        }

        // กรณี Feature เดี่ยว
        const geometry = geo?.geometry || geo
        if (!geometry) return []
        return [{ type: 'Feature', properties: baseProps, geometry }]
      })
      .filter(f => f.geometry)

    res.json({ type: 'FeatureCollection', features })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

// ============================================================
// POST /api/risk-geojson/attach-map
// สร้าง หรืออัปเดต Map ที่ link กับ RiskZone ที่มีอยู่แล้ว
// Body: { riskZoneId, feature }               ← single feature (road.geojson)
//    or { riskZoneId, features[], zoneTypeField?, zoneCodeField? } ← KML/GeoJSON array
// ============================================================
router.post('/attach-map', async (req, res) => {
  try {
    const { riskZoneId, feature, features, zoneTypeField = 'name_road', zoneCodeField = 'name_pro' } = req.body

    if (!riskZoneId) {
      return res.status(400).json({ success: false, message: 'ต้องส่ง riskZoneId' })
    }

    const id = parseInt(riskZoneId)

    // ── KML / GeoJSON array (ส่งพร้อมกับ form submit) ──────────────
    if (Array.isArray(features) && features.length > 0) {
      const validFeatures = features.filter(f => f.geometry)
      if (!validFeatures.length) {
        return res.status(400).json({ success: false, message: 'features ไม่มี geometry' })
      }

      const p0 = validFeatures[0].properties || {}
      const name_local = p0[zoneTypeField] || p0.name_road || p0.name || null
      const colors = p0.stroke || p0.color || '#ff0000'

      // เก็บเป็น FeatureCollection ถ้ามีหลาย feature, Feature ถ้ามีชิ้นเดียว
      const geoJsonData = validFeatures.length === 1
        ? { type: 'Feature', properties: validFeatures[0].properties || {}, geometry: validFeatures[0].geometry }
        : { type: 'FeatureCollection', features: validFeatures.map(f => ({
            type: 'Feature', properties: f.properties || {}, geometry: f.geometry
          })) }

      const map = await prisma.map.upsert({
        where: { riskZoneId: id },
        update: { geoJsonData, colors, name_local },
        create: { riskZoneId: id, geoJsonData, colors, name_local }
      })

      return res.json({ success: true, mapId: map.id, riskZoneId: id, featuresCount: validFeatures.length })
    }

    // ── Single feature (existing behaviour) ────────────────────────
    if (!feature?.geometry) {
      return res.status(400).json({ success: false, message: 'ต้องส่ง feature.geometry หรือ features[]' })
    }

    const p = feature.properties || {}
    const geoJsonData = { type: 'Feature', properties: p, geometry: feature.geometry }
    const colors = p.stroke || p.color || '#ff0000'
    const name_local = p.name_road || p.name || null

    // upsert: ถ้ามี Map อยู่แล้วให้ update ถ้ายังไม่มีให้ create
    const map = await prisma.map.upsert({
      where: { riskZoneId: id },
      update: { geoJsonData, colors, name_local },
      create: { riskZoneId: id, geoJsonData, colors, name_local }
    })

    res.json({ success: true, mapId: map.id, riskZoneId: id })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

export default router
