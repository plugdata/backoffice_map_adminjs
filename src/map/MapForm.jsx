// /components/map/MapPopup.jsx
import React, { useState } from "react"
import { Box, Button, Text } from "@adminjs/design-system"
import MapField from "./mapfild"
import { parseKMLToGeoJSON } from './utils/kmlParser';
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
  const [image_before, setImageBefore] = useState(record?.params?.image_before || "")
  const [image_after, setImageAfter] = useState(record?.params?.image_after || "")
  const [geoJsonData, setGeoJsonData] = useState(() => {
    const raw = record?.params?.geoJsonData
    if (!raw) return null
    try {
      return typeof raw === "string" ? JSON.parse(raw) : raw
    } catch {
      console.warn("⚠️ Invalid JSON in geoJsonData")
      return null
    }
  })
  console.log("🗺️ MapPopup datatest:", geoJsonData)
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
        setImageBefore(mapData.image_before)
        setImageAfter(mapData.image_after)
        if (mapData?.geoJsonData) {
          try {
            // ✅ ถ้าเป็น string → parse ก่อน
            const parsed =
              typeof mapData.geoJsonData === "string"
                ? JSON.parse(mapData.geoJsonData)
                : mapData.geoJsonData
        
            setGeoJsonData(parsed)
            console.log("✅ Parsed GeoJSON from DB:", parsed)
          } catch (err) {
            console.warn("⚠️ Failed to parse geoJsonData from DB:", err)
            setGeoJsonData(null)
          }
        } else {
          setGeoJsonData(null)
        }
        
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
    onChange?.("image_before", image_before)
    onChange?.("image_after", image_after)
    onChange?.("geoJsonData", JSON.stringify(geoJsonData)); // ✅ ใช้ state ที่มีอยู่ ไม่ต้องใช้ cleanKml
    setOpen(false)
  }
  

  const handleMapChange = (field, value) => {
    if (field === "latitude") setLatitude(value)
    if (field === "longitude") setLongitude(value)
    if (field === "name_local") setLocalName(value)
    if (field === "house_no") setHouseNo(value)
    if (field === "address") setAddress(value)
    if (field === "geoJsonData") setGeoJsonData(value)
  }

  const handleSubmit = () => {
    console.log("✅ Final Payload to Save:", { latitude, longitude })
    onChange?.("latitude", latitude)
    onChange?.("longitude", longitude)
    onChange?.("name_local", local_name)
    onChange?.("house_no", house_no)
    onChange?.("address", address)
    onChange?.("image_before", image_before)
    onChange?.("image_after", image_after)
    onChange?.("geoJsonData", JSON.stringify(geoJsonData)); // ✅ ส่งไปทันที
    setOpen(false)
  }

