/**
 * Wallpaper Collection — Modern Application Controller
 * A SumanOnline Project
 */

const CONFIG = {
  proxyBaseUrl: '/api/images/',
  rawBaseUrl: 'https://raw.githubusercontent.com/SumanCH8514/Wallpaper-Collection-Project/main/images/',
  imgProxyPrefix: 'https://dc1imgproxy.fly.dev/x/rs:auto:480:270:1/plain/https%3A%2F%2Fraw.githubusercontent.com%2FSumanCH8514%2FWallpaper-Collection-Project%2Fmain%2Fimages%2F'
};

const PAGE_SIZE = 40;

let allWallpapers = [];
let filteredWallpapers = [];
let currentPage = 1;
let activeTag = 'all';
let searchQuery = '';
let isCompactView = false;
let lightboxInstance = null;

const galleryGrid = document.getElementById('galleryGrid');
const paginationNav = document.getElementById('paginationNav');
const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');
const categoryChipsContainer = document.getElementById('categoryChipsContainer');
const statsStatusLabel = document.getElementById('statsStatusLabel');
const gridToggleBtn = document.getElementById('gridToggleBtn');
const gridDensityText = document.getElementById('gridDensityText');
const backToTopFab = document.getElementById('backToTopFab');
const toastStack = document.getElementById('toastStack');
const randomNavBtn = document.getElementById('randomNavBtn');
const apiDocsModal = document.getElementById('apiDocsModal');
const openApiModalBtn = document.getElementById('openApiModalBtn');
const closeApiModalBtn = document.getElementById('closeApiModalBtn');
const footerApiDocsTrigger = document.getElementById('footerApiDocsTrigger');

function showToast(message) {
  if (!toastStack) return;
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<svg class="toast-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${message}</span>`;
  toastStack.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

function copySnippet(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('URL copied to clipboard!');
  }).catch(() => {
    showToast('Copied: ' + text);
  });
}

function copyLink(url, e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const fullUrl = window.location.origin + url;
  navigator.clipboard.writeText(fullUrl).then(() => {
    showToast('Proxy image URL copied!');
  }).catch(() => {
    showToast('Link copied!');
  });
}

function openRandomWallpaper() {
  const pool = filteredWallpapers.length > 0 ? filteredWallpapers : allWallpapers;
  if (pool.length === 0) return;
  const randomItem = pool[Math.floor(Math.random() * pool.length)];
  const target = document.querySelector(`.glightbox[data-id="${randomItem.id}"]`);
  if (target) {
    target.click();
  } else {
    window.open('/api/random', '_blank');
  }
}

function goToPage(pageNumber, shouldScroll) {
  const totalPages = Math.ceil(filteredWallpapers.length / PAGE_SIZE) || 1;
  currentPage = Math.max(1, Math.min(pageNumber, totalPages));

  const url = new URL(window.location);
  if (currentPage > 1) {
    url.searchParams.set('page', currentPage);
  } else {
    url.searchParams.delete('page');
  }
  window.history.replaceState({}, '', url);

  renderCurrentPage();

  if (shouldScroll && galleryGrid) {
    const headerOffset = 90;
    const elementPosition = galleryGrid.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
  }
}

function renderPagination(totalItems) {
  if (!paginationNav) return;
  paginationNav.innerHTML = '';
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  if (totalPages <= 1) {
    paginationNav.style.display = 'none';
    return;
  }

  paginationNav.style.display = 'flex';
  const fragment = document.createDocumentFragment();

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-nav-btn';
  prevBtn.innerHTML = '&larr; Prev';
  prevBtn.disabled = currentPage <= 1;
  prevBtn.title = 'Previous Page';
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) goToPage(currentPage - 1, true);
  });
  fragment.appendChild(prevBtn);

  function createBtn(p) {
    const btn = document.createElement('button');
    btn.className = 'page-nav-btn ' + (p === currentPage ? 'active' : '');
    btn.textContent = p;
    btn.setAttribute('aria-label', 'Page ' + p);
    btn.addEventListener('click', () => goToPage(p, true));
    return btn;
  }

  function createDots() {
    const span = document.createElement('span');
    span.className = 'page-dots-ellipsis';
    span.textContent = '...';
    return span;
  }

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      fragment.appendChild(createBtn(i));
    }
  } else {
    fragment.appendChild(createBtn(1));
    if (currentPage > 3) fragment.appendChild(createDots());

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      fragment.appendChild(createBtn(i));
    }

    if (currentPage < totalPages - 2) fragment.appendChild(createDots());
    fragment.appendChild(createBtn(totalPages));
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-nav-btn';
  nextBtn.innerHTML = 'Next &rarr;';
  nextBtn.disabled = currentPage >= totalPages;
  nextBtn.title = 'Next Page';
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) goToPage(currentPage + 1, true);
  });
  fragment.appendChild(nextBtn);

  paginationNav.appendChild(fragment);
}

