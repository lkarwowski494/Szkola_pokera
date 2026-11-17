# Reaudyt: Studio Projektowe (UX, marka, przepływy) — Szkoła Pokera — 2026-11-17
Commit: 196cb8c2b062e46e0f90aaee062fff24fc06f729 (gałąź `claude/sesja-ir-reaudit-m1`; w trakcie pracy koordynator dopisał commity 4360eee5…, które poza `audit/M1-2026-11-17/reaudit-2026-11-17/` zmieniają tylko `docs/decyzje/IR.md`, kod aplikacji = 196cb8c2, `dowody/regresja-pasek.txt`) · Baza: 0e7e5e00 · Tryb: reaudit, pętla 1 (M1, polecenie 04) · Środowisko: Linux 6.18, Node 22.23.4, Playwright z Chromium (`/opt/pw-browsers`); bez macOS, symulatora, telefonu i SF Pro; zrzuty siatki to replika HTML stylów komponentu (Expo web nie ma ekranu lekcji), nie zrzut aplikacji.

## Podsumowanie
Oznaczenie klas niepewnych w siatce lekcji jest spójne z systemem (ten sam znak, styl i klucz legendy co malowanie, bez nowych kolorów, test 5/5 kod 0), ale w motywie jasnym (domyślnym iOS) i jasnym z „Zwiększ kontrast” kropka na polu w zakresie ma kontrast 1,60:1 i 2,01:1 przy progu 3:1. Dotyczy to 71 z 263 klas niepewnych w treści pl, w tym dokładnie rąk, dla których M2-001 powstało (K7o, Q8o, T2s, K8o, 75o w BB vs BTN: 100% obrony w siatce). Na białym polu kropka jest dobrze widoczna (7,39:1), w motywie ciemnym oba warianty przechodzą. Naprawa: kropka w kolorze etykiety ręki (`ink`), co daje ≥ 3,26:1 we wszystkich czterech wariantach, bez nowego tokenu.

| Zakres (ID z polecenia) | Wynik | Poziom | Blokuje 1012 | Blokuje App Store | Dowód |
|---|---|---|---|---|---|
| M2-koordynator-napraw-001 (1d756b0b) | nadal otwarte (częściowo): oznaczenie istnieje i jest spójne, ale na polach w zakresie w motywie jasnym poniżej 3:1 → 04-studio-projektowe-001 | P1 (KO-129) | tak, jako niedomknięte M2-001 (P1 w kategorii „błędne twierdzenia merytoryczne”, CLAUDE.md pkt 1); naprawa jednowierszowa | tak | `dowody/kontrast-kropka.txt`, `dowody/pod-kropka.txt`, `zrzuty/siatka-bb-vs-btn-light-390.png`, `dowody/test-rangegrid-uncertain.txt` |
| M2-koordynator-napraw-004 | ocena progu: brak informacji dodatkowej, nie bariera; nadal otwarte (backlog) | P2 (potwierdzam) | nie | nie | szczegóły niżej, „Ocena M2-koordynator-napraw-004” |
| Próbka regresji: PasekStrategii, tokeny, PaintGrid, teksty | zweryfikowane: brak zmian od bazy (git diff pusty) | — | nie | nie | `dowody/regresja-pasek.txt` |

| ID | Poziom | Rodzaj | Tytuł | Wynik | Blokuje 1012 / App Store |
|---|---|---|---|---|---|
| 04-studio-projektowe-001 | P1 | D | Kropka klasy niepewnej w siatce lekcji prawie niewidoczna na zielonym polu w motywie jasnym | nadal otwarte (część M2-koordynator-napraw-001) | tak / tak (razem z M2-001) |
| 04-studio-projektowe-002 | P2 | D | Kropka „mieszana” w malowaniu poniżej 3:1 na pomalowanym polu (wszystkie motywy) | istniało wcześniej (PaintGrid bez zmian od 0e7e5e00) | nie / nie |

