
import { getModelByName } from '@adminjs/prisma'
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
  console.log('Component path:', fullPath) // Debug log
  return componentLoader.add(id, fullPath)
}

// ✅ เพิ่ม Component ที่ต้องใช้
// แก้ path ให้ถูกต้อง - จาก src/admin/resources ไปยัง src/UI/components.jsx
addComponent('Memo', '../../UI/components.jsx') 

// ฟังก์ชัน resource สำหรับโครงการก่อสร้าง
export const createConstructionProjectResource = (prisma) => ({
    resource: { model: getModelByName('User'), client: prisma },
    options: {
      navigation: {
        name: 'ตั้งค่า',
        icon: 'Clipboard',
      },
      properties: {
        id: { isVisible: false },
        password: { type: 'password' },
      },
      actions: {
        new: {
          isAccessible: true,
          components: 'Memo'
        },
        edit: {
          isAccessible: true,
        },
      },
  },
})

export const createConstructionProjectResourcerole = (prisma) => ({
  resource: { model: getModelByName('Role'), client: prisma },
  options: {
    navigation: {
      name: 'ตั้งค่า',
      icon: 'Clipboard',
    },
    properties: {
      id: { isVisible: false },
      name: { isVisible: { list: true, show: true, edit: true, filter: true } },
      description: { 
        type: 'textarea', 
        isVisible: { list: true, show: true, edit: true, filter: false },
        components: {
          edit: 'Memo',
        },
      },
    },
    actions: {
      new: { isAccessible: true },
      edit: { isAccessible: true },
      delete: { isAccessible: true },
    },
  },
})

// ฟังก์ชันรวม resource ทั้งหมด
export const createAdminResources = (prisma) => {
  const ConstructionProjectResource = createConstructionProjectResource(prisma)
  const ConstructionProjectResourcerole = createConstructionProjectResourcerole(prisma)
  return [
    ConstructionProjectResource,
    ConstructionProjectResourcerole,
  ]
}

// Export componentLoader สำหรับใช้ในไฟล์อื่น
export { componentLoader } 