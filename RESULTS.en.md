<!-- HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/ -->
# Results and comparisons

> Version 1.9 · Test dates: 2026-09-29 – 2026-10-06 (hardware: RTX 3080 10 GB, i7-4770, 32 GB RAM). Author of the experiment: https://homensai.com/

## Leaders

| Quality % | Bonsai-2-27B (85), Qwen3-VL-8B (81), Spark-X2.5-4B-Q8 (75) |
| German /30 | Bonsai-2-27B (23), Qwen3.5-9B-MTP (22), Qwen3.5-9B (22) |
| Math+Phys /40 | Qwen3.5-9B (40), Bonsai-2-27B (40), Ornith-1.5-9B (40) |
| Programming /20 | Qwen3.5-9B (18), Bonsai-2-27B (18), Qwen3.5-9B-MTP (17) |
| tok/s | MiniCPM5-2B-Q4 (171.6), MiniCPM5-2B-Q8 (138.7), Qwen2.5-VL-7B (101.3) |
| Max context | Ornith-1.5-9B (262144), Qwen3.5-9B-MTP (262144), Qwen3.5-9B (262144) |

## All kept models

| Model | Quality % | German /30 | Math+Phys /40 | Chem /10 | Programming /20 | tok/s | Max context |
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

## Context window: maximum, recommended and ideal combination (tokens / generation tok/s)

| Model | MAX context (KV q4) / tok/s | KV q8 / tok/s | KV f16 (fastest) / tok/s | Recommended (live profile) | Ideal combination |
|---|---|---|---|---|---|
| Qwen3.5-9B-MTP | 262144 / 36.5 | 131072 / 54.1 | 98304 / 55.0 | 196608 | Q4_K_XL + MTP + KV q4, thinking off |
| Qwen3.5-9B | 262144 / 37.9 | 196608 / 46.0 | 131072 / 57.3 | 262144 | Q5_K_S + KV q4 (long documents) |
| MiniCPM5-2B-Q8 | — | — | 131072 / 65.5 | 131072 | Q8_0 + KV f16 (max and fastest) |
| Spark-X2.5-4B-Q8 | 262144 / 31.9 | — | 98304 / 55.6 | 262144 | Q8_0 + KV q4 |
| Bonsai-2-27B | 131072 / 22.7 | 98304 / 27.1 | — | 131072 | PTQ1_0 + KV q4, thinking off (it loops with thinking) |
| Qwen3-VL-8B | 65536 / 35.9 | — | — | 65536 | Q4_K_M + mmproj F16 + KV q4 |
| Ornith-1.5-9B | 262144 / 38.2 | 196608 / 47.1 | 131072 / 58.6 | 131072 | Q4_K_M + MTP + KV q4, thinking off |
| Qwen2.5-Coder-7B | — | 65536 / 48.3 | 65536 / 72.0 | 65536 | Q4_K_M + KV f16 |
| Llama-3.1-8B | — | 65536 / 39.6 | — | 65536 | Q4_K_M + KV q8 |
| Gemma-3-12B | 98304 / 43.3 | — | — | 65536 | Q4_K_M + KV q4 (tested max 98K, hung at 98K in soak) |
| MiMo-9B | 262144 / 37.1 | 196608 / 44.8 | 98304 / 62.9 | 262144 | Q4_K_M, no MTP (MTP slows x0.71) + KV q4, thinking off |

## Recommended settings per model (live gateway profiles)

