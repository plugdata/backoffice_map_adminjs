// ======================
// helper function สำหรับ Map
// ======================
async function upsertMap(prisma, buildingControlId, payload, response) {
    if (!(payload.latitude && payload.longitude)) return
  
    const lat = parseFloat(payload.latitude)
    const lng = parseFloat(payload.longitude)
  
    // ✅ เตรียม data
    const data = {
      latitude: lat,
      longitude: lng,
      name_local: payload.name_local,
      house_no: payload.house_no,
      road: payload.road,
      subdistrict: payload.subdistrict,
      district: payload.district,
      province: payload.province,
      postcode: payload.postcode,
      buildingControlId,
    }
  
    // ✅ upsert map record
    const existing = await prisma.map.findUnique({
      where: { buildingControlId },
    })
  
    if (existing) {
      await prisma.map.update({
        where: { buildingControlId },
        data,
      })
    } else {
      await prisma.map.create({ data })
    }
  
    // ✅ sync ค่าใหม่กลับ response ให้ UI เห็นทันที
    Object.assign(response.record.params, data)
  }
  
  // ======================
  // ➕ New Document
  // ======================
  const newAction = {

    after: async (response, request) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)
  
      // save files
      if (request.payload.uploadfile) {
        const files = JSON.parse(request.payload.uploadfile)
        await createUploadRecords(files, buildingControlId)
        const uploads = await getUploadRecords(buildingControlId)
        response.record.params.uploadfile = JSON.stringify(uploads)
      }
  
      // save map
      await upsertMap(prisma, buildingControlId, request.payload, response)
  
      return response
    },
  }
  
  // ======================
  // ✏️ Edit Document
  // ======================
  const editAction = {

    after: async (response, request) => {
      if (!response.record) return response
      const buildingControlId = parseInt(response.record.id)
  
      // update files
      if (request.payload.uploadfile) {
        await deleteUploadRecords(buildingControlId)
        const files = JSON.parse(request.payload.uploadfile)
        await createUploadRecords(files, buildingControlId)
      }
  
      // update map
      await upsertMap(prisma, buildingControlId, request.payload, response)
  
      return response
    },
  }
  
  export { newAction, editAction }
  