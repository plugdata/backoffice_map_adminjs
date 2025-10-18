import { UPLOADS, DOC_TYPES, LOCATION_MARKERS } from './constants'

// Helper function to filter uploads by owner and user
export const useFiltered = (ownerId, userId) => {
  const list = UPLOADS.filter(u =>
    (ownerId === 'all' || u.ownerId === ownerId) &&
    (userId === 'all' || u.userId === userId)
  )
  return list
}

// Count uploads by document type
export const countByType = (rows) => {
  const map = Object.fromEntries(DOC_TYPES.map(t => [t, 0]))
  rows.forEach(r => { if (map[r.type] !== undefined) map[r.type]++ })
  return DOC_TYPES.map(t => map[t])
}

// Count unique owners
export const ownersCount = (rows) => {
  const set = new Set(rows.map(r => r.ownerId))
  return set.size
}

// Get location count for specific owner
export const locationCountForOwner = (ownerId) => {
  if (ownerId === 'all') {
    return LOCATION_MARKERS.reduce((a, b) => a + b.count, 0)
  }
  const row = LOCATION_MARKERS.find(x => x.ownerId === ownerId)
  return row ? row.count : 0
}
