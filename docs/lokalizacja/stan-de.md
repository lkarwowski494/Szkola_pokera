# Stan sesji DE (rola 09, build): przekład scenario.action.*, „preflop”, bb, ŚR-1/ŚR-2
Aktualizacja: 2026-11-11 · gałąź `sesja-de-przeklad` (start 564c3813) · polecenie `docs/koordynacja/polecenia/DE.md` @ 0a3eaca7 · decyzje `docs/decyzje/DE.md` (D-902…D-905)

## Zrobione
- Zad. 1: 13 kluczy `scenario.action.*` przełożone w 10 słownikach; `i18n:kod` 0 błędów; wyjątki „taki sam jak źródło” w `dowody/de-wyjatki-2026-11-11.md`; przekład zwrotny świeżym subagentem (`dowody/de-zwrotny-wejscie.md`, `-wynik.md`): poprawiono ja (まで→に, kwota przed akcją), ko (kwota przed akcją), zh-Hant (bez spacji w „加注到”); formy es/fr/it/pt-BR zgodne z `play.*` świadomie zostawione (D-902). Test: `apps/mobile/src/i18n/__tests__/scenariusz-akcje-de-09.test.ts` (czerwony 24 z 34 na starych słownikach, zielony po).
- Zad. 2 (D-887): `scenario.marker.preflop` niepotrzebny (D-903). Zmiany: pt, pt-BR „Pré-flop”→„Preflop”; pozostałe 8 słowników bez zmian (en, pl zaakceptowane przez DA). `content/` bez zmian.
- Zad. 3 (NIS-DA-01): `play.log.*` „{{bb}}bb”→U+00A0 w 12 słownikach (D-904); test w tym samym pliku. Pozostałe `play.*` z „{{bb}}bb” (potLabel, call, bet, raise, allin, handWon/Lost…) bez zmian — do 08/04.
- Poprawka kontekstu: `pl.kontekst.json` scenario.action (D-905).

## Otwarte
- Zad. 4 (ŚR-1, ŚR-2): kod `sha_pl` jest w 64ca577b (CY), poza bazą tej gałęzi; pytanie do koordynatora (opcje A cherry-pick / B czekanie / C tylko ŚR-1). ŚR-1 (z recenzji DB): wpisy krytyczne bez `sha_pl` to 6 ID × 11 języków = 66: n:dd.bi.small, M12-L4-RAMKA (partia m12-m13), H-INT-1, H-INT-2 (pomoc), t:bankroll, t:risk-of-ruin (terminy); partie m0–m11 nie mają żadnego — zapis D-878/`stan-cy.md` („m0-m4, m5-m8, m9-m11”) jest błędny.
- `scenario.numbers.*`: poza zakresem (klucze doda 08).
- Przegląd człowieka przekładu nazw akcji: brak (przegląd modelu ≠ rodzimy użytkownik); zrzuty w najdłuższym języku: nie wykonane (ekran w buildzie po wdrożeniu 08).
- Uwaga dla 06: w pt/pt-BR treść ma w prozie „pré-flop” (23–30) obok „preflop”.

## Punkt czyszczenia
Rola 09, build, polecenie DE; plik stanu `docs/lokalizacja/stan-de.md`; następny krok: odpowiedź koordynatora ws. zad. 4, potem `pnpm run ci` i push.
