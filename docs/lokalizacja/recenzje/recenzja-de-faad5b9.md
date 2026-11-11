# Audyt: Lokalizacja — Szkoła Pokera — 2026-11-11 (recenzja niezależna sesji DE)
Commit: faad5b9cafd7fcef03a1bf0ffeb8055f23050e0f (gałąź `sesja-dh-recenzja` = `origin/sesja-de-przeklad`) · Zakres: 564c3813..faad5b9c · Tryb: audit (recenzja, sesja DH) · Środowisko: Linux, Node, pnpm 10.28; działały `pnpm install --frozen-lockfile`, `pnpm run ci`, `tsx`, sondy w `git worktree` w scratchpadzie; nie uruchamiano Expo web ani symulatora (bez zrzutów).

**Werdykt: PRZYJĄĆ** (D-925). Brak znalezisk KRYT i WYS; 1 ŚR i 2 NIS do backlogu (próg wydania z `CLAUDE.md`: ŚR i NIS nie wstrzymują).

## Podsumowanie
Przekład 13 kluczy `scenario.action.*` w 10 słownikach jest poprawny i spójny: formy nazw akcji są te same co w przyciskach `play.*` danego języka, rodzaj gramatyczny c-bet zgadza się z `content/<j>/terms-nazwy.yaml` (de, it: r. f), szyk kwoty i partykuły w ja/ko/zh-Hant są naturalne, placeholdery i U+00A0 przed „bb” są we wszystkich 12 słownikach, a każda nazwa jest krótsza niż w źródle pl. Scalenie CY (ffa9bd7b) jest czyste: treść i rejestr są identyczne ze stanem CY. Zapadka ŚR-2 działa dla 11 obecnych języków, ale lista dozwolonych jest kluczowana po ID, więc każdy nowy język treści dla tych 6 ID wchodzi bez `sha_pl` bez błędu (ŚR, sonda). `pnpm run ci` na faad5b9c: kod 0.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 09-lokalizacja-001 | ŚR (P2) | D | Zapadka `BEZ_SHA_PL_DOZWOLONE` przepuszcza nowy język treści bez `sha_pl` dla 6 ID | otwarte |
| 09-lokalizacja-002 | NIS (P2) | D | Na ekranie gry dziennik ma „2 bb” (U+00A0), a przyciski i pula „2bb” | otwarte |
| 09-lokalizacja-003 | NIS (P2) | D | Komentarz zapadki obiecuje „6 ID × 11 języków = 66”, kod tego nie wymusza | otwarte |

Skala: KRYT = P0, WYS = P1, ŚR i NIS = P2 (ŚR z realnym skutkiem w procesie, NIS kosmetyka/spójność).

