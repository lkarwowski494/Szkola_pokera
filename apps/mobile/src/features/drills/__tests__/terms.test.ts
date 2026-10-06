/// <reference types="jest" />
/// <reference types="node" />
/**
 * Terminy PL ↔ EN w tekstach aplikacji (decyzja właściciela 4.10.2026, decyzje T-01…T-03 w dokumencie 13): teksty
 * zadań generowanych i interfejsu biorą nazwy angielskie z terms.generated.ts (to samo źródło co treść), a polska forma
 * terminu bez znacznika {{t:…}} to błąd, jak w content-build.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { termDefRevealsName, termMatcher, termText, TERM_PLACEHOLDER, type TermInfo } from '@szkola/content-schema';
import { createRng } from '@szkola/poker-core';
import { TERMS, type AppTerm } from '@/data/content/terms.generated';
import { instantiate } from '../engine';
import { gradeAnswer } from '../grade';
import { term, tr } from '../terms';
import { DEF_CONFUSABLE, vocabModes } from '../vocab';

const SOURCES = ['features/drills/text.pl.ts', 'i18n/pl.ts'].map((p) => join(__dirname, '../../..', p));

/** Kod bez komentarzy i nazw wywoływanych metod (np. `out.push(`): ani jedno, ani drugie nie trafia do interfejsu. */
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
    .replace(/\.[A-Za-z_$][\w$]*\(/g, '.(');
}

describe('terminy w tekstach aplikacji', () => {
  const matcher = termMatcher(Object.entries(TERMS) as [string, TermInfo][]);

  it.each(SOURCES)('%s: polskie terminy mają znacznik {{t:…}}', (path) => {
    const code = stripComments(readFileSync(path, 'utf8'));
    const lines = code.split('\n').flatMap((line, i) => matcher.find(line).map((m) => `${i + 1}: „${m.form}” → {{t:${m.key}|${m.form}}}`));
    expect(lines).toEqual([]);
  });

  it.each(SOURCES)('%s: każdy znacznik ma znany klucz', (path) => {
    const code = readFileSync(path, 'utf8');
    const unknown = [...code.matchAll(TERM_PLACEHOLDER)].map((m) => m[1]!).filter((k) => !(k in TERMS));
    expect(unknown).toEqual([]);
  });

  it('nawias przy pierwszym użyciu, skrót i nazwa angielska z jednego źródła', () => {
    expect(tr('Masz {{t:flush|kolor}}, rywal też ma {{t:flush|kolor}}.')).toBe('Masz kolor (flush), rywal też ma kolor.');
    expect(term('small-blind')).toBe('mały blind (small blind, SB)');
    expect(term('small-blind', 'SB')).toBe('SB (small blind)');
    expect(term('cutoff', 'CO')).toBe('CO (cutoff)');
    expect(term('button', 'Buttona')).toBe('Buttona (BTN)');
    expect(term('equity')).toBe('equity');
    expect(tr('{{t:raise|przebiłeś}} (3-bet)')).toBe('przebiłeś (raise; 3-bet)');
    expect(tr('(33% {{t:pot|puli}})')).toBe('(33% puli [pot])');
    expect(() => tr('{{t:nie-ma-takiego}}')).toThrow(/nieznany termin/);
  });
});

describe('ćwiczenie słownictwa PL ↔ EN', () => {
  const drill = (area: string, dir = 'both') => ({ kind: 'generated' as const, id: `t.${area}`, family: `vocab.${area}`, rules: [], generator: 'vocab' as const, params: { area, dir }, count: 4 });

  it('cztery różne opcje, jedna poprawna, bez powtórzeń terminu w jednej serii', () => {
    for (const area of ['hands', 'actions', 'table', 'positions', 'math', 'preflop', 'board', 'strategy', 'mental', 'tournament']) {
      for (let seed = 1; seed <= 20; seed++) {
        const insts = instantiate(drill(area), null, createRng(seed));
        expect(new Set(insts.map((x) => x.prompt)).size).toBe(insts.length);
        for (const inst of insts) {
          if (inst.kind !== 'choice') throw new Error('vocab daje zadanie z wyborem');
          expect(inst.options).toHaveLength(4);
          expect(new Set(inst.options.map((o) => o.text)).size).toBe(4);
          expect(inst.options.filter((o) => o.correct)).toHaveLength(1);
          expect(gradeAnswer(inst, { kind: 'choice', index: inst.options.findIndex((o) => o.correct) })).toBe('correct');
          expect(inst.family).toBe(`vocab.${area}`);
        }
      }
    }
  });

  it('PL → EN pyta o nazwę angielską z terms.yaml, EN → PL o polską', () => {
    const pl = instantiate(drill('hands', 'pl-en'), null, createRng(3));
    for (const inst of pl) {
      if (inst.kind !== 'choice') throw new Error();
      const right = inst.options.find((o) => o.correct)!.text;
      expect(Object.values(TERMS).some((t) => t.en === right && inst.prompt.includes(`„${t.pl}”`))).toBe(true);
    }
    const en = instantiate(drill('hands', 'en-pl'), null, createRng(3));
    for (const inst of en) {
      if (inst.kind !== 'choice') throw new Error();
      const right = inst.options.find((o) => o.correct)!.text;
      expect(Object.values(TERMS).some((t) => t.pl === right && inst.prompt.includes(`„${t.en}”`))).toBe(true);
    }
  });

  it('wyjaśnienie po odpowiedzi zawiera definicję terminu', () => {
    for (let seed = 1; seed <= 10; seed++) {
      for (const inst of instantiate(drill('actions'), null, createRng(seed))) {
        if (inst.kind !== 'choice') throw new Error();
        expect(Object.values(TERMS).some((t) => !!t.def && !!inst.explanation?.includes(t.def))).toBe(true);
      }
    }
  });

  it('check i call: definicje ostrzegają przed pomyleniem „czekam” ze „sprawdzam”', () => {
    expect(TERMS.check.def).toContain('Nie mylić ze „sprawdzam” – to call');
    expect(TERMS.call.def).toContain('Nie mylić z „czekam” – to check');
  });
});

