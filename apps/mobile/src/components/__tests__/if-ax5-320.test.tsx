/// <reference types="jest" />
// IF (zadanie 1, WYSOKIE, blokuje build 1011; D-1880…D-1883): przy 320 pt i Dynamic Type AX5 przycisk „Zobacz podsumowanie”, nazwa akcji w paskach decyzji i ocen
// („Sprawdzenie (call)”) oraz stopień w dzienniku („~ Niedokładność”) były ucinane albo łamane w wyrazie. Test nie mierzy układu (jak IC, D-1850): oszacowanie
// szerokości najdłuższego wyrazu (długość ważona × 0,6 em × rozmiar × skala) musi mieścić się w polu, w każdym wydanym języku, przy 320 i 390 pt, skali 1 i 3,12.
import '@/i18n';
import i18n from 'i18next';
import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { SLOWNIKI } from '@/i18n/slowniki';
import { Button } from '@/components/ui';
import { PasekStrategii } from '@/components/PasekStrategii';
import { ZNAK } from '@/features/ocena/StopienOceny';
import { SZEROKOSC_ZNAKU_EM } from '@/features/ocena/slowoStopnia';
import { Dziennik, PasekOcenAkcji } from '@/features/scenariusz/komponenty';
import { najdluzszyOdcinek, rozmiarDoSzerokosci, szerokoscOdcinka } from '../dopasowanie';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const JEZYKI = Object.keys(SLOWNIKI);
const WARUNKI = [320, 390].flatMap((s) => [1, 3.12].map((k) => [s, k] as const));
const przy = (szer: number, skala: number) => {
  jest.spyOn(Dimensions, 'get').mockReturnValue({ width: szer, height: 844, scale: 3, fontScale: skala });
  jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(skala);
};
afterEach(() => jest.restoreAllMocks());

/** Szerokość tekstu (pt po skali) z rozmiaru, jaki komponent faktycznie ustawił. */
const szerokosc = (tekst: string, skala: number): { szer: number; rozmiar: number } => {
  const rozmiar = StyleSheet.flatten(screen.getByText(tekst).props.style).fontSize as number;
  return { szer: najdluzszyOdcinek(tekst) * SZEROKOSC_ZNAKU_EM * rozmiar * skala, rozmiar };
};
/** Liczba segmentów w wierszu paska: ta sama reguła co `wymiarSegmentu` (>3: dwa albo jeden; ≤3: tyle, ile mieści podstawa 70 pt × skala). */
const wWierszu = (liczba: number, skala: number, szer: number): number => {
  const pasek = szer - 32;
  return liczba > 3 ? (2 * 70 * skala <= pasek ? 2 : 1) : Math.max(1, Math.min(liczba, Math.floor(pasek / (70 * skala))));
};
/** Pole tekstu w segmencie: szerokość wiersza / liczba w wierszu − 2 × 8 (padding) − 4 (obrys wybranego). */
const poleSegmentu = (liczba: number, skala: number, szer: number): number => (szer - 32) / wWierszu(liczba, skala, szer) - 16 - 4;
const OCENY = ['zgodne', 'dopuszczalne', 'niedokladnosc', 'blad'] as const;
const wielka = (x: string): string => x.charAt(0).toLocaleUpperCase() + x.slice(1);
const AKCJE = ['fold', 'call', 'raise', 'threeBet'] as const;
/** Nazwy akcji jak w `tekstAkcji` (EkranScenariusza): `scenario.action.*` z wielką literą. */
const nazwy = (): string[] => AKCJE.map((a) => wielka(i18n.t(`scenario.action.${a}`)));

