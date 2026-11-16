# Sesja HP (06-tresci build, szkice docs): stan
Stan: 2026-11-16 · Gałąź `claude/sesja-hp-szkice` od 0b0855ef · Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/HP.md` @ 751bdd85 · Decyzje: pula D-1715…D-1729, `docs/decyzje/HP.md`

## E0 (STOP do koordynatora)
- Środowisko: Linux, node v22.23.4, `pnpm install --frozen-lockfile` kod 0; sieć do źródeł: GW, UP, PC 200; splitsuit 403 (SC-26 oparte na GW, szczebel 2); push na gałąź roboczą.
- Status u źródła (nie z planu z 11–12.11): `content/{pl,en}/scenarios/` ma 18 szablonów (01–06, 08, 11–13, 19, 22, 25, 28, 29, 32–34); szkice `fd/` mają 10 (07, 09, 10, 14, 15, 17, 20, 23, 24, 31). SC-16, 18, 21, 26, 27, 30 nie mają szkicu ani treści (grep `sc-NN` w content, docs/tresci/szablony-robocze, tools, packages: 0 trafień poza README).
- Rodzaje punktów w `packages/content-schema/src/index.ts:565-779`: brak rodzajów dla SC-16 (08-EX-7), SC-18/21 (08-EX-6), SC-26 (08-EX-5), SC-30 (08-EX-8); SC-27 może użyć `flop-size` (`:747`) tylko jeśli HO doda tryb geometryczny (08-EX-4). Szkice opiszą proponowany rodzaj jako `kind: <propozycja>` z komentarzem „warunek dla HO”.
- Wejście merytoryczne: `docs/tresci/zrodla-krok-e.md` (DV, warunki z cytatami, 2026-11-11), `docs/zakres/rachunek-szablonow.md` (EX), decyzje D-1052/1053/1055 (DV), D-1300/1301/1304/1305 (EX). Rejestr `docs/tresci/rejestr.json`: R-M6-008/010, R-M7-001/003/005/012, R-M9-001/003/006/009/010, R-M10-007 `potwierdzone` (odczyty 2026-11-04).

## Plan
1. Ponowny odczyt źródeł w dniu pracy (curl + grep, cytat dosłowny) dla każdego warunku: GW worst-turn-card, principles-of-turn-strategy, stack-to-pot-ratio, pot-geometry; UP check-raise-lucid, check-raising-strategies, podcast ep1; PC double-barrel, poker-stats; deepfold hud. Wynik: `docs/tresci/odczyty/hp-2026-11-16.tsv` + rejestr źródeł szkiców.
2. Szkice pl i en (6 × 2 pliki) w `fd/`, format jak `sc-31.yaml`: sytuacja z krótkim pierwszym zdaniem (tytuł), poziomy wg planu zawężone do wariantów ze źródłem (D-1053), wyjaśnienia BR-OCE-001/002, reguła z poziomem pewności, liczby tylko `{{n:}}` istniejących kluczy.
3. Lista warunków generatora dla HO: `docs/tresci/szablony-robocze/fd/warunki-hp.md`.
4. Niezależna weryfikacja (subagent, świeży kontekst): cytat w surowym tekście, zdanie nie mówi więcej niż źródło. Nie dotykam `content/` ani kodu.

## Stan wykonania (2026-11-16)
- Gotowe: 6 szkiców pl+en (`fd/{pl,en}/sc-{16,18,21,26,27,30}.yaml`), rejestr twierdzeń `fd/rejestr-hp.md` (T-HP-01…30), odczyty `docs/tresci/odczyty/hp-2026-11-16.tsv`, warunki dla HO `fd/warunki-hp.md` (5f383a7c + D-1722).
- Kontrole: klucze `{{n:}}`/`{{t:}}`, brak gołych cyfr, zgodność struktury pl/en: zielone dla 12 plików.
- Weryfikacja niezależna (świeży kontekst, każde zdanie u źródła): 0 błędów cytatu i liczb; 8 zdań za mocnych, 1 błędne (SC-26 „płacisz mało względem puli”), 3 bez wpisu: poprawione; skutek merytoryczny: D-1722 (SC-16 call `compliant`).
- Otwarte: SC-26 T po 08-EX-3; SC-30 Ś niewykonalne (D-1721); DV SC-18b podważone (D-1716); nowe znaczniki `{{w:spr}}`, `{{w:rozmiar}}`, `{{w:vpip}}` dla HO.
