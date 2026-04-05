(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const desktopQuery = window.matchMedia("(max-width: 780px)");
  let lastScrollY = window.scrollY;

  const updateHeader = () => {
    if (desktopQuery.matches) {
      document.body.classList.remove("nav-hidden");
      lastScrollY = window.scrollY;
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
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", updateHeader);
})();
