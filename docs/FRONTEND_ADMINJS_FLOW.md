# Frontend AdminJS Flow Documentation

## Overview

ระบบ Frontend ใช้ **AdminJS** เป็น admin panel framework พร้อมกับ **React** components แบบ custom

---

## 1. AdminJS Initialization Flow

```
config/admin.js
       │
       ▼
┌─────────────────────────────────────┐
│ createAdminJS(prisma)               │
│                                     │
│ AdminJS({                           │
│   databases: [],                    │
│   rootPath: '/admin',               │
│   loginPath: '/admin/login',        │
│   logoutPath: '/admin/logout',      │
│   dashboard: {                      │
│     component: Dashboard            │  ← Custom component
│   },                                │
│   locale: { ... },                  │
│   branding: {                       │
│     companyName: 'ระบบจัดการอาคาร',  │
│     logo: '/public/logo.png',       │
│   },                                │
│   resources: createAdminResources() │  ← From page/index.js
│ })                                  │
└─────────────────────────────────────┘
```

---

## 2. Component Loader Architecture

```
config/loder.js
       │
       ├─── ComponentLoader (AdminJS)
       │         │
       │         ├─── bundler: webpack
       │         │    ├─── optimization.splitChunks
       │         │    └─── cache (filesystem in prod)
       │         │
       │         └─── addComponent(id, path)
       │
       ▼
┌─────────────────────────────────────────────────────┐
│              Registered Components                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Dashboard Components:                              │
│  ├── Dashboard                                      │
│  │   └── src/components/dashboard.jsx              │
│  │       ├── Filters.jsx                           │
│  │       ├── LocationMarkerCard.jsx                │
│  │       ├── SummaryOwnersCard.jsx                 │
│  │       ├── SummaryUsersCard.jsx                  │
│  │       └── UploadReportCard.jsx                  │
│                                                     │
│  Map Components:                                    │
│  ├── Map          → src/components/Map.jsx         │
│  ├── ShowMap      → src/components/map/show_map.jsx│
│  ├── MapRiskZone  → src/components/mapRiskZone.jsx │
│  ├── MapZoningPlan→ src/components/mapZoningPlan.jsx│
│  └── MapPlanBuild → src/components/mapPlanBuild.jsx│
│                                                     │
│  Owner Components:                                  │
│  ├── OwnerShow    → src/components/owner.jsx       │
│  ├── RadioOwner   → ownerui/radioOwner.jsx         │
│  └── OwnerTitleCell → featureUi/sideCellowner.jsx  │
│                                                     │
│  Address Components:                                │
│  ├── AddressSelect → featureUi/addresse/address_provin.jsx │
│  ├── AddressAmphoe → featureUi/addresse/address_amp.jsx    │
│  └── AddressTumbon → featureUi/addresse/address_tumbon.jsx │
│                                                     │
│  Auth Components (Override):                        │
│  ├── Login         → src/components/Login.jsx      │
│  ├── ForgotPassword→ src/components/ForgotPassword.jsx │
│  └── ResetPassword → src/components/ResetPassword.jsx  │
│                                                     │
│  Feature UI Components:                             │
│  ├── FullNameBadge → featureUi/badge/fullNameBadge.jsx │
│  ├── YearBadge     → featureUi/badge/yearBadge.jsx │
│  ├── UploadFile    → featureUi/uploadfile/upLoadfile.jsx │
│  └── Showupload    → featureUi/uploadfile/Showupload.jsx │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 3. Resource Configuration Pattern

### 3.1 Resource Structure

```javascript
// page/index.js - createAdminResources(prisma)

