import React, { useState, useEffect } from 'react'
import { Box, Button, Input, H2, Text, Label, FormGroup, MessageBox } from '@adminjs/design-system'
import { useTranslation } from 'adminjs'


const Login = () => {
  const { translateLabel, translateButton, translateProperty, translateMessage } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isPopupOpen, setPopupOpen] = useState(false)
  
  // ✅ ดึงค่า action / message จาก global state ที่ AdminJS inject มา
  const props = (window).__APP_STATE__ || {}
  const { action, errorMessage: message } = props // ✅ เปลี่ยนชื่อเป็น message
  
    useEffect(() => {
      if (message) {
        console.warn('⚠️ Login error:', message)
        setPopupOpen(true)
      }
    }, [message])
  

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 80%)',
        backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
    
          <Box
                  backgroundColor="white"
                  borderRadius="16px"
                  boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  padding="2rem"
                  style={{ 
                    maxWidth: '450px', 
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0.5rem',
                    marginTop: '-80px', // ✅ ขยับขึ้น 80px

                  }}
                >
                  {/* Logo */}
                  <Box textAlign="center" mb="0.4rem">
                    <Box
                      width="120px"
                      height="120px"
                  //   backgroundColor="#667eea"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mx="auto"
                    //  mb="0.5rem"
                    >
                      <img src="/public/logo.png" alt="logo" width="100%" height="100%" />
                    </Box>

                </Box>

                {/* ชื่อระบบ */}
                <Box textAlign="center" lineHeight="1.1" className='text-center'>
                <H2
                  color="#1f2937"
                  mb="0" // ปิด margin bottom ของ H2 โดยตรง
                  fontSize="30px"
                  fontWeight="600"
                  style={{
                    marginBottom: '4px',  // ✅ ใช้ margin manual 4px
                    display: 'inline-block'
                  }}
                >
                  ระบบควบคุมอาคาร
                </H2>

                <Text
                  color="#6b7280"
                  fontSize="18px"
                  mt="8px"
                  mb="10px"
                >
                  กองช่าง เทศบาลนครตรัง
                </Text>
              </Box>



          {/* Error Popup */}
          {isPopupOpen && message && (
            <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            display="flex"
            justifyContent="center"
            alignItems="center"

            zIndex="9999"
            onClick={() => setPopupOpen(false)}
            >
             <Box
                bg="white"
                p="lg"
                borderRadius="lg"
                boxShadow="xl"
                maxWidth="360px"
                width="90%"
                display="flex"
                flexDirection="column"
                alignItems="center"   // ✅ ทุกอย่างอยู่กึ่งกลางแนวนอน
                textAlign="center"
                onClick={(e) => e.stopPropagation()}
              >
                <Text fontSize="22px" mb="md" color="#ef4444">
                  ⚠️ มีข้อผิดพลาด
                </Text>
                <Text mb="lg" color="#374151">
                  {translateMessage(message) || message}
                </Text>
                <Button variant="danger" onClick={() => setPopupOpen(false)}>
                  ปิด
                </Button>
              </Box>

            </Box>
          )}
        <form method="POST" action={action}>
              <FormGroup>
                <Label required fontSize="14px" fontWeight="500" color="#374151" mb="0.5rem">
                  {translateProperty('email')}
                </Label>
                <Box position="relative">
                  <Input
                    name="email"
                    placeholder={translateProperty('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    width="100%"
                    height="48px"
                    border="1px solid #d1d5db"
                    borderRadius="8px"
                    padding="0 1rem 0 2.5rem"
                    fontSize="14px"
                    _focus={{
                      borderColor: '#667eea',
                      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                      outline: 'none'
                    }}
                    _placeholder={{
                      color: '#9ca3af'
                    }}
                  />
                  <Box
                    position="absolute"
                    left="1rem"
                    top="50%"
                    transform="translateY(-50%)"
                    color="#6b7280"
                    fontSize="16px"
                  >
               
                  </Box>
                </Box>
              </FormGroup>

              <FormGroup mb="1.5rem">
                <Label fontSize="14px" fontWeight="500" color="#374151" mb="0.5rem">
                  รหัสผ่าน
                </Label>
                <Box position="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="กรอกรหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    width="100%"
                    height="48px"
                    border="1px solid #d1d5db"
                    borderRadius="8px"
                    padding="0 3rem 0 2.5rem"
                    fontSize="14px"
                    _focus={{
                      borderColor: '#667eea',
                      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                      outline: 'none'
                    }}
                    _placeholder={{
                      color: '#9ca3af'
                    }}
                    autoComplete="new-password"
                  />
        
                </Box>
              </FormGroup>

              <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                mb="1rem"
              >
                <Button
                  variant="primary"
                  width="100%"
                  maxWidth="300px"
                  height="52px"              
                  color="white"
                  border="none"
                  borderRadius="12px"
                  fontSize="18px"
                  fontWeight="600"
                  cursor="pointer"
                  boxShadow="0 4px 14px 0 rgba(102, 126, 234, 0.39)"
                  transition="all 0.3s ease"
                  type="submit"
                >
                  เข้าสู่ระบบ
                </Button>
              </Box>
            </form>

            {/* ปิดหน้า login */}
        </Box>
      </div>
  )
}

export default Login
