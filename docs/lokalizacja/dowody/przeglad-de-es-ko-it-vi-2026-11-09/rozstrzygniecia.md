# Rozstrzygnięcia drugiego przeglądu przekładu de i es (D1–D3, E1–E3, kontrola (a)); ko, it, vi — następna sesja

Data: 2026-11-09, sesja AI (tylko docs, rola 09; prompt roli niezłożony — add_repo `prompts` odrzucone przez klasyfikator uprawnień, wyjątek nazwany jak D-381; instrukcja z wzoru AD: `../przeglad-pt-BR-fr-2026-11-09/rozstrzygniecia.md`, REJESTR `scripts/i18n/wspolne.mjs:60–75`, D-287, D-344). Wejście: propozycje z przebiegów 42700455560, 42700470707, 42707292121 (`../przeklad-de-es-ko-it-vi-2026-11-09.txt`). **Nic nie zapisano do `content/` ani `locales/`**; poprawki to listy do `docs/lokalizacja/narzedzia/poprawki.mjs` na kopię propozycji. Decyzje: D-385, D-386.

## Jak przeglądano

- 6 subagentów w świeżym kontekście, bez notatek tłumacza, wspólna instrukcja (scratchpad `instr.md`: rejestr de „du”, es es-ES „tú”; reguły znaczników; wagi). Próba na język: cały `rules.yaml`, `spots.yaml`, `areas.yaml`, `modules.yaml` (D1/E1); cały słownik UI i `terms-def.yaml` + terminologia na przeczytanych źródłach i szkic K-05 (D2/E2); lekcje m0-l1, m2-l2, m5-l3, m10-l1, **m12-l4** + egzamin m2 (D3/E3). 39 lekcji i 13 egzaminów na język: tylko kontrola automatyczna (`kontrolaPropozycji`).
- Kontrola (a) treści krytycznej (D-135) w zakresie zadania: m12-l1 i R-M12-* (11 reguł). Przekład zwrotny de→pl i es→pl w jednej sesji **bez dostępu do źródła**, porównanie sensu z rozstrzyganiem na oryginale w trzeciej: `wynik-a-de.md`, `wynik-a-es.md` — **zaliczona w obu**, 0 znalezisk; [NIEJASNE] („vor ihnen absetzt”, „se aleja de ellas”; R-M12-011 „czyli przy pełnym bankrollu”) zgodne ze źródłem pl (`content/pl/rules.yaml:1031`, m12-l1 „wynik od nich ucieka”). m12-l4 (ramka „Odpowiedzialna gra”) w próbie D3/E3: granice i przeczenia poprawne.
- Kontrola wyniku: wszystkie 6 list razem na kopiach (`poprawki.mjs`): de-lekcje 5, es-lekcje 17, de+es reszta 139 = **161 nałożonych, 0 pominiętych** (kod 0); `ocena-propozycji.mjs` na HEAD 1c3e752: lekcje 44/44 × 2, reszta 40/42 (tylko UI `welcome.title`, D-385). sha256 kopii (pierwsze 16 zn.): de-lekcje 377ecc9015256271, es-lekcje be701689eba73058, reszta d6b0cee50b347e10.

## Podsumowanie

| grupa | zakres | KRYT | WYS | ŚR | NISKIE | poprawek |
|---|---|---|---|---|---|---|
| D1 | de rules, spots, areas, modules | 0 | 0 | 5 | 8 | 23 |
| D2 | de UI, terms-def, terminologia | 0 | 0 | 9 | 4 | 28 |
| D3 | de 5 lekcji + egzamin m2 | 0 | 1 | 5 | 3 | 13 |
| A-de | kontrola (a) de | 0 | 0 | 0 | 0 | 0 |
| E1 | es rules, spots, areas, modules | 0 | 0 | 7 | 5 | 48 |
| E2 | es UI, terms-def, terminologia | 0 | 0 | 8 | 7 | 32 |
| E3 | es 5 lekcji + egzamin m2 | 0 | 0 | 3 | 5 | 17 |
| A-es | kontrola (a) es | 0 | 0 | 0 | 0 | 0 |

Razem: **de 64, es 97** poprawek; wszystkie WYS i ŚR w listach (poza znaleziskami systemowymi w lekcjach poza próbą — plan §3), NISKIE tylko krótkie i pewne.

## Decyzje szczegółowe

| raport | miejsce | waga | decyzja |
|---|---|---|---|
| D3 | de `exams/m2.yaml` q2 „Die Straße bringt dir nur eine Acht” (odwrócony sens: pl „strita daje tylko ósemka”) | WYS | przyjęto „Nur eine Acht bringt dir die Straße” |
| D2, D1 | de straight: UI „Straight”, lekcje „Straße” (104×) | ŚR | nazwa „Straße” (de.wikipedia „Ein Straight, im Deutschen auch Straße”), UI ujednolicone (16 kluczy); ulica = „Street” (modules m1, m9; sklep) |
| D1 | de „weiter” = „szerzej” dwuznaczne („kann weiter pushen”) | ŚR | „breiter” (4 reguły) |
| D3 | de m12-l4 „auf der Karte zum verantwortungsvollen Spielen” („Karte” = karta do gry) | ŚR | wskazanie ramki „Verantwortungsvolles Spielen”; to samo w m12-l3:133 — plan §3 (ponowna kontrola (a) tego zdania) |
| D2, D3 | de rodzaj „Bet” (der/die), SPR nijaki, „hohes {{t:two-pair}}” | ŚR | żeński wg źródeł i większości; poza próbą — skrypt w sesji kodu (plan §3) |
| E2 | es `drill.category.*` bez formy („Ambos tenéis two pair”) | ŚR | formy jak `categoryAcc` |
| E2, E1 | es Q „reina”/„dama”, wet „mojado”/„húmedo”, recreacional/recreativo, suited/„del mismo palo” | ŚR | „dama”, „húmedo” (oś „humedad”, PokerStrategy „mesa húmeda”), „recreativo”, „del mismo palo” |
| E3, E1 | es call „pagar”/„igualar” | ŚR | „igualar” (przycisk UI „Igualo”, większość lekcji); zamiana „pagar” poza próbą skryptem (plan §3) |
| E3 | es m5-l3 `{{t:big-blind}}` bez formy ×10 („la big blind”) | ŚR | `{{t:big-blind\|ciega grande}}` |
| E2 | es K-05: board „mesa” („en la {{t:board}}”), call/fold rzeczowniki angielskie, top pair/overpair/blocker po angielsku (źródła), tłumacz „pareja máxima”×84 | — | szkic `terms-nazwy-es.yaml` (126/162 ze źródłem, 0 konfliktów rodzaju na 705 miejscach); „pareja máxima” vs „top pair” — [DO USTALENIA] 06/09 |
| D2, E2 | `welcome.title` „Pokerschule”/„Escuela de Póker” wobec „PokerGym” | — | D-385: „PokerGym” w kopii + odświeżenie skrótu (0 USD) |
| E2 | es-ES / es-419: „bote”/„pozo” (źródło), vosotros/ustedes, ordenador/computadora | — | notatka dla przyszłej nakładki es-419 (`E2-terminy.md`) |
