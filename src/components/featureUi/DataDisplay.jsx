import React from 'react'
import { Box, Text } from '@adminjs/design-system'

const DataDisplay = ({ record, property }) => {
  const value = record?.params?.[property.name]
  
  console.log('🔍 DataDisplay Debug:', {
    recordId: record?.id,
    propertyName: property.name,
    hasValue: !!value,
    valueType: typeof value,
    value: value
  })
  
  if (!value) {
    return <Text color="grey60">ไม่มีข้อมูล</Text>
  }

  // ถ้า value เป็น string ให้พยายาม parse เป็น JSON
  let jsonData = value
  if (typeof value === 'string') {
    try {
      jsonData = JSON.parse(value)
    } catch (error) {
      // ถ้า parse ไม่ได้ ให้แสดงเป็น string
      return (
        <Box>
          <Text fontSize="sm" color="grey60">
            Raw Data (ไม่ใช่ JSON)
          </Text>
          <Text fontSize="xs" color="grey40" fontFamily="monospace">
            {value.substring(0, 100)}{value.length > 100 ? '...' : ''}
          </Text>
        </Box>
      )
    }
  }

  // ถ้าเป็น JSON object
  if (jsonData && typeof jsonData === 'object') {
    return (
      <Box>
        <Text fontSize="sm" color="grey60">
          {jsonData.type || 'JSON Object'}
        </Text>
        {jsonData.features && (
          <Text fontSize="xs" color="grey40">
            {jsonData.features.length} features
          </Text>
        )}
        {jsonData.features?.[0]?.geometry?.type && (
          <Text fontSize="xs" color="grey40">
            Type: {jsonData.features[0].geometry.type}
          </Text>
        )}
        {jsonData.coordinates && (
          <Text fontSize="xs" color="grey40">
            Coordinates: {Array.isArray(jsonData.coordinates) ? jsonData.coordinates.length : 'N/A'}
          </Text>
        )}
      </Box>
    )
  }

  // fallback
  return (
    <Box>
      <Text fontSize="sm" color="grey60">
        {typeof jsonData}
      </Text>
      <Text fontSize="xs" color="grey40">
        {JSON.stringify(jsonData).substring(0, 50)}...
      </Text>
    </Box>
  )
}

export default DataDisplay
