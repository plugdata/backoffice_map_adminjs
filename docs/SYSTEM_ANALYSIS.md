# ระบบ Backoffice - การวิเคราะห์และข้อเสนอการปรับปรุง

> **วันที่วิเคราะห์:** 3 กุมภาพันธ์ 2026
> **ชื่อระบบ:** ระบบจัดการอาคาร (Building Management System)
> **Tech Stack:** Express.js + AdminJS + Prisma + PostgreSQL + React

---

## สารบัญ

1. [ภาพรวมระบบ](#1-ภาพรวมระบบ)
2. [โครงสร้างโปรเจค](#2-โครงสร้างโปรเจค)
3. [Database Schema & Logic](#3-database-schema--logic)
4. [API Backend Flow](#4-api-backend-flow)
5. [Frontend AdminJS Flow](#5-frontend-adminjs-flow)
6. [จุดที่ควรปรับปรุง (Renovation Points)](#6-จุดที่ควรปรับปรุง-renovation-points)
7. [แผนการ Refactor](#7-แผนการ-refactor)
8. [สรุป Priority Matrix](#8-สรุป-priority-matrix)

---

## 1. ภาพรวมระบบ

### 1.1 วัตถุประสงค์ของระบบ
ระบบ Backoffice นี้ใช้สำหรับ **จัดการข้อมูลอาคารและที่ดิน** โดยมีฟีเจอร์หลัก:
- จัดการข้อมูลผู้ใช้งาน (User Management)
- จัดการเจ้าของกรรมสิทธิ์ (Owner Management)
- ควบคุมอาคาร (Building Control)
- พื้นที่เสี่ยงภัย (Risk Zone)
- ผังเมือง (Zoning Plan)
- โครงการแผนงาน (Plan Project / Approved Project)
- แผนการก่อสร้าง (Build Plan)
- ระบบแผนที่ GIS (Map with GeoJSON/KML)
- ระบบอัปโหลดไฟล์เอกสาร

### 1.2 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Express.js 4.21, Node.js 18 |
| **Admin Panel** | AdminJS 7.6 |
| **ORM** | Prisma 5.15 |
| **Database** | PostgreSQL |
| **Frontend** | React 19, Ant Design 5.27, Tailwind CSS |
| **Maps** | Leaflet, React-Leaflet |
| **Auth** | JWT + bcrypt + Session |
| **File Upload** | Multer |
| **i18n** | i18next (Thai/English) |

---

## 2. โครงสร้างโปรเจค

```
C:/backoffice/
├── index.js                 # Entry point - เริ่มต้น Express + AdminJS
├── config/                  # Configuration
│   ├── admin.js            # AdminJS setup, branding, bundler
│   ├── auth.js             # JWT, bcrypt, authentication logic
│   ├── database.js         # Prisma client initialization
│   ├── loder.js            # Component loader สำหรับ custom React components
│   ├── server.js           # Express middleware setup
│   └── swagger.js          # API documentation
│
├── routes/                  # API endpoints
│   ├── auth.js             # Login, logout, user management
│   ├── dashboard.js        # Summary statistics
│   ├── maps.js             # Map/GIS operations
│   ├── upload.js           # File upload
│   ├── uploadpicture.js    # Image upload
│   ├── location.js         # Province/Amphoe/District lookup
│   ├── address.js          # Address search
│   ├── forgotPassword.js   # Password reset flow
│   └── test-kml-import.js  # KML import testing
│
├── page/                    # AdminJS resource configurations
│   ├── index.js            # รวม resources ทั้งหมด
│   ├── user.js             # User resource options
│   ├── owner.js            # Owner resource options
│   ├── buildcontrol.js     # BuildingControl options
│   ├── fiscalyear.js       # FiscalYear options
│   ├── planproject.js      # PlanProject options
│   ├── approveproject.js   # ApprovedProject options
│   ├── zoningplan.js       # ZoningPlan options
│   ├── zoneRisk.js         # RiskZone options
│   ├── planbuild.js        # BuildPlan options
│   ├── uploads.js          # Uploads options
│   └── map.js              # Map options
│
├── src/components/          # Custom React components
│   ├── dashboard.jsx       # Dashboard หน้าแรก
│   ├── dashboard/          # Dashboard sub-components
│   ├── Map.jsx             # Map editor component
│   ├── map/                # Map-related components
│   ├── owner.jsx           # Owner display
│   ├── ownerui/            # Owner UI components
│   ├── featureUi/          # Reusable UI components
│   ├── Login.jsx           # Custom login
│   ├── ForgotPassword.jsx  # Forgot password
│   └── ResetPassword.jsx   # Reset password
│
├── prisma/
│   └── schema.prisma       # Database schema
│
├── middleware/
│   └── adminAuth.js        # AdminJS authentication middleware
│
├── utils/
│   └── permissions.js      # Permission utilities
│
├── public/                  # Static files
│   └── uploads/            # Uploaded files storage
│
└── locales/                 # i18n translations
    ├── th.json             # Thai
    └── en.json             # English
```

---

## 3. Database Schema & Logic

### 3.1 Entity Relationship Diagram (Text)

```
┌─────────────────┐     ┌─────────────────┐
│      User       │────<│      Owner      │
│  (ผู้ใช้งาน)     │     │ (เจ้าของกรรมสิทธิ์) │
└────────┬────────┘     └─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐     ┌─────────────────┐
│   PlanProject   │     │ ApprovedProject │
│  (โครงการแผน)   │     │  (โครงการอนุมัติ)  │
└─────────────────┘     └─────────────────┘
         │                      │
         └──────────┬───────────┘
                    │ 1:1
                    ▼
              ┌───────────┐
              │    Map    │◄────┬────┬────┬────┐
              │  (แผนที่)  │     │    │    │    │
              └───────────┘     │    │    │    │
                    ▲           │    │    │    │
         ┌──────────┴───────────┤    │    │    │
         │                      │    │    │    │
┌────────┴───────┐  ┌──────────┴┐  ┌┴────┴┐  ┌┴────────┐
│BuildingControl │  │ RiskZone  │  │Zoning│  │BuildPlan│
│  (ควบคุมอาคาร)  │  │ (พื้นที่เสี่ยง) │  │ Plan │  │(แผนก่อสร้าง)│
└────────────────┘  └───────────┘  └──────┘  └─────────┘
         │                │            │
         └────────────────┼────────────┘
                          │
                    ┌─────┴─────┐
                    │FiscalYear │
                    │ (ปีงบประมาณ) │
                    └───────────┘

        ┌───────────┐
        │  Uploads  │◄──── เชื่อมกับ BuildingControl,
        │  (ไฟล์)   │      RiskZone, ZoningPlan,
        └───────────┘      PlanProject, ApprovedProject
```

### 3.2 Models Detail

| Model | Fields หลัก | Relations |
|-------|------------|-----------|
| **User** | username, password, fullName, role, email | → Owner[], PlanProject[], ApprovedProject[], BuildPlan[] |
| **Owner** | title_owner, first_name, last_name, number_no (บัตรประชาชน), address info | → User |
| **FiscalYear** | year, detail | - |
| **BuildingControl** | building_type, use_purpose, license_number, status | → FiscalYear, Owner, Map, Uploads[] |
| **RiskZone** | zoneType, description, status | → FiscalYear, Owner, Map, Uploads[] |
| **ZoningPlan** | areaName, notes, status | → FiscalYear, Owner, Map, Uploads[] |
| **PlanProject** | code, name, category, budget, status | → FiscalYear, User, Map, Uploads[] |
| **ApprovedProject** | title_project, category, budget, status | → FiscalYear, User, Map, Uploads[] |
| **BuildPlan** | areabuild, notes | → User, Map |
| **Map** | latitude, longitude, geoJsonData, name_local, address | → เชื่อมกับ entities ข้างต้น (1:1) |
| **Uploads** | namefile, url, fileType, size, token | → Many-to-many กับหลาย entities |

### 3.3 Business Logic หลัก

1. **Owner Validation**: ตรวจสอบเลขบัตรประชาชน 13 หลัก ไม่ซ้ำ
2. **Fiscal Year Grouping**: ข้อมูลทุกอย่างจัดกลุ่มตามปีงบประมาณ
3. **Map Integration**: ทุก entity หลักมี Map เป็น 1:1 relation
4. **File Association**: Uploads เชื่อมแบบ many-to-many กับหลาย entities
5. **Role-based Access**: role = 1 (user), 2 (admin), 3 (superadmin)

---

## 4. API Backend Flow

### 4.1 Authentication Flow

```
┌─────────┐    POST /api/auth/login    ┌─────────┐
│ Client  │───────────────────────────►│ Server  │
│         │   { email, password }       │         │
└─────────┘                             └────┬────┘
                                             │
                                             ▼
                                    ┌────────────────┐
                                    │ authenticateUser│
                                    │ (bcrypt compare)│
                                    └────────┬───────┘
                                             │
                                             ▼
                                    ┌────────────────┐
                                    │  Generate JWT  │
                                    │    Token       │
                                    └────────┬───────┘
                                             │
                                             ▼
┌─────────┐    { token, user }       ┌─────────┐
│ Client  │◄─────────────────────────│ Server  │
│ (Store  │                          │         │
│  Token) │                          └─────────┘
└─────────┘
```

### 4.2 Main API Endpoints

```
/api/
├── /auth/
│   ├── POST /login              # เข้าสู่ระบบ
│   ├── POST /logout             # ออกจากระบบ
│   ├── GET  /me                 # ดึงข้อมูลผู้ใช้ปัจจุบัน
│   ├── POST /change-password    # เปลี่ยนรหัสผ่าน
│   ├── POST /forgot-password    # ขอรีเซ็ตรหัสผ่าน
│   ├── POST /reset-password     # รีเซ็ตรหัสผ่าน
│   ├── GET  /users              # รายการผู้ใช้ (Admin only)
│   └── CRUD /users/:id          # จัดการผู้ใช้
│
├── /dashboard/
│   ├── GET /summary             # สรุปจำนวนข้อมูลทั้งหมด
│   ├── GET /building-by-year    # อาคารแยกตามปีงบประมาณ
│   ├── GET /uploads-trend       # แนวโน้มการอัปโหลด (6 เดือน)
│   ├── GET /recent-buildings    # อาคารล่าสุด
│   └── GET /entity/:model       # ดึงข้อมูล entity แบบ dynamic
│
├── /maps/
│   ├── GET  /                   # ดึง maps ตาม year/province
│   ├── GET  /local              # ดึง maps ทั้งหมด หรือ search
│   └── GET  /building           # ดึง buildings ตาม year
│
├── /upload/
│   └── POST /upload             # อัปโหลดเอกสาร
│
├── /upload-image/
│   └── POST /                   # อัปโหลดรูปภาพ (5MB, JPEG/PNG/GIF/WEBP)
│
├── /location/
│   ├── GET /provinces           # รายการจังหวัด
│   ├── GET /amphoes/:code       # อำเภอตามจังหวัด
│   └── GET /districts/:code     # ตำบลตามอำเภอ
│
└── /import-kml/
    └── POST /upload             # นำเข้าไฟล์ KML
```

### 4.3 Data Flow Example (Building Control)

```
1. User สร้าง BuildingControl ใหม่ใน AdminJS
   │
   ▼
2. AdminJS ส่ง POST request ไปที่ Prisma
   │
   ▼
3. before hook: validate ข้อมูล, จัดการ relations
   │
   ▼
4. Prisma สร้าง record ใน PostgreSQL
   │
   ▼
5. after hook: สร้าง Map record ที่เชื่อมกัน (ถ้ามี coordinates)
   │
   ▼
6. Response กลับไป AdminJS พร้อม redirect
```

---

## 5. Frontend AdminJS Flow

### 5.1 Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    AdminJS Framework                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Sidebar    │  │   Content    │  │   Header     │  │
│  │  Navigation  │  │    Area      │  │   (Logo)     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                 Custom Components                        │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                  Dashboard                       │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐           │   │
│  │  │Filters  │ │Summary  │ │Upload   │           │   │
│  │  │         │ │Cards    │ │Chart    │           │   │
│  │  └─────────┘ └─────────┘ └─────────┘           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                  Map Components                  │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐           │   │
│  │  │Leaflet  │ │GeoJSON  │ │Markers  │           │   │
│  │  │Map      │ │Layers   │ │Popup    │           │   │
│  │  └─────────┘ └─────────┘ └─────────┘           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Feature UI Components              │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐           │   │
│  │  │Address  │ │Badge    │ │Upload   │           │   │
│  │  │Selector │ │Display  │ │Handler  │           │   │
│  │  └─────────┘ └─────────┘ └─────────┘           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Component Registration Flow

```javascript
// config/loder.js
ComponentLoader
    │
    ├─── addComponent('Dashboard', '../src/components/dashboard.jsx')
    ├─── addComponent('Map', '../src/components/Map.jsx')
    ├─── addComponent('OwnerShow', '../src/components/owner.jsx')
    ├─── addComponent('AddressSelect', '...address_provin.jsx')
    └─── addComponent2('Login', '...Login.jsx')  // Override
```

### 5.3 Resource Configuration Pattern

```javascript
// page/buildcontrol.js
const options_buildcontrol = {
  navigation: {
    name: 'ฝ่ายควบคุมอาคาร',
    icon: 'Home',
  },
  listProperties: ['building_type', 'status', 'fiscalYearId', 'owner_id'],
  properties: {
    fiscalYearId: {
      type: 'select',
      availableValues: await getFiscalYear(),
      components: { list: 'YearBadge', show: 'YearBadge' },
    },
    map: {
      components: { show: 'ShowMap', edit: 'Map' },
    },
  },
  actions: {
    new: { layout: [...] },
    edit: { layout: [...], before: [validateHook] },
  },
}
```

---

## 6. จุดที่ควรปรับปรุง (Renovation Points)

### 6.1 ปัญหาด้าน Code Quality

| ปัญหา | ไฟล์ที่เกี่ยวข้อง | ระดับความสำคัญ |
|-------|-----------------|---------------|
| **Typo ในชื่อไฟล์/ตัวแปร** | `config/loder.js` (ควรเป็น loader) | Medium |
| **ชื่อ field ไม่สอดคล้อง** | `palnbuildId` (ควรเป็น planBuildId) ใน schema.prisma | High |
| **Duplicate timestamp fields** | `createdAt` และ `created_at` ใน schema | Medium |
| **Commented code มากเกินไป** | index.js, dashboard.jsx | Low |
| **Hard-coded mock data** | dashboard.jsx (invoices array ไม่ได้ใช้) | Low |
| **Thai characters ใน action names** | `กลับรายการหลัก` ใน owner.js, user.js | Medium |

### 6.2 ปัญหาด้าน Architecture

| ปัญหา | รายละเอียด | ข้อเสนอ |
|-------|-----------|--------|
| **PrismaClient สร้างหลายที่** | สร้าง `new PrismaClient()` ใน routes แทนที่จะใช้ singleton | ใช้ `createPrismaClient()` จาก config/database.js |
| **API routes ไม่ consistent** | บาง route มี `/api/` prefix ซ้ำซ้อน ใน maps.js | ทำให้ route patterns สอดคล้องกัน |
| **Missing error handling** | บาง routes ไม่มี try-catch ครบ | เพิ่ม global error handler |
| **No input validation** | ไม่มี validation library เช่น Joi/Zod | เพิ่ม validation layer |
| **Mixed async patterns** | บางที่ใช้ `await` บางที่ใช้ `.then()` | ใช้ async/await ให้สอดคล้อง |

### 6.3 ปัญหาด้าน Security

| ปัญหา | รายละเอียด | ข้อเสนอ |
|-------|-----------|--------|
| **Secret keys ไม่ secure** | Default cookie secret = 'adminjs-secret-key' | ใช้ env variable ที่ secure |
| **Password policy อ่อน** | รหัสผ่านขั้นต่ำ 6 ตัวอักษร | เพิ่ม complexity requirements |
| **Missing rate limiting** | ไม่มี rate limit สำหรับ login/API | เพิ่ม express-rate-limit |
| **CORS ไม่ได้กำหนด** | ไม่เห็น CORS configuration | กำหนด CORS policy |
| **SQL Injection risk** | บาง query ใช้ `String()` แปลง input | ใช้ parameterized queries ตลอด |

### 6.4 ปัญหาด้าน UX/UI

| ปัญหา | รายละเอียด | ข้อเสนอ |
|-------|-----------|--------|
| **Dashboard ไม่ดึงข้อมูลจริง** | `handleRefresh()` เป็น TODO | เชื่อมต่อกับ dashboard API |
| **Mock data ใน Dashboard** | invoices array เป็น hardcoded | ลบหรือเชื่อมกับ real data |
| **Map ซ่อนจาก UI** | Map resource ถูกซ่อนใน page/index.js | พิจารณาว่าต้องการหรือไม่ |
| **Address cascade ไม่ smooth** | Province → Amphoe → District ต้อง reload | ใช้ dependent dropdowns |
| **Loading states ไม่ชัด** | ไม่มี loading indicator ขณะ fetch | เพิ่ม loading states |

### 6.5 ปัญหาด้าน Performance

| ปัญหา | รายละเอียด | ข้อเสนอ |
|-------|-----------|--------|
| **N+1 Query Problem** | maps.js: loop query fiscalYear ทีละ record | ใช้ batch query หรือ include |
| **Cache ถูกปิด** | Cache headers ถูก comment out | พิจารณาเปิด caching strategy |
| **Bundle size ใหญ่** | Component loader โหลดทุกอย่าง | ใช้ lazy loading |
| **No pagination** | บาง endpoints ไม่มี limit/offset | เพิ่ม pagination |

---

## 7. แผนการ Refactor

### Phase 1: Quick Wins (1-2 วัน)

```
□ แก้ typo: loder.js → loader.js
□ แก้ palnbuildId → planBuildId ใน schema
□ ลบ duplicate timestamp fields
□ ลบ commented code ที่ไม่ใช้
□ ลบ mock data ใน dashboard.jsx
□ แก้ Thai characters ใน action names
```

### Phase 2: Code Quality (3-5 วัน)

```
□ สร้าง PrismaClient singleton ที่เดียว
□ เพิ่ม global error handler
□ ทำ API routes ให้ consistent
□ เพิ่ม input validation ด้วย Zod
□ ใช้ async/await pattern ให้สอดคล้อง
```

### Phase 3: Security Hardening (2-3 วัน)

```
□ ย้าย secrets ไป environment variables
□ เพิ่ม password complexity requirements
□ เพิ่ม rate limiting
□ กำหนด CORS policy
□ Review และแก้ potential SQL injection
```

### Phase 4: UX Improvements (5-7 วัน)

```
□ เชื่อม Dashboard กับ API จริง
□ เพิ่ม loading states ทั่วทั้งระบบ
□ ปรับปรุง Address cascade UX
□ เพิ่ม error messages ที่ user-friendly
□ เพิ่ม success/error notifications
```

### Phase 5: Performance Optimization (3-5 วัน)

```
□ แก้ N+1 query problems
□ เพิ่ม caching strategy
□ Implement lazy loading components
□ เพิ่ม pagination ให้ทุก list endpoints
□ Optimize database indexes
```

---

## 8. สรุป Priority Matrix

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| **P0 - Critical** | แก้ typo ใน schema (palnbuildId) | High | Low |
| **P0 - Critical** | แก้ security secrets | High | Low |
| **P1 - High** | เพิ่ม input validation | High | Medium |
| **P1 - High** | แก้ N+1 query problems | High | Medium |
| **P1 - High** | เพิ่ม rate limiting | High | Low |
| **P2 - Medium** | Refactor PrismaClient singleton | Medium | Low |
| **P2 - Medium** | เชื่อม Dashboard กับ API จริง | Medium | Medium |
| **P2 - Medium** | เพิ่ม loading states | Medium | Medium |
| **P3 - Low** | ลบ commented code | Low | Low |
| **P3 - Low** | แก้ Thai characters ใน action names | Low | Low |

---

## Appendix A: File References

### Core Files
- Entry: `index.js:1-267`
- Resources: `page/index.js:1-110`
- Schema: `prisma/schema.prisma:1-236`
- Loader: `config/loder.js:1-190`

### API Routes
- Auth: `routes/auth.js:1-530`
- Dashboard: `routes/dashboard.js:1-167`
- Maps: `routes/maps.js:1-286`

### Components
- Dashboard: `src/components/dashboard.jsx:1-137`
- Owner: `page/owner.js:1-256`
- User: `page/user.js:1-180`
- BuildControl: `page/buildcontrol.js:1-89`

---

*เอกสารนี้สร้างโดย Claude Code Analysis*
