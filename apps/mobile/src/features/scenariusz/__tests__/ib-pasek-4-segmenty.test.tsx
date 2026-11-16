/// <reference types="jest" />
// IB (D-1848, koordynator: odpowiedź na PYTANIE 4): check-raise (SC-16) to pierwszy punkt z 4 akcjami. Przy >3 segmentach przyciski decyzji
// (`PasekStrategii`) i pasek ocen (`PasekOcenAkcji`) zawijają się 2×2 tym samym mechanizmem flexWrap co przy dużym tekście: podstawa 40% szerokości
// paska (dwa w wierszu), a minimalna szerokość = podstawaSegmentu(fontScale), więc przy AX5 nadal jeden segment w wierszu. Do 3 segmentów bez zmian.
// Dowód wizualny: docs/design/dowody/ib-*-check-raise-*-po*.png (390 i 320, domyślny i AX5).
import '@/i18n';
import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
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

// IC (zadanie 2, P3 IB): lewa krawędź segmentu, który zaczyna wiersz (3. segment w 2×2, każdy segment przy dużym tekście), nie jest rysowana — w tym miejscu stoi obrys paska.
const KRESKA = StyleSheet.hairlineWidth * 2;
const lewe = (nazwy: string[]) => nazwy.map((n) => styl(segment(n)).borderLeftWidth);
const szerokosc = (w: number) => jest.spyOn(Dimensions, 'get').mockReturnValue({ width: w, height: 844, scale: 3, fontScale: 1 });

describe('IC (P3 IB): lewa krawędź segmentu na początku wiersza', () => {
  it('przyciski decyzji, 4 akcje 2×2 (390 pt, tekst domyślny): kreska tylko przy segmentach 2 i 4', async () => {
    szerokosc(390); skala(1);
    await decyzja(CZTERY);
    expect(lewe(CZTERY)).toEqual([0, KRESKA, 0, KRESKA]);
  });
  it('pasek ocen, 4 akcje 2×2 (wybrane sprawdzenie, 2. segment ma złotą obwódkę 2 pt): 3. segment bez lewej kreski, 4. z kreską', async () => {
    szerokosc(390); skala(1);
    await render(<PasekOcenAkcji akcje={AKCJE4} wybor="call" nazwy={NAZWY4} />);
    expect(lewe(CZTERY)).toEqual([0, 2, 0, KRESKA]);
  });
  it('przy dużym tekście (AX5: jeden segment w wierszu) żaden segment nie ma lewej kreski', async () => {
    szerokosc(390); skala(3.12);
    await decyzja(CZTERY);
    expect(lewe(CZTERY)).toEqual([0, 0, 0, 0]);
  });
  it('3 akcje, tekst domyślny (jeden wiersz): kreska przy segmentach 2 i 3 jak dotąd', async () => {
    szerokosc(390); skala(1);
    await decyzja(TRZY);
    expect(lewe(TRZY)).toEqual([0, KRESKA, KRESKA]);
  });
  it('wybrany segment zachowuje złotą obwódkę 2 pt także na początku wiersza', async () => {
    szerokosc(390); skala(1);
    await render(<PasekOcenAkcji akcje={AKCJE4} wybor="raise-small" nazwy={NAZWY4} />);
    expect(styl(segment(CZTERY[2]!)).borderLeftWidth).toBe(2);
  });
});
