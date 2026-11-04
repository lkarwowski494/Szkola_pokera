# Przegląd D-043 (b): commit 32ea0a0 (rodzic 4c71dd4), D-158 i D-159

Recenzent w świeżym kontekście, 2026-11-04. Nic w repo nie zmieniałem poza tym plikiem, bez commitów.

## Zakres

`git diff 4c71dd4 32ea0a0`: pomoc bez numerów krajowych (`content/helplines.yaml` z `fallback.claim`, schemat, strażnik content-build, moduł aplikacji, ekran „Pomoc”, `scal-rejestr.mjs`, E2E Maestro), usunięcie reguły R-M12-010, liczb `br.bi.src-*` i `exam.m12.bi.pln*`, przepisana lekcja M12-L4 i egzamin M12 (q8, q9, q10). Sprawdzone ścieżki wrażliwe: `tools/content-build/src/{build,helplines}.ts`, `packages/content-schema/src/helplines.ts`, `apps/mobile/src/data/content/helplines.generated.ts`, `apps/mobile/src/app/help.tsx`, `docs/tresci/narzedzia/scal-rejestr.mjs`, testy, `apps/mobile/e2e/04-pomoc.yaml`, `apps/mobile/e2e/helplines-env.mjs`, odwołania do usuniętych id w `apps/mobile/src` i `packages/`, zapisany postęp (`apps/mobile/src/data/user/`).

## Uruchomione komendy

| Komenda | Kod wyjścia | Wynik |
|---|---|---|
| `pnpm content:build` | 0 | content-v6.db (cae0113d470c1413): 44 lekcji, 141 reguł, 819 liczb, 162 terminów; `git status` czysty (wygenerowane pliki identyczne z commitem) |
| `cd tools/content-build && npx vitest run` | 0 | 8 plików, 106 testów zielonych |
| `cd apps/mobile && npx jest src/features/help` | 0 | 8 testów zielonych |
| `node --test docs/tresci/narzedzia/scal-rejestr.test.mjs` | 0 | 4/4 |
| `node docs/tresci/narzedzia/scal-rejestr.mjs --przed-przegladem --sprawdz` | 0 | 0 błędów, 11 uwag (wszystkie „krytyczne bez przeglądu człowieka”, w tym H-INT-1, H-INT-2) |
| `node apps/mobile/e2e/helplines-env.mjs` | 0 | `HELP_LINK=Gambling Therapy: gamblingtherapy.org`, `HELP_ABROAD=<zdanie ogólne>`, `HELP_CHECKED=Dane sprawdzone: 4 listopada 2026` |
| `pnpm run ci` | 0 | strażnik rejestru: 0 błędów, 11 uwag |

`git status` po wszystkich komendach: drzewo czyste; jedynie nieśledzone `docs/tresci/e3/A8.json` i `A8.md` (utworzone 13:43 przez równoległą sesję weryfikatora A8, nie przez komendy z tej listy; nie ruszałem ich).

## Znaleziska

### KRYTYCZNE: brak

### WYSOKIE: brak

### ŚREDNIE (1)

