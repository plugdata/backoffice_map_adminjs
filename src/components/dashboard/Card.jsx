import React from 'react'
import { Box, Text } from '@adminjs/design-system'

export const Card = ({ title, value, unit, miniChart, rightSlot }) => (
  <Box
    bg="white"
    borderRadius="lg"
    boxShadow="card"
    border="2px solid #e0e0e0"
    mb="xl"
    width="100%"
    height="100%"
    position="relative"
    p="0"
    style={{
      overflow: 'hidden',
      transition: 'all 0.25s ease',
      cursor: 'pointer',
    }}
    // 🔹 Hover effect
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow =
        '0 8px 20px rgba(0, 0, 0, 0.12)'
      e.currentTarget.style.border = '2px solid #007bff' // สีน้ำเงินเมื่อ hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)'
      e.currentTarget.style.border = '2px solid #e0e0e0'
    }}
  >
    {/* เนื้อหาด้านใน */}
    <Box p="xl">
      <Text fontSize="md" fontWeight="600" color="grey70" mb="sm">
        {title}
      </Text>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text
            fontSize="40px" // 🔹 ตัวเลขใหญ่ขึ้น
            fontWeight="bold"
            color="grey90"
            m={0}
            lineHeight="1.1"
          >
            {value}
          </Text>
          {unit && (
            <Text fontSize="md" color="grey70" m={0}>
              {unit}
            </Text>
          )}
        </Box>

        {miniChart && (
          <Box width="90px" height="45px">
            {miniChart}
          </Box>
        )}
      </Box>

      {rightSlot && (
        <Box position="absolute" top="lg" right="lg">
          {rightSlot}
        </Box>
      )}
    </Box>
  </Box>
)
