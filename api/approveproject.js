const options_approvedproject = {
    navigation: {
        name: 'ฝ่ายควบคุมการก่อสร้าง',
        icon: 'Home',
    },
    listProperties: [
        'title_project',
        'category',
    ],
    properties: {
        title_project: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
        category: {
            type: 'string',
            isVisible: { list: true, show: true, edit: true, filter: true },
        },
    },
    actions: {
        new: { showInDrawer: true },
        edit: { showInDrawer: true },
        show: { showInDrawer: true },
    }
}
export default options_approvedproject
