// Map Utils Index - Export all utilities

// KML Parser utilities
export {
  parseKMLToGeoJSON,
  validateGeoJSON,
  getGeometryTypes,
  getFeatureCount
} from './kmlParser.js'

// API Client utilities
export {
  fetcher,
  apiClient,
  getRecordId,
  getResourceId,
  createApiParams
} from './apiClient.js'

// Form validation utilities
export {
  REQUIRED_FIELDS,
  validateRequiredFields,
  validateCoordinates,
  validateColor,
  validateFileType,
  validateFileSize,
  validateForm
} from './formValidation.js'

// Constants and configuration
export {
  DEFAULT_COORDINATES,
  DEFAULT_COLORS,
  MAP_CONFIG,
  FILE_CONFIG,
  UI_CONFIG,
  FORM_FIELDS,
  STATUS_MESSAGES,
  GEOMETRY_COLORS,
  TILE_CONFIG,
  LEAFLET_CONFIG
} from './constants.js'
