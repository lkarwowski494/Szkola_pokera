# Postęp napraw M2 — Szkoła Pokera
Pętla 1 · Zadania: partia:1 · Audyt f75acdff16915aeb43ff788888216e28616c11ed · Baza 0e7e5e00d97271f7dd3b5ee0caf5c8a833999dee · Sesja IS (koordynator napraw), sesje ról: subagenci
Prompt roli: assemble.mjs M2-koordynator-napraw --tryb fix (prompts @ af4c0a83), sha256 /tmp/rola.md d16a6289c4539fc2c3f20ce30b0ae77c49f48680ef93b34ba3cc560ae5d2486c

## E0 (stan)
- sprawdz-plan.mjs: kod 0, 66 zadań, 13 decyzji (dowody/M2/sprawdz-plan-start.txt); zakres-napraw.mjs partia:1: kod 0, 4 zadania (dowody/M2/zakres.txt).
- Repo: drzewo czyste na starcie; commit audytu istnieje; od audytu zmieniono tylko audit/ i docs/decyzje/IR.md → żadne zadanie nie wymaga ponownego odtworzenia.
- K jest śledzony w git (wyjątek nazwany: docs/decyzje/IR.md D-1990…, polecenie IR pkt 5); narzędzia M2 (K/narzedzia/) i prompty wykluczone w .git/info/exclude.
- Gałąź: środowisko narzuca `claude/sesja-is-naprawy-p1` (zamiast naprawy/M2-…-p1); granice partii zapisuję SHA.
- Stan wyjściowy: `pnpm install --frozen-lockfile` kod 0; `pnpm test:skrypty` 229/229 kod 0 (dowody/M2/stan-test-skrypty.txt); pełne `pnpm run ci` na f75acdff kod 0 z przebiegu IR (wspolne/ci-pelne.log) — wyjątek nazwany: nie powtarzam przed startem, bo od audytu zmieniono tylko dokumentację; tańsza kontrola = test:skrypty teraz + pełne ci na końcu.
- Bramka D-025: wyjątek nazwany właściciela w IR (D-1990, docs/decyzje/IR.md); docs/monetyzacja.md „budować”.
- Trening (D-191, odczyt 2026-11-17, klon @ 2d97581): `.github/workflows/asc-kontrola.yml:21` akcja zewnętrzna przypięta do pełnego SHA; `.gitignore` z `.env*`, `*.p8`, `*.p12`, `*.mobileprovision`, `*.cer`, `credentials.json`, `*.pem`, `*.key`, `*.jks`, `*.keystore`.

## Zgody
- 2026-11-17 właściciel (sesja IR): „Partia 1, DEC zgodnie z rekomendacjami email: support@apps4brew.com Łukasz Karwowski” — zatwierdzenie partii 1.
- 2026-11-17 właściciel (sesja IS): „zgoda na prompts” — klon biblioteki prompts i składacz.
- 2026-11-17 właściciel (sesja IS) na STOP start: „Zgodnie z rekomendacja” — plan (a): kolejność 007, 047, 061, 002; subagenci; push na gałąź po każdym zadaniu.

## Partie
| Partia | Gałąź | Od | Do | STOP przed | Stan |
|---|---|---|---|---|---|
| 1 | claude/sesja-is-naprawy-p1 | 0e7e5e00 | 7b591503 | tak (M: 002) — łączony ze STOP start | zakończona |

## Zadania
| ID | Partia | Krok | Commit | Dowód | Przeczytane reguły | Następny krok |
|---|---|---|---|---|---|---|
| M1-audytor-generalny-007 (06-tresci-001) | 1 | commit | 3f1fe76d | dowody/M2/M1-audytor-generalny-007-przed.txt (kod 1, 22 pary), -po.txt (kod 0), -test-skrypty.txt (232/232); tresci:rejestr 0, tresci:el-kontrola 0 | 08 rdzen „Zasady programisty”; 06 rdzen „Tryb: fix”; 07 rdzen „Tryb: fix” | gotowe (naprawione-do-weryfikacji) |
| M1-audytor-generalny-047 (07-jakosc-004) | 1 | commit | 5abf3534 | dowody/M2/M1-audytor-generalny-047-przed.txt (kod 1), -po.txt (31/31); przegląd D-043: dowody/M2/przeglad-d043-047-061.md (brak uwag) | 08 rdzen; 07 rdzen „Tryb: fix” | gotowe (naprawione-do-weryfikacji) |
| M1-audytor-generalny-061 (10-wydanie-007) | 1 | commit | c9a7c332 | dowody/M2/M1-audytor-generalny-061-przed.txt (kod 1), -po.txt (2/2), -test-skrypty.txt (234/234); przegląd D-043 jw. | 08 rdzen; 10 rdzen „Tryb: fix” | gotowe (naprawione-do-weryfikacji) |
| M1-audytor-generalny-002 (06-tresci-501) | 1 | commit | a2da1175 | role/06-tresci/fix-2026-11-17/ (wynik.md, test-przed kod 1 / test-po kod 0, porownanie-przed/po, ci-po kod 0); recenzja-niezalezna.md (zgodne 1–4, 6, 7); przeglad-d043-wynik.md (brak uwag); sprawdz-raport wynik.md kod 0 | rola 06 w świeżym kontekście (prompt 06 fix, sha256 3baf0c31…) | gotowe (naprawione-do-weryfikacji) |

