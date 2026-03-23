/**
 * Resource Configurations for AdminJS CRUD System
 *
 * Field Types:
 * - string: text input
 * - number: number input
 * - email: email input
 * - password: password input
 * - textarea: textarea
 * - select: dropdown (requires options array)
 * - reference: foreign key dropdown (requires reference name)
 * - date: date picker
 * - datetime: datetime picker
 * - boolean: checkbox/switch
 * - file: single file input
 * - image: single image input
 * - json: JSON textarea
 * - files: multiple file upload with dropzone (requires FileUploadManager.js)
 *
 * Example 'files' field:
 *   documents: {
 *     label: 'เอกสารแนบ',
 *     type: 'files',
 *     list: false,
 *     show: true,
 *     edit: true,
 *     apiEndpoint: '/api/documents/upload',  // optional, default: /api/documents/upload
 *     maxSize: 15 * 1024 * 1024               // optional, default: 15MB
 *   }
 */

const API_BASE_URL = '/admin/api';

const RESOURCES = {
    User: {
        name: 'User',
        label: 'ผู้ใช้งาน',
        labelPlural: 'ผู้ใช้งาน',
        icon: 'bi-people',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            username: { label: 'ชื่อผู้ใช้', type: 'string', list: true, show: true, edit: true, required: true },
            password: { label: 'รหัสผ่าน', type: 'password', list: false, show: false, edit: true, required: true },
            title_use: { label: 'คำนำหน้า', type: 'string', list: true, show: true, edit: true },
            fullName: { label: 'ชื่อ-นามสกุล', type: 'string', list: true, show: true, edit: true },
            email: { label: 'อีเมล', type: 'email', list: true, show: true, edit: true },
            phone: { label: 'โทรศัพท์', type: 'string', list: true, show: true, edit: true },
            role: { label: 'บทบาท', type: 'select', list: true, show: true, edit: true, options: ['admin', 'user', 'viewer'] },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false },
            updatedAt: { label: 'แก้ไขเมื่อ', type: 'datetime', list: false, show: true, edit: false }
        }
    },
    Owner: {
        name: 'Owner',
        label: 'เจ้าของกรรมสิทธิ์',
        labelPlural: 'เจ้าของกรรมสิทธิ์',
        icon: 'bi-person-badge',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            title_owner: { label: 'คำนำหน้า', type: 'string', list: true, show: true, edit: true },
            first_name: { label: 'ชื่อ', type: 'string', list: true, show: true, edit: true, required: true },
            last_name: { label: 'นามสกุล', type: 'string', list: true, show: true, edit: true, required: true },
            phone: { label: 'โทรศัพท์', type: 'string', list: true, show: true, edit: true },
            no_id: { label: 'เลขบัตรประชาชน', type: 'string', list: true, show: true, edit: true },
            house_no: { label: 'บ้านเลขที่', type: 'string', list: false, show: true, edit: true },
            village_no: { label: 'หมู่ที่', type: 'string', list: false, show: true, edit: true },
            soi: { label: 'ซอย', type: 'string', list: false, show: true, edit: true },
            road: { label: 'ถนน', type: 'string', list: false, show: true, edit: true },
            subdistrict: { label: 'ตำบล', type: 'string', list: false, show: true, edit: true },
            district: { label: 'อำเภอ', type: 'string', list: false, show: true, edit: true },
            province: { label: 'จังหวัด', type: 'string', list: false, show: true, edit: true },
            zipcode: { label: 'รหัสไปรษณีย์', type: 'string', list: false, show: true, edit: true },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    },
    FiscalYear: {
        name: 'FiscalYear',
        label: 'ปีงบประมาณ',
        labelPlural: 'ปีงบประมาณ',
        icon: 'bi-calendar',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            year: { label: 'ปีงบประมาณ', type: 'number', list: true, show: true, edit: true, required: true },
            detail: { label: 'รายละเอียด', type: 'textarea', list: true, show: true, edit: true },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    },
    BuildingControl: {
        name: 'BuildingControl',
        label: 'งานควบคุมอาคาร',
        labelPlural: 'งานควบคุมอาคาร',
        icon: 'bi-building',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            building_type: { label: 'ประเภทอาคาร', type: 'string', list: true, show: true, edit: true, required: true },
            use_purpose: { label: 'วัตถุประสงค์', type: 'string', list: true, show: true, edit: true },
            quantity: { label: 'จำนวน', type: 'number', list: true, show: true, edit: true },
            fiscalYearId: { label: 'ปีงบประมาณ', type: 'reference', reference: 'FiscalYear', list: true, show: true, edit: true },
            status: { label: 'สถานะ', type: 'select', list: true, show: true, edit: true, options: ['รอดำเนินการ', 'กำลังดำเนินการ', 'เสร็จสิ้น'] },
            owner_id: { label: 'เจ้าของ', type: 'reference', reference: 'Owner', list: true, show: true, edit: true },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    },
    RiskZone: {
        name: 'RiskZone',
        label: 'งานระวางที่สาธารณะ',
        labelPlural: 'งานระวางที่สาธารณะ',
        icon: 'bi-exclamation-triangle',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            zone_code: { label: 'รหัสโครงการ', type: 'string', list: true, show: true, edit: true, placeholder: 'เช่น ตง.ถ.2-0030' },
            zoneType: { label: 'ประเภทพื้นที่', type: 'string', list: true, show: true, edit: true, required: true, placeholder: 'เช่น ถนนสายควนหาญ' },
            description: { label: 'รายละเอียด', type: 'textarea', list: true, show: true, edit: true },
            fiscalYearId: { label: 'ปีงบประมาณ', type: 'reference', reference: 'FiscalYear', list: true, show: true, edit: true },
            status: { label: 'สถานะ', type: 'select', list: true, show: true, edit: true, options: ['รอดำเนินการ', 'กำลังดำเนินการ', 'เสร็จสิ้น'] },
            owner_id: { label: 'เจ้าของ', type: 'reference', reference: 'Owner', list: true, show: true, edit: true },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    },
    ZoningPlan: {
        name: 'ZoningPlan',
        label: 'แผนผังเมือง',
        labelPlural: 'แผนผังเมือง',
        icon: 'bi-map',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            areaName: { label: 'ชื่อพื้นที่', type: 'string', list: true, show: true, edit: true, required: true },
            notes: { label: 'หมายเหตุ', type: 'textarea', list: true, show: true, edit: true },
            fiscalYearId: { label: 'ปีงบประมาณ', type: 'reference', reference: 'FiscalYear', list: true, show: true, edit: true },
            status: { label: 'สถานะ', type: 'select', list: true, show: true, edit: true, options: ['รอดำเนินการ', 'กำลังดำเนินการ', 'เสร็จสิ้น'] },
            owner_id: { label: 'เจ้าของ', type: 'reference', reference: 'Owner', list: true, show: true, edit: true },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    },
    BuildPlan: {
        name: 'BuildPlan',
        label: 'อาคารทรงคุณค่า',
        labelPlural: 'อาคารทรงคุณค่า',
        icon: 'bi-bank',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            areabuild: { label: 'พื้นที่อาคาร', type: 'string', list: true, show: true, edit: true, required: true },
            notes: { label: 'หมายเหตุ', type: 'textarea', list: true, show: true, edit: true },
            user_id: { label: 'ผู้รับผิดชอบ', type: 'reference', reference: 'User', list: true, show: true, edit: true },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    },
    PlanProject: {
        name: 'PlanProject',
        label: 'แผนโครงการ',
        labelPlural: 'แผนโครงการ',
        icon: 'bi-clipboard-data',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            code: { label: 'รหัสโครงการ', type: 'string', list: true, show: true, edit: true, required: true },
            name: { label: 'ชื่อโครงการ', type: 'string', list: true, show: true, edit: true, required: true },
            category: { label: 'หมวดหมู่', type: 'string', list: true, show: true, edit: true },
            startDate: { label: 'วันที่เริ่ม', type: 'date', list: true, show: true, edit: true },
            endDate: { label: 'วันที่สิ้นสุด', type: 'date', list: true, show: true, edit: true },
            supervisor: { label: 'ผู้รับผิดชอบ', type: 'string', list: true, show: true, edit: true },
            budget: { label: 'งบประมาณ', type: 'number', list: true, show: true, edit: true },
            status: { label: 'สถานะ', type: 'select', list: true, show: true, edit: true, options: ['รอดำเนินการ', 'กำลังดำเนินการ', 'เสร็จสิ้น', 'ยกเลิก'] },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    },
    ApprovedProject: {
        name: 'ApprovedProject',
        label: 'โครงการที่อนุมัติ',
        labelPlural: 'โครงการที่อนุมัติ',
        icon: 'bi-check-circle',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            title_project: { label: 'ชื่อโครงการ', type: 'string', list: true, show: true, edit: true, required: true },
            category: { label: 'หมวดหมู่', type: 'string', list: true, show: true, edit: true },
            supervisor: { label: 'ผู้รับผิดชอบ', type: 'string', list: true, show: true, edit: true },
            budget: { label: 'งบประมาณ', type: 'number', list: true, show: true, edit: true },
            status: { label: 'สถานะ', type: 'select', list: true, show: true, edit: true, options: ['อนุมัติ', 'รอดำเนินการ', 'เสร็จสิ้น'] },
            approvedDate: { label: 'วันที่อนุมัติ', type: 'date', list: true, show: true, edit: true },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    },
    Map: {
        name: 'Map',
        label: 'แผนที่',
        labelPlural: 'แผนที่',
        icon: 'bi-geo-alt',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            name_local: { label: 'ชื่อสถานที่', type: 'string', list: true, show: true, edit: true, required: true },
            house_no: { label: 'บ้านเลขที่', type: 'string', list: true, show: true, edit: true },
            village_no: { label: 'หมู่ที่', type: 'string', list: false, show: true, edit: true },
            soi: { label: 'ซอย', type: 'string', list: false, show: true, edit: true },
            road: { label: 'ถนน', type: 'string', list: false, show: true, edit: true },
            subdistrict: { label: 'ตำบล', type: 'string', list: false, show: true, edit: true },
            district: { label: 'อำเภอ', type: 'string', list: false, show: true, edit: true },
            province: { label: 'จังหวัด', type: 'string', list: false, show: true, edit: true },
            lat: { label: 'ละติจูด', type: 'number', list: true, show: true, edit: true },
            lng: { label: 'ลองจิจูด', type: 'number', list: true, show: true, edit: true },
            geoJsonData: { label: 'GeoJSON', type: 'json', list: false, show: true, edit: true },
            images: { label: 'รูปภาพ', type: 'file', list: false, show: true, edit: true },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    },
    Uploads: {
        name: 'Uploads',
        label: 'อัปโหลด',
        labelPlural: 'ไฟล์อัปโหลด',
        icon: 'bi-cloud-upload',
        fields: {
            id: { label: 'ID', type: 'number', list: false, show: true, edit: false },
            namefile: { label: 'ชื่อไฟล์', type: 'string', list: true, show: true, edit: true, required: true },
            url: { label: 'URL', type: 'string', list: true, show: true, edit: true },
            fileType: { label: 'ประเภทไฟล์', type: 'string', list: true, show: true, edit: true },
            size: { label: 'ขนาด (bytes)', type: 'number', list: true, show: true, edit: true },
            token: { label: 'Token', type: 'string', list: false, show: true, edit: true },
            createdAt: { label: 'สร้างเมื่อ', type: 'datetime', list: true, show: true, edit: false }
        }
    }
};

