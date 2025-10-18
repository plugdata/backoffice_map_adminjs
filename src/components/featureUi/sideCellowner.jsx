import React from 'react'

const OwnerTitleCell = (props) => {
  const { record, property } = props
  const value = record?.params?.[property.name] || ''

  return (
    <span
      style={{
        maxWidth: '60px',       // ✅ จำกัดความกว้าง
        whiteSpace: 'nowrap',    // ✅ ไม่ตัดบรรทัด
        overflow: 'hidden',      // ✅ ซ่อนข้อความเกิน
        textOverflow: 'ellipsis', // ✅ ใส่ ...
        display: 'inline-block'
      }}
      className="adminjs_TableCell"
    >
      {value}
    </span>
  )
}

export default OwnerTitleCell
