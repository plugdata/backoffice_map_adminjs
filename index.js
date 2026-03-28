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
import routerHtml from './routes/router-html.js'
import { createExpressApp, setupStaticFiles, startServer } from './config/server.js'
import { createPrismaClient } from './config/database.js'
import { createAdminJS } from './config/admin.js'
import AdminJSExpress from '@adminjs/express'
import { adminAuth, adminJwtAuth } from './middleware/adminAuth.js'

// Routes
import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import uploadRoutes from './routes/upload.js'
import locationRoutes from './routes/location.js'
import mapsRoutes from './routes/maps.js'
import addressRoutes from './routes/address.js'
import testKmlImportRoutes from './routes/test-kml-import.js'
import uploadDocumentRoutes from './routes/upload-document.js'
import importRiskGeoJsonRoutes from './routes/import-risk-geojson.js'
import importBuildingGeoJsonRoutes from './routes/import-building-geojson.js'
import importGenericGeoJsonRoutes from './routes/import-generic-geojson.js'
import uploadPictureRoutes from './routes/uploadpicture.js'
import uploadPictureMapRoutes from './routes/upload-picture-map.js'
import visitorRoutes from './routes/visitor.js'
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
    app.use('/frontend', express.static('frontend'))
    app.use('/mrokupdata', express.static('mrokupdata'))

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
    app.use('/api/documents', uploadDocumentRoutes)
    app.use('/api/map-images', uploadPictureMapRoutes)
    app.use('/api/risk-geojson', importRiskGeoJsonRoutes)
    app.use('/api/building-geojson', importBuildingGeoJsonRoutes)
    app.use('/api/generic-geojson', importGenericGeoJsonRoutes)
    app.use('/api/visitor', visitorRoutes)
    app.use('/router-html', routerHtml)
    // Test page routes
    app.get('/upload-test', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'upload-test.html'))
    })
    app.get('/document-upload', (req, res) => {
      res.sendFile(path.join(__dirname, 'frontend', 'pages', 'document-upload.html'))
    })

    // AdminJS API for custom login page
    app.post('/admin/api/login', async (req, res) => {
      try {
        const { email, password } = req.body
        const authResult = await adminAuth.authenticate(email, password)

        if (authResult) {
          req.session.adminUser = authResult.user
          await req.session.save()
          res.json({
            success: true,
            user: authResult.user
          })
        } else {
          res.status(401).json({
            success: false,
            message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
          })
        }
      } catch (error) {
        console.error('API Login error:', error)
        res.status(500).json({
          success: false,
          message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
        })
      }
    })

    app.get('/admin/api/session', (req, res) => {
      if (req.session && req.session.adminUser) {
        res.json({
          success: true,
          user: req.session.adminUser
        })
      } else {
        res.status(401).json({
          success: false,
          message: 'ไม่ได้เข้าสู่ระบบ'
        })
      }
    })

    // Universal Logout Route
    app.get(['/logout', '/admin/logout'], (req, res) => {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) console.error('Session destroy error:', err);
        });
      }
      res.clearCookie('adminjs');

      // Serve a small HTML script to clear client-side storage before redirecting
      res.send(`
        <script>
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = '/admin/login';
        </script>
      `);
    });

    app.post(['/logout', '/admin/logout', '/admin/api/logout'], (req, res) => {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) console.error('Session destroy error:', err);
        });
      }
      res.clearCookie('adminjs');
      res.json({ success: true, message: 'Logout successful' });
    });


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
          documents: '/api/documents',
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

    // Create AdminJS router (using buildRouter to avoid session clashing)
    const adminRouter = AdminJSExpress.buildRouter(admin)

    // Middleware to handle 401 for API requests instead of redirecting to login
    app.use('/admin/api', async (req, res, next) => {
      try {
        // Skip for login/logout API
        if (req.path === '/login' || req.path === '/logout' || req.path === '/session') {
          return next();
        }

        // Fix: Cast numeric query parameters to avoid Prisma validation errors
        if (req.query.page) req.query.page = parseInt(req.query.page, 10);
        if (req.query.perPage) req.query.perPage = parseInt(req.query.perPage, 10);

        // 1. Check Session (for Browser/Frontend)
        if (req.session && req.session.adminUser) {
          return next();
        }

        // 2. Check Bearer Token (for Postman/Mobile/API)
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.split(' ')[1];
          const authResult = await adminJwtAuth.authenticate(token);

          if (authResult) {
            // Ensure session exists
            if (!req.session) req.session = {};
            // Sync with session for subsequent calls if needed
            req.session.adminUser = authResult.user;
            return next();
          }
        }

        // If neither, return 401
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Session expired or missing Bearer token'
        });
      } catch (error) {
        console.error('🔥 Error in /admin/api middleware:', error);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error in API Middleware',
          error: error.message
        });
      }
    });

    // Override AdminJS Login Route with custom router-html
    app.get('/admin/login', (req, res) => {
      res.sendFile(path.join(__dirname, 'frontend/pages/login.html'));
    });

    app.use(admin.options.rootPath, adminRouter)

    // ปิด admin.watch() เนื่องจากใช้ API Mode
    // if (process.env.NODE_ENV !== 'production') {
    //   admin.watch()
    // }

    // Monitor AdminJS
    const { monitorAdminJS } = await import('./config/admin.js')
    monitorAdminJS(admin)

    // Start server
    const PORT = process.env.PORT || 3001
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
