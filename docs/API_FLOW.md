# API Backend Flow Documentation

## Overview

ระบบ API ใช้ **Express.js** เป็น backend framework พร้อมกับ **Prisma ORM** สำหรับจัดการ database

---

## 1. Server Initialization Flow

```
index.js
    │
    ├─── dotenv.config()                  # Load environment variables
    │
    ├─── createExpressApp()               # Create Express instance
    │    └── config/server.js
    │
    ├─── compression middleware           # gzip compression
    │
    ├─── createPrismaClient()             # Initialize Prisma
    │    └── config/database.js
    │
    ├─── Static files setup               # /public, /uploads, /www
    │
    ├─── Swagger UI setup                 # /api-docs
    │
    ├─── API Routes registration          # /api/*
    │    ├── authRoutes         → /api/auth
    │    ├── dashboardRoutes    → /api/dashboard
    │    ├── uploadRoutes       → /api/upload
    │    ├── locationRoutes     → /api/location
    │    ├── mapsRoutes         → /api/maps
    │    ├── addressRoutes      → /api/address
    │    ├── testKmlImportRoutes → /api/import-kml
    │    └── uploadPictureRoutes → /api/upload-image
    │
    ├─── createAdminJS()                  # Initialize AdminJS
    │    └── config/admin.js
    │
    ├─── AdminJSExpress.buildAuthenticatedRouter()
    │    └── middleware/adminAuth.js
    │
    └─── startServer(app, PORT)           # Listen on port
```

---

## 2. Authentication Flow

### 2.1 Login Process

```
POST /api/auth/login
         │
         ▼
┌─────────────────────────────┐
│ Request Body Validation     │
│ - email (required)          │
│ - password (required)       │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ authenticateUser()          │
│ config/auth.js              │
│                             │
│ 1. Find user by email OR    │
│    username (Prisma)        │
│ 2. Compare password         │
│    (bcrypt.compare)         │
│ 3. Generate JWT token       │
│    (jsonwebtoken.sign)      │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ Response                    │
│ {                           │
│   success: true,            │
│   data: {                   │
│     user: {...},            │
│     token: "eyJ..."         │
│   }                         │
│ }                           │
└─────────────────────────────┘
```

### 2.2 Token Verification Middleware

```javascript
// config/auth.js - authenticateToken()

authenticateToken(req, res, next)
    │
    ├─── Extract token from:
    │    - Authorization header: "Bearer <token>"
    │    - OR cookie: "token"
    │
    ├─── jwt.verify(token, JWT_SECRET)
    │    │
    │    ├─── Valid: req.user = decoded
    │    │           next()
    │    │
    │    └─── Invalid: 401 Unauthorized
    │
    └─── No token: 401 "กรุณาเข้าสู่ระบบ"
```

### 2.3 Permission Check Flow

```javascript
// config/auth.js - requirePermission(resource, action)

requirePermission('user', 'create')(req, res, next)
    │
    ▼
getUserRolesAndPermissions(req.user.userId)
    │
    ▼
Check if user has permission
    │
    ├─── Has permission → next()
    │
    └─── No permission → 403 Forbidden
```

---

## 3. Dashboard API Flow

### 3.1 GET /api/dashboard/summary

```
Request → authenticateToken
              │
              ▼
        ┌─────────────────────────────────────┐
        │ Promise.all([                       │
        │   prisma.user.count(),              │
        │   prisma.owner.count(),             │
        │   prisma.fiscalYear.count(),        │
        │   prisma.buildingControl.count(),   │
        │   prisma.riskZone.count(),          │
        │   prisma.zoningPlan.count(),        │
        │   prisma.uploads.count(),           │
        │   prisma.map.count(),               │
        │ ])                                  │
        └─────────────────────────────────────┘
              │
              ▼
        Response: { users, owners, buildings, ... }
```

### 3.2 GET /api/dashboard/building-by-year

```
Request → authenticateToken
              │
              ▼
        ┌─────────────────────────────────────┐
        │ prisma.buildingControl.groupBy({    │
        │   by: ['fiscalYearId'],             │
        │   _count: { _all: true }            │
        │ })                                  │
        └─────────────────────────────────────┘
              │
              ▼
        ┌─────────────────────────────────────┐
        │ prisma.fiscalYear.findMany()        │
        │ → Map fiscalYearId to year name     │
        └─────────────────────────────────────┘
              │
              ▼
        Response: [{ fiscalYearId, year, count }]
```

### 3.3 GET /api/dashboard/uploads-trend

```
Request → authenticateToken
              │
              ▼
        Loop: last N months (default 6)
              │
              ▼
        For each month:
        ┌─────────────────────────────────────┐
        │ prisma.uploads.count({              │
        │   where: {                          │
        │     createdAt: { gte: start, lt: end}│
        │   }                                 │
        │ })                                  │
        └─────────────────────────────────────┘
              │
              ▼
        Response: [{ month: "ม.ค.", uploads: 10 }, ...]
```

---

## 4. Maps API Flow

### 4.1 GET /api/maps (Filtered)

```
Request: ?year=2567&province=กรุงเทพ
              │
              ▼
        ┌─────────────────────────────────────┐
        │ If year provided:                   │
        │ prisma.fiscalYear.findFirst({       │
        │   where: { year: Number(year) }     │
        │ })                                  │
        └─────────────────────────────────────┘
              │
              ▼
        ┌─────────────────────────────────────┐
        │ Query BuildingControl, RiskZone,    │
        │ ZoningPlan with fiscalYearId filter │
        │ and province filter                 │
        └─────────────────────────────────────┘
              │
              ▼
        Response: { building, riskZones, zoningPlans }
```

