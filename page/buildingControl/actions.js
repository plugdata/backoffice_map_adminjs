// /resources/buildingControl/actions.js
import { prisma, createUploadRecords, deleteUploadRecords, getUploadRecords } from './helpers.js'
import { layout_buildingControl } from './layout.js'

/**
 * ✅ helper: parse JSON ที่อาจโดน stringify ซ้ำหลายชั้น
 */
function safeParseJson(value) {
  try {
    let parsed = value
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed)
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed) // double-stringified
      }
    }
    return parsed
  } catch (e) {
    console.warn("⚠️ safeParseJson failed:", e.message)
    return null
  }
}

const convertGeoJsonTo2D = (geoJsonData) => {
  const convertTo2D = (coords) => {
    if (!Array.isArray(coords)) return coords
    if (
      coords.length >= 2 &&
      typeof coords[0] === 'number' &&
      typeof coords[1] === 'number'
    ) {
      return [coords[0], coords[1]] // ✅ ตัด z ออก
    }
    return coords.map(convertTo2D)
  }

  console.log("📌 convertGeoJsonTo2D input type:", geoJsonData?.type)

  if (geoJsonData?.features?.length) {
    geoJsonData.features.forEach((f, i) => {
      if (f?.geometry?.coordinates) {
        f.geometry.coordinates = convertTo2D(f.geometry.coordinates)
        console.log(`✅ feature[${i}] converted →`, JSON.stringify(f.geometry.coordinates).slice(0, 200))
      }
    })
    return geoJsonData
  }

  if (geoJsonData?.type === 'Feature' && geoJsonData?.geometry?.coordinates) {
    geoJsonData.geometry.coordinates = convertTo2D(geoJsonData.geometry.coordinates)
    console.log("✅ single feature converted →", JSON.stringify(geoJsonData.geometry.coordinates).slice(0, 200))
    return geoJsonData
  }

  if (geoJsonData?.type && geoJsonData?.coordinates) {
    geoJsonData.coordinates = convertTo2D(geoJsonData.coordinates)
    console.log("✅ geometry converted →", JSON.stringify(geoJsonData.coordinates).slice(0, 200))
    return geoJsonData
  }

  return geoJsonData
}

// ✅ update geom
async function updateGeomFromGeoJSON(mapId, geoJsonInput) {
  if (!geoJsonInput) {
    console.warn("⚠️ updateGeomFromGeoJSON skipped: geoJsonInput empty")
    return
  }

  console.log("📩 updateGeomFromGeoJSON input:", 
    typeof geoJsonInput === "string"
      ? geoJsonInput.substring(0, 200) + "..."
      : JSON.stringify(geoJsonInput).substring(0, 200) + "...")

  const obj = safeParseJson(geoJsonInput)
  console.log("📌 parsed obj.type:", obj?.type)

  const cleanObj = convertGeoJsonTo2D(obj)
  const cleanGeoJson = JSON.stringify(cleanObj)

  if (cleanObj?.type === 'FeatureCollection' && (!Array.isArray(cleanObj.features) || !cleanObj.features.length)) {
    console.warn('⚠️ FeatureCollection empty. Skip geom update.')
    return
  }

  await prisma.$executeRaw`
    WITH j AS (SELECT ${cleanGeoJson}::jsonb AS j),
    g AS (
      SELECT CASE
        WHEN (j.j->>'type') = 'Feature' THEN ST_GeomFromGeoJSON( (j.j->'geometry')::text )
        WHEN (j.j->>'type') = 'FeatureCollection' THEN
          ST_UnaryUnion(
            ST_Collect(ARRAY(
              SELECT ST_GeomFromGeoJSON( (feat->'geometry')::text )
              FROM jsonb_array_elements(j.j->'features') AS feat
            ))
          )
        ELSE ST_GeomFromGeoJSON( j.j::text )
      END AS geom_raw
      FROM j
    )
    UPDATE "Map"
    SET geom = ST_SetSRID(
      ST_Force2D( ST_MakeValid( (SELECT geom_raw FROM g) ) ),
      4326
    )
    WHERE id = ${mapId};
  `
  console.log("✅ geom updated for mapId:", mapId)
}

function buildMapDataFromPayload(payload) {
  return {
    latitude: parseFloat(payload.latitude),
    longitude: parseFloat(payload.longitude),
    name_local: payload.name_local,
    house_no: payload.house_no,
    road: payload.road,
    subdistrict: payload.subdistrict,
    district: payload.district,
    province: payload.province,
    postcode: payload.postcode,
    colors: payload.colors || '#ff0000',
    data: payload.data ? safeParseJson(payload.data) : null,
  }
}

