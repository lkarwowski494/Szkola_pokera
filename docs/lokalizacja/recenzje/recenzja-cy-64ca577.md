# Recenzja niezależna CY @ 64ca577b (sesja DB, rola 09-lokalizacja, audit)
Zakres: 46197812..64ca577b — przekład `why` poprawnej opcji q1/q2/q3/q8 w `content/<11 języków>/exams/m12.yaml`, kontrola `sha_pl` w `docs/tresci/narzedzia/scal-rejestr.mjs` z testami, wpisy `docs/tresci/rejestr/m12-m13.json`. Data: 2026-11-11. Gałąź `sesja-db-recenzja` @ 64ca577b (= `origin/sesja-cy-m12`, zgodne z poleceniem).
Kolejność: własna ocena przed lekturą `docs/lokalizacja/stan-cy.md` i `docs/decyzje/CY.md` (czytane dopiero do sprawdzenia zgodności zapisu z kodem, znalezisko ŚR-1).

## Werdykt: PRZYJĄĆ
Brak KRYT i WYS. Przekład zgadza się sensem z pl, liczby wyłącznie przez `{{n:}}`, terminologia zgodna ze słownikami. Kontrola `sha_pl` działa i jej test był czerwony przed kodem z właściwego powodu (mutacja). R-M12-009 ma `sha_pl` w 11/11 językach, więc dziś zmiana pl bez przekładu dla R-M12-009 daje BŁĄD w CI. Dwa ŚR i trzy NIS do backlogu; ŚR-1 warto poprawić przed krokiem „zamienić uwagę w błąd” z D-878, bo wskazuje złe partie.

| ID | Poziom | Tytuł |
|---|---|---|
| ŚR-1 | ŚR | Zapis D-878 i `stan-cy.md` źle opisuje, gdzie leży 66 wpisów bez `sha_pl`; luka dotyczy m.in. numerów pomocy H-INT-1/2 |
| ŚR-2 | ŚR | Opt-in bez zapadki: usunięcie `sha_pl` z wpisu zamienia BŁĄD w uwagę zbiorczą (licznik 66 → 67) |
| NIS-1 | NIS | `przeglad_jezyki.<j>.data` nie zaktualizowane mimo nowego `sha` z 2026-11-11 |
| NIS-2 | NIS | Testy nie pokrywają ścieżki „wpis bez `sha_pl` → uwaga, nie błąd” |
| NIS-3 | NIS | ko i vi q8: cyfra „0” poza `{{n:}}` (pl: słowo „zera”) |

## 1. Przekład (44 pola)
**Mechanicznie** (`dowody-db-64ca577/struktura.txt`, skrypt `dowody-db-64ca577/struk.mjs.txt`): we wszystkich 44 polach zbiór `{{n:…}}` identyczny z pl. Zbiór `{{t:…}}` identyczny poza q3 we wszystkich 11 językach: drugi `{{t:standard-deviation}}` tam, gdzie pl ma podmiot domyślny („stoi we wzorze w kwadracie”). To świadomy wybór (D-876: podmiot nazwany wprost, bez dwuznaczności „stoi”), bez skutku dla liczb. Cyfry poza znacznikami: tylko „2 ×” we wzorze q8 (jak w pl), ko „,000” po `{{n:…hands.k}}` (konwencja pliku ko: 49 wystąpień w `content/ko`) oraz „0” w ko/vi q8 (NIS-3).
**Sens** (czytane przeze mnie wszystkie 11 języków, porównanie z `content/pl/exams/m12.yaml:9`, `:18`, `:27`, `:73`): zdanie sensu przed „Rachunek:” zachowane w każdym języku; zastrzeżenia zachowane („nawet”/„even”/„sogar”, „przy niskim winrate i takim bankrollu jak tutaj”, „przybliżenie przy stałym winrate i SD”); brak dodanych ani pominiętych informacji. To drugi przegląd AI, nie ocena rodzimego użytkownika języka.
**Terminologia:** `{{t:variance|…}}` w q8: ja 分散, ko 분산, zh-Hant 變異數, vi phương sai, de Varianz, fr/es/it/pt/pt-BR jak w pozostałych użyciach w `content/<j>` (ten sam termin co w 16–27 innych wystąpieniach w każdym języku). Forma zwracania się zgodna z plikiem (fr: „vous”, 29 wystąpień w `content/fr/exams/m12.yaml`, 0 „tu”).
**Uwaga bez znaleziska:** de q3 kończy się „also etwa {{n:exam.m12.need.hands.k}} Tsd.” bez „Hände”; tak samo brzmi tekst opcji de („Etwa … Tsd.”), więc spójne.
**Budowa:** `pnpm content:build` kod 0, `git status --porcelain` pusty po budowie, czyli bazy i `tresc.generated.ts` w commicie odpowiadają źródłom (`dowody-db-64ca577/content-build.txt`).

