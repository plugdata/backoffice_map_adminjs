const options_history = {
    navigation: {
      name: 'เอกสาร',
      icon: 'File',
    },
    properties: {
      id: { isVisible: false },
      action: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      actionDetails: {
        type: 'textarea',
        isVisible: { list: false, edit: false, show: true, filter: false },
      },
      remark: {
        type: 'textarea',
        isVisible: { list: true, edit: false, show: true, filter: false },
      },
      metadata: {
        type: 'mixed',
        isVisible: { list: false, edit: false, show: true, filter: false },
      },
      actionBy: {
        isVisible: { list: true, show: true, edit: false, filter: true },
        reference: 'User',
      },
      actionDate: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      }
    },
    actions: {
      new: { isAccessible: false },
      edit: { isAccessible: false },
      delete: { isAccessible: false },
      bulkDelete: { isAccessible: false },
    },
  }
  export default options_history 