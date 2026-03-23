import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { createPrismaClient } from '../config/database.js'

const router = express.Router()
const prisma = createPrismaClient()

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads', 'documents')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Allowed file types
const ALLOWED_TYPES = {
  // Images
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/bmp': '.bmp',
  'image/tiff': '.tiff',
  // PDFs
  'application/pdf': '.pdf',
  // Documents
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'text/plain': '.txt',
  'application/rtf': '.rtf'
}

const MAX_TOTAL_SIZE = 15 * 1024 * 1024 // 15MB total limit

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    // multer รับ originalname มาเป็น Latin1 — แปลงกลับเป็น UTF-8 เพื่อให้ชื่อไทยถูกต้อง
    const utf8Name = Buffer.from(file.originalname, 'latin1').toString('utf8')
    const ext = path.extname(utf8Name) || ALLOWED_TYPES[file.mimetype] || ''
    const name = path.basename(utf8Name, ext)
    // ลบเฉพาะอักขระที่ filesystem ไม่รองรับ
    const safeName = name.replace(/[/\\:*?"<>|\0]/g, '').trim() || 'upload'
    const filename = `${safeName}${ext}`
    // ถ้าชื่อซ้ำ เติม timestamp ต่อท้าย
    if (fs.existsSync(path.join(uploadsDir, filename))) {
      cb(null, `${safeName}-${Date.now()}${ext}`)
    } else {
      cb(null, filename)
    }
  }
})

// File filter
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES[file.mimetype]) {
    cb(null, true)
  } else {
    cb(new Error('ไฟล์ประเภทนี้ไม่รองรับ กรุณาอัปโหลดไฟล์รูปภาพ, PDF หรือเอกสาร'))
  }
}

// Custom middleware to check total file size
const checkTotalSize = (req, res, next) => {
  let totalSize = 0

  req.on('data', chunk => {
    totalSize += chunk.length
    if (totalSize > MAX_TOTAL_SIZE) {
      req.destroy()
      res.status(413).json({
        error: 'ขนาดไฟล์รวมเกิน 15MB กรุณาลดขนาดไฟล์หรือจำนวนไฟล์'
      })
    }
  })

  next()
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_TOTAL_SIZE, // Per file limit = total limit
    files: 50 // Max number of files
  },
  fileFilter: fileFilter
})

/**
 * @swagger
 * /api/documents/upload:
 *   post:
 *     summary: อัปโหลดเอกสาร (รูปภาพ, PDF, เอกสาร)
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: ไฟล์เอกสาร (หลายไฟล์ได้)
 *               category:
 *                 type: string
 *                 description: หมวดหมู่เอกสาร (optional)
 *     responses:
 *       200:
 *         description: อัปโหลดสำเร็จ
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *       413:
 *         description: ไฟล์มีขนาดใหญ่เกินไป
 *       500:
 *         description: เกิดข้อผิดพลาด
 */
