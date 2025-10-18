import React, { useState, useEffect } from 'react'
import { Badge, Box } from '@adminjs/design-system'
import styled from 'styled-components'
import randomColor from 'randomcolor'

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const BadgeContent = styled.span`
  font-size: 14px;
  font-weight: 500;
`

const YearBadge = ({ record, property }) => {
  const [year, setYear] = useState('')
  const [color, setColor] = useState('')
  
  const value = record.params[property.name]
  const match = property.availableValues?.find(v => v.value == value)


  useEffect(() => {
    const label = match ? match.label : value
    const random = randomColor({
      luminosity: 'bright',
      seed: label, // ทำให้สีคงที่ต่อปี (ปีเดียวกันจะได้สีเดียวกัน)
    })
    setYear(label)
    setColor(random)
  }, [record, property])

  return (
    <Box mb="lg">
    <BadgeContainer>
      <Badge
        size="lg"
        style={{
          backgroundColor: color,
          color: '#fff',
          border: 'none',
        }}
      >
        <BadgeContent>{year}</BadgeContent>
      </Badge>
    </BadgeContainer>
    </Box>
  )
}

export default YearBadge
