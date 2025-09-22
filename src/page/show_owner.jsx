import React, { useEffect, useState } from "react"
import { Box } from '@adminjs/design-system'
import TabsOwner from '../components/ownerui/tabs_owner'
import CardOwner from '../components/ownerui/card_owner'
import SummaryTab from '../components/ownerui/summary_owner'
import { useOwnerStore } from '../components/ownerui/lib/ownerStore'

const OwnerShow = ({ record }) => {
  const setOwnerId = useOwnerStore((state) => state.setOwnerId)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (record?.params?.id) {
      setOwnerId(record.params.id)  // update global store
      setReady(true)                // ✅ flag ว่า ready
    } else {
      setReady(false)
    }
  }, [record, setOwnerId])

  if (!ready) {
    return <p style={{ padding: 20 }}>⏳ กำลังโหลดข้อมูลเจ้าของ...</p>
  }

  return (
    <Box>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <CardOwner />
        <SummaryTab />
        {/* ใช้ key บังคับ remount เมื่อเปลี่ยน Owner */}
        <TabsOwner key={record?.params?.id} ownerId={record?.params?.id} />
      </div>
    </Box>
  )
}

export default OwnerShow
