# Changelog

## [1.0.0] - 2024-01-20

### ✨ Added
- **Swagger UI Integration**: ติดตั้งและตั้งค่า Swagger UI สำหรับ API documentation
- **API Documentation**: สร้าง comprehensive API documentation พร้อม examples
- **Standardized API Endpoints**: ปรับปรุงการตั้งชื่อ API ให้สอดคล้องกัน
- **File Storage Optimization**: ปรับปรุงการเก็บไฟล์ให้ไปที่ `public/uploads` โดยตรง

### 🔧 Changed
- **API Structure**: ลบ API endpoints ที่ไม่จำเป็นออก
- **File Upload Response**: ปรับปรุง response format ให้สอดคล้องกัน
- **Error Handling**: ปรับปรุงการจัดการ error messages
- **UTF-8 Filename Support**: ปรับปรุงการรองรับชื่อไฟล์ภาษาไทย

### 🗑️ Removed
- **Legacy Endpoints**: ลบ `/api/upload/document/:documentId` (ใช้ `/api/upload` แทน)
- **Redundant Routes**: ลบ `/api/upload/public/:token` (ใช้ `/c/:token` แทน)
- **Unused Health Check**: ลบ `/api/upload/health` และ `/api/upload/fix-urls`
- **File List Endpoint**: ลบ `/api/upload/list` (ใช้ `/api/upload/files/:documentId` แทน)

### 📋 Current API Endpoints

#### File Upload
- `POST /api/upload` - อัปโหลดไฟล์เดี่ยว
- `POST /api/upload/multiple` - อัปโหลดหลายไฟล์พร้อมกัน

#### File Management
- `GET /api/upload/files/{documentId}` - ดึงรายการไฟล์ของ document
- `DELETE /api/upload/file/{id}` - ลบไฟล์
- `GET /api/upload/stats` - สถิติไฟล์

#### File Access
- `GET /c/{token}` - เข้าถึงไฟล์แบบ public

### 🛠️ Technical Improvements
- **Swagger Configuration**: ตั้งค่า Swagger UI ที่ `/api-docs`
- **File Storage**: ใช้ `public/uploads` เป็น storage location
- **Response Format**: ใช้ format เดียวกันสำหรับทุก endpoints
- **Error Messages**: ใช้ภาษาไทยสำหรับ error messages

### 📚 Documentation
- **API README**: สร้าง comprehensive API documentation
- **Swagger UI**: Interactive API documentation ที่ `/api-docs`
- **Usage Examples**: เพิ่ม examples สำหรับ JavaScript และ cURL

### 🔍 File Structure
```
routes/
├── upload.js (cleaned up)
config/
├── swagger.js (new)
API_README.md (new)
CHANGELOG.md (new)
```

### 🚀 Access Points
- **API Documentation**: http://localhost:3002/api-docs
- **Admin Panel**: http://localhost:3002/admin
- **API Base URL**: http://localhost:3002/api

### 📦 Dependencies Added
- `swagger-ui-express`: สำหรับ Swagger UI
- `swagger-jsdoc`: สำหรับ generate Swagger specs

### 🐛 Bug Fixes
- แก้ไขปัญหาการอ่านชื่อไฟล์ภาษาไทยใน FileUploadEdit component
- ปรับปรุงการ normalize ชื่อไฟล์ใน frontend
- แก้ไขการส่ง response format ให้สอดคล้องกัน

### 🔄 Migration Notes
- API endpoints เก่าจะยังทำงานได้ (backward compatibility)
- ไฟล์เก่าจะยังเข้าถึงได้ผ่าน `/c/{token}`
- ไม่มีการเปลี่ยนแปลง database schema

### 📈 Performance
- ลดจำนวน API endpoints จาก 13 เป็น 6 endpoints
- ปรับปรุงการจัดการไฟล์ให้มีประสิทธิภาพมากขึ้น
- ลดความซับซ้อนของ codebase

### 🔒 Security
- รักษา file type validation
- รักษา file size limits (10MB)
- รักษา token-based access control
