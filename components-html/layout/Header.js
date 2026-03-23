/**
 * Header Component (Vanilla JS + Bootstrap 5)
 * — MOCK DATA VERSION — ไม่มี fetch / localStorage
 */

function Header() {
  let mobileMenuOpen = false

  // ── Mock data (hardcoded) ─────────────────────────
  const visitorStats = { weekVisits: '1,284', totalVisits: '38,920' }
  const weather = {
    icon: '☀️', temperature: 32,
    temperatureMax: 35, temperatureMin: 28,
    tambon: 'ทับเที่ยง'
  }
  // ─────────────────────────────────────────────────

  const nav = document.createElement('nav')
  nav.className = 'nav-pink-gradient sticky-top shadow-sm'
  nav.style.zIndex = '1030'

  function render() {
    nav.innerHTML = `
      <div class="container-xl">
        <div class="d-flex justify-content-between align-items-center" style="height:5rem;">

          <!-- Logo + Title -->
          <div class="d-flex align-items-center gap-3">
            <div style="width:3.5rem;height:3.5rem;display:flex;align-items:center;justify-content:center;">
              <!-- Placeholder logo (แทน Seal_of_Trang.png) -->
              <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#1565c0,#42a5f5);
                          display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.4rem;">🏛️</div>
            </div>
            <div>
              <h2 class="fw-bold mb-0" style="font-size:1.35rem;line-height:1.1;color:#1565c0;">กองช่าง</h2>
              <p class="fw-semibold mb-0" style="font-size:1rem;line-height:1.1;color:#1976d2;">เทศบาลนครตรัง</p>
            </div>
          </div>

          <!-- Desktop Nav -->
          <div class="d-none d-lg-flex align-items-center gap-1">
            <a href="#map"      class="nav-underline-anim btn btn-link fw-medium text-decoration-none fs-6 px-3 py-2" style="color:#ad1457;">🗺️ แผนที่</a>
            <a href="#services" class="nav-underline-anim btn btn-link fw-medium text-decoration-none fs-6 px-3 py-2" style="color:#ad1457;">🏛️ บริการประชาชน</a>
            <a href="#news"     class="nav-underline-anim btn btn-link fw-medium text-decoration-none fs-6 px-3 py-2" style="color:#ad1457;">📰 ข่าวสาร</a>
          </div>

          <!-- Stats + Weather (Desktop) -->
          <div class="d-none d-lg-flex align-items-center gap-4">
            <div class="d-flex gap-4">
              <div class="text-center">
                <div class="text-xs fw-medium" style="color:#e91e8c;">ผู้เข้าชมสัปดาห์</div>
                <div class="fs-6 fw-bold" style="color:#ad1457;">${visitorStats.weekVisits}</div>
              </div>
              <div class="text-center">
                <div class="text-xs fw-medium" style="color:#e91e8c;">ผู้เข้าชมทั้งหมด</div>
                <div class="fs-6 fw-bold" style="color:#ad1457;">${visitorStats.totalVisits}</div>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2 px-3 py-2 rounded" style="background:rgba(255,255,255,0.8);">
              <span class="fs-4">${weather.icon}</span>
              <div>
                <div class="fw-semibold small" style="color:#ad1457;">${weather.temperature}°C</div>
                <div class="text-xs" style="color:#e91e8c;">${weather.temperatureMax}°/${weather.temperatureMin}° ${weather.tambon}</div>
              </div>
            </div>
          </div>

          <!-- Mobile Hamburger -->
          <button id="hdr-hamburger" class="d-lg-none btn btn-link p-2" style="color:#ad1457;" aria-label="เมนู">
            <svg id="hdr-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="26" height="26">
              <path id="hdr-icon-path" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="${mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <div id="hdr-mobile-menu" class="d-lg-none ${mobileMenuOpen ? '' : 'd-none'}"
           style="background:linear-gradient(to bottom,#fce4ec,#fff);">
        <div class="container-xl px-3 py-3">
          <div class="d-flex flex-column gap-2 mb-3">
            <a href="#map"      class="d-flex align-items-center gap-3 px-3 py-2 bg-white rounded-3 fw-medium fs-6 shadow-sm border text-decoration-none" style="color:#ad1457;border-color:#f48fb1;">🗺️ แผนที่</a>
            <a href="#services" class="d-flex align-items-center gap-3 px-3 py-2 bg-white rounded-3 fw-medium fs-6 shadow-sm border text-decoration-none" style="color:#ad1457;border-color:#f48fb1;">🏛️ บริการประชาชน</a>
            <a href="#news"     class="d-flex align-items-center gap-3 px-3 py-2 bg-white rounded-3 fw-medium fs-6 shadow-sm border text-decoration-none" style="color:#ad1457;border-color:#f48fb1;">📰 ข่าวสาร</a>
          </div>
          <div class="border-top pt-3" style="border-color:#f8bbd9!important;">
            <div class="row g-2 mb-2">
              <div class="col-6">
                <div class="bg-white rounded text-center p-2 shadow-sm border" style="border-color:#f8bbd9;">
                  <div class="text-xs fw-medium" style="color:#e91e8c;">ผู้เข้าชมสัปดาห์</div>
                  <div class="fs-6 fw-bold" style="color:#ad1457;">${visitorStats.weekVisits}</div>
                </div>
              </div>
              <div class="col-6">
                <div class="bg-white rounded text-center p-2 shadow-sm border" style="border-color:#f8bbd9;">
                  <div class="text-xs fw-medium" style="color:#e91e8c;">ผู้เข้าชมทั้งหมด</div>
                  <div class="fs-6 fw-bold" style="color:#ad1457;">${visitorStats.totalVisits}</div>
                </div>
              </div>
            </div>
            <div class="bg-white rounded d-flex align-items-center justify-content-center gap-2 px-3 py-2 shadow-sm border" style="border-color:#f8bbd9;">
              <span class="fs-4">${weather.icon}</span>
              <div>
                <div class="fw-semibold small" style="color:#ad1457;">${weather.temperature}°C</div>
                <div class="text-xs" style="color:#e91e8c;">${weather.temperatureMax}°/${weather.temperatureMin}° ${weather.tambon}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    nav.querySelector('#hdr-hamburger').addEventListener('click', () => {
      mobileMenuOpen = !mobileMenuOpen
      nav.querySelector('#hdr-mobile-menu').classList.toggle('d-none', !mobileMenuOpen)
      nav.querySelector('#hdr-icon-path').setAttribute('d',
        mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16')
    })
  }

  render()
  return nav
}

if (typeof module !== 'undefined') module.exports = { Header }
