/**
 * @swagger
 * tags:
 *   - name: AdminJS - User
 *     description: API จัดการผู้ใช้งานระบบ
 *   - name: AdminJS - Owner
 *     description: API จัดการเจ้าของกรรมสิทธิ์
 *   - name: AdminJS - FiscalYear
 *     description: API จัดการปีงบประมาณ
 *   - name: AdminJS - BuildingControl
 *     description: API ฝ่ายควบคุมอาคาร
 *   - name: AdminJS - RiskZone
 *     description: API พื้นที่เสี่ยงภัย
 *   - name: AdminJS - ZoningPlan
 *     description: API ผังเมือง
 *   - name: AdminJS - BuildPlan
 *     description: API แผนก่อสร้าง
 *   - name: AdminJS - PlanProject
 *     description: API โครงการวางแผน
 *   - name: AdminJS - ApprovedProject
 *     description: API โครงการที่อนุมัติ
 *   - name: AdminJS - Map
 *     description: API ข้อมูลแผนที่/พิกัด
 *   - name: AdminJS - Uploads
 *     description: API ไฟล์อัปโหลด
 */

// ==================== USER ====================
/**
 * @swagger
 * /admin/api/resources/User/actions/list:
 *   get:
 *     summary: ดึงรายการผู้ใช้ทั้งหมด
 *     tags: [AdminJS - User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: หน้าที่ต้องการ
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *         description: จำนวนต่อหน้า
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: field ที่ต้องการเรียง
 *       - in: query
 *         name: direction
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: ทิศทางการเรียง
 *     responses:
 *       200:
 *         description: สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminJSListResponse'
 */

/**
 * @swagger
 * /admin/api/resources/User/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดผู้ใช้
 *     tags: [AdminJS - User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของผู้ใช้
 *     responses:
 *       200:
 *         description: สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminJSRecordResponse'
 */

