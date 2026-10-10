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

  // Адрес выводится как «info [at] homensai [dot] com»; ссылка mailto строится из полного адреса.
  var mail = document.getElementById("author-mail");
  if (mail && H.brand.author) {
    var a = document.createElement("a");
    a.href = "mailto:" + H.brand.author.email;
    a.textContent = H.brand.author.email_display;
    mail.replaceChildren(a);
  }
})();
