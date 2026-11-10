# Audyt: Programista — Szkoła Pokera — 2026-11-10 (recenzja niezależna BT, krok F)
Commit: 713314b (zakres `60465c0..713314b`, 11 commitów BT/BS) · Tryb: audit (sesja BW, polecenie koordynatora `docs/koordynacja/polecenia/BW.md` @ 1564f82) · Środowisko: Linux x86_64, Node v22.23.4, pnpm 10.28.0; działa: `pnpm run ci`, vitest, jest, node:sqlite, tsx; nie działa: iOS, Xcode, VoiceOver, urządzenie (dostępność oceniona z kodu i testów RNTL).

**Werdykt: PRZYJĄĆ.** Brak znalezisk KRYT i WYS. 2 × ŚR i 5 × NIS do backlogu (próg wydania z `CLAUDE.md`: ŚR i NIS nie blokują). Stan i raport autora (`docs/programista/stan-bt.md`) nie były czytane przed werdyktem.

## Podsumowanie
Ścieżki wrażliwe zmiany (KO-043 w `startAktywnosci`/`wejscieDoAktywnosci`, `parsujPlan` z wariantem, `wynikiScenariuszy`, adapter `getScenarioTemplates`) są poprawne, czyste i pokryte testami, które łapią błędy: 8 z 9 mutacji ręcznych zabitych, jedyny ocalały mutant dotyczy granicy nieosiągalnej przy obecnych szablonach. Zapis postępu idzie istniejącymi transakcjami portu (UPSERT odpowiedzi, start z porzuceniem w jednej transakcji), bez zmiany schematu i bez migracji. Ocena decyzji pochodzi z rachunku generatora (`hit > required`); sonda na 42 000 decyzjach realnych szablonów nie znalazła sprzeczności zaokrąglonych liczb z oceną. Limitu nie da się obejść na korzyść użytkownika; jedyny wyścig (podwójne dotknięcie „Nowe rozdanie”) zużywa dodatkowy start i zostawia dwie aktywności w toku (ŚR). Drugie ŚR: odpowiedzi scenariusza trafiają do statystyk „Postęp”, gdzie „Najsłabsze” pokazuje surowy identyfikator `sc-01`. `pnpm run ci` na 713314b: kod 0.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | ŚR (P2) | D | Podwójne dotknięcie „Nowe rozdanie” / „Zagraj to samo jeszcze raz” startuje dwie aktywności w toku i zużywa dwa starty | otwarte |
| 08-programista-002 | ŚR (P2) | D | Odpowiedzi scenariusza w statystykach „Postęp”: „Najsłabsze” pokazuje surowe `sc-01` | otwarte |
| 08-programista-003 | NIS (P2) | D | „Zagraj to samo jeszcze raz” bierze wariant z historii odcisków, nie z sesji: po nieudanym zapisie odcisku odtwarza poprzednie rozdanie | otwarte |
| 08-programista-004 | NIS (P2) | D | Logika trasy `app/scenario.tsx` (kolejne, zakończ, wejście, zakup) bez testu | otwarte |
| 08-programista-005 | NIS (P2) | D | Błędy bez komunikatu: zapis wyboru poziomu i porzucenie rozdania tylko w dzienniku; błąd startu na ekranie końca bez ogłoszenia VoiceOver | otwarte |
| 08-programista-006 | NIS (P2) | P | Ekran końca nie mówi, „co trafia do powtórek” (projekt 04), a odpowiedzi scenariusza nie trafiają do powtórek | otwarte |
| 08-programista-007 | NIS (P2) | D | Identyfikator zadania w „Zgłoś błąd” (`#indeks+1`) różni się od zapisanego `zadanie_id` (`#krok` od 0) | otwarte |

## Linia bazowa i założenia
Linia bazowa ustalona z kodu i wymagań przed czytaniem testów autora: ścieżki zapisu scenariusza to (1) start = `zacznijAktywnosc` (INSERT + opcjonalne porzucenie w jednej transakcji) + `zapiszOdcisk` po starcie, (2) odpowiedź = `zapiszKrok` (UPSERT po `(aktywnosc_id, krok)` + `krok = max(...)`) albo `zakonczAktywnosc` (ostatnia odpowiedź + zamknięcie w jednej transakcji), (3) „Zakończ” = `porzucAktywnosc`, (4) ustawienie poziomu = `zapiszPoziomScenariusza`. Odczyty: `aktywnoscWToku`, `odczytajOdciski`, `wynikiScenariuszy`, `getScenarioTemplates`.

