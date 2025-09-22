# API Documentation - Upload System

## Overview
ระบบจัดการไฟล์อัปโหลดที่รองรับการอัปโหลดไฟล์หลายประเภท พร้อมระบบจัดการฐานข้อมูลและไฟล์ในระบบ

## Base URL
```
/api/upload
```

## Supported File Types
- PDF (`application/pdf`)
- PNG (`image/png`)
- JPEG (`image/jpeg`)
- TXT (`text/plain`)
- DOC (`application/msword`)
- DOCX (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`)

## File Size Limit
- ขนาดสูงสุด: 10MB ต่อไฟล์

---

## API Endpoints

### 1. อัปโหลดไฟล์เดี่ยว
**POST** `/api/upload`

อัปโหลดไฟล์เดียวและสร้าง record ในฐานข้อมูล

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file` (required): ไฟล์ที่ต้องการอัปโหลด
  - `buildingControlId` (optional): ID ของ building control
  - `riskZoneId` (optional): ID ของ risk zone
  - `zoningPlanId` (optional): ID ของ zoning plan

**Response:**
```json
{
  "success": true,
  "file": {
    "id": 1,
    "token": "abc123",
    "originalName": "document.pdf",
    "filename": "document_1234567890.pdf",
    "path": "/path/to/file",
    "size": 1024000,
    "mimetype": "application/pdf",
    "url": "/uploads/document_1234567890.pdf",
    "publicUrl": "/c/abc123"
  },
  "uploadRecord": {
    "id": 1,
    "namefile": "document.pdf",
    "url": "/uploads/document_1234567890.pdf",
    "fileType": "application/pdf",
    "size": 1024000,
    "token": "abc123"
  }
}
```

---

### 2. อัปโหลดไฟล์เดี่ยว (Legacy)
**POST** `/api/upload/document/:documentId?`

เส้นทางเดิมสำหรับอัปโหลดไฟล์เดี่ยว (รองรับ documentId ใน URL)

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- URL Parameters:
  - `documentId` (optional): ID ของ document
- Body: เหมือนกับ endpoint หลัก

**Response:** เหมือนกับ endpoint หลัก

---

### 3. อัปโหลดหลายไฟล์
**POST** `/api/upload/multiple`

อัปโหลดหลายไฟล์พร้อมกัน (สูงสุด 20 ไฟล์)

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `files` (required): ไฟล์หลายไฟล์ (array)
  - `buildingControlId` (optional): ID ของ building control
  - `riskZoneId` (optional): ID ของ risk zone
  - `zoningPlanId` (optional): ID ของ zoning plan

**Response:**
```json
{
  "success": true,
  "files": [
    {
      "id": 1,
      "token": "abc123",
      "originalName": "file1.pdf",
      "filename": "file1_1234567890.pdf",
      "size": 1024000,
      "mimetype": "application/pdf",
      "url": "/uploads/file1_1234567890.pdf",
      "publicUrl": "/c/abc123"
    }
  ]
}
```

---

### 4. เข้าถึงไฟล์แบบ Public (Google Drive Style)
**GET** `/c/:token`

เข้าถึงไฟล์ผ่าน token แบบ public (ไม่ต้อง authentication)

**Request:**
- Method: `GET`
- URL Parameters:
  - `token` (required): Token ของไฟล์

**Response:**
- ไฟล์ที่ต้องการ (inline display)
- Headers:
  - `Content-Disposition`: inline; filename="ชื่อไฟล์"
  - `Content-Type`: ประเภทไฟล์

---

### 5. แสดงไฟล์ตามชื่อไฟล์
**GET** `/api/upload/file/:filename`

แสดงไฟล์ตามชื่อไฟล์ (inline)

**Request:**
- Method: `GET`
- URL Parameters:
  - `filename` (required): ชื่อไฟล์

**Response:**
- ไฟล์ที่ต้องการ (inline display)

---

### 6. ดาวน์โหลดไฟล์ตามชื่อไฟล์
**GET** `/api/upload/file/:filename/download`

ดาวน์โหลดไฟล์ตามชื่อไฟล์

**Request:**
- Method: `GET`
- URL Parameters:
  - `filename` (required): ชื่อไฟล์

**Response:**
- ไฟล์ที่ต้องการ (download)

---

### 7. Legacy Public Access
**GET** `/api/upload/public/:token`

เส้นทางเดิมสำหรับเข้าถึงไฟล์แบบ public (redirect ไป `/c/:token`)

**Request:**
- Method: `GET`
- URL Parameters:
  - `token` (required): Token ของไฟล์

**Response:**
- Redirect ไป `/c/:token`

---

### 8. ดึงรายการไฟล์ของ Document
**GET** `/api/upload/files/:documentId`

ดึงรายการไฟล์ทั้งหมดที่เกี่ยวข้องกับ document

**Request:**
- Method: `GET`
- URL Parameters:
  - `documentId` (required): ID ของ document

**Response:**
```json
{
  "files": [
    {
      "id": 1,
      "token": "abc123",
      "namefile": "document.pdf",
      "size": 1024000,
      "fileType": "application/pdf",
      "url": "/uploads/document_1234567890.pdf",
      "publicUrl": "/c/abc123",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 9. ลบไฟล์
**DELETE** `/api/upload/file/:id`

ลบไฟล์จากฐานข้อมูลและระบบไฟล์

**Request:**
- Method: `DELETE`
- URL Parameters:
  - `id` (required): ID ของไฟล์

**Response:**
```json
{
  "success": true,
  "message": "ลบไฟล์สำเร็จ"
}
```

---

### 10. รายการไฟล์ทั้งหมด (Admin)
**GET** `/api/upload/list`

ดึงรายการไฟล์ทั้งหมดพร้อม pagination และ filter

**Request:**
- Method: `GET`
- Query Parameters:
  - `page` (optional): หน้าที่ต้องการ (default: 1)
  - `limit` (optional): จำนวนรายการต่อหน้า (default: 20)
  - `search` (optional): ค้นหาตามชื่อไฟล์หรือ token
  - `fileType` (optional): กรองตามประเภทไฟล์
  - `buildingControlId` (optional): กรองตาม building control ID
  - `riskZoneId` (optional): กรองตาม risk zone ID
  - `zoningPlanId` (optional): กรองตาม zoning plan ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "namefile": "document.pdf",
      "token": "abc123",
      "url": "/uploads/document_1234567890.pdf",
      "fileType": "application/pdf",
      "size": 1024000,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "uploadedBy": 1,
      "publicUrl": "/c/abc123",
      "relatedTo": {
        "buildingControl": { "id": 1, "title": "Building Control 1" },
        "riskZone": null,
        "zoningPlan": null
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

---

### 11. สถิติไฟล์
**GET** `/api/upload/stats`

ดึงสถิติการใช้งานระบบไฟล์

**Request:**
- Method: `GET`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalFiles": 100,
    "totalSize": 1048576000,
    "fileTypes": [
      {
        "type": "application/pdf",
        "count": 50,
        "size": 524288000
      }
    ],
    "recentUploads": [
      {
        "id": 1,
        "namefile": "document.pdf",
        "token": "abc123",
        "fileType": "application/pdf",
        "size": 1024000,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 12. ตรวจสอบสถานะระบบ
**GET** `/api/upload/health`

ตรวจสอบสถานะของระบบไฟล์และฐานข้อมูล

**Request:**
- Method: `GET`

**Response:**
```json
{
  "success": true,
  "data": {
    "database": {
      "connected": true,
      "uploadCount": 100,
      "nullUrlCount": 0
    },
    "filesystem": {
      "uploadsDir": true,
      "documentsDir": true
    },
    "status": "healthy"
  }
}
```

---

### 13. แก้ไข URL ที่เป็น null
**POST** `/api/upload/fix-urls`

แก้ไขข้อมูล uploads ที่มี url เป็น null หรือว่าง

**Request:**
- Method: `POST`

**Response:**
```json
{
  "success": true,
  "message": "แก้ไขข้อมูลสำเร็จ 5 รายการ",
  "fixedCount": 5,
  "totalFound": 5
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "ไม่พบไฟล์ที่อัปโหลด"
}
```

### 404 Not Found
```json
{
  "error": "ไม่พบไฟล์"
}
```

### 500 Internal Server Error
```json
{
  "error": "เกิดข้อผิดพลาดในการอัปโหลดไฟล์"
}
```

---

## File Storage Structure

```
public/
└── uploads/
    ├── document_1234567890.pdf
    ├── image_1234567891.png
    └── ...
```

## Database Schema

### uploads table
- `id`: Primary key
- `namefile`: ชื่อไฟล์เดิม
- `url`: Path ของไฟล์ในระบบ
- `fileType`: MIME type ของไฟล์
- `size`: ขนาดไฟล์ (bytes)
- `token`: Token สำหรับ public access
- `buildingControlId`: Foreign key ไป building control
- `riskZoneId`: Foreign key ไป risk zone
- `zoningPlanId`: Foreign key ไป zoning plan
- `uploadedBy`: ID ของผู้อัปโหลด
- `createdAt`: วันที่สร้าง
- `updatedAt`: วันที่อัปเดต

---

## Usage Examples

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
  http://localhost:3000/api/upload

# ดาวน์โหลดไฟล์
curl -O http://localhost:3000/c/abc123
```
