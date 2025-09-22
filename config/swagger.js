import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backoffice Management API',
      version: '1.0.0',
      description: 'API สำหรับจัดการระบบ Backoffice รองรับการอัปโหลดไฟล์ การจัดการสถานที่ และระบบจัดการฐานข้อมูล',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server'
      },
      {
        url: 'https://your-production-domain.com',
        description: 'Production server'
      }
    ],
    tags: [
      {
        name: 'File Upload',
        description: 'การอัปโหลดไฟล์'
      },
      {
        name: 'File Management',
        description: 'การจัดการไฟล์'
      },
      {
        name: 'File Access',
        description: 'การเข้าถึงไฟล์'
      },
      {
        name: 'Location',
        description: 'การจัดการสถานที่'
      },
      {
        name: 'Maps',
        description: 'การจัดการแผนที่'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js', './config/swagger.js'] // ระบุ path ของไฟล์ที่มี swagger comments
}

const specs = swaggerJsdoc(options)

export { specs, swaggerUi }
