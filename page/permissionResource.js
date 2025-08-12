const options_permission = {
    navigation: {
      name: 'ผู้ใช้และสิทธิ์',
      icon: 'User',
    },
    properties: {
      id: { isVisible: false },
      name: {
        isVisible: { list: true, show: true, edit: true, filter: true }
      },
      description: {
        type: 'textarea',
        isVisible: { list: false, edit: true, show: true, filter: false },
      },
      resource: {
        isVisible: { list: true, show: true, edit: true, filter: true }
      },
      action: {
        isVisible: { list: true, show: true, edit: true, filter: true }
      },
      isActive: {
        isVisible: { list: true, show: true, edit: true, filter: true }
      },
      // แสดงความสัมพันธ์กับ Roles
      roles: {
        isVisible: { list: false, show: true, edit: false, filter: false },
        reference: 'Role',
        isArray: true,
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
  export default options_permission