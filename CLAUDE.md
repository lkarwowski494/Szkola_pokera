# Szkoła Pokera: zasady pracy dla Claude

Ten plik obowiązuje w każdej sesji pracującej na tym repozytorium. Zasady poniżej mają pierwszeństwo przed domyślnym sposobem pracy, a w sprawach treści pokerowej także przed ogólną preferencją właściciela „zawsze przedstaw opcje i zostaw decyzję człowiekowi”.

## Kto o czym decyduje (ADR-24, decyzja właściciela z 4 października 2026)

Właściciel nie jest ekspertem od teorii pokera i **nie rozstrzyga kwestii merytorycznych**. Nie przedstawiaj mu opcji do wyboru w sprawach teorii (strategia, zakresy, rozmiary, częstotliwości, poziomy pewności reguł, brzmienie reguł). Rozstrzygaj je sam według metodologii poniżej, zapisz decyzję w rejestrze i poinformuj właściciela, co postanowiłeś i na jakiej podstawie. Właściciel może każdą decyzję zawetować.

Właściciel decyduje o sprawach **produktowych**: zakres i kolejność prac, nowe funkcje i typy ćwiczeń, wygląd, koszty, publikacja. Przy nich przedstaw co najmniej dwie opcje z kompromisami i rekomendacją.

### Hierarchia źródeł (wyższy szczebel wygrywa)

1. Rachunek: prawdopodobieństwo, pot odds, MDF, alpha, kombinatoryka, SPR; liczony w aplikacji i sprawdzony niezależnie.
2. Opublikowane wyniki solverów i rozwiązań równowagi z uznanych źródeł (np. GTO Wizard, analizy PioSolvera na Upswing, Poker Academy) oraz nasz solver tylko tam, gdzie przeszedł walidację (dokument 10 na Drive).
3. Książki uznanych autorów, czytane przez dostępne fragmenty, artykuły i wykłady autorów lub omówienia z cytatami: m.in. Chen i Ankenman „The Mathematics of Poker”, Janda „Applications of No-Limit Hold'em”, Acevedo „Modern Poker Theory”, Flynn, Mehta i Miller „Professional No-Limit Hold'em”, Brokos „Play Optimal Poker”, Tendler „The Mental Game of Poker”; turnieje: Harrington, „Kill Everyone”.
4. Materiały uznanych serwisów szkoleniowych (Upswing, PokerCoaching, Deepfold, Run It Once, SplitSuit, GTO Gecko).
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

## Zasady techniczne

- Liczby w treści tylko przez `{{n:klucz}}` z `content/numbers.yaml` (jedno źródło prawdy). Wielkość, którą da się policzyć, liczona formułą z `refs`, nie wpisana ręcznie. Ta sama wielkość ma jeden klucz.
- Po zmianie w `content/` uruchom `pnpm content:build`. Przed commitem `pnpm run ci` musi być zielone.
- `poker-core`, `srs` i `content-schema` nie importują React Native.
- Tożsamość git w tym repozytorium: `Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>` (repozytorium jest publiczne; nigdy prywatny adres e-mail). Ustaw ją lokalnie w każdym nowym klonie i worktree przed pierwszym commitem.
- Właściciel płaci tylko za Apple Developer. Przed użyciem płatnych usług albo dużej części darmowych limitów (EAS, GitHub Actions) uprzedź go.
