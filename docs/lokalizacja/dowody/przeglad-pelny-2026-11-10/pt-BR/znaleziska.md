# Pełny przegląd przekładu — pt-BR — 2026-11-10 (sesja AQ, rola 09 audit, tylko dokumenty)

Stan przekładu: gałąź `claude/sleepy-brahmagupta-2065nu` @ 016317e. Źródło: pl (en pomocniczo). Czytający: 13 subagentów w świeżym kontekście (ten sam model co sesja), instrukcja `../instrukcja-subagenta.md`; 0 USD API, workflow `przeglad-tlumaczen.yml` nieuruchamiany. To drugi przegląd AI całości, nie przegląd rodzimego użytkownika języka.

## Liczby

| Część | Zakres | KRYT | WYS | ŚR | NISKIE | Znalezisk | Poprawek |
|---|---|---|---|---|---|---|---|
| pt-BR-L1 | m0-l1 m1-l1 m2-l1 m2-l2 m3-l1 m3-l2 m3-l3 m4-l1 m4-l2 | 0 | 0 | 6 | 2 | 8 | 8 |
| pt-BR-L2 | m4-l3 m4-l4 m5-l1 m5-l2 m5-l3 m5-l4 | 0 | 0 | 1 | 1 | 2 | 2 |
| pt-BR-L3 | m6-l1 m6-l2 m6-l3 m7-l1 m7-l2 | 0 | 0 | 2 | 3 | 5 | 5 |
| pt-BR-L4 | m7-l3 m7-l4 m8-l1 m8-l2 m8-l3 m8-l4 | 0 | 0 | 2 | 6 | 8 | 8 |
| pt-BR-L5 | m9-l1 m9-l2 m9-l3 m9-l4 m10-l1 | 0 | 0 | 3 | 0 | 3 | 3 |
| pt-BR-L6 | m10-l2 m10-l3 m10-l4 m11-l1 m11-l2 m11-l3 | 0 | 0 | 5 | 2 | 7 | 7 |
| pt-BR-L7 | m12-l1 m12-l2 m12-l3 m12-l4 m13-l1 m13-l2 m13-l3 | 0 | 0 | 5 | 7 | 12 | 12 |
| pt-BR-R1 | rules.yaml R-M0…R-M7 | 0 | 0 | 4 | 6 | 10 | 10 |
| pt-BR-R2 | rules.yaml R-M8…R-M13 | 0 | 0 | 2 | 1 | 3 | 3 |
| pt-BR-X1 | exams m0–m6 | 0 | 0 | 10 | 0 | 10 | 10 |
| pt-BR-X2 | exams m7–m13 | 0 | 0 | 2 | 1 | 3 | 3 |
| pt-BR-U | interfejs, areas, modules, spots, helplines, metadane sklepu | 0 | 0 | 5 | 5 | 10 | 11 |
| pt-BR-T | terms-def, terms-nazwy | 0 | 0 | 23 | 2 | 25 | 25 |
| pt-BR-S | uzupełnienia koordynującego (wzorce czytających w miejscach nieobjętych; `uzupelnienia.tsv`) | – | – | – | – | – | 5 |
| **Razem** | | **0** | **0** | **70** | **36** | **106** | **112** |

Poprawki do nałożenia: `poprawki-pt-BR.json` (112; wg wagi: ŚR 71, NISKIE 41) — format `docs/lokalizacja/narzedzia/poprawki.mjs` (jezyk, cel, stary, nowy, waga, powod, grupa); `stary` występuje w pliku `cel` dokładnie raz na stanie 016317e. Jedno znalezisko może mieć kilka poprawek (wzorzec rozpisany na wystąpienia), a jedna poprawka łączyć dwa znaleziska w tym samym fragmencie.

## Rozstrzygnięcia koordynującego (sesja AQ; terminologiczne — do weta)

**KRYT 0, WYS 0** — nie było czego obalać w weryfikacji przeciwnej; treść krytyczna (m12-l1…l4, R-M12-*, exams/m12, helplines) przeczytana w całości przez pt-BR-L7, R2, X2, U: granice („no mais tardar”, „só volta quando”, „nunca menos de”), sygnały ostrzegawcze i `{{helplines}}` zgodne z pl.

**D-432 (2026-11-10, pt-BR): nazwy własne treści i terminy mieszane wyrównane do nazwy z `terms-nazwy.yaml` i do lekcji.** (1) Typy tiltu w `exams/m12.yaml:54–57` „Tilt de …” → „Tilt por …” jak w lekcji m12-l3 (20× „por” wobec 7× „de”; grupa pt-BR-S, 4 poprawki; „tilt de desespero” w m12-l4:51 poprawia pt-BR-L7-01). (2) „micro stakes”/„micro limites” → „microlimites” (pt-BR-L6, L7 + pt-BR-S 1). (3) Definicje `terms-def.yaml`: „raise / dar raise”, „open” → „aumento”, „abertura” (pt-BR-T, 19 linii; w lekcjach 234/239 i 192/192 form rodzimych). (4) payout „premiação/premiações” → „prêmios” („premiação” = prize-pool). (5) „Bubble” → „Bolha”, rake-cap „limite” → „teto”, „Segundo barril” → „Second barrel” (D-392). Odrzucone: (b) zmienić nazwy w pliku nazw na formy mniejszościowe; (c) zostawić — dwa słowa na jedno pojęcie.

**Odrzucone poprawki (3):** pt-BR-U-03 i pt-BR-U-04 (`modules.yaml:2, :10` „ruas” → „streets”) — termin street ma w korpusie trzy formy bez decyzji („streets” 27, „rua(s)” 17, „rodada(s)” 12; plik nazw: `[WIELE FORM]`), zmiana dwóch tytułów modułów bez decyzji globalnej tylko przesuwa niespójność; pt-BR-U-05 (opis sklepu: dopisanie nazw czterech stopni oceny) — pominięcie jest wspólne dla it, es-ES i pt-BR, więc to decyzja generatora metadanych (rola 10), nie błąd przekładu. Znaleziska zostają w tabeli.

**Bez rozstrzygnięcia (decyzja globalna; skrypt `ujednolic-formy.mjs` sesji kodu albo rodzimy użytkownik):**
- street: „streets” / „ruas” / „rodadas” (m9-l1/l2 „rodada”, m9-l3 „rua”, m9-l4 „street”); „pré-flop” (30× po poprawkach) wobec „preflop” (127×; nazwa `[DO USTALENIA]`) przy „pós-flop” 10× wobec „postflop” 1×; check „passar” / „dar check” (61/215); draw „projeto” / „draw” (111/168); board „mesa” / „board” (29/60); blocker „bloqueador” (19/22) wobec nazwy „blocker”; „adversário” / „rival”; „app” / „aplicativo”; rodzaj „c-bet”.
- Klucze `oesd`, `spr`, `utg`, `mdf`, `vpip`, `pfr`, `icm`, `hud` nie mają wpisu w `content/pt-BR/terms-nazwy.yaml` (151 nazw wobec 162 terminów; it i es mają 162) — czytający nie sprawdzali, czy build daje nazwę zastępczą (skrót); do potwierdzenia przez sesję kodu (`tools/content-build/src/nazwy.ts`).
- Metadane sklepu `store/app-store-metadata.json` (pt-BR): poprawki pt-BR-U-08…10 (prova → exame, índice de evolução → nível, aulas → lições) dotyczą pliku generowanego z `docs/sklep/aso/zbuduj-metadane.py` i pilnowanego testem `tests/narzedzia/asc.test.mjs` — nanieść w źródle generatora (rola 10); podtytuł „sem apostas” („aposta” = bet w aplikacji) do oceny roli 10.

**Błąd źródła (do roli 06, bez poprawki):** pl `content/pl/lessons/m10-l3-odejscie-od-bazy.md:49` „rozmiary i stoły” wobec `:109` „rozmiary i flopy”; trzy niezręczne zdania pl (m7-l2:65, m7-l1:76, m6-l2:84) — szczegóły w pt-BR-L3, pt-BR-L6.

**Kontrola łączna (`scal.py pt-BR --bez pt-BR-U-03,pt-BR-U-04,pt-BR-U-05`):** 0 pominiętych; YAML/JSON parsuje się; `{{n:…}}` i `[[…]]` = pl. Różnice kluczy `{{t:…}}` wobec pl po poprawkach: `rules.yaml` (bet −1, fold −1 — sprzed przeglądu; drugi brakujący `t:fold` dodaje pt-BR-R2-01), `lessons/m9-l1-spr.md` (bet −2, jak en), `m10-l1` (`t:fold`, `t:nit` +1), `exams/m4.yaml:92` (`t:value` +1, jak en).

## Pokrycie jednostek (65 z `jednostki()` w `scripts/i18n/wspolne.mjs:147` + 2 poza listą)

