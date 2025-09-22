# Gitignore Management Guide - วิธีการจัดการไฟล์ใน .gitignore

## 1. ความเข้าใจพื้นฐาน .gitignore

### .gitignore คืออะไร?
- ไฟล์ที่บอก Git ว่าไฟล์หรือโฟลเดอร์ไหนที่ไม่ต้องติดตาม (track)
- ป้องกันการอัพโหลดไฟล์ที่ไม่จำเป็น เช่น `node_modules`, `.env`, `*.log`
- ช่วยให้ repository สะอาดและปลอดภัย

### ตำแหน่งไฟล์ .gitignore
```
project-root/
├── .gitignore          # ระดับโปรเจค (แนะนำ)
├── src/
├── public/
└── node_modules/       # จะถูก ignore
```

## 2. การสร้างและแก้ไข .gitignore

### สร้างไฟล์ .gitignore
```bash
# สร้างไฟล์ .gitignore ใหม่
touch .gitignore

# หรือสร้างด้วย editor
code .gitignore
nano .gitignore
vim .gitignore
```

### รูปแบบการเขียน .gitignore

#### 1. ไฟล์เดียว
```
filename.js
config.json
secret.txt
```

#### 2. ไฟล์ตาม pattern
```
*.log          # ไฟล์ .log ทั้งหมด
*.tmp          # ไฟล์ .tmp ทั้งหมด
*.cache        # ไฟล์ .cache ทั้งหมด
temp.*         # ไฟล์ที่ขึ้นต้นด้วย temp
```

#### 3. โฟลเดอร์
```
node_modules/
dist/
build/
.vscode/
.idea/
```

#### 4. ไฟล์ในโฟลเดอร์เฉพาะ
```
src/temp/
public/uploads/
logs/
```

#### 5. ไฟล์ที่มีช่องว่างในชื่อ
```
"file with spaces.txt"
"my file.js"
```

#### 6. ใช้ wildcard
```
*.js           # ไฟล์ .js ทั้งหมด
src/*.css      # ไฟล์ .css ในโฟลเดอร์ src
**/temp/       # โฟลเดอร์ temp ในทุกที่
```

## 3. ตัวอย่าง .gitignore สำหรับโปรเจคต่างๆ

### Node.js Project
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/
.nyc_output

# Build outputs
dist/
build/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
Thumbs.db
ehthumbs.db
```

### React Project
```gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### Python Project
```gitignore
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# PyInstaller
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt

# Unit test / coverage reports
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/

# Environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# IDE
.vscode/
.idea/
*.swp
*.swo
```

### Database Project
```gitignore
# Database files
*.db
*.sqlite
*.sqlite3

# Database dumps
*.sql
*.dump

# Database logs
*.log

# Backup files
*.bak
*.backup
```

## 4. การจัดการไฟล์ที่ถูก ignore แล้ว

### ตรวจสอบไฟล์ที่ถูก ignore
```bash
# ดูไฟล์ที่ถูก ignore
git status --ignored

# ดูไฟล์ที่ถูก ignore แบบละเอียด
git check-ignore -v *

# ตรวจสอบไฟล์เฉพาะ
git check-ignore filename.js
```

### เพิ่มไฟล์ที่ถูก ignore กลับมา
```bash
# ถ้าไฟล์ถูก ignore แล้ว แต่ต้องการติดตาม
git add -f filename.js

# หรือแก้ไข .gitignore แล้ว
git add filename.js
```

### ลบไฟล์ที่ถูก ignore ออกจาก Git
```bash
# ลบไฟล์ออกจาก Git แต่เก็บไว้ใน filesystem
git rm --cached filename.js

# ลบโฟลเดอร์ออกจาก Git
git rm -r --cached folder-name/

# ลบไฟล์ทั้งหมดที่ถูก ignore
git rm -r --cached .
git add .
```

## 5. การแก้ไข .gitignore ที่มีอยู่แล้ว

### ขั้นตอนการแก้ไข
```bash
# 1. แก้ไข .gitignore
nano .gitignore

# 2. ลบไฟล์ออกจาก Git cache
git rm -r --cached .

# 3. เพิ่มไฟล์ทั้งหมดกลับมา
git add .

# 4. Commit การเปลี่ยนแปลง
git commit -m "Update .gitignore"
```

### ตัวอย่างการแก้ไข
```bash
# เพิ่ม node_modules ใน .gitignore
echo "node_modules/" >> .gitignore

# เพิ่มไฟล์ .env
echo ".env" >> .gitignore

# เพิ่มโฟลเดอร์ build
echo "build/" >> .gitignore
```

## 6. การใช้ .gitignore หลายระดับ

### โครงสร้างโปรเจค
```
project/
├── .gitignore              # ระดับโปรเจค
├── src/
│   ├── .gitignore          # ระดับ src
│   └── components/
├── docs/
│   ├── .gitignore          # ระดับ docs
│   └── images/
└── tests/
    └── .gitignore          # ระดับ tests
```

