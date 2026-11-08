/// <reference types="jest" />
// 08 część 6 krok 8 (D-274, D-120, D-122): tytuły i indeks karty krojem Literata 600 przy tekście do XXXL, od AX1 krój
// systemowy; krój ładowany przy starcie z limitem 3 s (wzór Treningu `app/_layout.tsx:31`). Próg skali: React Native 0.88.1
// `React/CoreModules/RCTAccessibilityManager.mm:266–267` (XXXL = 1,353, AX1 = 1,786).
import * as Font from 'expo-font';
import { PixelRatio } from 'react-native';
import { LITERATA, krojIndeksu, krojTytulu, zaladujKroje } from '../kroje';
import { styl } from '../tokens';

jest.mock('expo-font', () => ({ isLoaded: jest.fn(() => true), loadAsync: jest.fn() }));

describe('kroje (Literata 600 do AX1, D-122)', () => {
  it.each([
    [true, 1, LITERATA],
    [true, 1.353, LITERATA],
    [true, 1.786, undefined],
    [true, 3.12, undefined],
    [false, 1, undefined],
  ] as const)('tytuł: krój załadowany %s, skala tekstu %s → %s', (zaladowany, skala, kroj) => {
    expect(krojTytulu(zaladowany, skala)).toBe(kroj);
  });

  it('indeks karty: Literata przy tekście do XXXL; od AX1 albo bez kroju — szeryfowy systemu', () => {
    expect([krojIndeksu(true, 1), krojIndeksu(true, 1.786), krojIndeksu(false, 1)]).toEqual([LITERATA, 'Georgia', 'Georgia']);
  });

  it('styl.tytul i styl.tytulDuzy: Literata przy domyślnym tekście, krój systemowy od AX1', () => {
    const skala = jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(1);
    expect([styl.tytul.fontFamily, styl.tytulDuzy.fontFamily]).toEqual([LITERATA, LITERATA]);
    skala.mockReturnValue(1.786);
    expect([styl.tytul.fontFamily, styl.tytulDuzy.fontFamily]).toEqual([undefined, undefined]);
    jest.mocked(Font.isLoaded).mockReturnValueOnce(false);
    skala.mockReturnValue(1);
    expect(styl.tytul.fontFamily).toBeUndefined();
    skala.mockRestore();
  });

  it('ładowanie kroju nie blokuje startu: wynik true po załadowaniu, false po błędzie i po limicie czasu', async () => {
    await expect(zaladujKroje(() => Promise.resolve(), 50)).resolves.toBe(true);
    await expect(zaladujKroje(() => Promise.reject(new Error('brak pliku')), 50)).resolves.toBe(false);
    await expect(zaladujKroje(() => new Promise<void>(() => undefined), 20)).resolves.toBe(false);
  });
});
