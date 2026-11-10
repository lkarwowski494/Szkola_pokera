# Stan sesji BY (rola 04, fix BI-002): pusta kolejka Powtórek
Aktualizacja: 2026-11-10 · gałąź `sesja-by-powtorki` (start 70fdf40) · polecenie `docs/koordynacja/polecenia/BY.md` @ a07904d

## E0
- Środowisko: Linux, Node v22.23.4, Playwright 1.63.0 (globalny, `createRequire`), git z prawem push na gałąź roboczą. Sesja tylko z dokumentami, bez kodu aplikacji i bez `pnpm run ci` (zmiany poza `apps/`, `packages/`).
- Klasyfikacja: BI-002 = **P** (zachowanie i wygląd przejścia), więc PYTANIE do koordynatora; do odpowiedzi rekomendacja zapisana jako warunkowa (D-685).
- Trening (D-191), klon `--depth 1` @ 2e4b0f8, odczyt 2026-11-10: `components/TodayPlan.tsx:54`, `:89` („Dziś wolne” + „Następne: …”), `:68` (pasek tygodnia zawsze aktywny), `components/BoardControls.tsx:17-19` (`disabled` tylko dla kroków bez możliwego kroku).

## Zrobione
- Spec: `docs/design/menu-i-zebatka.md`, sekcja „Powtórki przy pustej kolejce” (przejścia, teksty pl, wskazówki wdrożenia, opcje odrzucone).
- Makieta: `ekrany/powtorki-pusta.html` (przed: 4 ekrany; A: 2; B: 2; C: 1); arkusze `wzorce-zrzuty/powtorki-pusta/` (390 jasny i ciemny, 320 AX5, 390 w skali szarości).
- Pomiar: kontrast `kontrast-powtorki-pusta.txt` (A i C OK, 6,30–15,67:1; B BRAK, 1,97–3,24:1; kod 1 przez B); `warsztat.mjs` na makiecie 390: OK, 0 błędów (ostrzeżenia: odstępy 2/10/14 z `menu.css`, 6 wielkości tekstu na arkuszu wielu ekranów); wiersze stanu kafelka `wiersze-powtorki-pusta.txt` (C: 2 zamiast 1).
- Krytyka (usterki znalezione i poprawione w makiecie): forma liczby „0 darmowych aktywności” (i18next pl `many`); „po kilku dniach” zastąpione „w odstępach” (bez niesprawdzonego odstępu); tekst C jednoznaczny („Brak na dziś, następna jutro”); „ukończonych lekcji” → „lekcji” (karta powstaje przy pierwszej odpowiedzi, `apps/mobile/src/features/session/aktywnoscSesji.ts:113`).
- Decyzja: D-685 (warunkowa), `docs/decyzje/BY.md`.

## Otwarte
- Odpowiedź właściciela na PYTANIE (A / B / C); po niej D-685 z „warunkowa” na ostateczną albo zmiana.
- Przekład 6 nowych kluczy (rola 09); wdrożenie i flow Maestro 02 (rola 08, koordynator).
- Zrzut na urządzeniu po wdrożeniu: „przed” = arkusz `przed-*`, „po” = ekran `a-*` (lista dla właściciela przy wdrożeniu).

## Następny krok
Czekać na odpowiedź koordynatora; po wyborze zaktualizować D-685 i spec (bez zmian w kodzie).
