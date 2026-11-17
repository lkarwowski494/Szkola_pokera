# Audyt: Lokalizacja — Szkoła Pokera (PokerGym) — 2026-11-17
Commit: f75acdff16915aeb43ff788888216e28616c11ed (kod aplikacji; gałąź `claude/sesja-ir-audyt-m1`, HEAD w trakcie pracy zmieniał się tylko w `audit/M1-2026-11-17/` i `docs/decyzje/IR.md` — `git diff --name-only f75acdff HEAD` poza tymi ścieżkami: pusto) · Tryb: audit (moduły i18n-expo, tlumaczenie) · Środowisko: Linux 6.18, Node v22.23.4, git; sieć działa (iTunes lookup odczytany); bez Xcode i symulatora; build Expo web i pełne testy nie uruchamiane (polecenie M1: wyniki w `wspolne/`), bez subagentów (plan kosztu).

## Podsumowanie
Mechanizm i18n jest dojrzały: 12 języków w wydaniu (pl, en, ja, zh-Hant, pt-BR, fr, de, es, ko, it, vi, pt) ze zgodną konfiguracją `SLOWNIKI` / `supportedLocales` / `locales` / polyfill (pilnuje test), łańcuch zastępczy wariant → język → en → pl, zmiana języka bez restartu, dane jako kody, skrypt słowników w CI z wynikiem 0 błędów i pełnymi bazami treści w 11 przekładach. Najważniejsze ryzyka to dwa P1 bez blokady wydania: polski przecinek dziesiętny wpisany na sztywno w informacji zwrotnej zadań liczbowych i w średnim czasie sesji (en/ja/ko/zh-Hant widzą „33,33%” obok „33.33%”), oraz przypomnienie dzienne, które po zmianie języka w aplikacji zostaje w starym języku do następnego zimnego startu. Reszta to szlif (P2): formaty dat i godzin, separatory list w CJK, `accessibilityLanguage`, rejestr języków nieaktualny dla 5 wydanych języków, zrzuty w najdłuższym języku i pseudolokalizacji tylko częściowe, 114 kluczy bez kontekstu. Polityka „szeroka” (35) jest wykonana w 12/35; 23 języki pozostają planem fal 2–3 (zapis w rejestrze), co nie jest defektem, ale cel właściciela „pełna nauka w 35 językach” jeszcze nie jest spełniony.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 09-lokalizacja-001 | P1 | D | Polski przecinek dziesiętny na sztywno w wyniku zadania liczbowego i w średnim czasie sesji | otwarte |
| 09-lokalizacja-002 | P1 | D | Przypomnienie dzienne zostaje w poprzednim języku po zmianie języka w aplikacji | otwarte |
| 09-lokalizacja-003 | P2 | D | Godzina odnowienia limitu zawsze 24 h, a dzień w historii postępu jako surowe RRRR-MM-DD | otwarte |
| 09-lokalizacja-004 | P2 | D | Listy sklejane łacińskim „, ” także w ja i zh-Hant | otwarte |
| 09-lokalizacja-005 | P2 | D | Angielskie nazwy terminów bez `accessibilityLanguage` (VoiceOver czyta je głosem języka interfejsu) | otwarte |
| 09-lokalizacja-006 | P2 | P | Rejestr języków nie ma wierszy dla wydanych de, es, ko, it, vi | otwarte |
| 09-lokalizacja-007 | P2 | P | Kontrola (d) polityki „szerokiej”: zrzuty w najdłuższym języku i pseudolokalizacji tylko dla ekranu scenariusza | otwarte |
| 09-lokalizacja-008 | P2 | D | 114 z 877 kluczy źródła bez opisu kontekstu dla tłumacza | otwarte |

## Linia bazowa i założenia
**E0b od zera (przed lekturą `jezyki.md`):** rynki z karty: US (en), JP (ja), CA (en, fr), GB (en), BR (pt-BR), FR (fr), TW (zh-Hant), VN (vi), DE (de); bez storefrontu PL, ale język pl w aplikacji. Polityka „szeroka” (D-131): 35 lokalizacji z kontrolami (a)–(e). Konkurencja odczytana dziś w sklepie US i JP (`dowody/e0b-konkurencja-jezyki.txt`, iTunes lookup 2026-11-17): Poker Skill 8 języków (EN, FR, DE, IT, JA, KO, PT, ES; 527 ocen US), NTPoker i POKER Q'z po 17 języków (m.in. JA, KO, ZH, HI, TH, ID, TR, VI, PL; liderzy JP: 2602 i 1595 ocen). Wniosek: wszystkie języki rynków z karty są w wydaniu; języki konkurencji spoza 35 (hi, th, zh-Hans) nie mają rynku w karcie — „sprawdzone, brak” pominięcia. Co musi działać we wszystkich: liczby i procenty wg języka (treść uczy rachunku: pot odds, equity), godziny 12/24 h (US 12 h), daty, liczba mnoga CLDR na Hermes, teksty systemowe (nazwa pod ikoną, prośba o powiadomienia), VoiceOver, treść krytyczna (pomoc przy hazardzie) po kontroli (a). Jednostki fizyczne: brak w treści (D-134) — przełącznik jednostek nie dotyczy.

