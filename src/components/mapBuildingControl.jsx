// /components/buildingControl/MapForm.jsx
import React from "react"
import MapPopup from "./map/MapForm"

const MapBuildingControl = ({ record, onChange }) => {
  return (
    <MapPopup
      record={record}
      onChange={onChange}
      resourceName="Map"                // ✅ ดึงจากตาราง Map
      foreignIdField="buildingControlId"  // ✅ ใช้ filters.buildingControl
    />
  )
}

export default MapBuildingControl

