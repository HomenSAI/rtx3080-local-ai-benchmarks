<!-- HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/ -->
# Local AI server on RTX 3080: 23 models tested, 15 kept

> Version 1.9 · Test dates: 2026-09-29 – 2026-10-06 (hardware: RTX 3080 10 GB, i7-4770, 32 GB RAM). Author of the experiment: https://homensai.com/

[English](README.en.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

## 1. Project idea

Goal: find which local LLMs are really usable on one RTX 3080 (10 GB VRAM) with 32 GB RAM, run them all through one gateway (llama.cpp + llama-swap in Docker), and measure for every model the largest *stable* context, quality (Russian, logic, programming, German, school math/physics/chemistry), the speed-up from accelerators (MTP, DFlash, draft models) and long-run reliability.

## 2. Rules and settings

- Only models whose weights + KV cache fit the 10 GB GPU are kept; MoE 26-35B and dense 14B models were dropped before testing.
- Every kept chat model must have a stable context of at least 64K tokens on the GPU. 'Stable' = server starts, 3 of 3 hidden facts are found at 80% fill, generation speed stays above 40% of the 8K speed, VRAM peak <= 9990 MiB.
- GPU only. CPU/RAM modes (KV cache in system RAM, auto-fit to CPU) are not counted: they run at 1-3 tokens/s. Any spill of VRAM into system RAM at the working context removes the candidate.
- A request that hangs removes the profile from the test with a note.
- Image, video and speech models (Qwen-Image, Wan2.1, Whisper) are never removed; they are documented separately.
- Nothing is deleted automatically: models that fail the criteria are marked as removed from the working list.
- Single launch path: every model is started through the llama-swap gateway; old per-model compose services are archived.
- Windows keeps at least 9-10 GB RAM; the Docker/WSL VM is limited (.wslconfig) and a cache-dropper container releases the page cache.

## 3. Models used

| Model | File size, GB | Max context | Status | Download |
|---|---|---|---|---|
| Qwen3.5-9B-MTP | 7.05 | 262144 | kept | [unsloth/Qwen3.5-9B-MTP-GGUF](https://huggingface.co/unsloth/Qwen3.5-9B-MTP-GGUF) |
| Qwen3.5-9B | 5.16 | 262144 | kept | [byteshape/Qwen3.5-9B-GGUF](https://huggingface.co/byteshape/Qwen3.5-9B-GGUF) |
| MiniCPM5-2B-Q8 | 2.68 | 131072 | kept | [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) |
| MiniCPM5-2B-Q4 | 1.56 | 131072 | kept | [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) |
| Spark-X2.5-4B-Q8 | 4.38 | 262144 | kept | [XHToken/Spark-X2.5-4B-GGUF](https://huggingface.co/XHToken/Spark-X2.5-4B-GGUF) |
| Spark-X2.5-4B-Q4 | 2.6 | 262144 | kept | [XHToken/Spark-X2.5-4B-GGUF](https://huggingface.co/XHToken/Spark-X2.5-4B-GGUF) |
| Bonsai-2-27B | 5.95 | 131072 | kept | [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) |
| Qwen3-VL-8B | 6.19 | 65536 | kept | [Qwen/Qwen3-VL-8B-Instruct-GGUF](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct-GGUF) |
| Qwen3-8B | 5.03 | - | removed (<64K) | [Qwen/Qwen3-8B-GGUF](https://huggingface.co/Qwen/Qwen3-8B-GGUF) |
| Gemma-3-12B | 7.3 | 98304 | kept | [unsloth/gemma-3-12b-it-GGUF](https://huggingface.co/unsloth/gemma-3-12b-it-GGUF) |
| R1-Distill-Llama-8B | 4.92 | - | removed (<64K) | [unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF](https://huggingface.co/unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF) |
| Qwen2.5-Coder-7B | 4.68 | 65536 | kept | [Qwen/Qwen2.5-Coder-7B-Instruct-GGUF](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct-GGUF) |
| Qwen2.5-VL-7B | 6.04 | 65536 | kept | [ggml-org/Qwen2.5-VL-7B-Instruct-GGUF](https://huggingface.co/ggml-org/Qwen2.5-VL-7B-Instruct-GGUF) |
| Llama-3.1-8B | 4.92 | 65536 | kept | [bartowski/Meta-Llama-3.1-8B-Instruct-GGUF](https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF) |
| Mistral-Nemo-12B | 7.48 | - | removed (<64K) | [bartowski/Mistral-Nemo-Instruct-2407-GGUF](https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF) |
| Gemma-4-12B | 7.3 | - | removed (<64K) | [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF) |
| Gemma-4-12B-QAT | 7.15 | - | removed (<64K) | [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF) |
| Gemma-4-E4B | 5.97 | - | removed (<64K) | [unsloth/gemma-4-E4B-it-GGUF](https://huggingface.co/unsloth/gemma-4-E4B-it-GGUF) |
| LFM2.5-2.6B | 1.67 | - | removed (<64K) | [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) |
| LFM2.5-8B-A1B | 5.16 | - | removed (<64K) | [LiquidAI/LFM2.5-8B-A1B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B-GGUF) |
| MiMo-9B | 5.84 | 262144 | kept | [bartowski/MiMo-V2.6-Distill-Qwen-9B-GGUF](https://huggingface.co/bartowski/MiMo-V2.6-Distill-Qwen-9B-GGUF) |
| MiMo-9B-MTP | 6.1 | 262144 | kept | [VitreousCut/MiMo-V2.6-Distill-Qwen-9B-MTP-GGUF](https://huggingface.co/VitreousCut/MiMo-V2.6-Distill-Qwen-9B-MTP-GGUF) |
| Ornith-1.5-9B | 5.78 | 262144 | kept | [ornith-ai/Ornith-1.5-9B-GGUF](https://huggingface.co/ornith-ai/Ornith-1.5-9B-GGUF), [protoLabsAI/Ornith-1.5-9B-MTP-GGUF](https://huggingface.co/protoLabsAI/Ornith-1.5-9B-MTP-GGUF) |
| Qwen3-Embedding-0.6B | - | 8192 | kept | [Qwen/Qwen3-Embedding-0.6B-GGUF](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B-GGUF) |
| Qwen3-Embedding-4B | - | 8192 | kept | [Qwen/Qwen3-Embedding-4B-GGUF](https://huggingface.co/Qwen/Qwen3-Embedding-4B-GGUF) |
| Qwen-Image-2.1 | - | - | kept | [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) |

## 4. How models were selected

Candidates (23 weights, Q4/Q5 quantisation) were chosen from the 2026 open models that fit 10 GB: Qwen3.5/3-VL/2.5, Gemma-3/4, Llama-3.1, Mistral-Nemo, MiMo, Ornith, MiniCPM5, Spark, LFM2.5, R1-Distill and the ternary Bonsai-27B. Step 1 measured load, speed and quality; step 2 searched the maximum context; models below 64K stable GPU context were removed; step 3 measured accelerators; step 4 ran school-subject tests and the final 95%-fill soak through the gateway.

## 5. How the tests work

1. General quality: Russian summary/translation, logic, instructions, vision, code — date: 2026-09-30 – 2026-10-01
2. German passive voice, 30 items, all forms — date: 2026-10-01
3. Maximum stable context: 3 needles at 10/50/90% depth, 80% fill, KV f16/q8/q4 — date: 2026-10-01 – 2026-10-02
4. Soak: 95% fill x2, long generation, image check, VRAM/RAM watch via the gateway — date: 2026-10-03 – 2026-10-06
5. Grade-11 math and physics, 40 generated problems, computed answers — date: 2026-10-02
6. Grade-11 chemistry, 10 generated problems — date: 2026-10-06
7. Programming (writing code): 20 Python tasks — the model writes a function, hidden unit tests check it in a no-network sandbox — date: 2026-10-06
8. Accelerators and embeddings: tokens/s with and without MTP/DFlash/draft, retrieval top-1 — date: 2026-10-02

## 6. How scores are calculated

General test: points per task from automatic graders (facts, terms, format) summed and shown in %. German: correct items of 30. Math/physics/chemistry: numeric answer after 'ANSWER:' within a relative tolerance (1-2%); thinking mode counted separately, best value shown. Programming: number of the 20 coding tasks whose hidden unit tests pass. Context: largest step of the ladder 64K/96K/128K/192K/256K that is stable. Accelerators: median tokens/s ratio (>=1.10 helps, <0.95 hurts). Soak: no problems = OK.

## 7. Results and comparisons

Leaders:

| Quality % | Bonsai-2-27B (85), Qwen3-VL-8B (81), Spark-X2.5-4B-Q8 (75) |
| German /30 | Bonsai-2-27B (23), Qwen3.5-9B-MTP (22), Qwen3.5-9B (22) |
| Math+Phys /40 | Qwen3.5-9B (40), Bonsai-2-27B (40), Ornith-1.5-9B (40) |
| Programming /20 | Qwen3.5-9B (18), Bonsai-2-27B (18), Qwen3.5-9B-MTP (17) |
| tok/s | MiniCPM5-2B-Q4 (171.6), MiniCPM5-2B-Q8 (138.7), Qwen2.5-VL-7B (101.3) |
| Max context | Ornith-1.5-9B (262144), Qwen3.5-9B-MTP (262144), Qwen3.5-9B (262144) |

All kept models:

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

Full tables: [RESULTS.en.md](RESULTS.en.md)

## 8. Problems and breakages (statistics and fixes)

| Problems and fixes |  |
|---|---|
| Model loads took 6-14 min from the Windows drive (WSL 9p mount, 22-46 MB/s) | Models copied into a Docker volume on ext4 (llm-models-fast), SHA256 verified. |
| WSL VM out-of-memory / crashes during downloads and tests | .wslconfig memory limit, 4 GB swap, cache-dropper container dropping page cache every 10 s. |
| Windows froze or rebooted when VRAM spilled into RAM (sysmem fallback) | Never probe contexts beyond VRAM; RAM guard kills the server if free host RAM < 2 GB; VRAM limit 9990 MiB; prefill time limit. |
| Probes falsely killed by the guard (VM page cache) | cache-dropper (privileged container) and WSL MemAvailable as the metric inside the runner. |
| Token estimate wrong for some tokenizers (MiniCPM) | Fill is computed with the server's /tokenize. |
| Hybrid models returned empty answers (thinking ate the budget) | enable_thinking=false for plain runs, large budget when thinking is on; Gemma-4 and LFM2.5 still lose all 3 facts at 64K and were removed. |
| RAM-KV mode (--no-kv-offload) hung and ran on CPU (LFM2.5) | Mode removed from the context test; GPU-utilisation peak is recorded per probe. |
| 262K contexts passed at 80% fill but spilled at 95% (MTP/DFlash heads need VRAM) | Soak at 95% lowered Qwen3.5-MTP to 192K and Ornith-MTP to 128K; Ornith-DFlash removed. |
| Test corpus read from the host Python folder, missing in the container (fake 149-token probes) | Corpus frozen in a fixed file; bogus probes deleted and rerun. |
| Draft-model accelerators slowed models down (x0.17-0.75) | Only MTP/DFlash profiles with measured speed-up are kept. |
| Windows reboot killed background jobs | Pipeline moved into the restartable runner container; every phase resumes from stored results. |

## 9. Server and test code

**All tests in this report were obtained with this server: [HomenSAI/homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab).** It was the engine of the whole experiment — llama.cpp with the llama-swap gateway in Docker, the scripts and the test runners. You can deploy the same server yourself: it works as described here, and with it you can run the same tests and get comparable results. This repository contains only the finished report and our raw results (results/*.jsonl in each tests/ folder) to compare with.
<!--FOOT-->

---

## About this project: idea, implementation, time, tokens, tools and prompts

**Idea.** A private owner of one gaming GPU (RTX 3080, 10 GB) wanted to know which local language models are really useful, at what context length they stay stable, and how to run them all reliably behind one OpenAI-compatible endpoint. Instead of trusting vendor claims, every model was measured on the same machine with the same tests, and the findings were turned into a working server configuration. Author of the experiment: [https://homensai.com/](https://homensai.com/)

**Implementation.** llama.cpp servers run inside Docker behind the llama-swap gateway (one model on the GPU at a time, automatic swapping and unloading). A Python test runner starts each model in a temporary container, sends the tasks, grades the answers automatically (numeric answers, hidden unit tests, fact matching) and stores every result in JSON lines. A restartable runner container resumes after a crash or reboot. Rules found during the work (64K minimum on the GPU, no RAM spill, hang detection) are enforced in code.

**Time spent.** Calendar: 2026-09-29 – 2026-10-06 (8 days, 1 session of hardware changes: RAM upgrade 16 → 32 GB on 2026-10-01). Measured machine time of the final runs: general test 32 min, German 20 min, context search 8.5 h (146 probes), school math/physics 2.4 h, chemistry 51 min, coding 14 min, reliability run 2 h, accelerators and embeddings about 1 h — roughly 15 hours of GPU time in total; the rest of the calendar time was setup, downloads (about 200 GB), conversions, fixes and waiting for restarts.

**Tokens.** Models under test generated about 1.03 million output tokens in the school-subject and coding runs alone (math/physics 731k, chemistry 235k, coding 64k) plus the long-context probes of up to 260k input tokens each. The agent (Claude Code on a Pro plan) worked in several sessions; at the time of writing the main session context held about 390k tokens and the weekly plan usage was 29%. An exact total across all sessions was not recorded.

**Made with.** Claude Code (desktop app) as the working agent — models Claude Opus 5.5, Sonnet 5.5 and Haiku 4.5 depending on the stage; llama.cpp (upstream and the PrismML fork for ternary Bonsai), llama-swap, Docker Desktop with WSL2 on Windows 10, Python 3, CadQuery sandbox image (used only for an experiment that was later removed).

**License.** All materials of this repository (results, tables, reports, documentation, test descriptions) are licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to copy, share, adapt and use for non-commercial purposes only, with mandatory attribution — credit the author of the experiment with a link to https://homensai.com/ and mark changes. See [LICENSE](LICENSE). Model weights are not part of this repository and keep their own licenses (see the model pages linked above). This is not legal advice.

### Sources and third-party components

- [llama.cpp](https://github.com/ggml-org/llama.cpp) (upstream commit `81bc6b8`), [server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md), [speculative decoding / MTP](https://github.com/ggml-org/llama.cpp/blob/master/docs/speculative.md)
- [PrismML llama.cpp fork](https://github.com/PrismML-Eng/llama.cpp) (commit `adfffbe`) and [Bonsai demo / KV-cache notes](https://github.com/PrismML-Eng/Bonsai-demo/blob/main/KV-CACHE.md) — runtime for the ternary Bonsai-27B
- [llama-swap](https://github.com/mostlygeek/llama-swap) — the model gateway
- [Spark-X2.5](https://github.com/XHToken/Spark-X2.5) — Spark model runtime support
- [whisper.cpp](https://github.com/ggml-org/whisper.cpp) (commit `d09f61a`) and [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) (commit `3f8527a`, [Qwen-Image 2.1 guide](https://github.com/leejet/stable-diffusion.cpp/blob/3f8527a46c54ecf4cb4ed6003da8e8982283c73c/docs/qwen_image_2.1.md)) — speech and image runtimes
- [Docker Desktop](https://www.docker.com/products/docker-desktop/), [NVIDIA CUDA images](https://hub.docker.com/r/nvidia/cuda) (12.8.1)
- Accelerator / draft models: [Ornith-1.5-9B MTP head](https://huggingface.co/protoLabsAI/Ornith-1.5-9B-MTP-GGUF), [Ornith DFlash](https://huggingface.co/ornith-ai/Ornith-1.5-9B-DFlash), [MiMo MTP](https://huggingface.co/VitreousCut/MiMo-V2.6-Distill-Qwen-9B-MTP-GGUF), [MiniCPM5 DSpark](https://huggingface.co/openbmb/MiniCPM5-2B-DSpark-GGUF), [Qwen3-0.6B](https://huggingface.co/Qwen/Qwen3-0.6B-GGUF), [Qwen2.5-Coder-0.5B](https://huggingface.co/Qwen/Qwen2.5-Coder-0.5B-Instruct-GGUF), [Llama-3.2-1B](https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF), [Gemma-3-1B](https://huggingface.co/unsloth/gemma-3-1b-it-GGUF), [Qwen3.5-0.8B](https://huggingface.co/unsloth/Qwen3.5-0.8B-GGUF)
- All tested models: see the download links in the models table above.

### Rights, third-party licences and disclaimers

- **No model weights are distributed here.** Only links to the original pages are given. Every model keeps its own licence and usage terms (for example Llama 3.1 uses the Llama Community License with its attribution and naming duties, Gemma uses Google's Gemma Terms of Use, Qwen, MiniCPM, Spark, MiMo, Ornith, LFM, Bonsai and others have their own terms). Check the linked model page before you download or use a model; we did not re-verify every licence.
- **Model outputs.** The raw result files contain short answers produced by the tested models. Their use is subject to the respective model terms (some models restrict using outputs to train other models).
- **Names and trademarks** (Qwen, Llama, Gemma, Mistral, NVIDIA, RTX, Docker, Claude, Hugging Face and others) belong to their owners. This project is independent and is not affiliated with, sponsored or endorsed by them.
- **Software.** llama.cpp, llama-swap, whisper.cpp and stable-diffusion.cpp are open-source projects (to our knowledge MIT-licensed; the PrismML fork follows llama.cpp). They are not copied here — only their configuration and Dockerfiles that download pinned commits. NVIDIA CUDA base images and Docker Desktop are used under their own licence terms and are not redistributed.
- **Test data.** The tasks were written or generated by the author. The long-context filler text is assembled from the Python standard library source files (PSF licence); the file itself is not included — the server project rebuilds it from your own Python installation (results can differ slightly between Python versions).
- **Privacy and security.** No personal data, passwords, tokens or keys are included; local usernames, paths and LAN addresses were replaced by placeholders. Replace `<YOUR_LAN_IP>` and secrets in your own setup and never publish them.
- **Accuracy and warranty.** Results are measurements on one machine on the dates shown, provided "as is" without warranty. Model answers may be wrong; school-subject tests are a benchmark, not teaching or professional advice. Do not rely on them for medical, legal, financial or safety-critical decisions.
- **AI assistance.** The experiment and these documents were prepared with the help of an AI agent (Claude Code) under the author's direction.
- **Reuse and takedown.** Non-commercial reuse is allowed under CC BY-NC 4.0 (see LICENSE) with attribution to the author of the experiment: https://homensai.com/. Rights holders who find a problem can contact the author through that site and the material will be corrected or removed.

**Prompts used.** The exact prompts sent to the models (the full task lists are in the server repository):

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
