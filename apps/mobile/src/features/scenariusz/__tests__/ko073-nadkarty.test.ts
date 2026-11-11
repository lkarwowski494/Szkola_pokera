/// <reference types="jest" />
// KO-073 (D-1115): zdanie o nadkartach w wyjaśnieniu draw-call tylko, gdy gracz ma kartę wyższą od stołu (jedna definicja z liczbami).
import { generateVariant, overcardOutsAt, parseCards, type ScenarioVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { naGenerator, bloki, warunkiWariantu, widokDecyzji } from '../wariant';
import { SC01 } from '@/test-utils/szablonSc01';

const t = (k: string) => k;
const ZDANIE = 'Każda twoja karta wyższa od stołu daje jeszcze najwyżej 3 niepewne outy.';
const sz = (s: string): string => `${s}{{jesli:nadkarty}} ${ZDANIE}{{/jesli}}`;
const SZABLON: ScenarioTemplate = {
  ...SC01,
  decisions: SC01.decisions.map((d) => ({ ...d, actions: d.actions.map((a) => ({ ...a, explanation: sz(a.explanation) })) })) as ScenarioTemplate['decisions'],
};

const nadkartyPunktu = (v: ScenarioVariant, i: number): number => {
  const d = v.points[i]!;
  return d.point === 'draw-call' ? overcardOutsAt(v.hero, v.board.slice(0, d.street === 'flop' ? 3 : 4)) : 0;
};
function warianty(): { z: ScenarioVariant; bez: ScenarioVariant } {
  let z: ScenarioVariant | undefined;
  let bez: ScenarioVariant | undefined;
  for (let ziarno = 1; ziarno < 400 && !(z && bez); ziarno++) {
    const v = generateVariant(naGenerator(SZABLON), 'latwy', ziarno);
    if (nadkartyPunktu(v, 0) > 0) z ??= v; else bez ??= v;
  }
  if (!z || !bez) throw new Error('brak wariantu z/bez nadkarty w 400 ziarnach');
  return { z, bez };
}

describe('zdanie o nadkartach w wyjaśnieniu (KO-073)', () => {
  const { z, bez } = warianty();
  it('wektor wpisany ręcznie (EE 08-programista-009): J♠9♠ na 7♠2♦5♠ (flop) ma nadkarty, na turnie Q♥ już nie', () => {
    // wyrocznia niezależna od kodu: nadkarta = karta gracza wyższa od najwyższej karty stołu PUNKTU (flop: 7, turn: Q), liczona z kart wpisanych w teście
    const v: ScenarioVariant = { ...z, hero: parseCards('Js 9s') as ScenarioVariant['hero'], board: parseCards('7s 2d 5s Qh 9c') };
    expect(v.points[0]!.street).toBe('flop');
    expect(v.points[1]!.street).toBe('turn');
    expect(warunkiWariantu(v, 0).nadkarty).toBe(true);
    expect(warunkiWariantu(v, 1).nadkarty).toBe(false);
  });
  it('warunek wariantu = overcardOutsAt > 0 dla każdego punktu', () => {
    expect(warunkiWariantu(z, 0).nadkarty).toBe(true);
    expect(warunkiWariantu(bez, 0).nadkarty).toBe(false);
    for (const v of [z, bez]) for (const i of [0, 1]) expect(warunkiWariantu(v, i).nadkarty).toBe(nadkartyPunktu(v, i) > 0);
  });
  it('wariant bez nadkarty: żaden blok wyjaśnienia nie ma zdania; z nadkartą: każdy ma', () => {
    for (const a of ['call', 'fold'] as const) {
      expect(bloki(bez, SZABLON, 0, a, t).map((b) => b.tekst).join(' ')).not.toContain(ZDANIE);
      expect(bloki(z, SZABLON, 0, a, t).every((b) => b.tekst.includes(ZDANIE))).toBe(true);
    }
  });
  it('bez nadkarty tekst kończy się kropką zdania poprzedniego, bez wiszącej spacji ani znacznika', () => {
    for (const b of bloki(bez, SZABLON, 0, 'fold', t)) {
      expect(b.tekst).not.toMatch(/\s$|\{\{/);
    }
  });
  it('widok decyzji nadal działa na tym samym wariancie (stół zgodny z warunkiem)', () => {
    expect(widokDecyzji(z, 0).stol).toHaveLength(3);
  });
});
