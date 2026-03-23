/**
 * Building-Control GeoJSON Routes
 * คล้าย import-risk-geojson.js แต่สำหรับ BuildingControl
 *
 * POST /api/building-geojson/attach-map
 *   Body: { buildingControlId, feature }        ← single GeoJSON feature
 *      or { buildingControlId, features[] }     ← KML/GeoJSON array
 *
 * GET  /api/building-geojson/db-geojson
 *   Returns FeatureCollection ของ BuildingControl ทุก record ที่มี geoJsonData
 */

import express from 'express'
import { createPrismaClient } from '../config/database.js'

const router = express.Router()
const prisma = createPrismaClient()

// ============================================================
// GET /api/building-geojson/db-geojson
// ส่ง FeatureCollection สำหรับ Leaflet โดยตรง
// ============================================================
router.get('/db-geojson', async (req, res) => {
  try {
    const records = await prisma.buildingControl.findMany({
      include: {
        maps: {
          select: {
            geoJsonData: true,
            colors: true,
            name_local: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    })

    const features = records
      .filter(r => r.maps?.geoJsonData)
      .flatMap(r => {
        const geo = r.maps.geoJsonData
        const baseProps = {
          id: r.id,
          name_local: r.maps.name_local,
          stroke: r.maps.colors || '#3388ff',
          'stroke-opacity': 1,
          'fill-opacity': 0.2,
        }

        // กรณี FeatureCollection (KML ที่มีหลาย feature)
        if (geo.type === 'FeatureCollection' && Array.isArray(geo.features)) {
          return geo.features
            .filter(f => f.geometry)
            .map(f => ({
              type: 'Feature',
              properties: { ...f.properties, ...baseProps },
              geometry: f.geometry,
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
// GET /api/building-geojson/map-id/:buildingControlId
// ส่งคืน mapId ที่ link กับ BuildingControl
// ============================================================
router.get('/map-id/:buildingControlId', async (req, res) => {
  try {
    const id = parseInt(req.params.buildingControlId)
    const map = await prisma.map.findUnique({ where: { buildingControlId: id }, select: { id: true } })
    res.json({ mapId: map?.id || null })
  } catch (e) {
    res.status(500).json({ mapId: null, message: e.message })
  }
})

// ============================================================
// POST /api/building-geojson/attach-map
// สร้าง / อัปเดต Map ที่ link กับ BuildingControl
// Body: { buildingControlId, feature }           ← single feature
//    or { buildingControlId, features[] }        ← KML/GeoJSON array
// ============================================================
router.post('/attach-map', async (req, res) => {
  try {
    const { buildingControlId, feature, features } = req.body

    if (!buildingControlId) {
      return res.status(400).json({ success: false, message: 'ต้องส่ง buildingControlId' })
    }

    const id = parseInt(buildingControlId)

    // ── KML / GeoJSON array ────────────────────────────────────────
    if (Array.isArray(features) && features.length > 0) {
      const validFeatures = features.filter(f => f.geometry)
      if (!validFeatures.length) {
        return res.status(400).json({ success: false, message: 'features ไม่มี geometry' })
      }

      const p0 = validFeatures[0].properties || {}
      const name_local = p0.name || p0.name_local || p0.name_road || null
      const colors     = p0.stroke || p0.color || '#3388ff'

      // เก็บเป็น FeatureCollection ถ้ามีหลาย feature, Feature ถ้ามีชิ้นเดียว
      const geoJsonData =
        validFeatures.length === 1
          ? {
              type: 'Feature',
              properties: validFeatures[0].properties || {},
              geometry:   validFeatures[0].geometry,
            }
          : {
              type: 'FeatureCollection',
              features: validFeatures.map(f => ({
                type: 'Feature',
                properties: f.properties || {},
                geometry:   f.geometry,
              })),
            }

      const map = await prisma.map.upsert({
        where:  { buildingControlId: id },
        update: { geoJsonData, colors, name_local },
        create: { buildingControlId: id, geoJsonData, colors, name_local },
      })

      return res.json({
        success: true,
        mapId: map.id,
        buildingControlId: id,
        featuresCount: validFeatures.length,
      })
    }

    // ── Single feature ─────────────────────────────────────────────
    if (!feature?.geometry) {
      return res.status(400).json({
        success: false,
        message: 'ต้องส่ง feature.geometry หรือ features[]',
      })
    }

    const p = feature.properties || {}
    const geoJsonData = { type: 'Feature', properties: p, geometry: feature.geometry }
    const colors      = p.stroke || p.color || '#3388ff'
    const name_local  = p.name || p.name_local || null

    const map = await prisma.map.upsert({
      where:  { buildingControlId: id },
      update: { geoJsonData, colors, name_local },
      create: { buildingControlId: id, geoJsonData, colors, name_local },
    })

    res.json({ success: true, mapId: map.id, buildingControlId: id })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

export default router
