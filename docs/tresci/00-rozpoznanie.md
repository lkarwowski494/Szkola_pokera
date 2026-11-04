# Rola 06 Treści, build, E0: rozpoznanie (2026-11-04)

Sesja siedemnasta, prompt `06-tresci --tryb build` (moduły: kontrole-mechaniczne, tresci-krytyczne, historia-i-miejsca), gałąź `claude/sleepy-brahmagupta-2065nu`, start z 7cccfb5, D-138 w 4807130.

## 1. Środowisko
| Sprawdź | Wynik |
|---|---|
| System, Node, pnpm | Linux 6.18, Node 22.23.4, pnpm 10.28.0 |
| GitHub | push na gałąź roboczą przez git; MCP GitHub do odczytu CI |
| CI na `main` | workflow CI zielony (9.10.2026); E2E Maestro czerwony w przebiegach 14–18 (16–20.10.2026, `23950a4`), znalezisko roli 07, bez zmian |
| Lokalnie | `pnpm install` kod 0; `pnpm run ci` kod 0 („Treść aktualna: 44 lekcji, 142 reguł, 162 terminów”) |
| Sieć do źródeł | pełny dostęp (decyzja właściciela 2026-11-03); w E1 sprawdzę każdą domenę przy odczycie |
| Repo treści prywatnych | brak (`CLAUDE.md`); repo aplikacji publiczne |
| Dysk | odczyt działa (dokument 12 „Weryfikacja źródeł” w 4 częściach, stan 4–7.10.2026); edycja Google Docs niedostępna |
| Trening (analogia) | sklonowany do odczytu; rola 06 tam: `docs/research/rejestr-twierdzen.json` (kotwica tekstu + skrót), strażnik `scripts/claims.mjs`, bez znaczników `[T:ID]` w zdaniach |

## 2. Inwentarz (stan na 4807130)
| Gdzie | Ile | Rodzaj twierdzeń | Stan źródeł |
|---|---|---|---|
| `content/pl/rules.yaml` | 142 reguły (9 rules, 39 math, 17 gto, 72 heuristic, 5 exploit) | reguły, zalecenia, definicje | `source` z tytułem i cytatem; 291 pozycji `sources` (146 training, 57 solver-pub, 55 math, 10 solver-app, 9 rules, 6 study, 5 book, 5 population, 3 reference); **45 reguł nie-rachunkowych bez żadnego adresu** (tytuł bez URL); 2 reguły tylko z Wikipedii (R-M0-001, R-M11-004); 18 z jednym źródłem nierachunkowym |
| `content/numbers.yaml` | 825 liczb (499 z formułą, 326 wartości) | liczby, progi | formuły liczone przez `poker-core`; wartości: przykłady w zadaniach (~110), zasady i kombinatoryka (~30), solver projektu (21), serwisy i populacja (~80) |
| `content/pl/lessons/` | 44 lekcje, 392 ćwiczenia, ok. 57,6 tys. słów | wyjaśnienia „dlaczego”, oceny odpowiedzi | ćwiczenia i lekcje wskazują reguły (`rules: [...]`), liczby przez `{{n:}}`; zdania bez powiązania ze zdaniem źródła |
| `content/pl/exams/` | 14 egzaminów, 137 pytań | jak wyżej | jak wyżej |
| `content/ranges/` | 3 zestawy zakresów + 34 sytuacje (`spots.yaml`) | częstości solvera | solver projektu (walidacja: dokument 10 na Dysku, do sprawdzenia w E1) |
| `content/terms.yaml` | 162 terminy | definicje | do sprawdzenia w E1 (definicja przed pierwszym użyciem, `CLAUDE.md`) |
| `content/helplines.yaml` | 3 wpisy, tylko Polska | numery pomocy | **krytyczne**; storefrontu PL nie będzie (ER-04, OP-10, bloker) |
| `docs/architektura/moduly.md` „Konfiguracja” | `OCENA_PROG_*`, `FSRS_RETENCJA` 0,9, `FSRS_SZYBKO_MS`/`WOLNO_MS` 3000/8000 | parametry dziedzinowe | pochodzenie `[DO USTALENIA]` |
| BRD `reguly.md` RD-01–RD-12 | 80 wektorów | rachunek i progi | rachunek sprawdzony niezależnie (rola 01); RD-11 próg 3,5% (S-06) i L = 0,25 (parametr produktowy) |
| Teksty interfejsu (`apps/mobile/src/i18n`) | — | ostrzeżenia płatności i usuwania danych (D-135), 9 stanów błędów bez tekstu (`tlo-i-bledy.md` §4) | brzmienie: rola 04; fakty (np. co usuwa „Usuń postęp”): rola 06 z ADR 0004/0008 |
| Teksty sklepu i opis wydania | brak (rola 10) | — | sprawdzone, brak |

