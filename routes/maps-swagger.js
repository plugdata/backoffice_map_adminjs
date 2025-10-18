/**
 * @swagger
 * components:
 *   schemas:
 *     Map:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID ของ Map
 *         latitude:
 *           type: number
 *           format: float
 *           description: ละติจูด
 *         longitude:
 *           type: number
 *           format: float
 *           description: ลองจิจูด
 *         name_local:
 *           type: string
 *           description: ชื่อสถานที่
 *         house_no:
 *           type: string
 *           description: บ้านเลขที่
 *         road:
 *           type: string
 *           description: ถนน
 *         subdistrict:
 *           type: string
 *           description: ตำบล/แขวง
 *         district:
 *           type: string
 *           description: อำเภอ/เขต
 *         province:
 *           type: string
 *           description: จังหวัด
 *         postcode:
 *           type: string
 *           description: รหัสไปรษณีย์
 *         buildingControl:
 *           $ref: '#/components/schemas/BuildingControlWithYear'
 *     
 *     BuildingControlWithYear:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID ของ BuildingControl
 *         building_type:
 *           type: string
 *           description: ประเภทอาคาร
 *         use_purpose:
 *           type: string
 *           description: วัตถุประสงค์การใช้งาน
 *         fiscalYearId:
 *           type: integer
 *           description: ID ของปีงบประมาณ
 *         year:
 *           type: integer
 *           description: ปีงบประมาณ (เช่น 2567)
 *     
 *     MapResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: สถานะการทำงาน
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Map'
 *         message:
 *           type: string
 *           description: ข้อความตอบกลับ
 *         total:
 *           type: integer
 *           description: จำนวนข้อมูลทั้งหมด
 *     
 *     BuildingControl:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         building_type:
 *           type: string
 *         use_purpose:
 *           type: string
 *         status:
 *           type: string
 *         maps:
 *           type: object
 *     
 *     RiskZone:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         zoneType:
 *           type: string
 *         description:
 *           type: string
 *         maps:
 *           type: object
 *     
 *     BuildingResponse:
 *       type: object
 *       properties:
 *         building:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BuildingControl'
 *         riskZones:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RiskZone'
 *     
 *     BuildingWithYear:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         building_type:
 *           type: string
 *         use_purpose:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         fiscalYearId:
 *           type: integer
 *         year:
 *           type: integer
 *           description: ปีงบประมาณ
 *     
 *     BuildingListResponse:
 *       type: object
 *       properties:
 *         building:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BuildingWithYear'
 *         filterYear:
 *           type: integer
 *           nullable: true
 *           description: ปีที่ใช้กรองข้อมูล
 */

/**
 * @swagger
 * /api/maps:
 *   get:
 *     summary: ดึงข้อมูล Building Control และ Risk Zone
 *     description: ดึงข้อมูลอาคารควบคุมและเขตเสี่ยงตามปีงบประมาณและจังหวัด
 *     tags:
 *       - Maps
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: ปีงบประมาณ
 *         example: 2567
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *         description: ชื่อจังหวัด
 *         example: "กรุงเทพมหานคร"
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BuildingResponse'
 *             examples:
 *               with_filters:
 *                 summary: กรองตามปีและจังหวัด
 *                 value:
 *                   building:
 *                     - id: 1
 *                       building_type: "อาคารพาณิชย์"
 *                       use_purpose: "ร้านค้า"
 *                       status: "อนุมัติ"
 *                       maps:
 *                         id: 1
 *                         name_local: "ศูนย์การค้า"
 *                         province: "กรุงเทพมหานคร"
 *                   riskZones:
 *                     - id: 1
 *                       zoneType: "เขตเสี่ยงน้ำท่วม"
 *                       description: "พื้นที่เสี่ยงน้ำท่วมสูง"
 *                       maps:
 *                         id: 2
 *                         name_local: "พื้นที่เสี่ยง"
 *               all_data:
 *                 summary: ข้อมูลทั้งหมด
 *                 value:
 *                   building: []
 *                   riskZones: []
 *       500:
 *         description: เกิดข้อผิดพลาดในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */

