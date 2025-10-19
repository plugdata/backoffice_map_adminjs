// /components/buildingControl/MapForm.jsx
import React from "react"
import MapPopup from "./map/MapForm"

const MapRiskZone = ({ record, onChange }) => {
  return (
    <MapPopup
      record={record}
      onChange={onChange}
      resourceName="Map"                // ✅ ดึงจากตาราง Map
      foreignIdField="riskZone"  // ✅ ใช้ filters.buildingControl
    />
  )
}

export default MapRiskZone

