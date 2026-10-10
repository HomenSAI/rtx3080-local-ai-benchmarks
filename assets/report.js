// HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/
// Общая инициализация страниц отчёта: переключатель темы, кнопка «Наверх», подвал и сортировка таблиц.
// Без inline-кода: работает при строгой CSP. Заголовки сортируются мышью, Enter и пробелом.
(function () {
  "use strict";

  var lang = document.documentElement.lang || "ru";
  var TEXT = {
    ru: { toLight: "Светлая тема", toDark: "Тёмная тема", top: "Наверх",
          hint: "Нажмите на заголовок столбца, чтобы отсортировать; три лучших значения выделены" },
    en: { toLight: "Light theme", toDark: "Dark theme", top: "Top",
          hint: "Click a column header to sort; the top three values are highlighted" },
    de: { toLight: "Helles Design", toDark: "Dunkles Design", top: "Nach oben",
          hint: "Auf eine Spaltenüberschrift klicken zum Sortieren; die drei besten Werte sind hervorgehoben" }
  };
  var T = TEXT[lang] || TEXT.ru;

  var tools = document.getElementById("tools");
  if (tools) {
    var li = document.createElement("li");
    li.appendChild(HomenS.ui.themeButton({ toLight: T.toLight, toDark: T.toDark }));
    tools.appendChild(li);
  }
  HomenS.ui.initToTop(T.top);

  var footer = document.getElementById("footer");
  if (footer) HomenS.brandUi.renderFooter(footer, lang);

  function num(text) {
    var m = String(text).trim().replace(",", ".").match(/^[-+]?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }

  function leaders(rows, col) {
    rows.forEach(function (r) {
      Array.prototype.forEach.call(r.cells, function (c) { c.classList.remove("lead1", "lead2", "lead3"); });
    });
    var numeric = rows.filter(function (r) { return num(r.cells[col] && r.cells[col].textContent) !== null; });
    numeric.sort(function (p, q) { return num(q.cells[col].textContent) - num(p.cells[col].textContent); });
    numeric.slice(0, 3).forEach(function (r, k) { r.cells[col].classList.add("lead" + (k + 1)); });
  }

  function sortTable(table, head, rows, col, th, headers) {
    var dir = th.classList.contains("desc") ? "asc" : "desc";
    var numericCol = rows.filter(function (r) { return num(r.cells[col] && r.cells[col].textContent) !== null; }).length > rows.length / 2;

    headers.forEach(function (h) {
      h.classList.remove("asc", "desc");
      h.removeAttribute("aria-sort");
    });
    th.classList.add(dir);
    th.setAttribute("aria-sort", dir === "asc" ? "ascending" : "descending");

    rows.sort(function (a, b) {
      var x = a.cells[col].textContent.trim();
      var y = b.cells[col].textContent.trim();
      var r;
      if (numericCol) {
        var nx = num(x), ny = num(y);
        if (nx === null) return 1;
        if (ny === null) return -1;
        r = nx - ny;
      } else {
        r = x.localeCompare(y, undefined, { numeric: true });
      }
      return dir === "asc" ? r : -r;
    });

    var body = table.tBodies[0] || table;
    rows.forEach(function (r) { body.appendChild(r); });
    if (numericCol) leaders(rows, col);
  }

  document.querySelectorAll("table.history").forEach(function (table) {
    var rows = Array.prototype.slice.call(table.rows, 1);
    if (rows.length < 3) return;
    var head = table.rows[0];
    var headers = Array.prototype.slice.call(head.cells);

    var hint = document.createElement("p");
    hint.className = "sorthint";
    hint.textContent = T.hint;
    var wrap = table.closest(".table-scroll") || table;
    wrap.parentNode.insertBefore(hint, wrap);

    headers.forEach(function (th, col) {
      th.classList.add("sortable");
      th.tabIndex = 0;
      var run = function () { sortTable(table, head, rows, col, th, headers); };
      th.addEventListener("click", run);
      th.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          run();
        }
      });
    });
  });
})();