// Navigation menu structure
const NAV_MENU = [
    { type: 'header', label: 'หน้าหลัก' },
    { resource: null, label: 'แดชบอร์ด', icon: 'bi-speedometer2', path: 'dashboard.html' },
    { type: 'header', label: 'ข้อมูลหลัก' },
    { resource: 'User', label: 'ผู้ใช้งาน', icon: 'bi-people' },
    { resource: 'Owner', label: 'เจ้าของกรรมสิทธิ์', icon: 'bi-person-badge' },
    { resource: 'FiscalYear', label: 'ปีงบประมาณ', icon: 'bi-calendar' },
    { type: 'header', label: 'งานควบคุม' },
    { resource: 'BuildingControl', label: 'งานควบคุมอาคาร', icon: 'bi-building' },
    { resource: 'RiskZone', label: 'งานระวางที่สาธารณะ', icon: 'bi-exclamation-triangle' },
    { resource: 'ZoningPlan', label: 'แผนผังเมือง', icon: 'bi-map' },
    { resource: 'BuildPlan', label: 'อาคารทรงคุณค่า', icon: 'bi-bank' },
    { type: 'header', label: 'โครงการ' },
    { resource: 'PlanProject', label: 'แผนโครงการ', icon: 'bi-clipboard-data' },
    { resource: 'ApprovedProject', label: 'โครงการที่อนุมัติ', icon: 'bi-check-circle' },
    { type: 'header', label: 'อื่นๆ' },
    { resource: 'Map', label: 'แผนที่', icon: 'bi-geo-alt' },
    { resource: 'Uploads', label: 'อัปโหลด', icon: 'bi-cloud-upload' }
];

// Get resource path for URL
function getResourcePath(resourceName) {
    const pathMap = {
        'User': 'user',
        'Owner': 'owner',
        'FiscalYear': 'fiscal-year',
        'BuildingControl': 'building-control',
        'RiskZone': 'risk-zone',
        'ZoningPlan': 'zoning-plan',
        'BuildPlan': 'build-plan',
        'PlanProject': 'plan-project',
        'ApprovedProject': 'approved-project',
        'Map': 'map',
        'Uploads': 'uploads'
    };
    return pathMap[resourceName] || resourceName.toLowerCase();
}

// Get resource name from path
function getResourceFromPath(path) {
    const resourceMap = {
        'user': 'User',
        'owner': 'Owner',
        'fiscal-year': 'FiscalYear',
        'building-control': 'BuildingControl',
        'risk-zone': 'RiskZone',
        'zoning-plan': 'ZoningPlan',
        'build-plan': 'BuildPlan',
        'plan-project': 'PlanProject',
        'approved-project': 'ApprovedProject',
        'map': 'Map',
        'uploads': 'Uploads'
    };
    return resourceMap[path] || null;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_BASE_URL, RESOURCES, NAV_MENU, getResourcePath, getResourceFromPath };
}
