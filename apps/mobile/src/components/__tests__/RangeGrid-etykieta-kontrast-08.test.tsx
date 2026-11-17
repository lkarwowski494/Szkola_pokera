/// <reference types="jest" />
/// <reference types="node" />
// M2-koordynator-napraw-006 (KO-131): etykieta ręki (8 pt) w siatce lekcji i w siatce malowania ma kontrast >= 4,5:1
// do tła, na którym leży, w czterech wariantach palety (light, dark, lightHigh, darkHigh).
// Reguła RangeGrid (KO-132, D-2020; wynik roli 04, sekcja 2.1–2.2; zastępuje progu 0,85 z KO-131): pole w pełni zielone (pierwsza grupa = 1):
//   etykieta onFelt na suknie, bez podkładki; każde inne pole: etykieta ink na podkładce surface (>= 4,5:1).
import '@/i18n';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { HAND_CLASSES } from '@szkola/poker-core';
import { RangeGrid } from '@/components/RangeGrid';
import { PaintGrid } from '@/components/PaintGrid';
import type { PaintCell } from '@/features/drills/grade';
import { sciezkaTresciPl } from '@/test-utils/trescPl';
import type { RangeSpot } from '@/data/content/repo';
import { kolory, siatka } from '@/theme/tokeny';
import { przejscioweCiemne, przejscioweJasne } from '@/theme/tokens';
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

/** Kropki klasy niepewnej: małe `View` (koło `siatka.znakSrednica`), nie znak tekstowy. */
function kropki(drzewo: unknown): N[] {
  const wynik: N[] = [];
  const przejdz = (n: N | string | null | undefined): void => {
    if (!n || typeof n === 'string') return;
    if (n.type === 'View' && (n.props as { testID?: string } | undefined)?.testID?.startsWith('kropka-')) wynik.push(n);
    (n.children ?? []).forEach(przejdz);
  };
  przejdz(drzewo as N);
  return wynik;
}

const spotBase = { id: 'x', title: 'Tytuł', hero: 'BB', path: '', playPercent: 0.4 };
const spotZPokryciem = (freqs: Record<string, number>): RangeSpot => ({
  ...spotBase,
  groups: [{ name: 'Przebicie', freqs: HAND_CLASSES.map((h) => freqs[h] ?? 0) }],
});

/** Tło, na którym leży etykieta: podkładka (View z `backgroundColor`) albo, bez niej, sukno pola pełnego. */
const tloEtykiety = (komorka: N, sukno: string) => (flat(komorka).backgroundColor as string | undefined) ?? sukno;

