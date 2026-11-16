# Sesja HS: recenzja merytoryczna treści HN i szkiców HP (06 audit) — Szkoła Pokera
Koordynator: session_01T66VBwf1bNLY6pRHh6Xc12 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: koordynacja (tylko do odczytu).

1. Rola: 06-tresci w trybie audit. Prompt roli jest w twoich pierwszych wiadomościach po linii `=== PROMPT ROLI ===` (kilka części); zacznij dopiero po ostatniej; przeczytaj w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `claude/sesja-hs-recenzja` od `claude/sesja-ho-silnik` @ 9677c41c. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md.
3. Zadania (hierarchia źródeł ADR-24 z CLAUDE.md; każde twierdzenie z przeczytanym źródłem — adres i cytat; właściciel nie rozstrzyga teorii):
   1. **Treść HN** w `content/pl/scenarios/` i `content/en/scenarios/` sc-07, 10, 15, 17, 20, 23, 24, 31: poprawność merytoryczna sytuacji, akcji i wyjaśnień; liczby tylko przez `{{n:…}}`; zgodność wyjaśnień z wynikiem silnika (generuj 3 rozdania na poziom przez build/odciski i porównaj tekst z wynikiem); terminologia (tabela w dokumencie 13 / `content/pl/rules.yaml`). Decyzje HN do weta D-1690 (c-bet mały 1/3, SC-15 pule 6/9 — sprawdź źródło R-M6-006 sam), D-1693.
   2. **D-1705** (HO, `docs/decyzje/HO.md`): „gotowy strit” = 4 rangi w oknie 5 — rozstrzygnij merytorycznie (rachunek outów; definicja OESD vs gutshot), wpis w swoim rejestrze.
   3. **Szkice HP** `docs/tresci/szablony-robocze/fd/` SC-16, 18, 21, 26, 27, 30 (pl/en) wobec warunków silnika HO (komunikat HO: SC-27 geo-size bez mode, SC-26 `rule: R-M9-002`, SC-16 draws [flush, oesd], SC-30 open/threeBet/vpips; listy akcji per poziom poza schematem — D-1710; fr-klucze-rozmiaru wykluczył szkic SC-16 przez format): ocena merytoryczna + lista zmian formatu potrzebnych, by szkice weszły do `content/`. Szkiców nie przenosisz do content.
   4. Długość tytułu: pl SC-04 (158 zn., 5 wierszy wg HQ D-1730…1733) — propozycja skrótu z zachowaniem sensu.
   Wyjście: `docs/tresci/recenzje/recenzja-hs.md` z werdyktem dla HN (PRZYJĄĆ / Z UWAGAMI / ODRZUCIĆ), rozstrzygnięciem D-1705, tabelą dla szkiców HP i skrótem SC-04. Przekładów (10 języków) nie oceniasz — to rola 09 później. Treści nie poprawiasz.
4. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela (bez AskUserQuestion). STOP-y roli zamieniasz na raport do koordynatora.
5. Decyzje: merytoryczne wg hierarchii źródeł (zapis z uzasadnieniem i odrzuconymi alternatywami); techniczne tryb analogia (lkarwowski494/trening). Pula D-1750…D-1759, zapis w `docs/decyzje/HS.md`.
6. Kontekst i koszt: stan w `docs/tresci/plan-hs.md` po każdym zadaniu. Pułap 9 USD; próg STOP 11,7 USD.
7. Push: zbiorczo, tylko docs na `claude/sesja-hs-recenzja`.
8. Raporty (≤ 10 linii, send_message): po starcie liczba linii „# ” i „#” w prompcie roli; PYTANIE; PRZEKAZANIE (SHA, werdykty, znaleziska, decyzje do weta, otwarte).