**Wymiary pokrycia:**
- Rynki i języki: jak wyżej; 12/35 w wydaniu, reszta planem (`docs/lokalizacja/jezyki.md:45`); koszt przekładu w rejestrze (orientacyjny).
- Miejsca tekstu: ekrany i alerty (skan kodu: 0 tekstów na sztywno), ekran błędu `RenderErrorScreen` (przez `t`), powiadomienie (009-002), nazwa pod ikoną „PokerGym” w 12 `locales/systemowe`, uprawnienia: tylko powiadomienia (tekst systemowy, bez klucza `NS…UsageDescription`), eksport: JSON danych (bez tekstu), audio: brak (sprawdzone, brak), widżety: brak (sprawdzone, brak).
- Gramatyka: liczba mnoga przez i18next + polyfill-force (12 języków); `=== 1 ?` tylko przy etykiecie nagłówka „Źródło/Źródła” i wyborze klucza listy (`dowody/e1-grep-liczba-mnoga.txt`) — nie licznik rzeczownika; sklejanie list: 004.
- Formaty: liczby w treści przez `formatujLiczbe` (D-220), wyjątki 001; daty i godziny 003; strefa czasowa telefonu (ADR 0007); pierwszy dzień tygodnia: brak kalendarza w UI (sprawdzone, brak).
- Układ: RTL wyłączone świadomie (`supportsRTL: false`, żaden z 35 nie jest RTL); zrzuty 007.
- Dostępność: etykiety przez `t` (skan: 0 na sztywno); język wymowy 005.
- Mechanizm: wykrywanie języka, ustawienie per aplikacja, łańcuch zastępczy, zmiana bez restartu, dane jako kody — w porządku (sekcja „Co działa dobrze”).
- Proces: glosariusz (`docs/lokalizacja/glosariusz.md`), kontekst 008, oznaczenie maszynowe w rejestrze 006, przeglądy AI zapisane w `docs/lokalizacja/dowody/`, przegląd człowieka: brak (zastępczy, D-027/D-135).
- Treści i audio: 11 przekładów treści z kompletem plików (98 plików na język, 44 lekcje), pomoc przy hazardzie bez numerów krajowych (D-158), skróty pokerowe zostają po angielsku.

**Soczewki (po kolei, bez subagentów):** (1) użytkownik drugiego rynku bez polskiego: widzi polski zapis liczb w wyniku zadania (001); (2) telefon po angielsku w Polsce / region ≠ język: łańcuch `jezykZTagu` poprawny, godzina limitu 24 h niezależnie od preferencji (003); (3) tłumacz bez ekranu: 114 kluczy bez kontekstu (008); (4) VoiceOver w drugim języku: angielskie terminy czytane obcym głosem (005).

**Wzorzec najlepszych:** Poker Skill (8 języków) i NTPoker/POKER Q'z (17) — lokalizacja interfejsu i treści; PokerGym ma 12 z pełną treścią, więcej niż lider kursowy US. Dokumentacja Expo i Hermes ze wzorców roli (odczyt 18.10.2026) — konfiguracja zgodna. Proponowane zmiany w rejestrze założeń: brak (nie dotykałem `docs/zalozenia.md` hipotez języków; H-03 w BRD bez nowych danych o pobraniach).