describe('ćwiczenie słownictwa: definicja → termin (kierunek def)', () => {
  const AREAS = ['hands', 'actions', 'table', 'positions', 'math', 'preflop', 'board', 'strategy', 'mental', 'tournament'];
  const drill = (area: string) => ({ kind: 'generated' as const, id: `d.${area}`, family: `vocab.${area}`, rules: [], generator: 'vocab' as const, params: { area, dir: 'def' }, count: 4 });
  const entries = Object.entries(TERMS as Record<string, AppTerm>);
  const byDef = (prompt: string) => entries.find(([, t]) => !!t.def && prompt.includes(`„${t.def}”`));

  it('pytanie pokazuje definicję, poprawna opcja to polski termin z angielskim w nawiasie (T-01), cztery różne opcje', () => {
    for (const area of AREAS) {
      for (let seed = 1; seed <= 15; seed++) {
        for (const inst of instantiate(drill(area), null, createRng(seed))) {
          if (inst.kind !== 'choice') throw new Error();
          const hit = byDef(inst.prompt);
          expect(hit).toBeDefined();
          const [key, target] = hit!;
          expect(target.area).toBe(area);
          expect(inst.options).toHaveLength(4);
          expect(new Set(inst.options.map((o) => o.text)).size).toBe(4);
          const right = inst.options.filter((o) => o.correct);
          expect(right).toHaveLength(1);
          expect(right[0]!.text).toBe(termText(target as TermInfo));
          expect(gradeAnswer(inst, { kind: 'choice', index: inst.options.findIndex((o) => o.correct) })).toBe('correct');
          // żaden dystraktor nie jest terminem o niemal tej samej definicji
          const optionKeys = inst.options.map((o) => entries.find(([, t]) => termText(t as TermInfo) === o.text)![0]);
          for (const k of optionKeys) if (k !== key) expect(DEF_CONFUSABLE.some(([a, b]) => (a === key && b === k) || (a === k && b === key))).toBe(false);
        }
      }
    }
  });

  it('dystraktory najpierw z tego samego obszaru', () => {
    for (let seed = 1; seed <= 15; seed++) {
      for (const inst of instantiate(drill('tournament'), null, createRng(seed))) {
        if (inst.kind !== 'choice') throw new Error();
        const areas = inst.options.map((o) => entries.find(([, t]) => termText(t as TermInfo) === o.text)![1].area);
        expect(areas.every((a) => a === 'tournament')).toBe(true);
      }
    }
  });

  it('obejmuje terminy bez nawiasu (polska nazwa = angielska), np. flop i c-bet', () => {
    expect(vocabModes(TERMS.flop)).toEqual(['def']);
    expect(vocabModes(TERMS['c-bet'])).toEqual(['def']);
    const asked = new Set<string>();
    for (let seed = 1; seed <= 40; seed++) {
      for (const inst of instantiate(drill('table'), null, createRng(seed))) asked.add(byDef(inst.prompt)![0]);
    }
    expect(asked.has('flop')).toBe(true);
  });

  it('nie pyta o termin, którego definicja zdradza nazwę', () => {
    for (const [key, t] of entries) {
      if (vocabModes(t).includes('def')) expect([key, termDefRevealsName(t)]).toEqual([key, false]);
    }
    // „ulica”: przykład w definicji („value na trzech ulicach”) zdradza nazwę, więc tylko kierunki z nazwami
    expect(termDefRevealsName(TERMS.street)).toBe(true);
    expect(vocabModes(TERMS.street)).not.toContain('def');
  });

  it('pary mylących się definicji odnoszą się do istniejących terminów', () => {
    for (const [a, b] of DEF_CONFUSABLE) {
      expect(a in TERMS).toBe(true);
      expect(b in TERMS).toBe(true);
    }
  });
});
