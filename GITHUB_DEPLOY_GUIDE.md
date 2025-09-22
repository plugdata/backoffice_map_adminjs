# GitHub Deployment Guide - คำสั่งพื้นฐาน GitHub Deploy

## 1. การตั้งค่าเริ่มต้น (Initial Setup)

### สร้าง Repository ใหม่
```bash
# สร้างโฟลเดอร์ใหม่
mkdir my-project
cd my-project

# เริ่มต้น Git repository
git init

# เพิ่ม remote origin
git remote add origin https://github.com/username/repository-name.git
```

### การตั้งค่า Repository ที่มีอยู่แล้ว
```bash
# ตรวจสอบ remote origin
git remote -v

# เปลี่ยน remote origin
git remote set-url origin https://github.com/username/new-repository-name.git

# เพิ่ม remote origin ใหม่
git remote add origin https://github.com/username/repository-name.git
```

## 2. การจัดการไฟล์ (File Management)

### การเพิ่มไฟล์
```bash
# เพิ่มไฟล์เดียว
git add filename.js

# เพิ่มไฟล์หลายไฟล์
git add file1.js file2.js file3.js

# เพิ่มไฟล์ทั้งหมด
git add .

# เพิ่มไฟล์ตาม pattern
git add *.js
git add src/
git add "*.md"
```

### การลบไฟล์
```bash
# ลบไฟล์จาก Git และ filesystem
git rm filename.js

# ลบไฟล์จาก Git เท่านั้น (เก็บไฟล์ไว้ใน filesystem)
git rm --cached filename.js

# ลบโฟลเดอร์
git rm -r folder-name/
```

### การเปลี่ยนชื่อไฟล์
```bash
# เปลี่ยนชื่อไฟล์
git mv old-name.js new-name.js

# ย้ายไฟล์
git mv file.js new-folder/file.js
```

## 3. การ Commit และ Push

### การ Commit
```bash
# Commit พร้อมข้อความ
git commit -m "Initial commit"
git commit -m "Add new feature"
git commit -m "Fix bug in login system"

# Commit แบบ interactive
git commit

# Commit ไฟล์ที่ถูกแก้ไขแล้วโดยอัตโนมัติ
git commit -am "Update modified files"
```

### การ Push
```bash
# Push ครั้งแรก (ตั้ง upstream)
git push -u origin main

# Push ปกติ
git push

# Push ไปยัง branch อื่น
git push origin feature-branch

# Force push (ระวัง!)
git push --force
```

## 4. การจัดการ Branch

### การสร้างและเปลี่ยน Branch
```bash
# สร้าง branch ใหม่
git branch feature-branch

# เปลี่ยนไป branch อื่น
git checkout feature-branch

# สร้างและเปลี่ยน branch ในคำสั่งเดียว
git checkout -b feature-branch

# ดู branch ทั้งหมด
git branch -a

# ลบ branch
git branch -d feature-branch
```

### การ Merge
```bash
# เปลี่ยนไป main branch
git checkout main

# Merge branch อื่นเข้ามา
git merge feature-branch

# Merge แบบ no-fast-forward
git merge --no-ff feature-branch
```

## 5. การดูสถานะและ History

### การดูสถานะ
```bash
# ดูสถานะปัจจุบัน
git status

# ดูการเปลี่ยนแปลง
git diff

# ดูการเปลี่ยนแปลงที่ staged
git diff --staged

# ดู history
git log

# ดู history แบบย่อ
git log --oneline

# ดู history แบบกราฟ
git log --graph --oneline
```

## 6. การ Undo และ Reset

### การ Undo
```bash
# ยกเลิกการแก้ไขไฟล์ (ยังไม่ได้ add)
git checkout -- filename.js

# ยกเลิกการ add ไฟล์
git reset HEAD filename.js

# ยกเลิก commit ล่าสุด (เก็บการเปลี่ยนแปลง)
git reset --soft HEAD~1

# ยกเลิก commit ล่าสุด (ลบการเปลี่ยนแปลง)
git reset --hard HEAD~1
```

## 7. การ Clone และ Pull

### การ Clone
```bash
# Clone repository
git clone https://github.com/username/repository-name.git

# Clone ไปยังโฟลเดอร์ที่กำหนด
git clone https://github.com/username/repository-name.git my-folder

# Clone branch เฉพาะ
git clone -b branch-name https://github.com/username/repository-name.git
```

### การ Pull
```bash
# Pull การเปลี่ยนแปลงล่าสุด
git pull

# Pull จาก branch อื่น
git pull origin feature-branch

# Pull แบบ rebase
git pull --rebase
```

