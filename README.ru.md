<!-- HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/ -->
# Локальный ИИ-сервер на RTX 3080: протестировано 23 модели, оставлено 15

> Версия 1.14 · Даты тестов: 2026-09-29 – 2026-10-06 (железо: RTX 3080 10 ГБ, i7-4770, 32 ГБ ОЗУ). Автор эксперимента: https://homensai.com/

[English](README.en.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

## 1. Идея проекта

Цель: понять, какие локальные модели реально пригодны на одной RTX 3080 (10 ГБ видеопамяти) и 32 ГБ ОЗУ, запустить их через один шлюз (llama.cpp + llama-swap в Docker) и для каждой измерить максимальный *стабильный* контекст, качество (русский, логика, программирование, немецкий, школьные математика, физика, химия), ускорение от акселераторов (MTP, DFlash, черновые модели) и надёжность при длительной работе.

## 2. Правила и настройки

- Остаются только модели, у которых веса и кэш контекста помещаются в 10 ГБ видеопамяти; MoE 26–35B и плотные 14B сняты ещё до тестов.
- У каждой оставленной чат-модели должен быть стабильный контекст не менее 64K токенов на GPU. «Стабильно» = сервер стартует, находит 3 из 3 спрятанных фактов при заполнении 80%, скорость генерации не ниже 40% от скорости на 8K, пик видеопамяти не более 9990 МиБ.
- Только GPU. Режимы CPU/ОЗУ (кэш контекста в оперативной памяти, авто-раскладка на CPU) не засчитываются: там 1–3 токена/с. Любой перелив видеопамяти в оперативку на рабочем контексте снимает кандидата.
- Зависший запрос снимает профиль с теста с пометкой.
- Модели для картинок, видео и речи (Qwen-Image, Wan2.1, Whisper) не удаляются; для них отдельный отчёт.
- Ничего не удаляется автоматически: модели, не прошедшие критерии, помечаются как снятые с рабочего списка.
- Единый путь запуска: все модели стартуют через шлюз llama-swap; старые отдельные сервисы compose в архиве.
- Windows оставляет себе не менее 9–10 ГБ ОЗУ; виртуальная машина Docker/WSL ограничена (.wslconfig), контейнер cache-dropper сбрасывает файловый кэш.

## 3. Используемые модели

| Модель | Размер файла, ГБ | Макс. контекст | Статус | Скачать |
|---|---|---|---|---|
| Qwen3.5-9B-MTP | 7.05 | 262144 | оставлена | [unsloth/Qwen3.5-9B-MTP-GGUF](https://huggingface.co/unsloth/Qwen3.5-9B-MTP-GGUF) |
| Qwen3.5-9B | 5.16 | 262144 | оставлена | [byteshape/Qwen3.5-9B-GGUF](https://huggingface.co/byteshape/Qwen3.5-9B-GGUF) |
| MiniCPM5-2B-Q8 | 2.68 | 131072 | оставлена | [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) |
| MiniCPM5-2B-Q4 | 1.56 | 131072 | оставлена | [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) |
| Spark-X2.5-4B-Q8 | 4.38 | 262144 | оставлена | [XHToken/Spark-X2.5-4B-GGUF](https://huggingface.co/XHToken/Spark-X2.5-4B-GGUF) |
| Spark-X2.5-4B-Q4 | 2.6 | 262144 | оставлена | [XHToken/Spark-X2.5-4B-GGUF](https://huggingface.co/XHToken/Spark-X2.5-4B-GGUF) |
| Bonsai-2-27B | 5.95 | 131072 | оставлена | [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) |
| Qwen3-VL-8B | 6.19 | 65536 | оставлена | [Qwen/Qwen3-VL-8B-Instruct-GGUF](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct-GGUF) |
| Qwen3-8B | 5.03 | - | снята (<64K) | [Qwen/Qwen3-8B-GGUF](https://huggingface.co/Qwen/Qwen3-8B-GGUF) |
| Gemma-3-12B | 7.3 | 98304 | оставлена | [unsloth/gemma-3-12b-it-GGUF](https://huggingface.co/unsloth/gemma-3-12b-it-GGUF) |
| R1-Distill-Llama-8B | 4.92 | - | снята (<64K) | [unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF](https://huggingface.co/unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF) |
| Qwen2.5-Coder-7B | 4.68 | 65536 | оставлена | [Qwen/Qwen2.5-Coder-7B-Instruct-GGUF](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct-GGUF) |
| Qwen2.5-VL-7B | 6.04 | 65536 | оставлена | [ggml-org/Qwen2.5-VL-7B-Instruct-GGUF](https://huggingface.co/ggml-org/Qwen2.5-VL-7B-Instruct-GGUF) |
| Llama-3.1-8B | 4.92 | 65536 | оставлена | [bartowski/Meta-Llama-3.1-8B-Instruct-GGUF](https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF) |
| Mistral-Nemo-12B | 7.48 | - | снята (<64K) | [bartowski/Mistral-Nemo-Instruct-2407-GGUF](https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF) |
| Gemma-4-12B | 7.3 | - | снята (<64K) | [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF) |
| Gemma-4-12B-QAT | 7.15 | - | снята (<64K) | [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF) |
| Gemma-4-E4B | 5.97 | - | снята (<64K) | [unsloth/gemma-4-E4B-it-GGUF](https://huggingface.co/unsloth/gemma-4-E4B-it-GGUF) |
| LFM2.5-2.6B | 1.67 | - | снята (<64K) | [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) |
| LFM2.5-8B-A1B | 5.16 | - | снята (<64K) | [LiquidAI/LFM2.5-8B-A1B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B-GGUF) |
| MiMo-9B | 5.84 | 262144 | оставлена | [bartowski/MiMo-V2.6-Distill-Qwen-9B-GGUF](https://huggingface.co/bartowski/MiMo-V2.6-Distill-Qwen-9B-GGUF) |
| MiMo-9B-MTP | 6.1 | 262144 | оставлена | [VitreousCut/MiMo-V2.6-Distill-Qwen-9B-MTP-GGUF](https://huggingface.co/VitreousCut/MiMo-V2.6-Distill-Qwen-9B-MTP-GGUF) |
| Ornith-1.5-9B | 5.78 | 262144 | оставлена | [ornith-ai/Ornith-1.5-9B-GGUF](https://huggingface.co/ornith-ai/Ornith-1.5-9B-GGUF), [protoLabsAI/Ornith-1.5-9B-MTP-GGUF](https://huggingface.co/protoLabsAI/Ornith-1.5-9B-MTP-GGUF) |
| Qwen3-Embedding-0.6B | - | 8192 | оставлена | [Qwen/Qwen3-Embedding-0.6B-GGUF](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B-GGUF) |
| Qwen3-Embedding-4B | - | 8192 | оставлена | [Qwen/Qwen3-Embedding-4B-GGUF](https://huggingface.co/Qwen/Qwen3-Embedding-4B-GGUF) |
| Qwen-Image-2.1 | - | - | оставлена | [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) |

## 4. Принцип выбора моделей

Кандидаты (23 набора весов, квантизация Q4/Q5) выбраны среди открытых моделей 2026 года, помещающихся в 10 ГБ: Qwen3.5/3-VL/2.5, Gemma-3/4, Llama-3.1, Mistral-Nemo, MiMo, Ornith, MiniCPM5, Spark, LFM2.5, R1-Distill и троичная Bonsai-27B. Шаг 1 — загрузка, скорость, качество; шаг 2 — поиск максимального контекста; модели без стабильных 64K на GPU сняты; шаг 3 — ускорители; шаг 4 — школьные предметы и финальная проверка надёжности на 95% контекста через шлюз.

## 5. Принцип тестов

1. Общее качество: русский (пересказ, перевод), логика, инструкции, зрение, код — дата: 2026-09-30 – 2026-10-01
2. Немецкий пассив, 30 заданий, все формы — дата: 2026-10-01
3. Максимальный стабильный контекст: 3 факта на глубине 10/50/90%, заполнение 80%, KV f16/q8/q4 — дата: 2026-10-01 – 2026-10-02
4. Надёжность: заполнение 95% ×2, длинная генерация, проверка картинки, контроль VRAM/ОЗУ через шлюз — дата: 2026-10-03 – 2026-10-06
5. Математика и физика 11 класс, 40 сгенерированных задач с вычисляемыми ответами — дата: 2026-10-02
6. Химия 11 класс, 10 сгенерированных задач — дата: 2026-10-06
7. Программирование (написание кода): 20 задач на Python — модель пишет функцию, скрытые юнит-тесты проверяют её в песочнице без сети — дата: 2026-10-06
8. Ускорители и эмбеддинги: ток/с с MTP/DFlash/черновой моделью и без, точность поиска top-1 — дата: 2026-10-02

## 6. Принципы оценки

Общий тест: баллы автоматических проверок (факты, термины, формат) суммируются и показываются в %. Немецкий: верных заданий из 30. Математика/физика/химия: число после «ОТВЕТ:» с допуском 1–2%; режим рассуждения считается отдельно, показан лучший результат. Программирование: число из 20 задач на написание кода, прошедших скрытые юнит-тесты. Контекст: наибольшая стабильная ступень 64K/96K/128K/192K/256K. Ускорители: отношение медиан ток/с (≥1,10 помогает, <0,95 вредит). Надёжность: нет проблем = OK.

## 7. Результаты и сравнения

Лидеры:

| Качество % | Bonsai-2-27B (85), Qwen3-VL-8B (81), Spark-X2.5-4B-Q8 (75) |
| Немецкий /30 | Bonsai-2-27B (23), Qwen3.5-9B-MTP (22), Qwen3.5-9B (22) |
| Мат+физ /40 | Qwen3.5-9B (40), Bonsai-2-27B (40), Ornith-1.5-9B (40) |
| Программирование /20 | Qwen3.5-9B (18), Bonsai-2-27B (18), Qwen3.5-9B-MTP (17) |
| ток/с | MiniCPM5-2B-Q4 (171.6), MiniCPM5-2B-Q8 (138.7), Qwen2.5-VL-7B (101.3) |
| Макс. контекст | Ornith-1.5-9B (262144), Qwen3.5-9B-MTP (262144), Qwen3.5-9B (262144) |

Все оставленные модели:

| Модель | Качество % | Немецкий /30 | Мат+физ /40 | Химия /10 | Программирование /20 | ток/с | Макс. контекст |
|---|---|---|---|---|---|---|---|
| Bonsai-2-27B | 85 | 23 | 40 | 10 | 18 | 46.6 | 131072 |
| Qwen3-VL-8B | 81 | 21 | 38 | 10 | 17 | 86.7 | 65536 |
| Spark-X2.5-4B-Q8 | 75 | 9 | 39 | 10 | 14 | 79.3 | 262144 |
| Spark-X2.5-4B-Q4 | 75 | 7 | 35 | 10 | 12 | 88.3 | 262144 |
| Gemma-3-12B | 75 | 21 | 37 | 10 | 14 | 61.8 | 98304 |
| Qwen2.5-Coder-7B | 75 | 16 | 35 | 9 | 14 | 100.8 | 65536 |
| Llama-3.1-8B | 75 | 13 | 30 | 7 | 15 | 95.9 | 65536 |
| Qwen2.5-VL-7B | 74 | 13 | 31 | 9 | 10 | 101.3 | 65536 |
| Qwen3.5-9B-MTP | 67 | 22 | 39 | 10 | 17 | 82.4 | 262144 |
| MiMo-9B | 60 | 20 | 38 | 10 | 12 | 82.3 | 262144 |
| MiMo-9B-MTP | 60 | 20 | 38 | 10 | 12 | 81.9 | 262144 |
| Ornith-1.5-9B | 60 | 22 | 40 | 10 | 14 | 83.8 | 262144 |
| Qwen3.5-9B | 55 | 22 | 40 | 10 | 18 | 91.3 | 262144 |
| MiniCPM5-2B-Q4 | 50 | 5 | 33 | 6 | 12 | 171.6 | 131072 |
| MiniCPM5-2B-Q8 | 45 | 3 | 33 | 4 | 16 | 138.7 | 131072 |

Full tables: [RESULTS.ru.md](RESULTS.ru.md)

## 8. Проблемы и поломки (статистика и решения)

| Проблемы и решения |  |
|---|---|
| Загрузка моделей 6–14 минут с диска Windows (монтирование WSL 9p, 22–46 МБ/с) | Модели скопированы в том Docker на ext4 (llm-models-fast), проверены SHA256. |
| Нехватка памяти / падения виртуальной машины WSL при загрузках и тестах | Лимит памяти в .wslconfig, своп 4 ГБ, контейнер cache-dropper сбрасывает файловый кэш каждые 10 с. |
| Windows зависала и перезагружалась при переливе видеопамяти в ОЗУ | Не пробовать контексты сверх видеопамяти; сторож убивает сервер при свободной ОЗУ < 2 ГБ; лимит видеопамяти 9990 МиБ; лимит времени префилла. |
| Сторож ложно убивал пробы (файловый кэш ВМ) | cache-dropper (привилегированный контейнер) и метрика MemAvailable WSL внутри раннера. |
| Неверная оценка числа токенов для некоторых токенизаторов (MiniCPM) | Заполнение считается через /tokenize сервера. |
| Гибридные модели отвечали пусто (рассуждение съедало бюджет) | enable_thinking=false в обычных прогонах, большой бюджет при рассуждении; Gemma-4 и LFM2.5 всё равно теряют все 3 факта на 64K и сняты. |
| Режим кэша в ОЗУ (--no-kv-offload) зависал и считал на CPU (LFM2.5) | Режим убран из теста контекста; пик загрузки GPU записывается для каждой пробы. |
| Контекст 262K проходил при 80%, но при 95% уходил в перелив (головы MTP/DFlash требуют видеопамять) | Проверка 95% снизила Qwen3.5-MTP до 192K и Ornith-MTP до 128K; Ornith-DFlash снят. |
| Тестовый текст читался из папки Python на хосте, в контейнере его не было (фиктивные пробы 149 токенов) | Текст зафиксирован в отдельном файле; фиктивные пробы удалены и перепрогнаны. |
| Черновые модели замедляли (×0,17–0,75) | Оставлены только профили MTP/DFlash с измеренным ускорением. |
| Перезагрузка Windows убивала фоновые задачи | Конвейер перенесён в перезапускаемый контейнер-раннер; каждый этап продолжается с сохранённых результатов. |

## 9. Сервер и код тестов

**Все тесты в этом отчёте получены с помощью этого сервера: [HomenSAI/homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab).** Он был «двигателем» всего эксперимента — llama.cpp со шлюзом llama-swap в Docker, скрипты и раннеры тестов. Такой же сервер можно развернуть у себя: он работает так, как описано здесь, и с его помощью можно провести те же тесты и получить сопоставимые результаты. В этом репозитории — только готовый отчёт и наши исходные результаты (results/*.jsonl в каждой папке tests/), с которыми можно сравнивать.
<!--FOOT-->

---

## О проекте: идея, реализация, время, токены, инструменты и промпты

**Идея.** Владелец одной игровой видеокарты (RTX 3080, 10 ГБ) хотел узнать, какие локальные языковые модели реально полезны, при какой длине контекста они остаются стабильными и как запускать их все надёжно за одним OpenAI-совместимым адресом. Вместо доверия заявлениям авторов каждая модель измерена на одной машине одинаковыми тестами, а выводы превращены в рабочую конфигурацию сервера. Автор эксперимента: [https://homensai.com/](https://homensai.com/)

**Реализация.** Серверы llama.cpp работают в Docker за шлюзом llama-swap (одна модель на видеокарте, автоматическая смена и выгрузка). Python-раннер запускает каждую модель во временном контейнере, отправляет задания, автоматически проверяет ответы (числа, скрытые юнит-тесты, поиск фактов) и сохраняет каждый результат в JSON lines. Перезапускаемый контейнер-раннер продолжает работу после сбоя или перезагрузки. Правила, найденные по ходу (минимум 64K на GPU, без перелива в ОЗУ, обнаружение зависаний), закреплены в коде.

**Затраченное время.** Календарно: 2026-09-29 – 2026-10-06 (8 суток, с заменой железа: 16 → 32 ГБ ОЗУ 2026-10-01). Измеренное машинное время финальных прогонов: общий тест 32 мин, немецкий 20 мин, поиск контекста 8,5 ч (146 проб), школьные математика и физика 2,4 ч, химия 51 мин, код 14 мин, проверка надёжности 2 ч, ускорители и эмбеддинги около 1 ч — всего около 15 часов работы GPU; остальное календарное время ушло на настройку, загрузки (около 200 ГБ), конвертацию, исправления и ожидание перезапусков.

**Токены.** Только в школьных предметах и коде тестируемые модели сгенерировали около 1,03 млн выходных токенов (математика/физика 731 тыс., химия 235 тыс., код 64 тыс.), плюс пробы длинного контекста до 260 тыс. входных токенов каждая.

**Чем сделано.** OpenAI Codex (ChatGPT) как рабочий агент — настроил сервер, провёл все тесты и проанализировал результаты; llama.cpp (основной и форк PrismML для троичной Bonsai), llama-swap, Docker Desktop с WSL2 на Windows 10, Python 3, образ-песочница CadQuery (использовался только для эксперимента, позже удалённого).

**Лицензия.** Все материалы репозитория (результаты, таблицы, отчёты, документация, описания тестов) распространяются по [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ru): можно свободно копировать, распространять, изменять и использовать для любых целей, включая коммерческие, при обязательном указании автора эксперимента со ссылкой на https://homensai.com/ и с отметкой об изменениях. См. [LICENSE](LICENSE). Веса моделей в репозиторий не входят и сохраняют свои лицензии (см. страницы моделей по ссылкам выше). Это не юридическая консультация.

### Источники и сторонние компоненты

- [llama.cpp](https://github.com/ggml-org/llama.cpp) (upstream commit `81bc6b8`), [server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md), [speculative decoding / MTP](https://github.com/ggml-org/llama.cpp/blob/master/docs/speculative.md)
- [PrismML llama.cpp fork](https://github.com/PrismML-Eng/llama.cpp) (commit `adfffbe`) and [Bonsai demo / KV-cache notes](https://github.com/PrismML-Eng/Bonsai-demo/blob/main/KV-CACHE.md) — runtime for the ternary Bonsai-27B
- [llama-swap](https://github.com/mostlygeek/llama-swap) — the model gateway
- [Spark-X2.5](https://github.com/XHToken/Spark-X2.5) — Spark model runtime support
- [whisper.cpp](https://github.com/ggml-org/whisper.cpp) (commit `d09f61a`) and [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) (commit `3f8527a`, [Qwen-Image 2.1 guide](https://github.com/leejet/stable-diffusion.cpp/blob/3f8527a46c54ecf4cb4ed6003da8e8982283c73c/docs/qwen_image_2.1.md)) — speech and image runtimes
- [Docker Desktop](https://www.docker.com/products/docker-desktop/), [NVIDIA CUDA images](https://hub.docker.com/r/nvidia/cuda) (12.8.1)
- Accelerator / draft models: [Ornith-1.5-9B MTP head](https://huggingface.co/protoLabsAI/Ornith-1.5-9B-MTP-GGUF), [Ornith DFlash](https://huggingface.co/ornith-ai/Ornith-1.5-9B-DFlash), [MiMo MTP](https://huggingface.co/VitreousCut/MiMo-V2.6-Distill-Qwen-9B-MTP-GGUF), [MiniCPM5 DSpark](https://huggingface.co/openbmb/MiniCPM5-2B-DSpark-GGUF), [Qwen3-0.6B](https://huggingface.co/Qwen/Qwen3-0.6B-GGUF), [Qwen2.5-Coder-0.5B](https://huggingface.co/Qwen/Qwen2.5-Coder-0.5B-Instruct-GGUF), [Llama-3.2-1B](https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF), [Gemma-3-1B](https://huggingface.co/unsloth/gemma-3-1b-it-GGUF), [Qwen3.5-0.8B](https://huggingface.co/unsloth/Qwen3.5-0.8B-GGUF)
- All tested models: see the download links in the models table above.

### Права, лицензии третьих лиц и оговорки

- **Веса моделей здесь не распространяются.** Даны только ссылки на оригинальные страницы. У каждой модели своя лицензия и условия использования (например, Llama 3.1 — лицензия Llama Community License с обязанностями указания авторства и названия, Gemma — условия использования Google Gemma, у Qwen, MiniCPM, Spark, MiMo, Ornith, LFM, Bonsai и других свои условия). Перед загрузкой и использованием проверьте страницу модели по ссылке; мы не перепроверяли каждую лицензию.
- **Ответы моделей.** В исходных файлах результатов есть короткие ответы тестируемых моделей. Их использование регулируется условиями соответствующих моделей (некоторые запрещают использовать ответы для обучения других моделей).
- **Названия и товарные знаки** (Qwen, Llama, Gemma, Mistral, NVIDIA, RTX, Docker, OpenAI, ChatGPT, Codex, Hugging Face и другие) принадлежат их владельцам. Проект независимый, не связан с ними, не спонсируется и не одобрен ими.
- **Программы.** llama.cpp, llama-swap, whisper.cpp и stable-diffusion.cpp — проекты с открытым кодом (насколько нам известно, под лицензией MIT; форк PrismML следует llama.cpp). Их код здесь не копируется — только ссылки; наши настройки и Dockerfile находятся в отдельном репозитории сервера. Базовые образы NVIDIA CUDA и Docker Desktop используются на условиях их лицензий и не распространяются.
- **Тестовые данные.** Задания написаны или сгенерированы автором. Текст-наполнитель для длинного контекста собирается из исходников стандартной библиотеки Python (лицензия PSF); сам файл не включён — серверный проект собирает его из вашей установки Python (результаты могут слегка отличаться между версиями Python).
- **Приватность и безопасность.** Личных данных, паролей, токенов и ключей нет; локальные имена пользователей, пути и адреса локальной сети заменены заглушками. Подставьте `<YOUR_LAN_IP>` и секреты в своей установке и никогда не публикуйте их.
- **Точность и отсутствие гарантий.** Результаты — измерения на одной машине в указанные даты, предоставляются «как есть» без гарантий. Ответы моделей могут быть неверны; школьные тесты — бенчмарк, а не обучение и не профессиональный совет. Не опирайтесь на них в медицинских, юридических, финансовых и критичных для безопасности решениях.
- **Участие ИИ.** Настройку сервера, все прогоны тестов и анализ выполнил ИИ-агент OpenAI Codex (ChatGPT) под руководством автора.
- **Использование и удаление.** Использование разрешено на условиях лицензий выше со ссылкой на автора эксперимента: https://homensai.com/. Правообладатели, заметившие проблему, могут связаться с автором через этот сайт — материал будет исправлен или удалён.

**Использованные промпты.** Точные формулировки, отправленные моделям (полные списки заданий — в репозитории сервера):

```text
[German passive] Du bist Deutschlehrer. Antworte NUR mit dem vollständigen deutschen Satz bzw. der verlangten Form, ohne Erklärung, in einer Zeile. Formuliere den Satz im Passiv, wenn nicht anders verlangt; lass den Täter (von/durch ...) weg, außer die Aufgabe verlangt ihn.
  task example: Setze ins Passiv Präsens: Der Mechaniker repariert das Auto.

[Math / physics / chemistry, tail added to every task] Реши задачу. Покажи краткий ход решения. В последней строке напиши только: ОТВЕТ: <число> (без единиц измерения, десятичная дробь с точкой, большие и малые числа в виде 1.5e-3).
  task example: Найдите значение производной функции f(x) = 1x³ + (6)x² + (-3)x + (-7) в точке x₀ = 3.
  task example: Какой объём (л, н.у.) углекислого газа выделится при полном термическом разложении 50 г CaCO₃ (CaCO₃ → CaO + CO₂)? Ar(Ca)=40, Ar(C)=12, Ar(O)=16, Vm=22,4 л/моль.

[Coding, 20 tasks, suffix added to every task] Return only the complete Python code in one ```python block, no explanations.
  task example: Write a Python function `rle_encode(s: str) -> str` that run-length encodes a string: each run of the same character becomes the count followed by the character, e.g. "aaabcc" -> "3a1b2c". Empty string -> "".

[Long context] Below is a long document with three NOTE-* sentences hidden in it. <document> === END === Answer using only the hidden NOTE sentences, one short line each, format '1. answer':

[General test, Russian summary] Перескажи текст в 2–3 предложениях (не более 60 слов), сохранив главные факты. <text>
```

Author of the experiment / Автор эксперимента / Autor des Experiments: [https://homensai.com/](https://homensai.com/)
