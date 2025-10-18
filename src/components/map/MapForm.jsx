// /components/map/MapPopup.jsx
import React, { useState } from "react"
import { Box, Button, Text } from "@adminjs/design-system"
import MapField from "./MapFild"

const MapPopup = ({
  record,
  onChange,
  resourceName = "Map",          // ✅ ชื่อ resource เช่น "Map" / "RiskZone"
  foreignIdField , // ✅ ชื่อฟิลด์ FK เช่น "buildingControl" / "riskZone"
}) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [latitude, setLatitude] = useState(record?.params?.latitude || 7.566557)
  const [longitude, setLongitude] = useState(record?.params?.longitude || 99.62328)
  const [local_name, setLocalName] = useState(record?.params?.name_local || "")
  const [house_no, setHouseNo] = useState(record?.params?.house_no || "")
  const [address, setAddress] = useState(record?.params?.address || "")
  // ✅ Generic fetch function
  const fetchMapData = async (foreignId) => {
    try {
      const res = await fetch(
        `/admin/api/resources/${resourceName}/actions/search/?filters.${foreignIdField}=${foreignId}`
      )
      if (!res.ok) throw new Error("Failed to load map data")
      const data = await res.json()
      return data.records?.[0]?.params || null
    } catch (err) {
      console.error("❌ Error fetching map data:", err)
      return null
    }
  }

  const handleOpen = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    setOpen(true)

    const foreignId = record?.params?.id
    if (foreignId) {
      setIsLoading(true)
      const mapData = await fetchMapData(foreignId)
      setIsLoading(false)

      if (mapData?.latitude && mapData?.longitude) {
        setLatitude(parseFloat(mapData.latitude))
        setLongitude(parseFloat(mapData.longitude))
        setLocalName(mapData.name_local)
        setHouseNo(mapData.house_no)
        setAddress(mapData.address)
        console.log("📍 Loaded Map data:", mapData)
      }
    }
  }

  const handleClose = (e) => {
    e.stopPropagation()
    e.preventDefault()
  
    // ✅ บันทึกค่าพิกัดก่อนปิด
    onChange?.("latitude", latitude)
    onChange?.("longitude", longitude)
    onChange?.("name_local", local_name)
    onChange?.("house_no", house_no)
    onChange?.("address", address)
  
    setOpen(false)
  }
  

  const handleMapChange = (field, value) => {
    if (field === "latitude") setLatitude(value)
    if (field === "longitude") setLongitude(value)
    if (field === "name_local") setLocalName(value)
    if (field === "house_no") setHouseNo(value)
    if (field === "address") setAddress(value)
  }

  const handleSubmit = () => {
    console.log("✅ Final Payload to Save:", { latitude, longitude })
    onChange?.("latitude", latitude)
    onChange?.("longitude", longitude)
    onChange?.("name_local", local_name)
    onChange?.("house_no", house_no)
    onChange?.("address", address)
    setOpen(false)
  }

  return (
    <Box>
      <Button variant="primary" onClick={handleOpen}>
        แสดงแผนที่
      </Button>

      {open && (
        <Box
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            variant="white"
            border="default"
            style={{
              width: 800,
              maxWidth: "95vw",
              maxHeight: "90vh",
              padding: 20,
              borderRadius: 8,
              background: "white",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
              <Text as="h2">กำหนดตำแหน่งพิกัด</Text>
              <Button variant="text" size="icon" onClick={handleClose}>
                ✕ ปิดหน้าต่าง
              </Button>
            </Box>

            {isLoading ? (
              <Text color="grey60">⏳ กำลังโหลดข้อมูลแผนที่...</Text>
            ) : (
              <>
                <MapField
                  latitude={latitude}
                  longitude={longitude}
                  local_name={local_name}
                  house_no={house_no}
                  address={address}
                  onChange={handleMapChange}
                />
                <Box mt="md">
                  <Text>Latitude: {latitude.toFixed(6)}</Text>
                  <Text>Longitude: {longitude.toFixed(6)}</Text>
                  <Text>Local Name: {local_name}</Text>
                  <Text>House No: {house_no}</Text>
                  <Text>Address: {address}</Text>
                </Box>
              </>
            )}

         {/*    <Box mt="lg" display="flex" justifyContent="flex-end" gap="md">
              <Button variant="text" onClick={handleClose}>ปิด</Button>
              <Button variant="primary" onClick={handleSubmit}>บันทึกค่าพิกัด</Button>
            </Box> */}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default MapPopup
