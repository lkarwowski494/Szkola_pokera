# Audyt: Lokalizacja (przekłady 7 szablonów HZ, 10 języków) — Szkoła Pokera — 2026-11-17
Commit: ef75f613 (treść), raport na gałęzi `claude/sesja-im-przeklady-hz` · Tryb: audit (moduł tlumaczenie), sesja IM · Środowisko: Linux w chmurze, Node 22, pnpm (instalacja `--frozen-lockfile` kod 0), tsx; bez Xcode i bez zrzutów (zakres: tekst, nie układ). Decyzje sesji: `docs/decyzje/IM.md` (D-1940…D-1942). Wyjątek nazwany D-1940: ścieżka i ID `IM-NNN` według polecenia IM zamiast kontraktu roli.

## Podsumowanie
Przekłady SC-09, SC-16, SC-18, SC-21, SC-26, SC-27, SC-30 na de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant mają poprawne znaczniki (skrypt: 264 teksty, 0 błędów, kod 0) i zachowują liczby oraz kierunek rad we wszystkich 70 plikach z jednym wyjątkiem: **zh-Hant SC-27 zmienia warunek „do rivera” na „przed riverem” (IM-002, WYSOKIE)**. Drugie WYSOKIE jest we wzorcu i dotyczy wszystkich 12 języków: **SC-27 wyświetla „ok. 75 puli” bez znaku procentu (IM-001)**, potwierdzone renderem. Siedem ŚREDNICH to gramatyka i dwuznaczność podmiotu (es, it, pt, ko); 20 NISKICH to szlif stylu. Metoda: drugi przegląd AI (5 subagentów opus w świeżym kontekście, każde WYSOKIE i ŚREDNIE sprawdzone ponownie przez sesję na plikach), nie przegląd rodzimego użytkownika języka. Do decyzji: sposób naprawy IM-001 (treść albo kod).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| IM-001 | WYSOKIE | D (wzorzec) | SC-27: `{{w:rozmiar}}` bez „%”, „ok. 75 puli” w 12 językach | otwarte |
| IM-002 | WYSOKIE | M | zh-Hant SC-27: „przed riverem” zamiast „do rivera” | otwarte |
| IM-003 | ŚREDNIE | D | es: „Button” w tekście obok „botón (BTN)” z `{{w:pozycja}}` | otwarte |
| IM-004 | ŚREDNIE | D | es: „en el {{w:pozycja}}” daje „en el ciega grande (BB)” | otwarte |
| IM-005 | ŚREDNIE | D | it SC-30: „il 8%” (rodzajnik przed liczbą) i szyk w fold | otwarte |
| IM-006 | ŚREDNIE | D | pt SC-16 raise-big: niejasne, kto trafia drawa | otwarte |
| IM-007 | ŚREDNIE | D | pt SC-16 raise-small: czyta się „c-bet jest za mały” | otwarte |
| IM-008 | ŚREDNIE | D | pt SC-21 check: „já não pode apostar” czyta się jako rywal | otwarte |
| IM-009 | ŚREDNIE | D | ko SC-21 check: dwa identyczne zdania „체크합니다.” bez podmiotu | otwarte |
| IM-010…IM-029 | NISKIE | D | szlif stylu (tabela w „Znaleziska”) | otwarte |

## Tabela język × szablon × werdykt
OK = bez uwag; N = tylko NISKIE; Ś = ŚREDNIE; W = WYSOKIE. IM-001 (wzorzec) dotyczy SC-27 we wszystkich językach i nie jest powtarzany w komórkach.

| szablon | de | es | fr | it | ja | ko | pt | pt-BR | vi | zh-Hant |
|---|---|---|---|---|---|---|---|---|---|---|
| SC-09 | OK | OK | OK | OK | OK | OK | OK | OK | OK | OK |
| SC-16 | N (010) | Ś (004) | N (013, 014) | N (016) | N (020) | OK | Ś (006, 007) | N (019) | N (023, 024) | N (028) |
| SC-18 | OK | Ś (003) | N (013) | OK | OK | OK | OK | OK | OK | OK |
| SC-21 | OK | Ś (003) | N (013) | OK | OK | Ś (009) | Ś (008), N (018) | OK | N (025) | OK |
| SC-26 | N (010) | Ś (004) | N (015) | N (017) | OK | N (022) | OK | OK | OK | OK |
| SC-27 | N (011) | Ś (003) | OK | OK | OK | OK | OK | OK | N (026) | **W (002)** |
| SC-30 | OK | Ś (003), N (012) | OK | Ś (005) | N (021) | OK | OK | OK | N (027) | N (029) |

