// Dane poprawek EN (patrz en-poprawki.mjs). Jeden blok na znalezisko EM; `zamiany` = stary → nowy z liczbą wystąpień.
export const DEFINICJE = (z, k) => ({
  '001': {
    zamiany: [
      z('es', 'scenarios/sc-06.yaml', 'desde el botón', 'desde el Button'),
      z('it', 'scenarios/sc-06.yaml', 'dal bottone', 'dal Button'),
      z('pt', 'scenarios/sc-06.yaml', 'do botão', 'do Button'),
      z('pt-BR', 'scenarios/sc-06.yaml', 'do botão', 'do Button'),
      z('vi', 'scenarios/sc-06.yaml', 'từ button', 'từ Button'),
      z('zh-Hant', 'scenarios/sc-06.yaml', '按鈕一樣寬', '按鈕位一樣寬'),
      z('fr', 'scenarios/sc-06.yaml', 'depuis le bouton', 'depuis le Bouton'),
      z('fr', 'scenarios/sc-05.yaml', 'Button', 'Bouton', 3),
      z('fr', 'scenarios/sc-08.yaml', 'Button', 'Bouton', 8),
      z('fr', 'scenarios/sc-11.yaml', 'Button', 'Bouton', 1),
      z('fr', 'scenarios/sc-12.yaml', 'Button', 'Bouton', 1),
    ],
    kontrole: [
      ...['es', 'it', 'pt', 'pt-BR', 'vi'].map((j) => k(j, 'scenarios', 'botón|bottone|botão|\\bbutton\\b', 'Button małą literą/przetłumaczony w scenariuszach')),
      k('fr', 'scenarios', 'Button|\\bbouton\\b', 'Button albo „bouton” małą literą w scenariuszach'),
      k('zh-Hant', 'scenarios', '按鈕(?!位)', '„按鈕” bez „位” w scenariuszach'),
    ],
  },
  '002': {
    zamiany: [
      z('fr', 'scenarios/sc-34.yaml', '{{t:call|payez}}', '{{t:call|suivez}}'),
      z('it', 'scenarios/sc-34.yaml', 'Fai {{t:call}}', '{{t:call|Chiami}}'),
      z('pt-BR', 'scenarios/sc-33.yaml', 'dá {{t:call}}', '{{t:call|paga}}', 2),
      z('pt-BR', 'scenarios/sc-34.yaml', 'faz {{t:call}}', '{{t:call|paga}}'),
    ],
    kontrole: [
      k('fr', 'scenarios/sc-34.yaml', 'payez', 'sc-34: „payez” zamiast „suivez”'),
      k('it', 'scenarios/sc-34.yaml', 'Fai \\{\\{t:call', 'sc-34: „Fai call” zamiast „Chiami”'),
      k('pt-BR', 'scenarios', '(dá|faz) \\{\\{t:call', 'sc-33/34: „dá/faz call” zamiast „paga”'),
    ],
  },
  '003': {
    zamiany: [
      ...['sc-04', 'sc-05', 'sc-11', 'sc-12'].flatMap((f) => [
        z('de', `scenarios/${f}.yaml`, 'Ein kleiner {{t:bet}}', 'Eine kleine {{t:bet}}'),
        z('de', `scenarios/${f}.yaml`, 'Ein großer {{t:bet}}', 'Eine große {{t:bet}}'),
      ]),
      ...['sc-04', 'sc-11'].flatMap((f) => [
        z('de', `scenarios/${f}.yaml`, 'einen kleinen {{t:bet}}', 'eine kleine {{t:bet}}'),
        z('de', `scenarios/${f}.yaml`, 'einen solchen {{t:bet}}', 'eine solche {{t:bet}}'),
      ]),
      z('de', 'lessons/m7-l4-probe-obrona.md', 'gegen den {{t:bet|Bet}}', 'gegen die {{t:bet|Bet}}'),
    ],
    kontrole: [
      // Dotyczy wyświetlanej formy „Bet” (r. f): `{{t:bet}}` bez formy i `{{t:bet|Bet}}`. Forma „Einsatz” (r. m) przy rodzaju męskim jest poprawna.
      k('de', '.', '\\b[Ee]in(en)? (kleine[rn]|große[rn]|solche[rn]) \\{\\{t:bet(\\|Bet)?\\}\\}', 'męski rodzajnik przed „Bet” (r. f)'),
      k('de', '.', '\\bden \\{\\{t:bet\\|Bet\\}\\}', '„den Bet” (r. f)'),
    ],
  },
  '004': {
    zamiany: [
      z('pt', 'scenarios/sc-32.yaml', 'as blinds', 'os blinds', 2),
      z('pt', 'scenarios/sc-32.yaml', 'faz {{t:shove|push}}', 'faz {{t:shove|shove}}', 2),
      z('pt', 'scenarios/sc-33.yaml', 'faria {{t:shove|push}}', 'faria {{t:shove|shove}}'),
      z('pt', 'scenarios/sc-33.yaml', 'a sua blind', 'o seu blind'),
      z('pt', 'scenarios/sc-33.yaml', 'A sua blind', 'O seu blind'),
      z('pt', 'scenarios/sc-34.yaml', 'Na {{t:bubble|bolha}} o {{t:small-blind}} vai {{t:all-in}}, e está no {{t:big-blind}}.', 'Está no {{t:big-blind}} e, na {{t:bubble|bolha}}, o {{t:small-blind}} vai {{t:all-in}}.'),
    ],
    kontrole: [
      k('pt', 'scenarios', '[Aa]s blinds|[Aa] sua blind|\\{\\{t:shove\\|push', 'pt scenariusze: „as blinds”, „a sua blind”, „shove|push” (push/fold jako nazwa strategii zostaje)'),
      k('pt', 'scenarios/sc-34.yaml', '^situation: "Na ', 'sc-34 situation: „Na bolha o small blind vai all-in, e está…”'),
    ],
  },
  '005': {
    zamiany: [
      z('ko', 'scenarios/sc-06.yaml', '모두 당신까지 {{t:fold|폴드}}', '당신 차례까지 모두 {{t:fold|폴드}}', 3),
      z('ko', 'scenarios/sc-32.yaml', '모두 당신까지 {{t:fold|폴드}}', '당신 차례까지 모두 {{t:fold|폴드}}'),
    ],
    kontrole: [k('ko', '.', '당신까지', 'ko: „당신까지” (dwuznaczne: „łącznie z tobą”)')],
  },
  '006': {
    zamiany: [
      z('vi', 'scenarios/sc-06.yaml', '{{t:open|mở}} rộng', '{{t:open|mở cược}} rộng', 2),
      z('vi', 'rules.yaml', '{{t:open|mở}} rộng', '{{t:open|mở cược}} rộng', 5),
    ],
    kontrole: [k('vi', '.', 'mở\\}\\} rộng', 'vi: „{{t:open|mở}} rộng” (czyta się „rozszerzać”)')],
  },
  '007': {
    zamiany: [
      // it: „sei in” jak w sc-34 i korpusie; „blind” zamiast „bui/buio”
      z('it', 'scenarios/sc-06.yaml', 'Sei sullo {{t:small-blind}}', 'Sei in {{t:small-blind}}'),
      z('it', 'scenarios/sc-08.yaml', 'Sei sullo {{t:small-blind}}', 'Sei in {{t:small-blind}}'),
      z('it', 'scenarios/sc-32.yaml', 'sei sullo {{t:small-blind}}', 'sei in {{t:small-blind}}'),
      z('it', 'scenarios/sc-33.yaml', 'sei sul {{t:big-blind}}', 'sei in {{t:big-blind}}'),
      z('it', 'scenarios/sc-32.yaml', 'ai bui che vinci', 'ai blind che vinci', 2),
      z('it', 'scenarios/sc-33.yaml', 'il tuo buio', 'il tuo blind'),
      z('it', 'scenarios/sc-33.yaml', 'Il tuo buio', 'Il tuo blind'),
      // fr: stack zamiast „tapis” (= shove), „range de call”, „équité”
      z('fr', 'scenarios/sc-32.yaml', 'un tapis plus court', 'un stack plus court', 2),
      z('fr', 'scenarios/sc-33.yaml', 'range}} de {{t:call|suivi}}', 'range}} de {{t:call|call}}', 2),
      z('fr', 'scenarios/sc-33.yaml', "d'equity", "d'équité", 2),
      // zh-Hant: 權益 (nie 勝率), 泡沫係數 (nie 泡沫因子), 入池 (nie 入局), BF ÷ (BF + 1)
      z('zh-Hant', 'scenarios/sc-33.yaml', '的勝率', '的權益', 2),
      z('zh-Hant', 'scenarios/sc-04.yaml', '還沒有人入局', '還沒有人入池', 3),
      z('zh-Hant', 'rules.yaml', 'BF ÷ （BF + 1），其中泡沫因子 BF', 'BF ÷ (BF + 1)，其中泡沫係數 BF'),
      z('zh-Hant', 'exams/m11.yaml', '泡沫因子', '泡沫係數', 4),
      // de: zdanie sc-06 raise z czasownikiem po „also”
      z('de', 'scenarios/sc-06.yaml', '{{t:out-of-position|ohne Position}} spielst, also etwas mehr als {{n:pf.open-size}}', '{{t:out-of-position|ohne Position}} spielst; deshalb {{t:raise|raist}} du etwas mehr als {{n:pf.open-size}}'),
    ],
    kontrole: [
      k('it', 'scenarios', '[Ss]ei (sul|sullo) \\{\\{t:(small|big)-blind|\\bbui\\b|\\bbuio\\b', 'it scenariusze: „sei sul(lo)”, „bui/buio”'),
      k('fr', 'scenarios', 'tapis plus court|\\|suivi\\}\\}|d.equity', 'fr scenariusze: „tapis plus court”, „range de suivi”, „d equity”'),
      k('zh-Hant', 'scenarios', '勝率|入局', 'zh-Hant scenariusze: „勝率”, „入局”'),
      k('zh-Hant', 'rules.yaml', '泡沫因子|（BF', 'zh-Hant rules: „泡沫因子”, „（BF”'),
      k('zh-Hant', 'exams/m11.yaml', '泡沫因子', 'zh-Hant exam m11: „泡沫因子”'),
      k('de', 'scenarios/sc-06.yaml', 'spielst, also etwas mehr', 'de sc-06 raise: zdanie bez czasownika po „also”'),
    ],
  },
  '008': {
    // Trzeci czasownik „przebijasz” w sc-06 raise (pl ma 3 × {{t:raise}}). de zrobione w 007. ja, ko, zh-Hant: zdanie nie ma trzeciego czasownika
    // (przyczyna i skutek wyrażone przymiotnikiem „większy”); bez przebudowy zdania nie ma czego oznaczyć (D-1236).
    zamiany: [
      z('es', 'scenarios/sc-06.yaml', 'así que subes un poco más', 'así que {{t:raise|subes}} un poco más'),
      z('fr', 'scenarios/sc-06.yaml', 'donc vous relancez un peu plus', 'donc vous {{t:raise|relancez}} un peu plus'),
      z('it', 'scenarios/sc-06.yaml', "quindi rilanci un po' di più", "quindi {{t:raise|rilanci}} un po' di più"),
      z('pt', 'scenarios/sc-06.yaml', 'por isso aumenta um pouco mais', 'por isso {{t:raise|aumenta}} um pouco mais'),
      z('pt-BR', 'scenarios/sc-06.yaml', 'então aumenta um pouco mais', 'então {{t:raise|aumenta}} um pouco mais'),
      z('vi', 'scenarios/sc-06.yaml', 'nên bạn tố nhiều hơn một chút so với', 'nên bạn {{t:raise|tố}} nhiều hơn một chút so với'),
    ],
    kontrole: [
      k('es', 'scenarios/sc-06.yaml', 'así que subes un poco', 'es sc-06: „subes” bez znacznika'),
      k('fr', 'scenarios/sc-06.yaml', 'donc vous relancez un peu', 'fr sc-06: „relancez” bez znacznika'),
      k('it', 'scenarios/sc-06.yaml', 'quindi rilanci un po', 'it sc-06: „rilanci” bez znacznika'),
      k('pt', 'scenarios/sc-06.yaml', 'por isso aumenta um pouco', 'pt sc-06: „aumenta” bez znacznika'),
      k('pt-BR', 'scenarios/sc-06.yaml', 'então aumenta um pouco', 'pt-BR sc-06: „aumenta” bez znacznika'),
      k('vi', 'scenarios/sc-06.yaml', 'nên bạn tố nhiều hơn', 'vi sc-06: „tố” bez znacznika'),
    ],
  },
  '009': {
    // Spacja nierozdzielająca U+00A0 (jak w korpusie fr: 2789 × U+00A0, 0 × U+202F; REJESTR fr, scripts/i18n/wspolne.mjs) przed : ; ! ? » i po «.
    zamiany: [
      z('fr', 'scenarios/sc-01.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 8, true),
      z('fr', 'scenarios/sc-02.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 10, true),
      z('fr', 'scenarios/sc-03.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 6, true),
      z('fr', 'scenarios/sc-04.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 7, true),
      z('fr', 'scenarios/sc-05.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 4, true),
      z('fr', 'scenarios/sc-06.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 6, true),
      z('fr', 'scenarios/sc-08.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 9, true),
      z('fr', 'scenarios/sc-11.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 3, true),
      z('fr', 'scenarios/sc-12.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 2, true),
      z('fr', 'scenarios/sc-19.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 10, true),
      z('fr', 'scenarios/sc-32.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 3, true),
      z('fr', 'scenarios/sc-33.yaml', ' (?=[:;!?»])|(?<=«) ', '\u00a0', 4, true),
    ],
    kontrole: [k('fr', 'scenarios', ' [:;!?»]|« ', 'fr scenariusze: zwykła spacja przed : ; ! ? » i po «')],
  },
  '010': {
    // Styl i szyk (propozycje z docs/lokalizacja/recenzje/dowody/em-przeglad-*.md). Pominięte (pewność niska lub decyzja wzorca, nie przekładu): vi sc-08 „trước Button”, ja sc-34 „バブルの{{w:pozycja}}で”, ko sc-33 „핸드의”.
    zamiany: [
      z('de', 'scenarios/sc-32.yaml', 'weil du mit kürzerem Stack weniger riskierst im Vergleich zu den Blinds, die du gewinnst, wenn dein Gegner {{t:fold|foldet}};', 'weil du mit kürzerem Stack im Vergleich zu den Blinds, die du gewinnst, wenn dein Gegner {{t:fold|foldet}}, weniger riskierst;'),
      z('es', 'scenarios/sc-34.yaml', 'del que ganar suma, así que {{t:call|pagar}} debe ganar más a menudo', 'de lo que suma ganar, así que el {{t:call|pago}} tiene que ganar más a menudo'),
      z('es', 'scenarios/sc-34.yaml', 'del que ganar suma.', 'de lo que suma ganar.'),
      z('fr', 'scenarios/sc-04.yaml', '{{t:call|paiera}}', '{{t:call|suivra}}'),
      z('fr', 'scenarios/sc-32.yaml', 'vous faites {{t:shove|tapis}}', 'vous {{t:shove|faites tapis}}', 2),
      z('fr', 'scenarios/sc-33.yaml', 'ne feriez {{t:shove|tapis}}', 'ne {{t:shove|feriez tapis}}'),
      z('it', 'scenarios/sc-04.yaml', 'il {{t:big-blind}} farà {{t:call}}', 'il {{t:big-blind}} {{t:call|chiamerà}}'),
      z('it', 'scenarios/sc-08.yaml', 'non fai quasi mai {{t:call}}', 'non {{t:call|chiami}} quasi mai'),
      z('ja', 'scenarios/sc-06.yaml', 'でプレイするので、他の{{t:position|ポジション}}の{{n:pf.open-size}}より少し大きくするためです。', 'でプレイするからです。そのため、他の{{t:position|ポジション}}の{{n:pf.open-size}}より少し大きくします。'),
      z('ja', 'scenarios/sc-34.yaml', '{{t:chips|チップ}}だけのゲーム', '{{t:chips|チップ}}を賭けたゲーム', 2),
      z('ko', 'scenarios/sc-06.yaml', '{{t:big-blind|빅 블라인드}}하고만', '{{t:big-blind|빅 블라인드}}와만', 2),
      z('pt-BR', 'scenarios/sc-06.yaml', 'você fala primeiro', 'você age primeiro'),
      z('vi', 'scenarios/sc-34.yaml', 'so với chơi bằng {{t:chips|chip}}', 'so với khi chơi vì {{t:chips|chip}}', 2),
      z('vi', 'rules.yaml', 'phải thắng thường hơn so với khi chơi vì', 'phải thắng thường xuyên hơn so với khi chơi vì'),
      z('zh-Hant', 'scenarios/sc-34.yaml', '比只算{{t:chips|籌碼}}時高', '比以{{t:chips|籌碼}}計價的遊戲高', 2),
    ],
    kontrole: [
      k('de', 'scenarios/sc-32.yaml', 'weniger riskierst im Vergleich', 'de sc-32: szyk „weniger riskierst im Vergleich”'),
      k('es', 'scenarios/sc-34.yaml', 'del que ganar suma', 'es sc-34: „del que ganar suma”'),
      k('fr', 'scenarios', 'paiera|\\{\\{t:shove\\|tapis\\}\\}', 'fr: „paiera”, znacznik shove tylko na „tapis”'),
      k('it', 'scenarios', 'farà \\{\\{t:call|fai quasi mai', 'it: „farà call”, „fai quasi mai call”'),
      k('ja', 'scenarios', 'だけのゲーム|少し大きくするためです', 'ja: „だけのゲーム”, „…大きくするためです” (sc-06/sc-34)'),
      k('ko', 'scenarios', '하고만', 'ko: „하고만”'),
      k('pt-BR', 'scenarios/sc-06.yaml', 'fala primeiro', 'pt-BR sc-06: „fala primeiro”'),
      k('vi', 'scenarios/sc-34.yaml', 'chơi bằng \\{\\{t:chips', 'vi sc-34: „chơi bằng chip”'),
      k('vi', 'rules.yaml', 'thắng thường hơn', 'vi rules: „thắng thường hơn”'),
      k('zh-Hant', 'scenarios/sc-34.yaml', '只算', 'zh-Hant sc-34: „只算”'),
    ],
  },
});
