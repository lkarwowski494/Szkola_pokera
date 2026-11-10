# ko · L5 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/lessons/m8-l2-ile-blefow.md | tak (143/143 linii, pl i ko) | Sens, liczby i poprawne odpowiedzi zgodne z pl; 2 poprawki (termin w znaczniku, partykuła). |
| content/ko/lessons/m8-l3-blokery.md | tak (118/118) | Zgodne z pl; 1 poprawka NISKA. |
| content/ko/lessons/m8-l4-bluff-catching.md | tak (136/136) | Zgodne z pl; bez poprawek mechanicznych, 1 pozycja „Do sprawdzenia”. |
| content/ko/lessons/m9-l1-spr.md | tak (149/149) | Zgodne z pl; 5 poprawek (termin effective-stack ×4, partykuła). |
| content/ko/lessons/m9-l2-zaangazowanie.md | tak (114/114) | Zgodne z pl; 4 poprawki (termin draw ×2, odesłanie do lekcji, partykuła). |

Kontrola mechaniczna (skrypt, linia po linii, pl wobec ko, wszystkie 5 plików): zbiory kluczy `{{t:…}}`, znaczniki `{{n:…}}` (klucz i liczba wystąpień), notacja `[[…]]`, pola `id`/`family`/`rules`/`answer`/`table`/`kind`, położenie `correct: true`, pary `{{`/`}}`, brak polskich liter w ko — bez różnic. `terms-nazwy.yaml` (ko) przeczytany w całości; `glosariusz.md` nie był czytany w całości (klucze znaczników porównane bezpośrednio z pl, są identyczne). Wersja en otwarta pomocniczo w jednym miejscu (m8-l4, linia 80).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ko/lessons/m9-l1-spr.md:73 i :107 | pl „zanim ktoś {{t:bet\|postawi}} {{t:bet}}” → ko „{{t:bet\|베팅}}을 {{t:bet\|하기}} 전에”. Forma „하기” nie jest postacią nazwy terminu („베팅”), a na ekranie podkreślone/klikalne będzie samo „하기”. Sens poprawny. | Scalić w jeden znacznik: „누군가 {{t:bet\|베팅}}하기 전에” (zmienia liczbę znaczników t w linii z 2 na 1 względem pl, dlatego nie dałem do JSON — decyzja sesji nadrzędnej, czy strażnik na to pozwala). |
| NISKIE | m8-l2, m8-l3, m8-l4 | „nietrafiony draw” ma trzy przekłady w trzech sąsiednich lekcjach: m8-l2 „맞지 않은 … 드로우” (2×), m8-l3 „실패한 드로우” (6×), m8-l4 „빗나간 드로우” (5×). Każdy poprawny i zrozumiały, ale lekcje odwołują się do siebie. | Ujednolicić na jedną postać (np. „빗나간 드로우”, jak też w m8-l1). |
| NISKIE | m8-l3 (10×) wobec m8-l4 (7×) | Czasownik „blokować”: m8-l3 „블록하다” (블록합니다/블록하지), m8-l4 „블로킹하다”. Oba naturalne. | Ujednolicić (np. „블록하다”). |
| NISKIE | m8-l2, m9-l1 wobec m8-l3, m8-l4, m9-l2 | Zwrot do czytelnika: m8-l2 i m9-l1 „당신”, pozostałe trzy „나/내”. Poprawne, niespójne między lekcjami tego samego modułu. | Decyzja stylu dla całego ko (poza tą częścią). |
| NISKIE | m8-l2 (지불 6×) wobec m8-l3/m8-l4 (돈을 내다/낼 14×) | „zapłacić/płacić” (sprawdzić gorszą ręką): dwie postaci. „지불하다” jest bardziej kalką, „돈을 내다” naturalniejsze. | Bez zmiany albo ujednolicić przy okazji. |

## Do ujednolicenia skryptem
- **„벳” → „베팅” jako samodzielne słowo (bet/zakład)** w m8-l2 i m8-l3. `terms-nazwy`: bet = „베팅”; m8-l4, m9-l1, m9-l2 konsekwentnie „베팅”. W m8-l2 samodzielne „벳” występuje 54× (w tym tytuł pomocniczy „벳 크기에 따른…”, wzór „블러프 비율 = 벳 ÷ (팟 + 2·벳)”, tabela), w m8-l3 5× (+ „블로킹 벳” 1×, nazwa własna zagrania — zostawić). Wzorzec: `(?<![가-힣0-9A-Za-z])벳` → `베팅`, z wyłączeniem złożeń „오버벳”, „블로킹 벳”, „3벳/4벳”, „밸류 벳”. Liczba trafień: `grep -oP '(?<![가-힣0-9A-Za-z])벳' content/ko/lessons/m8-l2-ile-blefow.md | wc -l` = 54; `grep -c '벳'` (linie): m8-l2 = 32, m8-l3 = 4. Uwaga na czasownik: „벳합니다” → „베팅합니다”, „벳한다면” → „베팅한다면”; partykuły bez zmian („벳은/벳을/벳이” → „베팅은/베팅을/베팅이”, „벳으로” → „베팅으로”). W JSON jest tylko jedno miejsce — forma w znaczniku `{{t:bet|벳}}` (m8-l2:38); waga całości ŚR.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m8-l4:80 — pl „(dama z pikami, walet z pikami)” → ko „(스페이드를 든 Q, 스페이드를 든 J)”. Po koreańsku brzmi jak „dama trzymająca pika”; chodzi o nietrafione drawy pikowe z damą/waletem jako najwyższą kartą. Może lepiej „스페이드 드로우였던 Q 하이, J 하이”? Samo pl (i en „queen with spades”) jest równie skrótowe.
- m9-l1 (tytuł pomocniczy, linie 6, 16, 54–56, 73, 121) — „팟 뒤의 스택 / 팟 뒤에 남은 돈” jako kalka „stack za pulą”. Zrozumiałe z kontekstu, ale czy naturalniejsze nie byłoby „남은 스택” (tak jest w poleceniach ćwiczeń tej samej lekcji)?
- m9-l2 (tytuł) — „팟 커밋” dla „Zaangażowanie (ang. commitment)”; w tekście dalej „커밋된 상태”. Brzmi naturalnie w żargonie, ale nie ma tego hasła w `terms-nazwy` ani w rules.yaml — do potwierdzenia.
- m9-l2:82 — „거의 절대 이득이 되지 않는” („prawie nigdy się nie opłaca”): zestawienie „거의 절대” trochę niezręczne; może „거의 이득이 되지 않는”.
- m8-l2:142 — „장난감 모델” („model zabawkowy z teorii gry”): dosłowne; w koreańskich materiałach spotyka się też „토이 게임”.
- m8-l2:101, 139 i m8-l4:122 — „하이 카드” (ze spacją) dla „wysokie karty bez szans / sama wysoka karta”; `terms-nazwy` ma high-card = „하이카드” (bez spacji). Tu nie ma znacznika i znaczenie jest opisowe, więc nie zgłaszam jako błędu.

## Pytania do źródła pl
- Brak błędów merytorycznych zauważonych w pl. Drobiazg redakcyjny: m8-l4:60 i :61 podają ten sam przykład blefu w dwóch kolejnościach („dziesiątka z waletem w pikach” / „walet z dziesiątką w pikach”); przekład wiernie to zachowuje.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Nie było w tej części (brak lekcji m12, reguł R-M12, helplines i tekstów o prawdziwych pieniądzach).
