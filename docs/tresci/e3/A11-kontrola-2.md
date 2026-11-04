# A11: kontrola zawężona 2 (11 twierdzeń krytycznych)

- HEAD: `c657375` (Merge branch 'worktree-agent-aed394b63429584fc' into claude/sleepy-brahmagupta-2065nu)
- Punkt odniesienia: `e7627a1` (kontrola `A11-kontrola.md`, stan zaliczony)
- Weryfikator: niezależny subagent (nie autor), 2026-11-04
- Zakres: R-M12-009, R-M12-011, n:br.bi.base, n:br.bi.beginner, n:dd.bi.small, n:ror.two, M12-L4-RAMKA, H-INT-1, H-INT-2, t:bankroll, t:risk-of-ruin

## 1. Zmiany w treści

`git diff e7627a1 HEAD` na plikach z zakresu: zmienione tylko `content/numbers.yaml` i `content/pl/lessons/m12-l4-bankroll.md`. Bez zmian: `content/pl/exams/m12.yaml`, `content/helplines.yaml`, `content/terms.yaml`, `content/pl/rules.yaml`, pozostałe lekcje m12-*.

Grep po 11 kluczach (`R-M12-009`, `R-M12-011`, `br.bi.base`, `br.bi.beginner`, `dd.bi.small`, `ror.two`, `M12-L4-RAMKA`, `H-INT-1`, `H-INT-2`, `t:bankroll`, `t:risk-of-ruin`) w całym `git diff e7627a1 HEAD -- content/`: brak trafień w zmienionych liniach.

