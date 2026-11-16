// HT HR-003 (08-programista-003): własny ewaluator wyroczni KO-111 (`ocena-reki-wyrocznia.ts`) zgodny z ewaluatorem silnika na losowych rękach 7 kart
// (ten sam porządek: tylko tu wolno importować `strength`), a plik wyroczni nie importuje ewaluatora silnika.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FULL_DECK, makeCard, strength, type Card } from '@szkola/poker-core';
import { mocReki, silaReki } from './ocena-reki-wyrocznia';

function los(ziarno: number): () => number {
  let s = ziarno >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 2 ** 32; };
}
function rece(rng: () => number, n: number): Card[] {
  const t = [...FULL_DECK];
  for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [t[i], t[j]] = [t[j]!, t[i]!]; }
  return t.slice(0, n);
}

describe('HT HR-003: ewaluator wyroczni = porządek ewaluatora silnika', () => {
  it('20 000 par rąk 7-kartowych: ten sam wynik porównania (silniejsza / słabsza / remis)', () => {
    const rng = los(20261116);
    for (let i = 0; i < 20_000; i++) {
      const d = rece(rng, 9), stol = d.slice(0, 5);
      const a = [...d.slice(5, 7), ...stol], b = [...d.slice(7, 9), ...stol];
      expect(Math.sign(silaReki(a) - silaReki(b)), `${a} vs ${b}`).toBe(Math.sign(strength(a) - strength(b)));
    }
  });
  it('wyjątki: koło < strit do szóstki, strit kolorowy > kareta, full z dwiema trójkami, trzecia para jako kicker', () => {
    const R = '23456789TJQKA';
    const h = (s: string): Card[] => s.split(' ').map((x) => makeCard(R.indexOf(x[0]!), 'cdhs'.indexOf(x[1]!)));
    const kola = h('Ac 2d 3h 4s 5c 9d Kd'), szostka = h('2c 3d 4h 5s 6c 9d Kd');
    expect(mocReki(szostka)).toBeGreaterThan(mocReki(kola));
    expect(mocReki(h('5h 6h 7h 8h 9h Ac Ad'))).toBeGreaterThan(mocReki(h('9c 9d 9h 9s Ac Ad Kd')));
    expect(mocReki(h('Ac Ad Ah Kc Kd Kh 2c'))).toBe(mocReki(h('Ac Ad Ah Kc Kd 2s 3s')));
    expect(mocReki(h('Ac Ad Kc Kd Qc Qd 2h'))).toBeGreaterThan(mocReki(h('Ac Ad Kc Kd 2h 3s 4d')));
    expect(mocReki(h('Ac Ad Kc Kd Qc Qd 2h'))).toBe(mocReki(h('Ac Ad Kc Kd Qs 9h 2h')));
  });
  it('plik wyroczni nie importuje ewaluatora silnika', () => {
    const tekst = readFileSync(join(import.meta.dirname, 'wyrocznie-ho.ts'), 'utf8');
    expect(tekst).not.toMatch(/\bstrength\b/);
  });
});
