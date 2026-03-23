const options_worktopic = {
    navigation: {
        name: 'ตั้งค่าระบบ',
        icon: 'Home',
    },
    properties: {
        title_work: {
            type: 'select',
            availableValues: [
                { value: '1', label: 'งานควบคุมอาคาร' },
                { value: '2', label: 'งานระวังที่สาธารณะ' },
                { value: '3', label:'งานผังเมือง' },           
            ]
        },
        category: {
            type:'string',
            props: { placeholder: 'หมวดหมู่' },
        },
        created_at: {
           isVisible: false,
        },
        updated_at: {
            isVisible: false,
        },
    },
    actions: {
        new: { showInDrawer: true },  
        edit: { showInDrawer: true },  
        show: { showInDrawer: true },  
    }
}
export default options_worktopic;