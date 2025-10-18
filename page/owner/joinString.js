/* 
 
export async function joinString (response) {

    if (!response.records) return response

    response.records = response.records.map(r => {
      r.params.address = `${r.params.road || ''} ${r.params.subdistrict || ''} ${r.params.district || ''} ${r.params.province || ''} ${r.params.postcode || ''}`.trim()
      return r
    })
  
    return response
}
const districts = [
  {
    id: 1,
    district_code: "100101",
    province: "กรุงเทพมหานคร",
    amphoe: "พระนคร",
    district: "พระบรมมหาราชวัง",
    zipcode: "10200",
    province_code: "10",
    amphoe_code: "1001"
  },
  {
    id: 2,
    district_code: "100102",
    province: "กรุงเทพมหานคร",
    amphoe: "พระนครเหนือ",
    district: "วังบูรพาภิรมย์",
    zipcode: "10200",
    province_code: "11",
    amphoe_code: "1001"
  },
  {
    id: 3,
    district_code: "100201",
    province: "กรุงเทพมหานคsssssss",
    amphoe: "พระนครใต้",
    district: "ดุสิต",
    zipcode: "10300",
    province_code: "12",
    amphoe_code: "1002"
  }
]

export async function getProvinces() {
  return [
    ...new Map(
      districts.map(d => [d.province_code, {
        value: d.province_code,
        label: d.province
      }])
    ).values()
  ]
}

export async function getAmphoes(provinceCode, amphoeCode, districtCode) {
  let filtered = districts

  if (provinceCode) {
    filtered = filtered.filter(d => d.province_code === provinceCode)
  }

  if (districtCode) {
    filtered = filtered.filter(d => d.amphoe_code === districtCode)
  }
if (amphoeCode) {
    filtered = filtered.filter(d => d.amphoe_code === amphoeCode)
  }
  return [
    ...new Map(
      filtered.map(d => [
        d.amphoe_code,
        { value: d.amphoe_code, label: d.amphoe },
      ])
    ).values(),
  ]
}


export async function getDistricts(amphoeCode, districtCode) {
  let filtered = districts


  if (amphoeCode) {
    filtered = filtered.filter(d => d.amphoe_code === amphoeCode)
  }

  
  if (districtCode) {
    filtered = filtered.filter(d => d.district_code === districtCode)
  }

  return [
    ...new Map(
      filtered.map(d => [
        d.district_code,
        { value: d.district_code, label: d.district },
      ])
    ).values(),
  ]
}

 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// รวม address
export async function joinString (response) {

  if (!response.records) return response

  response.records = response.records.map(r => {
    r.params.address = `${r.params.road || ''} ${r.params.subdistrict || ''} ${r.params.district || ''} ${r.params.province || ''} ${r.params.postcode || ''}`.trim()
    return r
  })

  return response
}

// ✅ ดึงจังหวัดทั้งหมด (unique)
export async function getProvinces() {
  const rows = await prisma.districts.findMany({
    select: {
      province_code: true,
      province: true
    },
    distinct: ['province_code'],
    orderBy: { province_code: 'asc' }
  })

  return rows.map(r => ({
    value: r.province_code,
    label: r.province
  }))
}

// ✅ ดึงอำเภอตามจังหวัด
export async function getAmphoes(provinceCode, amphoeCode, districtCode) {
  const where = {}
  if (provinceCode) where.province_code = provinceCode
  if (amphoeCode) where.amphoe_code = amphoeCode
  if (districtCode) where.district_code = districtCode

  const rows = await prisma.districts.findMany({
    where,
    select: {
      amphoe_code: true,
      amphoe: true
    },
    distinct: ['amphoe_code'],
    orderBy: { amphoe_code: 'asc' }
  })

  return rows.map(r => ({
    value: r.amphoe_code,
    label: r.amphoe
  }))
}

// ✅ ดึงตำบลตามอำเภอ
export async function getDistricts(amphoeCode, districtCode) {
  const where = {}
  if (amphoeCode) where.amphoe_code = amphoeCode
  if (districtCode) where.district_code = districtCode

  const rows = await prisma.districts.findMany({
    where,
    select: {
      district_code: true,
      district: true
    },
    distinct: ['district_code'],
    orderBy: { district_code: 'asc' }
  })

  return rows.map(r => ({
    value: r.district_code,
    label: r.district
  }))
}
