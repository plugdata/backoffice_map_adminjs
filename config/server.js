// ========================================
// Server Configuration
// ตั้งค่า Express server และ middleware
// ========================================

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { getLeafletDist } from '@adminjs/leaflet'
import session from 'express-session'

// ตั้งค่า __dirname สำหรับ ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ========================================
// CREATE EXPRESS APP
// ========================================

export const createExpressApp = () => {
  const app = express()
  
  // Basic middleware
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))
  
  // CORS middleware
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  })
  
  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }))
  
  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
  })
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  })
  
  return app
}

// ========================================
// STATIC FILES CONFIGURATION
// ========================================

export const setupStaticFiles = async (app) => {
  // ตั้งค่า static file serving
  app.use('/public', express.static(path.join(__dirname, '../public')))
  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))
  
  // เพิ่ม Leaflet static files
  app.use(express.static(getLeafletDist()))
  
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(__dirname, '../public/uploads')
  try {
    const fs = await import('fs')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
      console.log('📁 Created uploads directory')
    }
  } catch (error) {
    console.warn('⚠️ Could not create uploads directory:', error.message)
  }
}

// ========================================
// SERVER STARTUP
// ========================================

export const startServer = (app, port = 3001) => {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`)
    console.log(`📊 Admin Panel: http://localhost:${port}/admin`)
    console.log(`🔗 API Base URL: http://localhost:${port}/api`)
  })
  
  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully')
    server.close(() => {
      console.log('✅ Process terminated')
    })
  })
  
  return server
} 