# Menu główne kafelkowe i zębatka ustawień (sesja BE, część A)
Rola 04, build, 2026-11-10. Wejście: KO-036 (zębatka), KO-041 (menu z kafelkami, słowa właściciela: „przerobić menu główne i jakoś to popakować w kafelki żeby z menu wchodziło się do funkcji a nie długa lista”). Decyzje: D-540–D-542 (`docs/decyzje.md`). Uzupełnia `design-spec.md`; kod: rola 08, wyłącznie z tokenów.

## Pliki
| Co | Plik |
|---|---|
| Makieta: W1 i W2 × stany (w trakcie, nowy, ukończone, limit), de (najdłuższe etykiety), ekran „Lekcje” | `ekrany/menu.html` + `ekrany/menu.css` (generuje `narzedzia/menu-makieta.mjs`) |
| Makieta zębatki przed/po | `ekrany/zebatka.html` |
| Porównanie W1/W2 (w trakcie + limit) | `wzorce-zrzuty/menu/porownanie-w1-w2-light.png`, `-dark.png` |
| Arkusze: 390 i 320 jasny, 390 ciemny, AX5 320 jasny i 390 ciemny, skala szarości, ciemny + zwiększony kontrast | `wzorce-zrzuty/menu/menu-*.png` |
| Zębatka przed/po | `wzorce-zrzuty/menu/zebatka-light.png`, `zebatka-dark.png`; pomiar `narzedzia/zebatka-pomiar.mjs` |
| Kontrast nowych par (4 warianty palety) | `kontrast-menu.txt` (wejście `narzedzia/kontrast-menu.json`), kod 0 |

## Zębatka (KO-036, D-540)
- Dziś (`apps/mobile/src/app/(tabs)/index.tsx:84-88`): znak tekstowy „⚙︎” 17 pt, kolor `ink`, `hitSlop` 12, skala do 1,4. Para kolorów `ink`/`bg` ma 15,49:1 (jasny) i 15,67:1 (ciemny), więc paleta nie jest przyczyną; ikona ginie, bo znak ma cienką kreskę i mały rozmiar (antyaliasing zjada kontrast krawędzi).
- Po: rysunek zębatki 24×24 pt (ścieżka w `narzedzia/menu-makieta.mjs`, `ZEBATKA`, + koło r 3,6), kreska 2 pt, `stroke-linejoin: round`, kolor `ink`, przycisk 44×44 pt (prawy górny róg, wyrównany do marginesu), `accessibilityRole="button"`, `accessibilityLabel={t('settings.title')}` („Ustawienia”), bez `hitSlop` (cel ma pełny rozmiar). Rysunek ma stały rozmiar (jak ikony paska nawigacji iOS); przy dużym tekście nie rośnie.
- Pomiar (render @3x, Chromium; „przed” krojem DejaVu jako zastępstwo znaku iOS, więc to przybliżenie): pikseli z kontrastem ≥ 3:1 do tła — jasny 549 → 1964, ciemny 591 → 1982 (×3,4–3,6); cel dotyku 44×44 pt po (przed: ok. 17 pt + 2×12 pt `hitSlop`). Kontrast barw ≥ 3:1 we wszystkich 4 wariantach (`kontrast-menu.txt`).
- Wdrożenie (rola 08): `react-native-svg` (`<Svg viewBox="0 0 24 24"><Path d=… /><Circle cx=12 cy=12 r=3.6 /></Svg>`, `fill="none"`, `stroke={tk.ink}`, `strokeWidth={2}`) — ta sama biblioteka obsłuży ikony kafelków niżej. Analogia: Trening rysuje ikony przez `react-native-svg` (`package.json:64`, `components/TabIcon.tsx`; odczyt 2026-11-10 @ 2e4b0f8).

## Menu główne: dwa warianty (KO-041, D-541, wybór właściciela)
Wspólne: sukno z następną lekcją zostaje elementem firmowym (D-118); pod nim kafelki funkcji 2 kolumny (`minmax(136 pt × skala treści)`), przy dużym tekście jedna kolumna; długa lista lekcji schodzi na ekran „Lekcje”. Kafelek: tło `surface`, promień 14, min. 112 pt wysokości, ikona 28 pt kreska 2 pt, tytuł 17 pt semibold, stan 15 pt `muted`; cały kafelek jest jednym przyciskiem z etykietą „{tytuł}. {stan}.”.

| | W1 „Sukno + 4 kafelki” (rekomendacja) | W2 „Wszystko kafelkami” |
|---|---|---|
| Ekran Dziś | sukno w pełnym rozmiarze + kafelki: Lekcje, Scenariusze, Sesja ćwiczeń, Wskaźnik zaawansowania | „Kontynuuj” jako szeroki kafelek na suknie (niższy, bez podtytułu) + kafelki: Powtórki, Sesja ćwiczeń, Scenariusze, Wskaźnik |
| Pasek zakładek | bez zmian: Dziś · Powtórki · Postęp; liczba powtórek na dziś jako plakietka zakładki | Dziś · Lekcje · Postęp; Powtórki tylko jako kafelek z liczbą |
| Najmocniejszy argument | najmniejsza zmiana nawyku i testów (identyfikatory zakładek bez zmian), największe sukno = najsilniejsza tożsamość | lekcje (rdzeń kursu, 44) zawsze jednym dotknięciem z każdego miejsca; Dziś bez duplikatu z paskiem |
| Koszt dla 08/07 | nowy ekran „Lekcje”, kafelki, plakietka zakładki | jak W1 + zmiana paska (flowy E2E z `zakladka-powtorki`) |

Rekomendacja W1, bo funkcja: najczęstsza czynność (następna lekcja) zostaje największym elementem, wszystkie funkcje są o jedno dotknięcie od Dziś, a powtórki nadal mają własną zakładkę z licznikiem — bez nowego nawyku. Analogia Trening: ekran główny = jedna duża akcja + kafelki prowadzące dalej (`app/(tabs)/index.tsx:43-53`), rzadziej używane funkcje zeszły piętro niżej (`docs/22-przeplywy-i-nawigacja.md:292-305`).

### Stany (makieta: `w1-*`, `w2-*`)
| Stan | Sukno / pierwszy kafelek | Kafelki |
|---|---|---|
| Nowy (po ocenie poziomu) | „Zacznij lekcję”, Zasady i układy, lekcja 1 „Układy kart” | Lekcje „0 z 44 lekcji”; Scenariusze „Rozdanie od preflopu do rivera”; Powtórki (W2) „Po pierwszej lekcji”; Wskaźnik „Wiedza 0 na 100” |
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
- Kafelek Scenariusze zależy od treści scenariuszy (D-255, KO-035); do tego czasu ukryty, siatka 3 kafelków (W1: Wskaźnik na pełną szerokość).
