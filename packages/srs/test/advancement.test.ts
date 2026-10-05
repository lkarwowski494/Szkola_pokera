import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { ADVANCEMENT, areaGame, computeAdvancement, newCard, retrievability, review, skillKnowledge, type StoredCard } from '../src';

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

describe('wskaźnik zaawansowania: część „gra” (dokument 14, 4.8)', () => {
  const NOW = Date.UTC(2026, 9, 5);
  const areas = [
    { id: 'm1', skills: ['a1', 'a2'], counted: true },
    { id: 'm3', skills: ['b1', 'b2', 'b3'], counted: true },
    { id: 'm11', skills: ['c1'], counted: false },
  ];
  const ones = (n: number) => Array<0 | 1>(n).fill(1);
  const zeros = (n: number) => Array<0 | 1>(n).fill(0);

  it('bez gry wynik ogólny równa się wiedzy, a obszary pokazują samą wiedzę', () => {
    const r = computeAdvancement(areas, [], NOW, { config: ADVANCEMENT.defaultConfig, points: new Map() });
    const k = computeAdvancement(areas, [], NOW);
    expect(r.overall).toBe(k.overall);
    expect(r.combined.every((a) => a.knowledgeOnly)).toBe(true);
    expect(k.game).toEqual({ status: 'pending' });
  });

  it('próg 40 decyzji, „wstępny” do 100, okno ostatnich 100', () => {
    expect(areaGame('m3', ones(ADVANCEMENT.gameMin - 1)).status).toBe('too-little');
    expect(areaGame('m3', ones(ADVANCEMENT.gameMin))).toMatchObject({ status: 'provisional', score: 100 });
    expect(areaGame('m3', ones(ADVANCEMENT.gameWindow))).toMatchObject({ status: 'ok', score: 100 });
    // najnowsze 100: 50 dobrych, potem 100 starych błędów → 50 dobrych i 50 błędów w oknie
    expect(areaGame('m3', [...ones(50), ...zeros(100)])).toMatchObject({ decisions: 100, score: 50 });
    expect(areaGame('m1', ones(200)).status).toBe('no-game');
  });

  it('obszar łączy wiedzę i grę po równo; wynik ogólny ważony liczbą umiejętności, bez modułu opcjonalnego', () => {
    const r = computeAdvancement(areas, [], NOW, { config: '6-100', points: new Map([['m3', [...ones(60), ...zeros(40)]], ['m1', ones(100)]]) });
    const m3 = r.combined.find((a) => a.id === 'm3')!;
    // wiedza 0 (nic nie przećwiczone), gra 60 → 30
    expect(m3).toMatchObject({ score: 30, knowledgeOnly: false, provisional: false });
    expect(r.combined.find((a) => a.id === 'm1')!.knowledgeOnly).toBe(true);
    // (2 × 0 + 3 × 0,3) / 5 = 0,18
    expect(r.overall).toBe(18);
    expect(r.knowledge.score).toBe(0);
  });
});
