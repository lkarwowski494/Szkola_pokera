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
| AV | 08 fix (sonnet) | — | 0,85 | 15,4 | 09:33 → 09:33 → 128a089 09:41 → CI 09:44, E2E 10:31 → przyjęte 10:35 | 49 min: przebieg E2E (kompilacja + flowy) | praca sesji 8 min; E2E 6× dłuższe niż praca |
| AW | 08 build (sonnet) | — | 4,45 (10:15) | 27,7 | 09:34 → 09:35 → bd965be ok. 09:46 → 0a89f70 10:07 → CI/E2E bca751e w toku | ok. 25 min: push na roboczą czekał na koniec E2E 128a089 | szac. sesji 3–4 h, rzeczywiście ok. 35 min; recenzja zdublowana przy przekazaniu koordynatora (2 subagenty) |
| AX | 06 fix (opus) | — | 16,56 (10:08) | 28,5 | 09:36 → 09:37 → e0ab3d2 10:05 → CI/E2E bca751e w toku | ok. 25 min: jw. | subagenci ok. 0,9 mln tokenów wg sesji; m5.q2 nie zmieściło się w kontekście |
| BA | 06 fix (opus) | — | 13,39 | 29,1 | 10:40 → 10:46 → 02ec8c4 11:06 → (bez CI roboczej; recenzja WYS 2) → przekazanie 11:06, archiwum 11:23 | 0 | praca 20 min; recenzja niezależna znalazła 2 WYS w poprawce blokera → następca BB; subagenci ok. 730 tys. tokenów wg sesji |
| BB | 06 fix (opus) | — | 8,34 | 23,4 | 11:15 → 11:21 → fbb2d15 11:37 → kontrola poprawek 11:44 → czeka na scalenie | 0 | praca 16 min; oddała część B przy 23% (próg 25% z polecenia liczony ostrożnie) |
| AW (końcowy) | 08 build (sonnet) | — | 4,86 | 28,6 | … → 0a89f70 10:15 → w bca751e (E2E czerwone 11:42, regresja ramy stołu) → naprawa AZ → E2E 42812007468 na 57a83bf zielone 13:11 → przyjęte i zarchiwizowane 13:31 | kolejka macos-26 ok. 25 min (11:59→12:24) + 1 przebieg E2E stracony (66 min) | regresja nie wykryta przez 2 recenzje |
| AX (końcowy) | 06 fix (opus) | — | 16,56 | 28,5 | … → przyjęte 13:31 (E2E 57a83bf) | jw. | — |
| BB/BA (KO-029) | 06 fix (opus) | — | — | — | fbb2d15 w 57a83bf → E2E zielone 13:11 | — | przyjęte |
| BC | 06 fix (opus) | — | 7,78 | 28,8 | 11:42 → 7e8c376 11:59 → recenzja 12:25 → ff 00b0566 14:03 → CI+E2E zielone 14:55 → przyjęte 15:10 | czekanie na build 1010 (zakaz push na roboczą) ok. 1 h 35 min | — |
| AZ (końcowy) | 08 fix (sonnet) | — | 3,25 | 26,3 | … → Z4 00b0566 12:28 → E2E zielone 14:55 → przyjęte 15:10 | jw. | — |
| BD | 03 build (opus) | — | nieodczytany | — | 15:05 → 8cba034 15:19 → przyjęte 15:25 | 0 | praca ok. 15 min |
| BE | 04 build (opus) | — | 9,38 | 34,4 | 15:10 → be3d801 15:20 → 8c4ecc6 15:30 → następca BH 16:00 | wybór właściciela 15:45 | szacunek sesji 70% vs pomiar 34,4% |
