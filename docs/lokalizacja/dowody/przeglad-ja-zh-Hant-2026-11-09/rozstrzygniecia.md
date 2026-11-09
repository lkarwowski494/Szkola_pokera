# Rozstrzygnięcia drugiego przeglądu przekładu ja i zh-Hant (J1–J3, Z1–Z3, kontrola (a))

Data: 2026-11-09, sesja AB (tylko docs, rola 09; prompt roli niedostępny — add_repo `prompts` odrzucone, rola wg `docs/lokalizacja/` i wzoru sesji V, wyjątek nazwany w D-366). Wejście: propozycje z przebiegów 42677941726, 42677958807, 42682266650 (`../przeklad-ja-zh-Hant-2026-11-09.txt`). **Nic nie zostało zapisane do `content/` ani `locales/`** (sesja tylko docs, D-363); poprawki są listą do nałożenia na kopię propozycji przed `--zastosuj` (`docs/lokalizacja/narzedzia/poprawki.mjs`, kroki w `../../przygotowane/plan-ja-zh-Hant.md`).

## Jak przeglądano

- 6 subagentów w świeżym kontekście, bez notatek tłumacza, wspólna instrukcja (zasady plan-09 §5, glosariusz, D-287, D-344; wagi jak w przeglądzie en). Próba na język: cały `rules.yaml` (141 wpisów), `spots.yaml`, `areas.yaml`, `modules.yaml` (J1/Z1); cały słownik interfejsu (699 kluczy) i `terms-def.yaml` (162 definicje) + terminologia ok. 30 terminów na przeczytanych źródłach (J2/Z2: `J2-terminy.md`, `Z2-terminy.md`, adres + cytat + data); 5 lekcji (m0-l1, m2-l2, m3-l3, m5-l3, m10-l1) i egzamin m2 (J3/Z3). Poza próbą: 39 lekcji i 13 egzaminów na język — tylko kontrola automatyczna i treść krytyczna niżej.
- Kontrola (a) treści krytycznej (D-135): m12-l1, m12-l4 (ramka M12-L4-RAMKA), egzamin m12, nakładka `helplines.yaml` (H-INT-1, H-INT-2), R-M12-009/011, definicje bankroll i risk-of-ruin, teksty pomocy, płatności i usuwania z UI. Przekład zwrotny ja→pl i zh-Hant→pl w dwóch świeżych sesjach **bez dostępu do źródła**, porównanie sensu w trzeciej: `wynik-a-ja.md`, `wynik-a-zh-Hant.md` — **zaliczona w obu językach** (0 KRYT, 0 WYS, 0 ŚR dotyczących sensu; ŚR tylko spójność terminów i K-05).
- Kontrola wyniku: wszystkie poprawki nałożone na kopie trzech plików propozycji (pominięte 0) i ocenione `kontrolaPropozycji` z repo na HEAD 583f799: **130/130 przechodzi** (rules.yaml ja/zh-Hant po poprawce wzorca URL z D-365; ja rules.yaml przechodzi też bez niej — J1 wstawił ASCII separatory), skróty źródeł 130/130 zgodne. sha256 kopii po poprawkach (dla porównania w sesji kodu): ja-lekcje eae033a6…edfef9, zh-lekcje 96174a14…5a07, reszta 576f25df…8e44.

## Podsumowanie

| grupa | zakres | KRYT | WYS | ŚR | NISKIE | poprawek w liście |
|---|---|---|---|---|---|---|
| J1 | ja rules, spots, areas, modules | 0 | 0 | 7 | 3 | 23 |
| J2 | ja UI, terms-def, terminologia | 0 | 1 | 9 | 6 | 44 |
| J3 | ja 5 lekcji + egzamin m2 | 1 | 0 | 3 | 3 | 6 |
| A-ja | kontrola (a) ja | 0 | 0 | 5 | 2 | 20 (2 duplikaty J2 usunięte) |
| Z1 | zh-Hant rules, spots, areas, modules | 0 | 0 | 6 | 8 | 35 |
| Z2 | zh-Hant UI, terms-def, terminologia | 0 | 0 | 14 | 4 | 15 (1 duplikat Z3 usunięty) |
| Z3 | zh-Hant 5 lekcji + egzamin m2 | 0 | 0 | 9 | 5 | 19 |
| A-zh | kontrola (a) zh-Hant | 0 | 0 | 5 | 1 | 14 |

Razem do nałożenia: **ja 93, zh-Hant 83** (`poprawki-ja.json`, `poprawki-zh-Hant.json`; pole `grupa` wskazuje raport). Wszystkie ŚR i WYS/KRYT z list przyjęte; NISKIE przyjęte tylko krótkie i pewne (w listach), reszta NISKICH — backlog ja/zh-Hant (raporty G).

## Decyzje szczegółowe

