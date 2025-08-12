import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// ========================================
// Dashboard Component
// ========================================
const Dashboard = () => {
  const [stats, setStats] = useState({
    storage: {
      used: 0,
      total: 1024,
      documents: 0,
      files: 0
    },
    uploads: {
      today: 0,
      week: 0,
      month: 0,
      total: 0
    },
    usage: {
      activeUsers: 0,
      totalUsers: 0,
      departments: 0,
      documentTypes: 0
    }
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ========================================
  // Chart Data
  // ========================================
  const uploadTrendData = {
    labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
    datasets: [
      {
        label: 'อัปโหลด',
        data: [12, 19, 15, 22, 18, 8, 5],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'ดาวน์โหลด',
        data: [8, 15, 12, 18, 14, 5, 3],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const storageDistributionData = {
    labels: ['เอกสาร PDF', 'รูปภาพ', 'เอกสาร Word', 'ไฟล์อื่นๆ'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  }

  const departmentUsageData = {
    labels: ['HR', 'IT', 'Finance', 'Marketing', 'Sales'],
    datasets: [
      {
        label: 'จำนวนเอกสาร',
        data: [45, 38, 32, 28, 25],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#8B5CF6',
          '#EF4444'
        ],
        borderRadius: 4
      }
    ]
  }

  const monthlyUploadsData = {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
    datasets: [
      {
        label: 'อัปโหลด',
        data: [120, 135, 98, 156, 142, 178],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'อนุมัติ',
        data: [95, 110, 85, 130, 120, 150],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  }

  // ========================================
  // Chart Options
  // ========================================
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  }

  // ========================================
  // Load Dashboard Data
  // ========================================
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Use mock data
        const mockStats = {
          storage: {
            used: 756, // MB
            total: 1024,
            documents: 1250,
            files: 1890
          },
          uploads: {
            today: 23,
            week: 156,
            month: 678,
            total: 3456
          },
          usage: {
            activeUsers: 45,
            totalUsers: 78,
            departments: 6,
            documentTypes: 12
          }
        }

        setStats(mockStats)
        setLoading(false)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        setError(error.message)
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  // ========================================
  // Helper Functions
  // ========================================
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStoragePercentage = () => {
    return Math.round((stats.storage.used / stats.storage.total) * 100)
  }

  // ========================================
  // Loading State
  // ========================================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // ========================================
  // Error State
  // ========================================
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">เกิดข้อผิดพลาด</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📊 ระบบจัดการเอกสาร - Dashboard
        </h1>
        <p className="text-gray-600">
          ภาพรวมการใช้งานระบบและสถิติต่างๆ
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Storage Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">พื้นที่จัดเก็บ</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatBytes(stats.storage.used * 1024 * 1024)}
              </p>
              <p className="text-sm text-gray-500">
                จาก {formatBytes(stats.storage.total * 1024 * 1024)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>การใช้งาน</span>
              <span>{getStoragePercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getStoragePercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Uploads Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">อัปโหลดวันนี้</p>
              <p className="text-2xl font-bold text-gray-900">{stats.uploads.today}</p>
              <p className="text-sm text-gray-500">
                ทั้งหมด {stats.uploads.total} ไฟล์
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>สัปดาห์นี้</span>
              <span className="text-green-600 font-medium">+{stats.uploads.week}</span>
            </div>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ผู้ใช้ที่ใช้งาน</p>
              <p className="text-2xl font-bold text-gray-900">{stats.usage.activeUsers}</p>
              <p className="text-sm text-gray-500">
                จาก {stats.usage.totalUsers} คน
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>แผนก</span>
              <span className="text-purple-600 font-medium">{stats.usage.departments}</span>
            </div>
          </div>
        </div>

        {/* Documents Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">เอกสารทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.storage.documents}</p>
              <p className="text-sm text-gray-500">
                ประเภท {stats.usage.documentTypes} ชนิด
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>ไฟล์</span>
              <span className="text-orange-600 font-medium">{stats.storage.files}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upload Trend Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📈 แนวโน้มการอัปโหลดรายสัปดาห์
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={uploadTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Storage Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🗂️ การกระจายของพื้นที่จัดเก็บ
          </h3>
          <div style={{ height: '300px' }}>
            <Doughnut data={storageDistributionData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Usage */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🏢 การใช้งานตามแผนก
          </h3>
          <div style={{ height: '300px' }}>
            <Bar data={departmentUsageData} options={chartOptions} />
          </div>
        </div>

        {/* Monthly Uploads */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📅 การอัปโหลดรายเดือน
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={monthlyUploadsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ⚡ การดำเนินการด่วน
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium text-blue-900">อัปโหลดเอกสาร</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium text-green-900">ดูเอกสาร</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span className="text-sm font-medium text-purple-900">จัดการผู้ใช้</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <svg className="w-8 h-8 text-orange-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm font-medium text-orange-900">รายงาน</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
