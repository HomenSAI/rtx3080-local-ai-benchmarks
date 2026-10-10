// HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/
// Страница рекомендаций: список моделей слева, настройки выбранной модели справа, копирование команд.
// Разметка статична (страница читается и без JS); скрипт только переключает панели и копирует текст.
(function () {
  "use strict";

  document.querySelectorAll(".reco-pick").forEach(function (pick) {
    var tabs = Array.prototype.slice.call(pick.querySelectorAll(".reco-item"));
    var panels = Array.prototype.slice.call(pick.querySelectorAll(".reco-panel"));

    function select(i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        panels[k].hidden = !on;
      });
      if (focus) tabs[i].focus();
      // На телефоне панель под списком: прокрутить к ней после выбора.
      if (window.matchMedia("(max-width: 760px)").matches && !focus) panels[i].scrollIntoView({ behavior: "smooth", block: "start" });
    }

    tabs.forEach(function (t, i) {
      t.tabIndex = t.getAttribute("aria-selected") === "true" ? 0 : -1;
      t.addEventListener("click", function () { select(i, false); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length, k = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") k = (i + 1) % n;
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") k = (i - 1 + n) % n;
        if (e.key === "Home") k = 0;
        if (e.key === "End") k = n - 1;
        if (k !== null) { e.preventDefault(); select(k, true); }
      });
    });
  });

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  document.querySelectorAll(".reco-copy").forEach(function (btn) {
    var label = btn.textContent;
    btn.addEventListener("click", function () {
      var pre = btn.closest(".reco-cmd").querySelector("pre");
      copyText(pre.textContent).then(function () {
        btn.textContent = "✓ " + btn.getAttribute("data-copied");
        btn.classList.add("done");
        setTimeout(function () { btn.textContent = label; btn.classList.remove("done"); }, 1800);
      }, function () {
        var r = document.createRange(); r.selectNodeContents(pre);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      });
    });
  });
})();
