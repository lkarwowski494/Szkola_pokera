# Recenzja niezależna: sesja AW (ocena poziomu: wybór na starcie, „Nie wiem”, układ stołu)

- Przedmiot: `sesja-aw-ocena` @ `31347bd21ac8c99765b2bf54b2186b1c4410053f` względem `128a08914074a91df27575df4f5c99596269bee8` (47 plików, +3195/−158; 7 commitów).
- Data: 2026-11-10. Recenzent: świeży kontekst, tylko odczyt i testy (worktree `rec-aw`, usunięty po recenzji).
- Wymaganie: BR-ONB-001, BR-ONB-004 (`docs/brd/wymagania-nauka.md`), D-475, D-476 (`docs/decyzje.md:324–325`).
- Próg: CLAUDE.md „Audyty i wydania” (blokują tylko KRYT/WYS).

**Uwaga do zlecenia:** „Nie wiem” NIE jest zapisywane jako `index −1`. Kod zapisuje w kolumnie `odpowiedz.wybor` JSON `{"nieWiem":true}`, `ocena='blad'`, `zaliczona=0` (`apps/mobile/src/features/ocena-poziomu/ocenaPoziomu.ts:108–111`), zgodnie z D-475. Żadna tablica opcji nie jest indeksowana przez −1 (dla `null` `gradeAnswer` nie jest wołane).

## Wynik: 0 KRYT, 0 WYS, 2 ŚR, 6 NIS

