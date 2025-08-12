import React, { useState, useEffect } from 'react'
import { Box, H2, Text, Badge, Button, Table, TableHead, TableRow, TableBody, TableCell } from '@adminjs/design-system'

// Mock API Data
const mockStats = {
  totalDocuments: 156,
  pendingApproval: 23,
  approvedToday: 8,
  rejectedToday: 2,
  totalUsers: 45,
  activeUsers: 38
}

const mockNotifications = [
  {
    id: 1,
    type: 'document_approval',
    title: 'เอกสารรอการอนุมัติ',
    message: 'ใบคำขออนุมัติ PR-2024-001 รอการอนุมัติจากคุณ',
    documentCode: 'PR-2024-001',
    createdAt: '2024-01-15T10:30:00Z',
    isRead: false
  },
  {
    id: 2,
    type: 'document_approved',
    title: 'เอกสารถูกอนุมัติ',
    message: 'ใบคำขออนุมัติ PR-2024-002 ได้รับการอนุมัติแล้ว',
    documentCode: 'PR-2024-002',
    createdAt: '2024-01-15T09:15:00Z',
    isRead: true
  },
  {
    id: 3,
    type: 'document_rejected',
    title: 'เอกสารถูกปฏิเสธ',
    message: 'ใบคำขออนุมัติ PR-2024-003 ถูกปฏิเสธ กรุณาตรวจสอบ',
    documentCode: 'PR-2024-003',
    createdAt: '2024-01-15T08:45:00Z',
    isRead: false
  },
  {
    id: 4,
    type: 'system_alert',
    title: 'ระบบแจ้งเตือน',
    message: 'ระบบจะปิดปรับปรุงในวันที่ 20 มกราคม 2024 เวลา 22:00-02:00',
    createdAt: '2024-01-15T08:00:00Z',
    isRead: true
  }
]

const mockDocuments = [
  {
    id: 1,
    documentCode: 'PR-2024-001',
    title: 'ใบคำขออนุมัติซื้อเครื่องคอมพิวเตอร์',
    department: 'IT',
    requester: 'สมชาย ใจดี',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    amount: 45000
  },
  {
    id: 2,
    documentCode: 'PR-2024-002',
    title: 'ใบคำขออนุมัติซื้อวัสดุสำนักงาน',
    department: 'HR',
    requester: 'สมหญิง รักดี',
    status: 'approved',
    createdAt: '2024-01-15T09:15:00Z',
    amount: 15000
  },
  {
    id: 3,
    documentCode: 'PR-2024-003',
    title: 'ใบคำขออนุมัติซื้อเครื่องปรับอากาศ',
    department: 'Finance',
    requester: 'สมศักดิ์ มั่นคง',
    status: 'rejected',
    createdAt: '2024-01-15T08:45:00Z',
    amount: 25000
  },
  {
    id: 4,
    documentCode: 'PR-2024-004',
    title: 'ใบคำขออนุมัติซื้อเครื่องพิมพ์',
    department: 'Marketing',
    requester: 'สมปอง สร้างสรรค์',
    status: 'pending',
    createdAt: '2024-01-15T08:00:00Z',
    amount: 18000
  }
]

