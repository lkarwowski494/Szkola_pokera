# Kontrola (a), przekład zwrotny: ko (2026-11-10)

Przekład zwrotny: `zwrotny-ko.md` (wykonany przed otwarciem content/pl). Porównanie z `content/pl/` po przekładzie.

## Liczba jednostek: 72
- m12-l1-wariancja.md: 55 (title, sub, 36 jednostek ćwiczeń: prompt/explanation/opcja text+why, 17 bloków treści: akapity, nagłówki, 2 wzory, tabela, ramka, stopka)
- R-M12-*: 11 reguł (001–009, 011, 012; pola if/then/because)
- m12-l3-tilt.md: 6 wierszy (26, 60, 97, 110, 125, 133)

## Znaleziska

| miejsce | waga | pl | ko + przekład zwrotny | propozycja |
|---|---|---|---|---|
| R-M12-001, 002, 003, 011 (because/then) | NISKIE | „{{n:var.hands.k}} tys. rąk”, „{{n:var.need.hands.k}} tys. rąk” | „{{n:var.hands.k}},000핸드” („100,000 rąk”); w lekcji m12-l1 ta sama wielkość jako „{{n:var.hands.k}}k 핸드” | Sens i wartość zgodne (dopisane „,000” = „tys.”); ujednolicić zapis w ko (k albo ,000) w regułach i lekcji, bez wpływu na sens |
| R-M12-006 then | NISKIE | „oddech i przygotowane zdanie” | „심호흡을 하고…” („weź głęboki oddech…”) | Bez zmiany zalecenia; opcjonalnie „호흡을 하고” |

Granice i warunki sprawdzone bez rozbieżności: R-M12-011 „늦어도 그때 … 내리고, 빨라도 … 다시 올립니다” = „najpóźniej wtedy schodzisz … wracasz najwcześniej …”; R-M12-012 „절대 {{n:study.min}}보다 적게 하지는 않습니다” = „nigdy mniej niż”; R-M12-002 „증거로 보지 않고” (negacja zachowana); R-M12-005 kierunek (mniejsza różnica → więcej rąk) zgodny; m12-l1 q-dd-wr-low „표본의 절반 이상” = „częściej niż w co drugiej próbce”; m12-l1 w140 odesłanie do „Pomoc” zachowane; tilt w60 (korekta tiltu, póki mały), w133 (trzy sygnały + odesłanie do odpowiedzialnej gry) zgodne. w110 „패배 혐오” używane w ko spójnie dla typu tiltu (w34, w52, w110).

## Liczenie {{n:}} (skrypt `kontrola-a/cnt.py`, uruchamiany z katalogu repo, Counter po pełnych znacznikach)
- m12-l1: pl 188, ko 188, zbiór i liczności identyczne.
- R-M12: 001 8/8, 002 5/5, 003 4/4, 004 1/1, 005 4/4, 006–008 0/0, 009 6/6, 011 12/12, 012 3/3: wszystkie identyczne.
- Cyfry poza znacznikami (m12-l1, bez pól id/rules): pl {100:12, 2:1, 3:1, 6:2}; ko {100:13, 1:2, 0:1, 2:1, 3:1, 6:2}. Różnice to słowa liczebne zapisane cyfrą o tej samej wartości: „100배” = „sto razy” (w58), „1개당” = „po” (w13), „{{t:…}} 1개 구간” = „jednego odchylenia” (w32), „0보다” = „nad zerem” (w114). Brak różnic wartości.
- Reguły: ko dodatkowo „000” w 001, 002, 003, 011 (zob. znalezisko NISKIE); pozostałe cyfry identyczne.

## Werdykt: ZALICZONA (KRYT 0, WYS 0, ŚR 0, NISKIE 2)
