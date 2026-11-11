# Stan sesji CY (rola 09, build, moduł tłumaczenie): przekład M12 ×4, kontrola skrótu pl, przegląd `bet-big` SC-12
Gałąź `sesja-cy-m12` od 46197812; decyzje `docs/decyzje/CY.md` (D-876…D-879, do weta). Data: 2026-11-11.

## Zrobione
- **Zadanie 1:** `why` poprawnej opcji q1, q2, q3, q8 w `content/{en,de,es,fr,it,ja,ko,pt-BR,pt,vi,zh-Hant}/exams/m12.yaml` (44 pola): sens przed rachunkiem, klucze i poprawne odpowiedzi bez zmian. Porównanie strukturalne: `docs/lokalizacja/dowody/cy-m12/porownanie-strukturalne.txt`. Poza 11 katalogami nie ma innych języków z własną treścią egzaminów (łańcuch zastępczy).
- **Kontrola (a):** przekład zwrotny w świeżym kontekście, 44/44 zgodne z pl (`dowody/cy-m12/zwrotny-A.md`, `zwrotny-B.md`); skróty odnowione w `docs/tresci/rejestr/m12-m13.json` (R-M12-009, R-M12-011, n:br.bi.base, n:br.bi.beginner, n:ror.two × 11 języków).
- **Zadanie 2:** `sha_pl` w `przeglad_jezyki`, błąd przy zmianie pl bez przekładu (`scal-rejestr.mjs`), 2 testy w `scal-rejestr.test.mjs` (czerwone przed kodem, potem zielone).
- **Zadanie 3:** przegląd `bet-big` SC-12 ×11: bez poprawek (D-879).

## Otwarte / dla koordynatora po scaleniu
- **66 wpisów `przeglad_jezyki` bez `sha_pl`** (partie m0-m4, m5-m8, m9-m11, reszta m12-m13) to jedna uwaga zbiorcza; po uzupełnieniu w tych partiach przez ich właścicieli zamienić ją w błąd (D-878).
- Scalenie z CW: skrót pl liczy się z `content/pl/{lessons,exams,rules.yaml}`, `numbers.yaml`, `terms.yaml`, `helplines.yaml`, **nie ze scenariuszy**, więc zmiana pl SC-11 nie unieważnia `sha_pl`. Jeśli CW zmieni pl lekcje/egzaminy z regułą krytyczną, błąd `przekład w <j> powstał z innej wersji pl` pokaże, co przetłumaczyć. Po scaleniu: `node docs/tresci/narzedzia/scal-rejestr.mjs --przeglad zastępczy`, potem `pnpm content:build`.
- Narzędzie `bx-porownaj-egzamin.mjs` (poza moją listą ścieżek) dzieli zdania tylko po `.!?`: dla ja/zh-Hant daje fałszywy alarm „pierwsze zdanie to rachunek”; zgłoszone, nie zmieniałem.
- Uwaga recenzenta przekładu zwrotnego: zapis „≈ ± {{n:…ci.half.bi}}” w q1/q2 nie podaje granic przedziału (identyczny w pl, rola 06).
- Weryfikacja sha256 promptu roli: niewykonana (transport).
