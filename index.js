// ========================================
// ไฟล์หลักของแอปพลิเคชัน Express.js
// ========================================

// Load environment variables
import dotenv from 'dotenv'
dotenv.config()
import multer from 'multer'
import compression from 'compression'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import { createExpressApp, setupStaticFiles, startServer } from './config/server.js'
import { createPrismaClient } from './config/database.js'
import { createAdminJS } from './config/admin.js'
import AdminJSExpress from '@adminjs/express'

// Routes
import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import uploadRoutes from './routes/upload.js'
import mapRoutes from './routes/maprouter.js'
import locationRoutes from './routes/location.js'
import mapsRoutes from './routes/maps.js'
import cache from './routes/cache.js'

// Swagger
import { specs, swaggerUi } from './config/swagger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const initializeApp = async () => {
  try {
    console.log('🚀 Starting Global AdminJS Application...')
    
    // Express app
    const app = createExpressApp()
    
    // Compression middleware
    app.use(compression({
      level: 6,
      threshold: 1024,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) return false
        return compression.filter(req, res)
      }
    }))
    
    /*
     * Cache headers middleware (disabled by request)
     * หมายเหตุ: ปิดการตั้งค่า Cache-Control ระดับเซิร์ฟเวอร์เพื่อหลีกเลี่ยงผลกระทบกับการเก็บ cache/cookies ของเบราว์เซอร์
     * หากต้องการเปิดใช้งานอีกครั้ง ให้เอาคอมเมนต์บล็อกนี้ออก
     */
    // app.use((req, res, next) => {
    //   if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    //     res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    //   } else if (req.path.match(/\.html$/)) {
    //     res.setHeader('Cache-Control', 'public, max-age=3600')
    //   } else if (req.path.startsWith('/api/')) {
    //     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    //     res.setHeader('Pragma', 'no-cache')
    //     res.setHeader('Expires', '0')
    //   }
    //   next()
    // })
    
    // Prisma client
    const prisma = createPrismaClient()
    
    // Static files
    await setupStaticFiles(app)
    app.use('/www', express.static('www'))
    app.use('/public', express.static('public'))
    app.use('/uploads', express.static('public/uploads'))
    app.use('/static', express.static('public'))
    
    // Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'File Upload API Documentation'
    }))

    // Routes
    app.use('/api/auth', authRoutes)
    app.use('/api/dashboard', dashboardRoutes)
    app.use('/api/upload', uploadRoutes)
    app.use('/api/location', locationRoutes)
    app.use('/api/maps', mapsRoutes)
    app.use('/api', mapRoutes)
    app.use('/tools', cache)

    app.get('/map', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'))
    })
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'))
    })
    app.get('/index', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'))
    })
    app.get('/api/info', (req, res) => {
      res.json({
        success: true,
        message: 'Global AdminJS API Server',
        version: '1.0.0',
        endpoints: {
          admin: '/admin',
          api: '/api',
          auth: '/api/auth',
          upload: '/api/upload',
          location: '/api/location',
          maps: '/api/maps',
          map: '/api/map',
          docs: '/api-docs'
        },
        timestamp: new Date().toISOString(),
      })
    })

    // ✅ Middleware no-cache สำหรับ AdminJS assets (disabled by request)
    // if (process.env.NODE_ENV !== 'production') {
    //   app.use('/admin', (req, res, next) => {
    //     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    //     res.set('Pragma', 'no-cache')
    //     res.set('Expires', '0')
    //     res.set('Surrogate-Control', 'no-store')
    //     next()
    //   })
    //   app.use('/admin/frontend', (req, res, next) => {
    //     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    //     res.set('Pragma', 'no-cache')
    //     res.set('Expires', '0')
    //     res.set('Surrogate-Control', 'no-store')
    //     next()
    //   })
    // }

    // AdminJS
    const admin = await createAdminJS(prisma)
    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    if (process.env.NODE_ENV !== 'production') {
      admin.watch()
    }

    // Monitor AdminJS
    const { monitorAdminJS } = await import('./config/admin.js')
    monitorAdminJS(admin)

    // Start server
    const PORT = process.env.PORT || 3002
    startServer(app, PORT)
    
    console.log('🎉 Application started successfully!')
    console.log(`📊 Admin Panel: http://localhost:${PORT}/admin`)
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`)
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`)
    console.log(`🌐 Main Site: http://localhost:${PORT}`)
    
  } catch (error) {
    console.error('❌ Failed to initialize application:', error)
    process.exit(1)
  }
}

// Start
initializeApp()

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  process.exit(0)
})
process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  process.exit(0)
})
