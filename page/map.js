const options_map = {
  navigation: {
    name: 'แผนที่',
    icon: 'Map',
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
      components: { edit: 'MapField' }  // 👈 ใช้ custom component
    },
    geom: { label: 'Geometry (PostGIS)', type: 'textarea' },
  },
  listProperties: [
    'name_local', 'house_no', 'road',
    'subdistrict', 'district', 'province', 'postcode',
    'latitude', 'longitude', 'colors'
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

export default options_map
