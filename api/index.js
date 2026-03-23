// ========================================
// AdminJS Resources - API Mode
// เปิด API endpoints ทั้งหมด (ปิดเฉพาะ UI)
// ========================================

import { getModelByName } from '@adminjs/prisma'
import { actions_buildcontrol } from './buildingControl/actions.js'
import { actions_zoneRisk }     from './zoneRisk/actions.js'

// ========================================
// Helper: Deep-merge apiOnlyMode + custom action hooks
// รวม isAccessible/isVisible กับ before/after/layout hooks
// ========================================
function mergeActions(baseActions, customActions = {}) {
  const merged = {}
  // คัดลอก base actions ทั้งหมด
  Object.entries(baseActions).forEach(([name, opts]) => {
    merged[name] = { ...opts, ...(customActions[name] || {}) }
  })
  // เพิ่ม custom actions ที่ไม่มีใน base (เช่น กลับหน้ารายการ)
  Object.entries(customActions).forEach(([name, opts]) => {
    if (!merged[name]) merged[name] = opts
  })
  return merged
}

// ========================================
// Helper: API Mode - เปิด API, ปิด UI
// ========================================
const apiOnlyMode = {
  actions: {
    // ✅ เปิด API actions ทั้งหมด (isAccessible: true)
    list: { isAccessible: true, isVisible: false },
    show: { isAccessible: true, isVisible: false },
    new: { isAccessible: true, isVisible: false },
    edit: { isAccessible: true, isVisible: false },
    delete: { isAccessible: true, isVisible: false },
    bulkDelete: { isAccessible: true, isVisible: false },
    search: { isAccessible: true, isVisible: false },
  },
}

// ========================================
// Helper: Read-Only API Mode
// ========================================
const readOnlyApiMode = {
  actions: {
    list: { isAccessible: true, isVisible: false },
    show: { isAccessible: true, isVisible: false },
    search: { isAccessible: true, isVisible: false },
    new: { isAccessible: false, isVisible: false },
    edit: { isAccessible: false, isVisible: false },
    delete: { isAccessible: false, isVisible: false },
    bulkDelete: { isAccessible: false, isVisible: false },
  },
}

// ========================================
// Helper: ซ่อน resource ทั้งหมด
// ========================================
const hiddenResource = {
  navigation: false,
  actions: {
    list: { isVisible: false, isAccessible: false },
    show: { isVisible: false, isAccessible: false },
    edit: { isVisible: false, isAccessible: false },
    delete: { isVisible: false, isAccessible: false },
    new: { isVisible: false, isAccessible: false },
    search: { isVisible: false, isAccessible: false },
  },
}

// ========================================
// ฟังก์ชันรวม resource ทั้งหมด
// ========================================
export const createAdminResources = (prisma) => {
  return [
    // ==================== ตั้งค่าระบบ ====================
    {
      resource: { model: getModelByName('User'), client: prisma },
      options: {
        id: 'User',
        navigation: { name: 'ตั้งค่าระบบ', icon: 'Settings' },
        ...apiOnlyMode,
      },
    },

    {
      resource: { model: getModelByName('FiscalYear'), client: prisma },
      options: {
        id: 'FiscalYear',
        navigation: { name: 'ตั้งค่าระบบ', icon: 'Settings' },
        ...apiOnlyMode,
      },
    },

    // ==================== เจ้าของกรรมสิทธิ์ ====================
    {
      resource: { model: getModelByName('Owner'), client: prisma },
      options: {
        id: 'Owner',
        navigation: { name: 'เจ้าของกรรมสิทธิ์', icon: 'User' },
        ...apiOnlyMode,
      },
    },

    // ==================== ฝ่ายควบคุมอาคาร ====================
    {
      resource: { model: getModelByName('BuildingControl'), client: prisma },
      options: {
        id: 'BuildingControl',
        navigation: { name: 'ฝ่ายควบคุมอาคาร', icon: 'Home' },
        actions: mergeActions(apiOnlyMode.actions, actions_buildcontrol),
      },
    },

    {
      resource: { model: getModelByName('RiskZone'), client: prisma },
      options: {
        id: 'RiskZone',
        navigation: { name: 'ฝ่ายควบคุมอาคาร', icon: 'Home' },
        actions: mergeActions(apiOnlyMode.actions, actions_zoneRisk),
      },
    },

    {
      resource: { model: getModelByName('ZoningPlan'), client: prisma },
      options: {
        id: 'ZoningPlan',
        navigation: { name: 'ฝ่ายควบคุมอาคาร', icon: 'Home' },
        ...apiOnlyMode,
      },
    },

    {
      resource: { model: getModelByName('BuildPlan'), client: prisma },
      options: {
        id: 'BuildPlan',
        navigation: { name: 'ฝ่ายควบคุมอาคาร', icon: 'Building' },
        ...apiOnlyMode,
      },
    },

    // ==================== ฝ่ายควบคุมการก่อสร้าง ====================
    {
      resource: { model: getModelByName('PlanProject'), client: prisma },
      options: {
        id: 'PlanProject',
        navigation: { name: 'ฝ่ายควบคุมการก่อสร้าง', icon: 'Home' },
        ...apiOnlyMode,
      },
    },

    {
      resource: { model: getModelByName('ApprovedProject'), client: prisma },
      options: {
        id: 'ApprovedProject',
        navigation: { name: 'ฝ่ายควบคุมการก่อสร้าง', icon: 'Home' },
        ...apiOnlyMode,
      },
    },

    // ==================== ข้อมูลแผนที่ ====================
    {
      resource: { model: getModelByName('Map'), client: prisma },
      options: {
        id: 'Map',
        navigation: { name: 'ข้อมูลแผนที่', icon: 'Map' },
        ...apiOnlyMode,
      },
    },

    // ==================== ไฟล์อัปโหลด ====================
    {
      resource: { model: getModelByName('Uploads'), client: prisma },
      options: {
        id: 'Uploads',
        navigation: { name: 'ไฟล์อัปโหลด', icon: 'Upload' },
        ...apiOnlyMode,
      },
    },

    // ==================== Hidden Resources ====================
    {
      resource: { model: getModelByName('districts'), client: prisma },
      options: {
        id: 'districts',
        ...hiddenResource,
      },
    },
  ]
}
