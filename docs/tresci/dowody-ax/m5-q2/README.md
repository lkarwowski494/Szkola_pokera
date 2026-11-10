# Zadanie 6 AX: m5.exam.q2 — jednoznaczność (2026-11-10, rola 06) — OTWARTE

Pytanie: „Na którym z tych flopów [gracz na dużym blindzie] częściej niż ty ma dwie pary albo strita?” — 8-6-5 (poprawna), K-10-3, A-A-7.

Rachunek (szczebel 1: kombinatoryka; dane: zakresy solvera aplikacji `content/ranges/preflop-6max-100bb.json`; skrypt `licz.py`, wynik `wynik.txt`; `python3 -I docs/tresci/dowody-ax/m5-q2/licz.py`): udział rąk z najlepszym układem „dwie pary” albo „strit”.

| Flop | BTN (otwarcie) | BB tylko call (podział call/3-bet niezwalidowany, `spots.yaml:3`) | BB obrona łącznie (zwalidowana) |
|---|---|---|---|
| 8-6-5 | 1,8% | 2,0% | 1,8% |
| K-10-3 | 2,3% | 2,0% | 1,9% |
| A-A-7 | 21,4% | 15,5% | 21,6% |

Wnioski:
1. Zgłoszenie potwierdzone: na A-A-7 „dwie pary” ma każda para kieszonkowa i każda 7x, a na zwalidowanych danych BB ≈ BTN — dystraktor nie jest jednoznacznie fałszywy.
2. Szerzej: także poprawna odpowiedź 8-6-5 wychodzi remisem w kategorii „dwie pary albo strit” (1,8% vs 1,8–2,0%). Źródła R-M5-004 (rejestr `docs/tresci/rejestr.json`, odczyt 2026-11-04) mówią o przewadze BB „at the top end” na 654r (GTO Wizard, 20bb MTT) i o tym, że na 8d7d6d „the big blind (caller) has far more flushes and straights” (Upswing) — nie o udziale „dwie pary albo strit”. Kategoria w pytaniu (i w `because` R-M5-004) jest więc węższa/inna niż źródła i nie wynika z naszego rachunku.
3. Wyjaśnienie dystraktora A-A-7 („BB najsilniejsze asy przebija przed flopem”) nie ma wpisu w rejestrze.

Nie zmieniono treści (ADR-24: zmiana kategorii pytania i `because` reguły wymaga rozstrzygnięcia na doczytanych źródłach; za duży zakres na tę sesję po 30% kontekstu).

Opcje dla następnej sesji roli 06 (rekomendacja: A):
- A. Przeformułować pytanie na pojęcie ze źródeł („przewaga najsilniejszych rąk / nutsów”), dystraktory K-10-3 i inny flop wysoki niesparowany; poprawić `because` R-M5-004 tak samo; doczytać źródło dla „wysoki flop sprzyja otwierającemu”. Koszt: przegląd źródeł + 12 języków.
- B. Zawęzić kategorię do „strita”: jedna poprawna, ale pytanie da się rozwiązać bez strategii (strit możliwy tylko na 8-6-5) — spada trudność i zmienia się to, co mierzy.
- C. (produktowa, koordynator) wymienić pytanie M5 w puli oceny na inne pytanie egzaminu M5 z jedną poprawną odpowiedzią; m5.exam.q2 i R-M5-004 i tak do poprawy.