Rachunki na danych użytkownika (nie twierdzenia, bez źródeł): wynik testu, procent zgodności, licznik limitu, terminy powtórek FSRS. Twierdzeniem są progi i komunikaty: próg 85% testu modułu (D-106, decyzja produktowa), progi oceny RD-11, retencja FSRS 0,9.

## 3. Wymiary pokrycia
| Wymiar | Wynik |
|---|---|
| Kategorie twierdzeń | reguły, liczby, definicje, zalecenia, częstości solvera, oceny odpowiedzi (`why`), numery pomocy, parametry; dymki i nagrania: brak nagrań; sklep: brak tekstów (rola 10) |
| Progi krytyczne (zdrowie, mienie, prawo) | numery pomocy (RD-12); ramka „Odpowiedzialna gra” M12-L4; bankroll i wariancja M12 (mienie: rady o pieniądzach); ostrzeżenia płatności i usuwania danych (D-135) |
| Brakujące ostrzeżenia | sprawdzić w E1: granica zastosowania (kurs nie zachęca do gry na pieniądze, legalność gry zależy od kraju, wytyczna 5.3.4), ostrzeżenie przy bankrollu („pieniądze, na których stratę cię stać”) — propozycje z dowodem dla roli 03, nie dopisek |
| Jednostki i regiony | bb, %, żetony — bez walut (D-134); numery pomocy według regionu urządzenia; nazwy pozycji i terminów na język (09) |
| Aktualność | odczyty źródeł 4–9.10.2026 (dokument 12), zasady roli: odczyt w dniu pracy → ponowny odczyt w E1; numery pomocy `wazne_do` co 12 miesięcy |
| Trudna pamięć | sprawdzone, brak (bez historii i ofiar); ton uzależnienia od hazardu jako temat wrażliwy → krytyczne |
| Pary zdań | do E3 (weryfikator); znane ryzyko z dokumentu 12: „bronisz mniej niż MDF” poprawione 4.10 |
| Jedno źródło / niskie szczeble | 18 reguł z jednym źródłem, 45 bez adresu, 2 tylko z Wikipedii (lista w E1) |

## 4. Hierarchia źródeł (decyzja D-139, z `CLAUDE.md`, ADR-24)
Projekt ma własną hierarchię: 1 rachunek → 2 solvery i rozwiązania równowagi (nasz solver tylko po walidacji) → 3 książki uznanych autorów → 4 serwisy szkoleniowe → 5 eksploatacja tylko z danymi populacji. Skrypt biblioteki liczy szczebel 5 jako „nigdy nie potwierdza” (Wikipedia, fora), więc pole `szczebel` w rejestrze dostaje skalę biblioteki, a szczebel projektu zostaje w polu `level` (D-140):

