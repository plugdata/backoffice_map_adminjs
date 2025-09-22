// ========================================
// AdminJS Configuration
// ปิด cache ทั้งหมด (webpack + AdminJS settings)
// ========================================

import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/prisma'
import { createAdminResources } from '../page/index.js'
import { componentLoader } from './optionsResources.js'
import options from './optionsResources.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

// ✅ ปิด cache ทุกโหมด
const adminJsOptions = {
  ...options,

  // ========================================
  // BUNDLE OPTIMIZATION
  // ========================================
  bundler: {
    enabled: true, // ต้องเปิด bundler ให้ build component ได้
    webpack: {
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            adminjs: {
              test: /[\\/]node_modules[\\/]@adminjs[\\/]/,
              name: 'adminjs',
              chunks: 'all',
              priority: 10,
            },
          },
        },
        minimize: false, // ❌ ไม่บีบโค้ด เพื่อ debug ง่าย
      },
      // ❌ ปิด webpack cache ตลอด
      cache: false,
    },
  },

  // ========================================
  // ASSET OPTIMIZATION
  // ========================================
  assets: {
    styles: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      ...(options.assets?.styles || []),
    ],
    scripts: [
      ...(options.assets?.scripts || []),
    ],
  },

  // ========================================
  // CACHE SETTINGS (AdminJS internal cache)
  // ========================================
  settings: {
    cache: {
      enabled: false, // ❌ ปิด internal cache
      maxAge: 0,
    },
  },

  // ========================================
  // DATABASE CONFIGURATION
  // ========================================
  databases: [],
  resources: [],
  componentLoader: componentLoader, // ✅ ใช้ componentLoader จาก optionsResources

  // ========================================
  // UI/UX OPTIMIZATIONS
  // ========================================
  dashboard: {
    component: 'Dashboard',
  },

  branding: {
    companyName: 'ระบบจัดการอาคาร',
    logo: false,
    softwareBrothers: false,
    theme: {
      colors: {
        primary100: '#667eea',
        primary80: '#764ba2',
        primary60: '#f093fb',
        primary40: '#f5576c',
        primary20: '#4facfe',
        filterBg: '#ffffff',
        accent: '#667eea',
        hoverBg: '#f5f5f5',
      },
    },
  },

  rootPath: '/admin',
}

// ========================================
// CREATE ADMINJS INSTANCE
// ========================================
export const createAdminJS = async (prisma) => {
  AdminJS.registerAdapter({ Database, Resource })

  adminJsOptions.databases = [new Database({ client: prisma })]
  adminJsOptions.resources = createAdminResources(prisma)

  const admin = new AdminJS(adminJsOptions)

  // ไม่ preload cache
//  await preloadComponents()

  return admin
}

// ========================================
// PERFORMANCE MONITORING
// ========================================
export const monitorAdminJS = (admin) => {
  try {
    const startTime = Date.now()
    admin.watch() // ✅ dev hot reload
    const endTime = Date.now()

    console.log(`⚡ AdminJS Loading Time: ${endTime - startTime}ms`)
    console.log(`🚀 AdminJS running in ${process.env.NODE_ENV || 'development'} mode`)
    console.log(`📊 Total Resources: ${adminJsOptions.resources?.length || 0}`)
    console.log(`🔧 Component Loader Status: ${componentLoader ? 'Active' : 'Inactive'}`)
    console.log(`🌐 Locale: ${options.locale?.language || 'th'}`)
    console.log(`🎨 Theme: ${options.defaultTheme || 'default'}`)
  } catch (error) {
    console.warn('⚠️ AdminJS monitoring error:', error.message)
  }
}
