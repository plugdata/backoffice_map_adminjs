import React, { useEffect } from 'react'
import { Box, Button } from '@adminjs/design-system'
import { useNavigate } from 'react-router-dom'
import { New } from 'adminjs'

const NewWithCancel = (props) => {
  const navigate = useNavigate()
  const resourceId = props.resource?.id || '' // เช่น "Company"

  useEffect(() => {
    const originalSubmit = document.querySelector('[data-testid="button-save"]')
    if (originalSubmit) originalSubmit.style.display = 'none'
  }, [])

  return (
    <Box position="relative">
      <New {...props} />
      <Box
       position="absolute"
       bottom="40px"
       left="0"
       right="0"
       className="mt-8 flex justify-center gap-[10px]"
      >
        <Button
          variant="primary"
          onClick={() => {
            const btn = document.querySelector('[data-testid="button-save"]')
            if (btn) btn.click()
          }}
        >
          บันทึก
        </Button>
        <Button
           color="danger"
          variant="outlined"
          onClick={() => navigate(`/admin/resources/${resourceId}`)} // ✅ dynamic path
        >
          ยกเลิก
        </Button>
      </Box>
    </Box>
  )
}

export default NewWithCancel