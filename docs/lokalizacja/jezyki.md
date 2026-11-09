# Rejestr języków: Szkoła Pokera

Decyzja: D-131 (polityka „szeroka”, 35 lokalizacji; słowa właściciela 2026-11-03: „Pełna nauka w 35 językach jak trening”) · Źródło: pl · Utrzymanie: nowy tekst = klucz + kontekst + wszystkie języki albo wyjątek z datą

Stan: 2026-11-04, rola 09-lokalizacja, build, E0 (wejście wczesne po roli 05). Prompt roli: biblioteka `prompts` c025063, złożony `assemble.mjs` (kod 0, 57 099 znaków). Wynik E0 czeka na akceptację właściciela (bramka STOP).

Ponowne wejście 2026-11-09 (E0 po roli 08 i audycie 04): decyzje D-131–D-135 stoją (D-286); plan drugiego języka i pytanie o jego wybór: `docs/lokalizacja/plan-09.md`.

## Środowisko (E0, ETAP 0)

| Sprawdzone | Wynik |
|---|---|
| System, Node, git | Linux 6.18 (chmura), Node v22.23.4, `git status` czysty na `origin/claude/sleepy-brahmagupta-2065nu` (8a6fd03) |
| GitHub | push na gałąź roboczą przez git; MCP GitHub działa; push na `main` tylko za zgodą |
| Przeglądarka do zrzutów | Chromium i Playwright w środowisku (opis środowiska sesji); nie uruchamiano w E0 |
| Xcode, symulator iOS | brak (Linux); testy na telefonie i Maestro iOS to kroki właściciela |
| Sieć | `github.com` działa; `itunes.apple.com` i `apps.apple.com` blokowane (sztafeta, E0 roli 02, 2026-11-03), więc dowodów `languageCodesISO2A` z wyszukiwarki iTunes nie ma |
| Repo | publiczne (CLAUDE.md); bez sekretów w plikach tej roli |
| CI na `main` | workflow CI: ostatni przebieg 42 zielony (9.10.2026, 23950a4); E2E Maestro: czerwony w przebiegach 13–18 (15–20.10), znalezisko roli 07 (bez zmian, nie ruszane tu) |
| Analogia | `lkarwowski494/trening` (publiczne), SHA 2e4b0f8, odczyt 2026-11-04 |

## Zestaw języków (wzorzec „szeroka”)

Lista = `locales/*.json` Treningu (odczyt 2026-11-04, 35 plików): bg, cs, da, de, el, en, es-419, es, et, fi, fr, hr, hu, id, it, ja, ko, lt, lv, ms, nb, nl, pl, pt-BR, pt, ro, ru, sk, sl, sr, sv, tr, uk, vi, zh-Hant. Zgodna z listą z wzorców roli (D-026, odczyt 19.10.2026): te same 35 kodów.

Sprawdzone komendą w Node 22 (ICU pełne), kod wyjścia 0:
- `Intl.PluralRules` jest dla wszystkich 35; wektory ze wzorców (pl, ru, cs, lv, sl, ro, fr, en): 0 rozbieżności.
- Kategorie CLDR w grupach: `one/other` (bg da de el en et fi hu nb nl sv tr), `few/many/one/other` (cs lt pl ru sk uk), `many/one/other` (es es-419 fr it pt pt-BR), `few/one/other` (hr ro sr), `other` (id ja ko ms vi zh-Hant), `one/zero/other` (lv), `few/one/two/other` (sl). To jest tabela wymaganych form dla skryptu `sprawdz-i18n.mjs` (w Hermes: polyfill, nie ICU Node).
- Pismo: Cyrl (bg ru sr uk), Grek (el), Jpan (ja), Kore (ko), Hant (zh-Hant), reszta Latn. Roli 04: kroje dla nowych pism (design-spec: Literata ma podzbiory latin, latin-ext, vietnamese, bez cyrylicy i greki; tytuły od AX1 i tak krojem systemowym, D-122) → zgłoszenie 04, patrz „Zgłoszenia”.

