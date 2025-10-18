import React from 'react'
import { Box } from '@adminjs/design-system'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'
import { DOC_TYPES } from './constants'
import { useFiltered, countByType } from './helpers'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

export const UploadBarChart = ({ ownerId, userId }) => {
  const rows = useFiltered(ownerId, userId)
  const values = countByType(rows)

  const data = {
    labels: DOC_TYPES,
    datasets: [
      {
        label: 'จำนวนอัปโหลด',
        data: values,
        backgroundColor: 'rgba(59, 130, 246, 0.35)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'รายงานการอัปโหลดเอกสาร' },
      tooltip: { enabled: true },
    },
    scales: {
      x: { ticks: { color: '#6b7280' }, grid: { display: false } },
      y: { ticks: { color: '#6b7280' }, grid: { color: 'rgba(0,0,0,.06)' }, beginAtZero: true },
    },
  }

  return (
    <Box width="100%" height="100%">
      <Bar data={data} options={options} />
    </Box>
  )
}