Wymiary oceny w każdej komórce: wierność (liczby, kierunek rady, warunki, kto/co/kiedy), terminologia (`content/<j>/terms-nazwy.yaml`), naturalność, długość (tytuł ≤ 68 ważonych sprawdzony też mechanicznie przez HZ, D-1730). Pełne tabele subagentów: `przeglad-ai/wynik-*.md`.

## Linia bazowa i założenia
- Zakres zawężony poleceniem IM do jakości przekładu 7 szablonów; pozostałe wymiary roli (rynki, mechanizm i18n, formaty, układ, VoiceOver) poza zakresem tej sesji: „nie sprawdzono, poza zakresem”.
- Wzorzec: `content/pl/` (źródło) i `content/en/`; terminologia `content/terms.yaml` i `content/<j>/terms-nazwy.yaml`; render znaczników z kodu: `{{w:…}}` w `apps/mobile/src/features/scenariusz/wariant.ts:402-415`, nazwa pozycji w `apps/mobile/src/features/stol/uklad.ts:116-120`, procent `{{n:}}` w `tools/content-build/src/numbers.ts:113-114`.
- Soczewki: użytkownik drugiego rynku bez znajomości pl (subagenci czytali en i pl), tłumacz bez ekranu (brief bez notatek HZ). Soczewka VoiceOver: poza zakresem.
- Znane otwarte z HZ, sprawdzone w tych szablonach: pt `spr`/`icm`/`vpip` (brak kluczy w `content/pt/terms-nazwy.yaml`) nie zmienia wyświetlania tu: skrót lub forma podana w znaczniku; ko `second-barrel`/`isolation` użyte spójnie z `content/ko/terms-nazwy.yaml:73` i `:105` (źródło nadal [DO USTALENIA]); zh-Hant `3-bet: null` użyte spójnie (zawsze goły znacznik, wyświetla „3-bet”).

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| 70 plików `content/<j>/scenarios/sc-{09,16,18,21,26,27,30}.yaml`, wszystkie teksty | tak | drugi przegląd AI: `przeglad-ai/brief.md`, `przeglad-ai/wynik-*.md` |
| Znaczniki `{{n:}}`, `{{w:}}`, `{{t:}}` względem pl (i en) | tak | `placeholdery.mjs`, `dowody/placeholdery.txt` (kod 0) |
| Render `{{w:rozmiar}}` w SC-27 | tak (pl, en, de, ja) | `dowody/rozmiar-sc27.txt`, sonda `dowody/sonda-sc27.mts.txt` |
| WYSOKIE i ŚREDNIE: ponowny odczyt sesji na plikach | tak | grep w sesji (IM-002…IM-009), nazwa pozycji es z `es.json` |
| Długość na ekranie 320 pt (zrzuty) | nie | poza zakresem polecenia (tekst); tytuły ≤ 68 ważonych sprawdzone przez HZ |
| Przegląd rodzimego użytkownika języka | nie | krok człowieka (moduł tlumaczenie), pytania w `przeglad-ai/wynik-*.md` sekcja 3 |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs audit/im-przeklady-hz-2026-11-17/raport.md . audit/im-przeklady-hz-2026-11-17` (bez `--rola`, D-1940): „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone”, kod wyjścia 0 (`dowody/sprawdz-raport.txt`).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| LOK-06 (parametry, liczby) | dotyczy | ok w przekładach (skrypt kod 0); IM-001 we wzorcu |
| LOK-11 (jakość przekładu, terminy) | dotyczy | IM-002…IM-029 |
| LOK-10 (treść merytoryczna w języku) | dotyczy | IM-002 (zmieniony warunek); przegląd człowieka: nie wykonany (polityka „szeroka”, D-027) |
| LOK-01–05, 07–09, 12–15 | nie dotyczy | poza zakresem polecenia IM (tylko przekłady 7 szablonów) |

## Znaleziska

### IM-001 · SC-27: rozmiar zakładu bez znaku procentu („ok. 75 puli”) we wszystkich 12 językach
- Pozycja listy kontrolnej: LOK-06 · Poziom: WYSOKIE (błędna liczba na ekranie) · Realność: realny · Pewność: wysoka · Rodzaj: D (wzorzec pl/en, przeniesione do 10 przekładów)
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:410` zwraca `String(Math.round(d.fractionBig * 100))`, bez znaku procentu.
- Teksty bet-big i bet-small w `content/pl/scenarios/sc-27.yaml:24` i `:26` mają po znaczniku od razu słowo „puli” (render niżej).
- Render (tsx, kod 0, `dowody/rozmiar-sc27.txt`): pl „Stawiasz ok. 75 puli”, en „about 75 of the pot”, de „etwa 75 des Pots”, ja „約75を”. Fixture testu IB ma „{{w:rozmiar}}% puli”, treść nie.
- Mechanizm: `grep -c "{{w:rozmiar}}" content/*/scenarios/sc-27.yaml` → 2 trafienia w każdym z 12 języków, żadne z „%”.
- Opcje: (a) w treści „{{w:rozmiar}}%” w 24 tekstach — bez kodu, ale fr/de typograficznie „75 %” różni się od innych procentów (te formatuje `formatujProcent`, `tools/content-build/src/numbers.ts:114`); (b) w kodzie wartość znacznika przez `formatujProcent` z językiem aplikacji (jak `{{n:}}`) i poprawka fixture — spójny zapis we wszystkich językach, zmiana w kodzie 08. Rekomendacja: (b), bo procenty mają już jeden formater na język; decyzja do koordynatora (kod poza zakresem IM).
- Test akceptacyjny: test renderu SC-27 z prawdziwej treści w pl, en, fr pokazuje procent („75%”, „75 %”).