## Linia bazowa i założenia
Stan projektu i próg z polecenia: w budowie, TestFlight wewnętrzny (następny build 1012), bez użytkowników poza właścicielem, rynek US, 12 języków w wydaniu. Blokują tylko P0 i P1 z kategorii CLAUDE.md „Audyty i wydania” pkt 1. Poziom M2-001 (P1) przyjmuję z rozstrzygnięcia KO-129 w raporcie M2; ocena merytoryczna rąk nie należy do roli 04. Pełnego `pnpm run ci` nie uruchamiałem (polecenie); raport M2 podaje kod 0 na 5f34458a.

## Pokrycie (co sprawdzono, czego nie)
| Obszar | Sprawdzone? | Jak |
|---|---|---|
| `apps/mobile/src/components/RangeGrid.tsx` (diff 1d756b0b) | tak | odczyt kodu, kontrast na tokenach, replika HTML 390/320 × 4 warianty + skala szarości |
| Test komponentu | tak | `dowody/test-rangegrid-uncertain.txt` (5/5, kod 0) |
| Położenie kropki względem paska | tak | `dowody/pod-kropka.txt` (suma częstości klas niepewnych, 34 spoty pl) |
| Oznaczenie w zadaniach (PaintGrid) | tak, kod i kontrast | `dowody/kontrast-kropka.txt` (druga część) |
| VoiceOver w siatce lekcji i malowaniu | tak, kod i teksty | niżej, ocena M2-004 |
| Zrzut z iOS, Dynamic Type, „Zwiększ kontrast” na urządzeniu | nie | brak macOS i telefonu: krok właściciela (lista niżej) |

## Znaleziska (szczegóły)
### 04-studio-projektowe-001 · Kropka klasy niepewnej w siatce lekcji prawie niewidoczna na zielonym polu w motywie jasnym
- Pozycja listy kontrolnej: SP-04 (grafika niosąca informację, WCAG 1.4.11), także SP-05
- Poziom: P1
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/components/RangeGrid.tsx:42` kropka w kolorze „styles.mark, { color: tk.muted }”; pole w zakresie to `felt1` z `opacity: 0.85` na `surface` (`apps/mobile/src/components/RangeGrid.tsx:34`). Wynik `dowody/kontrast-kropka.txt` (kod 1): light 1,60:1, lightHigh 2,01:1 (próg 3); dark 4,79:1, darkHigh 7,75:1; na białym polu 7,39:1 i więcej. `dowody/pod-kropka.txt`: 71 z 263 klas niepewnych ma pasek ≥ 95% szerokości (kropka na zieleni), 17 na granicy 75–95%; w BB vs BTN: T2s 1,0, K8o 0,99, Q8o 1,0, K7o 1, 75o 0,98. Replika: `zrzuty/siatka-bb-vs-btn-light-390.png` (kropki przy K7o, Q8o, K8o, T2s, 75o ciemne na zieleni, przy 1× ledwie widoczne), dla porównania `zrzuty/siatka-bb-vs-btn-dark-390.png`.
- Mechanizm: znak przeniesiony 1:1 z malowania, gdzie leży na jasnym `feltSoft` (6,26:1); w siatce lekcji tło pola jest ciemnozielone, a `muted` motywu jasnego ma podobną luminancję. Znak ma 8 pt (`apps/mobile/src/components/RangeGrid.tsx:68`), czyli kropka ok. 2–3 pt średnicy (przybliżenie z repliki), więc słaby kontrast nie jest kompensowany rozmiarem.
- Powraca: M2-koordynator-napraw-001 (naprawa nie spełnia testu akceptacyjnego dla rąk w zakresie w motywie jasnym) → trwała kontrola: para kontrastu w teście tokenów
- Wzorzec lub źródło: WCAG 2.2, 1.4.11 (3:1 do sąsiednich kolorów; podłogi dostępności roli 04); system kolorów `apps/mobile/src/theme/tokeny.ts:18` i `apps/mobile/src/theme/tokeny.ts:21`
- Kroki w aplikacji: motyw jasny → Lekcje → M4 „Obrona dużego blinda” → siatka pod akapitem o rękach w kolorze → szukaj kropki przy K7o lub Q8o.
- Opcje: (a) kropka w kolorze etykiety ręki (`tk.ink`): ≥ 3,26:1 we wszystkich wariantach i na obu tłach (`dowody/kontrast-kropka.txt`, „wariant naprawy”), jedna linia, bez nowego tokenu; (b) kropka na własnym krążku `surface` (niezależna od wypełnienia), większa zmiana układu pola; (c) kolor zależny od tła (`onFelt` na zieleni, `muted` na bieli), dwie gałęzie i granica 75–95% do rozstrzygnięcia. Rekomendacja: (a) plus znak 10 pt albo kropka jako `View` 4×4 pt (decyzja studia: zostaje w systemie, zmienia tylko kolor i rozmiar istniejącego znaku). Ten sam wzorzec w malowaniu: 04-studio-projektowe-002.
- Test akceptacyjny: para „kropka klasy niepewnej na polu w zakresie” (ink na felt1·0,85 na surface) i „na pustym polu” ≥ 3:1 w czterech wariantach w teście tokenów; test komponentu sprawdza kolor znaku = kolor etykiety; zrzut z iPhone’a M4.l2 w motywie jasnym (lista niżej).
- Status: otwarte (część M2-koordynator-napraw-001)

### 04-studio-projektowe-002 · Kropka „mieszana” w malowaniu poniżej 3:1 na pomalowanym polu
- Pozycja listy kontrolnej: SP-04
- Poziom: P2
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/components/PaintGrid.tsx:104` pomalowane pole mieszane ma tło `primaryBg`; znak w kolorze `muted` (`apps/mobile/src/components/PaintGrid.tsx:147`). `dowody/kontrast-kropka.txt` (kod 1): 2,46:1 light, 1,64:1 dark, 1,62:1 lightHigh, 1,19:1 darkHigh. Plik bez zmian od 0e7e5e00 (`dowody/regresja-pasek.txt`), więc istniało wcześniej.
- Mechanizm: znak ma stały kolor `muted`, a tło pomalowanego pola jest odwrotne do tła niepomalowanego.
- Powraca: nie
- Wzorzec lub źródło: WCAG 2.2, 1.4.11
- Kroki w aplikacji: ćwiczenie malowania → pomaluj rękę mieszaną → sprawdź → pole granatowe z niewidoczną kropką.
- Opcje: (a) kolor znaku „mieszana” = kolor etykiety pola (`labelColor`), tak jak w 001 — jedna reguła dla obu siatek; (b) zostawić (informację niesie też tło pola i etykieta VoiceOver „mieszana, zaliczona”). Rekomendacja: (a) razem z 001. Nie blokuje: informacja ma drugi nośnik (tło i stan dla czytnika).
- Test akceptacyjny: para znak/tło pomalowanego pola ≥ 3:1 w czterech wariantach.
- Status: otwarte, istniało wcześniej (do decyzji właściciela, backlog)

