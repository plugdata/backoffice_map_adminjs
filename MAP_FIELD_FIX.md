# การแก้ไข MapField Component

## ปัญหาที่พบ
ใน `src/components/map/mapfild.jsx` มี bug ในการอัปเดต latitude และ longitude:

### **ปัญหาเดิม:**
```javascript
// Latitude input - ผิด
onChange={(e) => {
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    setLatLng(latitude, val)  // ❌ ผิด: ใช้ latitude แทน val
    onChange?.("latitude", val)
  }
}}

// Longitude input - ผิด  
onChange={(e) => {
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    setLatLng(val, longitude)  // ❌ ผิด: ใช้ longitude แทน val
    onChange?.("longitude", val)
  }
}}
```

### **การแก้ไข:**
```javascript
// Latitude input - ถูกต้อง
onChange={(e) => {
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    setLatLng(val, longitude)  // ✅ ถูกต้อง: ใช้ val สำหรับ latitude
    onChange?.("latitude", val)
  }
}}

// Longitude input - ถูกต้อง
onChange={(e) => {
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    setLatLng(latitude, val)  // ✅ ถูกต้อง: ใช้ val สำหรับ longitude
    onChange?.("longitude", val)
  }
}}
```

## ผลลัพธ์หลังแก้ไข

### **ก่อนแก้ไข:**
- ❌ เมื่อขยับหมุด: latitude ไม่เปลี่ยนแปลง
- ❌ เมื่อขยับหมุด: longitude เปลี่ยนแปลง
- ❌ เมื่อพิมพ์ใน input: ค่าไม่ตรงกับหมุด

### **หลังแก้ไข:**
- ✅ เมื่อขยับหมุด: latitude และ longitude เปลี่ยนแปลงถูกต้อง
- ✅ เมื่อพิมพ์ใน input: ค่าอัปเดตถูกต้อง
- ✅ หมุดและ input field sync กัน

## ไฟล์ที่แก้ไข
- `src/components/map/mapfild.jsx` (บรรทัด 141 และ 155)

## การทดสอบ
1. เปิดหน้า AdminJS
2. ไปที่ BuildingControl หรือ Map
3. ลองขยับหมุดบนแผนที่
4. ตรวจสอบว่า latitude และ longitude เปลี่ยนแปลงถูกต้อง
5. ลองพิมพ์ค่าใน input field
6. ตรวจสอบว่าหมุดเคลื่อนที่ตามค่าใน input

## หมายเหตุ
การแก้ไขนี้ทำให้ MapField component ทำงานได้ถูกต้องทั้งการ:
- ขยับหมุดบนแผนที่
- พิมพ์ค่าใน input field
- Sync ข้อมูลระหว่างหมุดและ input
