// ========================================
// AdminJS Configuration
// ตั้งค่า AdminJS dashboard และ resources
// ========================================

import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/prisma'
import { componentLoader } from '../utils/loder.js'
import options, { language } from '../utils/setadmin.js'
import { createAdminResources } from '../page/adminResources.js'
import { getLeafletDist } from '@adminjs/leaflet'

// ========================================
// CREATE ADMINJS INSTANCE
// ========================================

export const createAdminJS = (prisma) => {
  // ลงทะเบียน Prisma adapter สำหรับ AdminJS
  AdminJS.registerAdapter({ Database, Resource })

  // สร้าง AdminJS instance
  return new AdminJS({
    rootPath: '/admin',
    componentLoader,
    locale: {
      language,
      availableLanguages: ['en', 'th'],
    },
    ...options,
    branding: {
      companyName: 'My Admin Panel',
      softwareBrothers: false, // เอาโลโก้ลิงก์ออก
      logo: false, // เอาโลโก้ภาพออก (ถ้าคุณไม่ใช้โลโก้ภาพ)
    },
    assets: {
      // เพิ่ม Leaflet CSS สำหรับแผนที่
      styles: ['/leaflet.css'],
    },
    resources: createAdminResources(prisma),
  })
} 