import titles from './keepdata/titles.js'
import { ValidationError } from "adminjs"
import { createPrismaClient } from '../config/database.js'
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
                no_id: {
                    type: 'number',
                    isRequired: true,
                    props: { placeholder: 'กรอกเฉพาะตัวเลข' },
                },
                road: {
                    type: 'text',
                  
                },
                subdistrict: {
                    type: 'text',
                   
                },
                district: {
                    type: 'text',
                    
                },
                province: {
                    type: 'text',
                    
                },
                postcode: {
                    type: 'number',
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
    show: { 
      component: 'OwnerShow',
    },
    delete: { isAccessible: true },
  },
}
export default options_owner;