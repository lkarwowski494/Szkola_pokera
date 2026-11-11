# Drugi przegląd AI przekładu: pt (pt-PT) i pt-BR

Zakres: 37 kluczy z do-przegladu-pt.md i do-przegladu-pt-BR.md (sc-04, 05, 06, 08, 32, 33, 34, R-M11-009). Kontroli mechanicznej znaczników i cyfr nie powtarzano. Odniesienia do korpusu: `content/<język>/` w repo (stan na 2026-11-11).

Sens (liczby, kierunek, warunki) zgodny ze źródłem we wszystkich 37 kluczach obu języków. Brak znalezisk KRYT i WYS.

Uwagi wcześniejszej sesji:
- botão w sc-06 a Button w sc-05, sc-08, sc-11, sc-12: potwierdzone w obu językach. „botão” stoi tylko w sc-06 (oprócz „O botão do dealer” w lekcji m3-l1:55, gdzie to opis żetonu dealera). Poniżej jako ŚR.
- „3-bet” jako czasownik: bez problemu. pt „faz 3-bet” (32 razy w korpusie pt, np. lekcje M4), pt-BR „dá 3-bet” (41 razy). Nowe teksty są z tym zgodne.
- pt „Bubble” a „Bolha”: wszystkie nowe klucze mają „{{t:bubble|bolha}}”, zgodnie z glosariuszem (`bubble: "bolha"`) i lekcjami m11-l3 i egzaminem m11. „bubble factor” zostaje po angielsku, tak jak w m11-l3:62,153,164. Jedyny wyjątek leży poza tymi 37 kluczami: pt/rules.yaml:1150 (R-M11-010.if) „é a {{t:bubble|bubble}}”. W pt-BR ten sam klucz ma „bolha” (pt-BR/rules.yaml:1150). Opisane w sekcji „Poza zakresem”.

---

## pt (pt-PT): PRZYJĄĆ Z POPRAWKAMI

Forma zwracania się jest spójna z sc-01…sc-19: formalnie, bez „você” („Tem…”, „atrás de si”). Słownictwo jest europejskie („hipóteses”, „chega”, „de imediato”, „prémios”, „tem de”), bez brazylianizmów.

