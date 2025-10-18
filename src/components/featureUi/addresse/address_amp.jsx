import React, { useEffect } from 'react'
import { useTranslation } from 'adminjs'
import { Label, Select } from '@adminjs/design-system'
import { address } from '../lib/storeAddress'
const AddressAmphoe = ({ onChange, record, property }) => {
  const { translateProperty } = useTranslation()
  const { amphoes, setAmphoes } = address()
/*   console.log(record.params.province)
  console.log('propertytest', property)
  console.log('recordtest', record) */

  useEffect(() => {
    fetch(`/api/address/amphoes/${record.params.province}`)
      .then(r => r.json())
      .then(data => setAmphoes(data));
  }, [record.params.province]);


  const selected = amphoes.find(a => a.value === record.params[property.name]) || null;



  return (
    <div>
      <Label>{translateProperty(property.label, property.resourceId)}</Label>
      <Select
        value={selected}
        options={amphoes}
        onChange={option => {
          onChange(property.name, option ? option.value : null);
        }}
        placeholder={property.props?.placeholder}
        style={{ width: "100%" }}
      />
    </div>
  )
}
export default AddressAmphoe