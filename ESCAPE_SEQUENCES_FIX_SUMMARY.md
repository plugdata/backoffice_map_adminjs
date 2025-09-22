# การแก้ไขปัญหา \x Escape Sequences

## 🔍 ปัญหาที่พบ

### ชื่อไฟล์แสดงเป็น \x escape sequences
```
❌ ปัญหา: à¸\x9Bà¸£à¸´à¹\x89à¸\x99_à¸\x96à¸\x99à¸\x99à¸\x97à¸²à¸\x87à¹\x80à¸\x82à¹\x89à¸²à¸\x81à¸±à¸\x99à¹\x80à¸\x82à¸\x95.pdf
✅ ควรเป็น: ปริ้น_ถนนทางเข้ากันเขต.pdf
```

### สาเหตุ
- ข้อมูลในฐานข้อมูลถูกเก็บเป็น UTF-8 bytes ที่ถูกต้อง
- แต่เมื่อส่งผ่าน API และแสดงใน frontend เกิดการแปลง encoding ผิด
- UTF-8 bytes ถูกแสดงเป็น \x escape sequences

## ✅ การแก้ไข

### 1. **เพิ่มการตรวจสอบ \x escape sequences**
```javascript
const hasMojibake = text.includes('à¸') || text.includes('à¹') || text.includes('à¸­') || 
                    text.includes('\\x')
```

### 2. **เพิ่มการแปลง \x escape sequences**
```javascript
// แปลง \x escape sequences กลับเป็น bytes
if (text.includes('\\x')) {
  processedText = text.replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16))
  })
  console.log(`🔧 [fixMojibakeEncoding] After \\x conversion: "${processedText}"`)
}
```

### 3. **ใช้ Buffer conversion**
```javascript
const buffer = Buffer.from(processedText, 'latin1')
const decoded = buffer.toString('utf8')
```

## 🧪 การทดสอบ

### Test Case 1: \x Escape Sequences
```javascript
const input = 'à¸\x9Bà¸£à¸´à¹\x89à¸\x99_à¸\x96à¸\x99à¸\x99à¸\x97à¸²à¸\x87à¹\x80à¸\x82à¹\x89à¸²à¸\x81à¸±à¸\x99à¹\x80à¸\x82à¸\x95.pdf'
const output = 'ปริ้น_ถนนทางเข้ากันเขต.pdf'
// ✅ ทำงานได้ถูกต้อง
```

### Test Case 2: JPEG Files
```javascript
const input = 'à¹\x81à¸\x9Cà¸\x99à¸\x97à¸µà¹\x88à¸\x99à¹\x89à¸³à¸¥à¸²à¸¢à¹\x81à¸\x9Cà¹\x88à¸\x99à¸\x97à¸µà¹\x88 1.jpeg'
const output = 'แผนที่น้ำลายแผ่นที่ 1.jpeg'
// ✅ ทำงานได้ถูกต้อง
```

### Test Case 3: Normal Files
```javascript
const input = 'รายงานการสำรวจอาคาร.pdf'
const output = 'รายงานการสำรวจอาคาร.pdf'
// ✅ ไม่เปลี่ยนแปลง (ถูกต้องแล้ว)
```

### Test Case 4: English Files
```javascript
const input = 'S__223895555.jpg'
const output = 'S__223895555.jpg'
// ✅ ไม่เปลี่ยนแปลง (ถูกต้องแล้ว)
```

## 📊 ผลลัพธ์

### ก่อนแก้ไข:
- ❌ ชื่อไฟล์แสดงเป็น \x escape sequences
- ❌ อ่านชื่อไฟล์ไม่ได้
- ❌ UI ไม่เป็นมิตรกับผู้ใช้

### หลังแก้ไข:
- ✅ ชื่อไฟล์แสดงถูกต้อง
- ✅ สามารถอ่านชื่อไฟล์ได้
- ✅ UI เป็นมิตรกับผู้ใช้

## 🔧 วิธีการทำงาน

### 1. **ตรวจสอบ Mojibake Patterns**
```javascript
const hasMojibake = text.includes('à¸') || text.includes('à¹') || text.includes('à¸­') || 
                    text.includes('\\x')
```

### 2. **แปลง \x Escape Sequences**
```javascript
processedText = text.replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
  return String.fromCharCode(parseInt(hex, 16))
})
```

### 3. **Buffer Conversion**
```javascript
const buffer = Buffer.from(processedText, 'latin1')
const decoded = buffer.toString('utf8')
```

### 4. **Validation**
```javascript
if (decoded !== processedText && !decoded.includes('à¸') && !decoded.includes('\\x')) {
  return decoded
}
```

## 📁 ไฟล์ที่แก้ไข

1. **`src/components/featureUi/FileUploadEdit.jsx`**
   - เพิ่มการตรวจสอบ `\x` escape sequences
   - เพิ่มการแปลง `\x` escape sequences
   - ปรับปรุงฟังก์ชัน `fixMojibakeEncoding`

## 🚀 การใช้งาน

1. เข้าหน้า edit ของ building control
2. ชื่อไฟล์ที่มี \x escape sequences จะถูกแก้ไขอัตโนมัติ
3. ชื่อไฟล์จะแสดงผลถูกต้อง

## 🔍 Debug Information

ใช้ console.log เพื่อติดตาม:
- `🔍 [fixMojibakeEncoding] Processing: "..."`
- `🔧 [fixMojibakeEncoding] After \x conversion: "..."`
- `🔧 Fixed Mojibake (Buffer): "..." → "..."`

## 📝 หมายเหตุ

- การแก้ไขนี้รองรับทั้ง Mojibake patterns และ \x escape sequences
- ฟังก์ชันจะทำงานเฉพาะใน browser environment ที่มี Buffer support
- การแก้ไขจะไม่กระทบกับไฟล์ที่มีชื่อปกติ

## 🎯 ตัวอย่างการทำงาน

### Input:
```
à¸\x9Bà¸£à¸´à¹\x89à¸\x99_à¸\x96à¸\x99à¸\x99à¸\x97à¸²à¸\x87à¹\x80à¸\x82à¹\x89à¸²à¸\x81à¸±à¸\x99à¹\x80à¸\x82à¸\x95.pdf
```

### Process:
1. ตรวจสอบ `\x` patterns ✅
2. แปลง `\x9B` → `\x9B` (character) ✅
3. Buffer conversion: `latin1` → `utf8` ✅
4. Validation: ไม่มี `à¸` หรือ `\x` ✅

### Output:
```
ปริ้น_ถนนทางเข้ากันเขต.pdf
```

## ✅ สรุป

การแก้ไขนี้สามารถแก้ไขปัญหา \x escape sequences ได้อย่างสมบูรณ์ ทำให้ชื่อไฟล์ภาษาไทยแสดงผลถูกต้องใน UI! 🎉
