
/* import { createPrismaClient } from '../config/database.js'
import { addComponent } from '../config/loder.js'
const prisma = createPrismaClient() */

/* async function getStatusAvailableValues() {
  const status = await prisma.status.findMany({
    select: { id: true, name_titel: true } // 👈 ใช้ field ที่ตรงกับ Prisma schema
  })

  return status.map(o => ({
    value: o.name_titel,
    label: o.name_titel
  }))
} */
/* const options_projectgroup = {
    navigation: {
        name: 'ฝ่ายควบคุมการก่อสร้าง',
        icon: 'Home',
    },
     // ✅ จัดลำดับคอลัมน์ใน List
  listProperties: [
    'license_number',
    'title_project',
    'category',
    'description',
    'quantity',
    'status'
  ],
  // ✅ จัดลำดับคอลัมน์ใน Form (edit/new)
  editProperties: [
    'license_number',
    'title_project',
    'category',
    'description',
    'quantity',
    'status'
  ],
  // ✅ หน้า Show
  showProperties: [
    'license_number',
    'title_project',
    'category',
    'description',
    'quantity',
    'status'
  ],
  // ✅ filter ก็เรียงได้
  filterProperties: [
    'license_number',
    'title_project',
    'category',
    'status'
  ],

    properties: {
        license_number: {
            type: 'text',
            isRequired: false,
            props: { placeholder: 'เลขที่อนุญาต' },
        },
        title_project: {
            type: 'select',
            availableValues:[
                {
                    value: '1',
                    label: 'รายละเอียดโครงการเทศบาลฯที่บรรจุเข้าแผนแล้ว'
                },
                {
                    value: '2',
                    label: 'รายละเอียดโครงการที่ได้รับอนุมัติจากผู้บริหาร'
                }
            ],
            isRequired: true,
            props: { placeholder: 'เลือกโครงการ' },
        },
        category: {
            type: 'text',
            isRequired: false,
            props: { placeholder: 'เลือกประเภทเอกสาร' },
            type: 'select',
            availableValues:[
                {
                    value: '1',
                    label: '1.รูปแบบรายการงานก่อสร้าง'
                },
                {
                    value: '2',
                    label: '2.ราคากลางงานก่อสร้าง'
                }
            ],
        },
        description:{
            type: 'text',
            isRequired: false,
            props: { placeholder: 'รายละเอียดโครงการ' },
        },
        quantity: {
            type: 'number',
            isRequired: false,
         
        },
        status: {
        availableValues: [
            { value: 'รอดำเนินการ', label: 'รอดำเนินการ' },
            { value: 'กำลังดำเนินการ', label: 'กำลังดำเนินการ' },
            { value: 'เสร็จสิ้น', label: 'เสร็จสิ้น' },
        ],
          }
    },
}

export default options_projectgroup;
 */