router.post('/upload', upload.array('files', 50), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'กรุณาเลือกไฟล์' })
    }

    // Calculate total size
    const totalSize = req.files.reduce((sum, file) => sum + file.size, 0)
    if (totalSize > MAX_TOTAL_SIZE) {
      // Delete uploaded files
      req.files.forEach(file => {
        try { fs.unlinkSync(file.path) } catch {}
      })
      return res.status(413).json({
        error: 'ขนาดไฟล์รวมเกิน 15MB กรุณาลดขนาดไฟล์หรือจำนวนไฟล์'
      })
    }

    const { category } = req.body
    const baseUrl = `${req.protocol}://${req.get('host')}`

    // Save to DB
    const savedUploads = await Promise.all(
      req.files.map(file => {
        const isImage = file.mimetype.startsWith('image/')
        const isPdf = file.mimetype === 'application/pdf'
        const fileUrl = `${baseUrl}/uploads/documents/${encodeURIComponent(file.filename)}`
        // แปลง originalname จาก Latin1 → UTF-8 เพื่อแสดงชื่อไทยถูกต้อง
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8')
        return prisma.uploads.create({
          data: {
            namefile: file.filename,
            url: fileUrl,
            fileType: isImage ? 'image' : isPdf ? 'pdf' : 'document',
            size: file.size,
          }
        }).then(record => ({
          id: record.id,
          token: record.token,
          filename: file.filename,
          originalName,
          url: fileUrl,
          size: file.size,
          mimetype: file.mimetype,
          type: isImage ? 'image' : isPdf ? 'pdf' : 'document',
          category: category || null,
          uploadedAt: record.createdAt.toISOString()
        }))
      })
    )

    // Link to RiskZone (many-to-many) if riskZoneId provided
    if (req.body.riskZoneId) {
      const rzId = Number(req.body.riskZoneId)
      await prisma.riskZone.update({
        where: { id: rzId },
        data: { uploads: { connect: savedUploads.map(u => ({ id: u.id })) } }
      })
    }

    // Link to BuildingControl (many-to-many) if buildingControlId provided
    if (req.body.buildingControlId) {
      const bcId = Number(req.body.buildingControlId)
      await prisma.buildingControl.update({
        where: { id: bcId },
        data: { uploads: { connect: savedUploads.map(u => ({ id: u.id })) } }
      })
    }

    // Generic resource linking
    const genericLinks = [
      { key: 'planProjectId',     model: 'planProject',     relation: 'uploads' },
      { key: 'approvedProjectId', model: 'approvedProject', relation: 'uploads' },
      { key: 'buildPlanId',       model: 'buildPlan',       relation: 'uploads' },
      { key: 'zoningPlanId',      model: 'zoningPlan',      relation: 'uploads' },
    ]
    for (const { key, model } of genericLinks) {
      if (req.body[key]) {
        const linkId = Number(req.body[key])
        await prisma[model].update({
          where: { id: linkId },
          data: { uploads: { connect: savedUploads.map(u => ({ id: u.id })) } }
        })
      }
    }

    res.json({
      success: true,
      data: savedUploads,
      totalSize,
      totalFiles: savedUploads.length,
      message: `อัปโหลดสำเร็จ ${savedUploads.length} ไฟล์`
    })
  } catch (error) {
    console.error('Document upload error:', error)

    // Clean up uploaded files on error
    if (req.files) {
      req.files.forEach(file => {
        try { fs.unlinkSync(file.path) } catch {}
      })
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'ขนาดไฟล์เกิน 15MB' })
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'จำนวนไฟล์มากเกินไป (สูงสุด 50 ไฟล์)' })
    }

    res.status(500).json({ error: error.message || 'เกิดข้อผิดพลาดในการอัปโหลด' })
  }
})

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: ดึงรายการเอกสารทั้งหมด
 *     tags: [Documents]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [image, pdf, document]
 *         description: กรองตามประเภทไฟล์
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 */
router.get('/', async (req, res) => {
  try {
    const { type } = req.query
    const files = fs.readdirSync(uploadsDir)
    const baseUrl = `${req.protocol}://${req.get('host')}`

    let fileList = files.map(filename => {
      const filePath = path.join(uploadsDir, filename)
      const stats = fs.statSync(filePath)
      const ext = path.extname(filename).toLowerCase()

      let fileType = 'document'
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff'].includes(ext)) {
        fileType = 'image'
      } else if (ext === '.pdf') {
        fileType = 'pdf'
      }

      return {
        id: filename,
        filename,
        url: `${baseUrl}/uploads/documents/${filename}`,
        size: stats.size,
        type: fileType,
        createdAt: stats.birthtime
      }
    })

    // Filter by type if specified
    if (type) {
      fileList = fileList.filter(f => f.type === type)
    }

    // Sort by newest first
    fileList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    res.json({
      success: true,
      data: fileList,
      total: fileList.length
    })
  } catch (error) {
    console.error('Get documents error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
  }
})

/**
 * @swagger
 * /api/documents/{filename}:
 *   delete:
 *     summary: ลบเอกสาร
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 *       404:
 *         description: ไม่พบไฟล์
 */
router.delete('/:filename', async (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(uploadsDir, filename)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'ไม่พบไฟล์' })
    }

    fs.unlinkSync(filePath)

    res.json({
      success: true,
      message: 'ลบไฟล์สำเร็จ'
    })
  } catch (error) {
    console.error('Delete document error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบไฟล์' })
  }
})

/**
 * Get allowed file types info
 */
router.get('/info', (req, res) => {
  res.json({
    maxTotalSize: MAX_TOTAL_SIZE,
    maxTotalSizeMB: 15,
    maxFiles: 50,
    allowedTypes: Object.keys(ALLOWED_TYPES),
    allowedExtensions: [...new Set(Object.values(ALLOWED_TYPES))]
  })
})

/**
 * GET /api/documents/db - list all uploads from database
 * ?type=pdf|image|document  ?riskZoneId=1  ?mapId=1
 */
router.get('/db', async (req, res) => {
  try {
    const { type, mapId, riskZoneId, buildingControlId } = req.query
    const where = {}
    if (type) where.fileType = type
    if (mapId) where.mapId = Number(mapId)
    if (riskZoneId) where.riskZones = { some: { id: Number(riskZoneId) } }
    if (buildingControlId) where.buildingControls = { some: { id: Number(buildingControlId) } }
    const { planProjectId, approvedProjectId, buildPlanId, zoningPlanId } = req.query
    if (planProjectId)     where.planProjects     = { some: { id: Number(planProjectId) } }
    if (approvedProjectId) where.approvedProjects = { some: { id: Number(approvedProjectId) } }
    if (buildPlanId)       where.buildPlans       = { some: { id: Number(buildPlanId) } }
    if (zoningPlanId)      where.zoningPlans      = { some: { id: Number(zoningPlanId) } }

    const uploads = await prisma.uploads.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { mapDirect: { select: { id: true, name_local: true, house_no: true } } }
    })

    res.json({ success: true, data: uploads, total: uploads.length })
  } catch (error) {
    console.error('Get DB uploads error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
  }
})

/**
 * DELETE /api/documents/db/:id - delete upload record + file from disk
 */
router.delete('/db/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const record = await prisma.uploads.findUnique({ where: { id } })
    if (!record) return res.status(404).json({ error: 'ไม่พบข้อมูล' })

    const filePath = path.join(uploadsDir, record.namefile)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    await prisma.uploads.delete({ where: { id } })
    res.json({ success: true, message: 'ลบเอกสารสำเร็จ' })
  } catch (error) {
    console.error('Delete DB upload error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบ' })
  }
})

export default router
