// Mocked Data - TODO: Replace with real API/Prisma data
export const OWNERS = [
  { value: 'all', label: 'เจ้าของทั้งหมด' },
  { value: 'o1', label: 'บริษัท เอ' },
  { value: 'o2', label: 'คุณ บี' },
]

export const USERS = [
  { value: 'all', label: 'ผู้ใช้งานทั้งหมด' },
  { value: 'u1', label: 'เจ้าหน้าที่ 1' },
  { value: 'u2', label: 'เจ้าหน้าที่ 2' },
]

// ประเภทเอกสารตามที่ระบุ
export const DOC_TYPES = [
  'งานควบคุมอาคาร',
  'งานระวางสาธารณะ',
  'ผังเมือง',
  'แผนโครงการ',
  'โครงการ อนุมัติ',
]

// ตัวอย่างรายการอัปโหลด (ownerId, userId, type)
export const UPLOADS = [
  { id: 1, ownerId: 'o1', userId: 'u1', type: 'งานควบคุมอาคาร' },
  { id: 2, ownerId: 'o1', userId: 'u1', type: 'ผังเมือง' },
  { id: 3, ownerId: 'o2', userId: 'u2', type: 'งานระวางสาธารณะ' },
  { id: 4, ownerId: 'o1', userId: 'u2', type: 'โครงการ อนุมัติ' },
  { id: 5, ownerId: 'o2', userId: 'u1', type: 'แผนโครงการ' },
  { id: 6, ownerId: 'o2', userId: 'u2', type: 'ผังเมือง' },
]

// ตัวอย่างตำแหน่ง marker (ownerId, count)
export const LOCATION_MARKERS = [
  { ownerId: 'o1', count: 12 },
  { ownerId: 'o2', count: 7 },
]

// UI Constants
export const pageHeaderHeight = 74
export const pageHeaderPaddingY = 24
export const pageHeaderPaddingX = 250
