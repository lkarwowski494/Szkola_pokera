/// <reference types="jest" />
// IJ (P3 recenzji IH, 2b): `RzadPrzyciskow` dzieli szerokość wiersza przez liczbę PRAWDZIWYCH dzieci. `Children.count` liczy też `false`/`null` (przycisk warunkowy
// `{warunek && <Button/>}`), więc pole przycisku było liczone dla pary, choć stoi sam: etykieta zmniejszana bez potrzeby.
import { Dimensions } from 'react-native';
import { useContext } from 'react';
import { render, screen } from '@testing-library/react-native';
import { RzadPrzyciskow, SzerokoscPolaContext } from '@/components/ui';
import { odstep } from '@/theme/tokens';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

let pole: number | null = null;
function Sonda() {
  pole = useContext(SzerokoscPolaContext);
  return null;
}
beforeEach(() => {
  pole = null;
  jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 390, height: 844, scale: 3, fontScale: 1 });
});
afterEach(() => jest.restoreAllMocks());
const CALOSC = 390 - 2 * odstep.l;

describe('IJ: RzadPrzyciskow liczy tylko prawdziwe dzieci', () => {
  it('jedno dziecko i warunkowe `false`: pole = cały wiersz (jeden przycisk)', async () => {
    const pokaz = false as boolean;
    await render(<RzadPrzyciskow><Sonda />{pokaz && <Sonda />}</RzadPrzyciskow>);
    expect(pole).toBe(CALOSC);
  });
  it('dwa prawdziwe dzieci: pole = (wiersz − odstęp) ÷ 2', async () => {
    await render(<RzadPrzyciskow><Sonda /><Sonda /></RzadPrzyciskow>);
    expect(pole).toBeCloseTo((CALOSC - odstep.m) / 2, 5);
  });
  it('trzy dzieci, w tym `null` i `false` między nimi: pole jak dla dwóch', async () => {
    const wylacz = false as boolean;
    await render(<RzadPrzyciskow><Sonda />{null}{wylacz && <Sonda />}<Sonda /></RzadPrzyciskow>);
    expect(pole).toBeCloseTo((CALOSC - odstep.m) / 2, 5);
    expect(screen.getByTestId('rzad-przyciskow')).toBeTruthy();
  });
});
