// API Client Utility Module
import { ApiClient } from "adminjs"

const api = new ApiClient()

// SWR fetcher for record data
export const fetcher = async ({ resourceId, recordId }) => {
  if (!recordId) return null
  try {
    const res = await api.recordAction({
      resourceId,
      recordId,
      actionName: "show",
    })
    return res?.data?.record?.params || {}
  } catch (error) {
    console.error('❌ Error fetching record data:', error)
    throw error
  }
}

// Generic API client for other operations
export const apiClient = api

// Helper function to get record ID from various record formats
export const getRecordId = (record) => {
  return record?.params?.id || record?.id || ""
}

// Helper function to get resource ID from various formats
export const getResourceId = (record, property) => {
  return record?.resourceId || record?.resource?.id || property?.resourceId || "BuildingControl"
}

// Helper function to create API request parameters
export const createApiParams = (record, property) => {
  return {
    resourceId: getResourceId(record, property),
    recordId: getRecordId(record)
  }
}
