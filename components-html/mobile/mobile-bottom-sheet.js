/**
 * MobileBottomSheet Component (Vanilla JS + Bootstrap 5)
 * แปลงจาก: components/mobile/mobile-bottom-sheet.js (Next.js + Tailwind)
 * - แสดงเฉพาะ mobile (d-md-none)
 * - Toggle expand/collapse
 *
 * วิธีใช้:
 *   const el = MobileBottomSheet({
 *     location: { name:'...', type:'...', address:'...', phone:'...', rating: 4.5 }
 *   })
 *   document.body.appendChild(el)
 *
 *   // อัพเดต location:
 *   el.setLocation(newLocation)
 */

function MobileBottomSheet({ location = null } = {}) {
  let isExpanded = false
  let currentLocation = location

  const wrapper = document.createElement('div')
  wrapper.className = 'd-md-none bottom-sheet'

  const svgChevronUp = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>`

  const svgPin = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/></svg>`

  const svgPhone = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5
      19.79 19.79 0 0 1 1.57 4.9 2 2 0 0 1 3.54 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81
      a2 2 0 0 1-.45 2.11L7.91 10.18a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45
      c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`

  const svgClock = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`

  const svgStar = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="#facc15" stroke="#facc15" stroke-width="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`

  function render() {
    if (!currentLocation) { wrapper.innerHTML = ''; return }

    wrapper.innerHTML = `
      <div class="bg-white text-pink-600 rounded-top shadow-lg border-top border-pink-300" style="border-top-width:2px;">
        <!-- Header / Toggle -->
        <button id="bs-toggle" class="w-100 btn btn-link text-decoration-none p-3 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <div class="bg-pink-100 rounded d-flex align-items-center justify-content-center shadow-sm"
                 style="width:3rem;height:3rem;color:var(--pink-500);">
              ${svgPin}
            </div>
            <div class="text-start">
              <h3 class="fw-semibold text-dark mb-0 fs-6">${currentLocation.name || ''}</h3>
              <p class="mb-0 small" style="color:var(--pink-400);">${currentLocation.type || ''}</p>
            </div>
          </div>
          <span style="color:var(--pink-500);">${svgChevronUp}</span>
        </button>

        <!-- Expanded content -->
        <div id="bs-body" class="${isExpanded ? '' : 'd-none'} px-3 pb-3 border-top border-pink-200">
          <div class="mt-3 d-flex flex-column gap-2">

            <div class="d-flex align-items-center gap-3">
              <span style="color:var(--pink-500);">${svgPin}</span>
              <span class="small">${currentLocation.address || ''}</span>
            </div>

            ${currentLocation.phone ? `
            <div class="d-flex align-items-center gap-3">
              <span style="color:var(--pink-500);">${svgPhone}</span>
              <span class="small">${currentLocation.phone}</span>
            </div>` : ''}

            <div class="d-flex align-items-center gap-3">
              <span style="color:var(--pink-500);">${svgClock}</span>
              <span class="small">Mon-Fri 8:30am-5:00pm</span>
            </div>

            ${currentLocation.rating ? `
            <div class="d-flex align-items-center gap-3">
              ${svgStar}
              <span class="small">${currentLocation.rating} stars</span>
            </div>` : ''}

          </div>

          <button class="btn w-100 mt-3 text-white fw-semibold py-2 rounded shadow"
                  style="background:var(--pink-500);"
                  onmouseover="this.style.background='var(--pink-700)'"
                  onmouseout="this.style.background='var(--pink-500)'">
            View event
          </button>
        </div>
      </div>
    `

    wrapper.querySelector('#bs-toggle')?.addEventListener('click', () => {
      isExpanded = !isExpanded
      render()
    })
  }

  // Public API: อัพเดต location จากภายนอก
  wrapper.setLocation = (loc) => {
    currentLocation = loc
    isExpanded = false
    render()
  }

  render()
  return wrapper
}

if (typeof module !== 'undefined') module.exports = { MobileBottomSheet }
