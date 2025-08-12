const options_history = {
    navigation: {
      name: 'เอกสาร',
      icon: 'File',
    },
    properties: {
      id: { isVisible: false },
      action: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      remark: {
        type: 'textarea',
        isVisible: { list: true, edit: true, show: true, filter: false },
      },
      actionDate: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      }
    },
    actions: {
      new: { isAccessible: true },
      edit: { isAccessible: true },
      delete: { isAccessible: true },
      bulkDelete: { isAccessible: true },
    },
  }
  export default options_history