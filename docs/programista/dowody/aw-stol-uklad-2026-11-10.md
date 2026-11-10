# Dowód AW: układ stołu z trzema rzędami (D-476), 2026-11-10

Test odtwarzający: `apps/mobile/src/features/stol/__tests__/ukladRzedow-08.test.ts` (8) i `components/__tests__/Stol-08.test.tsx` („D-476…”, 2). Przed poprawką owal miał wysokość `floor(szerokość/1,7)`; po poprawce `ukladRzedow`.
Wyniki funkcji dla rywal 2 + board 5 + gracz 2 (pole = ekran − 32 pt; pomiar w jednostkach pt, jest bez renderu natywnego):

| ekran | szerokość owalu | wysokość przed | wysokość po | szerokość sukna | rozmiar kart rywal/board/gracz |
|---|---|---|---|---|---|
| 320 | 232 | 136 | 284 | 180 | md / sm / lg |
| 390 | 302 | 177 | 310 | 250 | md / md / lg |
| 430 | 342 | 201 | 310 | 290 | md / md / lg |

Potrzebna wysokość treści (390 pt): 21+56+21+56+72 + 4×8 odstępu = 258 pt + padding sukna 2×16 = 290 pt → przed 177 pt: nadmiar 113 pt wychodził poza owal; po 310 pt: mieści się. Karty: board 5 kart „md” = 224 pt szerokości vs 250 pt sukna (390); przy 320 pt sukno ma 180 pt, więc board „sm” (118 pt).
Czego nie zmierzono: renderu na urządzeniu i zrzutu Expo web (brak symulatora w tej sesji); pozycja na liście telefonu. Duży tekst: podpisy rzędów mają `allowFontScaling={false}`, karty stałe — wysokość owalu nie zależy od ustawienia tekstu, tekst pod stołem jest poza owalem w układzie kolumnowym.
