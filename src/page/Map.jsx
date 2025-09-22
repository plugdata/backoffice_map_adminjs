// /components/map/Map.jsx
import React from "react"
import CenterPopup from "../components/map/open_pup"

const Map = ({ record, property, onChange }) => {
  return (
    <CenterPopup
      record={record}
      property={property}
      onChange={onChange}
    />
  )
}

export default Map
