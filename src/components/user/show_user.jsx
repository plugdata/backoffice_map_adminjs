import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { Box, Text } from '@adminjs/design-system'

// Theme settings
const theme = {
  flexboxgrid: {
    gridSize: 12,
    gutterWidth: 1,
    outerMargin: 2,
    mediaQuery: 'only screen',
    container: {
      sm: 46,
      md: 61,
      lg: 76
    },
    breakpoints: {
      xs: 0,
      sm: 48,
      md: 64,
      lg: 75
    }
  }
}

// Styled Components
const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  padding: 24px;
  margin: 20px 0;
`

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`

const FieldLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
`

const FieldValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #222;
  margin-bottom: 12px;
`

// Component
const ShowUser = (props) => {
  const { record } = props
  const { id, username, title_use, fullName, position, email, phone, role } = record?.params || {}

  return (
    <ThemeProvider theme={theme}>
<Box variant="grey">
    <Box variant="white">
    <Grid>
    <Col left="xs" xs={12} sm={10} md={8}>
              <Title>ข้อมูลผู้ใช้งาน</Title>
            </Col>
              <Row center="xs">
                <Col xs={12} sm={6}>
                  <FieldLabel>ID</FieldLabel>
                  <FieldValue>{id}</FieldValue>
                </Col>
                <Col xs={12} sm={6}>
                  <FieldLabel>Username</FieldLabel>
                  <FieldValue>{username}</FieldValue>
                </Col>
                <Col xs={12} sm={6}>
                  <FieldLabel>Title</FieldLabel>
                  <FieldValue>{title_use}</FieldValue>
                </Col>
                <Col xs={12} sm={6}>
                  <FieldLabel>Full Name</FieldLabel>
                  <FieldValue>{fullName}</FieldValue>
                </Col>
                <Col xs={12} sm={6}>
                  <FieldLabel>Position</FieldLabel>
                  <FieldValue>{position}</FieldValue>
                </Col>
                <Col xs={12} sm={6}>
                  <FieldLabel>Email</FieldLabel>
                  <FieldValue>{email}</FieldValue>
                </Col>
                <Col xs={12} sm={6}>
                  <FieldLabel>Phone</FieldLabel>
                  <FieldValue>{phone}</FieldValue>
                </Col>
                <Col xs={12} sm={6}>
                  <FieldLabel>Role</FieldLabel>
                  <FieldValue>{role}</FieldValue>
                </Col>
              </Row>
      </Grid>
    </Box>
  </Box>
    </ThemeProvider>
  )
}

export default ShowUser
