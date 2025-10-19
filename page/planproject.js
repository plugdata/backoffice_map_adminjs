import { backButton } from "./feature/back-button.js"
import { getFiscalYear } from './buildingControl/helpers.js'
import { getStatusAvailableValues } from './buildingControl/helpers.js'
const options_planproject = {
    navigation: {
        name: 'ฝ่ายควบคุมการก่อสร้าง',
        icon: 'Home',
    },
    listProperties: [
        'code',
        'name',
        'category',
        'startDate',
        'endDate',
        'supervisor',
        'details',
        'status',

    ],
    properties: {
        code: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        name: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        category: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        startDate: {
            type: 'datetime',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        endDate: {
            type: 'datetime',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        supervisor: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        budget: {
            type: 'number',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        fiscalYearId: {
            type: 'select',
            availableValues: await getFiscalYear(),
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        status: {
            type: 'select',
            availableValues: await getStatusAvailableValues(),
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
   
        details: {
            type: 'textarea',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
    },
    actions: {
        backButton,
    },

}


export default options_planproject