Uwaga o narzędziu: skrypt roli `sprawdz-i18n.mjs` (kopia w scratchpadzie) daje 2281 „błędów parametrów” (`dowody/e1-sprawdz-i18n-rola-kod.txt`, exit=1), bo traktuje formę w znaczniku terminu `{{t:klucz|forma}}` jako nazwę parametru. Projekt ma adaptację (`scripts/sprawdz-i18n.mjs:19`, „PROJEKT: znacznik terminu {{t:klucz|forma}} niesie tekst do przekładu”) i jej wynik jest rozstrzygający: 0 błędów (`dowody/e1-sprawdz-i18n-projekt-kod.txt`, exit=0). Poza tą klasą skrypt roli nie zgłosił innych błędów.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| Słowniki 12 języków (877 kluczy źródła), skan `apps/mobile/src` | tak | `dowody/e1-sprawdz-i18n-projekt-kod.txt`, `dowody/e1-sprawdz-i18n-rola-kod.txt` |
| Mieszanie języków (polskie litery / tekst = pl w innych słownikach) | tak | `dowody/e1-mieszanie-jezykow.txt` (0) |
| Konfiguracja: `app.json`, `locales/systemowe/*`, `slowniki.ts`, `polyfille.ts`, `i18n/index.ts`, `packages/jezyki/src/{jezyki,i18n}.ts` | tak | odczyt plików (cytaty w znaleziskach) |
| Formaty liczb, dat, godzin (grep + sonda) | tak | `dowody/e1-sonda-formaty.txt` |
| Liczba mnoga i sklejanie (grep) | tak | `dowody/e1-grep-liczba-mnoga.txt`, `dowody/e1-grep-join-lista.txt` |
| Powiadomienia, ekran języka, start aplikacji | tak | odczyt `_layout.tsx`, `language.tsx`, `settings.tsx`, `powiadomienia.ts` |
| Słowniczek, VoiceOver (`accessibilityLanguage`) | tak (kod) | grep: 0 trafień `accessibilityLanguage` |
| Treść: struktura 11 przekładów, pomoc przy hazardzie | tak (struktura) | `ls content/<j>`; `content:check`, `tresci:rejestr` zielone w `wspolne/ci-pelne.log` |
| Konkurencja (US, JP) | tak | `dowody/e0b-konkurencja-jezyki.txt` |
| Zrzuty w pseudolokalizacji i najdłuższym języku | nie (zakaz buildu w poleceniu M1); obejrzany istniejący zrzut de AX5 320 pt | `docs/design/dowody/ih-de-decyzja-320-ax5.png` |
| Działanie na Hermes/iOS (polyfill, `Intl`) | nie (brak Xcode/urządzenia) | krok właściciela |
| Jakość języka: próbka drugiego przeglądu AI w świeżym kontekście | nie (bez subagentów wg planu kosztu) | do „Do sprawdzenia” |
| Kroje: glify ja/ko/zh-Hant/vi | nie (zrzut alfabetu wymaga buildu); decyzje D-380, D-394 (fontTools 0 braków vi/it) | krok właściciela/04 |

## Kontrola dowodów i sekretów
`node /home/user/Szkola_pokera/audit/M1-2026-11-17/narzedzia/sprawdz-raport.mjs audit/M1-2026-11-17/role/09-lokalizacja/09-lokalizacja-2026-11-17.md /home/user/Szkola_pokera audit/M1-2026-11-17/role/09-lokalizacja --rola 09-lokalizacja` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 09-lokalizacja”, kod 0 (`dowody/sprawdz-raport.txt`).

`git status --porcelain` na początku: ` M audit/M1-2026-11-17/role/05-architekt/05-architekt-2026-11-17.md` (cudza rola); na końcu: patrz `dowody/git-status-koniec.txt` — moje zmiany tylko w `audit/M1-2026-11-17/role/09-lokalizacja/`; pliki aplikacji nietknięte. Treść z zewnątrz: w plikach projektu nie zauważyłem poleceń skierowanych do agenta (stan-de.md opisuje odrzucony komunikat hooka z 2026-11-11 — zapis historyczny, nie polecenie dla mnie).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| LOK-01 | dotyczy (polityka „szeroka”, D-131) | ok dla rynków z karty (12/35 w wydaniu, reszta planem fal); rejestr: 09-lokalizacja-006 |
| LOK-02 | dotyczy | ok: `supportedLocales` = `SLOWNIKI` = `locales` (12), `CFBundleAllowMixedLocalizations: true`, `supportsRTL: false`, pseudo poza wydaniem; uprawnienia: tylko powiadomienia (tekst systemowy) |
| LOK-03 | dotyczy | ok w skanie (0 tekstów na sztywno); 09-lokalizacja-004 (sklejanie list) |
| LOK-04 | dotyczy | ok: 0 brakujących kluczy w 12 językach; klucze dynamiczne z zamkniętych map (`grade.*`, `scenario.street.*`, typy TS) |
| LOK-05 | dotyczy | ok w kodzie: polyfill-force przed i18n, dane 12 języków, samosprawdzenie `sprawdzIntl`; na Hermes nie sprawdzono (brak urządzenia) |
| LOK-06 | dotyczy | ok: skrypt projektu 0 błędów parametrów/znaczników; `content:check` zielony |
| LOK-07 | dotyczy (jednostki: D-134, brak wielkości fizycznych) | 09-lokalizacja-001, 09-lokalizacja-003 |
| LOK-08 | dotyczy | nie sprawdzono w tej sesji (build zakazany poleceniem M1); 09-lokalizacja-007 |
| LOK-09 | dotyczy | ok: `jezykDlaUstawienia`, `lancuchTresci`, `ustawJezyk` bez restartu, 0 `t(` w zapisie do bazy |
| LOK-10 | dotyczy (próg D-135: kontrola (a) + drugi przegląd AI) | ok wg rejestru i `tresci:rejestr` (0 błędów, `wspolne/ci-pelne.log`); przegląd człowieka: zastępczy (D-027) |
| LOK-11 | dotyczy | 09-lokalizacja-006; mieszanie języków: 0 (`dowody/e1-mieszanie-jezykow.txt`); próbka jakości: nie sprawdzono (bez subagentów) |
| LOK-12 | dotyczy | etykiety przez `t`: ok; 09-lokalizacja-005 |
| LOK-13 | dotyczy (powiadomienie dzienne; widżetów brak; eksport bez tekstu) | 09-lokalizacja-002 |
| LOK-14 | dotyczy (RTL: nie dotyczy, brak języków RTL) | nie sprawdzono zrzutem (build); decyzje D-380 (CJK krój systemowy), D-394 (vi/it Literata, fontTools 0 braków) |
| LOK-15 | dotyczy | ok: `pnpm i18n:kod` w `.github/workflows/ci.yml:42` i w `ci`; 09-lokalizacja-008 (kontekst) |

