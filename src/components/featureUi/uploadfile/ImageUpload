import React, { useState, useRef } from 'react'
import { Box, Button, Label, Text } from '@adminjs/design-system'

const ImageUpload = ({ 
  onImageUpload, 
  onImageRemove, 
  images = [], 
  mapId, 
  mode = "edit",
  maxImages = 5 
}) => {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    const imageFiles = fileArray.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    )

    if (imageFiles.length === 0) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น (JPEG, JPG, PNG, GIF, WEBP)')
      return
    }

    if (images.length + imageFiles.length > maxImages) {
      alert(`สามารถอัปโหลดได้สูงสุด ${maxImages} รูปภาพ`)
      return
    }

    setUploading(true)

    try {
      for (const file of imageFiles) {
        const formData = new FormData()
        formData.append('image', file)
        if (mapId) formData.append('mapId', mapId)
        formData.append('description', `รูปภาพสำหรับ Map ID: ${mapId || 'ใหม่'}`)

        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการอัปโหลด')
        }

        const result = await response.json()
        if (onImageUpload) {
          onImageUpload(result.data)
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert(`เกิดข้อผิดพลาด: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleFileInputChange = (e) => {
    handleFileSelect(e.target.files)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleRemoveImage = async (imageId) => {
    if (!confirm('คุณต้องการลบรูปภาพนี้หรือไม่?')) return

    try {
      const response = await fetch(`/api/upload/image/${imageId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการลบ')
      }

      if (onImageRemove) {
        onImageRemove(imageId)
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert(`เกิดข้อผิดพลาด: ${error.message}`)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (mode === "show") {
    return (
      <Box>
        <Label>รูปภาพ</Label>
        {images.length > 0 ? (
          <Box mt="sm" display="grid" gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap="sm">
            {images.map((image) => (
              <Box key={image.id} position="relative">
                <img
                  src={image.url}
                  alt={image.originalName}
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
                <Text fontSize="xs" color="grey" mt="xs">
                  {image.originalName}
                </Text>
              </Box>
            ))}
          </Box>
        ) : (
          <Text color="grey">ไม่มีรูปภาพ</Text>
        )}
      </Box>
    )
  }

  return (
    <Box>
      <Label>รูปภาพ (สูงสุด {maxImages} รูป)</Label>
      
      {/* Upload Area */}
      <Box
        mt="sm"
        p="lg"
        border="1px dashed"
        borderColor={dragOver ? "primary" : "grey"}
        borderRadius="md"
        backgroundColor={dragOver ? "primaryLight" : "greyLight"}
        textAlign="center"
        cursor="pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{ 
          transition: 'all 0.2s ease',
          opacity: uploading ? 0.6 : 1
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        
        {uploading ? (
          <Text>กำลังอัปโหลด...</Text>
        ) : (
          <>
            <Text fontSize="lg" mb="sm">📷</Text>
            <Text mb="sm">
              {dragOver ? 'วางไฟล์ที่นี่' : 'คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง'}
            </Text>
            <Text fontSize="sm" color="grey">
              รองรับไฟล์: JPEG, JPG, PNG, GIF, WEBP (สูงสุด 5MB)
            </Text>
          </>
        )}
      </Box>

      {/* Image List */}
      {images.length > 0 && (
        <Box mt="md">
          <Text fontSize="sm" fontWeight="bold" mb="sm">
            รูปภาพที่อัปโหลด ({images.length}/{maxImages})
          </Text>
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap="md">
            {images.map((image) => (
              <Box key={image.id} position="relative" border="1px solid #ddd" borderRadius="md" p="sm">
                <img
                  src={image.url}
                  alt={image.originalName}
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                <Box mt="xs">
                  <Text fontSize="xs" fontWeight="bold" truncate>
                    {image.originalName}
                  </Text>
                  <Text fontSize="xs" color="grey">
                    {formatFileSize(image.size)}
                  </Text>
                  <Text fontSize="xs" color="grey">
                    {new Date(image.created_at).toLocaleDateString('th-TH')}
                  </Text>
                </Box>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleRemoveImage(image.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    minWidth: 'auto',
                    padding: '4px 8px'
                  }}
                >
                  ✕
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ImageUpload