const notification = () => {
  const [stats, setStats] = useState(mockStats)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [documents, setDocuments] = useState(mockDocuments)
  const [loading, setLoading] = useState(false)

  // Mock API calls
  const fetchStats = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setStats(mockStats)
    setLoading(false)
  }

  const fetchNotifications = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    setNotifications(mockNotifications)
    setLoading(false)
  }

  const fetchDocuments = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 400))
    setDocuments(mockDocuments)
    setLoading(false)
  }

  useEffect(() => {
    fetchStats()
    fetchNotifications()
    fetchDocuments()
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">รออนุมัติ</Badge>
      case 'approved':
        return <Badge variant="success">อนุมัติแล้ว</Badge>
      case 'rejected':
        return <Badge variant="danger">ปฏิเสธ</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'document_approval':
        return '📋'
      case 'document_approved':
        return '✅'
      case 'document_rejected':
        return '❌'
      case 'system_alert':
        return '🔔'
      default:
        return '📢'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount)
  }

  return (
    <Box>
      {/* Header */}
     

      {/* Summary Statistics */}
      <Box mb="xl">
        <Box display="grid" gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr', 'repeat(6, 1fr)']} gap="lg">
          <Box bg="white" p="lg" borderRadius="default" boxShadow="card">
            <Text fontSize="sm" fontWeight="bold" color="grey40" mb="sm">เอกสารทั้งหมด</Text>
            <Text fontSize="xxl" fontWeight="bold" color="primary100">{stats.totalDocuments}</Text>
          </Box>
          
          <Box bg="white" p="lg" borderRadius="default" boxShadow="card">
            <Text fontSize="sm" fontWeight="bold" color="grey40" mb="sm">รออนุมัติ</Text>
            <Text fontSize="xxl" fontWeight="bold" color="warning">{stats.pendingApproval}</Text>
          </Box>
          
          <Box bg="white" p="lg" borderRadius="default" boxShadow="card">
            <Text fontSize="sm" fontWeight="bold" color="grey40" mb="sm">อนุมัติวันนี้</Text>
            <Text fontSize="xxl" fontWeight="bold" color="success">{stats.approvedToday}</Text>
          </Box>
          
          <Box bg="white" p="lg" borderRadius="default" boxShadow="card">
            <Text fontSize="sm" fontWeight="bold" color="grey40" mb="sm">ปฏิเสธวันนี้</Text>
            <Text fontSize="xxl" fontWeight="bold" color="error">{stats.rejectedToday}</Text>
          </Box>
          
          <Box bg="white" p="lg" borderRadius="default" boxShadow="card">
            <Text fontSize="sm" fontWeight="bold" color="grey40" mb="sm">ผู้ใช้ทั้งหมด</Text>
            <Text fontSize="xxl" fontWeight="bold" color="info">{stats.totalUsers}</Text>
          </Box>
          
          <Box bg="white" p="lg" borderRadius="default" boxShadow="card">
            <Text fontSize="sm" fontWeight="bold" color="grey40" mb="sm">ผู้ใช้ที่ใช้งาน</Text>
            <Text fontSize="xxl" fontWeight="bold" color="primary60">{stats.activeUsers}</Text>
          </Box>
        </Box>
      </Box>

      {/* Main Content Grid */}
      <Box display="grid" gridTemplateColumns={['1fr', '1fr 1fr']} gap="xl">
        {/* Notifications */}
        <Box bg="white" borderRadius="default" boxShadow="card">
          <Box p="lg" borderBottom="1px solid" borderColor="grey20">
            <H2>การแจ้งเตือนล่าสุด</H2>
            <Text fontSize="sm" color="grey40">อัปเดตล่าสุดเมื่อ {formatDate(new Date())}</Text>
          </Box>
          
          <Box p="lg">
            {notifications.map((notification) => (
              <Box key={notification.id} mb="md" p="md" borderRadius="default" border="1px solid" borderColor={notification.isRead ? "grey20" : "primary20"} bg={notification.isRead ? "grey10" : "primary10"}>
                <Box display="flex" alignItems="flex-start" gap="md">
                  <Text fontSize="xl">{getNotificationIcon(notification.type)}</Text>
                  <Box flex={1}>
                    <Text fontWeight="bold" color={notification.isRead ? "grey70" : "primary100"}>
                      {notification.title}
                    </Text>
                    <Text fontSize="sm" color="grey60" mt="sm">
                      {notification.message}
                    </Text>
                    {notification.documentCode && (
                      <Box mt="sm">
                        <Badge variant="info">{notification.documentCode}</Badge>
                      </Box>
                    )}
                    <Text fontSize="xs" color="grey40" mt="sm">
                      {formatDate(notification.createdAt)}
                    </Text>
                  </Box>
                  {!notification.isRead && (
                    <Box width="12px" height="12px" bg="primary100" borderRadius="50%"></Box>
                  )}
                </Box>
              </Box>
            ))}
            
            <Button variant="primary" size="lg" width={1} mt="lg">
              ดูการแจ้งเตือนทั้งหมด
            </Button>
          </Box>
        </Box>

        {/* Recent Documents */}
        <Box bg="white" borderRadius="default" boxShadow="card">
          <Box p="lg" borderBottom="1px solid" borderColor="grey20">
            <H2>เอกสารล่าสุด</H2>
            <Text fontSize="sm" color="grey40">เอกสารที่ส่งเข้ามาใหม่</Text>
          </Box>
          
          <Box p="lg">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>รหัสเอกสาร</TableCell>
                  <TableCell>ชื่อเอกสาร</TableCell>
                  <TableCell>แผนก</TableCell>
                  <TableCell>สถานะ</TableCell>
                  <TableCell>จำนวนเงิน</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <Text fontWeight="bold" color="primary100">{document.documentCode}</Text>
                    </TableCell>
                    <TableCell>
                      <Text fontWeight="bold">{document.title}</Text>
                      <Text fontSize="sm" color="grey40">{document.requester}</Text>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{document.department}</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(document.status)}
                    </TableCell>
                    <TableCell>
                      <Text fontWeight="bold">{formatCurrency(document.amount)}</Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <Button variant="primary" size="lg" width={1} mt="lg">
              ดูเอกสารทั้งหมด
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Quick Actions */}
  {/*     <Box mt="xl" bg="white" borderRadius="default" boxShadow="card" p="lg">
        <H3 mb="lg">การดำเนินการด่วน</H3>
        <Box display="flex" flexWrap="wrap" gap="md">
          <Button variant="primary">
            📄 สร้างเอกสารใหม่
          </Button>
          <Button variant="secondary">
            📋 ดูรายการรออนุมัติ
          </Button>
          <Button variant="info">
            📊 รายงานสถิติ
          </Button>
          <Button variant="success">
            👥 จัดการผู้ใช้
          </Button>
        </Box>
      </Box> */}
    </Box>
  )
}

export default notification