## Linia bazowa i założenia
Zbudowana przed odczytem zapisów autora (`stan-de.md`, `DE.md` przeczytane dopiero po wnioskach z kodu i słowników).
- Rynki i języki: polityka szeroka 35 (CLAUDE.md „Stan projektu”); rynki US, JP, CA, GB, BR, FR, TW, VN, DE → wymagane: en, ja, fr, pt-BR, zh-Hant, vi, de; zmiana dotyczy 10 z 12 wydanych słowników, wszystkie języki rynków są pokryte.
- Miejsca tekstu: przycisk (nazwa + druga linia kwoty), pasek ocen, zdania werdyktu i nagłówki „dlaczego” (`withAmount`), dziennik `play.log.*`; VoiceOver czyta te same teksty (etykiety przycisków). Powiadomienia, eksport, widżety: sprawdzone, brak w zakresie zmiany.
- Gramatyka: rodzaj c-bet (de, it, es, fr, pt), partykuły ja „に”/ko „로”, szyk kwoty (ja, ko: kwota przed akcją), wielka litera (`wielka()` podnosi tylko pierwszą literę, `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:26`).
- Formaty: liczba przez `formatujLiczbe(bb, jezykZadan())`, jednostka bb z U+00A0 w kluczu; 12/24 h, daty, jednostki miary: sprawdzone, brak w zakresie.
- Układ: długość nazw vs źródło pl (`dowody/dh-render-akcje.txt`); pseudolokalizacja i zrzuty: nie wykonano.
- Dostępność: etykiety przycisków = tekst przycisku w języku interfejsu; `accessibilityLanguage`: sprawdzone, brak potrzeby (brak fragmentów w innym języku poza terminami angielskimi zgodnymi z tabelą).
- Mechanizm: `trDeep` podstawia `{{t:…}}` wg języka słownika przed i18next (`apps/mobile/src/i18n/index.ts:31`); bez zmian w zakresie.
- Proces: kontekst kluczy (`pl.kontekst.json`) uzupełniony opisami 13 kluczy (wcześniej kopia en); zapadka sha_pl w rejestrze.
- Treści: M12 exams z CY (scalenie) — tylko kontrola, że scalenie nie zmieniło treści.
Soczewki: tłumacz bez ekranu (kontekst kluczy wystarcza: miejsce, długość, U+00A0, szyk), użytkownik drugiego rynku (de, ja: forma w zdaniu), VoiceOver (etykieta = przycisk). Proponowane zmiany w `docs/zalozenia.md`: brak.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `scenario.action.*` w 12 słownikach, po podstawieniu terminów | tak | `dowody/dh-render-akcje.txt` |
| Spójność z `play.*` i `terms-nazwy.yaml` (de, it, es, fr, pt, pt-BR, vi, ja, ko, zh-Hant) | tak | `dowody/dh-spojnosc.txt` |
| `play.log.*` U+00A0 (12 słowników) i pozostałe `play.*` | tak | `dowody/dh-spojnosc.txt` |
| `pl.kontekst.json` (13 opisów) | tak | diff 564c3813..faad5b9c |
| Zapadka ŚR-2 `scal-rejestr.mjs` + test | tak, sonda obejścia | `dowody/dh-sonda-zapadka.txt` |
| Scalenie CY ffa9bd7b | tak (brak zmian poza rodzicami) | `dowody/dh-spojnosc.txt` |
| `ekran-cn.test.tsx` (D-904) | tak: zmiana 2 asercji to zmiana specyfikacji formatu, `tekstEkranu()` normalizuje białe znaki (`apps/mobile/src/test-utils/ekrany/wspolne.tsx:119`) | diff |
| Długość na ekranie | częściowo: liczba znaków vs źródło pl, bez zrzutu | `dowody/dh-render-akcje.txt` |
| Treść M12 exams w 11 językach (CY) | nie (recenzja CY poza zakresem, KO-067) | — |
| `pnpm run ci` | tak | `dowody/dh-ci-faad5b9.txt` |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/lokalizacja/recenzje/recenzja-de-faad5b9.md . --rola 09-lokalizacja` → kod 0, „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 09-lokalizacja”. `git diff --cached` przejrzany przed commitem: tylko raport, dowody i `docs/decyzje/DH.md`.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| LOK-01 | nie dotyczy (zakres zmiany nie zmienia zestawu języków) | — |
| LOK-02 | nie dotyczy (bez zmian w `app.json`) | — |
| LOK-03 | dotyczy | ok: `pnpm i18n:kod` w CI kod 0 |
| LOK-04 | dotyczy | ok: 13 kluczy w 12 słownikach, test `scenariusz-akcje-de-09.test.ts` |
| LOK-05 | nie dotyczy (klucze bez liczby mnogiej) | — |
| LOK-06 | dotyczy | ok: `{{bb}}`, `{{akcja}}`, `{{kwota}}`, `{{t:…}}` zgodne we wszystkich językach |
| LOK-07 | dotyczy | ok dla `scenario.action.*`, `play.log.*`; 09-lokalizacja-002 dla reszty `play.*` |
| LOK-08 | dotyczy | nie sprawdzono zrzutem (brak Expo web w tej sesji); nazwy krótsze od źródła pl |
| LOK-09 | nie dotyczy (bez zmian mechanizmu) | — |
| LOK-10 | dotyczy (zapadka sha_pl) | 09-lokalizacja-001, 09-lokalizacja-003 |
| LOK-11 | dotyczy | ok: terminy z `terms-nazwy.yaml`, formy jak w `play.*`; drugi przegląd AI: własny odczyt recenzenta, nie rodzimy użytkownik |
| LOK-12 | dotyczy | ok: etykieta przycisku = tekst w języku interfejsu |
| LOK-13 | nie dotyczy (bez powiadomień i eksportu w zakresie) | — |
| LOK-14 | nie dotyczy (bez nowych pism) | — |
| LOK-15 | dotyczy | ok: test U+00A0 i test akcji w CI (`apps/mobile/src/i18n/__tests__/scenariusz-akcje-de-09.test.ts:194`) |

## Znaleziska (szczegóły)

### 09-lokalizacja-001 · Zapadka `BEZ_SHA_PL_DOZWOLONE` przepuszcza nowy język treści bez `sha_pl` dla 6 ID
- Pozycja listy kontrolnej: LOK-10
- Poziom: P2 (ŚR)
- Realność: realny (polityka 35 języków, treść jest dziś w 11) · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/tresci/narzedzia/scal-rejestr.mjs:124` „const BEZ_SHA_PL_DOZWOLONE = new Set(['n:dd.bi.small', 'M12-L4-RAMKA'” i `docs/tresci/narzedzia/scal-rejestr.mjs:139` „if (BEZ_SHA_PL_DOZWOLONE.has(w.id)) bezSkrotuPl.push” — zbiór i warunek po samym ID, bez języka. Sonda: 12. język `xx` z kontrolą (a) dla wszystkich wpisów krytycznych i bez `sha_pl` dla tych 6 ID → kod 0, uwaga 66 → 72 (`dowody/dh-sonda-zapadka.txt`).
- Mechanizm: lista dozwolonych kluczowana po ID zamiast po parze ID/język; `grep -n "BEZ_SHA_PL_DOZWOLONE" docs/tresci/narzedzia/scal-rejestr.mjs` → 2 trafienia: 124, 139.
- Powraca: nie (nowa kontrola, D-906) → trwała kontrola: test w `scal-rejestr.test.mjs` z nowym językiem.
- Wzorzec lub źródło: rola 09 zasada 3 („przekład twierdzenia to nowe twierdzenie”); cel zapadki w komentarzu `docs/tresci/narzedzia/scal-rejestr.mjs:121-123`.
- Kroki w aplikacji: brak bezpośrednio; skutek w procesie: przekład treści krytycznej (6 ID) w nowym języku nie zostanie oznaczony jako nieaktualny po zmianie pl.
- Opcje: (a) zbiór par `ID/język` (66 par) — nowy język = błąd, zero kruchości licznika; (b) zostawić do kroku „uwaga → błąd” D-878 — luka rośnie z każdym językiem. Rekomendacja: (a) (D-926).
- Test akceptacyjny: test w `scal-rejestr.test.mjs`: wpis z listy dla języka spoza 11 bez `sha_pl` → BŁĄD; sonda z `dowody/dh-sonda-zapadka.txt` kończy się kodem 1.
- Status: otwarte

### 09-lokalizacja-002 · Na ekranie gry dziennik ma „2 bb” (U+00A0), a przyciski i pula „2bb”
- Pozycja listy kontrolnej: LOK-07
- Poziom: P2 (NIS)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/i18n/locales/pl.json:482` „"call": "{{pos}}: {{t:call|sprawdza}} {{bb}} bb"” (U+00A0) obok `apps/mobile/src/i18n/locales/pl.json:464` „"call": "{{t:call|Sprawdzam}} {{bb}}bb"” i `apps/mobile/src/i18n/locales/pl.json:459` „"potLabel": "{{t:pot|Pula}}: {{bb}}bb"”; 11 kluczy `play.*` z „}}bb” w każdym z 12 słowników (14 w ja, ko) — `dowody/dh-spojnosc.txt`.
- Mechanizm: NIS-DA-01 (D-904) objął tylko `play.log.*`; `grep -c "}}bb" apps/mobile/src/i18n/locales/*.json` → 11–14 trafień na słownik.
- Powraca: nie → trwała kontrola: rozszerzenie testu U+00A0 (`apps/mobile/src/i18n/__tests__/scenariusz-akcje-de-09.test.ts:194`) na całe `play.*`.
- Wzorzec lub źródło: zasada DA §1 cytowana w D-904 („N bb” ze spacją nierozdzielającą).
- Kroki w aplikacji: Gra → rozdanie: dziennik „BTN: sprawdza 2 bb”, przycisk „Sprawdzam 2bb”, „Pula: 5bb”.
- Opcje: (a) U+00A0 we wszystkich `play.*` i test na cały słownik; (b) zostawić (różnica kosmetyczna). Rekomendacja: (a) w najbliższej partii tłumaczeń.
- Test akceptacyjny: brak „}}bb” w słownikach (wyjątki nazwane), test zielony.
- Status: otwarte

### 09-lokalizacja-003 · Komentarz zapadki obiecuje „6 ID × 11 języków = 66”, kod tego nie wymusza
- Pozycja listy kontrolnej: LOK-10
- Poziom: P2 (NIS)
- Realność: teoretyczny (dokumentacja kodu) · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/tresci/narzedzia/scal-rejestr.mjs:121` „Lista zamknięta (stan 2026-11-11: 6 ID × 11 języków = 66)” — sonda pokazuje 72 bez błędu (`dowody/dh-sonda-zapadka.txt`).
- Mechanizm: ten sam co 09-lokalizacja-001; znika razem z jego naprawą (a).
- Powraca: nie
- Wzorzec lub źródło: zasada wspólna 21 (kontrola wymuszona testem, nie komentarzem).
- Kroki w aplikacji: brak.
- Opcje: naprawić razem z 001 (a); albo poprawić komentarz („lista ID, języki bez ograniczeń”). Rekomendacja: razem z 001.
- Test akceptacyjny: jak 001.
- Status: otwarte

## Do sprawdzenia
- Długość na ekranie przy 320 pt i największym tekście (LOK-08): nazwy są krótsze niż źródło pl (najdłuższa pl 18 znaków „sprawdzenie (call)”, w przekładach maks. 13 — `dowody/dh-render-akcje.txt`), więc ryzyko niskie; zrzut w de i pt-BR — lista dla właściciela przy teście na telefonie.
- pt (europejski): nazwy akcji w 1. osobie („desisto/passo/pago/aumento”) w zdaniu „A tua escolha: pago 1,5 bb.” — zgodne z przyciskami `play.*` (D-902), naturalność do oceny przez rodzimego użytkownika (przegląd człowieka, nie AI).
- it: mieszanie „fold/check” (ang.) z „chiamo/rilancio” — zgodne z `play.*`, pytanie do rodzimego użytkownika języka, nie błąd przekładu.
- zh-Hant „溜入” (limp): termin bez przeczytanego źródła, odnotowany już w `content/zh-Hant/terms-nazwy.yaml:72` (backlog K-05); przekład go tylko powtarza.

## Co działa dobrze i należy zachować
- Formy nazw akcji brane z `play.*` tego samego języka: przycisk w scenariuszu i w grze mówią to samo.
- Szyk przez klucz `withAmount` (ja „{{kwota}}{{akcja}}”, `apps/mobile/src/i18n/locales/ja.json:1067`) zamiast sklejania w kodzie.
- U+00A0 w kluczach, nie w kodzie, i test, który pilnuje go w `play.log.*` i `scenario.action.*`.
- Opisy kontekstu 13 kluczy z miejscem, długością i partykułami — tłumacz nie potrzebuje ekranu.
- Zapadka ŚR-2 z testem czerwony → zielony; dla 11 obecnych języków usunięcie `sha_pl` spoza listy daje błąd.

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje agenta do weta: D-925 (werdykt PRZYJĄĆ), D-926 (naprawa 001 jako lista par ID/język) — `docs/decyzje/DH.md`.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 09-lokalizacja --tryb fix --zadania 09-lokalizacja-001,09-lokalizacja-002,09-lokalizacja-003` (001 i 003 dotyczą narzędzia roli 06 — wykonawca 06 albo 09 z jej zgodą).

Wynik `pnpm run ci` na faad5b9c: patrz `dowody/dh-ci-faad5b9.txt` (kod wyjścia 0, 09:50–10:01 UTC; `KOD WYJŚCIA: 0` na końcu pliku).
