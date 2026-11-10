# pt-BR-X2 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/exams/m7.yaml | tak, 1–95 (pl 1–95) |
| content/pt-BR/exams/m8.yaml | tak, 1–93 (pl 1–93) |
| content/pt-BR/exams/m9.yaml | tak, 1–86 (pl 1–86) |
| content/pt-BR/exams/m10.yaml | tak, 1–82 (pl 1–82) |
| content/pt-BR/exams/m11.yaml | tak, 1–86 (pl 1–86) |
| content/pt-BR/exams/m12.yaml (treść krytyczna) | tak, 1–93 (pl 1–93) |
| content/pt-BR/exams/m13.yaml | tak, 1–91 (pl 1–91) |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-X2-01 | ŚR | content/pt-BR/exams/m10.yaml:80 | `{{t:rake-cap\|limite}}` | `{{t:rake-cap\|teto}}` | pl m10.yaml:80 `{{t:rake-cap\|limit}}`. Termin rake-cap w pt-BR to „teto de rake” (terms-nazwy.yaml:153; lekcja m10-l4 używa „teto”/„teto de rake”), a „limite” jest nazwą terminu stakes (terms-nazwy.yaml:116) — „o limite está fora de alcance” czyta się jak „stawka poza zasięgiem”. |
| pt-BR-X2-02 | ŚR | content/pt-BR/exams/m9.yaml:62 | „Pote com um único raise” | „Pote com um único aumento” | pl m9.yaml:62 „Pula z jednym podbiciem”. Termin raise = „aumento” (terms-nazwy.yaml:19); lekcje m9 (m9-l1, m9-l2) mają „pote com um único aumento”. |
| pt-BR-X2-03 | NISKIE | content/pt-BR/exams/m11.yaml:67 | „…, igual em {{t:chips\|fichas}}” | „…, o mesmo que em {{t:chips\|fichas}}” | pl m11.yaml:67 „tak samo jak w żetonach”. Brak członu porównania; tekst odpowiedzi czyta się jak „równe w żetonach”. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- content/pt-BR/exams/m11.yaml:10 — „aumentar e dar {{t:fold}} depois de um {{t:raise|aumento}}” (pl m11.yaml:10 „podbicie i fold po przebiciu”): to samo słowo „aumento” na własne podbicie i na przebicie rywala; możliwe doprecyzowanie „depois de um novo aumento”/„diante de um reaumento”. Sens da się odczytać z tekstu opcji („contra o all-in do adversário”).
- content/pt-BR/exams/m10.yaml:64 — „ou seja, raramente demais” (pl „czyli za rzadko”): zrozumiałe, ale mało naturalne; ewentualnie „ou seja, com frequência insuficiente”.
- content/pt-BR/exams/m10.yaml:80 — „Quanta equity você precisa” (m9.yaml:26 ma „De quanta equity você precisa”); potoczne pominięcie „de”, tak samo w lekcji m10-l4:49.
- Między plikami (nie w jednym pliku): check jako „passa/Passo” w m9 i m10, a „dá check/Dou check” w m7, m8; rywal jako „rival” w m9, m12, a „adversário” w m7, m8, m10, m11, m13; „app” (m11:51) i „aplicativo” (m13:34, 37). W obrębie każdego pliku spójnie.
- Klucze `oesd`, `spr`, `vpip`, `pfr`, `icm`, `utg`, `hud` używane w `{{t:…}}` nie występują w content/pt-BR/terms-nazwy.yaml (tak samo w źródle pl) — poza zakresem tej części, do potwierdzenia, że strażnik je obsługuje.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład egzaminów m7–m13 jest wierny: wszystkie znaczniki `{{n:…}}`, `{{t:…}}`, karty `[[…]]`, identyfikatory, pola `answer`/`correct`/`sizeError` zgodne ze źródłem pole po polu; poprawne odpowiedzi pasują do pytań. W m12 (treść krytyczna) nie znaleziono żadnej różnicy sensu: progi, kierunki („no mais tardar”, „o dobro”, „metade”), odesłanie do ekranu „Ajuda” (zgodne z etykietą interfejsu pt-BR.json) są zachowane. Nazwy werdyktów w m13 (Alinhada, Aceitável, Imprecisão, Sem avaliação) zgodne z interfejsem. Język naturalny, brazylijski, bez form europejskich; jedyne uwagi to dwie niespójności terminów i drobiazgi stylu.
