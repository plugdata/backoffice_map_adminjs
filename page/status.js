
const options_status = {
    navigation: {
        name: 'ตั้งค่าระบบ',
        icon: 'Status',
    },
    properties: {
        name_titel:{
            type: 'text',
            props: { placeholder: 'สถานะเอกสาร' },
   
        },
        status:{
          isVisible: false,
        },      
        createdAt:{
            isVisible: true,
        }
  
    },
    actions: {
        new: {   showInDrawer: true },  
        edit: { showInDrawer: true },  
        show: { showInDrawer: true },  

    }
}

export default options_status;