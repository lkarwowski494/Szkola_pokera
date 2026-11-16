/// <reference types="jest" />
// IB (D-1848, koordynator: odpowiedź na PYTANIE 4): check-raise (SC-16) to pierwszy punkt z 4 akcjami. Przy >3 segmentach przyciski decyzji
// (`PasekStrategii`) i pasek ocen (`PasekOcenAkcji`) zawijają się 2×2 tym samym mechanizmem flexWrap co przy dużym tekście: podstawa 40% szerokości
// paska (dwa w wierszu), a minimalna szerokość = podstawaSegmentu(fontScale), więc przy AX5 nadal jeden segment w wierszu. Do 3 segmentów bez zmian.
// Dowód wizualny: docs/design/dowody/ib-*-check-raise-*-po*.png (390 i 320, domyślny i AX5).
import '@/i18n';
import { PixelRatio, StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { PasekStrategii } from '@/components/PasekStrategii';
import { podstawaSegmentu } from '@/theme/skalowanie';
import { PasekOcenAkcji } from '../komponenty';

type ReactTestInstance = NonNullable<ReturnType<typeof screen.getByText>['parent']>;
jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

const skala = (s: number) => jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(s);
afterEach(() => jest.restoreAllMocks());
const styl = (n: ReactTestInstance) => StyleSheet.flatten(typeof n.props.style === 'function' ? n.props.style({ pressed: false }) : n.props.style) ?? {};
const segment = (nazwa: string): ReactTestInstance => {
  for (let n: ReactTestInstance | null = screen.getByText(nazwa).parent; n; n = n.parent) if (styl(n).flexBasis !== undefined) return n;
  throw new Error(`brak segmentu dla ${nazwa}`);
};
const CZTERY = ['Pas', 'Sprawdzenie 2 bb', 'Przebicie do 3 bb', 'Przebicie do 9 bb'];
const TRZY = CZTERY.slice(0, 3);
const decyzja = (nazwy: string[]) => render(<PasekStrategii opcje={nazwy.map((text) => ({ text }))} wybor={null} klasa="" onWybierz={jest.fn()} />);
const AKCJE4 = { fold: 'niedokladnosc', call: 'zgodne', 'raise-small': 'niedokladnosc', 'raise-big': 'zgodne' } as const;
const NAZWY4 = { fold: CZTERY[0]!, call: CZTERY[1]!, 'raise-small': CZTERY[2]!, 'raise-big': CZTERY[3]! };
const ocena = (n: number) => render(<PasekOcenAkcji akcje={AKCJE4} wybor="raise-small" nazwy={Object.fromEntries(Object.entries(NAZWY4).slice(0, n))} />);

describe('IB (D-1848): pasek z 4 segmentami zawija się 2×2', () => {
  it.each([1, 3.12])('przyciski decyzji, 4 akcje, fontScale %s: podstawa 40%, minimalna szerokość = podstawaSegmentu(skala)', async (s) => {
    skala(s);
    await decyzja(CZTERY);
    for (const n of CZTERY) expect(styl(segment(n))).toMatchObject({ flexBasis: '40%', minWidth: podstawaSegmentu(s) });
  });
  it('przyciski decyzji, 3 akcje: bez zmian (podstawa 70 pt, jeden wiersz)', async () => {
    skala(1);
    await decyzja(TRZY);
    for (const n of TRZY) { expect(styl(segment(n)).flexBasis).toBe(podstawaSegmentu(1)); expect(styl(segment(n)).minWidth).toBeUndefined(); }
  });
  it.each([1, 3.12])('pasek ocen, 4 akcje, fontScale %s: podstawa 40%, minimalna szerokość = podstawaSegmentu(skala)', async (s) => {
    skala(s);
    await ocena(4);
    for (const n of CZTERY) expect(styl(segment(n))).toMatchObject({ flexBasis: '40%', minWidth: podstawaSegmentu(s) });
  });
  it('pasek ocen, 3 akcje: bez zmian', async () => {
    skala(1);
    await ocena(3);
    for (const n of TRZY) { expect(styl(segment(n)).flexBasis).toBe(podstawaSegmentu(1)); expect(styl(segment(n)).minWidth).toBeUndefined(); }
  });
});
