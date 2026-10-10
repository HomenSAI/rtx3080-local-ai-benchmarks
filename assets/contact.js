// HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/
// Страница «Контакт»: блок строится ядром стиля из данных бренда на языке страницы (как template/contact-init.js).
(function () {
  "use strict";
  var host = document.getElementById("contact");
  if (!host) return;
  var lang = (document.documentElement.lang || "en").slice(0, 2);
  HomenS.brandUi.renderContact(host, lang, { heading: host.getAttribute("data-heading") || "h2" });
})();
