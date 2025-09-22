# Location API Usage Guide

## API Endpoints สำหรับ UI Search

### 1. **GET /api/location/query** - ค้นหาสถานที่แบบ Query (สำหรับ UI Search)

#### Parameters:
- `search` (string) - คำค้นหาสถานที่
- `documentType` (string) - ประเภทเอกสาร: `all`, `buildingControl`, `riskZone`, `zoningPlan`
- `fiscalYear` (integer) - ปีงบประมาณ
- `sortBy` (string) - เรียงตาม: `distance`, `name`, `year`, `createdAt`
- `maxDistance` (number) - ระยะทางสูงสุด (กิโลเมตร) - default: 500
- `lat` (number) - ละติจูด (สำหรับคำนวณระยะทาง)
- `lng` (number) - ลองจิจูด (สำหรับคำนวณระยะทาง)
- `page` (integer) - หน้าที่ต้องการ - default: 1
- `limit` (integer) - จำนวนรายการต่อหน้า - default: 12

#### Example Request:
```bash
GET /api/location/query?search=มหาวิทยาลัย&documentType=buildingControl&fiscalYear=2568&sortBy=distance&maxDistance=100&lat=7.5589&lng=99.6089&page=1&limit=12
```

#### Example Response:
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
      "openingHours": null,
      "programs": [],
      "coordinates": [7.5589, 99.6089],
      "image": "https://example.com/image.jpg",
      "images": [
        {
          "url": "https://example.com/image1.jpg",
          "caption": "อาคารเรียนหลัก"
        }
      ],
      "rating": null,
      "type": "Building Control",
      "description": "มหาวิทยาลัยราชภัฏที่ให้การศึกษาระดับอุดมศึกษาในจังหวัดตรัง",
      "year": 2019,
      "establishedYear": 2019,
      "documentUrl": "https://example.com/documents/university.pdf",
      "buildingControlId": 1,
      "riskZoneId": null,
      "zoningPlanId": null,
      "fiscalYearId": 1,
      "fiscalYear": 2568,
      "createdAt": "2025-09-19T14:47:07.069Z",
      "updatedAt": "2025-09-19T14:47:07.069Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 25,
    "totalPages": 3
  },
  "filters": {
    "search": "มหาวิทยาลัย",
    "documentType": "buildingControl",
    "fiscalYear": 2568,
    "sortBy": "distance",
    "maxDistance": 100,
    "hasCoordinates": true
  }
}
```

### 2. **GET /api/location/filters** - ดึงข้อมูลตัวเลือกสำหรับ Filter

#### Example Request:
```bash
GET /api/location/filters
```

#### Example Response:
```json
{
  "success": true,
  "data": {
    "documentTypes": [
      { "value": "all", "label": "All types", "count": 150 },
      { "value": "buildingControl", "label": "Building Control", "count": 50 },
      { "value": "riskZone", "label": "Risk Zone", "count": 60 },
      { "value": "zoningPlan", "label": "Zoning Plan", "count": 40 }
    ],
    "fiscalYears": [
      { "value": null, "label": "All years" },
      { "value": 2568, "label": "2568" },
      { "value": 2567, "label": "2567" },
      { "value": 2566, "label": "2566" }
    ],
    "sortOptions": [
      { "value": "distance", "label": "Distance" },
      { "value": "name", "label": "Name" },
      { "value": "year", "label": "Year" },
      { "value": "createdAt", "label": "Created Date" }
    ],
    "distanceRange": {
      "min": 10,
      "max": 500,
      "default": 500,
      "step": 10
    }
  }
}
```

### 3. **GET /api/location** - ดึงรายการสถานที่ทั้งหมด

#### Parameters:
- `page` (integer) - หน้าที่ต้องการ - default: 1
- `limit` (integer) - จำนวนรายการต่อหน้า - default: 10
- `type` (string) - ประเภทสถานที่
- `year` (integer) - ปีที่สร้าง
- `search` (string) - ค้นหาจากชื่อหรือที่อยู่

### 4. **GET /api/location/{id}** - ดึงข้อมูลสถานที่ตาม ID

### 5. **GET /api/location/search** - ค้นหาสถานที่แบบละเอียด

### 6. **GET /api/location/nearby** - ค้นหาสถานที่ใกล้เคียง

## การใช้งานกับ Frontend

### 1. **การโหลด Filter Options**
```javascript
// โหลดข้อมูลตัวเลือกสำหรับ dropdown
const loadFilterOptions = async () => {
  try {
    const response = await fetch('/api/location/filters')
    const data = await response.json()
    
    if (data.success) {
      // ตั้งค่า dropdown options
      setDocumentTypes(data.data.documentTypes)
      setFiscalYears(data.data.fiscalYears)
      setSortOptions(data.data.sortOptions)
      setDistanceRange(data.data.distanceRange)
    }
  } catch (error) {
    console.error('Error loading filter options:', error)
  }
}
```

### 2. **การค้นหาสถานที่**
```javascript
// ค้นหาสถานที่ตาม filter ที่เลือก
const searchLocations = async (filters) => {
  try {
    const params = new URLSearchParams()
    
    if (filters.search) params.append('search', filters.search)
    if (filters.documentType) params.append('documentType', filters.documentType)
    if (filters.fiscalYear) params.append('fiscalYear', filters.fiscalYear)
    if (filters.sortBy) params.append('sortBy', filters.sortBy)
    if (filters.maxDistance) params.append('maxDistance', filters.maxDistance)
    if (filters.lat) params.append('lat', filters.lat)
    if (filters.lng) params.append('lng', filters.lng)
    if (filters.page) params.append('page', filters.page)
    if (filters.limit) params.append('limit', filters.limit)
    
    const response = await fetch(`/api/location/query?${params}`)
    const data = await response.json()
    
    if (data.success) {
      setLocations(data.data)
      setPagination(data.pagination)
      setAppliedFilters(data.filters)
    }
  } catch (error) {
    console.error('Error searching locations:', error)
  }
}
```

### 3. **การจัดการ Search State**
```javascript
const [searchState, setSearchState] = useState({
  search: '',
  documentType: 'all',
  fiscalYear: null,
  sortBy: 'distance',
  maxDistance: 500,
  lat: null,
  lng: null,
  page: 1,
  limit: 12
})

