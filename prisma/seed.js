// ========================================
// Seed Data for Role-Based Access Control
// ========================================

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // ========================================
  // CREATE DEPARTMENTS
  // ========================================
  
  console.log('🏢 Creating departments...')
  const hrDepartment = await prisma.department.upsert({
    where: { name: 'HR Department' },
    update: {},
    create: {
      name: 'HR Department',
      description: 'Human Resources Department'
    }
  })

  const itDepartment = await prisma.department.upsert({
    where: { name: 'IT Department' },
    update: {},
    create: {
      name: 'IT Department',
      description: 'Information Technology Department'
    }
  })

  const financeDepartment = await prisma.department.upsert({
    where: { name: 'Finance Department' },
    update: {},
    create: {
      name: 'Finance Department',
      description: 'Finance and Accounting Department'
    }
  })

  // ========================================
  // CREATE PERMISSIONS
  // ========================================
  
  const permissions = [
    // Document Permissions
    { name: 'document:create', description: 'สร้างเอกสารใหม่', resource: 'document', action: 'create' },
    { name: 'document:read', description: 'อ่านเอกสาร', resource: 'document', action: 'read' },
    { name: 'document:update', description: 'แก้ไขเอกสาร', resource: 'document', action: 'update' },
    { name: 'document:delete', description: 'ลบเอกสาร', resource: 'document', action: 'delete' },
    { name: 'document:approve', description: 'อนุมัติเอกสาร', resource: 'document', action: 'approve' },
    { name: 'document:reject', description: 'ปฏิเสธเอกสาร', resource: 'document', action: 'reject' },
    
    // User Permissions
    { name: 'user:create', description: 'สร้างผู้ใช้ใหม่', resource: 'user', action: 'create' },
    { name: 'user:read', description: 'อ่านข้อมูลผู้ใช้', resource: 'user', action: 'read' },
    { name: 'user:update', description: 'แก้ไขข้อมูลผู้ใช้', resource: 'user', action: 'update' },
    { name: 'user:delete', description: 'ลบผู้ใช้', resource: 'user', action: 'delete' },
    
    // Role Permissions
    { name: 'role:create', description: 'สร้างบทบาทใหม่', resource: 'role', action: 'create' },
    { name: 'role:read', description: 'อ่านข้อมูลบทบาท', resource: 'role', action: 'read' },
    { name: 'role:update', description: 'แก้ไขบทบาท', resource: 'role', action: 'update' },
    { name: 'role:delete', description: 'ลบบทบาท', resource: 'role', action: 'delete' },
    
    // Permission Permissions
    { name: 'permission:create', description: 'สร้างสิทธิ์ใหม่', resource: 'permission', action: 'create' },
    { name: 'permission:read', description: 'อ่านข้อมูลสิทธิ์', resource: 'permission', action: 'read' },
    { name: 'permission:update', description: 'แก้ไขสิทธิ์', resource: 'permission', action: 'update' },
    { name: 'permission:delete', description: 'ลบสิทธิ์', resource: 'permission', action: 'delete' },
    
    // Department Permissions
    { name: 'department:create', description: 'สร้างแผนกใหม่', resource: 'department', action: 'create' },
    { name: 'department:read', description: 'อ่านข้อมูลแผนก', resource: 'department', action: 'read' },
    { name: 'department:update', description: 'แก้ไขแผนก', resource: 'department', action: 'update' },
    { name: 'department:delete', description: 'ลบแผนก', resource: 'department', action: 'delete' },
    
    // System Permissions
    { name: 'system:admin', description: 'สิทธิ์ผู้ดูแลระบบ', resource: 'system', action: 'admin' },
    { name: 'system:reports', description: 'ดูรายงานระบบ', resource: 'system', action: 'reports' },
  ]

  console.log('📝 Creating permissions...')
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: permission,
      create: permission,
    })
  }

  // ========================================
  // CREATE ROLES
  // ========================================
  
  const roles = [
    {
      name: 'Super Admin',
      description: 'ผู้ดูแลระบบสูงสุด - มีสิทธิ์ทุกอย่างในระบบ',
    },
    {
      name: 'CEO',
      description: 'ประธานเจ้าหน้าที่บริหาร - อนุมัติเอกสารขั้นสุดท้าย',
    },
    {
      name: 'HR Manager',
      description: 'ผู้จัดการฝ่ายทรัพยากรบุคคล - ตรวจสอบโครงสร้างเอกสาร',
    },
    {
      name: 'Department Manager',
      description: 'ผู้จัดการแผนก - จัดการเอกสารในแผนกของตนเอง',
    },
    {
      name: 'Document Creator',
      description: 'ผู้สร้างเอกสาร - สร้างและแก้ไขเอกสารของตนเอง',
    },
    {
      name: 'Document Reviewer',
      description: 'ผู้ตรวจสอบเอกสาร - ตรวจสอบและอนุมัติเอกสาร',
    },
    {
      name: 'Viewer',
      description: 'ผู้ดูเอกสาร - ดูเอกสารที่ได้รับอนุญาตเท่านั้น',
    },
  ]

  console.log('👥 Creating roles...')
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: role,
      create: role,
    })
  }

  // ========================================
  // ASSIGN PERMISSIONS TO ROLES
  // ========================================
  
  console.log('🔗 Assigning permissions to roles...')
  
  // Super Admin - ทุกสิทธิ์
  const superAdminRole = await prisma.role.findUnique({ where: { name: 'Super Admin' } })
  const allPermissions = await prisma.permission.findMany()
  
  for (const permission of allPermissions) {
    await prisma.permission.update({
      where: { id: permission.id },
      data: { roleId: superAdminRole.id }
    })
  }

  // HR Manager - สิทธิ์จัดการผู้ใช้และเอกสาร HR
  const hrManagerRole = await prisma.role.findUnique({ where: { name: 'HR Manager' } })
  const hrPermissions = await prisma.permission.findMany({
    where: {
      OR: [
        { resource: 'user' },
        { resource: 'document' },
        { resource: 'department' },
        { name: 'system:reports' },
      ],
    },
  })
  
  for (const permission of hrPermissions) {
    await prisma.permission.update({
      where: { id: permission.id },
      data: { roleId: hrManagerRole.id }
    })
  }

  // CEO - สิทธิ์อนุมัติเอกสารขั้นสุดท้าย
  const ceoRole = await prisma.role.findUnique({ where: { name: 'CEO' } })
  const ceoPermissions = await prisma.permission.findMany({
    where: {
      OR: [
        { name: 'document:read' },
        { name: 'document:approve' },
        { name: 'document:reject' },
        { name: 'system:reports' },
      ],
    },
  })
  
  for (const permission of ceoPermissions) {
    await prisma.permission.update({
      where: { id: permission.id },
      data: { roleId: ceoRole.id }
    })
  }

  // Department Manager - สิทธิ์จัดการเอกสารในแผนก
  const deptManagerRole = await prisma.role.findUnique({ where: { name: 'Department Manager' } })
  const deptManagerPermissions = await prisma.permission.findMany({
    where: {
      OR: [
        { name: 'document:create' },
        { name: 'document:read' },
        { name: 'document:update' },
        { name: 'document:approve' },
        { name: 'document:reject' },
        { name: 'user:read' },
      ],
    },
  })
  
  for (const permission of deptManagerPermissions) {
    await prisma.permission.update({
      where: { id: permission.id },
      data: { roleId: deptManagerRole.id }
    })
  }

  // Document Creator - สิทธิ์สร้างและแก้ไขเอกสาร
  const creatorRole = await prisma.role.findUnique({ where: { name: 'Document Creator' } })
  const creatorPermissions = await prisma.permission.findMany({
    where: {
      OR: [
        { name: 'document:create' },
        { name: 'document:read' },
        { name: 'document:update' },
      ],
    },
  })
  
  for (const permission of creatorPermissions) {
    await prisma.permission.update({
      where: { id: permission.id },
      data: { roleId: creatorRole.id }
    })
  }

  // Document Reviewer - สิทธิ์ตรวจสอบและอนุมัติเอกสาร
  const reviewerRole = await prisma.role.findUnique({ where: { name: 'Document Reviewer' } })
  const reviewerPermissions = await prisma.permission.findMany({
    where: {
      OR: [
        { name: 'document:read' },
        { name: 'document:approve' },
        { name: 'document:reject' },
      ],
    },
  })
  
  for (const permission of reviewerPermissions) {
    await prisma.permission.update({
      where: { id: permission.id },
      data: { roleId: reviewerRole.id }
    })
  }

  // Viewer - สิทธิ์ดูเอกสารเท่านั้น
  const viewerRole = await prisma.role.findUnique({ where: { name: 'Viewer' } })
  const viewerPermission = await prisma.permission.findUnique({ where: { name: 'document:read' } })
  
  await prisma.permission.update({
    where: { id: viewerPermission.id },
    data: { roleId: viewerRole.id }
  })

  // ========================================
  // CREATE SUPER ADMIN USER
  // ========================================
  
  console.log('👑 Creating Super Admin user...')
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const superAdminUser = await prisma.user.upsert({
    where: { email: 'admin@docflow.com' },
    update: {},
    create: {
      email: 'admin@docflow.com',
      username: 'admin',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      employeeId: 'ADMIN001',
      departmentId: hrDepartment.id,
      isActive: true
    }
  })

  // กำหนด Super Admin role ให้ผู้ใช้
  await prisma.user.update({
    where: { id: superAdminUser.id },
    data: { roleId: superAdminRole.id }
  })

  // ========================================
  // CREATE SAMPLE USERS
  // ========================================
  
  console.log('👤 Creating sample users...')
  
  // CEO
  const ceoUser = await prisma.user.upsert({
    where: { email: 'ceo@docflow.com' },
    update: {},
    create: {
      email: 'ceo@docflow.com',
      username: 'ceo',
      password: hashedPassword,
      firstName: 'CEO',
      lastName: 'Executive',
      employeeId: 'CEO001',
      departmentId: hrDepartment.id,
      roleId: ceoRole.id,
      isActive: true
    }
  })

  // HR Manager
  const hrManagerUser = await prisma.user.upsert({
    where: { email: 'hr@docflow.com' },
    update: {},
    create: {
      email: 'hr@docflow.com',
      username: 'hr_manager',
      password: hashedPassword,
      firstName: 'HR',
      lastName: 'Manager',
      employeeId: 'HR001',
      departmentId: hrDepartment.id,
      roleId: hrManagerRole.id,
      isActive: true
    }
  })

  // IT Manager
  const itManagerUser = await prisma.user.upsert({
    where: { email: 'it@docflow.com' },
    update: {},
    create: {
      email: 'it@docflow.com',
      username: 'it_manager',
      password: hashedPassword,
      firstName: 'IT',
      lastName: 'Manager',
      employeeId: 'IT001',
      departmentId: itDepartment.id,
      roleId: deptManagerRole.id,
      isActive: true
    }
  })

  // Regular User
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@docflow.com' },
    update: {},
    create: {
      email: 'user@docflow.com',
      username: 'regular_user',
      password: hashedPassword,
      firstName: 'Regular',
      lastName: 'User',
      employeeId: 'USER001',
      departmentId: financeDepartment.id,
      roleId: creatorRole.id,
      isActive: true
    }
  })

  console.log('✅ Seed completed successfully!')
  console.log('\n📋 Default Login Credentials:')
  console.log('👑 Super Admin: admin@docflow.com / admin123')
  console.log('👔 CEO: ceo@docflow.com / admin123')
  console.log('👤 HR Manager: hr@docflow.com / admin123')
  console.log('👨‍💼 IT Manager: it@docflow.com / admin123')
  console.log('👤 Regular User: user@docflow.com / admin123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 