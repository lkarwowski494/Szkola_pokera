/// <reference types="jest" />
/// <reference types="node" />
/**
 * Sesja BQ (rola 06 fix), znalezisko 06-tresci-001 (recenzja BP), decyzja koordynatora KO-048: nowe brzmienie
 * R-M3-012 `because`. Rachunek (szczebel 1) mówi: gdy obie ręce są w różnych kolorach, ręka zdominowana wygrywa
 * rzadziej niż ręka, która ją dominuje (dokładnie, maksimum 0,4738 dla Ah2c wobec As3h, wszystkie sąsiednie kickery
 * i 5 układów kolorów: `docs/tresci/dowody/bq-001-equity.txt`); ręka zdominowana w kolorze bywa z nią mniej więcej na
 * równi (A2s wobec A3o: 0,5009). Treść ma mówić oba zdania w każdym języku; przykład A2s/A3o jest w zapisie rąk,
 * więc ten sam w 12 językach.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { handEquity, parseCard } from '@szkola/poker-core';

const CONTENT = join(__dirname, '../../../../../../content');
const dokladnie = (a: string, b: string) =>
  handEquity([[parseCard(a.slice(0, 2)), parseCard(a.slice(2, 4))], [parseCard(b.slice(0, 2)), parseCard(b.slice(2, 4))]], [], { exactLimit: 2_000_000 });

/** Pole `because` reguły `id` z content/<język>/rules.yaml (pole w jednej linii, w cudzysłowie). */
const because = (lang: string, id: string): string => {
  const blok = readFileSync(join(CONTENT, lang, 'rules.yaml'), 'utf8').split(/\n- id: /).find((b) => b.startsWith(`${id}\n`));
  return blok?.match(/\n {2}because: "(.*)"\n/)?.[1] ?? '';
};
const JEZYKI = readdirSync(CONTENT).filter((d) => {
  try {
    return readFileSync(join(CONTENT, d, 'rules.yaml'), 'utf8').length > 0;
  } catch {
    return false;
  }
});

describe('06-tresci-001 (BQ, KO-048): R-M3-012 zawężone do rąk w różnych kolorach, z zastrzeżeniem dla ręki w kolorze', () => {
  it('rachunek: w różnych kolorach ręka zdominowana wygrywa rzadziej (najbliższe przypadki, dokładnie)', () => {
    for (const [a, b] of [['Ah2c', 'As3h'], ['Ah3c', 'As4h'], ['Th2c', 'Ts3h'], ['Ah2c', 'As3d']]) {
      const e = dokladnie(a!, b!);
      expect(e.exact).toBe(true);
      expect([a, b, e.win[0]! < e.win[1]!]).toEqual([a, b, true]);
    }
  });

  it('rachunek: przykład z treści (A2s wobec A3o) jest mniej więcej na równi (|equity − 0,5| < 0,01)', () => {
    const e = dokladnie('As2s', 'Ad3c');
    expect(e.exact).toBe(true);
    expect(Math.abs(e.equity[0]! - 0.5)).toBeLessThan(0.01);
  });

  it('treść w każdym języku podaje przykład ręki w kolorze (A2s wobec A3o)', () => {
    expect(JEZYKI.length).toBe(12);
    for (const l of JEZYKI) {
      const b = because(l, 'R-M3-012');
      expect([l, b.length > 0, b.includes('A2s'), b.includes('A3o')]).toEqual([l, true, true, true]);
    }
  });

  it('treść polska: twierdzenie dotyczy rąk w różnych kolorach, ręka w kolorze bywa na równi', () => {
    const b = because('pl', 'R-M3-012');
    expect(b).toMatch(/gdy obie ręce są w różnych kolorach, ręka zdominowana wygrywa/);
    expect(b).toMatch(/w kolorze bywa z nią mniej więcej na równi/);
  });
});
