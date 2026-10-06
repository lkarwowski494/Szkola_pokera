import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FlopHeight, FlopRanks, FlopSuits, FlopWetness, RuleDef, TextureAxis } from '@szkola/content-schema';
import { TEXTURE_AXES, TEXTURE_VALUES, WETNESS_POINTS, WETNESS_THRESHOLDS, classifyFlop, parseCards } from '@szkola/poker-core';
import { checkCbetCases, checkExamFile, compileContent, contentDbFileName, staleContentDbs, VOCAB_MIN_TERMS, vocabEligible } from '../src/build';
import { loadTerms } from '../src/terms';
import { compileMarkdown } from '../src/markdown';
import { findHardcodedNumbers, formatNumber, normCdf, resolveNumbers, substitute } from '../src/numbers';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');

describe('markdown', () => {
  it('kompiluje karty, pogrubienie, ramki, wzory i tabele', () => {
    const ast = compileMarkdown('Masz **parę** [[As Ks]].\n\n:::note Uwaga\nTekst\n:::\n\n```formula\na = b\n```\n\n| A | B |\n|---|---|\n| 1 | [[2h]] |');
    expect(ast[0]).toEqual({ t: 'p', c: [{ t: 'text', v: 'Masz ' }, { t: 'text', v: 'parę', b: true }, { t: 'text', v: ' ' }, { t: 'cards', v: ['As', 'Ks'] }, { t: 'text', v: '.' }] });
    expect(ast[1]).toMatchObject({ t: 'note', title: 'Uwaga' });
    expect(ast[2]).toEqual({ t: 'formula', v: 'a = b' });
    expect(ast[3]).toMatchObject({ t: 'table' });
  });
  it('odrzuca nieobsługiwane elementy', () => {
    expect(() => compileMarkdown('# H1')).toThrow();
    expect(() => compileMarkdown('```js\nx\n```')).toThrow();
  });
});

describe('liczby', () => {
  it('formatuje po polsku', () => {
    expect(formatNumber(0.196, 'percent', 1)).toBe('19,6%');
    expect(formatNumber(2.5, 'bb', 1)).toBe('2,5bb');
  });
  it('liczy formuły i przerywa przy nieznanym kluczu', () => {
    const n = resolveNumbers({ x: { formula: 'requiredEquity', args: [100, 50], unit: 'percent', decimals: 0, source: 'test' } });
    expect(n.get('x')!.display).toBe('25%');
    expect(() => substitute('{{n:y}}', n, 'test', new Set())).toThrow(/nieznana liczba/);
  });
  it('liczy formuły z odwołaniami do innych liczb (product, sum, diff, requiredEquity) i wykrywa cykle', () => {
    const src = 'test';
    const n = resolveNumbers({
      open: { value: 2.5, unit: 'bb', decimals: 1, source: src },
      mult: { value: 3, unit: 'multiplier', decimals: 0, source: src },
      bb: { value: 1, unit: 'bb', decimals: 0, source: src },
      sb: { value: 0.5, unit: 'bb', decimals: 1, source: src },
      total: { formula: 'product', refs: ['open', 'mult'], unit: 'bb', decimals: 1, source: src },
      call: { formula: 'diff', refs: ['open', 'bb'], unit: 'bb', decimals: 1, source: src },
      before: { formula: 'sum', refs: ['sb', 'bb', 'bb'], unit: 'bb', decimals: 1, source: src },
      price: { formula: 'requiredEquity', refs: ['before', 'call'], unit: 'percent', decimals: 1, source: src },
    });
    expect(n.get('total')!.display).toBe('7,5bb');
    expect(n.get('call')!.display).toBe('1,5bb');
    expect(n.get('price')!.display).toBe('27,3%');
    expect(() =>
      resolveNumbers({
        a: { formula: 'sum', refs: ['b', 'b'], unit: 'bb', decimals: 0, source: src },
        b: { formula: 'sum', refs: ['a', 'a'], unit: 'bb', decimals: 0, source: src },
      }),
    ).toThrow(/Cykl/);
    expect(() => resolveNumbers({ a: { formula: 'sum', refs: ['zz', 'zz'], unit: 'bb', decimals: 0, source: src } })).toThrow(/nieznanej liczby/);
  });
  it('wykrywa liczby wpisane ręcznie', () => {
    expect(findHardcodedNumbers('masz 25% i {{n:x}}, stawiasz 2,5bb')).toEqual(['25%', '2,5bb']);
  });
});

