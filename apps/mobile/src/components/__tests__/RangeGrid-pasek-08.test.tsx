/// <reference types="jest" />
// M2-koordynator-napraw-009 (04-studio-projektowe-011, KO-134, D-2021; design-spec „RangeGrid”): pasek pierwszej grupy i próbka legendy
// rysują token `rangeFill` (nie `felt1`, który zostaje suknem stołu). W 4 motywach: pasek/surface ≥ 3, onFelt na pasku ≥ 4,5, kropka ink na pasku ≥ 3.
import '@/i18n';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { HAND_CLASSES } from '@szkola/poker-core';
import { RangeGrid } from '@/components/RangeGrid';
import type { RangeSpot } from '@/data/content/repo';
import { kolory } from '@/theme/tokeny';
import { kontrast, zloz } from '@/test-utils/kontrast';

const mockWariant: { w: 'light' | 'dark' | 'lightHigh' | 'darkHigh' } = { w: 'light' };
jest.mock('@/theme/tokens', () => {
  const actual = jest.requireActual('@/theme/tokens');
  return {
    ...actual,
    useTokens: () => {
      const w = mockWariant.w;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return { ...(require('@/theme/tokeny').kolory[w] as object), przejsciowe: w === 'dark' || w === 'darkHigh' ? actual.przejscioweCiemne : actual.przejscioweJasne };
    },
  };
});

const WARIANTY = ['light', 'dark', 'lightHigh', 'darkHigh'] as const;
const pal = (w: (typeof WARIANTY)[number]) => kolory[w] as Record<string, string>;

type N = { type?: string; props?: { style?: unknown; testID?: string }; children?: (N | string)[] | null };
const flat = (n: N) => StyleSheet.flatten(n.props?.style as never) as Record<string, unknown>;
const wszystkie = (n: N | string | null | undefined, wynik: N[] = []): N[] => {
  if (!n || typeof n === 'string') return wynik;
  wynik.push(n);
  (n.children ?? []).forEach((c) => wszystkie(c, wynik));
  return wynik;
};

const spot: RangeSpot = {
  id: 'x', title: 'Tytuł', hero: 'BB', path: '', playPercent: 0.4,
  groups: [{ name: 'Przebicie', freqs: HAND_CLASSES.map((h) => ({ AA: 1, KK: 0.5 } as Record<string, number>)[h] ?? 0) }],
};

describe('RangeGrid: pasek pierwszej grupy i próbka legendy w `rangeFill` (M2-koordynator-napraw-009, D-2021)', () => {
  it.each(WARIANTY)('%s: pasek (opacity 0,85) i próbka legendy (10 × 10) mają kolor rangeFill', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const { toJSON } = await render(<RangeGrid spot={spot} />);
    const wezly = wszystkie(toJSON() as N);
    const paski = wezly.filter((n) => n.type === 'View' && flat(n).opacity === 0.85 && flat(n).position === 'absolute' && flat(n).width !== '0%');
    expect(paski.map((n) => flat(n).backgroundColor)).toEqual([p.rangeFill, p.rangeFill]); // AA (f = 1) i KK (f = 0,5)
    const probki = wezly.filter((n) => n.type === 'View' && flat(n).width === 10 && flat(n).height === 10);
    expect(probki.map((n) => flat(n).backgroundColor)).toEqual([p.rangeFill]);
  });

  it.each(WARIANTY)('%s: pasek ≥ 3:1 do surface; onFelt na pasku ≥ 4,5:1; kropka ink na pasku ≥ 3:1 (pasek = rangeFill z kryciem 0,85 na surface)', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const { toJSON } = await render(<RangeGrid spot={spot} />);
    const pasek = wszystkie(toJSON() as N).find((n) => n.type === 'View' && flat(n).opacity === 0.85 && flat(n).position === 'absolute')!;
    const zlozony = zloz(flat(pasek).backgroundColor as string, 0.85, p.surface!);
    expect({ pasekSurface: kontrast(zlozony, p.surface!) >= 3, onFelt: kontrast(p.onFelt!, zlozony) >= 4.5, kropka: kontrast(p.ink!, zlozony) >= 3 }).toEqual({ pasekSurface: true, onFelt: true, kropka: true });
  });
});
