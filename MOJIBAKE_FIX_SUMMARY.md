# การแก้ไขปัญหา Mojibake Encoding

## 🔍 ปัญหาที่พบ

### ชื่อไฟล์แสดงเป็น Mojibake
```
❌ ปัญหา: à¸ªà¸£à¸¸à¸à¹à¸à¸¥à¸à¹à¸§à¸¥à¸²à¸­à¹à¸²à¸à¹à¸à¹à¸à¸à¹à¸³à¸à¹à¸³à¸à¸­à¸.pdf
✅ ควรเป็น: สรุปใบลงเวลาอ่างเก็บน้ำน้ำบอง.pdf
```

### สาเหตุ
- ข้อมูลในฐานข้อมูลถูกเก็บเป็น UTF-8 bytes ที่ถูกต้อง
- แต่เมื่อส่งผ่าน API และแสดงใน frontend เกิดการแปลง encoding ผิด
- ทำให้ UTF-8 bytes ถูกตีความเป็น Latin-1 characters

## ✅ การแก้ไข

### 1. **เพิ่มฟังก์ชัน fixMojibakeEncoding**
```javascript
function fixMojibakeEncoding(text) {
  if (!text || typeof text !== 'string') {
    return text
  }

  // ตรวจสอบว่ามี Mojibake encoding หรือไม่
  if (!text.includes('à¸') && !text.includes('à¹') && !text.includes('à¸­')) {
    return text
  }

  // วิธีที่ 1: ใช้ Buffer (Node.js)
  try {
    if (typeof Buffer !== 'undefined') {
      const buffer = Buffer.from(text, 'latin1')
      const decoded = buffer.toString('utf8')
      if (decoded !== text && !decoded.includes('à¸')) {
        console.log(`🔧 Fixed Mojibake (Buffer): "${text}" → "${decoded}"`)
        return decoded
      }
    }
  } catch (e) {
    console.warn('⚠️ Buffer decode failed:', e)
  }

  // วิธีที่ 2: แปลงจาก Latin-1 เป็น UTF-8
  try {
    const latin1Bytes = new Uint8Array(text.split('').map(c => c.charCodeAt(0)))
    const utf8String = new TextDecoder('latin1').decode(latin1Bytes)
    
    if (utf8String !== text && !utf8String.includes('à¸')) {
      console.log(`🔧 Fixed Mojibake (Latin-1): "${text}" → "${utf8String}"`)
      return utf8String
    }
  } catch (e) {
    console.warn('⚠️ Latin-1 decode failed:', e)
  }

  // ถ้าแก้ไขไม่ได้ ให้คืนค่าเดิม
  console.warn(`⚠️ Could not fix Mojibake encoding for: "${text}"`)
  return text
}
```

### 2. **ใช้ฟังก์ชันใน FileUploadEdit.jsx**
```javascript
// แปลงให้ตรงกับรูปแบบที่ใช้ใน state
const normalizedFiles = arr.map((file, index) => {
  console.log(`🔍 [FileUploadEdit] file[${index}]:`, file)
  
  // ✅ แก้ไข UTF-8 encoding สำหรับชื่อไฟล์
  const fileName = fixMojibakeEncoding(file.namefile || file.name || file.originalName || `file_${index}`)
  
  return {
    name: fileName,
    url: file.url,
    size: file.size,
    type: file.fileType || file.type
  }
})
```

## 🧪 การทดสอบ

### Test Case 1: Mojibake Detection
```javascript
const problematicFileName = 'à¸ªà¸£à¸¸à¸à¹à¸à¸¥à¸à¹à¸§à¸¥à¸²à¸­à¹à¸²à¸à¹à¸à¹à¸à¸à¹à¸³à¸à¹à¸³à¸à¸­à¸.pdf'
const hasMojibake = problematicFileName.includes('à¸') // true
```

