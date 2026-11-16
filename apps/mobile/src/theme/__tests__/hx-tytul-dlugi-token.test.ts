/// <reference types="jest" />
// HX (D-1731): token `typografia.skala.tytulDlugi` w obu `tokeny.ts` naraz (docs/design i src/theme), styl z sufitem jak `tytul`.
import { Dimensions, PixelRatio } from 'react-native';
import * as wzor from '../../../../../docs/design/tokeny';
import * as tokeny from '../tokeny';
import { styl } from '../tokens';

const OCZEKIWANY = { size: 20, line: 25, kroj: 'tytul', textStyle: 'title3', maxW: 0.1 };

describe('HX D-1731: token tytulDlugi', () => {
  it('20/25, Literata 600 (kroj „tytul”), title3, sufit 10% szerokości — w docs/design i w aplikacji', () => {
    expect(wzor.typografia.skala.tytulDlugi).toEqual(OCZEKIWANY);
    expect(tokeny.typografia.skala.tytulDlugi).toEqual(OCZEKIWANY);
  });
  it('styl.tytulDlugi przy tekście domyślnym: 20/25, półgruby, ten sam krój co tytuł', () => {
    expect(styl.tytulDlugi).toMatchObject({ fontSize: 20, lineHeight: 25, fontWeight: '600', fontFamily: styl.tytul.fontFamily });
  });
  it('przy dużym tekście (AX5, 390 pt) oba style zbiegają się do tego samego sufitu: 39 pt po przemnożeniu, długi nigdy większy od zwykłego', () => {
    const skala = jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(3.12);
    const wymiary = jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 390, height: 844, scale: 3, fontScale: 3.12 });
    try {
      expect(styl.tytulDlugi.fontSize * 3.12).toBeCloseTo(39, 5);
      expect(styl.tytul.fontSize * 3.12).toBeCloseTo(39, 5);
      expect(styl.tytulDlugi.fontSize).toBeLessThanOrEqual(styl.tytul.fontSize);
    } finally {
      skala.mockRestore();
      wymiary.mockRestore();
    }
  });
});
