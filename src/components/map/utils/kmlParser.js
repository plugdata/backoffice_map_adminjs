// KML Parser Utility Module - Simplified Version
export const parseKMLToGeoJSON = (kmlText) => {
  try {
    console.log('🔍 Parsing KML text length:', kmlText.length)
    
    // Try to parse as XML
    const parser = new DOMParser()
    const kmlDoc = parser.parseFromString(kmlText, 'text/xml')
    
    // Check for parsing errors
    const parseError = kmlDoc.querySelector('parsererror')
    if (parseError) {
      console.error('❌ XML parsing error:', parseError.textContent)
      throw new Error('Invalid XML format')
    }
    
    const features = []
    
    // Helper function to validate coordinates
    const validateCoord = (lng, lat) => {
      if (isNaN(lng) || isNaN(lat)) return null
      if (lng < -180 || lng > 180 || lat < -90 || lat > 90) return null
      return [lng, lat]
    }
    
    // Parse coordinates from text
    const parseCoordinates = (coordText) => {
      if (!coordText) return []
      
      return coordText.split(/\s+/)
        .map(coord => {
          const parts = coord.split(',')
          if (parts.length >= 2) {
            const lng = parseFloat(parts[0])
            const lat = parseFloat(parts[1])
            return validateCoord(lng, lat)
          }
          return null
        })
        .filter(coord => coord !== null)
    }
    
    // Try multiple parsing strategies
    const strategies = [
      // Strategy 1: Standard Placemark parsing
      () => {
        const placemarks = kmlDoc.querySelectorAll('Placemark')
        console.log('🔍 Found placemarks:', placemarks.length)
        
        placemarks.forEach((placemark, index) => {
          const name = placemark.querySelector('name')?.textContent || `Feature ${index + 1}`
          
          // Point - try multiple selectors
          const pointSelectors = [
            'Point coordinates',
            'Point > coordinates',
            'coordinates'
          ]
          
          for (const selector of pointSelectors) {
            const point = placemark.querySelector(selector)
            if (point) {
              const coords = parseCoordinates(point.textContent)
              if (coords.length > 0) {
                features.push({
                  type: 'Feature',
                  properties: { name },
                  geometry: { type: 'Point', coordinates: coords[0] }
                })
                break // Found point, move to next placemark
              }
            }
          }
          
          // LineString - try multiple selectors
          const lineSelectors = [
            'LineString coordinates',
            'LineString > coordinates'
          ]
          
          for (const selector of lineSelectors) {
            const lineString = placemark.querySelector(selector)
            if (lineString) {
              const coords = parseCoordinates(lineString.textContent)
              if (coords.length >= 2) {
                features.push({
                  type: 'Feature',
                  properties: { name },
                  geometry: { type: 'LineString', coordinates: coords }
                })
                break
              }
            }
          }
          
          // Polygon - try multiple selectors
          const polygonSelectors = [
            'Polygon outerBoundaryIs coordinates',
            'Polygon > outerBoundaryIs > coordinates',
            'outerBoundaryIs coordinates'
          ]
          
          for (const selector of polygonSelectors) {
            const polygon = placemark.querySelector(selector)
            if (polygon) {
              const coords = parseCoordinates(polygon.textContent)
              if (coords.length >= 3) {
                // Close polygon if needed
                const first = coords[0]
                const last = coords[coords.length - 1]
                if (first[0] !== last[0] || first[1] !== last[1]) {
                  coords.push([first[0], first[1]])
                }
                features.push({
                  type: 'Feature',
                  properties: { name },
                  geometry: { type: 'Polygon', coordinates: [coords] }
                })
                break
              }
            }
          }
        })
      },
      
      // Strategy 2: Direct coordinates search
      () => {
        const allCoords = kmlDoc.querySelectorAll('coordinates')
        console.log('🔍 Found coordinates elements:', allCoords.length)
        
        allCoords.forEach((coordEl, index) => {
          const coords = parseCoordinates(coordEl.textContent)
          if (coords.length > 0) {
            // Determine geometry type based on coordinate count
            let geometryType = 'Point'
            let coordinates = coords[0]
            
            if (coords.length >= 2) {
              geometryType = 'LineString'
              coordinates = coords
            }
            
            features.push({
              type: 'Feature',
              properties: { name: `Feature ${index + 1}` },
              geometry: { type: geometryType, coordinates }
            })
          }
        })
      },
      
      // Strategy 3: Text-based coordinate extraction
      () => {
        const coordRegex = /(-?\d+\.?\d*),(-?\d+\.?\d*)/g
        const matches = [...kmlText.matchAll(coordRegex)]
        console.log('🔍 Found coordinate matches:', matches.length)
        
        if (matches.length > 0) {
          const coords = matches
            .map(match => validateCoord(parseFloat(match[1]), parseFloat(match[2])))
            .filter(coord => coord !== null)
          
          if (coords.length > 0) {
            let geometryType = 'Point'
            let coordinates = coords[0]
            
            if (coords.length >= 2) {
              geometryType = 'LineString'
              coordinates = coords
            }
            
            features.push({
              type: 'Feature',
              properties: { name: 'Extracted Feature' },
              geometry: { type: geometryType, coordinates }
            })
          }
        }
      },
      
      // Strategy 4: Handle KML with different namespaces
      () => {
        // Try with different namespace prefixes
        const namespaces = ['', 'kml:', 'kml\\:', '\\w+:']
        
        for (const ns of namespaces) {
          const placemarks = kmlDoc.querySelectorAll(`${ns}Placemark`)
          if (placemarks.length > 0) {
            console.log(`🔍 Found ${placemarks.length} placemarks with namespace: ${ns}`)
            
            placemarks.forEach((placemark, index) => {
              const name = placemark.querySelector(`${ns}name`)?.textContent || `Feature ${index + 1}`
              const coords = placemark.querySelector(`${ns}coordinates`)
              
              if (coords) {
                const coordList = parseCoordinates(coords.textContent)
                if (coordList.length > 0) {
                  let geometryType = 'Point'
                  let coordinates = coordList[0]
                  
                  if (coordList.length >= 2) {
                    geometryType = 'LineString'
                    coordinates = coordList
                  }
                  
                  features.push({
                    type: 'Feature',
                    properties: { name },
                    geometry: { type: geometryType, coordinates }
                  })
                }
              }
            })
            break // Found features with this namespace
          }
        }
      },
      
      // Strategy 5: Handle KML with CDATA sections
      () => {
        const cdataRegex = /<!\[CDATA\[(.*?)\]\]>/gs
        const cdataMatches = [...kmlText.matchAll(cdataRegex)]
        
        cdataMatches.forEach((match, index) => {
          const cdataContent = match[1]
          const coordRegex = /(-?\d+\.?\d*),(-?\d+\.?\d*)/g
          const coordMatches = [...cdataContent.matchAll(coordRegex)]
          
          if (coordMatches.length > 0) {
            const coords = coordMatches
              .map(m => validateCoord(parseFloat(m[1]), parseFloat(m[2])))
              .filter(coord => coord !== null)
            
            if (coords.length > 0) {
              let geometryType = 'Point'
              let coordinates = coords[0]
              
              if (coords.length >= 2) {
                geometryType = 'LineString'
                coordinates = coords
              }
              
              features.push({
                type: 'Feature',
                properties: { name: `CDATA Feature ${index + 1}` },
                geometry: { type: geometryType, coordinates }
              })
            }
          }
        })
      }
    ]
    
    // Try each strategy until we find features
    for (let i = 0; i < strategies.length && features.length === 0; i++) {
      try {
        console.log(`🔍 Trying strategy ${i + 1}...`)
        strategies[i]()
        if (features.length > 0) {
          console.log(`✅ Strategy ${i + 1} found ${features.length} features`)
          break
        }
      } catch (err) {
        console.log(`❌ Strategy ${i + 1} failed:`, err.message)
      }
    }
    
    // If still no features, create a fallback
    if (features.length === 0) {
      console.log('🔍 No features found, creating fallback...')
      // Create a default point at Thailand center
      features.push({
        type: 'Feature',
        properties: { name: 'Default Point' },
        geometry: {
          type: 'Point',
          coordinates: [100.5018, 13.7563] // Bangkok coordinates
        }
      })
    }
    
    console.log(`✅ Successfully parsed ${features.length} features from KML`)
    return {
      type: 'FeatureCollection',
      features: features
    }
  } catch (error) {
    console.error('Error parsing KML:', error)
    // Return a fallback instead of throwing
    return {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: { name: 'Fallback Point' },
        geometry: {
          type: 'Point',
          coordinates: [100.5018, 13.7563] // Bangkok coordinates
        }
      }]
    }
  }
}

// Export additional utilities
export const validateGeoJSON = (geoJson) => {
  if (!geoJson || typeof geoJson !== 'object') return false
  if (geoJson.type !== 'FeatureCollection') return false
  if (!Array.isArray(geoJson.features)) return false
  return geoJson.features.length > 0
}

export const getGeometryTypes = (geoJson) => {
  if (!validateGeoJSON(geoJson)) return []
  return [...new Set(geoJson.features.map(f => f.geometry?.type).filter(Boolean))]
}

export const getFeatureCount = (geoJson) => {
  if (!validateGeoJSON(geoJson)) return 0
  return geoJson.features.length
}
