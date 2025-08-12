const options_role = {
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
      isActive: {
        isVisible: { list: true, show: true, edit: true, filter: true }
      },
      // แสดงความสัมพันธ์กับ Permissions
      permissions: {
        isVisible: { list: false, show: true, edit: true, filter: false },
        reference: 'Permission',
        isArray: true,
      },
      // แสดงความสัมพันธ์กับ Users
      users: {
        isVisible: { list: false, show: true, edit: false, filter: false },
        reference: 'User',
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
  export default options_role