describe('schemat', () => {
  it('reguła eksploatacyjna wymaga populacji', () => {
    const base = { id: 'R-M10-001', module: 'm10', if: 'abc', then: 'abc', because: 'abc', level: 'exploit', source: 'abc' };
    expect(RuleDef.safeParse(base).success).toBe(false);
    expect(RuleDef.safeParse({ ...base, population: 'NL25, Ignition' }).success).toBe(true);
  });
});

describe('treść projektu', () => {
  it('kompiluje się bez błędów i bez liczb wpisanych ręcznie', () => {
    const c = compileContent(contentDir);
    expect(c.lessons.length).toBeGreaterThan(0);
    expect(c.warnings.filter((w) => w.includes('wpisane ręcznie'))).toEqual([]);
    expect(c.warnings.filter((w) => w.includes('nie jest nigdzie używana'))).toEqual([]);
  });
  // dwie pełne kompilacje treści; przy rosnącej treści i obciążonym runnerze domyślne 5 s bywało za mało
  it('jest deterministyczna (ten sam hash)', () => {
    expect(compileContent(contentDir).hash).toBe(compileContent(contentDir).hash);
  }, 30_000);
});

describe('pula egzaminacyjna (content/pl/exams)', () => {
  const ctx = {
    moduleIds: new Set(['m1', 'm2']),
    familiesByModule: new Map([['m2', new Set(['m2.odds'])], ['m1', new Set(['m1.flow'])]]),
    examModules: new Set<string>(),
  };
  const ok = { module: 'm2', drills: [{ id: 'm2.exam.q1', family: 'm2.odds' }] };
  it('przyjmuje poprawny plik', () => {
    expect(() => checkExamFile(ok, 'm2.yaml', ctx)).not.toThrow();
  });
  it('odrzuca nieznany moduł, złą nazwę pliku, powtórzoną pulę, zły identyfikator i rodzinę spoza lekcji modułu', () => {
    expect(() => checkExamFile({ ...ok, module: 'm9' }, 'm9.yaml', ctx)).toThrow(/nieznany moduł/);
    expect(() => checkExamFile(ok, 'm3.yaml', ctx)).toThrow(/musi się nazywać m2.yaml/);
    expect(() => checkExamFile(ok, 'm2.yaml', { ...ctx, examModules: new Set(['m2']) })).toThrow(/powtórzona pula/);
    expect(() => checkExamFile({ module: 'm2', drills: [{ id: 'm2.q1', family: 'm2.odds' }] }, 'm2.yaml', ctx)).toThrow(/m2\.exam\./);
    expect(() => checkExamFile({ module: 'm2', drills: [{ id: 'm2.exam.q1', family: 'm1.flow' }] }, 'm2.yaml', ctx)).toThrow(/nie występuje w lekcjach modułu m2/);
  });

  // kopia treści z dodatkową pulą: zadania egzaminu przechodzą tę samą kompilację co zadania lekcji i nie trafiają do lekcji
  const withExam = (yaml: string) => {
    const root = mkdtempSync(join(tmpdir(), 'exam-'));
    try {
      cpSync(contentDir, join(root, 'content'), { recursive: true });
      symlinkSync(join(contentDir, '..', 'tools'), join(root, 'tools'));
      // tylko pula z testu: prawdziwe pule (content/pl/exams) usuwamy z kopii
      rmSync(join(root, 'content/pl/exams'), { recursive: true, force: true });
      mkdirSync(join(root, 'content/pl/exams'), { recursive: true });
      writeFileSync(join(root, 'content/pl/exams/m2.yaml'), yaml);
      return compileContent(join(root, 'content'));
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  };
  const examYaml = (rule: string) => `module: m2
drills:
  - kind: choice
    id: m2.exam.test1
    family: m2.odds
    rules: [${rule}]
    prompt: Test
    options:
      - text: Tak
        correct: true
        why: Bo tak.
      - text: Nie
        correct: false
        why: Bo nie.
`;
  it('zapisuje pulę osobno od lekcji i sprawdza reguły zadań', () => {
    const c = withExam(examYaml('R-M2-002'));
    expect(c.exams).toEqual([{ module: 'm2', drills: [expect.objectContaining({ id: 'm2.exam.test1', family: 'm2.odds' })] }]);
    expect(c.lessons.flatMap((l) => l.drills).some((d) => d.id.includes('.exam.'))).toBe(false);
    expect(() => withExam(examYaml('R-M2-999'))).toThrow(/exams\/m2.yaml: zadanie m2.exam.test1: nieznana reguła R-M2-999/);
  }, 30_000);
});

describe('nowe typy zadań (B-015, B-016, B-017)', () => {
  const c = compileContent(contentDir);
  const drills = c.lessons.flatMap((l) => l.drills);

  it('zadania liczbowe mają odpowiedź z numbers.yaml (wartość, jednostka, format)', () => {
    const numeric = drills.filter((d) => d.kind === 'numeric');
    expect(numeric.length).toBeGreaterThan(0);
    for (const d of numeric) {
      const n = c.numbers.find((x) => x.key === d.answer)!;
      expect(d.value).toBe(n.value);
      expect(d.display).toBe(n.display);
      expect(d.unit).toBeTruthy();
      expect(d.prompt + d.explanation).not.toContain('{{');
    }
  });

  it('malowanie wskazuje istniejący spot', () => {
    const ids = new Set(c.ranges.map((r) => r.id));
    const paint = drills.filter((d) => d.kind === 'paint');
    expect(paint.length).toBeGreaterThan(0);
    for (const d of paint) expect(ids.has(d.spot)).toBe(true);
  });

  it('błędne rozmiary w spotach mają podstawione liczby; błąd rozmiaru nigdy nie jest poprawny', () => {
    const sizes = c.ranges.flatMap((r) => r.groups.flatMap((g) => g.wrongSizes ?? []));
    expect(sizes.length).toBeGreaterThan(0);
    for (const w of sizes) expect(w.text + w.why).not.toContain('{{');
    for (const d of drills) if (d.kind === 'choice') for (const o of d.options) expect(o.sizeError && o.correct).toBeFalsy();
  });
});

describe('flop: tekstura i c-bet (M5, schemat w wersji 3)', () => {
  const c = compileContent(contentDir);
  const drills = c.lessons.flatMap((l) => l.drills);

  it('missProbability: ręka bez pary chybia flop w 67,6% przypadków', () => {
    const n = resolveNumbers({ x: { formula: 'missProbability', args: [6, 50, 3], unit: 'percent', decimals: 1, source: 'test' } });
    expect(n.get('x')!.display).toBe('67,6%');
  });

  it('zadania c-bet mają podstawione liczby, a przypadki się wykluczają', () => {
    const cbet = drills.filter((d) => d.kind === 'cbet');
    expect(cbet.length).toBeGreaterThan(0);
    for (const d of cbet) {
      const texts = [d.prompt, ...Object.values(d.options), ...d.cases.flatMap((x) => Object.values(x.why))];
      for (const t of texts) expect(t).not.toContain('{{');
    }
    expect(() => checkCbetCases('t', [{ height: ['high'] }, { suits: ['rainbow'] }])).toThrow(/pasują do tego samego flopu/);
    expect(() => checkCbetCases('t', [{ suits: ['monotone'], ranks: ['paired'] }])).toThrow(/nie pasuje do żadnego/);
    expect(() => checkCbetCases('t', [{ height: ['high'] }, { height: ['low'] }])).not.toThrow();
  });

  it('osie tekstury w schemacie treści są takie same jak w poker-core (classifyFlop)', () => {
    expect(TextureAxis.options).toEqual([...TEXTURE_AXES]);
    expect(FlopHeight.options).toEqual([...TEXTURE_VALUES.height]);
    expect(FlopSuits.options).toEqual([...TEXTURE_VALUES.suits]);
    expect(FlopRanks.options).toEqual([...TEXTURE_VALUES.ranks]);
    expect(FlopWetness.options).toEqual([...TEXTURE_VALUES.wetness]);
  });

  it('punkty i progi mokrości w numbers.yaml są tymi samymi stałymi co w poker-core (jedno źródło prawdy)', () => {
    const v = (k: string) => c.numbers.find((x) => x.key === k)?.value;
    expect(v('tex.points.straight.made')).toBe(WETNESS_POINTS.straight.made);
    expect(v('tex.points.straight.made-one')).toBe(WETNESS_POINTS.straight['made-one']);
    expect(v('tex.points.straight.draw')).toBe(WETNESS_POINTS.straight.draw);
    expect(v('tex.points.straight.none')).toBe(WETNESS_POINTS.straight.none);
    expect(v('tex.points.suits.rainbow')).toBe(WETNESS_POINTS.suits.rainbow);
    expect(v('tex.points.suits.two-tone')).toBe(WETNESS_POINTS.suits['two-tone']);
    expect(v('tex.points.suits.monotone')).toBe(WETNESS_POINTS.suits.monotone);
    expect(v('tex.threshold.medium')).toBe(WETNESS_THRESHOLDS.medium);
    expect(v('tex.threshold.wet')).toBe(WETNESS_THRESHOLDS.wet);
  });

  it('tabela mokrości w lekcji m5.l1 zgadza się z classifyFlop (punkty i nazwa tekstury)', () => {
    const src = readFileSync(join(contentDir, 'pl/lessons/m5-l1-tekstury.md'), 'utf8');
    const names: Record<string, string> = { suchy: 'dry', 'pośredni': 'medium', mokry: 'wet' };
    const value = (cell: string) => {
      const key = /\{\{n:([^}]+)\}\}/.exec(cell)?.[1];
      return c.numbers.find((x) => x.key === key)?.value;
    };
    const rows = src.split('\n').filter((l) => /^\| \[\[[^\]]+\]\] \|.*\{\{n:tex\./.test(l));
    expect(rows.length).toBeGreaterThanOrEqual(5);
    for (const row of rows) {
      const cells = row.split('|').slice(1, -1).map((x) => x.trim());
      const tex = classifyFlop(parseCards(/\[\[([^\]]+)\]\]/.exec(cells[0]!)![1]!));
      expect(value(cells[1]!), row).toBe(WETNESS_POINTS.suits[tex.suits]);
      expect(value(cells[2]!), row).toBe(WETNESS_POINTS.straight[tex.straight]);
      expect(value(cells[3]!), row).toBe(tex.wetnessPoints);
      // nazwa może stać w znaczniku terminu: {{t:dry}} albo {{t:wet|mokry}}
      const name = cells[4]!.replace(/^\{\{t:(dry|wet)\}\}$/, (_m, k: string) => (k === 'dry' ? 'suchy' : 'mokry')).replace(/^\{\{t:[a-z-]+\|([^}]+)\}\}$/, '$1');
      expect(names[name], row).toBe(tex.wetness);
    }
  });

  it('moduł M5 ma lekcje z zadaniami klasyfikacji tekstury, reguły bez niepodstawionych liczb', () => {
    const m5 = c.lessons.filter((l) => l.module === 'm5');
    expect(m5.length).toBeGreaterThanOrEqual(3);
    expect(m5.flatMap((l) => l.drills).some((d) => d.kind === 'texture')).toBe(true);
    for (const r of c.rules.filter((x) => x.module === 'm5')) expect(r.if + r.then + r.because).not.toContain('{{');
  });
});

