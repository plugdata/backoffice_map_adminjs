# GitHub Update Procedures - วิธีการ Update GitHub

## 1. ประเภทการ Update

### 1.1 Update เฉพาะบางส่วน (Partial Update)
- อัพเดทไฟล์เฉพาะที่ต้องการ
- เหมาะสำหรับการแก้ไข bug หรือเพิ่ม feature เล็กน้อย
- ใช้เวลาเร็วและปลอดภัย

### 1.2 Update ทุกส่วน (Full Update)
- อัพเดทโปรเจคทั้งหมด
- เหมาะสำหรับการอัพเดทครั้งใหญ่
- ต้องระวังเรื่อง conflict

### 1.3 Update ทุกไฟล์ (All Files Update)
- อัพเดทไฟล์ทั้งหมดในโปรเจค
- เหมาะสำหรับการ sync กับ remote repository
- ต้องตรวจสอบการเปลี่ยนแปลงอย่างละเอียด

## 2. การ Update เฉพาะบางส่วน (Partial Update)

### 2.1 อัพเดทไฟล์เดียว
```bash
# ตรวจสอบสถานะปัจจุบัน
git status

# เพิ่มไฟล์ที่ต้องการอัพเดท
git add filename.js

# Commit การเปลี่ยนแปลง
git commit -m "Update filename.js - fix bug in login"

# Push ไปยัง GitHub
git push origin main
```

### 2.2 อัพเดทไฟล์หลายไฟล์
```bash
# เพิ่มไฟล์ที่ต้องการอัพเดท
git add file1.js file2.js file3.js

# หรือเพิ่มไฟล์ตาม pattern
git add src/components/*.jsx
git add routes/*.js

# Commit
git commit -m "Update multiple files - add new features"

# Push
git push origin main
```

### 2.3 อัพเดทโฟลเดอร์เฉพาะ
```bash
# อัพเดทโฟลเดอร์ทั้งหมด
git add src/components/
git add public/css/
git add routes/

# Commit
git commit -m "Update components and routes"

# Push
git push origin main
```

### 2.4 อัพเดทตามประเภทไฟล์
```bash
# อัพเดทไฟล์ JavaScript ทั้งหมด
git add *.js
git add src/**/*.js

# อัพเดทไฟล์ CSS ทั้งหมด
git add *.css
git add public/css/*.css

# อัพเดทไฟล์ Markdown ทั้งหมด
git add *.md

# Commit
git commit -m "Update all JavaScript and CSS files"

# Push
git push origin main
```

## 3. การ Update ทุกส่วน (Full Update)

### 3.1 อัพเดทโปรเจคทั้งหมด
```bash
# ตรวจสอบสถานะ
git status

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Full project update - major changes"

# Push
git push origin main
```

### 3.2 อัพเดทพร้อมลบไฟล์ที่ไม่ต้องการ
```bash
# เพิ่มไฟล์ทั้งหมด
git add .

# ลบไฟล์ที่ไม่ต้องการ
git rm unwanted-file.js
git rm -r unwanted-folder/

# Commit
git commit -m "Full update with cleanup"

# Push
git push origin main
```

### 3.3 อัพเดทพร้อมแก้ไข .gitignore
```bash
# แก้ไข .gitignore
nano .gitignore

# ลบไฟล์ออกจาก Git cache
git rm -r --cached .

# เพิ่มไฟล์ทั้งหมดกลับมา
git add .

# Commit
git commit -m "Update .gitignore and sync files"

# Push
git push origin main
```

## 4. การ Update ทุกไฟล์ (All Files Update)

### 4.1 Sync กับ Remote Repository
```bash
# ดึงการเปลี่ยนแปลงล่าสุดจาก GitHub
git fetch origin

# ดูการเปลี่ยนแปลง
git log HEAD..origin/main --oneline

# Merge การเปลี่ยนแปลง
git merge origin/main

# หรือใช้ pull
git pull origin main
```

### 4.2 Force Update (ระวัง!)
```bash
# ตรวจสอบการเปลี่ยนแปลง
git status

# Force push (จะเขียนทับ remote)
git push --force origin main

# หรือใช้ force with lease (ปลอดภัยกว่า)
git push --force-with-lease origin main
```

### 4.3 Reset และ Update ใหม่
```bash
# เก็บการเปลี่ยนแปลงไว้ใน stash
git stash

# Reset ไปยัง remote
git reset --hard origin/main

# นำการเปลี่ยนแปลงกลับมา
git stash pop

# Commit และ push
git add .
git commit -m "Update after reset"
git push origin main
```

## 5. การตรวจสอบก่อน Update

### 5.1 ตรวจสอบสถานะ
```bash
# ดูสถานะปัจจุบัน
git status

# ดูการเปลี่ยนแปลง
git diff

# ดูการเปลี่ยนแปลงที่ staged
git diff --staged

# ดู history
git log --oneline -5
```