| Nr | Jednostka | Przejrzana w całości | Przez kogo |
|---|---|---|---|
| 1 | `apps/mobile/src/i18n/locales/pt-BR.json` | tak | pt-BR-U |
| 2 | `content/pt-BR/areas.yaml` | tak | pt-BR-U |
| 3 | `content/pt-BR/exams/m0.yaml` | tak | pt-BR-X1 |
| 4 | `content/pt-BR/exams/m1.yaml` | tak | pt-BR-X1 |
| 5 | `content/pt-BR/exams/m10.yaml` | tak | pt-BR-X2 |
| 6 | `content/pt-BR/exams/m11.yaml` | tak | pt-BR-X2 |
| 7 | `content/pt-BR/exams/m12.yaml` | tak | pt-BR-X2 |
| 8 | `content/pt-BR/exams/m13.yaml` | tak | pt-BR-X2 |
| 9 | `content/pt-BR/exams/m2.yaml` | tak | pt-BR-X1 |
| 10 | `content/pt-BR/exams/m3.yaml` | tak | pt-BR-X1 |
| 11 | `content/pt-BR/exams/m4.yaml` | tak | pt-BR-X1 |
| 12 | `content/pt-BR/exams/m5.yaml` | tak | pt-BR-X1 |
| 13 | `content/pt-BR/exams/m6.yaml` | tak | pt-BR-X1 |
| 14 | `content/pt-BR/exams/m7.yaml` | tak | pt-BR-X2 |
| 15 | `content/pt-BR/exams/m8.yaml` | tak | pt-BR-X2 |
| 16 | `content/pt-BR/exams/m9.yaml` | tak | pt-BR-X2 |
| 17 | `content/pt-BR/lessons/m0-l1-uklady.md` | tak | pt-BR-L1 |
| 18 | `content/pt-BR/lessons/m1-l1-przebieg.md` | tak | pt-BR-L1 |
| 19 | `content/pt-BR/lessons/m10-l1-statystyki.md` | tak | pt-BR-L5 |
| 20 | `content/pt-BR/lessons/m10-l2-typy-graczy.md` | tak | pt-BR-L6 |
| 21 | `content/pt-BR/lessons/m10-l3-odejscie-od-bazy.md` | tak | pt-BR-L6 |
| 22 | `content/pt-BR/lessons/m10-l4-rake.md` | tak | pt-BR-L6 |
| 23 | `content/pt-BR/lessons/m11-l1-push-fold.md` | tak | pt-BR-L6 |
| 24 | `content/pt-BR/lessons/m11-l2-sprawdzanie.md` | tak | pt-BR-L6 |
| 25 | `content/pt-BR/lessons/m11-l3-icm.md` | tak | pt-BR-L6 |
| 26 | `content/pt-BR/lessons/m12-l1-wariancja.md` | tak | pt-BR-L7 |
| 27 | `content/pt-BR/lessons/m12-l2-decyzja-wynik.md` | tak | pt-BR-L7 |
| 28 | `content/pt-BR/lessons/m12-l3-tilt.md` | tak | pt-BR-L7 |
| 29 | `content/pt-BR/lessons/m12-l4-bankroll.md` | tak | pt-BR-L7 |
| 30 | `content/pt-BR/lessons/m13-l1-raport.md` | tak | pt-BR-L7 |
| 31 | `content/pt-BR/lessons/m13-l2-powtorki.md` | tak | pt-BR-L7 |
| 32 | `content/pt-BR/lessons/m13-l3-przeglad.md` | tak | pt-BR-L7 |
| 33 | `content/pt-BR/lessons/m2-l1-outy.md` | tak | pt-BR-L1 |
| 34 | `content/pt-BR/lessons/m2-l2-pot-odds.md` | tak | pt-BR-L1 |
| 35 | `content/pt-BR/lessons/m3-l1-pozycja.md` | tak | pt-BR-L1 |
| 36 | `content/pt-BR/lessons/m3-l2-rece-startowe.md` | tak | pt-BR-L1 |
| 37 | `content/pt-BR/lessons/m3-l3-zakresy-otwarc.md` | tak | pt-BR-L1 |
| 38 | `content/pt-BR/lessons/m4-l1-3bet.md` | tak | pt-BR-L1 |
| 39 | `content/pt-BR/lessons/m4-l2-obrona-bb.md` | tak | pt-BR-L1 |
| 40 | `content/pt-BR/lessons/m4-l3-wobec-3betu.md` | tak | pt-BR-L2 |
| 41 | `content/pt-BR/lessons/m4-l4-limperzy.md` | tak | pt-BR-L2 |
| 42 | `content/pt-BR/lessons/m5-l1-tekstury.md` | tak | pt-BR-L2 |
| 43 | `content/pt-BR/lessons/m5-l2-przewagi.md` | tak | pt-BR-L2 |
| 44 | `content/pt-BR/lessons/m5-l3-czestotliwosc-rozmiar.md` | tak | pt-BR-L2 |
| 45 | `content/pt-BR/lessons/m5-l4-bez-pozycji.md` | tak | pt-BR-L2 |
| 46 | `content/pt-BR/lessons/m6-l1-mdf-alpha.md` | tak | pt-BR-L3 |
| 47 | `content/pt-BR/lessons/m6-l2-sprawdzenie.md` | tak | pt-BR-L3 |
| 48 | `content/pt-BR/lessons/m6-l3-check-raise.md` | tak | pt-BR-L3 |
| 49 | `content/pt-BR/lessons/m7-l1-druga-beczka.md` | tak | pt-BR-L3 |
| 50 | `content/pt-BR/lessons/m7-l2-polaryzacja.md` | tak | pt-BR-L3 |
| 51 | `content/pt-BR/lessons/m7-l3-implied-odds.md` | tak | pt-BR-L4 |
| 52 | `content/pt-BR/lessons/m7-l4-probe-obrona.md` | tak | pt-BR-L4 |
| 53 | `content/pt-BR/lessons/m8-l1-value.md` | tak | pt-BR-L4 |
| 54 | `content/pt-BR/lessons/m8-l2-ile-blefow.md` | tak | pt-BR-L4 |
| 55 | `content/pt-BR/lessons/m8-l3-blokery.md` | tak | pt-BR-L4 |
| 56 | `content/pt-BR/lessons/m8-l4-bluff-catching.md` | tak | pt-BR-L4 |
| 57 | `content/pt-BR/lessons/m9-l1-spr.md` | tak | pt-BR-L5 |
| 58 | `content/pt-BR/lessons/m9-l2-zaangazowanie.md` | tak | pt-BR-L5 |
| 59 | `content/pt-BR/lessons/m9-l3-rozmiar-geometryczny.md` | tak | pt-BR-L5 |
| 60 | `content/pt-BR/lessons/m9-l4-plan-trzech-ulic.md` | tak | pt-BR-L5 |
| 61 | `content/pt-BR/modules.yaml` | tak | pt-BR-U |
| 62 | `content/pt-BR/rules.yaml` | tak | pt-BR-R1 (do R-M7) + R2 (od R-M8) |
| 63 | `content/pt-BR/ranges/spots.yaml` | tak | pt-BR-U |
| 64 | `content/pt-BR/helplines.yaml` | tak | pt-BR-U |
| 65 | `content/pt-BR/terms-def.yaml` | tak | pt-BR-T |
| + | `content/pt-BR/terms-nazwy.yaml` | tak | pt-BR-T |
| + | `store/app-store-metadata.json (pt-BR)` | tak | pt-BR-U |

Nieprzejrzane: brak (deklaracje pokrycia z zakresami linii: sekcja „Pokrycie” każdego pliku `czesci/pt-BR-*.md`).

## Znaleziska

### pt-BR-L1

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-L1-01 | ŚR | content/pt-BR/lessons/m2-l1-outy.md:51 | `um {{t:flush-draw}}` (wyświetli „flush draw”) | `um {{t:flush-draw\|projeto de flush}}` | Ten sam termin dwojako w jednym pliku: l. 110 wprowadza go jako „Projeto de flush”; pl m2-l1-outy.md:51 i :110 to jeden termin. |
| pt-BR-L1-02 | ŚR | content/pt-BR/lessons/m3-l2-rece-startowe.md:49 | „jogando mãos fracas demais” | „jogando um número excessivo de mãos fracas” | pl m3-l2-rece-startowe.md:49 „grając za dużo słabych rąk” (en „too many weak hands”); przekład czyta się „ręce zbyt słabe”. |
| pt-BR-L1-03 | ŚR | content/pt-BR/lessons/m3-l2-rece-startowe.md:55 | `{{t:late-position\|posição tardia}}` | `{{t:late-position\|posição final}}` | terms-nazwy.yaml: late-position = „posição final” (tak też m4-l1-3bet.md:36 „posições finais”); pl :55. |
| pt-BR-L1-04 | ŚR | content/pt-BR/lessons/m4-l1-3bet.md:48 | `{{t:pocket-pair\|par na mão}}` | `{{t:pocket-pair\|par de mão}}` | terms-nazwy.yaml: pocket-pair = „par de mão”; pl m4-l1-3bet.md:48. |
| pt-BR-L1-05 | ŚR | content/pt-BR/lessons/m4-l2-obrona-bb.md:26 | „Aqui ele também tem os blinds” | „Aqui o pote também tem os blinds” | pl m4-l2-obrona-bb.md:26 „Tu są w niej [puli] jeszcze blindy”; „ele” tuż po „do adversário” czyta się jako rywal. |
| pt-BR-L1-06 | NISKIE | content/pt-BR/lessons/m4-l2-obrona-bb.md:69 | „o {{t:big-blind}} é a que defende” | „é quem defende” | Niezgoda rodzaju (o … a que); pl :69 „broni się najszerzej ze wszystkich pozycji”. |
| pt-BR-L1-07 | ŚR | content/pt-BR/lessons/m4-l2-obrona-bb.md:73 | „realizam menos do que a sua equity” | „realizam menos do que a equity delas” | pl :73 „realizują mniej niż ich equity” (rąk); przy zwrocie „você” „a sua equity” = „twoje equity”. |
| pt-BR-L1-08 | NISKIE | content/pt-BR/lessons/m4-l2-obrona-bb.md:73 | „você defende com elas” | „você defende com eles” | Zgoda rodzaju: „Mãos…, conectores e pares médios” → rodzaj męski; pl :73 „bronisz nimi”. |

### pt-BR-L2

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-L2-01 | ŚR | content/pt-BR/lessons/m4-l3-wobec-3betu.md:76 | „Um às forte do mesmo naipe” | „Um ás forte do mesmo naipe” | Literówka: „às” to ściągnięcie przyimka z rodzajnikiem, karta to „ás” (tak w pozostałych miejscach); pl m4-l3-wobec-3betu.md:76 „Mocny as w kolorze”. |
| pt-BR-L2-02 | NISKIE | content/pt-BR/lessons/m5-l4-bez-pozycji.md:99 | „não significa abrir mão da mão” | „não significa abandonar a mão” | Niezręczne powtórzenie („abrir mão da mão”); pl m5-l4-bez-pozycji.md:99 „nie oznacza rezygnacji z ręki”. Sens bez zmian. |

### pt-BR-L3

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-L3-01 | ŚR | content/pt-BR/lessons/m7-l1-druga-beczka.md:5 | `title: "Segundo barril"` | `title: "Second barrel"` | Ten sam termin nazwany dwojako w pliku: tytuł „Segundo barril”, a w treści 16× „second barrel” (`{{t:second-barrel}}`); terms-nazwy: `second-barrel: "second barrel"`; jedyne wystąpienie „Segundo barril” w całym content/pt-BR; en m7-l1:5 „Second barrel”. (pl m7-l1-druga-beczka.md:5 „Druga beczka”.) |
| pt-BR-L3-02 | ŚR | content/pt-BR/lessons/m7-l1-druga-beczka.md:137 | `bloqueiam o {{t:value\|valor}} do rival` | `bloqueiam o valor do rival` | Dodany znacznik terminu, którego nie ma w źródle: pl m7-l1-druga-beczka.md:137 „gdy blokują wartość rywala” (bez `{{t:value}}`). Zestaw znaczników linii różni się od pl. Skrypt da OSTRZEŻENIE o zmianie znaczników — zamierzone. |
| pt-BR-L3-03 | NISKIE | content/pt-BR/lessons/m6-l2-sprawdzenie.md:98 | `no pré-flop` | `no preflop` | terms-nazwy: `preflop: "preflop"` (pl m6-l2-sprawdzenie.md:98 „przebijał preflop”); m7-l1:114 ma „antes do flop” zgodnie z pl „przed flopem”. |
| pt-BR-L3-04 | NISKIE | content/pt-BR/lessons/m6-l3-check-raise.md:73 | `Parte dos {{t:draw\|projetos}} fortes você {{t:call\|paga}}` | `Com parte dos {{t:draw\|projetos}} fortes você {{t:call\|paga}}` | Kalka polskiego szyku (pl m6-l3-check-raise.md:73 „Część mocnych drawów sprawdzasz”): „pagar” z dopełnieniem bliższym znaczy „zapłacić czemuś/komuś”; w pozostałych miejscach „pagar com”. |
| pt-BR-L3-05 | NISKIE | content/pt-BR/lessons/m6-l3-check-raise.md:125 | `Mãos médias, como {{t:top-pair}} com kicker fraco, você normalmente {{t:call\|paga}}` | `Com mãos médias, como {{t:top-pair}} com kicker fraco, você normalmente {{t:call\|paga}}` | Jak 04 (pl m6-l3-check-raise.md:125 „Średnie ręce … zwykle sprawdzasz”). |

