# Plan sesji HZ (06-tresci build) — stan bieżący
Polecenie `origin/koordynacja:docs/koordynacja/polecenia/HZ.md` @ fcbbab6f · gałąź `claude/sesja-hz-tresci` od 199fa046 · decyzje `docs/decyzje/HZ.md` (D-1820…D-1829) · rejestr `docs/tresci/rejestr-hz.md`.
Etap (odpowiedź koordynatora 2026-11-16, opcja A): szablony robocze w `docs/tresci/szablony-robocze/hz/`; przeniesienie do `content/` + `content:build` + ci szablonów osobnym zleceniem po scaleniu sesji 08 (bramka ekranu).

| Zad. | Stan | Dowód |
|---|---|---|
| 1. 6 szkiców HP → szablony | gotowe w `hz/{pl,en}` (SC-16, 18, 21, 26, 27, 30); D-1710 → D-1820; SC-18 bez bet-small, SC-30 bez `{{w:vpip}}` (IB/KO-115) | `docs/tresci/dowody/hz-szablony.txt` |
| 2. SC-09 | gotowe w `hz/{pl,en}`, gracz CO; BB otwarte OP-HZ-1 | jw., `rejestr-hz.md` |
| 3. Uwagi HY | pl/en w `content/` + 10 przekładów (tylko zmienione zdania) | `hz-kontrola-przekladow.mjs`, ci |
| 4. Przekład 7 szablonów | `hz/<j>/` dla 10 języków, agent, do kontroli 09 | `hz-kontrola-przekladow.mjs` |
| 5. Build i ci | gotowe: `content:build` z poprawkami HY, D-043 (bez nowych ID), `env -u NODE_PATH pnpm run ci` kod 0 na c478cfa6 | `docs/tresci/dowody/hz-ci-c478cfa6.txt` |

Otwarte (do PRZEKAZANIA):
- SC-30: 21 klas (D-1829) z pasem przy VPIP 8–10% < POJEMNOSC_MIN 40 → opcja A przyjęta przez koordynatora 2026-11-16: wyjątek pojemności nit-3bet robi sesja IB (jak D-1040).
- SC-18 poziom T (bet-small na turnie): rola 04.
- SC-09 z graczem na BB (OP-HZ-1); sprzeczność w tabeli PW (OP-HZ-2) do przeglądu R-M4-012.
- Wątpliwości przekładu dla roli 09: pt (spr/icm/vpip bez `terms-nazwy`), ko (second-barrel, isolation „[DO USTALENIA]”), zh-Hant (3-bet null).
- Napisy UI `scenario.numbers.riverCatchMore/Less` (liczba vs udział blefów): rola 04/09.
- Przy przeniesieniu do `content/`: dopisać `hz/liczby-hz.yaml` do `content/numbers.yaml` i `hz/bez-twierdzen-hz.json` do `docs/tresci/rejestr/bez-twierdzen.json`; przekłady z `hz/<j>/` do `content/<j>/scenarios/`; nagłówki plików pl wskazują decyzje HZ.