// อัปเดต search state
const updateSearchState = (updates) => {
  setSearchState(prev => ({ ...prev, ...updates }))
}

// ค้นหาเมื่อ state เปลี่ยน
useEffect(() => {
  searchLocations(searchState)
}, [searchState])
```

## ตัวอย่างการใช้งาน

### 1. **ค้นหาสถานที่ใกล้เคียง**
```bash
GET /api/location/query?lat=7.5589&lng=99.6089&maxDistance=50&sortBy=distance
```

### 2. **ค้นหาตามประเภทเอกสาร**
```bash
GET /api/location/query?documentType=buildingControl&fiscalYear=2568
```

### 3. **ค้นหาด้วยคำค้นหา**
```bash
GET /api/location/query?search=มหาวิทยาลัย&sortBy=name
```

### 4. **ค้นหาพร้อม pagination**
```bash
GET /api/location/query?page=2&limit=20&sortBy=createdAt
```

## Response Format

### Location Object:
```json
{
  "id": 2,
  "name": "ชื่อสถานที่",
  "address": "ที่อยู่เต็ม",
  "phone": "เบอร์โทรศัพท์",
  "distance": "2.1 km",
  "openingHours": null,
  "programs": [],
  "coordinates": [7.5589, 99.6089],
  "image": "URL รูปภาพหลัก",
  "images": [
    {
      "url": "URL รูปภาพ",
      "caption": "คำอธิบายรูปภาพ"
    }
  ],
  "rating": null,
  "type": "Building Control",
  "description": "รายละเอียดสถานที่",
  "year": 2019,
  "establishedYear": 2019,
  "documentUrl": "URL เอกสาร",
  "buildingControlId": 1,
  "riskZoneId": null,
  "zoningPlanId": null,
  "fiscalYearId": 1,
  "fiscalYear": 2568,
  "createdAt": "2025-09-19T14:47:07.069Z",
  "updatedAt": "2025-09-19T14:47:07.069Z"
}
```

### Pagination Object:
```json
{
  "page": 1,
  "limit": 12,
  "total": 25,
  "totalPages": 3
}
```

### Filters Object:
```json
{
  "search": "คำค้นหา",
  "documentType": "buildingControl",
  "fiscalYear": 2568,
  "sortBy": "distance",
  "maxDistance": 100,
  "hasCoordinates": true
}
```

## Error Handling

### Error Response Format:
```json
{
  "error": "ข้อความข้อผิดพลาด"
}
```

### Common Error Codes:
- `400` - ข้อมูลไม่ถูกต้อง
- `404` - ไม่พบข้อมูล
- `500` - เกิดข้อผิดพลาดในระบบ

## Performance Tips

1. **ใช้ pagination** - จำกัดจำนวนรายการต่อหน้า
2. **ใช้ coordinates** - สำหรับการเรียงตามระยะทาง
3. **ใช้ filters** - กรองข้อมูลก่อนส่งกลับ
4. **Cache filter options** - เก็บข้อมูลตัวเลือกไว้ใน memory
5. **Debounce search** - หน่วงเวลาการค้นหาเมื่อพิมพ์

## Testing

### Test with curl:
```bash
# Test basic search
curl "http://localhost:3002/api/location/query?search=มหาวิทยาลัย&limit=5"

# Test with filters
curl "http://localhost:3002/api/location/query?documentType=buildingControl&fiscalYear=2568&sortBy=distance"

# Test nearby search
curl "http://localhost:3002/api/location/query?lat=7.5589&lng=99.6089&maxDistance=50"

# Test filter options
curl "http://localhost:3002/api/location/filters"
```
