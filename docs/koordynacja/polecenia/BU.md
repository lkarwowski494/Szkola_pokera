# Sesja BU: rozszerzenie formatu szablonów scenariuszy (KO-049) — Szkoła Pokera
Koordynator: session_01T66VBxUvdwEFgDrhyD7ZbX (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie build. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-bu-format` @ b9a656a (= robocza 70fdf40 + BS: 3 szablony i szkice; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadania (wejście: `docs/tresci/szablony-robocze/README.md` — tabela F1–F6 potrzeb formatu i 11 szkiców; `docs/tresci/bs-e0.md`; format kroku B: D-551, D-556…D-561; wymagania BR-SZB/GEN w `docs/brd/wymagania-scenariusze.md`):
   1. E0: plan rozszerzenia (F1–F6: rodzaje punktu decyzji, np. preflop range-spot wg ADR-26 z `spots.yaml`, cbet-case, push/call, decyzja od turnu, linia all-in, margines per decyzja, filtry rąk), pliki, testy; raport do koordynatora, potem pracuj bez czekania (chyba że PYTANIE).
   2. Schemat (`packages/content-schema`), budowanie i walidacja (`tools/content-build`), generator i wyrocznia oceny (`packages/poker-core`) dla F1–F6, wstecznie zgodne z sc-01/02/19. Każdy nowy rodzaj: test generatora (decyzja stała w wariantach, 10 000 losowań/poziom jak BJ/BM), wyrocznia niezależna od implementacji, test czerwony przed kodem.
   3. ŚR-103 b (od BS): ostrzeżenie/błąd budowania, gdy wszystkie warianty łatwe w module mają ten sam `expected`.
   4. Wpisz po jednym przykładowym szablonie każdego nowego rodzaju jako fixture testu (nie do `content/` — treść i źródła należą do roli 06, wejdą w następnym kroku).
   5. `pnpm run ci` 0, log w `docs/programista/dowody/bu-ci-<SHA>.txt`. `tools/content-build/` to ścieżka wrażliwa (D-043) — w PRZEKAZANIU lista zmian do recenzji niezależnej.
   6. Nie ruszaj `content/`, `apps/mobile/` (pracują tam BS i BT).
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia z zasady wspólnej 19 zamieniasz na raport do koordynatora.
5. Decyzje: techniczne do weta (najpierw analogia z `lkarwowski494/trening`, `repo:plik:linia`); merytoryczne pokerowe (np. co jest poprawną decyzją) nie są twoje — PYTANIE do koordynatora (rozstrzyga rola 06 wg ADR-24); produktowe → PYTANIE z ≥ 2 opcjami i rekomendacją. Numery decyzji tylko z puli D-660…D-674.
6. Kontekst: od 30% okna kończysz krok, zapisujesz stan w `docs/programista/stan-bu.md`, push, PRZEKAZANIE. Koszt: bez pułapu (mandat), raportuj.
7. Push zbiorczo. Raporty (≤ 10 linii, send_message): E0; PYTANIE (pełna treść, opcje, rekomendacja); PRZEKAZANIE: SHA, plik dowodu ci, decyzje do weta, ścieżki wrażliwe, otwarte, następny krok.
