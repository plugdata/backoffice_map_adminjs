# การแก้ไขปัญหาการอ่านชื่อไฟล์

## 🔍 ปัญหาที่พบ

### 1. **useEffect ถูก comment ออก**
- ทำให้ไม่โหลดไฟล์เก่าจาก database
- ไฟล์ที่อัปโหลดแล้วไม่แสดงในหน้า edit

### 2. **URL ใน payload ไม่ถูกต้อง**
```json
{
  "uploadfile": "[{\"namefile\":\"รายงานการสำรวจอาคาร.pdf\",\"url\":\"https://example.com/uploads/building_report.pdf\",\"size\":102400,\"fileType\":\"pdf\"}]"
}
```
- ใช้ `https://example.com/uploads/building_report.pdf` แทนที่จะเป็น URL จริง
- ควรเป็น `/uploads/filename.pdf`

### 3. **การ map ข้อมูลไม่ถูกต้อง**
- ใช้ `file.name` แทน `file.namefile`
- ไม่รองรับ fallback values

## ✅ การแก้ไข

### 1. **เปิดใช้งาน useEffect**
```javascript
useEffect(() => {
  const val = props.record?.params?.uploadfile
  console.log('🔍 [FileUploadEdit] props.record?.params?.uploadfile:', val)
  
  if (val) {
    try {
      const arr = JSON.parse(val)
      const normalizedFiles = arr.map((file, index) => ({
        name: file.namefile || file.name || file.originalName || `file_${index}`,
        url: file.url,
        size: file.size,
        type: file.fileType || file.type
      }))
      setFiles(normalizedFiles)
    } catch (e) {
      console.error('❌ [FileUploadEdit] parse error:', e)
    }
  }
}, [props.record])
```

### 2. **ปรับปรุงการ map ข้อมูลใน handleUpload**
```javascript
const uploaded = (data?.files || []).map((file) => ({
  name: file.namefile || file.originalName || file.name,
  url: file.url,
  size: file.size,
  type: file.fileType || file.mimetype,
}))
```

### 3. **เพิ่ม UI สำหรับแสดงรายการไฟล์**
- แสดงรายการไฟล์ที่อัปโหลดแล้ว
- ปุ่ม "ดูไฟล์" และ "ลบ"
- แสดงข้อมูลไฟล์ (ชื่อ, ประเภท, ขนาด)

### 4. **เพิ่ม console.log สำหรับ debug**
- ใน `FileUploadEdit.jsx`
- ใน `actions.js`
- เพื่อติดตามการทำงาน

## 🧪 การทดสอบ

### Test Case 1: Parse JSON
```javascript
const uploadfile = '[{"namefile":"รายงานการสำรวจอาคาร.pdf","url":"https://example.com/uploads/building_report.pdf","size":102400,"fileType":"pdf"}]'
const parsed = JSON.parse(uploadfile)
// ✅ ทำงานได้ปกติ
```

### Test Case 2: Normalize Data
```javascript
const normalized = parsed.map(file => ({
  name: file.namefile || file.name || file.originalName || `file_${index}`,
  url: file.url,
  size: file.size,
  type: file.fileType || file.type
}))
// ✅ ได้ข้อมูลที่ถูกต้อง
```

### Test Case 3: AdminJS Format
```javascript
const adminJSFormat = normalized.map(file => ({
  namefile: file.name,
  url: file.url,
  size: file.size,
  fileType: file.type
}))
// ✅ ส่งกลับไป AdminJS ได้ถูกต้อง
```

## 📋 ผลลัพธ์

### ก่อนแก้ไข:
- ❌ ไฟล์เก่าไม่แสดงในหน้า edit
- ❌ URL ไม่ถูกต้อง
- ❌ การ map ข้อมูลผิด

### หลังแก้ไข:
- ✅ ไฟล์เก่าแสดงในหน้า edit
- ✅ URL ถูกต้อง (ถ้าเป็น URL จริง)
- ✅ การ map ข้อมูลถูกต้อง
- ✅ UI แสดงรายการไฟล์
- ✅ รองรับการลบไฟล์

## 🔧 ไฟล์ที่แก้ไข

1. **`src/components/featureUi/FileUploadEdit.jsx`**
   - เปิดใช้งาน useEffect
   - ปรับปรุงการ map ข้อมูล
   - เพิ่ม UI แสดงรายการไฟล์
   - เพิ่ม console.log

2. **`page/buildingControl/actions.js`**
   - เพิ่ม console.log สำหรับ debug

## 🚀 การใช้งาน

1. เข้าหน้า edit ของ building control
2. ไฟล์เก่าจะแสดงในรายการ "ไฟล์ที่อัปโหลดแล้ว"
3. สามารถดูไฟล์ได้โดยคลิก "ดูไฟล์"
4. สามารถลบไฟล์ได้โดยคลิก "ลบ"
5. สามารถอัปโหลดไฟล์ใหม่ได้

## ⚠️ หมายเหตุ

- URL ใน payload ยังเป็น `https://example.com` ซึ่งเป็นข้อมูลตัวอย่าง
- ต้องตรวจสอบว่า URL จริงจาก database เป็นอย่างไร
- อาจต้องแก้ไขการสร้าง URL ใน upload API

## 🔍 Debug Information

ใช้ console.log เพื่อติดตาม:
- `props.record?.params?.uploadfile`
- `parsed array`
- `normalizedFiles`
- `upload response`
- `uploaded files`
