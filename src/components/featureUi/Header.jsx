import { useLocation, useHistory } from 'react-router'

const PropertyHeaders = ({ property, sortBy, direction }) => {
  const history = useHistory()
  const location = useLocation()

  const handleSort = () => {
    const searchParams = new URLSearchParams(location.search)

    if (sortBy === property.propertyPath) {
      // toggle asc/desc
      searchParams.set('direction', direction === 'asc' ? 'desc' : 'asc')
    } else {
      searchParams.set('sortBy', property.propertyPath)
      searchParams.set('direction', 'asc')
    }

    history.push({
      ...location,
      search: searchParams.toString(),
    })
  }

  return (
    <TableCell
      onClick={handleSort}
      style={{ cursor: property.isSortable !== false ? 'pointer' : 'default' }}
    >
      <span>{property.label}</span>
      {sortBy === property.propertyPath && (
        direction === 'asc' ? '⬆️' : '⬇️'
      )}
    </TableCell>
  )
}
export default PropertyHeaders