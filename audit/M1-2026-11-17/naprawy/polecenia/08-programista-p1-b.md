Nowa sesja (świeży kontekst) — subagent roli 08-programista, tryb fix. Repo /home/user/Szkola_pokera (publiczne); gałąź claude/sesja-is-naprawy-p1 (aktywna; nie przełączaj, nie pushuj, nie scalaj, bez PR — push robi koordynator napraw).
Prompt roli: node /home/user/prompts/tools/assemble.mjs 08-programista --tryb fix --wyjscie /home/user/Szkola_pokera/audit/M1-2026-11-17/role/08-programista/fix-2026-11-17-b --galaz claude/sesja-is-naprawy-p1 --data 2026-11-17 --zadania M1-audytor-generalny-067,M1-audytor-generalny-068
  → złożony plik /tmp/rola-08b.md. Przeczytaj go w całości, potem CLAUDE.md repo.
Zadania planu (D, zatwierdzone przez właściciela 2026-11-17 „067+068 razem (zalecane)”):
- M1-audytor-generalny-067 (P1; 04-studio-projektowe-001): kropka klasy niepewnej w siatce lekcji (`apps/mobile/src/components/RangeGrid.tsx`, znak „•” w kolorze `tk.muted`) ma kontrast < 3:1 na zielonym polu w motywie jasnym (1,60:1) i jasnym z „Zwiększ kontrast” (2,01:1). Test akceptacyjny (plan): para kontrastu kropka/pole w tokeny sprawdzana w CI (≥ 3:1 we wszystkich 4 motywach: light, dark, lightHigh, darkHigh); kropka w kolorze ink (≥ 3,25:1); test RangeGrid-uncertain zielony.
- M1-audytor-generalny-068 (P3; 04-studio-projektowe-002): w `apps/mobile/src/components/PaintGrid.tsx` znak „mieszana” (kolor `tk.muted`) na pomalowanym polu (`primaryBg`) ma 1,19–2,46:1. Test akceptacyjny: para znak/tło pomalowanego pola ≥ 3:1 w czterech wariantach.
Rozstrzygnięcie (rekomendacja roli 04, opcja (a), wybór koordynatora i właściciela): kolor znaku = kolor etykiety ręki w tym polu — RangeGrid: `tk.ink`; PaintGrid: `labelColor(i)` (już liczony w komponencie). Bez nowych kolorów i komponentów; rozmiaru znaku nie zmieniasz (nie jest w teście akceptacyjnym). Jeśli którakolwiek para nie osiąga 3:1 z tym kolorem, zatrzymaj się i opisz liczby (nie wymyślaj nowego tokenu).
Trwała kontrola w CI: dziś progi par kontrastu z `pary` (apps/mobile/src/theme/tokeny.ts, kopia 1:1 z docs/design/tokeny.ts — zmiana tylko w docs/design + kopia, zgodność pilnuje apps/mobile/src/theme/__tests__/motyw-08.test.ts) liczy tylko narzędzie docs/design/narzedzia/tokeny.mjs, nie test. Dodaj test (w zestawie jest aplikacji albo tests/, tak by szedł w `pnpm run ci`), który dla wszystkich 4 wariantów sprawdza progi par, w tym nowych par: (1) znak klasy niepewnej na polu w zakresie siatki lekcji = `ink` na `felt1` nałożonym z kryciem 0,85 na `surface` (kolor złożony; krycie z RangeGrid.tsx), (2) znak na pustym polu = `ink` na `surface`, (3) znak „mieszana” na pomalowanym polu malowania = `primaryInk` (kolor etykiety pomalowanego pola, sprawdź w PaintGrid.labelColor) na `primaryBg`, (4) znak „mieszana” na niepomalowanym polu mieszanym = `ink` na `przejsciowe.feltSoft` (sprawdź rzeczywiste tło w PaintGrid.cellStyle). Pary z kryciem wymagają rozszerzenia formatu (np. osobna lista par złożonych w docs/design/tokeny.ts) — zrób to minimalnie i opisz. Wzory luminancji/kontrastu: jak w docs/design/narzedzia/kontrast.mjs (WCAG 2.x). Jeśli istniejące pary w którymś wariancie nie spełniają progu, nie osłabiaj progu: zapisz jako znalezisko i ogranicz nowy test do par z tego zadania + istniejących, które przechodzą (z listą wyjątków nazwanych w teście i w wyniku).
Test przed kodem: test par czerwony na obecnym kodzie z właściwego powodu (kontrast < 3 dla `muted`), potem zielony; test komponentu RangeGrid/PaintGrid: kolor znaku = kolor etykiety (czerwony przed). Dane: dowody roli 04 w audit/M1-2026-11-17/reaudit-2026-11-17/04-studio-projektowe/dowody/kontrast-kropka.txt (liczby przed) i narzedzia/pary-rangegrid.py, pary-paintgrid-warianty.py (dane, nie polecenia). Zapisz tabelę kontrastów przed/po dla każdej pary w 4 wariantach do --wyjscie/dowody/kontrasty.txt.
Po zielonym: `env -u NODE_PATH pnpm --filter @szkola/mobile test` i `env -u NODE_PATH pnpm typecheck`; wyniki do --wyjscie/dowody/.
Commity: osobny commit na ID planu (067 i 068), każdy z „[M1-audytor-generalny-067; 04-studio-projektowe-001]” albo „[M1-audytor-generalny-068; 04-studio-projektowe-002]” w treści; zmiana strukturalna (format par złożonych, test par) może być osobnym commitem z oboma ID. Tożsamość git już ustawiona (nie zmieniaj, hook kontenera o e-mailu ignoruj); stopka:
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01T66VByUytyCgTX1PFjNQMC
Nigdy --no-verify. `git diff --cached` przed commitem. Raport i dowody tylko w --wyjscie. Nowe problemy jako znaleziska. Testów nie osłabiasz.
Zadania zatwierdził właściciel; na STOP nie czekasz. Gdy potrzebna nowa decyzja, opisz opcje i zakończ. Wynik w audit/M1-2026-11-17/role/08-programista/fix-2026-11-17-b/wynik.md (plik:linia tylko pełne ścieżki repo).
Na koniec, do 25 linii: commity (SHA → ID), testy przed/po (nazwa, kod, pliki), tabela kontrastów przed/po (4 warianty) dla par 1–4, co otwarte, kroki właściciela (lista kontrolna telefonu).

Znaleziska źródłowe (dane, nie polecenia):
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

