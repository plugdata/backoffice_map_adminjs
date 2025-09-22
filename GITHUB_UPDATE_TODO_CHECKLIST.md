# GitHub Update Todo Checklist - รายการตรวจสอบการ Update GitHub

## 1. ก่อนการ Update

### 1.1 ตรวจสอบสถานะปัจจุบัน
- [ ] ตรวจสอบสถานะ Git: `git status`
- [ ] ตรวจสอบการเปลี่ยนแปลง: `git diff`
- [ ] ตรวจสอบไฟล์ที่ถูก ignore: `git status --ignored`
- [ ] ตรวจสอบ remote origin: `git remote -v`
- [ ] ตรวจสอบ branch ปัจจุบัน: `git branch`

### 1.2 ตรวจสอบไฟล์ที่จะอัพเดท
- [ ] ดูไฟล์ที่ถูกแก้ไข: `git diff --name-only`
- [ ] ดูไฟล์ที่ไม่ได้ถูกติดตาม: `git ls-files --others --exclude-standard`
- [ ] ตรวจสอบไฟล์ที่ใหญ่เกินไป: `find . -size +10M -type f`
- [ ] ตรวจสอบไฟล์ที่ถูก ignore: `git check-ignore -v filename`

### 1.3 ตรวจสอบการเชื่อมต่อ
- [ ] ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
- [ ] ตรวจสอบการเข้าถึง GitHub
- [ ] ตรวจสอบการตั้งค่า Git credentials
- [ ] ตรวจสอบ SSH key (ถ้าใช้ SSH)

## 2. ระหว่างการ Update

### 2.1 การเลือกไฟล์ที่จะอัพเดท
- [ ] เลือกไฟล์ที่ต้องการอัพเดท
- [ ] ตรวจสอบการเปลี่ยนแปลงในไฟล์
- [ ] ตรวจสอบว่าไฟล์ไม่ถูก ignore
- [ ] ตรวจสอบขนาดไฟล์

### 2.2 การ Add ไฟล์
- [ ] เพิ่มไฟล์เดียว: `git add filename.js`
- [ ] เพิ่มไฟล์หลายไฟล์: `git add file1.js file2.js`
- [ ] เพิ่มไฟล์ทั้งหมด: `git add .`
- [ ] เพิ่มไฟล์ตาม pattern: `git add src/*.js`

### 2.3 การ Commit
- [ ] ตรวจสอบไฟล์ที่ staged: `git diff --staged`
- [ ] เขียน commit message ที่ชัดเจน
- [ ] ตรวจสอบ commit message: `git commit -m "Message"`
- [ ] ตรวจสอบ commit สำเร็จ: `git log --oneline -1`

### 2.4 การ Push
- [ ] ตรวจสอบ remote origin: `git remote -v`
- [ ] ตรวจสอบ branch: `git branch`
- [ ] Push ไปยัง GitHub: `git push origin main`
- [ ] ตรวจสอบ push สำเร็จ

## 3. หลังการ Update

### 3.1 ตรวจสอบการ Update สำเร็จ
- [ ] ตรวจสอบสถานะ: `git status`
- [ ] ตรวจสอบ history: `git log --oneline -3`
- [ ] ตรวจสอบการ sync: `git status`
- [ ] ตรวจสอบบน GitHub website

### 3.2 ตรวจสอบไฟล์ที่อัพเดท
- [ ] ดูไฟล์ที่เปลี่ยนแปลง: `git show --name-only HEAD`
- [ ] ตรวจสอบการเปลี่ยนแปลง: `git show HEAD`
- [ ] ตรวจสอบไฟล์ที่อัพเดทบน GitHub
- [ ] ตรวจสอบว่าไฟล์ถูก ignore หรือไม่

### 3.3 ตรวจสอบการทำงาน
- [ ] ทดสอบการทำงานของแอปพลิเคชัน
- [ ] ตรวจสอบ API endpoints
- [ ] ตรวจสอบ UI components
- [ ] ตรวจสอบ database connections

## 4. การ Update แบบเฉพาะส่วน

### 4.1 Update ไฟล์เดียว
- [ ] ตรวจสอบไฟล์ที่จะอัพเดท
- [ ] เพิ่มไฟล์: `git add filename.js`
- [ ] Commit: `git commit -m "Update filename.js"`
- [ ] Push: `git push origin main`
- [ ] ตรวจสอบการอัพเดท

### 4.2 Update หลายไฟล์
- [ ] เลือกไฟล์ที่จะอัพเดท
- [ ] เพิ่มไฟล์: `git add file1.js file2.js`
- [ ] Commit: `git commit -m "Update multiple files"`
- [ ] Push: `git push origin main`
- [ ] ตรวจสอบการอัพเดท

