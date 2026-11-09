# Rozstrzygnięcia drugiego przeglądu przekładu de i es (D1–D3, E1–E3, kontrola (a)); ko, it, vi — następna sesja

Data: 2026-11-09, sesja AI (tylko docs, rola 09; prompt roli niezłożony — add_repo `prompts` odrzucone przez klasyfikator uprawnień, wyjątek nazwany jak D-381; instrukcja z wzoru AD: `../przeglad-pt-BR-fr-2026-11-09/rozstrzygniecia.md`, REJESTR `scripts/i18n/wspolne.mjs:60–75`, D-287, D-344). Wejście: propozycje z przebiegów 42700455560, 42700470707, 42707292121 (`../przeklad-de-es-ko-it-vi-2026-11-09.txt`). **Nic nie zapisano do `content/` ani `locales/`**; poprawki to listy do `docs/lokalizacja/narzedzia/poprawki.mjs` na kopię propozycji. Decyzje: D-385, D-386.

## Jak przeglądano

- 6 subagentów w świeżym kontekście, bez notatek tłumacza, wspólna instrukcja (scratchpad `instr.md`: rejestr de „du”, es es-ES „tú”; reguły znaczników; wagi). Próba na język: cały `rules.yaml`, `spots.yaml`, `areas.yaml`, `modules.yaml` (D1/E1); cały słownik UI i `terms-def.yaml` + terminologia na przeczytanych źródłach i szkic K-05 (D2/E2); lekcje m0-l1, m2-l2, m5-l3, m10-l1, **m12-l4** + egzamin m2 (D3/E3). 39 lekcji i 13 egzaminów na język: tylko kontrola automatyczna (`kontrolaPropozycji`).
- Kontrola (a) treści krytycznej (D-135) w zakresie zadania: m12-l1 i R-M12-* (11 reguł). Przekład zwrotny de→pl i es→pl w jednej sesji **bez dostępu do źródła**, porównanie sensu z rozstrzyganiem na oryginale w trzeciej: `wynik-a-de.md`, `wynik-a-es.md` — **zaliczona w obu**, 0 znalezisk; [NIEJASNE] („vor ihnen absetzt”, „se aleja de ellas”; R-M12-011 „czyli przy pełnym bankrollu”) zgodne ze źródłem pl (`content/pl/rules.yaml:1031`, m12-l1 „wynik od nich ucieka”). m12-l4 (ramka „Odpowiedzialna gra”) w próbie D3/E3: granice i przeczenia poprawne.
- Kontrola wyniku: wszystkie 6 list razem na kopiach (`poprawki.mjs`): de-lekcje 5, es-lekcje 17, de+es reszta 139 = **161 nałożonych, 0 pominiętych** (kod 0); `ocena-propozycji.mjs` na HEAD 1c3e752: lekcje 44/44 × 2, reszta 40/42 (tylko UI `welcome.title`, D-385). sha256 kopii (pierwsze 16 zn.): de-lekcje 377ecc9015256271, es-lekcje be701689eba73058, reszta d6b0cee50b347e10.

## Podsumowanie

| grupa | zakres | KRYT | WYS | ŚR | NISKIE | poprawek |
|---|---|---|---|---|---|---|
| D1 | de rules, spots, areas, modules | 0 | 0 | 5 | 8 | 23 |
| D2 | de UI, terms-def, terminologia | 0 | 0 | 9 | 4 | 28 |
| D3 | de 5 lekcji + egzamin m2 | 0 | 1 | 5 | 3 | 13 |
| A-de | kontrola (a) de | 0 | 0 | 0 | 0 | 0 |
| E1 | es rules, spots, areas, modules | 0 | 0 | 7 | 5 | 48 |
| E2 | es UI, terms-def, terminologia | 0 | 0 | 8 | 7 | 32 |
| E3 | es 5 lekcji + egzamin m2 | 0 | 0 | 3 | 5 | 17 |
| A-es | kontrola (a) es | 0 | 0 | 0 | 0 | 0 |

