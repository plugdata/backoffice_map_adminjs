// MapField Component - Import from MapForm
import CenterPopupContent from '../map/MapForm'

const MapField = ({ record, property, onChange }) => {
  return (
    <CenterPopupContent 
      record={record} 
      property={property} 
      onChange={onChange} 
    />
  )
}

export default MapField