describe('formuły ilorazu i rozmiaru geometrycznego (M7, M9)', () => {
  const u = { unit: 'ratio' as const, decimals: 3, source: 'test' };

  it('quotient: SPR po otwarciu i sprawdzeniu = 97,5 ÷ 5,5', () => {
    const n = resolveNumbers({ s: { value: 97.5, ...u }, p: { value: 5.5, ...u }, x: { formula: 'quotient', refs: ['s', 'p'], ...u, decimals: 1 } });
    expect(n.get('x')!.display).toBe('17,7');
  });

  it('quotient: dzielenie przez zero przerywa budowanie', () => {
    expect(() => resolveNumbers({ z: { value: 0, ...u }, x: { formula: 'quotient', args: [1, 0], ...u } })).toThrow(/zero/);
  });

  it('geometric: trzy zakłady geometryczne wpłacają dokładnie cały stack', () => {
    const n = resolveNumbers({ x: { formula: 'geometric', args: [5.606061, 3], ...u } });
    const f = n.get('x')!.value;
    let pot = 1;
    let paid = 0;
    for (let i = 0; i < 3; i++) {
      paid += f * pot;
      pot += 2 * f * pot;
    }
    expect(paid).toBeCloseTo(5.606061, 9);
  });

  it('geometric: SPR 13 i trzy ulice dają zakład wielkości puli', () => {
    const n = resolveNumbers({ x: { formula: 'geometric', args: [13, 3], ...u } });
    expect(n.get('x')!.value).toBeCloseTo(1, 12);
  });
});

