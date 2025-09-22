import DatePicker from "./ss";
import React, { useState } from "react"
export default function DateRangePicker({
    onChange,
    themeColor = "#2196f3",
    label = "เลือกช่วงเวลา"
  }) {
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
  
    const handleFromChange = (val) => {
      setFrom(val)
      onChange?.({
        from: val,
        to
      })
    }
  
    const handleToChange = (val) => {
      setTo(val)
      onChange?.({
        from,
        to: val
      })
    }
  
    return (
      <div style={{ fontFamily: "sans-serif" }}>
        {label && (
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
          >
            {label}
          </label>
        )}
  
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div>
            <small>เริ่มต้น</small>
            <DatePicker
              value={from}
              onChange={handleFromChange}
              themeColor={themeColor}
              propertyType="datetime"
              label=""
            />
          </div>
  
          <div>
            <small>สิ้นสุด</small>
            <DatePicker
              value={to}
              onChange={handleToChange}
              themeColor={themeColor}
              propertyType="datetime"
              label=""
            />
          </div>
        </div>
  
        {/* ✅ แสดงผลที่เลือก */}
        <div style={{ marginTop: "10px", fontSize: "14px" }}>
          {from && <div>จาก (from): {from}</div>}
          {to && <div>ถึง (to): {to}</div>}
          {from && to && (
            <div style={{ marginTop: "5px", color: themeColor }}>
              Query:
              <br />
              createdAt~~from={from}&filters.createdAt~~to={to}
            </div>
          )}
        </div>
      </div>
    )
  }