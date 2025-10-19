import { getStatusAvailableValues, getFullname, getFiscalYear } from './buildingControl/helpers.js'
import { actions_zoneRisk } from './zoneRisk/actions.js'
 const options_zoneRisk = {
    navigation: {
        name: 'ฝ่ายควบคุมอาคาร',
        icon: 'Home',
      },
        listProperties: [
            'zoneType',
            'description',
            'status',
            'fiscalYearId',
            'owner_id',
        ],
        showProperties: [
                'zoneType',
                'description',
                'status',
                'fiscalYearId',
                'owner_id',
                'map',
        ],
        editProperties: [
            'zoneType',
            'description',
            'status',
            'fiscalYearId',
            'owner_id',
            'map',
        ],
        filterProperties: [
            'zoneType',
            'description',
            'status',
            'fiscalYearId',
            'owner_id',
            'map',
        ],
        properties: {
            zoneType: {
                type: 'string',
                isVisible: {
                    edit: true,
                    show: true,
                }
            },
            description: {
                type: 'string',
                isVisible: {
                    edit: true,
                    show: true,
                }
            },
            owner_id: {
                type: 'select',
                availableValues: await getFullname(),
                isVisible: { list: true, show: true, edit: true, filter: true },
              },

              status: {
                type: 'select',
                availableValues: [ { value: '1', label: 'อนุมัติแล้ว' },
                    { value: '2', label: 'กำลังตรวจสอบ' },
                    { value: '3', label: 'ไม่อนุมัติ' },
                    { value: '4', label: 'อยู่ระหว่างการดำเนินการ' }]
,
                isVisible: { list: true, show: true, edit: true, filter: true },
              }, 
              map: {
                isVisible: { list: false, show: true, edit: true, filter: false },
               
                components: { edit:'MapRiskZone' , show:'ShowMap'},
              }, 
              fiscalYearId: {
                type: 'select',
                availableValues: await getFiscalYear(),
                isVisible: { list: true, show: true, edit: true, filter: true },
              },
            },
            actions: actions_zoneRisk,
            
        }

export default options_zoneRisk