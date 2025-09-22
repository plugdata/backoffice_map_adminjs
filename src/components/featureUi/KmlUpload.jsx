import React, { useState, useRef } from 'react'
import { Box, Button, Label, Text } from '@adminjs/design-system'

const KmlUpload = ({ 
  onKmlUpload, 
  onKmlRemove, 
  kmlData = [], 
  mapId, 
  mode = "edit",
  maxKml = 5 
}) => {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    const kmlFiles = fileArray.filter(file => 
      file.name.toLowerCase().endsWith('.kml') || 
      file.type === 'application/vnd.google-earth.kml+xml'
    )

    if (kmlFiles.length === 0) {
      alert('กรุณาเลือกไฟล์ KML เท่านั้น')
      return
    }

    if (kmlData.length + kmlFiles.length > maxKml) {
      alert(`สามารถอัปโหลดได้สูงสุด ${maxKml} ไฟล์ KML`)
      return
    }

    setUploading(true)

    try {
      for (const file of kmlFiles) {
        const formData = new FormData()
        formData.append('kmlFile', file)
        if (mapId) formData.append('mapId', mapId)
        formData.append('name', file.name.replace('.kml', ''))

        const response = await fetch('/api/kml/parse', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการอัปโหลด')
        }

        const result = await response.json()
        if (onKmlUpload) {
          onKmlUpload(result.data)
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

  const handleRemoveKml = async (kmlId) => {
    if (!confirm('คุณต้องการลบ KML นี้หรือไม่?')) return

    try {
      const response = await fetch(`/api/kml/data/${kmlId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการลบ')
      }

      if (onKmlRemove) {
        onKmlRemove(kmlId)
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
        <Label>KML Data</Label>
        {kmlData.length > 0 ? (
          <Box mt="sm" display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap="sm">
            {kmlData.map((kml) => (
              <Box key={kml.id} position="relative" border="1px solid #ddd" borderRadius="md" p="sm">
                <Text fontSize="sm" fontWeight="bold">{kml.name}</Text>
                <Text fontSize="xs" color="grey">
                  Features: {kml.geojson?.features?.length || 0}
                </Text>
                <Text fontSize="xs" color="grey">
                  {new Date(kml.created_at).toLocaleDateString('th-TH')}
                </Text>
              </Box>
            ))}
          </Box>
        ) : (
          <Text color="grey">ไม่มี KML Data</Text>
        )}
      </Box>
    )
  }

  return (
    <Box>
      <Label>KML Data (สูงสุด {maxKml} ไฟล์)</Label>
      
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
          accept=".kml,application/vnd.google-earth.kml+xml"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        
        {uploading ? (
          <Text>กำลังอัปโหลดและแปลง KML...</Text>
        ) : (
          <>
            <Text fontSize="lg" mb="sm">🗺️</Text>
            <Text mb="sm">
              {dragOver ? 'วางไฟล์ KML ที่นี่' : 'คลิกเพื่อเลือกไฟล์ KML หรือลากไฟล์มาวาง'}
            </Text>
            <Text fontSize="sm" color="grey">
              รองรับไฟล์: .kml
            </Text>
          </>
        )}
      </Box>

      {/* KML List */}
      {kmlData.length > 0 && (
        <Box mt="md">
          <Text fontSize="sm" fontWeight="bold" mb="sm">
            KML Data ที่อัปโหลด ({kmlData.length}/{maxKml})
          </Text>
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="md">
            {kmlData.map((kml) => (
              <Box key={kml.id} position="relative" border="1px solid #ddd" borderRadius="md" p="sm">
                <Text fontSize="sm" fontWeight="bold" mb="xs">
                  {kml.name}
                </Text>
                <Text fontSize="xs" color="grey" mb="xs">
                  Features: {kml.geojson?.features?.length || 0}
                </Text>
                {kml.bounds && (
                  <Text fontSize="xs" color="grey" mb="xs">
                    Bounds: {kml.bounds.north?.toFixed(4)}, {kml.bounds.south?.toFixed(4)}, {kml.bounds.east?.toFixed(4)}, {kml.bounds.west?.toFixed(4)}
                  </Text>
                )}
                <Text fontSize="xs" color="grey" mb="xs">
                  {new Date(kml.created_at).toLocaleDateString('th-TH')}
                </Text>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleRemoveKml(kml.id)}
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

export default KmlUpload