## 2. Kontrola `sha_pl` (`scal-rejestr.mjs`)
- **Test czerwony przed kodem:** mutacja (kod narzędzia z 46197812, testy z 64ca577b): 2 testy nowe `not ok`, pierwszy z komunikatem `brak błędu dla en`, czyli z właściwego powodu; 6 starych zielonych (`dowody-db-64ca577/test-mutacja.txt`, kod 1). Na 64ca577b: 8/8 zielone (`dowody-db-64ca577/test-po.txt`, kod 0).
- **CI:** `package.json:11` uruchamia `scal-rejestr.mjs --przeglad zastępczy --sprawdz` bez `--przed-przegladem`, więc niezgodny `sha_pl` to BŁĄD w CI. Stan obecny: 0 błędów, 1 uwaga zbiorcza (`dowody-db-64ca577/rejestr-sprawdz.txt`).
- **Luka opt-in dla R-M12-009:** dziś brak, bo R-M12-009 ma `sha_pl` we wszystkich 11 językach (`dowody-db-64ca577/sha-pl-pokrycie.txt`). Luka mechaniczna istnieje (ŚR-2); w praktyce ograniczona, bo jednostką skrótu jest cały plik, a `exams/m12.yaml` pokrywa też R-M12-011, n:ror.two, n:br.bi.* z `sha_pl` (sonda: te nadal dają BŁĄD w en).

## 3. Rejestr `m12-m13.json`
Zmienione tylko `sha`, `sha_pl` i dopisek w `kto` dla 5 wpisów × 11 języków (R-M12-009, R-M12-011, n:br.bi.base, n:br.bi.beginner, n:ror.two); `przeglad.sha` pl bez zmian; `rejestr.json` zgodny ze scaleniem partii (`--sprawdz` kod 0). Dowód kontroli (a): przekład zwrotny w `docs/lokalizacja/dowody/cy-m12/zwrotny-A.md`, wejście bez tekstu pl (`wejscie-A.md`: brak „pl”/„polsk”).

## Znaleziska
### ŚR-1 · Zapis D-878 wskazuje złe partie dla 66 wpisów bez `sha_pl`; luka obejmuje numery pomocy
- Dowód: `docs/decyzje/CY.md:8` i `docs/lokalizacja/stan-cy.md:11` mówią „partie m0-m4, m5-m8, m9-m11 poza zakresem tej sesji”. Stan faktyczny (`dowody-db-64ca577/sha-pl-pokrycie.txt`): w rejestrze jest 11 potwierdzonych twierdzeń krytycznych, 6 bez `sha_pl` (6 × 11 = 66): n:dd.bi.small i M12-L4-RAMKA (partia m12-m13, czyli ta sama, którą CY zmieniała), H-INT-1 i H-INT-2 (partia pomoc), t:bankroll i t:risk-of-ruin (partia terminy). Partie m0-m4, m5-m8, m9-m11 nie mają ani jednego wpisu bez `sha_pl`.
- Skutek: zmiana pl w `content/helplines.yaml` albo w lekcji M12-L4 bez przekładu nadal przechodzi CI (po odnowieniu `przeglad.sha` pl), czyli dla tych 6 twierdzeń pierwotna luka 06-tresci-001 jest otwarta, a plan z D-878 kieruje jej domknięcie do partii, które jej nie mają. To nie regresja CY (wcześniej kontroli nie było wcale). Realność: realny mechanizm, brak wystąpienia.
- Propozycja: poprawić opis w D-878/stan (lista 6 ID), domknięcie `sha_pl` dla tych 6 wpisów po kontroli (a) w ich językach; potem uwaga → błąd zgodnie z D-878.

