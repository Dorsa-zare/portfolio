(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const nav = header.querySelector(".site-nav");
  const desktopQuery = window.matchMedia("(max-width: 780px)");
  let lastScrollY = window.scrollY;

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "nav-toggle";
  toggleButton.setAttribute("aria-label", "Toggle navigation");
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.innerHTML = "<span></span><span></span><span></span>";

  const closeMobileMenu = () => {
    if (!nav) return;
    nav.classList.remove("is-open");
    toggleButton.setAttribute("aria-expanded", "false");
    header.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
      dropdown.classList.remove("is-open");
    });
  };

  const setupMobileNav = () => {
    if (!nav) return;

    if (!header.contains(toggleButton)) {
      header.insertBefore(toggleButton, nav);
    }

    if (desktopQuery.matches) {
      nav.classList.remove("is-open");
      nav.style.display = "none";
      toggleButton.style.display = "flex";
      toggleButton.setAttribute("aria-expanded", "false");
      header.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        dropdown.classList.remove("is-open");
      });
    } else {
      nav.style.display = "flex";
      toggleButton.style.display = "none";
      nav.classList.remove("is-open");
      closeMobileMenu();
    }
  };

  toggleButton.addEventListener("click", () => {
    if (!nav) return;
    const isOpen = nav.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    nav.style.display = isOpen ? "grid" : "none";
    if (!isOpen) {
      header.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        dropdown.classList.remove("is-open");
      });
    }
  });

  nav?.querySelectorAll(".nav-dropdown > .nav-link").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (!desktopQuery.matches) {
        event.preventDefault();
        const dropdown = trigger.parentElement;
        const isOpen = dropdown.classList.toggle("is-open");
        header.querySelectorAll(".nav-dropdown").forEach((item) => {
          if (item !== dropdown) item.classList.remove("is-open");
        });
        trigger.setAttribute("aria-expanded", String(isOpen));
        return;
      }
      closeMobileMenu();
    });
  });

  nav?.querySelectorAll(".nav-link, .dropdown-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (desktopQuery.matches) {
        closeMobileMenu();
      }
    });
  });

  const updateHeader = () => {
    if (desktopQuery.matches) {
      document.body.classList.remove("nav-hidden");
      lastScrollY = window.scrollY;
      setupMobileNav();
      return;
    }

    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    if (currentScrollY <= 16 || delta < -8) {
      document.body.classList.remove("nav-hidden");
    } else if (delta > 8) {
      document.body.classList.add("nav-hidden");
    }

    lastScrollY = currentScrollY;
    setupMobileNav();
  };

  setupMobileNav();
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", updateHeader);
})();
