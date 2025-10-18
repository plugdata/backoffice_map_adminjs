import React, { useState } from 'react';
import { kml } from '@tmcw/togeojson';

function TestMap({ record, property }) {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const data = record?.params?.data || null;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const kmlString = e.target.result;
        // Parse the KML string into an XML Document
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlString, 'text/xml');
        // Convert the XML Document to GeoJSON
        const convertedGeoJson = kml(kmlDoc);
        setGeoJsonData(convertedGeoJson);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".kml" onChange={handleFileChange} />
      {geoJsonData && (
        <pre>
          {JSON.stringify(geoJsonData, null, 2)}
        </pre>
      )}
      {/* You can now use geoJsonData with your mapping library (e.g., Leaflet, Mapbox GL JS) */}
    </div>
  );
}

export default TestMap;