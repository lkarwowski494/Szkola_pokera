/// <reference types="jest" />
import type { Drill } from '@szkola/content-schema';
import { classifyHud, classOf, combosCount, createRng, HAND_CLASSES, hudThresholdsFromParams, parseCard, PLAYER_TYPES } from '@szkola/poker-core';
import type { DrillRow, RangeSpot } from '@/data/content/repo';
import { buildExamSession, buildFamilySession, buildSpeedSession, interleaveRows } from '@/features/session/build';
import { instantiate, rangeVerdict } from '../engine';
import { gradeAnswer, gradeNumeric, isPass, parseNumberInput, scorePaint } from '../grade';
import { splitCardTokens } from '../cardTokens';
import { pctEquity } from '../text.pl';
import { EXAM_MAX_PER_GENERATOR, EXAM_SIZE, MIXED_HIGH, MIXED_LOW, MIXED_MIN, PAINT_PASS } from '../thresholds';
import type { ChoiceInstance, DrillInstance, NumericInstance } from '../types';

const generators = ['whoWins', 'whoWinsKicker', 'bestHand', 'outs', 'potOdds', 'drawCall', 'icm'] as const;

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
    const params: Record<string, string> = g === 'outs' ? { kind: 'oesd' } : g === 'icm' ? { mode: 'call' } : {};
    for (const raw of instantiate(gen(g, params), 'l1', rng)) {
      const inst = asChoice(raw);
      expect(inst.options.filter((o) => o.correct)).toHaveLength(1);
      expect(new Set(inst.options.map((o) => o.text)).size).toBe(inst.options.length);
      expect(inst.explanation && inst.explanation.length).toBeTruthy();
      for (const o of inst.options) expect(o.why.length).toBeGreaterThan(0);
    }
  });

  it('icm (M11): decyzja zgodna z progiem z wyjaśnienia, a wycena stacku ma trzy różne odpowiedzi', () => {
    const rng = createRng(5);
    for (const raw of instantiate(gen('icm', { mode: 'call' }), 'l1', rng)) {
      const inst = asChoice(raw);
      expect(inst.prompt).toMatch(/Bańka \(bubble\): [34] graczy/);
      expect(inst.explanation).toMatch(/Bubble factor/);
      expect(inst.options.map((o) => o.text)).toEqual(['Sprawdzam (call)', 'Pasuję (fold)']);
    }
    for (const raw of instantiate(gen('icm', { mode: 'equity' }), 'l1', rng)) {
      const inst = asChoice(raw);
      expect(inst.options).toHaveLength(3);
      expect(inst.options.filter((o) => o.correct)).toHaveLength(1);
      expect(new Set(inst.options.map((o) => o.text)).size).toBe(3);
      expect(inst.prompt).toMatch(/Ty \d/);
    }
  });

  it('playerType (M10): progi z parametrów, jedna poprawna odpowiedź zgodna z klasyfikacją, wyjaśnienie z dostosowaniem', () => {
    // te same wartości co hud.* w numbers.yaml po podstawieniu „n:klucz” (VPIP jako ułamek, reszta w punktach i rękach)
    const params = { nitMax: 0.14, regLow: 0.18, regHigh: 0.3, loose: 0.35, passiveGap: 10, aggressiveGap: 3, minHands: 30, readHands: 100 };
    const th = hudThresholdsFromParams(params);
    const drill: Drill = { kind: 'generated', id: 't.pt', family: 'f.pt', rules: [], generator: 'playerType', params, count: 40 };
    const seen = new Set<string>();
    for (const raw of instantiate(drill, 'l1', createRng(11))) {
      const inst = asChoice(raw);
      const m = /VPIP \(voluntarily put in pot\) (\d+)%, PFR \(preflop raise\) (\d+)%, próba (\d+)/.exec(inst.prompt);
      expect(m).not.toBeNull();
      const type = classifyHud({ vpip: Number(m![1]), pfr: Number(m![2]), hands: Number(m![3]) }, th);
      expect(type).not.toBeNull();
      const correct = inst.options.filter((o) => o.correct);
      expect(correct).toHaveLength(1);
      expect(inst.options.map((o) => o.text)).toEqual(['Nit', 'Regular', 'Pasywny gracz rekreacyjny (recreational player)', 'Maniak (maniac)', 'Za mało rąk, żeby ocenić']);
      expect(inst.options[PLAYER_TYPES.indexOf(type!)]!.correct).toBe(true);
      expect(correct[0]!.why).toMatch(/^Tak\./);
      expect(inst.explanation).toMatch(/^Najpierw próba/);
      seen.add(type!);
    }
    expect(seen.size).toBeGreaterThanOrEqual(4);
    expect(() => instantiate({ ...drill, params: { ...params, loose: 'n:hud.vpip.loose' } }, 'l1', createRng(1))).toThrow(/musi być liczbą/);
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

  it('klasy niepewne spotu nie pojawiają się w zadaniach z decyzją', () => {
    // AA i AKs to jedyne ręce grane; AKs niepewna, więc wśród rąk granych zostaje tylko AA
    const spot = testSpot({ uncertain: ['AKs', 'AKo'] });
    const drill: Drill = { kind: 'generated', id: 'r', family: 'r', rules: [], generator: 'rangeDecision', params: { spots: 's' }, count: 200 };
    for (const raw of instantiate(drill, 'l', createRng(13), undefined, { range: () => spot })) {
      const [a, b] = asChoice(raw).table!.hand!;
      const hc = classOf(parseCard(a!), parseCard(b!));
      expect(['AKs', 'AKo']).not.toContain(hc);
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
      const raiseOk = raise.correct || !!raise.acceptable;
      expect(!!big.sizeError).toBe(raiseOk);
      if (big.sizeError) sawSize = true;
      else sawPlain = true;
      const bigIdx = inst.options.indexOf(big);
      expect(gradeAnswer(inst, { kind: 'choice', index: bigIdx })).toBe(raiseOk ? 'size' : 'wrong');
    }
    expect(sawSize && sawPlain).toBe(true);
  });
});

