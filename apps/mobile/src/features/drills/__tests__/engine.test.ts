/// <reference types="jest" />
import type { Drill } from '@szkola/content-schema';
import { createRng } from '@szkola/poker-core';
import { buildFamilySession } from '@/features/session/build';
import { instantiate } from '../engine';
import { splitCardTokens } from '../cardTokens';

const generators = ['whoWins', 'whoWinsKicker', 'bestHand', 'outs', 'potOdds', 'drawCall'] as const;

function gen(generator: (typeof generators)[number], params: Record<string, string> = {}): Drill {
  return { kind: 'generated', id: `t.${generator}`, family: `f.${generator}`, rules: [], generator, params, count: 25 };
}

describe('silnik zadań', () => {
  it.each(generators)('%s: dokładnie jedna poprawna odpowiedź, unikalne opcje, wyjaśnienie', (g: (typeof generators)[number]) => {
    const rng = createRng(42);
    const params: Record<string, string> = g === 'outs' ? { kind: 'oesd' } : {};
    for (const inst of instantiate(gen(g, params), 'l1', rng)) {
      expect(inst.options.filter((o) => o.correct)).toHaveLength(1);
      expect(new Set(inst.options.map((o) => o.text)).size).toBe(inst.options.length);
      expect(inst.explanation && inst.explanation.length).toBeTruthy();
      for (const o of inst.options) expect(o.why.length).toBeGreaterThan(0);
    }
  });

  it('karty w tekście wyjaśnień mają poprawny format', () => {
    const rng = createRng(1);
    for (const inst of instantiate(gen('whoWins'), 'l1', rng)) {
      const cards = splitCardTokens(inst.explanation!).filter((p) => p.t === 'cards');
      expect(cards.length).toBe(2);
      for (const c of cards) expect(c.v).toHaveLength(5);
    }
  });

  it('zadanie stałe zachowuje treść i miesza kolejność opcji', () => {
    const drill: Drill = {
      kind: 'choice',
      id: 'c1',
      family: 'f1',
      rules: [],
      prompt: 'Pytanie',
      options: [
        { text: 'A', correct: true, why: 'bo A' },
        { text: 'B', correct: false, why: 'bo B' },
        { text: 'C', correct: false, why: 'bo C' },
      ],
    };
    const orders = new Set<string>();
    for (let s = 0; s < 20; s++) orders.add(instantiate(drill, null, createRng(s))[0]!.options.map((o) => o.text).join(''));
    expect(orders.size).toBeGreaterThan(1);
  });

  it('sesja powtórki przeplata rodziny', () => {
    const rows = ['a', 'b', 'c'].map((f) => ({ id: `d.${f}`, lessonId: 'l', family: f, drill: { ...gen('potOdds'), id: `d.${f}`, family: f } }));
    const session = buildFamilySession(rows, ['a', 'b', 'c'], createRng(3), 2);
    expect(session).toHaveLength(6);
    for (let i = 1; i < session.length; i++) expect(session[i]!.family).not.toBe(session[i - 1]!.family);
    expect(new Set(session.map((s) => s.key)).size).toBe(6);
  });
});

describe('zadania z zakresów solvera', () => {
  it('ręka graniczna akceptuje każdą często graną akcję, wyraźna tylko jedną', () => {
    const freqs = Array.from({ length: 169 }, (_, i) => (i === 0 ? 1 : i === 1 ? 0.5 : 0));
    const ctx = { range: () => ({ id: 's', title: 'Test', hero: 'BTN', path: '', playPercent: 0.1, groups: [{ name: 'Przebicie', freqs }] }) };
    const drill: Drill = { kind: 'generated', id: 'r', family: 'r', rules: [], generator: 'rangeDecision', params: { spots: 's' }, count: 40 };
    for (const inst of instantiate(drill, 'l', createRng(9), undefined, ctx)) {
      const correct = inst.options.filter((o) => o.correct).map((o) => o.text);
      expect(correct.length).toBeGreaterThanOrEqual(1);
      expect(inst.table?.hand).toHaveLength(2);
      expect(inst.explanation).toContain('%');
    }
  });
});
