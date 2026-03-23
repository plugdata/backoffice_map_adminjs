import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Building Control API',
      version: '1.0.0',
      description: 'API สำหรับระบบ Backoffice - จัดการข้อมูลอาคาร แผนที่ และการควบคุม',
      contact: {
        name: 'API Support',
        email: 'support@backoffice.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        // ==================== AdminJS Response Schemas ====================
        AdminJSListResponse: {
          type: 'object',
          properties: {
            records: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  params: { type: 'object' }
                }
              }
            },
            meta: {
              type: 'object',
              properties: {
                total: { type: 'integer' },
                perPage: { type: 'integer' },
                page: { type: 'integer' },
                direction: { type: 'string' },
                sortBy: { type: 'string' }
              }
            }
          }
        },
        AdminJSRecordResponse: {
          type: 'object',
          properties: {
            record: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                params: { type: 'object' }
              }
            }
          }
        },
        AdminJSSuccessResponse: {
          type: 'object',
          properties: {
            record: { type: 'object' },
            notice: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                type: { type: 'string', example: 'success' }
              }
            }
          }
        },

        // ==================== Input Schemas ====================
        UserInput: {
          type: 'object',
          required: ['username', 'password', 'title_use', 'fullName', 'role'],
          properties: {
            username: { type: 'string', example: 'newuser' },
            password: { type: 'string', example: 'password123' },
            title_use: { type: 'string', example: 'นาย' },
            fullName: { type: 'string', example: 'สมชาย ใจดี' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            phone: { type: 'string', example: '0812345678' },
            role: { type: 'string', enum: ['1', '2', '3'], example: '1', description: '1=user, 2=admin, 3=superadmin' }
          }
        },
        OwnerInput: {
          type: 'object',
          required: ['title_owner', 'first_name', 'last_name'],
          properties: {
            title_owner: { type: 'string', example: 'นาย' },
            first_name: { type: 'string', example: 'สมชาย' },
            last_name: { type: 'string', example: 'ใจดี' },
            number_no: { type: 'string', example: '1234567890123', description: 'เลขบัตรประชาชน 13 หลัก' },
            phone: { type: 'string', example: '0812345678' },
            no_id: { type: 'string', example: '123' },
            road: { type: 'string', example: 'ถนนสุขุมวิท' },
            subdistrict: { type: 'string', example: 'คลองเตย' },
            district: { type: 'string', example: 'คลองเตย' },
            province: { type: 'string', example: 'กรุงเทพมหานคร' },
            postcode: { type: 'integer', example: 10110 },
            owner_type: { type: 'string', example: 'บุคคลธรรมดา' },
            org_name: { type: 'string', example: 'บริษัท ABC จำกัด' },
            org_address: { type: 'string', example: '123 ถนน ABC' }
          }
        },
        FiscalYearInput: {
          type: 'object',
          required: ['year'],
          properties: {
            year: { type: 'integer', example: 2567 },
            detail: { type: 'string', example: 'ปีงบประมาณ 2567' }
          }
        },
        BuildingControlInput: {
          type: 'object',
          required: ['fiscalYearId'],
          properties: {
            building_type: { type: 'string', example: 'อาคารพาณิชย์' },
            use_purpose: { type: 'string', example: '1', description: '1=ขออนุญาตตาม พ.ร.บ., 2=อาคารควบคุมการใช้' },
            quantity: { type: 'integer', example: 1 },
            fiscalYearId: { type: 'integer', example: 1 },
            owner_id: { type: 'integer', example: 1 },
            status: { type: 'string', example: 'pending' },
            license_number: { type: 'string', example: 'BC-2024-001' }
          }
        },
        RiskZoneInput: {
          type: 'object',
          required: ['zoneType', 'fiscalYearId', 'owner_id'],
          properties: {
            zoneType: { type: 'string', example: 'พื้นที่น้ำท่วม' },
            description: { type: 'string', example: 'รายละเอียดพื้นที่เสี่ยง' },
            fiscalYearId: { type: 'integer', example: 1 },
            status: { type: 'string', example: '1', description: '1=อนุมัติแล้ว, 2=กำลังตรวจสอบ' },
            owner_id: { type: 'integer', example: 1 }
          }
        },
        ZoningPlanInput: {
          type: 'object',
          required: ['areaName', 'fiscalYearId', 'owner_id'],
          properties: {
            areaName: { type: 'string', example: 'เขตพาณิชยกรรม' },
            notes: { type: 'string', example: 'หมายเหตุ' },
            fiscalYearId: { type: 'integer', example: 1 },
            status: { type: 'string', example: 'active' },
            owner_id: { type: 'integer', example: 1 }
          }
        },
        BuildPlanInput: {
          type: 'object',
          required: ['areabuild'],
          properties: {
            areabuild: { type: 'string', example: 'พื้นที่ก่อสร้าง A' },
            notes: { type: 'string', example: 'หมายเหตุ' },
            user_id: { type: 'integer', example: 1 }
          }
        },
        PlanProjectInput: {
          type: 'object',
          required: ['code', 'name'],
          properties: {
            code: { type: 'string', example: 'PRJ-2024-001' },
            name: { type: 'string', example: 'โครงการก่อสร้างอาคาร A' },
            category: { type: 'string', example: 'ก่อสร้าง' },
            startDate: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' },
            endDate: { type: 'string', format: 'date-time', example: '2024-12-31T00:00:00Z' },
            supervisor: { type: 'string', example: 'นายสมชาย' },
            budget: { type: 'number', example: 1000000 },
            fiscalYearId: { type: 'integer', example: 1 },
            status: { type: 'string', example: 'planning' },
            details: { type: 'string', example: 'รายละเอียดโครงการ' }
          }
        },
        ApprovedProjectInput: {
          type: 'object',
          properties: {
            title_project: { type: 'string', example: 'โครงการที่อนุมัติแล้ว' },
            category: { type: 'string', example: 'ก่อสร้าง' },
            supervisor: { type: 'string', example: 'นายสมชาย' },
            budget: { type: 'number', example: 1000000 },
            fiscalYearId: { type: 'integer', example: 1 },
            status: { type: 'string', example: 'approved' },
            details: { type: 'string', example: 'รายละเอียดโครงการ' }
          }
        },
        MapInput: {
          type: 'object',
          properties: {
            buildingControlId: { type: 'integer', example: 1 },
            riskZoneId: { type: 'integer', example: null },
            zoningPlanId: { type: 'integer', example: null },
            name_local: { type: 'string', example: 'สถานที่ทดสอบ' },
            house_no: { type: 'string', example: '123' },
            address: { type: 'string', example: '123 ถนน ABC ตำบล XYZ' },
            latitude: { type: 'number', format: 'float', example: 13.7563 },
            longitude: { type: 'number', format: 'float', example: 100.5018 },
            colors: { type: 'string', example: '#ff0000' },
            geoJsonData: {
              type: 'object',
              example: {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [100.5018, 13.7563]
                }
              }
            },
            image_before: { type: 'string', example: '/uploads/before.jpg' },
            image_after: { type: 'string', example: '/uploads/after.jpg' }
          }
        },

        // ==================== Original Schemas ====================
        Map: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID ของ Map' },
            latitude: { type: 'number', format: 'float', description: 'ละติจูด' },
            longitude: { type: 'number', format: 'float', description: 'ลองจิจูด' },
            name_local: { type: 'string', description: 'ชื่อสถานที่' },
            house_no: { type: 'string', description: 'บ้านเลขที่' },
            address: { type: 'string', description: 'ที่อยู่' }
          }
        },
        MapResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', description: 'สถานะการทำงาน' },
            data: { type: 'array', items: { $ref: '#/components/schemas/Map' } },
            message: { type: 'string', description: 'ข้อความตอบกลับ' },
            total: { type: 'integer', description: 'จำนวนข้อมูลทั้งหมด' }
          }
        },
        BuildingControl: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            building_type: { type: 'string' },
            use_purpose: { type: 'string' },
            status: { type: 'string' },
            maps: { type: 'object' }
          }
        },
        RiskZone: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            zoneType: { type: 'string' },
            description: { type: 'string' },
            maps: { type: 'object' }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID ของผู้ใช้' },
            username: { type: 'string', description: 'ชื่อผู้ใช้' },
            fullName: { type: 'string', description: 'ชื่อเต็ม' },
            email: { type: 'string', format: 'email', description: 'อีเมล' },
            role: { type: 'string', description: 'บทบาท' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', description: 'อีเมลหรือชื่อผู้ใช้', example: 'admin123' },
            password: { type: 'string', description: 'รหัสผ่าน', example: '1234' }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', description: 'สถานะการเข้าสู่ระบบ' },
            message: { type: 'string', description: 'ข้อความตอบกลับ' },
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
                token: { type: 'string', description: 'JWT Token' }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', description: 'ข้อความข้อผิดพลาด' }
          }
        }
      }
    },
    tags: [
      { name: 'Authentication', description: 'API สำหรับการยืนยันตัวตน' },
      { name: 'Maps', description: 'API สำหรับจัดการข้อมูลแผนที่' },
      { name: 'AdminJS - User', description: 'AdminJS API - ผู้ใช้งาน' },
      { name: 'AdminJS - Owner', description: 'AdminJS API - เจ้าของกรรมสิทธิ์' },
      { name: 'AdminJS - FiscalYear', description: 'AdminJS API - ปีงบประมาณ' },
      { name: 'AdminJS - BuildingControl', description: 'AdminJS API - ควบคุมอาคาร' },
      { name: 'AdminJS - RiskZone', description: 'AdminJS API - พื้นที่เสี่ยงภัย' },
      { name: 'AdminJS - ZoningPlan', description: 'AdminJS API - ผังเมือง' },
      { name: 'AdminJS - BuildPlan', description: 'AdminJS API - แผนก่อสร้าง' },
      { name: 'AdminJS - PlanProject', description: 'AdminJS API - โครงการวางแผน' },
      { name: 'AdminJS - ApprovedProject', description: 'AdminJS API - โครงการอนุมัติ' },
      { name: 'AdminJS - Map', description: 'AdminJS API - ข้อมูลแผนที่' },
      { name: 'AdminJS - Uploads', description: 'AdminJS API - ไฟล์อัปโหลด' }
    ]
  },
  apis: [
    './routes/auth.js',
    './routes/maps.js',
    './routes/adminjs-api-swagger.js'
  ]
}

const specs = swaggerJsdoc(options)

export { swaggerUi, specs }
