import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: path.resolve(__dirname, 'components-html'),
  base: '/map',
  resolve: {
    alias: {
      '@components-html': path.resolve(__dirname, 'components-html')
    }
  },
  // ผลลัพธ์ของ `npm run build` — Apache เสิร์ฟโฟลเดอร์นี้ตรง ๆ ที่ https://app2.trangcity.go.th/map
  build: {
    outDir: path.resolve(__dirname, 'dist-map'),
    emptyOutDir: true
  },
  server: {
    // bind ทุก interface เพื่อให้เข้าจากในวง LAN ได้ที่ http://192.168.0.12:3002/map
    host: '0.0.0.0',
    port: 3002,
    strictPort: true,
    // อนุญาตทุก host เพราะเข้าด้วย IP ตรง ๆ ไม่ได้เข้าผ่าน localhost
    allowedHosts: true,
    name: 'url',
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
