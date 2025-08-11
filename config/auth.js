// ========================================
// Authentication Configuration
// ตั้งค่าระบบ authentication และ authorization
// ========================================

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import session from 'express-session'

// ========================================
// PASSWORD HASHING
// ========================================

export const hashPassword = async (password) => {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

// ========================================
// JWT TOKEN MANAGEMENT
// ========================================

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    roles: user.roles?.map(ur => ur.role.name) || []
  }
  
  return jwt.sign(payload, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: '24h'
  })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
  } catch (error) {
    return null
  }
}

// ========================================
// SESSION CONFIGURATION
// ========================================

export const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}

// ========================================
// AUTHENTICATION MIDDLEWARE
// ========================================

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  const user = verifyToken(token)
  if (!user) {
    return res.status(403).json({ error: 'Invalid token' })
  }

  req.user = user
  next()
}

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const userRoles = req.user.roles || []
    const hasRequiredRole = roles.some(role => userRoles.includes(role))

    if (!hasRequiredRole) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    next()
  }
}

// ========================================
// LOGIN VALIDATION
// ========================================

export const validateLoginData = (email, password) => {
  const errors = []

  if (!email || !email.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format')
  }

  if (!password || !password.trim()) {
    errors.push('Password is required')
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters')
  }

  return errors
}

// ========================================
// USER STATUS CHECK
// ========================================

export const checkUserStatus = (user) => {
  if (!user) {
    return { valid: false, message: 'User not found' }
  }

  if (!user.isActive) {
    return { valid: false, message: 'User account is deactivated' }
  }

  return { valid: true }
} 