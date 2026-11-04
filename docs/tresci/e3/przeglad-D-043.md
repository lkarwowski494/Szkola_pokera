# Przegląd D-043: diff 645b08f..35b24e6 (rola 06 E3, D-156, D-157)

Recenzent w świeżym kontekście, 2026-11-04. Nic nie zmieniałem w repo, bez commitów.

## Weryfikacja

- `pnpm run ci` na 35b24e6: **EXIT 0** (log: `ci.log` w tym katalogu). Strażnik rejestru: 0 błędów, 50 uwag (wszystkie: „krytyczne bez przeglądu człowieka”).
- `git status` po CI: czysty. `pnpm content:build` → content-v6.db (hash 556fa21160812750), `git status` nadal czysty: helplines.generated.ts, terms.generated.ts i content-v6.db są zgodne ze źródłami.
- Limit czasu testu (`tools/content-build/test/build.test.ts:82`, 30 s): uruchomione osobno testy trwają 1,0 s (kompilacja) i 2,1 s (deterministyczność). Test jest synchroniczny, więc nie może się zawiesić; wyższy limit daje tylko zapas na obciążony runner i niczego nie ukrywa. OK.
- Schemat: `phone_alt` z `label` jest dozwolony (`packages/content-schema/src/helplines.ts:44`), ma numer główny (refine :60). Wpis vn-115 przechodzi walidację i kontrolę duplikatów numerów. Kolejność VN na ekranie to 115, potem 113 (selectHelplines zachowuje kolejność z YAML; test helplines.test.ts:111 to sprawdza).
- Regex ID w `scal-rejestr.mjs:69` (`(?<![\w-])ID(?![\w-])`): sprawdziłem ręcznie. H-CA-1 nie trafia w H-CA-10, R-M12-010 nie trafia w R-M12-0100 ani w XR-M12-010, M12-L4-RAMKA nie trafia w M12-L4-RAMKA-2. Nadmiarowe trafienie (np. `R-M12-010.5`) jest bezpieczne, bo tylko dokłada jednostkę. Klucze `{{n:…}}` w treści mają wyłącznie prostą postać, bez modyfikatorów, więc wzorzec n: obejmuje wszystkie użycia. Identyfikatory krytyczne nie występują poza lessons/exams/rules.yaml/numbers.yaml (poza bazą).
- Obejścia kontroli sha, które sprawdziłem i które nie działają:
  - twierdzenie krytyczne bez jednostek daje błąd (:81);
  - brak sha przy krytycznym daje błąd w trybie ścisłym (kontrole-tresci.mjs:94);
  - zły plik w uzyte_w daje błąd.
  - Wpis krytyczny nie-„potwierdzone” jest pomijany (:79), ale blokują go inne kontrole: strażnik content-build i kontrola pomocy (:52).
- Ekran `apps/mobile/src/app/help.tsx` pokazuje: nazwę, godziny i koszt, info, **tylko `phone`** i linki. Nie pokazuje `phone_alt`, `sms` ani `language`. Zmiana pola language w us-ncpg nie dotyka więc ekranu.

## Znaleziska

Żadne nie jest KRYTYCZNE ani WYSOKIE. Wydania nie blokuje nic.

### 1. ŚREDNIE: numer よりそい dla Fukushimy (phone_alt) nie jest widoczny w aplikacji
- Gdzie: `content/helplines.yaml:396-398`, `apps/mobile/src/app/help.tsx:85-91`, `tools/content-build/test/helplines.test.ts:92`, `docs/tresci/rejestr/pomoc.json` H-JP-2.
- Opis: dodany `phone_alt` 0120-279-226 („z prefektury Fukushima”) trafia do helplines.generated.ts. Ekran renderuje jednak tylko `entry.phone`, a D-156 sam to stwierdza („ekran nie pokazuje etykiet ani `phone_alt`”). Twierdzenie H-JP-2 i test `phones(jp,'crisis')` sugerują, że numer jest podany użytkownikowi, a nie jest. Lekcja go nie pokazuje (ramka ma tylko pointer i pomoc online).
- Scenariusz: osoba w kryzysie w Fukushimie widzi tylko 0120-279-338. MHLW podaje dla tej prefektury osobny numer, więc numer z ekranu może nie być dla niej właściwy. Nie pogarsza to stanu sprzed diffu (wcześniej numeru nie było wcale), ale dane i rejestr deklarują coś, czego ekran nie robi.
- Poprawka minimalna: w `Entry` (help.tsx) wyrenderować `entry.phone_alt` jako dodatkowe przyciski, np. `Zadzwoń: 0120-279-226 (z prefektury Fukushima)` z a11y. Dodać do HelpScreen.test przypadek JP. Alternatywa: usunąć phone_alt i zdanie o Fukushimie z H-JP-2, dopóki ekran tego nie obsłuży.

### 2. ŚREDNIE: „Gordon Moody, Wielka Brytania” w nazwie H-INT-1 bez przeczytanego źródła
- Gdzie: `content/helplines.yaml:627`, rejestr H-INT-1 (twierdzenie i zrodla).
- Opis: oba cytaty gordonmoody.org.uk zostały usunięte. Nowe źródła (gamblingtherapy.org) nie wspominają ani Gordon Moody, ani Wielkiej Brytanii, a nazwa z tą atrybucją jest pokazywana na ekranie Pomoc i w ramce M12-L4. To łamie zasadę „każde twierdzenie ma przeczytane źródło” (CLAUDE.md). Merytorycznie atrybucja jest najpewniej prawdziwa, więc to nie jest błędne twierdzenie.
- Poprawka: dodać przeczytany cytat z gamblingtherapy.org (stopka albo „About”) o Gordon Moody. Jeśli takiego cytatu nie ma, skrócić nazwę do „Gambling Therapy” i zaktualizować test helplines.test.ts:184.

