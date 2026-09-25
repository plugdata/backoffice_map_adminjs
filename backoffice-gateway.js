// backoffice-gateway.js
// เปิดหลังบ้าน AdminJS (พอร์ต 3001) ออกอินเทอร์เน็ตผ่านพอร์ต 8443
//
// ทำไมต้องมี: พอร์ต 3001 ถูกไฟร์วอลล์ปิด เครื่องนี้เปิดออกเน็ตได้แค่ 80, 443
// (Apache ถือไว้ แก้ไม่ได้เพราะไม่มีสิทธิ์ root) กับ 8080, 8443 เท่านั้น
// 8080 ใช้ไปแล้วกับหน้าแผนที่ จึงเหลือ 8443 ให้หลังบ้าน
//
// ตัวนี้ส่งต่อทุกเส้นทางไป 3001 ตรง ๆ การป้องกันเป็นหน้าที่ของหน้าล็อกอิน AdminJS เอง

import http from 'http'

const PORT     = Number(process.env.BACKOFFICE_GATEWAY_PORT) || 8443
const API_HOST = '127.0.0.1'
const API_PORT = 3001

const server = http.createServer((req, res) => {
  const headers = { ...req.headers, host: API_HOST + ':' + API_PORT }

  // บอก Express ว่าต้นทางเป็นอะไร เพื่อให้ 'trust proxy' + secure cookie ทำงานถูก
  // ถ้าอยู่หลัง Cloudflare/reverse proxy ที่ทำ TLS ให้ ค่าเดิมจะถูกส่งมาแล้ว จึงไม่ทับ
  headers['x-forwarded-for']   = req.headers['x-forwarded-for']   || req.socket.remoteAddress
  headers['x-forwarded-proto'] = req.headers['x-forwarded-proto'] || 'http'
  headers['x-forwarded-host']  = req.headers['x-forwarded-host']  || req.headers.host

  const proxied = http.request(
    { host: API_HOST, port: API_PORT, method: req.method, path: req.url, headers },
    (upstream) => {
      res.writeHead(upstream.statusCode, upstream.headers)
      upstream.pipe(res)
    }
  )

  proxied.on('error', (err) => {
    console.error('proxy error:', err.message)
    if (!res.headersSent) {
      res.writeHead(502, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ error: 'upstream unavailable' }))
    }
  })

  req.pipe(proxied)
})

server.listen(PORT, '0.0.0.0', () => {
  console.log('backoffice gateway listening on 0.0.0.0:' + PORT + ' -> ' + API_HOST + ':' + API_PORT)
})
