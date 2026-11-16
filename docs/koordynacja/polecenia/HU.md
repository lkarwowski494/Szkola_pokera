# Sesja HU: poprawki treści po recenzji HS (06 build) — Szkoła Pokera
Koordynator: session_01T66VBwf1bNLY6pRHh6Xc12 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID). Gałąź stanu koordynatora: koordynacja (tylko do odczytu).

1. Rola: 06-tresci w trybie build. Prompt roli jest w twoich pierwszych wiadomościach po linii `=== PROMPT ROLI ===` (kilka części); zacznij dopiero po ostatniej. Biblioteki prompts nie dołączasz.
2. Start: gałąź `claude/sesja-hu-tresci` od `claude/sesja-ht-poprawki` @ e270da14. `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md.
3. Zadania (wejście: `docs/tresci/recenzje/recenzja-hs.md`; hierarchia źródeł ADR-24 z CLAUDE.md):
   1. HS 06-tresci-302 (P1): SC-07 — warunek `flop: {height: [high]}` (D-1752) w `content/pl/scenarios/sc-07.yaml` i we wszystkich 11 przekładach (warunki identyczne we wszystkich językach).
   2. HS 06-tresci-305 (P2): „ćwierć puli” przez `{{n:…}}` z `content/numbers.yaml` (istniejący klucz albo nowy z `refs`), pl i przekłady.
   3. HS 303, 304 (P2, szkice HP SC-26 i SC-30): uwagi do szkiców w `docs/tresci/szablony-robocze/fd/`; szkic SC-26 `kicker: [A, K]` → format wg D-1701 (komunikat HR).
   4. Tytuł SC-04 pl: skrót wg propozycji HS („Pierwszy do gry na UTG.” + reszta zdania) — sprawdź zgodność z kryterium długości HQ (D-1730…1733: ≤ floor(0,19×(W−32)) przy 390 → 68 znaków ważonych); en analogicznie, jeśli przekracza.
   5. Nie zmieniasz kodu (`packages/`, `tools/`, `apps/`) — to sesja HT równolegle. Baz generowanych (`apps/mobile/assets/content`, `tresc.generated.ts`) nie commitujesz — przebuduje je koordynator po scaleniu HT+HU. Uruchom `pnpm content:check` i kontrole treści (kod 0) oraz `pnpm content:build` lokalnie dla sprawdzenia.
4. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nigdy --no-verify ani force-push, nie pytasz właściciela.
5. Decyzje merytoryczne wg hierarchii źródeł z zapisem odrzuconych alternatyw; techniczne analogia (lkarwowski494/trening). Pula D-1770…D-1779, `docs/decyzje/HU.md`.
6. Koszt: pułap 6 USD; próg STOP 7,8 USD. Stan w `docs/tresci/plan-hu.md`.
7. Push: na `claude/sesja-hu-tresci`.
8. Raporty (≤ 10 linii, send_message): po starcie liczba linii „# ” i „#” w prompcie roli; PYTANIE; PRZEKAZANIE (SHA, poprawki, kontrole, decyzje do weta, otwarte).
