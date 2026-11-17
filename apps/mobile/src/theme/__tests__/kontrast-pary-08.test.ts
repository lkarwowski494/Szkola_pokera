// M1-audytor-generalny-067 / 068 (04-studio-projektowe-001, -002): trwała kontrola kontrastu par tokenów w CI
// we wszystkich czterech wariantach (light, dark, lightHigh, darkHigh). Wzory WCAG 2.x jak w docs/design/narzedzia/kontrast.mjs.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as tokeny from '../tokeny';
import { przejscioweCiemne, przejscioweJasne } from '../tokens';
import { kontrast, zloz } from '@/test-utils/kontrast';

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

// M2-koordynator-napraw-006 (KO-131): etykieta ręki (8 pt) w PaintGrid: tekst, więc próg 4,5 do każdego tła pola (labelColor/cellStyle).
describe('etykieta ręki w PaintGrid: próg 4,5 do tła pola (4 warianty)', () => {
  it.each(WARIANTY)('%s: ink na surface, primaryInk na primaryBg, primaryInk na good, ink na badSoft, warnSoft i feltSoft', (w) => {
    const p = paleta(w);
    const pr = przejsciowe[w];
    const pary: [string, string, string][] = [
      ['niepomalowane / none: ink na surface', p.ink!, p.surface!],
      ['pomalowane i mieszane pomalowane: primaryInk na primaryBg', p.primaryInk!, p.primaryBg!],
      ['trafione: primaryInk na good', p.primaryInk!, pr.good],
      ['brakujące: ink na badSoft', p.ink!, pr.badSoft],
      ['nadmiarowe: ink na warnSoft', p.ink!, pr.warnSoft],
      ['mieszane niepomalowane: ink na feltSoft', p.ink!, pr.feltSoft],
    ];
    const za_niskie = pary.map(([n, fg, bg]) => ({ n, r: kontrast(fg, bg) })).filter((x) => x.r < 4.5).map((x) => `${x.n}: ${x.r.toFixed(2)} < 4.5`);
    expect(za_niskie).toEqual([]);
  });
});
