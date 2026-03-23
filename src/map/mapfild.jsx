import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, useMap, Popup} from "react-leaflet"
//import { parseKMLToGeoJSON } from './utils/kmlParser'
import { GeoJSON } from 'react-leaflet'
// ✅ ใช้ React.lazy แบบไม่มี require


// ✅ Component สำหรับอัปเดตตำแหน่งกลางแผนที่
const MapUpdater = ({ latitude, longitude }) => {
  const map = useMap()
  useEffect(() => {
    map.setView([latitude, longitude])
  }, [latitude, longitude, map])
  return null
}

// ✅ Marker ที่ลากได้
export const DraggableMarker = ({ position, onPositionChange, local_name, house_no, address}) => {
  const [markerPosition, setMarkerPosition] = useState(position)
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({

  })

  const [loading, setLoading] = useState(false)
 /*      console.log("🗺️ Marker positiontest:", position)
      console.log("🗺️ local_nametest:", local_name)
      console.log("🗺️ house_notest:", house_no)
      console.log("🗺️ addresstest:", address) */
  // ✅ handle drag marker
  const handleDragEnd = async (e) => {
    const { lat, lng } = e.target.getLatLng()
    setMarkerPosition([lat, lng])
    onPositionChange?.("latitude", lat)
    onPositionChange?.("longitude", lng)
    setLoading(true)
    setLoading(false)
  }
  const handleChange = (local_name, house_no, address) => {
    onPositionChange?.("name_local", local_name)
    onPositionChange?.("house_no", house_no)
    onPositionChange?.("address", address)
  }
 
  return (
    <Marker
      position={markerPosition}
      draggable={true}
      eventHandlers={{
        dragend: handleDragEnd,
        click: () => setIsOpen(true),
      }}
    >
      {isOpen && (
        <Popup onClose={() => setIsOpen(false)}>
          <div style={{ minWidth: 250 }}>
            <h3>📍 ที่อยู่จากตำแหน่ง</h3>
            <p>
              Lat: {markerPosition[0].toFixed(6)} <br />
              Lng: {markerPosition[1].toFixed(6)}
              <br />
              Local Name: {local_name}
              <br />
              House No: {house_no}
  
              Address: {address}
              <br />
            </p>
          </div>
        </Popup>
      )}
    </Marker>
  )
}


// ✅ Map หลัก
const MapFild = ({
  latitude = 7.566557,
  longitude = 99.62328,
  local_name = "",
  house_no = "",
  address = "",
  onChange,
  geoJsonData = null

}) => {
  const [center, setCenter] = useState([latitude, longitude])
  const [popupOpen, setPopupOpen] = useState(false)
 console.log("🗺️ MapFild props:", { latitude, longitude, local_name, house_no, address, geoJsonData })
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng
    setCenter([lat, lng])
    onChange?.("latitude", lat)
    onChange?.("longitude", lng)
    onChange?.("name_local", local_name)
    onChange?.("house_no", house_no)
    onChange?.("address", address)
    onChange?.("geoJsonData", JSON.stringify(geoJsonData)); // ✅ ส่งไปทันที

    setPopupOpen(true) // ✅ เปิด popup ทันทีเมื่อคลิก
  }
  const [geoJson, setGeoJson] = useState(null)

 
  useEffect(() => {
    if (geoJsonData) {
      try {
        const parsed = typeof geoJsonData === "string"
          ? JSON.parse(geoJsonData)
          : geoJsonData
        setGeoJson(parsed)
        console.log("✅ Parsed GeoJSON ready for render:", parsed)
      } catch {
        console.warn("⚠️ Failed to parse GeoJSON:", geoJsonData)
      }
    }
  }, [geoJsonData])
  
  return (
    <div style={{ width: "100%", height: "400px", borderRadius: 8, overflow: "hidden" }}>
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        eventHandlers={{ click: handleMapClick }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        <DraggableMarker
          position={center}
          local_name={local_name}
          house_no={house_no}
          address={address}
          onPositionChange={onChange}
          isOpen={popupOpen}
          onPopupClose={() => setPopupOpen(false)}
        />
        <MapUpdater latitude={center[0]} longitude={center[1]} />
               {/* ✅ ต้องห่อด้วย <Suspense> เมื่อใช้ React.lazy */}
               {geoJson && typeof geoJson === "object" && geoJson.type === "FeatureCollection" && Array.isArray(geoJson.features) ? (
  <GeoJSON
    key={JSON.stringify(geoJson)}
    data={geoJson}
    style={{ color: '#ff0000', weight: 3, opacity: 0.8 }}
  />
) : (
  geoJson && console.warn("⚠️ Invalid GeoJSON skipped:", geoJson)
)}



      </MapContainer>
    </div>
  )
}

export default MapFild