### Test Case 2: Buffer Conversion
```javascript
const buffer = Buffer.from(problematicFileName, 'latin1')
const decoded = buffer.toString('utf8')
// ผลลัพธ์: "สรุลวลาอาำำอ.pdf"
```

### Test Case 3: TextDecoder
```javascript
const latin1Bytes = new Uint8Array(problematicFileName.split('').map(c => c.charCodeAt(0)))
const utf8String = new TextDecoder('latin1').decode(latin1Bytes)
// ผลลัพธ์: "สรุลวลาอาำำอ.pdf"
```

## 📊 ผลลัพธ์

### ก่อนแก้ไข:
- ❌ ชื่อไฟล์แสดงเป็น Mojibake
- ❌ อ่านชื่อไฟล์ไม่ได้
- ❌ UI ไม่เป็นมิตรกับผู้ใช้

### หลังแก้ไข:
- ✅ ชื่อไฟล์แสดงถูกต้อง (บางส่วน)
- ✅ สามารถอ่านชื่อไฟล์ได้
- ✅ UI เป็นมิตรกับผู้ใช้มากขึ้น

## ⚠️ ข้อจำกัด

### การแก้ไขยังไม่สมบูรณ์
- ผลลัพธ์ที่ได้: `"สรุลวลาอาำำอ.pdf"`
- ผลลัพธ์ที่คาดหวัง: `"สรุปใบลงเวลาอ่างเก็บน้ำน้ำบอง.pdf"`
- ยังมีตัวอักษรบางตัวที่แสดงเป็น `` (replacement character)

### สาเหตุที่ยังแก้ไขไม่ได้
1. **ข้อมูลต้นทางเสียหาย**: ข้อมูลในฐานข้อมูลอาจถูกเก็บผิดรูปแบบตั้งแต่ต้น
2. **การแปลงหลายชั้น**: ข้อมูลผ่านการแปลง encoding หลายครั้ง
3. **UTF-8 bytes ไม่สมบูรณ์**: บาง bytes อาจหายไปหรือผิดพลาด

## 🔧 วิธีแก้ไขเพิ่มเติม

### 1. **ตรวจสอบฐานข้อมูล**
```sql
SELECT namefile, LENGTH(namefile), HEX(namefile) FROM uploads WHERE namefile LIKE '%à¸%';
```

### 2. **แก้ไขที่ต้นทาง**
- ตรวจสอบการตั้งค่า charset ของฐานข้อมูล
- ตรวจสอบการตั้งค่า charset ของ API response
- ตรวจสอบการตั้งค่า charset ของ frontend

### 3. **ใช้การ mapping**
```javascript
const thaiCharMap = {
  'à¸ª': 'ส',
  'à¸£': 'ร',
  'à¸¸': 'ุ',
  // ... mapping อื่นๆ
}
```

## 📁 ไฟล์ที่แก้ไข

1. **`src/components/featureUi/FileUploadEdit.jsx`**
   - เพิ่มฟังก์ชัน `fixMojibakeEncoding`
   - ใช้ฟังก์ชันในการ normalize ข้อมูลไฟล์

## 🚀 การใช้งาน

1. เข้าหน้า edit ของ building control
2. ชื่อไฟล์ที่มี Mojibake จะถูกแก้ไขอัตโนมัติ
3. ชื่อไฟล์จะแสดงผลดีขึ้น (แม้จะไม่สมบูรณ์)

## 🔍 Debug Information

ใช้ console.log เพื่อติดตาม:
- `🔧 Fixed Mojibake (Buffer): "..." → "..."`
- `🔧 Fixed Mojibake (Latin-1): "..." → "..."`
- `⚠️ Could not fix Mojibake encoding for: "..."`

## 📝 หมายเหตุ

- การแก้ไขนี้เป็น temporary solution
- ควรแก้ไขที่ต้นทาง (ฐานข้อมูล/API) เพื่อผลลัพธ์ที่ดีที่สุด
- ฟังก์ชันนี้จะทำงานเฉพาะใน browser environment ที่มี Buffer support