/**
 * @swagger
 * /api/maps/local:
 *   get:
 *     summary: ดึงข้อมูล Map แบบ Multi-Layer
 *     description: |
 *       API สำหรับดึงข้อมูล Map ที่มี 3 layers:
 *       1. GET ข้อมูลทั้งหมด (ไม่มี query parameters)
 *       2. ค้นหาตาม keyword (q parameter)
 *       3. ค้นหาตาม location (latitude, longitude)
 *     tags:
 *       - Maps
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: คำค้นหา (ค้นหาในทุก field)
 *         example: "นายก"
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *           format: float
 *         description: ละติจูด
 *         example: 7.5
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *           format: float
 *         description: ลองจิจูด
 *         example: 99.6
 *       - in: query
 *         name: name_local
 *         schema:
 *           type: string
 *         description: ชื่อสถานที่ (เฉพาะเมื่อใช้กับ latitude/longitude)
 *         example: "บางส่วน"
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MapResponse'
 *             examples:
 *               all_data:
 *                 summary: ข้อมูลทั้งหมด
 *                 value:
 *                   success: true
 *                   data: [
 *                     {
 *                       id: 1,
 *                       latitude: 7.566557,
 *                       longitude: 99.62328,
 *                       name_local: "สถานที่ 1",
 *                       house_no: "123/45",
 *                       road: "ถนนสุขุมวิท",
 *                       subdistrict: "คลองตัน",
 *                       district: "วัฒนา",
 *                       province: "กรุงเทพมหานคร",
 *                       postcode: "10110",
 *                       buildingControl: {
 *                         id: 1,
 *                         building_type: "อาคารพาณิชย์",
 *                         use_purpose: "ร้านค้า",
 *                         fiscalYearId: 2,
 *                         year: 2567
 *                       }
 *                     }
 *                   ]
 *                   message: "ดึงข้อมูล Map + BuildingControl ทั้งหมดสำเร็จ"
 *                   total: 1
 *               search_result:
 *                 summary: ผลการค้นหา
 *                 value:
 *                   success: true
 *                   data: [
 *                     {
 *                       id: 1,
 *                       latitude: 7.566557,
 *                       longitude: 99.62328,
 *                       name_local: "นายก อบต.",
 *                       house_no: "123/45",
 *                       road: "ถนนสุขุมวิท",
 *                       subdistrict: "คลองตัน",
 *                       district: "วัฒนา",
 *                       province: "กรุงเทพมหานคร",
 *                       postcode: "10110",
 *                       buildingControl: {
 *                         id: 1,
 *                         building_type: "อาคารราชการ",
 *                         use_purpose: "สำนักงาน",
 *                         fiscalYearId: 2,
 *                         year: 2567
 *                       }
 *                     }
 *                   ]
 *                   message: "ดึงข้อมูล Map + BuildingControl สำเร็จ"
 *                   total: 1
 *       400:
 *         description: พารามิเตอร์ไม่ครบถ้วน
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "กรุณาระบุ latitude และ longitude"
 *                 error:
 *                   type: string
 *                   example: "Missing required parameters"
 *       500:
 *         description: เกิดข้อผิดพลาดในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "เกิดข้อผิดพลาดในการดึงข้อมูล Map"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */

/**
 * @swagger
 * /api/maps/building:
 *   get:
 *     summary: ดึงข้อมูลอาคารควบคุมพร้อมปีงบประมาณ
 *     description: ดึงข้อมูลอาคารควบคุมทั้งหมด หรือกรองตามปีงบประมาณ พร้อมข้อมูลปีงบประมาณ
 *     tags:
 *       - Maps
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: ปีงบประมาณสำหรับกรองข้อมูล
 *         example: 2567
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BuildingListResponse'
 *             examples:
 *               with_year_filter:
 *                 summary: กรองตามปี
 *                 value:
 *                   building:
 *                     - id: 1
 *                       building_type: "อาคารพาณิชย์"
 *                       use_purpose: "ร้านค้า"
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       fiscalYearId: 2
 *                       year: 2567
 *                   filterYear: 2567
 *               all_buildings:
 *                 summary: ข้อมูลทั้งหมด
 *                 value:
 *                   building:
 *                     - id: 1
 *                       building_type: "อาคารพาณิชย์"
 *                       use_purpose: "ร้านค้า"
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       fiscalYearId: 2
 *                       year: 2567
 *                     - id: 2
 *                       building_type: "อาคารที่พักอาศัย"
 *                       use_purpose: "บ้านพัก"
 *                       createdAt: "2024-02-20T14:15:00Z"
 *                       fiscalYearId: 1
 *                       year: 2566
 *                   filterYear: null
 *       500:
 *         description: เกิดข้อผิดพลาดในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * tags:
 *   - name: Maps
 *     description: API สำหรับจัดการข้อมูลแผนที่
 */

export default {}
