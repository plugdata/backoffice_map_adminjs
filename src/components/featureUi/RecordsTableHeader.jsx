import React from 'react'
import { CheckBox, TableCell, TableHead, TableRow } from '@adminjs/design-system'
import { useTranslation } from 'adminjs' // ✅ hook แปลภาษา

// ✅ PropertyHeader component with direction feature
const PropertyHeader = ({ property, sortBy, direction, titleProperty }) => {
  const { translateProperty } = useTranslation()
  const isCurrentlySorted = sortBy === property.propertyPath
  
  console.log('🔍 PropertyHeader debug:', {
    propertyPath: property.propertyPath,
    sortBy,
    direction,
    isCurrentlySorted,
    propertyLabel: property.label
  })
  
  return (
    <TableCell 
      key={property.propertyPath}
      style={{
        cursor: property.isSortable !== false ? 'pointer' : 'default'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '4px'
      }}>
        <span>
          {translateProperty(property.label, property.resourceId)}
          {property.propertyPath === 'title_owner' && ` [${direction === 'asc' ? 'UP' : 'DOWN'}]`}
        </span>
      </div>
    </TableCell>
  )
}

// ✅ Display utility function
const display = (isTitle) => {
  return isTitle ? 'block' : 'inline'
}

const RecordsTableHeader = ({ 
  titleProperty, 
  properties,
  sortBy, 
  direction,
  onSelectAll, 
  selectedAll 
}) => {
  console.log('🎯 RecordsTableHeader props:', {
    properties: properties?.length,
    sortBy,
    direction,
    hasOnSelectAll: !!onSelectAll,
    selectedAll
  })

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          {onSelectAll ? (
            <CheckBox
              style={{ marginLeft: 5 }}
              onChange={() => onSelectAll()}
              checked={selectedAll}
            />
          ) : null}
        </TableCell>
        {properties.map(property => (
          <PropertyHeader
            display={display(property.isTitle)}
            key={property.propertyPath}
            titleProperty={titleProperty}
            property={property}
            sortBy={sortBy}
            direction={direction}
          />
        ))}
        <TableCell key="actions" style={{ width: 80 }} />
      </TableRow>
    </TableHead>
  )
}

export default RecordsTableHeader
