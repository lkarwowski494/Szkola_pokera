# Kontrola (a), przekład zwrotny: vi (2026-11-10)

Przekład zwrotny: `zwrotny-vi.md` (wykonany przed otwarciem content/pl). Porównanie z `content/pl/` po przekładzie.

## Liczba jednostek: 67
- m12-l1-wariancja.md: 55 (title, sub, 36 jednostek ćwiczeń, 17 bloków treści)
- R-M12-*: 11 reguł
- R-M3-006 (content/vi/rules.yaml): 1

## Znaleziska

| miejsce | waga | pl | vi + przekład zwrotny | propozycja |
|---|---|---|---|---|
| m12-l1 w125 | NISKIE | „prawdziwy winrate leży gdzieś między ok. {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}” | „nằm đâu đó trong khoảng từ {{n:var.wr.ci.low}} đến {{n:var.wr.ci.high}}” („gdzieś w przedziale od X do Y”, bez „ok.”) | Opcjonalnie „từ khoảng {{n:var.wr.ci.low}}”; „đâu đó” już osłabia, sens bez zmian |
| R-M12-011 because | NISKIE | „część źródeł radzi zejść już po takiej stracie” | „một số nguồn khuyên xuống mức ngay sau khoản thua như vậy” („…zaraz po takiej stracie”) | Kierunek (wcześniejsze zejście) zgodny; opcjonalnie „ngay khi đã thua như vậy” / „đã có thể xuống” |

Sprawdzone bez rozbieżności:
- R-M3-006 (poprawka WYS kierunku): „mở rộng hơn so với khi ở UTG nhưng hẹp hơn so với khi ở Button; từ CO rộng hơn so với từ HJ” = pl „szerzej niż z UTG, a węziej niż z Buttona; z CO szerzej niż z HJ”; if i because zgodne.
- R-M12-011 then: „muộn nhất là lúc đó … xuống, và sớm nhất bạn quay lại khi đã có đủ bankroll … của mức cược cao hơn” = „najpóźniej … najwcześniej”.
- R-M12-012 „không bao giờ ít hơn {{n:study.min}}”; R-M12-002 negacja; R-M12-005 kierunek; m12-l1 q-dd-wr-low „hơn một nửa số mẫu”; odesłanie do „Trợ giúp” — zgodne.

## Liczenie {{n:}} (skrypt `kontrola-a/cnt.py`, uruchamiany z katalogu repo)
- m12-l1: pl 188, vi 188, zbiór i liczności identyczne.
- R-M12: 001 8/8, 002 5/5, 003 4/4, 004 1/1, 005 4/4, 006–008 0/0, 009 6/6, 011 12/12, 012 3/3: wszystkie identyczne.
- Cyfry poza znacznikami: m12-l1 pl {100:12, 2:1, 3:1, 6:2}; vi to samo + {0:1} — „nằm trên mức 0” = pl „nad zerem” (w114), ta sama wartość. Reguły identyczne.

## Werdykt: ZALICZONA (KRYT 0, WYS 0, ŚR 0, NISKIE 2)