/*   const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const kmlString = e.target.result
        const parser = new DOMParser()
        const kmlDoc = parser.parseFromString(kmlString, 'text/xml')
        const convertedGeoJson = kml(kmlDoc)
        console.log("✅ KML File:", convertedGeoJson)
      }
      reader.readAsText(file)
    }
  } */
    const handleImageChangePicture = async (event, type) => {
      const file = event.target.files[0]
      if (!file) return
    
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)
    
      try {
        const res = await fetch("/api/upload-image", { // ✅ route สำหรับอัปโหลด
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (type === "before") setImageBefore(data.url)
        if (type === "after") setImageAfter(data.url)
      } catch (err) {
        console.error("❌ Upload failed:", err)
        alert("อัปโหลดรูปไม่สำเร็จ")
      }
    }
  const handleFileChangesKml = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let kmlString = e.target.result;
        // 🧹 ล้าง BOM และช่องว่างส่วนเกิน
        const cleanKml = kmlString.trim().replace(/^\uFEFF/, "");
        
        console.log("📁 Processing KML file:", file.name);
        console.log("📏 File size:", cleanKml.length, "characters");
  
        try {
          // ✅ ใช้ custom parser ที่แปลงเฉพาะ Line และ Polygon
          const convertedGeoJson = parseKMLToGeoJSON(cleanKml);
          
          // ✅ ตรวจสอบผลลัพธ์
          if (convertedGeoJson && convertedGeoJson.features && convertedGeoJson.features.length > 0) {
            console.log("✅ Successfully converted KML to GeoJSON");
            console.log("📊 Found features:", convertedGeoJson.features.length);
            
            // แสดงข้อมูลสถิติ
            const lineCount = convertedGeoJson.features.filter(f => f.geometry.type === 'LineString').length;
            const polygonCount = convertedGeoJson.features.filter(f => f.geometry.type === 'Polygon').length;
            
            console.log(`📈 Statistics: ${lineCount} LineString(s), ${polygonCount} Polygon(s)`);
            
            setGeoJsonData(convertedGeoJson);
            
            // แสดงข้อความสำเร็จ
            alert(`✅ นำเข้าไฟล์ KML สำเร็จ!\nพบ ${convertedGeoJson.features.length} features\n- LineString: ${lineCount}\n- Polygon: ${polygonCount}`);
          } else {
            console.warn("⚠️ No features found in KML file");
            alert("⚠️ ไม่พบ Line หรือ Polygon ในไฟล์ KML\nกรุณาตรวจสอบไฟล์อีกครั้ง");
          }
        } catch (error) {
          console.error("❌ Error processing KML file:", error);
          alert("❌ เกิดข้อผิดพลาดในการประมวลผลไฟล์ KML\nกรุณาตรวจสอบไฟล์อีกครั้ง");
        }
      };
      reader.readAsText(file);
    }
  };

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
            width: "90%",
            maxWidth: "900px",
            height: "90vh",
            background: "white",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          {/* 🔹 Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="lg"
            borderBottom="1px solid #ddd"
            flexShrink={0}
          >
            <Text as="h2" fontSize="lg" fontWeight="bold">
              กำหนดตำแหน่งพิกัด
            </Text>
            <Button variant="text" size="icon" onClick={handleClose}>
              ✕
            </Button>
          </Box>
  
          {/* 🔹 เนื้อหา (scrollable area) */}
          <Box
            p="lg"
            flexGrow={1}
            style={{
              overflowY: "auto",
            }}
          >
            {isLoading ? (
              <Text color="grey60">⏳ กำลังโหลดข้อมูลแผนที่...</Text>
            ) : (
              <>
                {/* ✅ แผนที่ */}
                <Box mb="lg">
                <MapField
                  latitude={latitude}
                  longitude={longitude}
                  local_name={local_name}
                  house_no={house_no}
                  address={address}
                  onChange={handleMapChange}
                  geoJsonData={geoJsonData}
                />
                </Box>
  
                {/* ✅ ข้อมูลพิกัด */}
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="lg"
                  style={{ width: "100%" }}
                >
                  {/* 🟩 แถวที่ 1: พิกัด */}
                  <Box className="flex flex-wrap justify-between mb-4 text-gray-700">
                    <span>Latitude: {latitude?.toFixed(6) || "-"}</span>
                    <span>Longitude: {longitude?.toFixed(6) || "-"}</span>
                  </Box>
                  
                  {/* 🟩 แถวที่ 2: ข้อมูลสถานที่ */}
  <Box className="flex flex-col gap-4 border-t border-gray-300 pt-4 mt-4">
    <h3 className="text-lg font-semibold text-gray-700">🏠 ข้อมูลสถานที่</h3>

    {/* Local Name */}
    <div className="flex flex-col space-y-1">
      <label className="font-medium text-gray-700">ชื่อสถานที่ (Local Name)</label>
      <input
        type="text"
        value={local_name || ""}
        onChange={(e) => handleMapChange("name_local", e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
        placeholder="เช่น ศูนย์บริการรถยนต์"
      />
    </div>
    {/* House No */}
    <div className="flex flex-col space-y-1">
      <label className="font-medium text-gray-700">หมู่ที่ (House No)</label>
      <input
        type="text"
        value={house_no || ""}
        onChange={(e) => handleMapChange("house_no", e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
        placeholder="เช่น 1"
      />
    </div>
    {/* Address */}
    <div className="flex flex-col space-y-1">
      <label className="font-medium text-gray-700">ที่อยู่ (Address)</label>
      <input
        type="text"
        value={address || ""}
        onChange={(e) => handleMapChange("address", e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
        placeholder="เช่น หมู่ที่ 1 ซอย กม.1 ต.กุดบาก อ.กุดบาก จ.นครพนม 58120"
      />
    </div>
    </Box>
  
                  {/* 🟩 แถวที่ 3: Import KML */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    borderTop="1px solid #ddd"
                    pt="md"
                    mt="md"
                  >
                    <Text mb="sm">
                      📂 Import KML (เฉพาะ Line และ Polygon)
                    </Text>
                    <input
                      type="file"
                      accept=".kml"
                      onChange={handleFileChangesKml}
                      style={{
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        padding: "6px",
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
  
                  {/* 🟩 แถวที่ 4: รูปภาพก่อน–หลัง */}
                  <Box
                    mt="lg"
                    borderTop="1px solid #ddd"
                    pt="md"
                    display="flex"
                    flexDirection="column"
                    gap="sm"
                  >
                    <Text mb="sm">📸 รูปภาพประกอบ</Text>
  
                    <label>รูปก่อน (Before)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChangePicture(e, "before")}
                      style={{
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        padding: "6px",
                        borderRadius: "6px",
                      }}
                    />
  
                    <label>รูปหลัง (After)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChangePicture(e, "after")}
                      style={{
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        padding: "6px",
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
                </Box>
              </>
            )}
          </Box>
  
          {/* 🔹 Footer */}
          <Box
            p="lg"
            borderTop="1px solid #ddd"
            display="flex"
            justifyContent="flex-end"
            gap="md"
            flexShrink={0}
            style={{ background: "#fafafa" }}
          >
            <Button variant="text" onClick={handleClose}>
              ปิด
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              บันทึกค่าพิกัด
            </Button>
          </Box>
        </Box>
      </Box>
    )}
  </Box>
  
  )
}

export default MapPopup
