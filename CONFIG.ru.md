<!-- HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/ -->
# Настройки каждой модели (профили llama-swap)

> Версия 1.6 · Даты тестов: 2026-09-29 – 2026-10-06 (железо: RTX 3080 10 ГБ, i7-4770, 32 ГБ ОЗУ). Автор эксперимента: https://homensai.com/

Настройки каждой модели в шлюзе llama-swap; полная конфигурация сервера — в [репозитории сервера](https://github.com/HomenSAI/homensai-local-ai-lab). `/models/...` — путь внутри контейнера (том `llm-models-fast`). Флаги: `--ctx-size` — окно контекста, `-ctk/-ctv` — тип кэша KV (q4_0 — самое длинное окно, f16 — самый быстрый), `--spec-type draft-mtp` — ускоритель MTP, `--chat-template-kwargs` — рассуждение по умолчанию (запрос может включить его: `chat_template_kwargs: {enable_thinking: true}`), `--n-gpu-layers all --fit off` — всё на GPU, `--flash-attn on` обязателен для сжатого кэша KV.

Также нужны верхнеуровневые настройки: `globalTTL: 900`, группа `all-local-llm` с `exclusive: true, swap: true` (одна модель на GPU).

## Qwen3.5-9B-MTP-Q4_K_XL

```yaml
Qwen3.5-9B-MTP-Q4_K_XL:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/Qwen3/Qwen3.5-9B-UD-Q4_K_XL.gguf \
    --alias Qwen3.5-9B-MTP-Q4_K_XL \
    --n-gpu-layers all \
    --flash-attn on \
    --parallel 1 \
    --batch-size 512 \
    --ubatch-size 128 \
    --jinja \
    --metrics \
    --spec-type draft-mtp \
    --spec-draft-n-max 2 \
    --ctx-size 196608 \
    --cache-ram 4096 \
    -ctk q4_0 \
    -ctv q4_0 \
    --chat-template-kwargs '{"enable_thinking":false}'
  ttl: 900
  checkEndpoint: /health
```

## Qwen3.5-9B-MTP-Q4_K_XL-Vision

```yaml
Qwen3.5-9B-MTP-Q4_K_XL-Vision:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/Qwen3/Qwen3.5-9B-UD-Q4_K_XL.gguf \
    --mmproj /models/Qwen3/mmproj-F16.gguf \
    --alias Qwen3.5-9B-MTP-Q4_K_XL-Vision \
    --n-gpu-layers all \
    --flash-attn on \
    --parallel 1 \
    --batch-size 2048 \
    --ubatch-size 512 \
    --jinja \
    --metrics \
    --ctx-size 131072 \
    --cache-ram 4096 \
    -ctk q4_0 \
    -ctv q4_0 \
    --chat-template-kwargs '{"enable_thinking":false}'
  ttl: 900
  checkEndpoint: /health
```

## Qwen3.5-9B-Q5_K_S

```yaml
Qwen3.5-9B-Q5_K_S:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/Qwen3/Qwen3.5-9B-Q5_K_S-4.60bpw.gguf \
    --alias Qwen3.5-9B-Q5_K_S \
    --n-gpu-layers all \
    --flash-attn on \
    --parallel 1 \
    --batch-size 2048 \
    --ubatch-size 512 \
    --jinja \
    --metrics \
    --ctx-size 262144 \
    --cache-ram 4096 \
    -ctk q4_0 \
    -ctv q4_0 \
    --chat-template-kwargs '{"enable_thinking":false}'
  ttl: 900
  checkEndpoint: /health
```

## MiniCPM5-2B-Q8_0

```yaml
MiniCPM5-2B-Q8_0:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/MiniCPM5/MiniCPM5-2B-Q8_0.gguf \
    --alias MiniCPM5-2B-Q8_0 \
    --n-gpu-layers all \
    --flash-attn on \
    --parallel 1 \
    --batch-size 512 \
    --ubatch-size 128 \
    --jinja \
    --metrics \
    --ctx-size 131072 \
    --cache-ram 4096 \
    -ctk f16 \
    -ctv f16 \
    --chat-template-kwargs '{"enable_thinking":false}'
  ttl: 900
  checkEndpoint: /health
```

## Spark-X2.5-4B-Q8_0

```yaml
Spark-X2.5-4B-Q8_0:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/Spark/Spark-X2.5-4B-Q8_0.gguf \
    --alias Spark-X2.5-4B-Q8_0 \
    --n-gpu-layers all \
    --flash-attn on \
    --parallel 1 \
    --batch-size 512 \
    --ubatch-size 128 \
    --jinja \
    --metrics \
    --ctx-size 262144 \
    --cache-ram 4096 \
    -ctk q4_0 \
    -ctv q4_0 \
    --chat-template-kwargs '{"enable_thinking":false}'
  ttl: 900
  checkEndpoint: /health
```

## Ternary-Bonsai-2-27B-PTQ1_0

```yaml
Ternary-Bonsai-2-27B-PTQ1_0:
  cmd: |
    env LD_LIBRARY_PATH=/opt/prism:/usr/local/cuda/lib64 /opt/prism/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/Ternary-Bonsai-2-27B-PTQ1_0.gguf \
    --alias Ternary-Bonsai-2-27B-PTQ1_0 \
    --n-gpu-layers all \
    --flash-attn on \
    --parallel 1 \
    --batch-size 2048 \
    --ubatch-size 512 \
    --jinja \
    --metrics \
    --ctx-size 131072 \
    --cache-ram 4096 \
    -ctk q4_0 \
    -ctv q4_0 \
    --chat-template-kwargs '{"enable_thinking":false}'
  ttl: 900
  checkEndpoint: /health
```

## Qwen3-VL-8B-Instruct-Q4_K_M

```yaml
Qwen3-VL-8B-Instruct-Q4_K_M:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/Qwen-Image-2.1/text_encoder/Qwen3VL-8B-Instruct-Q4_K_M.gguf \
    --mmproj /models/Qwen-Image-2.1/text_encoder/mmproj-Qwen3VL-8B-Instruct-F16.gguf \
    --alias Qwen3-VL-8B-Instruct-Q4_K_M \
    --n-gpu-layers all \
    --flash-attn on \
    --parallel 1 \
    --batch-size 2048 \
    --ubatch-size 512 \
    --jinja \
    --metrics \
    --ctx-size 65536 \
    --cache-ram 4096 \
    -ctk q4_0 \
    -ctv q4_0
  ttl: 900
  checkEndpoint: /health
```

## Ornith-1.5-9B-MTP

```yaml
Ornith-1.5-9B-MTP:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/top/Ornith-1.5-9B/Ornith-1.5-9B-Q4_K_M.gguf \
    --alias Ornith-1.5-9B-MTP \
    --flash-attn on \
    --parallel 1 \
    --n-gpu-layers all \
    --fit off \
    --spec-type draft-mtp \
    --spec-draft-model /models/top/Ornith-1.5-9B/mtp-head/mtp-Ornith-1.5-9B-head-Q8_0.gguf \
    --spec-draft-n-max 3 \
    --jinja \
    --metrics \
    --ctx-size 131072 \
    --cache-ram 4096 \
    -ctk q4_0 \
    -ctv q4_0 \
    --chat-template-kwargs '{"enable_thinking":false}'
  ttl: 900
  checkEndpoint: /health
```

## Qwen3-Embedding-0.6B

```yaml
Qwen3-Embedding-0.6B:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/top/Qwen3-Embedding-0.6B/Qwen3-Embedding-0.6B-Q8_0.gguf \
    --alias Qwen3-Embedding-0.6B \
    --embedding \
    --pooling last \
    --n-gpu-layers 99 \
    --ctx-size 8192 \
    --flash-attn on \
    --fit off \
    --metrics
  ttl: 900
  checkEndpoint: /health
```

## Qwen3-Embedding-4B

```yaml
Qwen3-Embedding-4B:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/top/Qwen3-Embedding-4B/Qwen3-Embedding-4B-Q4_K_M.gguf \
    --alias Qwen3-Embedding-4B \
    --embedding \
    --pooling last \
    --n-gpu-layers 99 \
    --ctx-size 8192 \
    --flash-attn on \
    --fit off \
    --metrics
  ttl: 900
  checkEndpoint: /health
```

## Qwen2.5-Coder-7B

```yaml
Qwen2.5-Coder-7B:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/cand/Qwen2.5-Coder-7B-Instruct/qwen2.5-coder-7b-instruct-q4_k_m.gguf \
    --alias Qwen2.5-Coder-7B \
    --flash-attn on \
    --parallel 1 \
    --n-gpu-layers all \
    --fit off \
    --jinja \
    --metrics \
    --ctx-size 65536 \
    --cache-ram 4096 \
    -ctk f16 \
    -ctv f16
  ttl: 900
  checkEndpoint: /health
```

## Llama-3.1-8B

```yaml
Llama-3.1-8B:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/cand/Llama-3.1-8B-Instruct/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \
    --alias Llama-3.1-8B \
    --flash-attn on \
    --parallel 1 \
    --n-gpu-layers all \
    --fit off \
    --jinja \
    --metrics \
    --ctx-size 65536 \
    --cache-ram 4096 \
    -ctk q8_0 \
    -ctv q8_0
  ttl: 900
  checkEndpoint: /health
```

## Gemma-3-12B

```yaml
Gemma-3-12B:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/cand/Gemma-3-12B-it/gemma-3-12b-it-Q4_K_M.gguf \
    --alias Gemma-3-12B \
    --flash-attn on \
    --parallel 1 \
    --n-gpu-layers all \
    --fit off \
    --jinja \
    --metrics \
    --ctx-size 65536 \
    --cache-ram 4096 \
    -ctk q4_0 \
    -ctv q4_0
  ttl: 900
  checkEndpoint: /health
```

## MiMo-V2.6-Distill-Qwen-9B

```yaml
MiMo-V2.6-Distill-Qwen-9B:
  cmd: |
    /app/llama-server \
    --host 127.0.0.1 \
    --port ${PORT} \
    --model /models/top/MiMo-V2.6-Distill-Qwen-9B/MiMo-V2.6-Distill-Qwen-9B-Q4_K_M.gguf \
    --alias MiMo-V2.6-Distill-Qwen-9B \
    --flash-attn on \
    --parallel 1 \
    --n-gpu-layers all \
    --fit off \
    --jinja \
    --metrics \
    --ctx-size 262144 \
    --cache-ram 4096 \
    -ctk q4_0 \
    -ctv q4_0 \
    --chat-template-kwargs '{"enable_thinking":false}'
  ttl: 900
  checkEndpoint: /health
```