## 8. การจัดการ Stash

```bash
# เก็บการเปลี่ยนแปลงชั่วคราว
git stash

# เก็บพร้อมข้อความ
git stash save "Work in progress"

# ดู stash ทั้งหมด
git stash list

# นำ stash กลับมาใช้
git stash pop

# นำ stash กลับมาใช้ (ไม่ลบ stash)
git stash apply

# ลบ stash
git stash drop
```

## 9. การตั้งค่า Git

```bash
# ตั้งค่า user name และ email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# ตั้งค่า default branch
git config --global init.defaultBranch main

# ดูการตั้งค่าทั้งหมด
git config --list

# ตั้งค่า editor
git config --global core.editor "code --wait"
```

## 10. การทำงานกับ Remote

```bash
# ดู remote ทั้งหมด
git remote -v

# เพิ่ม remote
git remote add upstream https://github.com/original/repository.git

# เปลี่ยน remote URL
git remote set-url origin https://github.com/username/new-repo.git

# ลบ remote
git remote remove upstream

# ดึงข้อมูลจาก remote
git fetch origin

# ดึงข้อมูลจาก remote ทั้งหมด
git fetch --all
```

## 11. การแก้ไขปัญหา (Troubleshooting)

### การแก้ไข Merge Conflict
```bash
# ดูไฟล์ที่มี conflict
git status

# แก้ไข conflict ในไฟล์
# จากนั้น add ไฟล์ที่แก้ไขแล้ว
git add resolved-file.js

# Commit การแก้ไข
git commit -m "Resolve merge conflict"
```

### การแก้ไข Commit Message
```bash
# แก้ไข commit message ล่าสุด
git commit --amend -m "New commit message"

# แก้ไข commit message แบบ interactive
git commit --amend
```

## 12. การ Deploy Production

### การสร้าง Production Branch
```bash
# สร้าง production branch
git checkout -b production

# Push production branch
git push -u origin production

# Deploy จาก production branch
git checkout production
git pull origin production
```

### การใช้ Tags สำหรับ Version
```bash
# สร้าง tag
git tag v1.0.0

# Push tag
git push origin v1.0.0

# Push tags ทั้งหมด
git push origin --tags

# ดู tags
git tag -l
```

## 13. คำสั่งที่ใช้บ่อย (Common Commands)

```bash
# Workflow ปกติ
git add .
git commit -m "Update feature"
git push

# ตรวจสอบสถานะ
git status
git log --oneline -5

# อัพเดทจาก remote
git pull

# สร้าง branch ใหม่สำหรับ feature
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature
```

## 14. การตั้งค่า .gitignore

```bash
# สร้าง .gitignore
touch .gitignore

# เพิ่มไฟล์ใน .gitignore
echo "node_modules/" >> .gitignore
echo "*.log" >> .gitignore
echo ".env" >> .gitignore

# ตรวจสอบไฟล์ที่ถูก ignore
git status --ignored
```

## 15. การทำงานกับ Team

### การทำงานร่วมกัน
```bash
# ดึงการเปลี่ยนแปลงล่าสุด
git pull origin main

# สร้าง branch สำหรับ feature
git checkout -b feature/my-feature

# ทำงานและ commit
git add .
git commit -m "Add my feature"

# Push branch
git push -u origin feature/my-feature

# สร้าง Pull Request บน GitHub
```

### การ Review Code
```bash
# ดูการเปลี่ยนแปลงใน commit
git show commit-hash

# ดูการเปลี่ยนแปลงระหว่าง branches
git diff main..feature-branch

# ดูการเปลี่ยนแปลงในไฟล์เฉพาะ
git diff main..feature-branch -- filename.js
```

---

## สรุปคำสั่งที่สำคัญ

| การทำงาน | คำสั่ง |
|---------|--------|
| เริ่มต้น | `git init`, `git remote add origin <url>` |
| เพิ่มไฟล์ | `git add .`, `git add filename` |
| Commit | `git commit -m "message"` |
| Push | `git push -u origin main` |
| Pull | `git pull` |
| สร้าง Branch | `git checkout -b branch-name` |
| เปลี่ยน Branch | `git checkout branch-name` |
| ดูสถานะ | `git status`, `git log` |
| Clone | `git clone <url>` |

---

**หมายเหตุ:** แทนที่ `username` และ `repository-name` ด้วยข้อมูลจริงของคุณ
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
cat > update_with_notify.sh << 