### IM-002 · zh-Hant SC-27: zadanie każe wpłacić stack „przed riverem”, a rachunek dotyczy trzech zakładów do rivera
- Pozycja: LOK-10 · Poziom: WYSOKIE (zmiana warunku) · Realność: realny · Pewność: wysoka (ponowny odczyt sesji) · Rodzaj: M
- Dowód: `content/zh-Hant/scenarios/sc-27.yaml` situation, ostatnie zdanie: „用相同比例的{{t:bet|下注}}，在河牌前投入全部籌碼。” (在…前 = przed); wzorzec `content/en/scenarios/sc-27.yaml` situation: „get the whole stack in by the river with equal bets on the flop, turn and river”. Wyjaśnienie bet-big tego samego pliku mówi o wpłacie dokładnie na riverze, więc zadanie przeczy samo sobie i podsuwa dwa zakłady zamiast trzech.
- Proponowane brzmienie: „假設你的牌值得打三條街的{{t:value|價值}}，而且你想在翻牌、轉牌和河牌用相同比例的{{t:bet|下注}}，到河牌時投入全部籌碼。” (zastępuje wariant z wiadomości do koordynatora).
- Test akceptacyjny: brak „河牌前” w `content/zh-Hant/scenarios/sc-27.yaml`; kontrola HZ i placeholdery kod 0.

### IM-003 · es: dwie nazwy Buttona w jednej karcie
- Pozycja: LOK-11 · ŚREDNIE · realny · pewność wysoka · D
- Dowód: es situation SC-18, SC-21, SC-27, SC-30 mają zwykły tekst „Button”, a `{{w:pozycja}}` wyświetla nazwę z `content/es/terms-nazwy.yaml:49` („botón”) ze skrótem (BTN) (`apps/mobile/src/features/stol/uklad.ts:116-120`). Mechanizm w całym es (40 wystąpień „Button”, 0 „botón”, odczyt subagenta).
- Proponowane: zwykły tekst „Button” → „botón” (np. „Has {{t:open|abierto}} desde el botón…”), pełne zdania: `przeglad-ai/wynik-de-es.md` (es-SYS-01). Zakres poprawki: także szablony sprzed HZ.

