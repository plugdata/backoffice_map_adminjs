

const options_upload = {
    navigation: {
      name: 'เอกสาร',
      icon: 'File',
    },
    properties: {
      id: { isVisible: false },
      documentCode: {
        isVisible: { list: true, show: true, edit: true, filter: true }
      },
      projectName: {
        isVisible: { list: true, show: true, edit: true, filter: true }
      },
      details: {
        type: 'textarea',
        isVisible: { list: false, edit: true, show: true, filter: false },
      },
      status: {
        isVisible: { list: true, edit: true, show: true, filter: true },
      },
      reviewStatus: {
        isVisible: { list: true, edit: true, show: true, filter: true },
      },
      reviewComments: {
        type: 'textarea',
        isVisible: { list: false, edit: true, show: true, filter: false },
      },
      creatorId: {
        isVisible: { list: true, show: true, edit: false, filter: true },
        reference: 'User',
      },
      hrReviewerId: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        reference: 'User',
      },
      ceoApproverId: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        reference: 'User',
      },
      fileName: {
        isVisible: { list: true, edit: true, show: true, filter: true },
      },
      fileSize: {
        isVisible: { list: true, edit: true, show: true, filter: false },
      },
      mimeType: {
        isVisible: { list: true, edit: true, show: true, filter: true },
      },
      filePath: {
        isVisible: { list: true, edit: true, show: true, filter: false },
    /*     components: {
          list: 'UploadListComponent',
          show: 'UploadShowComponent',
          edit: 'UploadEditComponent',
        }, */
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
  export default options_upload