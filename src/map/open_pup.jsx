

import CenterPopupContent from "./MapForm"
// Main component
const CenterPopup = ({ record, property, onChange }) => {
  return (
    <CenterPopupContent record={record} property={property} onChange={onChange} />
  )
}

export default CenterPopup
