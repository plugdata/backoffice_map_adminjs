    // User Management
   const options_user = {
          navigation: {
            name: 'ผู้ใช้และสิทธิ์',
            icon: 'User',
          },
          properties: {
            id: { isVisible: false },
            email: {
              isVisible: { list: true, show: true, edit: true, filter: true }
            },
            username: {
              isVisible: { list: true, show: true, edit: true, filter: true }
            },
            firstName: {
              isVisible: { list: true, show: true, edit: true, filter: true }
            },
            lastName: {
              isVisible: { list: true, show: true, edit: true, filter: true }
            },
            password: { 
              type: 'password',
              isVisible: { list: false, show: false, edit: true, filter: false }
            },
            employeeId: {
              isVisible: { list: true, show: true, edit: true, filter: true }
            },
            departmentId: {
              isVisible: { list: true, show: true, edit: true, filter: true },
              reference: 'Department',
            },
            // แสดงความสัมพันธ์กับ Roles
            roles: {
              isVisible: { list: false, show: true, edit: true, filter: false },
              reference: 'Role',
              isArray: true,
            },
            isActive: {
              isVisible: { list: true, show: true, edit: true, filter: true }
            },
            lastLoginAt: {
              isVisible: { list: true, show: true, edit: false, filter: true }
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
          // เพิ่ม custom title สำหรับแสดงใน reference
          title: (record) => {
            const firstName = record?.params?.firstName || ''
            const lastName = record?.params?.lastName || ''
            const username = record?.params?.username || ''
            return `${firstName} ${lastName}`.trim() || username || 'ไม่ระบุชื่อ'
          },
      }
    export default options_user