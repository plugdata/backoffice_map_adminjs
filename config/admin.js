// ========================================
// AdminJS Configuration
// ตั้งค่า AdminJS dashboard และ resources
// ========================================

import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/prisma'
import { componentLoader } from '../utils/loder.js'
import options, { language } from '../utils/optionsResources.js'
import { createAdminResources } from '../page/index.js'
import { verifyToken } from './auth.js'

// ========================================
// AUTHENTICATION MIDDLEWARE FOR ADMINJS
// ========================================

const authenticateAdmin = async (email, password) => {
  // ตรวจสอบ token จาก localStorage (จะถูกส่งมาจาก frontend)
  const token = localStorage.getItem('authToken')
  if (!token) {
    return false
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return false
  }

  // ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึง AdminJS หรือไม่
  // ในที่นี้เราจะอนุญาตให้ทุกคนที่ login แล้วเข้าถึงได้
  return true
}

// ========================================
// CREATE ADMINJS INSTANCE
// ========================================

export const createAdminJS = (prisma) => {
  // ลงทะเบียน Prisma adapter สำหรับ AdminJS
  AdminJS.registerAdapter({ Database, Resource })

  // สร้าง AdminJS instance
  return new AdminJS({
    rootPath: '/admin',
    
    locale: {
      language,
      availableLanguages: ['en', 'th'],
    },
    ...options,
    branding: {
      companyName: 'DocFlow System',
      softwareBrothers: false, // เอาโลโก้ลิงก์ออก
      logo: false, // เอาโลโก้ภาพออก (ถ้าคุณไม่ใช้โลโก้ภาพ)
    },
    dashboard: {
      component: 'Dashboard',
    },    
    assets: {
      // เพิ่ม style admin-custom
      styles: ['../public/css/admin-custom.css'],
    },
    resources: createAdminResources(prisma),
    componentLoader,
  })
} 