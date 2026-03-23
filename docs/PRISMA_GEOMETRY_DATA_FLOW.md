# Prisma Geometry + JSON Data Flow Analysis

## 🔍 ปัญหาที่พบ (Problem Analysis)

### 1. ปัญหาหลัก
- **Prisma ไม่สามารถ select field `geom` ได้โดยตรง** เพราะเป็น `Unsupported("geometry")` ใน schema
- **AdminJS ไม่ส่งข้อมูล `data` และ `geom` มาให้ custom components** โดยอัตโนมัติ
- **ข้อมูล JSON ซับซ้อนแสดงเป็น ellipsis (...)** ใน list view

### 2. สาเหตุของปัญหา
```mermaid
graph TD
    A[AdminJS List View] --> B[Prisma findMany]
    B --> C{Field Type Check}
    C -->|Standard Fields| D[✅ Success]
    C -->|Unsupported Geometry| E[❌ Error: Unknown field geom]
    C -->|Complex JSON| F[⚠️ Partial Data]
    
    E --> G[PrismaClientValidationError]
    F --> H[Data not passed to components]
```

## 🛠️ วิธีแก้ไข (Solution Flow)

### 1. Custom Action Approach
```mermaid
graph TD
    A[AdminJS List Request] --> B[Custom list.after Action]
    B --> C[Extract Record IDs]
    C --> D[prisma.$queryRaw with PostGIS]
    D --> E[ST_AsText & ST_AsGeoJSON]
    E --> F[Merge Data to Response]
    F --> G[✅ Complete Data to Components]
    
    D --> H[Raw SQL Query]
    H --> I[SELECT id, data, ST_AsText(geom), ST_AsGeoJSON(geom)]
```

### 2. Custom Resource Approach
```mermaid
graph TD
    A[Custom Resource Handler] --> B[Direct Database Query]
    B --> C[prisma.$queryRaw]
    C --> D[PostGIS Functions]
    D --> E[Transform to AdminJS Format]
    E --> F[Return Complete Records]
    F --> G[✅ All Data Available]
```

## 📊 Data Flow Architecture

### 1. Database Layer
```mermaid
graph LR
    A[PostgreSQL + PostGIS] --> B[Map Table]
    B --> C[geom: geometry]
    B --> D[data: jsonb]
    B --> E[Standard Fields]
    
    C --> F[ST_AsText → WKT]
    C --> G[ST_AsGeoJSON → GeoJSON]
```

### 2. Prisma Layer
```mermaid
graph TD
    A[Prisma Schema] --> B[Map Model]
    B --> C[geom: Unsupported geometry]
    B --> D[data: Json]
    B --> E[Standard Fields]
    
    C --> F[❌ Cannot use findMany]
    D --> G[✅ Can use findMany]
    
    F --> H[Use $queryRaw]
    H --> I[PostGIS Functions]
```

### 3. AdminJS Layer
```mermaid
graph TD
    A[AdminJS Resource] --> B[Standard Properties]
    A --> C[Custom Components]
    
    B --> D[listProperties]
    B --> E[showProperties]
    B --> F[editProperties]
    
    C --> G[DataDisplay Component]
    C --> H[MapField Component]
    
    D --> I[Include data field]
    G --> J[Receive complete data]
```

## 🧪 Testing Strategy

### 1. Unit Testing
```mermaid
graph TD
    A[Test Prisma Queries] --> B[Test $queryRaw]
    B --> C[Test PostGIS Functions]
    C --> D[Test Data Transformation]
    
    E[Test AdminJS Actions] --> F[Test list.after]
    F --> G[Test Data Merging]
    G --> H[Test Component Props]
```

### 2. Integration Testing
```mermaid
graph TD
    A[Test Complete Flow] --> B[Create Test Data]
    B --> C[Test List View]
    C --> D[Test Show View]
    D --> E[Test Edit View]
    
    F[Test Custom Components] --> G[Test DataDisplay]
    G --> H[Test MapField]
    H --> I[Test Map Rendering]
```

## 🔧 Implementation Details

### 1. Prisma Query Pattern
```sql
-- ❌ ไม่ได้ (Prisma findMany)
SELECT id, data, geom FROM "Map" WHERE id IN (...)

-- ✅ ได้ (Prisma $queryRaw)
SELECT 
  id,
  data,
  ST_AsText(geom) as geom_wkt,
  ST_AsGeoJSON(geom) as geom_geojson
FROM "Map" 
WHERE id = ANY($1)
```

### 2. AdminJS Action Pattern
```javascript
// Custom list.after action
actions: {
  list: {
    after: async (response) => {
      // 1. Extract IDs
      const recordIds = response.records.map(record => record.id)
      
      // 2. Query with PostGIS
      const fullData = await prisma.$queryRaw`...`
      
      // 3. Merge data
      response.records.forEach(record => {
        const fullRecord = fullData.find(f => f.id === record.id)
        if (fullRecord) {
          record.params.data = fullRecord.data
          record.params.geom = fullRecord.geom_wkt
        }
      })
      
      return response
    }
  }
}
```