### ŚR-2 · Brak `sha_pl` to uwaga zbiorcza bez zapadki
- Dowód: `docs/tresci/narzedzia/scal-rejestr.mjs:134` (`if (!pj.sha_pl) bezSkrotuPl.push(…)`) i `:139` (jedna `uwagi.push`). Sonda w kopii roboczej: zmiana pl q8, odnowiony `przeglad.sha` pl, usunięte `R-M12-009.przeglad_jezyki.en.sha_pl` → dla R-M12-009 BŁĄD w 10 językach, en tylko w liczniku uwagi „67 wpisów” (`dowody-db-64ca577/sonda-luka.txt`).
- Skutek: nadpisanie obiektu `przeglad_jezyki.<j>` bez pola `sha_pl` (np. przy następnej kontroli (a)) cicho wyłącza kontrolę dla tego wpisu. Realność: brzegowy (wymaga późniejszej edycji; dziś inne twierdzenia na tym samym pliku nadal łapią zmianę m12).
- Opcje: (a) zapadka: lista dozwolonych ID bez `sha_pl` w narzędziu (dziś 6) albo pułap licznika 66, każdy nowy brak = BŁĄD — tanie, domyka lukę od razu; (b) zostawić do kroku „uwaga → błąd” z D-878 — zero pracy teraz, luka do tego czasu. Rekomendacja: (a), bo koszt to kilka linii i test. Analogii w Treningu nie sprawdzałem (decyzja należy do naprawy, nie do recenzji).

### NIS-1 · Data przeglądu nie odpowiada `sha`
- Dowód: `docs/tresci/rejestr/m12-m13.json:297` `"data": "2026-11-09"` przy `sha` odnowionym przez CY 2026-11-11; diff 46197812..64ca577b nie zmienia żadnego pola `data` (0 linii `+ "data"`). Data CY jest tylko w tekście `kto`. Skutek: śledzenie, która kontrola (a) dotyczy którego skrótu, wymaga czytania `kto`.

### NIS-2 · Ścieżka „brak `sha_pl` = uwaga” bez testu
- Dowód: `docs/tresci/narzedzia/scal-rejestr.test.mjs:151` — `odnow` zapisuje `sha_pl` we wszystkich wpisach krytycznych fixture, więc żaden test nie sprawdza zachowania z `:134`/`:139`. Przy zamianie uwagi w błąd (D-878) brak testu, który to pokaże.

### NIS-3 · Cyfra „0” poza `{{n:}}` w ko i vi
- Dowód: `content/ko/exams/m12.yaml:73` „0보다 확실히 큽니다”, `content/vi/exams/m12.yaml:73` „lớn hơn 0 rõ rệt”; pl `content/pl/exams/m12.yaml:73` ma słowo „zera”. Ten sam zapis był już w dystraktorze (`:74` w obu plikach). Bez wpływu na liczby uczone; zgodność z zasadą „liczby tylko przez `{{n:}}`” do decyzji roli 06 (zero jako słowo czy wyjątek).

## Czego nie sprawdzono
- Przegląd rodzimego użytkownika języka (krok człowieka, poza zakresem).
- Wyświetlenie w aplikacji (Expo web / urządzenie) — zmiany są w tekście `why`, długości zbliżone do poprzednich; zrzutów nie robiłem.
- `pnpm run ci` — nie uruchamiane, bo nie dodaję testów (polecenie DB, pkt 3.2); stan CI autora: `docs/programista/dowody/cy-ci-46197812.txt` (kod 0).

`git status --porcelain` przed commitem recenzji: pusty poza nowymi plikami w `docs/lokalizacja/recenzje/` i `docs/lokalizacja/stan-db.md`.
