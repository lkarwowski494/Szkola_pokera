# A11-kontrola: zawężona kontrola poprawek po przeglądzie A11

- Data: 2026-11-04
- Commit sprawdzany: `e7627a1` (Rola 06 E3: A11 (8/11) i poprawki 3 rozbieżności; test ekranu Pomoc z jednego źródła)
- Baza: `27b95d0` (commit pełnego przeglądu A11, `docs/tresci/e3/A11.md`, `A11.json`)
- Rola: niezależny weryfikator, nie autor. Repozytorium bez zmian poza tym plikiem.

## 1. Zmienione zdania w zakresie 11 twierdzeń

Diff `27b95d0..e7627a1` w `content/pl/lessons/m12-*`, `content/pl/exams/m12.yaml`, `content/helplines.yaml`, `content/terms.yaml`, `content/pl/rules.yaml`, `content/numbers.yaml`:

| # | plik:linia | było → jest | twierdzenie | poprawka A11 | ocena |
|---|---|---|---|---|---|
| 1 | `content/pl/exams/m12.yaml:83` (q9, wyjaśnienie dystraktora „Zostaję, bo…”; zdanie z `{{n:br.bi.base}}`, `{{n:br.bi.beginner}}`) | „…więc schodzisz poniżej {{n:exam.m12.md.half}}.” → „…więc schodzisz najpóźniej przy {{n:exam.m12.md.half}}.” | R-M12-011 (też n:br.bi.base, n:br.bi.beginner) | rozbieżność 1, dosłownie | ZGODNE |
| 2 | `content/pl/lessons/m12-l4-bankroll.md:144` (ramka „Odpowiedzialna gra”) | „Sygnały, że granie…” → „Niektóre sygnały, że granie…”; reszta zdania bez zmian | M12-L4-RAMKA | rozbieżność 2, dosłownie | ZGODNE |
| 3 | `content/helplines.yaml:16` (`fallback.text`, claim H-INT-2; renderowane w `{{helplines}}` i na ekranie „Pomoc”) | „ty albo ktoś bliski myśli” → „ty albo ktoś, kogo znasz, myśli”; reszta bez zmian | H-INT-2 | rozbieżność 3, dosłownie | ZGODNE |

Pozostałe pliki z listy:
- `content/pl/rules.yaml`: brak hunków w R-M12-009 i R-M12-011 (l. 1017–1032); zmiany dotyczą innych reguł (M1–M11, M13).
- `content/numbers.yaml`: brak zmian w `br.bi.base`, `br.bi.beginner`, `dd.bi.small`, `ror.two` (l. 445–457) ani w kluczach od nich zależnych (`ror.*`, `br.base.bb`, `br.ex.after-dd`, `exam.m12.*`); hunki tylko w innych modułach.
- `content/terms.yaml`: brak zmian we wpisach `bankroll` (l. 838) i `risk-of-ruin` (l. 886).
- Grep po zmienionych liniach całego `content/` (id reguł, `{{n:…}}` 4 kluczy, `{{t:bankroll`, `{{t:risk-of-ruin`, `helplines`, `H-INT`, `M12-L4`): jedyne trafienie to zmiana nr 1. Zmiany w M0–M11 i M13 nie dotykają zdań z tych twierdzeń.
- Pochodne: `apps/mobile/src/data/content/helplines.generated.ts` ma nowy tekst H-INT-2 (zgodnie z `content/helplines.yaml`); stara forma „ktoś bliski” nie występuje już w `content/` ani `apps/mobile/src`.

## 2. Ocena względem źródeł

- **R-M12-011 / q9:** „najpóźniej przy połowie” = PokerSkill „half the roll, which is the point to move down a stake” oraz reguła i lekcja („najpóźniej … do połowy”). Sąsiednie zdania q9 (poprawna odpowiedź: masz mniej niż połowę; trzeci dystraktor: „spadł poniżej progu”) dotyczą stanu poniżej 25 i pozostają prawdziwe. Brak nowej rozbieżności.
- **M12-L4-RAMKA:** „Niektóre sygnały” = Victoria „some of the signs of problem gambling”; lista nie jest już zamknięta. Pięć pozycji bez zmian, każda nadal ze źródłem (uwagi w rejestrze). Brak nowej rozbieżności.
- **H-INT-2:** „ktoś, kogo znasz” = MedlinePlus 001520 „you or someone you know”; warunek nie jest już zawężony. „Od razu” i „lokalny numer alarmowy” bez zmian. Brak nowej rozbieżności.
- Żadna zmiana nie wykracza poza poprawkę A11 (bez dodatkowych słów, liczb, terminów ani pewności).

## 3. Rejestr `docs/tresci/rejestr/` (porównanie obiektów 11 wpisów między commitami)

| id | plik | zmienione pola | ocena |
|---|---|---|---|
| R-M12-009 | m12-m13.json | — | ZGODNE |
| R-M12-011 | m12-m13.json | `uwagi` (dopisek „E3 2026-11-04 (A11, S3): egzamin M12 „najpóźniej przy” połowie zamiast „poniżej”…”) | ZGODNE |
| n:br.bi.base | m12-m13.json | — | ZGODNE |
| n:br.bi.beginner | m12-m13.json | — | ZGODNE |
| n:dd.bi.small | m12-m13.json | — | ZGODNE |
| n:ror.two | m12-m13.json | — | ZGODNE |
| M12-L4-RAMKA | m12-m13.json | `twierdzenie` („Niektóre sygnały utraty kontroli…”), `uwagi` (dopisek A11) | ZGODNE |
| H-INT-1 | pomoc.json | — | ZGODNE |
| H-INT-2 | pomoc.json | `twierdzenie` („ktoś, kogo znasz”), `uwagi` (dopisek A11) | ZGODNE |
| t:bankroll | terminy.json | — | ZGODNE |
| t:risk-of-ruin | terminy.json | — | ZGODNE |

Pola `zrodla` (adresy, cytaty, miejsca, szczeble), `werdykt_tekstu`, `poprawka`, `decyzja` i `uzyte_w` wszystkich 11 wpisów bez zmian. Inne zmiany w `m12-m13.json` (R-M13-002, R-M13-005, R-M13-006) są poza zakresem.

## 4. Werdykt

**ZALICZONE.** Trzy zmienione zdania to dokładnie minimalne poprawki A11. Poza nimi zdania 11 twierdzeń się nie zmieniły. Rejestr zmienia tylko `twierdzenie` i `uwagi` zgodnie z poprawkami, bez zmian w źródłach i cytatach. Nie ma nowych rozbieżności ze źródłami.

## 5. Skróty (`node docs/tresci/narzedzia/scal-rejestr.mjs --przeglad zastępczy --skroty`, commit e7627a1)

| id | skrót | jednostki |
|---|---|---|
| R-M12-009 | 6795c4214764 | 3 |
| R-M12-011 | b143e4e46d30 | 3 |
| n:br.bi.base | a3f2b79bb024 | 3 |
| n:br.bi.beginner | 5231911bcdbd | 3 |
| n:dd.bi.small | 7e1d35774f4d | 3 |
| n:ror.two | 11f6cec9eb5c | 3 |
| M12-L4-RAMKA | f12d7359f3c9 | 2 |
| H-INT-1 | 94c9d892c612 | 1 |
| H-INT-2 | 96866b00e471 | 1 |
| t:bankroll | 059e6284617a | 1 |
| t:risk-of-ruin | a97913b4e7bf | 1 |
