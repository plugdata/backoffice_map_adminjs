import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url' 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const thTranslation = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../locales/th.json'), 'utf8')
)
const thTranslationehg = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../locales/en.json'), 'utf8')
  )

  const i18n = i18next.createInstance()

  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'th',
      backend: { loadPath: './locales/{{lng}}.json' },
      interpolation: { escapeValue: false },
    //  returnEmptyString: true,
    })

const language = i18next.language || 'th'

const myCustomTheme = {
  id: 'my-vue-theme',
  name: 'Vue Green Theme',

  overrides: {
    colors: {
      primary100: '#42b883',
      accent: '#35495e',
      text: '#1e1e1e',
      lightText: '#6b7280',
    },
  },

}


const options = {
  locale: {
    language,
    availableLanguages: ['en', 'th'],
    translations: {
      th: thTranslation,
      en: thTranslationehg
    }
  },
  branding: {
    companyName: 'แดชบอร์ดผู้ดูแลระบบ',
    logo: '',

  },
  defaultTheme: myCustomTheme.id,
  availableThemes: [myCustomTheme],
  
  assets: {
     styles: [
      '/pubilc/admin-custom.css',      // ✅ ไฟล์ tailwind CSS ที่กำหนดเอง
    ], 
  },
}

export { i18next, language }
export default options
