// /resources/buildingControl/layout.js
// Layout สำหรับฟอร์ม Building Control

export const layout_buildingControl = [
  // ========================================
  // 📄 ข้อมูลอาคาร (Building Information)
  // ========================================
  [{ width: 3 / 3, mx: 'auto' }, 
    [
      ['@H3', { children: 'ข้อมูลอาคาร' }],
      [
        { flexDirection: 'row', flex: true, gap: 'sm' }, 
        [
          ['building_type', { flexGrow: 1, pr: 'default' }],
          ['use_purpose', { flexGrow: 1, pr: 'default' }],
          ['quantity', { flexGrow: 1 }],
        ]
      ],
      [
        { flexDirection: 'row', flex: true, gap: 'sm' }, 
        [
          ['license_number', { flexGrow: 1, pr: 'default' }],
          ['date', { flexGrow: 1, pr: 'default' }],
          ['status', { flexGrow: 1 }],
        ]
      ],
    ]
  ],

  // ========================================
  // 👤 ข้อมูลเจ้าของ (Owner Information)
  // ========================================
  [{ width: 3 / 3, mx: 'auto' }, 
    [
      ['@H3', { children: 'ข้อมูลเจ้าของ' }],
      [
        { flexDirection: 'row', flex: true, gap: 'sm' }, 
        [
          ['owner_id', { flexGrow: 1 }],
        ]
      ],
    ]
  ],

  // ========================================
  // 📅 ข้อมูลปีงบประมาณ (Fiscal Year)
  // ========================================
  [{ width: 3 / 3, mx: 'auto' }, 
    [
      ['@H3', { children: 'ข้อมูลปีงบประมาณ' }],
      [
        { flexDirection: 'row', flex: true, gap: 'sm' }, 
        [
          ['fiscalYearId', { flexGrow: 1 }],
        ]
      ],
    ]
  ],

  // ========================================
  // 📍 ข้อมูลพิกัด (Map Coordinates)
  // ========================================
  [{ width: 3 / 3, mx: 'auto' }, 
    [
      ['@H3', { children: 'ข้อมูลพิกัด' }],
      [
        { flexDirection: 'row', flex: true, gap: 'sm' }, 
        [
          ['map', { flexGrow: 1, pr: 'default' }],
    
        ]
      ],
    ]
  ],

  // ========================================
  // 📋 เอกสารแนบ (Attachments)
  // ========================================
  [{ width: 3 / 3, mx: 'auto' }, 
    [
      ['@H3', { children: 'เอกสารแนบ' }],
      'uploadfile',
      ['createdAt', { flexGrow: 1 }],
    ]
  ],



] 