// HomenS.AI Style · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/
// Общий запуск каждой страницы сайта по SITE_RULES.md: кнопка темы в шапке, подвал, ссылки автора, блок «Контакт», робот.
// Подключать последним из файлов ядра (после brand.js, ui.js, brand-ui.js и, если есть, robot.js, motion.js, logo-word.js).
// Язык подписей — по <html lang>. Кнопка «Наверх» включается сама в js/ui.js. Без inline-кода: работает при строгой CSP.
(function () {
  "use strict";
  var H = window.HomenS;
  if (!H || !H.ui || !H.brandUi) throw new Error("site-init.js: подключите js/brand.js, js/ui.js и js/brand-ui.js раньше");
  var lang = (document.documentElement.lang || "ru").slice(0, 2);
  var THEME = {
    ru: { toLight: "Светлая тема", toDark: "Тёмная тема" },
    en: { toLight: "Light theme", toDark: "Dark theme" },
    de: { toLight: "Helles Design", toDark: "Dunkles Design" }
  };

  // Кнопка темы — последним пунктом в правой части шапки (один раз, даже если скрипт подключён дважды).
  var tools = document.getElementById("tools");
  if (tools && !tools.querySelector(".theme-toggle")) {
    var li = document.createElement("li");
    li.appendChild(H.ui.themeButton(THEME[lang] || THEME.en));
    tools.appendChild(li);
  }

  // Подвал строится из данных бренда; набирать его руками нельзя.
  var footer = document.getElementById("footer");
  if (footer) H.brandUi.renderFooter(footer, lang);

  // Страница «Об авторе»: плашки ссылок и робот со знаком.
  var links = document.getElementById("author-links");
  if (links) H.brandUi.renderAuthorLinks(links, lang);
  var robo = document.getElementById("robo");
  if (robo && H.robot && !robo.closest("#contact")) {
    var robot = H.robot.tvRobot(robo);
    var replay = document.getElementById("robo-replay");
    if (replay) replay.addEventListener("click", function () { robot.play(); });
    robo.addEventListener("click", function () { robot.play(); });
    robot.play();
  }

  // Страница или секция «Контакт»: блок из brand.json, робот справа строится самим блоком.
  var contact = document.getElementById("contact");
  if (contact) H.brandUi.renderContact(contact, lang, { heading: contact.getAttribute("data-heading") || "h2" });
})();
