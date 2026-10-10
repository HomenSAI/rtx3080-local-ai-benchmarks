// HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/
// «Гонка моделей»: горизонтальная гистограмма, которая проходит тесты по очереди в их реальном порядке.
// Каждый тест длится около 5 секунд: очки теста «набираются» плавно, столбец модели = накопленные очки
// (каждый тест в % от максимума), модели плавно обгоняют друг друга; в финале столбец = средний результат.
// Запуск — кнопкой «Старт» (повторное нажатие — пауза, в конце — «Ещё раз»); по чипу теста — переход к его итогу.
// Данные читаются из таблицы на странице (data-race-source), без inline-кода и внешних библиотек.
(function () {
  "use strict";

  var lang = document.documentElement.lang || "en";
  var TEXT = {
    en: { h: "h", min: "min", gpu: "GPU time", total: "total", start: "Start", pause: "Pause", resume: "Continue", replay: "Again",
          ready: "Final ranking. Press Start to replay the tests.", running: "Test", of: "of", final: "Final ranking" },
    ru: { h: "ч", min: "мин", gpu: "время GPU", total: "всего", start: "Старт", pause: "Пауза", resume: "Дальше", replay: "Ещё раз",
          ready: "Итоговый рейтинг. Нажмите «Старт», чтобы проиграть тесты по порядку.", running: "Тест", of: "из", final: "Итоговый рейтинг" },
    de: { h: "Std.", min: "Min.", gpu: "GPU-Zeit", total: "gesamt", start: "Start", pause: "Pause", resume: "Weiter", replay: "Noch einmal",
          ready: "Endstand. Start drücken, um die Tests der Reihe nach abzuspielen.", running: "Test", of: "von", final: "Endstand" }
  };
  var T = TEXT[lang] || TEXT.en;
  var TEST_MS = 5000;   // длительность одного теста
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
      models.push({
        name: cells[0].textContent.trim(),
        vals: tests.map(function (t) { var v = num(cells[t.col].textContent); return v === null ? 0 : v / t.max * 100; })
      });
    }
    return { tests: tests, models: models };
  }

  // Накопленные очки в момент t (0…steps): пройденные тесты целиком + текущий тест частично,
  // в % от максимума всех тестов. Столбцы растут от нуля, в финале длина = средний результат по всем тестам.
  function scoreAt(model, t) {
    if (t <= 0) return 0;
    var k = Math.floor(t), f = t - k, sum = 0, n = model.vals.length;
    for (var i = 0; i < Math.min(k, n); i++) sum += model.vals[i];
    if (f > 0 && k < n) sum += f * model.vals[k];
    return sum / n;
  }

  function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }

  function build(section) {
    var table = document.querySelector(section.getAttribute("data-race-source"));
    if (!table || table.rows.length < 3) return;
    var data = readTests(table);
    var steps = data.tests.length;
    var dates = (section.getAttribute("data-race-dates") || "").split("|");
    var minutes = (section.getAttribute("data-race-minutes") || "").split("|").map(parseFloat);

    var status = section.querySelector(".race-status");
    var chips = section.querySelector(".race-chips");
    var list = section.querySelector(".race-bars");
    var old = section.querySelector(".race-play");
    if (old) old.remove();   // кнопка справа больше не нужна: запуск — кнопкой «Старт» слева

    function dur(m) {
      m = Math.round(m);
      var h = Math.floor(m / 60), r = m % 60;
      return h ? h + " " + T.h + (r ? " " + r + " " + T.min : "") : r + " " + T.min;
    }
    function totalMin(k) { var s = 0; for (var i = 0; i < k; i++) s += minutes[i] || 0; return s; }

    var rows = data.models.map(function (m) {
      var li = document.createElement("li");
      li.className = "race-row";
      li.innerHTML = '<span class="race-rank"></span><span class="race-name"></span>' +
        '<span class="race-track"><span class="race-fill"></span></span><span class="race-val"></span>';
      li.querySelector(".race-name").textContent = m.name;
      li.title = m.name;
      list.appendChild(li);
      return { model: m, el: li, rank: -1 };
    });
    list.style.setProperty("--race-rows", rows.length);

    var play = document.createElement("button");
    play.type = "button";
    play.className = "chip race-start";
    chips.appendChild(play);
    var chipEls = data.tests.map(function (t, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = t.label;
      b.addEventListener("click", function () { stop(); render(i + 1); });
      chips.appendChild(b);
      return b;
    });

    var pos = steps, raf = null, last = 0;

    function render(t) {
      pos = t;
      var order = rows.slice().sort(function (a, b) {
        var d = scoreAt(b.model, t) - scoreAt(a.model, t);
        return Math.abs(d) > 1e-9 ? d : a.model.name.localeCompare(b.model.name);
      });
      order.forEach(function (row, i) {
        var v = scoreAt(row.model, t);
        if (row.rank !== i) { row.el.style.transform = "translateY(" + (i * 100) + "%)"; row.rank = i; }
        row.el.querySelector(".race-fill").style.width = v.toFixed(2) + "%";
        row.el.querySelector(".race-val").textContent = t <= 0 ? "—" : v.toFixed(0) + "%";
        row.el.querySelector(".race-rank").textContent = i + 1;
        row.el.classList.toggle("top1", t > 0 && i === 0);
        row.el.classList.toggle("top3", t > 0 && i > 0 && i < 3);
      });
      var cur = Math.min(steps, Math.ceil(t - 1e-9));   // номер идущего (или последнего) теста
      chipEls.forEach(function (c, i) {
        c.classList.toggle("on", i + 1 === cur);
        c.classList.toggle("done", i + 1 < cur || (t >= steps));
      });
      if (raf) {
        var k = Math.max(1, cur), pct = Math.round((t - (k - 1)) * 100);
        status.textContent = T.running + " " + k + " " + T.of + " " + steps + ": " + data.tests[k - 1].label +
          (dates[k - 1] ? " · " + dates[k - 1] : "") + " · " + Math.min(100, pct) + "%" +
          (minutes[k - 1] >= 0 ? " · " + T.gpu + " " + T.total + " " + dur(totalMin(k - 1) + (minutes[k - 1] || 0) * Math.min(1, t - (k - 1))) : "");
      } else if (t >= steps) {
        status.textContent = T.final + (minutes[0] >= 0 ? " · " + T.gpu + " " + T.total + " " + dur(totalMin(steps)) : "");
      } else {
        status.textContent = data.tests[cur - 1].label + (dates[cur - 1] ? " · " + dates[cur - 1] : "") +
          (minutes[cur - 1] >= 0 ? " · " + T.gpu + " " + dur(minutes[cur - 1]) + " (" + T.total + " " + dur(totalMin(cur)) + ")" : "");
      }
      label();
    }

    function label() {
      play.textContent = raf ? "❚❚ " + T.pause : (pos <= 0 || pos >= steps) ? (pos >= steps && started ? "↻ " + T.replay : "▶ " + T.start) : "▶ " + T.resume;
      play.classList.toggle("on", !!raf);
      play.setAttribute("aria-pressed", raf ? "true" : "false");
    }

    var started = false;

    function tick(now) {
      var dt = now - last; last = now;
      var t = Math.min(steps, pos + dt / TEST_MS);
      // Внутри теста результат набирается с плавным ускорением и замедлением.
      var k = Math.floor(t), shown = t >= steps ? steps : k + ease(t - k);
      pos = t;
      render(shown); pos = t;
      if (t >= steps) { raf = null; render(steps); return; }
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (pos >= steps) pos = 0;
      started = true;
      list.classList.add("racing");
      last = performance.now();
      raf = requestAnimationFrame(tick);
      label();
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      list.classList.remove("racing");
      label();
    }

    play.addEventListener("click", function () { if (raf) stop(); else start(); });

    status.textContent = T.ready;
    render(steps);
    status.textContent = T.ready;
    if (reduced) return;
  }

  document.querySelectorAll("[data-race-source]").forEach(build);
})();
