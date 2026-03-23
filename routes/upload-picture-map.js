import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { createPrismaClient } from '../config/database.js'

const router = express.Router()
const prisma = createPrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imagesDir = path.join(__dirname, '..', 'public', 'uploads', 'images')
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

const ALLOWED_IMAGE_TYPES = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imagesDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname) || ALLOWED_IMAGE_TYPES[file.mimetype] || ''
    cb(null, `map-img-${uniqueSuffix}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES[file.mimetype]) cb(null, true)
    else cb(new Error('รองรับเฉพาะไฟล์ JPG และ PNG เท่านั้น'))
  }
})

/**
 * POST /api/map-images/upload
 * Upload image(s) and link to a Map record
 * Body: files[] (multipart), mapId (optional), imageType (before|after)
 */
router.post('/upload', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'กรุณาเลือกรูปภาพ' })
    }

    const mapId = req.body.mapId ? Number(req.body.mapId) : null
    const imageType = req.body.imageType || null // 'before' | 'after'
    const baseUrl = `${req.protocol}://${req.get('host')}`

    // Verify map exists if mapId provided
    if (mapId) {
      const map = await prisma.map.findUnique({ where: { id: mapId } })
      if (!map) {
        req.files.forEach(f => { try { fs.unlinkSync(f.path) } catch {} })
        return res.status(404).json({ error: `ไม่พบ Map id ${mapId}` })
      }
    }

    const savedUploads = await Promise.all(
      req.files.map(async file => {
        const fileUrl = `${baseUrl}/uploads/images/${file.filename}`
        const record = await prisma.uploads.create({
          data: {
            namefile: file.filename,
            url: fileUrl,
            fileType: 'image',
            size: file.size,
            mapId: mapId || null,
          }
        })

        // Update Map image_before / image_after if imageType is specified
        if (mapId && imageType === 'before') {
          await prisma.map.update({ where: { id: mapId }, data: { image_before: fileUrl } })
        } else if (mapId && imageType === 'after') {
          await prisma.map.update({ where: { id: mapId }, data: { image_after: fileUrl } })
        }

        return {
          id: record.id,
          token: record.token,
          filename: file.filename,
          url: fileUrl,
          size: file.size,
          mapId: record.mapId,
          imageType,
          uploadedAt: record.createdAt.toISOString()
        }
      })
    )

    res.json({
      success: true,
      data: savedUploads,
      totalFiles: savedUploads.length,
      message: `อัปโหลดรูปภาพสำเร็จ ${savedUploads.length} รูป`
    })
  } catch (error) {
    console.error('Map image upload error:', error)
    if (req.files) req.files.forEach(f => { try { fs.unlinkSync(f.path) } catch {} })
    if (error.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'ขนาดรูปภาพเกิน 10MB' })
    res.status(500).json({ error: error.message || 'เกิดข้อผิดพลาด' })
  }
})

/**
 * GET /api/map-images - list all map images from DB
 * ?mapId=1  ?riskZoneId=1
 */
router.get('/', async (req, res) => {
  try {
    const { mapId, riskZoneId, buildingControlId } = req.query
    const where = { fileType: 'image' }
    if (mapId) where.mapId = Number(mapId)
    if (riskZoneId) where.mapDirect = { riskZoneId: Number(riskZoneId) }
    if (buildingControlId) where.mapDirect = { buildingControlId: Number(buildingControlId) }
    const { planProjectId, approvedProjectId, buildPlanId, zoningPlanId } = req.query
    if (planProjectId)     where.mapDirect = { planProjectId:     Number(planProjectId) }
    if (approvedProjectId) where.mapDirect = { approvedProjectId: Number(approvedProjectId) }
    if (buildPlanId)       where.mapDirect = { palnbuildId:       Number(buildPlanId) }
    if (zoningPlanId)      where.mapDirect = { zoningPlanId:      Number(zoningPlanId) }

    const uploads = await prisma.uploads.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        mapDirect: {
          select: { id: true, name_local: true, house_no: true, address: true, image_before: true, image_after: true }
        }
      }
    })

    res.json({ success: true, data: uploads, total: uploads.length })
  } catch (error) {
    console.error('Get map images error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
  }
})

/**
 * GET /api/map-images/maps - list all maps for dropdown
 */
router.get('/maps', async (req, res) => {
  try {
    const maps = await prisma.map.findMany({
      select: { id: true, name_local: true, house_no: true, address: true, image_before: true, image_after: true },
      orderBy: { id: 'desc' },
      take: 200
    })
    res.json({ success: true, data: maps, total: maps.length })
  } catch (error) {
    console.error('Get maps error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
  }
})

/**
 * DELETE /api/map-images/:id - delete upload record + file
 */
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const record = await prisma.uploads.findUnique({ where: { id } })
    if (!record) return res.status(404).json({ error: 'ไม่พบข้อมูล' })

    const filePath = path.join(imagesDir, record.namefile)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    await prisma.uploads.delete({ where: { id } })
    res.json({ success: true, message: 'ลบรูปภาพสำเร็จ' })
  } catch (error) {
    console.error('Delete map image error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

export default router
