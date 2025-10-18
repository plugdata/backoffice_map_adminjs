import React from 'react'
import { Card } from './Card'
// import { MiniLineChart } from './MiniLineChart'
import { useFiltered } from './helpers'
import { Users } from 'lucide-react'
export const SummaryUsersCard = ({ ownerId, userId }) => {
  const rows = useFiltered(ownerId, userId)
  const countUsers = rows.length
  
  // User icon
  const userIcon = (
    <div style={{ fontSize: '60px', color: '#3B82F6' }}>
      <Users />
    </div>
  )
  
  return (
    <Card 
      title="สรุปผู้ใช้งาน"
      value={countUsers}
      unit="ผู้ใช้งาน"
      miniChart={userIcon}
    />
  )
}