Zakres: nakładki regionalne es-419 (nad es) i pt-BR (nad pt) jak w Treningu (słownik wariantu zawiera tylko różnice). Chiński uproszczony (zh-Hans, storefront CN) poza zestawem: telefon z `zh-Hans` dostaje angielski (jak w Treningu); powrót do tematu, gdy dowód popytu (OP-15 daje wszystkie storefronty, ale właściciel wskazał „35 jak Trening”).

Kolejność przeglądów i fal (z rynków roli 02, CLAUDE.md „Stan projektu”: US, JP, CA, GB, BR, FR, TW, VN, DE): fala 1 en, ja, pt-BR, fr, zh-Hant, vi, de (7 języków); fala 2 reszta zachodnia i wschodnia (es, es-419, it, nl, ru, tr, ko, pl źródło); fala 3 pozostałe. Tylko kolejność; wszystkie 35 w wydaniu zgodnie z D-131.

| Język | Stan | Powód (dowód) | Tłumaczenie | Drugi przegląd AI | Przegląd człowieka | Treści krytyczne | Zrzuty |
|---|---|---|---|---|---|---|---|
| pl | źródło | język autora; `apps/mobile/src/i18n/pl.ts`, `content/pl/` | — | — | niewykonany (źródło) | — | do E2 |
| en, ja, pt-BR, fr, zh-Hant, vi, de | planowany, fala 1 | rynki główne i kolejne (CLAUDE.md, `docs/monetyzacja.md`) | niewykonane | niewykonany | niewykonany | kontrola (a), przegląd zastępczy D-135 | do E2/E3 |
| pozostałe 27 | planowany, fala 2–3 | polityka „szeroka” (D-131); kontrole (a)–(e) | niewykonane | niewykonany | niewykonany | kontrola (a), D-135 | do E3 |

(Wiersze rozbijane na pojedyncze języki w E3, gdy powstanie pierwsza fala; teraz żaden język poza pl nie ma słownika, więc wpisy „niewykonane” są stanem faktycznym.)

## Inwentarz tekstów (miary na commicie 8a6fd03)

| Miejsce | Stan dzisiaj | Miara |
|---|---|---|
| Interfejs | `apps/mobile/src/i18n/pl.ts` (obiekt TS, i18next 26.4.2 + react-i18next 17.0.15, tylko `pl`) | 325 wartości tekstowych (309 kluczy po zwinięciu form mnogich), 8 kluczy mnogich; stan po E1: `locales/pl.json` (333 wartości po dodaniu 8 form `_other`), `pl.ts` usunięty |
| Teksty na sztywno w starym kodzie | grep przybliżony | po E1 skrypt `--kod`: 19 błędów (teksty na sztywno m.in. `RenderErrorScreen`, `PaintGrid`, `RangeGrid`, `TableFelt`, `_layout`, `play/table`, `play/review`) i 26 uwag (klucze dynamiczne), dowód `docs/lokalizacja/dowody/sprawdz-i18n-kod-2026-11-04.txt` (ekrany są przebudowywane w roli 08, więc to nie jest zakres naprawy teraz) |
| Treść: lekcje | `content/pl/lessons/*.md` | 44 pliki, 482 519 B |
| Treść: egzaminy | `content/pl/exams/*.yaml` | 14 plików, 133 779 B |
| Treść: moduły, reguły, obszary | `content/pl/{modules,rules,areas}.yaml` | 132 562 B |
| Treść: terminy | `content/terms.yaml` (pl + en) | 85 023 B |
| Liczby | `content/numbers.yaml` (152 KB), 3 392 użyć `{{n:klucz}}` w `content/pl` | formatowane w `tools/content-build/src/numbers.ts:108` na sztywno po polsku (patrz „Znaleziska”) |
| Zakresy, solver | `content/ranges/*.json` (13 MB) | liczby i identyfikatory, bez tekstu do tłumaczenia |
| Numery pomocy | `content/helplines.yaml` | „Zakres: tylko Polska”, 2 944 B; patrz „Znaleziska” |
| Konfiguracja aplikacji | `apps/mobile/app.json` | `name` „Szkoła Pokera”, bez `locales`, bez `supportedLocales`, `expo-localization` bez opcji; brak tekstów uprawnień (żadne `NS…UsageDescription` w `infoPlist`) |
| Audio, widżety, powiadomienia | powiadomienie dzienne (ADR 0012) | teksty powiadomienia do przeniesienia do słownika w E2 |

