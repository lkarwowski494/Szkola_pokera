# it-X2 — włoski (it) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/it/exams/m7.yaml | tak, 1–95 (pl 1–95) |
| content/it/exams/m8.yaml | tak, 1–93 (pl 1–93) |
| content/it/exams/m9.yaml | tak, 1–86 (pl 1–86) |
| content/it/exams/m10.yaml | tak, 1–82 (pl 1–82) |
| content/it/exams/m11.yaml | tak, 1–86 (pl 1–86) |
| content/it/exams/m12.yaml | tak, 1–93 (pl 1–93) |
| content/it/exams/m13.yaml | tak, 1–91 (pl 1–91) |

Dodatkowo: skrypt porównał linia po linii zestawy `{{n:…}}`, kluczy `{{t:…}}`, `[[…]]` i strukturę YAML poza tekstami (pl ↔ it) we wszystkich 7 plikach: bez różnic.
## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| it-X2-01 | ŚR | content/it/exams/m7.yaml:63 | `{{t:oesd|progetto di scala bilaterale}}: {{n:outs.oesd}}` | `{{t:oesd|OESD}}: {{n:outs.oesd}}` | Nazwa terminu oesd wg content/it/terms-nazwy.yaml:54 to „OESD” (forma tłumacza oznaczona tam jako niezgodna); pl m7.yaml:63 |
| it-X2-02 | ŚR | content/it/exams/m7.yaml:70 | `{{t:oesd|progetto di scala bilaterale}} (fante` | `{{t:oesd|OESD}} (fante` | Jw. (terms-nazwy.yaml:54); pl m7.yaml:70 |
| it-X2-03 | NISKIE | content/it/exams/m8.yaml:10 | `in netto perde` | `al netto perde` | Niepoprawny zwrot „in netto”; pl m8.yaml:10 „na czysto traci” |
| it-X2-04 | ŚR | content/it/exams/m8.yaml:17 | `Hai {{t:top-pair|coppia massima}} con il nove` | `Hai {{t:top-pair|top pair}} con il nove` | Nazwa terminu top-pair wg terms-nazwy.yaml:85 to „top pair” (tak też it m9.yaml:19); pl m8.yaml:17 |
| it-X2-05 | ŚR | content/it/exams/m8.yaml:46 | `il {{t:oesd|progetto di scala bilaterale}} non è entrato` | `l'{{t:oesd|OESD}} non è entrato` | Nazwa terminu oesd wg terms-nazwy.yaml:54 to „OESD”; pl m8.yaml:46 ma „{{t:oesd|OESD}}” |
| it-X2-06 | ŚR | content/it/exams/m8.yaml:48 | `La {{t:top-pair|coppia massima}} ha valore` | `La {{t:top-pair|top pair}} ha valore` | Jak it-X2-04 (terms-nazwy.yaml:85); pl m8.yaml:48 |
| it-X2-07 | NISKIE | content/it/exams/m8.yaml:56 | `una mano da lasciare` | `una mano da foldare` | „Ręka do spasowania” (pl m8.yaml:56): w całym pliku fold = foldare (terms-nazwy.yaml:20), tu jedyne „lasciare” |
| it-X2-08 | ŚR | content/it/exams/m8.yaml:79 | `Hai {{t:top-pair|coppia massima}} con un kicker` | `Hai {{t:top-pair|top pair}} con un kicker` | Jak it-X2-04 (terms-nazwy.yaml:85); pl m8.yaml:79 |
| it-X2-09 | ŚR | content/it/exams/m9.yaml:17 | `{{t:value|per value}}` | `{{t:value|per valore}}` | Nazwa terminu value wg terms-nazwy.yaml:98 to „valore” („per valore” w it m7, m8, m10); pl m9.yaml:17 |
| it-X2-10 | NISKIE | content/it/exams/m9.yaml:37 | `e {{t:fold|foldi}} se` | `e {{t:fold|fold}} se` | Opcja odpowiedzi w 2. osobie („foldi”) wśród opcji rzeczownikowych/1. osoby; pl m9.yaml:37 „Bet … i {{t:fold}}” |
| it-X2-11 | ŚR | content/it/exams/m9.yaml:52 | `Quante {{t:value|street di value}}` | `Quante {{t:value|street di valore}}` | Jak it-X2-09 (terms-nazwy.yaml:98); pl m9.yaml:52 |
| it-X2-12 | ŚR | content/it/exams/m9.yaml:56 | `Tre {{t:value|street di value}}` | `Tre {{t:value|street di valore}}` | Jak it-X2-09 (terms-nazwy.yaml:98); pl m9.yaml:56 |
| it-X2-13 | ŚR | content/it/exams/m9.yaml:72 | `da tre {{t:value|street di value}}` | `da tre {{t:value|street di valore}}` | Jak it-X2-09 (terms-nazwy.yaml:98); pl m9.yaml:72 |
| it-X2-14 | ŚR | content/it/exams/m10.yaml:43 | `un {{t:maniac|maniaco}}` | `un {{t:maniac|maniac}}` | Nazwa terminu maniac wg terms-nazwy.yaml:162 to „maniac”; pl m10.yaml:43 |
| it-X2-15 | ŚR | content/it/exams/m10.yaml:45 | `il {{t:maniac|maniaco}}` | `il {{t:maniac|maniac}}` | Jw. (terms-nazwy.yaml:162); pl m10.yaml:45 |
| it-X2-16 | ŚR | content/it/exams/m10.yaml:61 | `{{t:draw|draw}}` | `{{t:draw|progetto}}` | Nazwa terminu draw wg terms-nazwy.yaml:51 to „progetto” (tak w it m7, m8); pl m10.yaml:61 |
| it-X2-17 | ŚR | content/it/exams/m10.yaml:80 | `{{t:rake-cap|rake cap}}` | `{{t:rake-cap|tetto del rake}}` | Nazwa terminu rake-cap wg terms-nazwy.yaml:164 to „tetto del rake”; pl m10.yaml:80 |
| it-X2-18 | ŚR | content/it/exams/m12.yaml:29 | `Bastano qualche decina` | `Basta qualche decina` | Błąd zgody liczby („qualche decina” jest w lp); pl m12.yaml:29 „Kilkadziesiąt tysięcy rąk wystarczy”; sens bez zmian |
| it-X2-19 | ŚR | content/it/exams/m13.yaml:26 | `text: "In linea", why: "In linea è` | `text: "Conforme", why: "Conforme è` | Werdykt „Zgodna” (pl m13.yaml:26) nazywa się w interfejsie i lekcji „Conforme” (apps/mobile/src/i18n/locales/it.json:137, 461; content/it/lessons/m13-l1-raport.md:36, 90); „In linea” nie występuje nigdzie indziej |
| it-X2-20 | ŚR | content/it/exams/m13.yaml:44 | `un {{t:oesd|progetto di scala bilaterale}}` | `un {{t:oesd|OESD}}` | Nazwa terminu oesd wg terms-nazwy.yaml:54 to „OESD”; pl m13.yaml:44 ma „{{t:oesd|OESD}}” |
| it-X2-21 | ŚR | content/it/exams/m13.yaml:51 | `contro un {{t:open|open}}` | `contro un'{{t:open|apertura}}` | Nazwa terminu open wg terms-nazwy.yaml:65 to „apertura” (tak w it m7, m10); pl m13.yaml:51 |
## Źródło (błędy w pl, bez poprawki)
Brak.
## Do sprawdzenia (pewność ≤ 80%)
- Rodzaj „c-bet”: żeński w m7 i m13 („la c-bet”, „una c-bet”; zgodnie z terms-nazwy.yaml:88), męski w całym m10 („un c-bet”, „i c-bet”, „un c-bet grande”: linie 17, 19, 61, 63–66). Tekst bez znacznika, wewnątrz pliku spójny; do ujednolicenia decyzją koordynatora (podobnie „un 3-bet” w m10 wobec r. ż. w terms-nazwy.yaml:70).
- m9.yaml:52, 56: „overpair di jack” wobec „fante/fanti” w m7 i m8 (nazwa karty niespójna między plikami, w pliku spójna).
- m13.yaml:16, 17: „circa una quota {{n:exam.m13.lose.big}} delle mani / dei casi” (wartość to procent): poprawne, ale ciężkie; naturalniej „circa il …”, czego nie da się zrobić bezpiecznie dla 10% i 90% jednym rodzajnikiem przy zmiennej liczbie, więc bez poprawki.
- m11.yaml:57: „l'avversario all-in con {{n:exam.m11.bf.s3}} e {{n:exam.m11.bf.s4}}” można odczytać tak, że rywal ma oba stacki; ta sama dwuznaczność jest w pl m11.yaml:57 (en rozdziela przecinkiem), więc bez poprawki.
- Poprawki terminologiczne (oesd, top-pair, value, maniac, draw, rake-cap, open) wynikają wprost z `content/it/terms-nazwy.yaml`; jeśli koordynator dopuszcza formy opisowe tłumacza („coppia massima”, „progetto di scala bilaterale”), można je pominąć bez szkody dla sensu.
## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład egzaminów m7–m13 jest wierny: nie znalazłem żadnej zmiany liczby, kierunku, zagrania ani pozycji, a poprawne odpowiedzi i wyjaśnienia pasują do pytań tak jak w źródle; wszystkie znaczniki są nienaruszone. Treść krytyczna m12 (wariancja, tilt, ryzyko bankructwa, próg zejścia ze stawki, odesłanie do ekranu „Aiuto”, zgodne z interfejsem) jest kompletna i bez zmiany sensu; jedyne znalezisko to błąd zgody liczby. Powtarzający się wzorzec to formy terminów niezgodne z `terms-nazwy.yaml` i różne między plikami (top pair / coppia massima, per valore / per value, apertura / open, progetto / draw), co sugeruje kilku tłumaczy lub kilka przebiegów. Jedyna rozbieżność widoczna dla użytkownika jako nazwa z interfejsu to werdykt „In linea” zamiast „Conforme” w m13. Nazwy typów tiltu w m12 zgadzają się z lekcją m12-l3.
