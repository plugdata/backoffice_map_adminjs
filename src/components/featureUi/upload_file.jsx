import React, { useState, useEffect }    from 'react'
import { DropZone } from '@adminjs/design-system'
const UploadFile = (props) => {
const { record } = props

 const [files, setFiles] = useState([])

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
  
    const formData = new FormData();
    
    // Handle multiple files
    files.forEach((file, index) => {
      // ใช้ encodeURIComponent เพื่อบังคับ UTF-8 encoding
      const utf8FileName = encodeURIComponent(file.name);
      const utf8File = new File([file], utf8FileName, { type: file.type });
      formData.append("files", utf8File);
    });
    
    // ถ้ามีข้อมูลอื่น ๆ เช่น buildingControlId, riskZoneId, zoningPlanId
    if (record?.params?.buildingControlId) {
      formData.append("buildingControlId", record.params.buildingControlId);
    }
    if (record?.params?.riskZoneId) {
      formData.append("riskZoneId", record.params.riskZoneId);
    }
    if (record?.params?.zoningPlanId) {
      formData.append("zoningPlanId", record.params.zoningPlanId);
    }

    try {
      const res = await fetch("/api/upload/multiple", {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) throw new Error("Upload failed");
  
      const data = await res.json();
      
      if (data.success) {
        setFiles(data.files);
        console.log("✅ Upload success:", data.files);
      } else {
        console.error("❌ Upload failed:", data.error);
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
    }
  };
  
    useEffect(() => {
        const val = record?.params?.uploadfile
        if (val) {
            setFiles(JSON.parse(val))
        }
    }, [record])

    return (
        <div>
            <h1>Upload File</h1>
            <DropZone
                multiple
                uploadLimitIn="MB"
                onChange={handleUpload}
                validate={{
                    maxSize: 10240000,
                }}
                translations={{
                    placeholder: 'ลากไฟล์มาที่นี่ หรือคลิกเพื่อเลือก',
                    acceptedSize: 'ขนาดสูงสุด: {{maxSize}}',
                    acceptedType: 'รองรับ: {{mimeTypes}}',
                    unsupportedSize: 'ไฟล์ {{fileName}} มีขนาดใหญ่เกินไป',
                    unsupportedType: 'ไฟล์ {{fileName}} ไม่รองรับ',
                }}
            />
            <div>
                {files.map((file) => (
                    <div key={file.id} style={{border: '1px solid #ccc', padding: '10px', margin: '5px', borderRadius: '5px'}}>
                        {file.fileType.startsWith('image/') && (
                            <img src={file.publicUrl} alt={file.namefile} style={{maxWidth: '200px', maxHeight: '200px'}} />
                        )}
                        <p><strong>ชื่อไฟล์:</strong> {file.namefile}</p>
                        <p><strong>ขนาด:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                        <p><strong>ประเภท:</strong> {file.fileType}</p>
                        <p><strong>URL:</strong> <a href={file.publicUrl} target="_blank" rel="noopener noreferrer">{file.publicUrl}</a></p>
                        <p><strong>อัปโหลดเมื่อ:</strong> {new Date(file.createdAt).toLocaleString('th-TH')}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UploadFile