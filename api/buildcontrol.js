// /resources/buildingControl/options.js
import { getStatusAvailableValues, getFullname, getFiscalYear } from './buildingControl/helpers.js'
import { actions_buildcontrol } from './buildingControl/actions.js'


const options_buildcontrol = {
  navigation: {
    name: 'ฝ่ายควบคุมอาคาร',
    icon: 'Home',
  },
  listProperties: [
    'building_type',
    'use_purpose',
    'license_number',
    'status',
    'fiscalYearId',
    'owner_id',
  ],
 
  properties: {
     // ========================================
    // 📄 ข้อมูลอาคาร (Building Information)
    // ========================================
    building_type: {
      type: 'string',
      isVisible: { list: true, show: true, edit: true, filter: true },
    },
    use_purpose: {
      type: 'string',
      isVisible: { list: true, show: true, edit: true, filter: true },
      availableValues: [
        {value: "1", label: "การขออนุญาตตาม พ.ร.บ. ควบคุมอาคาร พ.ศ.2522"},
        {value: "2", label: "อาคารประเภทควบคุมการใช้ (ม.32)"},
        {value: "3", label: "อาคารที่ต้องจัดให้มีผู้ตรวจสอบ (ม.32 ทวิ)"},
        {value: "4", label: "อาคารที่ต้องจัดให้มีประกันภัย (ม.32 ตรี)"},
        {value: "5", label: "กรณีร้องทุกข์กล่าวโทษ"},
       ]
    },
    license_number: {
      type: 'string',
      isVisible: { list: true, show: true, edit: true, filter: true },
    },
    quantity: {
      type: 'number',
      isVisible: { list: true, show: true, edit: true, filter: true },
    },

    status: {
      type: 'select',
      availableValues: await getStatusAvailableValues(),
      isVisible: { list: true, show: true, edit: true, filter: true },
     // components: { list: 'StatusBadge' , show: 'StatusBadge'  },
    },

    uploadfile: {
      type: 'mixed',
   //   components: { edit: 'UploadFile' , show: 'Showupload' },
      isVisible: { list: false, show: false, edit: true, filter: false },
    },
     map: {
      isVisible: { list: false, show: true, edit: true, filter: false },
    }, 
    
     // 📅 ปีงบประมาณ
     fiscalYearId: {
      type: 'select',
      availableValues: await getFiscalYear(),
      isVisible: { list: true, show: true, edit: true, filter: true },
    },
   
    // 👤 เจ้าของ
    owner_id: {
      type: 'select',
      availableValues: await getFullname(),
      isVisible: { list: true, show: true, edit: true, filter: true },
    },

  
  },

  actions: actions_buildcontrol,
}

export default options_buildcontrol
