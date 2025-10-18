import React from 'react'
import { Badge, Box } from '@adminjs/design-system'
import styled from 'styled-components'

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
`

const BadgeContent = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
`

const FullNameBadge = ({ record, property }) => {
  const value = record.params[property.name]
  const match = property.availableValues?.find(v => v.value == value)

  // ถ้าเจอใน availableValues จะใช้ label ถ้าไม่เจอ fallback เป็น value
  const label = match ? match.label : value

  return (
    <Box mb="lg">
    <BadgeContainer>
      <Badge size="lg" variant="primary" outline>
        <BadgeContent>{label}</BadgeContent>
      </Badge>
    </BadgeContainer>
    </Box>
  )
}

export default FullNameBadge
