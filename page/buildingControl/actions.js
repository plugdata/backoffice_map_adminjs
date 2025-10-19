import { prisma } from './helpers.js'
import { layout_buildingControl } from './layout.js'
import { backButton } from '../feature/back-button.js'

export const actions_buildcontrol = {
  กลับหน้ารายการ: backButton,

  new: {
    layout: [layout_buildingControl],
    after: async (response, request) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)

      if (request.payload.latitude != null && request.payload.longitude != null) {
        const lat = parseFloat(request.payload.latitude)
        const lng = parseFloat(request.payload.longitude)
        const name_local = request.payload.name_local
        const house_no = request.payload.house_no
        const address = request.payload.address
        const geoJsonData = request.payload.geoJsonData
        const image_before = request.payload.image_before
        const image_after = request.payload.image_after

        await prisma.map.create({
          data: {
            latitude: lat,
            longitude: lng,
            name_local,
            house_no,
            address,
            geoJsonData,
            buildingControlId,
            image_before,
            image_after,
          },
        })

        console.log(`📍 Created Map record for BuildingControl ${buildingControlId}:`, {
          lat,
          lng,
          name_local,
          house_no,
          address,
          geoJsonData,
          image_before,
          image_after,
        })
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

  edit: {
    layout: [layout_buildingControl],
    after: async (response, request) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)

      if (request.payload.latitude != null && request.payload.longitude != null) {
        const lat = parseFloat(request.payload.latitude)
        const lng = parseFloat(request.payload.longitude)
        const name_local = request.payload.name_local
        const house_no = request.payload.house_no
        const address = request.payload.address
        const geoJsonData = request.payload.geoJsonData
        const image_before = request.payload.image_before
        const image_after = request.payload.image_after

        const existing = await prisma.map.findFirst({ where: { buildingControlId } })

        if (existing) {
          await prisma.map.update({
            where: { id: existing.id },
            data: {
              latitude: lat,
              longitude: lng,
              name_local,
              house_no,
              address,
              geoJsonData,
              image_before,
              image_after,
            },
          })
        } else {
          await prisma.map.create({
            data: {
              latitude: lat,
              longitude: lng,
              name_local,
              house_no,
              address,
              geoJsonData,
              buildingControlId,
              image_before,
              image_after,
            },
          })
        }

        const updatedRecord = await prisma.buildingControl.findUnique({
          where: { id: buildingControlId },
          include: { maps: true },
        })

        if (updatedRecord?.maps?.length > 0) {
          const latestMap = updatedRecord.maps[0]
          Object.assign(response.record.params, {
            latitude: latestMap.latitude,
            longitude: latestMap.longitude,
            name_local: latestMap.name_local,
            house_no: latestMap.house_no,
            address: latestMap.address,
            geoJsonData: latestMap.geoJsonData,
            image_before: latestMap.image_before,
            image_after: latestMap.image_after,
          })
        }

        console.log(`📍 Map updated for BuildingControl ${buildingControlId}:`, {
          latitude: lat,
          longitude: lng,
          name_local,
          house_no,
          address,
          geoJsonData,
          image_before,
          image_after,
        })
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

  show: {
    layout: layout_buildingControl,
    after: async (response) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)

      const mapData = await prisma.map.findFirst({
        where: { buildingControlId },
        select: {
          latitude: true,
          longitude: true,
          name_local: true,
          house_no: true,
          address: true,
          geoJsonData: true,
          image_before: true,
          image_after: true,
        },
      })

      if (mapData) {
        Object.assign(response.record.params, mapData)
        console.log(`📡 Loaded Map data for BuildingControl ${buildingControlId}:`, mapData)
      }

      return response
    },
  },

  delete: {
    after: async (response) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)
      await prisma.map.deleteMany({ where: { buildingControlId } })
      console.log(`🗑️ Deleted Map for BuildingControl ${buildingControlId}`)
      return response
    },
  },
  bulkDelete: {
    after: async (response) => {
      if (!response.records || response.records.length === 0) return response
  
      const ids = response.records.map(r => parseInt(r.id))
  
      await prisma.$transaction([
        prisma.map.deleteMany({ where: { buildingControlId: { in: ids } } }),
      ])
  
      console.log(`🗑️ Transaction: deleted Map rows for BuildingControl [${ids.join(', ')}]`)
      return response
    },
  },
}
