/**
 * LocationCards Component (Vanilla JS + Bootstrap 5)
 * แปลงจาก: components/cards/localtion-cards.js (Next.js + Tailwind)
 * - lucide-react icons → inline SVG
 * - loading / error / empty states
 * - Card list with image, badge, buttons
 *
 * วิธีใช้:
 *   const el = LocationCards({
 *     locations: [...],
 *     selectedLocation: null,
 *     onLocationSelect: (loc) => {},
 *     onMoveToLocation: (loc) => {},
 *     loading: false,
 *     error: null
 *   })
 *   document.querySelector('#cards-area').appendChild(el)
 *
 *   // อัพเดตข้อมูล:
 *   el.update({ locations: newData, selectedLocation: x })
 */

function LocationCards({
  locations = [],
  selectedLocation = null,
  onLocationSelect = () => {},
  onMoveToLocation = () => {},
  loading = false,
  error = null
} = {}) {

  const container = document.createElement('div')

  // ---- SVG icons ----
  const svgSpinner  = `<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--pink-500)" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`
  const svgAlert    = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`
  const svgMapPin   = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
  const svgMapPin32 = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
  const svgStar     = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  const svgPhone    = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.57 4.9 2 2 0 0 1 3.54 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.18a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
  const svgClock    = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  const svgUsers    = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  const svgNav      = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`
  const svgDownload = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
  const svgCalendar = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`

  function render() {
    // Loading (empty)
    if (loading && locations.length === 0) {
      container.innerHTML = `
        <div class="p-4 d-flex align-items-center justify-content-center" style="height:16rem;">
          <div class="d-flex flex-column align-items-center gap-3">
            ${svgSpinner}
            <p class="text-secondary">กำลังโหลดข้อมูลสถานที่...</p>
          </div>
        </div>`
      return
    }

    // Error (empty)
    if (error && locations.length === 0) {
      container.innerHTML = `
        <div class="p-4 d-flex align-items-center justify-content-center" style="height:16rem;">
          <div class="d-flex flex-column align-items-center gap-3 text-center">
            ${svgAlert}
            <p class="text-danger fw-medium mb-0">เกิดข้อผิดพลาด</p>
            <p class="text-secondary small">${error}</p>
          </div>
        </div>`
      return
    }

    // Empty
    if (!loading && locations.length === 0) {
      container.innerHTML = `
        <div class="p-4 d-flex align-items-center justify-content-center" style="height:16rem;">
          <div class="d-flex flex-column align-items-center gap-3 text-center">
            ${svgMapPin32}
            <p class="text-secondary">ไม่พบข้อมูลสถานที่</p>
          </div>
        </div>`
      return
    }

    // Cards list
    container.innerHTML = `
      <div class="p-3 d-flex flex-column gap-3">
        ${loading && locations.length > 0 ? `
        <div class="d-flex align-items-center justify-content-center py-2">
          <span class="animate-spin me-2" style="display:inline-block;">${svgSpinner.replace('width="32" height="32"','width="16" height="16"')}</span>
          <span class="small text-secondary">กำลังโหลดข้อมูลเพิ่มเติม...</span>
        </div>` : ''}

        ${locations.map(loc => {
          const isSelected = selectedLocation?.id === loc.id
          return `
          <div class="card shadow-sm cursor-pointer ${isSelected ? 'ring-pink' : ''}"
               data-location-id="${loc.id}"
               style="border-color:${isSelected ? 'var(--pink-500)' : '#e5e7eb'};transition:box-shadow .2s;">

            <!-- Image -->
            <div class="position-relative">
              <img src="${loc.image || ''}" alt="${loc.name}"
                   class="card-img-top object-cover"
                   style="height:12rem;background:#f3e5f5;"
                   onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22192%22%3E%3Crect width=%22400%22 height=%22192%22 fill=%22%23fce4ec%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22%3E🏗️%3C/text%3E%3C/svg%3E'" />
              <div class="position-absolute top-0 end-0 m-2 bg-white rounded-pill px-2 py-1 d-flex align-items-center gap-1 backdrop-blur-sm"
                   style="background:rgba(255,255,255,0.9);">
                ${svgStar}
                <span class="small fw-medium">${loc.rating || ''}</span>
              </div>
            </div>

            <!-- Body -->
            <div class="card-body p-3">
              <h5 class="card-title fw-bold text-dark mb-1">${loc.name || ''}</h5>
              <div class="d-flex align-items-center gap-2 small text-secondary mb-2">
                ${svgMapPin} <span>${loc.address || ''}</span>
              </div>

              <p class="card-text small text-secondary mb-2 line-clamp-2">${loc.description || ''}</p>

              <!-- Type + Year + Distance -->
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <span class="badge rounded-pill bg-pink-100 text-pink-800 fw-normal">${loc.type || ''}</span>
                  ${loc.year ? `
                  <span class="badge rounded bg-primary bg-opacity-10 text-primary fw-normal d-flex align-items-center gap-1">
                    ${svgCalendar} ${loc.year}
                  </span>` : ''}
                </div>
                <span class="small text-secondary fw-medium">${loc.distance || ''}</span>
              </div>

              <!-- Programs -->
              ${loc.programs?.length ? `
              <div class="mb-2">
                <div class="d-flex align-items-center gap-2 mb-1">
                  ${svgUsers} <span class="small fw-medium text-dark">Programs:</span>
                </div>
                <div class="d-flex flex-wrap gap-1">
                  ${loc.programs.map(p => `
                    <span class="badge bg-light text-dark border fw-normal">${p}</span>`).join('')}
                </div>
              </div>` : ''}

              <!-- Contact & Hours -->
              <div class="d-flex flex-column gap-1 mb-3">
                ${loc.phone ? `
                <div class="d-flex align-items-center gap-2 small text-secondary">
                  ${svgPhone} <span>${loc.phone}</span>
                </div>` : ''}
                ${loc.openingHours ? `
                <div class="d-flex align-items-start gap-2 small text-secondary">
                  ${svgClock} <span class="whitespace-pre">${loc.openingHours}</span>
                </div>` : ''}
              </div>

              <!-- Action Buttons -->
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-pink flex-fill d-flex align-items-center justify-content-center gap-1"
                        data-action="navigate" data-location-id="${loc.id}"
                        style="border-color:var(--pink-200);color:var(--pink-700);">
                  ${svgNav} ไปที่หมุด
                </button>
                <button class="btn btn-sm btn-outline-pink flex-fill d-flex align-items-center justify-content-center gap-1"
                        data-action="download" data-location-id="${loc.id}"
                        data-doc-url="${loc.documentUrl || ''}"
                        style="border-color:var(--pink-200);color:var(--pink-700);">
                  ${svgDownload} โหลดเอกสาร
                </button>
              </div>
            </div>
          </div>`
        }).join('')}
      </div>
    `

    // ---- events ----
    container.querySelectorAll('[data-location-id]').forEach(el => {
      const locId = el.dataset.locationId
      const loc = locations.find(l => String(l.id) === String(locId))

      // Card click (select)
      if (el.classList.contains('card')) {
        el.addEventListener('click', () => onLocationSelect(loc))
      }
    })

    container.querySelectorAll('[data-action="navigate"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation()
        const loc = locations.find(l => String(l.id) === String(btn.dataset.locationId))
        if (loc) onMoveToLocation(loc)
      })
    })

    container.querySelectorAll('[data-action="download"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation()
        if (btn.dataset.docUrl) {
          window.open(btn.dataset.docUrl, '_blank')
        } else {
          alert('ไม่มีเอกสารสำหรับสถานที่นี้')
        }
      })
    })
  }

  // Public API
  container.update = (opts = {}) => {
    if (opts.locations !== undefined) locations = opts.locations
    if (opts.selectedLocation !== undefined) selectedLocation = opts.selectedLocation
    if (opts.loading !== undefined) loading = opts.loading
    if (opts.error !== undefined) error = opts.error
    render()
  }

  render()
  return container
}

if (typeof module !== 'undefined') module.exports = { LocationCards }
