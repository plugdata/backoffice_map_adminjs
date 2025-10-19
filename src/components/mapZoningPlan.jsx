// /components/buildingControl/MapForm.jsx
import React from "react"
import MapPopup from "./map/MapForm"

const MapZoningPlan = ({ record, onChange }) => {
  return (
    <MapPopup
      record={record}
      onChange={onChange}
      resourceName="Map"                // ✅ ดึงจากตาราง Map
      foreignIdField="zoningPlan"  // ✅ ใช้ filters.buildingControl
    />
  )
}

export default MapZoningPlan

