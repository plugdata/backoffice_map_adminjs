/**
 * GeoJsonAdapter
 * - โหลด GeoJSON จาก URL / File
 * - แปลง KML → GeoJSON
 * - Render บน Leaflet พร้อม style จาก properties
 */
class GeoJsonAdapter {

    // ============================================================
    // LOAD
    // ============================================================

    /** โหลด GeoJSON จาก URL */
    async loadFromUrl(url) {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Failed to load: ${url} (${res.status})`)
        return res.json()
    }

    /** อ่าน GeoJSON จาก File object (drag-drop / input) */
    loadFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                try { resolve(JSON.parse(e.target.result)) }
                catch (err) { reject(new Error('Invalid GeoJSON file')) }
            }
            reader.onerror = () => reject(new Error('Cannot read file'))
            reader.readAsText(file)
        })
    }

    /** อ่าน KML จาก File object แล้วแปลงเป็น GeoJSON */
    loadKmlFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                try { resolve(this.kmlToGeoJSON(e.target.result)) }
                catch (err) { reject(err) }
            }
            reader.onerror = () => reject(new Error('Cannot read KML file'))
            reader.readAsText(file)
        })
    }

    // ============================================================
    // KML → GEOJSON
    // ============================================================

    kmlToGeoJSON(kmlText) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(kmlText, 'text/xml')
        if (doc.querySelector('parsererror')) throw new Error('Invalid KML/XML')

        const features = []

        const parseCoords = (text) =>
            (text || '').trim().split(/\s+/)
                .map(c => {
                    const [lng, lat] = c.split(',').map(Number)
                    return isFinite(lng) && isFinite(lat) ? [lng, lat] : null
                })
                .filter(Boolean)

        const extractStyle = (placemark) => {
            const styleUrl = placemark.querySelector('styleUrl')?.textContent?.replace('#', '')
            return styleUrl || null
        }

        doc.querySelectorAll('Placemark').forEach((pm, idx) => {
            const name = pm.querySelector('name')?.textContent?.trim() || `Feature ${idx + 1}`
            const desc = pm.querySelector('description')?.textContent?.trim() || ''
            const styleRef = extractStyle(pm)
            const props = { name, description: desc, _styleRef: styleRef }

            // --- ExtendedData → properties ---
            pm.querySelectorAll('SimpleData').forEach(sd => {
                props[sd.getAttribute('name')] = sd.textContent.trim()
            })

            // --- Point ---
            const pointCoord = pm.querySelector('Point coordinates')
            if (pointCoord) {
                const [coord] = parseCoords(pointCoord.textContent)
                if (coord) {
                    features.push({
                        type: 'Feature',
                        properties: props,
                        geometry: { type: 'Point', coordinates: coord }
                    })
                }
                return
            }

            // --- LineString ---
            const lineCoord = pm.querySelector('LineString coordinates')
            if (lineCoord) {
                const coords = parseCoords(lineCoord.textContent)
                if (coords.length >= 2) {
                    features.push({
                        type: 'Feature',
                        properties: props,
                        geometry: { type: 'LineString', coordinates: coords }
                    })
                }
                return
            }

            // --- Polygon ---
            const outerCoord = pm.querySelector('outerBoundaryIs coordinates')
            if (outerCoord) {
                const outer = parseCoords(outerCoord.textContent)
                if (outer.length >= 3) {
                    // close ring
                    if (outer[0][0] !== outer[outer.length - 1][0]) outer.push(outer[0])
                    const rings = [outer]
                    pm.querySelectorAll('innerBoundaryIs coordinates').forEach(inner => {
                        const hole = parseCoords(inner.textContent)
                        if (hole.length >= 3) {
                            if (hole[0][0] !== hole[hole.length - 1][0]) hole.push(hole[0])
                            rings.push(hole)
                        }
                    })
                    features.push({
                        type: 'Feature',
                        properties: props,
                        geometry: { type: 'Polygon', coordinates: rings }
                    })
                }
                return
            }

            // --- MultiGeometry ---
            pm.querySelectorAll('MultiGeometry').forEach(mg => {
                const geoms = []
                mg.querySelectorAll('LineString coordinates').forEach(lc => {
                    const c = parseCoords(lc.textContent)
                    if (c.length >= 2) geoms.push({ type: 'LineString', coordinates: c })
                })
                mg.querySelectorAll('Polygon outerBoundaryIs coordinates').forEach(pc => {
                    const c = parseCoords(pc.textContent)
                    if (c.length >= 3) geoms.push({ type: 'Polygon', coordinates: [c] })
                })
                if (geoms.length) {
                    features.push({
                        type: 'Feature',
                        properties: props,
                        geometry: { type: 'GeometryCollection', geometries: geoms }
                    })
                }
            })
        })

        return { type: 'FeatureCollection', features }
    }

    // ============================================================
    // VALIDATE
    // ============================================================

    validate(geoJson) {
        if (!geoJson || geoJson.type !== 'FeatureCollection') return false
        return Array.isArray(geoJson.features) && geoJson.features.length > 0
    }

    stats(geoJson) {
        if (!this.validate(geoJson)) return { count: 0, types: {} }
        const types = {}
        geoJson.features.forEach(f => {
            const t = f.geometry?.type || 'Unknown'
            types[t] = (types[t] || 0) + 1
        })
        return { count: geoJson.features.length, types }
    }

    // ============================================================
    // STYLE — อ่านจาก GeoJSON properties (compat road.geojson format)
    // ============================================================

    getStyle(feature) {
        const p = feature.properties || {}
        const geomType = feature.geometry?.type || ''

        const stroke = p.stroke || p.color || '#3388ff'
        const strokeOpacity = p['stroke-opacity'] ?? p.strokeOpacity ?? 1
        const fill = p.fill || p.fillColor || stroke
        const rawFillOpacity = p['fill-opacity'] ?? p.fillOpacity ?? 0.2
        const strokeWidth = p['stroke-width'] ?? p.weight ?? 3

        if (geomType === 'Point') {
            return { color: stroke, fillColor: fill, fillOpacity: 0.8, radius: 6, weight: 2 }
        }
        // Polygons always get at least 0.2 fill so they're not invisible
        const fillOpacity = geomType === 'LineString' ? 0
            : geomType === 'Polygon' || geomType === 'MultiPolygon' ? Math.max(rawFillOpacity, 0.2)
            : rawFillOpacity
        return {
            color: stroke,
            weight: strokeWidth,
            opacity: strokeOpacity,
            fillColor: fill,
            fillOpacity
        }
    }

    // ============================================================
    // RENDER TO LEAFLET
    // ============================================================

    /**
     * Render GeoJSON บน Leaflet map
     * @param {L.Map} leafletMap
     * @param {Object} geoJson - FeatureCollection
     * @param {Object} options - { label, onEachFeature, fitBounds }
     * @returns {L.GeoJSON} layer ที่สร้าง
     */
    renderToLeaflet(leafletMap, geoJson, options = {}) {
        const { label = 'Layer', onEachFeature = null, fitBounds = true } = options

        const layer = L.geoJSON(geoJson, {
            style: (feature) => this.getStyle(feature),

            pointToLayer: (feature, latlng) => {
                const s = this.getStyle(feature)
                return L.circleMarker(latlng, s)
            },

            onEachFeature: (feature, leafletLayer) => {
                // Popup: แสดง properties
                const props = feature.properties || {}
                const rows = Object.entries(props)
                    .filter(([k]) => !k.startsWith('_'))
                    .map(([k, v]) => `<tr><td style="color:#6c757d;padding:2px 8px 2px 0;font-size:0.8rem">${k}</td><td style="font-weight:500;font-size:0.85rem">${v ?? '-'}</td></tr>`)
                    .join('')

                const popupHtml = `
                    <div style="min-width:180px">
                        <div style="font-weight:700;color:#3eb39d;margin-bottom:6px;font-size:0.9rem">
                            ${feature.geometry?.type}
                        </div>
                        <table>${rows || '<tr><td style="color:#999">ไม่มี properties</td></tr>'}</table>
                    </div>`

                leafletLayer.bindPopup(popupHtml)

                // Highlight on hover
                if (feature.geometry?.type !== 'Point') {
                    leafletLayer.on('mouseover', function () {
                        this.setStyle({ weight: 5, opacity: 1 })
                    })
                    leafletLayer.on('mouseout', function () {
                        layer.resetStyle(this)
                    })
                }

                if (onEachFeature) onEachFeature(feature, leafletLayer)
            }
        })

        layer.addTo(leafletMap)

        if (fitBounds) {
            try {
                const bounds = layer.getBounds()
                if (bounds.isValid()) leafletMap.fitBounds(bounds, { padding: [30, 30] })
            } catch (_) {}
        }

        return layer
    }

    // ============================================================
    // EXPORT
    // ============================================================

    /** Download GeoJSON เป็นไฟล์ */
    downloadGeoJSON(geoJson, filename = 'export.geojson') {
        const blob = new Blob([JSON.stringify(geoJson, null, 2)], { type: 'application/json' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = filename
        a.click()
        URL.revokeObjectURL(a.href)
    }
}

// singleton
const geoJsonAdapter = new GeoJsonAdapter()

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GeoJsonAdapter, geoJsonAdapter }
}
