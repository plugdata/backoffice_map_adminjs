import { ComponentLoader } from 'adminjs'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProd = process.env.NODE_ENV === 'production'

// ✅ ComponentLoader ที่เลือกเปิด/ปิด cache ตาม env
const componentLoader = new ComponentLoader({
  bundler: {
    enabled: true, // ✅ ให้ bundler ทำงานทั้ง dev/prod
    webpack: {
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            adminjs: {
              test: /[\\/]node_modules[\\/]@adminjs[\\/]/,
              name: 'adminjs',
              chunks: 'all',
              priority: 10,
            },
          },
        },
        minimize: isProd, // ✅ minimize เฉพาะ prod
      },
      cache: isProd
        ? {
            type: 'filesystem',
            buildDependencies: { config: [__filename] },
          }
        : false, // ❌ dev ปิด cache
    },
  },
})


// ✅ ฟังก์ชัน add component พร้อม error handling
const addComponent = (id, relativePath) => {
  try {
    const fullPath = path.resolve(__dirname, relativePath)
    console.log(`📦 Loading component: ${id} from ${fullPath}`)
    
    // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${fullPath}`)
      return null
    }
    
    const component = componentLoader.add(id, fullPath)
    console.log(`✅ Successfully loaded component: ${id}`)
    return component
  } catch (error) {
    console.error(`❌ Failed to load component ${id}:`, error.message)
    console.error(`   Path: ${relativePath}`)
    console.error(`   Full path: ${path.resolve(__dirname, relativePath)}`)
    return null
  }
}

const addComponent2 = (id, relativePath) => {
  try {
    const fullPath = path.resolve(__dirname, relativePath)
    console.log(`📦 Overriding component: ${id} from ${fullPath}`)
    return componentLoader.override(id, fullPath)
  } catch (error) {
    console.warn(`⚠️ Failed to override component ${id}:`, error.message)
    return null
  }
}

// ✅ เพิ่ม custom components พร้อม logging


/* ----------------- Dashboard ----------------- */
// const Dashboard = addComponent('Dashboard', '../src/page/dashboard.jsx')

/* ----------------- Owner ----------------- */
 const OwnerShow = addComponent('OwnerShow', '../src/page/show_owner.jsx')  

/* ----------------- Map ----------------- */
 
const Map = addComponent('Map', '../src/page/Map.jsx')
const ShowMap = addComponent('ShowMap', '../src/components/map/show_map.jsx')
/* ----------------- File Handling ----------------- */
const FileUrlPreview = addComponent('FileUrlPreview', '../src/components/featureUi/FileUrlPreview.jsx')
const FileUploadEdit = addComponent('FileUploadEdit', '../src/components/featureUi/FileUploadEdit.jsx')

 const Showupload = addComponent('Showupload', '../src/components/featureUi/Showupload.jsx') 

 const Dashboard = addComponent('Dashboard', '../src/page/dashboard.jsx')
 const UploadFile = addComponent('UploadFile', '../src/components/featureUi/upload_file.jsx')
/* ----------------- Control / Stats ----------------- */
/*  const control_show = addComponent('control_show', '../src/components/featureUi/show_control.jsx') 
 const select_stats = addComponent('select_stats', '../src/components/featureUi/select_stats.jsx')  */ 


// ✅ ฟังก์ชันสำหรับ preload components
/* const preloadComponents = async () => {
  try {
    console.log('🔄 Preloading components...')
    
    const components = [Map]
    
    for (const component of components) {
      if (component && component.preload) {
        await component.preload()
        console.log(`✅ Preloaded component: ${component.componentId || 'unknown'}`)
      }
    }
    
    console.log('✅ Component preloading completed')
  } catch (error) {
    console.warn('⚠️ Component preloading error:', error.message)
  }
} */

export {
  componentLoader,
  addComponent,
  addComponent2,
  Dashboard,
 // preloadComponents,
  // Export individual components for direct use
  FileUrlPreview,
  FileUploadEdit,
  ShowMap, 
  Map,
  OwnerShow,
  Showupload,
  UploadFile
}