export const actions_buildcontrol = {
  new: {
    layout: [layout_buildingControl],
    after: async (response, request) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)

      if (request.payload.uploadfile) {
        const filesRaw = JSON.parse(request.payload.uploadfile)
        const files = Array.isArray(filesRaw)
          ? filesRaw.filter((f) => {
              const url = f?.url || ''
              return typeof url === 'string' && url.startsWith('/uploads/')
            })
          : []
        if (files.length > 0) {
          await createUploadRecords(files, buildingControlId)
        }
        const uploads = await getUploadRecords(buildingControlId)
        response.record.params.uploadfile = JSON.stringify(uploads)
        console.log("📌 uploadfile:", response.record.params.uploadfile)
      }

      if (request.payload.latitude != null && request.payload.longitude != null) {
        const mapRecord = await prisma.map.create({
          data: { ...buildMapDataFromPayload(request.payload), buildingControlId },
        })
        try {
          if (request.payload.data) await updateGeomFromGeoJSON(mapRecord.id, request.payload.data)
        } catch (e) {
          console.error('❌ Error updating geom (new):', e)
        }
      }
      return response
    },
  },

  edit: {
    layout: [layout_buildingControl],
    before: async (request, context) => {
      // ก่อน render form → preload map data เข้า record.params
      const recordId = context?.record?.id
      if (recordId) {
        const buildingControlId = parseInt(recordId)
        // ✅ preload รายการไฟล์เดิม เพื่อให้ฟอร์มเห็นและแก้ไขได้
        const uploads = await getUploadRecords(buildingControlId)
        console.log('🔍 [actions.js] uploads from database:', uploads)
        
        // แปลงให้ตรงกับรูปแบบที่ frontend ใช้
        const normalizedUploads = uploads.map(upload => ({
          namefile: upload.namefile,
          url: upload.url,
          size: upload.size,
          fileType: upload.fileType
        }))
        
        console.log('🔍 [actions.js] normalizedUploads:', normalizedUploads)
        request.payload.uploadfile = JSON.stringify(normalizedUploads)
        console.log('🔍 [actions.js] final uploadfile JSON:', request.payload.uploadfile)
        const mapData = await prisma.map.findFirst({
          where: { buildingControlId },
          select: {
            latitude: true,
            longitude: true,
            colors: true,
            data: true,
            name_local: true,
            house_no: true,
            road: true,
            subdistrict: true,
            district: true,
            province: true,
            postcode: true,
          },
        })
        if (mapData) {
          Object.assign(request.payload, {
            latitude: mapData.latitude,
            longitude: mapData.longitude,
            colors: mapData.colors,
            data: JSON.stringify(mapData.data), // ✅ stringify ให้ React MapField preload ได้
          })
        }
      }
      return request
    },
    after: async (response, request) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)
      const hasDataKey = Object.prototype.hasOwnProperty.call(request.payload, 'data')

      console.log("📌 [EDIT] payload received:", request.payload)
      console.log("📌 hasDataKey?", hasDataKey)

      if (hasDataKey) {
        console.log("📌 raw data (first 200 chars):",
          typeof request.payload.data === "string"
            ? request.payload.data.substring(0, 200) + "..."
            : JSON.stringify(request.payload.data).substring(0, 200) + "..."
        )
      } else {
        const dataKeys = Object.keys(request.payload).filter(k => k.startsWith("data"))
        console.log("📌 flattened keys count:", dataKeys.length)
        console.log("📌 sample flattened keys:", dataKeys.slice(0, 10))
      }

      if (request.payload.uploadfile) {
        await deleteUploadRecords(buildingControlId)
        const filesRaw = JSON.parse(request.payload.uploadfile)
        const files = Array.isArray(filesRaw)
          ? filesRaw.filter((f) => {
              const url = f?.url || ''
              return typeof url === 'string' && url.startsWith('/uploads/')
            })
          : []
        if (files.length > 0) {
          await createUploadRecords(files, buildingControlId)
        }
      }

      if (request.payload.latitude != null && request.payload.longitude != null) {
        const lat = parseFloat(request.payload.latitude)
        const lng = parseFloat(request.payload.longitude)
        console.log("📌 lat/lng parsed:", lat, lng)

        const mapData = {
          latitude: lat,
          longitude: lng,
          name_local: request.payload.name_local,
          house_no: request.payload.house_no,
          road: request.payload.road,
          subdistrict: request.payload.subdistrict,
          district: request.payload.district,
          province: request.payload.province,
          postcode: request.payload.postcode,
          colors: request.payload.colors || '#ff0000',
        }

        if (hasDataKey) {
          mapData.data = safeParseJson(request.payload.data)
          console.log("📌 mapData.data (parsed):",
            mapData.data ? JSON.stringify(mapData.data).substring(0,200) + "..." : "null")
        }

        const existing = await prisma.map.findFirst({ where: { buildingControlId } })
        let mapId
        if (existing) {
          const updated = await prisma.map.update({ where: { id: existing.id }, data: mapData })
          mapId = updated.id
          console.log("✅ map updated:", mapId)
        } else {
          const created = await prisma.map.create({ data: { ...mapData, buildingControlId } })
          mapId = created.id
          console.log("✅ map created:", mapId)
        }

        try {
          if (hasDataKey && request.payload.data) {
            await updateGeomFromGeoJSON(mapId, request.payload.data)
            console.log("✅ geom updated for mapId:", mapId)
          }
        } catch (e) {
          console.error('❌ Error updating geom (edit):', e)
        }

        Object.assign(response.record.params, { latitude: lat, longitude: lng, ...mapData })
      }
      return response
    },
  },

  show: {
    layout: layout_buildingControl,
    after: async (response) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)

      const files = await getUploadRecords(buildingControlId)
      response.record.params.uploadfile = JSON.stringify(files)

      const mapData = await prisma.map.findFirst({
        where: { buildingControlId },
        select: {
          latitude: true, longitude: true, colors: true, data: true,
          name_local: true, house_no: true, road: true, subdistrict: true,
          district: true, province: true, postcode: true,
        },
      })
      if (mapData) Object.assign(response.record.params, mapData)
      return response
    },
  },

  delete: {
    after: async (response) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)
      await deleteUploadRecords(buildingControlId)
      await prisma.map.deleteMany({ where: { buildingControlId } })
      return response
    },
  },

  bulkDelete: {
    after: async (response) => {
      if (response.records?.length) {
        const ids = response.records.map((r) => parseInt(r.id))
        await prisma.uploads.deleteMany({ where: { buildingControlId: { in: ids } } })
        await prisma.map.deleteMany({ where: { buildingControlId: { in: ids } } })
      }
      return response
    },
  },
}
