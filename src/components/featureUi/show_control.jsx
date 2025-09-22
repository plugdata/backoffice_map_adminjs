// ./components/ShowUpload.jsx
import React, { useEffect, useState } from 'react'
import { Box } from '@adminjs/design-system'
import { ApiClient } from 'adminjs'

const api = new ApiClient()

const control_show = (props) => {
  const { record } = props
  const [files, setFiles] = useState([])

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const res = await api.resourceAction({
          resourceId: 'Uploads',
          actionName: 'list',
          query: { 'filters.buildingControlId': record?.params?.id },
        })

        if (res?.data?.records) {
          const arr = res.data.records.map((r) => ({
            name: r.params.namefile,      // ชื่อจริง
            size: r.params.size,
            type: r.params.fileType,
            url: r.params.url,            // ✅ ใช้ url ที่ backend ส่งมา
          }))
          setFiles(arr)
        }
   
      } catch (e) {
        console.error('load error', e)
      }
    }

    if (record?.params?.id) {
      loadFiles()
    }
  }, [record])
console.log(files)
  if (!files || files.length === 0) {
    return <Box>ไม่มีไฟล์</Box>
  }

  return (
    <Box style={{ marginTop: 10 }}>
      <h3>📂 ไฟล์แนบ</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.map((f, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            📄 <strong>{f.name}</strong> ({Math.round(f.size / 1024)} KB) |{" "}
            <a href={f.url} target="_blank" rel="noopener noreferrer">
              ดูไฟล์
            </a>{" "}
            |{" "}
            <a href={`${f.url}/download`}>
              ดาวน์โหลด
            </a>
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default control_show
