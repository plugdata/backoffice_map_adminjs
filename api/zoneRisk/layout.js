const layout_zoneRisk = [
        // กล่องหลัก (ความกว้างเต็ม)
        [{ width: 3 / 3, mx: 'auto' },
          [
            // หัวข้อ
            ['@H3', { children: 'ข้อมูลระวางสาธารณะ' }],
      
            // ฟิลด์เรียงแนวตั้งทั้งหมด
            ['zoneType'],
            ['description'],
            ['status'],
            ['fiscalYearId'],
            ['owner_id'],
            // หัวข้อใหม่สำหรับส่วนแผนที่
            ['@H3', { children: 'ข้อมูลพิกัด' }],
            ['map']
          ]
        ]
      ]

export default layout_zoneRisk