describe('skala oceny akcji solvera (ADR-26)', () => {
  it('progi: 3,5% z GTO Wizard (Measure Performance), 25% granica ręki mieszanej', () => {
    expect(MIXED_MIN).toBe(0.035);
    expect(MIXED_MIN).toBeLessThan(MIXED_LOW);
  });

  it('zgodna: najczęstsza albo ≥ 25%; dopuszczalna: 3,5–25%; błąd: poniżej 3,5%', () => {
    expect(rangeVerdict([0.9, 0.1])).toEqual(['correct', 'acceptable']);
    expect(rangeVerdict([0.5, 0.3, 0.2])).toEqual(['correct', 'correct', 'acceptable']);
    expect(rangeVerdict([0.75, 0.25])).toEqual(['correct', 'correct']);
    expect(rangeVerdict([0.97, 0.03])).toEqual(['correct', 'wrong']);
    expect(rangeVerdict([0.965, 0.035])).toEqual(['correct', 'acceptable']);
    expect(rangeVerdict([1, 0])).toEqual(['correct', 'wrong']);
    // remis najczęstszych: obie zgodne, nawet poniżej 25%
    expect(rangeVerdict([0.2, 0.2, 0.2, 0.2, 0.2])).toEqual(['correct', 'correct', 'correct', 'correct', 'correct']);
  });

  it('w zadaniu akcja rzadka jest dopuszczalna, zalicza i nie jest oznaczona jako zgodna', () => {
    // każda ręka: przebicie 10%, pas 90%
    const spot = testSpot({ groups: [{ name: 'Przebicie', freqs: HAND_CLASSES.map(() => 0.1) }] });
    const drill: Drill = { kind: 'generated', id: 'r', family: 'r', rules: [], generator: 'rangeDecision', params: { spots: 's' }, count: 20 };
    let seen = 0;
    for (const raw of instantiate(drill, 'l', createRng(21), undefined, { range: () => spot })) {
      const inst = asChoice(raw);
      seen++;
      const raiseIdx = inst.options.findIndex((o) => o.text === 'Przebicie');
      const foldIdx = inst.options.findIndex((o) => o.text !== 'Przebicie');
      const raise = inst.options[raiseIdx]!;
      expect(raise.correct).toBe(false);
      expect(raise.acceptable).toBe(true);
      expect(raise.why).toContain('Dopuszczalne');
      expect(gradeAnswer(inst, { kind: 'choice', index: raiseIdx })).toBe('acceptable');
      expect(gradeAnswer(inst, { kind: 'choice', index: foldIdx })).toBe('correct');
      expect(inst.explanation).toContain('dopuszczalna');
    }
    expect(seen).toBeGreaterThan(0);
  });

  it('akcja poniżej 3,5% to błąd', () => {
    // każda ręka: przebicie 98%, pas 2%
    const spot = testSpot({ groups: [{ name: 'Przebicie', freqs: HAND_CLASSES.map(() => 0.98) }] });
    const drill: Drill = { kind: 'generated', id: 'r', family: 'r', rules: [], generator: 'rangeDecision', params: { spots: 's' }, count: 20 };
    let seen = 0;
    for (const raw of instantiate(drill, 'l', createRng(4), undefined, { range: () => spot })) {
      const inst = asChoice(raw);
      seen++;
      const foldIdx = inst.options.findIndex((o) => o.text !== 'Przebicie');
      expect(inst.options[foldIdx]!.acceptable).toBeFalsy();
      expect(gradeAnswer(inst, { kind: 'choice', index: foldIdx })).toBe('wrong');
    }
    expect(seen).toBeGreaterThan(0);
  });

  it('zaliczenie: zgodna i dopuszczalna tak; blisko, niedokładność i błąd nie', () => {
    expect(isPass('correct')).toBe(true);
    expect(isPass('acceptable')).toBe(true);
    expect(isPass('close')).toBe(false);
    expect(isPass('size')).toBe(false);
    expect(isPass('wrong')).toBe(false);
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

  it('klasy niepewne liczą się jak mieszane: zaliczone w obie strony', () => {
    const u = testSpot({ uncertain: ['AA', '72o'] });
    for (const painted of [grid([]), grid(['AA', '72o']), grid(['72o'])]) {
      const r = scorePaint(u, painted);
      expect(r.cells[idx('AA')]).toBe('mixed');
      expect(r.cells[idx('72o')]).toBe('mixed');
      expect(r.score).toBe(1);
      expect(r.targetCombos).toBe(0);
    }
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
      const exam = buildExamSession({ modulePool: [], moduleLessons: moduleRows, earlierPool: [], earlierLessons: earlier }, createRng(seed), ctx);
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
    const exam = buildExamSession({ modulePool: [], moduleLessons: [choice('c1', 'a'), choice('c2', 'b'), row('g1', 'c')], earlierPool: [], earlierLessons: [] }, createRng(2), ctx);
    expect(exam).toHaveLength(EXAM_SIZE);
    expect(exam.filter((e) => e.drillId === 'c1')).toHaveLength(1);
    expect(exam.filter((e) => e.drillId === 'c2')).toHaveLength(1);
  });

  describe('pula egzaminacyjna (zadania spoza lekcji)', () => {
    const choice = (id: string, family: string, lessonId: string | null = 'l'): DrillRow => ({
      id,
      lessonId,
      family,
      drill: { kind: 'choice', id, family, rules: [], prompt: 'P', options: [{ text: 'A', correct: true, why: 'bo A' }, { text: 'B', correct: false, why: 'bo B' }] },
    });
    const fams = ['a', 'b', 'c', 'd', 'e'];
    const pool = (m: string, k: number) => Array.from({ length: k }, (_, i) => choice(`${m}.exam.q${i}`, fams[i % fams.length]!, null));
    const lessonFixed = (m: string) => fams.map((f, i) => choice(`${m}.l.q${i}`, f));

    it('nie bierze zadań stałych z lekcji, gdy pula i generatory wystarczają', () => {
      const src = {
        modulePool: pool('m2', 8),
        moduleLessons: [...lessonFixed('m2'), row('m2.gen', 'a')],
        earlierPool: pool('m1', 4),
        earlierLessons: [...lessonFixed('m1'), row('m1.gen', 'x')],
      };
      for (let seed = 1; seed < 20; seed++) {
        const exam = buildExamSession(src, createRng(seed), ctx);
        expect(exam).toHaveLength(EXAM_SIZE);
        expect(exam.filter((e) => e.drillId.includes('.l.'))).toHaveLength(0);
        // generator najwyżej EXAM_MAX_PER_GENERATOR razy, zadanie z puli najwyżej raz
        expect(exam.filter((e) => e.drillId === 'm2.gen').length).toBeLessThanOrEqual(EXAM_MAX_PER_GENERATOR);
        const ids = exam.filter((e) => e.drillId.includes('.exam.')).map((e) => e.drillId);
        expect(new Set(ids).size).toBe(ids.length);
        expect(exam.filter((e) => e.drillId.startsWith('m1.'))).toHaveLength(EXAM_SIZE - Math.round(EXAM_SIZE * (2 / 3)));
      }
    });

    it('zadania stałe z lekcji tylko jako uzupełnienie, gdy puli brakuje', () => {
      const src = { modulePool: pool('m2', 3), moduleLessons: lessonFixed('m2'), earlierPool: [], earlierLessons: [] };
      const exam = buildExamSession(src, createRng(4), ctx, 6);
      expect(exam).toHaveLength(6);
      expect(exam.filter((e) => e.drillId.includes('.exam.'))).toHaveLength(3);
    });

    it('w kolejnym podejściu najpierw zadania z puli niewidziane na egzaminie', () => {
      const p = pool('m2', 10);
      const seen = new Set(p.slice(0, 5).map((r) => r.id));
      for (let seed = 1; seed < 10; seed++) {
        const exam = buildExamSession({ modulePool: p, moduleLessons: [], earlierPool: [], earlierLessons: [] }, createRng(seed), ctx, 5, seen);
        expect(exam.filter((e) => seen.has(e.drillId))).toHaveLength(0);
      }
      // gdy niewidzianych brakuje, wracają widziane (a nie zadania z lekcji)
      const all = new Set(p.map((r) => r.id));
      const again = buildExamSession({ modulePool: p, moduleLessons: lessonFixed('m2'), earlierPool: [], earlierLessons: [] }, createRng(1), ctx, 10, all);
      expect(again.filter((e) => e.drillId.includes('.exam.'))).toHaveLength(10);
    });
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

describe('flop: tekstura i c-bet (M5)', () => {
  const texture: Drill = { kind: 'texture', id: 'tx', family: 'tx', rules: [], axes: ['height', 'suits', 'ranks', 'wetness'], count: 60 };
  const why = { check: 'bo czek', small: 'bo mały', big: 'bo duży' };
  const cbet: Drill = {
    kind: 'cbet',
    id: 'cb',
    family: 'cb',
    rules: [],
    prompt: 'Co robisz?',
    position: 'BTN',
    options: { check: 'Czekam', small: 'Mały', big: 'Duży' },
    cases: [
      { when: { height: ['high'], suits: ['rainbow'], ranks: ['disconnected'] }, best: 'small', why },
      { when: { height: ['low'], ranks: ['connected'] }, best: 'check', why },
      { when: { height: ['middle'], ranks: ['connected'], suits: ['two-tone'] }, best: 'big', why },
    ],
    count: 90,
  };

  it('tekstura: nowy flop w każdym zadaniu, jedna poprawna wartość na oś, wyjaśnienie każdej opcji', () => {
    const insts = instantiate(texture, 'l', createRng(3));
    expect(new Set(insts.map((i) => i.table!.board!.join(' '))).size).toBeGreaterThan(50);
    for (const inst of insts) {
      if (inst.kind !== 'texture') throw new Error('oczekiwano tekstury');
      expect(inst.table!.board).toHaveLength(3);
      expect(inst.axes.map((a) => a.axis)).toEqual(['height', 'suits', 'ranks', 'wetness']);
      for (const a of inst.axes) {
        expect(a.options.filter((o) => o.correct)).toHaveLength(1);
        for (const o of a.options) expect(o.why).toMatch(o.correct ? /^Tak/ : /^Nie/);
      }
      const right = inst.axes.map((a) => a.options.findIndex((o) => o.correct));
      expect(gradeAnswer(inst, { kind: 'texture', picks: right })).toBe('correct');
      const oneWrong = right.map((r, i) => (i === 0 ? (r + 1) % 3 : r));
      expect(gradeAnswer(inst, { kind: 'texture', picks: oneWrong })).toBe('wrong');
      expect(gradeAnswer(inst, { kind: 'texture', picks: right.slice(1) })).toBe('wrong');
    }
  });

  it('tekstura: połączony flop ma w wyjaśnieniu przykład strita', () => {
    let seen = 0;
    for (const inst of instantiate({ ...texture, axes: ['ranks'] } as Drill, 'l', createRng(8))) {
      if (inst.kind !== 'texture') continue;
      const right = inst.axes[0]!.options.find((o) => o.correct)!;
      if (right.text === 'Połączony (connected)') {
        seen++;
        expect(right.why).toMatch(/np\. z [2-9TJQKA]{2}\./);
      }
    }
    expect(seen).toBeGreaterThan(0);
  });

  it('c-bet: najlepszy plan poprawny, drugi rozmiar to niedokładność, przy „czekam” każdy c-bet to błąd', () => {
    const seen = new Set<string>();
    for (const raw of instantiate(cbet, 'l', createRng(4))) {
      const inst = asChoice(raw);
      expect(inst.options.map((o) => o.text)).toEqual(['Czekam', 'Mały', 'Duży']);
      expect(inst.options.filter((o) => o.correct)).toHaveLength(1);
      expect(inst.table?.position).toBe('BTN');
      const best = inst.options.findIndex((o) => o.correct);
      seen.add(inst.options[best]!.text);
      for (let i = 0; i < 3; i++) {
        const g = gradeAnswer(inst, { kind: 'choice', index: i });
        if (i === best) expect(g).toBe('correct');
        else if (best === 0 || i === 0) expect(g).toBe('wrong');
        else expect(g).toBe('size');
      }
      expect(inst.explanation).toMatch(/^Ten flop jest/);
    }
    expect(seen).toEqual(new Set(['Czekam', 'Mały', 'Duży']));
  });

  it('c-bet i tekstura losują za każdym razem nowe rozdanie także w powtórce', () => {
    const rows: DrillRow[] = [
      { id: 'cb', lessonId: 'l', family: 'cb', drill: cbet },
      { id: 'tx', lessonId: 'l', family: 'tx', drill: texture },
    ];
    const s = buildFamilySession(rows, ['cb', 'tx'], createRng(2), 3);
    expect(s).toHaveLength(6);
  });
});

describe('teksty generatorów (audyt A-GEN-02, K5)', () => {
  it('nazwy układów w bierniku po „Obaj macie”', () => {
    const rng = createRng(17);
    let seen = 0;
    for (let i = 0; i < 400 && seen < 30; i++) {
      for (const raw of instantiate(gen('whoWins'), 'l', rng)) {
        const e = raw.explanation ?? '';
        const m = e.match(/Obaj macie ([^,]+),/);
        if (!m) continue;
        seen++;
        // nazwa w bierniku z nazwą angielską z terms.yaml (decyzja właściciela 4.10.2026)
        expect(['pokera (straight flush)', 'pokera królewskiego (royal flush)', 'karetę (four of a kind)', 'fulla (full house)', 'kolor (flush)', 'strita (straight)', 'trójkę (three of a kind)', 'dwie pary (two pair)', 'parę (pair)', 'wysoką kartę (high card)']).toContain(m[1]);
      }
    }
    expect(seen).toBeGreaterThan(0);
  });

  it('kicker: decyduje pierwsza różniąca się karta boczna', () => {
    const inst = instantiate(gen('whoWinsKicker'), 'l', createRng(2))[0]!;
    expect(inst.explanation).toContain('pierwsza różniąca się karta boczna (kicker)');
  });

  it('pot odds: pełne procenty jak eq.* w numbers.yaml (33%, 37,5%), bez MDF w M2', () => {
    expect(pctEquity(1 / 3)).toBe('33%');
    expect(pctEquity(0.375)).toBe('37,5%');
    expect(pctEquity(0.25)).toBe('25%');
    expect(pctEquity(2 / 7)).toBe('29%');
    for (const raw of instantiate(gen('potOdds'), 'l', createRng(8))) {
      const inst = asChoice(raw);
      for (const o of inst.options) {
        expect(o.text).toMatch(/^\d+(,5)?%$/);
        expect(o.why).not.toContain('MDF');
      }
    }
  });

  it('drawCall: szansa na jedną kartę (÷47 na flopie, ÷46 na turnie) i wzmianka o implied odds przy małej różnicy', () => {
    let near = 0;
    for (const street of ['flop', 'turn'] as const) {
      for (const raw of instantiate(gen('drawCall', { street }), 'l', createRng(31), 80)) {
        const inst = asChoice(raw);
        expect(inst.prompt.startsWith(street === 'flop' ? 'Flop.' : 'Turn.')).toBe(true);
        expect(inst.table!.board).toHaveLength(street === 'flop' ? 3 : 4);
        expect(inst.explanation).toContain(`z ${street === 'flop' ? 47 : 46} nieznanych kart`);
        expect(inst.explanation).toContain('szansa na jedną kartę');
        if (inst.explanation!.includes('implied odds')) {
          near++;
          expect(inst.options.find((o) => o.correct)!.text).toBe('Pasuję (fold)');
        }
      }
    }
    expect(near).toBeGreaterThan(0);
  });
});
