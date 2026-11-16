/// <reference types="jest" />
// 04-studio-projektowe-001 (audyt HH, naprawa HK): pasek ocen akcji = te same segmenty co przed decyzją (docs/design/scenariusz-i-ocena.md:20):
// granatowy pasek (tokeny actionBg/actionEdge/actionInk), podstawa segmentu od fontScale jak `PasekStrategii` (nie stałe 96 pt, nie białe kafle),
// twój wybór w złotej obwódce z dopiskiem. Przy AX5 segmenty zawijają się w pionowy stos tą samą podstawą.
import '@/i18n';
import { Dimensions, StyleSheet } from 'react-native';
import { render, renderHook, screen } from '@testing-library/react-native';
import { podstawaSegmentu } from '@/theme/skalowanie';
import { useTokens } from '@/theme/tokens';
import { PasekOcenAkcji } from '../komponenty';

/** Węzeł drzewa testowego RNTL, wprost z typu `screen`. */
type ReactTestInstance = NonNullable<ReturnType<typeof screen.getByText>['parent']>;

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

const AKCJE = { fold: 'zgodne', call: 'niedokladnosc', '4bet': 'blad' } as const;
const NAZWY = { fold: 'Pas', call: 'Sprawdzenie', '4bet': '4-bet' } as const;
// IH (IF P2-1): komponenty czytają skalę i szerokość z `useWindowDimensions` (Dimensions.get('window')), więc test podmienia wymiary okna (wcześniej PixelRatio.getFontScale); asercje bez zmian.
const OKNO_DOMYSLNE = { width: 750, fontScale: 1 }; // szerokość okna jak w jest-expo (750), skala 1 do czasu skala(...)
const okno = { ...OKNO_DOMYSLNE };
const mockOkno = () => jest.spyOn(Dimensions, 'get').mockReturnValue({ width: okno.width, height: 844, scale: 3, fontScale: okno.fontScale });
const skala = (s: number) => { okno.fontScale = s; return mockOkno(); };
afterEach(() => { jest.restoreAllMocks(); Object.assign(okno, OKNO_DOMYSLNE); });

const styl = (n: ReactTestInstance) => StyleSheet.flatten(n.props.style) ?? {};
/** Segment = najbliższy przodek nazwy akcji ze stylem flexBasis. */
const segment = (nazwa: string): ReactTestInstance => {
  for (let n: ReactTestInstance | null = screen.getByText(nazwa).parent; n; n = n.parent) if (styl(n).flexBasis !== undefined) return n;
  throw new Error(`brak segmentu dla ${nazwa}`);
};
/** Tokeny jasnego motywu; wołać przed `pokaz` (renderHook podmienia drzewo `screen`). */
const tokeny = async () => (await renderHook(() => useTokens())).result.current;
const pokaz = () => render(<PasekOcenAkcji akcje={AKCJE} wybor="call" nazwy={NAZWY} />);

describe('04-studio-projektowe-001: pasek ocen akcji w segmentach jak przed decyzją', () => {
  it('tekst domyślny: podstawa segmentu = podstawaSegmentu(fontScale) (70 pt), nie stałe 96', async () => {
    skala(1);
    await pokaz();
    for (const n of Object.values(NAZWY)) expect(styl(segment(n)).flexBasis).toBe(podstawaSegmentu(1));
  });
  it('AX5 (3,12): podstawa rośnie z fontScale, jak segment decyzji (PasekStrategii)', async () => {
    skala(3.12);
    await pokaz();
    for (const n of Object.values(NAZWY)) expect(styl(segment(n)).flexBasis).toBe(podstawaSegmentu(3.12));
  });
  it('segmenty na granatowym pasku (actionBg), bez białych kafli surface', async () => {
    skala(1);
    const tk = await tokeny();
    await pokaz();
    const s = segment('Pas');
    expect(styl(s).backgroundColor).not.toBe(tk.surface);
    expect(styl(s.parent as ReactTestInstance).backgroundColor).toBe(tk.actionBg);
  });
  it('twój wybór: złota obwódka i dopisek „twój wybór”, pozostałe bez złota', async () => {
    skala(1);
    const tk = await tokeny();
    await pokaz();
    expect(styl(segment('Sprawdzenie')).borderColor).toBe(tk.gold);
    expect(styl(segment('Pas')).borderColor).not.toBe(tk.gold);
    expect(screen.getAllByText(/twój wybór/i)).toHaveLength(1);
  });
  // 08-programista-504 (mutanty M3, M4 recenzji HM): teksty na granatowym pasku mają tokeny napisów na granacie, nie ciemne `ink` ani `goldOnBg` (jasne tło).
  it('nazwa akcji i stopień na granacie: actionInk (nie ink); dopisek „twój wybór”: goldText (nie goldOnBg)', async () => {
    skala(1);
    const tk = await tokeny();
    expect(tk.actionInk).not.toBe(tk.ink);
    expect(tk.goldText).not.toBe(tk.goldOnBg);
    await pokaz();
    for (const n of Object.values(NAZWY)) expect(styl(screen.getByText(n)).color).toBe(tk.actionInk);
    expect(styl(screen.getByText(/twój wybór/i)).color).toBe(tk.goldText);
  });
});
