/**
 * Minimalistic Wallpaper Collection - Client App Controller
 */

const CONFIG = {
    repo: 'SumanCH8514/Wallpaper-Collection-Project',
    branch: 'main',
    get rawBaseUrl() {
        return `https://raw.githubusercontent.com/${this.repo}/${this.branch}/images/`;
    },
    get imgProxyPrefix() {
        return `https://dc1imgproxy.fly.dev/x/rs:auto:480:270:1/plain/${encodeURIComponent(this.rawBaseUrl)}`;
    }
};

let allWallpapers = [];
let filteredWallpapers = [];
let activeTag = 'all';
let searchQuery = '';
let lightboxInstance = null;

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const searchBadge = document.getElementById('searchBadge');
const tagsContainer = document.getElementById('tagsContainer');
const statsCount = document.getElementById('statsCount');
const randomBtn = document.getElementById('randomBtn');
const backToTopBtn = document.getElementById('backToTop');
const toastContainer = document.getElementById('toastContainer');

/**
 * Show Toast Notification
 */
function showToast(message, icon = '✓') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 250);
    }, 2500);
}

/**
 * Copy wallpaper link to clipboard
 */
function copyLink(url, e) {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
        showToast('Direct image link copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy link', '✕');
    });
}

/**
 * Trigger random wallpaper modal
 */
function openRandomWallpaper() {
    if (allWallpapers.length === 0) return;
    const randomItem = allWallpapers[Math.floor(Math.random() * allWallpapers.length)];
    const targetElement = document.querySelector(`.glightbox[data-id="${randomItem.id}"]`);
    if (targetElement) {
        targetElement.click();
    } else {
        window.open(`/api/random`, '_blank');
    }
}

/**
 * Render Wallpaper Cards
 */
function renderGallery(items) {
    galleryGrid.innerHTML = '';

    if (items.length === 0) {
        galleryGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No wallpapers found</h3>
                <p>Try searching with another keyword or resetting the category filter.</p>
            </div>
        `;
        statsCount.textContent = `Showing 0 wallpapers`;
        return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        const fullUrl = `${CONFIG.rawBaseUrl}${encodeURIComponent(item.filename)}`;
        const thumbUrl = `${CONFIG.imgProxyPrefix}${encodeURIComponent(item.filename)}`;

        const card = document.createElement('div');
        card.className = 'wallpaper-card';

        card.innerHTML = `
            <div class="card-media">
                <a href="${fullUrl}" class="glightbox" data-id="${item.id}" data-gallery="wallpaper-gallery" data-alt="${item.title}" data-description="${item.title} • By ${item.author}">
                    <img src="${thumbUrl}" 
                         loading="lazy" 
                         decoding="async"
                         alt="${item.title}" 
                         title="${item.title}" 
                         class="img-skeleton" 
                         onload="this.classList.remove('img-skeleton')" 
                         onerror="this.src='${fullUrl}'">
                </a>
            </div>
            <div class="card-info">
                <div class="card-text">
                    <div class="card-title" title="${item.title}">${item.title}</div>
                    <div class="card-author">${item.author}</div>
                </div>
                <div class="card-actions">
                    <button class="icon-btn copy-btn" title="Copy Raw Link" data-url="${fullUrl}">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                    <a href="${fullUrl}" download class="icon-btn" title="Download Image" target="_blank" rel="noopener">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </a>
                </div>
            </div>
        `;

        fragment.appendChild(card);
    });

    galleryGrid.appendChild(fragment);
    statsCount.textContent = `Showing ${items.length} of ${allWallpapers.length} wallpapers`;

    // Re-initialize GLightbox
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

        lightboxInstance.on('slide_after_load', (slide) => {
            const img = slide.slide.querySelector('img');
            if (img && img.naturalWidth && img.naturalHeight) {
                const desc = slide.slide.querySelector('.gslide-desc');
                if (desc) {
                    desc.innerText = `${slide.slideConfig.description} (${img.naturalWidth} × ${img.naturalHeight})`;
                }
            }
        });
    }

    // Bind copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            copyLink(btn.getAttribute('data-url'), e);
        });
    });
}

/**
 * Filter and Search Logic
 */
function applyFilters() {
    filteredWallpapers = allWallpapers.filter(item => {
        const matchesTag = activeTag === 'all' || item.tags.includes(activeTag);
        const matchesSearch = !searchQuery || 
            item.title.toLowerCase().includes(searchQuery) ||
            item.author.toLowerCase().includes(searchQuery) ||
            item.filename.toLowerCase().includes(searchQuery) ||
            item.tags.some(t => t.toLowerCase().includes(searchQuery));
        return matchesTag && matchesSearch;
    });

    renderGallery(filteredWallpapers);
}

/**
 * Initialize Tags Filter Bar
 */
function setupTags(items) {
    const tagSet = new Set(['all']);
    items.forEach(item => {
        item.tags.forEach(tag => tagSet.add(tag));
    });

    const popularTags = ['all', 'landscape', 'mountain', 'nature', 'space', 'sunset', 'forest', 'cyberpunk', 'retro', 'minimalist'];

    tagsContainer.innerHTML = '';
    popularTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = `tag-btn ${tag === activeTag ? 'active' : ''}`;
        btn.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
        btn.dataset.tag = tag;

        btn.addEventListener('click', () => {
            document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTag = tag;
            applyFilters();
        });

        tagsContainer.appendChild(btn);
    });
}

/**
 * Initialize Application
 */
async function initApp() {
    try {
        const response = await fetch('/data/wallpapers.json');
        if (!response.ok) throw new Error('Failed to load wallpaper catalog');
        allWallpapers = await response.json();

        setupTags(allWallpapers);
        applyFilters();

        // Search Input Event
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                searchQuery = e.target.value.trim().toLowerCase();
                applyFilters();
            }, 150);
        });

        // Random Button
        if (randomBtn) {
            randomBtn.addEventListener('click', openRandomWallpaper);
        }

        // Global Keyboard Shortcuts
        window.addEventListener('keydown', (e) => {
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            } else if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                searchQuery = '';
                applyFilters();
                searchInput.blur();
            } else if ((e.key === 'r' || e.key === 'R') && document.activeElement !== searchInput) {
                openRandomWallpaper();
            }
        });

        // Back to Top Button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

    } catch (err) {
        console.error('Initialization error:', err);
        galleryGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <h3>Failed to load gallery</h3>
                <p>${err.message}</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', initApp);