### ตัวอย่าง .gitignore หลายระดับ

#### ระดับโปรเจค (.gitignore)
```gitignore
node_modules/
.env
*.log
dist/
build/
```

#### ระดับ src (.gitignore)
```gitignore
*.temp
*.cache
temp/
```

#### ระดับ docs (.gitignore)
```gitignore
*.draft
*.backup
```

## 7. การใช้ Pattern พิเศษ

### Negation Pattern (!)
```gitignore
# Ignore ไฟล์ .js ทั้งหมด
*.js

# แต่ไม่ ignore ไฟล์ config.js
!config.js

# Ignore โฟลเดอร์ temp ทั้งหมด
temp/

# แต่ไม่ ignore โฟลเดอร์ temp ใน src
!src/temp/
```

### Directory Pattern
```gitignore
# Ignore โฟลเดอร์ logs ในทุกที่
**/logs/

# Ignore ไฟล์ .log ในโฟลเดอร์ logs เท่านั้น
logs/*.log

# Ignore ไฟล์ .log ในโฟลเดอร์ logs และ subfolder
logs/**/*.log
```

### Comment และ Blank Lines
```gitignore
# This is a comment
# Ignore log files
*.log

# Ignore temporary files
*.tmp
*.temp

# Blank line for readability

# Ignore build files
dist/
build/
```

## 8. การตรวจสอบและ Debug .gitignore

### คำสั่งตรวจสอบ
```bash
# ตรวจสอบว่าไฟล์ถูก ignore หรือไม่
git check-ignore -v filename.js

# ตรวจสอบไฟล์ทั้งหมด
git check-ignore -v *

# ดูไฟล์ที่ถูก ignore
git status --ignored

# ดูไฟล์ที่ถูก ignore แบบละเอียด
git ls-files --ignored --exclude-standard
```

### การ Debug ปัญหา
```bash
# ดูไฟล์ที่ Git ติดตาม
git ls-files

# ดูไฟล์ที่ถูก ignore
git ls-files --others --ignored --exclude-standard

# ดูไฟล์ที่ไม่ได้ถูกติดตาม
git ls-files --others --exclude-standard
```

## 9. Best Practices

### 1. วาง .gitignore ที่ root ของโปรเจค
```
project/
├── .gitignore    # วางที่นี่
├── src/
├── public/
└── package.json
```

### 2. ใช้ pattern ที่ชัดเจน
```gitignore
# ดี
node_modules/
*.log
.env

# ไม่ดี
node_modules
log
env
```

### 3. จัดกลุ่มไฟล์ที่ ignore
```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Environment
.env
.env.local

# Build outputs
dist/
build/

# IDE
.vscode/
.idea/
```

### 4. ใช้ comment อธิบาย
```gitignore
# Database files
*.db
*.sqlite

# Log files
*.log
logs/

# Temporary files
*.tmp
*.temp
```

### 5. ตรวจสอบก่อน commit
```bash
# ตรวจสอบไฟล์ที่จะ commit
git status

# ตรวจสอบไฟล์ที่ถูก ignore
git status --ignored
```

## 10. ตัวอย่าง .gitignore สำหรับโปรเจค Backoffice

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/
.nyc_output

# Build outputs
dist/
build/
/src/generated/prisma

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Prisma
prisma/migrations/

# Uploads (ถ้าไม่ต้องการเก็บ)
public/uploads/
uploads/

# Database
*.db
*.sqlite

# Cache
.cache/
*.cache

# Temporary files
*.tmp
*.temp
temp/

# Backup files
*.bak
*.backup
```

## 11. การแก้ไขปัญหา

### ปัญหา: ไฟล์ยังถูก commit แม้อยู่ใน .gitignore
```bash
# แก้ไข: ลบไฟล์ออกจาก Git cache
git rm --cached filename.js
git commit -m "Remove ignored file"
```

### ปัญหา: ไฟล์ถูก ignore แต่ต้องการติดตาม
```bash
# แก้ไข: ใช้ -f flag
git add -f filename.js
```

### ปัญหา: .gitignore ไม่ทำงาน
```bash
# แก้ไข: ตรวจสอบ syntax
git check-ignore -v filename.js

# แก้ไข: ลบ cache และ add ใหม่
git rm -r --cached .
git add .
```

---

## สรุป

| การทำงาน | คำสั่ง |
|---------|--------|
| สร้าง .gitignore | `touch .gitignore` |
| ตรวจสอบไฟล์ที่ถูก ignore | `git status --ignored` |
| ตรวจสอบไฟล์เฉพาะ | `git check-ignore -v filename` |
| ลบไฟล์ออกจาก Git cache | `git rm --cached filename` |
| เพิ่มไฟล์ที่ถูก ignore | `git add -f filename` |
| แก้ไข .gitignore | `git rm -r --cached . && git add .` |

**หมายเหตุ:** ตรวจสอบ .gitignore ก่อน commit เสมอเพื่อให้แน่ใจว่าไฟล์ที่ถูก ignore จะไม่ถูกอัพโหลด