| Szczebel biblioteki | Poker (projekt) | Numery pomocy i fakty spoza pokera |
|---|---|---|
| 1 | rachunek; zasady gry z regulaminu (Robert's Rules of Poker) | operator infolinii, regulator, urząd |
| 2 | opublikowane wyniki solverów; książki szczebla 3 projektu z czytanym fragmentem; publikacje recenzowane | literatura recenzowana |
| 3 | — | instytucje, organizacje branżowe |
| 4 | serwisy szkoleniowe; dane populacji z próbą (exploit) | serwisy z podanymi źródłami |
| 5 | Wikipedia, fora, blogi: tylko wskazówka | to samo |

Odrzucone: szczebel projektu wprost w polu `szczebel` (skrypt odrzuciłby eksploatację z danymi jako „szczebel 5”); domyślna hierarchia biblioteki zamiast ADR-24 (sprzeczna z `CLAUDE.md`). Treść krytyczna: liczby i numery tylko ze szczebli 1–3 (moduł `tresci-krytyczne`).

## 5. Format rejestru (decyzja D-141, delegacja; weto właściciela możliwe)
- **A (wybrana): rejestr nad istniejącym systemem.** `rules.yaml`, `numbers.yaml`, `helplines.yaml` i `terms.yaml` zostają źródłem prawdy; dopisuję `zrodla[]` (adres, miejsce, cytat, odczyt, szczebel) i `status`; generuję `docs/tresci/rejestr.json` w formacie biblioteki. Strażnik w `content-build` (jak `claims.mjs` w Treningu): każde ćwiczenie i każdy akapit lekcji z twierdzeniem ma powiązaną regułę albo liczbę, liczby tylko przez `{{n:}}` (już wymuszone), przegląd krytycznych ze skrótem wersji zdań. Za: zero przepisywania 57,6 tys. słów, kontrola działa w 35 językach bez znaczników w tłumaczeniach, analogia Trening. Przeciw: powiązanie na poziomie akapitu/ćwiczenia, nie zdania (łapie mniej niż skrypt biblioteki; tańsza kontrola: weryfikator w E3 czyta pary zdań).
- B: znaczniki `[T:ID]` w każdym zdaniu i skrypt biblioteki bez zmian. Za: pełny łańcuch zdanie → twierdzenie. Przeciw: przepisanie formatu 44 lekcji, 392 ćwiczeń, 137 pytań i `content-build` (ścieżka wrażliwa), znaczniki do zdjęcia przy budowie bazy i do utrzymania w 35 przekładach.
- Kopie stron źródeł: nie w repo publicznym (prawa autorskie); w repo tylko cytat do 250 znaków (decyzja 9.10.2026, `sources.ts`) i dowód sprawdzenia na surowym tekście (komenda + skrót strony) w `docs/tresci/odczyty/`.

## 6. Moduły
- `kontrole-mechaniczne`: tak (zawsze), w wersji dostosowanej do formatu A (D-141).
- `tresci-krytyczne`: tak — numery pomocy, odpowiedzialna gra, bankroll; przegląd zastępczy D-027 („Stan projektu”).
- `historia-i-miejsca`: nie — aplikacja nie mówi o miejscach, osobach ani wydarzeniach (sprawdzone, brak).

## 7. Pytanie produktowe (jedno)
**Numery pomocy poza 9 rynkami (OP-10, bloker).** Sprzedaż we wszystkich storefrontach poza PL (OP-15) to ok. 170 krajów [DO USTALENIA: dokładna liczba z App Store Connect].
- **(a) Rekomendacja:** pełne wpisy (infolinia dla graczy, kryzys) dla US, GB, CA, JP, BR, FR, TW, VN, DE ze źródeł szczebla 1; dla pozostałych krajów bez numeru: „skontaktuj się z lokalnymi służbami ratunkowymi” plus międzynarodowa pomoc online, jeśli znajdę źródło szczebla 1–3. Kompromis: użytkownik spoza 9 rynków nie widzi numeru; ok. 25 twierdzeń krytycznych do weryfikacji. Zmienia RD-12-W6 (rola 01, `fix`).
- (b) 9 rynków + numer alarmowy każdego z ok. 160 pozostałych krajów (dzisiejsze brzmienie RD-12). Kompromis: numer zawsze widoczny, ale ok. 170 twierdzeń krytycznych, każde ze źródłem szczebla 1 i przeglądem; ryzyko błędnego numeru w kryzysie.
- (c) Pełne wpisy dla krajów wszystkich 35 języków (ok. 40 krajów) + reszta jak (a). Kompromis: szersze pokrycie, ok. 100 twierdzeń krytycznych, część źródeł tylko w językach lokalnych (przekład przez 09).

## 8. Plan i szacunek [OCENA]
| Etap | Praca | Agent | Oczekiwanie | Właściciel |
|---|---|---|---|---|
| E1 | ponowny odczyt ok. 150–250 źródeł w partiach modułów (M0–M4, M5–M9, M10–M13; subagenci, model i wysiłek roli), uzupełnienie adresów z dokumentu 12, `rejestr.json`, numery pomocy według odpowiedzi z pkt 7, parametry `moduly.md`, stopnie oceny (BRD 4, S-06), sprzeczności, wektory dla 07 | 8–12 h, 2–3 sesje | sieć | ok. 15 min na bramce |
| E2 | poprawki treści z werdyktów, strażnik w `content-build` (ścieżka wrażliwa: przegląd w świeżym kontekście), `range.acceptable`/`range.explanation`, fakty dla 9 stanów błędów (brzmienie 04), pytania oceny poziomu (F-01) z puli egzaminów | 4–6 h | — | ok. 15 min |
| E3 | niezależna weryfikacja (subagent `06-tresci --tryb audit`), przegląd zastępczy treści krytycznych (D-027), przekazanie 07/05/08/09/04/10 | 3–4 h | — | ok. 15 min; przegląd eksperta później (ZAL) |

Zgłoszenia poza rolą (bez zmian w tej sesji): `formatNumber` w `tools/content-build/src/numbers.ts:108` po polsku — rola 08 (wektory w ADR 0014 pkt 7); brzmienie tekstów — 04; rejestr 03 i dokument 13 na Dysku — krok właściciela.
