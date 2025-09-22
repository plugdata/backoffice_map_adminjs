# การแก้ไข MapField Component สำหรับการทดสอบ

## การเปลี่ยนแปลงที่ทำ

### **1. Comment Longitude Input Field**
```javascript
{/* <Box>
  <Label>Longitude</Label>
  <Input
    type="number"
    value={longitude || ""}
    onChange={(e) => {
      const val = parseFloat(e.target.value)
      if (!isNaN(val)) {
        setLatLng(latitude, val)
        onChange?.("latitude", latitude)
        onChange?.("longitude", val)
      }
    }}
  />
</Box> */}
```

### **2. เพิ่ม Test Console.log สำหรับ Latitude Input**
```javascript
onChange={(e) => {
  const val = parseFloat(e.target.value)
  console.log("🔍 [TEST] Latitude input changed:", val)
  console.log("🔍 [TEST] Current longitude:", longitude)
  if (!isNaN(val)) {
    setLatLng(val, longitude)
    onChange?.("latitude", val)
    onChange?.("longitude", longitude)
    console.log("✅ [TEST] setLatLng called with:", val, longitude)
  }
}}
```

### **3. เพิ่ม Test Console.log สำหรับ Marker Drag**
```javascript
eventHandlers={{
  dragend: (e) => {
    const { lat, lng } = e.target.getLatLng()
    console.log("🔍 [TEST] Marker dragged to:", lat, lng)
    setLatLng(lat, lng)
    onChange?.("latitude", lat)
    onChange?.("longitude", lng)
    console.log("✅ [TEST] Marker position updated")
  },
}}
```

### **4. เพิ่ม Test Console.log สำหรับ Store Values**
```javascript
// ✅ TEST: Log store values
useEffect(() => {
  console.log("🔍 [TEST] Store values updated:", { latitude, longitude })
}, [latitude, longitude])
```

## การทดสอบ

### **ขั้นตอนการทดสอบ:**
1. เปิดหน้า AdminJS
2. ไปที่ BuildingControl หรือ Map
3. เปิด Developer Console (F12)
4. ลองเปลี่ยนค่าใน Latitude input field
5. ดู console.log ที่แสดง:
   - `🔍 [TEST] Latitude input changed: [ค่าใหม่]`
   - `🔍 [TEST] Current longitude: [ค่าปัจจุบัน]`
   - `✅ [TEST] setLatLng called with: [lat, lng]`
6. ลองขยับหมุดบนแผนที่
7. ดู console.log ที่แสดง:
   - `🔍 [TEST] Marker dragged to: [lat, lng]`
   - `✅ [TEST] Marker position updated`
8. ดู console.log ที่แสดง:
   - `🔍 [TEST] Store values updated: { latitude: [ค่า], longitude: [ค่า] }`

### **สิ่งที่ควรเห็น:**
- ✅ เมื่อเปลี่ยน latitude input: หมุดเคลื่อนที่ในแนวตั้ง
- ✅ เมื่อขยับหมุด: ค่าใน latitude input อัปเดต
- ✅ Store values อัปเดตถูกต้อง
- ✅ Console.log แสดงการทำงานทุกขั้นตอน

### **สิ่งที่ควรไม่เห็น:**
- ❌ Longitude input field (ถูก comment ออกแล้ว)
- ❌ Error ใน console
- ❌ หมุดไม่เคลื่อนที่เมื่อเปลี่ยน latitude

## ไฟล์ที่แก้ไข
- `src/components/map/mapfild.jsx`

## หมายเหตุ
การแก้ไขนี้เป็นการทดสอบเฉพาะ latitude กับหมุด โดย:
- ซ่อน longitude input field
- เพิ่ม console.log เพื่อ debug
- ทดสอบการ sync ระหว่าง input และหมุด
- ทดสอบการอัปเดต store values
