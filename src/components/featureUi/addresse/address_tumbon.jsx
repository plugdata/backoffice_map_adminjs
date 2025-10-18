import {useState, useEffect} from 'react'
import { address } from '../lib/storeAddress'
import { Label, Select } from '@adminjs/design-system'
import { useTranslation } from 'adminjs'
const AddressTumbon = ({ onChange, record, property }) => {
    const { districts, setDistricts } = address()
    const { province, amphoe, district } = record.params
    console.log('test',province, 'amphoe', amphoe, 'district', district)

    const { translateProperty } = useTranslation()
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            let url = `/api/address/districts`
    
            if (record.params.district) {
              // ✅ ถ้ามี district → ดึงเฉพาะอันนั้นก่อน
              url = `/api/address/districts/${record.params.district}`
            }
    
            let data = await fetch(url).then(r => r.json())
    
            // ❗ ถ้าไม่มีข้อมูล หรือ array ว่าง → fallback เป็นทั้งหมด
            if (!data || data.length === 0) {
              data = await fetch(`/api/address/districts`).then(r => r.json())
            }
    
            setDistricts(data)
          } catch (err) {
            console.error('Fetch error:', err)
            // ❗ fallback เป็นทั้งหมดถ้า error
            const all = await fetch(`/api/address/districts`).then(r => r.json())
            setDistricts(all)
          }
        }
    
        fetchData()
      }, [record.params.district, setDistricts])
    
    
    const selected = districts.find(d => d.value === record.params[property.name]) || null;
 
    
    return (
        <div>
            <Label>{translateProperty(property.label, property.resourceId)}</Label>
            <Select
                value={selected}
                options={districts}
                onChange={option => {
                    onChange(property.name, option ? option.value : null);
                }}
                placeholder={property.props?.placeholder}
                style={{ width: "100%" }}
            />
        </div>
    )
}
export default AddressTumbon