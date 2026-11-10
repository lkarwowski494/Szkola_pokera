/// <reference types="jest" />
/// <reference types="node" />
/**
 * KO-040, recenzja BK 06-tresci-002 (sesja BN, rola 06): żadne wyjaśnienie decyzji zakresu nie składa się wyłącznie
 * z „ręka jest w zakresie / poza zakresem” i częstości solvera. Sprawdzamy każdy spot z bazy pl i każdą klasę ręki
 * (bez klas niepewnych): po zdaniu zagrania stoi zdanie powodu (reguła spotu albo klasa ręki), zanim padną częstości.
 */
import { combosCount, HAND_CLASSES } from '@szkola/poker-core';
import type { RangeSpot } from '@/data/content/repo';
import { sciezkaTresciPl } from '@/test-utils/trescPl';
import { t } from '../text';
import { MIXED_HIGH } from '../thresholds';
import { RANGE_REASON } from '../range-reasons';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
const db = new DatabaseSync(sciezkaTresciPl(), { readOnly: true });
const spots: RangeSpot[] = (
  db.prepare('SELECT id, title, hero, path, play_percent, groups, uncertain FROM ranges').all() as {
    id: string; title: string; hero: string; path: string; play_percent: number; groups: string; uncertain: string;
  }[]
).map((x) => ({ id: x.id, title: x.title, hero: x.hero, path: x.path, playPercent: x.play_percent, groups: JSON.parse(x.groups), uncertain: JSON.parse(x.uncertain) }));

/**
 * Wyjątki nazwane (spot:klasa), w których żadna cecha ręki z potwierdzonym twierdzeniem nie wspiera decyzji: zostaje
 * dotychczasowe wyjaśnienie, a para trafia do otwartych pytań (`docs/tresci/stan-bn.md`, `docs/tresci/stan-bq.md`).
 * Stan 2026-11-10 (sesja BQ, 06-tresci-002): dwie wysokie karty w różnych kolorach poza zakresem. R-M3-012 wyłącza je
 * z „ręki zdominowanej” (warunek reguły), a przeczytanego źródła innego powodu ich słabości w tych spotach brak (otwarte).
 */
const WYJATKI_BEZ_POWODU: readonly string[] = [
  'nine.rfi.hj:JTo',
  'nine.rfi.hj:QJo',
  'nine.vs-open.btn-vs-co:JTo',
  'nine.vs-open.btn-vs-co:KTo',
  'nine.vs-open.btn-vs-co:QJo',
  'nine.vs-open.btn-vs-co:QTo',
  'nine.vs-open.sb-vs-btn:JTo',
  'nine.vs-open.sb-vs-btn:KTo',
  'nine.vs-open.sb-vs-btn:QJo',
  'rfi.hj:JTo',
  'rfi.hj:QJo',
  'vs-open.btn-vs-co:JTo',
  'vs-open.btn-vs-co:KTo',
  'vs-open.btn-vs-co:QJo',
  'vs-open.btn-vs-co:QTo',
  'vs-open.sb-vs-btn:JTo',
  'vs-open.sb-vs-btn:KTo',
  'vs-open.sb-vs-btn:QJo',
];

/** Tekst między zdaniem zagrania („…w zakresie.”, „…poza zakresem.”) a częstościami solvera. */
const powod = (e: string): string => {
  const m = e.match(/(?:mieści się w zakresie|jest poza zakresem)(?: \([^)]*\))?\.\s*(.*?)\s*Częstości solvera/);
  return m ? m[1]!.trim() : '';
};

describe('KO-040 / BK 06-tresci-002: powód decyzji zakresu w każdym spocie i każdej klasie', () => {
  it('baza ma wszystkie spoty z mapą powodów', () => {
    expect(spots.length).toBeGreaterThan(30);
    expect(spots.filter((s) => !RANGE_REASON[s.id]).map((s) => s.id)).toEqual([]);
  });

  it('wyjaśnienie ręki w zakresie i poza nim ma zdanie powodu (poza wyjątkami nazwanymi)', () => {
    const bez: string[] = [];
    let n = 0;
    for (const spot of spots) {
      const unc = new Set(spot.uncertain ?? []);
      HAND_CLASSES.forEach((hc, h) => {
        if (unc.has(hc)) return;
        const play = spot.groups.reduce((s, g) => s + (g.freqs[h] ?? 0), 0);
        const freqs = [...spot.groups.map((g) => ({ name: g.name, f: g.freqs[h] ?? 0 })), { name: t.range.fold, f: Math.max(0, 1 - play) }];
        const best = Math.max(...freqs.map((f) => f.f));
        if (best < MIXED_HIGH) return; // ręka na granicy: powód spotu jest zawsze (test w wyjasnienia-ko040.test.ts)
        const status = freqs[freqs.length - 1]!.f === best ? 'out' : 'in';
        const bestPlay = freqs.slice(0, -1).reduce((a, b) => (b.f > a.f ? b : a));
        const e = t.range.explanation(hc, freqs, false, { title: spot.title, spot: spot.id, status, action: bestPlay.name });
        n++;
        if (powod(e).length < 20 && !WYJATKI_BEZ_POWODU.includes(`${spot.id}:${hc}`)) bez.push(`${spot.id}:${hc}:${status}`);
        // ta sama ręka w opcji: „Tak: …” albo „Za luźno/ciasno: …” też z powodem
        const why = t.range.right(best, status, spot.id, hc);
        if (why.split('. ').length < 3 && !WYJATKI_BEZ_POWODU.includes(`${spot.id}:${hc}`)) bez.push(`opcja ${spot.id}:${hc}`);
      });
    }
    expect(n).toBeGreaterThan(5000);
    expect(bez.slice(0, 20)).toEqual([]);
  });

  it('każdy wyjątek nazwany istnieje w bazie (lista nie zawiera pozycji martwych)', () => {
    const ids = new Set(spots.map((s) => s.id));
    for (const w of WYJATKI_BEZ_POWODU) expect(ids.has(w.split(':')[0]!)).toBe(true);
    expect(combosCount('AA')).toBe(6);
  });
});