[
  // User Resource
  {
    resource: { model: getModelByName('User'), client: prisma },
    options: options_user,      // ← from page/user.js
  },

  // Owner Resource
  {
    resource: { model: getModelByName('Owner'), client: prisma },
    options: options_owner,     // ← from page/owner.js
  },

  // BuildingControl Resource
  {
    resource: { model: getModelByName('BuildingControl'), client: prisma },
    options: options_buildcontrol,  // ← from page/buildcontrol.js
  },

  // Hidden Resources (API only)
  {
    resource: { model: getModelByName('districts'), client: prisma },
    options: {
      navigation: false,
      actions: { list: { isVisible: false }, ... }
    }
  },

  // ... more resources
]
```

### 3.2 Resource Options Pattern

```javascript
// page/buildcontrol.js

const options_buildcontrol = {
  // ===== Navigation =====
  navigation: {
    name: 'ฝ่ายควบคุมอาคาร',    // Group name in sidebar
    icon: 'Home',              // Lucide icon name
  },

  // ===== List View =====
  listProperties: [
    'building_type',
    'use_purpose',
    'license_number',
    'status',
    'fiscalYearId',
    'owner_id',
  ],

  // ===== Properties Config =====
  properties: {
    // Text field
    building_type: {
      type: 'string',
      isVisible: { list: true, show: true, edit: true, filter: true },
    },

    // Select field with values
    use_purpose: {
      type: 'string',
      availableValues: [
        { value: "1", label: "การขออนุญาตตาม พ.ร.บ..." },
        { value: "2", label: "อาคารประเภทควบคุมการใช้" },
        // ...
      ],
    },

    // Select field with dynamic values
    fiscalYearId: {
      type: 'select',
      availableValues: await getFiscalYear(),  // From helpers
      components: {
        list: 'YearBadge',    // Custom component for list view
        show: 'YearBadge',    // Custom component for show view
      },
    },

    // Custom component field
    map: {
      isVisible: { list: false, show: true, edit: true, filter: false },
      components: {
        show: 'ShowMap',      // Map display component
        edit: 'Map',          // Map editor component
      },
    },
  },

  // ===== Actions Config =====
  actions: actions_buildcontrol,  // From actions.js
}
```

---

## 4. Custom Component Flow

### 4.1 Dashboard Component

```
Dashboard.jsx
     │
     ├─── State Management (useState)
     │    ├── owner (selected owner filter)
     │    └── user (selected user filter)
     │
     ├─── UI Components
     │    │
     │    ├── Header Box
     │    │   ├── H2: "แดชบอร์ด"
     │    │   └── Filters Component
     │    │       ├── Owner Dropdown
     │    │       └── User Dropdown
     │    │
     │    ├── Summary Cards Grid (3 columns)
     │    │   ├── LocationMarkerCard
     │    │   │   └── Map locations count
     │    │   ├── SummaryOwnersCard
     │    │   │   └── Owners statistics
     │    │   └── SummaryUsersCard
     │    │       └── Users statistics
     │    │
     │    └── Upload Report Section
     │        └── UploadReportCard
     │            └── Line chart (6 months trend)
     │
     └─── Refresh Handler (TODO: connect to API)
```

### 4.2 Map Component Flow

```
Map.jsx (Edit mode)
     │
     ├─── Props from AdminJS
     │    ├── record: current record data
     │    ├── property: field configuration
     │    └── onChange: callback to update value
     │
     ├─── State
     │    ├── coordinates: { lat, lng }
     │    ├── address: string
     │    └── geoJsonData: object
     │
     ├─── Leaflet Map Integration
     │    ├── TileLayer (OpenStreetMap)
     │    ├── Marker (draggable)
     │    ├── GeoJSON layer (if polygon data)
     │    └── Draw controls (optional)
     │
     └─── Event Handlers
          ├── onMapClick: set coordinates
          ├── onMarkerDrag: update coordinates
          └── onGeoJsonChange: update polygon
```

### 4.3 Address Cascade Component Flow

```
Province Selection (AddressSelect)
          │
          ├─── Fetch: GET /api/location/provinces
          │
          ├─── On Select:
          │    ├── Update record.params.province
          │    └── Trigger Amphoe reload
          │
          ▼
