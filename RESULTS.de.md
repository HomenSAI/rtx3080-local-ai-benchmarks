<!-- HomenS.AI Benchmarks · © 2026 Serhii Khomenko · https://homensai.com/ · https://github.com/HomenSAI · https://www.linkedin.com/in/serhii-khomenko-homensai/ -->
# Ergebnisse und Vergleiche

> Version 1.11 · Testdaten: 2026-09-29 – 2026-10-06 (Hardware: RTX 3080 10 GB, i7-4770, 32 GB RAM). Autor des Experiments: https://homensai.com/

## Spitzenreiter

| Qualität % | Bonsai-2-27B (85), Qwen3-VL-8B (81), Spark-X2.5-4B-Q8 (75) |
| Deutsch /30 | Bonsai-2-27B (23), Qwen3.5-9B-MTP (22), Qwen3.5-9B (22) |
| Mathe+Phys /40 | Qwen3.5-9B (40), Bonsai-2-27B (40), Ornith-1.5-9B (40) |
| Programmierung /20 | Qwen3.5-9B (18), Bonsai-2-27B (18), Qwen3.5-9B-MTP (17) |
| Tok/s | MiniCPM5-2B-Q4 (171.6), MiniCPM5-2B-Q8 (138.7), Qwen2.5-VL-7B (101.3) |
| Max. Kontext | Ornith-1.5-9B (262144), Qwen3.5-9B-MTP (262144), Qwen3.5-9B (262144) |

## Alle behaltenen Modelle

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

## Kontextfenster: Maximum, empfohlen und ideale Kombination (Tokens / Generierung Tok/s)

| Modell | MAX. Kontext (KV q4) / Tok/s | KV q8 / Tok/s | KV f16 (am schnellsten) / Tok/s | Empfohlen (aktives Profil) | Ideale Kombination |
|---|---|---|---|---|---|
| Qwen3.5-9B-MTP | 262144 / 36.5 | 131072 / 54.1 | 98304 / 55.0 | 196608 | Q4_K_XL + MTP + KV q4, Denken aus |
| Qwen3.5-9B | 262144 / 37.9 | 196608 / 46.0 | 131072 / 57.3 | 262144 | Q5_K_S + KV q4 (lange Dokumente) |
| MiniCPM5-2B-Q8 | — | — | 131072 / 65.5 | 131072 | Q8_0 + KV f16 (Maximum und schnell) |
| Spark-X2.5-4B-Q8 | 262144 / 31.9 | — | 98304 / 55.6 | 262144 | Q8_0 + KV q4 |
| Bonsai-2-27B | 131072 / 22.7 | 98304 / 27.1 | — | 131072 | PTQ1_0 + KV q4, Denken aus (mit Denken Schleifen) |
| Qwen3-VL-8B | 65536 / 35.9 | — | — | 65536 | Q4_K_M + mmproj F16 + KV q4 |
| Ornith-1.5-9B | 262144 / 38.2 | 196608 / 47.1 | 131072 / 58.6 | 131072 | Q4_K_M + MTP + KV q4, Denken aus |
| Qwen2.5-Coder-7B | — | 65536 / 48.3 | 65536 / 72.0 | 65536 | Q4_K_M + KV f16 |
| Llama-3.1-8B | — | 65536 / 39.6 | — | 65536 | Q4_K_M + KV q8 |
| Gemma-3-12B | 98304 / 43.3 | — | — | 65536 | Q4_K_M + KV q4 (Test max. 98K, hing bei 98K) |
| MiMo-9B | 262144 / 37.1 | 196608 / 44.8 | 98304 / 62.9 | 262144 | Q4_K_M ohne MTP (MTP bremst x0,71) + KV q4, Denken aus |

## Empfohlene Einstellungen je Modell (aktive Gateway-Profile)