/**
 * @swagger
 * /admin/api/resources/User/actions/new:
 *   post:
 *     summary: สร้างผู้ใช้ใหม่
 *     tags: [AdminJS - User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/User/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลผู้ใช้
 *     tags: [AdminJS - User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/User/records/{id}/delete:
 *   post:
 *     summary: ลบผู้ใช้
 *     tags: [AdminJS - User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/User/actions/search:
 *   get:
 *     summary: ค้นหาผู้ใช้
 *     tags: [AdminJS - User]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: คำค้นหา
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

// ==================== OWNER ====================
/**
 * @swagger
 * /admin/api/resources/Owner/actions/list:
 *   get:
 *     summary: ดึงรายการเจ้าของกรรมสิทธิ์ทั้งหมด
 *     tags: [AdminJS - Owner]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: filters.province
 *         schema:
 *           type: string
 *         description: กรองตามจังหวัด
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Owner/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดเจ้าของกรรมสิทธิ์
 *     tags: [AdminJS - Owner]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Owner/actions/new:
 *   post:
 *     summary: สร้างเจ้าของกรรมสิทธิ์ใหม่
 *     tags: [AdminJS - Owner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OwnerInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Owner/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลเจ้าของกรรมสิทธิ์
 *     tags: [AdminJS - Owner]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OwnerInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Owner/records/{id}/delete:
 *   post:
 *     summary: ลบเจ้าของกรรมสิทธิ์
 *     tags: [AdminJS - Owner]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Owner/actions/search:
 *   get:
 *     summary: ค้นหาเจ้าของกรรมสิทธิ์
 *     tags: [AdminJS - Owner]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

// ==================== FISCAL YEAR ====================
/**
 * @swagger
 * /admin/api/resources/FiscalYear/actions/list:
 *   get:
 *     summary: ดึงรายการปีงบประมาณทั้งหมด
 *     tags: [AdminJS - FiscalYear]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/FiscalYear/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดปีงบประมาณ
 *     tags: [AdminJS - FiscalYear]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/FiscalYear/actions/new:
 *   post:
 *     summary: สร้างปีงบประมาณใหม่
 *     tags: [AdminJS - FiscalYear]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FiscalYearInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/FiscalYear/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลปีงบประมาณ
 *     tags: [AdminJS - FiscalYear]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FiscalYearInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/FiscalYear/records/{id}/delete:
 *   post:
 *     summary: ลบปีงบประมาณ
 *     tags: [AdminJS - FiscalYear]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

// ==================== BUILDING CONTROL ====================
/**
 * @swagger
 * /admin/api/resources/BuildingControl/actions/list:
 *   get:
 *     summary: ดึงรายการควบคุมอาคารทั้งหมด
 *     tags: [AdminJS - BuildingControl]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: filters.status
 *         schema:
 *           type: string
 *         description: กรองตามสถานะ
 *       - in: query
 *         name: filters.fiscalYearId
 *         schema:
 *           type: integer
 *         description: กรองตามปีงบประมาณ
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/BuildingControl/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดควบคุมอาคาร
 *     tags: [AdminJS - BuildingControl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/BuildingControl/actions/new:
 *   post:
 *     summary: สร้างข้อมูลควบคุมอาคารใหม่
 *     tags: [AdminJS - BuildingControl]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuildingControlInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/BuildingControl/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลควบคุมอาคาร
 *     tags: [AdminJS - BuildingControl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuildingControlInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/BuildingControl/records/{id}/delete:
 *   post:
 *     summary: ลบข้อมูลควบคุมอาคาร
 *     tags: [AdminJS - BuildingControl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/BuildingControl/actions/search:
 *   get:
 *     summary: ค้นหาข้อมูลควบคุมอาคาร
 *     tags: [AdminJS - BuildingControl]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

// ==================== RISK ZONE ====================
/**
 * @swagger
 * /admin/api/resources/RiskZone/actions/list:
 *   get:
 *     summary: ดึงรายการพื้นที่เสี่ยงภัยทั้งหมด
 *     tags: [AdminJS - RiskZone]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/RiskZone/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดพื้นที่เสี่ยงภัย
 *     tags: [AdminJS - RiskZone]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/RiskZone/actions/new:
 *   post:
 *     summary: สร้างพื้นที่เสี่ยงภัยใหม่
 *     tags: [AdminJS - RiskZone]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RiskZoneInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/RiskZone/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลพื้นที่เสี่ยงภัย
 *     tags: [AdminJS - RiskZone]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RiskZoneInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/RiskZone/records/{id}/delete:
 *   post:
 *     summary: ลบพื้นที่เสี่ยงภัย
 *     tags: [AdminJS - RiskZone]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

// ==================== ZONING PLAN ====================
/**
 * @swagger
 * /admin/api/resources/ZoningPlan/actions/list:
 *   get:
 *     summary: ดึงรายการผังเมืองทั้งหมด
 *     tags: [AdminJS - ZoningPlan]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/ZoningPlan/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดผังเมือง
 *     tags: [AdminJS - ZoningPlan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/ZoningPlan/actions/new:
 *   post:
 *     summary: สร้างผังเมืองใหม่
 *     tags: [AdminJS - ZoningPlan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZoningPlanInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/ZoningPlan/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลผังเมือง
 *     tags: [AdminJS - ZoningPlan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZoningPlanInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/ZoningPlan/records/{id}/delete:
 *   post:
 *     summary: ลบผังเมือง
 *     tags: [AdminJS - ZoningPlan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

// ==================== BUILD PLAN ====================
/**
 * @swagger
 * /admin/api/resources/BuildPlan/actions/list:
 *   get:
 *     summary: ดึงรายการแผนก่อสร้างทั้งหมด
 *     tags: [AdminJS - BuildPlan]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/BuildPlan/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดแผนก่อสร้าง
 *     tags: [AdminJS - BuildPlan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/BuildPlan/actions/new:
 *   post:
 *     summary: สร้างแผนก่อสร้างใหม่
 *     tags: [AdminJS - BuildPlan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuildPlanInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/BuildPlan/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลแผนก่อสร้าง
 *     tags: [AdminJS - BuildPlan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuildPlanInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/BuildPlan/records/{id}/delete:
 *   post:
 *     summary: ลบแผนก่อสร้าง
 *     tags: [AdminJS - BuildPlan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

// ==================== PLAN PROJECT ====================
/**
 * @swagger
 * /admin/api/resources/PlanProject/actions/list:
 *   get:
 *     summary: ดึงรายการโครงการวางแผนทั้งหมด
 *     tags: [AdminJS - PlanProject]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/PlanProject/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดโครงการวางแผน
 *     tags: [AdminJS - PlanProject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/PlanProject/actions/new:
 *   post:
 *     summary: สร้างโครงการวางแผนใหม่
 *     tags: [AdminJS - PlanProject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanProjectInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/PlanProject/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลโครงการวางแผน
 *     tags: [AdminJS - PlanProject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanProjectInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/PlanProject/records/{id}/delete:
 *   post:
 *     summary: ลบโครงการวางแผน
 *     tags: [AdminJS - PlanProject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

// ==================== APPROVED PROJECT ====================
/**
 * @swagger
 * /admin/api/resources/ApprovedProject/actions/list:
 *   get:
 *     summary: ดึงรายการโครงการที่อนุมัติทั้งหมด
 *     tags: [AdminJS - ApprovedProject]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/ApprovedProject/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดโครงการที่อนุมัติ
 *     tags: [AdminJS - ApprovedProject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/ApprovedProject/actions/new:
 *   post:
 *     summary: สร้างโครงการที่อนุมัติใหม่
 *     tags: [AdminJS - ApprovedProject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApprovedProjectInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/ApprovedProject/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลโครงการที่อนุมัติ
 *     tags: [AdminJS - ApprovedProject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApprovedProjectInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/ApprovedProject/records/{id}/delete:
 *   post:
 *     summary: ลบโครงการที่อนุมัติ
 *     tags: [AdminJS - ApprovedProject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

// ==================== MAP ====================
/**
 * @swagger
 * /admin/api/resources/Map/actions/list:
 *   get:
 *     summary: ดึงรายการข้อมูลแผนที่ทั้งหมด
 *     tags: [AdminJS - Map]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Map/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดข้อมูลแผนที่
 *     tags: [AdminJS - Map]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Map/actions/new:
 *   post:
 *     summary: สร้างข้อมูลแผนที่ใหม่
 *     tags: [AdminJS - Map]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MapInput'
 *     responses:
 *       200:
 *         description: สร้างสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Map/records/{id}/edit:
 *   post:
 *     summary: แก้ไขข้อมูลแผนที่
 *     tags: [AdminJS - Map]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MapInput'
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Map/records/{id}/delete:
 *   post:
 *     summary: ลบข้อมูลแผนที่
 *     tags: [AdminJS - Map]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

// ==================== UPLOADS ====================
/**
 * @swagger
 * /admin/api/resources/Uploads/actions/list:
 *   get:
 *     summary: ดึงรายการไฟล์อัปโหลดทั้งหมด
 *     tags: [AdminJS - Uploads]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Uploads/records/{id}/show:
 *   get:
 *     summary: ดูรายละเอียดไฟล์อัปโหลด
 *     tags: [AdminJS - Uploads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: สำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Uploads/records/{id}/delete:
 *   post:
 *     summary: ลบไฟล์อัปโหลด
 *     tags: [AdminJS - Uploads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

/**
 * @swagger
 * /admin/api/resources/Uploads/bulk/bulkDelete:
 *   post:
 *     summary: ลบไฟล์อัปโหลดหลายรายการ
 *     tags: [AdminJS - Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recordIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["1", "2", "3"]
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

export default {}
