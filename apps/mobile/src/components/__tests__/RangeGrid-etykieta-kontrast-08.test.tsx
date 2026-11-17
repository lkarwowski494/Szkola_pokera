/// <reference types="jest" />
/// <reference types="node" />
// M2-koordynator-napraw-006 (KO-131): etykieta ręki (8 pt) w siatce lekcji i w siatce malowania ma kontrast >= 4,5:1
// do tła, na którym leży, w czterech wariantach palety (light, dark, lightHigh, darkHigh).
// Reguła dla pól częściowych RangeGrid (pasek od lewej, szerokość = częstość, etykieta na środku):
//   pokrycie >= 0,85: etykieta na suknie (onFelt); w pozostałych polach ink (pole puste i pośrednie).
// Pola pośrednie (0,15 < pokrycie < 0,85): tekst leży na zieleni i na `surface` naraz, jeden kolor nie da 4,5:1 na obu tłach;
// gwarancja dla nich: >= 3:1 do obu teł (ink), otwarte dla roli 04 (wynik.md, „Pola pośrednie”).
import '@/i18n';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { HAND_CLASSES } from '@szkola/poker-core';
import { RangeGrid } from '@/components/RangeGrid';
import { PaintGrid } from '@/components/PaintGrid';
import type { PaintCell } from '@/features/drills/grade';
import { sciezkaTresciPl } from '@/test-utils/trescPl';
import type { RangeSpot } from '@/data/content/repo';
import { kolory } from '@/theme/tokeny';
import { kontrast, zloz } from '@/test-utils/kontrast';

// Wariant palety sterowany z testu: useTokens zwraca paletę z `mockWariant`.
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

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');

const WARIANTY = ['light', 'dark', 'lightHigh', 'darkHigh'] as const;
type W = (typeof WARIANTY)[number];
const pal = (w: W) => kolory[w] as Record<string, string>;

type N = { type?: string; props?: { style?: unknown }; children?: (N | string)[] | null };
const flat = (n: N) => StyleSheet.flatten(n.props?.style as never) as Record<string, unknown>;
const tekst = (n: N | string) => (typeof n === 'string' ? n : (n.children ?? []).filter((c): c is string => typeof c === 'string').join(''));

/** Pola siatki: komórka (View ze stylem tła lub z paskami) z etykietą ręki. Zwraca kolor etykiety i komórkę. */
function pola(drzewo: unknown): Map<string, { kolor: string; komorka: N }> {
  const wynik = new Map<string, { kolor: string; komorka: N }>();
  const przejdz = (n: N | string | null | undefined): void => {
    if (!n || typeof n === 'string') return;
    const dzieci = (n.children ?? []).filter((c): c is N => typeof c === 'object' && c !== null);
    const et = dzieci.find((c) => c.type === 'Text' && HAND_CLASSES.includes(tekst(c) as never));
    if (et) wynik.set(tekst(et), { kolor: flat(et).color as string, komorka: n });
    dzieci.forEach(przejdz);
  };
  przejdz(drzewo as N);
  return wynik;
}

const spotBase = { id: 'x', title: 'Tytuł', hero: 'BB', path: '', playPercent: 0.4 };
const spotZPokryciem = (freqs: Record<string, number>): RangeSpot => ({
  ...spotBase,
  groups: [{ name: 'Przebicie', freqs: HAND_CLASSES.map((h) => freqs[h] ?? 0) }],
});

