// clearCacheRoute.js
import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

// ฟังก์ชันลบโฟลเดอร์แบบ recursive
const deleteFolder = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true })
    return true
  }
  return false
}

router.get('/clear-cache', (req, res) => {
  const chromeCache = path.join(process.env.LOCALAPPDATA, 'Google/Chrome/User Data/Default/Cache')
  const edgeCache = path.join(process.env.LOCALAPPDATA, 'Microsoft/Edge/User Data/Default/Cache')

  const chromeCleared = deleteFolder(chromeCache)
  const edgeCleared = deleteFolder(edgeCache)

  res.json({
    success: true,
    message: '🧹 Browser cache clear finished',
    chrome: chromeCleared ? 'Cleared' : 'Not found',
    edge: edgeCleared ? 'Cleared' : 'Not found',
  })
})

export default router