| raport | miejsce | waga | decyzja |
|---|---|---|---|
| J3 | ja m10-l1, ¶ „必要なハンド数” | KRYT | przyjęto: usunięty dodany przez tłumacza `{{n:hud.se.ex.n}}ではなく`; klucze `{{n}}` = źródło; jednostka przechodzi kontrolę (0 USD zamiast `--tylko`) |
| J2 | ja m10-l3 `{{t:bet|置いて}}` | WYS | przyjęto w ja (bez znacznika); przyczyna w pl — pozycja 11 listy 16 błędów źródła (przegląd en) |
| J1/Z1 | rules.yaml adresy URL | — | ja: ASCII separator po adresie (J1, jak w pl); zh-Hant: bez zmiany tekstu, przyjęcie po poprawce wzorca (D-365). Pole `source` nie jest pokazywane w aplikacji |
| J1 | ja rules R-M10-014 cytat | ŚR | przyjęto: cytat angielski dosłowny („no flop, no drop” w cudzysłowie źródła) |
| J1 | ja `{{n:var.hands.k}}千ハンド` → „100千” | ŚR | przyjęto w rules (4 miejsca); w lekcjach m12-l2, m12-l4, m13-l1 to samo — backlog ja (poza próbą; m12-l4 to treść krytyczna, zmiana tylko z kontrolą (a)) |
| Z1 | zh-Hant spots.yaml: 18 znaczników bez formy, klucz grupy btn-vs-co | ŚR | przyjęto (zmiana w `groups` i `wrongSizes` naraz; kontrola nakładki przechodzi) |
| Z1/Z2/Z3 | zh-Hant niespójności nazw (equity 權益/勝率, winrate, limp, fold 蓋牌, button 莊位, variance, regular, recreational, nit, session, tekstury 潮濕/濕潤) | ŚR | przyjęto w próbie; **reszta tekstu systemowo** przy K-05: tabela `terms-nazwy-zh-Hant.yaml` (wiersze `[AB: …]`) + zamiana form `{{t:k|stara}}` → nazwa z tabeli skryptem w sesji kodu (lista form w szkicu) |
| J2/A | ja variance バリアンス/分散, downswing, connected | ŚR | przyjęto: 分散, ダウンスウィング, コネクテッド (`terms-nazwy-ja.yaml`) |
| J2 | ja `glossary.search` „日本語または英語で検索” | ŚR | przyjęto „英語名または略語で検索” (zgodnie z D-354: poza pl wyszukiwanie po nazwie angielskiej i skrócie); P-AB1 może to zmienić |
| Z2 | zh-Hant `drill.drawCall.drawGutshot` | ŚR | przyjęto **bez znacznika** („卡順聽牌”): propozycja Z2 dodawała `{{t:gutshot}}`, a słownik UI ma twardą kontrolę liczby znaczników (D-344) — kontrola odrzucała |
| J2/Z2 | UI `drill.category*`, `drill.texture.*`, `paint.explanation`: `{{t:…}}` bez formy → łacińska nazwa w przycisku odpowiedzi | ŚR | przyjęto (formy dodane; klucze i liczba znaczników bez zmian) |
| Z2 | zh-Hant `start.alwaysFree` „第一次測驗” | ŚR | przyjęto „每個測驗的第一次作答” (tekst płatności, dwuznaczność) |
| wszystkie | K-05: ok. 1 349 (ja) i 981 (zh-Hant) znaczników bez formy pokaże nazwę angielską łacinką | ŚR systemowe | nie poprawiane miejscami (poza najbardziej widocznymi w UI i spots); rozwiązanie systemowe D-367, krok 3 planu — **warunek nałożenia treści** |
| A | m12-l1/m12-l4/egzamin m12: formy terminów i znaczniki bez formy | ŚR | przyjęto (sprawdzone w kontroli (a); fragmenty krytyczne bez zmiany sensu). Zapis `przeglad_jezyki` liczony po nałożeniu (krok 4.3) |

## Błędy źródła pl

Wszystkie wskazane przez J1–J3, Z1–Z3 i kontrolę (a) są już na liście 16 z przeglądu en (`../przeglad-en-2026-11-09/rozstrzygniecia.md`, „Błędy źródła pl dla roli 06”: poz. 1, 3, 5, 10, 11, 16). Nowych brak. Po poprawce pl przez rolę 06 zmienione pliki dostaną inny skrót źródła → `--zastosuj` je odrzuci → dotłumaczenie `--tylko` (D-358).

## Backlog ja/zh-Hant (nie blokuje)

NISKIE spoza list (styl) — w raportach J1–Z3; `千ハンド` w lekcjach ja; ujednolicenie nazw typów tiltu (egzamin m12 q6 vs lekcja m12-l3) w obu językach — m12 to treść krytyczna, zmiana tylko z ponowną kontrolą (a); przegląd 39 lekcji i 13 egzaminów poza próbą (tylko kontrola automatyczna i K-05) — przy pierwszych użytkownikach z JP/TW albo przy przeglądzie eksperta (CLAUDE.md).
