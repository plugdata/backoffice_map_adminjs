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

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext)
    cb(null, `${name}-${uniqueSuffix}${ext}`)
  }
})

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น (JPEG, JPG, PNG, GIF, WEBP)'))
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
 * components:
 *   schemas:
 *     ImageUpload:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID ของรูปภาพ
 *         filename:
 *           type: string
 *           description: ชื่อไฟล์
 *         originalName:
 *           type: string
 *           description: ชื่อไฟล์เดิม
 *         path:
 *           type: string
 *           description: เส้นทางไฟล์
 *         url:
 *           type: string
 *           description: URL สำหรับเข้าถึงรูปภาพ
 *         size:
 *           type: integer
 *           description: ขนาดไฟล์ (bytes)
 *         mimetype:
 *           type: string
 *           description: ประเภทไฟล์
 *         mapId:
 *           type: integer
 *           description: ID ของ Map ที่ผูกกับรูปภาพ
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: วันที่อัปโหลด
 *     ImageUploadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/ImageUpload'
 *         message:
 *           type: string
 *     ImageListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ImageUpload'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: ข้อความข้อผิดพลาด
 */

/**
 * @swagger
 * /api/upload/image:
 *   post:
 *     summary: อัปโหลดรูปภาพ
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: ไฟล์รูปภาพ
 *               mapId:
 *                 type: integer
 *                 description: ID ของ Map (optional)
 *               description:
 *                 type: string
 *                 description: คำอธิบายรูปภาพ (optional)
 *     responses:
 *       200:
 *         description: อัปโหลดสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'กรุณาเลือกไฟล์รูปภาพ' })
    }

    const { mapId, description } = req.body
    const { filename, originalname, path: filePath, size, mimetype } = req.file

    // Generate URL for accessing the image
    const baseUrl = `${req.protocol}://${req.get('host')}`
    const imageUrl = `${baseUrl}/uploads/images/${filename}`

    // Save image info to database
    const imageRecord = await prisma.imageUpload.create({
      data: {
        filename,
        originalName: originalname,
        path: filePath,
        url: imageUrl,
        size,
        mimetype,
        mapId: mapId ? parseInt(mapId) : null,
        description: description || null
      }
    })

    res.json({
      success: true,
      data: imageRecord,
      message: 'อัปโหลดรูปภาพสำเร็จ'
    })
  } catch (error) {
    console.error('Image upload error:', error)
    
    // Clean up uploaded file if database save fails
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
 * /api/upload/images:
 *   get:
 *     summary: ดึงรายการรูปภาพทั้งหมด
 *     tags: [Upload]
 *     parameters:
 *       - in: query
 *         name: mapId
 *         schema:
 *           type: integer
 *         description: ID ของ Map (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: หน้าที่ต้องการ
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: จำนวนรายการต่อหน้า
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageListResponse'
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/images', async (req, res) => {
  try {
    const { mapId, page = 1, limit = 10 } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const where = mapId ? { mapId: parseInt(mapId) } : {}

    const [images, total] = await Promise.all([
      prisma.imageUpload.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' },
        include: {
          map: {
            select: {
              id: true,
              name_local: true,
              latitude: true,
              longitude: true
            }
          }
        }
      }),
      prisma.imageUpload.count({ where })
    ])

    res.json({
      success: true,
      data: images,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Get images error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลรูปภาพ' })
  }
})

/**
 * @swagger
 * /api/upload/image/{id}:
 *   get:
 *     summary: ดึงข้อมูลรูปภาพตาม ID
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของรูปภาพ
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       404:
 *         description: ไม่พบรูปภาพ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/image/:id', async (req, res) => {
  try {
    const { id } = req.params
    const imageId = parseInt(id)
    
    if (isNaN(imageId)) {
      return res.status(400).json({ error: 'ID ต้องเป็นตัวเลข' })
    }

    const image = await prisma.imageUpload.findUnique({
      where: { id: imageId },
      include: {
        map: {
          select: {
            id: true,
            name_local: true,
            latitude: true,
            longitude: true
          }
        }
      }
    })

    if (!image) {
      return res.status(404).json({ error: 'ไม่พบรูปภาพ' })
    }

    res.json({
      success: true,
      data: image
    })
  } catch (error) {
    console.error('Get image error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลรูปภาพ' })
  }
})

/**
 * @swagger
 * /api/upload/image/{id}:
 *   delete:
 *     summary: ลบรูปภาพ
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของรูปภาพ
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: ไม่พบรูปภาพ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: เกิดข้อผิดพลาด
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/image/:id', async (req, res) => {
  try {
    const { id } = req.params
    const imageId = parseInt(id)
    
    if (isNaN(imageId)) {
      return res.status(400).json({ error: 'ID ต้องเป็นตัวเลข' })
    }

    const image = await prisma.imageUpload.findUnique({
      where: { id: imageId }
    })

    if (!image) {
      return res.status(404).json({ error: 'ไม่พบรูปภาพ' })
    }

    // Delete file from filesystem
    try {
      if (fs.existsSync(image.path)) {
        fs.unlinkSync(image.path)
      }
    } catch (fileError) {
      console.error('Error deleting file:', fileError)
    }

    // Delete record from database
    await prisma.imageUpload.delete({
      where: { id: imageId }
    })

    res.json({
      success: true,
      message: 'ลบรูปภาพสำเร็จ'
    })
  } catch (error) {
    console.error('Delete image error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบรูปภาพ' })
  }
})

export default router