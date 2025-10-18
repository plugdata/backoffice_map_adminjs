// Commented out - replaced with simple icons
/*
import React from 'react'
import { Box } from '@adminjs/design-system'

export const MiniLineChart = ({ color = "#3B82F6", data = [2, 4, 3, 5, 4, 6, 5] }) => (
  <Box width="100%" height="100%" position="relative">
    <svg width="100%" height="100%" viewBox="0 0 80 40">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d={`M 0,${40 - (data[0] / Math.max(...data)) * 30} ${data.map((value, index) => 
          `L ${(index * 80) / (data.length - 1)},${40 - (value / Math.max(...data)) * 30}`
        ).join(' ')}`}
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path
        d={`M 0,${40 - (data[0] / Math.max(...data)) * 30} ${data.map((value, index) => 
          `L ${(index * 80) / (data.length - 1)},${40 - (value / Math.max(...data)) * 30}`
        ).join(' ')} L 80,40 L 0,40 Z`}
        fill="url(#gradient)"
      />
    </svg>
  </Box>
)
*/
