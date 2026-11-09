import { krojIndeksu, krojTytulu, LITERATA } from '../kroje';

// D-368: Literata 600 nie ma znaków CJK — w ja, zh-Hant (i ko) tytuły krojem systemowym semibold, jak od AX1; indeks karty bez zmian.
describe('krój tytułu według języka (D-368)', () => {
  it('ja, zh-Hant, ko → krój systemowy; pl, en, pt-BR, fr → Literata', () => {
    for (const j of ['ja', 'zh-Hant', 'ko']) expect(krojTytulu(true, 1, j)).toBeUndefined();
    for (const j of ['pl', 'en', 'pt-BR', 'fr', undefined]) expect(krojTytulu(true, 1, j)).toBe(LITERATA);
  });
  it('indeks karty (cyfry i litery łacińskie) zostaje Literatą niezależnie od języka', () => {
    expect(krojIndeksu(true, 1)).toBe(LITERATA);
  });
});
