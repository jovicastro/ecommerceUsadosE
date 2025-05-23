class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  // Dropdown functionality
  initDropdown() {
    const dropdownBtn = document.getElementById("categoria-btn");
    const dropdownMenu = document.getElementById("categoria-menu");

    if (dropdownBtn && dropdownMenu) {
      dropdownBtn.addEventListener("click", function (e) {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");
      });

      document.addEventListener("click", function (e) {
        if (
          !dropdownBtn.contains(e.target) &&
          !dropdownMenu.contains(e.target)
        ) {
          dropdownMenu.classList.remove("show");
        }
      });
    }
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    this.initDropdown(); // Initialize dropdown functionality
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li"
);
mobileNavbar.init();

// DARK MODE 

const themeButtons = document.querySelectorAll("[data-theme-value]");
    const html = document.documentElement;

    function applyTheme(theme) {
      if (theme === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        html.setAttribute("data-bs-theme", prefersDark ? "dark" : "light");
      } else {
        html.setAttribute("data-bs-theme", theme);
      }
      localStorage.setItem("theme", theme);
    }

    themeButtons.forEach(btn => {
      btn.addEventListener("click", () => applyTheme(btn.getAttribute("data-theme-value")));
    });

    // Aplicar tema salvo
    const savedTheme = localStorage.getItem("theme") || "auto";
    applyTheme(savedTheme);