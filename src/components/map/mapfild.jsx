import React, { useEffect, useState, useRef } from "react"
import { Box, Input, Label, Select } from "@adminjs/design-system"
import { MapContainer, TileLayer, Marker, Polygon, Polyline, useMap } from "react-leaflet"
import L from "leaflet"
import { useMapStore } from "./lib/store"
import ImageUpload from "../featureUi/ImageUpload"

const DEFAULT_LAT = 7.5563  // ตรัง
const DEFAULT_LNG = 99.6114

// ✅ helper: Remove duplicate markers to prevent overlapping
const removeDuplicateMarkers = (map, targetId) => {
  map.eachLayer((layer) => {
    if (layer.options && layer.options.pane === "markerPane") {
      if (layer.options.uniceid === targetId) {
        map.removeLayer(layer)
      }
    }
  })
}

// ✅ helper: แปลง GeoJSON feature → latlng array
const parseCoords = (geometry) => {
  if (!geometry) return []
  const { type, coordinates } = geometry
  switch (type) {
    case "Polygon":
      return coordinates.map(ring => ring.map(pt => [pt[1], pt[0]]))
    case "MultiPolygon":
      return coordinates.flat().map(ring => ring.map(pt => [pt[1], pt[0]]))
    case "LineString":
      return [coordinates.map(pt => [pt[1], pt[0]])]
    default:
      return []
  }
}

// ✅ helper: zoom to bounds with priority (marker first, then KML)
const FitBounds = ({ layer, markerPosition, hasMarker }) => {
  const map = useMap()
  const [hasInitialized, setHasInitialized] = useState(false)
  
  useEffect(() => {
    // Only run once when component mounts or when marker/layer changes
    if (!hasInitialized) {
      // Priority 1: If marker exists, zoom to marker immediately
      if (hasMarker && markerPosition) {
        map.setView(markerPosition, 15)
        setHasInitialized(true)
        return
      }
      
      // Priority 2: If KML layer exists, zoom to KML bounds
      if (layer?.features) {
        const coords = []
        layer.features.forEach(f => {
          parseCoords(f.geometry).forEach(ring => {
            ring.forEach(pt => coords.push(pt))
          })
        })
        if (coords.length > 0) {
          const bounds = L.latLngBounds(coords)
          map.fitBounds(bounds, { padding: [20, 20] })
          setHasInitialized(true)
        }
      }
    }
  }, [layer, map, markerPosition, hasMarker, hasInitialized])
  
  // Reset initialization when marker status changes
  useEffect(() => {
    setHasInitialized(false)
  }, [hasMarker])
  
  return null
}

// ✅ helper: Draggable marker that updates position when store changes
const DraggableMarker = ({ position, onDragEnd, onDelete }) => {
  const map = useMap()
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    // Remove existing markers with same ID to prevent duplicates
    removeDuplicateMarkers(map, 'main-marker')

    const newMarker = L.marker(position, { 
      draggable: true,
      uniceid: 'main-marker' // Unique identifier to prevent duplicates
    })
      .addTo(map)
      .on('dragend', (e) => {
        const { lat, lng } = e.target.getLatLng()
        onDragEnd(lat, lng)
      })
    
    // Add popup with reset button
    const popup = L.popup()
      .setContent(`
        <div style="text-align: center;">
          <p>ตำแหน่ง: ${position[0].toFixed(6)}, ${position[1].toFixed(6)}</p>
          <button 
            onclick="window.resetMainMarker()" 
            style="
              background: #dc3545; 
              color: white; 
              border: none; 
              padding: 5px 10px; 
              border-radius: 3px; 
              cursor: pointer;
              margin-top: 5px;
            "
          >
            รีเซ็ตหมุด 🔄
          </button>
        </div>
      `)
    
    newMarker.bindPopup(popup)
    setMarker(newMarker)
    
    // Global function for popup button
    window.resetMainMarker = () => {
      if (onDelete) onDelete()
      map.removeLayer(newMarker)
      setMarker(null)
    }
  }, [position, map, onDragEnd, onDelete])

  useEffect(() => {
    return () => {
      if (marker) {
        map.removeLayer(marker)
        delete window.resetMainMarker
      }
    }
  }, [marker, map])

  return null
}

