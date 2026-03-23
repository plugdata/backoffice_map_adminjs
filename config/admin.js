// ========================================
// AdminJS Configuration - Backend API Only
// ปิด UI/CSS ทั้งหมด ใช้เป็น API เท่านั้น
// ========================================

import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/prisma'
import { createAdminResources } from '../api/index.js'

// ========================================
// ADMINJS OPTIONS - API MODE
// ========================================
const adminJsOptions = {
  databases: [],
  resources: [],
  rootPath: '/admin',

  // ปิด branding/UI
  branding: {
    companyName: 'Building API',
    logo: false,
    softwareBrothers: false,
  },
}

// ========================================
// CREATE ADMINJS INSTANCE
// ========================================
export const createAdminJS = async (prisma) => {
  AdminJS.registerAdapter({ Database, Resource })

  adminJsOptions.databases = [new Database({ client: prisma })]
  adminJsOptions.resources = createAdminResources(prisma)

  const admin = new AdminJS(adminJsOptions)

  return admin
}

// ========================================
// PERFORMANCE MONITORING
// ========================================
export const monitorAdminJS = (admin) => {
  try {
    console.log(`🚀 AdminJS API running in ${process.env.NODE_ENV || 'development'} mode`)
    console.log(`📊 Total Resources: ${adminJsOptions.resources?.length || 0}`)
  } catch (error) {
    console.warn('⚠️ AdminJS monitoring error:', error.message)
  }
}
