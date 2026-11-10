# Menu główne kafelkowe i zębatka ustawień (sesje BE i BH)
Rola 04, build, 2026-11-10. Wejście: KO-036 (zębatka), KO-041 (menu z kafelkami, słowa właściciela: „przerobić menu główne i jakoś to popakować w kafelki żeby z menu wchodziło się do funkcji a nie długa lista”), KO-045 (wybór: „W2 + Wskaźnik w Postępie”). Decyzje: D-540–D-542, D-546 (`docs/decyzje.md`); errata BR-MENU-001: ER-16 (`docs/brd/errata.md`). Uzupełnia `design-spec.md`; kod: rola 08, wyłącznie z tokenów.

## Pliki
| Co | Plik |
|---|---|
| Makieta: Dziś × stany (w trakcie, nowy, ukończone, limit), de (najdłuższe etykiety), zakładka „Lekcje”, Postęp (w trakcie, nowy) | `ekrany/menu.html` + `ekrany/menu.css` (generuje `narzedzia/menu-makieta.mjs`) |
| Zrzuty końcowe: Dziś 390 jasny i ciemny, 320 AX5; Postęp 390 ciemny | `wzorce-zrzuty/menu/koncowy-dzis-390-light.png`, `koncowy-dzis-390-dark.png`, `koncowy-dzis-320-ax5.png`, `koncowy-postep-390-dark.png` |
| Arkusze wszystkich ekranów: 390 jasny i ciemny, 320 jasny, AX5 320 jasny i 390 ciemny | `wzorce-zrzuty/menu/menu-*.png` |
| Historia wyboru (W1/W2 @ be3d801) | `wzorce-zrzuty/menu/porownanie-w1-w2-light.png`, `-dark.png` |
| Makieta zębatki przed/po | `ekrany/zebatka.html`; zrzuty `wzorce-zrzuty/menu/zebatka-*.png`; pomiar `narzedzia/zebatka-pomiar.mjs` |
| Mieszczenie bez przewijania 375×667 | `miesci-sie-menu.txt` (`narzedzia/miesci-sie.mjs`), kod 0 |
| Przepełnienie 320/390/430 × domyślny/AX5 | `przepelnienie-menu.txt` (`narzedzia/przepelnienie.mjs`), kod 0 |
| Kontrast par menu (4 warianty palety) | `kontrast-menu.txt` (wejście `narzedzia/kontrast-menu.json`), kod 0 |
| Powtórki przy pustej kolejce (BI-002, sesja BY): przed i opcje A, B, C | `ekrany/powtorki-pusta.html` + `ekrany/powtorki-pusta.css` (generuje `narzedzia/powtorki-pusta-makieta.mjs`); arkusze `wzorce-zrzuty/powtorki-pusta/`; kontrast `kontrast-powtorki-pusta.txt` (kod 1 tylko przez pary opcji B); wiersze `wiersze-powtorki-pusta.txt` |

## Zębatka (KO-036, D-540)
- Dziś (`apps/mobile/src/app/(tabs)/index.tsx:84-88`): znak tekstowy „⚙︎” 17 pt, kolor `ink`, `hitSlop` 12, skala do 1,4. Para kolorów `ink`/`bg` ma 15,49:1 (jasny) i 15,67:1 (ciemny), więc paleta nie jest przyczyną; ikona ginie, bo znak ma cienką kreskę i mały rozmiar (antyaliasing zjada kontrast krawędzi).
- Po: rysunek zębatki 24×24 pt (ścieżka w `narzedzia/menu-makieta.mjs`, `ZEBATKA`, + koło r 3,6), kreska 2 pt, `stroke-linejoin: round`, kolor `ink`, przycisk 44×44 pt (prawy górny róg, wyrównany do marginesu), `accessibilityRole="button"`, `accessibilityLabel={t('settings.title')}` („Ustawienia”), bez `hitSlop` (cel ma pełny rozmiar). Rysunek ma stały rozmiar (jak ikony paska nawigacji iOS); przy dużym tekście nie rośnie.
- Pomiar (render @3x, Chromium; „przed” krojem DejaVu jako zastępstwo znaku iOS, więc to przybliżenie): pikseli z kontrastem ≥ 3:1 do tła — jasny 549 → 1964, ciemny 591 → 1982 (×3,4–3,6); cel dotyku 44×44 pt po (przed: ok. 17 pt + 2×12 pt `hitSlop`). Kontrast barw ≥ 3:1 we wszystkich 4 wariantach (`kontrast-menu.txt`).
- Wdrożenie (rola 08, D-546): `react-native-svg` (`<Svg viewBox="0 0 24 24"><Path d=… /><Circle cx=12 cy=12 r=3.6 /></Svg>`, `fill="none"`, `stroke={tk.ink}`, `strokeWidth={2}`) — ta sama biblioteka obsłuży ikony kafelków niżej. Analogia: Trening rysuje ikony przez `react-native-svg` (`package.json:64`, `components/TabIcon.tsx`; odczyt 2026-11-10 @ 2e4b0f8).