Amphoe Selection (AddressAmphoe)
          │
          ├─── Fetch: GET /api/location/amphoes/:provinceCode
          │
          ├─── On Select:
          │    ├── Update record.params.district
          │    └── Trigger District reload
          │
          ▼
District Selection (AddressTumbon)
          │
          ├─── Fetch: GET /api/location/districts/:amphoeCode
          │
          └─── On Select:
               ├── Update record.params.subdistrict
               └── Auto-fill postcode
```

---

## 5. Action Flow

### 5.1 Create (New) Action

```
User clicks "สร้างใหม่" button
          │
          ▼
┌─────────────────────────────────┐
│ AdminJS renders New form        │
│ with layout configuration       │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ User fills form                 │
│ - Custom components render      │
│ - onChange updates record       │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ before hooks execute            │
│ - validateCitizenId (Owner)     │
│ - custom validation             │
└─────────────────────────────────┘
          │
          ├─── Validation fails → Show errors
          │
          ▼ (if valid)
┌─────────────────────────────────┐
│ Prisma creates record           │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ after hooks execute             │
│ - Create related Map record     │
│ - Transform response            │
└─────────────────────────────────┘
          │
          ▼
Redirect to list or show view
```

### 5.2 Edit Action

```
User clicks "แก้ไข" button
          │
          ▼
┌─────────────────────────────────┐
│ AdminJS fetches record          │
│ from database                   │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ Render edit form with           │
│ current values populated        │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ User modifies fields            │
│ Custom components handle        │
│ complex inputs (Map, Address)   │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ before hooks validate           │
│ - Check unique constraints      │
│ - Validate business rules       │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ Prisma updates record           │
│ - updated_at auto-updates       │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ after hooks transform           │
│ response data                   │
└─────────────────────────────────┘
```

### 5.3 List Action with After Hook

```
User navigates to resource list
          │
          ▼
┌─────────────────────────────────┐
│ Prisma fetches records          │
│ with pagination                 │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ after hook: joinString          │
│ (Owner resource)                │
│                                 │
│ - Fetch FiscalYear names        │
│ - Join Owner full names         │
│ - Add computed fields           │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ Render list with:               │
│ - Custom column components      │
│ - YearBadge, FullNameBadge      │
│ - Pagination controls           │
└─────────────────────────────────┘
```

---

## 6. Layout Configuration

### 6.1 Form Layout Pattern

```javascript
// page/user.js - new action layout

layout: [
  // Main container (full width)
  [{ width: 3/3, mx: 'auto' }, [

    // Section header
    ['@H3', { children: 'ข้อมูลบัญชี' }],

    // Row with multiple fields
    [{ flexDirection: 'row', flex: true }, [
      ['username', { flexGrow: 1, pr: 'default' }],
      ['password', { flexGrow: 1 }],
    ]],

    // Another section
    ['@H3', { children: 'ข้อมูลเจ้าหน้าที่' }],

    // Row with fixed widths
    [{ flexDirection: 'row', flex: true }, [
      ['title_use', { width: '20%', pr: 'default' }],
      ['fullName', { width: '40%', pr: 'default' }],
      ['position', { width: '40%' }],
    ]],

    // Single field (full width)
    'role',
  ]],
]
```

### 6.2 Layout Visual

```
┌─────────────────────────────────────────────────────┐
│ ข้อมูลบัญชี                                          │
├─────────────────────────┬───────────────────────────┤
│ username                │ password                  │
├─────────────────────────┴───────────────────────────┤
│ ข้อมูลเจ้าหน้าที่                                     │
├───────┬─────────────────┬───────────────────────────┤
│title  │ fullName        │ position                  │
│ (20%) │ (40%)           │ (40%)                     │
├───────┼─────────────────┼───────────────────────────┤
│ email │ phone           │ address                   │
├───────┴─────────────────┴───────────────────────────┤
│ สิทธิ์ผู้ใช้งาน                                        │
├─────────────────────────────────────────────────────┤
│ role                                                │
└─────────────────────────────────────────────────────┘
```

---

## 7. Navigation Structure

```
AdminJS Sidebar
     │
     ├── 📊 Dashboard
     │
     ├── 👤 เจ้าของกรรมสิทธิ์
     │   └── Owner (CRUD)
     │
     ├── 🏠 ฝ่ายควบคุมอาคาร
     │   └── BuildingControl (CRUD + Map)
     │
     ├── ⚠️ Risk Zone
     │   └── RiskZone (CRUD + Map)
     │
     ├── 🗺️ Zoning Plan
     │   └── ZoningPlan (CRUD + Map)
     │
     ├── 📋 Plan Project
     │   └── PlanProject (CRUD + Map)
     │
     ├── ✅ Approved Project
     │   └── ApprovedProject (CRUD + Map)
     │
     ├── 🏗️ Build Plan
     │   └── BuildPlan (CRUD + Map)
     │
     ├── 📁 Uploads
     │   └── Uploads (List, Download)
     │
     └── ⚙️ ตั้งค่าระบบ
         ├── User (CRUD)
         └── FiscalYear (CRUD)