### IM-004 · es: błąd rodzaju „en el ciega grande (BB)”
- Pozycja: LOK-11 · ŚREDNIE · realny · pewność wysoka · D
- Dowód: SC-16 i SC-26 (gracz na BB) „Tienes {{w:reka}} en el {{w:pozycja}}”; `apps/mobile/src/i18n/locales/es.json` `table.position.bb` = `{{t:big-blind}}` → „ciega grande” (rodzaj żeński, `content/es/terms-nazwy.yaml:31`). Mechanizm: `grep -l "hero: BB" content/es/scenarios/*.yaml | xargs grep -l "en el {{w:pozycja}}"` → 9 plików (sc-03, 07, 15, 16, 17, 26, 31, 33, 34).
- Proponowane (neutralne rodzajowo): „Tienes {{w:reka}} en la posición de {{w:pozycja}}, …” we wszystkich 9 plikach.

### IM-005 · it SC-30: „il 8%” i nienaturalny szyk w fold
- Pozycja: LOK-11 · ŚREDNIE · realny · pewność wysoka · D
- Dowód: situation „tra il {{n:hud.ex.nit3bet.vpip.low}} e il {{n:hud.ex.nit3bet.vpip.high}}” → „tra il 8% e il 10%” (poprawnie „l'8%”); fold „circa il …–… più forte delle mani”.
- Proponowane: situation „…un {{t:vpip}} compreso tra {{n:hud.ex.nit3bet.vpip.low}} e {{n:hud.ex.nit3bet.vpip.high}} su almeno circa {{n:hud.hands.vpip.low}} mani…”; fold „…se gioca solo le mani più forti, circa {{n:hud.ex.nit3bet.vpip.low}}–{{n:hud.ex.nit3bet.vpip.high}} del totale, …” (pełne zdania: `przeglad-ai/wynik-fr-it.md`, it-sc30-1/2).

### IM-006 · pt SC-16 raise-big: niejasne, kto trafia drawa
- LOK-11 · ŚREDNIE · realny · średnia · D. Obecne: „…quando faz {{t:call}}, ainda pode acertar o seu {{t:draw}}.” Proponowane: „…e, quando ele faz {{t:call}}, o seu {{t:draw}} ainda pode completar-se.” (`przeglad-ai/wynik-pt.md`, pt-sc16-1).

### IM-007 · pt SC-16 raise-small: zdanie czyta się „c-bet jest za mały”
- LOK-11 · ŚREDNIE · realny · średnia · D. Obecne: „…mas para cerca de {{n:xr.too-small.mult}} o {{t:c-bet}} é demasiado pequeno”. Proponowane: „…mas um {{t:raise|aumento}} para cerca de {{n:xr.too-small.mult}} o {{t:c-bet}} é demasiado pequeno: …” (pt-sc16-2).

### IM-008 · pt SC-21 check: „já não pode apostar” czyta się jako ruch rywala
- LOK-11 · ŚREDNIE (z kontekstu odczytywalne; inaczej byłoby WYSOKIE) · realny · średnia · D. Proponowane: „Faz {{t:check}}, porque, depois de {{t:call|pagar}} no flop, o adversário tem normalmente um {{t:range}} mais forte do que no flop, por isso a sua {{t:bet|aposta}} já não é segura.” (pt-sc21-1). Przyczyna wspólna IM-006…008: pt-PT bez zaimka grzecznościowego.

### IM-009 · ko SC-21 check: dwa identyczne zdania bez podmiotu
- LOK-11 · ŚREDNIE · realny · wysoka · D. Obecne: „…상대가 턴에서 {{t:check|체크}}합니다. {{t:check|체크}}합니다.” Proponowane drugie zdanie: „당신도 {{t:check|체크}}합니다.” (`przeglad-ai/wynik-ja-ko.md`, ko-sc-21-1).

### IM-010…IM-029 · NISKIE (szlif stylu; proponowane brzmienia w plikach subagentów)
| ID | Język, szablon | Problem | Źródło propozycji |
|---|---|---|---|
| IM-010 | de SC-16, SC-26 | „am Big Blind (BB)” wobec „im Big Blind” w situation | wynik-de-es, de-SYS-01 |
| IM-011 | de SC-27 | „hinter dem Pot” (kalka) | wynik-de-es, de-sc27-01 |
| IM-012 | es SC-30 | szyk „el X–Y % más fuerte de las manos” | wynik-de-es, es-sc30-01 |
| IM-013 | fr SC-16, 18, 21 | „mise petit avec un c-bet” → „fait un petit c-bet” | wynik-fr-it, fr-sc16-1 |
| IM-014 | fr SC-16 | „d'autant plus que le c-bet est petit” dwuznaczne | wynik-fr-it, fr-sc16-2 |
| IM-015 | fr SC-26 | „les mains meilleures” → „ou mieux” | wynik-fr-it, fr-sc26-1 |
| IM-016 | it SC-16 | bez przecinków czyta się „c-bet troppo piccola” | wynik-fr-it, it-sc16-1 |
| IM-017 | it SC-26 | telegraficzne „con SPR circa 2” | wynik-fr-it, it-sc26-1 |
| IM-018 | pt SC-21 | dwie formy „call” w jednym szablonie | wynik-pt, pt-sc21-2 |
| IM-019 | pt-BR SC-16 | niezręczne „…ele é pequeno demais” | wynik-pt, pt-BR-sc16-1 |
| IM-020 | ja SC-16 | brak rzeczownika „レイズ” w raise-small | wynik-ja-ko, ja-sc-16-1 |
| IM-021 | ja SC-30 | zgubione porównanie „nie wypada lepiej” | wynik-ja-ko, ja-sc-30-1 |
| IM-022 | ko SC-26 | nieskładne „핸드로 … 충분합니다” | wynik-ja-ko, ko-sc-26-1 |
| IM-023 | vi SC-16 | brak „lên” przy przedziale rozmiaru | wynik-vi-zh, vi-sc-16-1 |
| IM-024 | vi SC-16 | „Theo” w dwóch znaczeniach | wynik-vi-zh, vi-sc-16-2 |
| IM-025 | vi SC-21 | „mang lại ít” | wynik-vi-zh, vi-sc-21-1 |
| IM-026 | vi SC-27 | szyk „đến river thì đưa hết stack vào” | wynik-vi-zh, vi-sc-27-1 |
| IM-027 | vi SC-30 | „Nói đơn giản” zamiast „w uproszczeniu modelu” | wynik-vi-zh, vi-sc-30-1 |
| IM-028 | zh-Hant SC-16 | rozbite „stawia mały c-bet” | wynik-vi-zh, zh-Hant-sc-16-1 |
| IM-029 | zh-Hant SC-30 | „最好的 A” | wynik-vi-zh, zh-Hant-sc-30-1 |

## Do sprawdzenia
Pytania do rodzimego użytkownika języka (pewność ≤ 80%): `przeglad-ai/wynik-*.md`, sekcja 3 każdego pliku. Najważniejsze: fr „en {{w:pozycja}}” vs „au Bouton” (91 wystąpień w całym fr, poza zakresem tych szablonów); kolejność liczb VPIP w zdaniu SC-30 de/ja/ko/zh-Hant (INFO skryptu) — subagenci uznali za poprawny szyk.

## Co działa dobrze i należy zachować
Znaczniki i liczby we wszystkich 70 plikach zgodne ze wzorcem; forma zwracania się spójna (de du, es tú, pt-PT 3. osoba, pt-BR você); terminy z `terms-nazwy.yaml` użyte konsekwentnie, także te bez źródła.

## Decyzje dla właściciela
Brak decyzji produktowych dla właściciela. Do koordynatora: sposób naprawy IM-001 (opcje a/b, rekomendacja b) i kolejność napraw przed buildem 1012 (blokujące według progu wydania: IM-001, IM-002).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 09-lokalizacja --tryb fix --zadania IM-002,IM-003,IM-004,IM-005,IM-006,IM-007,IM-008,IM-009` (treść `content/`); IM-001 według wybranej opcji: (a) to samo polecenie, (b) rola 08 (kod `wariant.ts` i fixture IB). NISKIE IM-010…IM-029 do backlogu z wersją.

`git status --porcelain` przed commitem: tylko `audit/im-przeklady-hz-2026-11-17/` i `docs/decyzje/IM.md`; pliki `content/` i kod nietknięte.
