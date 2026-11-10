# ko · L2 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/lessons/m4-l1-3bet.md | tak (pl 105 linii, ko 105 linii) | znaczniki i liczby zgodne; terminologia: „수딧” |
| content/ko/lessons/m4-l2-obrona-bb.md | tak (93 / 93) | „3-bet” zamiast „3벳” |
| content/ko/lessons/m4-l3-wobec-3betu.md | tak (112 / 112) | bez znalezisk |
| content/ko/lessons/m4-l4-limperzy.md | tak (75 / 75) | „수딧”, „이니셔티브” |
| content/ko/lessons/m5-l1-tekstury.md | tak (109 / 109) | „c-bet”, „양방”, „웻 정도” |
| content/ko/lessons/m5-l2-przewagi.md | tak (100 / 100) | „너츠”, „c-bet”, „연결된”, „수딧” |

Pomocniczo: `content/ko/terms-nazwy.yaml` przeczytany w całości; `docs/lokalizacja/glosariusz.md` tylko nagłówek i pierwsze ok. 25 wierszy tabeli (reszta nieprzeczytana — klucze i nazwy brałem z `terms-nazwy.yaml`); `content/en/` otwarte w dwóch miejscach (m4-l2 linia 92, m5-l1 linia 108); `content/numbers.yaml` i `tools/content-build/src/numbers.ts` tylko dla sprawdzenia zapisu liczb (mnożnik wyświetla się jako „3x”, stosunek jako sama liczba, więc „약 3x로”, „팟의 약 …배” są poprawne).

Kontrola mechaniczna (skrypt porównujący pl i ko linia po linii): we wszystkich 6 plikach ta sama liczba linii, identyczne zbiory `{{n:…}}`, kluczy `{{t:…}}` i `[[…]]` w każdej linii, identyczne pola nieprzekładalne (id, family, rules, table, answer, spot, generator, params, count, `correct`, `sizeError`). Poprawne odpowiedzi w ćwiczeniach zgodne z pl. Błędów sensu (liczby, zakresy, pozycje, kierunek zalecenia) nie znalazłem.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | m4-l1-3bet.md:46, 47, 99 oraz m4-l3-wobec-3betu.md:28, 36, 48, 76, 112 | pl „blokuje” → w m4-l1 „블록하고 / 블록하지”, w m4-l3 „블로킹하며 / 블로킹하지” (dwie postaci tego samego czasownika między lekcjami; termin `blocker` = „블로커”) | wybrać jedną postać w całym przekładzie (np. „블록하다”); nie zgłaszam poprawek, bo oba zapisy są zrozumiałe |
| NISKIE | m5-l2-przewagi.md:17, 86 („킹”), 64 („잭”) wobec m5-l1 („K”, „J”, „A”) i m5-l2:37–38 („에이스”) | nazwy rang raz literą, raz słowem | bez wpływu na sens; ewentualnie ujednolicić przy okazji |

## Do ujednolicenia skryptem
Wszystkie miejsca z tej części są w `L2.json` (48 poprawek); te same wzorce występują poza częścią L2, liczby trafień w `content/ko` + `apps/mobile/src/i18n/locales/ko.json` (`grep -rho … | wc -l`, odczyt 2026-11-10):
- `수딧` → `수티드` (terms-nazwy: suited = „수티드”): 15 trafień ogółem, 13 w tej części (poprawione); `수티드` 27.
- `3-bet` → `3벳` (terms-nazwy: 3-bet = „3벳”): 130 trafień ogółem wobec 207 „3벳”; w tej części 9 (m4-l2, poprawione). Uwaga dla skryptu: nie ruszać kluczy znaczników (`{{t:3-bet…`), identyfikatorów ani kluczy `{{n:pf.3bet…}}`; partykuły po „3-bet” i „3벳” są takie same (czytane „벳”).
- `c-bet` → `C벳` (terms-nazwy: c-bet = „C벳”): 142 trafienia ogółem wobec 113 „C벳”, 5 „c벳”, 3 „씨벳”; w tej części 5 (poprawione). To samo zastrzeżenie co do kluczy `{{t:c-bet…}}`.
- `너츠 우위` → `넛 우위`, `{{t:nuts|너츠}}` → `{{t:nuts|넛}}` (terms-nazwy: nuts-advantage = „넛 우위”, nuts = „넛”): „너츠” 26 trafień ogółem, 11 w tej części (poprawione). Partykuły: po „넛 우위” bez zmian; po samym „넛” zamiast „너츠” trzeba zmienić 는→은, 가→이, 를→을, 와→과 (w tej części nie było takiego miejsca: „{{t:nuts|너츠}}”)가” odnosi się do „핸드”).
- `{{t:initiative|이니셔티브}}` → `{{t:initiative|주도권}}` z partykułą 를→을, 가→이, 는→은 (2 miejsca w m4-l4, poprawione).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m5-l1-tekstury.md:80, 87 i tabela 95–96: nazwa flopa „pośredni” = „중간”, a w osi wysokości „średni” = „중간 높이”. Rozróżnienie jest zachowane, ale samo „중간” w tabeli może być mylone z wysokością; czy lepsze byłoby np. „중간 텍스처”? (pl ma ten sam podział na „średni” i „pośredni”).
- m4-l4-limperzy.md: pl „dopłacam / dopłata” (limp za innymi) oddane jako „콜”, a „tylko wyrównał dużego blinda” jako „빅 블라인드에 콜만 했습니다”. Sens zgodny; czy rodzimy gracz nie oczekiwałby tu „림프 / 오버림프”?
- m5-l2-przewagi.md:80: „dopełnienie poprzedniej liczby” = „앞의 숫자의 나머지입니다” — zrozumiałe z dalszego rachunku, ale „나머지” nie jest terminem na dopełnienie do 100%; ewentualnie „앞의 숫자를 100%에서 뺀 값입니다”.
- m4-l1-3bet.md:36: „wobec późnych otwarć” = „레이트 포지션의 오픈에 맞서” (bez znacznika, jak w pl) — poprawne, do potwierdzenia naturalność.
- Poprawka „{{t:connected|커넥티드한}} 플롭” (m5-l2:88): forma „커넥티드한” występuje w przekładzie (wg komentarza w terms-nazwy 5×), zakładam, że jest dopuszczalna.

## Pytania do źródła pl
- m5-l1-tekstury.md:108 (pl): wśród przykładowych flopów „mokrych” stoi „T-9-5-4” — cztery karty, czyli stół z turnem, nie flop („za mokre 9-8-7, Q-J-T i T-9-5-4”). Przekład ko wiernie powtarza „T-9-5-4”. Czy to zamierzony cytat ze źródła, czy pomyłka?
- m4-l2-obrona-bb.md:92 (pl): „3-bet i call są ze sobą powiązane” — en ma „combined”, ko „합쳐져 있는데” (pokazane łącznie). Polskie „powiązane” jest mniej jasne niż en/ko; sens w ko zgodny z en i z kontekstem („siatki pokazują, czym się bronić, a nie jak”).

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Nie było w tej części (moduły 4 i 5, bez treści modułu 12, helplines ani tekstów o prawdziwych pieniądzach).
