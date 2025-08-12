// ========================================
// ไฟล์หลักของแอปพลิเคชัน Express.js
// จัดการการเริ่มต้นเซิร์ฟเวอร์และเชื่อมต่อส่วนต่างๆ
// ========================================

// Load environment variables
import dotenv from 'dotenv'
dotenv.config()

// Import configurations
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createExpressApp, setupStaticFiles, startServer } from './config/server.js'
import { createPrismaClient } from './config/database.js'
import { createAdminJS } from './config/admin.js'
import AdminJSExpress from '@adminjs/express'

// Import routes
import apiRoutes from './routes/api.js'
import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import workflowRoutes from './routes/workflow.js'

// ตั้งค่า __dirname สำหรับ ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ========================================
// APPLICATION INITIALIZATION
// ========================================

const initializeApp = async () => {
  try {
    console.log('🚀 Starting Global AdminJS Application...')
    
    // สร้าง Express app
    const app = createExpressApp()
    
    // สร้าง Prisma client
    const prisma = createPrismaClient()
    
    // ตั้งค่า static files
    await setupStaticFiles(app)
    
    // ตั้งค่า API routes
    app.use('/api', apiRoutes)
    app.use('/api/auth', authRoutes)
    app.use('/api/dashboard', dashboardRoutes)
    app.use('/api/workflow', workflowRoutes)
    
    // ตั้งค่า static files สำหรับ www folder
    app.use('/www', express.static('www'))
    
    // ตั้งค่า static files สำหรับ public folder
    app.use('/public', express.static('public'))
    
    // API-only routes - ไม่มี HTML files
    app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Global AdminJS API Server',
        version: '1.0.0',
        endpoints: {
          admin: '/admin',
          api: '/api',
          auth: '/api/auth',
          health: '/api/health',
          users: '/api/users',
          documents: '/api/documents'
        },
        timestamp: new Date().toISOString()
      })
    })
    
    app.get('/index', (req, res) => {
      res.json({
        success: true,
        message: 'Global AdminJS API Server',
        version: '1.0.0',
        endpoints: {
          admin: '/admin',
          api: '/api',
          auth: '/api/auth',
          health: '/api/health',
          users: '/api/users',
          documents: '/api/documents'
        },
        timestamp: new Date().toISOString()
      })
    })
    
    // API-only dashboard endpoint
/*     app.get('/dashboard', (req, res) => {
      res.json({
        success: true,
        message: 'DocFlow Dashboard API',
        version: '1.0.0',
        endpoints: {
          documents: '/api/documents',
          users: '/api/users',
          notifications: '/api/notifications',
          roles: '/api/roles'
        },
        timestamp: new Date().toISOString()
      })
    }) */
    
    // สร้าง AdminJS instance
    const admin = createAdminJS(prisma)
    
    // ตั้งค่า AdminJS router พร้อม authentication
    const { getAuthConfig, getSessionConfig } = await import('./middleware/adminAuth.js')
    
/*     const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
      admin,
      getAuthConfig(),
      null,
      getSessionConfig()
    ) */
    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)
    
    // เริ่มการ watch mode สำหรับ development
    admin.watch()
    
    // เริ่มต้นเซิร์ฟเวอร์
    const PORT = process.env.PORT || 3001
    startServer(app, PORT)
    
    console.log('🎉 Application started successfully!')
    console.log(`📊 Admin Panel: http://localhost:${PORT}/admin`)
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`)
    console.log(`🌐 Main Site: http://localhost:${PORT}`)
    
  } catch (error) {
    console.error('❌ Failed to initialize application:', error)
    process.exit(1)
  }
}

// ========================================
// START APPLICATION
// ========================================

// เริ่มต้นแอปพลิเคชัน
initializeApp()

// ========================================
// GRACEFUL SHUTDOWN
// ========================================

// จัดการการปิดแอปพลิเคชันอย่างปลอดภัย
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  process.exit(0)
})
