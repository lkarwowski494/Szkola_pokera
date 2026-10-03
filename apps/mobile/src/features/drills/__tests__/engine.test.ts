/// <reference types="jest" />
import type { Drill } from '@szkola/content-schema';
import { combosCount, createRng, HAND_CLASSES } from '@szkola/poker-core';
import type { DrillRow, RangeSpot } from '@/data/content/repo';
import { buildExamSession, buildFamilySession, buildSpeedSession, interleaveRows } from '@/features/session/build';
import { instantiate } from '../engine';
import { gradeAnswer, gradeNumeric, parseNumberInput, scorePaint } from '../grade';
import { splitCardTokens } from '../cardTokens';
import { EXAM_SIZE, MIXED_HIGH, MIXED_LOW, PAINT_PASS } from '../thresholds';
import type { ChoiceInstance, DrillInstance, NumericInstance } from '../types';

const generators = ['whoWins', 'whoWinsKicker', 'bestHand', 'outs', 'potOdds', 'drawCall'] as const;

function gen(generator: (typeof generators)[number], params: Record<string, string> = {}): Drill {
  return { kind: 'generated', id: `t.${generator}`, family: `f.${generator}`, rules: [], generator, params, count: 25 };
}

function asChoice(d: DrillInstance): ChoiceInstance {
  if (d.kind !== 'choice') throw new Error(`oczekiwano zadania z wyborem, jest ${d.kind}`);
  return d;
}

function asNumeric(d: DrillInstance): NumericInstance {
  if (d.kind !== 'numeric') throw new Error(`oczekiwano zadania liczbowego, jest ${d.kind}`);
  return d;
}

/** Spot testowy: AA gra zawsze, AKs w połowie (mieszana), AKo w 10%, reszta pas. */
function testSpot(extra: Partial<RangeSpot> = {}): RangeSpot {
  const freqs = HAND_CLASSES.map((hc) => (hc === 'AA' ? 1 : hc === 'AKs' ? 0.5 : hc === 'AKo' ? 0.1 : 0));
  return { id: 's', title: 'Test', hero: 'BTN', path: '', playPercent: 0.1, groups: [{ name: 'Przebicie', freqs }], ...extra };
}

