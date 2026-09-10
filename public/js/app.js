(function () {
  "use strict";

  const ITEMS_PER_PAGE = 40;
  let allWallpapers = [];
  let filteredWallpapers = [];
  let currentPage = 1;
  let currentCategory = "all";
  let currentViewMode = localStorage.getItem("wallpaper_view_mode") || "grid";
  let searchQuery = "";
  let glightboxInstance = null;

  function inferCategory(filename) {
    const fn = (filename || "").toLowerCase();
    if (
      fn.includes("mountain") ||
      fn.includes("alps") ||
      fn.includes("peak") ||
      fn.includes("cliff") ||
      fn.includes("snow") ||
      fn.includes("hill")
    )
      return "mountains";
    if (
      fn.includes("sunset") ||
      fn.includes("sunrise") ||
      fn.includes("dusk") ||
      fn.includes("dawn") ||
      fn.includes("golden") ||
      fn.includes("evening") ||
      fn.includes("sun")
    )
      return "sunset";
    if (
      fn.includes("landscape") ||
      fn.includes("lake") ||
      fn.includes("river") ||
      fn.includes("ocean") ||
      fn.includes("sea") ||
      fn.includes("valley") ||
      fn.includes("desert") ||
      fn.includes("coast")
    )
      return "landscape";
    if (
      fn.includes("night") ||
      fn.includes("moon") ||
      fn.includes("star") ||
      fn.includes("space") ||
      fn.includes("planet") ||
      fn.includes("galaxy") ||
      fn.includes("lunar")
    )
      return "night & moon";
    if (
      fn.includes("forest") ||
      fn.includes("tree") ||
      fn.includes("woods") ||
      fn.includes("pine") ||
      fn.includes("jungle")
    )
      return "forest";
    if (
      fn.includes("abstract") ||
      fn.includes("gradient") ||
      fn.includes("pattern") ||
      fn.includes("geometric") ||
      fn.includes("vector")
    )
      return "abstract";
    return "minimalist";
  }

  function formatTitle(filename) {
    let name = (filename || "").replace(/\.[^/.]+$/, "");
    name = name.replace(
      /^(wallpapersden\.com_|wp\d+[-_]|wallpaperflare\.com_)/i,
      "",
    );
    name = name.replace(/[-_]+/g, " ").trim();
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  async function init() {
    try {
      let rawList = null;
      if (
        window.__WALLPAPERS_CATALOG__ &&
        Array.isArray(window.__WALLPAPERS_CATALOG__)
      ) {
        rawList = window.__WALLPAPERS_CATALOG__;
      }

      if (!rawList) {
        try {
          const res = await fetch("/api/wallpapers");
          if (res.ok) {
            const json = await res.json();
            rawList = Array.isArray(json)
              ? json
              : json && json.data
                ? json.data
                : json.wallpapers;
          }
        } catch (_) {}
      }

      if (!rawList) {
        try {
          const res = await fetch("/data/wallpapers.json");
          if (res.ok) rawList = await res.json();
        } catch (_) {}
      }

      if (Array.isArray(rawList) && rawList.length > 0) {
        allWallpapers = rawList.map((item) => {
          const fn = item.filename || item.name || "";
          const cat = inferCategory(fn);
          return {
            filename: fn,
            title: item.title || formatTitle(fn),
            category: cat,
            url: `/api/images/${encodeURIComponent(fn)}`,
            rawUrl: `https://raw.githubusercontent.com/SumanCH8514/Wallpaper-Collection-Project/main/images/${encodeURIComponent(fn)}`,
            author: item.author || "Curated Artist",
          };
        });
      }

      updateCategoryCounts();
      setRandomHeroBackground();
      applyViewMode(currentViewMode);
      applyFilters(true);
      initCategoryCarousel();
      initBackToTop();
      initEvents();
    } catch (err) {
      console.error("Error initializing wallpapers:", err);
    }
  }

  function setRandomHeroBackground() {
    const hero = document.querySelector(".hero-wrapper");
    if (hero && allWallpapers.length > 0) {
      const randomItem =
        allWallpapers[Math.floor(Math.random() * allWallpapers.length)];
      hero.style.backgroundImage = `linear-gradient(90deg, #07101E 0%, rgba(7,16,30,0.96) 28%, rgba(7,16,30,0.65) 52%, rgba(7,16,30,0.20) 100%), url('${randomItem.url}')`;
    }
  }

  function updateCategoryCounts() {
    const counts = { all: allWallpapers.length };
    allWallpapers.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    const categoryPills = document.querySelectorAll(".category-pill-btn");
    categoryPills.forEach((pill) => {
      const cat = pill.getAttribute("data-cat");
      const badge = pill.querySelector(".pill-count-badge");
      if (badge && counts[cat] !== undefined) {
        badge.textContent = counts[cat];
      }
    });
  }

  function applyViewMode(mode) {
    const validModes = ["grid", "masonry", "list"];
    currentViewMode = validModes.includes(mode) ? mode : "grid";
    try {
      localStorage.setItem("wallpaper_view_mode", currentViewMode);
    } catch (_) {}

    const gridEl = document.getElementById("wallpaper-grid");
    if (gridEl) {
      gridEl.classList.remove("view-grid", "view-masonry", "view-list");
      gridEl.classList.add("view-" + currentViewMode);
    }

    const viewBtns = document.querySelectorAll(".view-btn");
    viewBtns.forEach((btn) => {
      const btnMode =
        btn.getAttribute("data-view") ||
        (btn.textContent.toLowerCase().includes("masonry")
          ? "masonry"
          : btn.textContent.toLowerCase().includes("list")
            ? "list"
            : "grid");
      if (btnMode === currentViewMode) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function applyFilters(resetPage = true) {
    if (resetPage) currentPage = 1;
    const q = searchQuery.trim().toLowerCase();

    filteredWallpapers = allWallpapers.filter((item) => {
      const matchCat =
        currentCategory === "all" || item.category === currentCategory;
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.filename.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    renderGrid();
    renderPagination();
    updateResultsHeader();
  }

  function renderGrid() {
    const gridEl = document.getElementById("wallpaper-grid");
    if (!gridEl) return;

    if (filteredWallpapers.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #71809A;">
          <h3 style="color: #FFFFFF; font-size: 20px; margin-bottom: 8px;">No wallpapers found</h3>
          <p>Try searching with another keyword or pick another category.</p>
        </div>
      `;
      return;
    }

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = Math.min(start + ITEMS_PER_PAGE, filteredWallpapers.length);
    const pageItems = filteredWallpapers.slice(start, end);

    gridEl.innerHTML = pageItems
      .map(
        (item) => `
      <div class="wallpaper-card-item glightbox" data-gallery="wallpaper-gallery" data-href="${item.url}" data-type="image">
        <img 
          class="card-thumb-img" 
          src="${item.url}" 
          alt="${escapeHtml(item.title)}" 
          loading="lazy"
          decoding="async"
        />
        <div class="card-hover-mask">
          <div class="card-mask-top">
            <span class="badge-card-cat">${escapeHtml(item.category)}</span>
            <div class="card-action-btns">
              <button type="button" class="btn-card-icon btn-copy-link" data-url="${item.url}" title="Copy Proxy Link" aria-label="Copy Direct Proxy Link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              </button>
              <a href="${item.url}" download="${item.filename}" target="_blank" rel="noopener noreferrer" class="btn-card-icon btn-download-link" title="Download via Proxy" aria-label="Download Wallpaper">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>
            </div>
          </div>
          <div class="card-mask-bottom">
            <span class="card-art-title">${escapeHtml(item.title)}</span>
            <span class="card-art-res">4K Ultra HD</span>
          </div>
        </div>
      </div>
    `,
      )
      .join("");

    setupLightbox();

    document.querySelectorAll(".btn-copy-link").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const path = btn.getAttribute("data-url") || "";
        const fullUrl = path.startsWith("http")
          ? path
          : `${window.location.origin}${path}`;
        if (navigator.clipboard && fullUrl) {
          navigator.clipboard
            .writeText(fullUrl)
            .then(() => {
              showToast("Proxy link copied to clipboard!");
            })
            .catch(() => {
              showToast("Copied link: " + fullUrl);
            });
        }
      });
    });

    document.querySelectorAll(".btn-download-link").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  }

  function setupLightbox() {
    if (typeof GLightbox !== "undefined") {
      if (glightboxInstance) {
        try {
          glightboxInstance.destroy();
        } catch (_) {}
      }
      glightboxInstance = GLightbox({
        selector: ".glightbox",
        loop: true,
        touchNavigation: true,
        zoomable: true,
      });
    }
  }

  function renderPagination() {
    const paginationContainerEl = document.getElementById(
      "pagination-container",
    );
    if (!paginationContainerEl) return;

    const totalPages = Math.ceil(filteredWallpapers.length / ITEMS_PER_PAGE);
    if (totalPages <= 1) {
      paginationContainerEl.innerHTML = "";
      return;
    }

    let html = "";
    html += `<button class="page-nav-btn" id="btn-prev" ${currentPage === 1 ? "disabled" : ""}>&lt;</button>`;

    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    range.forEach((p) => {
      if (p === "...") {
        html += `<span class="page-ellipsis-dots">…</span>`;
      } else {
        html += `<button class="page-nav-btn ${p === currentPage ? "active" : ""}" data-page="${p}">${p}</button>`;
      }
    });

    html += `<button class="page-nav-btn" id="btn-next" ${currentPage === totalPages ? "disabled" : ""}>&gt;</button>`;

    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(
      currentPage * ITEMS_PER_PAGE,
      filteredWallpapers.length,
    );

    paginationContainerEl.innerHTML = `
      <div class="pagination-pages-list">${html}</div>
      <div class="pagination-footer-text">Showing ${start}–${end} of ${filteredWallpapers.length} Wallpapers (Page ${currentPage} of ${totalPages})</div>
    `;

    paginationContainerEl.querySelectorAll("[data-page]").forEach((b) => {
      b.addEventListener("click", () => {
        currentPage = parseInt(b.getAttribute("data-page"), 10);
        renderGrid();
        renderPagination();
        updateResultsHeader();
        const gridEl = document.getElementById("wallpaper-grid");
        if (gridEl)
          gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    const prev = document.getElementById("btn-prev");
    if (prev) {
      prev.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderGrid();
          renderPagination();
          updateResultsHeader();
          const gridEl = document.getElementById("wallpaper-grid");
          if (gridEl)
            gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    const next = document.getElementById("btn-next");
    if (next) {
      next.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderGrid();
          renderPagination();
          updateResultsHeader();
          const gridEl = document.getElementById("wallpaper-grid");
          if (gridEl)
            gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }

  function updateResultsHeader() {
    const countEl = document.getElementById("results-count");
    const totalPages =
      Math.ceil(filteredWallpapers.length / ITEMS_PER_PAGE) || 1;
    const start =
      filteredWallpapers.length === 0
        ? 0
        : (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(
      currentPage * ITEMS_PER_PAGE,
      filteredWallpapers.length,
    );
    if (countEl) {
      countEl.innerHTML = `Showing <span class="results-count-bold">${start}–${end}</span> of <span class="results-count-bold">${filteredWallpapers.length}</span> Wallpapers (Page ${currentPage} of ${totalPages})`;
    }
  }

  function showToast(msg) {
    const toastEl = document.getElementById("toast-msg");
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 2500);
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initCategoryCarousel() {
    const track = document.getElementById("cat-scroll-track");
    const prevBtn = document.getElementById("cat-scroll-prev");
    const nextBtn = document.getElementById("cat-scroll-next");
    if (!track || !prevBtn || !nextBtn) return;

    function updateArrowStates() {
      const scrollLeft = Math.ceil(track.scrollLeft);
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (maxScroll <= 5) {
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        prevBtn.classList.add("is-disabled");
        nextBtn.classList.add("is-disabled");
        return;
      }

      if (scrollLeft <= 5) {
        prevBtn.disabled = true;
        prevBtn.classList.add("is-disabled");
      } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove("is-disabled");
      }

      if (scrollLeft >= maxScroll - 5) {
        nextBtn.disabled = true;
        nextBtn.classList.add("is-disabled");
      } else {
        nextBtn.disabled = false;
        nextBtn.classList.remove("is-disabled");
      }
    }

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -320, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: 320, behavior: "smooth" });
    });

    track.addEventListener("scroll", updateArrowStates, { passive: true });
    window.addEventListener("resize", updateArrowStates);

    updateArrowStates();
    setTimeout(updateArrowStates, 100);
    setTimeout(updateArrowStates, 400);
  }

  function initBackToTop() {
    const btn = document.getElementById("btn-floating-top");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 350) {
          btn.classList.add("show");
        } else {
          btn.classList.remove("show");
        }
      },
      { passive: true },
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initEvents() {
    const searchInputEl = document.getElementById("search-input");
    const categoryPills = document.querySelectorAll(".category-pill-btn");
    const viewBtns = document.querySelectorAll(".view-btn");
    const randomBtn = document.getElementById("btn-random-wall");
    const apiDocsBtn = document.getElementById("btn-api-docs");
    const apiModal = document.getElementById("api-modal");
    const modalCloseBtn = document.getElementById("btn-close-modal");

    // Search Input
    let timeout = null;
    if (searchInputEl) {
      searchInputEl.addEventListener("input", (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          searchQuery = e.target.value;
          applyFilters(true);
        }, 150);
      });
    }

    // Category Tabs
    categoryPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        categoryPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        currentCategory = pill.getAttribute("data-cat");
        applyFilters(true);
      });
    });

    // View Switcher Buttons (Comfort Grid, Masonry, List)
    viewBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetBtn = btn.closest(".view-btn");
        if (!targetBtn) return;
        const mode =
          targetBtn.getAttribute("data-view") ||
          (targetBtn.textContent.toLowerCase().includes("masonry")
            ? "masonry"
            : targetBtn.textContent.toLowerCase().includes("list")
              ? "list"
              : "grid");
        applyViewMode(mode);
        showToast(`Switched view to ${targetBtn.textContent.trim()}`);
      });
    });

    // Random Wallpaper
    if (randomBtn) {
      randomBtn.addEventListener("click", () => {
        const cards = Array.from(
          document.querySelectorAll(".wallpaper-card-item.glightbox"),
        );
        if (cards.length > 0) {
          const randomCard = cards[Math.floor(Math.random() * cards.length)];
          const title = randomCard.getAttribute("data-title") || "Wallpaper";
          randomCard.click();
          showToast("Viewing random wallpaper: " + title);
        } else if (allWallpapers.length > 0) {
          const randomItem =
            allWallpapers[Math.floor(Math.random() * allWallpapers.length)];
          window.open(randomItem.url, "_blank");
          showToast("Viewing random wallpaper: " + randomItem.title);
        }
      });
    }

    // Modal Events
    if (apiDocsBtn && apiModal) {
      apiDocsBtn.addEventListener("click", () =>
        apiModal.classList.add("active"),
      );
    }
    if (modalCloseBtn && apiModal) {
      modalCloseBtn.addEventListener("click", () =>
        apiModal.classList.remove("active"),
      );
    }
    if (apiModal) {
      apiModal.addEventListener("click", (e) => {
        if (e.target === apiModal) apiModal.classList.remove("active");
      });
    }

    // Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      if (
        e.key === "/" &&
        searchInputEl &&
        document.activeElement !== searchInputEl
      ) {
        e.preventDefault();
        searchInputEl.focus();
      }
      if (
        (e.key === "r" || e.key === "R") &&
        searchInputEl &&
        document.activeElement !== searchInputEl
      ) {
        e.preventDefault();
        if (randomBtn) randomBtn.click();
      }
      if (
        e.key === "Escape" &&
        apiModal &&
        apiModal.classList.contains("active")
      ) {
        apiModal.classList.remove("active");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
