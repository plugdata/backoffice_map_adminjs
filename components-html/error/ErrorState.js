/**
 * ErrorState Component (Vanilla JS + Bootstrap 5)
 * แปลงจาก: components/error/ErrorState.js (Next.js + Tailwind)
 *
 * วิธีใช้:
 *   const el = ErrorState({ error: 'ข้อความ error' })
 *   document.querySelector('#app').appendChild(el)
 */

function ErrorState({ error = '' } = {}) {
  const wrapper = document.createElement('div')
  wrapper.className = 'd-flex align-items-center justify-content-center'
  wrapper.style.height = '8rem'

  wrapper.innerHTML = `
    <div class="text-center">
      <div class="text-danger fs-1 mb-2">⚠️</div>
      <p class="text-danger mb-2 small">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
      <p class="text-muted mb-2 text-xs">${error}</p>
      <button
        class="btn btn-sm btn-danger"
        onclick="window.location.reload()"
      >
        ลองใหม่
      </button>
    </div>
  `

  return wrapper
}

// Export สำหรับ ES Module
if (typeof module !== 'undefined') module.exports = { ErrorState }