## Ocena M2-koordynator-napraw-004
- Jak opisana jest siatka lekcji dla VoiceOver: cały komponent to jeden element z etykietą tytuł + procent (`apps/mobile/src/components/RangeGrid.tsx:20`, tekst `apps/mobile/src/i18n/locales/pl.json:663`); żadne pole, kolor ani legenda nie są czytane osobno. Tak było przed 1d756b0b (M1, sekcja Do sprawdzenia). Użytkownik czytnika nie dostaje więc składu zakresu w ogóle, a tym bardziej nie dostaje błędnego twierdzenia o K7o czy Q8o, którego dotyczyło M2-001.
- Czy treść mówi o niepewności tekstem: tak, ogólnie, bez listy rąk: `content/pl/lessons/m4-l2-obrona-bb.md:79` „Solver aplikacji, z którego pochodzi siatka, broni tu szerzej niż opublikowane rozwiązania”.
- Zadania (malowanie) są dostępne pole po polu: każda komórka ma rolę i etykietę ze stanem (`apps/mobile/src/components/PaintGrid.tsx:139`), klasa niepewna jest czytana jako stan z `apps/mobile/src/i18n/locales/pl.json:658` (mieszana, zaliczona), bo ocena traktuje klasy niepewne jak mieszane (`apps/mobile/src/features/drills/grade.ts:33`).
- Werdykt: brak informacji dodatkowej o ilustracji, nie bariera dostępności w rozumieniu CLAUDE.md pkt 1 (lekcja i ćwiczenia pozostają do użycia z VoiceOver). Poziom P2, nie blokuje 1012 ani App Store. Rekomendacja (a) z raportu M2 bez zmian; brzmienie nowego klucza uzgodnić z legendą („mieszana”), żeby jedno pojęcie miało jedną nazwę.

