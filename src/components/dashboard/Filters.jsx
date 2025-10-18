import React from 'react'
import { Box, Button, H5, H6, Select } from '@adminjs/design-system'
import { OWNERS, USERS } from './constants'

export const Filters = ({ owner, setOwner, user, setUser, onRefresh }) => (
  <Box display="flex" gap="10px">
    <H5>เลือกข้อมูล</H5>
    <Box mr="10px" ml="10px" width="30%">
      <Select
        value={owner}
        options={OWNERS}
        onChange={setOwner}
        isClearable={false}
        size="sm"
        variant="filter"
        placeholder="เลือกเจ้าของทรัพย์สิน"
        width="500px"
      />
    </Box>
    <Box mr="10px" ml="10px" width="30%">
      <Select
        value={user}
        options={USERS}
        onChange={setUser}
        isClearable={false}
        size="sm"
        variant="filter"
        placeholder="เลือกผู้ใช้งาน"
      />
    </Box>
    <Button size="sm" onClick={onRefresh}>
      <H6>รีเฟรช</H6>
    </Button>
  </Box>
)
