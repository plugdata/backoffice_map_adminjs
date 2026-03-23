# AdminJS API Documentation

## Base URL
```
http://localhost:3001/admin/api
```

## Authentication
API ต้องมีการ login ก่อนใช้งาน ผ่าน Cookie-based authentication

---

## Resources Overview

| Resource | Endpoint | Description |
|----------|----------|-------------|
| User | `/admin/api/resources/User` | จัดการผู้ใช้งานระบบ |
| Owner | `/admin/api/resources/Owner` | จัดการเจ้าของกรรมสิทธิ์ |
| FiscalYear | `/admin/api/resources/FiscalYear` | จัดการปีงบประมาณ |
| BuildingControl | `/admin/api/resources/BuildingControl` | ฝ่ายควบคุมอาคาร |
| RiskZone | `/admin/api/resources/RiskZone` | พื้นที่เสี่ยงภัย |
| ZoningPlan | `/admin/api/resources/ZoningPlan` | ผังเมือง |
| BuildPlan | `/admin/api/resources/BuildPlan` | แผนก่อสร้าง |
| PlanProject | `/admin/api/resources/PlanProject` | โครงการวางแผน |
| ApprovedProject | `/admin/api/resources/ApprovedProject` | โครงการที่อนุมัติ |
| Map | `/admin/api/resources/Map` | ข้อมูลแผนที่/พิกัด |
| Uploads | `/admin/api/resources/Uploads` | ไฟล์อัปโหลด |

---

## API Actions

### 1. List Records
ดึงรายการข้อมูลทั้งหมด (พร้อม pagination และ filter)

```http
GET /admin/api/resources/{resourceId}/actions/list
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | หน้าที่ต้องการ (default: 1) |
| `perPage` | number | จำนวนต่อหน้า (default: 10) |
| `sortBy` | string | field ที่ต้องการเรียง |
| `direction` | string | `asc` หรือ `desc` |
| `filters.{field}` | string | กรองตาม field |

**Example:**
```bash
# ดึงรายการ User หน้าที่ 1
curl "http://localhost:3001/admin/api/resources/User/actions/list?page=1&perPage=10"

# ดึง BuildingControl กรองตาม status
curl "http://localhost:3001/admin/api/resources/BuildingControl/actions/list?filters.status=active"

# ดึง Owner เรียงตามชื่อ
curl "http://localhost:3001/admin/api/resources/Owner/actions/list?sortBy=first_name&direction=asc"
```

**Response:**
```json
{
  "records": [
    {
      "id": 1,
      "params": {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com"
      }
    }
  ],
  "meta": {
    "total": 100,
    "perPage": 10,
    "page": 1,
    "direction": "asc",
    "sortBy": "id"
  }
}
```

---

### 2. Show Record
ดึงข้อมูล record เดียวตาม ID

```http
GET /admin/api/resources/{resourceId}/records/{recordId}/show
```

**Example:**
```bash
# ดึงข้อมูล User ID 1
curl "http://localhost:3001/admin/api/resources/User/records/1/show"

# ดึงข้อมูล BuildingControl ID 5
curl "http://localhost:3001/admin/api/resources/BuildingControl/records/5/show"

