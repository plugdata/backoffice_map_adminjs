// /components/buildingControl/MapForm.jsx
import React from "react"
import MapPopup from "./map/MapForm"

const Map = ({ record, onChange }) => {
  return (
    <MapPopup
      record={record}
      onChange={onChange}
      resourceName="Map"                // ✅ ดึงจากตาราง Map
      foreignIdField="buildingControl"  // ✅ ใช้ filters.buildingControl
    />
  )
}

export default Map

