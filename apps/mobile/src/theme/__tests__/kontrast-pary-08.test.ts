// M1-audytor-generalny-067 / 068 (04-studio-projektowe-001, -002): trwała kontrola kontrastu par tokenów w CI
// we wszystkich czterech wariantach (light, dark, lightHigh, darkHigh). Wzory WCAG 2.x jak w docs/design/narzedzia/kontrast.mjs.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as tokeny from '../tokeny';
import { przejscioweCiemne, przejscioweJasne } from '../tokens';

const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const rgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1, 7), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};
const lum = (hex: string) => {
  const [r, g, b] = rgb(hex);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
export const kontrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x! + 0.05) / (y! + 0.05);
};
/** Kolor wynikowy: `tlo` z kryciem `krycie` nałożone na `podTlem` (sRGB, zaokrąglenie do 8 bitów jak w CSS). */
export const zloz = (tlo: string, krycie: number, podTlem: string) => {
  const a = rgb(tlo);
  const b = rgb(podTlem);
  return '#' + a.map((c, i) => Math.round(krycie * c + (1 - krycie) * b[i]!).toString(16).padStart(2, '0')).join('');
};

const WARIANTY = ['light', 'dark', 'lightHigh', 'darkHigh'] as const;
const przejsciowe = { light: przejscioweJasne, lightHigh: przejscioweJasne, dark: przejscioweCiemne, darkHigh: przejscioweCiemne } as const;
const paleta = (w: (typeof WARIANTY)[number]) => tokeny.kolory[w] as Record<string, string>;

describe('kontrast par tokenów (4 warianty)', () => {
  it.each(WARIANTY)('%s: każda para z `pary` spełnia swój próg', (w) => {
    const p = paleta(w);
    const za_niskie = Object.entries(tokeny.pary)
      .map(([nazwa, [fg, bg, min]]) => ({ nazwa, r: kontrast(p[fg]!, p[bg]!), min }))
      .filter((x) => x.r < x.min)
      .map((x) => `${x.nazwa}: ${x.r.toFixed(2)} < ${x.min}`);
    expect(za_niskie).toEqual([]);
  });

  it.each(WARIANTY)('%s: pary złożone (tło z kryciem) spełniają próg', (w) => {
    const p = paleta(w);
    const za_niskie = Object.entries(tokeny.paryZlozone)
      .map(([nazwa, z]) => ({ nazwa, r: kontrast(p[z.fg]!, zloz(p[z.tlo]!, z.krycie, p[z.podTlem]!)), min: z.prog }))
      .filter((x) => x.r < x.min)
      .map((x) => `${x.nazwa}: ${x.r.toFixed(2)} < ${x.min}`);
    expect(za_niskie).toEqual([]);
  });

  it('krycie pola w zakresie w paryZlozone = opacity w RangeGrid.tsx (jedno źródło wartości)', () => {
    const kod = readFileSync(join(__dirname, '../../components/RangeGrid.tsx'), 'utf8');
    expect(kod).toContain(`opacity: ${tokeny.paryZlozone['znak klasy niepewnej na polu w zakresie']!.krycie}`);
  });

  // Pary 2–4 z zadań 067 i 068: znak = kolor etykiety ręki w danym polu (RangeGrid: ink, PaintGrid: labelColor)
  it.each(WARIANTY)('%s: znak na pustym polu siatki (ink na surface) ≥ 3', (w) => {
    const p = paleta(w);
    expect(kontrast(p.ink!, p.surface!)).toBeGreaterThanOrEqual(3);
  });

  it.each(WARIANTY)('%s: znak „mieszana” na pomalowanym polu (primaryInk na primaryBg) ≥ 3', (w) => {
    const p = paleta(w);
    expect(kontrast(p.primaryInk!, p.primaryBg!)).toBeGreaterThanOrEqual(3);
  });

  it.each(WARIANTY)('%s: znak „mieszana” na niepomalowanym polu mieszanym (ink na przejsciowe.feltSoft) ≥ 3', (w) => {
    expect(kontrast(paleta(w).ink!, przejsciowe[w].feltSoft)).toBeGreaterThanOrEqual(3);
  });
});