// Component to capture map instance
const MapInstanceCapture = ({ onMapReady }) => {
  const map = useMap()
  
  useEffect(() => {
    if (map && onMapReady) {
      onMapReady(map)
    }
  }, [map, onMapReady])
  
  return null
}

// Component to handle click to move marker
const ClickToMoveMarker = ({ onMove }) => {
  const map = useMap()
  
  useEffect(() => {
    const handleClick = (e) => {
      const { lat, lng } = e.latlng
      onMove(lat, lng)
    }
    
    map.on('click', handleClick)
    
    return () => {
      map.off('click', handleClick)
    }
  }, [map, onMove])
  
  return null
}

const MapField = ({ onChange, record, preload, mode}) => {
  const { latitude, longitude, setLatLng, data, colors } = useMapStore()
  const [color, setColor] = useState(colors || record?.params?.colors || "#ff0000")
  const [layer, setLayer] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [mapInstance, setMapInstance] = useState(null) // Store map instance
  const [images, setImages] = useState([]) // Store uploaded images
  const [kmlData, setKmlData] = useState([]) // Store KML data
  const isInitialized = useRef(false)


  // ✅ โหลด CSS ของ Leaflet runtime (แก้ปัญหา Rollup)
  useEffect(() => {
    if (!document.getElementById("leaflet-style")) {
      const link = document.createElement("link")
      link.id = "leaflet-style"
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)
    }
  }, [])

  // ✅ fix marker icon (bug React-Leaflet)
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    })
  }, [])

  // ✅ preload data from store or record
  useEffect(() => {
    // Priority: store data > preload data > record data
    const raw = data || preload?.data || record?.params?.data
    if (raw) {
      try {
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw
        setLayer(parsed)
      } catch (e) {
        console.warn("⚠️ Invalid JSON data", e)
      }
    }
  }, [data, preload, record?.params?.data])

  // ✅ update color when store color changes
  useEffect(() => {
    if (colors) {
      setColor(colors)
    }
  }, [colors])

  // ✅ Load existing images for this map
  useEffect(() => {
    const loadImages = async () => {
      if (record?.id) {
        try {
          const response = await fetch(`/api/upload/images?mapId=${record.id}`)
          if (response.ok) {
            const result = await response.json()
            setImages(result.data || [])
          }
        } catch (error) {
          console.error('Error loading images:', error)
        }
      }
    }
    
    loadImages()
  }, [record?.id])

  // ✅ Initialize store values from record when editing
  useEffect(() => {
    if (record?.params) {
      const { latitude: recordLat, longitude: recordLng, colors: recordColors } = record.params
      
      // Update store with record values if they exist
      if (recordLat && recordLng) {
        setLatLng(recordLat, recordLng)
      } else {
        // Always set default Trang location
        setLatLng(DEFAULT_LAT, DEFAULT_LNG)
      }
      
      if (recordColors) {
        setColor(recordColors)
        const { setColors } = useMapStore.getState()
        setColors(recordColors)
      }
    } else {
      // Always set default Trang location
      setLatLng(DEFAULT_LAT, DEFAULT_LNG)
    }
  }, [record?.params, setLatLng])

  // ✅ Save current store values to form when component mounts or values change
  useEffect(() => {
    // Only sync after initialization to prevent infinite loops
    if (isInitialized.current && onChange) {
      // Always sync latitude and longitude (even if null)
      onChange("latitude", latitude)
      onChange("longitude", longitude)
      onChange("colors", color)
      
      // Save layer data if exists
      if (layer) {
        onChange("data", JSON.stringify(layer))
      }
    }
  }, [latitude, longitude, color, layer])

  // ✅ Mark as initialized after first render
  useEffect(() => {
    isInitialized.current = true
  }, [])

  // ✅ Reset store when component unmounts (cleanup)
  useEffect(() => {
    return () => {
      // Reset store to default values when leaving the component
      const { resetMap } = useMapStore.getState()
      resetMap()
    }
  }, [])

  // ✅ Handle image upload
  const handleImageUpload = (imageData) => {
    setImages(prev => [...prev, imageData])
  }

  // ✅ Handle image removal
  const handleImageRemove = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }


  return (
    <Box>
      <MapContainer
        center={[latitude || DEFAULT_LAT, longitude || DEFAULT_LNG]}
        zoom={13}
        style={{ height: "400px", width: "100%", border: "1px solid #ccc", borderRadius: 6 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Draggable Marker - Always visible */}
        <DraggableMarker
          position={[latitude || DEFAULT_LAT, longitude || DEFAULT_LNG]}
          onDragEnd={(lat, lng) => {
            // Set dragging flag to prevent loops
            setIsDragging(true)
            
            // Update store with new coordinates
            setLatLng(lat, lng)
            
            // Reset dragging flag after a short delay
            setTimeout(() => {
              setIsDragging(false)
            }, 100)
          }}
          onDelete={() => {
            // Reset to default location instead of deleting
            setLatLng(DEFAULT_LAT, DEFAULT_LNG)
          }}
        />

        {/* Click to move marker - Always active */}
        <ClickToMoveMarker onMove={(lat, lng) => {
          setLatLng(lat, lng)
        }} />

        {/* Render GeoJSON layer */}
        {layer?.features?.map((f, idx) => {
          const coords = parseCoords(f.geometry)
          if (!coords.length) return null
          return f.geometry.type.includes("Line") ? (
            <Polyline key={idx} positions={coords} pathOptions={{ color }} />
          ) : (
            <Polygon key={idx} positions={coords} pathOptions={{ color }} />
          )
        })}

        <FitBounds 
          layer={layer} 
          markerPosition={[latitude || DEFAULT_LAT, longitude || DEFAULT_LNG]}
          hasMarker={true}
        />
        
        <MapInstanceCapture onMapReady={setMapInstance} />
      </MapContainer>

{/* Marker Control */}
{mode !== "show" && (
  <Box mt="lg" display="flex" gap="md" alignItems="center">
    <span style={{ fontSize: "14px", color: "#666" }}>
      คลิกที่แผนที่เพื่อย้ายหมุด
    </span>
  </Box>
)}

{/* Lat / Lng */}
{mode !== "show" && (
  <Box mt="lg" display="grid" gridTemplateColumns="1fr 1fr" gap="lg">
    <Box>
      <Label>Latitude</Label>
      <Input
        type="number"
        value={latitude || DEFAULT_LAT}
        onChange={(e) => {
          // Skip if currently dragging to prevent loops
          if (isDragging) {
            return
          }
          
          const val = parseFloat(e.target.value)
          if (!isNaN(val)) {
            // Update store with new latitude
            setLatLng(val, longitude || DEFAULT_LNG)
          }
        }}
      />
    </Box>
    <Box>
      <Label>Longitude</Label>
      <Input
        type="number"
        value={longitude || DEFAULT_LNG}
        onChange={(e) => {
          // Skip if currently dragging to prevent loops
          if (isDragging) {
            return
          }
          
          const val = parseFloat(e.target.value)
          if (!isNaN(val)) {
            // Update store with new longitude
            setLatLng(latitude || DEFAULT_LAT, val)
          }
        }}
      />
    </Box>
  </Box>
)}



{/* Color */}
{mode !== "show" && (
  <Box mt="lg">
    <Label>เลือกสีของ Layer</Label>
    <Select
      value={color}
      onChange={(selected) => {
        const v = selected?.value
        setColor(v)
        // Update store color
        const { setColors } = useMapStore.getState()
        setColors(v)
      }}
      options={[
        { value: "#ff0000", label: "แดง" },
        { value: "#00ff00", label: "เขียว" },
        { value: "#0000ff", label: "น้ำเงิน" },
        { value: "#ffa500", label: "ส้ม" },
        { value: "#800080", label: "ม่วง" },
      ]}
    />
  </Box>
)}

{/* Image Upload */}
<Box mt="lg">
  <ImageUpload
    images={images}
    mapId={record?.id}
    mode={mode}
    onImageUpload={handleImageUpload}
    onImageRemove={handleImageRemove}
    maxImages={10}
  />
</Box>

    </Box>
  )
}

export default MapField

