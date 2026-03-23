import titles from './keepdata/titles.js'

import { ValidationError } from "adminjs"
import { joinString , getProvinces , getAmphoes } from './owner/joinString.js'
import { createPrismaClient } from '../config/database.js'
import { backButton } from './feature/back-button.js'

const prisma = createPrismaClient()

const validateCitizenId = async (request, context) => {
  const { payload = {}, method } = request

  // validate เฉพาะ post (new) หรือ put (edit)
  if (method !== "post" && method !== "put") return request

  const { number_no } = payload
  const errors = {}

  // ดึง id ของ record ที่แก้ไขอยู่ (กรณี edit)
  const currentId = context?.record?.params?.id

  // ตรวจสอบว่ามีค่า
  if (!number_no || number_no.trim().length === 0) {
    errors.number_no = {
      message: "กรุณากรอกหมายเลขบัตรประชาชน",
    }
  } else {
    // ตรวจสอบเลขบัตรซ้ำ
    const existingOwner = await prisma.owner.findFirst({
      where: { number_no: number_no },
    })

    if (existingOwner && existingOwner.id !== Number(currentId)) {
      errors.number_no = {
        message: "หมายเลขบัตรประชาชนนี้มีอยู่ในระบบแล้ว",
      }
    }
  }

  if (Object.keys(errors).length) {
    throw new ValidationError(errors)
  }

  return request
}



