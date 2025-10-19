// ./components/FileUploadEdit.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

// Helper function สำหรับแก้ไข Mojibake encoding
function fixMojibakeEncoding(text) {
  if (!text || typeof text !== 'string') {
    return text
  }

  // ตรวจสอบว่ามี Mojibake encoding หรือไม่
  const hasMojibake = text.includes('à¸') || text.includes('à¹') || text.includes('à¸­') || 
                      text.includes('\\x')
  
  if (!hasMojibake) {
    return text
  }

  console.log(`🔍 [fixMojibakeEncoding] Processing: "${text}"`)

  // วิธีที่ 1: แก้ไข \x escape sequences
  try {
    let processedText = text
    // แปลง \x escape sequences กลับเป็น bytes
    if (text.includes('\\x')) {
      processedText = text.replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16))
      })
      console.log(`🔧 [fixMojibakeEncoding] After \\x conversion: "${processedText}"`)
    }

    // วิธีที่ 2: ใช้ Buffer (Node.js)
    if (typeof Buffer !== 'undefined') {
      const buffer = Buffer.from(processedText, 'latin1')
      const decoded = buffer.toString('utf8')
      if (decoded !== processedText && !decoded.includes('à¸') && !decoded.includes('\\x')) {
        console.log(`🔧 Fixed Mojibake (Buffer): "${text}" → "${decoded}"`)
        return decoded
      }
    }
  } catch (e) {
    console.warn('⚠️ Buffer decode failed:', e)
  }

  // วิธีที่ 1.5: แก้ไข \x escape sequences แบบใหม่
  try {
    if (text.includes('\\x')) {
      // แปลง \x escape sequences เป็น UTF-8 bytes
      const utf8Bytes = []
      const matches = text.match(/\\x([0-9A-Fa-f]{2})/g)
      
      if (matches) {
        let processedText = text
        for (const match of matches) {
          const hex = match.substring(2) // เอา \x ออก
          const byte = parseInt(hex, 16)
          utf8Bytes.push(byte)
          processedText = processedText.replace(match, String.fromCharCode(byte))
        }
        
        console.log(`🔧 [fixMojibakeEncoding] UTF-8 bytes:`, utf8Bytes)
        console.log(`🔧 [fixMojibakeEncoding] After \\x conversion: "${processedText}"`)
        
        // ลองแปลงเป็น UTF-8
        if (typeof Buffer !== 'undefined') {
          const buffer = Buffer.from(utf8Bytes)
          const decoded = buffer.toString('utf8')
          if (decoded !== text && !decoded.includes('à¸') && !decoded.includes('\\x')) {
            console.log(`🔧 Fixed Mojibake (UTF-8 bytes): "${text}" → "${decoded}"`)
            return decoded
          }
        }
      }
    }
  } catch (e) {
    console.warn('⚠️ UTF-8 bytes conversion failed:', e)
  }

  // วิธีที่ 3: แปลงจาก Latin-1 เป็น UTF-8
  try {
    const latin1Bytes = new Uint8Array(text.split('').map(c => c.charCodeAt(0)))
    const utf8String = new TextDecoder('latin1').decode(latin1Bytes)
    
    if (utf8String !== text && !utf8String.includes('à¸') && !utf8String.includes('\\x')) {
      console.log(`🔧 Fixed Mojibake (Latin-1): "${text}" → "${utf8String}"`)
      return utf8String
    }
  } catch (e) {
    console.warn('⚠️ Latin-1 decode failed:', e)
  }

  // วิธีที่ 4: แปลง UTF-8 bytes โดยตรง
  try {
    const bytes = []
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i)
      if (charCode > 127) {
        // แปลงเป็น UTF-8 bytes
        if (charCode < 2048) {
          bytes.push(0xC0 | (charCode >> 6))
          bytes.push(0x80 | (charCode & 0x3F))
        } else {
          bytes.push(0xE0 | (charCode >> 12))
          bytes.push(0x80 | ((charCode >> 6) & 0x3F))
          bytes.push(0x80 | (charCode & 0x3F))
        }
      } else {
        bytes.push(charCode)
      }
    }
    
    const decoded = new TextDecoder('utf-8').decode(new Uint8Array(bytes))
    if (decoded !== text && !decoded.includes('à¸') && !decoded.includes('\\x')) {
      console.log(`🔧 Fixed Mojibake (UTF-8): "${text}" → "${decoded}"`)
      return decoded
    }
  } catch (e) {
    console.warn('⚠️ UTF-8 decode failed:', e)
  }

  // ถ้าแก้ไขไม่ได้ ให้คืนค่าเดิม
  console.warn(`⚠️ Could not fix Mojibake encoding for: "${text}"`)
  return text
}

