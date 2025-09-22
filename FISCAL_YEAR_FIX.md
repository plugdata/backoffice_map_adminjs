# การแก้ไข Fiscal Year Reference

## ปัญหาที่พบ
ใน Location API เดิมมีการใช้ `year` และ `establishedYear` ที่อ้างอิงจาก `createdAt.getFullYear()` แทนที่จะอ้างอิงจาก `fiscalYear.year` ตามที่ควรจะเป็น

## การแก้ไข

### 1. **แก้ไข Year Reference**
เปลี่ยนจาก:
```javascript
year: relatedData?.createdAt ? new Date(relatedData.createdAt).getFullYear() : null,
establishedYear: relatedData?.createdAt ? new Date(relatedData.createdAt).getFullYear() : null,
```

เป็น:
```javascript
year: relatedData?.fiscalYear?.year || null,
establishedYear: relatedData?.fiscalYear?.year || null,
```

### 2. **เพิ่ม FiscalYear Include**
เพิ่ม `fiscalYear: true` ในทุก Prisma query เพื่อดึงข้อมูลปีงบประมาณ:

```javascript
include: {
  buildingControl: {
    include: {
      uploads: true,
      fiscalYear: true  // เพิ่มบรรทัดนี้
    }
  },
  riskZone: {
    include: {
      uploads: true,
      fiscalYear: true  // เพิ่มบรรทัดนี้
    }
  },
  zoningPlan: {
    include: {
      uploads: true,
      fiscalYear: true  // เพิ่มบรรทัดนี้
    }
  }
}
```

### 3. **เพิ่ม FiscalYear Field ใน Response**
เพิ่ม `fiscalYear` field ใน response object:

```javascript
fiscalYearId: relatedData?.fiscalYearId || null,
fiscalYear: relatedData?.fiscalYear?.year || null,  // เพิ่มบรรทัดนี้
```

## Endpoints ที่แก้ไข

### 1. **GET /api/location** - ดึงรายการสถานที่ทั้งหมด
- ✅ เพิ่ม fiscalYear include
- ✅ แก้ไข year และ establishedYear
- ✅ เพิ่ม fiscalYear field

### 2. **GET /api/location/{id}** - ดึงข้อมูลสถานที่ตาม ID
- ✅ เพิ่ม fiscalYear include
- ✅ แก้ไข year และ establishedYear
- ✅ เพิ่ม fiscalYear field

### 3. **GET /api/location/query** - ค้นหาสถานที่แบบ Query
- ✅ เพิ่ม fiscalYear include (มีอยู่แล้ว)
- ✅ แก้ไข year และ establishedYear
- ✅ เพิ่ม fiscalYear field (มีอยู่แล้ว)

### 4. **GET /api/location/search** - ค้นหาสถานที่แบบละเอียด
- ✅ เพิ่ม fiscalYear include
- ✅ แก้ไข year และ establishedYear
- ✅ เพิ่ม fiscalYear field

### 5. **GET /api/location/nearby** - ค้นหาสถานที่ใกล้เคียง
- ✅ เพิ่ม fiscalYear include
- ✅ แก้ไข year และ establishedYear
- ✅ เพิ่ม fiscalYear field

## Response Format หลังแก้ไข

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "มหาวิทยาลัยราชภัฏตรัง",
      "address": "ถนนรัษฎา ตำบลทับเที่ยง อำเภอเมืองตรัง จังหวัดตรัง 92000",
      "phone": "075-218-000",
      "distance": "2.1 km",
      "coordinates": [7.5589, 99.6089],
      "image": "https://example.com/image.jpg",
      "images": [...],
      "type": "Building Control",
      "description": "มหาวิทยาลัยราชภัฏที่ให้การศึกษาระดับอุดมศึกษาในจังหวัดตรัง",
      "year": 2568,                    // ✅ อ้างอิงจาก fiscalYear.year
      "establishedYear": 2568,         // ✅ อ้างอิงจาก fiscalYear.year
      "documentUrl": "https://example.com/documents/university.pdf",
      "buildingControlId": 1,
      "riskZoneId": null,
      "zoningPlanId": null,
      "fiscalYearId": 1,               // ✅ ID ของปีงบประมาณ
      "fiscalYear": 2568,              // ✅ ปีงบประมาณ
      "createdAt": "2025-09-19T14:47:07.069Z",
      "updatedAt": "2025-09-19T14:47:07.069Z"
    }
  ]
}
```

## ข้อดีของการแก้ไข

1. **ความถูกต้อง**: `year` และ `establishedYear` ตอนนี้อ้างอิงจาก `fiscalYear.year` ที่ถูกต้อง
2. **ความสอดคล้อง**: ข้อมูลปีงบประมาณสอดคล้องกันทั้งระบบ
3. **ความสมบูรณ์**: มีข้อมูล `fiscalYear` เพิ่มเติมใน response
4. **การกรอง**: สามารถกรองข้อมูลตามปีงบประมาณได้อย่างถูกต้อง

## การทดสอบ

### 1. **ทดสอบการดึงข้อมูล**
```bash
curl "http://localhost:3002/api/location/query?fiscalYear=2568"
```

### 2. **ทดสอบการกรองตามปีงบประมาณ**
```bash
curl "http://localhost:3002/api/location/query?documentType=buildingControl&fiscalYear=2568"
```

### 3. **ทดสอบการดึงข้อมูลสถานที่เดียว**
```bash
curl "http://localhost:3002/api/location/1"
```

## สรุป

การแก้ไขนี้ทำให้ Location API มีความถูกต้องและสอดคล้องกับระบบฐานข้อมูลมากขึ้น โดย `year` และ `establishedYear` ตอนนี้อ้างอิงจาก `fiscalYear.year` แทนที่จะเป็น `createdAt.getFullYear()` ตามที่ควรจะเป็น
