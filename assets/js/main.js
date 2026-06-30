// Marks the current page's nav link as active, fills in the footer year,
// and handles the light/dark theme toggle (preference saved in localStorage).
document.addEventListener("DOMContentLoaded", function () {
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.site-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- theme toggle ----
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var saved = localStorage.getItem("theme");

  if (saved === "dark") {
    root.setAttribute("data-theme", "dark");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    });
  }
});