Wymiary pokrycia:
- Ścieżki zapisu: wszystkie cztery przez port i transakcje istniejące przed BT; BT nie dodaje SQL zapisu; schemat bez zmian (plan w JSON). Znalezisko 001 (wyścig startów).
- Obsługa błędów: odpowiedź nieudana → `bladZapisu` z komunikatem i ponowieniem; odczyt nieudany → ekran błędu z „Ponów”. Znalezisko 005 (trzy ciche ścieżki).
- Typy na granicach: `parsujPlan` z `unknown` (poziom z zamkniętej listy, ziarno całkowite), `wynikiScenariuszy` z `unknown`, `getScenarioTemplates` przez Zod `safeParse` + zgodność `id`. Sprawdzone, brak.
- System projektowy: tokeny `useTokens`, `odstep`, `CEL_DOTYKU`; nowe kolory brak. Odsyłam do roli 04 (SP-03); sprawdzone, brak znalezisk 08.
- i18n: 49 kluczy `scenario.*` w 12 plikach języków, brak brakujących; liczby bez form mnogich (format „N z M”). Sprawdzone, brak.
- Wydajność: `wynikiScenariuszy` czyta wszystkie odpowiedzi scenariuszy przy każdym otwarciu startu (liniowo, małe liczby). Sprawdzone, brak.
- Testy na właściwym poziomie: logika czysta (poziom, wariant, dostęp) w jest bez bazy; aktywność na node:sqlite (`portTestowy`); komponenty RNTL. Trasa bez testu: 004.
- Dostępność: radiogroup/radio poziomu, `expanded` w rozwijanych, ogłoszenia werdyktu (`useAnnounce`), cele ≥ 44 pt. Znalezisko 005 (ogłoszenie błędu na końcu).
- Liczby konfiguracyjne: progi automatu w `poziom.ts` ([OCENA], D-649), limit z `KONFIGURACJA`. Sprawdzone, brak.

