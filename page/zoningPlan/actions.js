import { prisma } from '../buildingControl/helpers.js'
//import { layout_buildingControl } from './layout.js'
import { backButton } from '../feature/back-button.js'
import layout_zoningPlan from './layout.js'
export const actions_zoningPlan = {
    กลับหน้ารายการ: backButton,

  new: {
    layout: [layout_zoningPlan],
    after: async (response, request) => {
      if (!response.record) return response
      const zoningPlanId = parseInt(response.record.id)

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
            zoningPlanId,
            image_before,
            image_after,
          },
        })

        console.log(`📍 Created Map record for ZoningPlan ${zoningPlanId}:`, {
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
    await createUploadRecords(files, zoningPlanId)
    const uploads = await getUploadRecords(zoningPlanId)
    response.record.params.uploadfile = JSON.stringify(uploads)
  }
      return response
    },
  },

  edit: {
    layout: [layout_zoningPlan],
    after: async (response, request) => {
      if (!response.record) return response
      const zoningPlanId = parseInt(response.record.id)

      if (request.payload.latitude != null && request.payload.longitude != null) {
        const lat = parseFloat(request.payload.latitude)
        const lng = parseFloat(request.payload.longitude)
        const name_local = request.payload.name_local
        const house_no = request.payload.house_no
        const address = request.payload.address
        const geoJsonData = request.payload.geoJsonData
        const image_before = request.payload.image_before
        const image_after = request.payload.image_after

        const existing = await prisma.map.findFirst({ where: { zoningPlanId } })

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
              zoningPlanId,
              image_before,
              image_after,
            },
          })
        }

        const updatedRecord = await prisma.zoningPlan.findUnique({
            where: { id: zoningPlanId },
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

        console.log(`📍 Map updated for ZoningPlan ${zoningPlanId}:`, {
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
        await deleteUploadRecords(zoningPlanId)
        const files = JSON.parse(request.payload.uploadfile)
        await createUploadRecords(files, zoningPlanId)
      }

      return response
    },
  },

  show: {
    layout: layout_zoningPlan,
    after: async (response) => {
      if (!response.record) return response
      const zoningPlanId = parseInt(response.record.id)

      const mapData = await prisma.map.findFirst({
        where: { zoningPlanId },
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
        console.log(`📡 Loaded Map data for ZoningPlan ${zoningPlanId}:`, mapData)
      }

      return response
    },
  },

  delete: {
    after: async (response) => {
      if (!response.record) return response
      const zoningPlanId = parseInt(response.record.id)
      await prisma.map.deleteMany({ where: { zoningPlanId } })
      console.log(`🗑️ Deleted Map for ZoningPlan ${zoningPlanId}`)
      return response
    },
  },
  bulkDelete: {
    after: async (response) => {
      if (!response.records || response.records.length === 0) return response
  
      const ids = response.records.map(r => parseInt(r.id))
  
      await prisma.$transaction([
        prisma.map.deleteMany({ where: { zoningPlanId: { in: ids } } }),
      ])
  
      console.log(`🗑️ Transaction: deleted Map rows for ZoningPlan [${ids.join(', ')}]`)
      return response
    },
  },
}
