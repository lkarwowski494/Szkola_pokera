# Koszty M1 — 2026-11-17

Przelicznik USD [OCENA]: 15–20 USD/mln tokenów (dane projektu: `docs/koordynacja/koszty.md` na `koordynacja`, AX i BA). Narzędzie Agent podaje zużycie tokenów subagenta w wyniku — wpisuję je, gdy jest.

| Pozycja | Szacunek tokenów | Zużycie | Iloraz | Uwagi |
|---|---|---|---|---|
| E0a bramka 02 | 0 | 0 | — | wyjątek nazwany właściciela (D-1990) |
| M1 E0 + E0b (do STOP 1) | 0,1–0,2 mln | [do odczytu z /usage właściciela] | — | sesja główna; bez subagentów |
| partia 1 (soczewki ×5, 01, 02, 03, 10) | 1,6–3,1 mln | — | — | |
| partia 2 (04, 05, 08, 12, 06-tresci-b) | 2,0–4,7 mln | — | — | |
| partia 3 (06, 07, 09, 11) | 1,6–3,7 mln | — | — | |
| weryfikacja przeciwna (P0, P1, P2 krytyczne) | 0,8–2,3 mln | — | — | |
| M1 scalanie i raport | 0,5–1,0 mln | — | — | |
| **Razem (wariant c)** | **8–15 mln (130–260 USD)** | — | — | próg STOP wyjątkowego 22,5 mln / ok. 390 USD |

## Zużycie na agenta (z powiadomień narzędzia Agent: subagent_tokens, czas)
| Agent | Model | Tokeny | Czas | Wywołania narzędzi |
|---|---|---|---|---|
| soczewka właściciel | opus | 123 037 | 3,7 min | 21 |
| soczewka nowy użytkownik | opus | 121 789 | 4,2 min | 24 |
| soczewka praktyk dziedziny | opus | 131 390 | 4,3 min | 31 |
| soczewka recenzent sklepu | opus | 126 804 | 5,0 min | 29 |
| soczewka sceptyk ryzyka | opus | 152 881 | 7,5 min | 48 |
| **soczewki razem** | | **655 901** (plan 0,5–0,75 mln) | | |
| 03-zakres | opus/high | 302 808 (plan 0,25–0,5 mln) | 13,4 min | 89 |
| 10-wydanie | opus/medium | 288 303 (plan 0,25–0,55 mln) | 14,8 min | 86 |
| 02-monetyzacja | opus/high | 332 319 (plan 0,35–0,8 mln) | 15,7 min | 108 |
| 01-odkrywanie | opus/high | 356 281 (plan 0,25–0,5 mln) | 19,5 min | 107 |
| **partia 1 razem** | | **1 935 612** (plan 1,6–3,1 mln; iloraz do środka 2,35 mln ≈ 0,82) | ok. 20 min zegarowo | |

## Punkt kontrolny kosztu po partii 1 (D-020; 2026-11-17 ok. 11:35 UTC)
- Zużycie sesji IR łącznie z subagentami (get_session `usage.cost_usd`): **39,71 USD** (E0, E0b, STOP 1, partia 1). Tokeny subagentów partii 1: 1,94 mln (plan 1,6–3,1 mln; iloraz do środka ≈ 0,82). Wynikowy przelicznik ≈ 17–18 USD/mln (w założonym przedziale 15–20).
- Prognoza reszty (iloraz 0,82 × środek planu partii 2, 3, weryfikacji i M1 ≈ 8,3 mln): ok. 6,8 mln tokenów ≈ **120 USD** (przedział 85–200). Razem audyt ≈ **160 USD** (przedział 125–240) wobec planu 130–260; próg STOP wyjątkowego 22,5 mln / ok. 390 USD bez zagrożenia.
- Znaleziska partii 1 (przed scaleniem i weryfikacją): P0 2 (ta sama przyczyna), P1 7, P2 16; soczewki 5 × 15 punktów.
