import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url' 
import { componentLoader } from './loder.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load translation files
let thTranslation = {}
let enTranslation = {}

try {
  thTranslation = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../locales/th.json'), 'utf8')
  )
} catch (error) {
  console.warn('⚠️ Could not load Thai translation file:', error.message)
}

try {
  enTranslation = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../locales/en.json'), 'utf8')
  )
} catch (error) {
  console.warn('⚠️ Could not load English translation file:', error.message)
}

// Initialize i18next
const i18n = i18next.createInstance()

await i18n
  .use(Backend)
  .init({
    fallbackLng: 'th',
    backend: { loadPath: './locales/{{lng}}.json' },
    interpolation: { escapeValue: false },
  })

const language = i18next.language || 'th'

// Use built-in AdminJS themes (light/dark). Remove custom theme to avoid missing CSS.

// AdminJS options
const options = {
  locale: {
    language,
    availableLanguages: ['en', 'th'],
    translations: {
      th: thTranslation,
      en: enTranslation
    }
  },
  branding: {
    companyName: 'แดชบอร์ดผู้ดูแลระบบ',
    logo: '',
  },
  defaultTheme: 'light',
  componentLoader: componentLoader,

  assets: {
    styles: [
      '/public/css/admin-custom.css', // Fixed typo in path
    ] 
  },
}

export { i18next, language, componentLoader }
export default options