| ID | Waga | Plik:linia | Opis | Dowód | Proponowana naprawa |
|---|---|---|---|---|---|
| R-1 | ŚR | `packages/postep/src/statystyki.ts:28`; `apps/mobile/src/app/(tabs)/progress.tsx:35–41`; `ocenaPoziomu.ts:109–111` | Odpowiedzi oceny poziomu (teraz także każde „Nie wiem”) trafiają do `odpowiedz` z `rodzina_id` i `zaliczona=0`; `statystykiRodzin` nie filtruje po rodzaju aktywności, więc ekran „Postęp” po 8 × „Nie wiem” pokaże 8 odpowiedzi, 0% trafności, „najsłabsze” rodziny i dzień serii (`dniZOdpowiedzia`, l. 50–53). Mechanizm istniał dla błędnych odpowiedzi oceny (poza diffem), ale dawniej „Pomiń” nic nie zapisywało; teraz typowa ścieżka początkującego zaczyna naukę od 0%. Sprzeczne z komentarzem `ocenaPoziomu.ts:16–17` („Ocena nie … zmienia postępu”). Nie jest to utrata danych ani błąd punktu startu. | Odczyt kodu (zapytanie SQL bez `JOIN aktywnosc`/filtra); test autora potwierdza zapis: `PierwszeUruchomienie-08.test.tsx` „Nie wiem na każdym pytaniu” → `{n: 8, z: 0}` w `odpowiedz`. Wyglądu ekranu „Postęp” po ocenie nie uruchamiałem. | Decyzja produktowa (backlog): wykluczyć `ocena_poziomu` ze statystyk i serii (filtr w zapytaniu, ścieżka wrażliwa `packages/postep` → przegląd D-043) albo świadomie zostawić i zapisać decyzję. |
| R-2 | ŚR (do roli 04, nieblokujące) | `apps/mobile/src/components/Stol.tsx:45–46,56,65–70`; `features/stol/ukladRzedow.ts:25–39` | Zmiana wyglądu poza zgłoszeniem właściciela: `ukladRzedow` działa dla KAŻDEGO stołu bez miejsc (także `session.tsx:346,369`: lekcje, ćwiczenia, egzaminy). Board 5 + gracz 2: wysokość owalu 177→188 pt (390), 168→188 (375), 136→162 (320) i board md→sm (22×30 pt) na 320 pt; board 3 + gracz 2 na 320: 136→188. Stół z trzema rzędami jest wyższy niż szerszy (302×310 przy 390; 232×284 przy 320), więc „owal” (borderRadius 9999) staje się pionową kapsułą. Stoły jednorzędowe i 430 pt bez zmian. | Obliczenie funkcją `ukladRzedow` w jednorazowym teście (jest, usunięty): tabela w sekcji „Układ”. | Rola 04: makieta dla 2 i 3 rzędów (autor zgłosił AW-1 tylko dla 3 rzędów; dopisać, że zmienił się też układ 2 rzędów w lekcjach). |
| R-3 | NIS | `Stol.tsx:34,46,53` | Pierwsza klatka przed `onLayout` (`szerokosc=0`) rysuje stary układ (proporcja 1,7:1, przepełnienie), potem przeskok wysokości; w ocenie `EkranPytaniaOceny` ma `key={item.key}`, więc `Stol` montuje się na nowo przy każdym pytaniu ze stołem. | Odczyt kodu; na urządzeniu niesprawdzone. | `useWindowDimensions` jako wartość początkowa albo ukrycie kart do pomiaru. |
| R-4 | NIS | `PierwszeUruchomienie.tsx:122–125` vs `75–92` | „Przejdź test poziomujący” nie sprawdza `zapisWToku`; szybkie dotknięcie „Zacznij od początku”, potem „Przejdź test” uruchamia oba zapisy równolegle: możliwy `punkt_startu=M0` + nowa aktywność oceny `w_toku` i ekran zależny od kolejności zakończenia. Bez utraty danych (ocena poza limitem, kolejny start oceny porzuca starą). | Odczyt kodu; brak testu odtwarzającego (nie pisałem). | W `onTest`: `if (zapisWToku.current) return;` i ustawienie flagi na czas `zacznij()`. |
| R-5 | NIS | `ocenaPoziomu.ts:140–146` | `zacznijOdPoczatku`: zapis `punkt_startu` i porzucenie aktywności to dwie osobne operacje; błąd drugiej zostawia aktywność `ocena_poziomu` `w_toku` przy ukończonym starcie (ekran błędu → „Ponów” → „Dziś”). Ten sam wzorzec co istniejące `pominOcene` (l. 130–134). | Odczyt kodu. | Jedna transakcja w `packages/postep` (ścieżka wrażliwa) albo backlog. |
| R-6 | NIS | `docs/programista/dowody/aw-ci-2026-11-10.log` | Log CI kończy się `KOD 0` (l. 2763; jest 608/608, l. 1216), ale nie zawiera identyfikatora commita i był uruchomiony w `/home/user/Szkola_pokera` (l. 1), nie w czystym klonie; log jest częścią 31347bd, więc co najwyżej dotyczy 9051165 + zmiany robocze. Związku z konkretnym commitem nie da się potwierdzić z pliku. | `head -5`, `tail -25`, `grep -n "commit\|9051165\|31347bd"` → 0 trafień. | Dopisywać `git rev-parse HEAD` i `git status --short` na początku logu. |
| R-7 | NIS | `docs/lokalizacja/lista-telefonu-en.md` (ostatni punkt sekcji AW) | Punkt listy telefonu „Ustawienia → ponowna ocena (BR-ONB-003): działa jak dotąd” odsyła do funkcji, której wejścia w aplikacji nie znalazłem (`grep` po `zacznijOcene`/`EkranPytaniaOceny` poza `PierwszeUruchomienie`: 0; `BR-ONB-003` tylko w `packages/domena/src/kurs.ts`). Właściciel nie będzie miał czego sprawdzić. | `grep -rn` jak wyżej. | Usunąć punkt albo wskazać ekran. |
| R-8 | NIS | `ocenaPoziomu.ts:17,129–134`; `__tests__/ocenaPoziomu-08.test.ts` („Pomiń na powitaniu…”) | Pozostałości nazwy „Pomiń”: `pominOcene` wołane już tylko z `null` (treść bez pytań), komentarz l. 17, nazwy testów. | Odczyt kodu. | Porządki przy okazji. |

## Punkty kontrolne