### 3. ŚREDNIE: ścisły tryb strażnika nie działa nigdzie automatycznie; żaden wpis krytyczny nie ma `przeglad`
- Gdzie: `package.json:9` (`tresci:rejestr` z `--przed-przegladem`), `.github/workflows/` (brak uruchomienia `--przeglad zastępczy`), `docs/decyzje.md` D-156 („przegląd zastępczy powtórzony na zmienionych wpisach”).
- Opis: w CI niezgodność sha i brak przeglądu to tylko UWAGI. `node docs/tresci/narzedzia/scal-rejestr.mjs --przeglad zastępczy --sprawdz` daje teraz **50 błędów**: żaden z 55 wpisów krytycznych nie ma pola `przeglad {kto,data,sha}`. Przegląd zastępczy, o którym mówi D-156, nie jest więc w danych przypięty do sha, a nowy mechanizm D-157 niczego jeszcze nie pilnuje.
- Scenariusz: wydanie przechodzi przez zielone CI bez przypiętego przeglądu treści krytycznych (D-027), bo nic nie uruchamia trybu ścisłego.
- Poprawka: przed wydaniem wpisać `przeglad` z sha z `--skroty` dla przejrzanych wpisów. Dodać do listy kontrolnej wydania (albo do workflow wydania) krok `node docs/tresci/narzedzia/scal-rejestr.mjs --przeglad zastępczy --sprawdz` z oczekiwanym kodem 0.

### 4. NISKIE: skrót nie obejmuje kolejności wpisów pomocy w jednym twierdzeniu
- Gdzie: `docs/tresci/narzedzia/scal-rejestr.mjs:68` plus `kontrole-tresci.mjs:80` (sortowanie jednostek).
- Opis: jednostki są sortowane, więc zamiana kolejności vn-115 i vn-113 (dokładnie poprawka S1, od której zależy, który numer jest pierwszy) nie zmienia sha H-VN-3.
- Poprawka: w prefiksie jednostki dodać indeks wpisu w pliku, np. `helplines.yaml#${h.entries.indexOf(e)}:${e.id}`.

### 5. NISKIE: skrót liczy tekst z placeholderami, nie wyrenderowane wartości
- Gdzie: `scal-rejestr.mjs:65-70`.
- Opis: reguła i lekcja są haszowane w postaci źródłowej (`{{n:ror.base}}`). Zmiana wejścia formuły, np. `var.wr.typical.low` albo `ror.base.neg`, zmienia liczbę widoczną w R-M12-010/011, a sha zostaje ten sam. Dziś krytyczne liczby (br.bi.*, dd.bi.small, ror.two) to stałe, więc ryzyko jest teoretyczne.
- Poprawka: do jednostki dołączać JSON wszystkich wpisów numbers.yaml użytych w tekście jednostki, przechodnio po `refs`.

### 6. NISKIE: `uzyte_w` wskazujące katalog przerywa skrypt
- Gdzie: `scal-rejestr.mjs:73`.
- Opis: `existsSync` przepuszcza katalog, a `readFileSync` rzuca EISDIR. Skrypt kończy się wyjątkiem zamiast komunikatem `BŁĄD`.
- Poprawka: `statSync(p).isFile()` zamiast `existsSync(p)`.

### 7. NISKIE: test nie sprawdza części tego, co deklaruje, i pomija przypadki brzegowe
- Gdzie: `docs/tresci/narzedzia/scal-rejestr.test.mjs:401, :406`.
- Opis:
  - `assert.equal(po.status, 1)` niczego nie dowodzi: bez `--przed-przegladem` kod 1 dają i tak 50 innych wpisów krytycznych bez przeglądu.
  - Sprawdzenie przed zmianą (:401) nie potwierdza, że reszta przebiegu jest czysta.
  - Brak testów dla: krytycznego bez jednostek, granicy ID (H-CA-1 / H-CA-10), zmiany lekcji używającej `{{n:…}}` krytycznej liczby, błędnego `uzyte_w`.
  - Same asercje na komunikatach są poprawne. Test 1 łapie zmianę helplines, test 2 zmianę lekcji w obu trybach, test 3 zastępczy przegląd bez polityki.
- Poprawka: usunąć asercję statusu albo ustawić przegląd wszystkim krytycznym w kopii i wtedy oczekiwać 0 → 1. Dopisać 2–3 przypadki brzegowe.

## Bez uwag
- Zmiany w content/helplines.yaml (VN: dwa wpisy, „Pogotowie ratunkowe” 115 jako pierwszy i „Policja” 113; usunięty phone_alt 115; nowe źródło LSVN szczebla 3; de-pl hours; gb-ngh nazwa; int-gambling-therapy link i info) zgadzają się ze schematem i z cytatami. Link https://www.gamblingtherapy.org/ działa na ekranie (host „gamblingtherapy.org” w etykiecie, test HelpScreen.test.tsx:60, :69-70).
- terms.generated.ts zgodny z terms.yaml (risk-of-ruin def). numbers.yaml (decimals 2 dla bf.loss/gain/range): build bez ostrzeżeń.
- pl.json intro: zmiana tylko tekstowa, klucze bez zmian (i18n zielone).
