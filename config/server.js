// ========================================
// Server Configuration
// ตั้งค่า Express server และ middleware
// ========================================

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { getLeafletDist } from '@adminjs/leaflet'

// ตั้งค่า __dirname สำหรับ ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ========================================
// CREATE EXPRESS APP
// ========================================

export const createExpressApp = () => {
  const app = express()
  
  // Middleware
  app.use(express.json())
  
  return app
}

// ========================================
// STATIC FILES CONFIGURATION
// ========================================

export const setupStaticFiles = (app) => {
  // ตั้งค่า static file serving
  app.use('/public', express.static(path.join(__dirname, '../public')))
  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))
  
  // เพิ่ม Leaflet static files
  app.use(express.static(getLeafletDist()))
}

// ========================================
// SERVER STARTUP
// ========================================

export const startServer = (app, port = 3001) => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`)
  })
} 