describe('silnik zadań', () => {
  it.each(generators)('%s: dokładnie jedna poprawna odpowiedź, unikalne opcje, wyjaśnienie', (g: (typeof generators)[number]) => {
    const rng = createRng(42);
    const params: Record<string, string> = g === 'outs' ? { kind: 'oesd' } : {};
    for (const raw of instantiate(gen(g, params), 'l1', rng)) {
      const inst = asChoice(raw);
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
    for (let s = 0; s < 20; s++) orders.add(asChoice(instantiate(drill, null, createRng(s))[0]!).options.map((o) => o.text).join(''));
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
    const ctx = { range: () => testSpot() };
    const drill: Drill = { kind: 'generated', id: 'r', family: 'r', rules: [], generator: 'rangeDecision', params: { spots: 's' }, count: 40 };
    for (const raw of instantiate(drill, 'l', createRng(9), undefined, ctx)) {
      const inst = asChoice(raw);
      const correct = inst.options.filter((o) => o.correct).map((o) => o.text);
      expect(correct.length).toBeGreaterThanOrEqual(1);
      expect(inst.table?.hand).toHaveLength(2);
      expect(inst.explanation).toContain('%');
    }
  });

  it('błędny rozmiar: przy dobrej akcji to niedokładność, przy złej zwykły błąd', () => {
    const spot = testSpot({ groups: [{ ...testSpot().groups[0]!, wrongSizes: [{ text: 'Przebicie za duże', why: 'Za duży rozmiar.' }] }] });
    const ctx = { range: () => spot };
    const drill: Drill = { kind: 'generated', id: 'r', family: 'r', rules: [], generator: 'rangeDecision', params: { spots: 's' }, count: 60 };
    let sawSize = false;
    let sawPlain = false;
    for (const raw of instantiate(drill, 'l', createRng(5), undefined, ctx)) {
      const inst = asChoice(raw);
      const raise = inst.options.find((o) => o.text === 'Przebicie')!;
      const big = inst.options.find((o) => o.text === 'Przebicie za duże')!;
      expect(big.correct).toBe(false);
      expect(!!big.sizeError).toBe(raise.correct);
      if (big.sizeError) sawSize = true;
      else sawPlain = true;
      const bigIdx = inst.options.indexOf(big);
      expect(gradeAnswer(inst, { kind: 'choice', index: bigIdx })).toBe(raise.correct ? 'size' : 'wrong');
    }
    expect(sawSize && sawPlain).toBe(true);
  });
});

describe('odpowiedź liczbowa', () => {
  it('czyta zapis polski i z jednostką', () => {
    expect(parseNumberInput('33,3')).toBeCloseTo(33.3);
    expect(parseNumberInput(' 25 % ')).toBe(25);
    expect(parseNumberInput('2.5bb')).toBe(2.5);
    expect(parseNumberInput('')).toBeNull();
    expect(parseNumberInput('abc')).toBeNull();
    expect(parseNumberInput('1,2,3')).toBeNull();
    expect(parseNumberInput('5.')).toBe(5);
    expect(parseNumberInput(',5')).toBe(0.5);
    expect(parseNumberInput('2,5x')).toBe(2.5);
  });

  it('procenty: ±2 pp dobrze, ±5 pp blisko, dalej źle; liczby całkowite dokładnie', () => {
    const p = { answer: 25, unit: 'percent' as const };
    expect(gradeNumeric(p, 25)).toBe('correct');
    expect(gradeNumeric(p, 27)).toBe('correct');
    expect(gradeNumeric(p, 22.9)).toBe('close');
    expect(gradeNumeric(p, 30)).toBe('close');
    expect(gradeNumeric(p, 30.1)).toBe('wrong');
    const c = { answer: 9, unit: 'count' as const };
    expect(gradeNumeric(c, 9)).toBe('correct');
    expect(gradeNumeric(c, 8)).toBe('wrong');
  });

  it('generatory w trybie liczbowym dają poprawną wartość i wyjaśnienie', () => {
    for (const raw of instantiate(gen('potOdds', { answer: 'numeric' }), 'l', createRng(4))) {
      const inst = asNumeric(raw);
      expect(inst.unit).toBe('percent');
      expect(inst.answer).toBeGreaterThan(0);
      expect(inst.answer).toBeLessThan(50);
      expect(gradeAnswer(inst, { kind: 'numeric', value: inst.answer })).toBe('correct');
      expect(inst.explanation).toBeTruthy();
    }
    for (const raw of instantiate(gen('outs', { kind: 'flush', answer: 'numeric' }), 'l', createRng(4))) {
      const inst = asNumeric(raw);
      expect(inst.answer).toBe(9);
      expect(gradeAnswer(inst, { kind: 'numeric', value: 8 })).toBe('wrong');
    }
  });

  it('zadanie liczbowe z treści przelicza procenty na 0–100', () => {
    const drill = { kind: 'numeric', id: 'n', family: 'n', rules: [], prompt: 'Ile?', answer: 'eq.x', explanation: 'Bo tak.', value: 0.25, unit: 'percent', display: '25%' } as Drill;
    const inst = asNumeric(instantiate(drill, 'l', createRng(1))[0]!);
    expect(inst.answer).toBe(25);
    expect(inst.display).toBe('25%');
  });
});

describe('malowanie zakresu', () => {
  const spot = testSpot();
  const idx = (hc: string) => HAND_CLASSES.indexOf(hc as (typeof HAND_CLASSES)[number]);
  const grid = (hands: string[]) => HAND_CLASSES.map((hc) => hands.includes(hc));

  it('ręka mieszana zaliczona w obie strony, pas spoza zakresu się nie liczy', () => {
    const a = scorePaint(spot, grid(['AA']));
    const b = scorePaint(spot, grid(['AA', 'AKs']));
    expect(a.score).toBe(1);
    expect(b.score).toBe(1);
    expect(a.cells[idx('AKs')]).toBe('mixed');
    expect(a.cells[idx('AKo')]).toBe('none'); // 10% < MIXED_LOW: pas, poprawnie niezaznaczony
    expect(MIXED_LOW).toBeLessThan(0.5);
    expect(MIXED_HIGH).toBeGreaterThan(0.5);
  });

  it('wynik ważony kombinacjami; brak i nadmiar obniżają wynik', () => {
    const miss = scorePaint(spot, grid([]));
    // w puli oceny: AA (brak, 6 komb.) i AKs (mieszana, 4 komb.)
    expect(miss.score).toBeCloseTo(combosCount('AKs') / (combosCount('AA') + combosCount('AKs')));
    expect(miss.cells[idx('AA')]).toBe('miss');
    const extra = scorePaint(spot, grid(['AA', '72o']));
    expect(extra.cells[idx('72o')]).toBe('extra');
    expect(extra.extraCombos).toBe(combosCount('72o'));
    expect(extra.score).toBeCloseTo((6 + 4) / (6 + 4 + 12));
    expect(gradeAnswer({ kind: 'paint', key: 'p', drillId: 'p', family: 'p', lessonId: null, rules: [], prompt: '', spot }, { kind: 'paint', painted: grid(['AA', '72o']) })).toBe(
      extra.score >= PAINT_PASS ? 'correct' : 'wrong',
    );
  });
});

describe('egzamin i trening na czas', () => {
  const row = (id: string, family: string, drill: Partial<Drill> = {}): DrillRow =>
    ({ id, lessonId: 'l', family, drill: { ...gen('potOdds'), id, family, ...drill } as Drill });
  const paintRow = (id: string, family: string): DrillRow => ({ id, lessonId: 'l', family, drill: { kind: 'paint', id, family, rules: [], spot: 's', prompt: 'Pomaluj' } });
  const ctx = { range: () => testSpot() };

  it('ma stałą długość, 2/3 z modułu, bez tej samej rodziny dwa razy z rzędu i najwyżej jedno malowanie', () => {
    const moduleRows = [row('m1', 'a'), row('m2', 'b'), row('m3', 'c'), paintRow('p1', 'p'), paintRow('p2', 'q')];
    const earlier = [row('e1', 'x'), row('e2', 'y')];
    for (let seed = 1; seed < 15; seed++) {
      const exam = buildExamSession(moduleRows, earlier, createRng(seed), ctx);
      expect(exam).toHaveLength(EXAM_SIZE);
      expect(exam.filter((e) => e.kind === 'paint').length).toBeLessThanOrEqual(1);
      expect(exam.filter((e) => ['x', 'y'].includes(e.family))).toHaveLength(EXAM_SIZE - Math.round(EXAM_SIZE * (2 / 3)));
      for (let i = 1; i < exam.length; i++) expect(exam[i]!.family).not.toBe(exam[i - 1]!.family);
      expect(new Set(exam.map((e) => e.key)).size).toBe(EXAM_SIZE);
    }
  });

  it('bez wcześniejszych modułów wszystkie zadania z modułu; zadania stałe się nie powtarzają', () => {
    const choice = (id: string, family: string): DrillRow => ({
      id,
      lessonId: 'l',
      family,
      drill: { kind: 'choice', id, family, rules: [], prompt: 'P', options: [{ text: 'A', correct: true, why: 'bo A' }, { text: 'B', correct: false, why: 'bo B' }] },
    });
    const exam = buildExamSession([choice('c1', 'a'), choice('c2', 'b'), row('g1', 'c')], [], createRng(2), ctx);
    expect(exam).toHaveLength(EXAM_SIZE);
    expect(exam.filter((e) => e.drillId === 'c1')).toHaveLength(1);
    expect(exam.filter((e) => e.drillId === 'c2')).toHaveLength(1);
  });

  it('przeplatanie zachowuje wszystkie elementy', () => {
    const items = ['a', 'a', 'a', 'b', 'b', 'c'].map((family, i) => ({ family, i }));
    const out = interleaveRows(items, createRng(7));
    expect(out.map((o) => o.i).sort()).toEqual([0, 1, 2, 3, 4, 5]);
    for (let i = 1; i < out.length; i++) expect(out[i]!.family).not.toBe(out[i - 1]!.family);
  });

  it('powtórka nie pokazuje dwa razy tego samego zadania stałego (malowanie, liczba)', () => {
    const numeric = { kind: 'numeric', id: 'n1', family: 'n', rules: [], prompt: 'Ile?', answer: 'x', explanation: 'Bo.', value: 0.25, unit: 'percent', display: '25%' } as Drill;
    const rows: DrillRow[] = [paintRow('p', 'p'), { id: 'n1', lessonId: 'l', family: 'n', drill: numeric }];
    const s = buildFamilySession(rows, ['p', 'n'], createRng(1), 2, ctx);
    expect(s.map((x) => x.drillId).sort()).toEqual(['n1', 'p']);
  });

  it('trening na czas pomija malowanie zakresu', () => {
    const rows = [row('g', 'a'), paintRow('p', 'p')];
    const s = buildSpeedSession(rows, ['a', 'p'], createRng(1), 10, ctx);
    expect(s.length).toBeGreaterThan(0);
    expect(s.every((x) => x.kind !== 'paint')).toBe(true);
  });
});