### pt-BR-L4

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-L4-01 | ŚR | content/pt-BR/lessons/m7-l4-probe-obrona.md:106 | „Com pares fracos e mãos sem outs” | „Com {{t:pair\|pares}} fracos e mãos sem outs” | Zgubiony znacznik terminu: pl m7-l4-probe-obrona.md:106 „Słabe {{t:pair\|pary}} i ręce bez outów” (zestaw znaczników linii różni się od źródła). |
| pt-BR-L4-02 | ŚR | content/pt-BR/lessons/m8-l1-value.md:131 | „faz thin value com apostas de até cerca de 1/4” | „faz thin value com apostas de apenas cerca de 1/4” | pl m8-l1-value.md:131 „betuje thin value nawet ok. 1/4 puli” (en: „as small as about 1/4”) — chodzi o dolny kraniec rozmiaru; „de até” czyta się jako górna granica („do 1/4”), co zaciera kontrast z „raramente fica abaixo de 1/2”. |
| pt-BR-L4-03 | NISKIE | content/pt-BR/lessons/m8-l2-ile-blefow.md:139 | „{{t:blocker\|blockers}}” | „{{t:blocker\|bloqueadores}}” | pl m8-l2-ile-blefow.md:139 odsyła do „lekcji o blokerach”; ta lekcja (m8-l3) ma tytuł „Bloqueadores” i w m8-l3/m8-l4 termin brzmi wyłącznie „bloqueador(es)”. |
| pt-BR-L4-04 | NISKIE | content/pt-BR/lessons/m8-l2-ile-blefow.md:126 | „\| 1/2 {{t:pot\|pote}} \|” | „\| 1/2 do {{t:pot\|pote}} \|” | Brak „do”; sąsiednie wiersze tabeli: „1/3 do”, „3/4 do” (pl m8-l2-ile-blefow.md:126 „1/2 puli”). |
| pt-BR-L4-05 | NISKIE | content/pt-BR/lessons/m8-l4-bluff-catching.md:111 | „\| 1/2 {{t:pot\|pote}} \|” | „\| 1/2 do {{t:pot\|pote}} \|” | Jak wyżej; wiersz 110 ma „1/3 do” (pl m8-l4-bluff-catching.md:111). |
| pt-BR-L4-06 | NISKIE | content/pt-BR/lessons/m8-l4-bluff-catching.md:33 | „Quando há poucos {{t:bluff\|blefes}}” | „Quando há {{t:bluff\|blefes}} de menos” | pl m8-l4-bluff-catching.md:33 „Gdy blefów jest za mało” — za mało względem ceny, nie po prostu „mało”. |
| pt-BR-L4-07 | NISKIE | content/pt-BR/lessons/m7-l3-implied-odds.md:134 | „ainda tem à sua frente” | „ainda tem atrás” | pl m7-l3-implied-odds.md:134 „które rywal ma jeszcze przed sobą”; „à sua frente” przy zwracaniu się per „você” jest dwuznaczne (przed tobą / przed nim), a reszta pliku mówi o żetonach rywala „atrás”. |
| pt-BR-L4-08 | NISKIE | content/pt-BR/lessons/m8-l1-value.md:15 | „só custa caro” | „só custa dinheiro” | pl m8-l1-value.md:15 „tylko kosztuje”; „caro” (drogo) dodane. |

### pt-BR-L5

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-L5-01 | ŚR | content/pt-BR/lessons/m9-l2-zaangazowanie.md:96 | „Se depois da sua {{t:bet\|aposta}} sobraria no seu stack” | „Se depois da sua {{t:bet\|aposta}} sobrar no seu stack” | Błąd gramatyczny: po „se” warunkowym futuro do subjuntivo, nie futuro do pretérito (pl m9-l2-zaangazowanie.md:96 „Jeśli po twoim zakładzie zostałoby ci…”). Sens bez zmian. |
| pt-BR-L5-02 | ŚR | content/pt-BR/lessons/m9-l3-rozmiar-geometryczny.md:76 | „Depois da {{t:bet\|aposta}} e do {{t:call\|pagamento}}” | „Depois da {{t:bet\|aposta}} e do {{t:call}}” | Rzeczownik terminu `call` w tym pliku to „call” (bez formy, linie 15 ×2, 85, 89, 93, 117), a w dwóch miejscach „pagamento”: ten sam termin nazwany dwojako w jednym pliku (pl :76 „{{t:call\|sprawdzeniu}}”). |
| pt-BR-L5-03 | ŚR | content/pt-BR/lessons/m9-l3-rozmiar-geometryczny.md:95 | „{{t:pot\|Pote}} depois do {{t:call\|pagamento}}” | „{{t:pot\|Pote}} depois do {{t:call}}” | Jak pt-BR-L5-02 (nagłówek tabeli; dwa zdania wyżej, w linii 93, „um {{t:call}}”; pl :95 „po {{t:call\|sprawdzeniu}}”). |

### pt-BR-L6

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-L6-01 | ŚR | content/pt-BR/lessons/m10-l2-typy-graczy.md:139 | „deixa ele apostar quando tem mãos muito fortes” | „deixa ele apostar quando você tem mãos muito fortes” | Dwuznaczny podmiot: czytelnik może zrozumieć „gdy on ma silne ręce”, czyli odwrotnie. pl m10-l2-typy-graczy.md:139 „z bardzo silnymi rękami pozwalasz mu betować” (en: „when you have very strong hands”). |
| pt-BR-L6-02 | NISKIE | content/pt-BR/lessons/m10-l2-typy-graczy.md:29 | „população dos micro limites online” | „população dos microlimites online” | Pisownia łączna (prefiks micro-) i spójność z m10-l4 („microlimites”). pl m10-l2:29 „mikrostawek”. |
| pt-BR-L6-03 | ŚR | content/pt-BR/lessons/m10-l3-odejscie-od-bazy.md:75 | „população de micro stakes online” | „população de microlimites online” | Termin stakes ma w terms-nazwy nazwę „limite”; sąsiednie lekcje modułu mają „microlimites”. pl m10-l3:75 „mikrostawek”. |
| pt-BR-L6-04 | ŚR | content/pt-BR/lessons/m10-l3-odejscie-od-bazy.md:111 | „Os jogadores da população de micro stakes online” | „Os jogadores da população de microlimites online” | Jak wyżej. pl m10-l3:111. |
| pt-BR-L6-05 | ŚR | content/pt-BR/lessons/m10-l3-odejscie-od-bazy.md:115 | „Dados da população de micro stakes online (NL25):” | „Dados da população de microlimites online (NL25):” | Jak wyżej. pl m10-l3:115. |
| pt-BR-L6-06 | ŚR | content/pt-BR/lessons/m11-l2-sprawdzanie.md:175 | „as {{t:payout\|premiações}} importam” | „os {{t:payout\|prêmios}} importam” | Forma terminu payout (nazwa: „prêmio”) jest nazwą innego terminu, prize-pool („premiação”); w m11-l3 payout to „pagamentos”, a „premiação” to pula nagród. pl m11-l2:175 „wypłaty”. |
| pt-BR-L6-07 | NISKIE | content/pt-BR/lessons/m11-l2-sprawdzanie.md:140 | „Mãos como [[7s 6s]] você {{t:shove\|dá shove}}” | „Com mãos como [[7s 6s]] você {{t:shove\|dá shove}}” | Kalka składni polskiej („Ręce takie jak … pushujesz”): „dar shove” i „desistir” nie przyjmują dopełnienia bez przyimka. pl m11-l2:140. |

### pt-BR-L7

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-L7-01 | ŚR | content/pt-BR/lessons/m12-l4-bankroll.md:51 | `Isso é tilt de desespero.` | `Isso é tilt por desespero.` | Nazwa typu tiltu niespójna z m12-l3 („Tilt por desespero”, pt-BR m12-l3:33,114); pl m12-l4:51 „tilt z desperacji” = ta sama nazwa co pl m12-l3:33 |
| pt-BR-L7-02 | ŚR | content/pt-BR/lessons/m13-l1-raport.md:34 | `com {{t:raise|raise}} ou com` | `com {{t:raise|aumento}} ou com` | Forma „raise” nie jest formą terminu raise = „aumento” (terms-nazwy.yaml:19); pl m13-l1:34 „przebiciem” |
| pt-BR-L7-03 | ŚR | content/pt-BR/lessons/m13-l1-raport.md:37 | `era preciso dar {{t:raise|raise}}` | `era preciso {{t:raise|aumentar}}` | jw.; pl m13-l1:37 „przebić” |
| pt-BR-L7-04 | ŚR | content/pt-BR/lessons/m13-l1-raport.md:43 | `com {{t:raise|raise}} em cerca de` | `com {{t:raise|aumento}} em cerca de` | jw.; pl m13-l1:43 „przebiciem” |
| pt-BR-L7-05 | ŚR | content/pt-BR/lessons/m13-l2-powtorki.md:34 | `Decisões corretas e aceitáveis` | `Decisões alinhadas e aceitáveis` | Stopień oceny „Zgodna” = „Alinhada” (pt-BR m13-l1:90, interfejs); „corretas” to inna nazwa tego samego stopnia; pl m13-l2:34 „Zgodne i dopuszczalne” |
| pt-BR-L7-06 | NISKIE | content/pt-BR/lessons/m13-l3-przeglad.md:33 | `{{t:fold|largaria}} um set aqui` | `{{t:fold|desistiria}} de um set aqui` | Forma „largar” nie jest formą terminu fold (wszędzie „desistir”/„fold”); pl m13-l3:33 „spasowałby” |
| pt-BR-L7-07 | NISKIE | content/pt-BR/lessons/m13-l3-przeglad.md:76 | `de forma sensata, {{t:fold|largar}}` | `de forma sensata, {{t:fold|desistir}}` | jw.; pl m13-l3:76 „spasować” |
| pt-BR-L7-08 | NISKIE | content/pt-BR/lessons/m12-l2-decyzja-wynik.md:89 | `O poker dá um retorno` | `O pôquer dá um retorno` | Pisownia niespójna z resztą modułu i interfejsem („pôquer”: m12-l1:96, m12-l3:104, m12-l4:113); pl m12-l2:89 „Poker” |
| pt-BR-L7-09 | NISKIE | content/pt-BR/lessons/m12-l3-tilt.md:133 | `leia o cartão sobre jogo responsável na lição` | `leia o quadro “Jogo responsável” na lição` | Ta sama „karta o odpowiedzialnej grze” (pl m12-l3:133, m12-l4:102) nazwana w m12-l4:102 „quadro “Jogo responsável””; „cartão” to w m13 karta powtórek |
| pt-BR-L7-10 | NISKIE | content/pt-BR/lessons/m12-l1-wariancja.md:74 | `vencedores nos micro stakes, um` | `vencedores nos microlimites, um` | „mikrostawki” = „microlimites” (terms-def stakes, modules.yaml m10; termin stakes = „limite”); pl m12-l1:74 „na mikrostawkach” |
| pt-BR-L7-11 | NISKIE | content/pt-BR/lessons/m12-l1-wariancja.md:93 | `vencedores nos micro stakes. O` | `vencedores nos microlimites. O` | jw.; pl m12-l1:93 |
| pt-BR-L7-12 | NISKIE | content/pt-BR/lessons/m12-l1-wariancja.md:100 | `vencedores nos micro stakes costumam` | `vencedores nos microlimites costumam` | jw.; pl m12-l1:100 |

