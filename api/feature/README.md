# Feature Plugin System

ระบบ plugin สำหรับจัดการ GeoJSON และ Action Hooks ที่ใช้งานได้กับไฟล์อื่น

## 📁 โครงสร้างไฟล์

```
page/feature/
├── index.js              # Export ทั้งหมด
├── geoJsonUtils.js       # GeoJSON utilities
├── actionHooks.js        # Action hooks
├── back-button.js        # Back button component
└── README.md            # เอกสารนี้
```

## 🛠️ การใช้งาน

### 1. GeoJSON Utilities

```javascript
import { 
  safeParseJson, 
  convertGeoJsonTo2D, 
  updateGeomFromGeoJSON,
  buildMapDataFromPayload 
} from '../feature/geoJsonUtils.js'

// Parse JSON ที่อาจโดน stringify ซ้ำ
const parsed = safeParseJson(jsonString)

// Convert 3D coordinates เป็น 2D
const converted = convertGeoJsonTo2D(geoJsonData)

// Update PostGIS geometry
await updateGeomFromGeoJSON(prisma, mapId, geoJsonData)

// Build map data จาก payload
const mapData = buildMapDataFromPayload(payload)
```

### 2. Action Hooks

```javascript
import { 
  beforeEditHook,
  afterNewHook,
  afterEditHook,
  afterShowHook,
  afterDeleteHook,
  afterBulkDeleteHook
} from '../feature/actionHooks.js'

export const actions_myresource = {
  new: {
    after: afterNewHook,
  },
  edit: {
    before: beforeEditHook,
    after: afterEditHook,
  },
  show: {
    after: afterShowHook,
  },
  delete: {
    after: afterDeleteHook,
  },
  bulkDelete: {
    after: afterBulkDeleteHook,
  },
}
```

### 3. Import ทั้งหมด

```javascript
import { 
  // GeoJSON utilities
  safeParseJson,
  convertGeoJsonTo2D,
  updateGeomFromGeoJSON,
  buildMapDataFromPayload,
  
  // Action hooks
  beforeEditHook,
  afterNewHook,
  afterEditHook,
  afterShowHook,
  afterDeleteHook,
  afterBulkDeleteHook,
  
  // Components
  backButton
} from '../feature/index.js'
```

## 🎯 ฟีเจอร์

### GeoJSON Utilities
- ✅ **safeParseJson** - Parse JSON ที่อาจโดน stringify ซ้ำ
- ✅ **convertGeoJsonTo2D** - Convert 3D coordinates เป็น 2D
- ✅ **updateGeomFromGeoJSON** - Update PostGIS geometry
- ✅ **buildMapDataFromPayload** - Build map data จาก payload

### Action Hooks
- ✅ **beforeEditHook** - Preload data ก่อน edit
- ✅ **afterNewHook** - Handle file uploads และ map data หลัง new
- ✅ **afterEditHook** - Handle file uploads และ map data หลัง edit
- ✅ **afterShowHook** - Load data สำหรับ show view
- ✅ **afterDeleteHook** - Clean up data หลัง delete
- ✅ **afterBulkDeleteHook** - Clean up data หลัง bulk delete

## 🔧 การปรับแต่ง

### เพิ่ม Hook ใหม่

```javascript
// ใน actionHooks.js
export async function afterCustomHook(response, request) {
  // Custom logic here
  return response
}
```

### เพิ่ม Utility ใหม่

```javascript
// ใน geoJsonUtils.js
export function customGeoJsonFunction(data) {
  // Custom logic here
  return processedData
}
```

## 📝 ตัวอย่างการใช้งาน

### ไฟล์ actions ใหม่

```javascript
// page/myresource/actions.js
import { 
  beforeEditHook,
  afterNewHook,
  afterEditHook,
  afterShowHook,
  afterDeleteHook
} from '../feature/actionHooks.js'

export const actions_myresource = {
  new: {
    after: afterNewHook,
  },
  edit: {
    before: beforeEditHook,
    after: afterEditHook,
  },
  show: {
    after: afterShowHook,
  },
  delete: {
    after: afterDeleteHook,
  },
}
```

### ใช้งาน GeoJSON Utilities

```javascript
// ในไฟล์อื่น
import { safeParseJson, convertGeoJsonTo2D } from '../feature/geoJsonUtils.js'

const processGeoJson = (rawData) => {
  const parsed = safeParseJson(rawData)
  const converted = convertGeoJsonTo2D(parsed)
  return converted
}
```

## 🎉 ประโยชน์

1. **Reusable** - ใช้งานได้กับไฟล์อื่น
2. **Maintainable** - แยก module ชัดเจน
3. **Testable** - แต่ละ function แยกกัน
4. **Extensible** - เพิ่มฟีเจอร์ใหม่ได้ง่าย
5. **Clean Code** - ลด code duplication
