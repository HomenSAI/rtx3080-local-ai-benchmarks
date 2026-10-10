<!-- HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/ -->
# Changelog / История изменений / Änderungsprotokoll

Versioning rule / Правило версий / Versionsregel: first release 1.0, every published update +0.1 (1.1, 1.2, ...).

## 1.9 — 2026-10-10
- EN: New page "Recommended settings" (EN/RU/DE): which model for which task; an interactive picker — click a model to see its optimal and maximum mode (context, KV cache, accelerator, speed) and copy a ready llama-server command taken from the real gateway configuration; system settings for the local machine. The recommendations were derived autonomously by Claude Code, which set up the server, ran all tests and analysed the results.
- EN: Licence changed to CC BY 4.0 for the whole repository (texts, results and code): any use, including commercial, with mandatory attribution to the author (https://homensai.com/). `style/` keeps its own licence.
- EN: Model race: starts with the Start button on the left (pause and replay on the same button), each test lasts about 5 seconds and bars grow smoothly by collecting points; the race is shown only on the report page, the summary keeps text and tables.
- RU: Новая страница «Рекомендуемые настройки» (EN/RU/DE): какую модель брать под задачу; интерактивный выбор — нажмите на модель и увидите её оптимальный и максимальный режим (контекст, KV-кэш, ускоритель, скорость) и готовую команду llama-server из реальной конфигурации шлюза для копирования; системные настройки локальной машины. Рекомендации выведены автономно Claude Code, который настроил сервер, провёл все тесты и проанализировал результаты.
- RU: Лицензия всего репозитория (тексты, результаты и код) заменена на CC BY 4.0: любое использование, включая коммерческое, с обязательным указанием автора (https://homensai.com/). У `style/` своя лицензия.
- RU: Гонка моделей запускается кнопкой «Старт» слева (на ней же пауза и повтор), каждый тест длится около 5 секунд, столбцы плавно набирают очки; гонка показывается только в отчёте, в итоговом отчёте — текст и таблицы.
- DE: Neue Seite „Empfohlene Einstellungen“ (EN/RU/DE): welches Modell für welche Aufgabe; interaktive Auswahl — ein Klick auf ein Modell zeigt optimalen und maximalen Modus (Kontext, KV-Cache, Beschleuniger, Tempo) und einen fertigen llama-server-Befehl aus der echten Gateway-Konfiguration zum Kopieren; Systemeinstellungen für den lokalen Rechner. Die Empfehlungen hat Claude Code eigenständig abgeleitet: Server eingerichtet, alle Tests ausgeführt, Ergebnisse ausgewertet.
- DE: Lizenz des gesamten Repositorys (Texte, Ergebnisse und Code) auf CC BY 4.0 umgestellt: jede Nutzung, auch kommerziell, mit verpflichtender Nennung des Autors (https://homensai.com/). `style/` behält seine eigene Lizenz.
- DE: Modellrennen startet mit der Start-Taste links (Pause und Wiederholung auf derselben Taste), jeder Test dauert etwa 5 Sekunden, die Balken sammeln gleichmäßig Punkte; das Rennen erscheint nur im Bericht, die Zusammenfassung behält Text und Tabellen.

## 1.8 — 2026-10-10
- EN: Interactive "model race" on the report and summary pages: a horizontal bar chart replays the tests in their real order (with dates and measured GPU time); after each test a bar is the model's average so far, models overtake each other until the final ranking. Pure JavaScript, data read from the results table, core colours, respects reduced motion.
- EN: Texts shortened: duplicated result tables and long sections removed, tests and scoring merged into one table, prompts, sources and disclaimers moved into collapsible blocks; prompts now wrap instead of scrolling sideways. The misleading "weakest models" list was removed from the summary.
- EN: E-mail protected from harvesters: no plain address in any file; the mailto link is assembled only on hover, focus or click. Location removed from the author pages.
- RU: Интерактивная «гонка моделей» в отчёте и итоговом отчёте: горизонтальная гистограмма проигрывает тесты в реальном порядке (с датами и измеренным временем GPU); после каждого теста столбец — средний результат модели, модели обгоняют друг друга до итогового рейтинга. Чистый JavaScript, данные из таблицы результатов, цвета ядра, учитывается «уменьшить движение».
- RU: Тексты сокращены: убраны повторённые таблицы и длинные разделы, тесты и оценка сведены в одну таблицу, промпты, источники и оговорки свёрнуты в раскрывающиеся блоки; промпты переносятся по словам, а не прокручиваются вбок. Из итогового отчёта убран вводивший в заблуждение список «самых слабых».
- RU: Почта защищена от сборщиков: открытого адреса нет ни в одном файле, ссылка mailto собирается только при наведении, фокусе или клике. Со страниц автора убрано место.
- DE: Interaktives „Modellrennen“ im Bericht und in der Zusammenfassung: ein horizontales Balkendiagramm spielt die Tests in ihrer echten Reihenfolge ab (mit Daten und gemessener GPU-Zeit); nach jedem Test zeigt ein Balken den bisherigen Durchschnitt, Modelle überholen sich bis zum Endstand. Reines JavaScript, Daten aus der Ergebnistabelle, Farben des Kerns, berücksichtigt reduzierte Bewegung.
- DE: Texte gekürzt: doppelte Ergebnistabellen und lange Abschnitte entfernt, Tests und Bewertung in einer Tabelle, Prompts, Quellen und Hinweise in aufklappbaren Blöcken; Prompts brechen um statt seitlich zu scrollen. Die irreführende Liste „schwächste Modelle“ wurde aus der Zusammenfassung entfernt.
- DE: E-Mail vor Adresssammlern geschützt: keine Klartextadresse in den Dateien; der mailto-Link entsteht erst bei Hover, Fokus oder Klick. Ort von den Autorenseiten entfernt.

## 1.7 — 2026-10-10
- EN: Denser report tables: the page uses up to 1280 px while text keeps its reading width, model names stay on one line, headers are compact and wrap by words, two-column tables (problem → fix) wrap normally. No table spills past the page on desktop; on phones wide tables scroll inside their own box.
- RU: Таблицы отчёта стали плотнее: страница использует до 1280 px, а текст сохраняет удобную ширину; имена моделей не переносятся, заголовки компактнее и переносятся по словам, двухколоночные таблицы (проблема → решение) переносятся как обычный текст. На компьютере ни одна таблица не вылезает за страницу; на телефоне широкие таблицы прокручиваются внутри своего блока.
- DE: Dichtere Berichtstabellen: die Seite nutzt bis zu 1280 px, der Text behält seine Lesebreite; Modellnamen bleiben einzeilig, Überschriften sind kompakter und brechen nach Wörtern um, zweispaltige Tabellen (Problem → Lösung) brechen normal um. Auf dem Desktop ragt keine Tabelle über die Seite hinaus; auf dem Telefon scrollen breite Tabellen in ihrem eigenen Bereich.

## 1.6 — 2026-10-10
- EN: The repository is now a pure report: only test results (`tests/*/results/*.jsonl`), tables and HTML pages. All executable code was removed: test runners and task files (moved to the server project [homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab), `benchmarks/`), the install guide and the model configuration (`CONFIG.*`). Left: the page scripts (table sorting, theme, author page) and the author's time-tracking tool (`scripts/time_tracking.py`).
- EN: Whole site restyled to HomenS.AI Style 1.3.0 (copied into `style/`, pinned by `<meta name="homensai-style">`): header with logo, language switch, light and dark themes, footer from the brand data, phone layout; inline styles and scripts moved to `assets/`. Author pages in EN/RU/DE. Headline corrected to 15 kept models.
- EN: One licence for the whole repository: CC BY-NC 4.0 (non-commercial use only, attribution with a link to https://homensai.com/ is mandatory); `style/` keeps its own licence.
- RU: Репозиторий стал чистым отчётом: только результаты тестов (`tests/*/results/*.jsonl`), таблицы и HTML-страницы. Удалён весь исполняемый код: раннеры и файлы заданий тестов (перенесены в проект сервера [homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab), папка `benchmarks/`), инструкция по установке и настройки моделей (`CONFIG.*`). Остались скрипты страниц (сортировка таблиц, тема, страница автора) и учёт времени автора (`scripts/time_tracking.py`).
- RU: Весь сайт оформлен по стилю HomenS.AI 1.3.0 (скопирован в `style/`, закреплён метой `<meta name="homensai-style">`): шапка с логотипом, переключатель языков, светлая и тёмная темы, подвал из данных бренда, вёрстка для телефона; встроенные стили и скрипты вынесены в `assets/`. Страницы об авторе на трёх языках. Заголовок исправлен: оставлено 15 моделей.
- RU: Одна лицензия на весь репозиторий: CC BY-NC 4.0 (только некоммерческое использование, обязательна ссылка на автора https://homensai.com/); у `style/` своя лицензия.
- DE: Das Repository ist jetzt ein reiner Bericht: nur Testergebnisse (`tests/*/results/*.jsonl`), Tabellen und HTML-Seiten. Der gesamte ausführbare Code wurde entfernt: Test-Runner und Aufgabendateien (in das Server-Projekt [homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab), Ordner `benchmarks/`, verschoben), Installationsanleitung und Modellkonfiguration (`CONFIG.*`). Übrig sind die Seitenskripte (Tabellensortierung, Design, Autorenseite) und die Zeiterfassung des Autors (`scripts/time_tracking.py`).
- DE: Die gesamte Website ist auf den HomenS.AI-Stil 1.3.0 umgestellt (nach `style/` kopiert, über `<meta name="homensai-style">` festgelegt): Kopfzeile mit Logo, Sprachumschalter, helles und dunkles Design, Fußzeile aus den Markendaten, Layout für Telefone; eingebettete Stile und Skripte nach `assets/` verlegt. Autorenseiten in EN/RU/DE. Überschrift auf 15 behaltene Modelle korrigiert.
- DE: Eine Lizenz für das gesamte Repository: CC BY-NC 4.0 (nur nichtkommerzielle Nutzung, Nennung des Autors mit Link auf https://homensai.com/ ist Pflicht); `style/` behält seine eigene Lizenz.

## 1.5 — 2026-10-10
- EN: Server code moved to the separate repository [homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab) (`server/` removed from here); this repository keeps the test runners, raw results and HTML reports. GitHub release workflow added.
- RU: Серверная часть вынесена в отдельный репозиторий [homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab) (папка `server/` удалена отсюда); здесь остаются раннеры тестов, сырые результаты и HTML-отчёты. Добавлен workflow GitHub-релизов.
- DE: Serverteil in das eigene Repository [homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab) ausgelagert (Ordner `server/` hier entfernt); hier bleiben Test-Runner, Rohergebnisse und HTML-Berichte. GitHub-Release-Workflow ergänzt.
- EN: Licences changed to noncommercial use with mandatory attribution (code: PolyForm Noncommercial 1.0.0; results and documents: CC BY-NC 4.0); author block with ORCID added to README; index page restyled with the homensai-website design tokens (colours, dark theme, radius).
- RU: Лицензии переведены на некоммерческое использование с обязательным указанием автора (код: PolyForm Noncommercial 1.0.0; результаты и документы: CC BY-NC 4.0); в README добавлен блок об авторе с ORCID; страница index оформлена по дизайн-токенам homensai-website (цвета, тёмная тема, скругления).
- DE: Lizenzen auf nichtkommerzielle Nutzung mit Pflicht zur Urheberangabe umgestellt (Code: PolyForm Noncommercial 1.0.0; Ergebnisse und Dokumente: CC BY-NC 4.0); Autorenblock mit ORCID in README ergänzt; index-Seite nach den Design-Tokens von homensai-website gestaltet (Farben, dunkles Thema, Radius).

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
