/**
 * MobileTools Component (Vanilla JS + Bootstrap 5)
 * แปลงจาก: components/mobile/mobile-tools.js (Next.js + Tailwind)
 * - แสดงเฉพาะ mobile (d-md-none)
 * - FAB tools bar + Sidebar overlay
 *
 * วิธีใช้:
 *   const el = MobileTools({
 *     selectedLocation: null,
 *     onToolSelect: (id, location) => {}
 *   })
 *   document.body.appendChild(el)
 */

function MobileTools({ selectedLocation = null, onToolSelect = () => {} } = {}) {
  let isOpen = false

  const tools = [
    { id: 'directions', label: 'Directions', color: 'bg-primary',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2">
               <polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>` },
    { id: 'location',   label: 'Location',   color: 'bg-pink-500',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2">
               <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
               <circle cx="12" cy="10" r="3"/></svg>` },
    { id: 'call',       label: 'Call',       color: 'bg-warning',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2">
               <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5
                 19.79 19.79 0 0 1 1.57 4.9 2 2 0 0 1 3.54 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81
                 a2 2 0 0 1-.45 2.11L7.91 10.18a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45
                 c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>` },
    { id: 'share',      label: 'Share',      color: 'bg-success',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2">
               <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
               <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
               <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>` }
  ]

  const fragment = document.createDocumentFragment()

  // ---- Bottom tools bar ----
  const bar = document.createElement('div')
  bar.className = 'd-md-none mobile-tools-bar'

  bar.innerHTML = `
    <div class="text-center mb-2">
      <p class="small fw-medium text-secondary text-uppercase tracking-wide mb-0">LOCATION</p>
    </div>
    <div class="d-flex justify-content-center gap-4">
      ${tools.map(t => `
        <button data-tool="${t.id}"
          class="${t.color} rounded-circle d-flex align-items-center justify-content-center text-white shadow"
          style="width:3rem;height:3rem;border:none;"
          aria-label="${t.label}">
          ${t.icon}
        </button>
      `).join('')}
    </div>
  `

  bar.querySelectorAll('[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      onToolSelect(btn.dataset.tool, selectedLocation)
    })
  })

  // ---- Hamburger toggle button ----
  const menuBtn = document.createElement('button')
  menuBtn.className = 'd-md-none btn btn-light rounded-circle shadow-lg p-2'
  menuBtn.style.cssText = 'position:fixed;top:1rem;left:1rem;z-index:1060;'
  menuBtn.innerHTML = getMenuIcon()

  // ---- Sidebar overlay ----
  const overlay = document.createElement('div')
  overlay.className = 'd-md-none sidebar-overlay d-none'

  const panel = document.createElement('div')
  panel.className = 'sidebar-panel'
  panel.innerHTML = `
    <div class="p-3 border-bottom">
      <h5 class="fw-semibold mb-0">Tools &amp; Options</h5>
    </div>
    <div class="p-3 d-flex flex-column gap-2">
      ${tools.map(t => `
        <button data-sidebar-tool="${t.id}"
          class="btn btn-light w-100 d-flex align-items-center gap-3 p-3 text-start rounded">
          <div class="${t.color} rounded-circle d-flex align-items-center justify-content-center text-white"
               style="width:2.5rem;height:2.5rem;flex-shrink:0;">
            ${t.icon}
          </div>
          <span class="fw-medium">${t.label}</span>
        </button>
      `).join('')}
    </div>
  `

  overlay.appendChild(panel)

  function getMenuIcon() {
    return isOpen
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
           <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/>
           <line x1="4" x2="20" y1="18" y2="18"/></svg>`
  }

  function openSidebar() {
    isOpen = true
    overlay.classList.remove('d-none')
    menuBtn.innerHTML = getMenuIcon()
  }
  function closeSidebar() {
    isOpen = false
    overlay.classList.add('d-none')
    menuBtn.innerHTML = getMenuIcon()
  }

  menuBtn.addEventListener('click', () => isOpen ? closeSidebar() : openSidebar())
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSidebar() })

  panel.querySelectorAll('[data-sidebar-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      onToolSelect(btn.dataset.sidebarTool, selectedLocation)
      closeSidebar()
    })
  })

  fragment.appendChild(bar)
  fragment.appendChild(menuBtn)
  fragment.appendChild(overlay)

  return fragment
}

if (typeof module !== 'undefined') module.exports = { MobileTools }
