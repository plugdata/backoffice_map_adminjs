import React from 'react'
import { Radio, Box, Label } from '@adminjs/design-system'
import { useTranslation } from 'adminjs'
const RadioOwner = ({ onChange, record, property }) => {
  const { translateProperty } = useTranslation()
  const value = record.params[property.name] || '' // ค่าปัจจุบันจาก record

  const handleChange = (val) => {
    onChange(property.name, val) // ส่งค่ากลับไปที่ AdminJS
  }

  return (
    <div>
    <Box flex flexDirection="row" style={{marginTop: '30px', marginLeft: '30px'}}>
    <Box flexDirection="column" marginRight={15}>    
    <Label>{translateProperty(property.label, property.resourceId)}</Label>
    </Box>
      <Box flexDirection="column" marginRight={15}>     
        <Radio
          id={`${property.name}-owner`}
          name={property.name}
          checked={value === 'owner'}
          onChange={() => handleChange('owner')}
        />
        <Label inline htmlFor={`${property.name}-owner`} ml="default">
          เจ้าของทรัพย์สิน
        </Label>
      </Box>

      <Box flexDirection="column" marginRight={15}>
        <Radio
          id={`${property.name}-holder`}
          name={property.name}
          checked={value === 'holder'}
          onChange={() => handleChange('holder')}
        />
        <Label inline htmlFor={`${property.name}-holder`} ml="default">
          ผู้ถือครองทรัพย์สิน
        </Label>
        </Box>
      </Box>
    </div>
  )
}

export default RadioOwner
