import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { ADVANCEMENT, computeAdvancement, newCard, retrievability, review, skillKnowledge, type StoredCard } from '../src';

const DAY = 86_400_000;
const T0 = Date.UTC(2026, 9, 1);

/** Karta po serii odpowiedzi; kolejna odpowiedź w terminie powtórki (albo minutę później). */
function practiced(family: string, outcomes: boolean[], start = T0): { card: StoredCard; at: number } {
  let now = start;
  let card = newCard(family, now);
  for (const ok of outcomes) {
    card = review(card, { correct: ok, elapsedMs: 5000 }, now).card;
    now = Math.max(now + 60_000, card.due);
  }
  return { card, at: card.lastReview! };
}

describe('wskaźnik zaawansowania: wiedza', () => {
  it('nieprzećwiczona umiejętność = 0, karta bez powtórki = 0', () => {
    expect(skillKnowledge(undefined, T0)).toBe(0);
    expect(retrievability(newCard('f', T0), T0)).toBe(0);
  });

  it('tuż po odpowiedzi R = 1 nawet po błędzie; horyzont rozróżnia dobrą i złą odpowiedź', () => {
    const wrong = practiced('f', [false]);
    const good = practiced('f', [true]);
    expect(retrievability(wrong.card, wrong.at)).toBe(1);
    expect(retrievability(good.card, good.at)).toBe(1);
    expect(skillKnowledge(wrong.card, wrong.at)).toBeLessThan(skillKnowledge(good.card, good.at));
    expect(skillKnowledge(good.card, good.at)).toBeLessThan(1);
  });

  it('wiedza spada z czasem bez powtórki i rośnie z kolejnymi dobrymi powtórkami', () => {
    const { card, at } = practiced('f', [true, true]);
    expect(skillKnowledge(card, at + 60 * DAY)).toBeLessThan(skillKnowledge(card, at));
    const more = practiced('f', [true, true, true, true]);
    expect(skillKnowledge(more.card, more.at)).toBeGreaterThan(skillKnowledge(card, at));
  });

  it('obszar = średnia umiejętności, ogólny = średnia ważona liczbą umiejętności', () => {
    const a = practiced('a1', [true, true, true]);
    const now = a.at;
    const ka = skillKnowledge(a.card, now);
    const r = computeAdvancement(
      [
        { id: 'm1', skills: ['a1', 'a2'], counted: true },
        { id: 'm2', skills: ['b1', 'b2', 'b3', 'b4'], counted: true },
        { id: 'm3', skills: [], counted: true },
      ],
      [a.card],
      now,
    );
    const [m1, m2, m3] = r.knowledge.areas;
    expect(m1!.raw).toBeCloseTo(ka / 2, 10);
    expect(m1!.practiced).toBe(1);
    expect(m2!.score).toBe(0);
    expect(m3!.score).toBeNull();
    expect(r.knowledge.raw).toBeCloseTo(ka / 6, 10);
    expect(r.overall).toBe(Math.round((ka / 6) * ADVANCEMENT.scale));
    expect(r.knowledge.skills).toBe(6);
    expect(r.knowledge.practiced).toBe(1);
  });

  it('część „gra” jest jawnie niedostępna, a nie zerem', () => {
    const r = computeAdvancement([{ id: 'm1', skills: ['x'], counted: true }], [], T0);
    expect(r.game).toEqual({ status: 'pending' });
    expect(r.overall).toBe(0);
  });

  it('moduł opcjonalny jest pokazany, ale nie wchodzi do wyniku ogólnego', () => {
    const a = practiced('opt', [true]);
    const r = computeAdvancement(
      [
        { id: 'm1', skills: ['x'], counted: true },
        { id: 'm11', skills: ['opt'], counted: false },
      ],
      [a.card],
      a.at,
    );
    expect(r.knowledge.areas[1]!.score).toBeGreaterThan(0);
    expect(r.overall).toBe(0);
    expect(r.knowledge.skills).toBe(1);
  });

  it('kurs bez zadań daje null, nie 0', () => {
    expect(computeAdvancement([{ id: 'm12', skills: [], counted: true }], [], T0).overall).toBeNull();
  });

  it('karty rodzin spoza treści są pomijane', () => {
    const a = practiced('stara.rodzina', [true]);
    expect(computeAdvancement([{ id: 'm1', skills: ['x'], counted: true }], [a.card], a.at).overall).toBe(0);
  });

  it('wynik zawsze w 0–100 i nie maleje po dodaniu przećwiczonej umiejętności', () => {
    fc.assert(
      fc.property(fc.array(fc.array(fc.boolean(), { minLength: 1, maxLength: 6 }), { minLength: 1, maxLength: 8 }), fc.integer({ min: 0, max: 400 }), (histories, days) => {
        const cards = histories.map((h, i) => practiced(`f${i}`, h).card);
        const now = Math.max(...cards.map((c) => c.lastReview!)) + days * DAY;
        const skills = [...cards.map((c) => c.familyId), 'nowa'];
        const r = computeAdvancement([{ id: 'm', skills, counted: true }], cards, now);
        const fewer = computeAdvancement([{ id: 'm', skills, counted: true }], cards.slice(1), now);
        return r.overall! >= 0 && r.overall! <= 100 && r.knowledge.raw! >= fewer.knowledge.raw!;
      }),
    );
  });
});
