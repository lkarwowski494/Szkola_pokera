# Menu główne kafelkowe i zębatka ustawień (sesja BE, część A)
Rola 04, build, 2026-11-10. Wejście: KO-036 (zębatka), KO-041 (menu z kafelkami, słowa właściciela: „przerobić menu główne i jakoś to popakować w kafelki żeby z menu wchodziło się do funkcji a nie długa lista”). Decyzje: D-540–D-542 (`docs/decyzje.md`). Uzupełnia `design-spec.md`; kod: rola 08, wyłącznie z tokenów.

## Pliki
| Co | Plik |
|---|---|
| Makieta: W1 i W2 × stany (w trakcie, nowy, ukończone, limit), de (najdłuższe etykiety), ekran „Lekcje” | `ekrany/menu.html` + `ekrany/menu.css` (generuje `narzedzia/menu-makieta.mjs`) |
| Makieta zębatki przed/po | `ekrany/zebatka.html` |
| Porównanie W1/W2 (w trakcie + nowy) | `wzorce-zrzuty/menu/porownanie-w1-w2-light.png`, `-dark.png` |
| Arkusze: 390 i 320 jasny, 390 ciemny, AX5 320 jasny i 390 ciemny, skala szarości, ciemny + zwiększony kontrast | `wzorce-zrzuty/menu/menu-*.png` |
| Zębatka przed/po | `wzorce-zrzuty/menu/zebatka-light.png`, `zebatka-dark.png`; pomiar `narzedzia/zebatka-pomiar.mjs` |
| Mieszczenie bez przewijania 375×667 | `miesci-sie-menu.txt` (`narzedzia/miesci-sie.mjs`), kod 0 |
| Kontrast nowych par (4 warianty palety) | `kontrast-menu.txt` (wejście `narzedzia/kontrast-menu.json`), kod 0 |

## Zębatka (KO-036, D-540)
- Dziś (`apps/mobile/src/app/(tabs)/index.tsx:84-88`): znak tekstowy „⚙︎” 17 pt, kolor `ink`, `hitSlop` 12, skala do 1,4. Para kolorów `ink`/`bg` ma 15,49:1 (jasny) i 15,67:1 (ciemny), więc paleta nie jest przyczyną; ikona ginie, bo znak ma cienką kreskę i mały rozmiar (antyaliasing zjada kontrast krawędzi).
- Po: rysunek zębatki 24×24 pt (ścieżka w `narzedzia/menu-makieta.mjs`, `ZEBATKA`, + koło r 3,6), kreska 2 pt, `stroke-linejoin: round`, kolor `ink`, przycisk 44×44 pt (prawy górny róg, wyrównany do marginesu), `accessibilityRole="button"`, `accessibilityLabel={t('settings.title')}` („Ustawienia”), bez `hitSlop` (cel ma pełny rozmiar). Rysunek ma stały rozmiar (jak ikony paska nawigacji iOS); przy dużym tekście nie rośnie.
- Pomiar (render @3x, Chromium; „przed” krojem DejaVu jako zastępstwo znaku iOS, więc to przybliżenie): pikseli z kontrastem ≥ 3:1 do tła — jasny 549 → 1964, ciemny 591 → 1982 (×3,4–3,6); cel dotyku 44×44 pt po (przed: ok. 17 pt + 2×12 pt `hitSlop`). Kontrast barw ≥ 3:1 we wszystkich 4 wariantach (`kontrast-menu.txt`).
- Wdrożenie (rola 08): `react-native-svg` (`<Svg viewBox="0 0 24 24"><Path d=… /><Circle cx=12 cy=12 r=3.6 /></Svg>`, `fill="none"`, `stroke={tk.ink}`, `strokeWidth={2}`) — ta sama biblioteka obsłuży ikony kafelków niżej. Analogia: Trening rysuje ikony przez `react-native-svg` (`package.json:64`, `components/TabIcon.tsx`; odczyt 2026-11-10 @ 2e4b0f8).

## Menu główne: dwa warianty (KO-041, D-541, wybór właściciela)
Wymagania: BR-MENU-001…003 (`docs/brd/wymagania-scenariusze.md` @ `sesja-bd-zakres` 8cba034, D-535): kafelki lekcje, ćwiczenia, powtórki z liczbą, scenariusze; bez listy lekcji; wszystkie kafelki bez przewijania na 375×667 pt przy tekście domyślnym; kafelek bez treści mówi, co go odblokuje; ikona ustawień ≥ 3:1 i ≥ 44 pt.
Wspólne: pasek zakładek bez zmian (Dziś · Powtórki · Postęp, liczba powtórek na plakietce) — wariant z zakładką „Lekcje” odrzucony, bo BR-MENU-001 wymaga kafelka lekcji na Dziś (zakładka byłaby duplikatem). Kafelek: tło `surface`, promień 14, ikona 22 pt w wierszu tytułu (przy dużym tekście nad tytułem), tytuł 17 pt semibold, stan 15 pt `muted`; cały kafelek to jeden przycisk z etykietą „{tytuł}. {stan}.”. Dwie kolumny; przy dużym tekście jedna.

