/**
 * TabNavigation Component (Vanilla JS + Bootstrap 5)
 * แปลงจาก: components/menu/TabNavigation.js (Next.js + Tailwind)
 *
 * วิธีใช้:
 *   const el = TabNavigation({
 *     activeTab: 'medical',
 *     onTabChange: (id) => console.log(id)
 *   })
 *   document.querySelector('#app').appendChild(el)
 */

function TabNavigation({ activeTab = 'medical', onTabChange = () => {} } = {}) {
  const tabs = [
    { id: 'medical',  label: 'ขอใบอนุญาต' },
    { id: 'software', label: 'งานสาธารณะ' },
    { id: 'financial',label: 'งานผังเมือง' }
  ]

  const nav = document.createElement('div')
  nav.className = 'd-flex flex-column flex-sm-row gap-2'

  function render() {
    nav.innerHTML = ''
    tabs.forEach(tab => {
      const btn = document.createElement('button')
      btn.className = `btn tab-btn px-4 py-2 rounded fw-medium ${
        activeTab === tab.id ? 'tab-active' : 'text-secondary'
      }`
      btn.textContent = tab.label
      btn.addEventListener('click', () => {
        activeTab = tab.id
        onTabChange(tab.id)
        render()
      })
      nav.appendChild(btn)
    })
  }

  render()
  return nav
}

if (typeof module !== 'undefined') module.exports = { TabNavigation }
