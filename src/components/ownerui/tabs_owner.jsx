import { useEffect, useState } from 'react'
import { useOwnerStore } from './lib/ownerStore'
import { Box, Tabs, Tab } from '@adminjs/design-system'
import BcontrolTab from './bcontrol_tab'
import RiskzoneTab from './riskzone_tab'
import ZoningplanTab from './zoningplan_tab'

const TabsOwner = ({ ownerId }) => {
  const [selectedTab, setSelectedTab] = useState('first')

  // reset tab ทุกครั้งที่เปลี่ยน owner
  useEffect(() => {
    setSelectedTab('first')
  }, [ownerId])

  return (
    <Box>
      <Tabs currentTab={selectedTab} onChange={setSelectedTab} mt="lg" mb="xl">
        <Tab id="first" label="ควบคุมอาคาร" />
        <Tab id="second" label="งานระวางสาธารณะ" />
        <Tab id="third" label="ผังเมือง" />
      </Tabs>

      {selectedTab === "first" && <BcontrolTab ownerId={ownerId} />}
      {selectedTab === "second" && <RiskzoneTab ownerId={ownerId} />}
      {selectedTab === "third" && <ZoningplanTab ownerId={ownerId} />}
    </Box>
  )
}

export default TabsOwner
