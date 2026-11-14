# Kontrola zastępcza przekładów (sesja HI, 2026-11-13)

Kontekst: właściciel 2026-11-13 ok. 16:40 UTC wybrał kontrolę zastępczą zamiast recenzenta człowieka dla pozycji z `docs/lokalizacja/lista-recenzji-hf.md`. Rola 09-lokalizacja, polecenie `origin/koordynacja:docs/koordynacja/polecenia/HI.md` @ 6ccb1f90. Decyzje: `docs/decyzje/HI.md` (D-1640…D-1647).

Metoda dla każdej pozycji (D-1640):
- **(a) przekład zwrotny:** wykonał osobny agent w świeżym kontekście, bez zamierzonego sensu i bez źródeł (zasada roli 2, D-015). Wynik streszczony w kolumnie (a), a ocena naturalności agenta to opinia modelu, nie źródło.
- **(b) spójność:** `grep -rF` po `content/<język>/` (liczba wystąpień formy i form konkurencyjnych).
- **(c) źródło w języku docelowym:** serwis pokerowy (glosariusz pokoju, szkoły albo aplikacji), czytany przez `curl` z cytatem dosłownym i datą odczytu 2026-11-13. Cytaty i strony 404 są w `docs/lokalizacja/dowody/hi-2026-11-13/zrodla.md`. Szczebel 4 (serwisy szkoleniowe i pokoje), jedno źródło na język.

Werdykt „zmiana” zapada tylko wtedy, gdy (c) ma źródło albo (a) i (b) wskazują błąd. Bez źródła i bez błędu werdykt brzmi „zostaje (a+b)”.

## Tabela pozycji