| Plik:miejsce | Zmiana | Ocena | Powód |
|---|---|---|---|
| `content/pl/lessons/m12-l4-bankroll.md:94` (zadanie R-M12-012, wyjaśnienie poprawnej odpowiedzi) | „Gdy wygrywasz, możesz grać więcej, ale ideałem wciąż jest ok. {{n:study.winner}} nauki, a minimum to {{n:study.min}}.” → „Także gdy wygrywasz, ideałem jest ok. {{n:study.winner}} nauki, a minimum to {{n:study.min}}.” | ZGODNE | Nie dotyczy żadnego z 11 twierdzeń (R-M12-012, plik w zakresie). Treść wprost w cytacie PokerStrategy (D. O'Kearney): „I'd say the ideal would still be a 50/50 ratio, but at a minimum never go under 20% study”. Zdanie usuwa zachętę „możesz grać więcej”, więc nie zachęca do gry na prawdziwe pieniądze. |
| `content/numbers.yaml`: `odds.oesd.rule-next` (nowy), `pf.vs3bet.*` (pole `source`), usunięte `exam.m6.eq.three-quarters`, `exam.m7.eq.three-quarters` | Poza zakresem | ZGODNE (nie dotyczy) | Żaden z kluczy 11 twierdzeń; klucze `br.bi.*`, `dd.bi.small`, `ror.two` bez zmian. |
| `content/pl/exams/m2.yaml`, `m6.yaml`, `m7.yaml`, `content/pl/lessons/m10-l1-statystyki.md` | Poza zakresem | ZGODNE (nie dotyczy) | Zmienione linie nie używają żadnego z 11 kluczy. |

## 2. Zmiany w rejestrze (`docs/tresci/rejestr/`)

Porównanie obiektów JSON (python, `git show e7627a1:<plik>` vs HEAD), pole po polu, także każde źródło w `zrodla`. Dla wszystkich 11 wpisów: `twierdzenie`, `adres`, `cytat`, `szczebel`, `odczyt`, `status`, liczba źródeł bez zmian; żaden wpis nie zmienił pliku.

| Wpis | Zmienione pola | Ocena |
|---|---|---|
| R-M12-009 | `przeglad.sha`; `miejsce` 2 źródeł rachunkowych: ścieżka `/tmp/.../rachunek.py`, `/tmp/.../ror_mc.py` → `rachunek_m12.py` (`sekcja_ror_wzor`, `sekcja_ror_mc`) | ZGODNE (metadane) |
| R-M12-011 | `przeglad` (null → zastępczy); `miejsce` źródła rachunkowego → `rachunek_m12.py`, `sekcja_ror_wzor` | ZGODNE (metadane) |
| n:br.bi.base | `level` null → heuristic; `przeglad.sha`; `miejsce` → `sekcja_ror_wzor` | ZGODNE (metadane) |
| n:br.bi.beginner | `level` null → heuristic; `przeglad.sha`; `miejsce` → `sekcja_ror_wzor` | ZGODNE (metadane) |
| n:dd.bi.small | `level` null → math; `przeglad` (null → zastępczy); `miejsce` `/tmp/.../downswing.py` → `sekcja_downswing` | ZGODNE (metadane) |
| n:ror.two | `level` null → math; `przeglad.sha`; `miejsce` `/tmp/.../ror_mc.py` → `sekcja_ror_mc` | ZGODNE (metadane) |
| M12-L4-RAMKA | `przeglad` (null → zastępczy) | ZGODNE (metadane) |
| H-INT-1 | `przeglad`; `uwagi` (dopisek A11: „bezpłatne” poparte cytatem stopki) | ZGODNE (metadane; dopisek prawdziwy: `zrodla[0].cytat` = „providing free practical advice and emotional support to anyone affected by gambling.”) |
| H-INT-2 | `przeglad` (null → zastępczy) | ZGODNE (metadane) |
| t:bankroll | `level` heuristic → rules | ZGODNE (metadane) |
| t:risk-of-ruin | `level` math → rules | ZGODNE (metadane) |

### Skrypt rachunkowy

Wszystkie nowe `miejsce` wskazują `docs/tresci/narzedzia/rachunki/rachunek_m12.py`; funkcje `sekcja_ror_wzor` (l. 60), `sekcja_downswing` (l. 100), `sekcja_ror_mc` (l. 133) istnieją.

`python3 -I docs/tresci/narzedzia/rachunki/rachunek_m12.py` z korzenia repo: kod wyjścia 0, „sprawdzeń: 46, rozbieżności: 0” (ok. 27 s). Wielkości z cytatów wpisów w zakresie:

- R-M12-009: RoR wr3/30 6,01%, wr3/15 24,51%, wr1/30 39,16%, wr1/50 20,96%, wr5/30 0,92%, wr2/40 8,21% (wzór); MC wr3/15, wr3/30, wr1/30 w tolerancji i nie powyżej wzoru: OK.
- R-M12-011: RoR wr3 przy 15 i 30 wpisowych 24,5% i 6,0%: OK.
- n:br.bi.base: e^(−2·3·3000/6400) = 6,0%: OK.
- n:br.bi.beginner: e^(−2·1·5000/6400) = 21,0%: OK.
- n:dd.bi.small: próg 10 wpisowych, 100 tys. rąk, wr 5 = 94,9%: OK.
- n:ror.two: MC wr3/30 vs wzór (cytat 5,7% vs 6,0%; wyliczone 5,99% w tolerancji ±1,06): OK.

Skrypt nie zmienił żadnego pliku (`git status` czysty poza tym raportem).

## 3. Skróty

`node docs/tresci/narzedzia/scal-rejestr.mjs --przeglad zastępczy --skroty | grep SKRÓT`:

| Wpis | Skrót | Jednostki |
|---|---|---|
| R-M12-009 | 9734bf632f3c | 3 |
| R-M12-011 | f991b4ff92ce | 3 |
| n:br.bi.base | ce6b770c611b | 3 |
| n:br.bi.beginner | d6dcbdd1599f | 3 |
| n:dd.bi.small | 124d1ba3c752 | 3 |
| n:ror.two | 7628777cfadc | 3 |
| M12-L4-RAMKA | bf7b4710d944 | 2 |
| H-INT-1 | 94c9d892c612 | 1 |
| H-INT-2 | 96866b00e471 | 1 |
| t:bankroll | 059e6284617a | 1 |
| t:risk-of-ruin | a97913b4e7bf | 1 |

Uwaga informacyjna (nie wpływa na werdykt): `przeglad.sha` zapisane w HEAD różni się od bieżącego skrótu dla R-M12-009, R-M12-011, n:br.bi.base, n:br.bi.beginner, n:dd.bi.small, n:ror.two, M12-L4-RAMKA (zmiana `miejsce`/`level` zmienia skrót); t:bankroll i t:risk-of-ruin nie mają pola `przeglad`. Po tej kontroli `przeglad.sha` należy ustawić na skróty z tabeli powyżej. H-INT-1 i H-INT-2: zapisane sha równe bieżącym.

## Werdykt

**ZALICZONE.** Zmiany od `e7627a1` w zakresie 11 twierdzeń dotyczą tylko metadanych rejestru (`level`, `miejsce` rachunków na ścieżkę w repo, `uwagi`, `przeglad`); twierdzenia, adresy, cytaty, szczeble i statusy bez zmian; skrypt rachunkowy liczy cytowane wielkości i kończy się kodem 0. Jedyna zmiana treści w plikach z zakresu (m12-l4, R-M12-012) jest zgodna ze źródłem i nie zachęca do gry na prawdziwe pieniądze.
