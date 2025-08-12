import { ComponentLoader as AdminJSComponentLoader } from 'adminjs'
import path from 'path'
import { fileURLToPath } from 'url'

// ✅ สร้าง __dirname สำหรับ ESModule
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ สร้าง instance ของ ComponentLoader
const componentLoader = new AdminJSComponentLoader()

// ✅ สร้างฟังก์ชันสำหรับ add component
const addComponent = (id, relativePath) => {
  const fullPath = path.resolve(__dirname, relativePath)
  return componentLoader.add(id, fullPath)
}

// ✅ เพิ่ม Component ที่ต้องใช้
addComponent('Dashboard', '../src/page/dashboard.jsx')
addComponent('notification', '../src/page/listnotification.jsx')


// ✅ export ทั้ง loader และฟังก์ชันเสริม
export {
  componentLoader, // สำหรับใช้ใน AdminJS
  addComponent     // สำหรับ add เพิ่มจากภายนอกได้
}
