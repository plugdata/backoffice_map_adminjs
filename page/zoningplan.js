import { getFiscalYear } from './buildingControl/helpers.js'
import { getFullname } from './buildingControl/helpers.js'
import { actions_zoningPlan } from './zoningPlan/actions.js'
const options_zoningplan = {
    navigation: {
        name: 'ฝ่ายควบคุมอาคาร',
        icon: 'Home',
    },
    listProperties: [
        'areaName',
        'notes',
        'status',
        'fiscalYearId',
        'owner_id',
    ],
    showProperties: [
        'areaName',
        'notes',
        'status',
        'fiscalYearId',
        'owner_id',
        'map',
    ],
    editProperties: [
        'areaName',
        'notes',
        'status',
        'fiscalYearId',
        'owner_id',
        'map',
    ],
    filterProperties: [
        'areaName',
        'notes',
        'status',
        'fiscalYearId',
        'owner_id',
    ],
    properties: {
        areaName: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        notes: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        fiscalYearId: {
            type: 'select',
            availableValues: await getFiscalYear(),
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        owner_id: {
            type: 'select',
            availableValues: await getFullname(),
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        map: {
            type: 'map',
            isVisible: { list: true, show: true, edit: true, filter: true },
            components: { show: 'ShowMap', edit: 'MapZoningPlan' },
        },
    },
    actions: actions_zoningPlan,
}
export default options_zoningplan