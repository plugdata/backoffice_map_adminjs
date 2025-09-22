import { Box } from "@adminjs/design-system"
import DateRangePicker from "./to-date"

export default function dss() {
  const handleRangeChange = (range) => {
    console.log("Range:", range)
    // ตัวอย่างเอาไปใช้ query string
    if (range.from && range.to) {
      const query = `createdAt~~from=${range.from}&filters.createdAt~~to=${range.to}`
      console.log("Query String:", query)
    }
  }

  return (
    <Box height="400px">
      <DateRangePicker onChange={handleRangeChange} themeColor="#4CAF50" />
    </Box>
  )
}