Soczewki: przerwany zapis (wznowienie z planu i odpowiedzi; brak kroku = nowy wariant, nie zgadywanie), recenzent szukający ścieżki bez testu (mutacje, 004), pierwszy czytelnik modułu (komentarze z ID wymagań i decyzji), VoiceOver (005). Wzorzec: dokumentacja react.dev dla błędów w obsłudze zdarzeń (obsługa jawna przez `Wynik`, zachowana) i moduł `sqlite-expo` (jedna kolejka portu, UPSERT). Zmian w rejestrze założeń nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/domena/src/maszyny.ts`, `limit.ts`, `wariant.ts` (KO-043) | tak, kod + mutacja M1 | dowody/bw-mutacje.txt |
| `packages/postep/src/aktywnosci.ts` (`parsujPlan`, `wynikiScenariuszy`, start, krok, zakończenie) | tak, kod + mutacja M4 | dowody/bw-mutacje.txt |
| `apps/mobile/src/data/content/repo.ts` (`getScenarioTemplates`) | tak, kod + mutacja M8 | dowody/bw-mutacje.txt |
| `features/scenariusz/aktywnoscScenariusza.ts`, `poziom.ts`, `dostep.ts`, `wariant.ts`, `wejscie.ts` | tak, kod + mutacje M2, M3, M5, M6, M7, M9 + sonda wyścigu | dowody/bw-mutacje.txt, dowody/bw-sonda-wyscig.txt |
| `app/scenario.tsx`, `app/scenarios.tsx`, `EkranScenariusza.tsx`, `komponenty.tsx`, `WyborScenariusza.tsx` | tak, czytanie kodu | — |
| Ocena decyzji i liczby (`scenario-gen.ts` sprzed BT, `zdanieLiczb`) | tak, sonda 3000 ziaren × poziom × szablon | dowody/bw-sonda-procent.txt |
| Skutki uboczne w innych ekranach (`statystyki.ts`, `progress.tsx`) | tak, czytanie kodu | — |
| Pliki języków (12) | tak, skrypt porównania kluczy | — |
| CI całości | tak, `pnpm run ci` kod 0 | dowody/bw-ci-713314b.txt |
| Zachowanie na urządzeniu, VoiceOver, duży tekst | nie sprawdzono (brak iOS w chmurze) | — |
| Szablony treści sc-01/02/19 merytorycznie | nie (rola 06) | — |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/programista/recenzje/recenzja-bt-713314b.md . --rola 08-programista`: OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista (kod 0). Pliki dowodów przejrzane pod kątem adresów e-mail i kluczy: brak.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | ok dla logiki czystej (poziom: 15 testów, wariant, dostęp, KO-043); trasa bez testu: 08-programista-004 |
| DEV-02 | dotyczy | 8/8 commitów BT zmieniających zachowanie (a929f90, ad80a49, fefb7c4, 2a2d4fc, 8eb85cf, d151863, e51e700, 97c93e6) zmienia testy w tym samym commicie (`git show --stat`) |
| DEV-03 | dotyczy | ok: grep `.skip(`, `.only(`, `it.todo(` w plikach testów zakresu bez trafień; zmiany testów content-build (658c382, c859a9e) poszerzają fiksturę, nie usuwają asercji |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0, apps/mobile 109 zestawów / 814 testów (dowody/bw-ci-713314b.txt) |
| DEV-05 | dotyczy | ok: brak `OR REPLACE`; UPSERT odpowiedzi; start + porzucenie w jednej transakcji; wyścig startów: 08-programista-001 |
| DEV-06 | nie dotyczy | BT nie zmienia schematu ani kopii (plan w kolumnie JSON, D-646) |
| DEV-07 | dotyczy | ok: brak planu z wariantem przy wznowieniu → nowy wariant, nie zgadnięty poziom; `?? 'latwy'` w `poziomDlaSzablonu` tylko przy szablonie bez poziomów (schemat wymaga łatwego) |
| DEV-08 | dotyczy | ok: znaczniki ms z zegara, `dzienLokalny` z domeny |
| DEV-09 | dotyczy | ok: `parsujPlan`, `wynikiScenariuszy` z `unknown`; `getScenarioTemplates` przez Zod |
| DEV-10 | dotyczy | 08-programista-005 |
| DEV-11 | dotyczy | odesłane do roli 04 (SP-03); brak nowych kolorów |
| DEV-12 | dotyczy | ok: 49 kluczy w 12 językach; brak sklejania poza separatorem „ · ” |
| DEV-13 | dotyczy | ok: progi w `poziom.ts` z D-649 |
| DEV-14 | dotyczy | ok: diff bez plików kluczy i wzorców sekretów |
| DEV-15 | dotyczy | ok: brak nowych nasłuchów i timerów bez sprzątania |
| DEV-16 | dotyczy | ok: bb w nazwach (`pulaBb`, `doSprawdzeniaBb`, D-648), `elapsedMs`, `terazMs` |

## Znaleziska (szczegóły)

