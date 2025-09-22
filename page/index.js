// ========================================
// AdminJS Resources (แยก resource ออกจาก config หลัก)
// ========================================

import { getModelByName } from '@adminjs/prisma'
import options_user from './user.js'
//import options_status from './status.js'
import options_owner from './owner.js'
import options_fiscalyear from './fiscalyear.js'
import options_buildcontrol from './buildcontrol.js'
import options_worktopic from './worktopic.js'
import uploads_options from './uploads.js'
import options_zoneRisk from './zoneRisk.js'
import options_map from './map.js'
import options_planproject from './planproject.js'
import options_approvedproject from './approveproject.js'
// ฟังก์ชันรวม resource ทั้งหมด
export const createAdminResources = (prisma) => {
  (prisma)
  return [
     {
      resource: { model: getModelByName('User'), client: prisma },
      options:options_user,
    
     },

     {
      resource: { model: getModelByName('Owner'), client: prisma },
      options: options_owner,
      },
    {
      resource: { model: getModelByName('FiscalYear'), client: prisma },
      options: options_fiscalyear,
     
    },
    {
      resource: { model: getModelByName('WorkTopic'), client: prisma },
      options: options_worktopic,
    },
    {
      resource: { model: getModelByName('BuildingControl'), client: prisma },
      options: options_buildcontrol,
      
    },

    {
      resource: { model: getModelByName('RiskZone'), client: prisma },
      options: options_zoneRisk,
      
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
      resource: { model: getModelByName('PlanProject'), client: prisma },
      options: options_planproject,
    },
    {
      resource: { model: getModelByName('ApprovedProject'), client: prisma },
      options: options_approvedproject,
    },
     {
      resource: { model: getModelByName('Map'), client: prisma },
      options: options_map,
  }, 
    {  
      resource: { model: getModelByName('Uploads'), client: prisma },
      options: uploads_options,
    },
  ]
} 