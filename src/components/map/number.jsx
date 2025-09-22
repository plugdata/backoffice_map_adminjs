import React, { useState } from "react"

const Number = () => {
  const [numbers, setNumbers] = useState([]) // เก็บเลขที่เพิ่มเข้ามา
  const [count, setCount] = useState(0) // เก็บค่าล่าสุด

  const handleAdd = () => {
    const newValue = count + 1
    setCount(newValue)
    setNumbers([...numbers, newValue]) // เพิ่มเลขใหม่เข้า array
  }

  return (
    <div>
      <button onClick={handleAdd}>เพิ่มเลข</button>
      <div>
        {numbers.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  )
}

export default Number
