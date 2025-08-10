import React, { useState } from "react";

const CustomDatePicker = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleYearChange = (event) => {
        const year = parseInt(event.target.value, 10);
        if (!isNaN(year)) {
            setSelectedYear(year);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <label htmlFor="yearPicker" style={{ marginRight: "10px" }}>
                Select Year:
            </label>
            <input
                id="yearPicker"
                type="number"
                value={selectedYear}
                onChange={handleYearChange}
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 546}
                style={{
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "100px",
                }}
            />
            <p style={{ marginTop: "10px" }}>
                Selected Year: <strong>{selectedYear}</strong>
            </p>
        </div>
    );
};

export default CustomDatePicker;