Tekst do przekładu na język (poza interfejsem): ok. 834 KB źródła (lekcje + egzaminy + reguły + terminy), czyli [OCENA] ok. 250–300 tys. tokenów polskiego tekstu na język. Treść zostanie przebudowana przez rolę 06 po tej roli, więc miara jest dolną orientacją, nie budżetem.

## Wymiary pokrycia

| Wymiar | Wynik E0 |
|---|---|
| Rynki i języki | rynek główny US, kolejne JP, CA, GB, BR, FR, TW, VN, DE; bez PL storefrontu (art. 29), język pl zostaje. Lista lokalizacji App Store Connect i języków sklepu: **nieodczytana** (`developer.apple.com` dostępne, nie otwierano w E0; opis sklepu należy do roli 10) `[DO USTALENIA]` w E4. Aplikacje niszy po `languageCodesISO2A`: niedostępne (itunes zablokowane); są dane roli 02 (`docs/monetyzacja.md`: 25 z 29 konkurentów tylko EN, w JP prowadzą 2 z japońskim) |
| Miejsca tekstu | ekrany, alerty, błędy (9 stanów błędów bez projektu, rola 04/06), powiadomienie, nazwa pod ikoną i uprawnienia (patrz „Konfiguracja”), eksport (nazwa pliku i komunikaty), ekran awaryjny (rola 12), treści, numery pomocy; audio: aplikacja bez audio (sprawdzone, brak) |
| Gramatyka | 6 grup liczby mnogiej poza angielską (tabela wyżej); w polskim źródle było 8 kluczy mnogich po 3 formy (`_one/_few/_many`), a CLDR dla pl wymaga też `other` (ułamki); w E1 dodane (dopełniacz), skrypt zgłaszał 8 błędów przed poprawką; liczniki są całkowite, więc to formalność (ADR 0014 pkt 5); rodzaj i przypadek przy parametrach (np. nazwy pozycji, stopni oceny) osobnymi kluczami albo `select`; sklejanie: skrypt `--kod` |
| Formaty | **znak dziesiętny, grupowanie i procent w treści są na sztywno polskie** w `formatNumber` (przecinek, twarda spacja przy ≥5 cyfrach, „%” bez spacji); wymaga formatu wg języka na etapie budowy (patrz „Znaleziska”). Daty: statystyki i powtórki pokażą daty (do E1: `Intl.DateTimeFormat`). Jednostki fizyczne i waluty w `content/pl`: sprawdzone grep-em, brak (jednostki to `bb`, `%`, `s`, `x`) |
| Układ | Tytuły: sufit jako ułamek szerokości (D-122), `przepelnienie.mjs`; najdłuższy język do ustalenia pomiarem w E2 (hipotezy: de, fi, el, vi; do sprawdzenia); duży tekst AX5 na 320 pt; RTL: żaden z 35 języków nie jest RTL (sprawdzone: brak ar, he, fa, ur) |
| Dostępność | `accessibilityLanguage` (iOS) per język dla etykiet VoiceOver; BRD NFR-DOST-002/D-121: etykiety w każdym języku; ścieżka: klucz kontekstu z opisem etykiety |
| Mechanizm | dziś: `lng: 'pl'` na sztywno, `fallbackLng: 'pl'`, polyfill `Intl.PluralRules` tylko `locale-data/pl.js`; brak wykrywania języka, brak zmiany w trakcie, brak łańcucha wariant → język → źródło. `expo-localization` ~57.0.2 zainstalowane, nieużywane w kodzie (`grep getLocales` bez trafień) |
| Proces | brak glosariusza, kontekstu kluczy, skryptu `sprawdz-i18n.mjs`, rejestru; terminy: `content/terms.yaml` (pl, en) jest już zalążkiem glosariusza z `[T:ID]` (rola 06) |
| Treści i audio | co zostaje w języku źródłowym: nazwy własne (solver, nazwy książek i autorów w źródłach), skróty pokerowe (`bb`, `BTN`, `UTG`), notacja kart (`A♠`); nagrań brak |