## Menu główne: układ końcowy (KO-045, D-541)
Wymagania: BR-MENU-001…003 (`docs/brd/wymagania-scenariusze.md`, D-535) z erratą ER-16 (lekcje z zakładki, bez kafelka). Podział: **Dziś** = czynności dnia, **Lekcje** = kurs jednym dotknięciem z paska, **Postęp** = wyniki.
- **Nawigacja:** zębatka w prawym górnym rogu (D-540), duży tytuł „Dziś”.
- **„Kontynuuj”:** szeroki kafelek na suknie (element firmowy D-118, ramka `frame` 8 pt, promień 22): miejsce w kursie („Matematyka podstawowa, lekcja 2”), tytuł lekcji krojem tytułów, przycisk „Kontynuuj lekcję” (karta `card`/`card-ink`, ≥ 44 pt). Cały kafelek jest jednym przyciskiem z etykietą „{akcja}: {tytuł}. {miejsce}.”.
- **Kafelki pod spodem (2 kolumny):** Powtórki („7 na dziś”), Sesja ćwiczeń („Decyzje z oceną i wyjaśnieniem”), Scenariusze („Poziom: średni (auto)”, KO-039). Trzeci, nieparzysty kafelek zajmuje pełną szerokość (bez osieroconej połówki wiersza). Kafelek: tło `surface`, promień 14, ikona 22 pt w wierszu tytułu (przy dużym tekście nad tytułem), tytuł 17 pt semibold, stan 13–15 pt `muted`; etykieta „{tytuł}. {stan}.”. Przy dużym tekście jedna kolumna.
- **Pasek zakładek:** Dziś · Lekcje · Postęp, bez plakietki (liczba powtórek jest na kafelku; dwa miejsca tej samej liczby to szum). Dawna zakładka „Powtórki” znika: kolejka powtórek otwiera się z kafelka.
- **Postęp:** Wskaźnik zaawansowania jako pierwszy element ekranu, wygląd jak dzisiejszy `AdvancementCard` (plakietka z liczbą, „Wskaźnik zaawansowania”, „Wiedza N”, ›; `progress.tsx:45-46`); z ekranu „Dziś” `AdvancementCard` znika (`index.tsx`, rola 08). Przy AX5 karta przechodzi w pionowy stos (plakietka nad tytułem, bez szewronu).
- **Mieści się na 375×667 (`miesci-sie-menu.txt`, kod 0):** w trakcie 505 pt, limit 514 pt, de 545 pt (limit 667).
- Odrzucone (D-541): W1 (sukno + 4 kafelki + wiersz Wskaźnika, pasek bez zmian), W2 ze Wskaźnikiem na „Dziś” (be3d801), v2 z kafelkami Lekcje i Ustawienia (a45979d).

### Stany (makieta: `dzis-*`, `postep*`)
| Stan | „Kontynuuj” | Kafelki |
|---|---|---|
| Nowy (po ocenie poziomu) | „Zacznij lekcję”, Zasady i układy, lekcja 1 „Układy kart” | Powtórki „Po pierwszej lekcji”; Scenariusze „Po pierwszej lekcji modułu 2” (BR-MENU-001: co odblokuje; scenariusze od M2, D-536); Postęp: Wskaźnik „0”, „Zrób pierwsze ćwiczenia…” (`progress.noData`) |
| W trakcie | „Kontynuuj lekcję” + bieżąca lekcja | Powtórki „7 na dziś”, Scenariusze „Poziom: średni (auto)” |
| Wszystko zrobione | „Kurs ukończony” + `today.courseDone` (bez przycisku) | Powtórki „3 na dziś”, Scenariusze „Poziom: trudny (auto)” |
| Limit wyczerpany | bez zmian (lekcje bez limitu) | Sesja ćwiczeń i Scenariusze: stan „Darmowa jutro”, tło przezroczyste, obwódka kreskowana (nie tylko kolor); pod kafelkami „Dzienny limit wykorzystany…” + link „Pełny dostęp” (BR-LIM-001; nazwa „dzienny limit”, D-111) |
| Pro | jak w trakcie, bez stanu limitu | — |
Stuknięcie kafelka w stanie limitu prowadzi do istniejącego ekranu startu aktywności z licznikiem (nie blokuje wejścia). Wyjątek: Powtórki przy 0 na dziś (sekcja niżej).

