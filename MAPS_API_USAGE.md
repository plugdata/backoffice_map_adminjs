# Maps API Usage Guide

## ภาพรวม
Maps API เป็น endpoint หลักสำหรับดึงข้อมูล Map พร้อม join กับ BuildingControl และ FiscalYear โดยตรง

## Base URL
```
http://localhost:3002/api/maps
```

## Endpoint หลัก

### GET /api/maps
ดึงข้อมูล Map พร้อม join BuildingControl และ FiscalYear

## Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `fiscalYear` | integer | กรองตามปีงบประมาณ | `2568` |
| `buildingType` | string | กรองตามประเภทอาคาร | `อาคารเรียน` |
| `status` | string | กรองตามสถานะอาคาร | `active` |
| `programId` | integer | กรองตามโครงการ | `123` |
| `latMin` | number | ละติจูดต่ำสุด (bounding box) | `7.5` |
| `latMax` | number | ละติจูดสูงสุด (bounding box) | `7.6` |
| `lngMin` | number | ลองจิจูดต่ำสุด (bounding box) | `99.5` |
| `lngMax` | number | ลองจิจูดสูงสุด (bounding box) | `99.6` |
| `distance` | integer | ระยะทางสูงสุดจากจุด reference (km) | `10` |
| `search` | string | ค้นหาข้อความ | `มหาวิทยาลัย` |
| `limit` | integer | จำนวน record ต่อ page (default: 100) | `50` |
| `offset` | integer | pagination offset (default: 0) | `0` |

## ตัวอย่างการใช้งาน

### 1. ดึงข้อมูลทั้งหมด
```bash
curl "http://localhost:3002/api/maps"
```

### 2. กรองตามปีงบประมาณ
```bash
curl "http://localhost:3002/api/maps?fiscalYear=2568"
```

### 3. กรองตามประเภทอาคาร
```bash
curl "http://localhost:3002/api/maps?buildingType=อาคารเรียน"
```

### 4. กรองตามสถานะ
```bash
curl "http://localhost:3002/api/maps?status=active"
```

### 5. ค้นหาข้อความ
```bash
curl "http://localhost:3002/api/maps?search=มหาวิทยาลัย"
```

### 6. กรองตามพื้นที่ (Bounding Box)
```bash
curl "http://localhost:3002/api/maps?latMin=7.5&latMax=7.6&lngMin=99.5&lngMax=99.6"
```

### 7. กรองตามระยะทาง
```bash
curl "http://localhost:3002/api/maps?distance=10&lat=7.56789&lng=99.61123"
```

### 8. Pagination
```bash
curl "http://localhost:3002/api/maps?limit=20&offset=40"
```

### 9. รวมหลายเงื่อนไข
```bash
curl "http://localhost:3002/api/maps?fiscalYear=2568&buildingType=อาคารเรียน&status=active&search=มหาวิทยาลัย&limit=10"
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name_local": "มหาวิทยาลัยราชภัฏตรัง",
      "latitude": 7.56789,
      "longitude": 99.61123,
      "house_no": "123",
      "road": "ถนนรัษฎา",
      "subdistrict": "ทับเที่ยง",
      "district": "เมืองตรัง",
      "province": "ตรัง",
      "postcode": "92000",
      "colors": "#FF5733",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [99.61123, 7.56789]
        }
      },
      "buildingControl": {
        "id": 101,
        "building_type": "อาคารเรียน",
        "use_purpose": "การศึกษา",
        "license_number": "LIC-001",
        "quantity": 2,
        "date": "2025-01-01T00:00:00.000Z",
        "status": "active"
      },
      "riskZone": null,
      "zoningPlan": null,
      "planProject": null,
      "approvedProject": null,
      "fiscalYear": {
        "id": 10,
        "year": 2568,
        "detail": "งบประมาณประจำปี 2568"
      },
      "createdAt": "2025-09-19T14:47:07.069Z",
      "updatedAt": "2025-09-19T14:47:07.069Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 100,
    "offset": 0,
    "hasMore": true
  }
}
```

### Error Response
```json
{
  "error": "เกิดข้อผิดพลาดในการดึงข้อมูลแผนที่"
}
```

## ข้อมูลที่ Return

### Map Object
- **id**: ID ของ Map
- **name_local**: ชื่อสถานที่
- **latitude/longitude**: พิกัด
- **house_no, road, subdistrict, district, province, postcode**: ที่อยู่
- **colors**: สีที่เลือก
- **data**: ข้อมูล GeoJSON

### Related Data (ถ้ามี)
- **buildingControl**: ข้อมูล BuildingControl
- **riskZone**: ข้อมูล RiskZone  
- **zoningPlan**: ข้อมูล ZoningPlan
- **planProject**: ข้อมูล PlanProject
- **approvedProject**: ข้อมูล ApprovedProject
- **fiscalYear**: ข้อมูลปีงบประมาณ

### Pagination
- **total**: จำนวนทั้งหมด
- **limit**: จำนวนต่อหน้า
- **offset**: ตำแหน่งเริ่มต้น
- **hasMore**: มีข้อมูลเพิ่มเติมหรือไม่

## ข้อแตกต่างจาก Location API

| Feature | Maps API | Location API |
|---------|----------|--------------|
| **ข้อมูลหลัก** | Map object โดยตรง | Transformed Location object |
| **Join** | BuildingControl + FiscalYear | BuildingControl + RiskZone + ZoningPlan |
| **Response** | Raw database structure | Custom formatted structure |
| **Use Case** | การจัดการแผนที่ | การแสดงผล UI |
| **Filtering** | Database-level filtering | Application-level filtering |

## การใช้งานใน Frontend

### JavaScript/React
```javascript
// ดึงข้อมูลแผนที่
const fetchMaps = async (filters = {}) => {
  const params = new URLSearchParams(filters)
  const response = await fetch(`/api/maps?${params}`)
  const data = await response.json()
  return data
}

// ใช้งาน
const maps = await fetchMaps({
  fiscalYear: 2568,
  buildingType: 'อาคารเรียน',
  limit: 20
})
```

### Map Integration
```javascript
// สำหรับ Leaflet/OpenLayers
maps.data.forEach(map => {
  if (map.latitude && map.longitude) {
    L.marker([map.latitude, map.longitude])
      .addTo(mapInstance)
      .bindPopup(`
        <h3>${map.name_local}</h3>
        <p>${map.road}, ${map.subdistrict}</p>
        <p>ประเภท: ${map.buildingControl?.building_type || 'ไม่ระบุ'}</p>
        <p>ปีงบประมาณ: ${map.fiscalYear?.year || 'ไม่ระบุ'}</p>
      `)
  }
})
```

## ข้อควรระวัง

1. **Performance**: ใช้ `limit` และ `offset` สำหรับ pagination
2. **Bounding Box**: ใช้ `latMin/latMax` และ `lngMin/lngMax` สำหรับกรองพื้นที่
3. **Distance**: ต้องระบุ `lat` และ `lng` เมื่อใช้ `distance` parameter
4. **Search**: ใช้ `search` สำหรับค้นหาข้อความในหลายฟิลด์
5. **Null Values**: ตรวจสอบ null values ใน related data

## Swagger Documentation

เข้าถึง Swagger UI ได้ที่: `http://localhost:3002/api-docs`

เลือก tag "Maps" เพื่อดูรายละเอียด API และทดสอบได้