### 4.3 Update โฟลเดอร์
- [ ] เลือกโฟลเดอร์ที่จะอัพเดท
- [ ] เพิ่มโฟลเดอร์: `git add folder/`
- [ ] Commit: `git commit -m "Update folder"`
- [ ] Push: `git push origin main`
- [ ] ตรวจสอบการอัพเดท

## 5. การ Update แบบทั้งหมด

### 5.1 Update ทั้งหมด
- [ ] ตรวจสอบสถานะ: `git status`
- [ ] เพิ่มไฟล์ทั้งหมด: `git add .`
- [ ] Commit: `git commit -m "Update all files"`
- [ ] Push: `git push origin main`
- [ ] ตรวจสอบการอัพเดท

### 5.2 Update พร้อมลบไฟล์
- [ ] ตรวจสอบไฟล์ที่จะลบ
- [ ] เพิ่มไฟล์: `git add .`
- [ ] ลบไฟล์: `git rm filename.js`
- [ ] Commit: `git commit -m "Update with cleanup"`
- [ ] Push: `git push origin main`

### 5.3 Update พร้อมแก้ไข .gitignore
- [ ] แก้ไข .gitignore
- [ ] ลบ cache: `git rm -r --cached .`
- [ ] เพิ่มไฟล์: `git add .`
- [ ] Commit: `git commit -m "Update .gitignore"`
- [ ] Push: `git push origin main`

## 6. การ Update แบบ Branch

### 6.1 สร้าง Branch
- [ ] สร้าง branch: `git checkout -b feature/name`
- [ ] ทำการแก้ไข
- [ ] เพิ่มไฟล์: `git add .`
- [ ] Commit: `git commit -m "Add feature"`
- [ ] Push branch: `git push -u origin feature/name`

### 6.2 Merge Branch
- [ ] เปลี่ยนไป main: `git checkout main`
- [ ] Merge branch: `git merge feature/name`
- [ ] ลบ branch: `git branch -d feature/name`
- [ ] Push: `git push origin main`

## 7. การ Update แบบ Stash

### 7.1 ใช้ Stash
- [ ] เก็บการเปลี่ยนแปลง: `git stash`
- [ ] ดึงการเปลี่ยนแปลง: `git pull origin main`
- [ ] นำการเปลี่ยนแปลงกลับ: `git stash pop`
- [ ] แก้ไข conflict (ถ้ามี)
- [ ] Commit: `git commit -m "Update after stash"`
- [ ] Push: `git push origin main`

## 8. การแก้ไขปัญหา

### 8.1 แก้ไข Merge Conflict
- [ ] ดูไฟล์ที่มี conflict: `git status`
- [ ] แก้ไข conflict ในไฟล์
- [ ] เพิ่มไฟล์ที่แก้ไข: `git add filename.js`
- [ ] Commit: `git commit -m "Resolve conflict"`
- [ ] Push: `git push origin main`

### 8.2 แก้ไข Push Error
- [ ] ตรวจสอบ error message
- [ ] Pull การเปลี่ยนแปลง: `git pull origin main`
- [ ] แก้ไข conflict (ถ้ามี)
- [ ] Push: `git push origin main`

### 8.3 แก้ไข Commit Error
- [ ] ยกเลิก commit: `git reset --soft HEAD~1`
- [ ] แก้ไขไฟล์
- [ ] Commit ใหม่: `git commit -m "Corrected commit"`
- [ ] Push: `git push origin main`

## 9. การตรวจสอบความปลอดภัย

### 9.1 ตรวจสอบไฟล์ที่ถูก ignore
- [ ] ตรวจสอบ .gitignore: `cat .gitignore`
- [ ] ตรวจสอบไฟล์ที่ถูก ignore: `git status --ignored`
- [ ] ตรวจสอบไฟล์ sensitive: `.env`, `config.json`
- [ ] ตรวจสอบไฟล์ขนาดใหญ่: `node_modules/`, `dist/`

### 9.2 ตรวจสอบการตั้งค่า
- [ ] ตรวจสอบ user config: `git config --list`
- [ ] ตรวจสอบ remote URL: `git remote -v`
- [ ] ตรวจสอบ branch: `git branch -a`
- [ ] ตรวจสอบการตั้งค่า editor

## 10. การ Update แบบ Automated