## Dziennik
- 2026-11-17 E0: plan, zakres, stan repo, stan wyjściowy → STOP start wysłany do koordynatora.

- 2026-11-17 007: test czerwony (22 pary plik–adres) → skrócenie 5 plików (D-2010) → zielony, test:skrypty 232/232 → commit 3f1fe76d → status naprawione-do-weryfikacji.
- 2026-11-17 047: test zaostrzony (czerwony: pnpm/action-setup@v5) → przypięcie 15 użyć do fc06bc12 (v5.0.0) → 31/31 → commit 5abf3534.
- 2026-11-17 061: test gitignore-sekrety (czerwony) → wzorce jak w Treningu → 2/2, test:skrypty 234/234 → commit c9a7c332.
- 2026-11-17 przegląd D-043 047+061: brak uwag P0/P1 → statusy naprawione-do-weryfikacji.
- 2026-11-17 002: polecenie 06-tresci-p1 zapisane, subagent 06 (opus/high) uruchomiony.
- 2026-11-17 koordynator przekazał słowa właściciela na STOP start (ok. 13:40 UTC): „a: plan jak wyżej (zalecane)”; zgodne z zapisaną zgodą.
- 2026-11-17 002: subagent 06 (opus/high) → commit a2da1175 (uncertain BB 16/13 klas, 9-max przez aliasy, zdanie m4-l2:73 w 12 językach, test is-siatki-niepewne, D-2011…D-2014) → recenzent niezależny: rachunek i źródła zgodne; uwagi: P1 siatka lekcji bez oznaczenia uncertain (przed commitem, poza zakresem → nowe znalezisko), P2 test sprawdza podzbiór, P2 T8o 49 pp → przegląd D-043: brak uwag → status naprawione-do-weryfikacji.
- 2026-11-17 koniec partii 1: pnpm run ci kod 0 (dowody/M2/ci-koniec-7b591503.log); raport M2 i sprawdz-raport kod 0 → STOP końcowy do koordynatora.
- 2026-11-17 15:00 UTC koordynator (KO-129): M2-001 ranga P1, wariant (a) oznaczenie uncertain w siatce lekcji jak w malowaniu; M2-002, M2-003 → backlog po 1012. Odstępstwo nazwane: wykonawca rola 08 (kod apps/mobile), nie 06 (06 tryb fix nie zmienia kodu aplikacji). Polecenie naprawy/polecenia/08-programista-p1.md, prompt 08 fix sha256 0c9d2a7b…, subagent sonnet/medium (sesja roli 08 fix).
- 2026-11-17 M2-001: rola 08 → commit 1d756b0b (RangeGrid „•” + legenda, test RangeGrid-uncertain red → 5/5; mobile 1787 kod 0; typecheck 0); sprawdz-raport wynik.md kod 0 po doprecyzowaniu ścieżki Blocks.tsx; D-2015; recenzent niezależny: brak P0/P1, mutacje a–d2 złapane (2 × P2 → M2-004, M2-005 backlog); pnpm run ci na 5f34458a kod 0 (dowody/M2/ci-koniec-5f34458a.log) → raport do koordynatora.
- 2026-11-17 16:28 UTC koordynator: reaudit (IR @ 202185ab) zweryfikował 002/007/047/061; nowe 067 (P1, kontrast kropki RangeGrid) i 068 (P3, PaintGrid); właściciel ~16:20 UTC: „067+068 razem (zalecane)” (KO-130, wyjątek nazwany od zamrożenia). git merge --ff-only origin/claude/sesja-ir-reaudit-m1 → 202185ab; --zatwierdz 067,068 ze słowami właściciela; sprawdz-plan kod 0 (73 zadania). Polecenie naprawy/polecenia/08-programista-p1-b.md, prompt 08 fix sha256 4207d385…, subagent sonnet/medium.
- 2026-11-17 067/068: rola 08 → a82bc91e, d56506fe, 4faf3b0a; recenzent niezależny: minimum 3,92/7,87/3,26/9,19, brak P0/P1 w zakresie; nowe M2-006 (P1, etykieta 8 pt < 4,5, sprzed zmiany), M2-007, M2-008 (P2); statusy naprawione-do-weryfikacji; pnpm run ci na 8ca88b75 kod 0 → raport do koordynatora.

## Czekające zgody i kroki właściciela
- STOP końcowy: weto D-2010…D-2014; decyzja o znaleziskach M2-koordynator-napraw-001…003; reaudit M1 w nowej sesji; scalenie po reaudycie.
- Historia git nadal zawiera pełne wyciągi (007); przepisanie historii wymaga osobnej zgody — nie proponuję (koszt > ryzyko, ocena „brzegowy”).