| Gateway-Profil | Kontext (Tokens) | KV-Cache | Beschleuniger | Denken standardmäßig | Tok/s (8K) | Geeignet für |
|---|---|---|---|---|---|---|
| Qwen3.5-9B-MTP-Q4_K_XL | 196608 | q4_0 | MTP | aus | 82.4 | Allround-Chat, Code, Mathe (schnell, MTP) |
| Qwen3.5-9B-MTP-Q4_K_XL-Vision | 131072 | q4_0 | — | aus | 82.4 | Chat mit Bildern |
| Qwen3.5-9B-Q5_K_S | 262144 | q4_0 | — | aus | 91.3 | lange Dokumente bis 262K |
| MiniCPM5-2B-Q8_0 | 131072 | f16 | — | aus | 138.7 | schnellste einfache Aufgaben, Entwürfe |
| Spark-X2.5-4B-Q8_0 | 262144 | q4_0 | — | aus | 79.3 | langer Kontext auf kleinem Modell |
| Ternary-Bonsai-2-27B-PTQ1_0 | 131072 | q4_0 | — | aus | 46.6 | klügstes: schwere Fragen, Deutsch, MINT, Code |
| Qwen3-VL-8B-Instruct-Q4_K_M | 65536 | q4_0 | — | — | 86.7 | Bilder + Text, gute Allgemeinqualität |
| Ornith-1.5-9B-MTP | 131072 | q4_0 | MTP | aus | 83.8 | MINT und Code (schnell, MTP) |
| Qwen2.5-Coder-7B | 65536 | f16 | — | — | 100.8 | Programmierassistent, schnell |
| Llama-3.1-8B | 65536 | q8_0 | — | — | 95.9 | englischer Chat, Tool-Nutzung |
| Gemma-3-12B | 65536 | q4_0 | — | — | 61.8 | mehrsprachiger Chat |
| MiMo-V2.6-Distill-Qwen-9B | 262144 | q4_0 | — | aus | 82.3 | Antworten im Reasoning-Stil, 262K |
| Qwen3-Embedding-0.6B | 8192 | — | — | — | — | semantische Suche / RAG über Dokumente |
| Qwen3-Embedding-4B | 8192 | — | — | — | — | semantische Suche / RAG über Dokumente |

## Beschleuniger (Tok/s ohne → mit)

| Profile | tok/s | x | verdict |
|---|---|---|---|
| Qwen3.5-9B-MTP-Q4_K_XL | 77.1 -> 111.0 | 1.44 | beschleunigt |
| Gemma-4-12B-it | 61.9 -> 97.2 | 1.57 | beschleunigt |
| Gemma-4-12B-it-QAT | 63.2 -> 101.2 | 1.6 | beschleunigt |
| Gemma-4-E4B-it | 94.2 -> 128.7 | 1.37 | beschleunigt |
| Ornith-1.5-9B-MTP | 78.4 -> 105.3 | 1.34 | beschleunigt |
| Ornith-1.5-9B-DFlash | 82.6 -> 111.0 | 1.34 | beschleunigt |
| MiMo-V2.6-Distill-Qwen-9B-MTP | 80.4 -> 57.1 | 0.71 | bremst |
| Qwen3-8B-Draft | 92.6 -> 20.8 | 0.22 | bremst |
| Qwen2.5-Coder-7B-Draft | 105.1 -> 76.8 | 0.73 | bremst |
| Llama-3.1-8B-Draft | 99.7 -> 75.0 | 0.75 | bremst |
| R1-Distill-Llama-8B-Draft | 100.7 -> 99.2 | 0.99 | kein Nutzen |
| Qwen3.5-9B-Q5_K_S-Draft | 90.5 -> 28.1 | 0.31 | bremst |
| MiMo-V2.6-Distill-Qwen-9B-Draft | 80.8 -> 26.3 | 0.33 | bremst |
| Gemma-3-12B-Draft | 57.5 -> 9.7 | 0.17 | bremst |

## Embeddings

| Embedding | dim | top-1 | verdict |
|---|---|---|---|
| Qwen3-Embedding-0.6B | 1024 | 6/6 | funktioniert |
| Qwen3-Embedding-4B | 2560 | 6/6 | funktioniert |

## Aus der Arbeitsliste entfernt (kein stabiler 64K-GPU-Kontext)

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

> Die Zahlen gelten für einen Rechner (RTX 3080, i7-4770, 32 GB). Chemie ist gesättigt: 10 von 15 Modellen erreichen 10/10, sie trennt also nur die schwachen.