Razem: **de 64, es 97** poprawek; wszystkie WYS i ŚR w listach (poza znaleziskami systemowymi w lekcjach poza próbą — plan §3), NISKIE tylko krótkie i pewne.

## Decyzje szczegółowe

| raport | miejsce | waga | decyzja |
|---|---|---|---|
| D3 | de `exams/m2.yaml` q2 „Die Straße bringt dir nur eine Acht” (odwrócony sens: pl „strita daje tylko ósemka”) | WYS | przyjęto „Nur eine Acht bringt dir die Straße” |
| D2, D1 | de straight: UI „Straight”, lekcje „Straße” (104×) | ŚR | nazwa „Straße” (de.wikipedia „Ein Straight, im Deutschen auch Straße”), UI ujednolicone (16 kluczy); ulica = „Street” (modules m1, m9; sklep) |
| D1 | de „weiter” = „szerzej” dwuznaczne („kann weiter pushen”) | ŚR | „breiter” (4 reguły) |
| D3 | de m12-l4 „auf der Karte zum verantwortungsvollen Spielen” („Karte” = karta do gry) | ŚR | wskazanie ramki „Verantwortungsvolles Spielen”; to samo w m12-l3:133 — plan §3 (ponowna kontrola (a) tego zdania) |
| D2, D3 | de rodzaj „Bet” (der/die), SPR nijaki, „hohes {{t:two-pair}}” | ŚR | żeński wg źródeł i większości; poza próbą — skrypt w sesji kodu (plan §3) |
| E2 | es `drill.category.*` bez formy („Ambos tenéis two pair”) | ŚR | formy jak `categoryAcc` |
| E2, E1 | es Q „reina”/„dama”, wet „mojado”/„húmedo”, recreacional/recreativo, suited/„del mismo palo” | ŚR | „dama”, „húmedo” (oś „humedad”, PokerStrategy „mesa húmeda”), „recreativo”, „del mismo palo” |
| E3, E1 | es call „pagar”/„igualar” | ŚR | „igualar” (przycisk UI „Igualo”, większość lekcji); zamiana „pagar” poza próbą skryptem (plan §3) |
| E3 | es m5-l3 `{{t:big-blind}}` bez formy ×10 („la big blind”) | ŚR | `{{t:big-blind\|ciega grande}}` |
| E2 | es K-05: board „mesa” („en la {{t:board}}”), call/fold rzeczowniki angielskie, top pair/overpair/blocker po angielsku (źródła), tłumacz „pareja máxima”×84 | — | szkic `terms-nazwy-es.yaml` (126/162 ze źródłem, 0 konfliktów rodzaju na 705 miejscach); „pareja máxima” vs „top pair” — [DO USTALENIA] 06/09 |
| D2, E2 | `welcome.title` „Pokerschule”/„Escuela de Póker” wobec „PokerGym” | — | D-385: „PokerGym” w kopii + odświeżenie skrótu (0 USD) |
| E2 | es-ES / es-419: „bote”/„pozo” (źródło), vosotros/ustedes, ordenador/computadora | — | notatka dla przyszłej nakładki es-419 (`E2-terminy.md`) |

# ko, it, vi (sesja AJ, 2026-11-09, tylko docs; decyzje D-388–D-390)

Prompt roli niezłożony: add_repo `prompts` ponownie odrzucone przez klasyfikator uprawnień — rola z wzoru sesji AI (ten plik, wyżej), wyjątek nazwany jak D-381. Wejście: przebiegi 42701311638 (ko lekcje), 42703964212 (it lekcje), 42703970053 (vi lekcje), 42707298446 (ko+it reszta), 42710131602 (vi reszta; pobrany w AJ). sha256 zip = digest artefaktu (5/5 zgodne). Ocena na HEAD 33fdec3: lekcje 44/44 × 3; ko+it reszta 40/42 (tylko UI ko/it — `welcome.title`, D-385); **vi reszta 21/21** (dispatch po D-384, `welcome.title` = „PokerGym”). **Nic nie zapisano do `content/` ani `locales/`.**

## Jak przeglądano (wzór de/es)

