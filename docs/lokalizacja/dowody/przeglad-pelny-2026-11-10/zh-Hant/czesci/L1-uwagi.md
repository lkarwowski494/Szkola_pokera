# zh-Hant · L1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/lessons/m0-l1-uklady.md | tak (104/104 linii, pl i zh-Hant) | bez poprawek; jedna uwaga o kluczu znacznika (niżej) |
| content/zh-Hant/lessons/m1-l1-przebieg.md | tak (97/97) | 2 poprawki NISKIE |
| content/zh-Hant/lessons/m2-l1-outy.md | tak (135/135) | bez poprawek |
| content/zh-Hant/lessons/m2-l2-pot-odds.md | tak (98/98) | 1 poprawka ŚR |
| content/zh-Hant/lessons/m3-l1-pozycja.md | tak (70/70) | 1 poprawka NISKIE |
| content/zh-Hant/lessons/m3-l2-rece-startowe.md | tak (62/62) | 1 poprawka NISKIE |
| content/zh-Hant/lessons/m3-l3-zakresy-otwarc.md | tak (87/87) | 3 poprawki ŚR, 1 NISKIE |

Pomocniczo: `content/zh-Hant/terms-nazwy.yaml` przeczytany w całości; `docs/lokalizacja/glosariusz.md` nie był otwierany (klucze znaczników porównane bezpośrednio z pl). Wersja `en` nie była potrzebna. Dodatkowo skryptem porównano linia po linii zbiory znaczników `{{n:…}}`, kluczy `{{t:…}}`, `[[…]]` oraz pola YAML nieprzekładalne (id, family, rules, generator, params, table, answer, spot): zgodne z pl poza dwoma miejscami opisanymi niżej. Znaków uproszczonych ani resztek polskiego tekstu nie znaleziono (komentarze YAML `# słownictwo PL ↔ EN…` są po polsku także w pl i nie trafiają na ekran).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/zh-Hant/lessons/m0-l1-uklady.md:99 | pl „przy dwóch {{t:pair\|parach}}” → zh `{{t:two-pair\|兩對}}`: zmieniony klucz znacznika (pair → two-pair). Sens poprawny (mowa o układzie dwie pary), podpowiedź terminu trafniejsza niż w pl. | Zostawić; jeśli strażnik wymaga kluczy identycznych z pl: „兩邊都有兩{{t:pair\|對}}時”. |

## Do ujednolicenia skryptem
- **solver**: w tej części m3-l1:69 ma łacińskie „solver”, m3-l3 (8 wystąpień) ma „求解器”. W całym `content/zh-Hant` oba warianty są niemal równoliczne (`solver` 224 trafienia w 18 plikach, `求解器` 204 w 21 plikach) — potrzebna jedna decyzja dla całego przekładu, dlatego bez poprawek punktowych.
- **all-in**: `terms-nazwy` ma „全下”; m1-l1 pisze „全下（all-in）”, m2-l1 zostawia łacińskie „all-in” (5 wystąpień: linie 44, 55, 123, 131), m2-l2:27 ma „加注全下”. W całym przekładzie „all-in” 23 trafienia w 8 plikach wobec „全下” 261 w 30. Wzorzec: `all-in` → `全下` (poza pierwszym objaśnieniem w m1-l1 i nagłówkiem tabeli wg uznania).
- **suited/offsuit**: po poprawkach z L1.json m3-l3 używa „同花色/不同花色” jak m3-l2; wariant „非同花” występował tylko w m3-l3 (3 trafienia w 1 pliku). Warto sprawdzić resztę przekładu pod kątem „同花手牌”/„同花 A” w znaczeniu suited.
- **翻前** → **翻牌前**: 30 trafień w 2 plikach w całym przekładzie (w tej części 1, poprawione).
- **blindy**: m1-l1 konsekwentnie „小盲注/大盲注” (także jako nazwa gracza/pozycji), m3-l1 i m3-l3 „小盲/大盲”. Obie formy są dopuszczone w `terms-nazwy`, ale w jednej ścieżce nauki lepiej jedna (dla pozycji „小盲/大盲”, dla wpłaty „小盲注/大盲注”).
- **limp / dopłacenie**: nazwa terminu „溜入” (m3-l1:69 przez znacznik), obok łacińskiego „limp/Limp” (m3-l1:27, 37) i opisowego „補齊大盲”, „補到大盲”, „補注” (m3-l3:77). Zrozumiałe, ale trzy nazwy na jedno pojęcie; w pl też są dwie („limp”, „dopłacenie”).
- **kicker**: „踢腳牌” (m0-l1) i „踢腳” (m3-l1:25, m3-l2:25; w całym przekładzie 12 vs 29). Oba poprawne, `terms-nazwy` ma `kicker: null` [DO USTALENIA].

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m2-l2-pot-odds.md:73 i :79 — „你需要贏多少 / 你實際贏多少” za pl „ile musisz wygrywać / ile naprawdę wygrywasz” (chodzi o częstość, equity). Po chińsku „贏多少” czyta się raczej jako „ile (pieniędzy) wygrać”; czy nie lepiej „你需要多常贏 / 你實際多常贏”? (pl jest równie dwuznaczne.)
- m1-l1-przebieg.md:72 — „翻牌前由大盲注最後行動 … 他可以過牌”: „大盲注” jako gracz; czy naturalniej „大盲位”/„大盲玩家”?
- m1-l1-przebieg.md:15 — „免費讓這輪過去” za „dać przejść za darmo” (czekać bez wpłaty): zrozumiałe, ale może sugerować zakończenie całej rundy.
- m3-l3-zakresy-otwarc.md:77 — „微級別” (mikrostawki; `{{t:stakes|級別}}` z przedrostkiem 微 poza znacznikiem): czy tajwański gracz powie raczej „微額級別/小額桌”?
- m3-l1-pozycja.md:15 i dalej — „按鈕位” w tekście obok nazwy terminu „BTN” z `terms-nazwy`; naturalne, do potwierdzenia jako świadomy wybór.

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
- W części L1 nie było treści krytycznej (brak modułu 12, helplines, tekstów o prawdziwych pieniądzach).
