// DN (D-888): nadkarty w draw-call: niewidziane karty rangi wyższej od stołu, bez outów drawa, bez pary w ręce.
import { describe, expect, it } from 'vitest';
import { overcardOuts, parseCards } from '../src';

const karty = (t: string) => parseCards(t);
describe('overcardOuts', () => {
  it('A♠K♦ na 7♣5♦2♥: po 3 asy i króle = 6, bez outów drawa', () => {
    expect(overcardOuts(karty('As Kd'), karty('7c 5d 2h'), [])).toBe(6);
  });
  it('as w kolorze drawa jest już outem: nie liczy się drugi raz (6 − 1)', () => {
    expect(overcardOuts(karty('As Kd'), karty('7c 5d 2h'), karty('Ac'))).toBe(5);
  });
  it('tylko jedna karta wyższa od stołu: 3', () => {
    expect(overcardOuts(karty('As 4d'), karty('7c 5d 2h'), [])).toBe(3);
  });
  it('żadna karta nie jest wyższa od stołu: 0; para w ręce: 0', () => {
    expect(overcardOuts(karty('6s 4d'), karty('Kc 5d 2h'), [])).toBe(0);
    expect(overcardOuts(karty('As Ad'), karty('7c 5d 2h'), [])).toBe(0);
  });
  it('wyższa od najwyższej karty stołu także na turnie (4 karty stołu)', () => {
    expect(overcardOuts(karty('Qs 9d'), karty('7c 5d 2h 8s'), [])).toBe(6);
    expect(overcardOuts(karty('Qs 9d'), karty('7c 5d 2h Ks'), [])).toBe(0);
  });
});