describe('formuły sqrt, exp i normCdf oraz format bb/100 i tysięcy (M12)', () => {
  const u = { unit: 'ratio' as const, decimals: 3, source: 'test' };

  it('sqrt: odchylenie wyniku po 100 tys. rąk = 80 × √1000', () => {
    const n = resolveNumbers({ b: { value: 1000, ...u }, r: { formula: 'sqrt', refs: ['b'], ...u }, sd: { value: 80, ...u }, x: { formula: 'product', refs: ['sd', 'r'], ...u, decimals: 0 } });
    expect(n.get('r')!.value).toBeCloseTo(31.6228, 4);
    expect(n.get('x')!.display).toBe('2530');
  });

  it('sqrt: liczba ujemna przerywa budowanie', () => {
    expect(() => resolveNumbers({ x: { formula: 'sqrt', args: [-1], ...u } })).toThrow(/ujemnej/);
  });

  it('exp: ryzyko bankructwa e^(−2·5·2000/6400) = 4,4% (przykład Primedope)', () => {
    const n = resolveNumbers({ x: { formula: 'exp', args: [(-2 * 5 * 2000) / 6400], unit: 'percent', decimals: 1, source: 'test' } });
    expect(n.get('x')!.display).toBe('4,4%');
  });

  it('normCdf: wartości z tablic rozkładu normalnego', () => {
    expect(normCdf(0)).toBeCloseTo(0.5, 7);
    expect(normCdf(1.96)).toBeCloseTo(0.975002, 6);
    expect(normCdf(-1.96)).toBeCloseTo(0.024998, 6);
    expect(normCdf(-3)).toBeCloseTo(0.0013499, 6);
    expect(normCdf(1) + normCdf(-1)).toBeCloseTo(1, 12);
  });

  it('formuły jednoargumentowe wymagają dokładnie jednego argumentu', () => {
    expect(() => resolveNumbers({ x: { formula: 'exp', args: [1, 2], ...u } })).toThrow(/1 argumentów/);
  });

  it('format: bb/100 i twarda spacja co trzy cyfry od pięciu cyfr', () => {
    expect(formatNumber(80, 'bb100', 0)).toBe('80bb/100');
    expect(formatNumber(2.53, 'bb100', 1)).toBe('2,5bb/100');
    expect(formatNumber(5000, 'bb', 0)).toBe('5000bb');
    expect(formatNumber(80000, 'bb', 0)).toBe('80 000bb');
    expect(formatNumber(1234567.5, 'count', 1)).toBe('1 234 567,5');
    expect(formatNumber(-25000, 'count', 0)).toBe('-25 000');
  });
});