### pt-BR-R1

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-R1-01 | ŚR | content/pt-BR/rules.yaml:392 | `K-J-7 {{t:two-tone|de dois naipes}}` | `K-J-7 {{t:two-tone|bicolor}}` | forma nie jest formą terminu two-tone = „bicolor” (terms-nazwy.yaml:76); pl rules.yaml:392 „K-J-7 {{t:two-tone}}” |
| pt-BR-R1-02 | ŚR | content/pt-BR/rules.yaml:266 | `logo abaixo desse limite` | `logo abaixo desse limiar` | „próg” (pl rules.yaml:266) oddany jako „limite”, które w pt-BR jest nazwą terminu stakes (terms-nazwy.yaml:116; w tym pliku linia 472 „limites baixos”); reszta treści pt-BR ma „limiar” (np. exams/m5.yaml:52 „limiar é aposta”) |
| pt-BR-R1-03 | ŚR | content/pt-BR/rules.yaml:419 | `o limite é aposta ÷ ({{t:pot|pote}} + aposta)"` | `o limiar é aposta ÷ ({{t:pot|pote}} + aposta)"` | jak -02: „próg” (pl rules.yaml:419) → „limiar”, nie „limite” (= stawki) |
| pt-BR-R1-04 | ŚR | content/pt-BR/rules.yaml:562 | `o limite é aposta ÷ ({{t:pot|pote}} + aposta); os outs que você tem baixam esse limite` | `o limiar é aposta ÷ ({{t:pot|pote}} + aposta); os outs que você tem baixam esse limiar` | jak -02: „próg” ×2 (pl rules.yaml:562) → „limiar” |
| pt-BR-R1-05 | NISKIE | content/pt-BR/rules.yaml:257 | `; {{t:pair|pares}} médios e pequenos, KQo` | `; com {{t:pair|pares}} médios e pequenos, KQo` | brak przyimka: „pares … você paga” czyta się jak „płacisz parom”; w pliku wszędzie „paga com” (pl rules.yaml:257 „pary … sprawdzasz”) |
| pt-BR-R1-06 | NISKIE | content/pt-BR/rules.yaml:502 | `; {{t:pair|pares}} médios você normalmente {{t:call|paga}}` | `; com {{t:pair|pares}} médios você normalmente {{t:call|paga}}` | jak -05 (pl rules.yaml:502 „średnie pary zwykle sprawdzasz”) |
| pt-BR-R1-07 | NISKIE | content/pt-BR/rules.yaml:402 | `{{t:call|pagar}} nem uma {{t:bet|aposta}} pequena` | `{{t:call|pagar}} até mesmo uma {{t:bet|aposta}} pequena` | „raramente consegue pagar nem uma” — niegramatyczne podwójne przeczenie; pl rules.yaml:402 „rzadko może sprawdzić nawet mały bet” |
| pt-BR-R1-08 | NISKIE | content/pt-BR/rules.yaml:468 | `um jogador que, pelo que você observou, raramente {{t:bluff|blefa}} {{t:bet|aposta}} alto no river` | `quem {{t:bet|aposta}} alto no river é um jogador que, pelo que você observou, raramente {{t:bluff|blefa}}` | dwa czasowniki obok siebie („blefa aposta”) — zdanie mylące przy czytaniu; pl rules.yaml:468 „duży bet na riverze stawia gracz, o którym wiesz…, że rzadko blefuje” |
| pt-BR-R1-09 | NISKIE | content/pt-BR/rules.yaml:527 | `então perde menos quando faltam` | `então é o que menos perde quando faltam` | stopień najwyższy: pl rules.yaml:527 „traci najmniej” (en „loses the least”) |
| pt-BR-R1-10 | NISKIE | content/pt-BR/rules.yaml:636 | `mais estreito que o do c-bet` | `mais fechado que o do c-bet` | „węższy zakres” w tym pliku wszędzie „mais fechado” (np. linie 314, 478, 635); pl rules.yaml:636 „węższym zakresem” |

### pt-BR-R2

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-R2-01 | ŚR | content/pt-BR/rules.yaml:1128 (R-M11-011 because) | „então o fold de todos acontece menos vezes” | „então o {{t:fold}} de todos acontece menos vezes” | Pominięty znacznik terminu: pl rules.yaml:1128 ma „{{t:fold|pasy}} wszystkich”; w przekładzie goły tekst „fold” (sens zachowany, brak podpięcia terminu). |
| pt-BR-R2-02 | ŚR | content/pt-BR/rules.yaml:1112 (R-M11-009 because) | „com {{t:payout|premiação}}” | „com {{t:payout|prêmios}}” | Forma znacznika jest nazwą innego terminu: „premiação” = prize-pool, payout = „prêmio” (terms-nazwy.yaml:136–137); pl rules.yaml:1112 „z {{t:payout|wypłatami}}”; w tym samym pliku linia 1103 ma poprawnie „{{t:payout|prêmios}}”. |
| pt-BR-R2-03 | NISKIE | content/pt-BR/rules.yaml:1005 (R-M12-007 because) | „parar antes, antes de perder” | „parar mais cedo, antes de perder” | Niezręczne powtórzenie; pl rules.yaml:1005 „skończyć wcześniej, zanim stracisz zdolność jasnego myślenia”. Sens bez zmiany. |

### pt-BR-X1

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-X1-01 | ŚR | content/pt-BR/exams/m3.yaml:13 | `Quem agiu por último no pré-flop` | `Quem agiu por último no preflop` | termin preflop: terms-nazwy „preflop”, m1 używa „preflop” (pl m3.yaml:13) |
| pt-BR-X1-02 | ŚR | content/pt-BR/exams/m3.yaml:13 | `No pré-flop, os blinds agem` | `No preflop, os blinds agem` | termin preflop jak w terms-nazwy (pl m3.yaml:13) |
| pt-BR-X1-03 | ŚR | content/pt-BR/exams/m3.yaml:18 | `primeiro a agir no pré-flop` | `primeiro a agir no preflop` | termin preflop jak w terms-nazwy (pl m3.yaml:18) |
| pt-BR-X1-04 | ŚR | content/pt-BR/exams/m6.yaml:10 | `({{t:pot}} + bet) = {{n:exam.m6.pot}}` | `({{t:pot}} + aposta) = {{n:exam.m6.pot}}` | „bet” obok „aposta” w tym samym pliku; terms-nazwy bet = „aposta”, m5 ma „aposta ÷ (pote + aposta)” (pl m6.yaml:10) |
| pt-BR-X1-05 | ŚR | content/pt-BR/exams/m6.yaml:17 | `alpha = bet ÷ ({{t:pot}} + bet)` | `alpha = aposta ÷ ({{t:pot}} + aposta)` | „bet” zamiast „aposta” we wzorze (pl m6.yaml:17) |
| pt-BR-X1-06 | ŚR | content/pt-BR/exams/m6.yaml:19 | `{{t:bluff|blefe}} é bet ÷ ({{t:pot}} + bet)` | `{{t:bluff|blefe}} é aposta ÷ ({{t:pot}} + aposta)` | „bet” zamiast „aposta” we wzorze (pl m6.yaml:19) |
| pt-BR-X1-07 | ŚR | content/pt-BR/exams/m6.yaml:47 | `Sim: bet ÷ ({{t:pot}} + 2·bet)` | `Sim: aposta ÷ ({{t:pot}} + 2·aposta)` | „bet” zamiast „aposta” we wzorze (pl m6.yaml:47) |
| pt-BR-X1-08 | ŚR | content/pt-BR/exams/m6.yaml:47 | `Contra um bet maior` | `Contra uma aposta maior` | „bet” zamiast „aposta” w zdaniu (pl m6.yaml:47) |
| pt-BR-X1-09 | ŚR | content/pt-BR/exams/m6.yaml:48 | `alpha (bet ÷ ({{t:pot}} + bet))` | `alpha (aposta ÷ ({{t:pot}} + aposta))` | „bet” zamiast „aposta” we wzorze (pl m6.yaml:48) |
| pt-BR-X1-10 | ŚR | content/pt-BR/exams/m6.yaml:49 | `tamanho do bet. Um bet maior` | `tamanho da aposta. Uma aposta maior` | „bet” zamiast „aposta” w zdaniu, 2× (pl m6.yaml:49) |

### pt-BR-X2

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-X2-01 | ŚR | content/pt-BR/exams/m10.yaml:80 | `{{t:rake-cap\|limite}}` | `{{t:rake-cap\|teto}}` | pl m10.yaml:80 `{{t:rake-cap\|limit}}`. Termin rake-cap w pt-BR to „teto de rake” (terms-nazwy.yaml:153; lekcja m10-l4 używa „teto”/„teto de rake”), a „limite” jest nazwą terminu stakes (terms-nazwy.yaml:116) — „o limite está fora de alcance” czyta się jak „stawka poza zasięgiem”. |
| pt-BR-X2-02 | ŚR | content/pt-BR/exams/m9.yaml:62 | „Pote com um único raise” | „Pote com um único aumento” | pl m9.yaml:62 „Pula z jednym podbiciem”. Termin raise = „aumento” (terms-nazwy.yaml:19); lekcje m9 (m9-l1, m9-l2) mają „pote com um único aumento”. |
| pt-BR-X2-03 | NISKIE | content/pt-BR/exams/m11.yaml:67 | „…, igual em {{t:chips\|fichas}}” | „…, o mesmo que em {{t:chips\|fichas}}” | pl m11.yaml:67 „tak samo jak w żetonach”. Brak członu porównania; tekst odpowiedzi czyta się jak „równe w żetonach”. |

