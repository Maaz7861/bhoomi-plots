// JavaScript for Real Estate Landing Page
// Add your JavaScript functionality here

// Example: Heart icon toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  // Toggle heart icon on click
  const heartIcons = document.querySelectorAll(".card-heart");
  heartIcons.forEach((heart) => {
    heart.addEventListener("click", function (e) {
      e.stopPropagation();
      const icon = this.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "red";
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "";
      }
    });
  });

  // --- HERO SEARCH BAR INTERACTIONS ---
  const searchTabs = document.querySelectorAll(".search-tab");
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".btn-search");

  // Tab wise placeholder text (you can tweak copy here)
  const searchPlaceholders = {
    Buy: 'Search "2 BHK in Hinjewadi Pune"',
    "New Launch": 'Search "New projects in Wakad"',
    Commercial: 'Search "Office space in Baner"',
    "Plots/Land": 'Search "NA plots near Nashik"',
    Projects: 'Search "Township in West Pune"',
  };

  // Handle tab change
  if (searchTabs.length && searchInput) {
    searchTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Active state
        searchTabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        const label = this.textContent.trim();
        if (searchPlaceholders[label]) {
          searchInput.placeholder = searchPlaceholders[label];
        }
      });
    });
  }

  // Search button functionality
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      const activeTab = document.querySelector(".search-tab.active");
      const categoryButton = document.querySelector(".search-category");
      const location = searchInput ? searchInput.value.trim() : "";
      const mode = activeTab ? activeTab.textContent.trim() : "Buy";
      const category = categoryButton
        ? categoryButton.textContent.trim()
        : "All Residential";

      // For now simply log; this is where API / navigation can hook in
      console.log("Search:", {
        mode,
        category,
        location,
      });

      // Temporary UX feedback
      if (!location) {
        alert(`Searching in "${mode}" for ${category}. Enter a location or project name to refine.`);
      } else {
        alert(
          `Searching "${location}" in ${mode} · ${category}. (Hook this into your backend / results page.)`
        );
      }
    });
  }

  // Auth modal logic
  const authBackdrop = document.getElementById("authBackdrop");
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const switchToRegister = document.getElementById("switchToRegister");
  const switchToLogin = document.getElementById("switchToLogin");
  const closeButtons = document.querySelectorAll("[data-auth-close]");
  const navbar = document.querySelector(".navbar");
  const navToggle = document.getElementById("navToggle");

  function openModal(type) {
    if (!authBackdrop || !loginModal || !registerModal) return;

    authBackdrop.classList.add("show");
    if (type === "login") {
      loginModal.style.display = "block";
      registerModal.style.display = "none";
    } else {
      loginModal.style.display = "none";
      registerModal.style.display = "block";
    }
  }

  function closeModal() {
    if (!authBackdrop || !loginModal || !registerModal) return;
    authBackdrop.classList.remove("show");
    loginModal.style.display = "none";
    registerModal.style.display = "none";
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal("login");
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal("register");
    });
  }

  if (switchToRegister) {
    switchToRegister.addEventListener("click", function (e) {
      e.preventDefault();
      openModal("register");
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      openModal("login");
    });
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      closeModal();
    });
  });

  if (authBackdrop) {
    authBackdrop.addEventListener("click", function (e) {
      if (e.target === authBackdrop) {
        closeModal();
      }
    });
  }

  // Mobile navbar toggle
  if (navToggle && navbar) {
    navToggle.addEventListener("click", function () {
      const isOpen = navbar.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Social Handlers popup
  const socialHandlersBtn = document.getElementById("socialHandlersBtn");
  const socialPopbackdrop = document.getElementById("socialPopbackdrop");
  const socialPopClose = document.getElementById("socialPopClose");

  function openSocialPop() {
    if (!socialPopbackdrop) return;
    socialPopbackdrop.classList.add("show");
    socialPopbackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeSocialPop() {
    if (!socialPopbackdrop) return;
    socialPopbackdrop.classList.remove("show");
    socialPopbackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (socialHandlersBtn) {
    socialHandlersBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openSocialPop();
    });
  }

  if (socialPopClose) {
    socialPopClose.addEventListener("click", closeSocialPop);
  }

  if (socialPopbackdrop) {
    socialPopbackdrop.addEventListener("click", function (e) {
      if (e.target === socialPopbackdrop) closeSocialPop();
    });
  }

  // Property quick view modal
  const propertyBackdrop = document.getElementById("propertyBackdrop");
  const propertyClose = document.getElementById("propertyClose");
  const viewButtons = document.querySelectorAll(".view-btn");

  function openPropertyModal() {
    if (!propertyBackdrop) return;
    propertyBackdrop.classList.add("show");
  }

  function closePropertyModal() {
    if (!propertyBackdrop) return;
    propertyBackdrop.classList.remove("show");
  }

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openPropertyModal();
    });
  });

  if (propertyClose) {
    propertyClose.addEventListener("click", function () {
      closePropertyModal();
    });
  }

  if (propertyBackdrop) {
    propertyBackdrop.addEventListener("click", function (e) {
      if (e.target === propertyBackdrop) {
        closePropertyModal();
      }
    });
  }

  // Services page tabs
  const serviceTabs = document.querySelectorAll(".services-tab");
  const servicePanels = document.querySelectorAll(".services-tab-panel");

  if (serviceTabs.length && servicePanels.length) {
    serviceTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const target = this.dataset.tab;

        serviceTabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        servicePanels.forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.tab === target);
        });
      });
    });
  }

  // Projects page tabs
  const projectTabs = document.querySelectorAll(".projects-tab");
  const projectPanels = document.querySelectorAll(".projects-panel");

  if (projectTabs.length && projectPanels.length) {
    projectTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const target = this.dataset.tab;

        projectTabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        projectPanels.forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.tab === target);
        });
      });
    });
  }

  // FAQ accordion (Videos & FAQ section)
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  // Testimonials carousel (3 visible on desktop)
  const testimonialsCarousel = document.querySelector(".testimonials-carousel");
  if (testimonialsCarousel) {
    const track = testimonialsCarousel.querySelector(".testimonials-track");
    const cards = Array.from(testimonialsCarousel.querySelectorAll(".testimonial-card"));
    const prevBtn = testimonialsCarousel.querySelector(".testimonials-arrow-prev");
    const nextBtn = testimonialsCarousel.querySelector(".testimonials-arrow-next");

    let index = 0;
    let stepPx = 0;
    let maxIndex = 0;

    function getVisibleCount() {
      return window.matchMedia("(max-width: 900px)").matches ? 1 : 3;
    }

    function computeStep() {
      if (!track || cards.length === 0) return;
      const first = cards[0];
      const cardRect = first.getBoundingClientRect();
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "0") || 0;
      stepPx = cardRect.width + gap;
      maxIndex = Math.max(0, cards.length - getVisibleCount());
      index = Math.min(index, maxIndex);
    }

    function update() {
      if (!track) return;
      track.style.transform = `translateX(${-index * stepPx}px)`;
      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = index >= maxIndex;
    }

    function goNext() {
      index = Math.min(maxIndex, index + 1);
      update();
    }

    function goPrev() {
      index = Math.max(0, index - 1);
      update();
    }

    computeStep();
    update();

    if (nextBtn) nextBtn.addEventListener("click", goNext);
    if (prevBtn) prevBtn.addEventListener("click", goPrev);

    window.addEventListener("resize", function () {
      const oldStep = stepPx;
      computeStep();
      if (stepPx !== oldStep) update();
    });
  }
});

