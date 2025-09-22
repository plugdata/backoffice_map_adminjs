import React, { useState, useEffect } from "react"

export default function DatePicker({
  value,
  onChange,
  label = "เลือกวันที่และเวลา",
  themeColor = "#e91e63", // ชมพูเป็นค่าเริ่มต้น
  propertyType = "datetime"
}) {
  const today = new Date()
  const [step, setStep] = useState("year")
  const [currentYear, setCurrentYear] = useState(today.getFullYear() + 543)
  const [currentMonth, setCurrentMonth] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedTime, setSelectedTime] = useState("12:00")
  const [inputValue, setInputValue] = useState("")
  const [showModal, setShowModal] = useState(false)

  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ]
  const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"]

  // ✅ load ค่าเริ่มต้นจาก value (ISO → พ.ศ.)
  useEffect(() => {
    if (value) {
      const d = new Date(value)
      const day = d.getDate()
      const month = d.getMonth()
      const year = d.getFullYear() + 543
      const timeStr = d.toISOString().substring(11, 16)

      setCurrentYear(year)
      setCurrentMonth(month)
      setSelectedDay(day)
      setSelectedTime(timeStr)

      setInputValue(
        `${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year} ${timeStr}`
      )
    }
  }, [value])

  const daysInMonth = (year, month) =>
    new Date(year - 543, month + 1, 0).getDate()
  const firstDayOfMonth = (year, month) =>
    new Date(year - 543, month, 1).getDay()

  const generateCalendar = () => {
    if (currentMonth === null) return []
    const totalDays = daysInMonth(currentYear, currentMonth)
    const startDay = firstDayOfMonth(currentYear, currentMonth)
    const weeks = []
    let day = 1
    for (let i = 0; i < 6; i++) {
      const week = []
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startDay) || day > totalDays) {
          week.push(null)
        } else {
          week.push(day)
          day++
        }
      }
      weeks.push(week)
    }
    return weeks
  }

  const weeks = generateCalendar()

  const handleConfirm = () => {
    if (currentYear && currentMonth !== null && selectedDay) {
      // UI Value (พ.ศ.)
      const formattedThai = `${String(selectedDay).padStart(2, "0")}/${String(
        currentMonth + 1
      ).padStart(2, "0")}/${currentYear} ${selectedTime}`
      setInputValue(formattedThai)

      // DB Value (ISO)
      const [hh, mm] = selectedTime.split(":")
      const jsDate = new Date(
        currentYear - 543,
        currentMonth,
        selectedDay,
        parseInt(hh, 10),
        parseInt(mm, 10)
      )
      const isoString = jsDate.toISOString()
      onChange?.(isoString) // ✅ ส่งกลับค่า ISO
    }

    setShowModal(false)
    setStep("year")
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
      {/* Input */}
      <input
        type="text"
        placeholder="เลือกวันที่และเวลา"
        value={inputValue}
        readOnly
        onClick={() => setShowModal(true)}
        style={{
          width: "260px",
          padding: "10px",
          border: `1px solid ${themeColor}`,
          borderRadius: "6px",
          fontSize: "14px",
          cursor: "pointer",
          background: "#fff"
        }}
      />

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              width: "340px",
              background: "#fff",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              border: `2px solid ${themeColor}`
            }}
          >
            {/* Step เลือกปี */}
            {step === "year" && (
              <div>
                <h3 style={{ color: themeColor }}>เลือกปี</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "6px",
                    marginTop: "10px"
                  }}
                >
                  {Array.from({ length: 20 }, (_, i) => {
                    const year = today.getFullYear() + 543 - i
                    return (
                      <button
                        key={year}
                        onClick={() => {
                          setCurrentYear(year)
                          setStep("month")
                        }}
                        style={{
                          padding: "6px",
                          borderRadius: "6px",
                          border: `1px solid ${themeColor}`,
                          background:
                            currentYear === year ? themeColor : "#fff",
                          color:
                            currentYear === year ? "#fff" : themeColor,
                          cursor: "pointer"
                        }}
                      >
                        {year}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step เลือกเดือน */}
            {step === "month" && (
              <div>
                <h3 style={{ color: themeColor }}>เลือกเดือน</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "6px",
                    marginTop: "10px"
                  }}
                >
                  {months.map((m, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentMonth(i)
                        setStep("day")
                      }}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: `1px solid ${themeColor}`,
                        background:
                          currentMonth === i ? themeColor : "#fff",
                        color: currentMonth === i ? "#fff" : themeColor,
                        cursor: "pointer"
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step เลือกวัน */}
            {step === "day" && (
              <div>
                <h3 style={{ color: themeColor }}>
                  {months[currentMonth]} {currentYear}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    marginBottom: "5px"
                  }}
                >
                  {days.map((d, i) => (
                    <div
                      key={i}
                      style={{ fontWeight: "bold", color: themeColor }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center"
                  }}
                >
                  {weeks.map((week, i) =>
                    week.map((day, j) => (
                      <div
                        key={`${i}-${j}`}
                        style={{
                          padding: "8px",
                          margin: "2px",
                          cursor: day ? "pointer" : "default",
                          background:
                            selectedDay === day ? themeColor : "transparent",
                          color: selectedDay === day ? "#fff" : "#000",
                          borderRadius: "4px"
                        }}
                        onClick={() => {
                          if (day) {
                            setSelectedDay(day)
                            setStep(
                              propertyType === "datetime" ? "time" : "confirm"
                            )
                          }
                        }}
                      >
                        {day || ""}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Step เลือกเวลา */}
            {step === "time" && (
              <div>
                <h3 style={{ color: themeColor }}>เลือกเวลา</h3>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={{
                    padding: "6px",
                    border: `1px solid ${themeColor}`,
                    borderRadius: "6px",
                    color: themeColor
                  }}
                />
              </div>
            )}

            {/* ปุ่ม action */}
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <button
                onClick={() => {
                  setShowModal(false)
                  setStep("year")
                }}
                style={{
                  background: "#fff",
                  border: `1px solid ${themeColor}`,
                  color: themeColor,
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  background: themeColor,
                  border: "none",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
