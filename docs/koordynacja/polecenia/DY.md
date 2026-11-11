# Sesja DY: szablony kroku E (SC-16…31) — Szkoła Pokera
Koordynator: session_01T66VBwmproZFQjCLcWHQy4 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 06-tresci w trybie build (moduły kontrole-mechaniczne, tresci-krytyczne). Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-dy-szablony-e` @ 29130d39 (= `origin/sesja-dv-zrodla`, robocza b3963e9a + źródła kroku E; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md. Plik stanu: `docs/tresci/stan-dy.md`.
3. Wejście: `docs/tresci/zrodla-krok-e.md` (15 warunków ze źródłem lub rachunkiem, D-1050…D-1057, odczyty w `docs/tresci/odczyty/dv-krok-e-2026-11-11.txt`), KO-069 (szczebel 4 z atrybucją), KO-071 (SC-29–31 jako warianty rachunkowe: typ rywala jako dana zadania, bez reguły o populacji), KO-072 (SC-23: nowy typ „wybór jednej z dwóch rąk” robi 08 w sesji DX). Wzór pracy i testów treści: KO-070 (rola 06 dopisuje testy treści bez luzowania progów i asercji, powód w commicie), szablony i testy DU na `origin/sesja-du-szablony` (odczyt).
4. Zadania:
   1. Inwentaryzacja SC-16…SC-31: dla każdego reguły (`content/pl/rules.yaml`), poziom pewności, czy obecny silnik ma potrzebny rodzaj punktu (jeśli nie: który z 08-N1…N7 / typ KO-072). Tabela w stan-dy.md. Gotowe: raport do koordynatora po tym zadaniu.
   2. Szablony, które silnik już obsługuje: do `content/` (pl, en), liczby tylko przez `{{n:…}}`, `pnpm content:build`, testy treści wg KO-070. Gotowe: build kod 0, testy zielone.
   3. Szablony czekające na silnik (DX): szkice w `docs/tresci/szablony-robocze/` z regułami, wariantami i testem akceptacji, gotowe do przeniesienia po scaleniu DX.
   4. SC-29–31 według KO-071 (rachunek; typ rywala w treści zadania jako dana, nazwany uproszczeniem dydaktycznym).
   5. ZAL-013 (zawężone potwierdzenie M6–M9): zaktualizuj wpis w `docs/zalozenia.md` według D-1053/DV.
   6. `pnpm run ci` kod 0 (plik dowodu `docs/tresci/dowody/dy-ci-<sha>.txt`).
5. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora i czekasz na odpowiedź. Nie zmieniasz kodu silnika (`packages/**` poza testami treści, `apps/**`) — braki silnika jako zadania dla DX w stan-dy.md. Konflikty w `content/pl/rules.yaml`/`numbers.yaml` z DU rozwiązuje później scalenie — trzymaj zmiany w osobnych blokach SC.
6. Decyzje: tryb dzienny — techniczne sam przez analogię (najpierw `lkarwowski494/trening`, potem oczko, piekarz; `repo:plik:linia`, data odczytu), do weta; produktowe → PYTANIE do koordynatora (≥ 2 opcje, rekomendacja); merytoryczne pokerowe → hierarchia źródeł ADR-24 z CLAUDE.md. Pula D-1080…D-1094 (`docs/decyzje/DY.md`).
7. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan w pliku stanu na swojej gałęzi, push, PRZEKAZANIE. Pułapu kosztu brak (mandat) — podaj koszt.
8. Push: zbiorczo, po zadaniu.
9. Raporty (≤ 10 linii, send_message): po pierwszym zadaniu czas i szacunek reszty; PYTANIE z pełną treścią, opcjami i rekomendacją; PRZEKAZANIE: SHA, `pnpm run ci` kod i plik dowodu, decyzje do weta, koszt, otwarte, następny krok.