### pt-BR-U

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-U-01 | ŚR | apps/mobile/src/i18n/locales/pt-BR.json:732 | `{{t:bubble\|Bubble}}` | `{{t:bubble\|Bolha}}` | Termin bubble = „bolha” (terms-nazwy.yaml:123); w treści pt-BR wyłącznie „Bolha/bolha” (10×). pl.json:745 |
| pt-BR-U-02 | ŚR | content/pt-BR/modules.yaml:5 | „Pré-flop diante de ação” | „Preflop diante de ação” | Termin preflop = „preflop” (terms-nazwy.yaml:36); w pt-BR.json:451 „Preflop”, w opisie sklepu „jogo preflop”. pl/modules.yaml:5 |
| pt-BR-U-03 | ŚR | content/pt-BR/modules.yaml:2 | „Blinds, ruas, ações” | „Blinds, streets, ações” | Termin street = „street” (terms-nazwy.yaml:34); opis sklepu: „em cada street”. pl/modules.yaml:2 |
| pt-BR-U-04 | ŚR | content/pt-BR/modules.yaml:10 | „tamanhos para três ruas” | „tamanhos para três streets” | Jak pt-BR-U-03. pl/modules.yaml:10 |
| pt-BR-U-05 | ŚR | store/app-store-metadata.json:43 | „• Decisões avaliadas em quatro níveis” | „• Decisões avaliadas em quatro níveis: alinhada, aceitável, imprecisão, erro” | Pominięte wyliczenie stopni; pl (linia opisu pl, ĆWICZENIA): „w czterech stopniach: zgodna, dopuszczalna, niedokładność, błąd”; en-US też je ma. Nazwy jak `grade.*` w pt-BR.json:137–140 |
| pt-BR-U-06 | NISKIE | apps/mobile/src/i18n/locales/pt-BR.json:308 | „Último: {{last}}.” | „Última: {{last}}.” | Odnosi się do „barra” (r. żeński); pl.json:317 „Ostatni” = słupek ({{last}} = dzień: wynik) |
| pt-BR-U-07 | NISKIE | apps/mobile/src/i18n/locales/pt-BR.json:82 | „nas configurações do celular” | „nos Ajustes do celular” | Ustawienia systemu iOS po pt-BR to „Ajustes”; tak już w purchase.cancelInfo (pt-BR.json:57). pl.json:83 |
| pt-BR-U-08 | NISKIE | store/app-store-metadata.json:43 (3 miejsca) | „prova de módulo” / „tentativa de prova” | „exame do módulo” / „tentativa de exame” | W aplikacji „Exame do módulo” (pt-BR.json:203), „novas tentativas de exame” (pt-BR.json:45); sklep nazywa to inaczej |
| pt-BR-U-09 | NISKIE | store/app-store-metadata.json:43 | „um índice de evolução” | „um índice de nível” | W aplikacji „Índice de nível” (pt-BR.json:285) |
| pt-BR-U-10 | NISKIE | store/app-store-metadata.json:43 (3 miejsca) | „Aulas” / „primeira aula” / „As aulas” | „Lições” / „primeira lição” / „As lições” | W aplikacji konsekwentnie „lição/lições” (pt-BR.json:10–21); słowo kluczowe „aulas” zostaje |

### pt-BR-T

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| pt-BR-T-01 | NISKIE | content/pt-BR/terms-def.yaml:3 | vence a quinta carta mais alta (o kicker) | vence a quinta carta (o kicker) mais alta | dwuznaczne: „a quinta carta mais alta” czyta się jak „piąta najwyższa karta”; pl terms.yaml:51 „wygrywa wyższa piąta karta (kicker)” |
| pt-BR-T-02 | ŚR | content/pt-BR/terms-def.yaml:14 | quando ninguém deu raise). Não confunda com call | quando ninguém aumentou). Não confunda com call | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:147 „gdy nikt nie przebił”) |
| pt-BR-T-03 | ŚR | content/pt-BR/terms-def.yaml:16 | o valor da aposta ou do raise do adversário | o valor da aposta ou do aumento do adversário | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:164 „zakład lub przebicie rywala”) |
| pt-BR-T-04 | ŚR | content/pt-BR/terms-def.yaml:17 | completar a diferença, dar outro raise ou dar fold | completar a diferença, aumentar de novo ou dar fold | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:173 „przebić dalej”) |
| pt-BR-T-05 | ŚR | content/pt-BR/terms-def.yaml:19 | quando o adversário aposta, dá raise na mesma rodada | quando o adversário aposta, aumenta na mesma rodada | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:191 „przebijasz go”) |
| pt-BR-T-06 | NISKIE | content/pt-BR/terms-def.yaml:31 | geralmente indicado em big blinds | geralmente indicadas em big blinds | zgoda rodzaju/liczby: podmiot „Todas as fichas” (pl terms.yaml:292 „zwykle podaje się je”) |
| pt-BR-T-07 | ŚR | content/pt-BR/terms-def.yaml:33 | dão call, dão raise ou dão fold | dão call, aumentam ou dão fold | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:307 „przebijają”) |
| pt-BR-T-08 | ŚR | content/pt-BR/terms-def.yaml:62 | às vezes raise, às vezes call | às vezes aumento, às vezes call | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:546 „czasem przebicie”) |
| pt-BR-T-09 | ŚR | content/pt-BR/terms-def.yaml:63 | antes do flop com um raise quando todos | antes do flop com um aumento quando todos | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:556 „przez przebicie”) |
| pt-BR-T-10 | ŚR | content/pt-BR/terms-def.yaml:68 | O primeiro raise sobre um open antes do flop; o nome conta o big blind como a primeira aposta e o open como a segunda. | O primeiro aumento sobre uma abertura antes do flop; o nome conta o big blind como a primeira aposta e a abertura como a segunda. | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise”; nazwa terminu open w terms-nazwy.yaml:63 to „abertura” (lekcje: 192/192 znaczników open w formie abertura/abrir); definicja używa „open” (pl terms.yaml:597 „Pierwsze przebicie otwarcia… a otwarcie jako drugi”) |
| pt-BR-T-11 | ŚR | content/pt-BR/terms-def.yaml:69 | Um raise sobre um 3-bet | Um aumento sobre um 3-bet | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:605 „Przebicie 3-betu”) |
| pt-BR-T-12 | ŚR | content/pt-BR/terms-def.yaml:70 | quando ninguém deu raise ainda | quando ninguém aumentou ainda | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:612 „gdy nikt jeszcze nie przebił”) |
| pt-BR-T-13 | ŚR | content/pt-BR/terms-def.yaml:71 | Raise depois de um ou mais limps | Aumento depois de um ou mais limps | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:620 „Przebicie po jednym lub kilku limpach”) |
| pt-BR-T-14 | ŚR | content/pt-BR/terms-def.yaml:85 | Pocket pair mais alto que todas | Par de mão mais alto que todas | nazwa terminu pocket-pair w terms-nazwy.yaml:66 to „par de mão” (lekcje: par(es) de mão / par na mão, 0× „pocket pair”); pl terms.yaml:735 „Pocket para” |
| pt-BR-T-15 | ŚR | content/pt-BR/terms-def.yaml:86 | depois de dar open no preflop | depois de abrir no preflop | nazwa terminu open w terms-nazwy.yaml:63 to „abertura” (lekcje: 192/192 znaczników open w formie abertura/abrir); definicja używa „open” (pl terms.yaml:744 „po otwarciu preflop”) |
| pt-BR-T-16 | ŚR | content/pt-BR/terms-def.yaml:87 | apostou ou deu raise por último | apostou ou aumentou por último | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:751 „stawiał lub przebijał”) |
| pt-BR-T-17 | ŚR | content/pt-BR/terms-def.yaml:124 | geralmente como raise antes do flop | geralmente como aumento antes do flop | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:1049 „jako przebicie”) |
| pt-BR-T-18 | ŚR | content/pt-BR/terms-def.yaml:130 | pela soma dos blinds e antes de uma mão | pela soma dos blinds e dos antes de uma mão | myląca składnia: „e antes de uma mão” czyta się jak „i przed rozdaniem”, a chodzi o ante (pl terms.yaml:1098 „sumę blindów i ante w jednym rozdaniu”) |
| pt-BR-T-19 | ŚR | content/pt-BR/terms-def.yaml:136 | para pagar um open do que para dar open | para pagar uma abertura do que para abrir | nazwa terminu open w terms-nazwy.yaml:63 to „abertura” (lekcje: 192/192 znaczników open w formie abertura/abrir); definicja używa „open” (pl terms.yaml:1144 „do sprawdzenia otwarcia… niż do samego otwarcia”) |
| pt-BR-T-20 | ŚR | content/pt-BR/terms-def.yaml:141 | saltos grandes aumentam o risk premium | saltos grandes aumentam o prêmio de risco | nazwa terminu risk-premium w terms-nazwy.yaml:126 to „prêmio de risco” (lekcje: 4/5 znaczników „prêmio de risco”, 0× „risk premium” w formie); pl terms.yaml:1183 |
| pt-BR-T-21 | ŚR | content/pt-BR/terms-def.yaml:151 | (dá call ou raise) | (dá call ou aumenta) | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:1261 „sprawdza albo przebija”) |
| pt-BR-T-22 | ŚR | content/pt-BR/terms-def.yaml:152 | o jogador dá raise antes do flop | o jogador aumenta antes do flop | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:1269 „przebija przed flopem”) |
| pt-BR-T-23 | ŚR | content/pt-BR/terms-def.yaml:156 | (apostas e raises) | (apostas e aumentos) | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:1300 „zakłady i przebicia”) |
| pt-BR-T-24 | ŚR | content/pt-BR/terms-def.yaml:158 | mais fraco que os regs | mais fraco que os regulares | nazwa terminu regular w terms-nazwy.yaml:148 to „regular” (lekcje: regulares 7/10); skrót „regs” nigdzie w słowniczku nieobjaśniony; pl terms.yaml:1317 „od stałych bywalców” |
| pt-BR-T-25 | ŚR | content/pt-BR/terms-def.yaml:160 | aposta e dá raise com qualquer coisa | aposta e aumenta com qualquer coisa | nazwa terminu raise w terms-nazwy.yaml:19 to „aumento” (lekcje i reguły: 234 z 239 znaczników raise w formie aument-, 0× gołe „raise” w tekście); definicja używa „raise” (pl terms.yaml:1332 „stawia i przebija”) |

## Błędy w źródle pl (bez poprawki; do roli 06)

**pt-BR-L3**

- pl m7-l2-polaryzacja.md:65 „Z tą ręką zarabiasz głównie od rąk, które cię biją” — niezręczne: chodzi o to, że płacą ci głównie ręce lepsze (en: „you mostly get paid by hands that beat you”), a „zarabiasz” sugeruje zysk. Przekład pt-BR powtarza to dosłownie (patrz „Do sprawdzenia”).
- pl m7-l1-druga-beczka.md:76 „Taki bet zarabia na lepszych rękach” — dwuznaczne (en: „makes money for the better hands”); pt-BR „dá lucro para as mãos melhores” oddaje sens en poprawnie.
- pl m6-l2-sprawdzenie.md:84 „Cena jest dobra, ale ta ręka prawie nigdy jej nie zrealizuje” — „zrealizować cenę” to skrót myślowy (realizuje się equity); pt-BR „realizá-lo” wiernie.

**pt-BR-L6**

- content/pl/lessons/m10-l3-odejscie-od-bazy.md:49 „Fold to c-bet łączy wszystkie rozmiary i stoły” wobec :109 „łączy wszystkie rozmiary i flopy” — to samo twierdzenie dwojako; „stoły” czytane jako stoły do gry (en „tables”, pt-BR „mesas”) zamiast flopów/boardów. Przekład wierny źródłu.

