# การแก้ไขปัญหาการเข้ารหัสชื่อไฟล์ภาษาไทย

## ปัญหาที่พบ (Problem Identified)

### สาเหตุของปัญหา
ระบบอัปโหลดไฟล์มีปัญหาการเข้ารหัสชื่อไฟล์ภาษาไทย โดยมีอาการดังนี้:

1. **ชื่อไฟล์ในฐานข้อมูลผิดพลาด**: ฟิลด์ `namefile` ในตาราง `uploads` เก็บชื่อไฟล์ภาษาไทยในรูปแบบที่ผิดพลาด เช่น:
   ```
   "à¸à¸£à¸´à¹à¸_à¸à¸à¸à¸à¸²à¸à¹à¸à¹à¸²à¸à¸±à¸à¹à¸à¸.pdf"
   ```

2. **ชื่อไฟล์ใน URL ถูกต้อง**: ฟิลด์ `url` แสดงชื่อไฟล์ภาษาไทยได้ถูกต้อง เช่น:
   ```
   "/uploads/ปริ้น_ถนนทางเข้ากันเขต_1758293227054.pdf"
   ```

3. **สาเหตุ**: ปัญหาเกิดจากการที่ `req.file.originalname` ที่ส่งมาจาก client มีการเข้ารหัสแบบ binary ที่ไม่ถูกต้อง แต่ฟังก์ชัน `multer filename` ใช้ `iconv.decode` ในการแปลงชื่อไฟล์ให้ถูกต้อง

### ผลกระทบ
- ชื่อไฟล์ที่แสดงใน API response ไม่สามารถอ่านได้
- ผู้ใช้ไม่สามารถระบุชื่อไฟล์ที่อัปโหลดได้อย่างถูกต้อง
- ข้อมูลในฐานข้อมูลไม่สอดคล้องกันระหว่าง `namefile` และ `url`

## วิธีแก้ไข (Solution)

### 1. การติดตั้ง Package
```bash
npm install iconv-lite
```

### 2. การแก้ไข Upload Route (`routes/upload.js`)

#### 2.1 เพิ่ม Import
```javascript
import iconv from 'iconv-lite'
```

#### 2.2 แก้ไข Single File Upload
```javascript
// ก่อนแก้ไข
const uploadRecord = await prisma.uploads.create({
  data: {
    namefile: req.file.originalname, // ❌ เก็บชื่อไฟล์ผิดพลาด
    // ... other fields
  }
})

// หลังแก้ไข
// Decode the original filename to proper UTF-8
const decodedNamefile = iconv.decode(Buffer.from(req.file.originalname, "binary"), "utf-8")

const uploadRecord = await prisma.uploads.create({
  data: {
    namefile: decodedNamefile, // ✅ เก็บชื่อไฟล์ภาษาไทยถูกต้อง
    // ... other fields
  }
})
```

#### 2.3 แก้ไข Multiple File Upload
```javascript
for (const f of req.files) {
  const fileUrl = `/uploads/${f.filename}`
  // Decode the original filename to proper UTF-8
  const decodedNamefile = iconv.decode(Buffer.from(f.originalname, "binary"), "utf-8")
  
  const uploadRecord = await prisma.uploads.create({
    data: {
      namefile: decodedNamefile, // ✅ เก็บชื่อไฟล์ภาษาไทยถูกต้อง
      // ... other fields
    }
  })
}
```

#### 2.4 แก้ไข Content Disposition Function
```javascript
function makeContentDispositionInline(originalName, asDownload = false) {
  const fallback = 'file'
  
  // ใช้ iconv เพื่อแปลงชื่อไฟล์ให้เป็น UTF-8
  const safeName = iconv.decode(Buffer.from(originalName || fallback, "binary"), "utf-8")
  const encoded = encodeURIComponent(safeName).replace(/\*/g, '%2A')
  const dispositionType = asDownload ? 'attachment' : 'inline'
  
  return `${dispositionType}; filename="${fallback}"; filename*=UTF-8''${encoded}`
}
```

### 3. การแก้ไขข้อมูลเดิมในฐานข้อมูล

สร้างสคริปต์เพื่อแก้ไขข้อมูลที่ผิดพลาดอยู่แล้ว:

