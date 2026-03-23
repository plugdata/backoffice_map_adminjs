import { ValidationError } from 'adminjs'
import { createPrismaClient } from '../config/database.js'

const prisma = createPrismaClient()

const options_fiscalyear = {
  navigation: {
    name: 'ตั้งค่าระบบ',
    icon: 'Settings',
  },
  properties: {
    year: {
      type: 'number',
      isTitle: true,
      isRequired: true,
      props: {
        placeholder: 'กรอกเฉพาะตัวเลข',
        pattern: '\\d{4}',
        title: 'กรุณากรอกปีงบประมาณ 4 หลัก',
      },
      description: 'ปีงบประมาณต้องไม่ซ้ำ',
    },
    detail: {
      type: 'text',
    },
  },
  actions: {
    new: {
      showInDrawer: true,
      before: async (request) => {
        const year = request.payload?.year
        if (year) {
          const exists = await prisma.fiscalYear.findFirst({
            where: { year: Number(year) },
          })
          if (exists) {
            throw new ValidationError({
              year: {
                message: 'ปีงบประมาณนี้มีอยู่แล้วในระบบ',
              },
            })
          }
        }
        return request
      },
    },
    edit: {
      showInDrawer: true,
      before: async (request, context) => {
        const year = request.payload?.year
        const recordId = context.record?.params?.id
        if (year) {
          const exists = await prisma.fiscalYear.findFirst({
            where: {
              year: Number(year),
              NOT: { id: Number(recordId) },
            },
          })
          if (exists) {
            throw new ValidationError({
              year: {
                message: 'ปีงบประมาณนี้มีอยู่แล้วในระบบ',
              },
            })
          }
        }
        return request
      },
    },
    show: {
      showInDrawer: true,
    },
  },
}

export default options_fiscalyear