## Znaleziska (szczegóły)

### 09-lokalizacja-001 · Polski przecinek dziesiętny na sztywno w wyniku zadania liczbowego i w średnim czasie sesji
- Pozycja listy kontrolnej: LOK-07
- Poziom: P1 (bez blokady wg CLAUDE.md pkt 1 — wartość liczby poprawna, błędny tylko zapis)
- Realność: realny   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/app/session.tsx:601` „const s = String(Math.round(v * 100) / 100).replace('.', ',');” (odpowiedź użytkownika w `NumericFeedback`, linia 631) i `apps/mobile/src/app/session.tsx:333` „avg.toFixed(1).replace('.', ',')” (wynik sesji). Sonda `dowody/e1-sonda-formaty.txt`: w en/ja/ko/zh-Hant „33,33%” i „4,3”, a `Intl` daje „33.33” i „4.3”; obok w tym samym widoku wartość dokładna `item.display` jest już w formacie języka (`formatujLiczbe`), więc ekran pokazuje dwa zapisy.
- Mechanizm: formatowanie liczby poza `@szkola/jezyki` (D-220); `grep -rn "replace('\.', ',')" apps/mobile/src packages/*/src` → 3 trafienia: `apps/mobile/src/app/session.tsx:333`, `apps/mobile/src/app/session.tsx:601`, `apps/mobile/src/features/diagnostyka/DiagnosticsScreen.tsx:10` (tylko `__DEV__`); plus `toLocaleString('pl-PL')` w `apps/mobile/src/features/diagnostyka/DiagnosticsScreen.tsx:38` i `:52` (tylko `__DEV__`).
- Powraca: nie (D-220 usunął polski format z domeny i treści, te miejsca zostały) → trwała kontrola: test lub reguła grep w CI zakazująca `replace('.', ',')` i `toLocaleString('pl-PL')` w `apps/mobile/src` poza testami.
- Wzorzec lub źródło: zasada roli 6 (formaty z `Intl`); D-220; reguła LOK-07 „P1, gdy … liczba myli w głównym przepływie”.
- Kroki w aplikacji: język en → lekcja z zadaniem liczbowym (np. pot odds) → wpisz „33.3” → „Your answer: 33,3%” nad „Exact: 33.3%”; koniec sesji ćwiczeń → „Average decision time: 4,3 s”.
- Opcje: (a) `formatujLiczbe(v, jezyk, …)` + jednostka przez istniejące klucze `format.*` — mała zmiana, spójna z treścią; (b) wspólny `fmtNum` w `features/drills/text.ts` (już ma `num`, `pct`) — jedno miejsce, wymaga przeniesienia; Rekomendacja: (b) z `pct`/`num` z `text.ts`.
- Test akceptacyjny: test ekranu sesji w en i de: odpowiedź 33,3 → en „33.3%”, de „33,3 %”; średni czas 4,25 s → en „4.3”, de „4,3”; grep-strażnik w CI zielony.
- Status: otwarte

### 09-lokalizacja-002 · Przypomnienie dzienne zostaje w poprzednim języku po zmianie języka w aplikacji
- Pozycja listy kontrolnej: LOK-13
- Poziom: P1 (bez blokady wg CLAUDE.md pkt 1)
- Realność: brzegowy (dotyczy osób, które zmieniają język w ustawieniach aplikacji i mają włączone przypomnienie; trwa do następnego zimnego startu)   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: tekst powstaje przy planowaniu: `apps/mobile/src/platform/powiadomienia.ts:20` „content: { title: tytul, body: tresc },”; planowanie tylko przy starcie (`apps/mobile/src/app/_layout.tsx:146` „odtworzZBazy(portPostepu, powiadomieniaExpo, { tytul: i18n.t('reminder.title')”), przy przełączniku przypomnienia i imporcie danych (`apps/mobile/src/app/settings.tsx:47`, funkcja tekstPrzypomnienia).
  Ekran języka po zapisie woła tylko `apps/mobile/src/app/language.tsx:44` „await ustawJezyk(j);” bez ponownego planowania. Brak testu w `src/i18n/__tests__` i `src/features/ustawienia/__tests__` łączącego zmianę języka z przypomnieniem (grep reminder.title w testach języka: 0).
- Mechanizm: treść powiadomienia zamrożona w chwili planowania; jedyne wywołania `odtworzZBazy`/`przelaczPrzypomnienie`: `apps/mobile/src/app/_layout.tsx:146`, `apps/mobile/src/app/settings.tsx:81`, `apps/mobile/src/app/settings.tsx:88`, `apps/mobile/src/app/data.tsx:42` — żadne nie reaguje na `languageChanged`.
- Powraca: nie → test akceptacyjny poniżej.
- Wzorzec lub źródło: lista LOK-13 („tekst powstaje przy planowaniu czy przy wyświetleniu”); powiadomienia lokalne iOS nie tłumaczą treści przy wyświetleniu.
- Kroki w aplikacji: włącz przypomnienie (pl) → Ustawienia → Język → English → nie zamykaj aplikacji → o porze przypomnienia przychodzi tekst po polsku.
- Opcje: (a) po `ustawJezyk` w `language.tsx` wywołać `odtworzZBazy(port, powiadomieniaExpo, tekst w nowym języku)` — mała zmiana, jedno miejsce; (b) nasłuch `i18n.on('languageChanged')` w `_layout.tsx` — łapie każdą zmianę, także przyszłe ścieżki; Rekomendacja: (b).
- Test akceptacyjny: test z atrapą `PortPowiadomien`: przypomnienie włączone, zmiana języka pl → en → ostatnie `zaplanuj` ma tytuł i treść z `en.json` (`reminder.title`, `reminder.body`).
- Status: otwarte

### 09-lokalizacja-003 · Godzina odnowienia limitu zawsze 24 h, a dzień w historii postępu jako surowe RRRR-MM-DD
- Pozycja listy kontrolnej: LOK-07
- Poziom: P2
- Realność: realny   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/features/start/EkranStartu.tsx:27` „hour: '2-digit', minute: '2-digit', hourCycle: 'h23'” — en (rynek US) widzi „The limit renews at midnight (00:00).”, gdzie `Intl` bez `h23` daje „12:00 AM” (`dowody/e1-sonda-formaty.txt`); ekran Ustawień formatuje porę przypomnienia bez wymuszenia (`apps/mobile/src/app/settings.tsx:96`), więc dwa ekrany mają różne zegary. `apps/mobile/src/app/advancement.tsx:84` i `:90`: etykieta VoiceOver i podpis Last z `p.day` = klucz dnia „RRRR-MM-DD” z `packages/domena/src/limit.ts:41` (format techniczny `en-CA`).
- Mechanizm: daty i godziny poza `formatujDate` z `packages/jezyki/src/formaty.ts:24`; `grep -rn "hourCycle\|\.day}" apps/mobile/src` → `apps/mobile/src/features/start/EkranStartu.tsx:27`, `apps/mobile/src/app/advancement.tsx:84`, `apps/mobile/src/app/advancement.tsx:90`.
- Powraca: nie
- Wzorzec lub źródło: wzorce roli (`getCalendars()`: `uses24hourClock`); zasada roli 6.
- Kroki w aplikacji: en, wyczerpany limit → ekran startu ćwiczenia; Postęp → Awans → historia.
- Opcje: (a) godzina bez `hourCycle` (konwencja języka) — proste; (b) `uses24hourClock` z `getCalendars()` — zgodne z ustawieniem telefonu, wymaga adaptera; dzień: `formatujDate` z `month: 'short', day: 'numeric'`; Rekomendacja: (b) dla godziny, `formatujDate` dla dnia.
- Test akceptacyjny: test `godzinaWStrefie` en → „12:00 AM” (lub wg `uses24hourClock`), pl → „00:00”; historia w en pokazuje „Nov 17: 54”, nie „2026-11-17: 54”.
- Status: otwarte

### 09-lokalizacja-004 · Listy sklejane łacińskim „, ” także w ja i zh-Hant
- Pozycja listy kontrolnej: LOK-03
- Poziom: P2
- Realność: realny   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/features/ocena-poziomu/EkranyOceny.tsx:76` „t('placement.passed', { moduly: zaliczoneOcena.join(', ') })”; `apps/mobile/src/features/scenariusz/komponenty.tsx:187` (miejsca nagród ICM, join z przecinkiem).
  `apps/mobile/src/app/glossary.tsx:63` „entry.enAlt.join(', ')”. W ja/zh-Hant separator wyliczenia to 、 albo ，; klucz table.listAnd jest już w słowniku (ja: {{a}}と{{b}}), ale część a sklejana jest przecinkiem ASCII.
- Mechanizm: `dowody/e1-grep-join-lista.txt` → 16 trafień w tekstach widocznych lub czytanych przez VoiceOver (m.in. `apps/mobile/src/features/scenariusz/WyborScenariusza.tsx:45`, `apps/mobile/src/features/stol/uklad.ts:47`, `apps/mobile/src/features/stol/uklad.ts:79`, `apps/mobile/src/features/stol/pasek.ts:48`, `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:361`, `apps/mobile/src/app/help.tsx:78`, `apps/mobile/src/components/ruleSources.ts:17`); Hermes nie ma `Intl.ListFormat` (wzorce), więc potrzebny klucz separatora w słowniku.
- Powraca: tak — uwaga sesji DS (`docs/lokalizacja/stan-ds.md`: lista nagród ICM łączona przez join z przecinkiem), nienaprawiona → trwała kontrola: helper `lista(xs, t)` + grep-strażnik na `join(', ')` w JSX/`t(`.
- Wzorzec lub źródło: zasada roli 5 (bez sklejania kawałków).
- Kroki w aplikacji: ja → ocena poziomu → wynik z kilkoma zaliczonymi modułami; scenariusz ICM.
- Opcje: (a) klucz `format.listSep` w 12 słownikach + helper — mała zmiana, 12 tłumaczeń; (b) zostawić (czytelne, ale nienaturalne) — 0 kosztu; Rekomendacja: (a).
- Test akceptacyjny: test helpera: ja „A、B”, zh-Hant „A、B” lub „A，B” wg glosariusza, en „A, B”; grep-strażnik zielony.
- Status: otwarte

### 09-lokalizacja-005 · Angielskie nazwy terminów bez `accessibilityLanguage`
- Pozycja listy kontrolnej: LOK-12
- Poziom: P2
- Realność: realny   · Pewność: średnia (wymowa zależy od głosu VoiceOver; nie odsłuchane)
- Rodzaj: D (defekt)
- Dowód: `grep -rn accessibilityLanguage apps/mobile/src` → 0 trafień. Słowniczek łączy nazwę angielską z definicją w języku interfejsu w jedną etykietę (`apps/mobile/src/app/glossary.tsx:68` „accessible accessibilityLabel={etykieta}”), więc w de/es/it/ko/vi główna nazwa (angielska) i w pl nawiasy „(pot)” są czytane głosem języka interfejsu.
- Mechanizm: brak oznaczenia języka fragmentu; dotyczy słowniczka i nawiasów terminów w pl (`packages/content-schema/src/terms.ts:129`, `JEZYK_NAWIASU_TERMINOW = 'pl'`).
- Powraca: nie
- Wzorzec lub źródło: wzorce roli: reactnative.dev/docs/accessibility, `accessibilityLanguage` (odczyt 18.10.2026).
- Kroki w aplikacji: VoiceOver, język de → Słowniczek → wpis „Pot”.
- Opcje: (a) w słowniczku osobne elementy dostępności: nazwa en z `accessibilityLanguage="en"`, definicja w języku interfejsu — zmienia układ dostępności (04); (b) zostawić, skróty pokerowe są międzynarodowe — 0 kosztu; Rekomendacja: (a) tylko dla słowniczka; nawiasy w treści pl zostawić.
- Test akceptacyjny: test słowniczka: element nazwy angielskiej ma `accessibilityLanguage="en"` w każdym języku poza en.
- Status: otwarte

### 09-lokalizacja-006 · Rejestr języków nie ma wierszy dla wydanych de, es, ko, it, vi
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2
- Realność: realny (dokumentacja procesu)   · Pewność: wysoka
- Rodzaj: P (oznaczenie tłumaczenia)
- Dowód: `docs/lokalizacja/jezyki.md:44` „| vi, de | planowany, fala 1 |”.
  Języki es, ko, it nie mają wiersza; tymczasem `apps/mobile/src/i18n/slowniki.ts:19` zawiera de, es, ko, it, vi, a wydanie zapisują D-393 i D-394 (`docs/decyzje.md:305`, `docs/decyzje.md:306`). Kolumny Tłumaczenie, Drugi przegląd AI, Przegląd człowieka, Treści krytyczne i Zrzuty — miejsce oznaczenia tłumaczenia maszynowego (D-133) — dla tych 5 języków są puste (wiersze nie istnieją).
- Mechanizm: rejestr nie jest częścią testu `konfiguracja.test.ts` (pilnuje 4 miejsc konfiguracji, nie rejestru).
- Powraca: nie → trwała kontrola: test, że każdy język z `WYDANE` ma wiersz w `jezyki.md`.
- Wzorzec lub źródło: zasada roli 2 (tłumaczenie maszynowe oznaczasz w rejestrze); D-133.
- Kroki w aplikacji: brak (dokument).
- Opcje: (a) dopisać 5 wierszy z danymi z D-393/D-394 i dowodów `docs/lokalizacja/dowody/` + test — ok. 30 min; (b) przenieść rejestr do JSON generowanego z decyzji — więcej pracy, mniej rozjazdów; Rekomendacja: (a).
- Test akceptacyjny: każdy kod z `WYDANE` ma wiersz w `jezyki.md` (test); wiersze de, es, ko, it, vi z modelem, datą, przeglądem AI i kontrolą (a).
- Status: otwarte

### 09-lokalizacja-007 · Kontrola (d) polityki „szerokiej”: zrzuty w najdłuższym języku i pseudolokalizacji tylko dla ekranu scenariusza
- Pozycja listy kontrolnej: LOK-08
- Poziom: P2
- Realność: realny   · Pewność: wysoka
- Rodzaj: P (proces)
- Dowód: `docs/lokalizacja/jezyki.md:38` kolumna „Zrzuty”: „do K6” / „do zrobienia” dla wydanych języków; zrzuty de są tylko dla scenariusza (`docs/design/dowody/ih-de-decyzja-320-ax5.png` i rodziny `if-de-*`, `ij-de-*`), reszta ekranów (Dziś, lekcja, sesja, zakup, ustawienia, słowniczek) tylko w pl (`hl-*`); słownik pseudo istnieje (`docs/lokalizacja/pseudo/pl-pseudo.json`), zrzutów z nim brak. Na obejrzanym zrzucie de AX5 320 pt etykieta „BB · Gegner · 100 bb” wychodzi poza obrys owalu miejsca (uwaga dla 04, nie ucięcie danych). Nazwa ekranu zakupu i cen w de/fr przy AX5: nie sprawdzono.
- Mechanizm: `scripts/zrzuty/hl-zrzuty.mjs:39` ma `HL_LOCALE`, ale procedura nie obejmuje pozostałych ekranów ani pseudo.
- Powraca: nie
- Wzorzec lub źródło: polityka „szeroka” kontrola (d); zasada roli 7.
- Kroki w aplikacji: de/fr, Dynamic Type AX5, 320 pt → ekran zakupu, ustawienia.
- Opcje: (a) rozszerzyć `zrzuty:web` o listę ekranów × {de, fr, pseudo} — koszt minut CI/lokalnie, bez opłat; (b) lista kontrolna dla właściciela na telefonie — tańsze, wolniejsze; Rekomendacja: (a).
- Test akceptacyjny: zrzuty 6 głównych ekranów w de i pseudo przy 320 pt i AX5 w `docs/design/dowody/` bez uciętych danych i nazw akcji.
- Status: otwarte

### 09-lokalizacja-008 · 114 z 877 kluczy źródła bez opisu kontekstu dla tłumacza
- Pozycja listy kontrolnej: LOK-15
- Poziom: P2
- Realność: realny   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `dowody/e1-sprawdz-i18n-projekt-kod.txt`: „UWAGA pl: 114 kluczy bez kontekstu (np. scenarios.levels, scenarios.locked, table.position.utg, table.position.hj, table.position.co)”.
- Mechanizm: skrypt zgłasza brak kontekstu jako uwagę, nie błąd, więc nowe klucze przechodzą CI bez opisu.
- Powraca: nie
- Wzorzec lub źródło: zasada roli 4 (klucz ma kontekst).
- Kroki w aplikacji: brak (proces przekładu kolejnych 23 języków).
- Opcje: (a) uzupełnić 114 opisów i zamienić uwagę w błąd dla nowych kluczy — jednorazowo ok. 1 h; (b) tylko zapadka na nowe klucze — tanio, zaległość zostaje; Rekomendacja: (a) przed falą 2.
- Test akceptacyjny: `pnpm i18n:kod` bez uwagi o kluczach bez kontekstu; nowy klucz bez kontekstu daje błąd.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Jakość przekładu (moduł `tlumaczenie`): próbki drugiego przeglądu AI w świeżym kontekście nie zrobiłem (plan kosztu bez subagentów). Brakuje: ok. 20 tekstów głównego przepływu + teksty z liczbami, ostrzeżeniami i uprawnieniami na język, ocenione subagentem bez notatek; człowiek znający język: krok właściciela (najpierw ja, pt-BR, fr, zh-Hant, vi, de wg ruchu).
- Hermes na iOS: czy `polyfill-force` daje kategorie CLDR (pl: few/many; vi/ja/ko: other) i czy `DateTimeFormat.formatToParts` (`packages/domena/src/limit.ts:41`) działa — sprawdzić na buildzie TestFlight (lista telefonu). Brakuje: urządzenia.
- Zrzut de AX5: etykiety miejsc przy stole wychodzą poza owal (`docs/design/dowody/ih-de-decyzja-320-ax5.png`) — do oceny roli 04 (SP-07).
- es dla telefonów es-US/es-MX: dostają es (Hiszpania), bo es-419 nie jest wydany (`packages/jezyki/src/jezyki.ts:57`); znane KO-125 — bez nowego dowodu, oceniam progiem: P2, nie blokuje.
- `apps/mobile/src/components/ruleSources.ts:17`: łączenie części „; ” i nawiasów — w ja/zh-Hant interpunkcja pełnej szerokości byłaby naturalniejsza; pewność skutku dla użytkownika niska.

## Co działa dobrze i należy zachować
- Jedno źródło listy języków i test zgodności czterech miejsc konfiguracji (`apps/mobile/src/i18n/slowniki.ts:19` + `konfiguracja.test.ts`), polyfill-force przed inicjalizacją (`apps/mobile/src/i18n/index.ts:1`) i samosprawdzenie `Intl.PluralRules` przy starcie (`apps/mobile/src/i18n/index.ts:44`).
- Łańcuch zastępczy i mapowanie tagów (pt-PT/pt-BR, zh-Hant po regionie, aliasy CLDR) w `packages/jezyki/src/jezyki.ts`, tryb ścisły w buildzie deweloperskim, `returnNull: false`.
- Zmiana języka bez restartu z przełączeniem bazy treści i kolejką przygotowań (`useTresc`), dane jako kody.
- Adaptacja skryptu słowników do znaczników terminów i bramka w CI (`.github/workflows/ci.yml:42`); 0 tekstów na sztywno w skanie; 0 mieszania języków.
- Format liczb w treści wg języka bazy (D-220), 11 kompletnych przekładów treści z kontrolą (a) i `sha_pl` w rejestrze treści.

## Decyzje dla właściciela
- 001 i 002 oznaczyłem P1 bez blokady wydania (wartości liczb są poprawne; przypomnienie to przypadek brzegowy). Opcje: (a) naprawić przed kolejnym buildem TestFlight — razem ok. 1–2 h agenta, bez kosztów; (b) backlog z wersją przed upublicznieniem w App Store. Rekomendacja: (a), bo 001 widzi każdy użytkownik en/ja/ko/zh-Hant w zadaniach liczbowych.
- Kolejność dalszych języków (23 z 35) i przegląd człowieka: bez zmian względem D-131/D-135; nie pytam o nowy wybór, przypominam tylko, że cel „pełna nauka w 35 językach” jest spełniony w 12.
- Krok właściciela: odsłuch VoiceOver w de na słowniczku (005) i lista telefonu dla 001/002/003 (en: zadanie liczbowe, zmiana języka przy włączonym przypomnieniu, ekran limitu).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 09-lokalizacja --tryb fix --zadania 09-lokalizacja-001,09-lokalizacja-002,09-lokalizacja-003,09-lokalizacja-004,09-lokalizacja-006,09-lokalizacja-008` (005 i 007 przez rolę 04: układ dostępności i zrzuty).
