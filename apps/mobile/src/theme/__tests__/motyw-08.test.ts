// Moduł motywu (08 cz. 5b krok 1, P-2 = B, D-256): tokeny roli 04 bez zmian wartości, wybór wariantu palety
// z wyglądu systemu i „Zwiększ kontrast”, style tekstu ze skali typografii.
import * as wzor from '../../../../../docs/design/tokeny';
import * as tokeny from '../tokeny';
import { styl, wybierzPalete } from '../tokens';

describe('motyw z docs/design/tokeny.ts', () => {
  it('wartości tokenów są takie same jak w pliku roli 04 (jedno źródło prawdy)', () => {
    expect({ ...tokeny }).toEqual({ ...wzor });
  });

  it.each([
    ['light', false, 'light'],
    ['dark', false, 'dark'],
    ['light', true, 'lightHigh'],
    ['dark', true, 'darkHigh'],
    [null, false, 'light'],
    [undefined, true, 'lightHigh'],
  ] as const)('schemat %s, zwiększony kontrast %s → %s', (schemat, kontrast, wariant) => {
    expect(wybierzPalete(schemat, kontrast)).toBe(tokeny.kolory[wariant]);
  });

  it('style tekstu biorą rozmiar i interlinię ze skali (treść 17/24, przypis 15/21, drobny 13/17, tytuł 28/34, duży 34/41)', () => {
    const { skala } = tokeny.typografia;
    expect([styl.tresc, styl.przypis, styl.drobny, styl.tytul, styl.tytulDuzy].map((s) => [s.fontSize, s.lineHeight])).toEqual(
      [skala.tresc, skala.przypis, skala.drobny, skala.tytul, skala.tytulDuzy].map((s) => [s.size, s.line]),
    );
    expect(styl.naglowek).toMatchObject({ fontSize: skala.tresc.size, fontWeight: '600' });
  });
});
