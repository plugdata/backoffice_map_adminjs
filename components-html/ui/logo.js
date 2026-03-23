/**
 * Logo Component (Vanilla JS + Bootstrap 5)
 * แปลงจาก: components/ui/logo.js (Next.js + Tailwind)
 * - next/image → <img> ธรรมดา
 *
 * วิธีใช้:
 *   const el = Logo()
 *   document.querySelector('#app').appendChild(el)
 */

function Logo() {
  const wrapper = document.createElement('div')
  wrapper.className = 'w-100 h-100 d-flex align-items-center justify-content-center'

  const img = document.createElement('img')
  img.src = '/img/Seal_of_Trang.png'
  img.alt = 'ตราสัญลักษณ์เทศบาล'
  img.width = 64
  img.height = 64
  img.className = 'object-contain drop-shadow-sm'
  img.style.maxWidth = '64px'
  img.style.maxHeight = '64px'

  wrapper.appendChild(img)
  return wrapper
}

if (typeof module !== 'undefined') module.exports = { Logo }
