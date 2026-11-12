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
});
