import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'
import {
  Box,
  H5,
  H2,
  Label,
  Input,
  FormGroup,
  Button,
  Text,
  MessageBox,
  MadeWithLove,
  themeGet,
} from '@adminjs/design-system'
import { useTranslation } from 'adminjs'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`

const Wrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`

const StyledLogo = styled.img`
  max-width: 200px;
  margin: ${themeGet('space', 'md')} 0;
`

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { translateLabel, translateButton, translateProperty, translateMessage } = useTranslation()
  const branding = useSelector((state) => state.branding)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setMessage(translateMessage('forgotPasswordSuccess'))
      } else {
        setMessage(data.message || translateMessage('forgotPasswordError'))
      }
    } catch (error) {
      setMessage(translateMessage('forgotPasswordError'))
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <>
        <GlobalStyle />
        <Wrapper flex variant="grey">
          <Box bg="white" height="400px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
            <Box
              bg="primary100"
              color="white"
              p="x3"
              width="380px"
              flexGrow={0}
              display={['none', 'none', 'block']}
              position="relative"
            >
              <H2 fontWeight="lighter">{translateLabel('loginWelcome')}</H2>
              <Text fontWeight="lighter" mt="default">
                {translateMessage('loginWelcome')}
              </Text>
            </Box>
            <Box p="x3" flexGrow={1} width={['100%', '100%', '480px']}>
              <H5 marginBottom="xxl">
                {branding.logo ? <StyledLogo src={branding.logo} alt={branding.companyName} /> : branding.companyName}
              </H5>
              <MessageBox
                my="lg"
                message={message}
                variant="success"
              />
              <Text mt="lg" textAlign="center">
                <a href="/admin/login">{translateMessage('backToLogin')}</a>
              </Text>
            </Box>
          </Box>
        </Wrapper>
      </>
    )
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper flex variant="grey">
        <Box bg="white" height="400px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
          <Box
            bg="primary100"
            color="white"
            p="x3"
            width="380px"
            flexGrow={0}
            display={['none', 'none', 'block']}
            position="relative"
          >
            <H2 fontWeight="lighter">{translateLabel('forgotPasswordTitle')}</H2>
            <Text fontWeight="lighter" mt="default">
              {translateMessage('forgotPasswordDescription')}
            </Text>
          </Box>
          <Box as="form" onSubmit={handleSubmit} p="x3" flexGrow={1} width={['100%', '100%', '480px']}>
            <H5 marginBottom="xxl">
              {branding.logo ? <StyledLogo src={branding.logo} alt={branding.companyName} /> : branding.companyName}
            </H5>
            {message && (
              <MessageBox
                my="lg"
                message={message}
                variant={isSuccess ? "success" : "danger"}
              />
            )}
            <FormGroup>
              <Label required>{translateProperty('email')}</Label>
              <Input 
                name="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={translateProperty('email')} 
                required
              />
            </FormGroup>
            <Text mt="xl" textAlign="center">
              <Button 
                variant="primary" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? translateMessage('sending') : translateMessage('sendResetLink')}
              </Button>
            </Text>
            <Text mt="lg" textAlign="center">
              <a href="/admin/login">{translateMessage('backToLogin')}</a>
            </Text>
          </Box>
        </Box>
        {branding.withMadeWithLove ? (
          <Box mt="xxl">
            <MadeWithLove />
          </Box>
        ) : null}
      </Wrapper>
    </>
  )
}

export default ForgotPassword