## Do sprawdzenia (pewność ≤ 80%; pytania do człowieka znającego język albo decyzja globalna)

**pt-BR-L1**

- content/pt-BR/lessons/m1-l1-przebieg.md:6 — „ruas” za pl „ulice”; terms-nazwy: street = „street” (słowo zwykłym tekstem, bez znacznika; „rua” występuje w korpusie jako forma). Ewentualnie „streets”.
- content/pt-BR/lessons/m1-l1-przebieg.md:81 — „a melhor combinação ganha” za pl „najlepszy układ”; w pozostałych plikach układ = „mão”.
- content/pt-BR/lessons/m3-l3-zakresy-otwarc.md:43 i :87 — „pré-flop” / „pós-flop” obok „preflop” (terms-nazwy, m3-l1, m3-l2, m4); pisownia z łącznikiem występuje też w innych lekcjach (m9, m10), więc decyzja globalna.
- content/pt-BR/lessons/m4-l1-3bet.md:16, :26, :75 „{{n}} a abertura” wobec m4-l2-obrona-bb.md:44, :45, :92 „{{n}} o valor da abertura” — zależy od postaci wartości (np. „3×”); dwa sformułowania tej samej wielkości.

**pt-BR-L2**

- `{{t:oesd}}` bez formy w content/pt-BR/lessons/m5-l1-tekstury.md:101 i :103 (tak samo w pl): klucza `oesd` nie ma w `content/pt-BR/terms-nazwy.yaml`. Jeśli budowanie nie ma dla niego nazwy zastępczej (skrót „OESD”), znacznik może się nie rozwinąć; do sprawdzenia w `tools/content-build` (nie czytałem kodu).
- Termin `draw` (nazwa w terms-nazwy: „draw”): m5-l1 i m5-l4 używają form „draw/draws”, m5-l2 i m5-l3 form „projeto/projetos”. W obrębie każdego pliku spójnie, ale między lekcjami tego samego modułu dwie nazwy; identyczne w pl ćwiczenie `cbet` (m5.l3.c-btn ↔ m5.l4.c-review) ma w m5-l3 „projetos”, w m5-l4 „draws”. Decyzja terminologiczna na poziomie języka.
- To samo ćwiczenie i treść m5-l3 ↔ m5-l4: „rival” (cały m5-l3) vs „adversário” (pozostałe pliki), „Isso:” vs „Sim:” za „Tak:”, „faz c-bet” (m5-l3:38, :126) vs „dá c-bet” (m5-l4). Bez wpływu na sens.
- content/pt-BR/lessons/m4-l3-wobec-3betu.md:26 i :93 „materiais de treino” vs „materiais de treinamento” w pozostałych plikach (w całym content/pt-BR 3 vs 23 wystąpienia). Oba poprawne w pt-BR.
- content/pt-BR/lessons/m4-l4-limperzy.md:61 „micro stakes” (pl „na mikrostawkach”, poza znacznikiem): terms-nazwy ma `stakes: "limite"`, a w content/pt-BR przeważa „microlimites” (13) nad „micro stakes” (7).
- content/pt-BR/lessons/m5-l3-czestotliwosc-rozmiar.md:49 „duques” za „dwójek”: poprawny brazylijski żargon, ale jedyne wystąpienie w content/pt-BR; m5-l1:48 ma „um dois”.
- „app” (m4-l3, m4-l4, m5-l3, m5-l4) vs „aplicativo” (m5-l1, m5-l2) za „aplikacja”; oba poprawne.

**pt-BR-L3**

- content/pt-BR/lessons/m7-l2-polaryzacja.md:65 „Com esta mão você lucra principalmente com mãos que ganham de você” — dosłownie za pl, ale po portugalsku brzmi jak „masz zysk z rąk, które cię biją”; propozycja: „Com esta mão você é pago principalmente por mãos que ganham de você” (zgodnie z en).
- Rodzaj „c-bet” między lekcjami: m6-l2 konsekwentnie żeński („uma c-bet pequena”, „a c-bet”, „c-bets pequenas”, ok. 15 miejsc), m6-l1, m6-l3, m7-l1, m7-l2 męski („um c-bet”, „o c-bet”); w całym content/pt-BR męski przeważa (ok. 107 : 14). W obrębie pliku spójnie, więc bez poprawek; do decyzji globalnej.
- Forma `check`: m7-l1 konsekwentnie „passa/Passo/passar”, m6-l2, m6-l3, m7-l2 „dá check/Dou check”. Spójne w pliku, niespójne między lekcjami tego samego modułu (m7).
- `{{t:street|…}}`: m6-l1:84 „ruas”, m6-l2:116 „rodada” (terms-nazwy: street) — po jednym wystąpieniu na plik.
- „pusta karta” → „carta vazia” / „num dois vazio” (m7-l1:57, 124): kalka; w BR raczej „blank”/„carta neutra”. Zrozumiałe z kontekstu.
- m6-l3: rzeczownik `call` raz „{{t:call|call}}” (112), poza tym „pagamento(s)” (44, 73); `fold` rzeczownikowo „folds” (112, 113, 138), czasownikowo „desiste”. Akceptowalne formy tego samego terminu.

**pt-BR-L4**

- m8-l2-ile-blefow.md i m8-l4-bluff-catching.md (wszystkie wystąpienia, np. m8-l2:109, m8-l4:16): pisownia „bluff-catcher” z łącznikiem; `terms-nazwy.yaml` ma `bluff-catcher: "bluff catcher"` (bez łącznika). Tekst nie używa znacznika (pl też nie), w obu plikach pisownia spójna.
- m7-l4-probe-obrona.md:16, 122: „pré-flop”; `terms-nazwy.yaml` ma `preflop: "preflop"`. Zwykły tekst (pl „przed flopem”, bez znacznika).
- m8-l1-value.md:60, 61: „reis e dez melhores” („króle i lepsze dziesiątki”) — „dez melhores” może być odczytane jako „dziesięć lepszych”; ewentualnie „reis e mãos de dez melhores”.
- m8-l1-value.md:5 tytuł „Aposta de valor” vs w treści „aposta por valor” (pl „Value bet” / „bet dla wartości”; termin `value-bet: "value bet"`).
- m8-l1-value.md:71, 121 oraz m8-l3-blokery.md:45, 50: „ás alto” jako odpowiednik „as-high”/„sam as” — zrozumiałe, ale nie jestem pewien, czy to utarta forma w pt-BR (częściej „A-high”).
- m7-l3-implied-odds.md:66, 85, 86, 141: „terceira copas” / „uma copas” (potoczne); m8-l3/m8-l4 mają „terceira carta de copas”.

**pt-BR-L5**

- **Nazwa terminu `street` różna między plikami modułu m9** (w każdym pliku z osobna spójna, więc nie jest to znalezisko wg reguły „w jednym pliku”): m9-l1 i m9-l2 „rodada/rodadas” (także „{{t:value|rodadas de valor}}”), m9-l3 „rua/ruas” („ruas de {{t:value|valor}}”), m9-l4 „street/streets” („streets de valor”; zgodne z `terms-nazwy.yaml` street: "street"). Czytelnik kolejnych lekcji jednego modułu widzi trzy nazwy tego samego pojęcia; decyzja o ujednoliceniu należy do koordynatora (dużo wystąpień, poza zakresem minimalnej poprawki).
- m9-l3-rozmiar-geometryczny.md:89 „Antes de {{t:bet|apostar}} uma {{t:bet}} no flop” wyświetla się jako „apostar uma aposta” (pleonazm, NISKIE). Naturalnie: „Antes de fazer uma {{t:bet}} no flop” (tak w m9-l1:107 „faça uma {{t:bet|aposta}}”), ale poprawka usuwa jeden znacznik `{{t:bet…}}`, więc nie wpisano jej do pliku poprawek.
- m9-l4-plan-trzech-ulic.md:95 „antes de você {{t:bet|fazer}} a sua primeira {{t:bet}}”: tekst po wyświetleniu poprawny, ale forma „fazer” pod kluczem `bet` nie jest formą terminu „aposta” (pl :95 ma tu analogicznie „{{t:bet|postawisz}}”). Naprawa wymagałaby zmiany zestawu znaczników.
- m9-l3 konsekwentnie „rival”, pozostałe pliki „adversário” (pl „rywal”); m9-l4:130 „materiais de treino”, w m9-l2:113 i m10-l1:130 „materiais de treinamento”. Różnice tylko między plikami, bez skutku dla sensu.
- m10-l1-statystyki.md:77 „se estabiliza mais rápido” za pl „stabilizuje się najszybciej”: po portugalsku może być odczytane jako stopień wyższy; kontekst (pytanie o statystykę potrzebującą najwięcej rąk) rozstrzyga.

**pt-BR-L6**

- m11-l1-push-fold.md:15–16, 120: pl rozróżnia „podbicie” (własne otwarcie) i „przebicie” ({{t:raise}}, odpowiedź rywala); w pt-BR oba to „aumento” („Aumento para … e decido depois de um {{t:raise|aumento}}”). Sens da się odczytać z kontekstu, ale rozróżnienie znika; ewentualnie „reaumento” dla drugiego.
- m11-l3-icm.md:13, 45, 127, 143: „posições pagas” (miejsca płatne) obok „colocações” (102, 117, 123) i {{t:position|posição}} = pozycja przy stole (102, 104, 169). „Posições pagas” jest w użyciu, ale w tym pliku koliduje z terminem position; spójniej „colocações pagas”.
- m11-l1-push-fold.md:22, 40: „como primeiro” (kalka „jako pierwszy”); naturalniej „sendo o primeiro a abrir/entrar”. Zrozumiałe, tylko styl.
- m11-l2-sprawdzanie.md:150: „até cerca de {{n:m11.call.5}}” za „aż ok.” — „até” można odczytać jako „do około” (górna granica) zamiast emfazy; sens kierunkowy zachowany.
- m11-l3-icm.md:72: „o limite é” za „próg to” (w m10 konsekwentnie „limiar”; „limite” to też nazwa terminu stakes).

**pt-BR-L7**

- content/pt-BR/lessons/m12-l3-tilt.md:60–62, 69–71, 96–98: teksty odpowiedzi w trybie rozkazującym („Reaja agora”, „Encerre a sessão”, „Suba de limite”), źródło pl ma tryb oznajmujący („Reagujesz teraz”, „Kończysz sesję”), a m12-l4:49–60 oddaje ten sam wzorzec oznajmująco („Desce um limite”, „Fica no limite”). Sens bez zmian; niespójność formy między lekcjami.
- content/pt-BR/lessons/m12-l3-tilt.md:22: „ataca os seus blinds” za pl „podbija twoje blindy” (en „raises your blinds”); sens zachowany, ale mniej dosłownie.
- content/pt-BR/lessons/m12-l4-bankroll.md:85: „você tem mais coisa para recuperar” za pl „masz najwięcej do nadrobienia”; „recuperar” w tym module znaczy też „odgrywać straty” („recuperar as perdas”), możliwe „para aprender”.
- content/pt-BR/lessons/m13-l2-powtorki.md:95 i m13-l3-przeglad.md:86 „De onde vêm estas regras” wobec m13-l1-raport.md:107 „De onde vêm esses princípios” (pl wszędzie „Skąd te zasady”).
- Poza zakresem tej części: w innych plikach pt-BR występują nazwy „Tilt de erro / de injustiça / de vingança” (wobec „Tilt por …” w m12-l3) — do ujednolicenia przez część obejmującą exams/rules.

