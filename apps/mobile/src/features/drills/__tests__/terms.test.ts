/// <reference types="jest" />
/// <reference types="node" />
/**
 * Terminy PL ↔ EN w tekstach aplikacji (decyzja właściciela 4.10.2026, decyzje T-01…T-03 w dokumencie 13): teksty
 * zadań generowanych i interfejsu biorą nazwy angielskie z terms.generated.ts (to samo źródło co treść), a polska forma
 * terminu bez znacznika {{t:…}} to błąd, jak w content-build.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { termMatcher, TERM_PLACEHOLDER, type TermInfo } from '@szkola/content-schema';
import { createRng } from '@szkola/poker-core';
import { TERMS } from '@/data/content/terms.generated';
import { instantiate } from '../engine';
import { gradeAnswer } from '../grade';
import { term, tr } from '../terms';

const SOURCES = ['features/drills/text.pl.ts', 'i18n/pl.ts'].map((p) => join(__dirname, '../../..', p));

/** Kod bez komentarzy (komentarze nie trafiają do interfejsu). */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
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
    for (const area of ['hands', 'actions', 'table', 'positions', 'math', 'preflop', 'board', 'strategy', 'tournament']) {
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
});
