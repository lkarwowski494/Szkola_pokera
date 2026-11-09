// Moduł motywu (08 cz. 5b krok 1, P-2 = B, D-256): tokeny roli 04 bez zmian wartości, wybór wariantu palety
// z wyglądu systemu i „Zwiększ kontrast”, style tekstu ze skali typografii.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
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

  // 08-F15 (D-284): barwy talii czterokolorowej jako tokeny systemu, z pomiarem kontrastu (WCAG 2.2 „contrast ratio”), bez wyjątku `przejsciowe`.
  it('08-F15: cardBlue #2456A6 i cardGreen #2A7A3B w każdym wariancie, indeks karty ≥ 4,5:1, bez kopii w tk.przejsciowe', () => {
    const lum = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
      return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
    };
    const kontrast = (a: string, b: string) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
    for (const wariant of ['light', 'dark', 'lightHigh', 'darkHigh'] as const) {
      const p = tokeny.kolory[wariant] as Record<string, string>;
      expect([p.cardBlue, p.cardGreen]).toEqual(['#2456A6', '#2A7A3B']);
      expect(kontrast(p.cardBlue!, p.card!)).toBeGreaterThanOrEqual(4.5);
      expect(kontrast(p.cardGreen!, p.card!)).toBeGreaterThanOrEqual(4.5);
    }
    const pary = tokeny.pary as Record<string, readonly [string, string, number]>;
    expect(pary['indeks karty (niebieski)']).toEqual(['cardBlue', 'card', 4.5]);
    expect(pary['indeks karty (zielony)']).toEqual(['cardGreen', 'card', 4.5]);
    const kod = readFileSync(join(__dirname, '../tokens.ts'), 'utf8');
    expect(kod).not.toMatch(/cardBlue:|cardGreen:/); // definicja w wyjątku `przejsciowe`
  });
});
