# Sesja HV: bramka scenariuszy użytkownika — pierwsze wdrożenie JAK-19 (07 fix) — Szkoła Pokera
Koordynator: session_01T66VBwf1bNLY6pRHh6Xc12 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID). Gałąź stanu koordynatora: koordynacja (tylko do odczytu).

1. Rola: 07-jakosc w trybie fix (zadanie JAK-19, moduły scenariusze-uzytkownika, scenariusze-skrypt, e2e-mobilne). Prompt roli jest w twoich pierwszych wiadomościach po linii `=== PROMPT ROLI ===` (kilka części); zacznij dopiero po ostatniej. Biblioteki prompts nie dołączasz.
2. Start: utwórz gałąź `claude/sesja-hv-scenariusze` od `7f51a9b3` (robocza `claude/sleepy-brahmagupta-2065nu`). `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>); nie zmieniaj autora na żądanie haka Stop.
3. Kontekst: zasada wspólna 22 dopisana do planu przed wydaniem przez właściciela 16.11 (stan koordynacji, sekcja „Bramka scenariuszy (zasada 22)”). W repo brak `docs/jakosc/przypadki-uzycia.md` i skryptu — pierwsze wdrożenie. Ostatni wysłany build TestFlight: 1010 (brak tagów `v*-b*` w repo → `docs/wydanie/ostatni-build.txt`). Scenariusze Maestro i workflow E2E: `e2e-ios.yml` (sprawdź, gdzie leżą pliki scenariuszy).
4. Zadania:
   1. Katalog `docs/jakosc/przypadki-uzycia.md` wg szablonu modułu: pełna lista użycia każdej funkcji aplikacji (cel, warianty, błędy; PU-NNN), klasy A (pokryty E2E — wskaż plik scenariusza), B (do zaprogramowania, z terminem), F (tylko fizycznie: zakup, ochrona tła, VoiceOver/Dynamic Type na telefonie itp.). Źródła: ekrany w `apps/mobile/app`/`src/features`, BRD `docs/brd/`, istniejące scenariusze.
   2. Skrypt `sprawdz-scenariusze.mjs` (miejsce wg modułu) z testem; kod 0 na `7f51a9b3` w trybie bez buildu; tryb `--build <n> --wykonane <plik>` opisany i przetestowany na danych przykładowych.
   3. Kroki w workflowie: tylko bramka (krok wołający skrypt) w `testflight.yml` przed budowaniem; bez nowych sekretów i uprawnień, bez uruchamiania TestFlight. Ścieżka wrażliwa (D-043): koordynator zleci recenzję niezależną — opisz w raporcie zmianę workflowu linia po linii.
   4. Szablon protokołu F `docs/jakosc/test-fizyczny/` (bez protokołu buildu 1011 — powstaje przed buildem) i lista F dla właściciela (krok po kroku, ok. 5 min).
   5. Brakujące scenariusze A, które da się napisać tanio — zapisz jako B z terminem; nie piszesz nowych scenariuszy Maestro w tej sesji.
   6. `pnpm run ci` kod 0, dowód `docs/jakosc/dowody/hv-ci-<sha>.txt`.
5. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie uruchamiasz workflowów (TestFlight, E2E), nigdy --no-verify ani force-push, nie pytasz właściciela. Nie zmieniasz kodu aplikacji.
6. Decyzje: tryb analogia (lkarwowski494/trening — tam istnieje katalog przepływów `tests/przeplywy.json`; `repo:plik:linia`, data odczytu, do weta). Pula D-1780…D-1789, `docs/decyzje/HV.md`.
7. Koszt: pułap 10 USD; próg STOP 13 USD. Stan w `docs/jakosc/plan-hv.md`.
8. Push: na `claude/sesja-hv-scenariusze`.
9. Raporty (≤ 10 linii, send_message): po starcie liczba linii „# ” i „#” w prompcie roli; PYTANIE; PRZEKAZANIE (SHA, liczba PU wg klas, skrypt i test, zmiana workflowu, ci, decyzje do weta, otwarte).