// คอมโพเนนต์ FileUploadEdit
// หน้าที่: จัดการอัปโหลด/ลบไฟล์ในหน้าแก้ไขของ AdminJS
// การทำงานหลัก:
// - โหลดไฟล์เดิมจาก field `uploadfile` (สตริง JSON) มาเก็บใน state
// - อัปโหลดไฟล์หลายไฟล์ทีเดียวไปยัง `/api/upload/multiple`
// - รวมไฟล์ใหม่กับไฟล์เดิม แล้ว sync ค่ากลับให้ AdminJS ผ่าน `props.onChange`
// - รองรับการลบไฟล์จากรายการ แล้ว sync ค่ากลับเหมือนกัน

const FileUploadEdit = (props) => {
  const [files, setFiles] = useState([])

  // ✅ โหลดไฟล์เก่าเมื่อเข้าหน้า edit
  // - อ่านจาก `props.record.params.uploadfile` ถ้ามี
  // - แปลงโครงสร้าง { namefile, url, size, fileType } -> { name, url, size, type }
  //   เพื่อให้สอดคล้องกับรูปแบบที่คอมโพเนนต์นี้ใช้เป็น state
  useEffect(() => {
    const val = props.record?.params?.uploadfile
    console.log('🔍 [FileUploadEdit] props.record?.params?.uploadfile:', val)
    
    if (val) {
      try {
        const arr = JSON.parse(val) // [{ namefile, url, size, fileType }]
        console.log('🔍 [FileUploadEdit] parsed array:', arr)
        
        // แปลงให้ตรงกับรูปแบบที่ใช้ใน state
        const normalizedFiles = arr.map((file, index) => {
          console.log(`🔍 [FileUploadEdit] file[${index}]:`, file)
          
          // ✅ แก้ไข UTF-8 encoding สำหรับชื่อไฟล์
          const fileName = fixMojibakeEncoding(file.namefile || file.name || file.originalName || `file_${index}`)
          
          return {
            name: fileName,
            url: file.url,
            size: file.size,
            type: file.fileType || file.type
          }
        })
        
        console.log('🔍 [FileUploadEdit] normalizedFiles:', normalizedFiles)
        setFiles(normalizedFiles)
      } catch (e) {
        console.error('❌ [FileUploadEdit] parse error:', e)
      }
    }
  }, [props.record])

  // ✅ อัปโหลดไฟล์ใหม่
  // ขั้นตอน:
  // 1) รวมไฟล์ที่ผู้ใช้เลือกใส่ FormData ด้วย key 'files' (หลายไฟล์)
  // 2) แนบ `buildingControlId` (ถ้ามี `record.id`) เพื่อให้ backend ผูกข้อมูลได้
  // 3) POST ไป `/api/upload/multiple` แล้วรอผลลัพธ์
  // 4) Map ข้อมูลไฟล์ที่อัปโหลดกลับมา -> รูปแบบ state ของเรา
  // 5) รวมกับไฟล์เดิมใน state และแจ้ง AdminJS ด้วย `props.onChange`
  const handleUpload = useCallback(async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return
    console.log("📂 Selected files:", selectedFiles)
    try {
      // ส่งครั้งเดียวหลายไฟล์ไป /api/upload/multiple
      const formData = new FormData()
      for (const f of selectedFiles) {
        formData.append('files', f)
        console.log("📄 Filename:", f.name)
      }
      if (props.record?.id) {
        formData.append('buildingControlId', String(props.record.id))
      }

      const res = await fetch(`/api/upload/multiple`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log('🔍 [FileUploadEdit] upload response:', data)
      
      const uploaded = (data?.files || []).map((file) => ({
        name: file.namefile || file.originalName || file.name,
        url: file.url,
        size: file.size,
        type: file.fileType || file.mimetype,
      }))
      
      console.log('🔍 [FileUploadEdit] uploaded files:', uploaded)

      const updatedFiles = [...files, ...uploaded]
      setFiles(updatedFiles)

      // ✅ ส่งกลับไป AdminJS ในรูปแบบที่ action ต้องการ
      // หมายเหตุ: AdminJS เก็บเป็นสตริง JSON และใช้คีย์ namefile/url/size/fileType
      if (props.onChange) {
        const normalizedForAction = updatedFiles.map(file => ({
          namefile: file.name,
          url: file.url,
          size: file.size,
          fileType: file.type
        }))
        props.onChange('uploadfile', JSON.stringify(normalizedForAction))
      }
    } catch (err) {
      console.error('❌ Upload error:', err)
    }
  }, [files, props.record?.id, props.onChange])

  // ✅ ลบไฟล์ที่เลือกออก (optional)
  // - เอารายการไฟล์ตาม index ออก แล้ว sync กลับไปยัง AdminJS
  const handleRemove = useCallback((index) => {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)

    if (props.onChange) {
      const normalizedForAction = updated.map(file => ({
        namefile: file.name,
        url: file.url,
        size: file.size,
        fileType: file.type
      }))
      props.onChange('uploadfile', JSON.stringify(normalizedForAction))
    }
  }, [files, props.onChange])

  // ✅ ใช้ react-dropzone hook
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: handleUpload,
    multiple: true,
    maxSize: 10240000, // 10MB
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    onDropRejected: (fileRejections) => {
      console.warn('❌ Files rejected:', fileRejections)
    }
  })

  return (
    <div style={{paddingTop: '20px' , paddingBottom: '20px'}}>
      {/* react-dropzone สำหรับลาก/วางหรือเลือกไฟล์ */}
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
          borderColor: isDragActive ? '#007bff' : '#ccc',
          transition: 'all 0.3s ease',
        }}
      >
        <input {...getInputProps()} />
        <div style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
          {isDragActive ? 'วางไฟล์ที่นี่...' : 'ลากไฟล์มาที่นี่ หรือคลิกเพื่อเลือก'}
        </div>
        <div style={{ fontSize: '12px', color: '#999' }}>
          รองรับ: PDF, DOC, DOCX, PNG, JPG (ขนาดสูงสุด: 10MB)
        </div>
      </div>

      {/* แสดงข้อผิดพลาดของไฟล์ที่ถูกปฏิเสธ */}
      {fileRejections.length > 0 && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          <h4 style={{ color: '#721c24', margin: '0 0 8px 0' }}>ไฟล์ที่ถูกปฏิเสธ:</h4>
          {fileRejections.map(({ file, errors }, index) => (
            <div key={index} style={{ fontSize: '12px', color: '#721c24' }}>
              <strong>{file.name}</strong>: {errors.map(e => e.message).join(', ')}
            </div>
          ))}
        </div>
      )}

      {/* แสดงรายการไฟล์ที่อัปโหลดแล้ว */}
      {files.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>ไฟล์ที่อัปโหลดแล้ว:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {files.map((file, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div>
                  <strong>{file.name}</strong>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {file.type} • {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {file.url && (
                    <a 
                      href={file.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        padding: '4px 8px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        textDecoration: 'none',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}
                    >
                      ดูไฟล์
                    </a>
                  )}
                  <button
                    onClick={() => handleRemove(index)}
                    style={{ 
                      padding: '4px 8px', 
                      backgroundColor: '#dc3545', 
                      color: 'white', 
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default FileUploadEdit
