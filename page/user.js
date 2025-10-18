import titles from './keepdata/titles.js'
import { addFullName } from './user/joinString.js'
import { backButton } from './feature/back-button.js'

const options_user = {
    navigation: {
      name: 'ตั้งค่าระบบ',
      icon: 'Settings',
    },
    listProperties: [
      'id',          // ซ่อนหรือแสดงก็ได้
      'username',
    //  'title_use',
     // 'fullName',
      'title_fullname',
      'position',
      'email',
      'phone',
      'role',
    ],
    showProperties: [
      'id',          // ซ่อนหรือแสดงก็ได้
      'username',
      'title_use',
      'fullName',
      'position',
      'email',
      'phone',
      'role',
    ],
    filterProperties: [
      'title_use',
      'fullName',
      'position',
      'email',
      'phone',
      'role',
    ],
    properties: {
      id: { isVisible: false },
      username: {
        type: 'text',
        isRequired: true,
        description: 'บันทึกชื่อผู้ใช้สำหรับเข้าสู่ระบบ (ต้องไม่ซ้ำ)',
        props: { placeholder: 'username' },
      },
      password: {
        type: 'password',
        isRequired: true,
        description: 'บันทึกรหัสผ่านสำหรับเข้าสู่ระบบ',
        props: { placeholder: 'password' },
      },
      title_use: {
        type: 'text',
        isRequired: true,
        availableValues: titles ,// เอา array มาใส่ตรง ๆ
        props: { placeholder: 'เลือกคำนำหน้า' },
      },
      title_fullname: {
       isVisible: { list: true, show: true, edit: true, filter: false },
     
      },
      fullName: { type: 'text' ,  isTitle: true,  },
      position: { type: 'text' , },
      address: { type: 'text' },
      email: { 
        type: 'email', 
        props: { 
          placeholder: 'กรอกอีเมล @',
          pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
          title: 'กรุณากรอกอีเมลที่ถูกต้อง เช่น user@example.com'
        }
      },
      phone: {
        type: 'number',
        isRequired: true,
        props: { 
          placeholder: 'กรอกเฉพาะตัวเลข 10 หลัก',
          pattern: '\\d{10}',
          title: 'กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก'
        },
      },
      role: {
        availableValues: [
          { value: '1', label: 'user' },
          { value: '2', label: 'admin' },
          { value: '3', label: 'superadmin' },
        ],
      },
    },
    actions: {
      new: {
        layout: [
          [{ width: 3 / 3, mx: 'auto' }, [
            ['@H3', { children: 'ข้อมูลบัญชี' }],
            [{ flexDirection: 'row', flex: true }, [
              ['username', { flexGrow: 1, pr: 'default' }],
              ['password', { flexGrow: 1 }],
            ]],
            ['@H3', { children: 'ข้อมูลเจ้าหน้าที่' }],
            [{ flexDirection: 'row', flex: true }, [
              ['title_use', { width: '20%' , pr: 'default'}],      // 20% ของแถว
              ['fullName',  { width: '40%' , pr: 'default' }],      // 40% ของแถว
              ['position',  { width: '40%'  }],      // 40% ของแถว
            ]],
            [{ flexDirection: 'row', flex: true }, [
              ['email', { flexGrow: 1, pr: 'default' }],
              ['phone', { flexGrow: 1, pr: 'default' }],
              ['address', { flexGrow: 1 }],
            ]],
            ['@H3', { children: 'สิทธิ์ผู้ใช้งาน' }],
            'role',
          ]],
        ],
    
     
      },
      edit: {
        layout: [
          [{ width: 3 / 3, mx: 'auto' }, [
            ['@H3', { children: 'ข้อมูลบัญชี' }],
            [{ flexDirection: 'row', flex: true }, [
              ['username', { flexGrow: 1, pr: 'default' }],
              ['password', { flexGrow: 1 }],
            ]],
            ['@H3', { children: 'ข้อมูลเจ้าหน้าที่' }],
            [{ flexDirection: 'row', flex: true }, [
            ['title_use', { flexGrow: 1, pr: 'default' }],
            ['fullName', { flexGrow: 1, pr: 'default' }],
            ['position', { flexGrow: 1, pr: 'default' }],
            ]],
            [{ flexDirection: 'row', flex: true }, [
              ['email', { flexGrow: 1, pr: 'default' }],
              ['phone', { flexGrow: 1, pr: 'default' }],
              ['address', { flexGrow: 1 }],
            ]],
            ['@H3', { children: 'สิทธิ์ผู้ใช้งาน' }],
            'role',
          ]],
        ],
       
      },
       show:{
       /*  component: 'ShowUser', */
       layout: [
        [{ width: 3 / 3, mx: 'auto' }, [
          ['@H3', { children: 'ข้อมูลบัญชี' }],
          [{ flexDirection: 'row', flex: true }, [
            ['username', { flexGrow: 1, pr: 'default' }],
          ]],
          ['@H3', { children: 'ข้อมูลเจ้าหน้าที่' }],
          [{ flexDirection: 'row', flex: true }, [
          ['title_use', { flexGrow: 1, pr: 'default' }],
          ['fullName', { flexGrow: 1, pr: 'default' }],
          ['position', { flexGrow: 1, pr: 'default' }],
          ]],
          [{ flexDirection: 'row', flex: true }, [
            ['email', { flexGrow: 1, pr: 'default' }],
            ['phone', { flexGrow: 1, pr: 'default' }],
            ['address', { flexGrow: 1 }],
          ]],
          ['@H3', { children: 'สิทธิ์ผู้ใช้งาน' }],
          'role',
        ]],
      ],
        }, 
      delete: { isAccessible: true },

      list: { after: addFullName },   // ✅ ใส่ใน action ไม่ใช่ property
    
    
      backButton,
      
      
    },

  }
  
  export default options_user
  