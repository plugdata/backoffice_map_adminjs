import React, { useEffect } from "react"
import MapField from "./mapfild"
import { useMapStore } from "./lib/store"

const ShowMap = ({ record, property }) => {
  // ✅ record & property ถูกส่งจาก AdminJS เวลา render show view
  const { latitude, longitude, data, colors, id } = record?.params || {}

  // 👉 preload: ส่งเฉพาะ data ปัจจุบันให้ MapField ตาม API ล่าสุด
  const preload = { data }

  // 👉 callback เวลา field มีการเปลี่ยนค่า (ถ้าอยาก log หรือ debug)
  const handleMapChange = (field, value) => {
    console.log("🔄 Changed:", field, value)
  }

  // ✅ sync store กับค่าปัจจุบันจาก record เพื่อให้ marker/center ตรงกันกับ MapField
  const setLatLng = useMapStore((s) => s.setLatLng)
  const setColors = useMapStore((s) => s.setColors)
  useEffect(() => {
    const lat = Number(latitude)
    const lng = Number(longitude)
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      setLatLng(lat, lng)
    }
    if (colors) {
      setColors(colors)
    }
  }, [latitude, longitude, colors, setLatLng, setColors])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        แผนที่โซน (ID: {id})
      </h2>

      {/* 🛰️ แสดงพิกัด */}
      <p className="text-gray-700 mb-4">
        <strong>Latitude:</strong> {latitude || "—"} <br />
        <strong>Longitude:</strong> {longitude || "—"}
      </p>

      {/* 🗺️ Map */}
      <MapField
        onChange={handleMapChange}
        record={record}
        preload={preload}
        mode="show"
      />

    </div>
  )
}

export default ShowMap
