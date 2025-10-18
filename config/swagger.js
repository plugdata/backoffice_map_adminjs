import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backoffice API',
      version: '1.0.0',
      description: 'API สำหรับระบบ Backoffice - จัดการข้อมูลแผนที่และอาคารควบคุม',
      contact: {
        name: 'API Support',
        email: 'support@backoffice.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Map: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID ของ Map'
            },
            latitude: {
              type: 'number',
              format: 'float',
              description: 'ละติจูด'
            },
            longitude: {
              type: 'number',
              format: 'float',
              description: 'ลองจิจูด'
            },
            name_local: {
              type: 'string',
              description: 'ชื่อสถานที่'
            },
            house_no: {
              type: 'string',
              description: 'บ้านเลขที่'
            },
            road: {
              type: 'string',
              description: 'ถนน'
            },
            subdistrict: {
              type: 'string',
              description: 'ตำบล/แขวง'
            },
            district: {
              type: 'string',
              description: 'อำเภอ/เขต'
            },
            province: {
              type: 'string',
              description: 'จังหวัด'
            },
            postcode: {
              type: 'string',
              description: 'รหัสไปรษณีย์'
            }
          }
        },
        MapResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'สถานะการทำงาน'
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Map'
              }
            },
            message: {
              type: 'string',
              description: 'ข้อความตอบกลับ'
            },
            total: {
              type: 'integer',
              description: 'จำนวนข้อมูลทั้งหมด'
            },
            keyword: {
              type: 'string',
              description: 'คำค้นหา (เฉพาะการค้นหา)'
            }
          }
        },
        BuildingControl: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            building_type: {
              type: 'string'
            },
            use_purpose: {
              type: 'string'
            },
            status: {
              type: 'string'
            },
            maps: {
              type: 'object'
            }
          }
        },
        RiskZone: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            zoneType: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            maps: {
              type: 'object'
            }
          }
        },
        BuildingResponse: {
          type: 'object',
          properties: {
            building: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/BuildingControl'
              }
            },
            riskZones: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/RiskZone'
              }
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID ของผู้ใช้'
            },
            username: {
              type: 'string',
              description: 'ชื่อผู้ใช้'
            },
            fullName: {
              type: 'string',
              description: 'ชื่อเต็ม'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'อีเมล'
            },
            role: {
              type: 'string',
              description: 'บทบาท'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              description: 'อีเมลหรือชื่อผู้ใช้',
              example: 'admin123'
            },
            password: {
              type: 'string',
              description: 'รหัสผ่าน',
              example: '1234'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'สถานะการเข้าสู่ระบบ'
            },
            message: {
              type: 'string',
              description: 'ข้อความตอบกลับ'
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User'
                },
                token: {
                  type: 'string',
                  description: 'JWT Token สำหรับการยืนยันตัวตน'
                }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'ข้อความข้อผิดพลาด'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'API สำหรับการยืนยันตัวตนและการเข้าสู่ระบบ'
      },
      {
        name: 'Maps',
        description: 'API สำหรับจัดการข้อมูลแผนที่'
      }
    ]
  },
  apis: [
    './routes/auth.js',
    './routes/maps.js',
    './routes/maps-swagger.js'
  ]
}

const specs = swaggerJsdoc(options)

export { swaggerUi, specs }