- 9 subagentów w świeżym kontekście, wspólna instrukcja (rejestr ko -니다/-세요, it „tu”, vi „bạn”/„hãy”; znaczniki; wagi): K1/I1/V1 — cały `rules.yaml`, `spots.yaml`, `areas.yaml`, `modules.yaml` (V1 także `helplines.yaml`); K2/I2/V2 — cały słownik UI, `terms-def.yaml`, terminologia na przeczytanych źródłach (cytaty sprawdzone `grep -F`: ko 98/98, it 90/90, vi 113/113) i szkic K-05; K3/I3/V3 — lekcje m0-l1, m2-l2, m5-l3, m10-l1, m12-l4 + egzamin m2, a skryptem wszystkie 44 lekcje (liczby cyfrą, spójność terminów).
- **Liczby poza znacznikami** (ostrzeżenia automatyczne ko „nadmiarowe 10, 5, 8…”, vi): ko 101 wierszy w 26 lekcjach, vi 81 — **wszystkie to liczebniki słowne/rangi kart/daty zapisane cyfrą, 0 liczb spoza źródła** (K3.md, V3.md). vi `rules.yaml` „5.10” = data 5/10/2026 w zapisie wietnamskim (V1.md).
- Kontrola (a) m12-l1 + R-M12-* (11 reguł): przekład zwrotny ko/it/vi→pl bez dostępu do źródła, porównanie sensu z rozstrzyganiem na oryginale w osobnej sesji: `wynik-a-ko.md`, `wynik-a-it.md`, `wynik-a-vi.md` — **zaliczona we wszystkich trzech**; KRYT 0, WYS: it R-M12-011 „risali al più presto quando” (= „jak najszybciej”, źródło „najwcześniej”) — podniesione do WYS, poprawka „solo quando … non prima”; ten sam zwrot w it m12-l4 (I3, WYS). Po nałożeniu: 0 wystąpień „al più presto” w it.
- Ramka „Odpowiedzialna gra” (m12-l4) w ko/it/vi: granice i przeczenia poprawne; odesłanie ko „책임감 있는 게임 카드” (= karta do gry) poprawione w m12-l4 (K3) i m12-l3:133 (K4, analogia D4 de). it „scheda”, vi „thẻ” — nie oznaczają karty do gry (it „carta”, vi „lá bài”) — bez zmian.

## Podsumowanie

| grupa | zakres | KRYT | WYS | ŚR | NISKIE | poprawek |
|---|---|---|---|---|---|---|
| K1 | ko rules, spots, areas, modules | 0 | 0 | 6 | 8 | 8 (+88 ujednolicenie) |
| K2 | ko UI, terms-def, terminologia | 0 | 0 | 13 | 3 | 47 |
| K3 | ko 5 lekcji + egzamin m2, liczby 44 lekcji | 0 | 0 | 10 | 5 | 24 |
| K4 | ko m12-l3:133 „카드” | 0 | 0 | 1 | 0 | 1 |
| A-ko | kontrola (a) ko | 0 | 0 | 2 | 1 | 1 (1 duplikat K1 usunięty) |
| I1 | it rules, spots, areas, modules | 0 | 0 | 2 | 7 | 7 |
| I2 | it UI, terms-def, terminologia | 0 | 0 | 7 | 6 | 30 |
| I3 | it 5 lekcji + egzamin m2 | 0 | 1 | 4 (+3 korpus) | 8 | 20 |
| A-it | kontrola (a) it | 0 | 1 | 0 | 0 | 1 |
| V1 | vi rules, spots, areas, modules, helplines | 0 | 1 | 7 | 10 | 27 |
| V2 | vi UI, terms-def, terminologia | 0 | 0 | 13 | 6 | 37 |
| V3 | vi 5 lekcji + egzamin m2, liczby 44 lekcji | 0 | 0 | 4 (+8 korpus) | 6 | 9 |
| A-vi | kontrola (a) vi | 0 | 0 | 1 | 4 | 1 (3 równoważne V1 usunięte) |

