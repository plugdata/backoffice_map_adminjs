/* import react from 'react'
import MapField from './mapfild'
const prams =(record)=>{
  const { latitude, longitude, data, colors, id } = record?.params || {}
  console.log(latitude, longitude, data, colors, id)
  return (
    <div>
    <MapField
      latitude={latitude}
      longitude={longitude}
      data={data}
      colors={colors}
    />
    </div>
  )
}
export default prams */

import React, { useState, useEffect, useRef } from "react"
import useSWR from "swr"
import { Box, Button, Input, Text, Label } from "@adminjs/design-system"
import { ApiClient } from "adminjs"
import MapField from "./mapfild"
import { Upload, Eye, Trash2 } from 'lucide-react'   // ← ไอคอน
const api = new ApiClient()

// KML Parser function
const parseKMLToGeoJSON = (kmlText) => {
  try {
    console.log('🔍 Parsing KML text length:', kmlText.length)
    const parser = new DOMParser()
    const kmlDoc = parser.parseFromString(kmlText, 'text/xml')
    
    // Check for parsing errors
    const parseError = kmlDoc.querySelector('parsererror')
    if (parseError) {
      console.error('❌ XML parsing error:', parseError.textContent)
      throw new Error('Invalid XML format')
    }
    
    const features = []
    
    // Helper function to validate and clean coordinates
    const validateCoordinate = (coord) => {
      if (!Array.isArray(coord) || coord.length < 2) return null
      const [lng, lat] = coord
      if (typeof lng !== 'number' || typeof lat !== 'number') return null
      if (isNaN(lng) || isNaN(lat)) return null
      if (lng < -180 || lng > 180 || lat < -90 || lat > 90) return null
      return [lng, lat] // Return only 2D coordinates for PostGIS
    }
    
    const placemarks = kmlDoc.querySelectorAll('Placemark')
    console.log('🔍 Found placemarks:', placemarks.length)
    
    placemarks.forEach((placemark, index) => {
      const name = placemark.querySelector('name')?.textContent || `Feature ${index + 1}`
      const description = placemark.querySelector('description')?.textContent || ''
      
      // Parse Point
      const point = placemark.querySelector('Point')
      if (point) {
        const coordinates = point.querySelector('coordinates')?.textContent?.trim()
        if (coordinates) {
          const coordParts = coordinates.split(',')
          if (coordParts.length >= 2) {
            const lng = parseFloat(coordParts[0])
            const lat = parseFloat(coordParts[1])
            const validCoord = validateCoordinate([lng, lat])
            if (validCoord) {
              features.push({
                type: 'Feature',
                properties: { name, description },
                geometry: {
                  type: 'Point',
                  coordinates: validCoord
                }
              })
            }
          }
        }
      }
      
      // Parse LineString
      const lineString = placemark.querySelector('LineString')
      if (lineString) {
        const coordinates = lineString.querySelector('coordinates')?.textContent?.trim()
        if (coordinates) {
          const coords = coordinates.split(/\s+/)
            .map(coord => {
              const parts = coord.split(',')
              if (parts.length >= 2) {
                const lng = parseFloat(parts[0])
                const lat = parseFloat(parts[1])
                return validateCoordinate([lng, lat])
              }
              return null
            })
            .filter(coord => coord !== null)
          
          if (coords.length >= 2) {
            features.push({
              type: 'Feature',
              properties: { name, description },
              geometry: {
                type: 'LineString',
                coordinates: coords
              }
            })
          }
        }
      }
      
      // Parse Polygon
      const polygon = placemark.querySelector('Polygon')
      if (polygon) {
        const outerBoundary = polygon.querySelector('outerBoundaryIs')
        if (outerBoundary) {
          const coordinates = outerBoundary.querySelector('coordinates')?.textContent?.trim()
          if (coordinates) {
            const coords = coordinates.split(/\s+/)
              .map(coord => {
                const parts = coord.split(',')
                if (parts.length >= 2) {
                  const lng = parseFloat(parts[0])
                  const lat = parseFloat(parts[1])
                  return validateCoordinate([lng, lat])
                }
                return null
              })
              .filter(coord => coord !== null)
            
            if (coords.length >= 3) {
              // Ensure polygon is closed
              const firstCoord = coords[0]
              const lastCoord = coords[coords.length - 1]
              if (firstCoord[0] !== lastCoord[0] || firstCoord[1] !== lastCoord[1]) {
                coords.push([firstCoord[0], firstCoord[1]])
              }
              
              features.push({
                type: 'Feature',
                properties: { name, description },
                geometry: {
                  type: 'Polygon',
                  coordinates: [coords]
                }
              })
            }
          }
        }
      }
    })
    
    // If no features found with standard Placemark parsing, try alternative approaches
    if (features.length === 0) {
      console.log('🔍 No features found with standard parsing, trying alternative approaches...')
      
      // Try to find coordinates directly in the document
      const allCoordinates = kmlDoc.querySelectorAll('coordinates')
      console.log('🔍 Found coordinates elements:', allCoordinates.length)
      
      allCoordinates.forEach((coordEl, index) => {
        const coordText = coordEl.textContent?.trim()
        if (coordText) {
          console.log(`🔍 Alternative coordinate ${index}:`, coordText.substring(0, 100) + '...')
          
          // Try to parse as a single point
          const coordParts = coordText.split(',')
          if (coordParts.length >= 2) {
            const lng = parseFloat(coordParts[0])
            const lat = parseFloat(coordParts[1])
            const validCoord = validateCoordinate([lng, lat])
            if (validCoord) {
              console.log(`✅ Alternative Point found:`, validCoord)
              features.push({
                type: 'Feature',
                properties: { name: `Point ${index + 1}`, description: 'Parsed from alternative coordinates' },
                geometry: {
                  type: 'Point',
                  coordinates: validCoord
                }
              })
            }
          }
        }
      })
    }
    
    if (features.length === 0) {
      console.log('🔍 KML document structure:', kmlDoc.documentElement.tagName)
      console.log('🔍 KML document children:', Array.from(kmlDoc.documentElement.children).map(el => el.tagName))
      throw new Error('No valid features found in KML file. Please check the KML structure.')
    }
    
    console.log(`✅ Successfully parsed ${features.length} features from KML`)
    return {
      type: 'FeatureCollection',
      features: features
    }
  } catch (error) {
    console.error('Error parsing KML:', error)
    throw new Error(`Failed to parse KML file: ${error.message}`)
  }
}

