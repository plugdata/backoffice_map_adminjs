// Feature Plugin Index
// Export all feature utilities and hooks

// GeoJSON Utilities
export {
  safeParseJson,
  convertGeoJsonTo2D,
  updateGeomFromGeoJSON,
  buildMapDataFromPayload
} from './geoJsonUtils.js'

// Action Hooks
export {
  beforeEditHook,
  afterNewHook,
  afterEditHook,
  afterShowHook,
  afterDeleteHook,
  afterBulkDeleteHook
} from './actionHooks.js'

// RiskZone Action Hooks
export {
  beforeEditHook as riskZoneBeforeEditHook,
  afterNewHook as riskZoneAfterNewHook,
  afterEditHook as riskZoneAfterEditHook,
  afterShowHook as riskZoneAfterShowHook,
  afterDeleteHook as riskZoneAfterDeleteHook,
  afterBulkDeleteHook as riskZoneAfterBulkDeleteHook
} from './riskZoneHooks.js'

// Back Button
export { backButton } from './back-button.js'