### 4.2 GET /api/maps/local (All or Search)

```
Request: ?q=keyword OR ?name_local=value OR (empty)
              │
              ▼
    ┌─────────────────────────────────────────────┐
    │ Layer 1: No params → Get ALL maps           │
    │                                             │
    │ Layer 2: q → Search in name_local,          │
    │          house_no, address                  │
    │                                             │
    │ Layer 3: name_local → Filter exact          │
    └─────────────────────────────────────────────┘
              │
              ▼
    ┌─────────────────────────────────────────────┐
    │ prisma.map.findMany({                       │
    │   where: whereCondition,                    │
    │   take: 50,                                 │
    │   select: {                                 │
    │     id, latitude, longitude, name_local,    │
    │     house_no, address, images,              │
    │     buildingControl: { select: {...} },     │
    │     riskZone: { select: {...} },            │
    │     zoningPlan: { select: {...} }           │
    │   }                                         │
    │ })                                          │
    └─────────────────────────────────────────────┘
              │
              ▼
    ┌─────────────────────────────────────────────┐
    │ Enrich with FiscalYear data                 │
    │ (N+1 query problem - needs optimization)    │
    └─────────────────────────────────────────────┘
              │
              ▼
    Response: { success, data, total }
```

---

## 5. File Upload Flow

### 5.1 POST /api/upload/upload

```
Request: multipart/form-data
         - file: <binary>
         - buildingControlId (optional)
         - riskZoneId (optional)
         - etc.
              │
              ▼
        ┌─────────────────────────────────────┐
        │ Multer Middleware                   │
        │ - Parse multipart form              │
        │ - Save to public/uploads/documents  │
        │ - Generate unique filename          │
        └─────────────────────────────────────┘
              │
              ▼
        ┌─────────────────────────────────────┐
        │ prisma.uploads.create({             │
        │   data: {                           │
        │     namefile: originalName,         │
        │     url: "/uploads/documents/...",  │
        │     fileType: mimetype,             │
        │     size: file.size,                │
        │     uploadedBy: req.user?.userId,   │
        │     buildingControlId: ...,         │
        │   }                                 │
        │ })                                  │
        └─────────────────────────────────────┘
              │
              ▼
        Response: { success, data: uploadRecord }
```

### 5.2 POST /api/upload-image (Images)

```
Request: multipart/form-data
         - image: <binary> (max 5MB)
         - Allowed types: JPEG, PNG, GIF, WEBP
              │
              ▼
        ┌─────────────────────────────────────┐
        │ Multer with image filter            │
        │ - Check MIME type                   │
        │ - Check file size (5MB limit)       │
        │ - Save to public/uploads/images     │
        └─────────────────────────────────────┘
              │
              ▼
        Response: { success, url: "/uploads/images/..." }
```

---

## 6. Location API Flow

### 6.1 GET /api/location/provinces

```
Request → getProvinces()
              │
              ▼
        ┌─────────────────────────────────────┐
        │ prisma.districts.findMany({         │
        │   distinct: ['province'],           │
        │   select: {                         │
        │     province: true,                 │
        │     province_code: true             │
        │   }                                 │
        │ })                                  │
        └─────────────────────────────────────┘
              │
              ▼
        Response: [{ province, province_code }]
```

### 6.2 Cascade: Province → Amphoe → District

```
Province Selected
       │
       ▼
GET /api/location/amphoes/:provinceCode
       │
       ▼
┌─────────────────────────────┐
│ Filter districts by         │
│ province_code               │
│ Return distinct amphoes     │
└─────────────────────────────┘
       │
       ▼
Amphoe Selected
       │
       ▼
GET /api/location/districts/:amphoeCode
       │
       ▼
┌─────────────────────────────┐
│ Filter districts by         │
│ amphoe_code                 │
│ Return districts with       │
│ zipcode                     │
└─────────────────────────────┘
```

---

## 7. Error Handling Pattern

### Current Pattern (ต้องปรับปรุง)

```javascript
router.get('/endpoint', async (req, res) => {
  try {
    // ... logic
    res.json({ success: true, data })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาด'
    })
  }
})
```

### Recommended Pattern (ควรใช้)

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

// Usage in routes
router.get('/endpoint', asyncHandler(async (req, res) => {
  const data = await someOperation()
  if (!data) {
    throw new AppError('Not found', 404)
  }
  res.json({ success: true, data })
}))
```

---

## 8. API Response Format

### Success Response

```json
{
  "success": true,
  "message": "ดำเนินการสำเร็จ",
  "data": { ... },
  "total": 100,
  "page": 1,
  "limit": 20
}
```

### Error Response

```json
{
  "success": false,
  "message": "เกิดข้อผิดพลาด",
  "error": "Detailed error message (dev only)"
}
```

---

## 9. Middleware Chain

```
Request
   │
   ▼
┌─────────────────────┐
│ compression()       │  gzip response
└─────────────────────┘
   │
   ▼
┌─────────────────────┐
│ express.json()      │  Parse JSON body
└─────────────────────┘
   │
   ▼
┌─────────────────────┐
│ cookie-parser()     │  Parse cookies
└─────────────────────┘
   │
   ▼
┌─────────────────────┐
│ express.static()    │  Serve static files
└─────────────────────┘
   │
   ▼
┌─────────────────────┐
│ authenticateToken() │  Verify JWT (protected routes)
└─────────────────────┘
   │
   ▼
┌─────────────────────┐
│ requirePermission() │  Check permissions (admin routes)
└─────────────────────┘
   │
   ▼
┌─────────────────────┐
│ Route Handler       │
└─────────────────────┘
   │
   ▼
Response
```

---

*สร้างโดย Claude Code Analysis*
