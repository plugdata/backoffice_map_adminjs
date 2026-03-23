/**
 * MobileHeader Component (Vanilla JS + Bootstrap 5)
 * แปลงจาก: components/mobile/mobile-header.js (Next.js + Tailwind)
 * - แสดงเฉพาะบน mobile (d-md-none)
 * - lucide-react icons → inline SVG
 *
 * วิธีใช้:
 *   const el = MobileHeader({
 *     onFilterClick: () => {},
 *     onCloseMap: () => {},
 *     showMapControls: true
 *   })
 *   document.body.prepend(el)
 */

function MobileHeader({ onFilterClick = () => {}, onCloseMap = () => {}, showMapControls = true } = {}) {
  let menuOpen = false

  const wrapper = document.createElement('div')
  wrapper.className = 'd-md-none'
  wrapper.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:1050;'

  function render() {
    wrapper.innerHTML = `
      <!-- Pink Navbar -->
      <nav class="border-bottom shadow-sm text-white" style="background:#FF77C1;">
        <div class="d-flex justify-content-between align-items-center px-3" style="height:4rem;">
          <!-- Logo + Title -->
          <div class="d-flex align-items-center gap-2">
            <div class="bg-white rounded d-flex align-items-center justify-content-center"
                 style="width:2.5rem;height:2.5rem;">
              <img src="/img/Seal_of_Trang.png" alt="logo" width="36" height="36" class="object-contain" />
            </div>
            <h2 class="fw-bold fs-5 mb-0 text-white">เทศบาลนครตรัง</h2>
          </div>

          <!-- Hamburger -->
          <button id="mob-hdr-hamburger" class="btn btn-link text-white p-1" aria-label="เมนู">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path id="mob-hamburger-path" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="${menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}"/>
            </svg>
          </button>
        </div>

        <!-- Dropdown -->
        <div id="mob-hdr-dropdown" class="${menuOpen ? '' : 'd-none'} px-3 py-2" style="background:#FF77C1;">
          <a href="#map"      class="d-block py-2 text-white text-decoration-none">🗺️ แผนที่</a>
          <a href="#services" class="d-block py-2 text-white text-decoration-none">🏛️ บริการประชาชน</a>
          <a href="#news"     class="d-block py-2 text-white text-decoration-none">📰 ข่าวสาร</a>
        </div>
      </nav>

      <!-- Filter / Map Controls (white bar) -->
      <div class="bg-white border-bottom p-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <button id="mob-hdr-filter" class="btn btn-link text-purple d-flex align-items-center gap-2 p-0 fw-medium"
                  style="color:#7c3aed;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Filter
          </button>
          <button id="mob-hdr-close" class="btn btn-link text-secondary d-flex align-items-center gap-2 p-0">
            Close map
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        ${showMapControls ? `
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex bg-light rounded p-1 gap-1">
            <button class="btn btn-sm btn-white shadow-sm fw-medium">Map</button>
            <button class="btn btn-sm text-secondary">Satellite</button>
          </div>
          <button class="btn btn-sm btn-white border border-secondary-subtle shadow-sm p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </button>
        </div>` : ''}
      </div>
    `

    // Events
    wrapper.querySelector('#mob-hdr-hamburger').addEventListener('click', () => {
      menuOpen = !menuOpen
      render()
    })
    wrapper.querySelector('#mob-hdr-filter')?.addEventListener('click', onFilterClick)
    wrapper.querySelector('#mob-hdr-close')?.addEventListener('click', onCloseMap)
  }

  render()
  return wrapper
}

if (typeof module !== 'undefined') module.exports = { MobileHeader }
