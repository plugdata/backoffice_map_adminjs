// map-gateway.js
// เกตเวย์สาธารณะสำหรับหน้าแผนที่ของกองช่าง
//
// ทำไมต้องมีไฟล์นี้:
//   เครื่องนี้เปิดออกอินเทอร์เน็ตเฉพาะพอร์ต 80, 443 (Apache ถืออยู่ แก้ไม่ได้เพราะ
//   civil01 ไม่มีสิทธิ์ root) และ 8080, 8443 — ทดสอบยิงจากภายนอกแล้วยืนยันว่าเข้าได้
//   ไฟล์นี้จึงเสิร์ฟหน้าแผนที่ที่ 8080 โดยไม่ต้องพึ่ง Apache
//
//   /map      -> ไฟล์ static ที่ build แล้วใน dist-map (สร้างด้วย npm run build)
//   /api/...  -> ส่งต่อไปพอร์ต 3001 เฉพาะเส้นทางที่หน้าแผนที่เรียกจริงเท่านั้น
//                ที่เหลือของ backoffice (/admin, /api/auth, /api/upload, ...) ไม่ออกสาธารณะ

import express from 'express'
import compression from 'compression'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT     = Number(process.env.MAP_GATEWAY_PORT) || 8080
const API_HOST = '127.0.0.1'
const API_PORT = 3001

// ตรวจจากซอร์ส components-html/index.html แล้วว่าหน้าแผนที่เรียกแค่ 3 เส้นทางนี้
const ALLOWED_API = [
  /^\/api\/maps\/filter(\?|$)/,
  /^\/api\/visitor\/track(\?|$)/,
  /^\/api\/visitor\/stats(\?|$)/
]

const app = express()
app.disable('x-powered-by')
app.use(compression())

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'same-origin')
  next()
})

// ---- ส่งต่อเฉพาะ API ที่อนุญาต ----
app.use('/api', (req, res) => {
  const target = req.originalUrl
  if (!ALLOWED_API.some((re) => re.test(target))) {
    return res.status(404).json({ error: 'not found' })
  }

  const proxied = http.request(
    {
      host: API_HOST,
      port: API_PORT,
      method: req.method,
      path: target,
      headers: { ...req.headers, host: API_HOST + ':' + API_PORT }
    },
    (upstream) => {
      res.writeHead(upstream.statusCode, upstream.headers)
      upstream.pipe(res)
    }
  )

  proxied.on('error', (err) => {
    console.error('proxy error:', err.message)
    if (!res.headersSent) res.status(502).json({ error: 'upstream unavailable' })
  })

  req.pipe(proxied)
})

// ---- หน้าแผนที่ ----
app.use('/map', express.static(path.join(__dirname, 'dist-map'), { index: 'index.html' }))
// เสิร์ฟ /uploads ให้รูปใน API โหลดได้บนพอร์ตนี้ (เหมือน index.js)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))
app.get('/', (req, res) => res.redirect(302, '/map/'))

app.listen(PORT, '0.0.0.0', () => {
  console.log('map gateway listening on 0.0.0.0:' + PORT + ' -> /map from dist-map, api -> ' + API_PORT)
})