// KO-132 / D-2020 (wynik roli 04, sekcja 2.1–2.2): `onFelt` tylko na polu w pełni zielonym (pierwsza grupa = 1), w pozostałych `ink` na podkładce `surface`.
describe('RangeGrid: kontrast etykiety ręki do tła pola (M2-koordynator-napraw-006, KO-132)', () => {
  it.each(WARIANTY)('%s: pole pełne (f = 1): onFelt na sukni, bez podkładki, ≥ 4,5:1 do felt1 z kryciem 0,85 na surface', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const { toJSON } = await render(<RangeGrid spot={spotZPokryciem({ AA: 1, KK: 1 })} />);
    const m = pola(toJSON());
    const sukno = zloz(p.felt1!, 0.85, p.surface!);
    for (const h of ['AA', 'KK']) {
      expect({ pole: h, kolor: m.get(h)!.kolor, podkladka: flat(m.get(h)!.komorka).backgroundColor }).toEqual({ pole: h, kolor: p.onFelt, podkladka: undefined });
      expect({ pole: h, r: Number(kontrast(m.get(h)!.kolor, tloEtykiety(m.get(h)!.komorka, sukno)).toFixed(2)) >= 4.5 }).toEqual({ pole: h, r: true });
    }
  });

  it.each(WARIANTY)('%s: pola f ∈ {0; 0,001; 0,15; 0,5; 0,85; 0,999}: ink na podkładce surface, ≥ 4,5:1 do tła, na którym leży', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const f: Record<string, number> = { '72o': 0, AA: 0.001, KK: 0.15, QQ: 0.5, JJ: 0.85, TT: 0.999 };
    const { toJSON } = await render(<RangeGrid spot={spotZPokryciem(f)} />);
    const m = pola(toJSON());
    const sukno = zloz(p.felt1!, 0.85, p.surface!);
    for (const h of Object.keys(f)) {
      const { kolor, komorka } = m.get(h)!;
      expect({ pole: h, kolor, podkladka: flat(komorka).backgroundColor }).toEqual({ pole: h, kolor: p.ink, podkladka: p.surface });
      expect({ pole: h, r: kontrast(kolor, tloEtykiety(komorka, sukno)) >= 4.5 }).toEqual({ pole: h, r: true });
    }
  });

  it.each(WARIANTY)('%s: próg zmiany koloru etykiety: f = 0,999 → ink na podkładce, f = 1 → onFelt bez podkładki', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const { toJSON } = await render(<RangeGrid spot={spotZPokryciem({ AA: 0.999, KK: 1 })} />);
    const m = pola(toJSON());
    expect(m.get('AA')!.kolor).toBe(p.ink);
    expect(flat(m.get('AA')!.komorka).backgroundColor).toBe(p.surface);
    expect(m.get('KK')!.kolor).toBe(p.onFelt);
    expect(flat(m.get('KK')!.komorka).backgroundColor).toBeUndefined();
  });

  it.each(WARIANTY)('%s: podkładka: poziomy margines 1 pt (siatka.podkladkaPoziom), bez promienia i pionowego marginesu, maxWidth = pole − 2', async (w) => {
    mockWariant.w = w;
    const { toJSON } = await render(<RangeGrid spot={spotZPokryciem({ KK: 0.5 })} />);
    const st = flat(pola(toJSON()).get('KK')!.komorka);
    expect(st.paddingHorizontal).toBe(siatka.podkladkaPoziom);
    expect(st.borderRadius).toBeUndefined();
    expect(st.paddingVertical).toBeUndefined();
    expect(typeof st.maxWidth).toBe('number');
  });

  it.each(WARIANTY)('%s: kropka klasy niepewnej: View 3 × 3 (koło), top/right 1, kolor ink; ≥ 3:1 do surface i do sukna', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const { toJSON } = await render(<RangeGrid spot={{ ...spotZPokryciem({ AA: 1, KK: 0.5 }), uncertain: ['AA', 'KK', '72o'] }} />);
    const znaki = kropki(toJSON());
    expect(znaki).toHaveLength(3);
    const sukno = zloz(p.felt1!, 0.85, p.surface!);
    for (const k of znaki) {
      expect(k.type).toBe('View');
      const st = flat(k);
      expect({ width: st.width, height: st.height, borderRadius: st.borderRadius, position: st.position, top: st.top, right: st.right, bg: st.backgroundColor }).toEqual({
        width: siatka.znakSrednica, height: siatka.znakSrednica, borderRadius: siatka.znakSrednica / 2, position: 'absolute', top: siatka.znakOdstep, right: siatka.znakOdstep, bg: p.ink,
      });
      expect(kontrast(st.backgroundColor as string, sukno)).toBeGreaterThanOrEqual(3);
      expect(kontrast(st.backgroundColor as string, p.surface!)).toBeGreaterThanOrEqual(3);
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

  // Strażnik grup 2 i 3 (wynik roli 04, 2.5 pkt 5): kolor grupy g to `colors[g]` z RangeGrid (felt1, przejsciowe.warn, cardBlue).
  // Etykieta zawsze leży na podkładce (ink na surface), ale kropka klasy niepewnej może leżeć na pasku grupy g.
  it.each(WARIANTY)('%s: każdy spot pl ma jedną grupę albo kropka ink ma ≥ 3:1 do paska każdej grupy g ≥ 2 (krycie 0,85 na surface)', (w) => {
    const p = pal(w);
    const przej = w === 'dark' || w === 'darkHigh' ? przejscioweCiemne : przejscioweJasne;
    const kolorGrupy = [p.felt1!, przej.warn, p.cardBlue!];
    const za_niskie: string[] = [];
    for (const s of spoty) {
      s.groups.forEach((_, g) => {
        if (g === 0) return;
        const r = kontrast(p.ink!, zloz(kolorGrupy[g % kolorGrupy.length]!, 0.85, p.surface!));
        if (r < 3) za_niskie.push(`${s.id}/grupa ${g + 1}: ${r.toFixed(2)}`);
      });
    }
    expect(za_niskie).toEqual([]);
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

  it.each(WARIANTY)('%s: na treści pl każde pole ma etykietę ≥ 4,5:1 do tła, na którym leży (pełne: onFelt na suknie, pozostałe: ink na podkładce)', async (w) => {
    mockWariant.w = w;
    const p = pal(w);
    const sukno = zloz(p.felt1!, 0.85, p.surface!);
    const za_niskie: string[] = [];
    for (const s of spoty) {
      const { toJSON, unmount } = await render(<RangeGrid spot={s} />);
      const m = pola(toJSON());
      HAND_CLASSES.forEach((h, i) => {
        const f = s.groups[0]!.freqs[i] ?? 0;
        const { kolor, komorka } = m.get(h)!;
        if ((f >= 1) !== (kolor === p.onFelt)) za_niskie.push(`${s.id}/${h}: kolor ${kolor} dla f=${f}`);
        const r = kontrast(kolor, tloEtykiety(komorka, sukno));
        if (r < 4.5) za_niskie.push(`${s.id}/${h}: ${r.toFixed(2)}`);
      });
      await unmount();
    }
    expect(za_niskie.slice(0, 5)).toEqual([]);
  });
});
