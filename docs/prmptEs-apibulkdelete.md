# Context: แก้ไขปัญหา API Bulk Delete (AdminJS)

## สรุปปัญหา

Bulk Delete ใน frontend ไม่ทำงาน — กดปุ่มแล้ว page reload / หรือ request hang ไม่มี response

---

## อาการที่พบ

- Console log แสดง: `Bulk Delete Triggered for IDs: ['34']` (CrudManager.js:96) — หมายความว่า frontend รับ click ได้ถูกต้อง
- แต่หลังจากนั้น API request ไม่ response (hang / timeout)
- Single delete และ edit ก็ดูเหมือนไม่ทำงาน
- HTTP status: `000` (curl exit code 56 = connection reset / no data received)

---

## การวิเคราะห์ (Root Cause Analysis)

### Bug 1 — Wrong URL for Bulk Delete

**ไฟล์:** `frontend/assets/js/apiClient.js`

```js
// ❌ WRONG — AdminJS ไม่มี route นี้
const url = `${this.baseUrl}/resources/${resource}/actions/bulkDelete`;

// ✅ CORRECT — AdminJS ใช้ /bulk/ สำหรับ bulk actions
const url = `${this.baseUrl}/resources/${resource}/bulk/bulkDelete`;
```

ยืนยันจาก Swagger docs (`routes/adminjs-api-swagger.js`):
```
POST /admin/api/resources/Uploads/bulk/bulkDelete
```

---

### Bug 2 — Request Body Format ผิด (สำคัญที่สุด)

**ไฟล์:** `frontend/assets/js/apiClient.js`

AdminJS bulk action อ่าน `recordIds` จาก **query parameters** ไม่ใช่ request body

```js
// ❌ WRONG — AdminJS ไม่อ่าน JSON body สำหรับ bulk actions → request hang ทันที
return this.request(url, {
    method: 'POST',
    body: JSON.stringify({ recordIds }),
    contentType: 'application/json'
});

// ✅ CORRECT — ส่ง recordIds เป็น query params
const params = new URLSearchParams();
ids.forEach(id => params.append('recordIds', id));
const url = `${this.baseUrl}/resources/${resource}/bulk/bulkDelete?${params}`;
return this.request(url, { method: 'POST' });
```

**ทดสอบผล:**

| Format | URL | Result |
|--------|-----|--------|
| JSON body | `POST /actions/bulkDelete` + `{"recordIds":[34]}` | HANG (exit 56) |
| JSON body | `POST /bulk/bulkDelete` + `{"recordIds":[34]}` | HANG (exit 56) |
| Query params | `POST /bulk/bulkDelete?recordIds=11` | **HTTP 200 ✅** |

---

### Bug 3 — Single Delete ส่ง `body: ''`

**ไฟล์:** `frontend/assets/js/apiClient.js`

```js
// ❌ WRONG — empty string body โดยไม่มี Content-Type อาจทำให้ server reject
return this.request(url, {
    method: 'POST',
    body: ''
});

// ✅ CORRECT — POST โดยไม่มี body
return this.request(url, {
    method: 'POST'
});
```

---

## การแก้ไข (Final Fix)

**ไฟล์ที่แก้:** `frontend/assets/js/apiClient.js`

### `bulkDelete()` method (แก้ทั้ง URL และ format)

```js
async bulkDelete(resource, ids) {
    // AdminJS reads recordIds from query params, not request body
    const params = new URLSearchParams();
    ids.forEach(id => params.append('recordIds', id));
    const url = `${this.baseUrl}/resources/${resource}/bulk/bulkDelete?${params}`;

    return this.request(url, {
        method: 'POST'
    });
}
```

### `delete()` method (ลบ empty body)

```js
async delete(resource, id) {
    const url = `${this.baseUrl}/resources/${resource}/records/${id}/delete`;
    return this.request(url, {
        method: 'POST'
    });
}
```

---

## การทดสอบ API (ยืนยันผล)

```bash
# Login
curl -c cookies.txt -X POST http://localhost:3001/admin/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin","password":"12345"}'

# Bulk Delete (format ที่ถูกต้อง)
curl -b cookies.txt -X POST \
  "http://localhost:3001/admin/api/resources/User/bulk/bulkDelete?recordIds=11"
```

**Response สำเร็จ:**
```json
{
  "notice": {
    "message": "successfullyBulkDeleted",
    "options": { "count": 1 },
    "resourceId": "User",
    "type": "success"
  },
  "redirectUrl": "/admin/resources/User"
}
```

---

## Frontend Flow (หลังแก้ไข)

```
User เลือก checkbox → selectedIds = ['34']
         ↓
คลิก bulkDeleteBtn → CrudManager.bulkDelete()
         ↓
apiClient.bulkDelete('User', ['34'])
         ↓
URLSearchParams: recordIds=34
         ↓
POST /admin/api/resources/User/bulk/bulkDelete?recordIds=34
         ↓
HTTP 200 → successfullyBulkDeleted
         ↓
selectedIds.clear() → loadData() → table refresh
```

---

## หมายเหตุเพิ่มเติม

- `bulkActions: []` ใน list response ของ AdminJS เป็นเรื่องปกติเมื่อตั้งค่า `isVisible: false` — แต่ endpoint ยังใช้งานได้เพราะ `isAccessible: true` ใน `api/index.js`
- AdminJS version ที่ใช้อยู่ใช้ `GET/POST` query params สำหรับ bulk actions ไม่ใช่ request body
- ไฟล์ config resource: `api/index.js` → `apiOnlyMode.bulkDelete: { isAccessible: true, isVisible: false }`
