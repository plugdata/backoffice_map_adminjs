// ========================================
// AdminJS Resources (แยก resource ออกจาก config หลัก)
// ========================================

import { getModelByName } from '@adminjs/prisma'
import options, { language } from '../utils/optionsResources.js'
import  options_user  from './userResource.js'
import  options_department  from './documentResource.js'
import  options_documentType  from './documentType.js'
import  options_confiden  from './confidenResources.js'
import  options_role  from './roleResource.js'
import  options_permission  from './permissionResource.js'
import  options_upload  from './uploaddocuments .js'
import upload from './feature/uploadfile.js'
import  options_history  from './hisstoryResources.js'
import  options_documentApproval  from './documentApproval.js'
import  options_notification  from './notificationResource.js'

// ฟังก์ชันรวม resource ทั้งหมด
export const createAdminResources = (prisma) => {
  return [
        // setting 
        {
          resource: { model: getModelByName('Department'), client: prisma },
          options: options_department,
        },

    // User
     {resource: {model:getModelByName('User'),client:prisma},
      options: options_user
    },

    // Document Type Management
    {
      resource: { model: getModelByName('DocumentType'), client: prisma },
      options: options_documentType
    },

    // Confidentiality Level Management
    {
      resource: { model: getModelByName('ConfidentialityLevel'), client: prisma },
      options: options_confiden
    },

    // Role Management
    {
      resource: { model: getModelByName('Role'), client: prisma },
       options: options_role
    },

    // Permission Management
    {
      resource: { model: getModelByName('Permission'), client: prisma },
      options: options_permission,
      
    },

    // Document Management
    {
      resource: { model: getModelByName('Document'), client: prisma },
      options: options_upload,
      features: [upload],
    },

    // Document Approval Management
    {
      resource: { model: getModelByName('DocumentApproval'), client: prisma },
      options: options_documentApproval
    },

    // Document History Management
    {
      resource: { model: getModelByName('DocumentHistory'), client: prisma },
      options: options_history,
    },

    // Notification Management
    {
      resource: { model: getModelByName('Notification'), client: prisma },
      options: options_notification
    },
  ]
} 