### 3. Component Pattern
```javascript
// DataDisplay Component
const DataDisplay = ({ record, property }) => {
  const value = record?.params?.[property.name]
  
  // Handle JSON data
  if (value && typeof value === 'object') {
    return <JsonDisplay data={value} />
  }
  
  return <Text>ไม่มีข้อมูล</Text>
}
```

## 🎯 Best Practices

### 1. Database Design
- ✅ ใช้ `jsonb` สำหรับ JSON data
- ✅ ใช้ `geometry` สำหรับ PostGIS
- ✅ ใช้ `Unsupported("geometry")` ใน Prisma schema

### 2. Prisma Usage
- ✅ ใช้ `$queryRaw` สำหรับ geometry fields
- ✅ ใช้ `findMany` สำหรับ standard fields
- ✅ ใช้ PostGIS functions (`ST_AsText`, `ST_AsGeoJSON`)

### 3. AdminJS Configuration
- ✅ ใช้ custom actions สำหรับ complex data
- ✅ ใช้ custom components สำหรับ display
- ✅ ระบุ `listProperties` ให้ครบถ้วน

### 4. Component Development
- ✅ Handle null/undefined data
- ✅ Parse JSON data safely
- ✅ Provide fallback UI

## 🚀 Performance Considerations

### 1. Query Optimization
```mermaid
graph TD
    A[Single Query] --> B[Get All Data]
    B --> C[PostGIS Functions]
    C --> D[Transform in Memory]
    
    E[Multiple Queries] --> F[Get IDs First]
    F --> G[Get Data Second]
    G --> H[❌ N+1 Problem]
```

### 2. Caching Strategy
```mermaid
graph TD
    A[Request] --> B{Cache Check}
    B -->|Hit| C[Return Cached Data]
    B -->|Miss| D[Query Database]
    D --> E[Cache Result]
    E --> F[Return Data]
```

## 📝 Testing Checklist

### 1. Database Testing
- [ ] Test PostGIS functions work
- [ ] Test JSON data storage/retrieval
- [ ] Test geometry conversion
- [ ] Test performance with large datasets

### 2. Prisma Testing
- [ ] Test $queryRaw queries
- [ ] Test data transformation
- [ ] Test error handling
- [ ] Test type safety

### 3. AdminJS Testing
- [ ] Test list view data display
- [ ] Test show view data display
- [ ] Test edit view data input
- [ ] Test custom components

### 4. Component Testing
- [ ] Test DataDisplay component
- [ ] Test MapField component
- [ ] Test error states
- [ ] Test loading states

## 🔍 Debugging Guide

### 1. Common Issues
```mermaid
graph TD
    A[Issue: No Data Display] --> B{Check Data Source}
    B -->|AdminJS| C[Check listProperties]
    B -->|Component| D[Check record.params]
    B -->|Database| E[Check query results]
    
    F[Issue: Geometry Error] --> G{Check Query Type}
    G -->|findMany| H[❌ Use $queryRaw]
    G -->|$queryRaw| I[✅ Check SQL syntax]
```

### 2. Debug Steps
1. **Check Console Logs** - Look for Prisma errors
2. **Check Network Tab** - Verify API responses
3. **Check Component Props** - Verify data flow
4. **Check Database** - Verify data exists

## 📚 Related Files

### 1. Configuration Files
- `page/map.js` - AdminJS resource configuration
- `page/map-custom.js` - Custom resource handler
- `config/loder.js` - Component loader
- `prisma/schema.prisma` - Database schema

### 2. Component Files
- `src/components/featureUi/DataDisplay.jsx` - Data display component
- `src/components/featureUi/MapField.jsx` - Map field component
- `src/components/testmap/viewkml.jsx` - Map view component

### 3. API Files
- `routes/test-kml-import.js` - Test API endpoints
- `page/buildingControl/actions.js` - GeoJSON processing

## 🎉 Success Metrics

### 1. Functional Success
- ✅ Data displays correctly in list view
- ✅ Data displays correctly in show view
- ✅ Data can be edited in edit view
- ✅ Map renders correctly with data

### 2. Performance Success
- ✅ Page loads within 2 seconds
- ✅ No memory leaks
- ✅ Efficient database queries
- ✅ Smooth user experience

---

**สรุป**: ปัญหาหลักคือ Prisma ไม่สามารถ handle PostGIS geometry fields ได้โดยตรง ต้องใช้ `$queryRaw` ร่วมกับ PostGIS functions และสร้าง custom AdminJS actions เพื่อส่งข้อมูลที่สมบูรณ์ไปยัง components
