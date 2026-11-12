// EY EV-2 (D-1286, EP-003; powraca z EI-001): turn-bet przyjmuje wariant tylko z CZYSTYMI outami.
// Zbiór kart rivera, po których rywal wygrywa albo remisuje (z 44 niewidzianych), musi być równy zbiorowi nominalnych outów drawa; remisów 0.
// Wtedy e = N/44, a pokazywane hit = N/46 (R-M7-006/007) jest prawdą. Wyrocznia: ewaluator 7 kart, pełne przejście po talii (bez analyseOutsSpot dla zbioru wygrywających).
import { describe, expect, it } from 'vitest';
import { analyseOutsSpot, FULL_DECK, generateVariant, parseCards, strength, type Card, type GeneratorTemplate } from '../src';

const t: GeneratorTemplate = {
  id: 'sc-fx-turn-bet',
  levels: { latwy: { draws: ['flush', 'oesd'], reject: [], marginMin: 0.02, expected: ['bet-big'] } },
  decisions: [{ kind: 'turn-bet', street: 'turn', pots: [8, 16, 24, 40], small: 0.25, big: 0.75 }],
};
/** Karty rivera, po których rywal wygrywa (W) albo remisuje (T) z graczem; z 44 niewidzianych. */
function riverCards(hero: readonly Card[], villain: readonly Card[], turn: readonly Card[]) {
  const znane = new Set<Card>([...hero, ...villain, ...turn]);
  const wygrywa: Card[] = [], remisuje: Card[] = [];
  for (const c of FULL_DECK) {
    if (znane.has(c)) continue;
    const [r, h] = [strength([...villain, ...turn, c]), strength([...hero, ...turn, c])]; // mniejsza siła = lepsza ręka
    if (r < h) wygrywa.push(c); else if (r === h) remisuje.push(c);
  }
  return { wygrywa, remisuje, niewidziane: FULL_DECK.length - znane.size };
}
describe('EY EV-2: turn-bet tylko z czystymi outami', () => {
  it('ziarna 1–3000: każdy przyjęty wariant ma W = N (nominalne outy), 0 remisów, N/46 > cena małego i N/44 < cena dużego', () => {
    const zle: string[] = [];
    let przyjete = 0;
    for (let seed = 1; seed <= 3000; seed++) {
      const v = generateVariant(t, 'latwy', seed);
      const p = v.points[0];
      if (p?.point !== 'turn-bet') continue;
      przyjete++;
      const turn = v.board.slice(0, 4);
      const { wygrywa, remisuje, niewidziane } = riverCards(v.hero, v.villain, turn);
      const n = analyseOutsSpot(v.villain, turn)?.outs ?? -1;
      const ok = niewidziane === 44 && wygrywa.length === n && remisuje.length === 0 && n / 46 > p.requiredSmall && n / 44 < p.requiredBig && Math.abs(p.hit - n / 46) < 1e-12;
      if (!ok) zle.push(`seed ${seed}: W=${wygrywa.length} T=${remisuje.length} N=${n}`);
    }
    expect(przyjete).toBeGreaterThan(100);
    expect(zle).toEqual([]);
  }, 300_000);
});
describe('EY EV-2: wektory (wpisane ręcznie, D-1286)', () => {
  const x = (h: string, v: string, b: string) => riverCards(parseCards(h), parseCards(v), parseCards(b));
  it('4c9c vs 7hKh na 4dJh3h9d: wygrywa 7 kart, nominalnie 9 → brudne outy', () => {
    const r = x('4c 9c', '7h Kh', '4d Jh 3h 9d');
    expect([r.wygrywa.length, r.remisuje.length]).toEqual([7, 0]);
    expect(analyseOutsSpot(parseCards('7h Kh'), parseCards('4d Jh 3h 9d'))?.outs).toBe(9);
  });
  it('AsKd vs QhJh na Ks8h5h2c: wygrywa 9 = nominalnie 9 → czyste (9/44 = 0,2045; 9/46 = 0,1957)', () => {
    const r = x('As Kd', 'Qh Jh', 'Ks 8h 5h 2c');
    expect([r.wygrywa.length, r.remisuje.length]).toEqual([9, 0]);
    expect(analyseOutsSpot(parseCards('Qh Jh'), parseCards('Ks 8h 5h 2c'))?.outs).toBe(9);
  });
  it('AhKd vs QhJh na Ks8h5h2c (kolor w ręce gracza): wygrywa 8 ≠ 9 → brudne', () => {
    const r = x('Ah Kd', 'Qh Jh', 'Ks 8h 5h 2c');
    expect(r.wygrywa.length).toBe(8);
  });
});
