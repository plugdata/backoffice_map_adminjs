import { componentLoader } from "../../utils/loder.js";
import uploadFeature from '@adminjs/upload'

// ตั้งค่าการอัปโหลดไฟล์สำหรับ local storage
const localProvider = {
  bucket: 'public/uploads',
  opts: {
    baseUrl: '/uploads',
  },
}

const upload = uploadFeature({
  provider: { local: localProvider },
  properties: {
    key: 'key', 
    filePath: 'filePath',       // This maps the file key to filePath column
    filename: 'fileName',   // This maps the filename to fileName column
    mimeType: 'mimeType',   // This maps the mime type to mimeType column
    size: 'fileSize',       // This maps the file size to fileSize column

  },
  uploadPath: (record, filename) => {
    const id = record?.params?.id || 'temp'
    return `documents/${id}/${filename}`  // ทำให้ URL สั้นลง
  },
  validation: {
    mimeTypes: ['application/pdf', 'image/png', 'image/jpeg', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  componentLoader,
})

export default upload
