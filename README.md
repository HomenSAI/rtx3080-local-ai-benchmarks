# Local LLM benchmarks on one RTX 3080 (10 GB)

**23 open models tested, 15 kept.** Which local language models are really usable on a single gaming GPU, how long a context they hold stably, and how to run them all behind one OpenAI-compatible endpoint.

> Version 1.4 · Test dates: 2026-09-29 – 2026-10-06 · Hardware: RTX 3080 10 GB, i7-4770, 32 GB RAM
> Author: **Serhii Khomenko** — [homensai.com](https://homensai.com/)

[English](README.en.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) · **Web version:** [index.html / reports](index.html) (EN/RU/DE, sortable tables)

## Goal

Instead of trusting vendor claims, measure every model on the same machine with the same tests and turn the findings into a working server configuration:

- run all models through **one gateway** (llama.cpp + llama-swap in Docker, one model on the GPU at a time);
- find the **largest stable context** for each model (GPU only, no spill of VRAM into system RAM);
- compare **quality** (Russian, logic, German, school math / physics / chemistry, programming);
- measure the **speed-up from accelerators** (MTP, DFlash, draft models) and long-run reliability.

Rule for every kept chat model: stable context of **at least 64K tokens on the GPU** (3 of 3 hidden facts found at 80% fill, speed above 40% of the 8K speed, VRAM peak ≤ 9990 MiB). Models below that were removed (8 of 23).

## Results: top 3 per test

| Test | 1st | 2nd | 3rd |
|---|---|---|---|
| General quality, % | Bonsai-2-27B — 85 | Qwen3-VL-8B — 81 | Spark-X2.5-4B-Q8, Spark-X2.5-4B-Q4, Gemma-3-12B, Qwen2.5-Coder-7B, Llama-3.1-8B — 75 (tie) |
| German passive, /30 | Bonsai-2-27B — 23 | Qwen3.5-9B-MTP, Qwen3.5-9B, Ornith-1.5-9B — 22 (tie) | Qwen3-VL-8B, Gemma-3-12B — 21 |
| Math + physics, /40 | Qwen3.5-9B, Bonsai-2-27B, Ornith-1.5-9B — 40 (tie) | Spark-X2.5-4B-Q8, Qwen3.5-9B-MTP — 39 | Qwen3-VL-8B, MiMo-9B, MiMo-9B-MTP — 38 |
| Chemistry, /10 | 10 of 15 models score 10/10 (e.g. Bonsai-2-27B, Qwen3-VL-8B, Qwen3.5-9B, Ornith-1.5-9B) | Qwen2.5-Coder-7B, Qwen2.5-VL-7B — 9 | Llama-3.1-8B — 7 |
| Programming, /20 | Qwen3.5-9B, Bonsai-2-27B — 18 (tie) | Qwen3-VL-8B, Qwen3.5-9B-MTP — 17 (tie) | MiniCPM5-2B-Q8 — 16 |
| Speed, tok/s (8K) | MiniCPM5-2B-Q4 — 171.6 | MiniCPM5-2B-Q8 — 138.7 | Qwen2.5-VL-7B — 101.3 |
| Max stable context | 262144 tokens: Qwen3.5-9B, Qwen3.5-9B-MTP, Ornith-1.5-9B, MiMo-9B, MiMo-9B-MTP, Spark-X2.5-4B-Q8/Q4 | 131072: Bonsai-2-27B, MiniCPM5-2B-Q8/Q4 | 98304: Gemma-3-12B |
| Accelerator speed-up | Gemma-4-12B-QAT (MTP) — ×1.60* | Gemma-4-12B (MTP) — ×1.57* | Qwen3.5-9B-MTP — ×1.44 |

\* Gemma-4 models were removed from the working list (they lose all 3 facts at 64K), so the best *usable* accelerated profiles are Qwen3.5-9B-MTP (×1.44), Ornith-1.5-9B-MTP (×1.34) and Ornith-1.5-9B-DFlash (×1.34). MiMo MTP and draft-model profiles slow generation down (×0.22–0.71) and are not used.

### Short conclusions

- **Smartest:** Ternary Bonsai-2-27B (best in quality and German, top in math, chemistry and programming) — at 46.6 tok/s.
- **Best all-rounder:** Qwen3.5-9B (40/40 math+physics, 18/20 code, 262K context, 91 tok/s); the MTP variant is faster with an accelerator.
- **Fastest:** MiniCPM5-2B (up to 171 tok/s) for simple tasks and drafts.
- **Long documents:** Qwen3.5-9B, Ornith-1.5-9B, MiMo-9B and Spark-X2.5-4B hold 262K context.

Full tables (all 15 kept models, recommended context and KV cache per model, accelerators): [RESULTS.en.md](RESULTS.en.md).

## What is in this repository

| Path | Content |
|---|---|
| [README.en.md](README.en.md) | full report: rules, models, test methods, scoring, problems and fixes |
| [RESULTS.en.md](RESULTS.en.md) | all result tables |
| [INSTALL.en.md](INSTALL.en.md), [CONFIG.en.md](CONFIG.en.md) | install guide and gateway configuration |
| `tests/` | task files, runners and our raw results (`results/*.jsonl`) |
| `server/` | Docker / llama-swap server setup (`server/.env.example` only, no secrets) |
| `index.html`, `report.*.html` | web version of the report |

To reproduce: run a runner from `tests/` against your own llama.cpp server on port 8090 and compare your `jsonl` with ours.

## Author

**Serhii Khomenko** — [homensai.com](https://homensai.com/) (GitHub: [HomenSAI](https://github.com/HomenSAI)). Idea, hardware, test design and decisions are the author's. The experiment and documents were prepared with the help of an AI agent (Claude Code) under the author's direction.

## License

Free to share and reuse **with mandatory attribution to the author: https://homensai.com/**.

- Results, tables and documents: [CC BY 4.0](LICENSE-DOCS.md).
- Program code and test tasks: [MIT](LICENSE) with the attribution line kept in every copy (see also [NOTICE](NOTICE)).
- Model weights are **not** distributed here; every model keeps its own license (links in [README.en.md](README.en.md)).

Results are measurements on one machine on the dates shown, provided "as is" without warranty.
