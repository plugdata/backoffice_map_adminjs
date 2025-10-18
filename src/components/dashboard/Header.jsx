import React from 'react'
import { Box , Input , H2 } from '@adminjs/design-system'
import { pageHeaderHeight, pageHeaderPaddingY, pageHeaderPaddingX } from './constants'


export const Header = ({ children }) => {
  return (
    <Box data-css="default-dashboard">
      <Box
        position="relative"
        overflow="hidden"
        bg="white"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={['default', 'lg', pageHeaderPaddingX]}
        color='	#4268F6'
      >
        <Box
          position="absolute"
          top="20%"
          left="5%"
        >
          {children}
        </Box>
      </Box>
     
    </Box>
  )
}
