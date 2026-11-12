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
});
