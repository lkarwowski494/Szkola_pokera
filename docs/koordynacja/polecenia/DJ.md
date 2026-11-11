# Sesja DJ: przekład poprawki 06-tresci-001 na 11 języków — Szkoła Pokera
Koordynator: session_01T66VBvYWeNrFwMqZNx9zYV (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola: 09-lokalizacja w trybie build. Prompt roli jest w pierwszej wiadomości po linii `=== PROMPT ROLI ===`. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-dj-przeklad` @ a13d407bd93183ed575bca768de4549edada4eb1 (= `origin/sesja-dg-poprawki`; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md.
3. Zadanie: w `content/{en,de,es,fr,it,ja,ko,pt,pt-BR,vi,zh-Hant}/scenarios/sc-01.yaml, sc-02.yaml, sc-03.yaml, sc-19.yaml` (44 pliki, 154 wyjaśnienia wg DG) dodaj odpowiednik „najwyżej” do zdania o outach nadkart tak, by sens był taki jak nowe zdanie pl (diff 431cb885..a13d407bd93183ed575bca768de4549edada4eb1 w `content/pl/scenarios/`). Liczby tylko przez `{{n:…}}`, NBSP i placeholdery jak w danym słowniku, terminologia wg istniejących słowników i tabeli terminów. Zaktualizuj `sha_pl` / znaczniki zgodności przekładu tak, jak wymaga narzędzie (zapadka ŚR-2 z DE). Bez użycia płatnego API przekładu (zgoda wyczerpana) — przekład robisz sam. Gotowe: `pnpm content:build` i `pnpm run ci` kod 0 (wynik do `docs/lokalizacja/dowody/dj-ci.txt`), lista zmienionych plików i zdań w `docs/decyzje/DJ.md`.
4. Zakazy: nie zmieniasz `content/pl`, nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nigdy --no-verify ani force-push, bez AskUserQuestion. Jeśli równoległy reaudit DI zmieni brzmienie pl, dostaniesz wiadomość. STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: pula D-934…D-939, `docs/decyzje/DJ.md`, do weta (analogia: lkarwowski494/trening).
6. Kontekst i koszt: od 30% okna kończysz krok, push, PRZEKAZANIE. Pułap 6 USD, próg STOP 8 USD.
7. Push na `sesja-dj-przeklad`.
8. Raporty (≤ 10 linii, send_message): PYTANIE z opcjami i rekomendacją; PRZEKAZANIE: SHA, dowody, decyzje, koszt.