### 5.2 ตรวจสอบไฟล์ที่จะอัพเดท
```bash
# ดูไฟล์ที่ถูกแก้ไข
git diff --name-only

# ดูไฟล์ที่ถูกแก้ไขพร้อมรายละเอียด
git diff --name-status

# ดูไฟล์ที่ไม่ได้ถูกติดตาม
git ls-files --others --exclude-standard
```

### 5.3 ตรวจสอบไฟล์ที่ถูก ignore
```bash
# ดูไฟล์ที่ถูก ignore
git status --ignored

# ตรวจสอบไฟล์เฉพาะ
git check-ignore -v filename.js
```

## 6. การ Update แบบ Branch

### 6.1 สร้าง Branch สำหรับ Update
```bash
# สร้าง branch ใหม่
git checkout -b update/feature-name

# ทำการแก้ไข
git add .
git commit -m "Add new feature"

# Push branch
git push -u origin update/feature-name

# สร้าง Pull Request บน GitHub
```

### 6.2 Merge Branch กลับมา
```bash
# เปลี่ยนไป main branch
git checkout main

# Merge branch
git merge update/feature-name

# ลบ branch
git branch -d update/feature-name

# Push
git push origin main
```

## 7. การ Update แบบ Stash

### 7.1 เก็บการเปลี่ยนแปลงชั่วคราว
```bash
# เก็บการเปลี่ยนแปลง
git stash

# ดึงการเปลี่ยนแปลงล่าสุด
git pull origin main

# นำการเปลี่ยนแปลงกลับมา
git stash pop

# แก้ไข conflict (ถ้ามี)
# จากนั้น commit และ push
git add .
git commit -m "Update after stash"
git push origin main
```

## 8. การ Update แบบ Interactive

### 8.1 Interactive Add
```bash
# เพิ่มไฟล์แบบ interactive
git add -i

# หรือใช้
git add -p
```

### 8.2 Interactive Commit
```bash
# Commit แบบ interactive
git commit

# หรือแก้ไข commit message
git commit --amend
```

## 9. การ Update พร้อมตรวจสอบ

### 9.1 Update พร้อมตรวจสอบไฟล์
```bash
# ตรวจสอบไฟล์ก่อน add
git diff filename.js

# เพิ่มไฟล์
git add filename.js

# ตรวจสอบอีกครั้ง
git diff --staged filename.js

# Commit
git commit -m "Update filename.js"

# Push
git push origin main
```

### 9.2 Update พร้อมตรวจสอบขนาด
```bash
# ดูขนาดไฟล์
ls -la filename.js

# ตรวจสอบไฟล์ที่ใหญ่
find . -size +10M -type f

# เพิ่มไฟล์
git add filename.js

# Commit
git commit -m "Update large file"

# Push
git push origin main
```

## 10. การ Update แบบ Batch

### 10.1 Update หลายไฟล์พร้อมกัน
```bash
# สร้าง script สำหรับ update
cat > update_script.sh << 'EOF'
#!/bin/bash
git add file1.js file2.js file3.js
git commit -m "Batch update multiple files"
git push origin main
EOF

# รัน script
chmod +x update_script.sh
./update_script.sh
```

### 10.2 Update ตามเงื่อนไข
```bash
# Update เฉพาะไฟล์ที่ถูกแก้ไขวันนี้
find . -name "*.js" -mtime -1 -exec git add {} \;
git commit -m "Update files modified today"
git push origin main
```

## 11. การแก้ไขปัญหา Update

### 11.1 แก้ไข Merge Conflict
```bash
# ดูไฟล์ที่มี conflict
git status

# แก้ไข conflict ในไฟล์
nano filename.js

# เพิ่มไฟล์ที่แก้ไขแล้ว
git add filename.js

# Commit
git commit -m "Resolve merge conflict"
```

### 11.2 แก้ไข Push Error
```bash
# ถ้า push ไม่ได้เพราะ remote มีการเปลี่ยนแปลง
git pull origin main

# แก้ไข conflict (ถ้ามี)
# จากนั้น push
git push origin main
```

### 11.3 แก้ไข Commit Error
```bash
# ยกเลิก commit ล่าสุด
git reset --soft HEAD~1

# แก้ไขไฟล์
# จากนั้น commit ใหม่
git add .
git commit -m "Corrected commit message"
```

## 12. การ Update แบบ Safe

### 12.1 Update พร้อม Backup
```bash
# สร้าง backup branch
git checkout -b backup/$(date +%Y%m%d)

# เปลี่ยนกลับไป main
git checkout main

# ทำการ update
git add .
git commit -m "Update with backup"
git push origin main
```

### 12.2 Update พร้อม Tag
```bash
# ทำการ update
git add .
git commit -m "Update version 1.1.0"
git push origin main

# สร้าง tag
git tag v1.1.0
git push origin v1.1.0
```

