import React from "react"
import MapField from "./mapfild"
import styled from "styled-components"
import { Box, Text } from "@adminjs/design-system"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  margin-top: 24px;
`

const Header = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
  text-align: center;
`

const Coordinates = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8fafc;
  padding: 12px 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 15px;
  color: #334155;

  strong {
    color: #0f172a;
  }
`

const MapWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
`

const ShowMap = ({ record, property }) => {
  const { latitude, longitude, name_local, house_no, address, image_before, image_after, colors, geoJsonData } = record?.params || {}

  const preload = { name_local, house_no, address, image_before, image_after}

  const handleMapChange = (field, value) => {
    console.log("🔄 Changed:", field, value)
  }

/*   console.log('🗺️ ShowMap rendering with:', {
    latitude,
    longitude,
    geoJsonData,
    name_local,
    house_no,
    address,
    image_before,
    image_after,
    colors,
    geom_geojson,
    record: record?.params
  })
 */
  return (
    <Box mb="lg">
      <Header>🗺️ แผนที่โซน</Header>

      <Coordinates>
        <div>
          <strong>Latitude:</strong> {latitude || "—"}
        </div>
        <div>
          <strong>Longitude:</strong> {longitude || "—"}
        </div>
      </Coordinates>

   
        <MapField
          geoJsonData={geoJsonData}
          name_local={name_local}
          house_no={house_no}
          address={address}
          image_before={image_before}
          image_after={image_after}
          latitude={latitude}
          longitude={longitude}
          colors={colors}
          onChange={handleMapChange}
          record={record}
          preload={preload}
          mode="show"
          draggable={false}
        />

    </Box>
  )
}

export default ShowMap
