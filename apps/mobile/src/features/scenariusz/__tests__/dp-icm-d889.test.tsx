/// <reference types="jest" />
// DP (D-889; docs/design/design-spec.md „Scenariusz: punkt ICM”, kryteria akceptacji 1–4): widok punktu icm-call: stosy wszystkich graczy w bb, nagrody w % puli nagród,
// dopłata i pula z wariantu (nie ze `stackBb`), VoiceOver. Oczekiwane liczby liczone osobno od kodu (z wariantu: żetony × stackBb ÷ mniejszy stos pary).
// Kryteria 5 (AX5 na 320/390/430) i 6 (zrzut) wymagają przeglądarki albo urządzenia: lista kontrolna w raporcie (docs/programista/stan-dp.md).
import '@/i18n';
import i18n from '@/i18n';
import { Dimensions, StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { cardToString, generateVariant, type IcmCallVariantDecision, type ScenarioVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora } from '@/data/content/repo';
import { nazwaKarty } from '@/features/stol/uklad';
import { dbCn, ICM } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { kwotaAkcji, naGenerator, ukladIcm, widokDecyzji, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const NBSP = ' ';
const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const ctx = getKontekstGeneratora(dbCn, ICM);
const wariant = (poziom: 'latwy' | 'sredni' | 'trudny', ziarno: number): ScenarioVariant => generateVariant(naGenerator(ICM), poziom, ziarno, ctx);
const punkt = (w: ScenarioVariant): IcmCallVariantDecision => {
  const p = w.points[0]!;
  if (p.point !== 'icm-call') throw new Error('nie icm-call');
  return p;
};
const sesja = (w: ScenarioVariant, wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon: ICM as ScenarioTemplate, poziom: 'latwy', wariant: w, wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: ICM.id } },
} as unknown as SesjaScenariusza);
const decyzja = async (w: ScenarioVariant) => {
  await render(<PrzebiegScenariusza sesja={sesja(w, [])} faza="decyzja" koniec={false} bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
};
const ocena = async (w: ScenarioVariant, wybor: Akcja) => {
  await render(<PrzebiegScenariusza sesja={sesja(w, [wybor])} faza="ocena" koniec bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
};

/** Pierwszy wariant spełniający warunek (deterministyczne ziarna 1…400; poziomy po kolei). */
function znajdz(warunek: (p: IcmCallVariantDecision) => boolean): ScenarioVariant {
  for (const poziom of ['latwy', 'sredni', 'trudny'] as const) {
    for (let z = 1; z <= 400; z++) {
      try {
        const w = wariant(poziom, z);
        if (warunek(punkt(w))) return w;
      } catch {
        /* ziarno odrzucone przez generator (BR-GEN-003) */
      }
    }
  }
  throw new Error('brak wariantu o tym kształcie w ziarnach 1…400');
}
/** Ręczny punkt icm-call (DR, recenzja DQ 003/006): stosy, wypłaty i indeksy pary dowolne, reszta pól bez znaczenia dla układu. */
const punktReczny = (stacks: number[], payouts: number[], heroIndex: number, villainIndex: number): IcmCallVariantDecision =>
  ({ point: 'icm-call', street: 'preflop', spot: 'x', payouts, stacks, heroIndex, villainIndex, handClass: 'A7o', handEquity: 0.5, required: 0.5, requiredChips: 0.45, correct: 'fold', margin: 0.05 }) as IcmCallVariantDecision;
const gracze = (p: IcmCallVariantDecision) => p.stacks.length;
const heroNieWiekszy = (p: IcmCallVariantDecision) => p.stacks[p.heroIndex]! <= p.stacks[p.villainIndex]!;

// rachunek niezależny od kodu ekranu: 1 bb = mniejszy stos pary ÷ stackBb (scenario-gen.ts), zapis pl z jednym miejscem po przecinku, bez końcowego zera
const zeton = (p: IcmCallVariantDecision): number => Math.min(p.stacks[p.heroIndex]!, p.stacks[p.villainIndex]!) / ICM.stackBb!;
const bbZ = (p: IcmCallVariantDecision, i: number): string => String(Math.round((p.stacks[i]! / zeton(p)) * 10) / 10).replace('.', ',');
const pelnyStos = (p: IcmCallVariantDecision, i: number): string => `${bbZ(p, i)} bb`; // tekstEkranu zamienia U+00A0 na zwykłą spację; spacja nierozdzielająca sprawdzona w teście kluczy niżej
const lista = () => screen.getByLabelText('Stosy na początku rozdania');

describe('kryterium 1: stosy wszystkich graczy w bb i wszystkie wypłaty, suma 100%', () => {
  for (const n of [3, 4]) {
    it(`${n} graczy: lista „Stosy na początku rozdania” ma ${n} wierszy z wartościami z wariantu, nagrody sumują się do 100%`, async () => {
      const w = znajdz((p) => gracze(p) === n);
      const p = punkt(w);
      await decyzja(w);
      expect(lista().props.accessibilityRole).toBe('list');
      expect(screen.getAllByTestId('stos-wiersz')).toHaveLength(n);
      for (let i = 0; i < n; i++) expect(tekstEkranu()).toContain(pelnyStos(p, i));
      expect(p.payouts.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 10);
      for (const wyp of p.payouts) expect(tekstEkranu()).toContain(`${Math.round(wyp * 100)}%`);
      expect(tekstEkranu()).toContain(`Bańka: płatne ${p.payouts.length} miejsca z ${n}`);
      expect(tekstEkranu()).toMatch(/Nagrody: 1\. miejsce \d+%/);
      expect(tekstEkranu()).toMatch(/puli nagród \(prize pool\)\. (Trzecie|Czwarte) miejsce nic nie dostaje\./);
    });
  }
  it('nazwy w liście: Ty, BB · Rywal, SB · Gracz A (· Gracz B), w kolejności miejsc od ciebie', async () => {
    const w = znajdz((p) => gracze(p) === 4);
    await decyzja(w);
    const t4 = tekstEkranu();
    const idx = ['Ty, BB', 'Rywal, SB', 'Gracz A', 'Gracz B'].map((x) => t4.indexOf(x, t4.indexOf('Stosy na początku')));
    expect(idx.every((i) => i >= 0)).toBe(true);
    expect([...idx].sort((a, b) => a - b)).toEqual(idx);
  });
});

describe('kryterium 2: stos „ty” i dopłata z twojego stosu', () => {
  it('twój stos większy niż rywala: dopłata = stos rywala − 1 bb (9 bb), pula = stos rywala + 1 bb, bez przypisu o całym stosie', async () => {
    const w = znajdz((p) => !heroNieWiekszy(p));
    const p = punkt(w);
    const widok = widokDecyzji(w, 0, ICM);
    expect(widok.doSprawdzeniaBb).toBe(ICM.stackBb! - 1);
    expect(kwotaAkcji(p, 'call', ICM)).toBe(ICM.stackBb! - 1);
    await decyzja(w);
    expect(tekstEkranu()).not.toContain('cały twój stos');
    expect(screen.getByRole('button', { name: new RegExp(`^Sprawdzenie[\\s\\S]*${ICM.stackBb! - 1}\\sbb`) })).toBeTruthy();
  });
  it('twój stos mniejszy albo równy: przypis „{{kwota}} to cały twój stos: przegrana kończy dla ciebie turniej bez nagrody.”', async () => {
    const w = znajdz((p) => heroNieWiekszy(p));
    await decyzja(w);
    expect(tekstEkranu()).toContain(`${ICM.stackBb! - 1} bb to cały twój stos: przegrana kończy dla ciebie turniej (tournament) bez nagrody.`);
  });
  it('pula to mniejszy stos pary + twój blind także przy większym stosie rywala; all-in rywala w dzienniku to jego pełny stos (D-985)', async () => {
    const w = znajdz((p) => p.stacks[p.villainIndex]! > p.stacks[p.heroIndex]!);
    const p = punkt(w);
    expect(widokDecyzji(w, 0, ICM).pulaBb).toBe(ICM.stackBb! + 1); // nadwyżka rywala wraca do niego; zgodne z progiem (S − b) ÷ (2S) z „Liczb” (D-890)
    await decyzja(w);
    expect(tekstEkranu()).toContain(`W puli (pot) ${ICM.stackBb! + 1} bb`); // „(pot)”: glosa terminu w wierszu puli (istniejący format)
    expect(tekstEkranu()).toContain(`SB: all-in ${bbZ(p, p.villainIndex)} bb`);
  });
});

describe('układ punktu ICM z ręcznych stosów (makieta): granice, zaokrąglenie, pasek (DR: DQ 003, 006)', () => {
  it('równe stosy pary: przypis „cały twój stos” (<=, nie <); stosy to wielokrotności żetonów, więc równość jest realna', () => {
    const u = ukladIcm(punktReczny([2000, 2000, 6000], [0.6, 0.4], 0, 1), ICM)!;
    expect(u.caleStosTy).toBe(true);
    expect(ukladIcm(punktReczny([2500, 2000, 6000], [0.6, 0.4], 0, 1), ICM)!.caleStosTy).toBe(false);
  });
  it('3 graczy 3500/3500/3000 (ty większy): 11,7 bb zaokrąglone w górę (nie 11,6); pasek względem największego stosu, nie sumy żetonów', () => {
    const u = ukladIcm(punktReczny([3500, 3500, 3000], [0.6, 0.4], 1, 2), ICM)!;
    expect(u.wiersze.map((w) => w.stosBb)).toEqual([11.7, 10, 11.7]);
    expect(u.wiersze.map((w) => Math.round(w.udzial * 1000))).toEqual([1000, 857, 1000]); // 3500÷3500, 3000÷3500, 3500÷3500
  });
});

describe('kryterium 3: pula, dopłata, kwota na przycisku i dziennik z jednej funkcji kwoty (D-886)', () => {
  it('dopłata widoku = kwota akcji „call” = liczba na przycisku; dziennik: all-in rywala w bb z wariantu (z przecinkiem), pas graczy spoza pary', async () => {
    const w = znajdz((p) => gracze(p) === 4 && p.stacks[p.villainIndex]! !== Math.min(p.stacks[p.heroIndex]!, p.stacks[p.villainIndex]!));
    const p = punkt(w);
    expect(widokDecyzji(w, 0, ICM).doSprawdzeniaBb).toBe(kwotaAkcji(p, 'call', ICM));
    await decyzja(w);
    expect(tekstEkranu()).toMatch(/Gracz A: pas \(fold\)\. Gracz B: pas \(fold\)\. SB: all-in/);
    expect(tekstEkranu()).toContain(`SB: all-in ${bbZ(p, p.villainIndex)} bb`);
  });
  it('3 graczy: w dzienniku tylko „Gracz A: pas”', async () => {
    const w = znajdz((p) => gracze(p) === 3);
    await decyzja(w);
    expect(tekstEkranu()).toMatch(/Gracz A: pas \(fold\)\. SB: all-in/);
    expect(tekstEkranu()).not.toContain('Gracz B');
  });
});

describe('kryterium 4: VoiceOver', () => {
  it('etykieta stołu: karty nazwami, stan każdego gracza i rywal na SB; lista stosów ma rolę listy; pasek stosu ukryty dla czytnika', async () => {
    const w = znajdz((p) => gracze(p) === 4);
    await decyzja(w);
    const stol = screen.getByRole('image', { name: /^Stół \(board\): ty na BB/ });
    const eti = String(stol.props.accessibilityLabel);
    expect(eti).toMatch(/Rywal na SB wchodzi all-in/);
    expect(eti).toMatch(/Gracz A i Gracz B spasowali \(fold\)\./);
    expect(eti).not.toMatch(/[♠♥♦♣]/); // karty nazwami, nie symbolami (A04-11)
    for (const c of w.hero.map(cardToString)) expect(eti).toContain(nazwaKarty(c, t)); // i obie karty faktycznie są w etykiecie (DR: DQ 002)
    expect(lista().props.accessibilityRole).toBe('list');
    expect(screen.getAllByTestId('pasek-stosu', { includeHiddenElements: true }).every((x) => x.props.accessibilityElementsHidden === true && x.props.importantForAccessibility === 'no-hide-descendants')).toBe(true);
    expect(screen.getAllByRole('header', { name: /^Bańka: płatne/ })).toHaveLength(1);
  });
  it('3 graczy: „Gracz A spasował.” (liczba pojedyncza)', async () => {
    const w = znajdz((p) => gracze(p) === 3);
    await decyzja(w);
    expect(String(screen.getByRole('image', { name: /^Stół \(board\): ty na BB/ }).props.accessibilityLabel)).toMatch(/Gracz A spasował \(fold\)\./);
  });
});

describe('ekran decyzji: bez kroków ulic i bez stosów na rysunku stołu (design-spec)', () => {
  it('nie pokazuje listy ulic (punkt kończy rozdanie, D-783)', async () => {
    await decyzja(znajdz(() => true));
    expect(screen.queryByLabelText(t('scenario.streets.label'))).toBeNull();
  });
});

describe('ocena: zwinięty wiersz „Stosy i nagrody” (D-889)', () => {
  it('zwinięty domyślnie; po dotknięciu pokazuje listę stosów i zdanie nagród', async () => {
    const w = znajdz((p) => gracze(p) === 4);
    const p = punkt(w);
    await ocena(w, 'call');
    const wiersz = screen.getByTestId('stosy-nagrody');
    expect(wiersz.props.accessibilityState.expanded).toBe(false);
    expect(tekstEkranu()).not.toContain('Stosy na początku rozdania');
    await fireEvent.press(wiersz);
    expect(lista().props.accessibilityRole).toBe('list');
    expect(tekstEkranu()).toContain(pelnyStos(p, p.heroIndex));
    expect(tekstEkranu()).toMatch(/Nagrody: 1\. miejsce/);
  });
});

describe('spacje nierozdzielające w kluczach (design-spec: „N bb”, „1. miejsce”)', () => {
  it('stackValue ma U+00A0 przed „bb”, place ma U+00A0 po liczebniku porządkowym', () => {
    expect(t('scenario.icm.stackValue', { bb: '12,5' })).toBe(`12,5${NBSP}bb`);
    expect(t('scenario.icm.place', { n: 1, procent: '50%' })).toBe(`1.${NBSP}miejsce 50%`);
  });
});

describe('duży tekst (AX5): pasek stosu znika, liczba zostaje (design-spec „Pasek stosu”)', () => {
  it('przy skali 3,1 brak paska, wartości stosów nadal w liście', async () => {
    const spy = jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 390, height: 844, scale: 3, fontScale: 3.1 });
    try {
      const w = znajdz((p) => gracze(p) === 4);
      const p = punkt(w);
      await decyzja(w);
      // pasek ma accessibilityElementsHidden: bez includeHiddenElements zapytanie zawsze zwraca 0 i test nie umie paść (DR: DQ 001)
      expect(screen.queryAllByTestId('pasek-stosu', { includeHiddenElements: true })).toHaveLength(0);
      for (let i = 0; i < 4; i++) expect(tekstEkranu()).toContain(pelnyStos(p, i));
      // przy AX5 wartość schodzi pod nazwę (design-spec „Pasek stosu”; DR: DQ 005)
      for (const wiersz of screen.getAllByTestId('stos-wiersz')) expect(StyleSheet.flatten(wiersz.props.style).flexDirection).toBe('column');
    } finally {
      spy.mockRestore();
    }
  });
  it('kontrola: przy skali 1 cztery paski (z ukrytymi dla czytnika), wiersze poziome', async () => {
    const w = znajdz((p) => gracze(p) === 4);
    await decyzja(w);
    expect(screen.queryAllByTestId('pasek-stosu', { includeHiddenElements: true })).toHaveLength(4);
    for (const wiersz of screen.getAllByTestId('stos-wiersz')) expect(StyleSheet.flatten(wiersz.props.style).flexDirection).toBe('row');
  });
});
