// /routes/apimap.js
// API สำหรับข้อมูล Map และ BuildingControl

import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

// ========================================
// 📍 GET /api/map - ดึงข้อมูล Map ทั้งหมด
// ========================================
router.get('/map', async (req, res) => {
  try {
    const maps = await prisma.map.findMany({
      include: {
        buildingControl: {
          select: {
            id: true,
            building_type: true,
            use_purpose: true,
            license_number: true,
            status: true,
          }
        }
      }
    })

    res.json({
      success: true,
      data: maps,
      message: 'ดึงข้อมูล Map สำเร็จ'
    })
  } catch (error) {
    console.error('Error fetching maps:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูล Map',
      error: error.message
    })
  }
})

// ========================================
// 📍 GET /api/map/:id - ดึงข้อมูล Map ตาม ID
// ========================================
router.get('/map/:id', async (req, res) => {
  try {
    const { id } = req.params
    const map = await prisma.map.findUnique({
      where: { id: parseInt(id) },
      include: {
        buildingControl: {
          select: {
            id: true,
            building_type: true,
            use_purpose: true,
            license_number: true,
            status: true,
            owner: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
              }
            },
            fiscalYear: {
              select: {
                id: true,
                year: true,
              }
            }
          }
        }
      }
    })

    if (!map) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูล Map'
      })
    }

    res.json({
      success: true,
      data: map,
      message: 'ดึงข้อมูล Map สำเร็จ'
    })
  } catch (error) {
    console.error('Error fetching map:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูล Map',
      error: error.message
    })
  }
})

// ========================================
// 📍 POST /api/map - สร้างข้อมูล Map ใหม่
// ========================================
router.post('/map', async (req, res) => {
  try {
    const { 
      latitude, 
      longitude, 
      name_local, 
      buildingControlId 
    } = req.body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!latitude || !longitude || !buildingControlId) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกข้อมูล latitude, longitude และ buildingControlId'
      })
    }

    // ตรวจสอบว่า BuildingControl มีอยู่จริง
    const buildingControl = await prisma.buildingControl.findUnique({
      where: { id: parseInt(buildingControlId) }
    })

    if (!buildingControl) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูล BuildingControl'
      })
    }

    const newMap = await prisma.map.create({
      data: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        name_local: name_local || null,
        buildingControlId: parseInt(buildingControlId)
      },
      include: {
        buildingControl: {
          select: {
            id: true,
            building_type: true,
            use_purpose: true,
            license_number: true,
            status: true,
          }
        }
      }
    })

    res.status(201).json({
      success: true,
      data: newMap,
      message: 'สร้างข้อมูล Map สำเร็จ'
    })
  } catch (error) {
    console.error('Error creating map:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้างข้อมูล Map',
      error: error.message
    })
  }
})

// ========================================
// 📍 PUT /api/map/:id - อัปเดตข้อมูล Map
// ========================================
router.put('/map/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { 
      latitude, 
      longitude, 
      name_local, 
      buildingControlId 
    } = req.body

    // ตรวจสอบว่า Map มีอยู่จริง
    const existingMap = await prisma.map.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existingMap) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูล Map'
      })
    }

    // ตรวจสอบว่า BuildingControl มีอยู่จริง (ถ้ามีการเปลี่ยน)
    if (buildingControlId) {
      const buildingControl = await prisma.buildingControl.findUnique({
        where: { id: parseInt(buildingControlId) }
      })

      if (!buildingControl) {
        return res.status(404).json({
          success: false,
          message: 'ไม่พบข้อมูล BuildingControl'
        })
      }
    }

    const updatedMap = await prisma.map.update({
      where: { id: parseInt(id) },
      data: {
        ...(latitude && { latitude: parseFloat(latitude) }),
        ...(longitude && { longitude: parseFloat(longitude) }),
        ...(name_local !== undefined && { name_local }),
        ...(buildingControlId && { buildingControlId: parseInt(buildingControlId) })
      },
      include: {
        buildingControl: {
          select: {
            id: true,
            building_type: true,
            use_purpose: true,
            license_number: true,
            status: true,
          }
        }
      }
    })

    res.json({
      success: true,
      data: updatedMap,
      message: 'อัปเดตข้อมูล Map สำเร็จ'
    })
  } catch (error) {
    console.error('Error updating map:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล Map',
      error: error.message
    })
  }
})

// ========================================
// 📍 DELETE /api/map/:id - ลบข้อมูล Map
// ========================================
router.delete('/map/:id', async (req, res) => {
  try {
    const { id } = req.params

    // ตรวจสอบว่า Map มีอยู่จริง
    const existingMap = await prisma.map.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existingMap) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูล Map'
      })
    }

    await prisma.map.delete({
      where: { id: parseInt(id) }
    })

    res.json({
      success: true,
      message: 'ลบข้อมูล Map สำเร็จ'
    })
  } catch (error) {
    console.error('Error deleting map:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบข้อมูล Map',
      error: error.message
    })
  }
})

// ========================================
// 📍 GET /api/map/building/:buildingControlId - ดึงข้อมูล Map ตาม BuildingControl
// ========================================
router.get('/map/building/:buildingControlId', async (req, res) => {
  try {
    const { buildingControlId } = req.params

    const maps = await prisma.map.findMany({
      where: { buildingControlId: parseInt(buildingControlId) },
      include: {
        buildingControl: {
          select: {
            id: true,
            building_type: true,
            use_purpose: true,
            license_number: true,
            status: true,
          }
        }
      }
    })

    res.json({
      success: true,
      data: maps,
      message: 'ดึงข้อมูล Map ตาม BuildingControl สำเร็จ'
    })
  } catch (error) {
    console.error('Error fetching maps by building:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูล Map',
      error: error.message
    })
  }
})

export default router
