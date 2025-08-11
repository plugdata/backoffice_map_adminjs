# 🚀 Global AdminJS System - ระบบการส่งเอกสาร

แอปพลิเคชัน Express.js ที่ใช้ AdminJS สำหรับระบบการส่งเอกสารและการอนุมัติ พร้อมระบบอัปโหลดไฟล์และการจัดการผู้ใช้

## 📁 โครงสร้างโปรเจค

```
├── index.js                 # ไฟล์หลัก - จัดการการเริ่มต้นแอปพลิเคชัน
├── config/                  # โฟลเดอร์สำหรับการตั้งค่าต่างๆ
│   ├── admin.js            # ตั้งค่า AdminJS dashboard
│   ├── auth.js             # ตั้งค่าระบบ authentication
│   ├── database.js         # ตั้งค่า Prisma client
│   └── server.js           # ตั้งค่า Express server
├── routes/                  # โฟลเดอร์สำหรับ API routes
│   ├── api.js              # API endpoints หลัก
│   ├── auth.js             # Authentication routes
│   └── documents.js        # Document management routes
├── page/                    # AdminJS resources
│   ├── adminResources.js   # Resource configurations
│   ├── userResource.js     # User resource
│   └── ...                 # อื่นๆ
├── utils/                   # โฟลเดอร์สำหรับ utilities
│   ├── loder.js            # Component loader
│   └── setadmin.js         # AdminJS settings
├── public/                  # ไฟล์ static
│   └── uploads/            # ไฟล์ที่อัปโหลด
├── prisma/                 # Database schema และ migrations
│   ├── schema.prisma       # Database schema
│   └── seed.js             # Seed data
└── www/                    # Frontend files
```

## 🚀 การเริ่มต้นใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` และกำหนดค่าต่างๆ:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/global_adminjs_db"

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (for authentication)
JWT_SECRET=your-super-secret-jwt-key-here

# Session Secret
SESSION_SECRET=your-session-secret-here
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. รัน Database Migrations

```bash
npm run db:migrate
```

### 5. Seed ข้อมูลเริ่มต้น

```bash
npm run db:seed
```

### 6. เริ่มต้น Development Server

```bash
npm run dev
```

## 📊 Features

### 🔐 Authentication System
- **JWT Token Authentication**: ระบบยืนยันตัวตนด้วย JWT
- **Password Hashing**: เข้ารหัสรหัสผ่านด้วย bcryptjs
- **Role-based Access Control**: ระบบสิทธิ์ตามบทบาท
- **Session Management**: จัดการเซสชันผู้ใช้

### 👥 User Management
- **User Registration**: ลงทะเบียนผู้ใช้ใหม่
- **User Login**: เข้าสู่ระบบ
- **Role Assignment**: กำหนดบทบาทให้ผู้ใช้
- **Password Management**: เปลี่ยนรหัสผ่าน
- **Department Assignment**: กำหนดแผนกให้ผู้ใช้

### 📝 Document Management System
- **Document Submission**: ส่งเอกสารใหม่
- **Document Types**: ประเภทเอกสาร (ใบขออนุมัติซื้อ, ใบเบิกวัสดุ, ใบลา, ใบเสนอโครงการ)
- **Confidentiality Levels**: ระดับความลับ (ปกติ, ลับ, ลับมาก)
- **Department Management**: จัดการแผนก
- **Document History**: ประวัติการดำเนินการ
- **File Upload**: อัปโหลดไฟล์แนบ (PDF, DOC, DOCX, PNG, JPEG)

### 🔄 Document Approval Workflow
```
ผู้ส่ง (Employee) → HR → CEO → HR → ผู้ส่ง
```

**ขั้นตอนการทำงาน:**
1. **ผู้ส่ง**: สร้างและส่งเอกสาร → สถานะ "รอตรวจสอบ HR"
2. **HR**: ตรวจสอบเอกสาร
   - ผ่าน → ส่งต่อ CEO → สถานะ "รออนุมัติ CEO"
   - ไม่ผ่าน → ส่งกลับผู้ส่ง → สถานะ "ไม่อนุมัติ (HR)"
3. **CEO**: ตรวจสอบขั้นสุดท้าย
   - ผ่าน → สถานะ "อนุมัติแล้ว"
   - ไม่ผ่าน → สถานะ "ไม่อนุมัติ (CEO)"
4. **HR**: บันทึกผลและแจ้งผู้ส่ง

### 🔔 Notification System
- **Real-time Notifications**: การแจ้งเตือนแบบเรียลไทม์
- **Document Status Updates**: แจ้งเตือนเมื่อสถานะเอกสารเปลี่ยน
- **System Messages**: ข้อความระบบ
- **Email Notifications**: การแจ้งเตือนทางอีเมล (พร้อมใช้งาน)