### Powtórki przy pustej kolejce (BI-002, sesja BY; D-685 warunkowa do odpowiedzi właściciela)
Problem (kod @ 70fdf40): kafelek „Po pierwszej lekcji” / „Brak na dziś” prowadzi na ekran startu z licznikiem i przyciskiem „Zacznij”. Dopiero po „Zacznij” użytkownik widzi pusty stan. Przy wyczerpanym limicie ekran startu pokazuje „Pełny dostęp” i „Wróć do lekcji”, czyli zakup, choć nie ma czego odblokować. Limit nie przepada, bo pusty zestaw niczego nie zapisuje (`apps/mobile/src/features/session/aktywnoscSesji.ts:61-62`). Makieta: `ekrany/powtorki-pusta.html` (generuje `narzedzia/powtorki-pusta-makieta.mjs`); arkusze: `wzorce-zrzuty/powtorki-pusta/arkusz-390-light.png`, `-390-dark.png`, `-320-light-ax5.png`, `-390-szarosc.png`; kontrast: `kontrast-powtorki-pusta.txt`.

**Przejście (opcja A, rekomendowana):**
| Stan przy stuknięciu kafelka | Ekran |
|---|---|
| Aktywność powtórek w toku | wznowienie, bez zmian (pierwszeństwo przed resztą) |
| N > 0 na dziś, limit dostępny albo Pro | ekran startu z licznikiem, bez zmian |
| N > 0 na dziś, limit wyczerpany | ekran startu z „Masz N powtórek… niczego nie stracisz” i „Pełny dostęp”, bez zmian (BR-LIM-004) |
| **0 na dziś, są karty** (każdy stan limitu, także Pro) | **od razu pusty stan:** tytuł „Powtórki”, „Na dziś nie masz powtórek.” (`styl.naglowek`), „Następna powtórka: {kiedy}” (`styl.tresc`), przycisk „Zamknij”. Bez licznika i bez „Pełny dostęp” |
| **0 na dziś, brak kart** (nic jeszcze nie odpowiedziane) | **od razu pusty stan:** „Powtórki pojawią się po pierwszej lekcji.” (`styl.naglowek`), „Zadania z lekcji wracają tu w odstępach, a te z błędem wcześniej.” (`styl.tresc`, `muted`), „Zamknij” |

- Wariant pustego stanu zależy od istnienia kart, nie od ukończonych lekcji: karta powstaje przy pierwszej odpowiedzi w dowolnej aktywności (`apps/mobile/src/features/session/aktywnoscSesji.ts:113`), więc ktoś bez ukończonej lekcji może już mieć termin.
- {kiedy}: najwcześniejszy `termin_ms` > teraz. Ten sam dzień lokalny: „dziś o {godzina}”. Następny dzień: „jutro o {godzina}”. Później: dzień i miesiąc z `Intl.DateTimeFormat(język, { day: 'numeric', month: 'long' })`, np. „14 listopada”. Godzina z `godzinaWStrefie` (`EkranStartu.tsx`). Kafelek dalej liczy „na dziś” jako termin ≤ teraz, więc „dziś o 18:40” jest możliwe (kroki nauki FSRS).
- Kafelek bez zmian: aktywny, stan „Brak na dziś” / „Po pierwszej lekcji”, etykieta „{tytuł}. {stan}.”. Jak Scenariusze „wkrótce”: każdy kafelek prowadzi do ekranu, który mówi, co dalej.
- VoiceOver: tytuł „Powtórki” jako nagłówek; czytanie w kolejności wizualnej; „Zamknij” jako przycisk (ekran to `fullScreenModal` bez gestu, `apps/mobile/src/app/_layout.tsx:179`, więc przycisk zostaje jedynym wyjściem).
- Teksty pl (system 04, głos `design-spec.md` „Głos”; przekład 12 języków: rola 09):
  | Klucz | pl | Stan |
  |---|---|---|
  | `review.emptyToday` | Na dziś nie masz powtórek. | nowy (pierwsze zdanie wzoru `docs/design/design-spec.md:68`) |
  | `review.next` | Następna powtórka: {{when}} | istniejący, dziś nieużywany |
  | `review.whenToday` | dziś o {{godzina}} | nowy |
  | `review.whenTomorrow` | jutro o {{godzina}} | nowy |
  | `review.emptyNew` | Powtórki pojawią się po pierwszej lekcji. | nowy |
  | `review.emptyNewHint` | Zadania z lekcji wracają tu w odstępach, a te z błędem wcześniej. | nowy (BR-POW-001) |
  | `review.none` | Nic nie czeka na powtórkę. Zrób nową lekcję albo wróć później. | zostaje dla wznowienia z pustym zestawem (zmiana treści) |
