/// <reference types="jest" />
// IC (zadanie 1, wysokie, blokuje build 1011): słowo stopnia na suknie („~ Niedokładność”, „✓ Übereinstimmend”) mieści się w wierszu
// bez ucinania przy 320 i 390 pt, przy tekście domyślnym i AX5 (3,12), w każdym wydanym języku i dla każdego stopnia.
// Jest nie mierzy układu: oszacowanie szerokości jak w D-1730 (długość ważona × szerokość znaku w em × rozmiar po skali), współczynnik z pomiaru zrzutu
// `docs/design/dowody/ib-ocena-ib-check-raise-320.png` (294 pt dla „~ Niedokładność” 34 pt = 0,58 em na znak) z zapasem do 0,6.
import '@/i18n';
import i18n from 'i18next';
import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { SLOWNIKI } from '@/i18n/slowniki';
import StopienOceny, { ZNAK, type PropsStopniaOceny } from '@/features/ocena/StopienOceny';
import { dlugoscWazona } from '@/features/scenariusz/tytul';
import { MARGINESY_SUKNA, MIN_ROZMIAR_PT, SZEROKOSC_ZNAKU_EM, rozmiarSlowaStopnia } from '@/features/ocena/slowoStopnia';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

const OCENY: PropsStopniaOceny['ocena'][] = ['zgodne', 'dopuszczalne', 'niedokladnosc', 'blad'];
const JEZYKI = Object.keys(SLOWNIKI);
const SZEROKOSCI = [320, 390];
const SKALE = [1, 3.12];
const przy = (szer: number, skala: number) => {
  jest.spyOn(Dimensions, 'get').mockReturnValue({ width: szer, height: 844, scale: 3, fontScale: skala });
  jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(skala);
};
const najdluzszyWiersz = (znak: string, slowo: string): number => Math.max(...slowo.split(/\s+/).map((w) => dlugoscWazona(`${znak} ${w}`)));

afterEach(() => jest.restoreAllMocks());

describe('IC: słowo stopnia na suknie mieści się w wierszu', () => {
  it('współczynniki oszacowania są zapisane (pomiar zrzutu: 0,58 em, zapas do 0,6)', () => {
    expect(SZEROKOSC_ZNAKU_EM).toBe(0.6);
    expect(MARGINESY_SUKNA).toBe(88);
  });

  it.each(SZEROKOSCI.flatMap((s) => SKALE.map((k) => [s, k] as const)))('%i pt, skala tekstu %d: każdy język i stopień ≤ dostępna szerokość', async (szer, skala) => {
    const za = [];
    for (const jezyk of JEZYKI) {
      await i18n.changeLanguage(jezyk);
      for (const ocena of OCENY) {
        przy(szer, skala);
        const { unmount } = await render(<StopienOceny ocena={ocena} naSuknie />);
        const slowo = i18n.t(`grade.${ocena}`);
        const tekst = screen.getByText(slowo);
        const rozmiar = StyleSheet.flatten(tekst.props.style).fontSize as number;
        const szerokosc = najdluzszyWiersz(ZNAK[ocena], slowo) * SZEROKOSC_ZNAKU_EM * rozmiar * skala;
        if (szerokosc > szer - MARGINESY_SUKNA) za.push(`${jezyk}/${ocena} „${slowo}”: ${szerokosc.toFixed(0)} > ${szer - MARGINESY_SUKNA} (rozmiar ${rozmiar.toFixed(1)})`);
        await unmount();
      }
    }
    await i18n.changeLanguage('pl');
    expect(za).toEqual([]);
  });

  it('przy tekście domyślnym i szerokim ekranie zostaje styl słowa stopnia 34/38 (bez zmiany tam, gdzie się mieści)', async () => {
    przy(390, 1);
    await i18n.changeLanguage('en');
    const { unmount } = await render(<StopienOceny ocena="zgodne" naSuknie />);
    expect(StyleSheet.flatten(screen.getByText('Aligned').props.style)).toMatchObject({ fontSize: 34, lineHeight: 38 });
    await unmount();
    await i18n.changeLanguage('pl');
  });
});

describe('IC: rozmiarSlowaStopnia (czysta funkcja)', () => {
  const duzy = { fontSize: 34, lineHeight: 38 };
  const maly = { fontSize: 20, lineHeight: 25 };
  it('pierwszy kandydat, który się mieści; przy 320 pt „~ Niedokładność” schodzi do mniejszego stylu (tytulDlugi), przy 390 pt „Aligned” zostaje duży', () => {
    expect(rozmiarSlowaStopnia('~', 'Niedokładność', 320, 1, [duzy, maly])).toBe(maly);
    expect(rozmiarSlowaStopnia('✓', 'Aligned', 390, 1, [duzy, maly])).toBe(duzy);
  });
  it('gdy żaden się nie mieści: ostatni zmniejszony tak, by się mieścił, nie poniżej podłogi', () => {
    const w = rozmiarSlowaStopnia('~', 'Niedokładność', 320, 3.12, [duzy, maly]);
    expect(w.fontSize).toBeLessThan(maly.fontSize);
    expect(w.lineHeight / w.fontSize).toBeCloseTo(25 / 20);
    expect(w.fontSize * 3.12).toBeGreaterThanOrEqual(MIN_ROZMIAR_PT);
    const podloga = rozmiarSlowaStopnia('~', 'Niedokładność', 120, 3.12, [duzy, maly]);
    expect(podloga.fontSize * 3.12).toBeCloseTo(MIN_ROZMIAR_PT);
  });
  it('wielowyrazowe słowo liczy się po najdłuższym wyrazie (zawija się między wyrazami)', () => {
    expect(rozmiarSlowaStopnia('~', 'Thiếu chính xác', 320, 1, [duzy, maly])).toBe(duzy);
  });
  it('CJK liczy się podwójnie (D-1730)', () => {
    expect(rozmiarSlowaStopnia('✓', '一致一致一致一致', 320, 1, [duzy, maly])).toBe(maly);
  });
});
