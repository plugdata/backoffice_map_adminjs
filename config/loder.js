import { ComponentLoader } from 'adminjs'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

/* -----------------------------------------------------
 * 📁 PATH & ENVIRONMENT SETUP
 * --------------------------------------------------- */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProd = process.env.NODE_ENV === 'production'

/* -----------------------------------------------------
 * ⚙️ CONFIGURE COMPONENT LOADER
 * --------------------------------------------------- */
const componentLoader = new ComponentLoader({
  bundler: {
    enabled: true, // ใช้ bundler ทั้ง dev / prod
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
        minimize: isProd, // minimize เฉพาะตอน production
      },
      cache: isProd
        ? {
            type: 'filesystem',
            buildDependencies: { config: [__filename] },
          }
        : false, // ปิด cache ใน dev
    },
  },
})

/* -----------------------------------------------------
 * 🧩 HELPER FUNCTIONS
 * --------------------------------------------------- */

// ✅ เพิ่ม Component ใหม่
const addComponent = (id, relativePath) => {
  try {
    const fullPath = path.resolve(__dirname, relativePath)
    console.log(`📦 Loading component: ${id} from ${fullPath}`)

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

// ✅ Override component เดิมของ AdminJS
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

/* -----------------------------------------------------
 * 🧱 REGISTER CUSTOM COMPONENTS
 * --------------------------------------------------- */

// 🏠 Dashboard
const Dashboard = addComponent('Dashboard', '../src/components/dashboard.jsx')

// 👥 Owner Components
  /* const OwnerShow = addComponent('OwnerShow', '../src/components/owner.jsx')
  const RadioOwner = addComponent('RadioOwner', '../src/components/ownerui/radioOwner.jsx')
  const OwnerTitleCell = addComponent('OwnerTitleCell', '../src/components/featureUi/sideCellowner.jsx') */

// 📍 Address Components
/* const AddressSelect = addComponent('AddressSelect', '../src/components/featureUi/addresse/address_provin.jsx')
const AddressAmphoe = addComponent('AddressAmphoe', '../src/components/featureUi/addresse/address_amp.jsx')
const AddressTumbon = addComponent('AddressTumbon', '../src/components/featureUi/addresse/address_tumbon.jsx') */

// 🔐 Auth Components
/* const Login = addComponent2('Login', '../src/components/Login.jsx')
const ForgotPassword = addComponent('ForgotPassword', '../src/components/ForgotPassword.jsx')
const ResetPassword = addComponent('ResetPassword', '../src/components/ResetPassword.jsx') */

// 📅 Filter Components
/* const DefaultDatetimeFilterProperty = addComponent2(
  'DefaultDatetimeFilterProperty',
  '../src/components/featureUi/DefaultDatetimeFilterProperty.jsx'
) */

// featureUi Components
/*  const FullNameBadge = addComponent('FullNameBadge', '../src/components/featureUi/badge/fullNameBadge.jsx')
 const YearBadge = addComponent('YearBadge', '../src/components/featureUi/badge/yearBadge.jsx') */


 // Map Components
 const ShowMap = addComponent('ShowMap', '../src/components/map/show_map.jsx')
 const Map = addComponent('Map', '../src/components/Map.jsx')
/*  const TestMap = addComponent('TestMap', '../src/testmap/testmap.jsx')
 const ViewKml = addComponent('ViewKml', '../src/components/testmap/viewkml.jsx') */
 
 // Data Display Components
 /* const DataDisplay = addComponent('DataDisplay', '../src/components/featureUi/DataDisplay.jsx') */
 const MapField = addComponent('MapField', '../src/components/featureUi/MapField.jsx')
/* -----------------------------------------------------
 * 📦 EXPORTS
 * --------------------------------------------------- */
export {
  componentLoader,
  addComponent,
  addComponent2,

  // Components
  Dashboard,
 /*  OwnerShow,
  RadioOwner,
  OwnerTitleCell,

  AddressSelect,
  AddressAmphoe,
  AddressTumbon,

  Login,
  ForgotPassword,
  ResetPassword,

  DefaultDatetimeFilterProperty,
  FullNameBadge,
  YearBadge, */
  ShowMap,
  Map,
/*   TestMap,
  ViewKml,
  DataDisplay, */
  MapField
}
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
}*/
