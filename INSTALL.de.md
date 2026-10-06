# Installationsanleitung

> Version 1.4 · Testdaten: 2026-09-29 – 2026-10-06 (Hardware: RTX 3080 10 GB, i7-4770, 32 GB RAM). Autor des Experiments: https://homensai.com/

1. Voraussetzungen: Windows 10/11 + WSL2, Docker Desktop mit NVIDIA-GPU-Unterstützung, NVIDIA-Grafikkarte (getestet: RTX 3080 10 GB), 32 GB RAM, ca. 120 GB Speicher für die Modelle.
2. Repository klonen; server/.env.example nach server/.env kopieren und MODEL_DIR auf den Ordner mit den .gguf-Modellen setzen.
3. ~/.wslconfig anlegen: memory=18GB, swap=4GB, autoMemoryReclaim=dropCache; wsl --shutdown ausführen und Docker Desktop neu starten.
4. Images bauen: docker compose build llama-swap-gateway (Dockerfiles liegen in server/).
5. Modelldateien in das Docker-Volume llm-models-fast kopieren (siehe server/scripts/) oder schreibgeschützt einbinden.
6. Gateway starten: docker compose --profile gateway up -d llama-swap-gateway; es stellt http://127.0.0.1:8080/v1 (OpenAI-API) bereit und entlädt Leerlauf-Modelle nach 15 Min.
7. Optional: neu startender Test-Runner: docker build -t local/bench-runner:1 docker/bench-runner und Start mit docker.sock-Mount (siehe run_container.sh).
8. Der vollständige Programmcode liegt in server/ (scripts/, docker/, bench_results/) und tests/ (ein Ordner pro Test).
