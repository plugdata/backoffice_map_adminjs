import React from 'react'
import { Card } from './Card'
// import { MiniBarChart } from './MiniBarChart'
import { locationCountForOwner } from './helpers'
import { MapPin } from 'lucide-react'
export const LocationMarkerCard = ({ ownerId }) => {
  const total = locationCountForOwner(ownerId)
  
  // Location/Marker icon
  const locationIcon = (
    <div style={{ fontSize: '24px', color: '#FF8C42' }}>
      <MapPin />
    </div>
  )
  
  return (
    <Card 
      title="รายงาน Location Marker"
      value={total}
      unit="ตำแหน่ง"
      miniChart={locationIcon}
    />
  )
}