## 13. คำสั่ง Update ที่ใช้บ่อย

### 13.1 Update เร็ว
```bash
# Update ไฟล์เดียว
git add filename.js && git commit -m "Update filename" && git push

# Update หลายไฟล์
git add file1.js file2.js && git commit -m "Update files" && git push

# Update ทั้งหมด
git add . && git commit -m "Update all" && git push
```

### 13.2 Update ปลอดภัย
```bash
# ตรวจสอบก่อน update
git status && git diff --name-only

# Update
git add .
git commit -m "Safe update"
git push origin main
```

### 13.3 Update พร้อมตรวจสอบ
```bash
# ตรวจสอบไฟล์ที่ถูก ignore
git status --ignored

# ตรวจสอบไฟล์ที่จะ update
git diff --name-only

# Update
git add .
git commit -m "Checked update"
git push origin main
```

## 14. การ Update แบบ Automated

### 14.1 สร้าง Script สำหรับ Update
```bash
# สร้าง update script
cat > auto_update.sh << 'EOF'
#!/bin/bash
echo "Starting update process..."

# ตรวจสอบสถานะ
git status

# เพิ่มไฟล์
git add .

# Commit
git commit -m "Auto update $(date)"

# Push
git push origin main

echo "Update completed!"
EOF

# รัน script
chmod +x auto_update.sh
./auto_update.sh
```

### 14.2 Update พร้อม Notification
```bash
# สร้าง script พร้อม notification
cat > update_with_notify.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting update process..."

# ตรวจสอบสถานะ
git status

# เพิ่มไฟล์
git add .

# Commit
git commit -m "Auto update $(date '+%Y-%m-%d %H:%M:%S')"

# Push
git push origin main

echo "✅ Update completed successfully!"
echo "📅 Updated at: $(date)"
EOF

# รัน script
chmod +x update_with_notify.sh
./update_with_notify.sh
```

## 15. การ Update สำหรับ Backoffice Project

### 15.1 Update เฉพาะส่วน Backend
```bash
# อัพเดทเฉพาะไฟล์ backend
git add routes/
git add prisma/
git add config/
git add *.js

# Commit
git commit -m "Update backend - add new API endpoints"

# Push
git push origin main
```

### 15.2 Update เฉพาะส่วน Frontend
```bash
# อัพเดทเฉพาะไฟล์ frontend
git add src/
git add public/
git add page/

# Commit
git commit -m "Update frontend - improve UI components"

# Push
git push origin main
```

### 15.3 Update ไฟล์ Configuration
```bash
# อัพเดทไฟล์ config
git add .env.example
git add package.json
git add prisma/schema.prisma
git add tailwind.config.js

# Commit
git commit -m "Update configuration files"

# Push
git push origin main
```

### 15.4 Update Documentation
```bash
# อัพเดทไฟล์เอกสาร
git add *.md
git add docs/
git add README.md

# Commit
git commit -m "Update documentation"

# Push
git push origin main
```

## 16. การตรวจสอบหลัง Update

### 16.1 ตรวจสอบการ Update สำเร็จ
```bash
# ตรวจสอบสถานะ
git status

# ตรวจสอบ history
git log --oneline -3

# ตรวจสอบ remote
git remote -v

# ตรวจสอบ branch
git branch -a
```

### 16.2 ตรวจสอบไฟล์ที่อัพเดท
```bash
# ดูไฟล์ที่เปลี่ยนแปลงใน commit ล่าสุด
git show --name-only HEAD

# ดูการเปลี่ยนแปลงใน commit ล่าสุด
git show HEAD

# ดูการเปลี่ยนแปลงระหว่าง commits
git diff HEAD~1 HEAD
```

### 16.3 ตรวจสอบการ Sync กับ Remote
```bash
# ตรวจสอบว่า local และ remote sync กัน
git status

# ถ้า behind ให้ pull
git pull origin main

# ถ้า ahead ให้ push
git push origin main
```

---

## สรุปคำสั่ง Update ที่สำคัญ

| ประเภท Update | คำสั่ง |
|---------------|--------|
| Update ไฟล์เดียว | `git add filename.js && git commit -m "Update" && git push` |
| Update หลายไฟล์ | `git add file1.js file2.js && git commit -m "Update" && git push` |
| Update ทั้งหมด | `git add . && git commit -m "Update all" && git push` |
| Update แบบ Safe | `git status && git add . && git commit -m "Safe update" && git push` |
| Update พร้อมตรวจสอบ | `git diff --name-only && git add . && git commit -m "Checked update" && git push` |
| Sync กับ Remote | `git pull origin main && git push origin main` |

---

**หมายเหตุ:** ตรวจสอบสถานะก่อน update เสมอ และใช้ `git status` เพื่อดูการเปลี่ยนแปลง