## Próbka regresji (poza zmienionymi plikami)
- SP-18 i SP-08, `apps/mobile/src/components/PasekStrategii.tsx`: bez zmian od bazy; etykiety segmentów i opis paska na miejscu (wiersze 91 i 138), „Ogranicz ruch” odczytywany (wiersz 58). Wynik: zweryfikowane, wynik M1 aktualny.
- SP-04, moduł motywu i teksty (`apps/mobile/src/theme`, `apps/mobile/src/i18n`): bez zmian od bazy, więc wynik kontrastu M1 (173/174, otwarte 04-studio-projektowe-008 z M1) aktualny.
- SP-05, PaintGrid: bez zmian od bazy; przy okazji pomiaru kropki znalezione 04-studio-projektowe-002 (istniało wcześniej).
- Dowód: `dowody/regresja-pasek.txt` (git diff --stat pusty, kod 0).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| SP-04 | dotyczy (zmieniony komponent) | znaleziska 001, 002 |
| SP-05 | dotyczy | kropka + legenda tekstem („• mieszana”), w skali szarości kształt nie znika (`zrzuty/siatka-bb-vs-btn-light-390-szarosc.png`); słaba widoczność na zieleni → 001 |
| SP-03 | dotyczy | ok: kolory wyłącznie z tokenów (`tk.muted`); rozmiar 8 pt jak w PaintGrid (siatki to znany wyjątek A04-18, `docs/design/audyt-5b-6.md:54`) |
| SP-07 | dotyczy | nie sprawdzono na iOS (Expo web nie jest dowodem); znak skaluje się z tekstem jak etykieta pola |
| SP-09 | dotyczy | ok: klucz legendy wspólny z malowaniem (`apps/mobile/src/i18n/locales/pl.json:649`) |
| SP-18 | dotyczy | ocena M2-004 (P2) |
| SP-13 | dotyczy | ok w zakresie systemu: brak tokenów siatek w `docs/design` (otwarte w `docs/design/design-spec.md:115`), zmiana nie dodaje nowych kolorów |
| SP-08 | próbka regresji | zweryfikowane |
| SP-01, SP-02, SP-06, SP-10, SP-11, SP-12, SP-14, SP-15, SP-16, SP-17, SP-21 | nie dotyczy zakresu reaudytu (pliki bez zmian od 0e7e5e00) | wynik M1 aktualny |

## Do sprawdzenia (pewność ≤ 80%)
- Legenda „• mieszana” przy polu 100% (np. K7o) może czytać się jako sprzeczność: w zadaniach znaczy „zaliczona w obie strony”, w lekcji „solvery grają różnie”. Brzmienie to sprawa roli 06/09 (tekst uczący), nie wyglądu; do decyzji przy naprawie M2-004.

## Decyzje dla właściciela
- Zrzuty z iPhone’a po naprawie 001 (ok. 5 min): `ios-m4l2-siatka-jasny.png`, `ios-m4l2-siatka-jasny-kontrast.png` (Zwiększ kontrast), `ios-m4l2-siatka-ciemny.png`, `ios-m4l2-siatka-ax5.png`; sprawdzić kropkę przy K7o, Q8o, 75o, 74s i legendę.

## Kontrola dowodów i sekretów
`node audit/M1-2026-11-17/narzedzia/sprawdz-raport.mjs <raport> /home/user/Szkola_pokera <katalog raportu> --rola 04-studio-projektowe` → wynik w `dowody/sprawdz-raport.txt`.

git status --porcelain: start `dowody/git-status-start.txt`; koniec `dowody/git-status-koniec.txt`. Pliki aplikacji nietknięte; zmiany tylko w `audit/M1-2026-11-17/reaudit-2026-11-17/04-studio-projektowe/` (część z nich koordynator włączył do swoich commitów w trakcie pracy, więc koniec pokazuje je jako zmienione lub nowe).
