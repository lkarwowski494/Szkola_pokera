# Sesja DT: przyspieszenie E2E iOS przy tym samym zestawie kontroli (WG-02, WG-09) — Szkoła Pokera
Koordynator: session_01T66VBwchgoN1YcMZZCKBS6 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; po wiadomości o zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola 08-programista w trybie build; prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `claude/dt-e2e` @ b3963e9a8cf20bc3dcb39359ad6353e1afb5ee85 (= robocza; push na `claude/**` uruchamia E2E automatycznie). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość wg CLAUDE.md.
3. Zadania (zgoda właściciela 2026-11-11 ok. 18:30: „Zgoda na przyspieszenia”; zakres: ten sam zestaw kontroli — te same flowy, progi, bramki):
   1. Pomiar „przed”: z 5 ostatnich przebiegów `e2e-ios.yml` (GitHub API przez `gh api` albo log przebiegu) czasy: kolejka, build, flowy, całość. Gotowe: tabela w `docs/jakosc/e2e-przyspieszenie.md`.
   2. Podział flowów na 2 równoległe joby macOS (build raz, artefakt aplikacji, każdy job połowa flowów; wynik łączny = wszystkie flowy; job padnięty = przebieg czerwony). Lista flowów przed i po identyczna — test albo skrypt, który to sprawdza w CI.
   3. Cache budowania iOS (np. CocoaPods, DerivedData/ccache) bez zmiany wyniku builda; klucz cache zależny od lockfile'ów.
   4. Pomiar „po”: push na `claude/dt-e2e`, co najmniej 2 przebiegi (drugi z ciepłym cache). Gotowe: tabela przed/po, liczba flowów przed = po, wszystkie zielone; jeśli przyspieszenie < 5 min — opisz i zostaw wariant prostszy.
   Dozwolone ścieżki: `.github/workflows/e2e-ios.yml` (i nowy skrypt w `scripts/`), `docs/jakosc/`, `docs/decyzje/DT.md`. Nie zmieniasz flowów `.maestro/` ani progów.
4. Zakazy: nie scalasz do gałęzi roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nigdy --no-verify ani force-push, nie usuwasz ani nie luzujesz testów, nie pytasz właściciela (bez AskUserQuestion); STOP-y roli i punkt czyszczenia → raport do koordynatora i czekasz. Zmiana workflowu w zakresie zadania jest dozwolona; `testflight.yml` i `asc-*.yml` nie ruszasz.
5. Decyzje: techniczne sam przez analogię (najpierw `lkarwowski494/trening` `.github/workflows/e2e-ios.yml`, `repo:plik:linia`), do weta. Pula D-1020…D-1029 w `docs/decyzje/DT.md`.
6. Kontekst: od 30% okna kończysz krok, stan w `docs/jakosc/stan-dt.md`, push, PRZEKAZANIE. Minuty macOS: repo publiczne (darmowe) — nie więcej niż 4 przebiegi E2E bez raportu.
7. Raport ≤ 10 linii przez send_message: po zadaniu 1 (czasy przed); PRZEKAZANIE (SHA, run ID przed/po, czasy, liczba flowów, decyzje do weta, koszt).
