import { actions_planbuild } from './planbuild/actions.js'


const options_planbuild = {
    navigation: {
        name: 'ฝ่ายควบคุมอาคาร',
        icon: 'Building',
    },
    
    listProperties: [
        'areabuild',
        'notes',
       // 'user_id',
    //    'map',
    ],
    showProperties: [
        'areabuild',
        'notes',
       // 'user_id',
        'map',
    ],
    editProperties: [
        'areabuild',
        'notes',
       // 'user_id',
        'map',
    ],
    filterProperties: [
        'areabuild',
        'notes',
       // 'user_id',
     //   'map',
    ],
    properties: {
        areabuild: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        notes: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },

        map: {
            type: 'map',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
    },
    actions: actions_planbuild,
}
export default options_planbuild