**Test łączny (wszystkie listy języka, kopie propozycji, `poprawki.mjs`):** ko-lekcje 22, it-lekcje 11, vi-lekcje 9, ko+it reszta 194, vi reszta 65 = **301 nałożonych, 0 pominiętych, kod 0** w 5/5; 195/195 jednostek parsuje się (JSON, YAML, frontmatter); `ocena-propozycji.mjs` na kopiach: lekcje 44/44 × 3, vi reszta 21/21, ko+it reszta 40/42 (UI — D-385). Kolejność list: ko K1, K1-ujednolicenie, K2, K3, K4, A-ko; it I1, I2, I3, A-it; vi V1, V2, V3, A-vi. sha256 kopii (16 zn.): ko-lek e9796731e47ef257, it-lek e2c3da6f7c661e0f, vi-lek 6fd887100155f7e5, ko+it reszta 3be356b7e5745b15, vi reszta e93629c5b987b54a.

## Decyzje szczegółowe (WYS i systemowe)

| raport | miejsce | waga | decyzja |
|---|---|---|---|
| V1 | vi R-M3-006 then „mở rộng hơn từ UTG nhưng hẹp hơn từ Button” (czyta się odwrotnie) | WYS | „so với khi ở” (kierunek jak pl) |
| I3, A-it | it m12-l4, R-M12-011 „al più presto” | WYS | „non prima di / solo quando … non prima” |
| K1, K2, A-ko | ko variance 변동성 / 분산 | ŚR | „분산” (lekcje, egzamin, terms-def, źródło ko K2-terminy); m12-l3 — skrypt sesji kodu |
| K1, K2 | ko flop 플랍/플롭, c-bet c벳/C벳/씨벳, obrona 디펜드/디펜스/방어 | ŚR | **플롭, C벳, 방어** (ko.wikipedia, większość lekcji/UI); rules+modules lista `poprawki-K1-ujednolicenie.json` (88), lekcje — skrypt sesji kodu |
| K3 | ko pytania w 해요체 (m0-l1, m2-l2) | ŚR | -니까 jak reszta korpusu (424×) |
| I2 | it fold „passare” w UI (13) wobec „foldare” (~560) | ŚR | „foldare” (passare = także check w it.wikipedia); lekcje m2-l2/m5-l1 „lasciare” — skrypt z ręcznym przeglądem (passare bywa checkiem) |
| I2, I3 | it rodzaj „call” (UI la/una, lekcje il/un) | ŚR | męski „il call” (PokerStrategy IT „Un call è…”); 5 miejsc poza próbą — sesja kodu |
| V1 | vi ulica „street” (rules) / „vòng cược” (lekcje 70×) | ŚR | „vòng cược” (13 poprawek w rules) |
| V2, V1 | vi open „mở bài”×82 / „mở”×34 / „mở cược” | ŚR | **„mở cược”** — jak sklep D-387 i K-05; ujednolicenie skryptem sesji kodu; „bộ bài” = ręka (6) → „tay bài” |
| V1 | vi „mức cược” (stawka) użyte dla rozmiaru betu | ŚR | „kích thước cược” |
| K2, I2 | `welcome.title` „포커 스쿨”/„Scuola di Poker” | — | „PokerGym” w listach K2/I2 (D-384) + odświeżenie skrótu UI (D-385) |

[DO USTALENIA] (terminologia bez rozstrzygającego źródła — do K-05 przy nałożeniu albo przeglądu rodzimego użytkownika): ko „투페어”/„투 페어”, „넛”/„너츠”, gracz „나”/„당신”, 24 nazwy K-05 bez źródła; it „coppia massima”×34 vs „top pair” (źródło tylko „top pair”), „scala reale” (it.wikipedia = straight flush, przekład = royal flush — sprawdzić przy K-05), „secco/asciutto”, „fiches/fiche”, „lo SPR”/„l'SPR”, „micro limiti”/„microlimiti”, „bui”/„blind”; vi „big blind”/„mù lớn” (oba w źródłach), board „bàn”/„bài chung”/„board”, check „xem bài”/„check”, pot „hũ”, bluff „tháu cáy”, range „dải bài”, „ván”/„tay” (rozdanie), wielka litera dla 116 znaczników bez formy na początku zdania (renderer albo forma w treści).
