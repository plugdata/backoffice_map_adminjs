// ./components/FileUrlPreview.jsx
import React from 'react'
import { Box, Icon } from '@adminjs/design-system'
import { Eye, Download } from 'lucide-react'  // 👁 สำหรับ preview, ⬇ สำหรับ download

const FileUrlPreview = (props) => {
  const { record, property } = props
  const url = record?.params?.[property.name]   // "/api/files/xxxx.pdf"

  if (!url) return <Box>ไม่มีไฟล์</Box>

  // ✅ ตัดเอา filename
  const parts = url.split('/')
  const filename = parts[parts.length - 1]

  const previewUrl = `/api/files/${filename}`
  const downloadUrl = `/api/files/${filename}/download`

  return (
    <Box style={{ display: 'flex', gap: '10px' }}>
      {/* 👁 ปุ่มเปิด preview ในแท็บใหม่ */}
      <a
        href={previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#e5e7eb',
          borderRadius: '50%',
          padding: '8px',
          display: 'inline-flex',
        }}
      >
      <Icon icon="Eye" size={16} color="#93c5fd" />   
      </a>

      {/* ⬇ ปุ่มดาวน์โหลด */}
      <a
        href={downloadUrl}
        style={{
          background: '#e5e7eb',
          borderRadius: '50%',
          padding: '8px',
          display: 'inline-flex',
        }}
      >
        <Icon icon="Download" size={16} color="green" />
      </a>
    </Box>
  )
}

export default FileUrlPreview