### 🎛️ AdminJS Dashboard
- **User Management**: จัดการผู้ใช้
- **Role Management**: จัดการบทบาทและสิทธิ์
- **Department Management**: จัดการแผนก
- **Document Type Management**: จัดการประเภทเอกสาร
- **Confidentiality Level Management**: จัดการระดับความลับ
- **Document Management**: จัดการเอกสาร
- **Document History**: ดูประวัติการดำเนินการ
- **File Upload**: อัปโหลดไฟล์
- **Notification Center**: ศูนย์แจ้งเตือน

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - เข้าสู่ระบบ
- `POST /api/auth/register` - ลงทะเบียน
- `GET /api/auth/me` - ข้อมูลผู้ใช้ปัจจุบัน
- `POST /api/auth/logout` - ออกจากระบบ
- `POST /api/auth/change-password` - เปลี่ยนรหัสผ่าน

### Documents
- `GET /api/documents` - ดึงข้อมูลเอกสารทั้งหมด
- `GET /api/documents/:id` - ดึงข้อมูลเอกสารตาม ID
- `POST /api/documents` - สร้างเอกสารใหม่
- `PATCH /api/documents/:id/status` - อัปเดตสถานะเอกสาร
- `GET /api/documents/types/list` - รายการประเภทเอกสาร
- `GET /api/documents/confidentiality-levels/list` - รายการระดับความลับ
- `GET /api/documents/departments/list` - รายการแผนก

### Users
- `GET /api/users` - ดึงข้อมูลผู้ใช้ทั้งหมด
- `GET /api/users/:id` - ดึงข้อมูลผู้ใช้ตาม ID

### Roles
- `GET /api/roles` - ดึงข้อมูลบทบาททั้งหมด

### Notifications
- `GET /api/notifications` - ดึงข้อมูลการแจ้งเตือน

### Health Check
- `GET /api/health` - ตรวจสอบสถานะ API

## 👤 Default Users

หลังจากรัน seed script คุณจะได้ผู้ใช้เริ่มต้น:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| ceo@example.com | password123 | ceo | CEO / Super Admin |
| hr@example.com | password123 | admin | HR Manager |
| it@example.com | password123 | manager | IT Manager |
| user@example.com | password123 | user | Regular Employee |

## 🔧 การพัฒนา

### เพิ่ม API Route ใหม่

1. สร้างไฟล์ใหม่ใน `routes/`
2. Import ใน `routes/api.js`
3. ใช้ `router.use()` เพื่อเพิ่ม route

### เพิ่ม AdminJS Resource ใหม่

1. แก้ไข `page/adminResources.js`
2. เพิ่ม resource ใน `createAdminResources()`

### เพิ่ม Middleware ใหม่

1. แก้ไข `config/server.js`
2. เพิ่ม middleware ใน `createExpressApp()`

## 🛠️ Scripts

```bash
# Development
npm run dev              # เริ่มต้น development server
npm start               # เริ่มต้น production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with initial data
npm run db:reset        # Reset database (careful!)
npm run db:studio       # Open Prisma Studio

# Prisma
npm run prisma          # Run Prisma CLI
```

## 📱 User Interface

### Login Page
```
┌─────────────────────────┐
│     🔐 Login Form       │
├─────────────────────────┤
│ Email: [____________]    │
│ Password: [_________]   │
│ [Login Button]          │
└─────────────────────────┘
```

### Admin Dashboard
```
┌─────────────────────────────────────────┐
│ 🎛️ Admin Dashboard                      │
├─────────────────────────────────────────┤
│ 👥 ผู้ใช้และสิทธิ์  📝 เอกสาร  🏢 องค์กร  │
│ 🔔 การแจ้งเตือน  📊 รายงาน  ⚙️ ตั้งค่า   │
└─────────────────────────────────────────┘
```

### Document Management
```
┌─────────────────────────────────────────┐
│ 📝 Document Management                  │
├─────────────────────────────────────────┤
│ [Create New] [Upload File] [Search]     │
│ ┌─────────────────────────────────────┐ │
│ │ Document List                       │ │
│ │ - DOC-2024-001 [Edit] [Delete]      │ │
│ │ - DOC-2024-002 [Edit] [Delete]      │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## 🔧 Technical Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL + Prisma
- **Admin Panel**: AdminJS
- **Authentication**: JWT + bcryptjs
- **File Upload**: @adminjs/upload

### Frontend
- **Admin UI**: AdminJS React Components
- **Date Picker**: React DatePicker
- **Styling**: AdminJS Themes

### Security
- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- File upload validation
- SQL injection prevention (Prisma)

## 🚨 Error Handling

### User-friendly Errors
- Form validation errors
- File upload errors
- Authentication errors
- Database connection errors

### Logging
- Request logging
- Error logging
- Performance monitoring
- Security audit trail

## 🔮 Future Enhancements

### Planned Features
- Real-time notifications (WebSocket)
- Advanced search and filtering
- Bulk operations
- Export functionality
- Mobile responsive design
- Multi-language support
- API documentation
- Unit testing
- CI/CD pipeline
- Email notifications
- Document templates
- Digital signatures
- Workflow customization

## 📝 Notes

- ใช้ ES modules (import/export)
- รองรับภาษาไทยและอังกฤษ
- มีระบบ error handling
- รองรับ graceful shutdown
- ระบบ role-based access control
- File upload with validation
- Document approval workflow
- Notification system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**📝 Note**: ระบบนี้ถูกออกแบบให้ขยายได้ง่ายและรองรับการใช้งานในองค์กรขนาดใหญ่ พร้อมระบบการส่งเอกสารและการอนุมัติที่ครบครัน
