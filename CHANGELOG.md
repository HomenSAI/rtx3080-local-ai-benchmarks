<!-- HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/ -->
# Changelog / История изменений / Änderungsprotokoll

Versioning rule / Правило версий / Versionsregel: first release 1.0, every published update +0.1 (1.1, 1.2, ...).

## 1.6 — 2026-10-10
- EN: The report is restyled to the HomenS.AI style 1.3.0 (copied into `style/`, pinned in every page by `<meta name="homensai-style">`): common header with logo, language switch, footer from the brand data, light and dark themes, phone-width layout. Inline styles and scripts moved to `assets/`. Headline of the English and German reports corrected to 15 kept models; a stray markdown fragment in the summary removed. Landing page `index.html` added.
- RU: Отчёт переведён на стиль HomenS.AI 1.3.0 (скопирован в `style/`, закреплён в каждой странице метой `<meta name="homensai-style">`): общая шапка с логотипом, переключатель языков, подвал из данных бренда, светлая и тёмная темы, вёрстка для телефона. Встроенные стили и скрипты вынесены в `assets/`. Исправлен заголовок немецкого и английского отчётов (15 моделей), убран остаток markdown в итоговом отчёте. Добавлена стартовая страница `index.html`.
- DE: Der Bericht ist auf den HomenS.AI-Stil 1.3.0 umgestellt (nach `style/` kopiert, auf jeder Seite über `<meta name="homensai-style">` festgelegt): gemeinsame Kopfzeile mit Logo, Sprachumschalter, Fußzeile aus den Markendaten, helles und dunkles Design, Layout für Telefone. Eingebettete Stile und Skripte nach `assets/` verlegt. Überschrift des englischen und deutschen Berichts auf 15 Modelle korrigiert; Markdown-Rest im Kurzbericht entfernt. Startseite `index.html` hinzugefügt.

## 1.5 — 2026-10-06
- EN: The repository is now a pure report: all executable code (server, Docker files, scripts, test runners) and the install guide were removed. Everything was obtained with the separate server project https://github.com/HomenSAI/homensai-local-ai-lab, which can be deployed to repeat the tests; the documents link to it. Headline fixed to 15 kept models.
- RU: Репозиторий стал чистым отчётом: удалён весь исполняемый код (сервер, Docker-файлы, скрипты, раннеры тестов) и инструкция по установке. Все тесты получены с помощью отдельного проекта сервера https://github.com/HomenSAI/homensai-local-ai-lab, который можно развернуть и повторить тесты; документы ссылаются на него. Заголовок исправлен: оставлено 15 моделей.
- DE: Das Repository ist jetzt ein reiner Bericht: Der gesamte ausführbare Code (Server, Docker-Dateien, Skripte, Test-Runner) und die Installationsanleitung wurden entfernt. Alle Tests entstanden mit dem separaten Server-Projekt https://github.com/HomenSAI/homensai-local-ai-lab, das sich einrichten lässt, um die Tests zu wiederholen; die Dokumente verlinken darauf. Überschrift korrigiert: 15 behaltene Modelle.

## 1.4 — 2026-10-06
- EN: Documentation reworded for third-party readers: removed owner-specific delete commands and local folder names.
- RU: Документы переписаны для сторонних читателей: убраны команды удаления и локальные папки владельца.
- DE: Dokumente für Dritte umformuliert: eigentümerspezifische Löschbefehle und lokale Ordner entfernt.

## 1.3 — 2026-10-06
- EN: Security/rights clean-up: removed bundled third-party llama.cpp converter sources and the removed CAD sandbox from the repository; full secret scan (no keys, tokens, passwords, personal data found).
- RU: Очистка секретов и прав: из репозитория убраны вложенные исходники конвертера llama.cpp (чужой код) и песочница CAD; выполнена полная проверка на секреты (ключей, токенов, паролей и личных данных нет).
- DE: Bereinigung Geheimnisse/Rechte: fremde llama.cpp-Konverter-Quellen und die entfernte CAD-Sandbox aus dem Repository entfernt; vollständiger Geheimnis-Scan (keine Schlüssel, Tokens, Passwörter oder persönliche Daten).

## 1.2 — 2026-10-06
- EN: The statistics web console (localhost:8766) and its report services were removed from this repository; they are published separately. Compose, scripts and install guide now cover only the AI server (llama.cpp + llama-swap).
- RU: Веб-консоль статистики (localhost:8766) и её сервисы отчётов убраны из этого репозитория, они публикуются отдельно. Compose, скрипты и инструкция по установке теперь описывают только ИИ-сервер (llama.cpp + llama-swap).
- DE: Die Statistik-Webkonsole (localhost:8766) und ihre Berichtsdienste wurden aus diesem Repository entfernt und werden separat veröffentlicht. Compose, Skripte und Installationsanleitung betreffen nur noch den KI-Server (llama.cpp + llama-swap).

## 1.1 — 2026-10-06
- EN: Sortable tables in all HTML pages (click a header; top 3 values highlighted); sources, rights/licence sections; programming test renamed; download links.
- RU: Сортировка таблиц во всех HTML-страницах (клик по заголовку; три лучших значения подсвечиваются); разделы источников, прав и лицензии; тест переименован в «Программирование»; ссылки на загрузку.
- DE: Sortierbare Tabellen in allen HTML-Seiten (Klick auf Überschrift; Top-3-Werte hervorgehoben); Abschnitte Quellen, Rechte und Lizenz; Test in „Programmierung“ umbenannt; Download-Links.

## 1.0 — 2026-10-06
- EN: First public release. 23 models tested on RTX 3080 10 GB, 14 gateway profiles kept; tests: general quality, German passive, max stable context, reliability, math/physics, chemistry, programming (20 tasks), accelerators and embeddings; docs in EN/RU/DE; licences CC BY 4.0 + MIT.
- RU: Первый публичный выпуск. 23 модели проверены на RTX 3080 10 ГБ, оставлено 14 профилей шлюза; тесты: общее качество, немецкий пассив, максимальный стабильный контекст, надёжность, математика/физика, химия, программирование (20 задач), ускорители и эмбеддинги; документы на EN/RU/DE; лицензии CC BY 4.0 + MIT.
- DE: Erste öffentliche Veröffentlichung. 23 Modelle auf RTX 3080 10 GB getestet, 14 Gateway-Profile behalten; Tests: Allgemeinqualität, deutsches Passiv, maximaler stabiler Kontext, Zuverlässigkeit, Mathe/Physik, Chemie, Programmierung (20 Aufgaben), Beschleuniger und Embeddings; Dokumente auf EN/RU/DE; Lizenzen CC BY 4.0 + MIT.
