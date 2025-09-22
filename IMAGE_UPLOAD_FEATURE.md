# 🖼️ Image Upload Feature Documentation

## ภาพรวม
เพิ่ม feature อัปโหลดรูปภาพสำหรับ Map system เพื่อให้สามารถแนบรูปภาพกับแต่ละ Map record ได้

## 🚀 Features ที่เพิ่มเข้าไป

### 1. **API Endpoints** (`/routes/upload.js`)

#### **POST /api/upload/image**
- อัปโหลดรูปภาพเดี่ยว
- รองรับไฟล์: JPEG, JPG, PNG, GIF, WEBP
- ขนาดสูงสุด: 5MB
- สามารถผูกกับ Map ID ได้

#### **GET /api/upload/images**
- ดึงรายการรูปภาพทั้งหมด
- รองรับ pagination
- สามารถกรองตาม Map ID

#### **GET /api/upload/image/{id}**
- ดึงข้อมูลรูปภาพตาม ID

#### **DELETE /api/upload/image/{id}**
- ลบรูปภาพและไฟล์

### 2. **Database Schema** (`prisma/schema.prisma`)

```sql
model ImageUpload {
  id           Int      @id @default(autoincrement())
  filename     String   @db.VarChar(255)
  originalName String   @db.VarChar(255)
  path         String   @db.VarChar(500)
  url          String   @db.VarChar(500)
  size         Int
  mimetype     String   @db.VarChar(100)
  mapId        Int?
  map          Map?     @relation(fields: [mapId], references: [id], onDelete: SetNull)
  description  String?  @db.Text
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt

  @@index([mapId])
}
```

### 3. **MapField Component** (`src/components/map/mapfild.jsx`)

#### **เพิ่ม ImageUpload Component**
- แสดงในโหมด edit และ show
- รองรับการลากและวางไฟล์
- แสดงรูปภาพแบบ grid
- ปุ่มลบรูปภาพ

#### **State Management**
- `images` state สำหรับเก็บรายการรูปภาพ
- `handleImageUpload` สำหรับเพิ่มรูปภาพใหม่
- `handleImageRemove` สำหรับลบรูปภาพ

### 4. **ImageUpload Component** (`src/components/featureUi/ImageUpload.jsx`)

#### **คุณสมบัติ**
- **Drag & Drop**: ลากไฟล์มาวางได้
- **Multiple Upload**: อัปโหลดหลายไฟล์พร้อมกัน
- **File Validation**: ตรวจสอบประเภทไฟล์
- **Image Preview**: แสดงรูปภาพแบบ thumbnail
- **Progress Indicator**: แสดงสถานะการอัปโหลด
- **Delete Function**: ลบรูปภาพได้

#### **Props**
```javascript
{
  images: [],           // รายการรูปภาพ
  mapId: number,        // ID ของ Map
  mode: "edit|show",    // โหมดการแสดงผล
  onImageUpload: func,  // callback เมื่ออัปโหลดสำเร็จ
  onImageRemove: func,  // callback เมื่อลบรูปภาพ
  maxImages: 10         // จำนวนรูปภาพสูงสุด
}
```

### 5. **Location API Enhancement** (`routes/location.js`)

#### **เพิ่ม images field**
- ทุก location response จะมี `images` array
- รวมข้อมูลรูปภาพที่ผูกกับ Map

## 📁 File Structure

```
├── routes/
│   └── upload.js                    # Image upload API
├── src/components/
│   ├── map/
│   │   └── mapfild.jsx             # MapField with image upload
│   └── featureUi/
│       └── ImageUpload.jsx         # Image upload component
├── prisma/
│   └── schema.prisma               # Database schema
├── public/
│   └── uploads/
│       └── images/                 # Image storage directory
└── test-image-upload.html          # Test page
```

## 🔧 การใช้งาน

### 1. **ใน MapField**
```javascript
<ImageUpload
  images={images}
  mapId={record?.id}
  mode={mode}
  onImageUpload={handleImageUpload}
  onImageRemove={handleImageRemove}
  maxImages={10}
/>
```

### 2. **API Usage**
```javascript
// อัปโหลดรูปภาพ
const formData = new FormData()
formData.append('image', file)
formData.append('mapId', mapId)

const response = await fetch('/api/upload/image', {
  method: 'POST',
  body: formData
})

// ดึงรูปภาพ
const response = await fetch('/api/upload/images?mapId=123')
const data = await response.json()
```

## 🎯 API Response Format

### **Image Upload Response**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "filename": "image-1234567890.jpg",
    "originalName": "photo.jpg",
    "path": "/path/to/file",
    "url": "http://localhost:3000/uploads/images/image-1234567890.jpg",
    "size": 1024000,
    "mimetype": "image/jpeg",
    "mapId": 123,
    "description": "รูปภาพสำหรับ Map ID: 123",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  },
  "message": "อัปโหลดรูปภาพสำเร็จ"
}
```

### **Location Response with Images**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "สถานที่ทดสอบ",
      "address": "123 ถนนทดสอบ",
      "coordinates": [7.5563, 99.6114],
      "type": "buildingControl",
      "images": [
        {
          "id": 1,
          "filename": "image-1234567890.jpg",
          "url": "http://localhost:3000/uploads/images/image-1234567890.jpg",
          "size": 1024000,
          "created_at": "2024-01-01T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

## 🧪 การทดสอบ

### **Test Page**
เปิด `test-image-upload.html` ในเบราว์เซอร์เพื่อทดสอบ:
- อัปโหลดรูปภาพ
- ลบรูปภาพ
- ดูรายการรูปภาพ

### **API Testing**
```bash
# ทดสอบอัปโหลด
curl -X POST http://localhost:3000/api/upload/image \
  -F "image=@test.jpg" \
  -F "mapId=1"

# ทดสอบดึงรายการ
curl http://localhost:3000/api/upload/images?mapId=1
```

## 🔒 Security Features

1. **File Type Validation**: ตรวจสอบประเภทไฟล์
2. **File Size Limit**: จำกัดขนาดไฟล์ 5MB
3. **Unique Filename**: สร้างชื่อไฟล์ที่ไม่ซ้ำ
4. **Path Sanitization**: ป้องกัน directory traversal
5. **Database Cleanup**: ลบไฟล์เมื่อลบ record

## 📊 Performance

- **Image Compression**: ใช้ multer สำหรับจัดการไฟล์
- **Database Indexing**: index บน mapId
- **File Storage**: เก็บไฟล์ใน public/uploads/images/
- **URL Generation**: สร้าง URL สำหรับเข้าถึงรูปภาพ

## 🚀 Next Steps

1. **Image Resizing**: เพิ่มการปรับขนาดรูปภาพ
2. **Thumbnail Generation**: สร้าง thumbnail อัตโนมัติ
3. **CDN Integration**: ใช้ CDN สำหรับรูปภาพ
4. **Image Optimization**: ปรับปรุงประสิทธิภาพการโหลด
5. **Bulk Upload**: อัปโหลดหลายไฟล์พร้อมกัน

## ✅ Status

- [x] API Endpoints
- [x] Database Schema
- [x] MapField Integration
- [x] ImageUpload Component
- [x] Location API Enhancement
- [x] Swagger Documentation
- [x] Test Page
- [x] File Validation
- [x] Error Handling
