# Szkoła Pokera: zasady pracy dla Claude

Ten plik obowiązuje w każdej sesji pracującej na tym repozytorium. Zasady poniżej mają pierwszeństwo przed domyślnym sposobem pracy, a w sprawach treści pokerowej także przed ogólną preferencją właściciela „zawsze przedstaw opcje i zostaw decyzję człowiekowi”.

## Stan projektu (aktualizacja: 2026-11-04, role 01–04 gotowe (kontrakt D-112, poprawki D-113, projekt D-118–D-123: `docs/design/design-spec.md`); rola 05 gotowa (architektura D-124–D-130: `docs/architektura/README.md`, `docs/adr/`); następna rola 09, potem 06)
- Etap: w budowie, przebudowa „prawie od nowa” (sztafeta ról 01–05, `docs/sztafeta.md`); TestFlight tylko testy wewnętrzne (buildy 1005–1008), poza właścicielem brak użytkowników i ich danych.
- Sklep: App Store Connect częściowo (aplikacja do TestFlight, umowa Paid Apps podpisana); Google Play: nic.
- Rynek główny: US; kolejne: JP, CA, GB, BR, FR, TW, VN, DE; **bez storefrontu PL** (decyzja właściciela 2026-11-03, art. 29 u.g.h.), pozostałe storefronty wszystkie (OP-15, 2026-11-03); opinia prawna art. 29: nie teraz (OP-13) · repo treści prywatnych: brak.
- Standard marki: wysoki (bez reklam i SDK śledzących).
- Próg opłacalności: 500 USD netto/rok globalnie; wynik bramki: `docs/monetyzacja.md` („budować”, słaby dowód).
- Model i cena: kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD (decyzja właściciela 2026-11-03, zastępuje 0,99/6,99/14,99); aplikacja poza oficjalnym portfelem Apps4brew, osobna strona z materiałami później.
- Polityka języków: szeroka, 35 jak Trening (zastępuje ADR-14 „Polski na start”), w tym pl.
- Przegląd treści krytycznych: zastępczy (D-027 biblioteki; decyzja właściciela 2026-11-03); przegląd eksperta, gdy aplikacja zyska użytkowników.
- BRD: `docs/brd/` w repo, skrót na Dysku (decyzja właściciela 2026-11-03); PRD „01 Wymagania” na Dysku to wejście historyczne.
- Cel: monetyzacja; „Tam nie ma być hazardu. Pełna nauka w 35 językach jak trening.” (właściciel, 2026-11-03).

## Delegacja decyzji (decyzja właściciela 2026-11-03, obowiązuje do odwołania)
- Testy: agent testuje sam z kontrolami zastępczymi (opus/high); właściciel robi tylko testy na telefonie z listą kontrolną od agenta.
- Przed każdą decyzją (produktową, architektoniczną, logiki, techniczną, CI) i przed pytaniem do właściciela: najpierw sprawdź, jak to rozwiązano w Treningu (publiczne repo `lkarwowski494/trening`); jest — decyzja analogiczna, zapisana z odwołaniem (plik:linia, data odczytu); odstępstwo tylko nazwane i z powodem (decyzja właściciela 2026-11-07, D-191); wzory procesu decyzji także w Oczku i Piekarzu.
- Tymczasowo agent podejmuje decyzje produktowe na podstawie własnego researchu i swojej rekomendacji; właścicielowi zostaje kilka kluczowych decyzji produktowych. Każdą decyzję zapisz od razu z datą i odrzuconymi opcjami; właściciel może zawetować.
- Literatura: gdy potrzebna, agent podaje tytuły, właściciel próbuje je kupić.

## Kto o czym decyduje (ADR-24, decyzja właściciela z 4 października 2026)

Właściciel nie jest ekspertem od teorii pokera i **nie rozstrzyga kwestii merytorycznych**. Nie przedstawiaj mu opcji do wyboru w sprawach teorii (strategia, zakresy, rozmiary, częstotliwości, poziomy pewności reguł, brzmienie reguł). Rozstrzygaj je sam według metodologii poniżej, zapisz decyzję w rejestrze i poinformuj właściciela, co postanowiłeś i na jakiej podstawie. Właściciel może każdą decyzję zawetować.

Właściciel decyduje o sprawach **produktowych**: zakres i kolejność prac, nowe funkcje i typy ćwiczeń, wygląd, koszty, publikacja. Przy nich przedstaw co najmniej dwie opcje z kompromisami i rekomendacją.

### Hierarchia źródeł (wyższy szczebel wygrywa)

1. Rachunek: prawdopodobieństwo, pot odds, MDF, alpha, kombinatoryka, SPR; liczony w aplikacji i sprawdzony niezależnie.
2. Opublikowane wyniki solverów i rozwiązań równowagi z uznanych źródeł (komercyjne serwisy solverów publikujące rozwiązania, szkoły publikujące analizy solverów; lista z nazwami: dokument 03, ADR-24, uzupełnienie z 9.10.2026) oraz nasz solver tylko tam, gdzie przeszedł walidację (dokument 10 na Drive).
3. Książki uznanych autorów, czytane przez dostępne fragmenty, artykuły i wykłady autorów lub omówienia z cytatami: m.in. Chen i Ankenman „The Mathematics of Poker”, Janda „Applications of No-Limit Hold'em”, Acevedo „Modern Poker Theory”, Flynn, Mehta i Miller „Professional No-Limit Hold'em”, Brokos „Play Optimal Poker”, Tendler „The Mental Game of Poker”; turnieje: Harrington, „Kill Everyone”.
4. Materiały uznanych serwisów szkoleniowych (lista z nazwami: dokument 03, ADR-24, uzupełnienie z 9.10.2026).
5. Eksploatacja: tylko z danymi o populacji (próba, stawki, pokój). Bez nich nie ma reguły eksploatacyjnej.

