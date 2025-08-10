// ========================================
// Database Configuration
// ตั้งค่า Prisma client และ database connection
// ========================================

import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// โหลด environment variables
dotenv.config()

// ========================================
// CREATE PRISMA CLIENT
// ========================================

export const createPrismaClient = () => {
  const prisma = new PrismaClient()
  
  // ตรวจสอบการเชื่อมต่อ database
  prisma.$connect()
    .then(() => {
      console.log('✅ Database connected successfully')
    })
    .catch((error) => {
      console.error('❌ Database connection failed:', error)
    })
  
  return prisma
}

// ========================================
// DATABASE UTILITIES
// ========================================

export const closePrismaConnection = async (prisma) => {
  try {
    await prisma.$disconnect()
    console.log('✅ Database connection closed')
  } catch (error) {
    console.error('❌ Error closing database connection:', error)
  }
} 