# pt-BR-L5 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/lessons/m9-l1-spr.md | tak, 1–149 (pl 1–149) |
| content/pt-BR/lessons/m9-l2-zaangazowanie.md | tak, 1–114 (pl 1–114) |
| content/pt-BR/lessons/m9-l3-rozmiar-geometryczny.md | tak, 1–130 (pl 1–130) |
| content/pt-BR/lessons/m9-l4-plan-trzech-ulic.md | tak, 1–131 (pl 1–131) |
| content/pt-BR/lessons/m10-l1-statystyki.md | tak, 1–131 (pl 1–131) |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-L5-01 | ŚR | content/pt-BR/lessons/m9-l2-zaangazowanie.md:96 | „Se depois da sua {{t:bet\|aposta}} sobraria no seu stack” | „Se depois da sua {{t:bet\|aposta}} sobrar no seu stack” | Błąd gramatyczny: po „se” warunkowym futuro do subjuntivo, nie futuro do pretérito (pl m9-l2-zaangazowanie.md:96 „Jeśli po twoim zakładzie zostałoby ci…”). Sens bez zmian. |
| pt-BR-L5-02 | ŚR | content/pt-BR/lessons/m9-l3-rozmiar-geometryczny.md:76 | „Depois da {{t:bet\|aposta}} e do {{t:call\|pagamento}}” | „Depois da {{t:bet\|aposta}} e do {{t:call}}” | Rzeczownik terminu `call` w tym pliku to „call” (bez formy, linie 15 ×2, 85, 89, 93, 117), a w dwóch miejscach „pagamento”: ten sam termin nazwany dwojako w jednym pliku (pl :76 „{{t:call\|sprawdzeniu}}”). |
| pt-BR-L5-03 | ŚR | content/pt-BR/lessons/m9-l3-rozmiar-geometryczny.md:95 | „{{t:pot\|Pote}} depois do {{t:call\|pagamento}}” | „{{t:pot\|Pote}} depois do {{t:call}}” | Jak pt-BR-L5-02 (nagłówek tabeli; dwa zdania wyżej, w linii 93, „um {{t:call}}”; pl :95 „po {{t:call\|sprawdzeniu}}”). |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- **Nazwa terminu `street` różna między plikami modułu m9** (w każdym pliku z osobna spójna, więc nie jest to znalezisko wg reguły „w jednym pliku”): m9-l1 i m9-l2 „rodada/rodadas” (także „{{t:value|rodadas de valor}}”), m9-l3 „rua/ruas” („ruas de {{t:value|valor}}”), m9-l4 „street/streets” („streets de valor”; zgodne z `terms-nazwy.yaml` street: "street"). Czytelnik kolejnych lekcji jednego modułu widzi trzy nazwy tego samego pojęcia; decyzja o ujednoliceniu należy do koordynatora (dużo wystąpień, poza zakresem minimalnej poprawki).
- m9-l3-rozmiar-geometryczny.md:89 „Antes de {{t:bet|apostar}} uma {{t:bet}} no flop” wyświetla się jako „apostar uma aposta” (pleonazm, NISKIE). Naturalnie: „Antes de fazer uma {{t:bet}} no flop” (tak w m9-l1:107 „faça uma {{t:bet|aposta}}”), ale poprawka usuwa jeden znacznik `{{t:bet…}}`, więc nie wpisano jej do pliku poprawek.
- m9-l4-plan-trzech-ulic.md:95 „antes de você {{t:bet|fazer}} a sua primeira {{t:bet}}”: tekst po wyświetleniu poprawny, ale forma „fazer” pod kluczem `bet` nie jest formą terminu „aposta” (pl :95 ma tu analogicznie „{{t:bet|postawisz}}”). Naprawa wymagałaby zmiany zestawu znaczników.
- m9-l3 konsekwentnie „rival”, pozostałe pliki „adversário” (pl „rywal”); m9-l4:130 „materiais de treino”, w m9-l2:113 i m10-l1:130 „materiais de treinamento”. Różnice tylko między plikami, bez skutku dla sensu.
- m10-l1-statystyki.md:77 „se estabiliza mais rápido” za pl „stabilizuje się najszybciej”: po portugalsku może być odczytane jako stopień wyższy; kontekst (pytanie o statystykę potrzebującą najwięcej rąk) rozstrzyga.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład pięciu lekcji jest wierny: wszystkie znaczniki `{{n:…}}` i klucze `{{t:…}}` zgodne ze źródłem, liczby nigdzie nie wpisano cyframi, kierunki zaleceń, progi SPR i przeczenia zachowane; nie znaleziono błędów KRYT ani WYS. Język jest naturalnym brazylijskim portugalskim ze spójnym „você”. Jedyny powtarzający się wzorzec to niejednolite nazwy tego samego terminu między plikami (street: rodada/rua/street; call: pagamento/call; rywal: adversário/rival), co wskazuje na kilku tłumaczy lub kilka przebiegów. m10-l1 bez znalezisk.