| Język | Pozycja | Wartość | (a) przekład zwrotny | (b) spójność w `content/<j>/` | (c) źródło | Werdykt |
|---|---|---|---|---|---|---|
| ja | second-pair | セカンドペア | „second pair”, sens zgodny | セカンドペア×9 (nazwa), spójne z トップペア (top-pair) | POKER Q'z ja nazywa to pojęcie „セカンドヒット” („ボードに対して2番目に強いペアを持っている状態”) albo „ミドルペア”, a top pair „トップヒット”. セカンドペア nie występuje w przeczytanych źródłach. RangeCraft ja zostawia hasło angielskie „Second Pair” | **[DO USTALENIA] — przegląd eksperta przy użytkownikach** (D-1642): źródło wskazuje inną nazwę, której nie da się wprowadzić bez zmiany top-pair (poza listą), a ミドルペア jest już w treści w innym sensie (m6-l2) |
| ko | second-pair | 세컨드 페어 | „second pair”, sens zgodny | 세컨드 페어×8 (+1 z partykułą), spójne z 탑 페어 | częściowe: RangeCraft ko ma hasło „Second Pair” z definicją „두 번째” i bez nazwy koreańskiej. POKER Q'z ko nie ma hasła (404) | **zostaje** (D-1642) |
| vi | second-pair | đôi thứ hai | „the second pair”; poza kontekstem może znaczyć „druga z dwóch par” | đôi thứ hai×9; pair = „đôi” (×281) | GGPoker vi: „Cặp thứ hai là cặp trung bình…”. „cặp” i „đôi” to synonimy „pary”, a aplikacja konsekwentnie używa „đôi” | **zostaje** (D-1642) |
| zh-Hant | second-pair | 第二對 | „second pair”, sens zgodny | 第二對×12 | **potwierdzone:** GGPoker zh-tw „第二高牌組成的一對稱為第二對” | **zostaje** (D-1642) |
| fr | second-pair (spoza tej sesji; źródło znalezione przy okazji) | deuxième paire | „second pair”, sens zgodny | deuxième paire×9 | **potwierdzone:** GGPoker fr „La deuxième paire est une paire intermédiaire” | **zostaje**, `[DO USTALENIA]` zdjęte (D-1642) |
| ja | recreational | レクリエーショナルプレイヤー | „recreational player”, długie, ale używane | ×21, jedna forma | częściowe: RangeCraft ja „Reg / Rec: レギュラー / レクリエーション”, „ルースなレクリエーション” (ten sam rdzeń, bez „-ナル”) | **zostaje** (D-1643) |
| ko | recreational | 레크리에이션 플레이어 | „recreation player”; agent uznał 레크리에이셔널 za częstsze (opinia, bez źródła) | ×11 w treści; 레크리에이셔널 0× (tylko w komentarzu) | **potwierdzone:** RangeCraft ko „매우 루스한 레크리에이션 플레이어로 자금력이 크고” | **zostaje** (D-1643) |
| vi | recreational | người chơi giải trí | „leisure player”, naturalne | ×21, jedna forma | brak źródła: GGPoker vi ma tylko „Fish”, wyszukiwania 2026-11-13 dały wyłącznie strony niepokerowe | **zostaje (a+b)** (D-1643) |
| zh-Hant | recreational | 娛樂玩家 | „entertainment player”, naturalne | 娛樂玩家×19; 休閒玩家 0× w treści | brak źródła: GGPoker zh-tw ma tylko „魚”, wyszukiwanie bez glosariusza | **zostaje (a+b)** (D-1643) |
| fr | recreational | joueur récréatif | „recreational player” | ×21, jedna forma | **potwierdzone:** fr.pokernews.com „ne jamais bluffer les fishs (ou joueurs récréatifs…)”; poker-academie.com „les joueurs récréatifs qui ne travaillent pas…” | **zostaje** (D-1643) |
| it | recreational | giocatore ricreativo | „recreational player” | ×21, jedna forma | **potwierdzone:** assopoker.com „I giocatori ricreativi, d'altra parte…”; italiapokerclub.com „Tanti giocatori ricreativi non sanno…” | **zostaje** (D-1643) |
| es | recreational | jugador recreativo | „recreational player”; agent: „recreacional” też w użyciu | recreativo×33; recreacional 0× w treści (tylko komentarz) | **potwierdzone:** deucescracked.com/co „buscan mesas con jugadores recreativos” | **zostaje „recreativo”** (D-1643) |
| pt | recreational | jogador recreativo | „recreational player” | ×20 | **potwierdzone:** pt.pokernews.com „pensada tanto para jogadores recreativos como regulares” | **zostaje** (D-1643) |
| pt-BR | recreational | jogador recreativo | „recreational player”; agent: „recreacional” też w użyciu (opinia) | ×21, jedna forma | **potwierdzone:** deucescracked.com/br „Pool de jogadores recreativos — campo mais suave do mercado” | **zostaje** (D-1643) |
| ja | 4-bet | 4ベット | „4-bet”, standard | 4ベット×57; 3-bet = 3ベット | **potwierdzone:** POKER Q'z ja „4bet,リリレイズ,4ベット,４ベット,フォーベット” | **zostaje** (D-1644) |
| vi | 4-bet | 4-bet | „4-bet” (angielski), standard | „4-bet” w treści; 3-bet = „3-bet” | brak źródła vi (GGPoker vi: tylko „Reraise — Tố thêm…”) | **zostaje (a+b)** (D-1644) |
| zh-Hant | 4-bet | null (wyświetla „4-bet”) | — | „4-bet” w treści; 3-bet też null | brak hasła 4-bet; GGPoker zh-tw tłumaczy light 3-bet jako „輕鬆三次加注”, czyli zna formę „三次加注” | **zostaje (a+b)**; ewentualne „三次/四次加注” dla 3-bet i 4-bet razem: przegląd eksperta (D-1644) |
| pt-BR | 4-bet | 4-bet | — | „4-bet” w treści | **potwierdzone:** POKER Q'z pt „4bet, re-re-raise, re-reraise, 4-bet” | **zostaje** (D-1644) |
| fr | mdf | brak klucza (wyświetla „MDF”) | skrót | `{{t:mdf}}` renderuje „MDF” (`packages/content-schema/src/terms.ts:124`: polska nazwa „MDF” to skrót) | **potwierdzone:** POKER Q'z fr „Le MDF (Minimum Defense Frequency) fait référence…” | **zostaje „MDF”**; dodany jawny `mdf: null` z komentarzem, bez zmiany wyświetlania (D-1645) |
| pt | mdf | brak klucza (wyświetla „MDF”) | skrót | jw. | **potwierdzone:** POKER Q'z pt „MDF (Minimum Defense Frequency) refere-se à porcentagem mínima…” | **zostaje „MDF”**, `mdf: null` (D-1645) |
| pt-BR | mdf | brak klucza (wyświetla „MDF”) | skrót | jw. | jw. (POKER Q'z pt, forma wspólna pt/pt-BR) | **zostaje „MDF”**, `mdf: null` (D-1645) |
| it, es | mdf | „MDF” | skrót | jw. | **potwierdzone:** POKER Q'z it/es (es: „MDF (Minimum Defense Frequency, o Frecuencia Mínima de Defensa)”) | **zostaje**, `[DO USTALENIA]` zdjęte (D-1645) |
| ja | SC-13 ułamki | 三分の二, 四分の一 | „two-thirds / one-quarter of the pot”; agent: kanji sztywne, „4分の1” bardziej zwykłe | to samo wyrażenie w m2-l2 („ポットの4分の1”), m8-l3 i egzaminie m4: 4分の1×3; formy kanji tylko w SC-13 | brak źródła (styl) | **zmiana na 3分の2, 4分の1** (D-1641; b: niespójność z identyczną frazą w m2-l2) |
| ko | SC-13 ułamki | 삼분의 이, 사분의 일 | jw.; agent: zapis hangul sztywny | „팟의 4분의 1” w m2-l2, 4분의 1×3; forma hangul tylko w SC-13 | brak źródła (styl) | **zmiana na 3분의 2, 4분의 1** (D-1641) |
| ja | SC-13 szyk „（エクイティ{{n:…}}）” | — | „(equity {{n}})”, zrozumiałe, jako etykieta w nawiasie | 1× wobec 13× „{{n}}のエクイティ”; ale to etykieta w nawiasie, nie zdanie | brak źródła | **zostaje** (D-1646): nie jest błędem |
| ko | SC-13 szyk „에퀴티 {{n:…}}” | — | „(equity {{n}})”, zrozumiałe | „에퀴티 {{n” 6×, „}}의 에퀴티” 25×: obie formy w użyciu | brak źródła | **zostaje** (D-1646) |
| vi | SC-13 zaimek „nó cần” | — | „it needs {{n}} equity”; nó = bài chờ (draw), rozpoznane bez kontekstu | w bet-big ta sama treść używa „chúng” dla draws (liczba mnoga), więc odniesienie spójne | brak źródła | **zostaje** (D-1646) |
| zh-Hant | SC-13 zaimek „它只要有” | — | „it only needs”; 它 = 聽牌, rozpoznane; agent: lekko kalkowe | bet-big: „它們”/„它” dla 聽牌, spójne | brak źródła | **zostaje** (D-1646) |

Poza zakresem tej sesji i bez zmian: `second-pair` it (GGPoker it 404, brak źródła), `recreational` de.

## Dowody
- Źródła i cytaty: `docs/lokalizacja/dowody/hi-2026-11-13/zrodla.md`.
- D-043 (35 baz, ID przed i po): `docs/lokalizacja/dowody/hi-2026-11-13/d043.md`: 62300 = 62300 wierszy, diff pusty.
- `pnpm content:build` exit 0, `pnpm run ci` exit 0: `docs/lokalizacja/dowody/hi-2026-11-13/ci.md`.
