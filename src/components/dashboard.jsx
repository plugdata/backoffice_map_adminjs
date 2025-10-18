import React, { useState } from 'react'
import { Box, H2 } from '@adminjs/design-system'
import { Filters } from './dashboard/Filters'
import { OWNERS, USERS } from './dashboard/constants'
import { LocationMarkerCard } from './dashboard/LocationMarkerCard'
import { SummaryOwnersCard } from './dashboard/SummaryOwnersCard'
import { SummaryUsersCard } from './dashboard/SummaryUsersCard'
import { UploadReportCard } from './dashboard/UploadReportCard'

const Dashboard = () => {
  const [owner, setOwner] = useState(OWNERS[0])
  const [user, setUser] = useState(USERS[0])

  const handleRefresh = () => {
    // TODO: refresh from API
  }

  return (
    <div>
      {/* ส่วนหัว */}
      <Box
        bg="white"
        p="lg"
        borderRadius="lg"
        boxShadow="card"
        width="96%"
        mx="auto"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      >
        <H2 color="primary100" mb="md">
          แดชบอร์ด
        </H2>

        <Filters
          owner={owner}
          setOwner={setOwner}
          user={user}
          setUser={setUser}
          onRefresh={handleRefresh}
        />
      </Box>

      {/* การ์ดหลัก 3 ใบ แบบโปร่ง */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap="0"
        rowGap="0"
        width="98%"
        mx="auto"
        p="0"
        style={{ overflow: 'hidden', borderRadius: '12px' }}
      >
        <Box p="md" >
          <LocationMarkerCard ownerId={owner.value} />
        </Box>

        <Box p="md">
          <SummaryOwnersCard ownerId={owner.value} userId={user.value} />
        </Box>

        <Box p="md">
          <SummaryUsersCard ownerId={owner.value} userId={user.value} />
        </Box>
      </Box>

      {/* ส่วนกราฟรายงาน Upload */}
      <Box
        width="96%"
        mx="auto"
        mt="md"
        p="lg"
        bg="white"
        borderRadius="lg"
        boxShadow="card"
      >
        <UploadReportCard ownerId={owner.value} userId={user.value} />
      </Box>
   

    </div>
  )
}

export default Dashboard