| plik:klucz | problem | propozycja poprawki (pełne brzmienie fragmentu) | waga | pewność | dowód |
|---|---|---|---|---|---|
| sc-06.yaml:decisions.0:range-spot.actions.raise 3.explanation | „do botão” to jedyne takie miejsce. Ten sam ekran i pozostałe scenariusze piszą „Button” (jedna nazwa na pojęcie). | „…por isso {{t:open\|abre}} mais ou menos tão largo como do Button, cerca de…” | ŚR | wysoka | pt/scenarios/sc-05.yaml:5 „Está no Button”, sc-11.yaml:4 i sc-12.yaml:4 „do Button”, sc-08 „do Button” |
| sc-32.yaml:decisions.0:range-spot.actions.all-in.explanation | „as blinds” w rodzaju żeńskim. W korpusie pt dominuje rodzaj męski („os blinds” 44×, „dos blinds” 9×, „aos blinds” 4×, „as blinds” 4×). Niespójne także w samej partii: sc-05 ma „só restam os blinds”. | „…arrisca menos em comparação com os blinds que ganha quando o adversário {{t:fold\|desiste}}…” | ŚR | wysoka | pt/scenarios/sc-05.yaml (raise 2.5 i fold: „os blinds”); pt/lessons: „os blinds” 44× |
| sc-32.yaml:decisions.0:range-spot.actions.fold.explanation | to samo („as blinds”) | „Com um stack mais curto arrisca menos em comparação com os blinds que ganha quando o adversário {{t:fold\|desiste}}.” | ŚR | wysoka | jw. |
| sc-33.yaml:decisions.0:range-spot.actions.call.explanation | „a sua blind” w rodzaju żeńskim, a w korpusie „seu blind” 6× i „o blind” 10× wobec „sua blind” tylko tu | „…de {{t:call}}: o seu blind já está no {{t:pot}}, por isso precisa de…” | ŚR | wysoka | grep pt: „seu blind” 6×; „sua blind” 2× (oba w sc-33) |
| sc-33.yaml:decisions.0:range-spot.actions.fold.explanation | to samo („A sua blind”) | „O seu blind já está no {{t:pot}}, por isso só precisa de cerca de {{n:m11.call.10.eq}} de equity.” | ŚR | wysoka | jw. |
| sc-32.yaml:decisions.0:range-spot.actions.all-in.explanation | „faz {{t:shove\|push}}”: forma spoza korpusu pt. Lekcje i egzamin M11 mają wyłącznie „shove” lub „faz shove”. | „…com {{n:m11.depth.10}} faz {{t:shove\|shove}} com cerca de {{n:m11.push.10}} das mãos…” | ŚR | wysoka | pt/lessons/m11-l1-push-fold.md:108 „faz {{t:shove\|shove}}”; pt/exams/m11.yaml:34,51,86; glosariusz `shove: "shove"` |
| sc-32.yaml:decisions.0:range-spot.actions.fold.explanation | to samo („faz {{t:shove\|push}}”) | „…com {{n:m11.depth.10}} faz {{t:shove\|shove}} com cerca de {{n:m11.push.10}} das mãos…” | ŚR | wysoka | jw. |
| sc-33.yaml:decisions.0:range-spot.actions.call.explanation | to samo („faria {{t:shove\|push}}”) | „Ainda assim, faz {{t:call}} mais apertado do que faria {{t:shove\|shove}}: cerca de…” | ŚR | wysoka | pt/exams/m11.yaml:48 „faria {{t:shove\|shove}}” |
| sc-34.yaml:situation | Formalna forma bez podmiotu „e está no {{t:big-blind}}” po zdaniu z podmiotem „o small blind” czyta się jako „i [small blind] jest na big blindzie”. Podmiot „ty” ginie. | „Está no {{t:big-blind}} e, na {{t:bubble\|bolha}}, o {{t:small-blind}} vai {{t:all-in}}.” | ŚR | wysoka | inne sytuacje (sc-32, sc-33) zaczynają od „está no …”, więc kolejność „Está no … e …” jest spójna |
| sc-06.yaml:decisions.1:size-spot.actions.raise.explanation | Trzecie „aumenta” stoi bez znacznika (pl i en mają tu {{t:raise}}), więc termin nie jest oznaczony jak w dwóch sąsiednich miejscach | „…joga {{t:out-of-position}}, por isso {{t:raise\|aumenta}} um pouco mais do que {{n:pf.open-size}}…” | NIS | wysoka | en/pl tego klucza: 3× {{t:raise}} |

---

## pt-BR: PRZYJĄĆ Z POPRAWKAMI

Forma zwracania się jest spójna z sc-01…sc-19 („Você tem…”, „atrás de você”). Słownictwo jest brazylijskie („chance”, „na hora”, „prêmios”, „tem que”, „basta”), bez europeizmów. „largue/largam” stoi też w pt-BR sc-11 (ten sam tekst), więc zostaje.