### 08-programista-001 · Podwójne dotknięcie „Nowe rozdanie” startuje dwie aktywności w toku i zużywa dwa starty
- Pozycja listy kontrolnej: DEV-05
- Poziom: P2 (ŚR wg progu wydania: limit nie daje się obejść na korzyść użytkownika, danych nie traci)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/app/scenario.tsx:150` `kolejne` uruchamia `przygotuj()` i `otworz()` bez blokady i bez stanu ładowania (porównaj `apps/mobile/src/app/scenario.tsx:91`, gdzie `zaladuj` ustawia stan ładowania); `packages/postep/src/aktywnosci.ts:56` wstawia aktywność bez ponownego sprawdzenia limitu ani jednej aktywności w toku w transakcji. Sonda: dwa równoległe `otworzScenariusz` przy pozostało 1 → oba ok, dwie aktywności `w_toku`, zużycie 2 (dowody/bw-sonda-wyscig.txt).
- Mechanizm: limit i „w toku” czytane przed transakcją startu; `grep -n "zapisWToku\|ladowanie" apps/mobile/src/app/scenario.tsx` → blokada tylko w `odpowiedz` (`zapisWToku`), nie w `kolejne`.
- Powraca: nie
- Wzorzec lub źródło: ADR 0010 / komentarz `aktywnoscScenariusza.ts` „w toku jest najwyżej jedno”
- Kroki w aplikacji: koniec rozdania → szybko dwa razy „Nowe rozdanie” (albo „Zagraj to samo jeszcze raz”) przy wolnym telefonie; drugi start ląduje jako druga aktywność w toku; zużycie dnia 2.
- Opcje: (a) blokada w `kolejne` (ref jak `zapisWToku`) i stan „ładowanie” — mały diff, chroni ten ekran; (b) dodatkowo w `zacznijAktywnosc` odmowa, gdy istnieje inna aktywność tego rodzaju w toku bez `porzuc` — chroni wszystkie ekrany, większa zmiana w ścieżce wrażliwej. Rekomendacja: (a) teraz, (b) do decyzji roli 05.
- Test akceptacyjny: test trasy (RNTL) z dwoma szybkimi `press` na „Nowe rozdanie” → jedno wywołanie startu; w bazie najwyżej jedna aktywność `scenariusz` w toku.
- Status: otwarte

### 08-programista-002 · Odpowiedzi scenariusza w statystykach „Postęp”: „Najsłabsze” pokazuje surowe `sc-01`
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚR)
- Realność: realny · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: odpowiedź scenariusza zapisuje `rodzina_id: s.szablon.id` (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:133`); `statystykiRodzin` liczy wszystkie rodzaje poza oceną poziomu (`packages/postep/src/statystyki.ts:31`); ekran bierze nazwę z `getFamilyLabels` (tylko rodziny ćwiczeń) i wpada w `labels.get(w.family) ?? w.family` (`apps/mobile/src/app/(tabs)/progress.tsx:65`), a próg „Najsłabsze” to 2 odpowiedzi (`apps/mobile/src/app/(tabs)/progress.tsx:38`), czyli jeden wariant z dwiema decyzjami.
- Mechanizm: nowy rodzaj odpowiedzi w tabeli wspólnej z ćwiczeniami; jedno miejsce odczytu (`statystykiRodzin`).
- Powraca: nie
- Wzorzec lub źródło: D-477 (ten sam mechanizm filtru dla oceny poziomu)
- Kroki w aplikacji: zagraj jeden wariant sc-01 z błędem → zakładka „Postęp” → w „Najsłabsze” wiersz „sc-01” zamiast nazwy; trafność ogólna miesza scenariusze z ćwiczeniami.
- Opcje: (a) filtr `a.rodzaj <> 'scenariusz'` w `statystykiRodzin` jak D-477 — scenariusze poza statystyką; (b) etykieta szablonu (`situation`) w `progress.tsx` — scenariusze w statystyce z nazwą. Rekomendacja: (a), decyzja o statystyce scenariuszy do roli 03.
- Test akceptacyjny: test `statystykiRodzin` z aktywnością `scenariusz` → brak rodziny `sc-01` (albo test ekranu z etykietą).
- Status: otwarte

### 08-programista-003 · „Zagraj to samo jeszcze raz” po nieudanym zapisie odcisku odtwarza poprzednie rozdanie
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 (NIS)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:88` powtórka = `generateVariant(generator, w.poziom, ostatni.ziarno)` z historii; zapis odcisku po starcie może się nie udać i trafia tylko do dziennika (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:110-111`). Wtedy ostatni wpis historii to wariant wcześniejszy: przycisk odtwarza inne karty (BR-GEN-001), a KO-043 uznaje je za powtórkę poza limitem.
- Mechanizm: dwa źródła prawdy o „ostatnim wariancie” (sesja ekranu ma `wariant.seed`, start bierze historię).
- Powraca: nie
- Wzorzec lub źródło: BR-GEN-001 „Zagraj jeszcze raz to samo rozdanie”
- Kroki w aplikacji: zapis odcisku nieudany (pełny dysk) → koniec rozdania → „Zagraj to samo jeszcze raz” → inne karty.
- Opcje: (a) powtórka z ziarna sesji (`k.sesja.wariant.seed`), a odcisk do KO-043 z historii po dopisaniu; (b) zapis odcisku w transakcji startu. Rekomendacja: (b) przy najbliższej zmianie `zacznijAktywnosc`, (a) jako tańsza.
- Test akceptacyjny: test z portem, którego `zapiszOdcisk` zwraca błąd → powtórka daje ten sam `fingerprint` co zagrany wariant.
- Status: otwarte