Hidden Resources (API only):
     ├── districts
     └── Map
```

---

## 8. State Management

### 8.1 AdminJS Built-in State

```
┌─────────────────────────────────────────────────────┐
│                 AdminJS State                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  currentAdmin: {                                    │
│    email: "admin@example.com",                      │
│    role: "admin",                                   │
│    id: 1                                            │
│  }                                                  │
│                                                     │
│  resources: [                                       │
│    { id: "User", ... },                            │
│    { id: "Owner", ... },                           │
│    ...                                              │
│  ]                                                  │
│                                                     │
│  paths: {                                           │
│    loginPath: "/admin/login",                       │
│    rootPath: "/admin",                              │
│    ...                                              │
│  }                                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 8.2 Component Local State

```javascript
// Dashboard.jsx - Local state with useState

const Dashboard = () => {
  const [owner, setOwner] = useState(OWNERS[0])
  const [user, setUser] = useState(USERS[0])

  // Filters update local state
  // Cards receive state as props
}
```

### 8.3 Zustand (Available but not widely used)

```javascript
// Could be used for shared state across components
import { create } from 'zustand'

const useMapStore = create((set) => ({
  selectedLocation: null,
  setSelectedLocation: (loc) => set({ selectedLocation: loc }),
}))
```

---

## 9. Styling Approach

### 9.1 AdminJS Design System

```jsx
import { Box, H2, Button, Badge } from '@adminjs/design-system'

// Usage
<Box bg="white" p="lg" borderRadius="lg" boxShadow="card">
  <H2 color="primary100">Title</H2>
  <Badge variant="success">Active</Badge>
</Box>
```

### 9.2 Ant Design Integration

```jsx
import { Button, Flex, Card } from 'antd'

// Mixed with AdminJS
<Flex gap="small" wrap>
  <Button type="primary">Primary Button</Button>
  <Button>Default Button</Button>
</Flex>
```

### 9.3 Tailwind CSS (Available)

```jsx
// Can be used in custom components
<div className="bg-white p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800">Title</h2>
</div>
```

---

## 10. Known Issues & TODOs

### 10.1 Dashboard Issues

```javascript
// dashboard.jsx:57-59
const handleRefresh = () => {
  // TODO: refresh from API
}

// Issue: Dashboard ไม่ได้เชื่อมกับ API จริง
// invoices array เป็น mock data ที่ไม่ได้ใช้
```

### 10.2 Component Registration Issues

```javascript
// config/loder.js
// File name typo: loder.js → loader.js

// Some components commented out:
// TestMap, ViewKml, DataDisplay, MapField
```

### 10.3 Action Name Issues

```javascript
// page/owner.js:181
กลับรายการหลัก: backButton,

// page/user.js:172
กลับหน้ารายการหลัก: backButton,

// Issue: Thai characters in object keys
// Should use: backToList: backButton
```

---

*สร้างโดย Claude Code Analysis*
