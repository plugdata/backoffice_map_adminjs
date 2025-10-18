// ========================================
// AdminJS Custom Authentication Routes
// เส้นทางสำหรับการยืนยันตัวตนของ AdminJS
// ========================================

import express from 'express'
import { authenticateUser } from '../config/auth.js'
import { adminJwtAuth } from '../middleware/adminAuth.js'

const router = express.Router()

// Middleware สำหรับ parse form data
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

/**
 * GET /login
 * แสดงหน้า login form
 */
router.get('/login', (req, res) => {
  // ส่งหน้า login form แทนการ redirect
  res.send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>เข้าสู่ระบบ</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-container {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .login-title {
          color: #333;
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
        }
        .login-subtitle {
          color: #666;
          margin: 0;
          font-size: 0.9rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333;
          font-weight: 500;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          box-sizing: border-box;
        }
        .form-input:focus {
          outline: none;
          border-color: #667eea;
        }
        .login-button {
          width: 100%;
          padding: 0.75rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .login-button:hover {
          background: #5a6fd8;
        }
        .error-message {
          background: #fee;
          color: #c33;
          padding: 0.75rem;
          border-radius: 5px;
          margin-bottom: 1rem;
          display: none;
        }
      </style>
    </head>
    <body>
      <div class="login-container">
        <div class="login-header">
          <h1 class="login-title">เข้าสู่ระบบ</h1>
          <p class="login-subtitle">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        </div>
        
        <div id="error-message" class="error-message"></div>
        
        <form method="POST" action="/login" id="login-form">
          <div class="form-group">
            <label class="form-label" for="email">อีเมล / ชื่อผู้ใช้</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              class="form-input" 
              placeholder="กรอกอีเมลหรือชื่อผู้ใช้"
              required
            />
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">รหัสผ่าน</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              class="form-input" 
              placeholder="กรอกรหัสผ่าน"
              required
            />
          </div>
          
          <button type="submit" class="login-button">เข้าสู่ระบบ</button>
        </form>
      </div>
      
      <script>
        // Handle form submission
        document.getElementById('login-form').addEventListener('submit', function(e) {
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          
          if (!email || !password) {
            e.preventDefault();
            showError('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
          }
        });
        
        function showError(message) {
          const errorDiv = document.getElementById('error-message');
          errorDiv.textContent = message;
          errorDiv.style.display = 'block';
        }
      </script>
    </body>
    </html>
  `)
})

/**
 * POST /login
 * เข้าสู่ระบบ
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!email || !password) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="th">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>เข้าสู่ระบบ</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 0;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .login-container {
              background: white;
              padding: 2rem;
              border-radius: 10px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              width: 100%;
              max-width: 400px;
            }
            .login-header {
              text-align: center;
              margin-bottom: 2rem;
            }
            .login-title {
              color: #333;
              margin: 0 0 0.5rem 0;
              font-size: 1.5rem;
            }
            .login-subtitle {
              color: #666;
              margin: 0;
              font-size: 0.9rem;
            }
            .form-group {
              margin-bottom: 1rem;
            }
            .form-label {
              display: block;
              margin-bottom: 0.5rem;
              color: #333;
              font-weight: 500;
            }
            .form-input {
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #ddd;
              border-radius: 5px;
              font-size: 1rem;
              box-sizing: border-box;
            }
            .form-input:focus {
              outline: none;
              border-color: #667eea;
            }
            .login-button {
              width: 100%;
              padding: 0.75rem;
              background: #667eea;
              color: white;
              border: none;
              border-radius: 5px;
              font-size: 1rem;
              cursor: pointer;
              transition: background 0.3s;
            }
            .login-button:hover {
              background: #5a6fd8;
            }
            .error-message {
              background: #fee;
              color: #c33;
              padding: 0.75rem;
              border-radius: 5px;
              margin-bottom: 1rem;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="login-container">
            <div class="login-header">
              <h1 class="login-title">เข้าสู่ระบบ</h1>
              <p class="login-subtitle">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
            </div>
            
            <div class="error-message">กรุณากรอกอีเมลและรหัสผ่าน</div>
            
            <form method="POST" action="/login" id="login-form">
              <div class="form-group">
                <label class="form-label" for="email">อีเมล / ชื่อผู้ใช้</label>
                <input 
                  type="text" 
                  id="email" 
                  name="email" 
                  class="form-input" 
                  placeholder="กรอกอีเมลหรือชื่อผู้ใช้"
                  value="${email || ''}"
                  required
                />
              </div>
              
              <div class="form-group">
                <label class="form-label" for="password">รหัสผ่าน</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  class="form-input" 
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
              </div>
              
              <button type="submit" class="login-button">เข้าสู่ระบบ</button>
            </form>
          </div>
        </body>
        </html>
      `)
    }

    // ตรวจสอบการเข้าสู่ระบบ
    const result = await authenticateUser(email, password)

    if (!result.success) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="th">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>เข้าสู่ระบบ</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 0;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .login-container {
              background: white;
              padding: 2rem;
              border-radius: 10px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              width: 100%;
              max-width: 400px;
            }
            .login-header {
              text-align: center;
              margin-bottom: 2rem;
            }
            .login-title {
              color: #333;
              margin: 0 0 0.5rem 0;
              font-size: 1.5rem;
            }
            .login-subtitle {
              color: #666;
              margin: 0;
              font-size: 0.9rem;
            }
            .form-group {
              margin-bottom: 1rem;
            }
            .form-label {
              display: block;
              margin-bottom: 0.5rem;
              color: #333;
              font-weight: 500;
            }
            .form-input {
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #ddd;
              border-radius: 5px;
              font-size: 1rem;
              box-sizing: border-box;
            }
            .form-input:focus {
              outline: none;
              border-color: #667eea;
            }
            .login-button {
              width: 100%;
              padding: 0.75rem;
              background: #667eea;
              color: white;
              border: none;
              border-radius: 5px;
              font-size: 1rem;
              cursor: pointer;
              transition: background 0.3s;
            }
            .login-button:hover {
              background: #5a6fd8;
            }
            .error-message {
              background: #fee;
              color: #c33;
              padding: 0.75rem;
              border-radius: 5px;
              margin-bottom: 1rem;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="login-container">
            <div class="login-header">
              <h1 class="login-title">เข้าสู่ระบบ</h1>
              <p class="login-subtitle">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
            </div>
            
            <div class="error-message">${result.message}</div>
            
            <form method="POST" action="/login" id="login-form">
              <div class="form-group">
                <label class="form-label" for="email">อีเมล / ชื่อผู้ใช้</label>
                <input 
                  type="text" 
                  id="email" 
                  name="email" 
                  class="form-input" 
                  placeholder="กรอกอีเมลหรือชื่อผู้ใช้"
                  value="${email || ''}"
                  required
                />
              </div>
              
              <div class="form-group">
                <label class="form-label" for="password">รหัสผ่าน</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  class="form-input" 
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
              </div>
              
              <button type="submit" class="login-button">เข้าสู่ระบบ</button>
            </form>
          </div>
        </body>
        </html>
      `)
    }

    // สร้าง session สำหรับ AdminJS
    req.session = req.session || {}
    req.session.user = result.user
    req.session.token = result.token

    // Redirect ไปยัง AdminJS dashboard หลังจาก login สำเร็จ
    res.redirect('/admin')
  } catch (error) {
    console.error('Login error:', error)
    res.send(`
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>เข้าสู่ระบบ</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .login-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
          }
          .login-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          .login-title {
            color: #333;
            margin: 0 0 0.5rem 0;
            font-size: 1.5rem;
          }
          .login-subtitle {
            color: #666;
            margin: 0;
            font-size: 0.9rem;
          }
          .form-group {
            margin-bottom: 1rem;
          }
          .form-label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 500;
          }
          .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            box-sizing: border-box;
          }
          .form-input:focus {
            outline: none;
            border-color: #667eea;
          }
          .login-button {
            width: 100%;
            padding: 0.75rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s;
          }
          .login-button:hover {
            background: #5a6fd8;
          }
          .error-message {
            background: #fee;
            color: #c33;
            padding: 0.75rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="login-container">
          <div class="login-header">
            <h1 class="login-title">เข้าสู่ระบบ</h1>
            <p class="login-subtitle">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
          </div>
          
          <div class="error-message">เกิดข้อผิดพลาดในการเข้าสู่ระบบ</div>
          
          <form method="POST" action="/login" id="login-form">
            <div class="form-group">
              <label class="form-label" for="email">อีเมล / ชื่อผู้ใช้</label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                class="form-input" 
                placeholder="กรอกอีเมลหรือชื่อผู้ใช้"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="form-label" for="password">รหัสผ่าน</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>
            
            <button type="submit" class="login-button">เข้าสู่ระบบ</button>
          </form>
        </div>
      </body>
      </html>
    `)
  }
})

/**
 * POST /admin/login
 * เข้าสู่ระบบ AdminJS
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกอีเมลและรหัสผ่าน'
      })
    }

    // ตรวจสอบการเข้าสู่ระบบ
    const result = await authenticateUser(email, password)

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message
      })
    }

    // สร้าง session สำหรับ AdminJS
    req.session = req.session || {}
    req.session.user = result.user
    req.session.token = result.token

    // Redirect ไปยัง AdminJS dashboard หลังจาก login สำเร็จ
    res.redirect('/admin')
  } catch (error) {
    console.error('AdminJS Login error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
    })
  }
})

/**
 * POST /admin/logout
 * ออกจากระบบ AdminJS
 */
router.post('/logout', (req, res) => {
  try {
    // ลบ session
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destroy error:', err)
        }
      })
    }

    res.json({
      success: true,
      message: 'ออกจากระบบสำเร็จ'
    })
  } catch (error) {
    console.error('AdminJS Logout error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการออกจากระบบ'
    })
  }
})

/**
 * GET /admin/me
 * ดึงข้อมูลผู้ใช้ปัจจุบัน
 */
router.get('/me', async (req, res) => {
  try {
    // ตรวจสอบ JWT token จาก header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'ไม่พบ token การยืนยันตัวตน'
      })
    }

    // ตรวจสอบ token
    const authResult = await adminJwtAuth.authenticate(token)
    
    if (!authResult) {
      return res.status(401).json({
        success: false,
        message: 'Token ไม่ถูกต้องหรือหมดอายุ'
      })
    }

    res.json({
      success: true,
      user: authResult.user
    })
  } catch (error) {
    console.error('Get user profile error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้'
    })
  }
})

/**
 * Middleware สำหรับตรวจสอบการยืนยันตัวตน
 */
export const requireAdminAuth = async (req, res, next) => {
  try {
    // ตรวจสอบ JWT token จาก header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'ไม่พบ token การยืนยันตัวตน'
      })
    }

    // ตรวจสอบ token
    const authResult = await adminJwtAuth.authenticate(token)
    
    if (!authResult) {
      return res.status(401).json({
        success: false,
        message: 'Token ไม่ถูกต้องหรือหมดอายุ'
      })
    }

    // เพิ่มข้อมูลผู้ใช้ใน request
    req.user = authResult.user
    next()
  } catch (error) {
    console.error('AdminJS Auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการยืนยันตัวตน'
    })
  }
}

export default router
