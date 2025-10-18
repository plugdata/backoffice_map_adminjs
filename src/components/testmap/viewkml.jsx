

import React, { useEffect, useState } from 'react'
import { Box, Text, Table, Button } from '@adminjs/design-system'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { ApiClient } from 'adminjs'

const api = new ApiClient()

const ViewKml = () => {
  const [maps, setMaps] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!document.getElementById("leaflet-style")) {
      const link = document.createElement("link")
      link.id = "leaflet-style"
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)
    }
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // ใช้ AdminJS API เพื่อดึงข้อมูล
      const res = await api.resourceAction({
        resourceId: 'Map',
        actionName: 'list',
        query: {
          page: 1,
          perPage: 20,
        },
      })
      
      console.log('✅ AdminJS Map Records:', res.data)
      setMaps(res.data.records || [])
    } catch (err) {
      console.error('❌ Error loading map data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('🗺️ Maps data:', maps)
    maps.forEach((item, index) => {
      const p = item.params
      console.log(`📋 Map ${index + 1}:`, {
        id: p.id,
        name: p.name_local,
        hasData: !!p.data,
        hasGeom: !!p.geom,
        dataType: p.data?.type,
        geomType: p.geom?.split?.('(')?.[0],
        data: p.data,
        geom: p.geom
      })
    })
  }, [maps])
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
        <Text fontSize="lg" fontWeight="bold">🗺️ รายการข้อมูลทั้งหมดใน Map</Text>
        <Button onClick={loadData} disabled={loading}>
          {loading ? 'กำลังโหลด...' : 'รีเฟรช'}
        </Button>
      </Box>

      {loading ? (
        <Text color="grey60">กำลังโหลดข้อมูล...</Text>
      ) : maps.length === 0 ? (
        <Text color="grey60">ไม่มีข้อมูล</Text>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ชื่อสถานที่</th>
              <th>พิกัด</th>
              <th>สี</th>
              <th>จังหวัด</th>
              <th>ข้อมูล GeoJSON</th>
              <th>Geometry</th>
              <th>Building Control ID</th>
            </tr>
          </thead>
          <tbody>
            {maps.map((item) => {
              const p = item.params
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name_local || '—'}</td>
                  <td>
                    {p.latitude && p.longitude 
                      ? `${p.latitude.toFixed(6)}, ${p.longitude.toFixed(6)}`
                      : '—'
                    }
                  </td>
                  <td>
                    {p.colors ? (
                      <Box display="flex" alignItems="center">
                        <Box 
                          width="20px" 
                          height="20px" 
                          backgroundColor={p.colors} 
                          borderRadius="3px" 
                          mr="sm"
                        />
                        {p.colors}
                      </Box>
                    ) : '—'}
                  </td>
                  <td>{p.province || '—'}</td>
                  <td>
                    {p.data ? (
                      <Box>
                        <Text fontSize="sm" color="grey60">
                          {p.data.type} - {p.data.features?.length || 0} features
                        </Text>
                        {p.data.features?.[0]?.geometry?.type && (
                          <Text fontSize="xs" color="grey40">
                            Type: {p.data.features[0].geometry.type}
                          </Text>
                        )}
                      </Box>
                    ) : '—'}
                  </td>
                  <td>
                    {p.geom ? (
                      <Box>
                        <Text fontSize="sm" color="grey60">
                          {p.geom.split('(')[0]}
                        </Text>
                        <Text fontSize="xs" color="grey40">
                          {p.geom}
                        </Text>
                      </Box>
                    ) : '—'}
                  </td>
                  <td>{p.buildingControlId || '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}

      {/* Debug Section */}
      {maps.length > 0 && (
        <Box mt="xl">
          <Text fontSize="md" fontWeight="bold" mb="md">🔍 Debug Information</Text>
          <Box backgroundColor="grey20" p="md" borderRadius="4px">
            <Text fontSize="sm" fontFamily="monospace">
              {JSON.stringify(maps, null, 2)}
            </Text>
          </Box>
        </Box>
      )}

       {/* Map Section */}
       <Box mt="xl">
         <Text fontSize="lg" fontWeight="bold" mb="md">🗺️ แผนที่แสดงข้อมูล</Text>
         <MapContainer 
           center={[17.473624316, 101.810061695]} 
           zoom={13}
           style={{ height: '400px', width: '100%' }}
         >
           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
           {maps.map((item) => {
             const p = item.params
             // ใช้ data field สำหรับ GeoJSON ที่มี LineString
             if (p.data && p.data.type === 'FeatureCollection') {
               return (
                 <GeoJSON 
                   key={`data-${p.id}`} 
                   data={p.data}
                   style={{
                     color: p.colors || '#ff0000',
                     weight: 3,
                     opacity: 0.8
                   }}
                 />
               )
             }
             // ใช้ geom สำหรับ Point geometry (ถ้ามี)
             else if (p.geom && p.geom.includes('POINT')) {
               // แปลง POINT WKT เป็น GeoJSON
               try {
                 const coords = p.geom.match(/POINT\(([^)]+)\)/)?.[1]?.split(' ')
                 if (coords && coords.length >= 2) {
                   const pointGeoJson = {
                     type: 'Feature',
                     geometry: {
                       type: 'Point',
                       coordinates: [parseFloat(coords[0]), parseFloat(coords[1])]
                     },
                     properties: { name: p.name_local }
                   }
                   return (
                     <GeoJSON 
                       key={`geom-${p.id}`} 
                       data={pointGeoJson}
                       style={{
                         color: p.colors || '#ff0000',
                         weight: 2,
                         opacity: 0.8
                       }}
                     />
                   )
                 }
               } catch (error) {
                 console.warn('Failed to parse geom for item', p.id, error)
               }
             }
             return null
           })}
         </MapContainer>
       </Box>
    </Box>
  )
}

export default ViewKml