function renderCurrentPage() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';
  const totalItems = filteredWallpapers.length;

  if (totalItems === 0) {
    galleryGrid.innerHTML = `<div class="empty-gallery-state"><div class="empty-icon-graphic">🔍</div><h3 class="empty-state-heading">No wallpapers found</h3><p class="empty-state-subtitle">No matching artworks found for "${searchQuery}". Try a different keyword or reset filters.</p><button class="btn btn-secondary" onclick="resetFilters()">Reset All Filters</button></div>`;
    if (statsStatusLabel) statsStatusLabel.textContent = 'Showing 0 wallpapers';
    if (paginationNav) paginationNav.style.display = 'none';
    return;
  }

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  if (currentPage > totalPages) currentPage = 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalItems);
  const items = filteredWallpapers.slice(startIndex, endIndex);

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const proxyUrl = CONFIG.proxyBaseUrl + encodeURIComponent(item.filename);
    const rawUrl = CONFIG.rawBaseUrl + encodeURIComponent(item.filename);
    const thumbUrl = CONFIG.imgProxyPrefix + encodeURIComponent(item.filename);
    const primaryTag = item.tags && item.tags[0] ? item.tags[0] : 'minimalist';
    const authorInitial = item.author ? item.author.charAt(0).toUpperCase() : 'W';

    const card = document.createElement('div');
    card.className = 'wallpaper-card';

    card.innerHTML = `
      <div class="card-media-wrapper">
        <span class="card-badge-top-left">${primaryTag}</span>
        <span class="card-badge-top-right">4K ${item.format.toUpperCase()}</span>
        
        <img 
          src="${thumbUrl}" 
          alt="${item.title}" 
          title="${item.title}"
          class="card-image img-skeleton"
          loading="lazy"
          decoding="async"
          onload="this.classList.remove('img-skeleton')"
          onerror="this.src='${rawUrl}'"
        />

        <div class="card-media-overlay">
          <a href="${proxyUrl}" 
             class="overlay-action-btn glightbox" 
             data-id="${item.id}"
             data-gallery="wallpaper-gallery"
             data-alt="${item.title}"
             data-description="${item.title} &bull; Artist: ${item.author} (${item.format.toUpperCase()})"
             title="Full Screen Preview">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </a>
          <button class="overlay-action-btn" onclick="copyLink('${proxyUrl}', event)" title="Copy Proxy URL">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
          <a href="${proxyUrl}" download="${item.filename}" class="overlay-action-btn" target="_blank" rel="noopener" title="Download High-Res">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
        </div>
      </div>

      <div class="card-info-footer">
        <div class="card-title-group">
          <div class="card-wallpaper-title" title="${item.title}">${item.title}</div>
          <div class="card-artist-row">
            <span class="artist-avatar-circle">${authorInitial}</span>
            <span class="card-artist-name">${item.author}</span>
          </div>
        </div>
        <div class="card-quick-actions">
          <button class="card-icon-action" onclick="copyLink('${proxyUrl}', event)" title="Copy Proxy Link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
          <a href="${proxyUrl}" download="${item.filename}" target="_blank" rel="noopener" class="card-icon-action" title="Download Image">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  galleryGrid.appendChild(fragment);

  if (statsStatusLabel) {
    statsStatusLabel.innerHTML = `Showing <strong>${startIndex + 1}&ndash;${endIndex}</strong> of <strong>${totalItems}</strong> Wallpapers (Page ${currentPage} of ${totalPages})`;
  }

  renderPagination(totalItems);

  if (lightboxInstance) {
    lightboxInstance.destroy();
  }
  if (typeof GLightbox !== 'undefined') {
    lightboxInstance = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true
    });
  }
}

function resetFilters() {
  if (searchInput) {
    searchInput.value = '';
    if (searchClearBtn) searchClearBtn.style.display = 'none';
  }
  searchQuery = '';
  activeTag = 'all';
  document.querySelectorAll('.category-chip').forEach((b) => b.classList.remove('active'));
  const allBtn = document.querySelector(`.category-chip[data-tag="all"]`);
  if (allBtn) allBtn.classList.add('active');
  applyFilters(true);
}

function applyFilters(resetPage) {
  if (resetPage) currentPage = 1;

  filteredWallpapers = allWallpapers.filter((item) => {
    const matchesTag = activeTag === 'all' || item.tags.includes(activeTag);
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery) ||
      item.author.toLowerCase().includes(searchQuery) ||
      item.filename.toLowerCase().includes(searchQuery) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery));
    return matchesTag && matchesSearch;
  });

  goToPage(currentPage, false);
}

function setupCategoryChips() {
  if (!categoryChipsContainer) return;
  const categories = [
    { id: 'all', label: 'All Wallpapers', icon: '🌐', count: allWallpapers.length },
    { id: 'minimalist', label: 'Minimalist', icon: '🏔️', count: 194 },
    { id: 'mountain', label: 'Mountains', icon: '⛰️', count: 38 },
    { id: 'sunset', label: 'Sunset', icon: '🌅', count: 27 },
    { id: 'landscape', label: 'Landscape', icon: '🌄', count: 23 },
    { id: 'night', label: 'Night & Moon', icon: '🌙', count: 14 },
    { id: 'forest', label: 'Forest', icon: '🌲', count: 14 },
    { id: 'firewatch', label: 'Firewatch', icon: '🔥', count: 12 },
    { id: 'city', label: 'City & Neon', icon: '🌆', count: 11 },
    { id: 'lake', label: 'Lakes & Water', icon: '🌊', count: 7 },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: '⚡', count: 2 }
  ];

  categoryChipsContainer.innerHTML = '';
  categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.className = 'category-chip ' + (cat.id === activeTag ? 'active' : '');
    btn.dataset.tag = cat.id;
    btn.innerHTML = `<span>${cat.icon} ${cat.label}</span><span class="category-chip-count">${cat.count}</span>`;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-chip').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = cat.id;
      applyFilters(true);
    });

    categoryChipsContainer.appendChild(btn);
  });
}

function toggleApiModal(open) {
  if (!apiDocsModal) return;
  if (open) {
    apiDocsModal.classList.add('open');
    apiDocsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  } else {
    apiDocsModal.classList.remove('open');
    apiDocsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

async function initApp() {
  if (window.EMBEDDED_WALLPAPERS && Array.isArray(window.EMBEDDED_WALLPAPERS)) {
    allWallpapers = window.EMBEDDED_WALLPAPERS;
  } else {
    try {
      const res = await fetch('/data/wallpapers.json');
      if (res.ok) {
        allWallpapers = await res.json();
      }
    } catch (err) {
      console.warn('Falling back to /api/wallpapers', err);
      try {
        const apiRes = await fetch('/api/wallpapers?limit=400');
        const json = await apiRes.json();
        allWallpapers = json.data || [];
      } catch (e) {
        console.error('Failed to load wallpapers:', e);
      }
    }
  }

  filteredWallpapers = [...allWallpapers];

  const urlParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(urlParams.get('page') || '1', 10);
  if (!isNaN(initialPage) && initialPage > 1) {
    currentPage = initialPage;
  }

  setupCategoryChips();
  applyFilters(false);

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const val = e.target.value.trim();
      if (searchClearBtn) searchClearBtn.style.display = val ? 'flex' : 'none';
      debounceTimer = setTimeout(() => {
        searchQuery = val.toLowerCase();
        applyFilters(true);
      }, 140);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      applyFilters(true);
      if (searchInput) searchInput.focus();
    });
  }

  if (gridToggleBtn && galleryGrid) {
    gridToggleBtn.addEventListener('click', () => {
      isCompactView = !isCompactView;
      if (isCompactView) {
        galleryGrid.classList.add('compact-view');
        if (gridDensityText) gridDensityText.textContent = 'Compact Grid';
        gridToggleBtn.classList.add('active');
      } else {
        galleryGrid.classList.remove('compact-view');
        if (gridDensityText) gridDensityText.textContent = 'Comfort Grid';
        gridToggleBtn.classList.remove('active');
      }
    });
  }

  if (randomNavBtn) {
    randomNavBtn.addEventListener('click', openRandomWallpaper);
  }

  if (openApiModalBtn) openApiModalBtn.addEventListener('click', () => toggleApiModal(true));
  if (footerApiDocsTrigger) footerApiDocsTrigger.addEventListener('click', () => toggleApiModal(true));
  if (closeApiModalBtn) closeApiModalBtn.addEventListener('click', () => toggleApiModal(false));
  if (apiDocsModal) {
    apiDocsModal.addEventListener('click', (e) => {
      if (e.target === apiDocsModal) toggleApiModal(false);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (apiDocsModal && apiDocsModal.classList.contains('open')) {
        toggleApiModal(false);
      } else if (searchInput && document.activeElement === searchInput) {
        searchInput.value = '';
        searchQuery = '';
        if (searchClearBtn) searchClearBtn.style.display = 'none';
        applyFilters(true);
        searchInput.blur();
      }
    } else if (e.key === '/' && document.activeElement !== searchInput && (!apiDocsModal || !apiDocsModal.classList.contains('open'))) {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    } else if ((e.key === 'r' || e.key === 'R') && document.activeElement !== searchInput && (!apiDocsModal || !apiDocsModal.classList.contains('open'))) {
      openRandomWallpaper();
    } else if (e.key === 'ArrowRight' && document.activeElement !== searchInput && (!apiDocsModal || !apiDocsModal.classList.contains('open'))) {
      const totalPages = Math.ceil(filteredWallpapers.length / PAGE_SIZE) || 1;
      if (currentPage < totalPages) goToPage(currentPage + 1, true);
    } else if (e.key === 'ArrowLeft' && document.activeElement !== searchInput && (!apiDocsModal || !apiDocsModal.classList.contains('open'))) {
      if (currentPage > 1) goToPage(currentPage - 1, true);
    }
  });

  if (backToTopFab) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopFab.classList.add('visible');
      } else {
        backToTopFab.classList.remove('visible');
      }
    }, { passive: true });

    backToTopFab.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
