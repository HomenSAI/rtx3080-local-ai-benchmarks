# Lokaler KI-Server auf RTX 3080: 23 Modelle getestet, 14 behalten

> Version 1.5 · Testdaten: 2026-09-29 – 2026-10-06 (Hardware: RTX 3080 10 GB, i7-4770, 32 GB RAM). Autor des Experiments: https://homensai.com/

[English](README.en.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

## 1. Projektidee

Ziel: herausfinden, welche lokalen Sprachmodelle auf einer einzelnen RTX 3080 (10 GB VRAM) mit 32 GB RAM wirklich brauchbar sind, sie über ein Gateway (llama.cpp + llama-swap in Docker) zu betreiben und für jedes Modell den größten *stabilen* Kontext, die Qualität (Russisch, Logik, Programmierung, Deutsch, Schul-Mathematik, -Physik, -Chemie), den Beschleunigungsgewinn (MTP, DFlash, Draft-Modelle) und die Dauerzuverlässigkeit zu messen.

## 2. Regeln und Einstellungen

- Nur Modelle, deren Gewichte und KV-Cache in 10 GB VRAM passen, bleiben; MoE 26–35B und dichte 14B-Modelle wurden vor den Tests entfernt.
- Jedes behaltene Chat-Modell braucht einen stabilen Kontext von mindestens 64K Tokens auf der GPU. „Stabil“ = Server startet, 3 von 3 versteckten Fakten bei 80 % Füllung gefunden, Generierungsgeschwindigkeit über 40 % des 8K-Werts, VRAM-Spitze höchstens 9990 MiB.
- Nur GPU. CPU/RAM-Modi (KV-Cache im Arbeitsspeicher, Auto-Fit auf CPU) zählen nicht: sie laufen mit 1–3 Tokens/s. Jeder Überlauf von VRAM in den Arbeitsspeicher beim Arbeitskontext scheidet den Kandidaten aus.
- Eine hängende Anfrage nimmt das Profil mit Vermerk aus dem Test.
- Bild-, Video- und Sprachmodelle (Qwen-Image, Wan2.1, Whisper) werden nie entfernt; sie werden separat dokumentiert.
- Nichts wird automatisch gelöscht: Modelle, die die Kriterien nicht erfüllen, werden als aus der Arbeitsliste entfernt markiert.
- Ein einziger Startweg: alle Modelle laufen über das llama-swap-Gateway; alte Einzeldienste sind archiviert.
- Windows behält mindestens 9–10 GB RAM; die Docker/WSL-VM ist begrenzt (.wslconfig), ein cache-dropper-Container leert den Seitencache.

## 3. Verwendete Modelle

| Modell | Dateigröße, GB | Max. Kontext | Status | Download |
|---|---|---|---|---|
| Qwen3.5-9B-MTP | 7.05 | 262144 | behalten | [unsloth/Qwen3.5-9B-MTP-GGUF](https://huggingface.co/unsloth/Qwen3.5-9B-MTP-GGUF) |
| Qwen3.5-9B | 5.16 | 262144 | behalten | [byteshape/Qwen3.5-9B-GGUF](https://huggingface.co/byteshape/Qwen3.5-9B-GGUF) |
| MiniCPM5-2B-Q8 | 2.68 | 131072 | behalten | [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) |
| MiniCPM5-2B-Q4 | 1.56 | 131072 | behalten | [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) |
| Spark-X2.5-4B-Q8 | 4.38 | 262144 | behalten | [XHToken/Spark-X2.5-4B-GGUF](https://huggingface.co/XHToken/Spark-X2.5-4B-GGUF) |
| Spark-X2.5-4B-Q4 | 2.6 | 262144 | behalten | [XHToken/Spark-X2.5-4B-GGUF](https://huggingface.co/XHToken/Spark-X2.5-4B-GGUF) |
| Bonsai-2-27B | 5.95 | 131072 | behalten | [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) |
| Qwen3-VL-8B | 6.19 | 65536 | behalten | [Qwen/Qwen3-VL-8B-Instruct-GGUF](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct-GGUF) |
| Qwen3-8B | 5.03 | - | entfernt (<64K) | [Qwen/Qwen3-8B-GGUF](https://huggingface.co/Qwen/Qwen3-8B-GGUF) |
| Gemma-3-12B | 7.3 | 98304 | behalten | [unsloth/gemma-3-12b-it-GGUF](https://huggingface.co/unsloth/gemma-3-12b-it-GGUF) |
| R1-Distill-Llama-8B | 4.92 | - | entfernt (<64K) | [unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF](https://huggingface.co/unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF) |
| Qwen2.5-Coder-7B | 4.68 | 65536 | behalten | [Qwen/Qwen2.5-Coder-7B-Instruct-GGUF](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct-GGUF) |
| Qwen2.5-VL-7B | 6.04 | 65536 | behalten | [ggml-org/Qwen2.5-VL-7B-Instruct-GGUF](https://huggingface.co/ggml-org/Qwen2.5-VL-7B-Instruct-GGUF) |
| Llama-3.1-8B | 4.92 | 65536 | behalten | [bartowski/Meta-Llama-3.1-8B-Instruct-GGUF](https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF) |
| Mistral-Nemo-12B | 7.48 | - | entfernt (<64K) | [bartowski/Mistral-Nemo-Instruct-2407-GGUF](https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF) |
| Gemma-4-12B | 7.3 | - | entfernt (<64K) | [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF) |
| Gemma-4-12B-QAT | 7.15 | - | entfernt (<64K) | [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF) |
| Gemma-4-E4B | 5.97 | - | entfernt (<64K) | [unsloth/gemma-4-E4B-it-GGUF](https://huggingface.co/unsloth/gemma-4-E4B-it-GGUF) |
| LFM2.5-2.6B | 1.67 | - | entfernt (<64K) | [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) |
| LFM2.5-8B-A1B | 5.16 | - | entfernt (<64K) | [LiquidAI/LFM2.5-8B-A1B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B-GGUF) |
| MiMo-9B | 5.84 | 262144 | behalten | [bartowski/MiMo-V2.6-Distill-Qwen-9B-GGUF](https://huggingface.co/bartowski/MiMo-V2.6-Distill-Qwen-9B-GGUF) |
| MiMo-9B-MTP | 6.1 | 262144 | behalten | [VitreousCut/MiMo-V2.6-Distill-Qwen-9B-MTP-GGUF](https://huggingface.co/VitreousCut/MiMo-V2.6-Distill-Qwen-9B-MTP-GGUF) |
| Ornith-1.5-9B | 5.78 | 262144 | behalten | [ornith-ai/Ornith-1.5-9B-GGUF](https://huggingface.co/ornith-ai/Ornith-1.5-9B-GGUF), [protoLabsAI/Ornith-1.5-9B-MTP-GGUF](https://huggingface.co/protoLabsAI/Ornith-1.5-9B-MTP-GGUF) |
| Qwen3-Embedding-0.6B | - | 8192 | behalten | [Qwen/Qwen3-Embedding-0.6B-GGUF](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B-GGUF) |
| Qwen3-Embedding-4B | - | 8192 | behalten | [Qwen/Qwen3-Embedding-4B-GGUF](https://huggingface.co/Qwen/Qwen3-Embedding-4B-GGUF) |
| Qwen-Image-2.1 | - | - | behalten | [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) |

## 4. Auswahl der Modelle

Kandidaten (23 Gewichtssätze, Q4/Q5) stammen aus den offenen Modellen 2026, die in 10 GB passen: Qwen3.5/3-VL/2.5, Gemma-3/4, Llama-3.1, Mistral-Nemo, MiMo, Ornith, MiniCPM5, Spark, LFM2.5, R1-Distill und das ternäre Bonsai-27B. Schritt 1: Laden, Geschwindigkeit, Qualität; Schritt 2: maximaler Kontext; Modelle ohne stabile 64K auf der GPU wurden entfernt; Schritt 3: Beschleuniger; Schritt 4: Schulfächer und der finale Zuverlässigkeitstest mit 95 % Füllung über das Gateway.

## 5. Aufbau der Tests

1. Allgemeine Qualität: Russisch (Zusammenfassung, Übersetzung), Logik, Anweisungen, Bild, Code (qtasks.py) — Datum: 2026-09-30 – 2026-10-01
2. Deutsches Passiv, 30 Aufgaben, alle Formen (qa_tasks.py) — Datum: 2026-10-01
3. Maximaler stabiler Kontext: 3 Nadeln in 10/50/90 % Tiefe, 80 % Füllung, KV f16/q8/q4 (bench_ctx.py, mneedle.py) — Datum: 2026-10-01 – 2026-10-02
4. Dauertest: 95 % Füllung ×2, lange Generierung, Bildprüfung, VRAM/RAM-Überwachung über das Gateway (soak.py) — Datum: 2026-10-03 – 2026-10-06
5. Mathematik und Physik Klasse 11, 40 generierte Aufgaben mit berechneten Lösungen (stem_tasks.py) — Datum: 2026-10-02
6. Chemie Klasse 11, 10 generierte Aufgaben (chem_tasks.py) — Datum: 2026-10-06
7. Programmierung (Code schreiben): 20 Python-Aufgaben — das Modell schreibt eine Funktion, versteckte Unit-Tests prüfen sie in einer Sandbox ohne Netz (coding_tasks.py) — Datum: 2026-10-06
8. Beschleuniger und Embeddings: Tokens/s mit und ohne MTP/DFlash/Draft, Retrieval Top-1 (bench_accel.py) — Datum: 2026-10-02

## 6. Bewertungsprinzipien

Allgemeiner Test: Punkte der automatischen Prüfer (Fakten, Begriffe, Format) summiert und in % angegeben. Deutsch: richtige Aufgaben von 30. Mathe/Physik/Chemie: Zahl nach „ANTWORT:“ mit 1–2 % Toleranz; Denkmodus separat, bester Wert gezeigt. Programmierung: Zahl der 20 Programmieraufgaben, deren versteckte Unit-Tests bestehen. Kontext: größte stabile Stufe 64K/96K/128K/192K/256K. Beschleuniger: Verhältnis der Median-Tokens/s (≥1,10 hilft, <0,95 schadet). Dauertest: keine Probleme = OK.

## 7. Ergebnisse und Vergleiche

Spitzenreiter:

| Qualität % | Bonsai-2-27B (85), Qwen3-VL-8B (81), Spark-X2.5-4B-Q8 (75) |
| Deutsch /30 | Bonsai-2-27B (23), Qwen3.5-9B-MTP (22), Qwen3.5-9B (22) |
| Mathe+Phys /40 | Qwen3.5-9B (40), Bonsai-2-27B (40), Ornith-1.5-9B (40) |
| Programmierung /20 | Qwen3.5-9B (18), Bonsai-2-27B (18), Qwen3.5-9B-MTP (17) |
| Tok/s | MiniCPM5-2B-Q4 (171.6), MiniCPM5-2B-Q8 (138.7), Qwen2.5-VL-7B (101.3) |
| Max. Kontext | Ornith-1.5-9B (262144), Qwen3.5-9B-MTP (262144), Qwen3.5-9B (262144) |

Alle behaltenen Modelle:

| Modell | Qualität % | Deutsch /30 | Mathe+Phys /40 | Chemie /10 | Programmierung /20 | Tok/s | Max. Kontext |
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

Full tables: [RESULTS.de.md](RESULTS.de.md)

## 8. Probleme und Ausfälle (Statistik und Lösungen)

| Probleme und Lösungen |  |
|---|---|
| Laden der Modelle dauerte 6–14 Min. vom Windows-Laufwerk (WSL-9p-Mount, 22–46 MB/s) | Modelle in ein Docker-Volume auf ext4 kopiert (llm-models-fast), SHA256 geprüft. |
| Speichermangel / Abstürze der WSL-VM bei Downloads und Tests | Speicherlimit in .wslconfig, 4 GB Swap, cache-dropper-Container leert den Seitencache alle 10 s. |
| Windows fror ein oder startete neu, wenn VRAM in den RAM überlief (Sysmem-Fallback) | Keine Kontexte über VRAM hinaus testen; Wächter beendet den Server bei < 2 GB freiem RAM; VRAM-Limit 9990 MiB; Zeitlimit für Prefill. |
| Wächter beendete Proben fälschlich (Seitencache der VM) | cache-dropper (privilegierter Container) und MemAvailable der WSL-VM im Runner. |
| Falsche Token-Schätzung bei manchen Tokenizern (MiniCPM) | Füllung wird über /tokenize des Servers berechnet. |
| Hybridmodelle lieferten leere Antworten (Denken verbrauchte das Budget) | enable_thinking=false im Normallauf, großes Budget im Denkmodus; Gemma-4 und LFM2.5 verlieren dennoch alle 3 Fakten bei 64K und wurden entfernt. |
| RAM-KV-Modus (--no-kv-offload) hing und lief auf der CPU (LFM2.5) | Modus aus dem Kontexttest entfernt; GPU-Auslastungsspitze wird pro Probe gespeichert. |
| 262K-Kontext bestand bei 80 %, lief aber bei 95 % über (MTP/DFlash-Köpfe brauchen VRAM) | Der 95-%-Test senkte Qwen3.5-MTP auf 192K und Ornith-MTP auf 128K; Ornith-DFlash entfernt. |
| Testtext kam aus dem Python-Ordner des Hosts, im Container fehlte er (Schein-Proben mit 149 Tokens) | Text in corpus_cache.txt eingefroren; Schein-Proben gelöscht und neu gelaufen. |
| Draft-Modelle bremsten (×0,17–0,75) | Nur MTP/DFlash-Profile mit gemessenem Gewinn bleiben. |
| Windows-Neustart beendete Hintergrundjobs | Pipeline in den neu startenden Container bench-runner verlegt; jede Phase setzt bei gespeicherten Ergebnissen fort. |

## 9. Installationsanleitung

[INSTALL.de.md](INSTALL.de.md)

## 10. Tests reproduzieren

Jeder Ordner in tests/ enthält die Aufgabendatei, den Runner, eine README und unsere Rohergebnisse (results/*.jsonl). Den Runner gegen den eigenen llama.cpp-Server (Port 8090, siehe start() in bench_top.py) laufen lassen und das eigene jsonl mit unserem vergleichen. Die Runner sind für einen erneuten Testlauf nötig; der Server selbst liegt in [homensai-local-ai-lab](https://github.com/HomenSAI/homensai-local-ai-lab).
<!--FOOT-->

---

## Über dieses Projekt: Idee, Umsetzung, Zeit, Tokens, Werkzeuge und Prompts

**Idee.** Der private Besitzer einer einzelnen Gaming-Grafikkarte (RTX 3080, 10 GB) wollte wissen, welche lokalen Sprachmodelle wirklich nützlich sind, bei welcher Kontextlänge sie stabil bleiben und wie man alle zuverlässig hinter einer OpenAI-kompatiblen Adresse betreibt. Statt Herstellerangaben zu vertrauen, wurde jedes Modell auf demselben Rechner mit denselben Tests gemessen und die Ergebnisse in eine funktionierende Serverkonfiguration überführt. Autor des Experiments: [https://homensai.com/](https://homensai.com/)

**Umsetzung.** llama.cpp-Server laufen in Docker hinter dem llama-swap-Gateway (ein Modell auf der GPU, automatisches Wechseln und Entladen). Ein Python-Runner startet jedes Modell in einem temporären Container, sendet die Aufgaben, bewertet die Antworten automatisch (Zahlen, versteckte Unit-Tests, Faktensuche) und speichert jedes Ergebnis als JSON Lines. Ein neu startender Runner-Container setzt nach Absturz oder Neustart fort. Regeln aus der Arbeit (mindestens 64K auf der GPU, kein RAM-Überlauf, Hänger-Erkennung) sind im Code verankert.

**Zeitaufwand.** Kalendarisch: 2026-09-29 – 2026-10-06 (8 Tage, inkl. Hardwaretausch: RAM 16 → 32 GB am 2026-10-01). Gemessene Maschinenzeit der finalen Läufe: Allgemeintest 32 Min., Deutsch 20 Min., Kontextsuche 8,5 Std. (146 Proben), Schul-Mathe/Physik 2,4 Std., Chemie 51 Min., Code 14 Min., Zuverlässigkeitslauf 2 Std., Beschleuniger und Embeddings etwa 1 Std. — insgesamt rund 15 Stunden GPU-Zeit; die übrige Kalenderzeit entfiel auf Einrichtung, Downloads (etwa 200 GB), Konvertierungen, Fehlerbehebung und Warten auf Neustarts.

**Tokens.** Allein in den Schulfächern und im Code erzeugten die getesteten Modelle etwa 1,03 Mio. Ausgabe-Tokens (Mathe/Physik 731k, Chemie 235k, Code 64k), dazu Langkontext-Proben mit bis zu 260k Eingabe-Tokens je Probe. Der Agent (Claude Code, Pro-Tarif) arbeitete in mehreren Sitzungen; beim Schreiben enthielt der Kontext der Hauptsitzung etwa 390k Tokens, die Wochennutzung des Tarifs lag bei 29 %. Eine genaue Gesamtsumme über alle Sitzungen wurde nicht erfasst.

**Erstellt mit.** Claude Code (Desktop-App) als Arbeitsagent — Modelle Claude Opus 5.5, Sonnet 5.5 und Haiku 4.5 je nach Phase; llama.cpp (Upstream und PrismML-Fork für ternäres Bonsai), llama-swap, Docker Desktop mit WSL2 unter Windows 10, Python 3, CadQuery-Sandbox-Image (nur für ein später entferntes Experiment).

**Lizenz.** Frei teilbar und nutzbar **nur nichtkommerziell, mit verpflichtender Nennung des Autors des Experiments: https://homensai.com/**. Ergebnisse, Tabellen und Dokumente: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (kopieren, weitergeben, bearbeiten, nur nichtkommerziell — der Autor ist mit Link auf https://homensai.com/ zu nennen, Änderungen sind zu kennzeichnen). Programmcode und Testaufgaben: PolyForm-Noncommercial-Lizenz 1.0.0, die Autorenzeile muss in jeder Kopie erhalten bleiben (siehe `LICENSE`, `LICENSE-DOCS.md`, `NOTICE`). Modellgewichte sind nicht Teil dieses Repositories und behalten ihre eigenen Lizenzen (siehe die oben verlinkten Modellseiten). Dies ist keine Rechtsberatung.

### Quellen und Fremdkomponenten

- [llama.cpp](https://github.com/ggml-org/llama.cpp) (upstream commit `81bc6b8`), [server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md), [speculative decoding / MTP](https://github.com/ggml-org/llama.cpp/blob/master/docs/speculative.md)
- [PrismML llama.cpp fork](https://github.com/PrismML-Eng/llama.cpp) (commit `adfffbe`) and [Bonsai demo / KV-cache notes](https://github.com/PrismML-Eng/Bonsai-demo/blob/main/KV-CACHE.md) — runtime for the ternary Bonsai-27B
- [llama-swap](https://github.com/mostlygeek/llama-swap) — the model gateway
- [Spark-X2.5](https://github.com/XHToken/Spark-X2.5) — Spark model runtime support
- [whisper.cpp](https://github.com/ggml-org/whisper.cpp) (commit `d09f61a`) and [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) (commit `3f8527a`, [Qwen-Image 2.1 guide](https://github.com/leejet/stable-diffusion.cpp/blob/3f8527a46c54ecf4cb4ed6003da8e8982283c73c/docs/qwen_image_2.1.md)) — speech and image runtimes
- [Docker Desktop](https://www.docker.com/products/docker-desktop/), [NVIDIA CUDA images](https://hub.docker.com/r/nvidia/cuda) (12.8.1)
- Accelerator / draft models: [Ornith-1.5-9B MTP head](https://huggingface.co/protoLabsAI/Ornith-1.5-9B-MTP-GGUF), [Ornith DFlash](https://huggingface.co/ornith-ai/Ornith-1.5-9B-DFlash), [MiMo MTP](https://huggingface.co/VitreousCut/MiMo-V2.6-Distill-Qwen-9B-MTP-GGUF), [MiniCPM5 DSpark](https://huggingface.co/openbmb/MiniCPM5-2B-DSpark-GGUF), [Qwen3-0.6B](https://huggingface.co/Qwen/Qwen3-0.6B-GGUF), [Qwen2.5-Coder-0.5B](https://huggingface.co/Qwen/Qwen2.5-Coder-0.5B-Instruct-GGUF), [Llama-3.2-1B](https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF), [Gemma-3-1B](https://huggingface.co/unsloth/gemma-3-1b-it-GGUF), [Qwen3.5-0.8B](https://huggingface.co/unsloth/Qwen3.5-0.8B-GGUF)
- All tested models: see the download links in the models table above.

### Rechte, Fremdlizenzen und Hinweise

- **Modellgewichte werden hier nicht verbreitet.** Es gibt nur Links zu den Originalseiten. Jedes Modell hat seine eigene Lizenz und Nutzungsbedingungen (z. B. Llama 3.1 mit der Llama Community License samt Namens- und Hinweispflichten, Gemma mit den Google Gemma Nutzungsbedingungen; Qwen, MiniCPM, Spark, MiMo, Ornith, LFM, Bonsai u. a. haben eigene Bedingungen). Prüfen Sie vor Download und Nutzung die verlinkte Modellseite; wir haben nicht jede Lizenz erneut geprüft.
- **Modellausgaben.** Die Rohdateien enthalten kurze Antworten der getesteten Modelle. Ihre Nutzung unterliegt den Bedingungen des jeweiligen Modells (manche untersagen die Verwendung der Ausgaben zum Training anderer Modelle).
- **Namen und Marken** (Qwen, Llama, Gemma, Mistral, NVIDIA, RTX, Docker, Claude, Hugging Face u. a.) gehören ihren Inhabern. Das Projekt ist unabhängig und weder mit ihnen verbunden noch von ihnen gesponsert oder gebilligt.
- **Software.** llama.cpp, llama-swap, whisper.cpp und stable-diffusion.cpp sind Open-Source-Projekte (nach unserem Wissen MIT-lizenziert; der PrismML-Fork folgt llama.cpp). Ihr Code wird hier nicht kopiert, nur unsere Konfiguration und Dockerfiles, die festgelegte Commits herunterladen. NVIDIA-CUDA-Basis-Images und Docker Desktop werden unter ihren eigenen Lizenzbedingungen genutzt und nicht weiterverbreitet.
- **Testdaten.** Die Aufgaben wurden vom Autor geschrieben oder generiert. Der Füll-Text für den Langkontext wird aus den Quelldateien der Python-Standardbibliothek (PSF-Lizenz) zusammengesetzt; die Datei selbst liegt nicht bei — das Skript baut sie aus Ihrer eigenen Python-Installation (Ergebnisse können je nach Python-Version leicht abweichen).
- **Datenschutz und Sicherheit.** Keine personenbezogenen Daten, Passwörter, Tokens oder Schlüssel; lokale Benutzernamen, Pfade und LAN-Adressen wurden durch Platzhalter ersetzt. Setzen Sie `<YOUR_LAN_IP>` und Geheimnisse in Ihrer eigenen Installation ein und veröffentlichen Sie sie nie.
- **Genauigkeit und Gewährleistung.** Die Ergebnisse sind Messungen auf einem Rechner an den genannten Terminen und werden „wie besehen“ ohne Gewähr bereitgestellt. Modellantworten können falsch sein; die Schultests sind ein Benchmark, keine Lehre und keine Fachberatung. Nicht für medizinische, rechtliche, finanzielle oder sicherheitskritische Entscheidungen verwenden.
- **KI-Unterstützung.** Das Experiment und diese Dokumente wurden unter Anleitung des Autors mit Hilfe eines KI-Agenten (Claude Code) erstellt.
- **Weiterverwendung und Entfernung.** Die Weiterverwendung ist unter den obigen Lizenzen mit Nennung des Autors des Experiments erlaubt: https://homensai.com/. Rechteinhaber, die ein Problem finden, können den Autor über diese Seite kontaktieren; das Material wird korrigiert oder entfernt.

**Verwendete Prompts.** Die genauen an die Modelle gesendeten Texte (vollständige Aufgabenlisten jedes Tests in `tests/`):

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
