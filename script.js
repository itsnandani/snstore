(function () {
  "use strict";

  // Preloader Controller - Non-blocking, failsafe architecture
  let loaderHidden = false;

  function finishLoader() {
    if (loaderHidden) return;
    loaderHidden = true;

    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("hide");
    }

    if (document.body) {
      document.body.classList.add("loaded");
    }
  }

  // Maximum loader duration: 1.0s (within 0.8-1.2s target, safety max 1.5s)
  const fallbackLoaderTimer = window.setTimeout(finishLoader, 1000);

  // Once window assets finish loading, dismiss gracefully
  window.addEventListener("load", () => {
    window.setTimeout(finishLoader, 500);
  }, { once: true });

  // On any runtime error, dismiss preloader immediately so website is never stuck
  window.addEventListener("error", () => {
    finishLoader();
  }, { capture: true });

  // Premium Product-Specific Images
  // Each product has a unique visual that matches its brand and style
  const PRODUCT_IMAGES = {
    1: "images/iphone-16-pro.jpg",
    2: "images/galaxy-s25-ultra.jpg",
    3: "images/oneplus-13.jpg",
    4: "images/pixel-9-pro.jpg",
    5: "images/xiaomi-15-ultra.jpg",
    6: "images/iphone-16.jpg",
    7: "images/galaxy-z-fold.jpg",
    8: "images/oneplus-nord-5.jpg",
    9: "images/pixel-9a.jpg",
    10: "images/redmi-note-14.jpg",
    11: "images/iphone-16-pro-max.jpg",
    12: "images/galaxy-a56.jpg"
  };

  // Fallback generic premium smartphone visual
  const FALLBACK_IMAGE = "images/iphone-16-pro.jpg";

  // Brand-level references (safe fallback mapping)
  const PHONE_IMAGES = {
    Apple: PRODUCT_IMAGES[1] || FALLBACK_IMAGE,
    Samsung: PRODUCT_IMAGES[2] || FALLBACK_IMAGE,
    OnePlus: PRODUCT_IMAGES[3] || FALLBACK_IMAGE,
    Google: PRODUCT_IMAGES[4] || FALLBACK_IMAGE,
    Xiaomi: PRODUCT_IMAGES[5] || FALLBACK_IMAGE
  };

  // Official India storefront prices checked 2026-09-26. Keep unknown prices null;
  // do not infer an INR price from historical international/demo values.
  const PHONES = [
    { id: 1, brand: "Apple", name: "iPhone 16 Pro", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://www.apple.com/in/iphone/", inStock: false, rating: 4.9, reviews: 2140, specs: ["6.7\" OLED", "A18 Pro", "256GB", "48MP Triple"], hue: "blue", tag: "Bestseller", desc: "Titanium frame, A18 Pro silicon and a camera system built for low light. The most refined iPhone yet.", image: PRODUCT_IMAGES[1] || PHONE_IMAGES.Apple },
    { id: 2, brand: "Samsung", name: "Galaxy S25 Ultra", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://www.samsung.com/in/smartphones/galaxy-s25-ultra/", inStock: false, rating: 4.8, reviews: 1870, specs: ["6.8\" AMOLED", "Snapdragon 8 Elite", "512GB", "200MP Quad"], hue: "violet", tag: "New", desc: "S Pen built in, a 200MP main sensor, and Samsung's sharpest AMOLED panel to date.", image: PRODUCT_IMAGES[2] || PHONE_IMAGES.Samsung },
    { id: 3, brand: "OnePlus", name: "OnePlus 13", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://www.oneplus.in/oneplus-13", inStock: false, rating: 4.7, reviews: 960, specs: ["6.82\" AMOLED", "Snapdragon 8 Elite", "256GB", "50MP Hasselblad"], hue: "cyan", tag: "Fast charge", desc: "100W wired charging gets you to full in under 30 minutes. Hasselblad-tuned optics throughout.", image: PRODUCT_IMAGES[3] || PHONE_IMAGES.OnePlus },
    { id: 4, brand: "Google", name: "Pixel 9 Pro", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://store.google.com/in/config/pixel_9_pro", inStock: false, rating: 4.7, reviews: 1320, specs: ["6.3\" OLED", "Tensor G4", "256GB", "50MP + AI ISP"], hue: "green", tag: "AI camera", desc: "The cleanest Android experience, paired with computational photography nothing else matches.", image: PRODUCT_IMAGES[4] || PHONE_IMAGES.Google },
    { id: 5, brand: "Xiaomi", name: "Xiaomi 15 Ultra", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://www.mi.com/in/product/xiaomi-15-ultra/", inStock: false, rating: 4.6, reviews: 740, specs: ["6.73\" AMOLED", "Snapdragon 8 Elite", "512GB", "50MP Leica Quad"], hue: "orange", tag: "Leica optics", desc: "A Leica-co-engineered quad camera system with flagship imaging features.", image: PRODUCT_IMAGES[5] || PHONE_IMAGES.Xiaomi },
    { id: 6, brand: "Apple", name: "iPhone 16", price: 89900, originalPrice: null, currency: "INR", priceStatus: "verified", priceSource: "https://www.apple.com/in/shop/buy-iphone/iphone-16", inStock: true, rating: 4.8, reviews: 3040, specs: ["6.1\" OLED", "A18", "128GB", "48MP Dual"], hue: "blue", tag: null, desc: "Everything most people need from a flagship, in a size that still fits one hand.", image: PRODUCT_IMAGES[6] || PHONE_IMAGES.Apple },
    { id: 7, brand: "Samsung", name: "Galaxy Z Fold 6", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://www.samsung.com/in/smartphones/galaxy-z-fold6/", inStock: false, rating: 4.6, reviews: 410, specs: ["7.6\" Foldable", "Snapdragon 8 Gen 3", "512GB", "50MP Triple"], hue: "violet", tag: "Foldable", desc: "A phone that unfolds into a tablet, with a crease you'll forget about within a week.", image: PRODUCT_IMAGES[7] || PHONE_IMAGES.Samsung },
    { id: 8, brand: "OnePlus", name: "OnePlus Nord 5", price: 33999, originalPrice: null, currency: "INR", priceStatus: "verified", priceSource: "https://www.oneplus.in/oneplus-nord-5", inStock: false, rating: 4.5, reviews: 1580, specs: ["6.78\" AMOLED", "Snapdragon 8s Gen 3", "8GB RAM / 256GB", "50MP Dual"], hue: "cyan", tag: "Out of stock", desc: "A 144Hz AMOLED display, Snapdragon 8s Gen 3 and fast charging in the Nord line.", image: PRODUCT_IMAGES[8] || PHONE_IMAGES.OnePlus },
    { id: 9, brand: "Google", name: "Pixel 9a", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://store.google.com/in/config/pixel_9a", inStock: false, rating: 4.6, reviews: 890, specs: ["6.1\" OLED", "Tensor G4", "128GB", "48MP Dual"], hue: "green", tag: null, desc: "The Pixel camera experience, distilled into Google's most affordable current phone.", image: PRODUCT_IMAGES[9] || PHONE_IMAGES.Google },
    { id: 10, brand: "Xiaomi", name: "Redmi Note 14 Pro", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://www.mi.com/in/product/redmi-note-14-pro-5g/", inStock: false, rating: 4.4, reviews: 2210, specs: ["6.67\" AMOLED", "Dimensity 7300", "256GB", "200MP Main"], hue: "orange", tag: "200MP camera", desc: "A 200MP sensor and a 120Hz curved AMOLED panel.", image: PRODUCT_IMAGES[10] || PHONE_IMAGES.Xiaomi },
    { id: 11, brand: "Apple", name: "iPhone 16 Pro Max", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://www.apple.com/in/iphone/", inStock: false, rating: 4.9, reviews: 1650, specs: ["6.9\" OLED", "A18 Pro", "512GB", "48MP Triple"], hue: "blue", tag: "Top spec", desc: "The largest, most capable iPhone display ever, matched with the longest battery life.", image: PRODUCT_IMAGES[11] || PHONE_IMAGES.Apple },
    { id: 12, brand: "Samsung", name: "Galaxy A56", price: null, originalPrice: null, currency: "INR", priceStatus: "unverified", priceSource: "https://www.samsung.com/in/smartphones/galaxy-a/galaxy-a56-5g/", inStock: false, rating: 4.4, reviews: 1990, specs: ["6.7\" AMOLED", "Exynos 1580", "256GB", "50MP Triple"], hue: "violet", tag: null, desc: "Samsung's mid-range AMOLED smartphone.", image: PRODUCT_IMAGES[12] || PHONE_IMAGES.Samsung }
  ];

  const SHOWCASE = { apple: 6, samsung: 2, oneplus: 8, pixel: 4, xiaomi: 5 };

  const WHY = [
    { icon: "shield", title: "Genuine warranty", text: "Every phone ships sealed with full manufacturer warranty, honored in-store." },
    { icon: "truck", title: "Same-day delivery", text: "Order before 4pm and get it delivered to your door the same evening." },
    { icon: "repeat", title: "7-day easy returns", text: "Changed your mind? Return it unused within a week, no questions asked." },
    { icon: "headset", title: "Real human support", text: "Talk to an actual phone expert, not a chatbot script, whenever you need." }
  ];

  const BRAND_TILES = [
    { name: "Apple", sub: "iPhone" },
    { name: "Samsung", sub: "Galaxy" },
    { name: "OnePlus", sub: "Nord & Pro" },
    { name: "Google", sub: "Pixel" },
    { name: "Xiaomi", sub: "Redmi & Mi" }
  ];

  const OFFERS = [
    { tag: "Trade-in", title: "Trade in your current phone", desc: "Ask our team about trade-in options on selected devices.", hrs: 14, min: 32 },
    { tag: "Accessories", title: "Explore compatible accessories", desc: "Contact our team for accessory compatibility and availability.", hrs: 36, min: 5 },
    { tag: "Student support", title: "Student purchase support", desc: "Contact our team for current purchase information.", hrs: 60, min: 47 }
  ];

  const REVIEWS = [
    { name: "Ariana K.", loc: "Kolkata", text: "Ordered the S25 Ultra online and had it same evening. Genuinely the smoothest phone-buying experience I've had.", rating: 5 },
    { name: "Devraj S.", loc: "Bengaluru", text: "The showcase tool on the site actually helped me decide between the Pixel and OnePlus. Ended up loving the Pixel camera.", rating: 5 },
    { name: "Meher P.", loc: "Kolkata", text: "The staff let me compare three phones side by side before buying.", rating: 4 },
    { name: "Rohan T.", loc: "Delhi", text: "WhatsApp ordering is such a nice touch — no account creation, just chat and confirm.", rating: 5 },
    { name: "Ishita N.", loc: "Pune", text: "Return process was painless when I swapped my Xiaomi for the iPhone. Would buy here again.", rating: 4 },
    { name: "Kabir M.", loc: "Kolkata", text: "Staff actually knew the specs cold, didn't just read off a card. Appreciated the honesty about trade-offs.", rating: 5 }
  ];

  const WHATSAPP_NUMBER = "919876543210";
  const SPIN_WHEEL_STORAGE_KEY = "sn_store_daily_wheel_v1";
  const SPIN_WHEEL_SOUND_STORAGE_KEY = "sn_store_spin_sound_muted_v1";
  const SPIN_WHEEL_SEGMENTS = [5, 10, 15, 20, 25, 0];
  let sessionWheelRecord = null;
  let cart = [];

  try {
    const saved = localStorage.getItem("mh_cart");
    if (saved) cart = JSON.parse(saved);
  } catch (error) {
    cart = [];
  }

  let activeBrandFilter = "all";
  const pricedProducts = PHONES.filter((phone) => Number.isFinite(phone.price));
  const maxVerifiedPrice = Math.max(...pricedProducts.map((phone) => phone.price));
  let maxPrice = maxVerifiedPrice;
  let activeShowcase = "apple";
  let modalQty = 1;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  });
  const fmt = (value) => Number.isFinite(value) ? currencyFormatter.format(value) : "Price unavailable";
  const stars = (rating) => {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };
  const escapeHtml = (value) => {
    const div = document.createElement("div");
    div.textContent = String(value);
    return div.innerHTML;
  };

  function saveCart() {
    try {
      localStorage.setItem("mh_cart", JSON.stringify(cart));
    } catch (error) {
      // ignore
    }
  }

  function setNoScroll(isLocked) {
    document.body.classList.toggle("no-scroll", isLocked);
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function renderProducts() {
    const grid = document.getElementById("productGrid");
    const empty = document.getElementById("noResults");
    if (!grid) return;

    const searchValue = document.getElementById("searchInput")?.value?.trim().toLowerCase() || "";
    const list = PHONES.filter((phone) => {
      const brandOK = activeBrandFilter === "all" || phone.brand === activeBrandFilter;
      const priceOK = phone.price === null ? maxPrice >= maxVerifiedPrice : phone.price <= maxPrice;
      const queryOK = !searchValue || phone.name.toLowerCase().includes(searchValue) || phone.brand.toLowerCase().includes(searchValue);
      return brandOK && priceOK && queryOK;
    });

    empty.hidden = list.length !== 0;

    grid.innerHTML = list.map((phone) => `
      <article class="product-card" data-id="${phone.id}">
        ${phone.tag ? `<span class="card-badge">${phone.tag}</span>` : ""}
        <div class="card-thumb">
          <div class="device-frame thumb-device">
            <img class="device-visual" src="${phone.image}" alt="${phone.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';" />
          </div>
        </div>
        <p class="card-brand">${phone.brand}</p>
        <h3 class="card-name">${phone.name}</h3>
        <div class="card-rating">
          <span class="stars">${stars(phone.rating)}</span>
          <span class="rating-num">${phone.rating} (${phone.reviews})</span>
        </div>
        <div class="card-specs">
          ${phone.specs.slice(0, 3).map((spec) => `<span class="spec-tag">${spec}</span>`).join("")}
        </div>
        <div class="card-price-row">
          <span class="${Number.isFinite(phone.price) ? "price-now" : "price-unavailable"}">${fmt(phone.price)}</span>
        </div>
        <button type="button" class="emi-trigger" data-emi="${phone.id}">Calculate EMI</button>
        <div class="card-actions">
          <button type="button" class="btn btn-view" data-view="${phone.id}">Details</button>
          <button type="button" class="btn btn-cart" ${Number.isFinite(phone.price) && phone.inStock ? `data-add="${phone.id}"` : "disabled"}>${phone.inStock ? "Add to cart" : phone.priceStatus === "verified" ? "Out of stock" : "Price unavailable"}</button>
        </div>
      </article>
    `).join("");

    $$("[data-view]", grid).forEach((button) => {
      button.addEventListener("click", () => openModal(Number(button.dataset.view)));
    });

    $$('[data-emi]', grid).forEach((button) => {
      button.addEventListener("click", () => openEmiCalculator(Number(button.dataset.emi), button));
    });

    $$("[data-add]", grid).forEach((button) => {
      button.addEventListener("click", () => {
        addToCart(Number(button.dataset.add), 1);
        button.style.transform = "scale(0.96)";
        setTimeout(() => button.style.transform = "", 150);
      });
    });
  }

  function renderSearchResults(query) {
    const results = document.getElementById("searchResults");
    if (!results) return;

    const term = String(query || "").trim().toLowerCase();
    if (!term) {
      results.innerHTML = "";
      return;
    }

    const matches = PHONES.filter((phone) => {
      return phone.name.toLowerCase().includes(term) || phone.brand.toLowerCase().includes(term);
    }).slice(0, 6);

    if (!matches.length) {
      results.innerHTML = `<p class="search-empty">No phones found for "${escapeHtml(query)}"</p>`;
      return;
    }

    results.innerHTML = matches.map((phone) => `
      <div class="search-result" data-id="${phone.id}">
        <div>
          <p class="sr-name">${phone.name}</p>
          <p class="sr-brand">${phone.brand}</p>
        </div>
        <span class="sr-price">${fmt(phone.price)}</span>
      </div>
    `).join("");

    $$(".search-result", results).forEach((item) => {
      item.addEventListener("click", () => {
        openModal(Number(item.dataset.id));
        closeSearch();
      });
    });
  }

  function openSearch() {
    const panel = document.getElementById("searchPanel");
    const input = document.getElementById("searchInput");
    if (!panel) return;
    panel.classList.add("open");
    if (input) setTimeout(() => input.focus(), 180);
  }

  function closeSearch() {
    const panel = document.getElementById("searchPanel");
    if (panel) panel.classList.remove("open");
  }

  function openCart() {
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("cartBackdrop");
    if (!drawer || !backdrop) return;
    drawer.classList.add("open");
    backdrop.classList.add("open");
    setNoScroll(true);
  }

  function closeCart() {
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("cartBackdrop");
    if (!drawer || !backdrop) return;
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    setNoScroll(false);
  }

  function setupSearch() {
    const toggle = document.getElementById("searchToggle");
    const close = document.getElementById("searchClose");
    const input = document.getElementById("searchInput");

    toggle?.addEventListener("click", () => {
      const panel = document.getElementById("searchPanel");
      panel?.classList.contains("open") ? closeSearch() : openSearch();
    });

    close?.addEventListener("click", closeSearch);
    input?.addEventListener("input", (event) => renderSearchResults(event.target.value));
  }

  function setupMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("mobileMenu");
    const backdrop = document.getElementById("mobileBackdrop");

    const openMenu = () => {
      menu?.classList.add("open");
      backdrop?.classList.add("open");
      toggle?.classList.add("open");
      setNoScroll(true);
    };

    const closeMenu = () => {
      menu?.classList.remove("open");
      backdrop?.classList.remove("open");
      toggle?.classList.remove("open");
      setNoScroll(false);
    };

    toggle?.addEventListener("click", () => {
      menu?.classList.contains("open") ? closeMenu() : openMenu();
    });

    backdrop?.addEventListener("click", closeMenu);
    $$(".mobile-link").forEach((link) => link.addEventListener("click", closeMenu));
  }

  function renderShowcase(model) {
    const productId = SHOWCASE[model] || SHOWCASE.apple;
    const data = PHONES.find((phone) => phone.id === productId) || PHONES[5];
    activeShowcase = model;

    const showcasePhone = document.getElementById("showcasePhone");
    const showcaseInfo = document.getElementById("showcaseInfo");
    const buttons = document.querySelectorAll(".brand-btn");

    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.model === model);
    });

    if (showcasePhone) {
      const image = showcasePhone.querySelector(".device-visual");
      if (image) {
        image.style.opacity = "0";
        image.style.transform = "scale(0.94) translateY(6px)";
        setTimeout(() => {
          image.onerror = () => { image.src = FALLBACK_IMAGE; };
          image.src = data.image || FALLBACK_IMAGE;
          image.alt = data.name;
          image.style.transition = "opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
          image.style.opacity = "1";
          image.style.transform = "scale(1) translateY(0)";
        }, 100);
      }
    }

    if (showcaseInfo) {
      showcaseInfo.innerHTML = `
        <p class="si-brand">${data.brand}</p>
        <h3 class="si-name">${data.name}</h3>
        <p class="si-price">${fmt(data.price)}</p>
        <div class="si-specs">
          ${Object.entries(data.specs).map(([key, value]) => `
            <div class="si-spec">
              <div class="si-spec-label">${key}</div>
              <div class="si-spec-val">${value}</div>
            </div>
          `).join("")}
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-primary" id="showcaseAddBtn" ${Number.isFinite(data.price) && data.inStock ? "" : "disabled"}>
            <span>${data.inStock ? "Add to cart" : data.priceStatus === "verified" ? "Out of stock" : "Price unavailable"}</span>
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      `;

      document.getElementById("showcaseAddBtn")?.addEventListener("click", () => {
        if (Number.isFinite(data.price) && data.inStock) addToCart(data.id, 1);
      });
    }
  }

  function populateBrandStrip() {
    const strip = document.getElementById("brandStrip");
    if (!strip) return;
    strip.innerHTML = BRAND_TILES.map((brand) => `
      <div class="brand-tile">
        <span class="brand-name">${brand.name}</span>
        <span class="brand-sub">${brand.sub}</span>
      </div>
    `).join("");
  }

  function populateOffers() {
    const container = document.getElementById("offerGrid");
    if (!container) return;
    const offerImages = [
      PRODUCT_IMAGES[11] || "images/iphone-16-pro-max.jpg",
      PRODUCT_IMAGES[2] || "images/galaxy-s25-ultra.jpg",
      PRODUCT_IMAGES[3] || "images/oneplus-13.jpg"
    ];
    container.innerHTML = OFFERS.map((offer, index) => {
      const image = offerImages[index % offerImages.length] || FALLBACK_IMAGE;
      return `
        <div class="offer-card">
          <span class="offer-tag">${offer.tag}</span>
          <div class="offer-visual">
            <img class="device-visual" src="${image}" alt="${offer.title}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';" />
          </div>
          <h3 class="offer-title">${offer.title}</h3>
          <p class="offer-desc">${offer.desc}</p>
          <div class="offer-timer" data-hours="${offer.hrs}" data-minutes="${offer.min}">
            <div><strong class="oh">${String(offer.hrs).padStart(2, "0")}</strong><span>HRS</span></div>
            <div><strong class="om">${String(offer.min).padStart(2, "0")}</strong><span>MIN</span></div>
            <div><strong class="os">00</strong><span>SEC</span></div>
          </div>
          <a href="#featured" class="btn btn-primary offer-cta">
            <span>Claim Offer</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
          </a>
        </div>
      `;
    }).join("");
  }

  function tickOfferTimers() {
    document.querySelectorAll(".offer-timer").forEach((timer) => {
      let hrs = Number(timer.dataset.hours || 0);
      let mins = Number(timer.dataset.minutes || 0);
      let secs = 59;

      if (timer._state) {
        hrs = timer._state.hrs;
        mins = timer._state.mins;
        secs = timer._state.secs;
      }

      secs -= 1;
      if (secs < 0) {
        secs = 59;
        mins -= 1;
      }
      if (mins < 0) {
        mins = 59;
        hrs -= 1;
      }
      if (hrs < 0) {
        hrs = 23;
        mins = 59;
        secs = 59;
      }

      timer._state = { hrs, mins, secs };
      timer.dataset.hours = String(hrs);
      timer.dataset.minutes = String(mins);
      timer.querySelector(".oh").textContent = String(hrs).padStart(2, "0");
      timer.querySelector(".om").textContent = String(mins).padStart(2, "0");
      timer.querySelector(".os").textContent = String(secs).padStart(2, "0");
    });
  }

  function populateWhySection() {
    const container = document.getElementById("whyGrid");
    if (!container) return;

    const icons = {
      shield: '<svg viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z"/></svg>',
      truck: '<svg viewBox="0 0 24 24"><path d="M1 6h12v9H1zM13 9h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
      repeat: '<svg viewBox="0 0 24 24"><path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
      headset: '<svg viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/></svg>'
    };

    container.innerHTML = WHY.map((item) => `
      <div class="why-card">
        <div class="why-icon">${icons[item.icon]}</div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    `).join("");
  }

  function populateReviews() {
    const container = document.getElementById("reviewTrack");
    if (!container) return;

    const markup = [...REVIEWS, ...REVIEWS].map((review) => `
      <div class="review-card">
        <div class="review-stars">${stars(review.rating)}</div>
        <p class="review-text">"${review.text}"</p>
        <div class="review-person">
          <div class="review-avatar">${review.name.split(" ").map((part) => part[0]).join("")}</div>
          <div>
            <p class="review-name">${review.name}</p>
            <p class="review-loc">${review.loc}</p>
          </div>
        </div>
      </div>
    `).join("");

    container.innerHTML = markup;
  }

  function openModal(productId) {
    const product = PHONES.find((phone) => phone.id === productId);
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalBody = document.getElementById("modalBody");
    if (!product || !modalBackdrop || !modalBody) return;

    modalQty = 1;
    modalBody.innerHTML = `
      <div class="modal-thumb">
        <div class="device-frame thumb-device">
          <img class="device-visual" src="${product.image || FALLBACK_IMAGE}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';" />
        </div>
      </div>
      <div class="modal-details">
        <p class="modal-brand">${product.brand}</p>
        <h2 class="modal-name">${product.name}</h2>
        <div class="modal-rating">
          <span class="stars">${stars(product.rating)}</span>
          <span class="rating-num">${product.rating} · ${product.reviews} reviews</span>
        </div>
        <div class="modal-price-row">
          <span class="${Number.isFinite(product.price) ? "price-now" : "price-unavailable"}">${fmt(product.price)}</span>
        </div>
        <button type="button" class="emi-trigger modal-emi-trigger" data-emi="${product.id}">Calculate EMI</button>
        <p class="modal-desc">${product.desc}</p>
        <div class="modal-spec-grid">
          ${product.specs.map((spec) => `
            <div class="si-spec">
              <div class="si-spec-label">Spec</div>
              <div class="si-spec-val">${spec}</div>
            </div>
          `).join("")}
        </div>
        ${Number.isFinite(product.price) && product.inStock ? `<div class="modal-qty">
          <button type="button" class="qty-btn" id="qtyMinus">−</button>
          <span class="qty-num" id="qtyNum">1</span>
          <button type="button" class="qty-btn" id="qtyPlus">+</button>
        </div>` : ""}
        <div class="modal-actions">
          ${Number.isFinite(product.price) && product.inStock ? `<button type="button" class="btn btn-cart" id="modalAddCart">Add to cart</button>
          <a class="btn btn-whatsapp" id="modalWhatsapp" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 5.54-13.58ZM12.06 18.4h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.66.67-2.44-.16-.25a6.62 6.62 0 0 1 10.3-8.21 6.57 6.57 0 0 1 1.94 4.68 6.64 6.64 0 0 1-6.64 6.62Zm3.63-4.96c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.51.64-.62.77-.11.13-.23.14-.43.05a5.4 5.4 0 0 1-1.6-.98 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.09-.4.09-.1.2-.23.3-.35.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.25-.18.2-.68.67-.68 1.63 0 .96.7 1.9.8 2.03.1.13 1.37 2.1 3.33 2.94.46.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.09-.18-.14-.38-.24Z"/></svg>
            <span>Order now</span>
          </a>` : `<button type="button" class="btn btn-cart" disabled>${product.priceStatus === "verified" ? "Out of stock" : "Price unavailable"}</button>`}
        </div>
      </div>
    `;

    document.getElementById("qtyMinus")?.addEventListener("click", () => {
      modalQty = Math.max(1, modalQty - 1);
      const qtyNum = document.getElementById("qtyNum");
      if (qtyNum) qtyNum.textContent = String(modalQty);
    });

    document.getElementById("qtyPlus")?.addEventListener("click", () => {
      modalQty = Math.min(10, modalQty + 1);
      const qtyNum = document.getElementById("qtyNum");
      if (qtyNum) qtyNum.textContent = String(modalQty);
    });

    document.getElementById("modalAddCart")?.addEventListener("click", () => {
      addToCart(product.id, modalQty);
      closeModal();
    });

    const whatsappLink = document.getElementById("modalWhatsapp");
    if (whatsappLink) {
      const text = encodeURIComponent(`Hi SN STORE! I'd like to order: ${product.name} x${modalQty} (${fmt(product.price * modalQty)}). Is it in stock?`);
      whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    }

    modalBody.querySelector("[data-emi]")?.addEventListener("click", (event) => openEmiCalculator(product.id, event.currentTarget));

    modalBackdrop.classList.add("open");
    setNoScroll(true);
  }

  function closeModal() {
    const modalBackdrop = document.getElementById("modalBackdrop");
    modalBackdrop?.classList.remove("open");
    setNoScroll(false);
  }

  function openEmiCalculator(productId, trigger) {
    const product = PHONES.find((phone) => phone.id === productId);
    const backdrop = document.getElementById("emiBackdrop");
    const dialog = backdrop?.querySelector(".emi-dialog");
    const closeButton = document.getElementById("emiClose");
    const productName = document.getElementById("emiProductName");
    const tenureInput = document.getElementById("emiTenure");
    const rateInput = document.getElementById("emiRate");
    const unavailable = document.getElementById("emiUnavailable");
    const priceOutput = document.getElementById("emiPrice");
    const tenureOutput = document.getElementById("emiSelectedTenure");
    const rateOutput = document.getElementById("emiSelectedRate");
    const monthlyOutput = document.getElementById("emiMonthly");
    const totalOutput = document.getElementById("emiTotal");
    if (!product || !backdrop || !dialog || !tenureInput || !rateInput) return;

    const hasPrice = Number.isFinite(product.price) && product.price > 0;
    productName.textContent = product.name;
    priceOutput.textContent = fmt(product.price);
    tenureInput.value = "12";
    rateInput.value = "0";
    unavailable.hidden = hasPrice;
    tenureInput.disabled = !hasPrice;
    rateInput.disabled = !hasPrice;

    function updateEmi() {
      const months = Number(tenureInput.value);
      const annualRate = Math.min(60, Math.max(0, Number(rateInput.value) || 0));
      const monthlyRate = annualRate / 1200;
      const monthlyPayment = monthlyRate === 0
        ? product.price / months
        : product.price * monthlyRate * Math.pow(1 + monthlyRate, months) /
        (Math.pow(1 + monthlyRate, months) - 1);
      tenureOutput.textContent = `${months} months`;
      rateOutput.textContent = `${Number(annualRate.toFixed(2))}% p.a.`;
      monthlyOutput.textContent = hasPrice ? fmt(monthlyPayment) : "—";
      totalOutput.textContent = hasPrice ? fmt(monthlyPayment * months) : "—";
    }

    tenureInput.onchange = updateEmi;
    rateInput.oninput = updateEmi;
    updateEmi();
    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden", "false");
    setNoScroll(true);
    closeButton?.focus();

    const close = () => {
      backdrop.classList.remove("open");
      backdrop.setAttribute("aria-hidden", "true");
      setNoScroll(Boolean(document.querySelector(".modal-backdrop.open, .cart-drawer.open")));
      trigger?.focus();
    };

    closeButton.onclick = close;
    backdrop.onclick = (event) => {
      if (event.target === backdrop) close();
    };
  }

  function setupModalControls() {
    const modalClose = document.getElementById("modalClose");
    const modalBackdrop = document.getElementById("modalBackdrop");
    modalClose?.addEventListener("click", closeModal);
    modalBackdrop?.addEventListener("click", (event) => {
      if (event.target === modalBackdrop) closeModal();
    });
  }

  function addToCart(productId, quantity) {
    const product = PHONES.find((phone) => phone.id === productId);
    if (!product || !Number.isFinite(product.price) || !product.inStock) return;

    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.qty += quantity;
    } else {
      cart.push({ id: productId, qty: quantity });
    }

    saveCart();
    renderCart();
    showToast(`${product.name} added to cart`);
    openCart();
  }

  function updateCartItem(productId, delta) {
    const item = cart.find((entry) => entry.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((entry) => entry.id !== productId);
    }

    saveCart();
    renderCart();
  }

  function removeCartItem(productId) {
    cart = cart.filter((entry) => entry.id !== productId);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartFooter = document.getElementById("cartFooter");
    const cartCount = document.getElementById("cartCount");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const cartWhatsapp = document.getElementById("cartWhatsapp");

    if (!cartItems || !cartCount || !cartSubtotal || !cartEmpty || !cartFooter) return;

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = String(totalItems);
    cartCount.style.display = totalItems > 0 ? "inline-flex" : "none";

    if (!cart.length) {
      cartItems.innerHTML = "";
      cartEmpty.style.display = "flex";
      cartFooter.style.display = "none";
      cartSubtotal.textContent = fmt(0);
      cartWhatsapp.href = "#";
      return;
    }

    cart = cart.filter((entry) => {
      const product = PHONES.find((phone) => phone.id === entry.id);
      return product && Number.isFinite(product.price) && product.inStock;
    });
    if (!cart.length) {
      saveCart();
      renderCart();
      return;
    }

    cartEmpty.style.display = "none";
    cartFooter.style.display = "flex";

    let subtotal = 0;
    cartItems.innerHTML = cart.map((entry) => {
      const product = PHONES.find((phone) => phone.id === entry.id);
      if (!product) return "";
      subtotal += product.price * entry.qty;
      return `
        <div class="cart-item" data-id="${product.id}">
          <div class="ci-thumb">
            <div class="device-frame thumb-device">
              <img class="device-visual" src="${product.image || FALLBACK_IMAGE}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';" />
            </div>
          </div>
          <div class="ci-copy">
            <p class="ci-name">${product.name}</p>
            <p class="ci-price">${fmt(product.price)}</p>
            <div class="ci-qty">
              <button type="button" data-dec="${product.id}">−</button>
              <span>${entry.qty}</span>
              <button type="button" data-inc="${product.id}">+</button>
            </div>
          </div>
          <button type="button" class="ci-remove" data-remove="${product.id}">Remove</button>
        </div>
      `;
    }).join("");

    cartSubtotal.textContent = fmt(subtotal);

    const lines = cart.map((entry) => {
      const product = PHONES.find((phone) => phone.id === entry.id);
      return product ? `${product.name} x${entry.qty} (${fmt(product.price * entry.qty)})` : "";
    }).filter(Boolean).join("\n");

    const message = encodeURIComponent(`Hi SN STORE! I'd like to order:\n${lines}\n\nTotal: ${fmt(subtotal)}`);
    cartWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    $$("[data-inc]", cartItems).forEach((button) => {
      button.addEventListener("click", () => updateCartItem(Number(button.dataset.inc), 1));
    });

    $$("[data-dec]", cartItems).forEach((button) => {
      button.addEventListener("click", () => updateCartItem(Number(button.dataset.dec), -1));
    });

    $$("[data-remove]", cartItems).forEach((button) => {
      button.addEventListener("click", () => removeCartItem(Number(button.dataset.remove)));
    });
  }

  function setupCart() {
    const cartToggle = document.getElementById("cartToggle");
    const cartClose = document.getElementById("cartClose");
    const cartBackdrop = document.getElementById("cartBackdrop");

    cartToggle?.addEventListener("click", openCart);
    cartClose?.addEventListener("click", closeCart);
    cartBackdrop?.addEventListener("click", closeCart);
  }

  function setupSpinWheel() {
    const launcher = document.getElementById("spinWheelLauncher");
    const backdrop = document.getElementById("spinWheelBackdrop");
    const dialog = backdrop?.querySelector(".spin-wheel-dialog");
    const closeButton = document.getElementById("spinWheelClose");
    const spinButton = document.getElementById("spinWheelButton");
    const soundButton = document.getElementById("spinWheelSound");
    const wheel = document.getElementById("discountWheel");
    const result = document.getElementById("spinWheelResult");
    const status = document.getElementById("spinWheelStatus");
    const resultTitle = document.getElementById("spinWheelResultTitle");
    const resultCopy = document.getElementById("spinWheelResultCopy");
    const coupon = document.getElementById("spinWheelCoupon");
    const couponCode = document.getElementById("spinWheelCouponCode");
    const copyButton = document.getElementById("spinWheelCopy");
    const shopButton = document.getElementById("spinWheelShop");

    if (!launcher || !backdrop || !dialog || !spinButton || !wheel || !result || !status) return;

    let activeRecord = null;
    let spinTimeout = 0;
    let soundEnabled = true;
    let audioContext = null;
    let spinInProgress = false;
    let spinSoundActive = false;
    let audioFrame = 0;
    let previousWheelAngle = null;
    let unwrappedWheelAngle = 0;
    let lastTickSegment = 0;

    try {
      soundEnabled = localStorage.getItem(SPIN_WHEEL_SOUND_STORAGE_KEY) !== "muted";
    } catch (error) {
      soundEnabled = true;
    }

    function updateSoundButton() {
      if (!soundButton) return;
      const label = soundEnabled ? "Mute spin sound" : "Unmute spin sound";
      soundButton.classList.toggle("is-muted", !soundEnabled);
      soundButton.setAttribute("aria-label", label);
      soundButton.setAttribute("aria-pressed", String(soundEnabled));
      soundButton.title = label;
    }

    function getAudioContext() {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) return null;
      if (!audioContext) audioContext = new AudioContextConstructor();
      if (audioContext.state === "suspended") {
        const resumeResult = audioContext.resume();
        resumeResult?.catch(() => { });
      }
      return audioContext;
    }

    function playTick() {
      if (!soundEnabled || !spinSoundActive) return;
      const context = getAudioContext();
      if (!context) return;
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      const now = context.currentTime;
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(1750 + Math.random() * 300, now);
      envelope.gain.setValueAtTime(0.0001, now);
      envelope.gain.exponentialRampToValueAtTime(0.035, now + 0.003);
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);
      oscillator.connect(envelope);
      envelope.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.03);
    }

    function playSpinFinish() {
      if (!soundEnabled) return;
      const context = getAudioContext();
      if (!context) return;
      const now = context.currentTime;
      [[880, 0.026, 0.48], [1320, 0.012, 0.32]].forEach(([frequency, volume, duration]) => {
        const oscillator = context.createOscillator();
        const envelope = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, now);
        envelope.gain.setValueAtTime(0.0001, now);
        envelope.gain.exponentialRampToValueAtTime(volume, now + 0.012);
        envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        oscillator.connect(envelope);
        envelope.connect(context.destination);
        oscillator.start(now);
        oscillator.stop(now + duration + 0.01);
      });
    }

    function readWheelAngle() {
      const transform = window.getComputedStyle(wheel).transform;
      if (!transform || transform === "none") return 0;
      if (window.DOMMatrixReadOnly) {
        const matrix = new DOMMatrixReadOnly(transform);
        return (Math.atan2(matrix.b, matrix.a) * 180 / Math.PI + 360) % 360;
      }
      const values = transform.match(/^matrix\(([^)]+)\)$/)?.[1].split(",").map(Number);
      if (!values || values.length < 2) return 0;
      return (Math.atan2(values[1], values[0]) * 180 / Math.PI + 360) % 360;
    }

    function sampleWheelSound() {
      if (!spinSoundActive || !soundEnabled) return;
      const angle = readWheelAngle();
      if (previousWheelAngle === null) {
        previousWheelAngle = angle;
      } else {
        const delta = (angle - previousWheelAngle + 360) % 360;
        if (delta < 180) {
          unwrappedWheelAngle += delta;
          const crossedSegment = Math.floor(unwrappedWheelAngle / 60);
          while (lastTickSegment < crossedSegment) {
            lastTickSegment += 1;
            playTick();
          }
        }
        previousWheelAngle = angle;
      }
      audioFrame = window.requestAnimationFrame(sampleWheelSound);
    }

    function startSpinSound() {
      if (!soundEnabled || !getAudioContext()) return;
      spinSoundActive = true;
      previousWheelAngle = null;
      unwrappedWheelAngle = 0;
      lastTickSegment = 0;
      audioFrame = window.requestAnimationFrame(sampleWheelSound);
    }

    function stopSpinSound(playFinish) {
      spinSoundActive = false;
      if (audioFrame) window.cancelAnimationFrame(audioFrame);
      audioFrame = 0;
      previousWheelAngle = null;
      if (playFinish) playSpinFinish();
    }

    function todayKey() {
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${date.getFullYear()}-${month}-${day}`;
    }

    function getTodayRecord() {
      const today = todayKey();
      if (sessionWheelRecord?.date === today) return sessionWheelRecord;
      try {
        const saved = JSON.parse(localStorage.getItem(SPIN_WHEEL_STORAGE_KEY) || "null");
        if (saved?.date === today && Number.isInteger(saved.segmentIndex)) {
          sessionWheelRecord = saved;
          return saved;
        }
      } catch (error) {
        return null;
      }
      return null;
    }

    function saveTodayRecord(record) {
      sessionWheelRecord = record;
      try {
        localStorage.setItem(SPIN_WHEEL_STORAGE_KEY, JSON.stringify(record));
      } catch (error) {
        showToast("Your result is saved for this visit.");
      }
    }

    function wheelAngleFor(index) {
      return (360 - index * 60) % 360;
    }

    function couponCodeFor(discount) {
      const bytes = new Uint8Array(4);
      window.crypto.getRandomValues(bytes);
      const suffix = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
      return `SN${discount}-${suffix}`;
    }

    function displayResult(record) {
      activeRecord = record;
      const discount = SPIN_WHEEL_SEGMENTS[record.segmentIndex] || 0;
      result.hidden = false;
      spinButton.hidden = true;
      status.textContent = "Your daily spin is used. Come back tomorrow for another.";
      resultTitle.textContent = discount ? `${discount}% OFF` : "Better luck next time";
      resultCopy.textContent = discount
        ? "Your one-day coupon is ready. Copy it before you shop."
        : "No coupon this time. You can try again tomorrow.";
      coupon.hidden = !record.couponCode;
      couponCode.textContent = record.couponCode || "";
    }

    function restoreWheel(record) {
      wheel.style.transition = "none";
      wheel.style.transform = `rotate(${wheelAngleFor(record.segmentIndex)}deg)`;
      void wheel.offsetWidth;
      wheel.style.removeProperty("transition");
    }

    function openWheel() {
      const saved = getTodayRecord();
      result.hidden = true;
      spinButton.hidden = false;
      spinButton.disabled = false;
      spinButton.textContent = "SPIN THE WHEEL";
      activeRecord = null;
      if (saved) {
        restoreWheel(saved);
        displayResult(saved);
      } else {
        wheel.style.transition = "none";
        wheel.style.transform = "rotate(0deg)";
        void wheel.offsetWidth;
        wheel.style.removeProperty("transition");
        status.textContent = "One spin per day. See what you land on.";
      }
      backdrop.classList.add("open");
      backdrop.setAttribute("aria-hidden", "false");
      setNoScroll(true);
      closeButton?.focus();
    }

    function closeWheel() {
      backdrop.classList.remove("open");
      backdrop.setAttribute("aria-hidden", "true");
      const anotherOverlayOpen = document.querySelector(".modal-backdrop.open, .cart-drawer.open");
      setNoScroll(Boolean(anotherOverlayOpen));
      launcher.focus();
    }

    function finishSpin(record) {
      if (!spinInProgress) return;
      spinInProgress = false;
      window.clearTimeout(spinTimeout);
      spinTimeout = 0;
      stopSpinSound(true);
      spinButton.disabled = false;
      displayResult(record);
    }

    function startSpin() {
      if (spinButton.disabled) return;
      const saved = getTodayRecord();
      if (saved) {
        restoreWheel(saved);
        displayResult(saved);
        return;
      }

      const random = new Uint32Array(1);
      window.crypto.getRandomValues(random);
      const segmentIndex = random[0] % SPIN_WHEEL_SEGMENTS.length;
      const discount = SPIN_WHEEL_SEGMENTS[segmentIndex];
      const record = {
        date: todayKey(),
        segmentIndex,
        discount,
        couponCode: discount ? couponCodeFor(discount) : ""
      };
      saveTodayRecord(record);
      spinButton.disabled = true;
      spinButton.textContent = "SPINNING...";
      status.textContent = "The wheel is in motion. Good luck.";
      result.hidden = true;
      spinInProgress = true;
      startSpinSound();

      const finalRotation = 360 * 7 + wheelAngleFor(segmentIndex);
      wheel.addEventListener("transitionend", (event) => {
        if (event.target === wheel) finishSpin(record);
      }, { once: true });
      wheel.style.transform = `rotate(${finalRotation}deg)`;
      spinTimeout = window.setTimeout(() => finishSpin(record), 6600);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.setTimeout(() => finishSpin(record), 40);
      }
    }

    async function copyCoupon() {
      const code = activeRecord?.couponCode;
      if (!code || !copyButton) return;
      let copied = false;
      try {
        await navigator.clipboard.writeText(code);
        copied = true;
      } catch (error) {
        const field = document.createElement("textarea");
        field.value = code;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        copied = document.execCommand("copy");
        field.remove();
      }
      if (copied) {
        copyButton.textContent = "Copied";
        showToast("Coupon copied.");
        window.setTimeout(() => { copyButton.textContent = "Copy Coupon"; }, 1800);
      }
    }

    launcher.addEventListener("click", openWheel);
    closeButton?.addEventListener("click", closeWheel);
    soundButton?.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      updateSoundButton();
      try {
        localStorage.setItem(SPIN_WHEEL_SOUND_STORAGE_KEY, soundEnabled ? "on" : "muted");
      } catch (error) {
        // Keep the current preference for this visit when storage is unavailable.
      }
      if (!soundEnabled) {
        stopSpinSound(false);
      } else if (spinInProgress) {
        startSpinSound();
      }
    });
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) closeWheel();
    });
    spinButton.addEventListener("click", startSpin);
    copyButton?.addEventListener("click", copyCoupon);
    shopButton?.addEventListener("click", closeWheel);
    updateSoundButton();
  }

  function setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-chip");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((chip) => chip.classList.remove("active"));
        button.classList.add("active");
        activeBrandFilter = button.dataset.brand || "all";
        renderProducts();
      });
    });

    if (priceRange && priceValue) {
      const knownPrices = PHONES.filter((phone) => Number.isFinite(phone.price)).map((phone) => phone.price);
      const minimum = Math.min(...knownPrices);
      const maximum = Math.max(...knownPrices);
      priceRange.min = String(minimum);
      priceRange.max = String(maximum);
      priceRange.step = "1";
      priceRange.value = String(maximum);
      maxPrice = maximum;
      priceValue.textContent = fmt(maximum);
      priceRange.addEventListener("input", (event) => {
        maxPrice = Number(event.target.value);
        priceValue.textContent = fmt(maxPrice);
        renderProducts();
      });
    }

    document.querySelectorAll(".brand-btn").forEach((button) => {
      button.addEventListener("click", () => renderShowcase(button.dataset.model));
    });
  }

  function setupForms() {
    const contactForm = document.getElementById("contactForm");
    const contactNote = document.getElementById("formNote");
    const newsletterForm = document.getElementById("newsletterForm");

    contactForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (contactNote) contactNote.textContent = "Message sent — we'll reply within a few hours.";
      contactForm.reset();
      setTimeout(() => {
        if (contactNote) contactNote.textContent = "";
      }, 3500);
    });

    newsletterForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("Subscribed! Watch your inbox for drops.");
      newsletterForm.reset();
    });
  }

  function setupRevealAnimations() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    const checkVisible = () => {
      document.querySelectorAll(".reveal:not(.in-view)").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.25 && rect.bottom > -50) {
          element.classList.add("in-view");
        }
      });
    };

    window.addEventListener("scroll", checkVisible, { passive: true });
    window.addEventListener("resize", checkVisible, { passive: true });
    setTimeout(checkVisible, 250);
  }

  function setupHero3DExplodedAndParticles() {
    const stage = document.getElementById("heroStage");
    const assembly = document.getElementById("phoneAssembly");
    const toggleBtn = document.getElementById("explodeToggle");
    const toggleLabel = document.getElementById("toggleLabel");
    const pulseRing = document.getElementById("phonePulseRing");

    // All 17 Engineering Smartphone Components
    const partBackGlass = document.getElementById("partBackGlass");
    const partFrame = document.getElementById("partFrame");
    const partButtons = document.getElementById("partButtons");
    const partSpeaker = document.getElementById("partSpeaker");
    const partUsbPort = document.getElementById("partUsbPort");
    const partWirelessCoil = document.getElementById("partWirelessCoil");
    const partBattery = document.getElementById("partBattery");
    const partMotherboard = document.getElementById("partMotherboard");
    const partChip = document.getElementById("partChip");
    const partMemory = document.getElementById("partMemory");
    const partCameraHousing = document.getElementById("partCameraHousing");
    const partCameraLens1 = document.getElementById("partCameraLens1");
    const partCameraLens2 = document.getElementById("partCameraLens2");
    const partCameraLens3 = document.getElementById("partCameraLens3");
    const partDisplay = document.getElementById("partDisplay");
    const partFrontGlass = document.getElementById("partFrontGlass");
    const partReflection = document.getElementById("partReflection");

    const allParts = [
      partBackGlass, partFrame, partButtons, partSpeaker, partUsbPort,
      partWirelessCoil, partBattery, partMotherboard, partChip, partMemory,
      partCameraHousing, partCameraLens1, partCameraLens2, partCameraLens3,
      partDisplay, partFrontGlass, partReflection
    ].filter(Boolean);

    const connectors = [
      { part: partDisplay, anchorClass: "display-anchor", card: "cardDisplay", line: "lineDisplay", dot: "anchorDotDisplay" },
      { part: partCameraHousing, anchorClass: "camera-anchor", card: "cardCamera", line: "lineCamera", dot: "anchorDotCamera" },
      { part: partBattery, anchorClass: "battery-anchor", card: "cardBattery", line: "lineBattery", dot: "anchorDotBattery" },
      { part: partChip, anchorClass: "chip-anchor", card: "cardChip", line: "lineChip", dot: "anchorDotChip" }
    ].map((connector) => ({
      ...connector,
      anchor: (() => {
        if (!connector.part) return null;
        const anchor = document.createElement("span");
        anchor.className = `component-anchor ${connector.anchorClass}`;
        anchor.setAttribute("aria-hidden", "true");
        connector.part.appendChild(anchor);
        return anchor;
      })(),
      cardElement: document.getElementById(connector.card),
      lineElement: document.getElementById(connector.line),
      dotElement: document.getElementById(connector.dot)
    }));
    const connectorSvg = document.getElementById("connectorSvg");

    let isAutoAssemble = true;
    let assemblyTimeouts = [];
    let isHeroInView = true;
    let connectorFrame = 0;

    function updateConnectors() {
      if (!connectorSvg) return;
      const screenToSvg = (x, y) => {
        const point = connectorSvg.createSVGPoint();
        point.x = x;
        point.y = y;
        return point.matrixTransform(connectorSvg.getScreenCTM().inverse());
      };
      connectors.forEach(({ anchor, cardElement, lineElement, dotElement }) => {
        if (!anchor || !cardElement || !lineElement || !dotElement) return;
        const anchorRect = anchor.getBoundingClientRect();
        const cardRect = cardElement.getBoundingClientRect();
        const anchorX = anchorRect.left + anchorRect.width / 2;
        const anchorY = anchorRect.top + anchorRect.height / 2;
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const useHorizontalEdge = Math.abs(anchorX - cardCenterX) > Math.abs(anchorY - cardCenterY);
        const cardX = useHorizontalEdge ? (anchorX > cardCenterX ? cardRect.right : cardRect.left) : cardCenterX;
        const cardY = useHorizontalEdge ? cardCenterY : (anchorY > cardCenterY ? cardRect.bottom : cardRect.top);
        const start = screenToSvg(cardX, cardY);
        const end = screenToSvg(anchorX, anchorY);
        const x1 = start.x;
        const y1 = start.y;
        const x2 = end.x;
        const y2 = end.y;
        const bend = Math.max(32, Math.abs(x2 - x1) * 0.38);
        const direction = x2 >= x1 ? 1 : -1;
        lineElement.setAttribute("d", `M ${x1} ${y1} C ${x1 + bend * direction} ${y1}, ${x2 - bend * direction} ${y2}, ${x2} ${y2}`);
        dotElement.setAttribute("cx", x2);
        dotElement.setAttribute("cy", y2);
      });
    }

    function trackConnectors(duration = 950) {
      cancelAnimationFrame(connectorFrame);
      const endAt = performance.now() + duration;
      const tick = () => {
        updateConnectors();
        if (performance.now() < endAt) connectorFrame = requestAnimationFrame(tick);
      };
      connectorFrame = requestAnimationFrame(tick);
    }

    function clearTimers() {
      assemblyTimeouts.forEach((t) => clearTimeout(t));
      assemblyTimeouts = [];
    }

    function resetToExploded() {
      if (!assembly) return;
      assembly.classList.remove("is-assembled", "idle-floating");
      assembly.classList.add("is-exploded");
      assembly.style.transform = "";
      if (pulseRing) pulseRing.classList.remove("pulsing");

      allParts.forEach((part) => {
        part.classList.remove("is-docked", "snap-highlight");
      });

      trackConnectors();
    }

    function dockPart(part, duration = 300) {
      if (!part) return;
      part.classList.add("is-docked", "snap-highlight");
      trackConnectors();
      assemblyTimeouts.push(setTimeout(() => {
        part.classList.remove("snap-highlight");
      }, duration));
    }

    function highlightSpec(compName) {
      const chip = document.querySelector(`.spec-chip[data-component="${compName}"]`);
      if (chip) {
        chip.style.borderColor = "var(--cyan)";
        chip.style.boxShadow = "0 0 25px rgba(34, 211, 238, 0.65)";
        setTimeout(() => {
          chip.style.borderColor = "";
          chip.style.boxShadow = "";
        }, 850);
      }
    }

    // Exact 14-Step Precision Timeline (0.0s to 7.8s) + 3s Idle Hold
    function runAssembly() {
      if (!isAutoAssemble || !isHeroInView || !assembly) return;
      clearTimers();
      resetToExploded();

      // Precision assembly begins after the exploded state has been shown.
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partFrame, 400);
      }, 100));

      // Chassis, then the internal modules lock into place in sequence.
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partMotherboard, 400);
      }, 900));

      // STEP 3 (2.0s - 2.5s): Chip and memory snap onto motherboard
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partChip, 350);
        highlightSpec("chip");
      }, 1700));

      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partMemory, 350);
      }, 2100));

      // STEP 4 (2.5s - 3.1s): Battery slides into chassis
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partBattery, 400);
        highlightSpec("battery");
      }, 2500));

      // STEP 5 (3.1s - 3.6s): Wireless charging coil settles above battery
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partWirelessCoil, 350);
      }, 3100));

      // Camera housing and lenses settle before the smaller edge modules.
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partCameraHousing, 400);
      }, 3900));

      // STEP 8 (5.1s - 5.7s): Camera lenses individually rotate and lock
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partCameraLens1, 300);
        setTimeout(() => dockPart(partCameraLens2, 300), 120);
        setTimeout(() => dockPart(partCameraLens3, 300), 240);
        highlightSpec("camera");
      }, 4500));

      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partSpeaker, 350);
        dockPart(partUsbPort, 350);
      }, 5150));

      // Side buttons lock before the display and protective glass.
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partButtons, 300);
      }, 5600));

      // STEP 10 (5.7s - 6.3s): Display assembly moves into chassis (1.02 -> 1 scale)
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partDisplay, 400);
        highlightSpec("display");
      }, 6100));

      // STEP 11 (6.3s - 6.8s): Front glass closes
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partFrontGlass, 350);
      }, 6700));

      // STEP 12 (6.8s - 7.2s): Rear glass closes
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partBackGlass, 350);
      }, 7300));

      // STEP 13 & 14 (7.2s - 7.8s): Final rotation slightly toward camera + soft energy pulse
      assemblyTimeouts.push(setTimeout(() => {
        dockPart(partReflection, 500);
        assembly.classList.remove("is-exploded");
        assembly.classList.add("is-assembled");
        assembly.style.transform = "rotateY(-12deg) rotateX(4deg) translateZ(0)";

        if (pulseRing) {
          pulseRing.classList.remove("pulsing");
          void pulseRing.offsetWidth;
          pulseRing.classList.add("pulsing");
        }
      }, 7700));

      // STEP FINAL (7.8s): Lock into subtle idle floating (holds for 3 seconds)
      assemblyTimeouts.push(setTimeout(() => {
        assembly.style.transform = "";
        assembly.classList.add("idle-floating");
      }, 8300));

      // Hold assembled state for 3.2s, then smoothly reverse explosion and reassemble
      assemblyTimeouts.push(setTimeout(() => {
        if (!isAutoAssemble) return;
        assembly.classList.remove("idle-floating", "is-assembled");
        assembly.classList.add("is-exploded");

        // Staggered reverse separation
        const revOrder = [...allParts].reverse();
        revOrder.forEach((p, idx) => {
          setTimeout(() => {
            p.classList.remove("is-docked");
          }, idx * 50);
        });

        trackConnectors(1500);

        // Leave the fully separated parts visible before the next cycle.
        assemblyTimeouts.push(setTimeout(() => {
          if (isAutoAssemble) runAssembly();
        }, 2700));
      }, 11300));
    }

    if (assembly) {
      resetToExploded();
      if (toggleBtn) {
        toggleBtn.classList.add("active");
        toggleBtn.classList.remove("paused");
      }
      if (toggleLabel) toggleLabel.textContent = "AUTO ASSEMBLE";

      // Start assembly sequence on load
      window.setTimeout(runAssembly, 1800);

      // Interactive Toggle Button (Click to Pause / Play / Restart)
      if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
          isAutoAssemble = !isAutoAssemble;
          if (isAutoAssemble) {
            toggleBtn.classList.add("active");
            toggleBtn.classList.remove("paused");
            if (toggleLabel) toggleLabel.textContent = "AUTO ASSEMBLE";
            runAssembly();
          } else {
            clearTimers();
            toggleBtn.classList.remove("active");
            toggleBtn.classList.add("paused");
            if (toggleLabel) toggleLabel.textContent = "AUTO ASSEMBLE";
            assembly.classList.remove("is-exploded");
            assembly.classList.add("is-assembled", "idle-floating");
            assembly.style.transform = "";
            allParts.forEach((p) => p.classList.add("is-docked"));
            trackConnectors();
          }
        });
      }

      updateConnectors();
      window.addEventListener("resize", updateConnectors, { passive: true });
      window.addEventListener("scroll", updateConnectors, { passive: true });

      // Parallax 3D mouse tilt: Desktop only, subtle (2-4 degrees max, 60 FPS)
      if (window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches && stage) {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        let isHovered = false;
        let tiltFrame = 0;

        stage.addEventListener("mousemove", (event) => {
          isHovered = true;
          const rect = stage.getBoundingClientRect();
          mouseX = (event.clientX - rect.left) / rect.width - 0.5;
          mouseY = (event.clientY - rect.top) / rect.height - 0.5;
          if (!tiltFrame) tiltFrame = requestAnimationFrame(updateTilt);
        }, { passive: true });

        stage.addEventListener("mouseleave", () => {
          isHovered = false;
          mouseX = 0;
          mouseY = 0;
          cancelAnimationFrame(tiltFrame);
          tiltFrame = 0;
          if (assembly && assembly.classList.contains("idle-floating")) {
            assembly.style.transform = "";
          }
        });

        const updateTilt = () => {
          if (!isHovered || !assembly || assembly.classList.contains("is-exploded")) {
            tiltFrame = 0;
            return;
          }
          currentX += (mouseX - currentX) * 0.08;
          currentY += (mouseY - currentY) * 0.08;
          assembly.style.transform = `rotateY(${-18 + currentX * 6}deg) rotateX(${8 - currentY * 5}deg)`;
          tiltFrame = requestAnimationFrame(updateTilt);
        };
      }

      // Viewport Intersection Observer (pause assembly when hero is off-screen)
      if ("IntersectionObserver" in window && stage) {
        const heroObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            isHeroInView = entry.isIntersecting;
            if (isHeroInView && isAutoAssemble && assemblyTimeouts.length === 0) {
              runAssembly();
            } else if (!isHeroInView) {
              clearTimers();
            }
          });
        }, { threshold: 0.2 });
        heroObserver.observe(stage);
      }

      // Tab visibility change (pause when tab is hidden to conserve CPU/GPU)
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          clearTimers();
        } else if (isAutoAssemble && isHeroInView) {
          runAssembly();
        }
      });
    }

    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
      }, { passive: true });
    }
  }

  function bindGlobalEsc() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (document.getElementById("emiBackdrop")?.classList.contains("open")) {
          document.getElementById("emiClose")?.click();
          return;
        }
        if (document.getElementById("spinWheelBackdrop")?.classList.contains("open")) {
          document.getElementById("spinWheelClose")?.click();
          return;
        }
        closeModal();
        closeCart();
        closeSearch();
      }
    });
  }

  function updateFooterYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = "2026";
  }

  function setupFooterReveal() {
    const footer = document.getElementById("footer");
    if (!footer) return;

    if (!("IntersectionObserver" in window)) {
      footer.classList.add("in-view");
      return;
    }

    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.add("in-view");
          footerObserver.unobserve(footer);
        }
      });
    }, { threshold: 0.08 });

    footerObserver.observe(footer);
  }

  function setupWhatsAppLinks() {
    const general = document.getElementById("generalWhatsapp");
    if (general) {
      general.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi SN STORE! I have a question about your phones.")}`;
    }
  }

  function setupHeroTypewriter() {
    const element = document.getElementById("heroTypewriter");
    if (!element) return;

    const phrases = [
      "Carry the future in your pocket.",
      "Discover your next flagship.",
      "Technology, built for tomorrow.",
      "Your next phone starts here."
    ];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      if (document.hidden) return;
      const phrase = phrases[phraseIndex];
      if (!deleting && characterIndex < phrase.length) {
        characterIndex += 1;
        element.textContent = phrase.slice(0, characterIndex);
        timer = window.setTimeout(tick, 95);
      } else if (!deleting) {
        deleting = true;
        timer = window.setTimeout(tick, 2200);
      } else if (characterIndex > 0) {
        characterIndex -= 1;
        element.textContent = phrase.slice(0, characterIndex);
        timer = window.setTimeout(tick, 62);
      } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(tick, 650);
      }
    };

    timer = window.setTimeout(tick, 2200);
    document.addEventListener("visibilitychange", () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(tick, 250);
    });
  }

  function setupHeroBackgroundVideo() {
    const video = document.getElementById("heroBackgroundVideo");
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    const playVideo = () => video.play().catch(() => { });
    playVideo();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) video.pause();
      else playVideo();
    });
  }

  function animateCounters() {
    const counters = document.querySelectorAll(".stat-num");
    if (!("IntersectionObserver" in window)) {
      counters.forEach((counter) => {
        counter.textContent = String(counter.dataset.count || 0);
      });
      return;
    }

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count || 0);
      const duration = 1600;
      const start = performance.now();

      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      }, { threshold: 0.4 });

      observer.observe(counter);
    });
  }

  function init() {
    try { renderProducts(); } catch (e) { console.error("renderProducts error:", e); }
    try { renderShowcase(activeShowcase); } catch (e) { console.error("renderShowcase error:", e); }
    try { renderCart(); } catch (e) { console.error("renderCart error:", e); }
    try { populateBrandStrip(); } catch (e) { console.error("populateBrandStrip error:", e); }
    try { populateOffers(); } catch (e) { console.error("populateOffers error:", e); }
    try { populateWhySection(); } catch (e) { console.error("populateWhySection error:", e); }
    try { populateReviews(); } catch (e) { console.error("populateReviews error:", e); }
    try { setupFilters(); } catch (e) { console.error("setupFilters error:", e); }
    try { setupSearch(); } catch (e) { console.error("setupSearch error:", e); }
    try { setupMobileMenu(); } catch (e) { console.error("setupMobileMenu error:", e); }
    try { setupCart(); } catch (e) { console.error("setupCart error:", e); }
    try { setupSpinWheel(); } catch (e) { console.error("setupSpinWheel error:", e); }
    try { setupModalControls(); } catch (e) { console.error("setupModalControls error:", e); }
    try { setupForms(); } catch (e) { console.error("setupForms error:", e); }
    try { setupRevealAnimations(); } catch (e) { console.error("setupRevealAnimations error:", e); }
    try { setupFooterReveal(); } catch (e) { console.error("setupFooterReveal error:", e); }
    try { setupHero3DExplodedAndParticles(); } catch (e) { console.error("setupHero3DExplodedAndParticles error:", e); }
    try { setupHeroTypewriter(); } catch (e) { console.error("setupHeroTypewriter error:", e); }
    try { setupHeroBackgroundVideo(); } catch (e) { console.error("setupHeroBackgroundVideo error:", e); }
    try { setupWhatsAppLinks(); } catch (e) { console.error("setupWhatsAppLinks error:", e); }
    try { bindGlobalEsc(); } catch (e) { console.error("bindGlobalEsc error:", e); }
    try { updateFooterYear(); } catch (e) { console.error("updateFooterYear error:", e); }
    try { animateCounters(); } catch (e) { console.error("animateCounters error:", e); }

    try {
      const navbar = document.getElementById("navbar");
      const onScroll = () => {
        if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 30);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    } catch (e) {
      console.error("navbar scroll error:", e);
    }

    try {
      setInterval(tickOfferTimers, 1000);
    } catch (e) {
      console.error("tickOfferTimers error:", e);
    }

    // Dismiss loader smoothly once UI components are wired
    window.setTimeout(finishLoader, 200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
