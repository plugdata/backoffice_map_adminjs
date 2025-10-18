import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // ตรวจสอบและลบข้อมูลเก่า (ตามลำดับ dependency)
  // ใช้ try-catch เพื่อจัดการกับตารางที่อาจไม่มีอยู่
  try {
    await prisma.map.deleteMany()
    console.log('🗑️ Cleaned Map data')
  } catch (error) {
    console.log('⚠️ Map table does not exist, skipping...')
  }

  try {
    await prisma.uploads.deleteMany()
    console.log('🗑️ Cleaned Uploads data')
  } catch (error) {
    console.log('⚠️ Uploads table does not exist, skipping...')
  }

  try {
    await prisma.buildingControl.deleteMany()
    console.log('🗑️ Cleaned BuildingControl data')
  } catch (error) {
    console.log('⚠️ BuildingControl table does not exist, skipping...')
  }

  try {
    await prisma.riskZone.deleteMany()
    console.log('🗑️ Cleaned RiskZone data')
  } catch (error) {
    console.log('⚠️ RiskZone table does not exist, skipping...')
  }

  try {
    await prisma.zoningPlan.deleteMany()
    console.log('🗑️ Cleaned ZoningPlan data')
  } catch (error) {
    console.log('⚠️ ZoningPlan table does not exist, skipping...')
  }

  try {
    await prisma.planProject.deleteMany()
    console.log('🗑️ Cleaned PlanProject data')
  } catch (error) {
    console.log('⚠️ PlanProject table does not exist, skipping...')
  }

  try {
    await prisma.approvedProject.deleteMany()
    console.log('🗑️ Cleaned ApprovedProject data')
  } catch (error) {
    console.log('⚠️ ApprovedProject table does not exist, skipping...')
  }

  try {
    await prisma.owner.deleteMany()
    console.log('🗑️ Cleaned Owner data')
  } catch (error) {
    console.log('⚠️ Owner table does not exist, skipping...')
  }

  try {
    await prisma.fiscalYear.deleteMany()
    console.log('🗑️ Cleaned FiscalYear data')
  } catch (error) {
    console.log('⚠️ FiscalYear table does not exist, skipping...')
  }

  try {
    await prisma.user.deleteMany()
    console.log('🗑️ Cleaned User data')
  } catch (error) {
    console.log('⚠️ User table does not exist, skipping...')
  }

  try {
    await prisma.workTopic.deleteMany()
    console.log('🗑️ Cleaned WorkTopic data')
  } catch (error) {
    console.log('⚠️ WorkTopic table does not exist, skipping...')
  }

  console.log('🗑️ Cleaned existing data')

  // Users
  let admin, officer, viewer, testAdmin
  try {
    // Test admin user with password "12345"
    testAdmin = await prisma.user.create({
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

    admin = await prisma.user.create({
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

    officer = await prisma.user.create({
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

    viewer = await prisma.user.create({
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
  } catch (error) {
    console.log('❌ Error creating users:', error.message)
    return
  }

  // FiscalYear
  const fy2567 = await prisma.fiscalYear.create({
    data: { year: 2567, detail: 'ปีงบประมาณ 2567' }
  })
  const fy2568 = await prisma.fiscalYear.create({
    data: { year: 2568, detail: 'ปีงบประมาณ 2568' }
  })
  const fy2569 = await prisma.fiscalYear.create({
    data: { year: 2569, detail: 'ปีงบประมาณ 2569' }
  })

  console.log('✅ Created fiscal years')

  // Owners
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

  // BuildingControl
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
        status: faker.helpers.arrayElement(['Draft', 'Pending', 'Approved', 'Rejected']),
        date: faker.date.past()
      }
    })
    buildingControls.push(bc)
  }

  console.log('✅ Created building controls')

  // RiskZone
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

  // ZoningPlan
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

  // PlanProject
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

  // ApprovedProject
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

  // Helper: random coordinate roughly within Thailand bounds
  const randomThaiCoord = () => {
    const lat = faker.number.float({ min: 5.5, max: 20.5, fractionDigits: 6 })
    const lng = faker.number.float({ min: 97.5, max: 105.7, fractionDigits: 6 })
    return { lat, lng }
  }

  // Helper: make small square polygon around center
  const makeSquarePolygon = (lat, lng, delta = 0.01) => {
    const ring = [
      [lng - delta, lat - delta],
      [lng + delta, lat - delta],
      [lng + delta, lat + delta],
      [lng - delta, lat + delta],
      [lng - delta, lat - delta],
    ]
    return { type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [ring] } }] }
  }

  // Helper: make line string
  const makeLineString = (lat, lng, points = 5) => {
    const coordinates = []
    for (let i = 0; i < points; i++) {
      const offsetLat = lat + (Math.random() - 0.5) * 0.01
      const offsetLng = lng + (Math.random() - 0.5) * 0.01
      coordinates.push([offsetLng, offsetLat, 0])
    }
    return { type: 'FeatureCollection', features: [{ type: 'Feature', properties: { name: 'Feature 1', description: '' }, geometry: { type: 'LineString', coordinates } }] }
  }

  // Real data for Trang locations
  const realTrangData = [
    { name: "นายเฉลิมพล จิระธำรง", address: "43497", lat: 7.566557, lng: 99.62328, type: "สนามแบดมินตัน มาตีโต้" },
    { name: "โรงเรียนดรุโนทัย", address: "49", lat: 7.557393, lng: 99.61693, type: "โรงเรียนดรุโนทัย" },
    { name: "ห้างหุ้นส่วนจำกัด บางรักทวีทรัพย์", address: "387", lat: 7.540903, lng: 99.59839, type: "สถานีบริการน้ำมันเชื้อเพลิง ซัสโก้" },
    { name: "บริษัท บางจากคอร์ปอเรชั่น จำกัด (มหาชน)", address: "115/49", lat: 7.542985, lng: 99.61618, type: "สถานีบริการน้ำมันเชื้อเพลิง เชลล์" },
    { name: "นายปวเรศ เรืองเดช", address: "150/9", lat: 7.544791, lng: 99.61162, type: "โรงแรมทีเบิร์ด แกรนด์" },
    { name: "บริษัท ศรีตรังแอโกร อินดัสทรี จำกัด (มหาชน)", address: "38365", lat: 7.545062, lng: 99.59544, type: "ตลาดชินตา" },
    { name: "บริษัท บิ๊กซี ซูเปอร์เซ็นเตอร์ จำกัด (มหาชน)", address: "102/2", lat: 7.545333, lng: 99.61509, type: "มหานคร@ตรัง" },
    { name: "ห้างหุ้นส่วนจำกัด ตรังวิรุณกิจขนส่ง", address: "20/35", lat: 7.546957, lng: 99.5922, type: "สนามแบดมินตัน มาตีโต้" },
    { name: "นายวิชัย อรุโณประโยชน์", address: "46/38", lat: 7.546983, lng: 99.60714, type: "โรงแรมสเตชั่น" },
    { name: "นางเขมิกา กีรติเมธากุล", address: "105/39", lat: 7.547587, lng: 99.61567, type: "โรงแรมเดอะรูม" },
    { name: "นายนพวงศ์ คันฉ่อง", address: "105/275", lat: 7.547822, lng: 99.61757, type: "โรงแรมเจริญอพาร์ตเมนท์" },
    { name: "บริษัท เอสโซ่ (ประเทศไทย) จำกัด (มหาชน) (ESSO)", address: "101/20", lat: 7.547995, lng: 99.61515, type: "สถานีบริการน้ำมันเชื้อเพลิง บางจาก" },
    { name: "บริษัท น้ำมันสยามมงคล จำกัด", address: "255/15", lat: 7.548472, lng: 99.60559, type: "สถานีบริการน้ำมันเชื้อเพลิง พีที" },
    { name: "นางอภิรดี แก้วภักดี", address: "206/48", lat: 7.548707, lng: 99.60969, type: "โรงแรมศรีสมบูรณ์ เปลี่ยชื่อเป็น โรงแรมธัญพรโฮสเทล" },
    { name: "ห้างหุ้นส่วนจำกัด วิเศษกุลเซอร์วิส", address: "98", lat: 7.549037, lng: 99.6142, type: "สถานีบริการน้ำมันเชื้อเพลิง บางจาก" },
    { name: "นายสรัญพงศ์ สันติคุณานุภรณ์", address: "105/345", lat: 7.549646, lng: 99.61937, type: "THE SECRET" },
    { name: "นายชัยวิชิต แซ่ฮั่น", address: "69", lat: 7.551126, lng: 99.61199, type: "โรงแรมอีโค่ อินน์" },
    { name: "นางพิมพ์วิอร แก้วประสมศรี", address: "73/99", lat: 7.551894, lng: 99.61789, type: "โรงแรมที แอนด์ บี อพาร์ทเมนท์" },
    { name: "นางสาวนฤมล นิปกุล", address: "133/125", lat: 7.553032, lng: 99.61799, type: "สถานีบริการน้ำมันเชื้อเพลิง ปตท" },
    { name: "นายไพโรจน์ อ่าวสกุล", address: "25/17-21", lat: 7.55322, lng: 99.60571, type: "โรงแรมน้ำทิพย์ เรสซิเดนท์" },
    { name: "นายเด่นศักดิ์ ศิลาวัชนาไนย", address: "41/12", lat: 7.553405, lng: 99.61411, type: "Hang Out" },
    { name: "นางสาวชนาจิต สนั่นวานิช", address: "64/214-215", lat: 7.55343, lng: 99.60841, type: "เดอะกลาสเฮ้าส์ เพลส The glass house place" },
    { name: "นายปริญญา ศรีวงศ์", address: "39/33", lat: 7.553447, lng: 99.61455, type: "สถานีบริการน้ำมันเชื้อเพลิง เอสโซ่" },
    { name: "นายวิชัย อรุโณประโยชน์", address: "25/89", lat: 7.553573, lng: 99.60508, type: "บริษัท ศรีตรังแอโกร อินดัสทรี จำกัด (มหาชน)" },
    { name: "นางพรวิมล ยกพิทักษ์", address: "147", lat: 7.553715, lng: 99.60628, type: "โรงแรมตรังฮอลิเดย์ โฮเต็ล" },
    { name: "นายไพโรจน์ อ่าวสกุล", address: "25/28-31", lat: 7.553924, lng: 99.60493, type: "โรงแรมบีบีตรัง" },
    { name: "นิติบุคคลอาคารชุด ตรังคอนโดมิเนียม", address: "118/8", lat: 7.554067, lng: 99.59849, type: "บิ๊กซี ซูเปอร์เซ็นเตอร์ สาขาตรัง" },
    { name: "นางสาวชนาจิต สนั่นวานิช", address: "27", lat: 7.554533, lng: 99.60531, type: "โรงแรมไมตรีเฮ้าส์" },
    { name: "นายภาสวร พิศาบดินทร์", address: "24", lat: 7.554792, lng: 99.60505, type: "โรงแรมเมซอง เดอ เชียร์" },
    { name: "นายวิวัฒน์ ทับเที่ยง", address: "45510", lat: 7.554933, lng: 99.60519, type: "โรงแรมดีดี เรสซิเด้นท์" },
    { name: "บริษัท โรงแรมธรรมรินทร์ จำกัด", address: "99", lat: 7.555172, lng: 99.6056, type: "ห้างสรรพสินค้าโรบินสัน สาขาตรัง" },
    { name: "ห้างหุ้นส่วนจำกัด โรงแรมตรังฮอลิเดย์โฮเต็ล โดย นายสมพล เชียรวิชัย", address: "37654", lat: 7.555267, lng: 99.61054, type: "โรงแรมเฌอแตม" },
    { name: "นายบัณฑิต พิทยาพิศาล", address: "160/28", lat: 7.555367, lng: 99.60352, type: "โรงแรมชมตรัง" },
    { name: "นายสมโภชน์ แก้วสินธุ์", address: "23/36", lat: 7.555386, lng: 99.61483, type: "โรงแรมไรวินทร์ เพลส" },
    { name: "นางจิราภา เปี่ยมพริ้ง", address: "23", lat: 7.5556, lng: 99.60683, type: "การ์เด้นท์ ฮิลล์ แมนชั่น เปลี่ยนชื่อเป็น โรงแรมการ์เด้นท์ ฮิลล์ โฮเต็ล" },
    { name: "นายธนวัสส์ เอกธนกร", address: "68/59", lat: 7.555925, lng: 99.62589, type: "โรงแรมนันที" },
    { name: "บริษัท สเตชั่น ภพธรรมวงศ์ จำกัด", address: "118", lat: 7.55602, lng: 99.60453, type: "โรงแรมอยู่สบาย" },
    { name: "นายเรืองวิทย์ ลีลาเลิศแล้ว", address: "31", lat: 7.556029, lng: 99.61307, type: "โรงแรมบ้านบุษบา" },
    { name: "นายอรุณ มะลิแก้ว", address: "77-79", lat: 7.556399, lng: 99.60865, type: "โรงแรมวัฒนา" },
    { name: "นายสมพล เชียรวิชัย", address: "127/3-4", lat: 7.556644, lng: 99.60914, type: "โรงแรมรื่นรมย์ รีสอร์ท" },
    { name: "บริษัท ชินตา มาร์เก็ต จำกัด", address: "5", lat: 7.556661, lng: 99.61663, type: "ทักษิณ อพาร์ทเมนท์" },
    { name: "ห้างหุ้นส่วนจำกัด บ้านเจ้าฟู โดย นายชัยสิทธิ์ อุตสาหะ", address: "33/89", lat: 7.556918, lng: 99.63093, type: "โรงแรมบ้านควนหนุน เรสซิเด้นท์" },
    { name: "บริษัท ราชดำเนินการแพทย์ จำกัด", address: "25", lat: 7.557488, lng: 99.6065, type: "คริสตจักรตรัง" },
    { name: "นายจรุญ แสงแจ้ว", address: "65/50", lat: 7.55846, lng: 99.62594, type: "สถานบริการน้ำมันเชื้อเพลิง" },
    { name: "บริษัท โรงแรม S2S ควีนส์ ตรัง จำกัด", address: "85", lat: 7.558571, lng: 99.60871, type: "โรงเรียนตรังคริสเตียนศึกษา" },
    { name: "นายทักษิณ สุธาทองไทย", address: "25/30", lat: 7.558695, lng: 99.61644, type: "ปาล์มคอร์ด อพาร์ตเมนต์" },
    { name: "มูลนิธิแห่งสภาคริสตจักรในประเทศไทย", address: "24", lat: 7.559318, lng: 99.60487, type: "อินญาวัฒน์ แมนชั่น" },
    { name: "โรงเรียนตรังคริสเตียนศึกษา", address: "209", lat: 7.560322, lng: 99.59688, type: "ตรังคอนโดมิเนียม" },
    { name: "บริษัท ท่ากลางปิโตรเลียม จำกัด", address: "221/12", lat: 7.560779, lng: 99.59442, type: "สถานีบริการน้ำมันเชื้อเพลิง อิสระ" },
    { name: "บริษัท บางจากคอร์ปอเรชั่น จำกัด (มหาชน)", address: "6", lat: 7.561097, lng: 99.6061, type: "สถานีบริการน้ำมันเชื้อเพลิง คาลเท็กซ์" },
    { name: "บริษัท โรงแรมธรรมรินทร์ จำกัด", address: "69/8", lat: 7.561162, lng: 99.60372, type: "โรงพยาบาลตรังรวมแพทย์ (โรงพยาบาล TRPH)" },
    { name: "บริษัท สิริบรรณช็อปปิ้งเซนเตอร์ จำกัด", address: "42", lat: 7.561282, lng: 99.61585, type: "โรงแรม S2S ควีนส์ ตรัง" },
    { name: "นายสมชัย มะโนรมย์", address: "198", lat: 7.56144, lng: 99.59691, type: "ดูสบาย 2020" },
    { name: "นางสาวสิริกุล แก้วเมือง", address: "65/145", lat: 7.561833, lng: 99.60341, type: "โรงแรมมายเฮ้าส์ การ์เดนท์ รีสอร์ท" },
    { name: "นายวิชัย อรุโณประโยชน์", address: "139/9", lat: 7.562183, lng: 99.61385, type: "วงแขแมนชั่น" },
    { name: "นายฐากูร ปักปิ่นเพชร", address: "175/1", lat: 7.562408, lng: 99.61478, type: "โรงแรมเซ็นเตอร์พ้อยท์" },
    { name: "ห้างหุ้นส่วนจำกัด เซ็นเตอร์พ้อยท์ ภพธรรมวงศ์", address: "108/84", lat: 7.562811, lng: 99.60929, type: "โรงแรมมายเฟรนด์" },
    { name: "บริษัท ทักษิณวงแขและบุตร จำกัด", address: "187/2-3", lat: 7.563382, lng: 99.61723, type: "ลีมาร์ท ช็อปปิ้งเซนเตอร์" },
    { name: "ห้างหุ้นส่วนจำกัด ตรังเอสเคธนาทิพย์", address: "125", lat: 7.563463, lng: 99.6049, type: "สถานีบริการน้ำมันเชื้อเพลิง คาลเท็กซ์" },
    { name: "บริษัท ห้างสรรพสินค้า โรบินสัน จำกัน (มหาชน) สาขาตรัง", address: "138", lat: 7.563498, lng: 99.62652, type: "โรงแรมเรือรัษฎา" },
    { name: "บริษัท โรงพยาบาลวัฒนแพทย์ ตรัง", address: "247/2", lat: 7.563865, lng: 99.61737, type: "ห้างลีมาร์ท เอ๊กซ์เพรส" },
    { name: "บริษัท อีโค่อินน์ จำกัด", address: "131/9", lat: 7.564097, lng: 99.6033, type: "โรงแรมปาล์มมี่ รีสอร์ท" },
    { name: "บริษัท ตรังคสุวรรณ จำกัด", address: "235", lat: 7.564416, lng: 99.62128, type: "สนามแบดมินตัน มาตีโต้" },
    { name: "บริษัท เชลล์แห่งประเทศไทย จำกัด", address: "149", lat: 7.564563, lng: 99.60462, type: "สถานีบริการน้ำมันเชื้อเพลิง คาลเท็กซ์" },
    { name: "บริษัท เรือรัษฎา โฮเต็ล จำกัด", address: "188", lat: 7.564982, lng: 99.63128, type: "โรงแรมธรรมรินทร์ ธนา" },
    { name: "นายรชตปพณ สองนา", address: "267/6", lat: 7.565509, lng: 99.62808, type: "โรงแรมวัฒนาพาร์ค" },
    { name: "นายณรงค์ บรรจงสุทธิ์", address: "45359", lat: 7.565666, lng: 99.62226, type: "คุ้มโจโฉ" },
    { name: "นายอรุณ มะลิแก้ว", address: "45303", lat: 7.566051, lng: 99.61743, type: "โรงแรมรักษ์จันทร์" },
    { name: "นางลดาวัลย์ ศัยศักดิ์พงษ์", address: "33/46", lat: 7.567627, lng: 99.62243, type: "โรงพยาบาลราชดำเนินการแพทย์" },
    { name: "นายมงคล ไทรงาม", address: "20/2-20/7", lat: 7.568432, lng: 99.61523, type: "โรงแรมเดอะพาราวู้ด ณ ตรัง เปลี่ยนชื่อเป็น โรงแรมมิราเคิล อินน์ ตรัง" },
    { name: "โรงพยาบาลตรังรวมแพทย์ (โรงพยาบาล TRPH)", address: "61/39", lat: 7.56866, lng: 99.61957, type: "แปดหก" },
    { name: "นายชวลิต ว่องวัตรพงศ์", address: "65/51", lat: 7.568829, lng: 99.61071, type: "โรงแรมจรูญศักดิ์ แกรนด์" },
    { name: "นางสาววิชญา จรูญศักดิ์", address: "69/99", lat: 7.569775, lng: 99.6085, type: "โรงแรมศรีตรัง" },
    { name: "นางลดาวัลย์ ศัยศักดิ์พงษ์", address: "85/46", lat: 7.570278, lng: 99.61886, type: "โรงพยาบาลวัฒนแพทย์ ตรัง" },
    { name: "ห้างหุ้นส่วนจำกัด ชมพูนครินทร์", address: "18/59", lat: 7.571623, lng: 99.61751, type: "อาคารที่เข้าข่ายอาคาร 9 ประเภท" },
    { name: "บริษัท วัฒนา พาร์ค โฮเต็ล", address: "315/7", lat: 7.572562, lng: 99.60445, type: "อาคารที่ใช้ประกอบกิจการคล้ายสถานบริการ" },
    { name: "บริษัท ปิโตรเลียมไทยคอร์ปอเรชั่น จำกัด", address: "327/4-5", lat: 7.572779, lng: 99.60574, type: "สถานีบริการน้ำมันเชื้อเพลิง คาลเท็กซ์" },
    { name: "นายสุจินต์ ชุมเพชร", address: "45560", lat: 7.573442, lng: 99.61508, type: "โรงแรมธรรมรินทร์" },
    { name: "นายธวัช โพธิ์เย็น", address: "70/29", lat: 7.576015, lng: 99.61818, type: "โรงแรมช้างเรสซิเดนซ์ ตรัง" },
    { name: "นายธวัช โพธิ์เย็น", address: "70/28", lat: 7.576297, lng: 99.61892, type: "โรงแรมชมพูนครินทร์" },
    { name: "นางลลิตา ธรรมาวุธ", address: "82/1", lat: 7.577716, lng: 99.62097, type: "โรงแรม ณ ทับเที่ยง บูติค รีสอร์ท" },
    { name: "นายชานนท์ ต่างจิตร", address: "384/76", lat: 7.577826, lng: 99.60893, type: "โรงแรมบ้านอ่าวทอง" },
    { name: "ห้างหุ้นส่วนจำกัด ปิชยดาปิโตรเลียม", address: "85", lat: 7.584404, lng: 99.63134, type: "สนามแบดมินตัน มาตีโต้" },
    { name: "นายปราโมทย์ ชลวิศิษศ์", address: "45379", lat: 7.570465, lng: 99.61209, type: "โรงเรียนปัญญาวิทย์ (แผนกมัธยม) เข้าไป เมืองตรังทั้งหมด" }
  ]

  // Maps
  const maps = []
  try {
    const usedBuildingControls = new Set()
    const usedRiskZones = new Set()
    const usedZoningPlans = new Set()
    const usedPlanProjects = new Set()
    const usedApprovedProjects = new Set()

    // Create maps from real Trang data
    for (let i = 0; i < realTrangData.length; i++) {
      const data = realTrangData[i]
      const mapType = faker.helpers.arrayElement(['buildingControl', 'riskZone', 'zoningPlan', 'planProject', 'approvedProject'])
      
      let mapData = {
        name_local: data.name,
        house_no: data.address,
        road: faker.location.street(),
        subdistrict: "ในเมือง",
        district: "เมืองตรัง",
        province: "ตรัง",
        postcode: "92000",
        latitude: data.lat,
        longitude: data.lng,
      }

      // Add geometry data
  /*     if (Math.random() > 0.5) {
        mapData.data = makeSquarePolygon(data.lat, data.lng, faker.number.float({ min: 0.005, max: 0.02, fractionDigits: 5 }))
      } else {
        mapData.data = makeLineString(data.lat, data.lng, faker.number.int({ min: 3, max: 8 }))
      } */

      // Link to related data
      if (mapType === 'buildingControl') {
        const availableBCs = buildingControls.filter(bc => !usedBuildingControls.has(bc.id))
        if (availableBCs.length > 0) {
          const bc = faker.helpers.arrayElement(availableBCs)
          mapData.buildingControlId = bc.id
          usedBuildingControls.add(bc.id)
        }
      } else if (mapType === 'riskZone') {
        const availableRZs = riskZones.filter(rz => !usedRiskZones.has(rz.id))
        if (availableRZs.length > 0) {
          const rz = faker.helpers.arrayElement(availableRZs)
          mapData.riskZoneId = rz.id
          usedRiskZones.add(rz.id)
        }
      } else if (mapType === 'zoningPlan') {
        const availableZPs = zoningPlans.filter(zp => !usedZoningPlans.has(zp.id))
        if (availableZPs.length > 0) {
          const zp = faker.helpers.arrayElement(availableZPs)
          mapData.zoningPlanId = zp.id
          usedZoningPlans.add(zp.id)
        }
      }
      // planProject และ approvedProject ไม่มี relation กับ Map ใน schema ปัจจุบัน

      const map = await prisma.map.create({ data: mapData })
      maps.push(map)
    }

    console.log('✅ Created maps')
  } catch (error) {
    console.log('❌ Error creating maps:', error.message)
    console.log('⚠️ Map table may not exist, skipping map creation...')
  }

  // ImageUploads - ไม่มีใน schema ปัจจุบัน
  // const imageUploads = []
  // for (let i = 0; i < 30; i++) {
  //   const map = faker.helpers.arrayElement(maps)
  //   const imageId = Date.now() + Math.random() + i
  //   const filename = `test-image-${imageId}.jpg`
  //   
  //   const imageUpload = await prisma.imageUpload.create({
  //     data: {
  //       filename,
  //       originalName: `test-image-${i + 1}.jpg`,
  //       path: `/uploads/images/${filename}`,
  //       url: `http://localhost:3002/uploads/images/${filename}`,
  //       size: faker.number.int({ min: 100000, max: 2000000 }),
  //       mimetype: 'image/jpeg',
  //       mapId: map.id,
  //       description: `รูปภาพทดสอบสำหรับ ${map.name_local}`
  //     }
  //   })
  //   imageUploads.push(imageUpload)
  // }

  // console.log('✅ Created image uploads')

  // KmlData - ไม่มีใน schema ปัจจุบัน
  // const kmlData = []
  // for (let i = 0; i < 15; i++) {
  //   const map = faker.helpers.arrayElement(maps)
  //   const { lat, lng } = randomThaiCoord()
  //   
  //   // Create sample GeoJSON data
  //   const geojson = faker.helpers.arrayElement([
  //     makeSquarePolygon(lat, lng, faker.number.float({ min: 0.005, max: 0.02, fractionDigits: 5 })),
  //     makeLineString(lat, lng, faker.number.int({ min: 3, max: 8 }))
  //   ])
  //   
  //   const coordinates = []
  //   if (geojson.features[0].geometry.type === 'LineString') {
  //     coordinates.push(...geojson.features[0].geometry.coordinates)
  //   } else if (geojson.features[0].geometry.type === 'Polygon') {
  //     coordinates.push(...geojson.features[0].geometry.coordinates[0])
  //   }
  //   
  //   const bounds = coordinates.length > 0 ? {
  //     north: Math.max(...coordinates.map(c => c[1])),
  //     south: Math.min(...coordinates.map(c => c[1])),
  //     east: Math.max(...coordinates.map(c => c[0])),
  //     west: Math.min(...coordinates.map(c => c[0]))
  //   } : null

  //   const kml = await prisma.kmlData.create({
  //     data: {
  //       name: `KML Data ${i + 1}`,
  //       description: `KML data สำหรับ ${map.name_local}`,
  //       geojson: geojson,
  //       coordinates: coordinates,
  //       bounds: bounds,
  //       mapId: map.id
  //     }
  //   })
  //   kmlData.push(kml)
  // }

  // console.log('✅ Created KML data')

  // WorkTopic
  try {
    const workTopics = [
      { title_work: 'จัดทำรายงานสิ่งแวดล้อม', category: 'Environment' },
      { title_work: 'สำรวจพื้นที่เสี่ยง', category: 'Survey' },
      { title_work: 'วางแผนการพัฒนา', category: 'Planning' },
      { title_work: 'ติดตามโครงการ', category: 'Monitoring' },
      { title_work: 'ประเมินผลกระทบ', category: 'Assessment' }
    ]

    for (const topic of workTopics) {
      await prisma.workTopic.create({ data: topic })
    }

    console.log('✅ Created work topics')
  } catch (error) {
    console.log('⚠️ WorkTopic table does not exist, skipping work topics creation...')
  }

  // Uploads
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

  // Final statistics
  try {
    const totalUsers = await prisma.user.count()
    const totalOwners = await prisma.owner.count()
    const totalBuildingControls = await prisma.buildingControl.count()
    const totalRiskZones = await prisma.riskZone.count()
    const totalZoningPlans = await prisma.zoningPlan.count()
    const totalPlanProjects = await prisma.planProject.count()
    const totalApprovedProjects = await prisma.approvedProject.count()
    const totalMaps = await prisma.map.count()
    const totalUploads = await prisma.uploads.count()

    console.log('📊 Database seeded successfully!')
    console.log(`👥 Users: ${totalUsers}`)
    console.log(`🏠 Owners: ${totalOwners}`)
    console.log(`🏢 Building Controls: ${totalBuildingControls}`)
    console.log(`⚠️ Risk Zones: ${totalRiskZones}`)
    console.log(`🏘️ Zoning Plans: ${totalZoningPlans}`)
    console.log(`📋 Plan Projects: ${totalPlanProjects}`)
    console.log(`✅ Approved Projects: ${totalApprovedProjects}`)
    console.log(`🗺️ Maps: ${totalMaps}`)
    console.log(`📁 Uploads: ${totalUploads}`)
    
    // Test admin credentials
    console.log('\n🔐 Test Admin Credentials:')
    console.log('Username: admin')
    console.log('Password: 12345')
    console.log('Email: admin@test.com')
  } catch (error) {
    console.log('⚠️ Error getting final statistics:', error.message)
    console.log('✅ Database seeded successfully!')
    console.log('\n🔐 Test Admin Credentials:')
    console.log('Username: admin')
    console.log('Password: 12345')
    console.log('Email: admin@test.com')
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