// 🔑 swr fetcher
const fetcher = async ({ resourceId, recordId }) => {
  if (!recordId) return null
  const res = await api.recordAction({
    resourceId,
    recordId,
    actionName: "show",
  })
  return res?.data?.record?.params || {}
}

const CenterPopupContent = ({ record, property, onChange }) => {
  // Local state instead of store
  const [latitude, setLatitude] = useState(7.566557)
  const [longitude, setLongitude] = useState(99.62328)
  const [house_no, setHouseNo] = useState("")
  const [road, setRoad] = useState("")
  const [subdistrict, setSubdistrict] = useState("")
  const [district, setDistrict] = useState("")
  const [province, setProvince] = useState("")
  const [postcode, setPostcode] = useState("")
  const [name_local, setNameLocal] = useState("")
  const [geom, setGeom] = useState("")
  const [colors, setColors] = useState("#ff0000")
  const [data, setData] = useState(null)

  const [open, setOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [fileStatus, setFileStatus] = useState("")
  const fileInputRef = useRef(null)
  const recordId = record?.params?.id || record?.id || ""
  const resourceId =
    record?.resourceId || record?.resource?.id || property?.resourceId || "BuildingControl"

  // ✅ preload ด้วย SWR
  const { data: loadedParams, error, isLoading } = useSWR(
    open && recordId ? { resourceId, recordId } : null,
    fetcher
  )

  // ✅ preload local state เมื่อมีข้อมูล
  useEffect(() => {
    if (!loadedParams) return
    const p = loadedParams
    
    console.log('📥 Loaded params from database:', p)
    console.log('🔍 Current local state:', { latitude, longitude })

    // ตรวจสอบว่ามีข้อมูล lat/lng จากฐานข้อมูลหรือไม่
    if (p.latitude && p.longitude) {
      const lat = parseFloat(p.latitude)
      const lng = parseFloat(p.longitude)
      console.log('🔄 Updating coordinates from DB:', { lat, lng })
      if (!isNaN(lat) && !isNaN(lng)) {
        // อัพเดทค่า lat/lng จากฐานข้อมูล
        setLatitude(lat)
        setLongitude(lng)
        console.log('✅ Coordinates updated to:', { lat, lng })
      }
    }

    // อัพเดทข้อมูล address เฉพาะเมื่อยังไม่มีค่าใน local state
    if (!house_no && p.house_no) setHouseNo(p.house_no)
    if (!road && p.road) setRoad(p.road)
    if (!subdistrict && p.subdistrict) setSubdistrict(p.subdistrict)
    if (!district && p.district) setDistrict(p.district)
    if (!province && p.province) setProvince(p.province)
    if (!postcode && p.postcode) setPostcode(p.postcode)
    if (!name_local && p.name_local) setNameLocal(p.name_local)

    // อัพเดท colors เฉพาะเมื่อเป็นค่า default
    if (colors === "#ff0000" && p.colors) setColors(p.colors)

    // อัพเดท data เฉพาะเมื่อยังไม่มีค่าใน local state
    if (!data && p.data) {
      setData(p.data)
      setGeom(typeof p.data === "string" ? p.data : JSON.stringify(p.data))
    }
  }, [loadedParams, house_no, road, subdistrict, district, province, postcode, name_local, colors, data])

  // ✅ handle KML file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.kml')) {
      setFileStatus("❌ Please select a .kml file")
      return
    }

    setFileStatus("⏳ Processing KML file...")
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const kmlText = e.target.result
        const geoJson = parseKMLToGeoJSON(kmlText)
        
        // Update store with parsed GeoJSON
        setData(geoJson)
        setGeom(JSON.stringify(geoJson))
        
        // Update colors in store if not already set
        if (!colors || colors === "#ff0000") {
          setColors("#ff0000")
        }
        
        setFileStatus(`✅ KML file loaded successfully (${geoJson.features.length} features)`)
      } catch (error) {
        setFileStatus(`❌ Error parsing KML: ${error.message}`)
        console.error('KML parsing error:', error)
      }
    }
    
    reader.onerror = () => {
      setFileStatus("❌ Error reading file")
    }
    
    reader.readAsText(file)
  }

  // ✅ handle clear data
  const handleClearData = () => {
    setData(null)
    setGeom("")
    setFileStatus("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // ✅ handle change
  const handleMapChange = (field, value) => {
    console.log('🔄 handleMapChange called:', { field, value })
    switch (field) {
      case "data":
        setData(value)
        setGeom(typeof value === "string" ? value : JSON.stringify(value))
        return
      case "colors": setColors(value); break
      case "latitude": 
        console.log('📍 Setting latitude to:', value)
        setLatitude(value); 
        onChange?.("latitude", value); 
        return
      case "longitude": 
        console.log('📍 Setting longitude to:', value)
        setLongitude(value); 
        onChange?.("longitude", value); 
        return
      case "house_no": setHouseNo(value); break
      case "road": setRoad(value); break
      case "subdistrict": setSubdistrict(value); break
      case "district": setDistrict(value); break
      case "province": setProvince(value); break
      case "postcode": setPostcode(value); break
      case "name_local": setNameLocal(value); break
      default: break
    }
    if (field !== "data") {
      onChange?.(field, value)
    }
  }

  // ✅ handle submit with validation
  const handleSubmit = () => {
    // Required fields validation
    const requiredFields = {
      house_no: "บ้านเลขที่",
      name_local: "ชื่อสถานที่", 
      district: "อำเภอ/เขต",
      province: "จังหวัด"
    }
    
    const missingFields = []
    Object.entries(requiredFields).forEach(([field, label]) => {
      const value = { house_no, name_local, district, province }[field]
      if (!value || value.trim() === "") {
        missingFields.push(label)
      }
    })
    
    if (missingFields.length > 0) {
      alert(`กรุณากรอกข้อมูลที่จำเป็น:\n${missingFields.join('\n')}`)
      return
    }
    
    const payload = {
      ...(latitude ? { latitude } : {}),
      ...(longitude ? { longitude } : {}),
      ...(house_no ? { house_no } : {}),
      ...(road ? { road } : {}),
      ...(subdistrict ? { subdistrict } : {}),
      ...(district ? { district } : {}),
      ...(province ? { province } : {}),
      ...(postcode ? { postcode } : {}),
      ...(name_local ? { name_local } : {}),
      ...(colors ? { colors } : {}),
      data: data ? JSON.stringify(data) : null, // Always include data field
    }

    console.log("📌 submit payload:", payload)
    Object.entries(payload).forEach(([k, v]) => onChange?.(k, v))
    setOpen(false)
  }

  return (
    <Box>
      <Button type="button" variant="primary" onClick={() => setOpen(true)}>
        เพิ่มข้อมูลแผนที่
      </Button>

      {open && (
        <Box style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000
        }}>
          <Box variant="white" border="default" style={{
            width: 800, maxWidth: "95vw", maxHeight: "90vh",
            padding: 20, borderRadius: 8, overflowY: "auto"
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
              <Text as="h2">เพิ่มข้อมูลแผนที่</Text>
              <Button type="button" size="icon" variant="text" onClick={() => setOpen(false)}>✕</Button>
            </Box>

            <MapField
              latitude={latitude}
              longitude={longitude}
              data={data}
              colors={colors}
              onChange={handleMapChange}
              record={record}
              property={property}
              preload={loadedParams}
            />

            {isLoading && <Text color="grey40">⏳ Loading…</Text>}
            {error && <Text color="red">❌ Error loading data</Text>}

            {/* form address */}
            <Box mt="lg" display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="lg">
              <Box>
                <Label>Latitude</Label>
                <Input value={latitude || ""} onChange={(e)=>handleMapChange("latitude", e.target.value)} />
              </Box>
              <Box>
                <Label>Longitude</Label>
                <Input value={longitude || ""} onChange={(e)=>handleMapChange("longitude", e.target.value)} />
              </Box>
              <Box>
                <Label>บ้านเลขที่ <Text as="span" color="red">*</Text></Label>
                <Input value={house_no || ""} onChange={(e)=>handleMapChange("house_no", e.target.value)} />
              </Box>
              <Box><Label>ถนน</Label><Input value={road || ""} onChange={(e)=>handleMapChange("road", e.target.value)} /></Box>
              <Box><Label>ตำบล/แขวง</Label><Input value={subdistrict || ""} onChange={(e)=>handleMapChange("subdistrict", e.target.value)} /></Box>
              <Box>
                <Label>อำเภอ/เขต <Text as="span" color="red">*</Text></Label>
                <Input value={district || ""} onChange={(e)=>handleMapChange("district", e.target.value)} />
              </Box>
              <Box>
                <Label>จังหวัด <Text as="span" color="red">*</Text></Label>
                <Input value={province || ""} onChange={(e)=>handleMapChange("province", e.target.value)} />
              </Box>
              <Box><Label>รหัสไปรษณีย์</Label><Input value={postcode || ""} onChange={(e)=>handleMapChange("postcode", e.target.value)} /></Box>

              <Box gridColumn="span 3">
                <Label>ชื่อสถานที่ <Text as="span" color="red">*</Text></Label>
                <Input value={name_local || ""} onChange={(e)=>handleMapChange("name_local", e.target.value)} />
              </Box>

              <Box gridColumn="span 3">
                <Label>GeoJSON / KML</Label>
                
                {/* File Upload Section */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(auto-fit, minmax(220px, max-content))"
                  gap="lg"
                  mb="md"
                  alignItems="center"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".kml"
                    onChange={handleFileUpload}
                    style={{ display: 'none'}}
                  />
                <Box display="flex" gap="lg" mb="md">
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      📁 Import KML File
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowPreview(true)}
                      disabled={!geom && !data}
                    >
                      👁️ Preview
                    </Button>
                    <Button
                      type="button"
                      variant="text"
                      size="sm"
                      onClick={handleClearData}
                      disabled={!geom && !data}
                    >
                      🗑️ Clear Data
                    </Button>
                  </Box>
                  {fileStatus && (
                    <Text variant="sm" color={fileStatus.includes('✅') ? 'green' : fileStatus.includes('❌') ? 'red' : 'grey40'} mt="xs">
                      {fileStatus}
                    </Text>
                  )}
                </Box>
                
                {/* Text Input Section */}
                <Input
                  value={geom || ""}
                  onChange={(e) => {
                    const v = e.target.value
                    setGeom(v)
                    let parsed
                    try { parsed = JSON.parse(v) } catch { parsed = v }
                    setData(parsed)
                  }}
                  placeholder="ใส่ GeoJSON หรือ KML string"
                />
                <Text variant="sm" color="grey40" mt="xs">
                  {geom ? `Data loaded (${geom.length} chars)` : "No data loaded"}
                </Text>
              </Box>

              <Box gridColumn="span 3">
                <Label>สี (Colors)</Label>
                <Input value={colors || ""} onChange={(e)=>handleMapChange("colors", e.target.value)} />
              </Box> 
            </Box>

            <Box mt="lg">
              <Text variant="sm" color="grey40">
                <Text as="span" color="red">*</Text> หมายถึงฟิลด์ที่จำเป็นต้องกรอก
              </Text>
            </Box>

            <Box display="flex" justifyContent="flex-end" gap="md" mt="lg">
              <Button type="button" variant="text" onClick={() => setOpen(false)}>ยกเลิก</Button>
              <Button type="button" variant="primary" onClick={handleSubmit}>บันทึกข้อมูล</Button>
            </Box>
          </Box>

          {showPreview && (
            <Box style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }}>
              <Box variant="white" border="default" style={{ width: 700, maxWidth: "95vw", maxHeight: "85vh", padding: 16, borderRadius: 8, overflow: "hidden" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb="md">
                  <Text as="h3">Preview ล่าสุด</Text>
                  <Button type="button" size="icon" variant="text" onClick={() => setShowPreview(false)}>✕</Button>
                </Box>
                <Box>
                  <MapField
                    onChange={() => {}}
                    record={record}
                    property={property}
                    preload={{ data }}
                    mode="show"
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

// Main component
const CenterPopup = ({ record, property, onChange }) => {
  return (
    <CenterPopupContent record={record} property={property} onChange={onChange} />
  )
}

export default CenterPopup
