// ShowMapView Component - ใช้ props แทน store
import React from "react"
import MapField from "./mapfild"

const ShowMapView = ({ record, property }) => {
  // รับค่าจาก record params โดยตรง
  const { latitude, longitude, data, colors, id } = record?.params || {}

  // Callback สำหรับ debug
  const handleMapChange = (field, value) => {
    console.log("🔄 Changed:", field, value)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        แผนที่โซน (ID: {id})
      </h2>

      {/* แสดงพิกัด */}
      <p className="text-gray-700 mb-4">
        <strong>Latitude:</strong> {latitude || "—"} <br />
        <strong>Longitude:</strong> {longitude || "—"}
      </p>

      {/* แผนที่ */}
      <MapField
        latitude={latitude}
        longitude={longitude}
        data={data}
        colors={colors}
        onChange={handleMapChange}
        record={record}
        preload={{ data }}
        mode="show"
      />
    </div>
  )
}

export default ShowMapView
