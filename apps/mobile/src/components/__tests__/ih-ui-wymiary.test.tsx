/// <reference types="jest" />
// IH (recenzja IF P2-1, P2-2): (1) skala tekstu i szerokość okna z `useWindowDimensions` (reaktywnie; wzór: Trening `components/Segmented.tsx:36`), nie z `PixelRatio.getFontScale()` /
// `Dimensions.get` w renderze; test podmienia tylko `Dimensions.get` (fontScale w wymiarach okna), bez `PixelRatio`. (2) Button dopasowuje rozmiar do SZEROKOŚCI SWOJEGO POLA
// (onLayout: para flex:1 w `app/session.tsx`, Surface), nie do szerokości ekranu; przed pierwszym układem szerokość z okna.
import '@/i18n';
import { Dimensions, StyleSheet } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Button, RzadPrzyciskow, Surface } from '@/components/ui';
import { PasekStrategii } from '@/components/PasekStrategii';
import { odstep, styl } from '@/theme/tokens';
import { podstawaSegmentu } from '@/theme/skalowanie';
import { rozmiarDoSzerokosci } from '../dopasowanie';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const okno = (szer: number, skala: number) => jest.spyOn(Dimensions, 'get').mockReturnValue({ width: szer, height: 844, scale: 3, fontScale: skala });
afterEach(() => jest.restoreAllMocks());
const ETYKIETA = 'Zobacz podsumowanie';
const rozmiarEtykiety = () => StyleSheet.flatten(screen.getByText(ETYKIETA).props.style).fontSize as number;
const POLE_NA_PRZEWIN = 2 * 24 + 2 * 1.5; // padding przycisku 2 × 24 + obrys 2 × 1,5

const zmienOkno = (szer: number, skala: number) => act(() => {
  Dimensions.set({ window: { width: szer, height: 844, scale: 3, fontScale: skala }, screen: { width: szer, height: 844, scale: 3, fontScale: skala } });
});

describe('IH P2-1: skala i szerokość okna reagują na zmianę (useWindowDimensions)', () => {
  it('Button: po zmianie okna na 320 pt i skalę 3,12 rozmiar liczy się od nowa', async () => {
    await zmienOkno(390, 1);
    await render(<Button label={ETYKIETA} onPress={() => undefined} />);
    const przed = rozmiarEtykiety();
    await zmienOkno(320, 3.12);
    expect(rozmiarEtykiety()).toBeCloseTo(rozmiarDoSzerokosci(ETYKIETA, 320 - 32 - POLE_NA_PRZEWIN, 3.12, styl.tresc).fontSize, 5);
    expect(rozmiarEtykiety()).not.toBeCloseTo(przed, 3);
  });
  it('PasekStrategii: po zmianie skali okna podstawa segmentu = 70 pt × nowa skala', async () => {
    await zmienOkno(390, 1);
    await render(<PasekStrategii opcje={[{ text: 'Pas' }, { text: 'Sprawdzenie' }]} wybor={null} klasa="" onWybierz={() => undefined} />);
    expect(StyleSheet.flatten(screen.getByTestId('option-0').props.style).flexBasis).toBeCloseTo(podstawaSegmentu(1), 5);
    await zmienOkno(320, 3.12);
    expect(StyleSheet.flatten(screen.getByTestId('option-0').props.style).flexBasis).toBeCloseTo(podstawaSegmentu(3.12), 5);
  });
});

describe('IH P2-2: Button dopasowany do szerokości pola z kontekstu rodzica (nie ekranu)', () => {
  const pole = (szerokosc: number) => rozmiarDoSzerokosci(ETYKIETA, szerokosc - POLE_NA_PRZEWIN, 3.12, styl.tresc).fontSize;
  it('para flex:1 (RzadPrzyciskow) w ekranie 390 pt: po układzie wiersza 358 pt każdy przycisk ma pole (358 − odstep.m) ÷ 2', async () => {
    okno(390, 3.12);
    await render(<RzadPrzyciskow><Button label={ETYKIETA} onPress={() => undefined} style={{ flex: 1 }} /><Button label="Wyczyść" variant="ghost" onPress={() => undefined} style={{ flex: 1 }} /></RzadPrzyciskow>);
    await fireEvent(screen.getByTestId('rzad-przyciskow'), 'layout', { nativeEvent: { layout: { x: 0, y: 0, width: 358, height: 48 } } });
    expect(rozmiarEtykiety()).toBeCloseTo(pole((358 - odstep.m) / 2), 5);
    expect(rozmiarEtykiety()).toBeLessThan(pole(390 - 32));
  });
  it('przycisk w Surface: pole = ekran − 2 × 16 − 2 × 16 (padding) − obrys ramki', async () => {
    okno(390, 3.12);
    await render(<Surface><Button label={ETYKIETA} onPress={() => undefined} /></Surface>);
    expect(rozmiarEtykiety()).toBeCloseTo(pole(390 - 32 - 32 - 2 * StyleSheet.hairlineWidth * 2), 5);
  });
  it('przycisk o szerokości zależnej od treści (bez kontekstu) nie kurczy się po układzie (brak pętli pomiaru)', async () => {
    okno(390, 1);
    await render(<Button label="Zakończ" variant="ghost" onPress={() => undefined} style={{ alignSelf: 'flex-start' }} />);
    const przed = StyleSheet.flatten(screen.getByText('Zakończ').props.style).fontSize;
    await fireEvent(screen.getByRole('button'), 'layout', { nativeEvent: { layout: { x: 0, y: 0, width: 90, height: 44 } } });
    expect(StyleSheet.flatten(screen.getByText('Zakończ').props.style).fontSize).toBe(przed);
  });
});
