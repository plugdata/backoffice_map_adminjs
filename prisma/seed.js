// ========================================
// Database Seed Script
// สร้างข้อมูลเริ่มต้นสำหรับระบบการส่งเอกสาร
// ========================================

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// ========================================
// SEED DATA
// ========================================

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...')

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
    // CREATE DOCUMENT TYPES
    // ========================================
    
    console.log('📄 Creating document types...')
    const documentTypes = await Promise.all([
      prisma.documentType.upsert({
        where: { name: 'ใบขออนุมัติซื้อ' },
        update: {},
        create: {
          name: 'ใบขออนุมัติซื้อ',
          description: 'เอกสารขออนุมัติการซื้อสินค้าหรือบริการ'
        }
      }),
      prisma.documentType.upsert({
        where: { name: 'ใบเบิกวัสดุ' },
        update: {},
        create: {
          name: 'ใบเบิกวัสดุ',
          description: 'เอกสารขอเบิกวัสดุสิ้นเปลือง'
        }
      }),
      prisma.documentType.upsert({
        where: { name: 'ใบลา' },
        update: {},
        create: {
          name: 'ใบลา',
          description: 'เอกสารขออนุญาตลา'
        }
      }),
      prisma.documentType.upsert({
        where: { name: 'ใบเสนอโครงการ' },
        update: {},
        create: {
          name: 'ใบเสนอโครงการ',
          description: 'เอกสารเสนอโครงการใหม่'
        }
      })
    ])

    // ========================================
    // CREATE CONFIDENTIALITY LEVELS
    // ========================================
    
    console.log('🔒 Creating confidentiality levels...')
    const confidentialityLevels = await Promise.all([
      prisma.confidentialityLevel.upsert({
        where: { name: 'ปกติ' },
        update: {},
        create: {
          name: 'ปกติ',
          description: 'เอกสารทั่วไปที่สามารถเผยแพร่ได้'
        }
      }),
      prisma.confidentialityLevel.upsert({
        where: { name: 'ลับ' },
        update: {},
        create: {
          name: 'ลับ',
          description: 'เอกสารลับภายในองค์กร'
        }
      }),
      prisma.confidentialityLevel.upsert({
        where: { name: 'ลับมาก' },
        update: {},
        create: {
          name: 'ลับมาก',
          description: 'เอกสารลับมาก ห้ามเผยแพร่ภายนอก'
        }
      })
    ])

    // ========================================
    // CREATE PERMISSIONS
    // ========================================
    
    console.log('📝 Creating permissions...')
    const permissions = await Promise.all([
      prisma.permission.upsert({
        where: { name: 'user.create' },
        update: {},
        create: {
          name: 'user.create',
          description: 'Create users',
          resource: 'user',
          action: 'create'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'user.read' },
        update: {},
        create: {
          name: 'user.read',
          description: 'Read users',
          resource: 'user',
          action: 'read'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'user.update' },
        update: {},
        create: {
          name: 'user.update',
          description: 'Update users',
          resource: 'user',
          action: 'update'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'user.delete' },
        update: {},
        create: {
          name: 'user.delete',
          description: 'Delete users',
          resource: 'user',
          action: 'delete'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'document.create' },
        update: {},
        create: {
          name: 'document.create',
          description: 'Create documents',
          resource: 'document',
          action: 'create'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'document.read' },
        update: {},
        create: {
          name: 'document.read',
          description: 'Read documents',
          resource: 'document',
          action: 'read'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'document.update' },
        update: {},
        create: {
          name: 'document.update',
          description: 'Update documents',
          resource: 'document',
          action: 'update'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'document.delete' },
        update: {},
        create: {
          name: 'document.delete',
          description: 'Delete documents',
          resource: 'document',
          action: 'delete'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'document.approve' },
        update: {},
        create: {
          name: 'document.approve',
          description: 'Approve documents',
          resource: 'document',
          action: 'approve'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'document.reject' },
        update: {},
        create: {
          name: 'document.reject',
          description: 'Reject documents',
          resource: 'document',
          action: 'reject'
        }
      })
    ])

    // ========================================
    // CREATE ROLES
    // ========================================
    
    console.log('👥 Creating roles...')
    const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        description: 'System Administrator (HR)'
      }
    })

    const managerRole = await prisma.role.upsert({
      where: { name: 'manager' },
      update: {},
      create: {
        name: 'manager',
        description: 'Department Manager'
      }
    })

    const userRole = await prisma.role.upsert({
      where: { name: 'user' },
      update: {},
      create: {
        name: 'user',
        description: 'Regular User (Employee)'
      }
    })

    const ceoRole = await prisma.role.upsert({
      where: { name: 'ceo' },
      update: {},
      create: {
        name: 'ceo',
        description: 'CEO / Super Admin'
      }
    })

    // ========================================
    // ASSIGN PERMISSIONS TO ROLES
    // ========================================
    
    console.log('🔗 Assigning permissions to roles...')
    
    // Admin (HR) gets document management permissions
    const adminPermissions = permissions.filter(p => 
      p.name.includes('document') || p.name.includes('user.read')
    )
    await Promise.all(
      adminPermissions.map(permission =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: adminRole.id,
              permissionId: permission.id
            }
          },
          update: {},
          create: {
            roleId: adminRole.id,
            permissionId: permission.id
          }
        })
      )
    )

    // CEO gets all permissions
    await Promise.all(
      permissions.map(permission =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: ceoRole.id,
              permissionId: permission.id
            }
          },
          update: {},
          create: {
            roleId: ceoRole.id,
            permissionId: permission.id
          }
        })
      )
    )

    // Manager gets document read and create permissions
    const managerPermissions = permissions.filter(p => 
      p.name.includes('document.read') || p.name.includes('document.create')
    )
    await Promise.all(
      managerPermissions.map(permission =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: managerRole.id,
              permissionId: permission.id
            }
          },
          update: {},
          create: {
            roleId: managerRole.id,
            permissionId: permission.id
          }
        })
      )
    )

    // User gets basic document permissions
    const userPermissions = permissions.filter(p => 
      p.name.includes('document.read') || p.name.includes('document.create')
    )
    await Promise.all(
      userPermissions.map(permission =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: userRole.id,
              permissionId: permission.id
            }
          },
          update: {},
          create: {
            roleId: userRole.id,
            permissionId: permission.id
          }
        })
      )
    )

    // ========================================
    // CREATE USERS
    // ========================================
    
    console.log('👤 Creating users...')
    const hashedPassword = await bcrypt.hash('password123', 12)

    const ceoUser = await prisma.user.upsert({
      where: { email: 'ceo@example.com' },
      update: {},
      create: {
        email: 'ceo@example.com',
        username: 'ceo',
        password: hashedPassword,
        firstName: 'CEO',
        lastName: 'Administrator',
        employeeId: 'EMP001',
        departmentId: null,
        isActive: true
      }
    })

    const hrUser = await prisma.user.upsert({
      where: { email: 'hr@example.com' },
      update: {},
      create: {
        email: 'hr@example.com',
        username: 'hr',
        password: hashedPassword,
        firstName: 'HR',
        lastName: 'Manager',
        employeeId: 'EMP002',
        departmentId: hrDepartment.id,
        isActive: true
      }
    })

    const itUser = await prisma.user.upsert({
      where: { email: 'it@example.com' },
      update: {},
      create: {
        email: 'it@example.com',
        username: 'it',
        password: hashedPassword,
        firstName: 'IT',
        lastName: 'Manager',
        employeeId: 'EMP003',
        departmentId: itDepartment.id,
        isActive: true
      }
    })

    const regularUser = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        username: 'user',
        password: hashedPassword,
        firstName: 'Jane',
        lastName: 'User',
        employeeId: 'EMP004',
        departmentId: financeDepartment.id,
        isActive: true
      }
    })

    // ========================================
    // ASSIGN ROLES TO USERS
    // ========================================
    
    console.log('🔗 Assigning roles to users...')
    
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: ceoUser.id,
          roleId: ceoRole.id
        }
      },
      update: {},
      create: {
        userId: ceoUser.id,
        roleId: ceoRole.id
      }
    })

    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: hrUser.id,
          roleId: adminRole.id
        }
      },
      update: {},
      create: {
        userId: hrUser.id,
        roleId: adminRole.id
      }
    })

    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: itUser.id,
          roleId: managerRole.id
        }
      },
      update: {},
      create: {
        userId: itUser.id,
        roleId: managerRole.id
      }
    })

    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: regularUser.id,
          roleId: userRole.id
        }
      },
      update: {},
      create: {
        userId: regularUser.id,
        roleId: userRole.id
      }
    })

    // ========================================
    // CREATE SAMPLE DOCUMENTS
    // ========================================
    
    console.log('📄 Creating sample documents...')
    
    const sampleDocument = await prisma.document.upsert({
      where: { id: 'sample-doc-1' },
      update: {},
      create: {
        id: 'sample-doc-1',
        documentCode: 'DOC-2024-001',
        documentTypeId: documentTypes[0].id, // ใบขออนุมัติซื้อ
        projectName: 'โครงการซื้อคอมพิวเตอร์ใหม่',
        details: 'ขออนุมัติซื้อคอมพิวเตอร์ 10 เครื่อง สำหรับแผนก IT',
        confidentialityLevelId: confidentialityLevels[0].id, // ปกติ
        departmentId: itDepartment.id,
        status: 'PENDING_HR_REVIEW',
        creatorId: regularUser.id
      }
    })

    // ========================================
    // CREATE SAMPLE NOTIFICATIONS
    // ========================================
    
    console.log('🔔 Creating sample notifications...')
    
    await prisma.notification.upsert({
      where: { id: 'sample-notif-1' },
      update: {},
      create: {
        id: 'sample-notif-1',
        userId: regularUser.id,
        type: 'DOCUMENT_SUBMITTED',
        title: 'เอกสารถูกส่งแล้ว',
        message: 'เอกสาร DOC-2024-001 ถูกส่งไปยัง HR แล้ว',
        read: false,
        documentId: sampleDocument.id
      }
    })

    console.log('✅ Database seeding completed successfully!')
    console.log('\n📋 Default Login Credentials:')
    console.log('👑 CEO: ceo@example.com / password123')
    console.log('👤 HR: hr@example.com / password123')
    console.log('👨‍💼 IT Manager: it@example.com / password123')
    console.log('👤 User: user@example.com / password123')

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  }
}

// ========================================
// RUN SEED
// ========================================

seedData()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 