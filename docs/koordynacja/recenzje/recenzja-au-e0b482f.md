# Recenzja AU: f8272c1..e0b482f (sesja-au-poprawki)

Recenzent niezależny (świeży kontekst, nie autor), 2026-11-10. Tylko odczyt. Eksperymenty prowadziłem w tymczasowym worktree (detached e0b482f), który na końcu usunąłem.

## Wynik

| waga | liczba |
|---|---|
| KRYT | 0 |
| WYS | 0 |
| ŚR | 1 (poza zakresem AU, już zgłoszone przez autora) |
| NISKIE | 2 |

**Werdykt: przyjąć.**

## 1. ja `data.replaceBody` (dane użytkownika): poprawne
- `apps/mobile/src/i18n/locales/ja.json:96`: „このスマートフォンに保存されている進捗が、ファイルの進捗に置き換わります。この変更は元に戻せません。”
  Dosłownie: „Postęp zapisany w tym smartfonie zostanie zastąpiony postępem z pliku. Tej zmiany nie da się cofnąć.” Konstrukcja „AがBに置き換わる” znaczy, że A zostaje zastąpione przez B. Sens zgadza się z `pl.json:99`.
- Stara wersja („ファイルの進捗が、このスマートフォンに保存されている進捗に置き換わります”) miała odwrócony kierunek. Poprawka jest słuszna.
- Klucze sąsiednie są zgodne z pl:
  - `ja.json:95` replaceTitle: „Zastąpić obecny postęp?”
  - `:97` replaceConfirm: „Zastąp”
  - `:102` imported: „Wczytano postęp z pliku”
  - `:103` importFailed: „Nie udało się zapisać postępu z pliku; obecny postęp się nie zmienił”
- Innych tekstów o kierunku importu w ja nie ma (grep 置き換).

## 2. es m4-l4: poprawne
- `content/es/lessons/m4-l4-limperzy.md:33`: „todos se retiran hasta ti”, czyli wszyscy pasują (fold). Zgadza się z pl „wszyscy pasują do ciebie” (`content/pl/lessons/m4-l4-limperzy.md:33`). Dawne „pasan” znaczyło po hiszpańsku check.
- W treści es nie zostało już żadne „todos pasan” ani „pasan hasta”.

## 3. 13 przywróconych znaczników fr/de/vi: zgodne z pl
Skryptem porównałem w każdym z 13 wierszy multizbiory `{{t:…}}`, `{{n:…}}` i `[[…]]` z wierszem pl o tym samym numerze. Wynik: 13/13 identyczne.
- fr: `rules.yaml:537, 626, 636`, `m5-l3:130`, `m8-l3:55`
- de: `rules.yaml:446, 647, 914`, `m8-l1:17, 50`
- vi: `rules.yaml:801, 897`, `exams/m5.yaml:100`

## 4. Test `apps/mobile/src/i18n/__tests__/przeglad-pelny-wys-09.test.ts`: nie jest tautologiczny
- Uruchamia się w jest (`apps/mobile`, preset jest-expo), nie w vitest. Na e0b482f: 15/15 zielonych.
- Mutacje: w kopii cofałem po jednej poprawce (wiersz z f8272c1 w miejsce wiersza z e0b482f) i uruchamiałem tylko ten plik. Każda z 15 mutacji dała dokładnie „1 failed, 14 passed”. Test wykrywa regresję każdej z 15 poprawek.
- NISKIE: `przeglad-pelny-wys-09.test.ts:24-38`. Test sprawdza stałe fragmenty tekstu, a nie zgodność zbioru znaczników z pl. Uprawniona przeredagowanie zdania go zepsuje (fałszywy alarm), a usunięcie znacznika w innym miejscu tego samego zdania przejdzie niezauważone. Do backlogu: ogólna kontrola parytetu znaczników `{{t:}}` per wiersz względem pl.

## 5. Próbka 20 z 2849 nałożonych poprawek: wszystkie poprawne
- Losowanie z seed 20261110, indeksy: 1225, 2640, 713, 2319, 1930, 2708, 1528, 1307, 737, 2292, 1340, 936, 1343, 2177, 2233, 1648, 2184, 575, 1441, 2430.
- W każdej z 20 wartość „nowy” jest obecna w pliku docelowym na e0b482f, „stary” występuje 0 razy, znaczniki stary = nowy, a tekst nie jest uszkodzony. Przykłady:
  - it m11-l3: rodzajnik „il {{n:…}}”
  - ko m12-l1: „{{n:var.hands.k}},000핸드”
  - de m10: „eine große Bet”
  - zh-Hant w sklepie: 完整存取權
- Dodatkowo sprawdziłem wszystkie 2816 poprawek treści i interfejsu:
  - 2808 ma „nowy” w pliku.
  - 8 nie ma „nowy” w pliku, ale wszystkie 8 wyjaśnia późniejsze ujednolicenie D-440 (`ujednolic-formy.mjs:176-181`), więc nie są regresją:
    - fr `exams/m3.yaml` i `m8.yaml`: Button → Bouton
    - vi m5-l2 i m7-l1 (×5): `{{t:range|dải bài}}` → `{{t:range|range}}`
  - 47 poprawek zmienia znaczniki. Wszystkie celowo dorównują do pl (przywrócony zgubiony znacznik albo usunięty nadmiarowy), zgodnie z polem `powod`.
- `pnpm i18n:kod`: błędy 0. `pnpm content:check`: „Treść aktualna (35 baz)” (uwagi o „1 bb” w m10-l4 istniały już wcześniej).

## 6. Metadane sklepu: zgodne
- ko: podtytuł `docs/sklep/aso/metadane-fala2.json` (lokalizacja ko) to „결정마다 평가와 해설, 판돈 없음” (18 zn.).
- de: podtytuł (de-DE) to „Entscheiden üben ohne Echtgeld” (30 zn., limit 30).
- Nazwy 4 stopni oceny w opisie są identyczne z `grade.*` interfejsu (różnią się tylko wielkością liter). Sprawdziłem 9/9 języków, nie tylko 3:
  - ja: 一致、許容、不正確、ミス
  - ko: 일치, 허용, 부정확, 실수
  - de: übereinstimmend, vertretbar, Ungenauigkeit, Fehler
  - pozostałe 6 języków też zgodne.
- Generator `zbuduj-metadane.py` jest odtwarzalny: ponowne uruchomienie na e0b482f nie daje żadnej różnicy w `store/` ani w `metadane-fala2.json`.
- ŚR (poza zakresem AU, autor zgłosił to do roli 10): `store/app-store-metadata.json:22` (en-US). Opis podaje pierwszy stopień jako „correct”, a interfejs ma `grade.zgodne` = „Aligned” (`en.json:134`). To niezgodność z KO-020 na rynku głównym (US). Nie blokuje, bo nie jest fałszywym twierdzeniem. Wymaga poprawy przed wysłaniem metadanych en-US.
- NISKIE: uwagi autora już zapisane w backlogu (zh-Hant 課程, ja 購入の永久アクセス, ko 플롭/프리플랍) potwierdzam jako NISKIE.