**Ś-1. E2E `04-pomoc` szuka linku po widocznym napisie, a Maestro na iOS widzi etykietę dostępności przycisku. Krok najpewniej nie przejdzie.**
- Miejsce: `apps/mobile/e2e/04-pomoc.yaml:18` (`assertVisible: '${HELP_LINK}'`), `apps/mobile/e2e/helplines-env.mjs:12`.
- Scenariusz: `Button` (`apps/mobile/src/components/ui.tsx`) przekazuje `accessibilityLabel` do `Pressable`, a ekran ustawia go na `help.openA11y` (`apps/mobile/src/app/help.tsx:100`), czyli „Gambling Therapy: otwórz gamblingtherapy.org w przeglądarce”. Na iOS element dostępny wystawia na zewnątrz tylko swoją etykietę i nie pokazuje wewnętrznego `Text`. Maestro dopasowuje cały tekst wyrażeniem regularnym. Dlatego „Gambling Therapy: gamblingtherapy.org” nie trafi w przycisk i krok skończy się błędem.
- Dowód: poprzednia wersja flowu z tego samego powodu sprawdzała przycisk telefonu po etykiecie dostępności, nie po napisie: `assertVisible: 'Zadzwoń pod numer ${HELP_FIRST_PHONE}.*'` (widoczny napis to „Zadzwoń: …”, a etykieta to `help.callA11y` „Zadzwoń pod numer …”). Nowy krok `assertNotVisible: 'Zadzwoń pod numer.*'` też celuje w etykietę. Flow nie był uruchomiony (`docs/tresci/e3/zgloszenia-D-158-D-159.md`: Maestro tylko na macOS).
- Minimalna poprawka: w `helplines-env.mjs` zbudować wartość jak `help.openA11y`, czyli `` `${link.label}: otwórz ${host} w przeglądarce` ``. Inna droga: we flow użyć wzorca `'Gambling Therapy: .*gamblingtherapy\.org.*'`. Kropka bez `\` też pasuje, bo to dowolny znak, więc wystarczy dopisać `.*`.
- Realność: realny dla E2E (czerwony przebieg na macOS). Użytkownik nic nie traci, bo ekran działa, co potwierdza Jest. Wydania to nie blokuje.

### NISKIE (6)

**N-1. `fallback.claim` jest w schemacie opcjonalny, a `claim` wpisu jest wymagany. Brak tego pola po cichu wyłącza strażnika dla jedynego zdania pomocy.**
- `packages/content-schema/src/helplines.ts:80` (`claim: …optional()`), `tools/content-build/src/build.ts:136` (`if (helplines.fallback.claim)`), `docs/tresci/narzedzia/scal-rejestr.mjs:48` (bez claim nie ma jednostki). Kontrola „bez pola claim” w `scal-rejestr.mjs:50` obejmuje tylko `entries`.
- Scenariusz: ktoś usuwa linię `claim: H-INT-2` albo zmienia zdanie i zapomina o polu. Build i scal-rejestr przejdą, a ekran pokaże tekst bez potwierdzonego twierdzenia. Od D-158 to jedyny tekst pomocy w aplikacji.
- Poprawka: usunąć `.optional()`. Plik ma jedną treść, więc nic się nie zepsuje. W scal-rejestr dodać błąd `pokrycie: fallback bez pola claim`.
- Realność: brzegowy, bo wymaga ręcznej edycji, a zmianę widać w diffie.

**N-2. Test „lekcja M12-L4 i moduł ekranu mają te same dane” stał się w części pusty.**
- `tools/content-build/test/helplines.test.ts:167-169`: pętla po `phone/hours/cost/vanity/sms` prawdziwych wpisów nie ma już żadnych wartości (jedyny wpis ich nie ma), więc nic nie sprawdza. Test nie sprawdza też, że moduł aplikacji zawiera `fallback.text`, link i nie zawiera `H-INT-2`. Wyciek `claim` do `fallback` złapałby dziś tylko `tsc` (sprawdzanie nadmiarowych pól w typowanym literale `HELPLINES`), a nie ten test.
- Poprawka: dodać `expect(src).toContain(JSON.stringify(h.fallback.text))`, `expect(src).toContain('https://www.gamblingtherapy.org/')` i `expect(src).not.toContain(h.fallback.claim!)`.
- Realność: teoretyczny, bo dane są dziś zgodne (build daje identyczny moduł).

**N-3. Jest nie sprawdza już na poziomie ekranu przycisków `tel:` ani listy regionów w `help.tsx`.**
- `apps/mobile/src/features/help/__tests__/HelpScreen.test.tsx`: usunięto testy US/GB (przycisk „Zadzwoń”, `tel:` po naciśnięciu, wybór regionu ✓). Mechanika `selectHelplines` i `telUri` jest pokryta na danych syntetycznych (`helplines.test.ts:74-136`), ale ścieżka renderowania w `help.tsx` z numerami nie ma testu. Z prawdziwymi danymi to martwy kod. Zgłoszenie do roli 08 przewiduje jego usunięcie.
- Testy nie zostały osłabione pod kątem tego, co dziś widać: nowy `it.each` dla US/GB/CA/DE/NO/null sprawdza zero numerów, zdanie dokładnie raz (łapie regresję podwójnego zdania z `help.tsx:68`), link, brak listy regionów i datę. Test błędu `openURL` przepięto na link.
- Poprawka: przy upraszczaniu ekranu (rola 08) usunąć martwy kod. Do tego czasu można dodać test renderowania z wstrzykniętymi danymi syntetycznymi.
- Realność: teoretyczny.

**N-4. Id `m12.exam.q10` zostało dla zupełnie innego pytania.**
- `content/pl/exams/m12.yaml:86`: zmieniły się treść, odpowiedzi i rodzina (`m12.bankroll-size` → `m12.risk-of-ruin`). `examDrillIdsSeen` (`apps/mobile/src/data/user/repo.ts:50`) traktuje je jako „widziane”, jeśli ktoś rozwiązywał starą wersję. Wtedy `session.tsx:58,69` wpuszcza nowe pytanie do powtórek rodziny `m12.risk-of-ruin`, choć użytkownik go nie widział, a egzamin traktuje je jako już widziane.
- Postęp się nie psuje: karty FSRS są kluczowane rodziną, a obie rodziny dalej mają zadania w treści (`m12.bankroll-size`: `m12.l4.n-base-bb`, `m12.l4.q-move-up`). Usunięte `m12.l4.q-beginner` zostawia tylko wiersze w `answers`, z których nic nie czyta zadania po id. W `apps/mobile/src` i `packages/` nie ma twardych odwołań do R-M12-010, `q-beginner`, `bi.pln` ani `br.bi.src-*` (grep pusty).
- Poprawka (opcjonalna): nowe id (np. `m12.exam.q11`) zamiast ponownego użycia starego. Na przyszłość warto mieć w content-build listę wycofanych id, żeby nie wracały.
- Realność: teoretyczny. Testy są tylko wewnętrzne, jest jeden użytkownik, a skutek ogranicza się do kolejności zadań.

**N-5. Komentarz w generatorze obiecuje więcej, niż robi kod: `claim` wpisów nadal trafia do aplikacji.**
- `tools/content-build/src/helplines.ts:133` („bez fallback.claim: identyfikator twierdzenia zostaje w repozytorium, jak źródła”), a linia 139 dalej wpisuje `claim: e.claim` każdego wpisu (`helplines.generated.ts`: `"claim": "H-INT-1"`). To nie wyciek danych wrażliwych, bo id jest publiczne w repo, tylko niespójność.
- Poprawka: albo zdjąć `claim` z wpisów (z `Omit` w `AppHelpline`), albo poprawić komentarz.
- Realność: teoretyczny.

**N-6. Krok `assertNotVisible: 'Zadzwoń pod numer.*'` sprawdza tylko widoczny fragment ekranu po przewinięciu do daty.**
- `apps/mobile/e2e/04-pomoc.yaml:22`: przycisk nad krawędzią ekranu nie zostałby wykryty. Dziś to tylko słaby test, bo regresję wcześniej łapie Jest (`queryAllByText(/^Zadzwoń:/)` = 0).
- Realność: teoretyczny.

## Sprawdzone, brak znalezisk

- **Strażnik rejestru w content-build** (`build.ts:136`): `fallback.claim` trafia do `registryUses` tak samo jak `claim` wpisów i przechodzi przez `registryViolations` (status ≠ „potwierdzone” przerywa build). Test `rejestr.test.ts` z `H-INT-2: 'wycofane'` to sprawdza. W rejestrze H-INT-1 i H-INT-2 mają status „potwierdzone”.
- **Schemat**: puste `regions: {}` przechodzi (`z.record`). Jeden wpis przechodzi (`entries.min(1)`). Kontrola „numer alarmowy w każdym kraju” pomija `*`. `fallback.online` wskazuje wpis z `country: '*'`. `.strict()` przy `fallback` przyjmuje nowe pole.
- **`selectHelplines` dla każdego kraju**: dla US/GB/CA/JP/BR/FR/TW/VN/DE/AU/PL/'' daje zero wpisów, `fallbackText` i Gambling Therapy (`helplines.test.ts:62-71`). Dla `regionCode` null albo '' `deviceCountry()` zwraca '' i wynik jest ten sam. Region spoza kraju nie psuje wyniku.
- **Ekran „Pomoc”** (`help.tsx`): zdanie raz (na górze jako `fallbackText`, dolne `abroadText` ukryte, gdy `fallbackText` jest), link i data są. Dla kraju z wpisami (dziś żadnego) zdanie byłoby na dole, czyli też raz. Brak pustej sekcji regionów.
- **Moduł `helplines.generated.ts`**: zgodny z deklarowanym typem (`fallback: { text; online }`, CI z `tsc` zielone), bez `sources` i bez `fallback.claim`. Build daje plik identyczny bajt w bajt.
- **`scal-rejestr.mjs`**: `fallback.claim` liczy się do pokrycia (test: `H-INT-9` daje „brak wpisu”) i do kontroli statusu. Skrót obejmuje `pointer` i `fallback`, a zmiana zdania unieważnia przegląd (test). Wpis zastępczy `{ id: 'fallback', … }` nie koliduje z id wpisów, bo te są kebab-case z prefiksem kraju.
- **Znaki specjalne w zmiennych Maestro**: `HELP_ABROAD` i `HELP_CHECKED` zawierają tylko litery, przecinki, kropki i dwukropki. Kropka pasuje też do samej siebie, a nawiasów, `?`, `+` i `*` nie ma. Nazwa wpisu z nawiasami („Gambling Therapy (Gordon Moody, …)”) nie jest używana jako wzorzec. Problem z `HELP_LINK` opisuje Ś-1 i wynika z etykiety dostępności, nie ze znaków.
- **Usunięcie R-M12-010 i liczb**: brak osieroconych odwołań w treści (build i scal-rejestr bez błędów). `ror.beginner.wr-min` dalej jest używane w tabeli lekcji. Wektory `tests/wektory/brd.json` RD-12 opisują numery, ale żaden test ich nie czyta. Zgłoszenie do roli 01 jest w `zgloszenia-D-158-D-159.md`.
- **Rachunek w nowych zadaniach**: q10 („dwa razy więcej wpisowych przy dwa razy niższym winrate”) zgadza się ze wzorem e^(−2·wr·BR/SD²). `m12.l4.q-unknown-wr`: ror.base ≈ 6,0% (wr 3, 30 BI, SD 80), ror.base.wr-min ≈ 39,2% (wr 1), więc „kilka razy większe” jest poprawne. „Na stawce dwa razy niższej … prawie pełna liczba jej wpisowych”: poniżej 15 BI wyższej stawki to poniżej 30 BI niższej, więc poprawne.
- **Prywatność i bezpieczeństwo**: nowych danych użytkownika nie ma. Linki tylko https do domeny ze źródeł wpisu (kontrola `loadHelplines`). W module aplikacji brak nazw pokoi (`findBrandNames` = []).

Uwaga poza zakresem (brzmienie, rola 04): podtytuł M12-L4 „Wariancja liczona w wpisowych” powinien brzmieć „we wpisowych” (tak jak w tekście lekcji i w definicji terminu).
