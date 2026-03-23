/**
 * SearchInterface Component (Vanilla JS + Bootstrap 5)
 * แปลงจาก: components/search/search-interface.js (Next.js + Tailwind)
 * - lucide-react icons → inline SVG
 * - useState → ตัวแปร JS
 * - props → object argument
 *
 * วิธีใช้:
 *   const el = SearchInterface({
 *     filterOptions: { programs: ['ทั้งหมด'], types: ['ทั้งหมด'], years: ['ทั้งหมด'],
 *                      sortOptions: [{value:'name',label:'ชื่อ'}] },
 *     onSearch: (query) => {},
 *     onFilterChange: (filters) => {}
 *   })
 *   document.querySelector('#search-area').appendChild(el)
 */

function SearchInterface({
  filterOptions = { programs: [], types: [], years: [], sortOptions: [] },
  filterStats = null,
  loading = false,
  error = null,
  searchFallback = false,
  searchError = null,
  onSearchChange = () => {},
  onFilterTypeChange = () => {},
  onFilterLocationTypeChange = () => {},
  onFilterYearChange = () => {},
  onSortByChange = () => {},
  onMaxDistanceChange = () => {},
  onClearFilters = () => {}
} = {}) {

  let showAdvanced = false

  const container = document.createElement('div')
  container.className = 'bg-white border-bottom'

  // SVG icons
  const svgSearch = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`

  const svgX = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 6 6 18M6 6l12 12"/></svg>`

  const svgSpinner = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" class="animate-spin text-pink-600">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`

  const svgFilter = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`

  const svgChevron = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m6 9 6 6 6-6"/></svg>`

  const svgAlert = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`

  function programOptions() {
    return (filterOptions.programs || []).map(p =>
      `<option value="${p}">${p === 'Apprenticeship & Traineeship Services' ? 'A&T Services' : p}</option>`
    ).join('')
  }

  function typeOptions() {
    return (filterOptions.types || []).map(t => `<option value="${t}">${t}</option>`).join('')
  }

  function yearOptions() {
    return (filterOptions.years || []).map(y => `<option value="${y}">${y}</option>`).join('')
  }

  function sortOptions() {
    return (filterOptions.sortOptions || []).map(s =>
      `<option value="${s.value}">${s.label}</option>`).join('')
  }

  function render() {
    const hasActiveFilters = filterStats?.hasActiveFilters
    container.innerHTML = `
      <!-- Main Search Bar -->
      <div class="p-2 p-md-3">
        <div class="d-flex align-items-center gap-2 gap-md-3 container-xl mx-auto">

          <!-- Search Input -->
          <div class="flex-grow-1 position-relative">
            <span class="position-absolute top-50 translate-middle-y ms-2 text-secondary" style="left:0.25rem;">
              ${svgSearch}
            </span>
            <input
              id="si-search"
              type="text"
              class="form-control ps-5 pe-4"
              placeholder="ค้นหาสถานที่..."
            />
            <span id="si-search-right" class="position-absolute top-50 translate-middle-y me-2" style="right:0.25rem;">
              ${loading ? svgSpinner : ''}
            </span>
          </div>

          <!-- View Toggle (Desktop) -->
          <button class="d-none d-md-block btn btn-light p-2" title="Toggle view">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>

          <!-- Program Filter -->
          <div class="position-relative">
            <select id="si-program" class="form-select pe-4" style="min-width:8rem;">
              ${programOptions()}
            </select>
          </div>

          <!-- Advanced Filter Toggle -->
          <button
            id="si-adv-toggle"
            class="btn d-flex align-items-center gap-1 fw-medium ${hasActiveFilters ? 'btn-pink-light text-pink-700' : 'btn-light text-secondary'}"
          >
            ${svgFilter}
            <span class="d-none d-sm-inline">กรองข้อมูล</span>
          </button>
        </div>

        <!-- Filter Stats -->
        ${filterStats ? `
        <div class="mt-2 small text-secondary container-xl mx-auto">
          แสดง ${filterStats.filtered} จาก ${filterStats.total} สถานที่
          ${filterStats.hasActiveFilters
            ? `<button id="si-clear" class="btn btn-link btn-sm p-0 ms-1 text-pink-600 text-decoration-underline">ล้างตัวกรอง</button>`
            : ''}
        </div>` : ''}
      </div>

      <!-- Advanced Filters Panel -->
      <div id="si-adv-panel" class="${showAdvanced ? '' : 'd-none'} border-top bg-light p-3">
        <div class="container-xl mx-auto">
          <div class="row g-3">
            <!-- ประเภทเอกสาร -->
            <div class="col-12 col-md-6 col-lg-3">
              <label class="form-label small fw-medium text-dark">ประเภทเอกสาร</label>
              <select id="si-type" class="form-select form-select-sm">
                ${typeOptions()}
              </select>
            </div>
            <!-- ปีงบประมาณ -->
            <div class="col-12 col-md-6 col-lg-3">
              <label class="form-label small fw-medium text-dark">ปีงบประมาณ</label>
              <select id="si-year" class="form-select form-select-sm">
                ${yearOptions()}
              </select>
            </div>
            <!-- เรียงตาม -->
            <div class="col-12 col-md-6 col-lg-3">
              <label class="form-label small fw-medium text-dark">เรียงตาม</label>
              <select id="si-sort" class="form-select form-select-sm">
                ${sortOptions()}
              </select>
            </div>
            <!-- ระยะทางสูงสุด -->
            <div class="col-12 col-md-6 col-lg-3">
              <label class="form-label small fw-medium text-dark">
                ระยะทางสูงสุด: <span id="si-dist-val">100</span> กม.
              </label>
              <input id="si-distance" type="range" min="10" max="500" step="10" value="100"
                     class="form-range slider" />
              <div class="d-flex justify-content-between text-xs text-secondary mt-1">
                <span>10 กม.</span><span>500 กม.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error -->
      ${error ? `
      <div class="mx-3 mt-2 mb-1 alert alert-danger d-flex align-items-center gap-2 py-2 small">
        ${svgAlert} <span>${error}</span>
      </div>` : ''}

      <!-- Search Fallback -->
      ${searchFallback ? `
      <div class="mx-3 mt-2 mb-1 alert alert-warning py-2 small">
        <div class="d-flex align-items-center gap-2">
          <span class="bg-warning rounded-circle" style="width:8px;height:8px;display:inline-block;"></span>
          กำลังค้นหาในข้อมูลที่มีอยู่ (การค้นหาแบบ API ไม่พร้อมใช้งาน)
        </div>
        ${searchError ? `<div class="mt-1">${searchError}</div>` : ''}
      </div>` : ''}
    `

    // ---- events ----
    const searchInput = container.querySelector('#si-search')
    searchInput?.addEventListener('input', e => {
      onSearchChange(e.target.value)
      // toggle clear button
      const right = container.querySelector('#si-search-right')
      if (right && !loading) right.innerHTML = e.target.value ? svgX : ''
    })

    container.querySelector('#si-search-right')?.addEventListener('click', () => {
      if (searchInput) { searchInput.value = ''; onSearchChange('') }
    })

    container.querySelector('#si-program')?.addEventListener('change', e => onFilterTypeChange(e.target.value))
    container.querySelector('#si-type')?.addEventListener('change', e => onFilterLocationTypeChange(e.target.value))
    container.querySelector('#si-year')?.addEventListener('change', e => onFilterYearChange(e.target.value))
    container.querySelector('#si-sort')?.addEventListener('change', e => onSortByChange(e.target.value))

    const distInput = container.querySelector('#si-distance')
    distInput?.addEventListener('input', e => {
      container.querySelector('#si-dist-val').textContent = e.target.value
      onMaxDistanceChange(parseInt(e.target.value))
    })

    container.querySelector('#si-adv-toggle')?.addEventListener('click', () => {
      showAdvanced = !showAdvanced
      container.querySelector('#si-adv-panel')?.classList.toggle('d-none', !showAdvanced)
    })

    container.querySelector('#si-clear')?.addEventListener('click', onClearFilters)
  }

  render()
  return container
}

if (typeof module !== 'undefined') module.exports = { SearchInterface }
