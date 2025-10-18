import { prisma } from './buildingControl/helpers.js'

const options_map_custom = {
  navigation: {
    name: 'แผนที่ (Custom)',
    icon: 'Map',
  },
  actions: {
    list: {
      handler: async (request, response, context) => {
        console.log('🔍 Custom Map list handler')
        
        // ดึงข้อมูลทั้งหมดจากฐานข้อมูล (ใช้ $queryRaw สำหรับ geom)
        const maps = await prisma.$queryRaw`
          SELECT 
            id,
            "name_local",
            "house_no",
            road,
            subdistrict,
            district,
            province,
            postcode,
            latitude,
            longitude,
            colors,
            data,
            ST_AsText(geom) as geom_wkt,
            ST_AsGeoJSON(geom) as geom_geojson,
            "buildingControlId",
            created_at,
            updated_at
          FROM "Map" 
          ORDER BY id DESC 
          LIMIT 20
        `
        
        console.log('🔍 Maps from DB:', maps.length)
        
        // แปลงเป็นรูปแบบที่ AdminJS ต้องการ
        const records = maps.map(map => ({
          id: map.id,
          params: {
            id: map.id,
            name_local: map.name_local,
            house_no: map.house_no,
            road: map.road,
            subdistrict: map.subdistrict,
            district: map.district,
            province: map.province,
            postcode: map.postcode,
            latitude: map.latitude,
            longitude: map.longitude,
            colors: map.colors,
            data: map.data,
            geom: map.geom_wkt,
            geom_geojson: map.geom_geojson,
            buildingControlId: map.buildingControlId,
            created_at: map.created_at,
            updated_at: map.updated_at
          }
        }))
        
        return {
          records,
          meta: {
            total: maps.length,
            perPage: 20,
            page: 1
          }
        }
      }
    }
  },
  properties: {
    id: { isVisible: { list: false, show: false, edit: false, filter: false } },
    
    // ที่อยู่
    name_local: { label: 'ชื่อสถานที่', type: 'string' },
    house_no: { label: 'บ้านเลขที่', type: 'string' },
    road: { label: 'ถนน', type: 'string' },
    subdistrict: { label: 'ตำบล', type: 'string' },
    district: { label: 'อำเภอ', type: 'string' },
    province: { label: 'จังหวัด', type: 'string' },
    postcode: { label: 'รหัสไปรษณีย์', type: 'string' },

    // พิกัด
    latitude: { label: 'ละติจูด', type: 'float' },
    longitude: { label: 'ลองจิจูด', type: 'float' },

    // Layer
    colors: { label: 'สีของเลเยอร์', type: 'string' },
    data: { 
      label: 'GeoJSON/KML', 
      type: 'textarea',
      components: {
        list: 'DataDisplay',
        show: 'DataDisplay',
        edit: 'MapField'
      }
    },
    geom: { 
      label: 'Geometry (PostGIS)', 
      type: 'textarea',
      isVisible: { list: false, show: true, edit: false, filter: false }
    },
  },
  listProperties: [
    'name_local', 'house_no', 'road',
    'subdistrict', 'district', 'province', 'postcode',
    'latitude', 'longitude', 'colors', 'data'
  ],
  showProperties: [
    'name_local', 'house_no', 'road',
    'subdistrict', 'district', 'province', 'postcode',
    'latitude', 'longitude', 'colors', 'data', 'geom'
  ],
  editProperties: [
    'name_local', 'house_no', 'road',
    'subdistrict', 'district', 'province', 'postcode',
    'latitude', 'longitude', 'colors', 'data', 'geom'
  ],
}

export default options_map_custom
