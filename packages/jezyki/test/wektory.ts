/** Wektory liczby mnogiej ze wzorców roli 09 (CLDR): język → [liczba, kategoria]. */
export const WEKTORY: Record<string, Array<[number, Intl.LDMLPluralRule]>> = {
  pl: [[1, 'one'], [2, 'few'], [5, 'many'], [12, 'many'], [22, 'few'], [25, 'many'], [0, 'many'], [1.5, 'other']],
  ru: [[21, 'one']],
  cs: [[3, 'few'], [22, 'other']],
  lv: [[10, 'zero']],
  sl: [[2, 'two'], [3, 'few']],
  ro: [[2, 'few'], [20, 'other']],
  fr: [[0, 'one']],
  en: [[0, 'other']],
};
