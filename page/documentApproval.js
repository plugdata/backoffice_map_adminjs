const options_documentApproval = {
    navigation: {
      name: 'เอกสาร',
      icon: 'File',
    },
    properties: {
      id: { isVisible: false },
      comments: {
        type: 'textarea',
        isVisible: { list: true, edit: true, show: true, filter: false },
      },
      status: {
        isVisible: { list: true, edit: true, show: true, filter: true },
      },
      createdAt: {
        isVisible: { list: true, edit: false, show: true, filter: true },
      },
      updatedAt: {
        isVisible: { list: false, edit: false, show: true, filter: false },
      }
    },
    actions: {
      new: { isAccessible: true },
      edit: { isAccessible: true },
      delete: { isAccessible: true },
      bulkDelete: { isAccessible: true },
    },
  }
  export default options_documentApproval