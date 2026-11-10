# ja · E2 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/exams/m7.yaml | tak (95/95 linii, pl i ja linia po linii) | 2 poprawki |
| content/ja/exams/m8.yaml | tak (93/93) | bez poprawek |
| content/ja/exams/m9.yaml | tak (86/86) | bez poprawek |
| content/ja/exams/m10.yaml | tak (82/82) | 3 poprawki |
| content/ja/exams/m11.yaml | tak (86/86) | bez poprawek mechanicznych; patrz „Do ujednolicenia” (手/ハンド) |
| content/ja/exams/m12.yaml | tak (93/93), TREŚĆ KRYTYCZNA, zdanie po zdaniu | 1 poprawka |
| content/ja/exams/m13.yaml | tak (91/91) | bez poprawek |

Dodatkowo sprawdzone skryptem dla wszystkich 7 plików: liczba linii, szkielet YAML poza tekstami w cudzysłowach (kind, id, family, rules, table, answer, correct, sizeError), zbiór znaczników `{{t:…}}` i `{{n:…}}` w każdej linii, notacja kart `[[…]]`. Jedyne różnice: m7:44 (zgubiony `{{t:pot|…}}`, poprawka w JSON) i m11:75 (w ja o jeden `{{t:chips|チップ}}` więcej niż w pl, bo zdanie „{{t:chips}} wygrane są warte mniej niż przegrane” rozbito na „勝ち取るチップ / 失うチップ”; nieszkodliwe, bez poprawki). Znaczniki `{{n:…}}` identyczne z pl w każdej linii.

Pomocniczo otwarte: `content/ja/terms-nazwy.yaml` (cały), `content/en/exams/m10.yaml` (jedna linia), `apps/mobile/src/i18n/locales/ja.json` (nazwy werdyktów raportu i ekranu „Pomoc”), wyszukiwania w `content/ja/lessons` pod kątem spójności terminów. Glosariusza `docs/lokalizacja/glosariusz.md` nie czytałem w całości (terminy sprawdzałem przez terms-nazwy i klucze znaczników pl).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | content/ja/exams/m11.yaml (14 miejsc, m.in. 7, 9, 23, 27, 32, 34, 48, 50, 51, 52, 76, 84, 86) | pl „ręka” → w m11 konsekwentnie „手”, a w m7–m10, m12, m13 (i w większości lekcji m11) „ハンド”. Sens poprawny, ale dwie nazwy na jedno pojęcie między egzaminami. | Ujednolicić do „ハンド” (patrz niżej). |
| NISKIE | content/ja/exams/m10.yaml:17, 19, 24, 26, 27, 29, 61, 63, 65, 71, 75 | Nazwy statystyk „Fold to Cベット” / „Fold to 3ベット” (mieszany zapis łaciński + katakana); w lekcjach i regułach występują też „Fold to c-bet”, „Fold to 3-bet”, „フォールド・トゥ・Cベット”. | Jedna postać w całej treści; decyzja poza tą częścią. |
| NISKIE | content/ja/exams/m10.yaml:19 vs m12.yaml:7, 18, 25 | pl „z ok. … pewnością” → m10 „信頼度”, m12 „確信度” (w całej treści ja: 信頼度×5, 確信度×3). | Jedna postać, np. „信頼度”. |
| NISKIE | content/ja/exams/m12.yaml (11 miejsc) | pl „{{n:…k}} tys. rąk” → „{{n:…}}千ハンド” (wyświetli się np. „50千ハンド”). Zrozumiałe, ale po japońsku nienaturalne (naturalnie „5万ハンド”); liczba pochodzi ze znacznika, więc nie da się jej przeliczyć w przekładzie. W lekcjach ja częściej „{{n:…}}k” (ok. 35×) niż „千” (16×). | Decyzja globalna: „k” albo „千” w całej treści. |

