// /resources/buildingControl/helpers.js
import { createPrismaClient } from '../../config/database.js'

const prisma = createPrismaClient()

// ======================
// STATUS HELPER
// ======================
/* export async function getStatusAvailableValues() {
  const status = await prisma.status.findMany({
    select: { id: true, name_titel: true },
  })
  const status = [
    {value: '1',label: 'อนุมัติแล้ว'},
    {value: '2',label: 'กำลังตรวจสอบ'},
    {value: '3',label: 'ไม่อนุมัติ'},
    {value: '4',label: 'อยู่ระหว่างการดำเนินการ'}
  ] 
   return status.map(o => ({
   value: o.name_titel,
    label: o.name_titel,
  value: o.value,
  label: o.label,
  }))  
} */

export async function getStatusAvailableValues() {
  const status = [
    { value: '1', label: 'อนุมัติแล้ว' },
    { value: '2', label: 'กำลังตรวจสอบ' },
    { value: '3', label: 'ไม่อนุมัติ' },
    { value: '4', label: 'อยู่ระหว่างการดำเนินการ' }
  ]

  return status
}

export async function getWorkTopic() {
  const workTopics = await prisma.workTopic.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  })
  return workTopics.map(o => ({ value: o.id, label: o.name }))
}

// ✅ Dropdown รายชื่อเจ้าของ
export async function getFullname() {
  const owners = await prisma.owner.findMany({
    orderBy: { first_name: 'asc' },   // เรียงตามชื่อ
    select: {
      id: true,
      title_owner: true,
      first_name: true,
      last_name: true,
      number_no: true,
      phone: true,
    },
  })

  return owners.map(o => {
    const fullname = `${o.title_owner || ''} ${o.first_name || ''} ${o.last_name || ''}`.trim()

    let extra = ''
   
    if (o.number_no) extra += ` (${o.number_no})`
    else if (o.phone) extra += ` (${o.phone})`

    return {
      value: String(o.id),      // id ของ Owner
      label: `${fullname}${extra}`,
    }
  })
}




// ✅ Dropdown ปีงบประมาณ
export async function getFiscalYear() {
  const fiscalYears = await prisma.fiscalYear.findMany({
    select: { id: true, year: true },
    orderBy: { id: 'desc' },
  })

  return fiscalYears.map(o => ({
    value: o.id,
    label: o.year,
  }))
}

// ======================
// UPLOAD HELPERS
// ======================
export async function createUploadRecords(files, buildingControlId) {
  for (const fileData of files) {
    // Normalize various shapes coming from client
    const name =
      (typeof fileData.name === 'string' && fileData.name) ||
      (typeof fileData.namefile === 'string' && fileData.namefile) ||
      (typeof fileData.originalName === 'string' && fileData.originalName) ||
      `file_${Date.now()}`

    const url = fileData.url || fileData.publicUrl || ''
    const fileType =
      (typeof fileData.type === 'string' && fileData.type) ||
      (typeof fileData.fileType === 'string' && fileData.fileType) ||
      'application/octet-stream'

    const size = typeof fileData.size === 'number' ? fileData.size : 0

    await prisma.uploads.create({
      data: {
        namefile: name,
        url,
        fileType,
        size,
        buildingControlId,
      },
    })
  }
}

export async function deleteUploadRecords(buildingControlId) {
  await prisma.uploads.deleteMany({
    where: { buildingControlId },
  })
}

export async function getUploadRecords(buildingControlId) {
  return prisma.uploads.findMany({
    where: { buildingControlId },
    select: { namefile: true, url: true, size: true, fileType: true },
  })
}

export { prisma }
