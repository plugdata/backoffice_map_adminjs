/* 
import express from 'express'
import { prisma } from '../page/buildingControl/helpers.js'

const router = express.Router()


function safeParseJson(value) {
  try {
    let parsed = value
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed)
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed) 
      }
    }
    return parsed
  } catch (e) {
    console.warn("⚠️ safeParseJson failed:", e.message)
    return null
  }
}

const convertGeoJsonTo2D = (geoJsonData) => {
  const convertTo2D = (coords) => {
    if (!Array.isArray(coords)) return coords
    if (
      coords.length >= 2 &&
      typeof coords[0] === 'number' &&
      typeof coords[1] === 'number'
    ) {
      // Validate coordinate ranges
      const [lng, lat] = coords
      if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
        console.warn(`⚠️ Invalid coordinate: [${lng}, ${lat}]`)
        return null
      }
      return [lng, lat]
    }
    return coords.map(convertTo2D).filter(coord => coord !== null)
  }

  if (!geoJsonData || typeof geoJsonData !== 'object') return geoJsonData

  if (geoJsonData?.features?.length) {
    geoJsonData.features.forEach((f, i) => {
      if (f?.geometry?.coordinates) {
        const convertedCoords = convertTo2D(f.geometry.coordinates)
        if (convertedCoords) {
          f.geometry.coordinates = convertedCoords
        } else {
          console.warn(`⚠️ Failed to convert coordinates for feature ${i}`)
        }
      }
    })
    return geoJsonData
  }

  if (geoJsonData?.type === 'Feature' && geoJsonData?.geometry?.coordinates) {
    const convertedCoords = convertTo2D(geoJsonData.geometry.coordinates)
    if (convertedCoords) {
      geoJsonData.geometry.coordinates = convertedCoords
    } else {
      console.warn('⚠️ Failed to convert coordinates for Feature')
    }
    return geoJsonData
  }

  if (geoJsonData?.type && geoJsonData?.coordinates) {
    const convertedCoords = convertTo2D(geoJsonData.coordinates)
    if (convertedCoords) {
      geoJsonData.coordinates = convertedCoords
    } else {
      console.warn('⚠️ Failed to convert coordinates for geometry')
    }
    return geoJsonData
  }

  return geoJsonData
}

async function updateGeomFromGeoJSON(mapId, geoJsonInput) {
  if (!geoJsonInput) {
    console.warn("⚠️ updateGeomFromGeoJSON skipped: geoJsonInput empty")
    return
  }

  const obj = safeParseJson(geoJsonInput)
  if (!obj) {
    console.error("❌ Failed to parse GeoJSON input")
    return
  }
  
  const cleanObj = convertGeoJsonTo2D(obj)
  const cleanGeoJson = JSON.stringify(cleanObj)
  
  console.log('🛰️ CleanGeoJSON for geom update:', cleanGeoJson)
  

  if (!cleanObj || !cleanObj.type) {
    console.error("❌ Invalid GeoJSON: missing type")
    return
  }
  
  if (cleanObj.type === 'FeatureCollection' && !Array.isArray(cleanObj.features)) {
    console.error("❌ Invalid GeoJSON: FeatureCollection missing features array")
    return
  }
  
  if (cleanObj.type === 'Feature' && !cleanObj.geometry) {
    console.error("❌ Invalid GeoJSON: Feature missing geometry")
    return
  }

  await prisma.$executeRawUnsafe(`
    WITH j AS (SELECT '${cleanGeoJson}'::jsonb AS j),
    g AS (
      SELECT CASE
        WHEN (j.j->>'type') = 'Feature' THEN ST_GeomFromGeoJSON((j.j->'geometry')::text)
        WHEN (j.j->>'type') = 'FeatureCollection' THEN
          ST_UnaryUnion(
            ST_Collect(ARRAY(
              SELECT ST_GeomFromGeoJSON((feat->'geometry')::text)
              FROM jsonb_array_elements(j.j->'features') AS feat
            ))
          )
        ELSE ST_GeomFromGeoJSON(j.j::text)
      END AS geom_raw
      FROM j
    )
    UPDATE "Map"
    SET geom = ST_SetSRID(
      ST_Force2D(
        ST_MakeValid(
          CASE 
            WHEN ST_GeometryType((SELECT geom_raw FROM g)) = 'ST_LineString' THEN
              ST_StartPoint((SELECT geom_raw FROM g))
            WHEN ST_GeometryType((SELECT geom_raw FROM g)) = 'ST_Polygon' THEN
              ST_Centroid((SELECT geom_raw FROM g))
            ELSE (SELECT geom_raw FROM g)
          END
        )
      ),
      4326
    )
    WHERE id = ${mapId};
  `)
}

function buildMapDataFromPayload(payload) {
  return {
    latitude: parseFloat(payload.latitude),
    longitude: parseFloat(payload.longitude),
    name_local: payload.name_local,
    house_no: payload.house_no,
    road: payload.road,
    subdistrict: payload.subdistrict,
    district: payload.district,
    province: payload.province,
    postcode: payload.postcode,
    colors: payload.colors || '#ff0000',
    data: payload.data ? safeParseJson(payload.data) : null,
  }
}


router.post('/import', async (req, res) => {
  try {
    console.log('🧪 API Test KML Import - Received data:', JSON.stringify(req.body, null, 2))
    
    const { 
      latitude, 
      longitude, 
      name_local, 
      house_no, 
      road, 
      subdistrict, 
      district, 
      province, 
      postcode, 
      colors, 
      data,
      buildingControlId 
    } = req.body

   
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: latitude and longitude are required'
      })
    }

    if (!data) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: data (GeoJSON) is required'
      })
    }

   
    const geoJsonData = safeParseJson(data)
    if (!geoJsonData || !geoJsonData.type) {
      return res.status(400).json({
        success: false,
        error: 'Invalid GeoJSON data: missing type field'
      })
    }

   
    let finalBuildingControlId = buildingControlId
    if (!finalBuildingControlId) {
      const buildingControl = await prisma.buildingControl.create({
        data: {
          building_type: 'API Import Test',
          use_purpose: 'Test Purpose',
          quantity: 1,
          fiscalYearId: 1,
          status: 'Test Status'
        }
      })
      finalBuildingControlId = buildingControl.id
      console.log('✅ Created test BuildingControl with ID:', finalBuildingControlId)
    }


    const mapData = buildMapDataFromPayload({
      latitude,
      longitude,
      name_local: name_local || 'API Import Test Location',
      house_no: house_no || '123',
      road: road || 'Test Road',
      subdistrict: subdistrict || 'Test Subdistrict',
      district: district || 'Test District',
      province: province || 'Test Province',
      postcode: postcode || '12345',
      colors: colors || '#ff0000',
      data
    })

    console.log('📊 Built map data:', JSON.stringify(mapData, null, 2))

  
    const mapRecord = await prisma.map.create({
      data: { ...mapData, buildingControlId: finalBuildingControlId },
    })
    console.log('✅ Map record created with ID:', mapRecord.id)

    
    if (data) {
      await updateGeomFromGeoJSON(mapRecord.id, data)
      console.log('✅ Geometry updated successfully')
    }


    const result = await prisma.$queryRaw`
      SELECT 
        id,
        name_local,
        latitude,
        longitude,
        colors,
        data,
        "buildingControlId",
        ST_GeometryType(geom) as geom_type,
        ST_AsText(geom) as geom_wkt,
        ST_AsGeoJSON(geom) as geom_geojson
      FROM "Map" 
      WHERE id = ${mapRecord.id}
    `

    const record = result[0]

    res.status(201).json({
      success: true,
      message: 'GeoJSON data imported successfully',
      data: {
        mapId: record.id,
        buildingControlId: record.buildingControlId,
        name_local: record.name_local,
        latitude: record.latitude,
        longitude: record.longitude,
        colors: record.colors,
        geometry: {
          type: record.geom_type,
          wkt: record.geom_wkt,
          geojson: record.geom_geojson
        },
        originalData: record.data
      }
    })

  } catch (error) {
    console.error('❌ API Test KML Import failed:', error.message)
    console.error('Stack trace:', error.stack)
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    })
  }
})


router.get('/sample-data', async (req, res) => {
  try {
    console.log('🧪 API Test KML Import - Getting sample data')
    

    const existingMaps = await prisma.$queryRaw`
      SELECT 
        id,
        name_local,
        latitude,
        longitude,
        colors,
        data,
        "buildingControlId",
        ST_GeometryType(geom) as geom_type,
        ST_AsText(geom) as geom_wkt,
        ST_AsGeoJSON(geom) as geom_geojson
      FROM "Map" 
      ORDER BY id DESC
      LIMIT 10
    `


    const buildingControls = await prisma.buildingControl.findMany({
      take: 5,
      orderBy: { id: 'desc' },
      select: {
        id: true,
        building_type: true,
        use_purpose: true,
        status: true
      }
    })

    res.json({
      success: true,
      message: 'Sample data retrieved successfully',
      data: {
        existingMaps,
        buildingControls,
        sampleGeoJson: {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [101.810061695, 17.473624316, 0],
                  [101.8130352745, 17.4759990108, 0]
                ]
              },
              "properties": {
                "fill-opacity": 0,
                "stroke-opacity": 1,
                "stroke": "#ff0000",
                "descriptio": "SIDESHOT_LINE_HIDE",
                "tessellate": -1,
                "extrude": 0,
                "visibility": true
              }
            }
          ]
        }
      }
    })

  } catch (error) {
    console.error('❌ API Test KML Import - Get sample data failed:', error.message)
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    })
  }
})


router.get('/test-records', async (req, res) => {
  try {
    console.log('🧪 API Test KML Import - Getting test records')
    
    
    const testRecords = await prisma.$queryRaw`
      SELECT 
        m.id,
        m.name_local,
        m.latitude,
        m.longitude,
        m.colors,
        m.data,
        m."buildingControlId",
        bc.building_type,
        bc.use_purpose,
        bc.status,
        ST_GeometryType(m.geom) as geom_type,
        ST_AsText(m.geom) as geom_wkt,
        ST_AsGeoJSON(m.geom) as geom_geojson
      FROM "Map" m
      LEFT JOIN "BuildingControl" bc ON m."buildingControlId" = bc.id
      WHERE m.name_local LIKE '%Test LineString%'
      ORDER BY m.id DESC
      LIMIT 10
    `

    res.json({
      success: true,
      message: 'Test records retrieved successfully',
      data: testRecords
    })

  } catch (error) {
    console.error('❌ API Test KML Import - Get test records failed:', error.message)
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    })
  }
})


router.delete('/cleanup', async (req, res) => {
  try {
    console.log('🧪 API Test KML Import - Cleaning up test records')
    
    
    const deletedMaps = await prisma.map.deleteMany({
      where: {
        name_local: {
          contains: 'API Import Test'
        }
      }
    })


    const deletedBuildingControls = await prisma.buildingControl.deleteMany({
      where: {
        building_type: 'API Import Test'
      }
    })

    res.json({
      success: true,
      message: 'Test records cleaned up successfully',
      data: {
        deletedMaps: deletedMaps.count,
        deletedBuildingControls: deletedBuildingControls.count
      }
    })

  } catch (error) {
    console.error('❌ API Test KML Import - Cleanup failed:', error.message)
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    })
  }
})

export default router
 */
import express from 'express'
import { prisma } from '../page/buildingControl/helpers.js'

const router = express.Router()

// ✅ GET /api/test-kml-import
router.get('/', async (req, res) => {
  try {
    console.log('🛰️ Fetching Map data (via Prisma)...')

    // ดึงข้อมูลจาก Prisma โดยตรง (ORM)
    const maps = await prisma.map.findMany({
      where: { geoJsonData: { not: null } }, // ต้องมี field geoJsonData ใน schema
      orderBy: { id: 'desc' },
      take: 50,
      select: {
        id: true,
        name_local: true,
        house_no: true,
        address: true,
        geoJsonData: true
      }
    })

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (maps.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลแผนที่ (Map)',
        data: []
      })
    }

    // ส่งผลลัพธ์กลับ
    res.json({
      success: true,
      count: maps.length,
      data: maps
    })

  } catch (error) {
    console.error('❌ Error fetching Map JSON:', error.message)
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
      error: error.message
    })
  }
})

export default router
