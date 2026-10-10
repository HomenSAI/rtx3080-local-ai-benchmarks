// HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/
// Страница «Об авторе»: робот и ссылки строятся из данных бренда (js/brand.js). Без inline-кода, при строгой CSP.
(function () {
  "use strict";
  var H = window.HomenS;
  var lang = document.documentElement.lang || "ru";

  var host = document.getElementById("robo");
  if (host && H.robot) {
    var robot = H.robot.tvRobot(host);
    var replay = document.getElementById("robo-replay");
    if (replay) replay.addEventListener("click", function () { robot.play(); });
    host.addEventListener("click", function () { robot.play(); });
    robot.play();
  }

  var links = document.getElementById("author-links");
  if (links) H.brandUi.renderAuthorLinks(links, lang);

  // Адрес виден как «info [at] homensai [dot] com»; mailto собирается из частей только при наведении или клике.
  var mail = document.getElementById("author-mail");
  if (mail && H.brand.author) {
    var a = document.createElement("a");
    a.textContent = H.brand.author.email_display;
    mail.replaceChildren(H.brandUi.protectMail(a));
  }
})();
