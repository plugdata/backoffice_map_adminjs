// ========================================
// ไฟล์หลักของแอปพลิเคชัน Express.js
// ========================================

// Load environment variables
import dotenv from 'dotenv'
dotenv.config()
import compression from 'compression'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'

import { createExpressApp, setupStaticFiles, startServer } from './config/server.js'
import { createPrismaClient } from './config/database.js'
import { createAdminJS } from './config/admin.js'
import AdminJSExpress from '@adminjs/express'
import { adminAuth } from './middleware/adminAuth.js'

// Routes
import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import uploadRoutes from './routes/upload.js'
import locationRoutes from './routes/location.js'
import mapsRoutes from './routes/maps.js'
import addressRoutes from './routes/address.js'
import testKmlImportRoutes from './routes/test-kml-import.js'
import uploadPictureRoutes from './routes/uploadpicture.js'
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
    app.use('/api/address', addressRoutes)
    app.use('/api/import-kml', testKmlImportRoutes)
    app.use('/api/upload-image', uploadPictureRoutes)
    // AdminJS logout route
/*     app.get('/admin/logout', (req, res) => {
      try {
        // ลบ session
        if (req.session) {
          req.session.destroy((err) => {
            if (err) {
              console.error('Session destroy error:', err)
            }
          })
        }
        
        // ลบ cookie
        res.clearCookie('adminjs')
        
        res.json({
          success: true,
          message: 'ออกจากระบบสำเร็จ'
        })
      } catch (error) {
        console.error('Logout error:', error)
        res.status(500).json({
          success: false,
          message: 'เกิดข้อผิดพลาดในการออกจากระบบ'
        })
      }
    }) */

    // Custom Login Handler for better error messages
/*     app.post('/admin/login', async (req, res) => {
      try {
        const { email, password } = req.body
        
        if (!email || !password) {
          return res.redirect('/admin/login?error=' + encodeURIComponent('กรุณากรอกอีเมลและรหัสผ่าน'))
        }

        // Check if user exists
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: email },
              { username: email }
            ]
          }
        })

        if (!user) {
          return res.redirect('/admin/login?error=' + encodeURIComponent('ไม่พบผู้ใช้ในระบบ กรุณาตรวจสอบอีเมลหรือชื่อผู้ใช้'))
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if (!isPasswordValid) {
          return res.redirect('/admin/login?error=' + encodeURIComponent('รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบรหัสผ่าน'))
        }

        // If valid, redirect to admin dashboard
        res.redirect('/admin')
      } catch (error) {
        console.error('Login error:', error)
        res.redirect('/admin/login?error=' + encodeURIComponent('เกิดข้อผิดพลาดในการเข้าสู่ระบบ'))
      }
    }) */

 
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
          address: '/api/address',
          testKmlImport: '/api/test-kml-import',
          docs: '/api-docs',
          uploadImage: '/api/upload-image',
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

    // Create AdminJS router with authentication
     const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
      admin,
    
      {
        authenticate: adminAuth.authenticate,
        cookieName: 'adminjs',
        cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'adminjs-secret-key',
      },
      null,
      {
        resave: false,
        saveUninitialized: true,
        secret: process.env.ADMIN_COOKIE_SECRET || 'adminjs-secret-key'
      }
    )
     
   // const adminRouter = AdminJSExpress.buildRouter(admin)
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