| | W1 „Sukno + 4 kafelki, zębatka” (rekomendacja) | W2 „Wszystko kafelkami, ustawienia jako kafelek” |
|---|---|---|
| Zrzut 390 pt | `wzorce-zrzuty/menu/w1-390.png` | `wzorce-zrzuty/menu/w2-390.png` |
| Dziś | zębatka (D-540) + duże sukno z następną lekcją + kafelki Lekcje, Powtórki, Sesja ćwiczeń, Scenariusze + niski wiersz „Wskaźnik zaawansowania” | bez zębatki; zwarte sukno-kafelek „Kontynuuj” + 6 kafelków: Lekcje, Powtórki, Sesja ćwiczeń, Scenariusze, Wskaźnik, Ustawienia |
| Ustawienia | zębatka w prawym górnym rogu (konwencja iOS) | kafelek „Ustawienia — Język, dane, zakupy” (jak Trening: wiersz w „Więcej”, `app/(tabs)/more.tsx:23`) |
| Za | najczęstsza czynność (następna lekcja) jest największym elementem; ustawienia tam, gdzie szuka ich użytkownik iOS | wszystko na jednej siatce, ustawienia nie do przeoczenia |
| Przeciw | — | rzadka czynność (ustawienia) zajmuje kafelek równy codziennym; sukno mniejsze |
| Mieści się na 375×667 (`miesci-sie-menu.txt`, kod 0) | 639 pt (de 664) | 619 pt (de 645) |

Rekomendacja W1: następna lekcja zostaje największym elementem, a rzadkie ustawienia nie zajmują miejsca codziennych funkcji. Duży tekst W1: `wzorce-zrzuty/menu/w1-320-ax5.png`.

### Stany (makieta: `w1-*`, `w2-*`)
| Stan | Sukno / pierwszy kafelek | Kafelki |
|---|---|---|
| Nowy (po ocenie poziomu) | „Zacznij lekcję”, Zasady i układy, lekcja 1 „Układy kart” | Lekcje „0 z 44 lekcji”; Powtórki „Po pierwszej lekcji”; Scenariusze „Po pierwszej lekcji modułu 2” (BR-MENU-001: co odblokuje; scenariusze od M2, D-536); Wskaźnik „Wiedza 0 na 100” |
| W trakcie | „Kontynuuj lekcję” + bieżąca lekcja | Lekcje „3 z 44”, Scenariusze „Poziom: średni (auto)” (KO-039), Powtórki „7 na dziś” |
| Wszystko zrobione | „Kurs ukończony” + `today.courseDone` | jak w trakcie, Lekcje „44 z 44” |
| Limit wyczerpany | bez zmian (lekcje bez limitu) | Sesja ćwiczeń i Scenariusze: stan „Darmowa jutro”, tło przezroczyste, obwódka kreskowana (nie tylko kolor); pod kafelkami „Dzienny limit wykorzystany…” + link „Pełny dostęp” (BR-LIM-001; nazwa „dzienny limit”, D-111) |
| Pro | jak w trakcie, bez stanu limitu | — |
Stuknięcie kafelka w stanie limitu prowadzi do istniejącego ekranu startu aktywności z licznikiem (nie blokuje wejścia).

### Ekran „Lekcje” (D-542)
Duży tytuł „Lekcje”, licznik „3 z 44 lekcji” z paskiem postępu, lista grupowana 14 modułów (`content/pl/modules.yaml`) ze stanem „N z M” albo „Ukończony”; bieżący moduł rozwinięty (lekcje + „Egzamin modułu, 15 pytań”), pozostałe zwinięte, stuknięcie rozwija w miejscu (`accessibilityState.expanded`). Wiersz lekcji jak dziś (`etykietaWiersza`).

### Dostępność i języki
- VoiceOver: kafelek = przycisk z etykietą „{tytuł}. {stan}.”, ikony ukryte; plakietka: „Powtórki, 7 na dziś”; kolejność czytania = wizualna (sukno, kafelki wierszami).
- AX5: jedna kolumna; przy 390 pt wyraz „zaawansowania” łamie się w środku (`wzorce-zrzuty/menu/menu-dark-390-ax5.png`) — poza wyjątkiem D-122 (tylko 320 pt). Do roli 06/09: krótsza etykieta kafelka (np. „Twój poziom”) z pełną nazwą na ekranie docelowym `[DO USTALENIA]`.
- Najdłuższe etykiety (12 plików `apps/mobile/src/i18n/locales/`): de „Wiederholungen” na pasku, „Übungssession” / „Leistungsindex” w kafelkach mieszczą się przy 390 i 320 pt (ekrany `w1-de`, `w2-de`); nowe etykiety („Lekcje”, „Scenariusze”, stany kafelków) nie mają jeszcze kluczy — przekład rola 09, w makiecie de `[PRZYKŁAD]`.
- Kontrast nowych par: 32/32 OK (`kontrast-menu.txt`); granica kafelka (`surface`/sukno na `bg` w ciemnym) ma ok. 1,2–1,5:1 — informacyjnie, bo kontrolkę wyznacza tekst etykiety (WCAG 1.4.11 nie wymaga obwódki), tak jak komórki list iOS.

## Otwarte
- Etykieta kafelka „Wskaźnik zaawansowania” przy AX5 390 pt (wyżej).
- Ikony kafelków są rysunkami makiety (kreska 2 pt); rola 08 przenosi ścieżki do `react-native-svg`.
- W2: tytuł kafelka „Wskaźnik” (pełna nazwa łamała się w środku wyrazu przy 390 pt) — etykieta do roli 06/09.
- Pomiar mieszczenia się: `narzedzia/miesci-sie.mjs` (pasek stanu 20 pt i pasek zakładek 49 pt jak iPhone 375×667).
