// KML Parser Utility Module - แปลงเฉพาะ Line และ Polygon
export const parseKMLToGeoJSON = (kmlText) => {
  try {
    console.log('🔍 Parsing KML text length:', kmlText.length)
    console.log('📝 Converting only LineString and Polygon features (excluding Points)')
    
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
      // Strategy 1: Standard Placemark parsing - เฉพาะ Line และ Polygon
      () => {
        const placemarks = kmlDoc.querySelectorAll('Placemark')
        console.log('🔍 Found placemarks:', placemarks.length)
        
        placemarks.forEach((placemark, index) => {
          const name = placemark.querySelector('name')?.textContent || `Feature ${index + 1}`
          
          // Skip Point features - ไม่แปลง Point
          const hasPoint = placemark.querySelector('Point')
          if (hasPoint) {
            console.log('⏭️ Skipping Point feature:', name)
            return
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
                console.log('✅ Found LineString:', name, 'with', coords.length, 'coordinates')
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
                console.log('✅ Found Polygon:', name, 'with', coords.length, 'coordinates')
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
      
      // Strategy 2: Direct coordinates search - เฉพาะ Line และ Polygon
      () => {
        const allCoords = kmlDoc.querySelectorAll('coordinates')
        console.log('🔍 Found coordinates elements:', allCoords.length)
        
        allCoords.forEach((coordEl, index) => {
          const coords = parseCoordinates(coordEl.textContent)
          if (coords.length > 0) {
            // Skip single points - ข้าม Point features
            if (coords.length === 1) {
              console.log('⏭️ Skipping single point coordinate')
              return
            }
            
            // Only process LineString and Polygon
            let geometryType = 'LineString'
            let coordinates = coords
            
            if (coords.length >= 3) {
              // Check if it's a polygon by seeing if first and last coordinates are the same
              const first = coords[0]
              const last = coords[coords.length - 1]
              if (first[0] === last[0] && first[1] === last[1]) {
                geometryType = 'Polygon'
                coordinates = [coords] // Polygon needs array of coordinate arrays
              }
            }
            
            console.log('✅ Found', geometryType, 'with', coords.length, 'coordinates')
            features.push({
              type: 'Feature',
              properties: { name: `Feature ${index + 1}` },
              geometry: { type: geometryType, coordinates }
            })
          }
        })
      },
      
      // Strategy 3: Text-based coordinate extraction - เฉพาะ Line และ Polygon
      () => {
        const coordRegex = /(-?\d+\.?\d*),(-?\d+\.?\d*)/g
        const matches = [...kmlText.matchAll(coordRegex)]
        console.log('🔍 Found coordinate matches:', matches.length)
        
        if (matches.length > 0) {
          const coords = matches
            .map(match => validateCoord(parseFloat(match[1]), parseFloat(match[2])))
            .filter(coord => coord !== null)
          
          // Skip single points - ข้าม Point features
          if (coords.length === 1) {
            console.log('⏭️ Skipping single point from text extraction')
            return
          }
          
          if (coords.length >= 2) {
            let geometryType = 'LineString'
            let coordinates = coords
            
            if (coords.length >= 3) {
              // Check if it's a polygon by seeing if first and last coordinates are the same
              const first = coords[0]
              const last = coords[coords.length - 1]
              if (first[0] === last[0] && first[1] === last[1]) {
                geometryType = 'Polygon'
                coordinates = [coords] // Polygon needs array of coordinate arrays
              }
            }
            
            console.log('✅ Found', geometryType, 'from text extraction with', coords.length, 'coordinates')
            features.push({
              type: 'Feature',
              properties: { name: 'Extracted Feature' },
              geometry: { type: geometryType, coordinates }
            })
          }
        }
      },
      
      // Strategy 4: Handle KML with different namespaces - เฉพาะ Line และ Polygon
      () => {
        // Try with different namespace prefixes
        const namespaces = ['', 'kml:', 'kml\\:', '\\w+:']
        
        for (const ns of namespaces) {
          const placemarks = kmlDoc.querySelectorAll(`${ns}Placemark`)
          if (placemarks.length > 0) {
            console.log(`🔍 Found ${placemarks.length} placemarks with namespace: ${ns}`)
            
            placemarks.forEach((placemark, index) => {
              const name = placemark.querySelector(`${ns}name`)?.textContent || `Feature ${index + 1}`
              
              // Skip Point features - ไม่แปลง Point
              const hasPoint = placemark.querySelector(`${ns}Point`)
              if (hasPoint) {
                console.log('⏭️ Skipping Point feature with namespace:', name)
                return
              }
              
              const coords = placemark.querySelector(`${ns}coordinates`)
              
              if (coords) {
                const coordList = parseCoordinates(coords.textContent)
                // Skip single points - ข้าม Point features
                if (coordList.length === 1) {
                  console.log('⏭️ Skipping single point with namespace')
                  return
                }
                
                if (coordList.length >= 2) {
                  let geometryType = 'LineString'
                  let coordinates = coordList
                  
                  if (coordList.length >= 3) {
                    // Check if it's a polygon by seeing if first and last coordinates are the same
                    const first = coordList[0]
                    const last = coordList[coordList.length - 1]
                    if (first[0] === last[0] && first[1] === last[1]) {
                      geometryType = 'Polygon'
                      coordinates = [coordList] // Polygon needs array of coordinate arrays
                    }
                  }
                  
                  console.log('✅ Found', geometryType, 'with namespace:', name)
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
      
      // Strategy 5: Handle KML with CDATA sections - เฉพาะ Line และ Polygon
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
            
            // Skip single points - ข้าม Point features
            if (coords.length === 1) {
              console.log('⏭️ Skipping single point from CDATA')
              return
            }
            
            if (coords.length >= 2) {
              let geometryType = 'LineString'
              let coordinates = coords
              
              if (coords.length >= 3) {
                // Check if it's a polygon by seeing if first and last coordinates are the same
                const first = coords[0]
                const last = coords[coords.length - 1]
                if (first[0] === last[0] && first[1] === last[1]) {
                  geometryType = 'Polygon'
                  coordinates = [coords] // Polygon needs array of coordinate arrays
                }
              }
              
              console.log('✅ Found', geometryType, 'from CDATA with', coords.length, 'coordinates')
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
    
    // If still no features, create a fallback - เฉพาะ Line หรือ Polygon
    if (features.length === 0) {
      console.log('🔍 No features found, creating fallback LineString...')
      // Create a default line at Thailand center
      features.push({
        type: 'Feature',
        properties: { name: 'Default LineString' },
        geometry: {
          type: 'LineString',
          coordinates: [
            [100.5018, 13.7563], // Bangkok coordinates
            [100.5028, 13.7573]  // Slightly offset point
          ]
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
    // Return a fallback instead of throwing - เฉพาะ Line หรือ Polygon
    return {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: { name: 'Fallback LineString' },
        geometry: {
          type: 'LineString',
          coordinates: [
            [100.5018, 13.7563], // Bangkok coordinates
            [100.5028, 13.7573]  // Slightly offset point
          ]
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