describe('RangeGrid: kontrast etykiety ręki do tła pola (M2-koordynator-napraw-006)', () => {
  it.each(WARIANTY)('%s: pole puste: etykieta ≥ 4,5:1 do surface; pole pełne (pokrycie 1 i 0,85): ≥ 4,5:1 do felt1 z kryciem 0,85 na surface', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const { toJSON } = await render(<RangeGrid spot={spotZPokryciem({ AA: 1, KK: 0.85, QQ: 0.9 })} />);
    const m = pola(toJSON());
    const sukno = zloz(p.felt1!, 0.85, p.surface!);
    expect({ pole: 'puste 72o', r: kontrast(m.get('72o')!.kolor, p.surface!) >= 4.5 }).toEqual({ pole: 'puste 72o', r: true });
    for (const h of ['AA', 'KK', 'QQ']) {
      expect({ pole: h, r: Number(kontrast(m.get(h)!.kolor, sukno).toFixed(2)) >= 4.5 }).toEqual({ pole: h, r: true });
    }
  });

  it.each(WARIANTY)('%s: próg zmiany koloru etykiety: pokrycie 0,84 → ink, 0,85 → onFelt', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const { toJSON } = await render(<RangeGrid spot={spotZPokryciem({ AA: 0.84, KK: 0.85 })} />);
    const m = pola(toJSON());
    expect(m.get('AA')!.kolor).toBe(p.ink);
    expect(m.get('KK')!.kolor).toBe(p.onFelt);
  });

  it.each(WARIANTY)('%s: pola pośrednie (0,15 < pokrycie < 0,85): etykieta ≥ 3:1 do obu teł naraz (zieleń i surface)', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const { toJSON } = await render(<RangeGrid spot={spotZPokryciem({ AA: 0.2, KK: 0.5, QQ: 0.84 })} />);
    const m = pola(toJSON());
    const sukno = zloz(p.felt1!, 0.85, p.surface!);
    for (const h of ['AA', 'KK', 'QQ']) {
      const k = m.get(h)!.kolor;
      expect({ pole: h, naSuknie: kontrast(k, sukno) >= 3, naSurface: kontrast(k, p.surface!) >= 3 }).toEqual({ pole: h, naSuknie: true, naSurface: true });
    }
  });

  it.each(WARIANTY)('%s: znak „•” zostaje ≥ 3:1 do surface i do sukna (stoi w rogu, poza środkiem etykiety)', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const { toJSON } = await render(<RangeGrid spot={{ ...spotZPokryciem({ AA: 1, KK: 0.5 }), uncertain: ['AA', 'KK', '72o'] }} />);
    const znaki: string[] = [];
    const przejdz = (n: N | string | null | undefined): void => {
      if (!n || typeof n === 'string') return;
      const dzieci = (n.children ?? []).filter((c): c is N => typeof c === 'object' && c !== null);
      for (const d of dzieci) if (tekst(d) === '•') znaki.push(flat(d).color as string);
      dzieci.forEach(przejdz);
    };
    przejdz(toJSON() as N);
    expect(znaki).toHaveLength(3);
    const sukno = zloz(p.felt1!, 0.85, p.surface!);
    for (const k of znaki) {
      expect(kontrast(k, sukno)).toBeGreaterThanOrEqual(3);
      expect(kontrast(k, p.surface!)).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('PaintGrid: kontrast etykiety ręki do tła pola we wszystkich stanach (M2-koordynator-napraw-006)', () => {
  const stany: { nazwa: string; painted: boolean; cell: PaintCell | null }[] = [
    { nazwa: 'ćwiczenie, pole niepomalowane', painted: false, cell: null },
    { nazwa: 'ćwiczenie, pole pomalowane', painted: true, cell: null },
    { nazwa: 'ocena: trafione (hit)', painted: true, cell: 'hit' },
    { nazwa: 'ocena: brakujące (miss)', painted: false, cell: 'miss' },
    { nazwa: 'ocena: nadmiarowe (extra)', painted: true, cell: 'extra' },
    { nazwa: 'ocena: mieszane niepomalowane', painted: false, cell: 'mixed' },
    { nazwa: 'ocena: mieszane pomalowane', painted: true, cell: 'mixed' },
    { nazwa: 'ocena: poza zakresem (none)', painted: false, cell: 'none' },
  ];
  it.each(WARIANTY)('%s: etykieta ≥ 4,5:1 do tła pola w każdym stanie', async (w) => {
    mockWariant.w = w;
    const za_niskie: string[] = [];
    for (const s of stany) {
      const painted = HAND_CLASSES.map((h) => h === 'AKs' && s.painted);
      const result = s.cell ? HAND_CLASSES.map((h) => (h === 'AKs' ? s.cell! : 'none')) : undefined;
      const { toJSON, unmount } = await render(<PaintGrid painted={painted} result={result} />);
      const e = pola(toJSON()).get('AKs')!;
      const tlo = flat(e.komorka).backgroundColor as string;
      const r = kontrast(e.kolor, tlo);
      if (r < 4.5) za_niskie.push(`${s.nazwa}: ${r.toFixed(2)}`);
      await unmount();
    }
    expect(za_niskie).toEqual([]);
  });
});

describe('RangeGrid na treści pl: pola pośrednie i kontrast etykiet', () => {
  const db = new DatabaseSync(sciezkaTresciPl(), { readOnly: true });
  const spoty = (db.prepare('SELECT id, title, hero, path, play_percent, groups, uncertain FROM ranges').all() as {
    id: string; title: string; hero: string; path: string; play_percent: number; groups: string; uncertain: string;
  }[]).map((r): RangeSpot => ({ id: r.id, title: r.title, hero: r.hero, path: r.path, playPercent: r.play_percent, groups: JSON.parse(r.groups), uncertain: JSON.parse(r.uncertain) }));

  it('założenie reguły: każdy spot pl ma jedną grupę akcji (kolory grup 2 i 3 nie spełniają 4,5:1 z żadną etykietą)', () => {
    expect(spoty.filter((s) => s.groups.length !== 1).map((s) => s.id)).toEqual([]);
  });

  it('liczba pól pośrednich w treści pl (do rozstrzygnięcia roli 04)', () => {
    let pary = 0, puste = 0, pelne = 0, posrednie = 0, wezsze = 0;
    const klasy = new Set<string>(), klasyWezsze = new Set<string>();
    const spotyZPosrednimi = new Set<string>();
    for (const s of spoty) {
      HAND_CLASSES.forEach((h, i) => {
        const f = s.groups[0]!.freqs[i] ?? 0;
        pary++;
        if (f <= 0.15) puste++;
        else if (f >= 0.85) pelne++;
        else { posrednie++; klasy.add(h); spotyZPosrednimi.add(s.id); }
        if (f > 0.25 && f < 0.75) { wezsze++; klasyWezsze.add(h); }
      });
    }
    console.log(`pola (spot×klasa): ${pary}; puste (≤0,15): ${puste}; pełne (≥0,85): ${pelne}; pośrednie (0,15–0,85): ${posrednie} w ${spotyZPosrednimi.size} z ${spoty.length} spotów, ${klasy.size} różnych klas; węższy przedział (0,25–0,75): ${wezsze} pól, ${klasyWezsze.size} klas`);
    expect(puste + pelne + posrednie).toBe(pary);
  });

  it.each(WARIANTY)('%s: na treści pl każde pole puste i pełne ma etykietę ≥ 4,5:1 do swojego tła', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const sukno = zloz(p.felt1!, 0.85, p.surface!);
    const za_niskie: string[] = [];
    for (const s of spoty) {
      const { toJSON, unmount } = await render(<RangeGrid spot={s} />);
      const m = pola(toJSON());
      HAND_CLASSES.forEach((h, i) => {
        const f = s.groups[0]!.freqs[i] ?? 0;
        if (f > 0.15 && f < 0.85) return;
        const r = kontrast(m.get(h)!.kolor, f >= 0.85 ? sukno : p.surface!);
        if (r < 4.5) za_niskie.push(`${s.id}/${h}: ${r.toFixed(2)}`);
      });
      await unmount();
    }
    expect(za_niskie.slice(0, 5)).toEqual([]);
  });
});