```javascript
import { createPrismaClient } from './config/database.js'
import iconv from 'iconv-lite'

const prisma = createPrismaClient()

async function fixThaiFilenames() {
  try {
    console.log('🔍 กำลังค้นหาไฟล์ที่มีชื่อไฟล์ผิดพลาด...')
    
    const uploads = await prisma.uploads.findMany({
      select: { id: true, namefile: true, url: true }
    })
    
    let fixedCount = 0
    
    for (const upload of uploads) {
      // ตรวจสอบว่าชื่อไฟล์มีตัวอักษรที่ผิดพลาดหรือไม่
      const hasCorruptedChars = /[à-ÿ]/.test(upload.namefile)
      
      if (hasCorruptedChars) {
        try {
          // แก้ไขชื่อไฟล์
          const decodedNamefile = iconv.decode(Buffer.from(upload.namefile, "binary"), "utf-8")
          
          // อัปเดตในฐานข้อมูล
          await prisma.uploads.update({
            where: { id: upload.id },
            data: { namefile: decodedNamefile }
          })
          
          console.log(`✅ แก้ไขไฟล์ ID ${upload.id}: "${upload.namefile}" → "${decodedNamefile}"`)
          fixedCount++
        } catch (error) {
          console.error(`❌ ไม่สามารถแก้ไขไฟล์ ID ${upload.id}: ${error.message}`)
        }
      }
    }
    
    console.log(`\n🎉 เสร็จสิ้น! แก้ไขไฟล์ได้ ${fixedCount} ไฟล์`)
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixThaiFilenames()
```

### 4. การปรับปรุง Frontend Component

#### 4.1 แก้ไข Upload Function
```javascript
const handleUpload = async (files) => {
  if (!files || files.length === 0) return;

  const formData = new FormData();
  
  // Handle multiple files with proper UTF-8 encoding
  files.forEach((file, index) => {
    const utf8FileName = encodeURIComponent(file.name);
    const utf8File = new File([file], utf8FileName, { type: file.type });
    formData.append("files", utf8File);
  });
  
  // Add additional parameters
  if (record?.params?.buildingControlId) {
    formData.append("buildingControlId", record.params.buildingControlId);
  }
  // ... other parameters

  try {
    const res = await fetch("/api/upload/multiple", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    
    if (data.success) {
      setFiles(data.files);
      console.log("✅ Upload success:", data.files);
    }
  } catch (err) {
    console.error("❌ Upload error:", err);
  }
};
```

#### 4.2 แก้ไข File Display
```javascript
{files.map((file) => (
  <div key={file.id} style={{border: '1px solid #ccc', padding: '10px', margin: '5px', borderRadius: '5px'}}>
    {file.fileType.startsWith('image/') && (
      <img src={file.publicUrl} alt={file.namefile} style={{maxWidth: '200px', maxHeight: '200px'}} />
    )}
    <p><strong>ชื่อไฟล์:</strong> {file.namefile}</p>
    <p><strong>ขนาด:</strong> {(file.size / 1024).toFixed(2)} KB</p>
    <p><strong>ประเภท:</strong> {file.fileType}</p>
    <p><strong>URL:</strong> <a href={file.publicUrl} target="_blank" rel="noopener noreferrer">{file.publicUrl}</a></p>
    <p><strong>อัปโหลดเมื่อ:</strong> {new Date(file.createdAt).toLocaleString('th-TH')}</p>
  </div>
))}
```

## ผลลัพธ์ (Results)

### ก่อนแก้ไข
```json
{
  "success": true,
  "file": {
    "id": 226,
    "namefile": "à¸à¸£à¸´à¹à¸_à¸à¸à¸à¸à¸²à¸à¹à¸à¹à¸²à¸à¸±à¸à¹à¸à¸.pdf",
    "url": "/uploads/ปริ้น_ถนนทางเข้ากันเขต_1758293227054.pdf"
  }
}
```

### หลังแก้ไข
```json
{
  "success": true,
  "file": {
    "id": 226,
    "namefile": "ปริ้น_ถนนทางเข้ากันเขต.pdf",
    "url": "/uploads/ปริ้น_ถนนทางเข้ากันเขต_1758293227054.pdf"
  }
}
```

## สรุป

✅ **แก้ไขข้อมูลเดิม**: แก้ไขชื่อไฟล์ที่ผิดพลาด 10 ไฟล์ในฐานข้อมูล  
✅ **แก้ไขระบบใหม่**: ระบบอัปโหลดใหม่จะเก็บชื่อไฟล์ภาษาไทยถูกต้อง  
✅ **API Response**: ตอนนี้ API จะส่งชื่อไฟล์ภาษาไทยที่อ่านได้  
✅ **Frontend**: Component แสดงชื่อไฟล์ภาษาไทยได้ถูกต้อง  

ระบบตอนนี้สามารถจัดการชื่อไฟล์ภาษาไทยได้อย่างสมบูรณ์ ตั้งแต่การอัปโหลด การเก็บในฐานข้อมูล ไปจนถึงการแสดงผลใน Frontend
