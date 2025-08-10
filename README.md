# Express.js Application with AdminJS

แอปพลิเคชัน Express.js ที่ใช้ AdminJS สำหรับจัดการข้อมูล พร้อมระบบอัปโหลดไฟล์

## 📁 โครงสร้างโปรเจค

```
├── index.js                 # ไฟล์หลัก - จัดการการเริ่มต้นแอปพลิเคชัน
├── config/                  # โฟลเดอร์สำหรับการตั้งค่าต่างๆ
│   ├── admin.js            # ตั้งค่า AdminJS dashboard
│   ├── database.js         # ตั้งค่า Prisma client
│   └── server.js           # ตั้งค่า Express server
├── routes/                  # โฟลเดอร์สำหรับ API routes
│   └── api.js              # API endpoints
├── utils/                   # โฟลเดอร์สำหรับ utilities
│   ├── loder.js            # Component loader
│   └── setadmin.js         # AdminJS settings
├── public/                  # ไฟล์ static
│   └── uploads/            # ไฟล์ที่อัปโหลด
└── prisma/                 # Database schema และ migrations
```

## 🚀 การเริ่มต้นใช้งาน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables
สร้างไฟล์ `.env` และกำหนดค่าต่างๆ:
```env
DATABASE_URL="your_database_url"
PORT=3001
```

### 3. รัน Database Migrations
```bash
npx prisma migrate dev
```

### 4. เริ่มต้นเซิร์ฟเวอร์
```bash
npm start
```

## 📊 Features

### API Endpoints
- `GET /api/users` - ดึงข้อมูลผู้ใช้ทั้งหมด
- `POST /api/users` - สร้างผู้ใช้ใหม่

### AdminJS Dashboard
- จัดการข้อมูลผู้ใช้
- จัดการปีงบประมาณ
- จัดการประเภทโครงการ
- จัดการโครงการก่อสร้าง (พร้อมอัปโหลดไฟล์)
- จัดการอาคารควบคุม
- จัดการงานระวังภัย
- จัดการผังเมือง
- จัดการไฟล์แนบ

### File Upload
- รองรับไฟล์ PDF, PNG, JPEG
- จัดเก็บไฟล์ใน local storage
- ระบบ validation สำหรับไฟล์

## 🔧 การปรับปรุงโครงสร้าง

โค้ดถูกแยกออกเป็นหลายไฟล์เพื่อให้:

1. **อ่านง่ายขึ้น** - แต่ละไฟล์มีหน้าที่เฉพาะ
2. **บำรุงรักษาง่าย** - แก้ไขส่วนใดส่วนหนึ่งโดยไม่กระทบส่วนอื่น
3. **ทดสอบง่าย** - แยกส่วนต่างๆ เพื่อการทดสอบ
4. **ขยายได้ง่าย** - เพิ่มฟีเจอร์ใหม่ได้ง่าย

### ไฟล์ที่แยกออก:

#### `config/admin.js`
- ตั้งค่า AdminJS dashboard
- จัดการ resources ต่างๆ
- ตั้งค่าการอัปโหลดไฟล์

#### `config/database.js`
- ตั้งค่า Prisma client
- จัดการการเชื่อมต่อ database
- ฟังก์ชันสำหรับปิดการเชื่อมต่อ

#### `config/server.js`
- ตั้งค่า Express app
- จัดการ middleware
- ตั้งค่า static files

#### `routes/api.js`
- API endpoints ต่างๆ
- จัดการ request/response

#### `index.js` (ไฟล์หลัก)
- จัดการการเริ่มต้นแอปพลิเคชัน
- เชื่อมต่อส่วนต่างๆ เข้าด้วยกัน
- จัดการ graceful shutdown

## 🛠️ การพัฒนา

### เพิ่ม API Route ใหม่
1. สร้างไฟล์ใหม่ใน `routes/`
2. Import ใน `index.js`
3. ใช้ `app.use()` เพื่อเพิ่ม route

### เพิ่ม AdminJS Resource ใหม่
1. แก้ไข `config/admin.js`
2. เพิ่ม resource ใน `createAdminResources()`

### เพิ่ม Middleware ใหม่
1. แก้ไข `config/server.js`
2. เพิ่ม middleware ใน `createExpressApp()`

## 📝 Notes

- ใช้ ES modules (import/export)
- รองรับภาษาไทยและอังกฤษ
- มีระบบ error handling
- รองรับ graceful shutdown 