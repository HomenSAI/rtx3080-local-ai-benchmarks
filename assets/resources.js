// HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/
// «Время и ресурсы»: два графика SVG на классах графиков ядра стиля (ch-*), данные — в data-атрибутах разметки.
//   [data-energy]  data-days="29.09|30.09|…"  data-per-day="1.5"  data-unit="кВт·ч"  — столбцы по дням + нарастающий итог
//   [data-gpu]     data-items="Тест:часы|…"   data-unit="ч"                          — время GPU по тестам, горизонтальные полосы
// Без inline-кода и внешних библиотек; подписи — из разметки на языке страницы.
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var dec = (document.documentElement.lang || "en") === "en" ? "." : ",";

  function el(tag, attrs, text) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function num(v, d) { return v.toFixed(d).replace(".", dec); }
  function svgRoot(w, h, label) {
    return el("svg", { viewBox: "0 0 " + w + " " + h, class: "chart", role: "img", "aria-label": label, preserveAspectRatio: "xMidYMid meet" });
  }

  function energy(host) {
    var days = host.getAttribute("data-days").split("|");
    var per = parseFloat(host.getAttribute("data-per-day"));
    var unit = host.getAttribute("data-unit");
    var total = per * days.length;
    var W = 640, H = 260, L = 44, R = 16, T = 22, B = 34, pw = W - L - R, ph = H - T - B;
    var ymax = Math.ceil(total / 4) * 4;
    var svg = svgRoot(W, H, host.getAttribute("aria-label") || "");
    for (var g = 0; g <= 4; g++) {
      var v = ymax * g / 4, y = T + ph * (1 - v / ymax);
      svg.appendChild(el("line", { class: "ch-grid", x1: L, x2: W - R, y1: y, y2: y }));
      svg.appendChild(el("text", { class: "ch-tick", x: L - 6, y: y + 4, "text-anchor": "end" }, num(v, 0)));
    }
    var step = pw / days.length, bw = Math.min(34, step * 0.55), pts = [];
    days.forEach(function (d, i) {
      var cx = L + step * (i + 0.5);
      var yb = T + ph * (1 - per / ymax);
      var bar = el("rect", { class: "ch-bar", x: cx - bw / 2, y: yb, width: bw, height: T + ph - yb, rx: 4 });
      bar.appendChild(el("title", {}, d + ": " + num(per, 1) + " " + unit));
      svg.appendChild(bar);
      svg.appendChild(el("text", { class: "ch-tick", x: cx, y: H - B + 16, "text-anchor": "middle" }, d));
      var cum = per * (i + 1);
      pts.push([cx, T + ph * (1 - cum / ymax), cum]);
    });
    svg.appendChild(el("path", { class: "ch-line", d: pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ") }));
    pts.forEach(function (p, i) {
      var dot = el("circle", { class: "ch-dot", cx: p[0], cy: p[1], r: 4 });
      dot.appendChild(el("title", {}, days[i] + ": " + num(p[2], 1) + " " + unit));
      svg.appendChild(dot);
    });
    var last = pts[pts.length - 1];
    svg.appendChild(el("text", { class: "ch-value", x: last[0], y: last[1] - 10, "text-anchor": "end" }, num(total, 0) + " " + unit));
    host.replaceChildren(svg);
  }

  function gpu(host) {
    var items = host.getAttribute("data-items").split("|").map(function (s) { var p = s.split(":"); return { label: p[0], v: parseFloat(p[1]) }; });
    var unit = host.getAttribute("data-unit");
    var max = Math.max.apply(null, items.map(function (i) { return i.v; }));
    var W = 640, row = 30, LW = 210, H = row * items.length + 8, bw = W - LW - 70;
    var svg = svgRoot(W, H, host.getAttribute("aria-label") || "");
    items.forEach(function (it, i) {
      var y = i * row + 4;
      svg.appendChild(el("text", { class: "ch-label", x: 0, y: y + 15 }, it.label));
      svg.appendChild(el("rect", { class: "ch-track", x: LW, y: y + 5, width: bw, height: 12, rx: 6 }));
      svg.appendChild(el("rect", { class: "ch-bar", x: LW, y: y + 5, width: Math.max(4, bw * it.v / max), height: 12, rx: 6 }));
      svg.appendChild(el("text", { class: "ch-value", x: LW + bw + 8, y: y + 15 }, num(it.v, it.v < 1 ? 2 : 1) + " " + unit));
    });
    host.replaceChildren(svg);
  }

  document.querySelectorAll("[data-energy]").forEach(energy);
  document.querySelectorAll("[data-gpu]").forEach(gpu);
})();
