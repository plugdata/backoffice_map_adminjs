const options_document = {
    navigation: {
      name: 'ตั้งค่า',
      icon: 'Data',
    },
    properties: {
      id: { isVisible: false },
      description: {
        type: 'textarea',
        isVisible: { list: false, edit: true, show: true, filter: false },
      },
      isActive: {
        isVisible: { list: true, show: true, edit: true, filter: true }
      },
      createdAt: {
        isVisible: { list: true, show: true, edit: false, filter: true }
      },
      updatedAt: {
        isVisible: { list: false, show: true, edit: false, filter: false }
      }
    },
    actions: {
      new: { isAccessible: true },
      edit: { isAccessible: true },
      delete: { isAccessible: true },
      bulkDelete: { isAccessible: true },
    },
  }
  export default options_document