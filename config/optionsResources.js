// ========================================
// AdminJS Options - Backend API Only
// ปิด CSS/UI components ทั้งหมด
// ========================================

import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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

// AdminJS options - API Mode (ไม่มี CSS/UI)
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
    companyName: 'Building API',
    logo: false,
  },
}

export { i18next, language }
export default options
