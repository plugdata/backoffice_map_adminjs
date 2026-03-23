// ========================================
// Server Configuration
// ตั้งค่า Express server และ middleware
// ========================================

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import session from 'express-session'

// ตั้งค่า __dirname สำหรับ ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ========================================
// CREATE EXPRESS APP
// ========================================

export const createExpressApp = () => {
  const app = express()

  // Middleware
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))
  app.use(cookieParser())

  // Session middleware
  app.use(session({
    name: 'adminjs', // Match AdminJS cookie name
    secret: process.env.ADMIN_COOKIE_SECRET || process.env.SESSION_SECRET || 'adminjs-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }
  }))

  return app
}

// ========================================
// STATIC FILES CONFIGURATION
// ========================================

export const setupStaticFiles = (app) => {
  // ตั้งค่า static file serving
  app.use('/public', express.static(path.join(__dirname, '../public')))
  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))
}

// ========================================
// SERVER STARTUP
// ========================================

export const startServer = (app, port = 3002) => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`)
  })
} 