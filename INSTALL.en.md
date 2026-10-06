# Install guide

> Version 1.4 · Test dates: 2026-09-29 – 2026-10-06 (hardware: RTX 3080 10 GB, i7-4770, 32 GB RAM). Author of the experiment: https://homensai.com/

1. Requirements: Windows 10/11 + WSL2, Docker Desktop with NVIDIA GPU support, an NVIDIA GPU (tested: RTX 3080 10 GB), 32 GB RAM, ~120 GB disk for the models.
2. Clone the repository; copy server/.env.example to server/.env and set MODEL_DIR to the folder with the .gguf models.
3. Create ~/.wslconfig with memory=18GB, swap=4GB, autoMemoryReclaim=dropCache; run wsl --shutdown, restart Docker Desktop.
4. Build the image: docker compose build llama-swap-gateway (the Dockerfile is in server/).
5. Copy the model files into the Docker volume llm-models-fast (see server/scripts/) or mount them read-only.
6. Start the gateway: docker compose --profile gateway up -d llama-swap-gateway; it serves http://127.0.0.1:8080/v1 (OpenAI API) and unloads idle models after 15 min.
7. Optional: start the restartable test runner: docker build -t local/bench-runner:1 docker/bench-runner and run it with the docker.sock mount (see run_container.sh).
8. The complete program code is in server/ (scripts/, docker/, bench_results/) and tests/ (one folder per test).