describe('IF: przycisk (Button) z długim wyrazem mieści się w polu', () => {
  it.each(WARUNKI)('%i pt, skala %d: „Zobacz podsumowanie” i „Dalej: …” w każdym języku', async (szer, skala) => {
    const za: string[] = [];
    for (const jezyk of JEZYKI) {
      await i18n.changeLanguage(jezyk);
      for (const etykieta of [i18n.t('scenario.next.summary'), i18n.t('scenario.next.street', { ulica: i18n.t('scenario.street.river') })]) {
        przy(szer, skala);
        const { unmount } = await render(<Button label={etykieta} onPress={() => undefined} />);
        const pole = szer - 32 - 2 * 24 - 3; // pole ekranu 2 × 16, padding przycisku 2 × 24, obrys 2 × 1,5
        const { szer: s, rozmiar } = szerokosc(etykieta, skala);
        if (s > pole) za.push(`${jezyk} „${etykieta}”: ${s.toFixed(0)} > ${pole} (rozmiar ${rozmiar.toFixed(1)})`);
        await unmount();
      }
    }
    await i18n.changeLanguage('pl');
    expect(za).toEqual([]);
  });
  it('przy tekście domyślnym i 390 pt rozmiar etykiety bez zmian (17/24)', async () => {
    przy(390, 1);
    await render(<Button label="Zobacz podsumowanie" onPress={() => undefined} />);
    expect(StyleSheet.flatten(screen.getByText('Zobacz podsumowanie').props.style)).toMatchObject({ fontSize: 17, lineHeight: 24 });
  });
});

describe('IF: segmenty pasków decyzji i ocen (nazwa akcji, stopień, „twój wybór”)', () => {
  it.each(WARUNKI)('%i pt, skala %d: pasek decyzji, 4 akcje, każdy język — nazwa mieści się w segmencie', async (szer, skala) => {
    const za: string[] = [];
    for (const jezyk of JEZYKI) {
      await i18n.changeLanguage(jezyk);
      przy(szer, skala);
      const n = nazwy();
      const { unmount } = await render(<PasekStrategii opcje={n.map((text) => ({ text }))} wybor={null} klasa="" onWybierz={() => undefined} />);
      for (const tekst of n) {
        const pole = poleSegmentu(n.length, skala, szer) + 2; // bez obrysu wybranego (tu tylko lewa kreska)
        const { szer: s, rozmiar } = szerokosc(tekst, skala);
        if (s > pole) za.push(`${jezyk} „${tekst}”: ${s.toFixed(0)} > ${pole.toFixed(0)} (rozmiar ${rozmiar.toFixed(1)})`);
      }
      await unmount();
    }
    await i18n.changeLanguage('pl');
    expect(za).toEqual([]);
  });

  it.each(WARUNKI)('%i pt, skala %d: pasek ocen, 4 akcje, każdy język i stopień — nazwa, stopień i „twój wybór” mieszczą się w segmencie', async (szer, skala) => {
    const za: string[] = [];
    for (const jezyk of JEZYKI) {
      await i18n.changeLanguage(jezyk);
      const n = nazwy();
      const akcje = Object.fromEntries(AKCJE.map((a, i) => [a, OCENY[i % OCENY.length]]));
      const nazwyAkcji = Object.fromEntries(AKCJE.map((a, i) => [a, n[i]!]));
      przy(szer, skala);
      const { unmount } = await render(<PasekOcenAkcji akcje={akcje} wybor="call" nazwy={nazwyAkcji} />);
      const teksty = [...n, ...OCENY.slice(0, AKCJE.length).map((o) => `${ZNAK[o]} ${i18n.t(`grade.${o}`)}`), i18n.t('scenario.scale.yourChoice')];
      for (const tekst of teksty) {
        const pole = poleSegmentu(n.length, skala, szer);
        const { szer: s, rozmiar } = szerokosc(tekst, skala);
        if (s > pole) za.push(`${jezyk} „${tekst}”: ${s.toFixed(0)} > ${pole.toFixed(0)} (rozmiar ${rozmiar.toFixed(1)})`);
      }
      await unmount();
    }
    await i18n.changeLanguage('pl');
    expect(za).toEqual([]);
  });

  it('przy tekście domyślnym i 390 pt nazwy i stopnie zostają w stylu ze skali (17/24 i 13/17)', async () => {
    przy(390, 1);
    await render(<PasekOcenAkcji akcje={{ fold: 'zgodne', call: 'blad' }} wybor="fold" nazwy={{ fold: 'Pas', call: 'Sprawdzenie' }} />);
    expect(StyleSheet.flatten(screen.getByText('Sprawdzenie').props.style)).toMatchObject({ fontSize: 17, lineHeight: 24 });
    expect(StyleSheet.flatten(screen.getByText('✗ Błąd').props.style)).toMatchObject({ fontSize: 13, lineHeight: 17 });
  });
});

