import { prisma, createUploadRecords, getUploadRecords, deleteUploadRecords } from './helpers.js'
import { layout_buildingControl } from './layout.js'
import { backButton } from '../feature/back-button.js'

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

export const actions_buildcontrol = {
  กลับหน้ารายการ: backButton,

  // ────────────────────────────────────────────────────────────
  // NEW — สร้าง BuildingControl แล้ว upsert Map ถ้ามีข้อมูล
  // ใช้ upsert แทน create เพื่อป้องกัน unique-constraint ซ้ำ
  // ────────────────────────────────────────────────────────────
  new: {
    layout: [layout_buildingControl],
    after: async (response, request) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)

      if (hasMapData(request.payload)) {
        const mapData = extractMapPayload(request.payload)

        await prisma.map.upsert({
          where:  { buildingControlId },
          update: mapData,
          create: { ...mapData, buildingControlId },
        })
        console.log(`📍 [new] Upserted Map for BuildingControl ${buildingControlId}`)
      }

      // save files
      if (request.payload.uploadfile) {
        const files = JSON.parse(request.payload.uploadfile)
        await createUploadRecords(files, buildingControlId)
        const uploads = await getUploadRecords(buildingControlId)
        response.record.params.uploadfile = JSON.stringify(uploads)
      }

      return response
    },
  },

  // ────────────────────────────────────────────────────────────
  // EDIT — อัปเดต BuildingControl แล้ว upsert Map
  // ────────────────────────────────────────────────────────────
  edit: {
    layout: [layout_buildingControl],
    after: async (response, request) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)

      if (hasMapData(request.payload)) {
        const mapData = extractMapPayload(request.payload)

        await prisma.map.upsert({
          where:  { buildingControlId },
          update: mapData,
          create: { ...mapData, buildingControlId },
        })

        // sync ค่า Map ที่ upsert แล้วกลับ response
        const saved = await prisma.map.findUnique({ where: { buildingControlId } })
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
        console.log(`📍 [edit] Upserted Map for BuildingControl ${buildingControlId}`)
      }

      // update files
      if (request.payload.uploadfile) {
        await deleteUploadRecords(buildingControlId)
        const files = JSON.parse(request.payload.uploadfile)
        await createUploadRecords(files, buildingControlId)
      }

      return response
    },
  },

  // ────────────────────────────────────────────────────────────
  // SHOW — โหลด Map มาแสดงพร้อมกัน (lat/lng → response.record.params)
  // ────────────────────────────────────────────────────────────
  show: {
    layout: layout_buildingControl,
    after: async (response) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)

      const mapData = await prisma.map.findFirst({
        where: { buildingControlId },
        select: {
          latitude: true, longitude: true, name_local: true,
          house_no: true, address: true, geoJsonData: true,
          image_before: true, image_after: true,
        },
      })

      if (mapData) {
        Object.assign(response.record.params, mapData)
        console.log(`📡 [show] Loaded Map for BuildingControl ${buildingControlId}`)
      }

      return response
    },
  },

  // ────────────────────────────────────────────────────────────
  // DELETE — ลบ Map ก่อน (before hook) แล้วค่อยลบ BuildingControl
  // FK constraint: Map.buildingControlId → BuildingControl.id
  // ────────────────────────────────────────────────────────────
  delete: {
    before: async (request) => {
      const buildingControlId = parseInt(request.params?.recordId)
      if (!isNaN(buildingControlId)) {
        await prisma.map.deleteMany({ where: { buildingControlId } })
        console.log(`🗑️ [before delete] Deleted Map for BuildingControl ${buildingControlId}`)
      }
      return request
    },
  },

  // ────────────────────────────────────────────────────────────
  // BULK DELETE — ลบ Map ทั้งหมดก่อน (before) แล้วลบ BuildingControl
  // ────────────────────────────────────────────────────────────
  bulkDelete: {
    before: async (request) => {
      const raw = request.query?.recordIds ?? []
      const ids = (Array.isArray(raw) ? raw : String(raw).split(','))
        .map(Number)
        .filter(n => !isNaN(n) && n > 0)

      if (ids.length) {
        await prisma.$transaction([
          prisma.map.deleteMany({ where: { buildingControlId: { in: ids } } }),
        ])
        console.log(`🗑️ [before bulkDelete] Deleted Map rows for BuildingControl IDs [${ids.join(', ')}]`)
      }
      return request
    },
  },
}
