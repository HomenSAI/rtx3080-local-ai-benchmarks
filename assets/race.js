// HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/
// «Гонка моделей»: горизонтальная гистограмма, которая проходит тесты по очереди.
// После каждого теста столбец модели = средний результат по уже пройденным тестам (в % от максимума),
// модели меняются местами, в конце остаётся итоговый рейтинг. Данные читаются из таблицы на странице
// (data-race-source), поэтому числа не дублируются. Без inline-кода и внешних библиотек.
(function () {
  "use strict";

  var lang = document.documentElement.lang || "en";
  var TEXT = {
    en: { h: "h", min: "min", gpu: "GPU time", total: "total", start: "Start", play: "Play", pause: "Pause", replay: "Replay", after: "After test", of: "of", final: "Final ranking" },
    ru: { h: "ч", min: "мин", gpu: "время GPU", total: "всего", start: "Старт", play: "Запустить", pause: "Пауза", replay: "Ещё раз", after: "После теста", of: "из", final: "Итоговый рейтинг" },
    de: { h: "Std.", min: "Min.", gpu: "GPU-Zeit", total: "gesamt", start: "Start", play: "Abspielen", pause: "Pause", replay: "Noch einmal", after: "Nach Test", of: "von", final: "Endstand" }
  };
  var T = TEXT[lang] || TEXT.en;
  var STEP_MS = 1700;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function num(text) {
    var m = String(text).trim().replace(",", ".").match(/^[-+]?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }

  // Столбец считается тестом, если в заголовке есть «%» или «/N» (максимум баллов).
  function readTests(table) {
    var head = table.rows[0].cells, tests = [];
    for (var c = 1; c < head.length; c++) {
      var h = head[c].textContent.trim();
      var m = h.match(/\/\s*(\d+)/);
      var max = m ? parseFloat(m[1]) : (/%/.test(h) ? 100 : null);
      if (max) tests.push({ col: c, max: max, label: h.replace(/\s*(\/\s*\d+|%)\s*$/, "").trim() });
    }
    var models = [];
    for (var r = 1; r < table.rows.length; r++) {
      var cells = table.rows[r].cells;
      var name = cells[0].textContent.trim();
      var vals = tests.map(function (t) { var v = num(cells[t.col].textContent); return v === null ? 0 : v / t.max * 100; });
      models.push({ name: name, vals: vals });
    }
    return { tests: tests, models: models };
  }

  function scoreAt(model, step) {
    if (step === 0) return 0;
    var s = 0;
    for (var i = 0; i < step; i++) s += model.vals[i];
    return s / step;
  }

  function build(section) {
    var table = document.querySelector(section.getAttribute("data-race-source"));
    if (!table || table.rows.length < 3) return;
    var data = readTests(table);
    var steps = data.tests.length;
    // Реальные даты тестов (в порядке столбцов), чтобы гонка шла по настоящей хронологии эксперимента.
    var dates = (section.getAttribute("data-race-dates") || "").split("|");
    // Измеренное время GPU на тест (сумма поля minutes в сырых результатах), чтобы показать и накопленные часы.
    var minutes = (section.getAttribute("data-race-minutes") || "").split("|").map(parseFloat);
    function dur(m) {
      m = Math.round(m);
      var h = Math.floor(m / 60), r = m % 60;
      return h ? h + " " + T.h + (r ? " " + r + " " + T.min : "") : r + " " + T.min;
    }
    function timeNote(step) {
      if (!(minutes[step - 1] >= 0)) return "";
      var total = 0;
      for (var i = 0; i < step; i++) total += minutes[i] || 0;
      return " · " + T.gpu + " " + dur(minutes[step - 1]) + " (" + T.total + " " + dur(total) + ")";
    }

    var status = section.querySelector(".race-status");
    var button = section.querySelector(".race-play");
    var chips = section.querySelector(".race-chips");
    var list = section.querySelector(".race-bars");

    var rows = data.models.map(function (m) {
      var li = document.createElement("li");
      li.className = "race-row";
      li.innerHTML = '<span class="race-rank"></span><span class="race-name"></span>' +
        '<span class="race-track"><span class="race-fill"></span></span><span class="race-val"></span>';
      li.querySelector(".race-name").textContent = m.name;
      li.title = m.name;
      list.appendChild(li);
      return { model: m, el: li };
    });

    var chipEls = [];
    for (var k = 0; k <= steps; k++) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = k === 0 ? T.start : data.tests[k - 1].label;
      b.setAttribute("data-step", k);
      b.addEventListener("click", function (e) { stop(); show(+e.currentTarget.getAttribute("data-step")); });
      chips.appendChild(b);
      chipEls.push(b);
    }

    var current = 0, timer = null;

    function show(step) {
      current = step;
      var order = rows.slice().sort(function (a, b) {
        var d = scoreAt(b.model, step) - scoreAt(a.model, step);
        return d !== 0 ? d : a.model.name.localeCompare(b.model.name);
      });
      order.forEach(function (row, i) {
        var v = scoreAt(row.model, step);
        row.el.style.transform = "translateY(" + (i * 100) + "%)";
        row.el.querySelector(".race-fill").style.width = v.toFixed(1) + "%";
        row.el.querySelector(".race-val").textContent = step === 0 ? "—" : v.toFixed(0) + "%";
        row.el.querySelector(".race-rank").textContent = i + 1;
        row.el.classList.toggle("top1", step > 0 && i === 0);
        row.el.classList.toggle("top3", step > 0 && i > 0 && i < 3);
      });
      chipEls.forEach(function (c, i) {
        c.classList.toggle("on", i === step);
        c.setAttribute("aria-pressed", i === step ? "true" : "false");
      });
      status.textContent = step === 0 ? T.start
        : step === steps ? T.final + " · " + steps + " " + T.of + " " + steps + timeNote(step).replace(/^ · [^(]*\(/, " · ").replace(/\)$/, "")
        : T.after + " " + step + " " + T.of + " " + steps + ": " + data.tests[step - 1].label +
          (dates[step - 1] ? " · " + dates[step - 1] : "") + timeNote(step);
      if (!timer) button.textContent = step === steps ? T.replay : T.play;
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
      button.textContent = current === steps ? T.replay : T.play;
    }

    function play() {
      if (current === steps) show(0);
      button.textContent = T.pause;
      timer = setInterval(function () {
        if (current >= steps) { stop(); return; }
        show(current + 1);
        if (current >= steps) stop();
      }, STEP_MS);
    }

    button.addEventListener("click", function () { if (timer) stop(); else play(); });
    list.style.setProperty("--race-rows", rows.length);

    if (reduced) { show(steps); return; }
    show(0);
    // Запуск один раз, когда блок появляется на экране.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); play(); }
      }, { threshold: 0.35 });
      io.observe(section);
    } else {
      show(steps);
    }
  }

  document.querySelectorAll("[data-race-source]").forEach(build);
})();
