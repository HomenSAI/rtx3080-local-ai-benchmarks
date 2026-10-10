# Инструкция по установке

> Версия 1.5 · Даты тестов: 2026-09-29 – 2026-10-06 (железо: RTX 3080 10 ГБ, i7-4770, 32 ГБ ОЗУ). Автор эксперимента: https://homensai.com/

1. Требования: Windows 10/11 + WSL2, Docker Desktop с поддержкой NVIDIA GPU, видеокарта NVIDIA (проверено: RTX 3080 10 ГБ), 32 ГБ ОЗУ, около 120 ГБ диска под модели.
2. Склонируйте серверный репозиторий [homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab); там скопируйте .env.example в .env и укажите MODEL_DIR — папку с моделями .gguf.
3. Создайте ~/.wslconfig: memory=18GB, swap=4GB, autoMemoryReclaim=dropCache; выполните wsl --shutdown и перезапустите Docker Desktop.
4. Соберите образы в серверном репозитории: docker compose build llama-swap-gateway.
5. Скопируйте файлы моделей в том Docker llm-models-fast (см. scripts/ в серверном репозитории) или смонтируйте их только для чтения.
6. Запустите шлюз: docker compose --profile gateway up -d llama-swap-gateway; он отдаёт http://127.0.0.1:8080/v1 (OpenAI API) и выгружает простаивающие модели через 15 минут.
7. По желанию — перезапускаемый раннер тестов: docker build -t local/bench-runner:1 docker/bench-runner (в серверном репозитории) и запуск с монтированием docker.sock (см. scripts/bench/run_container.sh там).
8. Серверный код — в серверном репозитории. Здесь находятся раннеры и результаты тестов: tests/ (по папке на каждый тест).
