# Koszty

| Sesja | Rola | Szacunek USD | Rzeczywisty USD | Kontekst max % | Zlecone → przyjęte (UTC) | Oczekiwanie | Uwagi |
|---|---|---|---|---|---|---|---|
| AE session_01T66VBxav4k25kuxvggJK2A | 09 kod | — | 12,73 | 32 | 11-09 21:13 → 22:04 | E2E 935c9cf ~45 min | nałożenie 4 języków |
| AF session_01T66VBzWM2UMShgAmsAohEN | 10/11 docs | — | 6,97 | 29 | 21:41 → 22:10 | — | ASO |
| AG session_01T66VByDErb8B2WiiRx5QYy | 08 kod | — | 4,63 | 22 | 22:04 → 22:16 | E2E w kolejce 10 min | PokerGym |
| AH session_01T66VBzFkgto6wWEdfnpqJv | 09 kod | — | 12,00 | 27 | 22:16 → 23:08 | E2E e67157a ~40 min | formy, LOCALE_MAP |
| AI session_01T66VBy3SzVXzqZofHLDo8s | 09 docs | — | 27,66 | 27 | 22:16 → 22:37 | — | przegląd de/es + metadane |
| AJ session_01T66VBzfe7wmrpKFsxQpze4 | 09 docs | — | 39,95 | 22 | 22:37 → 23:05 | — | przegląd ko/it/vi |
| AK session_01T66VBwzydL3Fmhtu5jsx2c | 09 kod | — | 9,48 | 27 | 23:08 → 00:05 | E2E 200d6a2 ~50 min | de+es |
| AL session_01T66VBxMBpJ4Nr8abBJbz6V | 09 kod | — | 13,12 | 32 | 00:05 → 01:00 | E2E 804160d ~54 min | ko/it/vi |
| koordynator session_01T66VBzPr7MhGZ3A6RPdfBG | (bez M9) | — | 57,84 (od 11-08 19:25) | 27 | — | — | do przekazania |
| API przekład D-358 (ja, zh-Hant, pt-BR, fr) | workflow | ≈ 31 | 40,63 | — | 11-09 | — | AB/AD |
| API przekład D-374/D-375 (de, es, ko, it, vi) | workflow | ≈ 40,2 | 53,92 | — | 11-09 21:13 → 22:30 | — | AI |
| AM session_01T66VBzioNjwudY42GtzgHt | 10 kod | — | 1,80 | 20 | 11-10 05:52 → 06:06 (przekazanie) → 06:09 CI zielone → 06:19 przyjęte | pytanie do właściciela ok. 2 min | kategoria Games/Card, zdanie w opisie |
| AN session_01T66VBy5HsHQDnmCWm8Vboj | 10 docs | — | 5,74 | 28 | 11-10 05:52 → 06:18 → 06:19 przyjęte | pytanie do właściciela ok. 2 min | KR/VN |
| API przekład pt-PT (AO) | workflow | ≈ 8,15 (×1,35 = 11) | 10,53 | — | 11-10 | — | mnożnik ×1,29 |
| AO session_01T66VBwQoZrfRhLaY2LmtdR | 09 kod | — | 23,55 (+ API 10,53) | 30 | 11-10 05:52 → 06:17 przekazanie → AS | — | pt-PT: przekład + przegląd 44 lekcji |
| AQ session_01T66VBxSH9VTYhVSyVDqCB5 | 09 audit docs | — | 98,37 | 34 | 11-10 06:09 → 06:26 → 06:34 przyjęte | odbiór ok. 10 min (koordynator zajęty) | pełny przegląd it, es, pt-BR; 39 subagentów |
| AR session_01T66VBx2fb5Tf1JtB5kMueE | 09 audit docs | — | 121,31 | 32 | 11-10 06:09 → 06:32 → 06:34 przyjęte | — | pełny przegląd fr, de, vi; 48 subagentów |
| koordynator session_01T66VBxtQGd3faU3Y4mNUuA | M9 | — | 31,42 (do 06:32) | 34 | 11-10 05:22 → przekazanie | — | + subagenci startu sesji ok. 0,8 mln tokenów |

Sesje wcześniejsze (A…AD) — koszty niezapisane [DO USTALENIA].
Mnożnik szacunku API: ×1,33 (2 pomiary). Mnożnik sesji: brak szacunków — na start 2.
Pełny przegląd w sesjach (KO-018): ok. 33–40 USD na język (AQ 98,37 / 3, AR 121,31 / 3); AP w toku. Sesje AQ i AR przekroczyły 30% kontekstu (34%, 32%) — krótkie zadanie, bez przekazania.
| AS | 09 build | — | 17,33 | 24,9 | 06:22 → 06:22 → 78f1c5f → (bez CI, gałąź sesji) → przekazanie 06:34, archiwum 06:55 | 21 min: przejęcie koordynatora | autor commitów niezgodny z CLAUDE.md |
| AP | 09 audit (fable) | — | 152,60 | 37,1 | 06:09 → 06:10 → … → (docs, bez CI) → przekazanie 06:51, przyjęte 07:05 | 12 min do odpowiedzi na polecenie przekazania (06:39→06:51), kontekst +3,4 pp. | — |
| AT | 09 build | — | 7,32 | 26,4 | 06:46 → 06:47 → a655dd2 07:02 → CI 1db8449 w toku → (warunkowo) | 0 | szybko: AS przygotowała wszystko |
| AU | 09 build (sonnet) | — | 5,37 | 32,4 | 06:56 → 06:57 → e43fb7f 06:59 → CI/E2E 40e5cef 08:39 → przyjęte 08:50 | 30 min: czekanie z pushem na koniec E2E 1db8449 (anulowanie przebiegu); 45 min E2E | szac. sesji 2–3 h, rzeczywiście 25 min |
