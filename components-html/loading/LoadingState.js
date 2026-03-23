/**
 * LoadingState Component (Vanilla JS + Bootstrap 5)
 * แปลงจาก: components/loading/LoadingState.js (Next.js + Tailwind)
 *
 * วิธีใช้:
 *   const el = LoadingState()
 *   document.querySelector('#app').appendChild(el)
 */

function LoadingState() {
  const wrapper = document.createElement('div')
  wrapper.className = 'd-flex align-items-center justify-content-center min-vh-100 bg-white'

  wrapper.innerHTML = `
    <div class="d-flex flex-column align-items-center">
      <!-- Spinner -->
      <div class="spinner-custom"></div>
      <!-- Text -->
      <p class="mt-3 text-secondary fw-medium">Loading...</p>
    </div>
  `

  return wrapper
}

// Export สำหรับ ES Module
if (typeof module !== 'undefined') module.exports = { LoadingState }
