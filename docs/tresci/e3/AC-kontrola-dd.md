# AC: kontrola zastępcza n:dd.bi.small po poprawce znaczników (D-376)

- Data: 2026-11-09; weryfikator: niezależny subagent w świeżym kontekście (nie autor); sesja AC, rola 06.
- Zakres: jednostki z `{{n:dd.bi.small}}` zmienione przez poprawkę 16 błędnych `{{t:…}}` (pozycje 1 i 16 listy `docs/lokalizacja/dowody/przeglad-en-2026-11-09/rozstrzygniecia.md`).

| Plik:miejsce | Zmiana | Ocena | Powód |
|---|---|---|---|
| `content/pl/lessons/m12-l1-wariancja.md:83` (q-dd-meaning, opcja [0], `correct: true`) | „{{t:call\|sprawdzasz}} decyzje” → „przeglądasz decyzje” | ZGODNE | sens „review” jak en (`content/en/...m12-l1-wariancja.md:83`); prompt, `why`, tokeny `{{n:…}}`, `correct` bez zmian |
| `content/pl/lessons/m12-l1-wariancja.md:85` (opcja [2]) | „nic nie musisz {{t:call\|sprawdzać}}” → „nic nie musisz przeglądać” | ZGODNE | jak wyżej; opcja dalej błędna z tym samym uzasadnieniem |
| `content/pl/rules.yaml:964` (R-M12-002, `then`) | „{{t:call\|sprawdzasz}} decyzje” → „przeglądasz decyzje” | ZGODNE | `if` z `{{n:dd.bi.small}}`, `because`, `level`, `source` bez zmian; en `rules.yaml:964` „review” |

Bez zmian: m12-l4 (pl, en), `content/numbers.yaml`, `content/en/**`, `content/pl/rules.yaml:1029`. Wartość i twierdzenie bez zmian, rewerdykt niepotrzebny. Skutek: `przeglad.sha` wpisu `n:dd.bi.small` 124d1ba3c752 → 17562103d899 (`scal-rejestr.mjs --sprawdz`); kontrola (a) en (`przeglad_jezyki.en`) bez zmian, bo tekst en się nie zmienił.
