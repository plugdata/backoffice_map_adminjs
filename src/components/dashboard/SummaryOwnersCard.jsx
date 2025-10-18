import React from 'react'
import { Card } from './Card'
// import { MiniBarChart } from './MiniBarChart'
import { useFiltered, ownersCount } from './helpers'
import { Building2 } from 'lucide-react'
export const SummaryOwnersCard = ({ ownerId, userId }) => {
  const rows = useFiltered(ownerId, userId)
  const countOwners = ownersCount(rows)
  
  // Property/Owner icon
  const ownerIcon = (
    <div style={{ fontSize: '24px', color: '#FF6B9D' }}>
      <Building2 />
    </div>
  )
  
  return (
    <Card 
      title="สรุปเจ้าของทรัพย์สิน (ในช่วงที่เลือก)"
      value={countOwners}
      unit="ราย"
      miniChart={ownerIcon}
    />
  )
}
