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
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads', 'images')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure multer for image upload with Thai filename support
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext)
    
    // Support Thai filenames by preserving original name with unique suffix
    const safeName = name.replace(/[^a-zA-Z0-9\u0E00-\u0E7F\s-]/g, '')
    cb(null, `${safeName}-${uniqueSuffix}${ext}`)
  }
})

// File filter for images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('กรุณาอัปโหลดไฟล์รูปภาพหรือ PDF เท่านั้น (JPEG, JPG, PNG, GIF, WEBP, PDF)'))
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
})

/**
 * @swagger
 * /api/upload-image:
 *   post:
 *     summary: อัปโหลดรูปภาพ (สำหรับ MapForm component)
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: ไฟล์รูปภาพ
 *               type:
 *                 type: string
 *                 description: ประเภทรูป (before/after)
 *     responses:
 *       200:
 *         description: อัปโหลดสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL ของรูปภาพ
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *       500:
 *         description: เกิดข้อผิดพลาด
 */
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'กรุณาเลือกไฟล์รูปภาพ' })
    }

    const { type } = req.body
    const { filename } = req.file

    // Generate URL for accessing the image
    const baseUrl = `${req.protocol}://${req.get('host')}`
    const imageUrl = `${baseUrl}/uploads/images/${filename}`

    res.json({
      url: imageUrl,
      filename: filename,
      type: type || 'image'
    })
  } catch (error) {
    console.error('Image upload error:', error)
    
    // Clean up uploaded file if error occurs
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError)
      }
    }
    
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ' })
  }
})

/**
 * @swagger
 * /api/upload-image:
 *   get:
 *     summary: ดึงรายการรูปภาพทั้งหมด
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       filename:
 *                         type: string
 *                       url:
 *                         type: string
 *                       size:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 */
router.get('/', async (req, res) => {
  try {
    // Get list of uploaded files from directory
    const files = fs.readdirSync(uploadsDir)
    const fileList = files.map(filename => {
      const filePath = path.join(uploadsDir, filename)
      const stats = fs.statSync(filePath)
      const baseUrl = `${req.protocol}://${req.get('host')}`
      
      return {
        id: filename,
        filename: filename,
        url: `${baseUrl}/uploads/images/${filename}`,
        size: stats.size,
        created_at: stats.birthtime
      }
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    res.json({
      success: true,
      data: fileList
    })
  } catch (error) {
    console.error('Get files error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลไฟล์' })
  }
})

/**
 * @swagger
 * /api/upload-image/{filename}:
 *   delete:
 *     summary: ลบไฟล์รูปภาพ
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: ชื่อไฟล์
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 *       404:
 *         description: ไม่พบไฟล์
 *       500:
 *         description: เกิดข้อผิดพลาด
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
    console.error('Delete file error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบไฟล์' })
  }
})

export default router