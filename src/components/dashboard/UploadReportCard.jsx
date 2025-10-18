import React from 'react'
import { Box, Text } from '@adminjs/design-system'
import { UploadBarChart } from './UploadBarChart'
import UploadLineChart from './UploadLineChart'

export const UploadReportCard = ({ ownerId, userId }) => (

  <Box
  bg="transparent"
  p="xl"
  width="100%"
  mx="auto"
  display="flex"
  flexDirection="row"
  flexWrap="wrap"
  justifyContent="center"
  alignItems="stretch"
  style={{ gap: '20px', marginTop: '10px', marginBottom: '10px' }}
>
  <Box
    flex="1"
    minWidth="300px"
    maxWidth="600px"
    height="350px"
    display="flex"
    bg="white"
    borderRadius="lg"
    boxShadow="card"
  >
    <UploadBarChart ownerId={ownerId} userId={userId} />
  </Box>

  <Box
    flex="1"
    minWidth="300px"
    maxWidth="600px"
    height="350px"
    display="flex"
    bg="white"
    borderRadius="lg"
    boxShadow="card"
  >
    <UploadLineChart ownerId={ownerId} userId={userId} />
  </Box>
</Box>
)