### 08-programista-004 · Logika trasy `app/scenario.tsx` bez testu
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (NIS)
- Realność: realny · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `grep -rln "app/scenario'" apps/mobile/src --include=*.test.*` → brak; testy BT obejmują funkcje czyste, aktywność na node:sqlite i komponenty prezentacyjne, nie trasę (`kolejne`, `zakoncz`, `wejdz` z wznowieniem, przejście do zakupu i powrót po zakupie). Sesja ćwiczeń ma test trasy (`apps/mobile/src/__tests__/sesja-render-08.test.tsx`).
- Mechanizm: jedna trasa; 001 i 005 żyją właśnie w niej.
- Powraca: nie
- Wzorzec lub źródło: rola 08, „Dobry test: Ekran … skutek w danych”
- Kroki w aplikacji: nie dotyczy (brak pokrycia).
- Opcje: (a) test trasy RNTL na `portTestowy` dla 4 przepływów; (b) przenieść `kolejne`/`zakoncz` do modułu z testem jednostkowym. Rekomendacja: (a).
- Test akceptacyjny: test trasy pada po usunięciu blokady z 001 i po zamianie trybu w `kolejne`.
- Status: otwarte

### 08-programista-005 · Błędy bez komunikatu: wybór poziomu, porzucenie rozdania, błąd startu na końcu bez ogłoszenia
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 (NIS)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/app/scenario.tsx:112` nieudany `zapiszPoziomScenariusza` tylko do dziennika, choć BR-POZ-002 wymaga zapamiętania wyboru; `apps/mobile/src/app/scenario.tsx:141` nieudane porzucenie → `router.back()` bez komunikatu (bezpieczne: rozdanie wróci przy wejściu); `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:259` tekst błędu startu bez `accessibilityRole="alert"`, a przycisk nie pokazuje pracy (VoiceOver nie usłyszy ani startu, ani błędu).
- Mechanizm: `grep -n "zapiszBladPostepu" apps/mobile/src/app/scenario.tsx` → 3 miejsca, w 2 bez komunikatu dla użytkownika.
- Powraca: nie
- Wzorzec lub źródło: zasada roli 08 „Nieudany zapis zawsze daje widoczny komunikat”; `tlo-i-bledy.md` §4 cytowany w kodzie
- Kroki w aplikacji: pełny dysk → wybór „Trudny” → po ponownym wejściu wraca „Automatycznie” bez słowa.
- Opcje: (a) komunikat `session.saveFailed` przy wyborze poziomu i `alert` na ekranie końca; (b) zostawić porzucenie bez komunikatu z komentarzem powodu. Rekomendacja: (a) + (b).
- Test akceptacyjny: test komponentu końca: tekst błędu ma rolę `alert`; test trasy: błąd zapisu poziomu pokazuje komunikat.
- Status: otwarte

### 08-programista-006 · Ekran końca nie mówi, „co trafia do powtórek”
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (NIS)
- Realność: realny · Pewność: wysoka
- Rodzaj: P (decyzja produktowa)
- Dowód: projekt 04: „zdanie „N z M decyzji dobrze” i co trafia do powtórek” (`docs/design/scenariusz-i-ocena.md:23`); `KoniecScenariusza` pokazuje tylko wynik (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:258`), a `odpowiedzWScenariuszu` nie przekazuje `powtorka` do zapisu, więc błędy scenariusza nie trafiają do powtórek. BRD scenariuszy nie wymaga powtórek; decyzji D-645…D-651 o tym brak.
- Mechanizm: rozbieżność projekt ↔ kod bez decyzji.
- Powraca: nie
- Wzorzec lub źródło: zasada 15 (wygląd i treść z systemu roli 04)
- Kroki w aplikacji: koniec rozdania z błędem → brak informacji o powtórkach.
- Opcje: (a) zapisać decyzję „scenariusze nie zasilają powtórek” i poprawić projekt 04 — bez kodu; (b) dodać błędy scenariusza do powtórek i zdanie na końcu — nowa funkcja, decyzja 03. Rekomendacja: (a) w 1.0.
- Test akceptacyjny: decyzja w `docs/decyzje.md` i projekt 04 zgodny z kodem (albo test zapisu powtórki przy (b)).
- Status: otwarte

