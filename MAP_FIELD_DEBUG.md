# การแก้ไข MapField Component - Debug Version

## ปัญหาที่พบ
จาก console.log ที่แสดงให้เห็นว่า:
- **Marker dragged to**: `-59.888936896765834 90.14062285423279` (lat, lng)
- **Store values updated**: `{latitude: 7.568, longitude: 90.14062285423279}`

**ปัญหา**: หมุดถูกขยับไปที่ `-59.888936896765834` แต่ store ยังคงเป็น `7.568` - นี่แสดงว่า `setLatLng` ไม่ทำงานถูกต้อง

## การแก้ไข

### **1. แก้ไข Store Debug**
```javascript
// src/components/map/lib/store.js
setLatLng: (latitude, longitude) => {
  const { latitude: oldLat, longitude: oldLng } = get()
  console.log("🔍 [STORE] setLatLng called:", { latitude, longitude, oldLat, oldLng })
  if (latitude !== oldLat || longitude !== oldLng) {
    console.log("✅ [STORE] Updating lat/lng")
    set({ latitude, longitude })
  } else {
    console.log("⚠️ [STORE] No update needed - values are the same")
  }
},
```

### **2. แก้ไข MapField Debug**
```javascript
// src/components/map/mapfild.jsx
dragend: (e) => {
  const { lat, lng } = e.target.getLatLng()
  console.log("🔍 [TEST] Marker dragged to:", lat, lng)
  console.log("🔍 [TEST] Current store values before setLatLng:", { latitude, longitude })
  setLatLng(lat, lng)
  onChange?.("latitude", lat)
  onChange?.("longitude", lng)
  console.log("✅ [TEST] Marker position updated")
},
```

### **3. แก้ไข Latitude Input**
```javascript
onChange={(e) => {
  const val = parseFloat(e.target.value)
  console.log("🔍 [TEST] Latitude input changed:", val)
  console.log("🔍 [TEST] Current longitude:", longitude)
  if (!isNaN(val)) {
    setLatLng(val, longitude)  // ✅ ใช้ longitude ไม่ใช่ latitude
    onChange?.("latitude", val)
    onChange?.("longitude", longitude)
    console.log("✅ [TEST] setLatLng called with:", val, longitude)
  }
}}
```

## การทดสอบ

### **ขั้นตอนการทดสอบ:**
1. เปิดหน้า AdminJS
2. ไปที่ BuildingControl หรือ Map
3. เปิด Developer Console (F12)
4. ลองขยับหมุดบนแผนที่
5. ดู console.log ที่แสดง:
   - `🔍 [TEST] Marker dragged to: [lat, lng]`
   - `🔍 [TEST] Current store values before setLatLng: {latitude: [ค่า], longitude: [ค่า]}`
   - `🔍 [STORE] setLatLng called: {latitude: [ค่า], longitude: [ค่า], oldLat: [ค่า], oldLng: [ค่า]}`
   - `✅ [STORE] Updating lat/lng` หรือ `⚠️ [STORE] No update needed - values are the same`
   - `🔍 [TEST] Store values updated: {latitude: [ค่า], longitude: [ค่า]}`

### **สิ่งที่ควรเห็น:**
- ✅ เมื่อขยับหมุด: store values อัปเดตถูกต้อง
- ✅ เมื่อเปลี่ยน latitude input: หมุดเคลื่อนที่ในแนวตั้ง
- ✅ Console.log แสดงการทำงานทุกขั้นตอน

### **สิ่งที่ควรไม่เห็น:**
- ❌ Store values ไม่เปลี่ยนเมื่อขยับหมุด
- ❌ Error ใน console
- ❌ หมุดไม่เคลื่อนที่เมื่อเปลี่ยน latitude

## ไฟล์ที่แก้ไข
- `src/components/map/mapfild.jsx`
- `src/components/map/lib/store.js`

## หมายเหตุ
การแก้ไขนี้เป็นการ debug เพื่อหาสาเหตุที่หมุดไม่เลื่อน โดย:
- เพิ่ม console.log ใน store setLatLng function
- เพิ่ม console.log ใน marker drag event
- แก้ไข latitude input ให้ใช้ longitude ที่ถูกต้อง
- ทดสอบการ sync ระหว่าง input และหมุด
