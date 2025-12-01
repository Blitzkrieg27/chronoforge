/* -------------------------------------------------------
   THEME.JS — Dark/Light Mode System
------------------------------------------------------- */

(function () {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("theme-toggle");

    // Load from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        root.setAttribute("data-theme", savedTheme);
    } else {
        root.setAttribute("data-theme", "dark");
    }

    // Toggle theme
    function toggleTheme() {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";

        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", toggleTheme);
    }
})();
