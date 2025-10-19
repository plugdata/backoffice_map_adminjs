import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // ลบข้อมูลเก่าทั้งหมดตามลำดับความสัมพันธ์
  const tables = [
    'map', 'uploads', 'buildingControl', 'riskZone',
    'zoningPlan', 'planProject', 'approvedProject',
    'owner', 'fiscalYear', 'user', 'workTopic'
  ]
  for (const table of tables) {
    try {
      await prisma[table].deleteMany()
      console.log(`🗑️ Cleaned ${table} data`)
    } catch {
      console.log(`⚠️ Table ${table} does not exist, skipping...`)
    }
  }

  // ---------------- USERS ----------------
  const testAdmin = await prisma.user.create({
    data: {
      username: 'admin',
      password: await bcrypt.hash('12345', 10),
      title_use: 'นาย',
      fullName: 'ผู้ดูแลระบบ (ทดสอบ)',
      email: 'admin@test.com',
      phone: '0811111111',
      role: 'admin',
      position: 'ผู้ดูแลระบบ',
      address: '123 ถนนราชดำเนิน กรุงเทพฯ'
    }
  })

  const admin = await prisma.user.create({
    data: {
      username: 'admin123',
      password: await bcrypt.hash('admin123', 10),
      title_use: 'นาย',
      fullName: 'ผู้ดูแลระบบ',
      email: 'admin@example.com',
      phone: '0811111111',
      role: 'admin',
      position: 'ผู้ดูแลระบบ',
      address: '123 ถนนราชดำเนิน กรุงเทพฯ'
    }
  })

  const officer = await prisma.user.create({
    data: {
      username: 'officer',
      password: await bcrypt.hash('officer123', 10),
      title_use: 'นาง',
      fullName: 'เจ้าหน้าที่ภาคสนาม',
      email: 'officer@example.com',
      phone: '0822222222',
      role: 'officer',
      position: 'เจ้าหน้าที่ภาคสนาม',
      address: '456 ถนนสุขุมวิท กรุงเทพฯ'
    }
  })

  const viewer = await prisma.user.create({
    data: {
      username: 'viewer',
      password: await bcrypt.hash('viewer123', 10),
      title_use: 'นาย',
      fullName: 'ผู้ดูข้อมูล',
      email: 'viewer@example.com',
      phone: '0833333333',
      role: 'viewer',
      position: 'ผู้ดูข้อมูล',
      address: '789 ถนนรัชดาภิเษก กรุงเทพฯ'
    }
  })

  console.log('✅ Created users')

  // ---------------- FISCAL YEARS ----------------
  const fy2567 = await prisma.fiscalYear.create({ data: { year: 2567, detail: 'ปีงบประมาณ 2567' } })
  const fy2568 = await prisma.fiscalYear.create({ data: { year: 2568, detail: 'ปีงบประมาณ 2568' } })
  const fy2569 = await prisma.fiscalYear.create({ data: { year: 2569, detail: 'ปีงบประมาณ 2569' } })
  console.log('✅ Created fiscal years')

  // ---------------- OWNERS ----------------
  const owners = []
  for (let i = 0; i < 15; i++) {
    const owner = await prisma.owner.create({
      data: {
        title_owner: faker.helpers.arrayElement(['นาย', 'นาง', 'นางสาว', 'บริษัท']),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone: faker.phone.number('08########'),
        no_id: faker.string.numeric(9),
        road: faker.location.street(),
        subdistrict: faker.location.city(),
        district: faker.location.city(),
        province: faker.helpers.arrayElement(['กรุงเทพมหานคร', 'เชียงใหม่', 'ขอนแก่น', 'ตรัง', 'ภูเก็ต', 'สงขลา', 'นครราชสีมา']),
        postcode: Number(faker.string.numeric(5)),
        user_id: i < 5 ? officer.id : null
      }
    })
    owners.push(owner)
  }
  console.log('✅ Created owners')

  // ---------------- BUILDING CONTROL ----------------
  const buildingControls = []
  for (let i = 0; i < 20; i++) {
    const bc = await prisma.buildingControl.create({
      data: {
        building_type: faker.helpers.arrayElement([
          'อาคารพาณิชย์', 'ที่อยู่อาศัย', 'โกดังสินค้า', 'โรงงาน', 'อาคารสำนักงาน', 'โรงพยาบาล', 'โรงเรียน'
        ]),
        use_purpose: faker.helpers.arrayElement([
          'ร้านค้า', 'อยู่อาศัย', 'เก็บสินค้า', 'ผลิต', 'สำนักงาน', 'รักษาพยาบาล', 'การศึกษา'
        ]),
        license_number: `BC-${faker.string.alphanumeric({ length: 6, casing: 'upper' })}`,
        quantity: faker.number.int({ min: 1, max: 10 }),
        fiscalYearId: faker.helpers.arrayElement([fy2567.id, fy2568.id, fy2569.id]),
        owner_id: faker.helpers.arrayElement(owners).id,
        status: faker.helpers.arrayElement(['Draft', 'Pending', 'Approved', 'Rejected'])
      }
    })
    buildingControls.push(bc)
  }
  console.log('✅ Created building controls')

  // ---------------- RISK ZONE ----------------
  const riskZones = []
  for (let i = 0; i < 10; i++) {
    const rz = await prisma.riskZone.create({
      data: {
        zoneType: faker.helpers.arrayElement(['น้ำท่วม', 'ดินถล่ม', 'ไฟไหม้', 'อุบัติเหตุ']),
        description: faker.lorem.sentence(),
        fiscalYearId: faker.helpers.arrayElement([fy2567.id, fy2568.id, fy2569.id]),
        owner_id: faker.helpers.arrayElement(owners).id
      }
    })
    riskZones.push(rz)
  }
  console.log('✅ Created risk zones')

  // ---------------- ZONING PLAN ----------------
  const zoningPlans = []
  for (let i = 0; i < 15; i++) {
    const zp = await prisma.zoningPlan.create({
      data: {
        areaName: faker.helpers.arrayElement([
          'เขตพาณิชยกรรม', 'เขตที่อยู่อาศัย', 'เขตอุตสาหกรรม', 'เขตเกษตรกรรม', 'เขตอนุรักษ์', 'เขตการศึกษา'
        ]),
        notes: faker.lorem.sentence(),
        fiscalYearId: faker.helpers.arrayElement([fy2567.id, fy2568.id, fy2569.id]),
        owner_id: faker.helpers.arrayElement(owners).id
      }
    })
    zoningPlans.push(zp)
  }
  console.log('✅ Created zoning plans')

  // ---------------- PLAN PROJECT ----------------
  const planProjects = []
  for (let i = 0; i < 8; i++) {
    const pp = await prisma.planProject.create({
      data: {
        code: `PP-${faker.string.alphanumeric({ length: 4, casing: 'upper' })}`,
        name: faker.company.name() + ' Project',
        category: faker.helpers.arrayElement(['Infrastructure', 'Education', 'Healthcare', 'Transportation']),
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        supervisor: faker.person.fullName(),
        budget: faker.number.float({ min: 1000000, max: 10000000, fractionDigits: 2 }),
        fiscalYearId: faker.helpers.arrayElement([fy2567.id, fy2568.id, fy2569.id]),
        status: faker.helpers.arrayElement(['Planning', 'In Progress', 'Completed', 'Cancelled']),
        documentCount: faker.number.int({ min: 0, max: 20 }),
        details: faker.lorem.paragraph()
      }
    })
    planProjects.push(pp)
  }
  console.log('✅ Created plan projects')

  // ---------------- APPROVED PROJECT ----------------
  const approvedProjects = []
  for (let i = 0; i < 6; i++) {
    const ap = await prisma.approvedProject.create({
      data: {
        title_project: faker.company.name() + ' Approved Project',
        category: faker.helpers.arrayElement(['Infrastructure', 'Education', 'Healthcare', 'Transportation']),
        supervisor: faker.person.fullName(),
        budget: faker.number.float({ min: 2000000, max: 15000000, fractionDigits: 2 }),
        fiscalYearId: faker.helpers.arrayElement([fy2567.id, fy2568.id, fy2569.id]),
        status: faker.helpers.arrayElement(['Approved', 'In Progress', 'Completed']),
        documentCount: faker.number.int({ min: 5, max: 30 }),
        details: faker.lorem.paragraph()
      }
    })
    approvedProjects.push(ap)
  }
  console.log('✅ Created approved projects')

  // ---------------- UPLOADS ----------------
  for (let i = 0; i < 20; i++) {
    const relatedType = faker.helpers.arrayElement(['buildingControl', 'riskZone', 'zoningPlan'])
    const relatedId = faker.helpers.arrayElement(
      relatedType === 'buildingControl' ? buildingControls :
      relatedType === 'riskZone' ? riskZones : zoningPlans
    ).id

    await prisma.uploads.create({
      data: {
        namefile: faker.system.fileName({ extensionCount: 1 }),
        url: `https://example.com/uploads/${faker.system.fileName()}`,
        fileType: faker.helpers.arrayElement(['pdf', 'doc', 'docx', 'xlsx']),
        size: faker.number.int({ min: 50000, max: 5000000 }),
        ...(relatedType === 'buildingControl' ? { buildingControlId: relatedId } :
            relatedType === 'riskZone' ? { riskZoneId: relatedId } :
            { zoningPlanId: relatedId })
      }
    })
  }
  console.log('✅ Created uploads')



  // ---------------- SUMMARY ----------------
  console.log('📊 Database seeded successfully!')
  console.log('👤 Test Admin -> username: admin | password: 12345 | email: admin@test.com')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
