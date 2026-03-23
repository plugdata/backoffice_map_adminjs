/**
 * Generic GeoJSON Routes — PlanProject, ApprovedProject, BuildPlan, ZoningPlan
 *
 * POST /api/generic-geojson/attach-map
 *   Body: { resourceType, resourceId, features[], nameLocal?, houseNo?, address? }
 *
 * GET  /api/generic-geojson/map-id/:resourceType/:resourceId
 *   Returns { mapId, lat, lng, geoJsonData }
 */

import express from 'express'
import { createPrismaClient } from '../config/database.js'

const router = express.Router()
const prisma = createPrismaClient()

// Map resourceType → Map table unique key
const RESOURCE_MAP = {
  planProject:     'planProjectId',
  approvedProject: 'approvedProjectId',
  buildPlan:       'palnbuildId',   // note: DB uses palnbuildId (legacy typo)
  zoningPlan:      'zoningPlanId',
  buildingControl: 'buildingControlId',
  riskZone:        'riskZoneId',
}

// ============================================================
// GET /api/generic-geojson/map-id/:resourceType/:resourceId
// ============================================================
router.get('/map-id/:resourceType/:resourceId', async (req, res) => {
  try {
    const { resourceType, resourceId } = req.params
    const mapField = RESOURCE_MAP[resourceType]
    if (!mapField) return res.status(400).json({ mapId: null, message: `Unknown resourceType: ${resourceType}` })

    const id  = parseInt(resourceId)
    const map = await prisma.map.findUnique({
      where: { [mapField]: id },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        geoJsonData: true,
        name_local: true,
        house_no: true,
        address: true
      }
    })

    if (!map) return res.json({ mapId: null })

    // Try to extract lat/lng from Point geometry if not stored directly
    let lat = map.latitude ? parseFloat(map.latitude) : null
    let lng = map.longitude ? parseFloat(map.longitude) : null
    if ((!lat || !lng) && map.geoJsonData) {
      const geo = map.geoJsonData
      const firstFeature = geo.type === 'Feature' ? geo
        : geo.type === 'FeatureCollection' ? geo.features?.[0]
        : null
      if (firstFeature?.geometry?.type === 'Point') {
        const [lo, la] = firstFeature.geometry.coordinates
        lat = la; lng = lo
      }
    }

    res.json({
      mapId: map.id,
      lat,
      lng,
      geoJsonData: map.geoJsonData,
      name_local: map.name_local,
      house_no: map.house_no,
      address: map.address
    })
  } catch (e) {
    res.status(500).json({ mapId: null, message: e.message })
  }
})

// ============================================================
// PATCH /api/generic-geojson/update-name
// Body: { resourceType, resourceId, nameLocal }
// Updates only name_local on the Map record
// ============================================================
router.patch('/update-name', async (req, res) => {
  try {
    const { resourceType, resourceId, nameLocal } = req.body
    const mapField = RESOURCE_MAP[resourceType]
    if (!mapField) return res.status(400).json({ success: false, message: `Unknown resourceType: ${resourceType}` })
    if (!resourceId) return res.status(400).json({ success: false, message: 'ต้องส่ง resourceId' })

    const id = parseInt(resourceId)
    const map = await prisma.map.findUnique({ where: { [mapField]: id }, select: { id: true } })
    if (!map) return res.json({ success: false, message: 'ไม่พบ map record' })

    await prisma.map.update({ where: { id: map.id }, data: { name_local: nameLocal || null } })
    res.json({ success: true, mapId: map.id })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
})

// ============================================================
// GET /api/generic-geojson/db-geojson/:resourceType
// Returns all Map records for the given resourceType as FeatureCollection
// ============================================================
router.get('/db-geojson/:resourceType', async (req, res) => {
  try {
    const { resourceType } = req.params
    const mapField = RESOURCE_MAP[resourceType]
    if (!mapField) return res.status(400).json({ error: `Unknown resourceType: ${resourceType}` })

    const maps = await prisma.map.findMany({
      where: { [mapField]: { not: null } },
      select: { id: true, [mapField]: true, geoJsonData: true, name_local: true, colors: true }
    })

    const features = maps
      .filter(m => m.geoJsonData)
      .flatMap(m => {
        const geo = m.geoJsonData
        const stroke = m.colors || '#3388ff'
        const sharedMeta = { _mapId: m.id, _resourceId: m[mapField], name_local: m.name_local, stroke, 'stroke-opacity': 1, 'fill-opacity': 0 }

        // Expand FeatureCollection into individual features
        const rawList = geo.type === 'FeatureCollection'
          ? (geo.features || [])
          : [geo.type === 'Feature' ? geo : { type: 'Feature', properties: {}, geometry: geo }]

        return rawList
          .filter(f => f?.geometry)
          .map((f, idx) => {
            const baseProps = f.properties || {}
            return {
              type: 'Feature',
              properties: { ...baseProps, ...sharedMeta, name_local: baseProps.name || m.name_local },
              geometry: f.geometry
            }
          })
      })
      .filter(f => f.geometry)

    res.json({ type: 'FeatureCollection', features })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ============================================================
// POST /api/generic-geojson/attach-map
// ============================================================
router.post('/attach-map', async (req, res) => {
  try {
    const { resourceType, resourceId, features, feature, nameLocal, houseNo, address } = req.body

    const mapField = RESOURCE_MAP[resourceType]
    if (!mapField) return res.status(400).json({ success: false, message: `Unknown resourceType: ${resourceType}` })
    if (!resourceId) return res.status(400).json({ success: false, message: 'ต้องส่ง resourceId' })

    const id = parseInt(resourceId)

    const featureList = Array.isArray(features) && features.length > 0
      ? features
      : feature?.geometry ? [feature]
      : []

    if (!featureList.length) {
      return res.status(400).json({ success: false, message: 'ต้องส่ง features[] หรือ feature' })
    }

    const validFeatures = featureList.filter(f => f.geometry)
    if (!validFeatures.length) {
      return res.status(400).json({ success: false, message: 'features ไม่มี geometry' })
    }

    const p0 = validFeatures[0].properties || {}
    const name_local = nameLocal || p0.name || p0.name_local || null
    const house_no   = houseNo   || p0.house_no || null
    const addr       = address   || p0.address  || null
    const colors     = p0.stroke || p0.color || '#3388ff'

    // Extract lat/lng from first Point geometry
    let latitude  = null
    let longitude = null
    const firstGeom = validFeatures[0].geometry
    if (firstGeom?.type === 'Point') {
      longitude = firstGeom.coordinates[0]
      latitude  = firstGeom.coordinates[1]
    }

    const geoJsonData = validFeatures.length === 1
      ? { type: 'Feature', properties: validFeatures[0].properties || {}, geometry: validFeatures[0].geometry }
      : { type: 'FeatureCollection', features: validFeatures.map(f => ({ type: 'Feature', properties: f.properties || {}, geometry: f.geometry })) }

    const updateData = { geoJsonData, colors, name_local, house_no, address: addr }
    if (latitude !== null)  updateData.latitude  = latitude
    if (longitude !== null) updateData.longitude = longitude

    const map = await prisma.map.upsert({
      where:  { [mapField]: id },
      update: updateData,
      create: { [mapField]: id, ...updateData }
    })

    res.json({
      success: true,
      mapId: map.id,
      resourceType,
      resourceId: id,
      featuresCount: validFeatures.length
    })
  } catch (e) {
    console.error('[generic-geojson/attach-map]', e)
    res.status(500).json({ success: false, message: e.message })
  }
})

export default router
