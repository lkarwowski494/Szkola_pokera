# Sesja DI: reaudit 06-tresci-001 i 003 (DG) — Szkoła Pokera
Koordynator: session_01T66VBvYWeNrFwMqZNx9zYV (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola: 06-tresci w trybie reaudit. Prompt roli jest w pierwszej wiadomości po linii `=== PROMPT ROLI ===`. Biblioteki prompts nie dołączasz. Wniosek wyrabiasz sam, zanim przeczytasz `docs/decyzje/DG.md`.
2. Start: gałąź `sesja-di-reaudit` @ a13d407bd93183ed575bca768de4549edada4eb1 (= `origin/sesja-dg-poprawki`; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md.
3. Zadanie: sprawdź naprawę znalezisk 06-tresci-001 i 06-tresci-003 z `docs/tresci/recenzje/recenzja-cw-0ef7785.md` w zakresie 431cb885..a13d407bd93183ed575bca768de4549edada4eb1: (a) nowe brzmienie „najwyżej {{n:pair.outs.per-rank}}” jest prawdziwe we wszystkich wariantach generatora sc-01/02/03/19 (rachunek z kart, nie z raportu autora), (b) pary zdań z „Masz N outów” nie dają fałszywego wniosku, (c) test odtwarzający jest teraz zwykłym `it` i był czerwony przed poprawką, (d) R-M2-005 ma nazwane uproszczenie zgodne z treścią, (e) nic poza tymi miejscami się nie zmieniło (diff). Gotowe: raport `docs/tresci/recenzje/reaudit-dg-a13d407b.md` z werdyktem dla każdego znaleziska (naprawione / nienaprawione / naprawione z uwagą) i nowymi znaleziskami KRYT/WYS/ŚR/NIS z dowodem; `pnpm run ci` kod 0 do pliku dowodu.
4. Zakazy: nie poprawiasz treści autora, nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nigdy --no-verify ani force-push, bez AskUserQuestion. STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: pula D-930…D-933, `docs/decyzje/DI.md`, do weta.
6. Kontekst i koszt: od 30% okna kończysz krok, push, PRZEKAZANIE. Pułap 6 USD, próg STOP 8 USD.
7. Push na `sesja-di-reaudit`.
8. Raport PRZEKAZANIE (≤ 10 linii, send_message): werdykty, SHA, dowody, decyzje, koszt.
