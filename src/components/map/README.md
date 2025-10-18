# Map Components - Props-based Architecture

ระบบจัดการข้อมูลแผนที่ที่ใช้ props แทน store สำหรับความเรียบง่าย

## 📁 โครงสร้างไฟล์

```
src/components/map/
├── MapForm.jsx          # ฟอร์มหลัก (ใช้ props)
├── ShowMapView.jsx      # แสดงแผนที่ (ใช้ props)
├── mapfild.jsx          # MapField component
├── open_pup.jsx         # Component เดิม (ใช้ store)
├── show_map.jsx         # Component เดิม (ใช้ store)
├── lib/
│   └── store.js         # Zustand store (สำหรับ backward compatibility)
└── index.js             # Export ทั้งหมด
```

## 🚀 การใช้งาน

### 1. ใช้ Components ใหม่ (Props-based)

```jsx
// ฟอร์มหลัก
import { MapForm } from './components/map'

const MyComponent = () => {
  return (
    <MapForm 
      record={record}
      property={property}
      onChange={handleChange}
    />
  )
}
```

```jsx
// แสดงแผนที่
import { ShowMapView } from './components/map'

const MyComponent = () => {
  return (
    <ShowMapView 
      record={record}
      property={property}
    />
  )
}
```

### 2. ใช้ MapField โดยตรง

```jsx
import { MapField } from './components/map'

const MyComponent = () => {
  return (
    <MapField
      latitude={7.559}
      longitude={99.611}
      data={geoJsonData}
      colors="#ff0000"
      onChange={handleChange}
    />
  )
}
```

## 🔧 Features

### MapForm Component
- **ไม่ใช้ store** - ใช้ local state
- **Props-based** - ส่งค่าผ่าน props
- **Form validation** - ตรวจสอบฟิลด์ที่จำเป็น
- **KML support** - Import KML files
- **Preview mode** - ดูตัวอย่างแผนที่

### ShowMapView Component
- **Simple display** - แสดงแผนที่แบบ read-only
- **Props-based** - รับค่าจาก record params
- **No state management** - ไม่ต้องจัดการ state

### MapField Component
- **Pure component** - รับค่าเป็น props
- **Reusable** - ใช้ซ้ำได้
- **Testable** - ทดสอบง่าย

## 📝 ข้อดีของ Props-based Architecture

1. **เรียบง่าย** - ไม่ต้องใช้ store
2. **เข้าใจง่าย** - data flow ชัดเจน
3. **Testable** - ทดสอบได้ง่าย
4. **Reusable** - ใช้ซ้ำได้
5. **Performance** - ไม่มี unnecessary re-renders

## 🔄 Migration Guide

### จาก Store-based เป็น Props-based

```jsx
// เดิม (Store-based)
import { useMapStore } from './lib/store'
const { latitude, longitude, setLatLng } = useMapStore()

// ใหม่ (Props-based)
const [latitude, setLatitude] = useState(7.559)
const [longitude, setLongitude] = useState(99.611)
```

### การส่งค่า

```jsx
// เดิม
<MapField onChange={handleChange} />

// ใหม่
<MapField 
  latitude={latitude}
  longitude={longitude}
  data={data}
  colors={colors}
  onChange={handleChange}
/>
```

## 🎯 Best Practices

1. **ใช้ local state** สำหรับ form data
2. **ส่งค่าเป็น props** ระหว่าง components
3. **Validate ข้อมูล** ก่อนส่ง
4. **Handle errors** อย่างเหมาะสม
5. **Keep components pure** - ไม่มี side effects

## 🐛 Troubleshooting

### Props ไม่ update
- ตรวจสอบว่า parent component ส่งค่าใหม่หรือไม่
- ตรวจสอบ key prop ใน list rendering

### State ไม่ sync
- ใช้ useEffect เพื่อ sync state
- ตรวจสอบ dependencies array

### Performance issues
- ใช้ React.memo สำหรับ pure components
- ใช้ useCallback สำหรับ functions