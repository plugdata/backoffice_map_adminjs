import { prisma } from './buildingControl/helpers.js'
import{backButton} from './feature/back-button.js'
const options_map = {
  navigation: {
    name: 'แผนที่',
    icon: 'Map',
  },
  actions: {
    backButton,
    list: {
      after: async (response) => {
        console.log('🔍 Map list action after - records count:', response.records?.length)
        
        if (response.records) {
          try {
            // ดึงข้อมูลที่สมบูรณ์จากฐานข้อมูล
            const recordIds = response.records.map(record => record.id)
            console.log('🔍 Record IDs:', recordIds)
            
            // ใช้ $queryRaw เพื่อดึงข้อมูล geom ที่เป็น PostGIS geometry
            const fullData = await prisma.$queryRaw`
              SELECT 
                id,
                data,
                ST_AsText(geom) as geom_wkt,
                ST_AsGeoJSON(geom) as geom_geojson
              FROM "Map" 
              WHERE id = ANY(${recordIds})
            `
            
            console.log('🔍 Full data from DB:', fullData)
            
            // รวมข้อมูลเข้ากับ response
            response.records.forEach(record => {
              const fullRecord = fullData.find(f => f.id === record.id)
              if (fullRecord) {
                record.params.data = fullRecord.data
                record.params.geom = fullRecord.geom_wkt
                record.params.geom_geojson = fullRecord.geom_geojson
                console.log(`🔍 Updated record ${record.id}:`, {
                  hasData: !!fullRecord.data,
                  hasGeom: !!fullRecord.geom_wkt,
                  hasGeomGeoJSON: !!fullRecord.geom_geojson
                })
              }
            })
          } catch (error) {
            console.error('❌ Error in list action after:', error)
          }
        }
        return response
      }
    }
  },
  properties: {
    id: { isVisible: { list: false, show: false, edit: false, filter: false } },
  
    // ✅ เพิ่ม property นี้ (สำคัญมาก)
    buildingControlId: {
      label: 'รหัสอาคาร (BuildingControlId)',
      type: 'number',
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 1
    },
  
    // ที่อยู่
    name_local: { label: 'ชื่อสถานที่', type: 'string' },
    house_no: { label: 'บ้านเลขที่', type: 'string' },
    road: { label: 'ถนน', type: 'string' },
    subdistrict: { label: 'ตำบล', type: 'string' },
    district: { label: 'อำเภอ', type: 'string' },
    province: { label: 'จังหวัด', type: 'string' },
    postcode: { label: 'รหัสไปรษณีย์', type: 'string' },
  
    // พิกัด
    latitude: { label: 'ละติจูด', type: 'float', isVisible: { list: true, filter: true } },
    longitude: { label: 'ลองจิจูด', type: 'float', isVisible: { list: true, filter: true } },
  
    // Layer
    colors: { label: 'สีของเลเยอร์', type: 'string', isVisible: { list: true, filter: true } },
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
  

}

export default options_map
