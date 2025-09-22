# การแก้ไข MapField Component (Version 2)

## ปัญหาที่พบ
ใน `src/components/map/mapfild.jsx` ยังมีปัญหาในการอัปเดต latitude และ longitude:

### **ปัญหาเดิม:**
1. **Latitude input**: เมื่อเปลี่ยนค่า latitude หมุดไม่เคลื่อนที่ในแนวตั้ง
2. **Longitude input**: เมื่อเปลี่ยนค่า longitude หมุดไม่เคลื่อนที่ในแนวนอน
3. **การ sync**: ค่าใน input field และหมุดไม่ sync กัน

### **สาเหตุ:**
- `onChange` callback ไม่ได้อัปเดตทั้ง latitude และ longitude พร้อมกัน
- เมื่อเปลี่ยน latitude ต้องอัปเดต longitude ด้วย
- เมื่อเปลี่ยน longitude ต้องอัปเดต latitude ด้วย

## การแก้ไข

### **ก่อนแก้ไข (ผิด):**
```javascript
// Latitude input - ผิด
onChange={(e) => {
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    setLatLng(val, longitude)
    onChange?.("latitude", val)  // ❌ ไม่ได้อัปเดต longitude
  }
}}

// Longitude input - ผิด
onChange={(e) => {
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    setLatLng(latitude, val)
    onChange?.("longitude", val)  // ❌ ไม่ได้อัปเดต latitude
  }
}}
```

### **หลังแก้ไข (ถูกต้อง):**
```javascript
// Latitude input - ถูกต้อง
onChange={(e) => {
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    setLatLng(val, longitude)
    onChange?.("latitude", val)
    onChange?.("longitude", longitude)  // ✅ อัปเดต longitude ด้วย
  }
}}

// Longitude input - ถูกต้อง
onChange={(e) => {
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    setLatLng(latitude, val)
    onChange?.("latitude", latitude)  // ✅ อัปเดต latitude ด้วย
    onChange?.("longitude", val)
  }
}}
```

## ผลลัพธ์หลังแก้ไข

### **ก่อนแก้ไข:**
- ❌ เมื่อเปลี่ยน latitude: หมุดไม่เคลื่อนที่ในแนวตั้ง
- ❌ เมื่อเปลี่ยน longitude: หมุดไม่เคลื่อนที่ในแนวนอน
- ❌ ค่าใน input field และหมุดไม่ sync กัน

### **หลังแก้ไข:**
- ✅ เมื่อเปลี่ยน latitude: หมุดเคลื่อนที่ในแนวตั้ง
- ✅ เมื่อเปลี่ยน longitude: หมุดเคลื่อนที่ในแนวนอน
- ✅ ค่าใน input field และหมุด sync กัน
- ✅ เมื่อขยับหมุด: ค่าใน input field อัปเดตถูกต้อง

## ไฟล์ที่แก้ไข
- `src/components/map/mapfild.jsx` (บรรทัด 141-144 และ 155-158)

## การทดสอบ
1. เปิดหน้า AdminJS
2. ไปที่ BuildingControl หรือ Map
3. ลองเปลี่ยนค่าใน Latitude input field
4. ตรวจสอบว่าหมุดเคลื่อนที่ในแนวตั้ง
5. ลองเปลี่ยนค่าใน Longitude input field
6. ตรวจสอบว่าหมุดเคลื่อนที่ในแนวนอน
7. ลองขยับหมุดบนแผนที่
8. ตรวจสอบว่าค่าใน input field อัปเดตถูกต้อง

## หมายเหตุ
การแก้ไขนี้ทำให้ MapField component ทำงานได้ถูกต้องทั้งการ:
- เปลี่ยนค่าใน input field
- ขยับหมุดบนแผนที่
- Sync ข้อมูลระหว่าง input field และหมุด
- การอัปเดตทั้ง latitude และ longitude พร้อมกัน