| Gateway profile | Context (tokens) | KV cache | Accelerator | Thinking by default | tok/s (8K) | Best for |
|---|---|---|---|---|---|---|
| Qwen3.5-9B-MTP-Q4_K_XL | 196608 | q4_0 | MTP | off | 82.4 | general chat, code, math (fast, MTP) |
| Qwen3.5-9B-MTP-Q4_K_XL-Vision | 131072 | q4_0 | — | off | 82.4 | chat with images |
| Qwen3.5-9B-Q5_K_S | 262144 | q4_0 | — | off | 91.3 | long documents up to 262K |
| MiniCPM5-2B-Q8_0 | 131072 | f16 | — | off | 138.7 | fastest simple tasks, drafts |
| Spark-X2.5-4B-Q8_0 | 262144 | q4_0 | — | off | 79.3 | long context on a small model |
| Ternary-Bonsai-2-27B-PTQ1_0 | 131072 | q4_0 | — | off | 46.6 | smartest: hard questions, German, STEM, code |
| Qwen3-VL-8B-Instruct-Q4_K_M | 65536 | q4_0 | — | n/a | 86.7 | images + text, good general quality |
| Ornith-1.5-9B-MTP | 131072 | q4_0 | MTP | off | 83.8 | STEM and code (fast, MTP) |
| Qwen2.5-Coder-7B | 65536 | f16 | — | n/a | 100.8 | programming assistant, fast |
| Llama-3.1-8B | 65536 | q8_0 | — | n/a | 95.9 | English chat, tool use |
| Gemma-3-12B | 65536 | q4_0 | — | n/a | 61.8 | multilingual chat |
| MiMo-V2.6-Distill-Qwen-9B | 262144 | q4_0 | — | off | 82.3 | reasoning-style answers, 262K |
| Qwen3-Embedding-0.6B | 8192 | — | — | — | — | semantic search / RAG over documents |
| Qwen3-Embedding-4B | 8192 | — | — | — | — | semantic search / RAG over documents |

## Accelerators (tok/s without -> with)

| Profile | tok/s | x | verdict |
|---|---|---|---|
| Qwen3.5-9B-MTP-Q4_K_XL | 77.1 -> 111.0 | 1.44 | speeds up |
| Gemma-4-12B-it | 61.9 -> 97.2 | 1.57 | speeds up |
| Gemma-4-12B-it-QAT | 63.2 -> 101.2 | 1.6 | speeds up |
| Gemma-4-E4B-it | 94.2 -> 128.7 | 1.37 | speeds up |
| Ornith-1.5-9B-MTP | 78.4 -> 105.3 | 1.34 | speeds up |
| Ornith-1.5-9B-DFlash | 82.6 -> 111.0 | 1.34 | speeds up |
| MiMo-V2.6-Distill-Qwen-9B-MTP | 80.4 -> 57.1 | 0.71 | slows down |
| Qwen3-8B-Draft | 92.6 -> 20.8 | 0.22 | slows down |
| Qwen2.5-Coder-7B-Draft | 105.1 -> 76.8 | 0.73 | slows down |
| Llama-3.1-8B-Draft | 99.7 -> 75.0 | 0.75 | slows down |
| R1-Distill-Llama-8B-Draft | 100.7 -> 99.2 | 0.99 | no gain |
| Qwen3.5-9B-Q5_K_S-Draft | 90.5 -> 28.1 | 0.31 | slows down |
| MiMo-V2.6-Distill-Qwen-9B-Draft | 80.8 -> 26.3 | 0.33 | slows down |
| Gemma-3-12B-Draft | 57.5 -> 9.7 | 0.17 | slows down |

## Embeddings

| Embedding | dim | top-1 | verdict |
|---|---|---|---|
| Qwen3-Embedding-0.6B | 1024 | 6/6 | works |
| Qwen3-Embedding-4B | 2560 | 6/6 | works |

## Removed from the working list (no stable 64K GPU context)

| Model | best_ctx |
|---|---|
| Qwen3-8B | - |
| R1-Distill-Llama-8B | - |
| Mistral-Nemo-12B | - |
| Gemma-4-12B | - |
| Gemma-4-12B-QAT | - |
| Gemma-4-E4B | - |
| LFM2.5-2.6B | - |
| LFM2.5-8B-A1B | - |

> Numbers are for one machine (RTX 3080, i7-4770, 32 GB). Chemistry is saturated: 10 of 15 models score 10/10, so it separates only the weak ones.
