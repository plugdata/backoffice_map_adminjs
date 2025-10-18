// admin/components/UploadLineChart.jsx
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip)

const UploadLineChart = ({ uploadData = [] }) => {
  // สมมุติข้อมูล upload ต่อเดือน
  const labels = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.'];


  // แปลงข้อมูลจริงจาก props หรือ mock
  const current = [65, 59, 80, 81, 56, 55, 40]   // 📊 เดือนปัจจุบัน
  const previous = [50, 45, 60, 70, 52, 60, 30] // 📈 เดือนก่อนหน้า

  const data = {
    labels,
    datasets: [
      {
        label: 'เดือนปัจจุบัน',
        data: current,
        borderColor: '#3498DB',
        backgroundColor: 'rgba(52,152,219,0.3)',
        tension: 0.4, // เส้นโค้งนุ่ม
        pointBorderColor: '#3498DB',
        pointBackgroundColor: '#fff',
        pointRadius: 4,
      },
      {
        label: 'เดือนก่อนหน้า',
        data: previous,
        borderColor: '#E74C3C',
        backgroundColor: 'rgba(231,76,60,0.2)',
        borderDash: [5, 5], // เส้นประ
        tension: 0.3,
        pointBorderColor: '#E74C3C',
        pointBackgroundColor: '#fff',
        pointRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#555', font: { size: 12 } },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: { callback: (v) => `${v}%` },
        beginAtZero: true,
        max: 100,
      },
    },
  }

  return <Line data={data} options={options} height={200} />
}

export default UploadLineChart
