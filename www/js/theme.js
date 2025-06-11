(function () {
    const savedTheme = localStorage.getItem("theme") || "light"; // claro por padrão
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const themeToApply = savedTheme === "auto" ? (prefersDark ? "dark" : "light") : savedTheme;
    document.documentElement.setAttribute("data-bs-theme", themeToApply);
  })();
  