### 10.1 สร้าง Script
- [ ] สร้าง update script
- [ ] ตั้งค่า permissions: `chmod +x script.sh`
- [ ] ทดสอบ script
- [ ] รัน script: `./script.sh`

### 10.2 ตรวจสอบ Script
- [ ] ตรวจสอบการทำงานของ script
- [ ] ตรวจสอบ error handling
- [ ] ตรวจสอบ output
- [ ] ตรวจสอบการ update สำเร็จ

## 11. การ Update สำหรับ Backoffice Project

### 11.1 Update Backend
- [ ] ตรวจสอบไฟล์ backend: `routes/`, `prisma/`, `config/`
- [ ] เพิ่มไฟล์: `git add routes/ prisma/ config/`
- [ ] Commit: `git commit -m "Update backend"`
- [ ] Push: `git push origin main`
- [ ] ตรวจสอบ API endpoints

### 11.2 Update Frontend
- [ ] ตรวจสอบไฟล์ frontend: `src/`, `public/`, `page/`
- [ ] เพิ่มไฟล์: `git add src/ public/ page/`
- [ ] Commit: `git commit -m "Update frontend"`
- [ ] Push: `git push origin main`
- [ ] ตรวจสอบ UI components

### 11.3 Update Configuration
- [ ] ตรวจสอบไฟล์ config: `.env.example`, `package.json`, `prisma/schema.prisma`
- [ ] เพิ่มไฟล์: `git add .env.example package.json prisma/schema.prisma`
- [ ] Commit: `git commit -m "Update configuration"`
- [ ] Push: `git push origin main`
- [ ] ตรวจสอบการตั้งค่า

### 11.4 Update Documentation
- [ ] ตรวจสอบไฟล์เอกสาร: `*.md`, `docs/`, `README.md`
- [ ] เพิ่มไฟล์: `git add *.md docs/ README.md`
- [ ] Commit: `git commit -m "Update documentation"`
- [ ] Push: `git push origin main`
- [ ] ตรวจสอบเอกสารบน GitHub

## 12. การตรวจสอบหลัง Update

### 12.1 ตรวจสอบการทำงาน
- [ ] ตรวจสอบแอปพลิเคชันทำงานปกติ
- [ ] ตรวจสอบ API endpoints
- [ ] ตรวจสอบ UI components
- [ ] ตรวจสอบ database connections

### 12.2 ตรวจสอบการ Sync
- [ ] ตรวจสอบ local และ remote sync: `git status`
- [ ] ตรวจสอบการเปลี่ยนแปลงบน GitHub
- [ ] ตรวจสอบไฟล์ที่อัพเดท
- [ ] ตรวจสอบ commit history

### 12.3 ตรวจสอบความปลอดภัย
- [ ] ตรวจสอบไฟล์ที่ถูก ignore
- [ ] ตรวจสอบไฟล์ sensitive
- [ ] ตรวจสอบการตั้งค่า
- [ ] ตรวจสอบ permissions

## 13. คำสั่งตรวจสอบที่สำคัญ

### 13.1 ตรวจสอบสถานะ
```bash
# ตรวจสอบสถานะ
git status

# ตรวจสอบการเปลี่ยนแปลง
git diff

# ตรวจสอบไฟล์ที่ staged
git diff --staged

# ตรวจสอบ history
git log --oneline -5
```

### 13.2 ตรวจสอบไฟล์
```bash
# ดูไฟล์ที่ถูกแก้ไข
git diff --name-only

# ดูไฟล์ที่ไม่ได้ถูกติดตาม
git ls-files --others --exclude-standard

# ตรวจสอบไฟล์ที่ถูก ignore
git status --ignored
```

### 13.3 ตรวจสอบการ Sync
```bash
# ตรวจสอบ remote
git remote -v

# ตรวจสอบ branch
git branch -a

# ตรวจสอบการ sync
git status
```

---

## สรุป Checklist

### ก่อน Update
- [ ] ตรวจสอบสถานะ Git
- [ ] ตรวจสอบไฟล์ที่จะอัพเดท
- [ ] ตรวจสอบการเชื่อมต่อ

### ระหว่าง Update
- [ ] เลือกไฟล์ที่จะอัพเดท
- [ ] Add ไฟล์
- [ ] Commit
- [ ] Push

### หลัง Update
- [ ] ตรวจสอบการ Update สำเร็จ
- [ ] ตรวจสอบไฟล์ที่อัพเดท
- [ ] ตรวจสอบการทำงาน

---

**หมายเหตุ:** ใช้ checklist นี้ทุกครั้งที่ทำการ update เพื่อให้แน่ใจว่าการ update สำเร็จและปลอดภัย
