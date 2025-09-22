import React, { useState, useEffect } from 'react'
import { Box, Button, Label, Select, Text } from '@adminjs/design-system'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend, TimeScale } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, ChartTooltip, ChartLegend, TimeScale)

const models = [
  { value: 'BuildingControl', label: 'BuildingControl' },
  { value: 'RiskZone', label: 'RiskZone' },
  { value: 'ZoningPlan', label: 'ZoningPlan' },
  { value: 'PlanProject', label: 'PlanProject' },
  { value: 'ApprovedProject', label: 'ApprovedProject' },
]

const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [recent, setRecent] = useState([])
  const [summary, setSummary] = useState({ total: 0, latestUpdatedAt: null, uploads: { total: 0, latestCreatedAt: null } })
  const [uploadsTrend, setUploadsTrend] = useState([])
  const [buildingByYear, setBuildingByYear] = useState([])
  const [loading, setLoading] = useState(false)

  const loadPerModelData = async (model) => {
    setLoading(true)
    try {
      const [rRes, sRes] = await Promise.all([
        fetch(`/api/dashboard/entity/recent?model=${model.value}&limit=10`).then(r => r.json()),
        fetch(`/api/dashboard/entity/summary?model=${model.value}`).then(r => r.json()),
      ])
      setRecent(rRes?.data || [])
      setSummary(sRes?.data || { total: 0, latestUpdatedAt: null, uploads: { total: 0, latestCreatedAt: null } })
    } catch (e) {
      setRecent([])
      setSummary({ total: 0, latestUpdatedAt: null, uploads: { total: 0, latestCreatedAt: null } })
    } finally {
      setLoading(false)
    }
  }

  const loadCharts = async () => {
    try {
      const [uRes, bRes] = await Promise.all([
        fetch('/api/dashboard/uploads-trend?months=6').then(r => r.json()),
        fetch('/api/dashboard/building-by-year').then(r => r.json()),
      ])
      setUploadsTrend(uRes?.data || [])
      setBuildingByYear(bRes?.data || [])
    } catch (e) {
      setUploadsTrend([])
      setBuildingByYear([])
    }
  }

  useEffect(() => {
    loadPerModelData(selectedModel)
    loadCharts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModel?.value])

  const uploadsBarData = {
    labels: uploadsTrend.map(d => d.month),
    datasets: [
      {
        label: 'Uploads',
        data: uploadsTrend.map(d => d.uploads),
        backgroundColor: 'rgba(59,130,246,0.6)'
      }
    ]
  }

  const buildingPieData = {
    labels: buildingByYear.map(d => String(d.year)),
    datasets: [
      {
        label: 'จำนวน',
        data: buildingByYear.map(d => d.count),
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
      }
    ]
  }

  return (
    <Box>
      <h1>Dashboard</h1>

      <Box display="grid" gridTemplateColumns="1fr 2fr" gridGap="lg" mt="lg">
        {/* Left column: controls and summary */}
        <Box>
          <Box mb="lg">
            <Label>เลือกประเภทเอกสาร</Label>
            <Select
              value={selectedModel}
              options={models}
              onChange={(opt) => setSelectedModel(opt)}
            />
          </Box>

          <Box variant="white" border="default" p="lg" mb="lg">
            <Text as="h3">สรุป {selectedModel.label}</Text>
            <Box mt="md">
              <Text>รวมทั้งหมด: {summary.total}</Text>
              <Text>อัปเดตล่าสุด: {summary.latestUpdatedAt ? new Date(summary.latestUpdatedAt).toLocaleString() : '-'}</Text>
            </Box>
            <Box mt="md">
              <Text>อัปโหลดทั้งหมด: {summary.uploads?.total || 0}</Text>
              <Text>อัปโหลดล่าสุด: {summary.uploads?.latestCreatedAt ? new Date(summary.uploads.latestCreatedAt).toLocaleString() : '-'}</Text>
            </Box>
          </Box>

          <Box variant="white" border="default" p="lg">
            <Text as="h3">รายการล่าสุด</Text>
            <Box mt="md" style={{ maxHeight: 260, overflowY: 'auto' }}>
              {(recent || []).map((r) => (
                <Box key={r.id} mb="md" style={{ borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                  <Text><b>ID:</b> {r.id}</Text>
                  {r.building_type && <Text><b>ประเภท:</b> {r.building_type}</Text>}
                  {r.zoneType && <Text><b>โซน:</b> {r.zoneType}</Text>}
                  {r.areaName && <Text><b>พื้นที่:</b> {r.areaName}</Text>}
                  {r.name && <Text><b>ชื่อ:</b> {r.name}</Text>}
                  <Text color="grey40">{r.updatedAt ? new Date(r.updatedAt).toLocaleString() : (r.createdAt ? new Date(r.createdAt).toLocaleString() : '')}</Text>
                </Box>
              ))}
              {!recent?.length && <Text color="grey40">ไม่มีข้อมูล</Text>}
            </Box>
            <Box mt="md"><Button size="sm" disabled={loading} onClick={() => loadPerModelData(selectedModel)}>รีเฟรช</Button></Box>
          </Box>
        </Box>

        {/* Right column: charts */}
        <Box>
          <Box variant="white" border="default" p="lg" mb="lg">
            <Text as="h3">แนวโน้มการอัปโหลด (6 เดือน)</Text>
            <Box mt="md">
              <Bar data={uploadsBarData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </Box>
          </Box>
          <Box variant="white" border="default" p="lg">
            <Text as="h3">อาคารต่อปีงบประมาณ</Text>
            <Box mt="md" style={{ maxWidth: 420 }}>
              <Pie data={buildingPieData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard