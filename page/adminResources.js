// ========================================
// AdminJS Resources (แยก resource ออกจาก config หลัก)
// ========================================

import { getModelByName } from '@adminjs/prisma'
import uploadFeature from '@adminjs/upload'
import { componentLoader } from '../utils/loder.js'
import options, { language } from '../utils/setadmin.js'
import leafletFeatures from '@adminjs/leaflet'

// ตั้งค่าการอัปโหลดไฟล์สำหรับ local storage
const localProvider = {
  bucket: 'public/uploads',
  opts: {
    baseUrl: '/uploads',
  },
}

// ฟังก์ชัน resource สำหรับโครงการก่อสร้าง
export const createConstructionProjectResource = (prisma) => ({
  resource: { model: getModelByName('ConstructionProject'), client: prisma },
  options: {
    navigation: {
      name: 'ฝ่ายควบคุมการสร้าง',
      icon: 'Cast',
    },
    properties: {
      id: { isVisible: false },
      comment: {
        type: 'textarea',
        isVisible: { list: true, edit: true, show: true, filter: false },
      },
      latitude: {
        isVisible: { list: false, edit: true, show: true, filter: false },
        type: 'number',
      },
      longitude: {
        isVisible: { list: false, edit: true, show: true, filter: false },
        type: 'number',
      },
      location: {
        isVisible: { list: false, edit: true, show: true, filter: false },
        custom: {
          clearButton: true,
        },
      },
      createdAt: {
        isVisible: { list: true, edit: true, show: true, filter: true },
      },
    },
    actions: {
      new: { isAccessible: true },
      edit: { isAccessible: true },
      delete: { isAccessible: true },
      bulkDelete: { isAccessible: true },
    },
  },
  features: [
    uploadFeature({
      provider: { local: localProvider },
      properties: {
        key: 'key',
        filePath: 'filePath',
        filename: 'filename',
        mimeType: 'mime',
        size: 'size',
      },
      uploadPath: (record, filename) => {
        const id = record?.params?.id || 'temp'
        return `construction/${id}/${filename}`
      },
      validation: {
        mimeTypes: ['application/pdf', 'image/png', 'image/jpeg'],
      },
      componentLoader,
    }),
    leafletFeatures.leafletSingleMarkerMapFeature({
      componentLoader,
      paths: {
        mapProperty: 'location',
        latitudeProperty: 'latitude',
        longitudeProperty: 'longitude',
      },
      mapProps: {
        center: [13.7563, 100.5018], // กรุงเทพมหานคร
        zoom: 10,
        style: { height: '400px' },
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
      },
      markerProps: {
        draggable: true,
        popup: {
          content: (record) => `
            <div style="text-align: center; min-width: 200px;">
              <h4 style="margin: 0 0 10px 0;">${record.params?.name || 'โครงการก่อสร้าง'}</h4>
              <p style="margin: 5px 0;">ละติจูด: ${record.params?.latitude || 'ไม่ระบุ'}</p>
              <p style="margin: 5px 0;">ลองจิจูด: ${record.params?.longitude || 'ไม่ระบุ'}</p>
            </div>
          `,
        },
      },
    }),
  ],
})

// ฟังก์ชันรวม resource ทั้งหมด
export const createAdminResources = (prisma) => {
  const ConstructionProjectResource = createConstructionProjectResource(prisma)
  return [
    {
      resource: { model: getModelByName('User'), client: prisma },
      options: {
        navigation: {
          name: 'ตั้งค่า',
          icon: 'Clipboard',
        },
        properties: {
          id: { isVisible: false },
          password: { type: 'password' },
        },
      },
    },
    {
      resource: { model: getModelByName('FiscalYear'), client: prisma },
      options: {
        navigation: {
          name: 'ตั้งค่า',
          icon: 'Clipboard',
        },
        listProperties: ['year', 'createdAt'],
        sort: { sortBy: 'year', direction: 'desc' },
        properties: {
          year: { isTitle: true },
        },
      },
    },
    {
      resource: { model: getModelByName('ProjectGroup'), client: prisma },
      options: {
        navigation: {
          name: 'ฝ่ายควบคุมการสร้าง',
          icon: 'Cast',
        },
        properties: {
          id: { isVisible: false },
        },
      },
    },
    ConstructionProjectResource,
    {  
      resource: { model: getModelByName('BuildingControl'), client: prisma },
      options: {
        navigation: {
          name: 'ฝ่ายควบคุมอาคาร',
          icon: 'Home',
        },
      },
    },
    {
      resource: { model: getModelByName('RiskZone'), client: prisma },
      options: {
        navigation: {
          name: 'ฝ่ายควบคุมอาคาร',
          icon: 'Home',
        },
      },
    },
    {
      resource: { model: getModelByName('ZoningPlan'), client: prisma },
      options: {
        navigation: {
          name: 'ฝ่ายควบคุมอาคาร',
          icon: 'Home',
        },
      },
    },
    {
      resource: { model: getModelByName('FileAttachment'), client: prisma },
      options: {
        navigation: {
          name: null,
          icon: 'File',
        },
      },
    },
  ]
} 