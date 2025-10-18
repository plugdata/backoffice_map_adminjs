// admin/components/ThaiDatetimeFilterProperty.jsx
import React, { useState, useRef, useEffect } from 'react'
import { FormGroup, Label } from '@adminjs/design-system'
import { useTranslation } from 'adminjs'

const thaiMonths = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

/* ---------------- Thai Calendar ---------------- */
const ThaiCalendar = ({ value, onChange, onClose, isTo }) => {
  const today = new Date()
  const currentYear = today.getFullYear() + 543
  const [year, setYear] = useState(value ? parseInt(value.split('-')[0]) + 543 : currentYear)
  const [month, setMonth] = useState(value ? parseInt(value.split('-')[1]) - 1 : today.getMonth())
  const [selectedDay, setSelectedDay] = useState(value ? parseInt(value.split('-')[2]) : today.getDate())
  const [selectedTime, setSelectedTime] = useState('')

  const generateDaysInMonth = (year, month) => {
    const totalDays = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: totalDays }, (_, i) => i + 1)
  }

  const days = generateDaysInMonth(year - 543, month)

  const handleSelect = (day) => {
    setSelectedDay(day)
  }

  const handleConfirm = () => {
    const [hour, minute] = selectedTime ? selectedTime.split(':').map(Number) : [0, 0]
    const date = new Date(year - 543, month, selectedDay)
    if (isTo && !selectedTime) {
      date.setHours(23, 59, 59, 999)
    } else {
      date.setHours(hour, minute, 0, 0)
    }
    onChange?.(date.toISOString())
    onClose?.()
  }

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 10,
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 10,
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        width: 260,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <button onClick={prevMonth}>◀</button>
        <strong>{thaiMonths[month]} {year}</strong>
        <button onClick={nextMonth}>▶</button>
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 4,
          textAlign: 'center',
          fontSize: 13,
        }}
      >
        {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((d) => (
          <div key={d} style={{ fontWeight: 'bold' }}>{d}</div>
        ))}
        {Array(new Date(year - 543, month, 1).getDay()).fill(null).map((_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleSelect(day)}
            style={{
              cursor: 'pointer',
              padding: '6px 0',
              borderRadius: 4,
              background: selectedDay === day ? '#007bff' : 'transparent',
              color: selectedDay === day ? '#fff' : '#000',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Time Picker */}
      <div style={{ marginTop: 10, textAlign: 'center' }}>
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          style={{
            padding: '4px 8px',
            border: '1px solid #ccc',
            borderRadius: 4,
            width: '70%',
          }}
        />
      </div>

      {/* Confirm Button */}
      <div style={{ marginTop: 10, textAlign: 'center' }}>
        <button
          onClick={handleConfirm}
          style={{
            background: '#007bff',
            color: '#fff',
            padding: '4px 12px',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          ✅ ยืนยัน
        </button>
      </div>
    </div>
  )
}

/* ---------------- Thai Date Input ---------------- */
const ThaiDateInput = ({ value, onChange, isTo }) => {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  const formatThaiDate = (value) => {
    if (!value) return ''
    const date = new Date(value)
    const d = date.getDate()
    const m = date.getMonth()
    const y = date.getFullYear() + 543
    const time = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    return `${d} ${thaiMonths[m]} ${y} เวลา ${time}`
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <input
        type="text"
        readOnly
        value={formatThaiDate(value)}
        onClick={() => setOpen(!open)}
        placeholder="เลือกวันที่และเวลา"
        className="adminjs-input"
        style={{ width: '100%', padding: '6px', cursor: 'pointer' }}
      />
      {open && (
        <ThaiCalendar
          value={value}
          onChange={(val) => onChange(val)}
          onClose={() => setOpen(false)}
          isTo={isTo}
        />
      )}
    </div>
  )
}

/* ---------------- Main Filter Property ---------------- */
const DefaultDatetimeFilterProperty = ({ property, filter, onChange }) => {
  const { translateProperty } = useTranslation()
  const fromKey = `${property.path}~~from`
  const toKey = `${property.path}~~to`
  const fromValue = filter?.[fromKey] ?? ''
  const toValue = filter?.[toKey] ?? ''

  const safeChange = (key, value) => {
    if (!value) return onChange(key, undefined)
    onChange(key, value)
  }

  return (
    <FormGroup variant="filter">
      <Label>{translateProperty(property, 'label') || property.label} (กรองตามวันที่และเวลา)</Label>

      <Label mt="default">จากวันที่</Label>
      <ThaiDateInput
        value={fromValue}
        onChange={(val) => safeChange(fromKey, val)}
      />

      <Label mt="default">ถึงวันที่</Label>
      <ThaiDateInput
        value={toValue}
        onChange={(val) => safeChange(toKey, val)}
        isTo
      />
    </FormGroup>
  )
}

export default DefaultDatetimeFilterProperty