1. **Dane użytkownika.** Diff nie dotyka żadnej ścieżki wrażliwej z CLAUDE.md (`git diff --name-only` filtrowane po `packages/postep|domena`, `src/data|platform`, `ochrona-tla`, `schemat.sql`, `tools/content-build`, `.github/workflows`, `app.json`, `eas.json` → pusto). Zapis: `ocenaPoziomu.ts:108–111` (`{"nieWiem":true}`), kolumna `wybor TEXT CHECK (json_valid)` (`packages/postep/src/schemat-v1.ts:56`) — bez migracji, potwierdzam. Eksport/import: `wybor` walidowane tylko jako tekst (`packages/postep/src/daneUzytkownika.ts:17`), brak parsowania treści JSON w `packages/postep/src`, `packages/domena/src` (`grep JSON.parse` → tylko plan, ustawienia, plik eksportu). Jedyny parser `wybor` (`features/session/aktywnoscSesji.ts:148–163`) obsługuje wznowienie sesji/lekcji; ocena poziomu nie jest wznawiana (po D-475 zawsze nowa), a dla nieznanego kształtu zwraca `null` → nowa aktywność, nie wyjątek. Stare wiersze `{"answer":{…}}` czytają się bez zmian (`wierszOdpowiedzi`, `aktywnosci.ts:143–152`). Powtórki: ocena nie tworzy kart (testy `COUNT(*) FROM karta = 0`). Statystyki: patrz R-1. Roundtrip eksport→import z wierszem `nieWiem` — nie uruchamiałem (ocena z kodu).
2. **Logika wyniku.** `null` → `ocenaSchematu('wrong')` → `blad`, `zaliczona 0` (l. 109); wynik: `punktStartuZOceny` (l. 53–56) bez dzielenia; same „Nie wiem” → M0 (test jednostkowy i ekranowy); „Nie wiem” w M3 przy reszcie poprawnej → M3. „Zacznij od początku” → `punkt_startu=M0`, przerwana ocena porzucona (test). Przerwana ocena → ekran wyboru (`etapStartu`, l. 62–68).
3. **Testy.** Zmienione oczekiwania są uzasadnione nowym wymaganiem (D-475): `etapStartu` „ocena”→„powitanie”, „jeden przycisk”→„dwa przyciski”, „Pomiń”→„Nie wiem”/„Zacznij od początku”; usunięty scenariusz „Pomiń z pytania” zastąpiony testem „Zacznij od początku” i asercją braku „Pomiń”. Osłabienia nie stwierdziłem. `npx jest src/features/ocena-poziomu src/features/stol src/features/powitanie src/components` → 18 zestawów, 116 testów, kod 0. `vitest run --root tests/kontrole k11` → 14/14, kod 0. `node --test tests/narzedzia/asc.test.mjs tests/narzedzia/e2e-flowy.test.mjs` → 30/0, kod 0. `pnpm i18n:kod` → błędy 0, kod 0.
4. **Układ** (z kodu, pole = ekran − 32 pt; „przed” = floor(szer./1,7)):

| ekran | rzędy (rywal/board/gracz) | wys. przed | wys. po | karty | szer. owalu |
|---|---|---|---|---|---|
| 320 | 2/5/2 | 136 | 284 | md/sm/lg | 232 |
| 390 | 2/5/2 | 177 | 310 | md/md/lg | 302 |
| 320 | 0/5/2 | 136 | 162 | –/sm/lg | 232 |
| 390 | 0/5/2 | 177 | 188 | –/md/lg | 302 |
| 320 | 0/3/2 | 136 | 188 | –/md/lg | 232 |
| 430 | 0/5/2 | 201 | 201 | –/md/lg | 342 |

