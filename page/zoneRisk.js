import { getStatusAvailableValues, getFullname, getFiscalYear } from './buildingControl/helpers.js'
 const options_zoneRisk = {
        navigation: {
            name: 'ฝ่ายควบคุมอาคาร',
        },
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
            }
        }
    
 
export default options_zoneRisk