## Koszt (miara orientacyjna, nie budżet)

[OCENA] z założeń wzorowanych na kosztorysie Treningu (`trening/docs/lokalizacja/kosztorys-przekladu-2026-10-23.md`, ceny z jego odczytu 2026-10-06: Opus 5.5 4/20, Sonnet 5.5 2/10 USD za mln tokenów wejścia/wyjścia, Batch −50%; **do ponownego odczytu u źródła w dniu pracy**): wyjście ≈ 34 języki × ok. 330 tys. tokenów = ok. 11 mln tokenów; Sonnet Batch ok. 55 USD, Opus Batch ok. 110 USD za pierwszy przebieg treści + osobny przegląd drugim agentem (rząd kilkudziesięciu USD). Interfejs sam (16 KB): grosze. Każda zmiana źródła ponawia koszt tylko zmienionych kluczy (zamrożenie i fale). To jest płatna usługa poza Apple Developer: **wymaga uprzedzenia i zgody właściciela przed użyciem** (CLAUDE.md); alternatywa bez opłat: przekład w sesjach agenta, dużo wolniej. Decyzja dopiero przed E3, po roli 06.

## Pytania produktowe E0: rozstrzygnięcia agenta z odwołaniem do Treningu (D-132 – D-135, weto właściciela możliwe)

1. Wybór języka: tylko system czy także w aplikacji? Trening: ekran `app/more/language.tsx`, ustawienie „auto” (jak w telefonie) lub język z listy (`lib/i18n.ts`, `applyLang`). BRD F-16 wymaga zmiany języka offline. **Decyzja D-132:** jak Trening.
2. Oznaczenie tłumaczenia maszynowego w aplikacji: Trening nie oznacza w interfejsie, rejestr (`docs/lokalizacja/jezyki.md`) tak (kolumny „tłumaczenie”, „recenzja”). **Decyzja D-133:** jak Trening (oznaczenie w rejestrze). Odrzucone: notka w Ustawieniach → Język (dodaje obciążenie i 35 tekstów, wartość niepotwierdzona); wraca, jeśli sklep albo opinie tego zażądają.
3. Jednostki: żadna wielkość fizyczna ani waluta w treści (grep); `bb`, `%`, `s`, `x` są jednostkami domenowymi, nie zależą od systemu miar. **Decyzja D-134:** bez przełącznika jednostek; format liczb wg języka aplikacji (`Intl`), a w treści wg języka pliku bazy.
4. Treść krytyczna bez recenzenta-człowieka: CLAUDE.md ma przegląd zastępczy (D-027, 2026-11-03); Trening: drugi przegląd robi wyłącznie Claude, bez native speakerów (decyzja właściciela 2026-10-20). **Decyzja D-135:** treść krytyczna = numery pomocy i „odpowiedzialna gra”, liczby i progi rachunkowe, ostrzeżenia płatności i usuwania danych, uprawnienia; próg: kontrola (a) (proste sformułowanie, przekład zwrotny na polski w świeżej sesji, porównanie sensu) + drugi przegląd Claude; bez przeglądu człowieka do czasu użytkowników (CLAUDE.md).

