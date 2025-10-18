import React from 'react'
import { Box } from '@adminjs/design-system'

export const Body = ({ children }) => (
  <Box
    bg="white"
    p="xl"
    mt="xl"
    borderRadius="lg"
    boxShadow="card"
    width="95%"
    mx="auto"
  >
    {children}
  </Box>
)
