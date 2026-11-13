# Plan HI (stan 2026-11-13)
Rola 09-lokalizacja, kontrola zastępcza przekładów (polecenie HI @ 6ccb1f90), gałąź `claude/sesja-hi-przeklady` od 034b2dfb.
Zrobione: wszystkie pozycje z `lista-recenzji-hf.md` dla ja/ko/vi/zh-Hant oraz recreational i mdf dla fr/it/es/pt/pt-BR (przy okazji także fr second-pair, it/es mdf i pt-BR 4-bet). Raport: `kontrola-zastepcza-hi.md`; decyzje D-1640…D-1647 (`docs/decyzje/HI.md`). Zmiany treści: SC-13 ja/ko (ułamki cyframi), komentarze i `mdf: null` w terms-nazwy.
Weryfikacja: `pnpm content:build` exit 0; D-043: 62300 = 62300 ID w 35 bazach (`dowody/hi-2026-11-13/d043.md`); `pnpm run ci` exit 0 (`dowody/hi-2026-11-13/ci.md`).
Otwarte: ja second-pair (ekspert), zh-Hant 3-bet/4-bet (ekspert), vi/zh-Hant recreational bez źródła; it second-pair i de recreational poza zakresem.
Następny krok: weto koordynatora albo właściciela; scalenie robi koordynator.
