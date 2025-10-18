# Prisma Geometry + JSON Data Flow - Visual Flowchart

## 🔍 ปัญหาหลัก (Main Problem)

```
┌─────────────────────────────────────────────────────────────┐
│                    ปัญหาที่พบ                                │
├─────────────────────────────────────────────────────────────┤
│ 1. Prisma ไม่สามารถ select field `geom` ได้โดยตรง            │
│    เพราะเป็น Unsupported("geometry") ใน schema              │
│                                                             │
│ 2. AdminJS ไม่ส่งข้อมูล `data` และ `geom` มาให้ components  │
│    โดยอัตโนมัติ                                              │
│                                                             │
│ 3. ข้อมูล JSON ซับซ้อนแสดงเป็น ellipsis (...) ใน list view   │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ วิธีแก้ไข (Solution Flow)

### 1. Database Layer
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PostgreSQL    │    │     PostGIS     │    │   Map Table     │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   Standard  │ │    │ │  Geometry   │ │    │ │    geom     │ │
│ │   Fields    │ │    │ │  Functions  │ │    │ │ (geometry)  │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │    JSON     │ │    │ │ ST_AsText   │ │    │ │    data     │ │
│ │   Support   │ │    │ │ ST_AsGeoJSON│ │    │ │  (jsonb)    │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 2. Prisma Layer
```
┌─────────────────────────────────────────────────────────────┐
│                    Prisma Schema                            │
├─────────────────────────────────────────────────────────────┤
│ model Map {                                                 │
│   id        Int      @id @default(autoincrement())         │
│   name_local String?                                       │
│   data      Json?    ← ✅ สามารถใช้ findMany ได้            │
│   geom      Unsupported("geometry")? ← ❌ ต้องใช้ $queryRaw │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ❌ findMany   │    │   ✅ $queryRaw   │    │   PostGIS       │
│                 │    │                 │    │   Functions     │
│ Cannot select   │    │ Can use raw SQL │    │                 │
│ geometry field  │    │ with PostGIS    │    │ ST_AsText()     │
│                 │    │ functions       │    │ ST_AsGeoJSON()  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 3. AdminJS Layer
```
┌─────────────────────────────────────────────────────────────┐
│                    AdminJS Resource                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │  Standard       │    │  Custom         │                │
│  │  Properties     │    │  Actions        │                │
│  │                 │    │                 │                │
│  │ listProperties  │    │ list.after      │                │
│  │ showProperties  │    │ handler         │                │
│  │ editProperties  │    │                 │                │
│  └─────────────────┘    └─────────────────┘                │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │  Custom         │    │  Component      │                │
│  │  Components     │    │  Loader         │                │
│  │                 │    │                 │                │
│  │ DataDisplay     │    │ componentLoader │                │
│  │ MapField        │    │                 │                │
│  └─────────────────┘    └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Process

### 1. Request Flow
```
User Request
     ↓
┌─────────────────┐
│   AdminJS       │
│   List View     │
└─────────────────┘
     ↓
┌─────────────────┐
│  Custom Action  │
│  list.after     │
└─────────────────┘
     ↓
┌─────────────────┐
│ Extract Record  │
│ IDs             │
└─────────────────┘
     ↓
┌─────────────────┐
│ prisma.$queryRaw│
│ + PostGIS       │
└─────────────────┘
     ↓
┌─────────────────┐
│ Merge Data to   │
│ Response        │
└─────────────────┘
     ↓
┌─────────────────┐
│ Custom          │
│ Components      │
└─────────────────┘
     ↓
┌─────────────────┐
│ Display Data    │
│ to User         │
└─────────────────┘
```

### 2. Data Transformation
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Database      │    │   Prisma        │    │   AdminJS       │
│                 │    │                 │    │                 │
│ geom: geometry  │    │ geom_wkt:       │    │ record.params   │
│ data: jsonb     │    │ "POINT(...)"    │    │ .geom = wkt     │
│                 │    │ geom_geojson:   │    │ record.params   │
│                 │    │ "{...}"         │    │ .data = json    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧪 Testing Flow

### 1. Unit Testing
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Database      │    │   Prisma        │    │   AdminJS       │
│   Tests         │    │   Tests         │    │   Tests         │
│                 │    │                 │    │                 │
│ Test PostGIS    │    │ Test $queryRaw  │    │ Test Actions    │
│ functions       │    │ queries         │    │ Test Components │
│ Test JSON       │    │ Test data       │    │ Test Data Flow  │
│ storage         │    │ transformation  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 2. Integration Testing
```
┌─────────────────────────────────────────────────────────────┐
│                    Integration Test Flow                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. Create Test Data                                         │
│    └─ Insert Map record with geom + data                   │
│                                                             │
│ 2. Test List View                                           │
│    └─ Verify data displays correctly                       │
│                                                             │
│ 3. Test Show View                                           │
│    └─ Verify complete data shows                           │
│                                                             │
│ 4. Test Edit View                                           │
│    └─ Verify data can be modified                          │
│                                                             │
│ 5. Test Custom Components                                   │
│    └─ Verify DataDisplay and MapField work                 │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Implementation Details

### 1. SQL Query Pattern
```
┌─────────────────────────────────────────────────────────────┐
│                    SQL Query Comparison                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ❌ ไม่ได้ (Prisma findMany)                                 │
│ SELECT id, data, geom FROM "Map" WHERE id IN (...)         │
│                                                             │
│ ✅ ได้ (Prisma $queryRaw)                                   │
│ SELECT                                                      │
│   id,                                                       │
│   data,                                                     │
│   ST_AsText(geom) as geom_wkt,                             │
│   ST_AsGeoJSON(geom) as geom_geojson                       │
│ FROM "Map"                                                  │
│ WHERE id = ANY($1)                                          │
└─────────────────────────────────────────────────────────────┘
```

### 2. AdminJS Action Pattern
```
┌─────────────────────────────────────────────────────────────┐
│                    AdminJS Action Code                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ actions: {                                                  │
│   list: {                                                   │
│     after: async (response) => {                            │
│       // 1. Extract IDs                                     │
│       const recordIds = response.records.map(r => r.id)    │
│                                                             │
│       // 2. Query with PostGIS                              │
│       const fullData = await prisma.$queryRaw`...`         │
│                                                             │
│       // 3. Merge data                                      │
│       response.records.forEach(record => {                 │
│         const fullRecord = fullData.find(f => f.id === record.id) │
│         if (fullRecord) {                                   │
│           record.params.data = fullRecord.data              │
│           record.params.geom = fullRecord.geom_wkt          │
│         }                                                   │
│       })                                                    │
│                                                             │
│       return response                                       │
│     }                                                       │
│   }                                                         │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘
```

### 3. Component Pattern
```
┌─────────────────────────────────────────────────────────────┐
│                    Component Code Pattern                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ const DataDisplay = ({ record, property }) => {            │
│   const value = record?.params?.[property.name]            │
│                                                             │
│   if (!value) {                                             │
│     return <Text>ไม่มีข้อมูล</Text>                          │
│   }                                                         │
│                                                             │
│   // Handle JSON data                                       │
│   if (value && typeof value === 'object') {                │
│     return <JsonDisplay data={value} />                    │
│   }                                                         │
│                                                             │
│   return <Text>Raw: {value}</Text>                         │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Best Practices

### 1. Database Design
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ✅ Good       │    │   ✅ Good       │    │   ✅ Good       │
│                 │    │                 │    │                 │
│ Use jsonb for   │    │ Use geometry    │    │ Use Unsupported │
│ JSON data       │    │ for PostGIS     │    │ in Prisma       │
│                 │    │                 │    │ schema          │
└─────────────────┘    └─────────────────┘    └─────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ❌ Bad        │    │   ❌ Bad        │    │   ❌ Bad        │
│                 │    │                 │    │                 │
│ Use text for    │    │ Use text for    │    │ Try to use      │
│ JSON data       │    │ geometry        │    │ findMany with   │
│                 │    │                 │    │ geometry        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 2. Query Patterns
```
┌─────────────────────────────────────────────────────────────┐
│                    Query Pattern Comparison                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ✅ Efficient (Single Query)                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ const data = await prisma.$queryRaw`                   │ │
│ │   SELECT id, data, ST_AsText(geom), ST_AsGeoJSON(geom) │ │
│ │   FROM "Map" WHERE id = ANY(${ids})                    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ❌ Inefficient (Multiple Queries)                          │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ for (const id of ids) {                                 │ │
│ │   const data = await prisma.$queryRaw`...`             │ │
│ │ }                                                       │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔍 Debugging Guide

### 1. Common Issues & Solutions
```
┌─────────────────────────────────────────────────────────────┐
│                    Debugging Flowchart                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Issue: No Data Display                                      │
│     ↓                                                       │
│ ┌─────────────────┐    ┌─────────────────┐                │
│ │ Check Data      │    │ Check Component │                │
│ │ Source          │    │ Props           │                │
│ │                 │    │                 │                │
│ │ • listProperties│    │ • record.params │                │
│ │ • Custom Action │    │ • property.name │                │
│ │ • Database      │    │ • Data parsing  │                │
│ └─────────────────┘    └─────────────────┘                │
│                                                             │
│ Issue: Geometry Error                                       │
│     ↓                                                       │
│ ┌─────────────────┐    ┌─────────────────┐                │
│ │ Check Query     │    │ Check SQL       │                │
│ │ Type            │    │ Syntax          │                │
│ │                 │    │                 │                │
│ │ • Use $queryRaw │    │ • PostGIS       │                │
│ │ • Not findMany  │    │   functions     │                │
│ │ • Raw SQL       │    │ • Column names  │                │
│ └─────────────────┘    └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### 2. Debug Steps
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   1. Console    │    │   2. Network    │    │   3. Component  │
│   Logs          │    │   Tab           │    │   Props         │
│                 │    │                 │    │                 │
│ Check for       │    │ Verify API      │    │ Verify data     │
│ Prisma errors   │    │ responses       │    │ flow            │
│ Check for       │    │ Check request   │    │ Check data      │
│ AdminJS errors  │    │ payloads        │    │ parsing         │
└─────────────────┘    └─────────────────┘    └─────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   4. Database   │    │   5. Schema     │    │   6. Test       │
│   Query         │    │   Validation    │    │   Data          │
│                 │    │                 │    │                 │
│ Verify data     │    │ Check Prisma    │    │ Create test     │
│ exists          │    │ schema          │    │ records         │
│ Check PostGIS   │    │ Check field     │    │ Test with       │
│ functions       │    │ types           │    │ real data       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📊 Success Metrics

### 1. Functional Success
```
┌─────────────────────────────────────────────────────────────┐
│                    Success Checklist                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ✅ Data displays correctly in list view                    │
│ ✅ Data displays correctly in show view                    │
│ ✅ Data can be edited in edit view                         │
│ ✅ Map renders correctly with data                         │
│ ✅ No console errors                                       │
│ ✅ No Prisma validation errors                             │
│ ✅ Custom components receive data                          │
│ ✅ PostGIS functions work correctly                        │
└─────────────────────────────────────────────────────────────┘
```

### 2. Performance Success
```
┌─────────────────────────────────────────────────────────────┐
│                    Performance Metrics                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ✅ Page loads within 2 seconds                             │
│ ✅ No memory leaks                                          │
│ ✅ Efficient database queries                               │
│ ✅ Smooth user experience                                   │
│ ✅ No N+1 query problems                                    │
│ ✅ Proper error handling                                    │
│ ✅ Responsive UI                                            │
└─────────────────────────────────────────────────────────────┘
```

---

**สรุป**: ปัญหาหลักคือ Prisma ไม่สามารถ handle PostGIS geometry fields ได้โดยตรง ต้องใช้ `$queryRaw` ร่วมกับ PostGIS functions และสร้าง custom AdminJS actions เพื่อส่งข้อมูลที่สมบูรณ์ไปยัง components