# ดึงข้อมูล Map ID 10
curl "http://localhost:3001/admin/api/resources/Map/records/10/show"
```

**Response:**
```json
{
  "record": {
    "id": 1,
    "params": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

---

### 3. Create Record (New)
สร้าง record ใหม่

```http
POST /admin/api/resources/{resourceId}/actions/new
Content-Type: application/json
```

**Example:**
```bash
# สร้าง Owner ใหม่
curl -X POST "http://localhost:3001/admin/api/resources/Owner/actions/new" \
  -H "Content-Type: application/json" \
  -d '{
    "title_owner": "นาย",
    "first_name": "สมชาย",
    "last_name": "ใจดี",
    "phone": "0812345678"
  }'

# สร้าง FiscalYear ใหม่
curl -X POST "http://localhost:3001/admin/api/resources/FiscalYear/actions/new" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2567,
    "detail": "ปีงบประมาณ 2567"
  }'

# สร้าง BuildingControl ใหม่
curl -X POST "http://localhost:3001/admin/api/resources/BuildingControl/actions/new" \
  -H "Content-Type: application/json" \
  -d '{
    "building_type": "อาคารพาณิชย์",
    "use_purpose": "1",
    "quantity": 1,
    "fiscalYearId": 1,
    "status": "pending"
  }'
```

**Response:**
```json
{
  "record": {
    "id": 123,
    "params": {
      "id": 123,
      "title_owner": "นาย",
      "first_name": "สมชาย",
      "last_name": "ใจดี"
    }
  },
  "notice": {
    "message": "Successfully created a new record",
    "type": "success"
  }
}
```

---

### 4. Update Record (Edit)
แก้ไข record ที่มีอยู่

```http
POST /admin/api/resources/{resourceId}/records/{recordId}/edit
Content-Type: application/json
```

**Example:**
```bash
# แก้ไข Owner ID 1
curl -X POST "http://localhost:3001/admin/api/resources/Owner/records/1/edit" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "0899999999",
    "province": "กรุงเทพมหานคร"
  }'

# แก้ไข BuildingControl ID 5
curl -X POST "http://localhost:3001/admin/api/resources/BuildingControl/records/5/edit" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved",
    "license_number": "BC-2024-001"
  }'

# แก้ไข Map ID 10 (อัพเดทพิกัด)
curl -X POST "http://localhost:3001/admin/api/resources/Map/records/10/edit" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 13.7563,
    "longitude": 100.5018,
    "name_local": "สถานที่ใหม่"
  }'
```

**Response:**
```json
{
  "record": {
    "id": 1,
    "params": {
      "id": 1,
      "phone": "0899999999",
      "province": "กรุงเทพมหานคร"
    }
  },
  "notice": {
    "message": "Successfully updated the record",
    "type": "success"
  }
}
```

---

### 5. Delete Record
ลบ record เดียว

```http
POST /admin/api/resources/{resourceId}/records/{recordId}/delete
```

**Example:**
```bash
# ลบ Owner ID 1
curl -X POST "http://localhost:3001/admin/api/resources/Owner/records/1/delete"

# ลบ Uploads ID 5
curl -X POST "http://localhost:3001/admin/api/resources/Uploads/records/5/delete"
```

**Response:**
```json
{
  "notice": {
    "message": "Successfully deleted the record",
    "type": "success"
  }
}
```

---

### 6. Bulk Delete
ลบหลาย records พร้อมกัน

```http
POST /admin/api/resources/{resourceId}/bulk/bulkDelete
Content-Type: application/json
```

**Example:**
```bash
# ลบ Uploads หลายรายการ
curl -X POST "http://localhost:3001/admin/api/resources/Uploads/bulk/bulkDelete" \
  -H "Content-Type: application/json" \
  -d '{
    "recordIds": ["1", "2", "3"]
  }'
```

---

### 7. Search Records
ค้นหา records ตาม query string

```http
GET /admin/api/resources/{resourceId}/actions/search?query={searchTerm}
```

**Example:**
```bash
# ค้นหา Owner ชื่อ "สมชาย"
curl "http://localhost:3001/admin/api/resources/Owner/actions/search?query=สมชาย"

# ค้นหา BuildingControl ประเภท "พาณิชย์"
curl "http://localhost:3001/admin/api/resources/BuildingControl/actions/search?query=พาณิชย์"
```

---

## Resource Fields Reference

### User
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| username | String | ชื่อผู้ใช้ (unique) |
| password | String | รหัสผ่าน |
| title_use | String | คำนำหน้า |
| fullName | String | ชื่อ-นามสกุล |
| email | String | อีเมล |
| phone | String | เบอร์โทร |
| role | String | บทบาท (user/admin/superadmin) |

### Owner
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| title_owner | String | คำนำหน้า |
| first_name | String | ชื่อ |
| last_name | String | นามสกุล |
| number_no | String | เลขบัตรประชาชน (unique) |
| phone | String | เบอร์โทร |
| no_id | String | บ้านเลขที่ |
| road | String | ถนน |
| subdistrict | String | ตำบล |
| district | String | อำเภอ |
| province | String | จังหวัด |
| postcode | Int | รหัสไปรษณีย์ |
| owner_type | String | ประเภทเจ้าของ |
| org_name | String | ชื่อองค์กร |
| org_address | String | ที่อยู่องค์กร |

### FiscalYear
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| year | Int | ปีงบประมาณ |
| detail | String | รายละเอียด |

### BuildingControl
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| building_type | String | ประเภทอาคาร |
| use_purpose | String | วัตถุประสงค์ |
| quantity | Int | จำนวน |
| fiscalYearId | Int | FK: ปีงบประมาณ |
| owner_id | Int | FK: เจ้าของ |
| status | String | สถานะ |
| license_number | String | เลขที่ใบอนุญาต |
| date | DateTime | วันที่ |

### RiskZone
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| zoneType | String | ประเภทโซน |
| description | String | รายละเอียด |
| fiscalYearId | Int | FK: ปีงบประมาณ |
| status | String | สถานะ |
| owner_id | Int | FK: เจ้าของ |

### ZoningPlan
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| areaName | String | ชื่อพื้นที่ |
| notes | String | หมายเหตุ |
| fiscalYearId | Int | FK: ปีงบประมาณ |
| status | String | สถานะ |
| owner_id | Int | FK: เจ้าของ |

### BuildPlan
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| areabuild | String | พื้นที่ก่อสร้าง |
| notes | String | หมายเหตุ |
| user_id | Int | FK: ผู้ใช้ |

### PlanProject
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| code | String | รหัสโครงการ (unique) |
| name | String | ชื่อโครงการ |
| category | String | หมวดหมู่ |
| startDate | DateTime | วันเริ่มต้น |
| endDate | DateTime | วันสิ้นสุด |
| supervisor | String | ผู้ดูแล |
| budget | Float | งบประมาณ |
| fiscalYearId | Int | FK: ปีงบประมาณ |
| status | String | สถานะ |
| details | String | รายละเอียด |

### ApprovedProject
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| title_project | String | ชื่อโครงการ |
| category | String | หมวดหมู่ |
| supervisor | String | ผู้ดูแล |
| budget | Float | งบประมาณ |
| fiscalYearId | Int | FK: ปีงบประมาณ |
| status | String | สถานะ |
| details | String | รายละเอียด |

### Map
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| buildingControlId | Int | FK: BuildingControl |
| riskZoneId | Int | FK: RiskZone |
| zoningPlanId | Int | FK: ZoningPlan |
| planProjectId | Int | FK: PlanProject |
| approvedProjectId | Int | FK: ApprovedProject |
| palnbuildId | Int | FK: BuildPlan |
| name_local | String | ชื่อสถานที่ |
| house_no | String | บ้านเลขที่ |
| address | String | ที่อยู่ |
| latitude | Float | ละติจูด |
| longitude | Float | ลองจิจูด |
| colors | String | สี marker |
| geoJsonData | JSON | ข้อมูล GeoJSON |
| image_before | String | รูปก่อน |
| image_after | String | รูปหลัง |

### Uploads
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| namefile | String | ชื่อไฟล์ |
| url | String | URL ไฟล์ |
| fileType | String | ประเภทไฟล์ |
| size | Int | ขนาด (bytes) |
| token | String | Token (unique) |
| uploadedBy | Int | FK: User ผู้อัปโหลด |

---

## Custom API Routes

นอกจาก AdminJS API แล้ว ยังมี Custom API Routes ดังนี้:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | เข้าสู่ระบบ |
| `/api/auth/logout` | POST | ออกจากระบบ |
| `/api/upload` | POST | อัปโหลดไฟล์ |
| `/api/location` | GET | ข้อมูลตำแหน่ง |
| `/api/maps` | GET | ข้อมูลแผนที่ |
| `/api/maps/local` | GET | ข้อมูล Map + BuildingControl |
| `/api/maps/building` | GET | ข้อมูล Building ตาม year |
| `/api/address/provinces` | GET | รายการจังหวัด |
| `/api/address/amphoes/:code` | GET | รายการอำเภอ |
| `/api/address/districts/:code` | GET | รายการตำบล |
| `/api/dashboard` | GET | ข้อมูล Dashboard |
| `/api/import-kml` | GET | ข้อมูล KML |
| `/api/upload-image` | POST | อัปโหลดรูปภาพ |
| `/api-docs` | GET | Swagger Documentation |

---

## Error Responses

```json
{
  "notice": {
    "message": "Error message here",
    "type": "error"
  }
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Usage Examples with JavaScript

### Fetch List
```javascript
const response = await fetch('/admin/api/resources/Owner/actions/list?page=1&perPage=20')
const data = await response.json()
console.log(data.records)
```

### Create Record
```javascript
const response = await fetch('/admin/api/resources/Owner/actions/new', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title_owner: 'นาย',
    first_name: 'สมชาย',
    last_name: 'ใจดี'
  })
})
const data = await response.json()
```

### Update Record
```javascript
const response = await fetch('/admin/api/resources/Owner/records/1/edit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '0899999999'
  })
})
const data = await response.json()
```

### Delete Record
```javascript
const response = await fetch('/admin/api/resources/Owner/records/1/delete', {
  method: 'POST'
})
const data = await response.json()
```

---

## Notes

1. **Authentication Required**: ทุก API ต้อง login ก่อนใช้งาน
2. **Content-Type**: ใช้ `application/json` สำหรับ POST requests
3. **Pagination**: Default 10 records per page
4. **Filtering**: ใช้ `filters.{fieldName}` ใน query string
5. **Sorting**: ใช้ `sortBy` และ `direction` parameters