Trzy rzędy mieszczą się w wysokości i szerokości sukna przy 320 i 390; sprawdziłem też zaokrąglenie kapsuły: przy 320 karty gracza (110 pt) mają ok. 1 pt zapasu do wewnętrznego łuku na dolnej krawędzi (cięciwa ok. 112 pt), przy 390 zapas ok. 10 pt na stronę. Tekst pod stołem jest następnym elementem kolumny (`Stol.tsx:77–86`), a owal ma jawną wysokość ≥ treści, więc nie jest zasłaniany. Największa czcionka: podpisy rzędów i karty mają `allowFontScaling={false}` (`Stol.tsx:95`, `PlayingCard.tsx:39–40`), wysokość owalu nie zależy od ustawienia tekstu. Stałe `ukladRzedow.ts:10–12` zgodne z `PlayingCard.tsx:11–14,47`, `PODPIS=21` zgodne z `tokeny.ts:173`. Inne ekrany: R-2.
5. **i18n.** 12 języków (de, en, es, fr, it, ja, ko, pl, pt, pt-BR, vi, zh-Hant) + `pl.kontekst.json`: `welcome.next`, `welcome.takeTest`, `welcome.startFresh`, `placement.dontKnow` obecne, niepuste, różne od pl i en, `{{n}}` i `{{min}}` w każdym `welcome.next`; `welcome.continue` i `placement.skip` usunięte wszędzie i nieużywane w kodzie, flowach ani skryptach (`grep` → 0). Jakości przekładów nie oceniał native speaker.
6. **Sklep i wydanie.** `store/review-notes.*`: etykiety równe `en.json` (test `asc.test.mjs` zielony), treść zgodna z zachowaniem. Opis sklepu „skippable”/„możesz ją pominąć” pozostaje prawdziwy („Zacznij od początku”). Flowy Maestro: teksty przycisków zgodne z `pl.json`/`en.json`, `option-0` istnieje (`EkranyOceny.tsx:42`), zmienna `OD_POCZATKU_EN` zdefiniowana w `helplines-env.mjs`; `DALEJ_EN`/`POMIN_EN` bez pozostałych użyć.
7. **Autor i sekrety.** Wszystkie 7 commitów: `Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>`. Wyszukiwanie wzorców sekretów i prywatnych adresów w diffie i logu CI: 0 trafień.

## Mutacje (kod produkcyjny; po każdej `git checkout`; `git status` na końcu czysty)

| # | Mutacja | Wynik |
|---|---|---|
| M1 | „Nie wiem” liczone jako poprawne (`ocenaSchematu('correct')`) | wykryta: 3 testy padły, kod 1 |
| M2 | usunięty przycisk „Nie wiem” (`EkranyOceny.tsx`) | wykryta: 10, kod 1 |
| M3 | `Stol.tsx`: bez wysokości z układu (stała proporcja) | wykryta: 2, kod 1 |
| M4 | `ukladRzedow`: wysokość tylko z proporcji 1,7:1 | wykryta: 5, kod 1 |
| M5 | `zacznijOdPoczatku` nie porzuca przerwanej oceny | wykryta: 1, kod 1 |
| M6 | `EkranPowitania`: „Przejdź test” woła `onOdPoczatku` | wykryta: 5, kod 1 |
| M7 | zapis „Nie wiem” jako `{answer:{kind:'choice',index:-1}}` | wykryta: 1, kod 1 |
| M8 | `ukladRzedow`: bez zmniejszania kart (zawsze rozmiar preferowany) | wykryta: 1, kod 1 |

## Niesprawdzone

- Pełne `pnpm run ci` (zgodnie ze zleceniem); typecheck osobno nie uruchamiany.
- Render na urządzeniu/symulatorze, zrzuty, VoiceOver, faktyczny wygląd przy największej czcionce (ocena tylko z kodu); flowy Maestro nie uruchamiane.
- Roundtrip eksport → import z odpowiedzią `{"nieWiem":true}` (ocena z kodu walidacji, bez uruchomienia).
- Wygląd ekranu „Postęp” po ocenie z „Nie wiem” (R-1 z kodu zapytań).
- Wyścig R-4 (bez testu odtwarzającego).
- Jakość językowa 11 przekładów; zgodność `store/app-store-metadata.json` w językach innych niż pl/en.
- Czy log CI dotyczy 9051165/31347bd (R-6).
- `docs/programista/plan-08.md` i pozostałe zmiany dokumentacji poza BRD/decyzjami/sklepem — tylko przejrzane w diffie.

## Werdykt

**Przyjąć.** Brak znalezisk KRYT/WYS; dane użytkownika bezpieczne, migracja niepotrzebna, testy nieosłabione i wykrywają 8/8 mutacji. Do backlogu z przypisaną wersją: R-1 (decyzja o statystykach oceny), R-2 i R-3 (rola 04: układ 2 i 3 rzędów, przeskok), R-4, R-5, R-6, R-7, R-8. Przed wydaniem: pozycje listy telefonu (wąski ekran, największy tekst).