describe('IF: dziennik — stopień przy wpisie ulicy', () => {
  /** Reguła: wiersz zostaje poziomo, gdy stopień mieści się w połowie miejsca obok etykiety ulicy (64 pt + odstęp 8 × 2); inaczej kolumna (ulica nad wpisem), pole = szerokość treści. */
  it.each(WARUNKI)('%i pt, skala %d: każdy język i stopień mieści się w polu swojego układu', async (szer, skala) => {
    const za: string[] = [];
    for (const jezyk of JEZYKI) {
      await i18n.changeLanguage(jezyk);
      for (const o of OCENY) {
        przy(szer, skala);
        const slowo = `${ZNAK[o]} ${i18n.t(`grade.${o}`)}`;
        const { unmount } = await render(<Dziennik wpisy={[{ ulica: 'Flop', tekst: 'BB: sprawdza', ocena: o }]} />);
        const el = screen.getByText(slowo);
        let kierunek: unknown;
        for (let n = el.parent; n && kierunek === undefined; n = n.parent) kierunek = StyleSheet.flatten(n.props.style)?.flexDirection;
        const pole = kierunek === 'column' ? szer - 32 : (szer - 32 - 64 - 16) / 2;
        const { szer: s, rozmiar } = szerokosc(slowo, skala);
        if (s > pole) za.push(`${jezyk}/${o} „${slowo}” (${String(kierunek)}): ${s.toFixed(0)} > ${pole.toFixed(0)} (rozmiar ${rozmiar.toFixed(1)})`);
        await unmount();
      }
    }
    await i18n.changeLanguage('pl');
    expect(za).toEqual([]);
  });
});

describe('IF: dopasowanie.ts (czyste funkcje)', () => {
  const tresc = { fontSize: 17, lineHeight: 24 };
  it('najdłuższy odcinek: wyraz między spacjami i nową linią; CJK pęka przy każdym znaku (2), łaciński wyraz liczy się w całości', () => {
    expect(najdluzszyOdcinek('Sprawdzenie (call)')).toBe(11);
    expect(najdluzszyOdcinek('Przebicie\ndo 3 bb')).toBe(9);
    expect(najdluzszyOdcinek('サマリーを見る')).toBe(2);
    expect(najdluzszyOdcinek('~ Niedokładność')).toBe(13); // wiersz pęka po „~”, więc liczy się samo słowo
    expect(najdluzszyOdcinek('')).toBe(0);
  });
  it('mieści się → ten sam rozmiar; nie mieści się → proporcjonalnie mniejszy (z zapasem 1%), zawsze mieści się w polu', () => {
    expect(rozmiarDoSzerokosci('Pas', 200, 1, tresc)).toEqual(tresc);
    const r = rozmiarDoSzerokosci('Sprawdzenie', 100, 1, tresc);
    expect(r.fontSize).toBeLessThan(17);
    expect(szerokoscOdcinka('Sprawdzenie', r.fontSize, 1)).toBeLessThanOrEqual(100);
    expect(r.lineHeight / r.fontSize).toBeCloseTo(24 / 17, 10);
  });
  it('podłoga 15 pt po skali; styl mniejszy od podłogi nie rośnie', () => {
    expect(rozmiarDoSzerokosci('Niedokładnościowy', 10, 3.12, tresc).fontSize * 3.12).toBeCloseTo(15, 10);
    expect(rozmiarDoSzerokosci('Niedokładnościowy', 10, 1, { fontSize: 13, lineHeight: 17 }).fontSize).toBe(13);
  });
});
