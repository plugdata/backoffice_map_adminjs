import { prisma } from '../buildingControl/helpers.js'

import { backButton } from '../feature/back-button.js'
import layout_zoneRisk from './layout.js'

// ──────────────────────────────────────────────────────────────
// Helper: ดึงฟิลด์ Map จาก payload
// ──────────────────────────────────────────────────────────────
function extractMapPayload(payload) {
  return {
    latitude:     payload.latitude     != null ? parseFloat(payload.latitude)  : undefined,
    longitude:    payload.longitude    != null ? parseFloat(payload.longitude) : undefined,
    name_local:   payload.name_local   ?? null,
    house_no:     payload.house_no     ?? null,
    address:      payload.address      ?? null,
    geoJsonData:  payload.geoJsonData  ?? null,
    image_before: payload.image_before ?? null,
    image_after:  payload.image_after  ?? null,
  }
}

// ──────────────────────────────────────────────────────────────
// Helper: เช็กว่า payload มีข้อมูล Map หรือไม่
// ──────────────────────────────────────────────────────────────
function hasMapData(payload) {
  return (
    payload.latitude     != null ||
    payload.longitude    != null ||
    payload.geoJsonData  != null ||
    payload.name_local   != null ||
    payload.address      != null
  )
}

export const actions_zoneRisk = {
  กลับหน้ารายการ: backButton,

  // ────────────────────────────────────────────────────────────
  // NEW — สร้าง RiskZone แล้ว upsert Map ถ้ามีข้อมูล
  // ใช้ upsert แทน create เพื่อป้องกัน unique-constraint ซ้ำ
  // ────────────────────────────────────────────────────────────
  new: {
    layout: [layout_zoneRisk],
    after: async (response, request) => {
      if (!response.record) return response
      const riskZoneId = parseInt(response.record.id)

      if (hasMapData(request.payload)) {
        const mapData = extractMapPayload(request.payload)

        await prisma.map.upsert({
          where:  { riskZoneId },
          update: mapData,
          create: { ...mapData, riskZoneId },
        })
        console.log(`📍 [new] Upserted Map for RiskZone ${riskZoneId}`)
      }

      // save files
      if (request.payload.uploadfile) {
        const files = JSON.parse(request.payload.uploadfile)
        await createUploadRecords(files, riskZoneId)
        const uploads = await getUploadRecords(riskZoneId)
        response.record.params.uploadfile = JSON.stringify(uploads)
      }

      return response
    },
  },

  // ────────────────────────────────────────────────────────────
  // EDIT — อัปเดต RiskZone แล้ว upsert Map ถ้ามีข้อมูล
  // ────────────────────────────────────────────────────────────
  edit: {
    layout: [layout_zoneRisk],
    after: async (response, request) => {
      if (!response.record) return response
      const riskZoneId = parseInt(response.record.id)

      if (hasMapData(request.payload)) {
        const mapData = extractMapPayload(request.payload)

        await prisma.map.upsert({
          where:  { riskZoneId },
          update: mapData,
          create: { ...mapData, riskZoneId },
        })

        // ดึง Map ที่อัปเดตแล้วมาใส่ใน response
        const saved = await prisma.map.findUnique({ where: { riskZoneId } })
        if (saved) {
          Object.assign(response.record.params, {
            latitude:     saved.latitude,
            longitude:    saved.longitude,
            name_local:   saved.name_local,
            house_no:     saved.house_no,
            address:      saved.address,
            geoJsonData:  saved.geoJsonData,
            image_before: saved.image_before,
            image_after:  saved.image_after,
          })
        }
        console.log(`📍 [edit] Upserted Map for RiskZone ${riskZoneId}`)
      }

      // update files — แก้ bug: ใช้ riskZoneId แทน buildingControlId
      if (request.payload.uploadfile) {
        await deleteUploadRecords(riskZoneId)
        const files = JSON.parse(request.payload.uploadfile)
        await createUploadRecords(files, riskZoneId)
      }

      return response
    },
  },

  // ────────────────────────────────────────────────────────────
  // SHOW — โหลด Map มาแสดงพร้อมกัน
  // ────────────────────────────────────────────────────────────
  show: {
    layout: layout_zoneRisk,
    after: async (response) => {
      if (!response.record) return response
      const riskZoneId = parseInt(response.record.id)

      const mapData = await prisma.map.findFirst({
        where: { riskZoneId },
        select: {
          latitude: true, longitude: true, name_local: true,
          house_no: true, address: true, geoJsonData: true,
          image_before: true, image_after: true,
        },
      })

      if (mapData) {
        Object.assign(response.record.params, mapData)
        console.log(`📡 [show] Loaded Map for RiskZone ${riskZoneId}`)
      }

      return response
    },
  },

  // ────────────────────────────────────────────────────────────
  // DELETE — ลบ Map ก่อน (before) แล้วค่อยลบ RiskZone
  // ต้องใช้ before hook เพราะ FK constraint จะบล็อกถ้าลบ RiskZone ก่อน
  // ────────────────────────────────────────────────────────────
  delete: {
    before: async (request) => {
      const riskZoneId = parseInt(request.params?.recordId)
      if (!isNaN(riskZoneId)) {
        await prisma.map.deleteMany({ where: { riskZoneId } })
        console.log(`🗑️ [before delete] Deleted Map for RiskZone ${riskZoneId}`)
      }
      return request
    },
  },

  // ────────────────────────────────────────────────────────────
  // BULK DELETE — ลบ Map ทั้งหมดก่อน (before) แล้วลบ RiskZone
  // ────────────────────────────────────────────────────────────
  bulkDelete: {
    before: async (request) => {
      const raw = request.query?.recordIds ?? []
      const ids = (Array.isArray(raw) ? raw : String(raw).split(','))
        .map(Number)
        .filter(n => !isNaN(n) && n > 0)

      if (ids.length) {
        await prisma.$transaction([
          prisma.map.deleteMany({ where: { riskZoneId: { in: ids } } }),
        ])
        console.log(`🗑️ [before bulkDelete] Deleted Map rows for RiskZone IDs [${ids.join(', ')}]`)
      }
      return request
    },
  },
}
