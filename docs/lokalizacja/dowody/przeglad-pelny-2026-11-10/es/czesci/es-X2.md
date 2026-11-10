# es-X2 — es (hiszpański) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/es/exams/m7.yaml | tak, 1–95 |
| content/es/exams/m8.yaml | tak, 1–93 |
| content/es/exams/m9.yaml | tak, 1–86 |
| content/es/exams/m10.yaml | tak, 1–82 |
| content/es/exams/m11.yaml | tak, 1–86 |
| content/es/exams/m12.yaml (treść krytyczna) | tak, 1–93 |
| content/es/exams/m13.yaml | tak, 1–91 |

Dodatkowo skryptem porównano linia po linii (pl ↔ es) zestawy `{{n:…}}`, klucze `{{t:…}}`, `[[karty]]`, strukturę YAML poza napisami i liczby wpisane cyfrą: bez różnic we wszystkich 7 plikach.

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| es-X2-01 | ŚR | content/es/exams/m13.yaml:26 | `text: "Alineada", why: "Alineada es la acción` | `text: "Acorde", why: "Acorde es la acción` | pl exams/m13.yaml:26 „Zgodna” = nazwa werdyktu z raportu (pl.json „Zgodna”); w interfejsie es ten werdykt to „Acorde” (apps/mobile/src/i18n/locales/es.json: grade.zgodne, verdicts.compliant). Odpowiedź w egzaminie nazywa werdykt inaczej niż raport. |
| es-X2-02 | ŚR | content/es/exams/m13.yaml:37 | `text: "Sin valorar", why: "«Sin valorar» es lo que recibe` | `text: "Sin evaluar", why: "«Sin evaluar» es lo que recibe` | pl exams/m13.yaml:37 „Bez oceny” = werdykt z raportu; w interfejsie es „Sin evaluar” (es.json verdicts.unrated). |
| es-X2-03 | ŚR | content/es/exams/m10.yaml:80 | `{{t:rake-cap|límite}}` | `{{t:rake-cap|tope}}` | pl exams/m10.yaml:80 `{{t:rake-cap|limit}}`. terms-nazwy: rake-cap = „tope de rake”, a „límite” to nazwa terminu stakes; „el límite queda fuera de alcance” czyta się jak stawka. Bliźniacze ćwiczenie w lessons/m10-l4-rake.md:49 ma „tope”. |
| es-X2-04 | NISKIE | content/es/exams/m11.yaml:18 | `ya solo juegas all-in o {{t:fold|retirarte}} e intentas` | `ya solo vas all-in o {{t:fold|te retiras}} e intentas` | pl exams/m11.yaml:18 „grasz już tylko all-in albo fold”; w es bezokolicznik zwrotny po formie osobowej („juegas … o retirarte”) jest niegramatyczny. |
| es-X2-05 | NISKIE | content/es/exams/m8.yaml:46 | `{{t:oesd|proyecto de escalera abierto}}` | `{{t:oesd|proyecto de escalera abierta}}` | pl exams/m8.yaml:46 `{{t:oesd|OESD}}`. Forma jednorazowa w całym content/es (1× wobec 13× „proyecto de escalera abierta”, m.in. exams/m7.yaml:63, m13.yaml:44). |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- „Button” (m8: 6×, m9: 1×, m11: 4×, m13: 1×) wobec „botón” (m7: 9×, m10: 2×) jako nazwa pozycji w zwykłym tekście; terms-nazwy: button = „botón”. W każdym pliku z osobna konsekwentnie, w całym content/es oba warianty są równie częste (22 vs 18 plików) — decyzja o ujednoliceniu ponad zakresem tej części.
- Rodzaj „c-bet”: m10 (linie 17, 19, 63–66) i m13:73 mają rodzaj żeński („una c-bet”, „la pequeña”), m7 i większość content/es męski („el/un c-bet”). W obrębie pliku spójne.
- m11:23 i m11:32 „quede en tablas” za „wyszedł na zero”; w m7:37, m7:63 to samo pojęcie to „no gane ni pierda”. Zrozumiałe, ale „tablas” to raczej remis niż próg opłacalności.
- top-pair: w m8 i m9 forma „pareja mayor” (terms-nazwy: „top pair”; w content/es także „pareja máxima”). W plikach części spójne.
- m11 (57, 59, 64, 68): „bubble factor” po angielsku w zwykłym tekście (tak jak w pl); terms-nazwy dla bubble-factor podaje „factor burbuja”.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład egzaminów m7–m13 jest wierny: wszystkie pytania, odpowiedzi i wyjaśnienia znaczą to samo co w pl, poprawne odpowiedzi pasują do pytań, znaczniki i liczby są nienaruszone. Treść krytyczna m12 (wariancja, tilt, ryzyko ruiny, próg zejścia ze stawki, odesłanie do ekranu „Ayuda” — zgodne z es.json) bez znalezisk. Jedyny wzorzec wart ujednolicenia to drobne różnice między plikami (Button/botón, rodzaj c-bet, formy top-pair) oraz dwie nazwy werdyktów w m13 niezgodne z interfejsem. Wariant języka: europejski (vosotros: „pasasteis”, „os quedan”), bez mieszania.