const options_owner = {
    navigation: {
        name: 'เจ้าของกรรมสิทธิ์',
        icon: 'User',
    },
    listProperties: [
      'title_owner',
      'first_name',
      'last_name',
      'number_no',
      'phone',
      'no_id',
      'address',
      'org_name',
      'org_address',
     ],
    filterProperties: [
      'first_name',
      'last_name',
      'number_no',
      'phone',
      'province',
      'district',
      'subdistrict',
      'org_name'
    ],
    
    properties: {
        title_owner: {
            type: 'text',
            isRequired: true,
              availableValues: titles ,// เอา array มาใส่ตรง ๆ
            props: { placeholder: 'เลือกคำนำหน้า' },
            },
                first_name: {
                    type: 'text',
                    isRequired: true,
                },
                last_name: {
                    type: 'text',
                    isRequired: true,
                },
                number_no:{
                  type:'text',
                  props: { placeholder: 'กรุณากรอกหมายเลขบัตรประชาชน 13 หลัก' ,
                    pattern: '\\d{13}',
                    title: 'กรุณากรอกหมายเลขบัตรประชาชน 13 หลัก'
                  },
                },
                phone: {
                  type: 'string',   // 👉 ใช้ 'string' หรือ 'text' ก็ได้ (AdminJS รองรับ type string สำหรับ field input)
                  isRequired: true,
                  props: { 
                    placeholder: 'กรอกเฉพาะตัวเลข 8–10 หลัก',
                    pattern: '^\\d{8,10}$', // 👈 regex ให้ตรง
                    title: 'กรุณากรอกหมายเลขโทรศัพท์ 8–10 หลัก'
                 
                  },
                },
                owner_type: {
                  type: 'string',
                },
                
                no_id: {
                    type: 'number',
                    isRequired: true,
                    props: { placeholder: 'กรอกเฉพาะตัวเลข' },
                },
                address: {
                  isVisible: { list: true, show: true, edit: true, filter: true },
                  type: 'richtext', // ใช้ TipTap editor
                
                },
                road: {
                    type: 'text',
                  
                },
                //ตำบล
                subdistrict: {
                  isVisible: { list: false, show: true, edit: false, filter: false },
                    type: 'string',   // ต้องเป็น string
                },
                //อำเภอ
                district: {
                    type: 'string',
                   isVisible: { list: false, show: true, edit: false, filter: false },
                    props: {
                        placeholder: 'ค้นหาอำเภอ/เขต',
                    },
                  },
                  //จังหวัด
                 /*  province: {
                    type: 'string',   // 👈 ต้องเป็น string
                    components: { edit: 'AddressSelect' },
                    props: { 
                      placeholder: 'ค้นหาจังหวัด',
                    }
                  }, */
                  province: {
                    type: 'string',
                    props: {
                      placeholder: 'ค้นหาจังหวัด',

                    }
                  },
                 
                postcode: {
                    type: 'text',
                    props: { 
                        placeholder: 'ค้นหารหัสไปรษณีย์',
           
                    },
                },
                org_name: {
                    type: 'text',
                   
                },
                org_address: {
                    type: 'text',            
                },
                
                created_at: {
                    type: 'date',
                    isVisible: false,
                },
  },
  actions: {
กลับรายการหลัก:backButton,
    new: {
      before: [validateCitizenId],
      layout: [
        [{ width: 3 / 3, mx: 'auto' }, [
          ['@H3', { children: 'ข้อมูลเจ้าของ' }],
          [{ flexDirection: 'row', flex: true, gap: 'sm' }, [
            ['title_owner', { flexGrow: 1, pr: 'default' }],
            ['first_name', { flexGrow: 1, pr: 'default' }],
            ['last_name', { flexGrow: 1 }],
          ]],
          [{ flexDirection: 'row', flex: true, gap: 'sm' }, [
            ['number_no', { flexGrow: 1, pr: 'default' }],
            ['phone', { flexGrow: 1, pr: 'default' }],
            ['owner_type', { flexGrow: 1, pr: 'default' }],
          
          ]],
          ['@H3', { children: 'ที่อยู่' }],
          [{ flexDirection: 'row', flex: true, gap: 'sm' }, [
            ['no_id', { flexGrow: 1, pr: 'default' }],
            ['road', { flexGrow: 1, pr: 'default' }],
            ['subdistrict', { flexGrow: 1, pr: 'default' }],
            
          ]],
          [{ flexDirection: 'row', flex: true, gap: 'sm' }, [
            ['district', { flexGrow: 1, pr: 'default' }],
            ['province', { flexGrow: 1, pr: 'default' }],
            ['postcode', { flexGrow: 1 }],
          ]],
          ['@H3', { children: 'ข้อมูลองค์กร' }],
          'org_name',
          'org_address',
        ]],
      ],
    },
    edit: {
      before: [validateCitizenId],
      layout: [
        [{ width: 3 / 3, mx: 'auto' }, [
          ['@H3', { children: 'ข้อมูลเจ้าของ' }],
          [{ flexDirection: 'row', flex: true, gap: 'sm' }, [
            ['title_owner', { flexGrow: 1, pr: 'default' }],
            ['first_name', { flexGrow: 1, pr: 'default' }],
            ['last_name', { flexGrow: 1 }],
          ]],
          [{ flexDirection: 'row', flex: true, gap: 'sm' }, [
            ['number_no', { flexGrow: 1, pr: 'default' }],
            ['phone', { flexGrow: 1, pr: 'default' }],
            ['owner_type', { flexGrow: 1, pr: 'default' }],
          ]],
          ['@H3', { children: 'ที่อยู่' }],
          [{ flexDirection: 'row', flex: true, gap: 'sm' }, [
            ['no_id', { flexGrow: 1, pr: 'default' }],
            ['road', { flexGrow: 1, pr: 'default' }],
            ['subdistrict', { flexGrow: 1, pr: 'default' }],
            
          ]],
          [{ flexDirection: 'row', flex: true, gap: 'sm' }, [
            ['district', { flexGrow: 1, pr: 'default' }],
            ['province',  { flexGrow: 1, pr: 'default' }],
            ['postcode', { flexGrow: 1 }],
          ]],
          ['@H3', { children: 'ข้อมูลองค์กร' }],
          'org_name',
          'org_address',
        ]],
      ],
    },
    show: { },
    delete: { isAccessible: true },
    list:{after: joinString},
  },
}
export default options_owner;