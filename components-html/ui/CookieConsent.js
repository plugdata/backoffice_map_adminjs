/**
 * CookieConsent Component (Vanilla JS + Bootstrap 5)
 * — MOCK VERSION — แสดง banner ทันที ไม่ตรวจ localStorage
 */

const CookieConsent = (() => {

  function render() {
    // ลบ banner เก่าถ้ามี
    document.getElementById('cookie-banner')?.remove()

    const banner = document.createElement('div')
    banner.id = 'cookie-banner'
    banner.className = 'cookie-banner'
    banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;'

    banner.innerHTML = `
      <div style="background:linear-gradient(to right,#fce4ec,#f8bbd9);border-top:1px solid #f48fb1;" class="shadow-lg">
        <div class="container-xl px-3 py-3">
          <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <div class="flex-grow-1">
              <h3 class="fw-semibold fs-6 mb-2" style="color:#ad1457;">🍪 การใช้คุกกี้ (Cookies)</h3>
              <p class="small mb-1" style="color:#c2185b;">
                เว็บไซต์นี้ใช้คุกกี้เพื่อเก็บข้อมูลการเข้าชมและปรับปรุงประสบการณ์การใช้งาน
                ข้อมูลจะถูกเก็บไว้ในเครื่องของคุณเท่านั้น
              </p>
              <div class="text-xs" style="color:#e91e8c;">
                <strong>ข้อมูลที่เก็บ:</strong> จำนวนผู้เข้าชม, วันที่เข้าชมล่าสุด
              </div>
            </div>
            <div class="d-flex flex-row gap-2">
              <button id="cookie-decline" class="btn btn-sm btn-outline-secondary">ปฏิเสธ</button>
              <button id="cookie-accept"  class="btn btn-sm text-white px-4"
                style="background:linear-gradient(to right,#ec407a,#e91e8c);">ยอมรับ</button>
            </div>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(banner)

    banner.querySelector('#cookie-accept').addEventListener('click',  () => hideBanner(banner))
    banner.querySelector('#cookie-decline').addEventListener('click', () => hideBanner(banner))
  }

  function hideBanner(banner) {
    banner.classList.add('hide')
    setTimeout(() => banner.remove(), 320)
  }

  // แสดงเสมอ (mock — ไม่ตรวจ localStorage)
  function init() {
    setTimeout(() => render(), 800)
  }

  return { init }
})()

if (typeof module !== 'undefined') module.exports = { CookieConsent }
