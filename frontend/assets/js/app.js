function initSidebarToggle() {
    var sidebar = document.getElementById('sidebar');
    var sidebarOverlay = document.getElementById('sidebar-overlay');
    var menuToggle = document.getElementById('btn-menu-toggle');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('show');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
        });
    }

    if (sidebarOverlay && sidebar) {
        sidebarOverlay.addEventListener('click', function () {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Common UI Interactions (e.g., chart buttons toggle)
    var chartBtns = document.querySelectorAll('.btn-group .btn');
    chartBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const parent = btn.closest('.btn-group');
            if (parent) {
                parent.querySelectorAll('.btn').forEach(function (b) {
                    b.classList.remove('active');
                });
            }
            this.classList.add('active');
        });
    });
});

/**
 * Set active nav link based on current page path
 * เปรียบเทียบ path segment เช่น 'user', 'owner', 'building-control'
 * ทำงานกับทุก sub-page (list/form/view) ของ section เดียวกัน
 */
function setActiveNav() {
    const parts = window.location.pathname.replace(/\?.*/, '').split('/').filter(Boolean);
    // /frontend/pages/user/list.html → parts[2] = 'user'
    // /frontend/pages/dashboard.html → parts[2] = 'dashboard.html'
    const currentSegment = parts[2] || null;
    if (!currentSegment) return;

    document.querySelectorAll('a.nav-link[href]').forEach(function (link) {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('javascript')) return;

        const linkParts = href.split('/').filter(Boolean);
        const linkSegment = linkParts[2] || null;

        if (linkSegment && linkSegment === currentSegment) {
            link.classList.add('active');
        }
    });
}

/**
 * Helper to load HTML components
 * @param {string} url - URL of the component to load
 * @param {string} elementId - ID of the container element
 */
async function loadComponent(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // หลังโหลด sidebar เสร็จ ให้ highlight nav item ที่ตรงกับ page ปัจจุบัน
        if (elementId === 'sidebar') {
            setActiveNav();
        }
        // หลังโหลด header เสร็จ ให้ init sidebar toggle (btn-menu-toggle อยู่ใน header)
        if (elementId === 'main-header') {
            initSidebarToggle();
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}