### 08-programista-007 · Identyfikator zadania w „Zgłoś błąd” różni się od zapisanego
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2 (NIS)
- Realność: realny · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: zgłoszenie `zadanieId={`${s.szablon.id}#${indeks + 1}`}` (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:201`), zapis `zadanie_id: `${s.szablon.id}#${krok}`` od 0 (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:133`): ta sama decyzja ma „sc-01#1” w zgłoszeniu i „sc-01#0” w bazie i eksporcie.
- Mechanizm: dwa miejsca budują ten sam identyfikator.
- Powraca: nie
- Wzorzec lub źródło: zasada „ta sama wielkość ma jeden klucz” (`CLAUDE.md`, zasady techniczne)
- Kroki w aplikacji: rozwinięcie oceny flopu → „Zgłoś błąd” → wiadomość z `sc-01#1`, a w danych flop to `sc-01#0`.
- Opcje: (a) jedna funkcja `idZadaniaScenariusza(szablon, krok)` w `wariant.ts`; (b) zostawić i opisać numerację w zgłoszeniu. Rekomendacja: (a).
- Test akceptacyjny: test komponentu: identyfikator w zgłoszeniu równy `zadanie_id` zapisanej odpowiedzi.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- **Seria słabych wariantów liczona na każdym poziomie:** licznik słabych (`apps/mobile/src/features/scenariusz/poziom.ts:44`) nie sprawdza poziomu wyniku, a licznik dobrych (`apps/mobile/src/features/scenariusz/poziom.ts:45`) wymaga bieżącego poziomu automatu.
  Ręczne 3 słabe warianty trudne obniżają automat ze średniego na łatwy. BRD (`docs/brd/wymagania-scenariusze.md:130`): „o poziom niżej po 3 kolejnych wariantach z mniej niż 50% takich decyzji”, bez poziomu, a kryterium akceptacji podaje warianty średnie; D-649 też bez poziomu. Brakuje rozstrzygnięcia roli 03 (D-649 do weta).
- **Mutant M3 przeżył** (`>= PROG_DOBRE` → `>`; dowody/bw-mutacje.txt): przy 1–2 decyzjach na wariant udział 0,8 jest nieosiągalny, więc mutant jest dziś równoważny. Gdy pojawi się szablon z ≥ 5 decyzjami, potrzebny test granicy 80%.
- **Zaokrąglenie w rozwijanym wierszu Liczby** (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:129`: potrzeba bez miejsc po przecinku, szansa z jednym): na sc-01/02/19 0 sprzeczności na 42 000 decyzji (dowody/bw-sonda-procent.txt), ale poziom trudny ma margines od 0 pp, więc przyszły szablon może pokazać potrzebę 20% i szansę 19,6% przy ocenie sprawdzenia. Proponowana kontrola: test zestawu treści jak sonda (wszystkie szablony, ziarna 1…3000).

## Co działa dobrze i należy zachować
- KO-043 rozstrzyga domena z historii (`czyPowtorkaWariantu`), a `startAktywnosci` sprawdza limit niezależnie od `wejscieDoAktywnosci`: ekran zakupu nie jest jedyną zaporą.
- `parsujPlan` waliduje wariant zamkniętą listą poziomów i liczbą całkowitą; zły plan w `wynikiScenariuszy` pomija tylko ten wiersz.
- `getScenarioTemplates` odróżnia brak tabeli (pusta lista) od złego wiersza (wyjątek → ekran błędu z „Ponów”), test łapie zamianę `id`.
- Odpowiedź zapisana przed pokazaniem oceny, blokada podwójnej odpowiedzi (`zapisWToku`), ponowienie po błędzie zapisu.
- Testy na prawdziwym SQLite (`portTestowy`), wznowienie na nowym porcie tego samego pliku; 8 z 9 mutacji zabitych.

## Decyzje dla właściciela
Brak decyzji blokujących. Do rozstrzygnięcia przez role (nie przez właściciela): 002 (czy scenariusze należą do statystyk — rola 03), 006 (powtórki ze scenariuszy — rola 03 i 04), „Do sprawdzenia” seria słabych (rola 03, D-649).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-004,08-programista-005,08-programista-007`

## git status
`git status --porcelain` przed commitem raportu: puste poza plikami raportu i dowodów w `docs/programista/recenzje/` (kod autora nietknięty; mutacje i sondy w worktree w scratchpadzie, przywrócone).
