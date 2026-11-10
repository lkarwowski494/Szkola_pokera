# pt-BR-L3 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/lessons/m6-l1-mdf-alpha.md | tak, 1–137 |
| content/pt-BR/lessons/m6-l2-sprawdzenie.md | tak, 1–135 |
| content/pt-BR/lessons/m6-l3-check-raise.md | tak, 1–140 |
| content/pt-BR/lessons/m7-l1-druga-beczka.md | tak, 1–139 |
| content/pt-BR/lessons/m7-l2-polaryzacja.md | tak, 1–140 |

Dodatkowo kontrola mechaniczna: zestaw `{{n:…}}`, kluczy `{{t:…}}` i `[[…]]` porównany linia po linii z pl we wszystkich 5 plikach (jedyna różnica: znalezisko 02); pola `id`, `family`, `rules`, `answer`, `table`, `kind` identyczne z pl.

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-L3-01 | ŚR | content/pt-BR/lessons/m7-l1-druga-beczka.md:5 | `title: "Segundo barril"` | `title: "Second barrel"` | Ten sam termin nazwany dwojako w pliku: tytuł „Segundo barril”, a w treści 16× „second barrel” (`{{t:second-barrel}}`); terms-nazwy: `second-barrel: "second barrel"`; jedyne wystąpienie „Segundo barril” w całym content/pt-BR; en m7-l1:5 „Second barrel”. (pl m7-l1-druga-beczka.md:5 „Druga beczka”.) |
| pt-BR-L3-02 | ŚR | content/pt-BR/lessons/m7-l1-druga-beczka.md:137 | `bloqueiam o {{t:value\|valor}} do rival` | `bloqueiam o valor do rival` | Dodany znacznik terminu, którego nie ma w źródle: pl m7-l1-druga-beczka.md:137 „gdy blokują wartość rywala” (bez `{{t:value}}`). Zestaw znaczników linii różni się od pl. Skrypt da OSTRZEŻENIE o zmianie znaczników — zamierzone. |
| pt-BR-L3-03 | NISKIE | content/pt-BR/lessons/m6-l2-sprawdzenie.md:98 | `no pré-flop` | `no preflop` | terms-nazwy: `preflop: "preflop"` (pl m6-l2-sprawdzenie.md:98 „przebijał preflop”); m7-l1:114 ma „antes do flop” zgodnie z pl „przed flopem”. |
| pt-BR-L3-04 | NISKIE | content/pt-BR/lessons/m6-l3-check-raise.md:73 | `Parte dos {{t:draw\|projetos}} fortes você {{t:call\|paga}}` | `Com parte dos {{t:draw\|projetos}} fortes você {{t:call\|paga}}` | Kalka polskiego szyku (pl m6-l3-check-raise.md:73 „Część mocnych drawów sprawdzasz”): „pagar” z dopełnieniem bliższym znaczy „zapłacić czemuś/komuś”; w pozostałych miejscach „pagar com”. |
| pt-BR-L3-05 | NISKIE | content/pt-BR/lessons/m6-l3-check-raise.md:125 | `Mãos médias, como {{t:top-pair}} com kicker fraco, você normalmente {{t:call\|paga}}` | `Com mãos médias, como {{t:top-pair}} com kicker fraco, você normalmente {{t:call\|paga}}` | Jak 04 (pl m6-l3-check-raise.md:125 „Średnie ręce … zwykle sprawdzasz”). |

## Źródło (błędy w pl, bez poprawki)
- pl m7-l2-polaryzacja.md:65 „Z tą ręką zarabiasz głównie od rąk, które cię biją” — niezręczne: chodzi o to, że płacą ci głównie ręce lepsze (en: „you mostly get paid by hands that beat you”), a „zarabiasz” sugeruje zysk. Przekład pt-BR powtarza to dosłownie (patrz „Do sprawdzenia”).
- pl m7-l1-druga-beczka.md:76 „Taki bet zarabia na lepszych rękach” — dwuznaczne (en: „makes money for the better hands”); pt-BR „dá lucro para as mãos melhores” oddaje sens en poprawnie.
- pl m6-l2-sprawdzenie.md:84 „Cena jest dobra, ale ta ręka prawie nigdy jej nie zrealizuje” — „zrealizować cenę” to skrót myślowy (realizuje się equity); pt-BR „realizá-lo” wiernie.

## Do sprawdzenia (pewność ≤ 80%)
- content/pt-BR/lessons/m7-l2-polaryzacja.md:65 „Com esta mão você lucra principalmente com mãos que ganham de você” — dosłownie za pl, ale po portugalsku brzmi jak „masz zysk z rąk, które cię biją”; propozycja: „Com esta mão você é pago principalmente por mãos que ganham de você” (zgodnie z en).
- Rodzaj „c-bet” między lekcjami: m6-l2 konsekwentnie żeński („uma c-bet pequena”, „a c-bet”, „c-bets pequenas”, ok. 15 miejsc), m6-l1, m6-l3, m7-l1, m7-l2 męski („um c-bet”, „o c-bet”); w całym content/pt-BR męski przeważa (ok. 107 : 14). W obrębie pliku spójnie, więc bez poprawek; do decyzji globalnej.
- Forma `check`: m7-l1 konsekwentnie „passa/Passo/passar”, m6-l2, m6-l3, m7-l2 „dá check/Dou check”. Spójne w pliku, niespójne między lekcjami tego samego modułu (m7).
- `{{t:street|…}}`: m6-l1:84 „ruas”, m6-l2:116 „rodada” (terms-nazwy: street) — po jednym wystąpieniu na plik.
- „pusta karta” → „carta vazia” / „num dois vazio” (m7-l1:57, 124): kalka; w BR raczej „blank”/„carta neutra”. Zrozumiałe z kontekstu.
- m6-l3: rzeczownik `call` raz „{{t:call|call}}” (112), poza tym „pagamento(s)” (44, 73); `fold` rzeczownikowo „folds” (112, 113, 138), czasownikowo „desiste”. Akceptowalne formy tego samego terminu.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład bardzo dobry: wszystkie liczby przez `{{n:…}}`, kierunki zaleceń, pozycje, kolory kart (kier→copas, pik→espadas) i przeczenia zgodne z pl; brak znalezisk KRYT i WYS. Portugalski naturalny i brazylijski (você, „desistir”, „pagar”, „aposta”). Powtarzający się wzorzec to niespójność między plikami (różni tłumacze/sesje): „adversário” (m6-l1, m7-l2) vs „rival” (m6-l3, m7-l1), rodzaj „c-bet”, „dá check” vs „passa”, „Apertado demais” vs „Tight demais”. W obrębie pojedynczych plików terminologia jest spójna poza tytułem m7-l1.
