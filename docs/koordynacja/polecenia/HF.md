# Sesja HF: przekłady — formy niepewne z recenzji HD + 4-bet i mdf — Szkoła Pokera
Koordynator: session_01T66VBwsHXCc4m15f9KDM4H (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego; aktualny ID zawsze w `origin/koordynacja:docs/koordynacja/stan.md`, wiersz „Koordynator aktywny”). Gałąź stanu `koordynacja` tylko do odczytu.

1. Rola: 09-lokalizacja w trybie fix. Prompt roli jest w Twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `claude/sesja-hf-przeklady` od roboczej `claude/sleepy-brahmagupta-2065nu` @ b7bc12e6 (inny HEAD: zgłoś). CI 43430296707 success, E2E 43430296746 w toku. Instalacja: `pnpm install --frozen-lockfile` (także w katalogu, z którego działa sesja — wymaga tego hook pre-push). Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadania (wejście: `docs/tresci/recenzje/recenzja-ha-0d59a42.md` sekcja „Do sprawdzenia”, `content/<język>/terms-nazwy.yaml`; każda forma z przeczytanym źródłem albo uzasadnieniem w `docs/lokalizacja/`, czego nie da się ustalić — `[DO USTALENIA]`, nie zgadujesz):
   1. **09-HD-1** `second-pair`: de „Second Pair” w tekście niemieckim; formy es/fr/it/vi/zh-Hant/ja/ko do potwierdzenia. Gotowe: forma w `terms-nazwy` każdego z tych języków albo nazwany wyjątek.
   2. **09-HD-2** `recreational`: de/ja/ko ocena form, es/pt/pt-BR uzupełnienie etykiety.
   3. **09-HD-3** ułamki słownie w SC-13 ja/ko: ocena naturalności (cyfry poza `{{n:}}` zakazane).
   4. **09-HD-4** zaimek drawa w SC-13 bet-small vi/zh-Hant i szyk ja/ko przy `{{n:…}}`.
   5. **4-bet** `[DO USTALENIA]` w ja, vi, pt-BR, zh-Hant oraz **mdf** w `terms-nazwy` fr/pt/pt-BR.
   6. Po zmianach `pnpm content:build`; dowód: w żadnej z 35 baz nie zniknęło ID (D-043, porównanie przed/po), `pnpm run ci` kod 0 (`docs/lokalizacja/dowody/hf-ci-<sha>.txt`), CI na końcowym SHA zielone.
4. Zakazy: pliki tylko `content/<język ≠ pl, en>/**`, zregenerowane bazy i `tresc.generated.ts`, `docs/lokalizacja/**`, `docs/decyzje/HF.md`; nie zmieniasz tekstów pl/en, liczb (`content/numbers.yaml`), kodu, testów ani workflowów. Przekład przez płatne API: brak zgody (D-358/D-359 wyczerpane do 5 USD — nie używasz). Nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nigdy `--no-verify` ani force-push, bez AskUserQuestion i bez PR. STOP-y roli i punkt czyszczenia (zasada wspólna 19) zamieniasz na raport do koordynatora i czekasz na odpowiedź.
5. Decyzje: tryb analogia — najpierw lkarwowski494/trening (publiczne, klon `--depth 1`; jak tam rozwiązano te same terminy/zasady przekładu), `repo:plik:linia` + data odczytu, wpis do weta. Numery tylko D-1610…D-1619.
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan w `docs/lokalizacja/plan-hf.md` na swojej gałęzi, push, PRZEKAZANIE. Pułap 5 USD; po przekroczeniu progu STOP 6,5 USD kończysz krok i oddajesz PRZEKAZANIE. Subagenci tylko gdy konieczni (konto ma ostrzeżenie limitu tygodniowego).
7. Push: zbiorczo.
8. Raporty (≤ 10 linii, przez send_message): po pierwszym zadaniu czas i szacunek reszty; PYTANIE: pełna treść, opcje, rekomendacja; PRZEKAZANIE: SHA, run CI, dowody, decyzje do weta, koszt, otwarte, następny krok.
