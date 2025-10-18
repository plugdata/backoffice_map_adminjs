import React, { useState, useEffect } from 'react'
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

export const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState('')
  
  const { translateLabel, translateButton, translateProperty, translateMessage } = useTranslation()
  const branding = useSelector((state) => state.branding)

  useEffect(() => {
    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      setMessage(translateMessage('invalidResetToken'))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    if (password !== confirmPassword) {
      setMessage(translateMessage('passwordMismatch'))
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage(translateMessage('passwordTooShort'))
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token, 
          password 
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setMessage(translateMessage('resetPasswordSuccess'))
      } else {
        setMessage(data.message || translateMessage('resetPasswordError'))
      }
    } catch (error) {
      setMessage(translateMessage('resetPasswordError'))
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
              <H2 fontWeight="lighter">{translateLabel('resetPasswordTitle')}</H2>
              <Text fontWeight="lighter" mt="default">
                {translateMessage('resetPasswordSuccessDescription')}
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
        <Box bg="white" height="500px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
          <Box
            bg="primary100"
            color="white"
            p="x3"
            width="380px"
            flexGrow={0}
            display={['none', 'none', 'block']}
            position="relative"
          >
            <H2 fontWeight="lighter">{translateLabel('resetPasswordTitle')}</H2>
            <Text fontWeight="lighter" mt="default">
              {translateMessage('resetPasswordDescription')}
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
                variant="danger"
              />
            )}
            <FormGroup>
              <Label required>{translateMessage('newPassword')}</Label>
              <Input 
                name="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={translateMessage('newPassword')} 
                required
                minLength={6}
              />
            </FormGroup>
            <FormGroup>
              <Label required>{translateMessage('confirmPassword')}</Label>
              <Input 
                name="confirmPassword" 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={translateMessage('confirmPassword')} 
                required
                minLength={6}
              />
            </FormGroup>
            <Text mt="xl" textAlign="center">
              <Button 
                variant="primary" 
                type="submit"
                disabled={isLoading || !token}
              >
                {isLoading ? translateMessage('resetting') : translateMessage('resetPassword')}
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

export default ResetPassword
