// ========================================
// AdminJS Resources (แยก resource ออกจาก config หลัก)
// ========================================

import { getModelByName } from '@adminjs/prisma'
import uploadFeature from '@adminjs/upload'
import { componentLoader } from '../utils/loder.js'
import options, { language } from '../utils/setadmin.js'

// ตั้งค่าการอัปโหลดไฟล์สำหรับ local storage
const localProvider = {
  bucket: 'public/uploads',
  opts: {
    baseUrl: '/uploads',
  },
}

// ฟังก์ชันรวม resource ทั้งหมด
export const createAdminResources = (prisma) => {
  return [
        // setting 
        {
          resource: { model: getModelByName('Department'), client: prisma },
          options: {
            navigation: {
              name: 'ตั้งค่า',
              icon: 'Data',
            },
            properties: {
              id: { isVisible: false },
              description: {
                type: 'textarea',
                isVisible: { list: false, edit: true, show: true, filter: false },
              },
              isActive: {
                isVisible: { list: true, show: true, edit: true, filter: true }
              },
              createdAt: {
                isVisible: { list: true, show: true, edit: false, filter: true }
              },
              updatedAt: {
                isVisible: { list: false, show: true, edit: false, filter: false }
              }
            },
            actions: {
              new: { isAccessible: true },
              edit: { isAccessible: true },
              delete: { isAccessible: true },
              bulkDelete: { isAccessible: true },
            },
          },
        },
    // User Management
    {
      resource: { model: getModelByName('User'), client: prisma },
      options: {
        navigation: {
          name: 'ผู้ใช้และสิทธิ์',
          icon: 'User',
        },
        properties: {
          id: { isVisible: false },
          password: { 
            type: 'password',
            isVisible: { list: false, show: false, edit: true, filter: false }
          },
          employeeId: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          departmentId: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          isActive: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          lastLoginAt: {
            isVisible: { list: true, show: true, edit: false, filter: true }
          },
          createdAt: {
            isVisible: { list: true, show: true, edit: false, filter: true }
          },
          updatedAt: {
            isVisible: { list: false, show: true, edit: false, filter: false }
          }
        },
        actions: {
          new: { isAccessible: true },
          edit: { isAccessible: true },
          delete: { isAccessible: true },
          bulkDelete: { isAccessible: true },
        },
      },
    },

    // Document Type Management
    {
      resource: { model: getModelByName('DocumentType'), client: prisma },
      options: {
        navigation: {
          name: 'ตั้งค่า',
          icon: 'Data',
        },
        properties: {
          id: { isVisible: false },
          description: {
            type: 'textarea',
            isVisible: { list: false, edit: true, show: true, filter: false },
          },
          isActive: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          createdAt: {
            isVisible: { list: true, show: true, edit: false, filter: true }
          },
          updatedAt: {
            isVisible: { list: false, show: true, edit: false, filter: false }
          }
        },
        actions: {
          new: { isAccessible: true },
          edit: { isAccessible: true },
          delete: { isAccessible: true },
          bulkDelete: { isAccessible: true },
        },
      },
    },

    // Confidentiality Level Management
    {
      resource: { model: getModelByName('ConfidentialityLevel'), client: prisma },
      options: {
        navigation: {
          name: 'ตั้งค่า',
          icon: 'Data',
        },
        properties: {
          id: { isVisible: false },
          description: {
            type: 'textarea',
            isVisible: { list: false, edit: true, show: true, filter: false },
          },
          isActive: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          createdAt: {
            isVisible: { list: true, show: true, edit: false, filter: true }
          },
          updatedAt: {
            isVisible: { list: false, show: true, edit: false, filter: false }
          }
        },
        actions: {
          new: { isAccessible: true },
          edit: { isAccessible: true },
          delete: { isAccessible: true },
          bulkDelete: { isAccessible: true },
        },
      },
    },

    // Role Management
    {
      resource: { model: getModelByName('Role'), client: prisma },
      options: {
        navigation: {
          name: 'ผู้ใช้และสิทธิ์',
          icon: 'User',
        },
        properties: {
          id: { isVisible: false },
          description: {
            type: 'textarea',
            isVisible: { list: false, edit: true, show: true, filter: false },
          },
          isActive: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          createdAt: {
            isVisible: { list: true, show: true, edit: false, filter: true }
          },
          updatedAt: {
            isVisible: { list: false, show: true, edit: false, filter: false }
          }
        },
        actions: {
          new: { isAccessible: true },
          edit: { isAccessible: true },
          delete: { isAccessible: true },
          bulkDelete: { isAccessible: true },
        },
      },
    },

    // Permission Management
    {
      resource: { model: getModelByName('Permission'), client: prisma },
      options: {
        navigation: {
          name: 'ผู้ใช้และสิทธิ์',
          icon: 'User',
        },
        properties: {
          id: { isVisible: false },
          description: {
            type: 'textarea',
            isVisible: { list: false, edit: true, show: true, filter: false },
          },
          resource: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          action: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          isActive: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          createdAt: {
            isVisible: { list: true, show: true, edit: false, filter: true }
          },
          updatedAt: {
            isVisible: { list: false, show: true, edit: false, filter: false }
          }
        },
        actions: {
          new: { isAccessible: true },
          edit: { isAccessible: true },
          delete: { isAccessible: true },
          bulkDelete: { isAccessible: true },
        },
      },
    },

    // Document Management
    {
      resource: { model: getModelByName('Document'), client: prisma },
      options: {
        navigation: {
          name: 'เอกสาร',
          icon: 'File',
        },
        properties: {
          id: { isVisible: false },
          documentCode: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          projectName: {
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          details: {
            type: 'textarea',
            isVisible: { list: false, edit: true, show: true, filter: false },
          },
          status: {
            isVisible: { list: true, edit: true, show: true, filter: true },
          },
          rejectionReason: {
            type: 'textarea',
            isVisible: { list: false, edit: true, show: true, filter: false },
          },
          fileName: {
            isVisible: { list: true, edit: true, show: true, filter: true },
          },
          fileSize: {
            isVisible: { list: true, edit: true, show: true, filter: false },
          },
          mimeType: {
            isVisible: { list: true, edit: true, show: true, filter: true },
          },
          filePath: {
            isVisible: { list: false, edit: true, show: true, filter: false },
          },
          createdAt: {
            isVisible: { list: true, edit: false, show: true, filter: true },
          },
          updatedAt: {
            isVisible: { list: false, edit: false, show: true, filter: false },
          }
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
            key: 'filePath',
            filePath: 'filePath',
            filename: 'fileName',
            mimeType: 'mimeType',
            size: 'fileSize',
          },
          uploadPath: (record, filename) => {
            const id = record?.params?.id || 'temp'
            return `documents/${id}/${filename}`
          },
          validation: {
            mimeTypes: ['application/pdf', 'image/png', 'image/jpeg', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            maxSize: 10 * 1024 * 1024, // 10MB
          },
          componentLoader,
        }),
      ],
    },

    // Document Approval Management
    {
      resource: { model: getModelByName('DocumentApproval'), client: prisma },
      options: {
        navigation: {
          name: 'เอกสาร',
          icon: 'File',
        },
        properties: {
          id: { isVisible: false },
          comments: {
            type: 'textarea',
            isVisible: { list: true, edit: true, show: true, filter: false },
          },
          status: {
            isVisible: { list: true, edit: true, show: true, filter: true },
          },
          createdAt: {
            isVisible: { list: true, edit: false, show: true, filter: true },
          },
          updatedAt: {
            isVisible: { list: false, edit: false, show: true, filter: false },
          }
        },
        actions: {
          new: { isAccessible: true },
          edit: { isAccessible: true },
          delete: { isAccessible: true },
          bulkDelete: { isAccessible: true },
        },
      },
    },

    // Document History Management
    {
      resource: { model: getModelByName('DocumentHistory'), client: prisma },
      options: {
        navigation: {
          name: 'เอกสาร',
          icon: 'File',
        },
        properties: {
          id: { isVisible: false },
          action: {
            isVisible: { list: true, show: true, edit: true, filter: true },
          },
          remark: {
            type: 'textarea',
            isVisible: { list: true, edit: true, show: true, filter: false },
          },
          actionDate: {
            isVisible: { list: true, show: true, edit: false, filter: true },
          }
        },
        actions: {
          new: { isAccessible: true },
          edit: { isAccessible: true },
          delete: { isAccessible: true },
          bulkDelete: { isAccessible: true },
        },
      },
    },

    // Notification Management
    {
      resource: { model: getModelByName('Notification'), client: prisma },
      options: {
        navigation: {
          name: 'การแจ้งเตือน',
          icon: 'Bell',
        },
        properties: {
          id: { isVisible: false },
          type: {
            isVisible: { list: true, show: true, edit: true, filter: true },
          },
          message: {
            type: 'textarea',
            isVisible: { list: true, edit: true, show: true, filter: false },
          },
          metadata: {
            type: 'mixed',
            isVisible: { list: false, edit: true, show: true, filter: false },
          },
          read: {
            isVisible: { list: true, edit: true, show: true, filter: true },
          },
          readAt: {
            isVisible: { list: true, edit: false, show: true, filter: true },
          },
          createdAt: {
            isVisible: { list: true, edit: false, show: true, filter: true },
          }
        },
        actions: {
          new: { isAccessible: true },
          edit: { isAccessible: true },
          delete: { isAccessible: true },
          bulkDelete: { isAccessible: true },
        },
      },
    },
  ]
} 