### Zasady rozstrzygania

- Każde twierdzenie w aplikacji ma **przeczytane** źródło (adres i cytat). Streszczenie z wyszukiwarki nie jest źródłem. Czego nie da się przeczytać, to nie trafia do aplikacji, tylko do otwartych pytań.
- Sprzeczność na tym samym szczeblu: ucz części wspólnej („zwykle”, przedział obejmujący źródła) albo uznaj oba zagrania za poprawne (ręka mieszana, ADR-04).
- Uproszczenie dydaktyczne wolno stosować, gdy kierunkowo zgadza się z wynikami solverów i jest nazwane uproszczeniem. Nie wolno uczyć zasady sprzecznej ze szczeblami 1–2.
- Podejście dydaktyczne (ADR-03): baza GTO plus warstwa eksploatacji mikrostawek z podaną populacją.
- Poziom pewności reguły odpowiada szczeblowi źródła; kryteria są w nagłówku `content/pl/rules.yaml` (math, gto, heuristic, exploit, rules).
- Każdą decyzję merytoryczną zapisz w rejestrze na Drive (dokumenty 12 „Weryfikacja źródeł” i 13 „Audyt merytoryczny”, folder „Szkoła Pokera”) z uzasadnieniem i odrzuconymi alternatywami, żeby dało się ją sprawdzić i cofnąć.
- Spójność między modułami: jedna nazwa na jedno pojęcie (tabela terminologii w dokumencie 13), jedna definicja, pojęcie zdefiniowane przed pierwszym użyciem.

## Dokumentacja projektu

Folder „Szkoła Pokera” na Google Drive: 00 Roadmapa, 01 Wymagania, 02 Architektura, 03 Rejestr decyzji (ADR), 04 Backlog, 05 Changelog, 06 Runbook, 08 Baza wiedzy, 09 Program nauczania, 10 i 11 Solver, 12 Weryfikacja źródeł, 13 Audyt merytoryczny. Po każdej istotnej zmianie aktualizuj backlog (04) i changelog (05, najnowsze na górze). Gdy kilka sesji pracuje równolegle, backlog i changelog aktualizuje tylko sesja koordynująca.

Architektura w repo: `docs/architektura/README.md`, ADR `docs/adr/` (rola 05; ADR 0006 i 0009 zastępują ADR-18 i ADR-17 rejestru 03).

## Ścieżki wrażliwe (przegląd zmian w świeżym kontekście przed oddaniem, D-043)
- Dane użytkownika: `packages/postep/` (port bazy, kolejka zapisów, migracje, eksport, import, „Usuń postęp”), `apps/mobile/src/data/`, `docs/architektura/schemat.sql` (drizzle i `src/data/user` usunięte w 08 cz. 5, ADR 0003, 0004).
- Format eksportu, logika dostępu i limitu: `packages/domena/`.
- Zakupy, pliki i ochrona tła: `apps/mobile/src/platform/`, `apps/mobile/modules/ochrona-tla/`.
- Treść (identyfikatory w powtórkach, baza na język): `tools/content-build/`.
- CI i wydanie: `.github/workflows/`, `apps/mobile/app.json` (manifest prywatności, wtyczki, uprawnienia), `apps/mobile/eas.json`.

## Zasady techniczne

- Liczby w treści tylko przez `{{n:klucz}}` z `content/numbers.yaml` (jedno źródło prawdy). Wielkość, którą da się policzyć, liczona formułą z `refs`, nie wpisana ręcznie. Ta sama wielkość ma jeden klucz.
- Po zmianie w `content/` uruchom `pnpm content:build`. Przed commitem `pnpm run ci` musi być zielone.
- `poker-core`, `srs` i `content-schema` nie importują React Native.
- Tożsamość git w tym repozytorium: `Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>` (repozytorium jest publiczne; nigdy prywatny adres e-mail). Ustaw ją lokalnie w każdym nowym klonie i worktree przed pierwszym commitem.
- Właściciel płaci tylko za Apple Developer. Przed użyciem płatnych usług albo dużej części darmowych limitów (EAS, GitHub Actions) uprzedź go.

## Audyty i wydania (decyzja właściciela z 9 października 2026, obowiązuje we wszystkich jego aplikacjach do odwołania)

1. Próg wydania: wydanie blokują tylko znaleziska KRYTYCZNE i WYSOKIE: utrata lub zepsucie danych (także migracja, import, kopia), awaria albo funkcja nie do użycia, błędne liczby lub twierdzenia merytoryczne, prywatność, bezpieczeństwo, sekrety, prawa autorskie, bariera dostępności, ryzyko odrzucenia przez Apple. ŚREDNIE i NISKIE trafiają do backlogu z przypisaną wersją i nie wstrzymują wydania.
2. Jeden audyt na wydanie, bez pętli: naprawy znalezisk sprawdza test odtwarzający, pełna weryfikacja (`pnpm run ci`) i E2E, nie kolejny audyt. Nowy błąd wykryty przy naprawie oceniany tym samym progiem.
3. Zamrożenie zakresu: od startu audytu do wydania żadnych nowych funkcji, tylko naprawy blokerów; pomysły do backlogu.
4. Głębokość: wydanie testowe (TestFlight) — audyt zmian od poprzedniego wydania plus stała lista kontrolna (dane, migracje, prywatność); przed upublicznieniem w App Store i co ok. 3 wydania — pełny, głęboki audyt całości.
5. Bez limitu czasu: audyt i naprawy na spokojnie. Jeśli bloker wymaga dużej przebudowy, właściciel decyduje: naprawa teraz albo wydanie bez tej funkcji (wyłączona lub cofnięta).
