# Sesja DH: recenzja niezależna DE (przekład) — Szkoła Pokera
Koordynator: session_01T66VBvYWeNrFwMqZNx9zYV (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; po wiadomości o zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola: 09-lokalizacja w trybie audit. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz. Nie czytasz raportu autora przed własnymi wnioskami (świeże spojrzenie).
2. Start: gałąź `sesja-dh-recenzja` @ faad5b9cafd7fcef03a1bf0ffeb8055f23050e0f (= `origin/sesja-de-przeklad`; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md.
3. Zadanie: recenzja niezależna zmian 564c38139eca566cc9be61466e322974d6e328a0..faad5b9c (DE: przekład 13 kluczy scenario.action.* ×10 słowników, forma preflop D-887/D-903, NIS-DA-01 NBSP, zapadka ŚR-2 i sha_pl ŚR-1, merge CY ffa9bd7b, wyjątek D-904 dla `ekran-cn.test.tsx`). Sprawdź poprawność i spójność terminologii z istniejącymi słownikami, placeholdery, długość na ekranie, zapadkę (czy nie da się jej obejść). Gotowe: raport `docs/lokalizacja/recenzje/recenzja-de-faad5b9.md` z werdyktem PRZYJĄĆ / PRZYJĄĆ Z WARUNKIEM / ODRZUCIĆ i znaleziskami KRYT/WYS/ŚR/NIS (plik:linia, dowód), `pnpm run ci` kod 0 na faad5b9c zapisany w pliku dowodu.
4. Zakazy: nie poprawiasz kodu ani tłumaczeń autora (tylko raport i test odtwarzający przy WYS+), nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nigdy --no-verify ani force-push, bez AskUserQuestion. STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: numery tylko z puli D-925…D-929, wpisy w `docs/decyzje/DH.md`, do weta.
6. Kontekst i koszt: od 30% okna kończysz krok, push, PRZEKAZANIE. Pułap 6 USD, próg STOP 8 USD.
7. Push na `sesja-dh-recenzja`.
8. Raporty (≤ 10 linii, send_message): PYTANIE z opcjami i rekomendacją; PRZEKAZANIE: werdykt, SHA, dowody, decyzje do weta, koszt.
