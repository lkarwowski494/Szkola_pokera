/// <reference types="jest" />
// IJ (D-1908, WYSOKIE po zrzucie ij-po-ocenie-320-ax5.png): ekran „po ocenie” (PanelDecyzji: pasek strategii `PoOcenie` + `SkalaStopni`) przy 320 pt i Dynamic Type AX5:
// (1) podpis segmentu „Sprawdzenie (call)” łamał się w wyrazie (podpis ma minWidth 70 × skala = 218 pt, pole 214 pt, a wyraz 309 pt),
// (2) przedział skali stopni „twój” (flexBasis 112 × skala = 349 pt) wychodził poza suknem i ekran dostawał przewijanie poziome (389 > 320).
// Test nie mierzy układu (jak IC/IF): oszacowanie szerokości najdłuższego wyrazu musi mieścić się w gwarantowanym polu podpisu, w każdym wydanym języku.
import '@/i18n';
import i18n from 'i18next';
import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { SLOWNIKI } from '@/i18n/slowniki';
import { PasekStrategii } from '@/components/PasekStrategii';
import { SkalaStopni } from '@/components/SkalaStopni';
import { SZEROKOSC_ZNAKU_EM } from '@/features/ocena/slowoStopnia';
import { podstawaSegmentu } from '@/theme/skalowanie';
import { najdluzszyOdcinek } from '../dopasowanie';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const JEZYKI = Object.keys(SLOWNIKI);
const WARUNKI = [320, 390].flatMap((s) => [1, 3.12].map((k) => [s, k] as const));
const przy = (szer: number, skala: number) => {
  jest.spyOn(Dimensions, 'get').mockReturnValue({ width: szer, height: 844, scale: 3, fontScale: skala });
  jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(skala);
};
afterEach(() => jest.restoreAllMocks());
const wielka = (x: string): string => x.charAt(0).toLocaleUpperCase() + x.slice(1);
const AKCJE = ['fold', 'call', 'raise', 'threeBet'] as const;
const CZESTOSCI = [0.1, 0.5, 0.3, 0.1];
/** Miejsce na suknie (ekran − 88 pt, `MARGINESY_SUKNA`, IC) i padding podpisu (2 × 2): niezależna od implementacji granica. */
const miejsce = (szer: number): number => szer - 88;

describe('IJ: PoOcenie — podpisy segmentów', () => {
  it.each(WARUNKI)('%i pt, skala %d: nazwa akcji, procent i „twój wybór” mieszczą się w podpisie, w każdym języku', async (szer, skala) => {
    const za: string[] = [];
    for (const jezyk of JEZYKI) {
      await i18n.changeLanguage(jezyk);
      const nazwy = AKCJE.map((a) => wielka(i18n.t(`scenario.action.${a}`)));
      przy(szer, skala);
      const { unmount } = await render(<PasekStrategii opcje={nazwy.map((text, i) => ({ text, czestosc: CZESTOSCI[i] ?? 0 }))} wybor={1} klasa="J9o" />);
      for (const [i, tekst] of [...nazwy, i18n.t('strategy.yourChoiceShort')].entries()) {
        const segment = i < nazwy.length ? i : 1; // „twój wybór” stoi w podpisie wybranego segmentu (indeks 1)
        const minWidth = StyleSheet.flatten(screen.getByTestId(`podpis-${segment}`).props.style).minWidth as number;
        const rozmiar = StyleSheet.flatten(screen.getAllByText(tekst)[0]!.props.style).fontSize as number;
        const s = najdluzszyOdcinek(tekst) * SZEROKOSC_ZNAKU_EM * rozmiar * skala;
        if (s > minWidth - 4) za.push(`${jezyk} „${tekst}”: ${s.toFixed(0)} > pole ${(minWidth - 4).toFixed(0)} (rozmiar ${rozmiar.toFixed(1)})`);
        if (minWidth > miejsce(szer)) za.push(`${jezyk} „${tekst}”: podpis ${minWidth.toFixed(0)} > miejsce na suknie ${miejsce(szer)}`);
        if (minWidth < podstawaSegmentu(skala) && minWidth < miejsce(szer)) za.push(`${jezyk}: podpis węższy niż podstawa ${podstawaSegmentu(skala)}`);
      }
      await unmount();
    }
    await i18n.changeLanguage('pl');
    expect(za).toEqual([]);
  });

  it('przy tekście domyślnym i 390 pt podpisy zostają w stylu ze skali (przypis 15/21)', async () => {
    przy(390, 1);
    await render(<PasekStrategii opcje={[{ text: 'Pas', czestosc: 0.2 }, { text: 'Sprawdzenie', czestosc: 0.8 }]} wybor={1} klasa="J9o" />);
    expect(StyleSheet.flatten(screen.getByText('Sprawdzenie').props.style)).toMatchObject({ fontSize: 15, lineHeight: 21 });
  });
});

describe('IJ: SkalaStopni — przedział nie szerszy od wiersza', () => {
  it.each(WARUNKI)('%i pt, skala %d: każdy przedział ma maxWidth 100% (flexBasis 112 × skala nie wypycha poza suknem)', async (szer, skala) => {
    przy(szer, skala);
    await render(<SkalaStopni czestosc={0.7} ocena="zgodne" />);
    for (const s of ['blad', 'dopuszczalne', 'zgodne']) expect(StyleSheet.flatten(screen.getByTestId(`przedzial-${s}`).props.style).maxWidth).toBe('100%');
  });
});