## Do ujednolicenia skryptem
- `content/ja/exams/m11.yaml`: „手” w znaczeniu ręki pokerowej → „ハンド” (14 trafień wzorca `手[はでがをのな、にと（もより]` po odfiltrowaniu „相手”; np. „あなたの手は” → „あなたのハンドは”, „弱めの手と中程度の手” → „弱めのハンドと中程度のハンド”, „見込みのない手で” → „見込みのないハンドで”, „約{{n:m11.call.5}}の手” → „…のハンド”). Zamiana wymaga wykluczenia „相手” i przejrzenia wyniku; ten sam wzorzec dotyczy `content/ja/exams/m5.yaml` (33 trafienia, poza tą częścią).
- `{{t:rake-cap|レーキキャップ}}` → `{{t:rake-cap|レーキ上限}}`: 2 trafienia w `content/ja` (jedno w m10:80, poprawka w JSON; drugie poza tą częścią), plus 1× `{{t:rake-cap|上限}}`.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m8:56 „フォールドすべきハンドを持っていることが多くなります” (pl „częściej zostaje mu ręka do spasowania”): „すべき” = „którą powinien spasować”; być może neutralniejsze „フォールドするハンド”.
- m12:29 „誤差はハンド数の平方根に比例してしか小さくなりません” (pl „Błąd maleje dopiero z pierwiastkiem z liczby rąk”): ściśle to odwrotna proporcjonalność („平方根に反比例”); czy obecne sformułowanie jest dla czytelnika jednoznaczne?
- m11:64, 73, 75 „{{t:chips|チップ}}を賭けたゲーム” (pl „gra o {{t:chips}}”, czyli gra, w której liczą się same żetony, bez ICM): czy czytelnik nie odczyta tego jako „gra na pieniądze”? Ewentualnie „チップだけを考えるゲーム” / „チップEVの場面”.
- m13:18 „相手があなたのプレイをよく読んでいる” (pl „rywale lepiej czytają twoją grę”): „lepiej” oddane jako „dobrze”; ewentualnie „より正確に読んでいる”.
- m13:42 „ゲームであなたは…” (pl „W grze miałeś…”, tryb gry w aplikacji): czy naturalniejsze „プレイ中に”? (w ja.json tryb nazywa się „プレイ”).
- m7:83, 85 „プローブベット”, m7 „ガットショット”, m8 „ブラフキャッチャー”, „シンバリュー”: w terms-nazwy klucze probe-bet, gutshot, bluff-catcher mają `null` (nazwa angielska), ale w pl te słowa stoją bez znacznika, a lekcje ja używają tych samych katakan (プローブベット×17, ガットショット×20, ブラフキャッチャー×28, シンバリュー×9) — uznałem za spójne, bez poprawki.

## Pytania do źródła pl
- m10:63 (i `content/pl/rules.yaml:906`): „fold to c-bet łączy wszystkie rozmiary i stoły” — „stoły” jest dwuznaczne (board czy stół do gry); lekcja m10-l3:109 mówi „rozmiary i flopy”. Wersja en egzaminu ma „all sizes and tables”, czyli ten sam prawdopodobny błąd co ja; warto ujednoznacznić pl („flopy”/„boardy”) i poprawić en.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Egzamin `m12` (10 pytań, linie 7–93) porównany zdanie po zdaniu z pl.
- Liczby: wszystkie przez `{{n:…}}`, zestaw i liczba wystąpień w każdej linii identyczne z pl; liczby wpisane wprost („100” w „bloków po 100”, „2 ×” i „SD²” we wzorze RoR, „trzech pul”, „dwa razy/cztery razy/połowa”) zgodne.
- Poprawne odpowiedzi (`correct: true`) na tych samych opcjach co w pl; uzasadnienia zgodne z odpowiedziami.
- Warunki i granice zachowane: „mimo wygranej”, „nigdy nie zejdziesz stawkę” (一度も下げない), „najpóźniej przy …” (遅くとも), „połowa założonej liczby wpisowych”, „o jedną stawkę niżej”, „na stawce dwa razy niższej”, „dopiero dwa razy większy bankroll”, „wyraźnie większe od zera”.
- Zdanie ochronne w q9 (linia 82): „To ogólna wskazówka; jeśli granie przestaje być pod kontrolą, zajrzyj do ekranu „Pomoc”.” → „これは一般的な目安です。プレイをコントロールできなくなってきたら、「ヘルプ」画面を確認してください。” — pełne, niezłagodzone; nazwa ekranu zgodna z ja.json („ヘルプ”).
- Typy tiltu (z nienawiści do przegrywania / z niesprawiedliwości / z błędu / z zemsty), C-game (Cゲーム), sygnały ostrzegawcze (odgrywanie strat, przejście na wyższą stawkę) — zgodne z pl i z lekcjami ja.
- Jedyne odstępstwo: linia 62, dodane „続けて” („trzy pule z rzędu”, w pl bez „z rzędu”) — poprawka ŚR w JSON. Brak pominięć, numerów telefonów, adresów ani nazw organizacji w tym pliku.
- Uwaga stylistyczna (bez wpływu na sens): „{{n}}千ハンド” i „確信度” — patrz znaleziska wyżej.
