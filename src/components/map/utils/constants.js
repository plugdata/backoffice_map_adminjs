// Constants and Configuration Module

// Default coordinates (Thailand center)
export const DEFAULT_COORDINATES = {
  latitude: 7.559,
  longitude: 99.611
}

// Default colors
export const DEFAULT_COLORS = {
  primary: "#ff0000",
  lineString: "#0066cc",
  polygon: "#00cc66", 
  point: "#ff6600"
}

// Map configuration
export const MAP_CONFIG = {
  defaultZoom: 13,
  minZoom: 1,
  maxZoom: 18,
  height: "400px",
  width: "100%"
}

// File upload configuration
export const FILE_CONFIG = {
  allowedTypes: ['.kml'],
  maxSizeMB: 10,
  acceptedMimeTypes: ['application/vnd.google-earth.kml+xml', 'text/xml']
}

// UI configuration
export const UI_CONFIG = {
  modalWidth: 800,
  modalMaxWidth: "95vw",
  modalMaxHeight: "90vh",
  previewWidth: 700,
  previewMaxWidth: "95vw",
  previewMaxHeight: "85vh"
}

// Form field configuration
export const FORM_FIELDS = {
  required: ['house_no', 'name_local', 'district', 'province'],
  optional: ['road', 'subdistrict', 'postcode', 'colors'],
  coordinates: ['latitude', 'longitude'],
  data: ['data', 'geom']
}

// Status messages
export const STATUS_MESSAGES = {
  loading: "⏳ Processing...",
  success: "✅ Success",
  error: "❌ Error",
  noData: "No data available",
  processing: "⏳ Processing KML file...",
  loaded: "✅ KML file loaded successfully",
  parseError: "❌ Error parsing KML",
  readError: "❌ Error reading file"
}

// Geometry type colors for map rendering
export const GEOMETRY_COLORS = {
  LineString: DEFAULT_COLORS.lineString,
  Polygon: DEFAULT_COLORS.polygon,
  Point: DEFAULT_COLORS.point,
  default: DEFAULT_COLORS.primary
}

// Map tile configuration
export const TILE_CONFIG = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

// Leaflet configuration
export const LEAFLET_CONFIG = {
  cssUrl: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  jsUrl: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  iconUrls: {
    icon: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    iconRetina: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    shadow: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
  }
}