**pt-BR-R1**

- content/pt-BR/rules.yaml:185 (R-M3-008) „o 3-bet aumenta o {{t:pot|pote}}” — pl „3-bet buduje pulę”; „aumenta” to w tym pliku czasownik terminu raise, możliwe „constrói o pote” (tak jest w linii 570: „construir o pote”).
- content/pt-BR/rules.yaml:538 (R-M7-001) „cada par do adversário cai uma posição” — pl „spada o jedno miejsce niżej”; „posição” to w pliku termin position, ewentualnie „cai um degrau”.
- content/pt-BR/rules.yaml:268 (pole source, niewidoczne w aplikacji) „limite superior de folds logo abaixo do limite calculado” — drugie „limite” = „próg”; po przyjęciu -02…-04 można ujednolicić na „limiar calculado” (i dalej „limiar a partir do cálculo”).
- content/pt-BR/rules.yaml:510 (R-M6-009) „bons para quem aumentou pré-flop” — pl „dobrych dla przebijającego” bez „preflop”; zgodne z en („preflop raiser”), więc nie zgłaszam.
- Klucze {{t:utg}}, {{t:mdf}}, {{t:oesd}}, {{t:spr}} użyte bez formy nie występują w content/pt-BR/terms-nazwy.yaml (tak samo użyte w pl); nazwę wyświetlaną rozstrzyga build, nie tekst — do potwierdzenia przez strażnika nazw.

**pt-BR-R2**

- content/pt-BR/rules.yaml:1037 (R-M12-012 because): „você tem mais coisa para recuperar” za pl „masz najwięcej do nadrobienia” — zrozumiałe, ale „recuperar” bywa czytane jako „odzyskać (straty)”; ewentualnie „tem mais a aprender para alcançar os outros”. Sens kierunkowo zgodny.
- content/pt-BR/rules.yaml:871, 874, 917 i in.: „limite” użyte w znaczeniu „próg” („limite de value bet”, „limite de WTSD”, „limite alpha”), a jednocześnie „limite” to nazwa terminu stakes (terms-nazwy.yaml:116; linie 1028, 1036). Kontekst rozróżnia, ale to to samo słowo w dwóch znaczeniach w jednym pliku; pola `source` nie są zwykle widoczne dla ucznia.
- content/pt-BR/rules.yaml:1164 (R-M13-003): „o replay das suas partidas” za pl „powtórka z gry” (nazwa funkcji aplikacji) — nie znalazłem tej nazwy w słowniku interfejsu pt-BR do porównania; sprawdzić zgodność z nazwą funkcji w UI.
- content/pt-BR/rules.yaml:1027 (R-M12-011 if): „(de {{n:br.bi.base}} para {{n:br.bi.move-down}})” za pl „(przy 30 do 15)” — sens równoważny (spadek z 30 do 15), drobna zmiana konstrukcji.

**pt-BR-X1**

- „rywal”: m0–m5 konsekwentnie „adversário”, m6 konsekwentnie „rival” (m6.yaml:8, 15, 18, 19, 38). W obrębie pliku spójne; różnica tylko między plikami. Do decyzji, czy ujednolicić na „adversário”.
- `check`: m1 i m6 używają „passar / passa / Passo”, m5 „dá check / Dou check / check”. Obie formy są w `terms-nazwy.yaml` [WIELE FORM]; w obrębie pliku spójne, między plikami nie.
- „mówisz pierwszy”: m3 i m5 „age primeiro”, m4 „fala primeiro” (m4.yaml:12, 101). Oba naturalne, różnica między plikami.
- „Ok.”: m2 „Aprox.”, m4–m6 „Cerca de” (różnica między plikami, bez skutku dla sensu).
- m4.yaml:92 ma znacznik `{{t:value|valor}}` tam, gdzie pl (m4.yaml:92) ma zwykłe „wartość”; en ma w tym miejscu `{{t:value}}`, więc zapewne zamierzone.
- m2.yaml:80 „Isso é claramente pouco” za pl „To wyraźnie za mało”: sens zachowany, „claramente insuficiente” byłoby dokładniejsze (styl).

**pt-BR-X2**

- content/pt-BR/exams/m11.yaml:10 — „aumentar e dar {{t:fold}} depois de um {{t:raise|aumento}}” (pl m11.yaml:10 „podbicie i fold po przebiciu”): to samo słowo „aumento” na własne podbicie i na przebicie rywala; możliwe doprecyzowanie „depois de um novo aumento”/„diante de um reaumento”. Sens da się odczytać z tekstu opcji („contra o all-in do adversário”).
- content/pt-BR/exams/m10.yaml:64 — „ou seja, raramente demais” (pl „czyli za rzadko”): zrozumiałe, ale mało naturalne; ewentualnie „ou seja, com frequência insuficiente”.
- content/pt-BR/exams/m10.yaml:80 — „Quanta equity você precisa” (m9.yaml:26 ma „De quanta equity você precisa”); potoczne pominięcie „de”, tak samo w lekcji m10-l4:49.
- Między plikami (nie w jednym pliku): check jako „passa/Passo” w m9 i m10, a „dá check/Dou check” w m7, m8; rywal jako „rival” w m9, m12, a „adversário” w m7, m8, m10, m11, m13; „app” (m11:51) i „aplicativo” (m13:34, 37). W obrębie każdego pliku spójnie.
- Klucze `oesd`, `spr`, `vpip`, `pfr`, `icm`, `utg`, `hud` używane w `{{t:…}}` nie występują w content/pt-BR/terms-nazwy.yaml (tak samo w źródle pl) — poza zakresem tej części, do potwierdzenia, że strażnik je obsługuje.

**pt-BR-U**

- store/app-store-metadata.json:40 i :43 — podtytuł „Treine decisões, sem apostas” oraz „não há apostas” w opisie: pl „bez gry o stawki” / „nie ma stawek”, en „no real money”. W aplikacji „aposta” to termin bet (zakład w rozdaniu) i w trybie gry użytkownik „aposta”, więc „sem apostas” może być odebrane jako sprzeczne z zawartością; rozważyć „sem dinheiro real” (podtytuł „Treine decisões, sem dinheiro real” = 30+ znaków, trzeba by skrócić). Bez poprawki.
- pt-BR.json:549 „Na mesa: {{list}}.” (miejsca przy stole) i :568–569 „Na {{t:board|mesa}}” (karty wspólne): to samo wyrażenie dla dwóch pojęć w etykietach VoiceOver; pl rozróżnia „Przy stole” / „Na stole” (kontekst klucza table.label wprost o tym mówi). Możliwe „À mesa: …” dla table.label albo „No board” dla kart wspólnych.
- pt-BR.json:346 „({{n}} tentativas)” dla prób Monte Carlo (naturalniej „simulações”); :352 „Controle:” dla „Kontrola” (naturalniej „Verificação”) — ekran diagnostyczny.
- pt-BR.json:503 i :738 „limite” jako „próg” (SPR, equity): „limite” jest też terminem stakes; czytelne z kontekstu, ewentualnie „mínimo”.
- content/pt-BR/helplines.yaml:16 „Se você identifica em você sinais…” — powtórzenie „você”; sens pełny i wierny, tylko styl („identifica em si”).

**pt-BR-T**

1. raise = „aumento”, open = „abertura” (terms-nazwy.yaml:19, 63) ↔ definicje z „raise”/„open”: jeśli zespół woli zostawić w definicjach angielskie nazwy (jak przy fold/call/check, których nazwy są angielskie), to zamiast poprawek 02–25 (wzorzec raise/open) trzeba zmienić nazwy; decyzja terminologiczna.
2. playing-the-board = „jogar com a mesa” (terms-nazwy.yaml:26) przy board = „board” (:27); definicja board (terms-def.yaml:25) mówi wprost, że termin oznacza karty, „não à mesa onde se joga”. Dwa tłumaczenia tego samego „board” w dwóch nazwach (alternatywa: „jogar o board”); nazwa ma potwierdzenie w notatce tłumacza, więc bez poprawki.
3. two-tone = „bicolor”, monotone = „monocromático”, wetness = „umidade” (terms-nazwy.yaml:76, 77, 82): poprawne opisowo, ale nie jestem pewien, czy to formy przyjęte w brazylijskim pokerze (spotykane też „two-tone”, „monotone”/„monocolor”, „o quanto o board é molhado”); wpisy mają znacznik [DO USTALENIA].
4. late-position = „posição final” (terms-nazwy.yaml:45), a jedyne użycie w lekcjach to forma „posição tardia” (1/1 znacznik); early-position „posição inicial” — forma w lekcjach „posições iniciais” zgodna.
5. payout = „prêmio” (terms-nazwy.yaml:137), a w lekcjach 5 z 8 znaczników payout ma formę „pagamento(s)” — to samo słowo, które jest formą terminu call („pagamento(s)” 48× w znacznikach call) — oraz 2× „premiação/premiações”, czyli nazwę terminu prize-pool (:136). Kolizja form w lekcjach, nie w pliku nazw.
6. Definicje mieszają „dar call” (terms-def.yaml:33, 151; „call” :55, :62) z „pagar” (:70, :96, :97, :136, :145, :148, :159) dla terminu call (nazwa „call”); oba są poprawne i używane w Brazylii, sens zgodny ze źródłem — bez poprawki.
7. raise (terms-def.yaml:17): źródłowe zdanie „W polskich tekstach także „podbicie”” (terms.yaml:173) pominięte, tak samo jak w en — uznane za uwagę właściwą tylko dla polskiego.
8. 11 skrótów nie ma w terms-nazwy.yaml wcale (zamiast `klucz: null`, o którym mówi nagłówek pliku); strażnik `tools/content-build/src/nazwy.ts` dopuszcza brak klucza, więc to nie błąd budowy.

## Uwagi ogólne czytających

**pt-BR-L1**

Przekład jest wierny i naturalny, konsekwentnie brazylijski („você”), bez znalezisk KRYT ani WYS. Wszystkie znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i klucze YAML są zgodne ze źródłem linia w linię; żadnej liczby wpisanej cyfrą w miejscu `{{n:…}}`. Znaleziska to głównie formy terminów niezgodne z terms-nazwy (late-position, pocket-pair, flush-draw) oraz dwuznaczne zaimki („ele”, „sua”) w m4-l2. Liczby, kierunki zaleceń i nazwy pozycji zgodne z pl.

**pt-BR-L2**

