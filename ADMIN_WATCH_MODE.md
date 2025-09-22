# AdminJS Watch Mode Configuration

## การตั้งค่า Watch Mode

### Environment Variables

คุณสามารถควบคุม AdminJS watch mode ได้ผ่าน environment variables:

```bash
# เปิด watch mode เสมอ
ADMIN_WATCH_MODE=true

# ปิด watch mode เสมอ
ADMIN_WATCH_MODE=false

# ไม่ตั้งค่า (default behavior)
# - development mode: เปิด watch mode
# - production mode: ปิด watch mode
```

### การทำงาน

1. **Development Mode (NODE_ENV !== 'production')**
   - ถ้า `ADMIN_WATCH_MODE=true` → เปิด watch mode
   - ถ้า `ADMIN_WATCH_MODE=false` → ปิด watch mode
   - ถ้าไม่ตั้งค่า → เปิด watch mode (default)

2. **Production Mode (NODE_ENV === 'production')**
   - ถ้า `ADMIN_WATCH_MODE=true` → เปิด watch mode
   - ถ้า `ADMIN_WATCH_MODE=false` → ปิด watch mode
   - ถ้าไม่ตั้งค่า → ปิด watch mode (default)

### ตัวอย่างการใช้งาน

```bash
# Development mode พร้อม watch
NODE_ENV=development ADMIN_WATCH_MODE=true npm start

# Development mode โดยไม่ใช้ watch
NODE_ENV=development ADMIN_WATCH_MODE=false npm start

# Production mode พร้อม watch (ไม่แนะนำ)
NODE_ENV=production ADMIN_WATCH_MODE=true npm start

# Production mode โดยไม่ใช้ watch (แนะนำ)
NODE_ENV=production ADMIN_WATCH_MODE=false npm start
```

### การแก้ไขปัญหา

หากเกิด error จากการใช้ watch mode:

1. ตรวจสอบ console log สำหรับ error message
2. ลองปิด watch mode ด้วย `ADMIN_WATCH_MODE=false`
3. ตรวจสอบ file permissions ในโฟลเดอร์ที่เกี่ยวข้อง
4. ตรวจสอบ disk space

### Performance Impact

- **Watch Mode ON**: ใช้ CPU และ memory เพิ่มขึ้นเล็กน้อย
- **Watch Mode OFF**: ประสิทธิภาพดีกว่า เหมาะสำหรับ production
