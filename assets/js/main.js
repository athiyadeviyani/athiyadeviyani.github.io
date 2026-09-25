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

  // ---- size the about-page photo so its bottom lines up with the end of a paragraph ----
  // The photo keeps its own (portrait) shape. It is matched to the whole bio when that
  // fits; otherwise to the longest run of paragraphs it can sit beside without getting too big.
  var photo = document.querySelector(".bio-photo");
  var text = document.querySelector(".bio-text");
  function fitPhoto() {
    if (!photo || !text || !photo.naturalWidth) return;
    if (window.innerWidth <= 600) { photo.style.width = ""; return; }
    var ratio = photo.naturalWidth / photo.naturalHeight;
    var minW = 150, maxW = text.clientWidth * 0.45;
    var blocks = text.children;
    function gap(w, k) {           // photo height minus height of text blocks 0..k
      photo.style.width = w + "px";
      var top = photo.getBoundingClientRect().top;
      var bottom = blocks[k].getBoundingClientRect().bottom;
      return w / ratio - (bottom - top);
    }
    for (var k = blocks.length - 1; k >= 0; k--) {
      if (gap(maxW, k) < 0) continue;          // can't reach this far even at max size
      if (gap(minW, k) > 0) continue;          // too short a run; photo would overhang
      var lo = minW, hi = maxW;
      for (var i = 0; i < 16; i++) {
        var mid = (lo + hi) / 2;
        if (gap(mid, k) < 0) lo = mid; else hi = mid;
      }
      photo.style.width = hi + "px";
      return;
    }
    photo.style.width = "";
  }
  if (photo) {
    if (photo.complete) fitPhoto(); else photo.addEventListener("load", fitPhoto);
    window.addEventListener("resize", fitPhoto);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitPhoto);
  }
});