- Wdrożenie (rola 08, po decyzji): w `app/session.tsx` `wejdz` dla `mode === 'review'`: przy `akcja === 'ekran_startu'` i 0 kart z terminem ≤ teraz zwróć stan pusty z najbliższym terminem zamiast `start`. Test: 0 na dziś × {limit dostępny, wyczerpany, Pro} × {są karty, brak kart} → brak `EkranStartu`, brak „Pełny dostęp”, tekst terminu. Flow Maestro 02 (dziś zakłada „Zacznij”) do dostosowania.

**Opcje odrzucone (do weta właściciela):**
- B, kafelek nieaktywny (`accessibilityState.disabled`, konwencja `Button` z przezroczystością 0,4): stan kafelka ma 2,0–3,2:1 przy progu 4,5:1 (`kontrast-powtorki-pusta.txt`). Wyjątek WCAG dla nieaktywnych kontrolek jest, ale ten tekst niesie informację. Stuknięcie nic nie daje, a terminu nie da się nigdzie pokazać. Trening nie wyłącza wejść nawigacyjnych (D-685).
- C, A + termin na kafelku („Brak na dziś, następna jutro”): termin bez stuknięcia, najbliżej Treningu („Następne: …”, Trening `components/TodayPlan.tsx:89`). Odstępstwo od Treningu, nazwane: zmienia zatwierdzony stan kafelka (D-541), wnosi format daty w 12 językach na ekran główny i wydłuża stan kafelka z 1 do 2 wierszy przy 320 i 390 pt, domyślnie i przy AX5 (`wiersze-powtorki-pusta.txt`, `narzedzia/powtorki-pusta-wiersze.mjs`). U Treningu termin jest planem dnia, a powtórek użytkownik nie planuje, więc termin wystarczy jedno stuknięcie dalej.

### Ekran „Lekcje” (D-542)
Zakładka paska (KO-045; bez „‹ Dziś”). Duży tytuł „Lekcje”, licznik „3 z 44 lekcji” z paskiem postępu, lista grupowana 14 modułów (`content/pl/modules.yaml`) ze stanem „N z M” albo „Ukończony”; bieżący moduł rozwinięty (lekcje + „Egzamin modułu, 15 pytań”), pozostałe zwinięte, stuknięcie rozwija w miejscu (`accessibilityState.expanded`). Wiersz lekcji jak dziś (`etykietaWiersza`).

### Dostępność i języki
- VoiceOver: kafelek = przycisk z etykietą „{tytuł}. {stan}.”, ikony ukryte; karta wskaźnika: „Wskaźnik zaawansowania: 38 na 100. Wiedza 38.” + podpowiedź `advancement.openHint`; kolejność czytania = wizualna (Kontynuuj, kafelki wierszami).
- AX5: jedna kolumna; tytuł kafelka, który nie mieści się obok ikony, przechodzi pod nią w całości (RN `flexWrap`). Pomiar `przepelnienie-menu.txt` (kod 0, nic nie wystaje; łamanie wyrazów jako INFO). Łamanie w środku wyrazu poza wyjątkiem D-122 (320 pt): przy AX5 na 390 i 430 pt — „zaawansowania” (karta wskaźnika na Postępie), de „Wiederholungen”, „Übungssession”, „Leistungsindex”, „Einstellungen”, na ekranie „Lekcje” „Matematyka podstawowa”, „Eksploatacja mikrostawek”; przy tekście domyślnym tylko de „Bewertung” w stanie kafelka Sesja ćwiczeń (13 pt). Znalezisko ŚREDNIE (nie blokuje): krótsze etykiety kafelków (06/09) i sprawdzenie dzielenia wyrazów w RN (D-122, `[DO USTALENIA]` rola 08).
- Najdłuższe etykiety (12 plików `apps/mobile/src/i18n/locales/`): de „Wiederholungen” na pasku, „Übungssession” / „Leistungsindex” w kafelkach mieszczą się przy 390 i 320 pt (ekran `dzis-de`); nowe etykiety („Lekcje”, „Scenariusze”, stany kafelków) nie mają jeszcze kluczy — przekład rola 09, w makiecie de `[PRZYKŁAD]`.
- Kontrast nowych par: 32/32 OK (`kontrast-menu.txt`); granica kafelka (`surface`/sukno na `bg` w ciemnym) ma ok. 1,2–1,5:1 — informacyjnie, bo kontrolkę wyznacza tekst etykiety (WCAG 1.4.11 nie wymaga obwódki), tak jak komórki list iOS.

## Otwarte
- Tytuł „Wskaźnik zaawansowania” na Postępie łamie się w środku wyrazu przy AX5 (390, 430 pt) — ŚREDNIE, jak wyżej.
- Ikony kafelków są rysunkami makiety (kreska 2 pt); rola 08 przenosi ścieżki do `react-native-svg`.
- Pomiar mieszczenia się: `narzedzia/miesci-sie.mjs` (pasek stanu 20 pt i pasek zakładek 49 pt jak iPhone 375×667).