| plik:klucz | problem | propozycja poprawki (pełne brzmienie fragmentu) | waga | pewność | dowód |
|---|---|---|---|---|---|
| sc-06.yaml:decisions.0:range-spot.actions.raise 3.explanation | „do botão”: jedyne takie miejsce, gdzie indziej „Button” | „…então {{t:open\|abre}} mais ou menos tão largo quanto do Button, cerca de…” | ŚR | wysoka | pt-BR/scenarios/sc-05.yaml:5 „no Button”, sc-11/sc-12:4 „do Button”, sc-08 „do Button” |
| sc-33.yaml:decisions.0:range-spot.actions.call.explanation | „Você dá {{t:call}}” i „você dá {{t:call}} mais apertado”. Sąsiedni sc-34 (ta sama akcja na tym samym typie ekranu) ma „Você faz {{t:call}}”, a starsze scenariusze „Você {{t:call\|paga}}”. Dwa różne czasowniki dla tej samej akcji w kolejnych scenariuszach. | „Você {{t:call\|paga}}, porque esta mão está no seu {{t:range}} de {{t:call}}: … Mesmo assim, você {{t:call\|paga}} de forma mais seletiva do que faria {{t:shove\|push}}: cerca de…” (albo ujednolicić do „faz {{t:call}}” jak w sc-34) | ŚR | wysoka | pt-BR/scenarios/sc-34.yaml:23 „Você faz {{t:call}}”; sc-01.yaml:22, sc-19.yaml:21 „Você {{t:call\|paga}}” |
| sc-06.yaml:decisions.0:range-spot.actions.raise 3.explanation | „depois do flop você fala primeiro”, a w pt-BR dominuje „age primeiro” (19× wobec 3×). sc-08 w tej samej partii też ma „você age primeiro”. | „…depois do flop você age primeiro, então {{t:open\|abre}}…” | NIS | wysoka | pt-BR/scenarios/sc-08.yaml:31,33 „você age primeiro”; pt-BR/lessons/m3-l1-pozycja.md:55 „age por último” |
| sc-06.yaml:decisions.1:size-spot.actions.raise.explanation | Trzecie „aumenta” bez znacznika {{t:raise}} (jak w pt) | „…então {{t:raise\|aumenta}} um pouco mais do que {{n:pf.open-size}} das outras…” | NIS | wysoka | en/pl tego klucza: 3× {{t:raise}} |

---

## Do sprawdzenia przez człowieka

1. **pt-BR shove: „faz {{t:shove|push}}” (sc-32 ×2, sc-33).** Korpus pt-BR jest już mieszany. Lekcja m11-l1-push-fold.md:65,108 ma „faz {{t:shove|push}}” (tak jak nowe teksty), a m11-l2 i egzamin m11 mają „dá shove” (16×). W glosariuszu `shove: "shove"` jest oznaczone [WIELE FORM][DO USTALENIA]. Decyzja to jedna forma dla całego M11 pt-BR. Jeśli wygra „dá shove”, trzeba poprawić sc-32 ×2, sc-33 i m11-l1.
2. **pt, R-M11-009.because: „por isso {{t:call|pagar}} tem de ganhar mais vezes”.** Bezokolicznik jako podmiot brzmi nieco sztucznie. sc-34 mówi to samo słowami „o {{t:call}} tem de ganhar mais vezes”. Możliwe ujednolicenie do „por isso o {{t:call}} tem de ganhar mais vezes do que num jogo a {{t:chips|fichas}}”.
3. **pt-BR, sc-05 i sc-12 (stary tekst): „nem {{t:draw}}” wyświetla „draw”.** Korpus pt-BR częściej używa „projeto” (70×, w tym sc-01, sc-19 „projeto de flush”). Nowy tekst jest zgodny z sc-12, więc problem dotyczy całego pojęcia, nie tej partii.
4. **pt, sc-04.situation: „Está em {{t:utg|UTG}}”.** Wyjaśnienia tego samego scenariusza mają „do UTG” i „no {{w:pozycja}}”, a inne sytuacje „Está no …”. Korpus pt ma też „de UTG”. To drobna niespójność przyimka. Ewentualnie: „Está no {{t:utg|UTG}}…”.

## Poza zakresem 37 kluczy (do backlogu)

- pt/rules.yaml:1150, R-M11-010.if: „é a {{t:bubble|bubble}} ou a …”. To jedyne „bubble” jako nazwa etapu w pt; glosariusz i wszystkie inne teksty mają „bolha”. Propozycja: „é a {{t:bubble|bolha}} ou a {{t:final-table|mesa final}}, e tem um stack médio” (tak jak pt-BR/rules.yaml:1150). Waga ŚR.
