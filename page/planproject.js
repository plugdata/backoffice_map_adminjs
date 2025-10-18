import { backButton } from "./feature/back-button.js"

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
        'budget',
        'fiscalYearId',
        'status',
        'documentCount',
        'details',
    ],
    properties: {
        code: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
    },
    actions: {
        backButton,
        new: { showInDrawer: true },
        edit: { showInDrawer: true },
        show: { showInDrawer: true },
    },

}


export default options_planproject