Przekład sześciu lekcji jest wierny: nie znalazłem żadnej zmienionej liczby, kierunku zalecenia, pozycji ani pominiętego zdania, a znaczniki i struktura YAML są nienaruszone. Język jest naturalnym brazylijskim portugalskim (forma „você”, bez europeizmów), formy w `{{t:klucz|forma}}` należą do właściwych terminów i zgadzają się w rodzaju i liczbie z otoczeniem. Jedyny powtarzający się wzorzec to drobne rozbieżności słownictwa między plikami (draw/projeto, rival/adversário, app/aplicativo, treino/treinamento), prawdopodobnie ślad różnych partii tłumaczenia; w obrębie pojedynczego pliku terminologia jest spójna. Znaleziska ograniczają się do jednej literówki i jednej poprawki stylu.

**pt-BR-L3**

Przekład bardzo dobry: wszystkie liczby przez `{{n:…}}`, kierunki zaleceń, pozycje, kolory kart (kier→copas, pik→espadas) i przeczenia zgodne z pl; brak znalezisk KRYT i WYS. Portugalski naturalny i brazylijski (você, „desistir”, „pagar”, „aposta”). Powtarzający się wzorzec to niespójność między plikami (różni tłumacze/sesje): „adversário” (m6-l1, m7-l2) vs „rival” (m6-l3, m7-l1), rodzaj „c-bet”, „dá check” vs „passa”, „Apertado demais” vs „Tight demais”. W obrębie pojedynczych plików terminologia jest spójna poza tytułem m7-l1.

**pt-BR-L4**

Przekład wierny i naturalny, brazylijski; liczby, kierunki zaleceń i znaczniki zgodne ze źródłem (jeden zgubiony `{{t:pair}}`). W obrębie każdego pliku terminy są spójne, ale między plikami tej części różnią się formy tego samego terminu: check „passar” (m8-l1) vs „dar check” (pozostałe), board „mesa” (m7-l3, m8-l1) vs „board” (m7-l4, m8-l3), draw „projeto” vs „draw” (m7-l4), street „rodada” vs „street” (m7-l4), blocker „blockers” (m8-l2) vs „bloqueadores”. Poza glosariuszem: „adversário” (m7-l3, m8-l2–l4) vs „rival” (m7-l4, m8-l1), „udział blefów” = „proporção” (m8-l2) vs „fração” (m8-l4), „próg” = „limiar” (m8-l1) vs „limite” (m8-l2), „nietrafione” = „perdidos” vs „furados”. Warto ujednolicić w osobnym przebiegu; pojedynczo nie są to błędy sensu.

**pt-BR-L5**

Przekład pięciu lekcji jest wierny: wszystkie znaczniki `{{n:…}}` i klucze `{{t:…}}` zgodne ze źródłem, liczby nigdzie nie wpisano cyframi, kierunki zaleceń, progi SPR i przeczenia zachowane; nie znaleziono błędów KRYT ani WYS. Język jest naturalnym brazylijskim portugalskim ze spójnym „você”. Jedyny powtarzający się wzorzec to niejednolite nazwy tego samego terminu między plikami (street: rodada/rua/street; call: pagamento/call; rywal: adversário/rival), co wskazuje na kilku tłumaczy lub kilka przebiegów. m10-l1 bez znalezisk.

**pt-BR-L6**

Przekład bardzo dobry: liczby, kierunki zaleceń, znaczniki `{{n:…}}`/`{{t:…}}`/`[[…]]`, identyfikatory i struktura YAML bez zarzutu we wszystkich sześciu plikach; brak KRYT i WYS. Wariant konsekwentnie brazylijski, forma „você” spójna. Powtarzający się wzorzec to niespójność słownictwa między lekcjami, nie wewnątrz nich: „adversário” (m10-l2, m10-l4, m11) wobec „rival” (m10-l3); „micro limites” / „micro stakes” / „microlimites”; „amplo/estreito” (m11-l1) wobec „aberto/apertado” (m11-l2, l3); shove jako „push” (m11-l1) wobec „shove” (m11-l2, l3); payout jako „pagamentos” (m11-l3) wobec „premiações” (m11-l2). Zgłoszono tylko przypadki sprzeczne z terms-nazwy lub mylące.

**pt-BR-L7**

Przekład m12 (treść krytyczna) jest kompletny i wierny: wszystkie granice (najpóźniej/najwcześniej, co najmniej, połowa bankrollu, „nigdy mniej niż”, sześć miesięcy), pięć sygnałów ostrzegawczych, znacznik `{{helplines}}` i wszystkie znaczniki `{{n:…}}`/`{{t:…}}` zgadzają się ze źródłem; brak znalezisk KRYT i WYS. Język jest naturalny, brazylijski, forma „você” konsekwentna. Powtarzający się wzorzec to drobne niespójności nazewnictwa między lekcjami (tilt por/de, raise/aumento, alinhada/correta, largar/desistir, pôquer/poker, micro stakes/microlimites). Nazwy stopni oceny i ekranów zgadzają się z interfejsem pt-BR („Alinhada”, „Aceitável”, „Imprecisão”, „Sem avaliação”, „Tempo esgotado”, „Ajuda”).

**pt-BR-R1**

Przekład części R-M0–R-M7 jest wierny: nie znalazłem żadnej zmienionej liczby, kierunku, pozycji ani zagrania, a zestaw znaczników {{n:…}}/{{t:…}} zgadza się ze źródłem w każdym polu. Wariant brazylijski konsekwentny („você”, „pré-flop” w prozie, „site de treinamento”). Jedyny powtarzający się wzorzec to „próg” oddany jako „limite” (kolizja z terminem stakes = „limite”, reszta treści ma „limiar”) oraz pojedyncza forma terminu two-tone spoza glosariusza. Pozostałe uwagi to drobna naturalność.

**pt-BR-R2**

Przekład drugiej połowy księgi reguł jest wierny i naturalny (wariant brazylijski, konsekwentne „você”); wszystkie liczby, kierunki zaleceń, przeczenia, adresy URL i cytaty źródeł zgodne z pl. Reguły krytyczne R-M12-001…012 (wariancja, tilt, ryzyko ruiny, schodzenie ze stawki „no mais tardar”/„só volta quando”, proporcje nauki „nunca menos de”) przełożone w całości, bez zmiany granic i sensu; jedyna uwaga to styl (03). Znaczniki nienaruszone poza jednym pominiętym `{{t:fold}}`. Terminologia zgodna z terms-nazwy.yaml; jedna forma z cudzego terminu (payout/premiação).

**pt-BR-X1**

Przekład egzaminów m0–m6 jest wierny i naturalny (brazylijski wariant, konsekwentne „você”); żadna poprawna odpowiedź nie przestała pasować do pytania, wszystkie liczby idą przez `{{n:…}}`, a zestaw znaczników w każdej linii odpowiada źródłu. Jedyne pewne znaleziska to niespójność terminów: „pré-flop” w m3 wobec „preflop” z tabeli terminów i z m1 oraz surowe „bet” w m6 obok „aposta” (m5 w tych samych wzorach ma „aposta”). Pozostałe różnice to warianty między plikami (adversário/rival, passar/dar check, agir/falar), spójne w obrębie każdego pliku.

**pt-BR-X2**

Przekład egzaminów m7–m13 jest wierny: wszystkie znaczniki `{{n:…}}`, `{{t:…}}`, karty `[[…]]`, identyfikatory, pola `answer`/`correct`/`sizeError` zgodne ze źródłem pole po polu; poprawne odpowiedzi pasują do pytań. W m12 (treść krytyczna) nie znaleziono żadnej różnicy sensu: progi, kierunki („no mais tardar”, „o dobro”, „metade”), odesłanie do ekranu „Ajuda” (zgodne z etykietą interfejsu pt-BR.json) są zachowane. Nazwy werdyktów w m13 (Alinhada, Aceitável, Imprecisão, Sem avaliação) zgodne z interfejsem. Język naturalny, brazylijski, bez form europejskich; jedyne uwagi to dwie niespójności terminów i drobiazgi stylu.

**pt-BR-U**

Przekład jest wierny i naturalny (brazylijski, konsekwentne „você”), bez błędów sensu, liczb ani znaczników; treść krytyczna (`helplines.yaml`, `help.*`) kompletna, nazwa organizacji i adres bez zmian. Teksty zakupu wierne. Jedyny powtarzający się wzorzec to drobne rozjazdy nazw: terminy względem `terms-nazwy.yaml` (Bubble, Pré-flop, ruas) oraz słownictwo opisu sklepu względem aplikacji (aula/lição, prova/exame, índice). W opisie sklepu pominięto wyliczenie czterech stopni oceny. Słowa kluczowe i teksty sklepu nie zawierają obietnic spoza źródła ani słów sugerujących grę na pieniądze (poza zanegowanym „apostas”, patrz „Do sprawdzenia”).

**pt-BR-T**

Definicje są wierne źródłu (liczby, przykłady kart, kierunki i „nie mylić z…” zgodne we wszystkich 162 pozycjach), naturalne i brazylijskie; jedyny powtarzalny wzorzec to „raise”/„open” w definicjach wbrew nazwom „aumento”/„abertura” (19 linii) oraz trzy pojedyncze rozjazdy nazw (pocket pair, risk premium, regs). Spójność lekcji i reguł z terms-nazwy (formy w znacznikach `{{t:klucz|forma}}`, lessons/ + rules.yaml): zgodne z nazwą są raise (aument- 234/239; 3× „raise”), bet (apost- 316/344, 27 bez formy), pot (pote 625/733, reszta bez formy), flush (99/99), straight (sequência 101/104, 3 bez formy), bluff (blef- 405/420, 15 bez formy), value (valor 84/84), range (194/194), equity (11/11; poza znacznikami 207× „equity”, 0× „equidade”), position (posição 73/73), open (abertura/abrir 192/192); c-bet i value bet nie mają znaczników (poza nimi „c-bet(s)” 199×, „value bet” 1× wobec „aposta de/por valor” 3×). Systematyczne rozjazdy z nazwą: fold = „fold”, ale 519 z 550 znaczników ma formę desist- (fold/folds 18, bez formy 13; poza znacznikami desist- 23×); call = „call”, ale 571 z 686 to pag- (call/calls 53, bez formy 62; poza znacznikami pag- ok. 226× wobec „call” 6×); check = „check”, ale 61 z 215 to pass- (dá/dar check itd. 115, bez formy 39; poza znacznikami pass- 20×); draw = „draw”, ale 111 z 168 to „projeto(s)” (draw(s) 34, bez formy 23), flush-draw „projeto(s) de flush” 26 i „draw de flush” 5 z 40 (zgodne 3 + 6 bez formy), straight-draw 9/9 jako „draw/projeto de sequência”. Dalsze rozjazdy poza piętnastką: board = „board”, a 29 z 60 znaczników to „mesa”; street = „street”, a 18× „rua(s)” i 12× „rodada(s)” z 69; blocker = „blocker”, a 19 z 22 to „bloqueador(es)”. W efekcie ten sam termin pojawia się użytkownikowi pod dwiema nazwami (np. „fold” przy znaczniku bez formy i „desistir” w formie), co warto rozstrzygnąć jedną decyzją terminologiczną dla fold/call/check/draw/board/street/blocker.

