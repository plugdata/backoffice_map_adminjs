   
   
   const uploads_options = {
    navigation: {
        name: 'อัปโหลด',
        icon: 'Upload',
    },
    properties: {
        id: { isVisible: false },
        namefile: { 
            isTitle: true,
            isVisible: { list: true, show: true, edit: true, filter: true }
        },
        token: {
            type: 'text',
            isVisible: { list: true, show: true, edit: false, filter: true },
           
        },
        url: {
            type: 'text',
            isVisible: { list: true, show: true, edit: false, filter: false },
            components: {
              list: 'FileUrlPreview',
              show: 'FileUrlPreview',
            },
        },
        fileType: {
            type: 'text',
            isVisible: { list: true, show: true, edit: true, filter: true }
        },
        size: {
            type: 'text',
            isVisible: { list: true, show: true, edit: false, filter: false },
            components: {
           //     list: 'FileSizeDisplay',
           //     show: 'FileSizeDisplay'
            }
        },
        createdAt: {
            type: 'datetime',
            isVisible: { list: true, show: true, edit: false, filter: true }
        },
        uploadedBy: {
            type: 'number',
            isVisible: { list: false, show: true, edit: false, filter: false }
        },
        buildingControlId: {
            type: 'number',
            isVisible: { list: false, show: true, edit: false, filter: true }
        },
        riskZoneId: {
            type: 'number',
            isVisible: { list: false, show: true, edit: false, filter: true }
        },
        zoningPlanId: {
            type: 'number',
            isVisible: { list: false, show: true, edit: false, filter: true }
        }
    },
    actions: {
        new: {
            isAccessible: false // ปิดการสร้างใหม่ผ่านหน้า uploads เพราะจะสร้างผ่าน FileUpload component
        },
        edit: {
         
        },

        delete: {
      
            }
            ,
        }
    }


export default uploads_options;
