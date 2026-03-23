// Form Validation Utility Module

// Required fields configuration
export const REQUIRED_FIELDS = {
  house_no: "บ้านเลขที่",
  name_local: "ชื่อสถานที่", 
  district: "อำเภอ/เขต",
  province: "จังหวัด"
}

// Validate required fields
export const validateRequiredFields = (formData) => {
  const missingFields = []
  
  Object.entries(REQUIRED_FIELDS).forEach(([field, label]) => {
    const value = formData[field]
    if (!value || value.trim() === "") {
      missingFields.push(label)
    }
  })
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  }
}

// Validate coordinates
export const validateCoordinates = (latitude, longitude) => {
  const lat = parseFloat(latitude)
  const lng = parseFloat(longitude)
  
  if (isNaN(lat) || isNaN(lng)) {
    return { isValid: false, error: "Invalid coordinate format" }
  }
  
  if (lat < -90 || lat > 90) {
    return { isValid: false, error: "Latitude must be between -90 and 90" }
  }
  
  if (lng < -180 || lng > 180) {
    return { isValid: false, error: "Longitude must be between -180 and 180" }
  }
  
  return { isValid: true }
}

// Validate color format
export const validateColor = (color) => {
  if (!color) return { isValid: true } // Color is optional
  
  // Check if it's a valid hex color
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (hexPattern.test(color)) {
    return { isValid: true }
  }
  
  // Check if it's a valid CSS color name
  const validColorNames = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white',
    'gray', 'grey', 'cyan', 'magenta', 'lime', 'navy', 'olive', 'teal', 'silver', 'maroon'
  ]
  
  if (validColorNames.includes(color.toLowerCase())) {
    return { isValid: true }
  }
  
  return { isValid: false, error: "Invalid color format" }
}

// Validate file type
export const validateFileType = (file, allowedTypes = ['.kml']) => {
  if (!file) return { isValid: false, error: "No file selected" }
  
  const fileName = file.name.toLowerCase()
  const isValidType = allowedTypes.some(type => fileName.endsWith(type))
  
  if (!isValidType) {
    return { 
      isValid: false, 
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
    }
  }
  
  return { isValid: true }
}

// Validate file size (in MB)
export const validateFileSize = (file, maxSizeMB = 10) => {
  if (!file) return { isValid: false, error: "No file selected" }
  
  const fileSizeMB = file.size / (1024 * 1024)
  
  if (fileSizeMB > maxSizeMB) {
    return { 
      isValid: false, 
      error: `File size too large. Maximum size: ${maxSizeMB}MB` 
    }
  }
  
  return { isValid: true }
}

// Complete form validation
export const validateForm = (formData) => {
  const errors = []
  
  // Validate required fields
  const requiredValidation = validateRequiredFields(formData)
  if (!requiredValidation.isValid) {
    errors.push(`กรุณากรอกข้อมูลที่จำเป็น: ${requiredValidation.missingFields.join(', ')}`)
  }
  
  // Validate coordinates if provided
  if (formData.latitude && formData.longitude) {
    const coordValidation = validateCoordinates(formData.latitude, formData.longitude)
    if (!coordValidation.isValid) {
      errors.push(coordValidation.error)
    }
  }
  
  // Validate color if provided
  if (formData.colors) {
    const colorValidation = validateColor(formData.colors)
    if (!colorValidation.isValid) {
      errors.push(colorValidation.error)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
