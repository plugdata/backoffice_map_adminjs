// ./components/ShowUpload.jsx
import React, { useEffect, useState } from 'react'
import { Box } from '@adminjs/design-system'

const ShowUpload = (props) => {
  const { record } = props
  const [files, setFiles] = useState([])

  useEffect(() => {
    const val = record?.params?.uploadfile
    if (val) {
      try {
        setFiles(JSON.parse(val))
      } catch (e) {
        console.error('parse error', e)
      }
    }
  }, [record])

  if (!files || files.length === 0) {
    return <Box>ไม่มีไฟล์</Box>
  }

  return (
    <Box style={{ marginTop: 10 }}>
      <h3>📂 ไฟล์แนบ</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.map((f, i) => {
          const parts = f.url.split('/')
          const filename = parts[parts.length - 1]
          const previewUrl = `/api/files/${filename}`
          const downloadUrl = `/api/files/${filename}/download`

          return (
            <li key={i} style={{ marginBottom: 8 }}>
              📄 <strong>{f.name}</strong> ({Math.round(f.size / 1024)} KB) |{" "}
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                ดูไฟล์
              </a>{" "}
              |{" "}
              <a href={downloadUrl}>
                ดาวน์โหลด
              </a>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default ShowUpload