describe('terminy PL ↔ EN (content/terms.yaml)', () => {
  const terms = loadTerms({
    flush: { pl: 'kolor', en: 'flush', area: 'hands', forms: ['kolor', 'koloru'], skip: ['kolor kart'], source: 'test https://example.com' },
    'small-blind': { pl: 'mały blind', en: 'small blind', abbr: 'SB', area: 'table', forms: ['mały blind', 'SB'], source: 'test https://example.com' },
    equity: { pl: 'equity', en: 'equity', area: 'math', source: 'test https://example.com' },
  });
  it('renderuje „forma (en)” przy pierwszym użyciu w jednostce, potem samą formę', () => {
    expect(terms.render('Masz {{t:flush}}, a rywal nie ma {{t:flush|koloru}}.', 'x')).toBe('Masz kolor (flush), a rywal nie ma koloru.');
    expect(terms.render('{{t:small-blind}} i {{t:small-blind|SB}}', 'x')).toBe('mały blind (small blind, SB) i SB');
    expect(terms.render('{{t:small-blind|SB}} płaci', 'x')).toBe('SB (small blind) płaci');
    expect(terms.render('{{t:equity}}', 'x')).toBe('equity');
  });
  it('jednostka tekstu: wspólny stan dla pól reguły', () => {
    const seen = new Set<string>();
    expect(terms.render('{{t:flush}}', 'r', seen)).toBe('kolor (flush)');
    expect(terms.render('{{t:flush}}', 'r', seen)).toBe('kolor');
  });
  it('bez „(…) (…)” i bez nawiasu w nawiasie', () => {
    expect(terms.render('{{t:flush}} (9 outów)', 'x')).toBe('kolor (flush; 9 outów)');
    expect(terms.render('{{t:flush}} (9 outów), a potem {{t:flush}}', 'x')).toBe('kolor (9 outów), a potem kolor (flush)');
    expect(terms.render('(dobierasz do {{t:flush|koloru}})', 'x')).toBe('(dobierasz do koloru [flush])');
  });
  it('nieznany klucz przerywa budowanie', () => {
    expect(() => terms.render('{{t:kolorr}}', 'm0.l1.q1')).toThrow(/m0.l1.q1: nieznany termin/);
  });
  it('wykrywa polską formę bez znacznika, pomija znaczniki, karty, adresy i frazy skip', () => {
    expect(terms.unmarked('Kolor bije strita, {{t:flush}} też.').map((m) => m.form)).toEqual(['Kolor']);
    expect(terms.unmarked('Kolor kart ma znaczenie. [[As Ks]] https://x.pl/kolor SB')).toEqual([{ form: 'SB', key: 'small-blind' }]);
  });
  it('odrzuca formy dla terminu bez nawiasu i powtórzoną formę', () => {
    expect(() => loadTerms({ x: { pl: 'flop', en: 'flop', area: 'table', forms: ['flop'], source: 'test https://example.com' } })).toThrow(/nie wymaga znacznika/);
    expect(() =>
      loadTerms({
        a: { pl: 'a', en: 'x', area: 'table', forms: ['zz'], source: 'test https://example.com' },
        b: { pl: 'b', en: 'y', area: 'table', forms: ['zz'], source: 'test https://example.com' },
      }),
    ).toThrow(/należy do a i b/);
  });
  it('prawdziwa treść: każdy termin ma źródło z adresem, ćwiczenie słownictwa ma w obszarze co najmniej 4 terminy', () => {
    const c = compileContent(contentDir);
    expect(c.terms.length).toBeGreaterThan(80);
    for (const t of c.terms) expect(t.source).toMatch(/https?:\/\//);
    const vocab = c.lessons.flatMap((l) => l.drills).filter((d) => d.kind === 'generated' && d.generator === 'vocab');
    expect(vocab.length).toBeGreaterThan(0);
    for (const d of vocab) {
      if (d.kind !== 'generated') continue;
      expect(c.terms.filter((t) => t.area === d.params.area && vocabEligible(t)).length).toBeGreaterThanOrEqual(VOCAB_MIN_TERMS);
    }
  });
});

describe('plik bazy treści', () => {
  it('stare wersje content-v*.db są wykrywane, aktualna i inne pliki nie', () => {
    const dir = mkdtempSync(join(tmpdir(), 'content-db-'));
    for (const f of ['content-v3.db', contentDbFileName(), 'content-v3.db-journal', 'inne.db']) writeFileSync(join(dir, f), '');
    expect(staleContentDbs(dir)).toEqual(['content-v3.db']);
    expect(staleContentDbs(join(dir, 'brak'))).toEqual([]);
    rmSync(dir, { recursive: true });
  });
});
