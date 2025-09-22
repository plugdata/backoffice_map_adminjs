# File Upload API Documentation

## Overview
ระบบจัดการไฟล์อัปโหลดที่รองรับการอัปโหลดไฟล์หลายประเภท พร้อมระบบจัดการฐานข้อมูลและไฟล์ในระบบ

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm หรือ yarn

### Installation
```bash
npm install
npm run dev
```

### Access Points
- **API Documentation**: http://localhost:3002/api-docs
- **Admin Panel**: http://localhost:3002/admin
- **API Base URL**: http://localhost:3002/api

## 📋 API Endpoints

### File Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | อัปโหลดไฟล์เดี่ยว |
| POST | `/api/upload/multiple` | อัปโหลดหลายไฟล์พร้อมกัน |

### File Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/upload/files/{documentId}` | ดึงรายการไฟล์ของ document |
| DELETE | `/api/upload/file/{id}` | ลบไฟล์ |
| GET | `/api/upload/stats` | สถิติไฟล์ |

### File Access
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/c/{token}` | เข้าถึงไฟล์แบบ public |

## 📁 File Storage Structure

```
public/
└── uploads/
    ├── document_1234567890.pdf
    ├── image_1234567891.png
    └── ...
```

## 🔧 Supported File Types
- **PDF**: `application/pdf`
- **Images**: `image/png`, `image/jpeg`
- **Text**: `text/plain`
- **Documents**: `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

## 📊 File Size Limit
- ขนาดสูงสุด: **10MB** ต่อไฟล์

## 🗄️ Database Schema

### uploads table
```sql
CREATE TABLE uploads (
  id SERIAL PRIMARY KEY,
  namefile VARCHAR NOT NULL,
  url VARCHAR,
  fileType VARCHAR,
  size INTEGER,
  token VARCHAR UNIQUE DEFAULT uuid_generate_v4(),
  createdAt TIMESTAMP DEFAULT NOW(),
  uploadedBy INTEGER,
  buildingControlId INTEGER,
  riskZoneId INTEGER,
  zoningPlanId INTEGER
);
```

## 🔐 Authentication
API รองรับ Bearer Token authentication (ถ้ามีระบบ user)

## 📝 Usage Examples

### JavaScript/React
```javascript
// อัปโหลดไฟล์เดี่ยว
const formData = new FormData()
formData.append('file', file)
formData.append('buildingControlId', '123')

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})

// อัปโหลดหลายไฟล์
const formData = new FormData()
files.forEach(file => {
  formData.append('files', file)
})
formData.append('buildingControlId', '123')

const response = await fetch('/api/upload/multiple', {
  method: 'POST',
  body: formData
})
```

### cURL
```bash
# อัปโหลดไฟล์เดี่ยว
curl -X POST \
  -F "file=@document.pdf" \
  -F "buildingControlId=123" \
  http://localhost:3002/api/upload

# ดาวน์โหลดไฟล์
curl -O http://localhost:3002/c/abc123
```

## 🐛 Error Handling

### Common Error Responses
```json
{
  "error": "ไม่พบไฟล์ที่อัปโหลด"
}
```

### HTTP Status Codes
- `200`: สำเร็จ
- `400`: Bad Request (ไฟล์ไม่ถูกต้อง)
- `404`: Not Found (ไม่พบไฟล์)
- `500`: Internal Server Error

## 🔄 API Response Format

### Success Response
```json
{
  "success": true,
  "file": {
    "id": 1,
    "token": "abc123",
    "namefile": "document.pdf",
    "url": "/uploads/document_1234567890.pdf",
    "fileType": "application/pdf",
    "size": 1024000,
    "publicUrl": "/c/abc123",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Multiple Files Response
```json
{
  "success": true,
  "files": [
    {
      "id": 1,
      "token": "abc123",
      "namefile": "file1.pdf",
      "url": "/uploads/file1_1234567890.pdf",
      "fileType": "application/pdf",
      "size": 1024000,
      "publicUrl": "/c/abc123",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## 🛠️ Development

### Running Tests
```bash
npm test
```

### Code Style
```bash
npm run lint
```

### Database Migration
```bash
npx prisma migrate dev
```

## 📚 Additional Resources

- [Swagger UI Documentation](http://localhost:3002/api-docs)
- [AdminJS Panel](http://localhost:3002/admin)
- [Prisma Documentation](https://www.prisma.io/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

หากมีปัญหาหรือข้อสงสัย กรุณาติดต่อ:
- Email: support@example.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
