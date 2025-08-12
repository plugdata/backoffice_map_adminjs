
const options_notification = {
  navigation: {
    name: 'การแจ้งเตือน',
    icon: 'Bell',
  },
  properties: {
    id: { isVisible: false },
    type: {
      isVisible: { list: true, show: true, edit: true, filter: true },
    },
    message: {
      type: 'textarea',
      isVisible: { list: true, edit: true, show: true, filter: false },
    },
    metadata: {
      type: 'mixed',
      isVisible: { list: false, edit: true, show: true, filter: false },
    },
    read: {
      isVisible: { list: true, edit: true, show: true, filter: true },
    },
    readAt: {
      isVisible: { list: true, edit: false, show: true, filter: true },
    },
    createdAt: {
      isVisible: { list: true, edit: false, show: true, filter: true },
    }
  },
  actions: {
    new: { isAccessible: true },
    list: { isAccessible: true ,
      component: 'notification',
    },
    delete: { isAccessible: true },
    bulkDelete: { isAccessible: true },
  },
}
export default options_notification