## Znaleziska dla innych ról (nie poprawiam sam)

- **Rola 06 (realne):** `formatNumber` (`tools/content-build/src/numbers.ts:108`) formatuje po polsku na sztywno, a 35 baz (ADR 0005) musi mieć liczby wg języka (znak dziesiętny, grupowanie, `%`: de/fr „50 %”, tr „%50”). Moja rola ustala mechanizm i testy (E1), implementacja w `tools/content-build` to ścieżka wrażliwa (CLAUDE.md), więc zmiana przez rolę 08 z testem.
- **Rola 06 / właściciel (realne, treść):** `content/helplines.yaml` ma „Zakres: tylko Polska”, a produkt jest bez storefrontu PL. W 34 pozostałych językach ramka „Odpowiedzialna gra” pokazałaby polskie numery użytkownikowi spoza Polski. BRD OP-10 (numery pomocy, bloker roli 06) już to obejmuje; dopisuję zależność od lokalizacji.
- **Rola 04 (realne):** Literata 600 (podzbiory latin, latin-ext, vietnamese) nie pokrywa cyrylicy (bg ru sr uk), greki (el), CJK (ja ko zh-Hant); fallback systemowy: potwierdzić wygląd tytułów i słowa stopnia w tych pismach.
- **Rola 04 (brzegowe):** nazwa aplikacji „Szkoła Pokera” pod ikoną: lokalna nazwa w 35 językach jest decyzją produktową (Trening: `APP_NAME` na język); do E3/E4 (z rolą 10).
- **Rola 07:** komenda do CI i wektory liczby mnogiej po E1; E2E Maestro czerwony bez zmian.
- **Rola 10:** lista lokalizacji App Store Connect i tłumaczenie opisu sklepu w E4.

## Konfiguracja aplikacji (stan i cel)

- Dziś `app.json`: `"expo-localization"` bez opcji; cel E1: `supportedLocales` = 35 (iOS i Android), `locales` z `CFBundleDisplayName` na język, `ios.infoPlist.CFBundleAllowMixedLocalizations: true`. Teksty uprawnień: aplikacja nie prosi o uprawnienia wymagające `NS…UsageDescription` (powiadomienia nie mają takiego klucza); sprawdzić w E1 z `prywatnosc.md` (rola 05).
- SDK: `package.json` ma `expo ~57.0.26` i `expo-localization ~57.0.2`, a ADR 0001 mówi o SDK 58. Fakty o RTL i `supportedLocales` ze wzorców dotyczą SDK 58: do ponownego odczytu w E1 dla wersji faktycznie zainstalowanej `[DO USTALENIA]`.
- Polyfill: dziś `@formatjs/intl-pluralrules/polyfill.js`; wzorce roli wskazują `polyfill-force.js` na Hermes (cytat: „Since React Native uses Hermes which does not support Intl.PluralRules, import /polyfill-force instead for much better performance”, odczyt 18.10.2026). Czy Hermes w RN 0.86.3 ma już `PluralRules`: **niesprawdzone** w aplikacji (zasada 5 roli: sprawdzić w aplikacji, nie w Jest) `[DO USTALENIA]` w E1.

## Dowody komend (2026-11-04)

- `node -e` na liście `locales` Treningu: 35 kodów, `Intl.PluralRules` dla wszystkich, 0 rozbieżności wektorów, grupy kategorii i pisma jak wyżej (kod 0).
- `grep` w `content/pl`: brak walut i jednostek fizycznych; 3 392 `{{n:…}}`.
- `gh`/MCP `actions_list` CI na `main`: ostatni przebieg 42, `success`.

## Utrzymanie (zasada na stałe)

Nowy tekst = klucz + kontekst + wszystkie języki przed wydaniem albo jawny wyjątek z datą i powodem w tym pliku.
