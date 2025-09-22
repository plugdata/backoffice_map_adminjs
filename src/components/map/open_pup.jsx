import React, { useState, useEffect, useRef } from "react"
import useSWR from "swr"
import { Box, Button, Input, Text, Label } from "@adminjs/design-system"
import { ApiClient } from "adminjs"
import { useMapStore } from "./lib/store"
import MapField from "./mapfild"
import { Upload, Eye, Trash2 } from 'lucide-react'   // ← ไอคอน
const api = new ApiClient()

// KML Parser function
const parseKMLToGeoJSON = (kmlText) => {
  try {
    // Simple KML to GeoJSON conversion
    // This is a basic parser - for production use, consider using a library like @mapbox/togeojson
    const parser = new DOMParser()
    const kmlDoc = parser.parseFromString(kmlText, 'text/xml')
    
    const features = []
    
    // Parse Placemarks
    const placemarks = kmlDoc.querySelectorAll('Placemark')
    placemarks.forEach((placemark, index) => {
      const name = placemark.querySelector('name')?.textContent || `Feature ${index + 1}`
      const description = placemark.querySelector('description')?.textContent || ''
      
      // Parse Point
      const point = placemark.querySelector('Point')
      if (point) {
        const coordinates = point.querySelector('coordinates')?.textContent?.trim()
        if (coordinates) {
          const [lng, lat, alt] = coordinates.split(',').map(Number)
          features.push({
            type: 'Feature',
            properties: { name, description },
            geometry: {
              type: 'Point',
              coordinates: [lng, lat, alt || 0]
            }
          })
        }
      }
      
      // Parse LineString
      const lineString = placemark.querySelector('LineString')
      if (lineString) {
        const coordinates = lineString.querySelector('coordinates')?.textContent?.trim()
        if (coordinates) {
          const coords = coordinates.split(/\s+/).map(coord => {
            const [lng, lat, alt] = coord.split(',').map(Number)
            return [lng, lat, alt || 0]
          })
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
      
      // Parse Polygon
      const polygon = placemark.querySelector('Polygon')
      if (polygon) {
        const outerBoundary = polygon.querySelector('outerBoundaryIs')
        if (outerBoundary) {
          const coordinates = outerBoundary.querySelector('coordinates')?.textContent?.trim()
          if (coordinates) {
            const coords = coordinates.split(/\s+/).map(coord => {
              const [lng, lat, alt] = coord.split(',').map(Number)
              return [lng, lat, alt || 0]
            })
            // Close the polygon if not already closed
            if (coords.length > 0 && 
                (coords[0][0] !== coords[coords.length - 1][0] || 
                 coords[0][1] !== coords[coords.length - 1][1])) {
              coords.push(coords[0])
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
    })
    
    return {
      type: 'FeatureCollection',
      features: features
    }
  } catch (error) {
    console.error('Error parsing KML:', error)
    throw new Error('Failed to parse KML file')
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

const CenterPopup = ({ record, property, onChange }) => {
  const {
    latitude, longitude,
    house_no, road, subdistrict, district, province, postcode, name_local,
    geom, colors, data,
    setLatLng, setGeom, setColors, setData,
    setHouseNo, setRoad, setSubdistrict, setDistrict, setProvince, setPostcode, setNameLocal,
  } = useMapStore()

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

  // ✅ preload store เมื่อมีข้อมูล
  useEffect(() => {
    if (!loadedParams) return
    const p = loadedParams
    const store = useMapStore.getState()

    if (
      store.latitude === 7.559 &&
      store.longitude === 99.611 &&
      p.latitude && p.longitude
    ) {
      const lat = parseFloat(p.latitude)
      const lng = parseFloat(p.longitude)
      if (!isNaN(lat) && !isNaN(lng)) setLatLng(lat, lng)
    }

    if (!store.house_no && p.house_no) setHouseNo(p.house_no)
    if (!store.road && p.road) setRoad(p.road)
    if (!store.subdistrict && p.subdistrict) setSubdistrict(p.subdistrict)
    if (!store.district && p.district) setDistrict(p.district)
    if (!store.province && p.province) setProvince(p.province)
    if (!store.postcode && p.postcode) setPostcode(p.postcode)
    if (!store.name_local && p.name_local) setNameLocal(p.name_local)

    if (store.colors === "#ff0000" && p.colors) setColors(p.colors)

    if (!store.data && p.data) {
      setData(p.data)
      setGeom(typeof p.data === "string" ? p.data : JSON.stringify(p.data))
    }
  }, [loadedParams])

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
        const { colors: currentColors } = useMapStore.getState()
        if (!currentColors || currentColors === "#ff0000") {
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
    switch (field) {
      case "data":
        setData(value)
        setGeom(typeof value === "string" ? value : JSON.stringify(value))
        return
      case "colors": setColors(value); break
      case "latitude": setLatLng(value, longitude); onChange?.("latitude", value); return
      case "longitude": setLatLng(latitude, value); onChange?.("longitude", value); return
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
      const value = useMapStore.getState()[field]
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
      ...(data ? { data: JSON.stringify(data) } : {}),
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

export default CenterPopup
