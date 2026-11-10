// Sesja T (D-339, zgłoszenie sesji N): m2.l1 „Skąd te liczby” i R-M2-002 — granica 10 outów i błąd reguły 2 i 4
// („ok. 2 punkty procentowe”) z numbers.yaml, błąd liczony formułą, nie wpisany ręcznie (CLAUDE.md: zasady techniczne).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { hitProbability, ruleOf2And4 } from '@szkola/poker-core';
import { compileContent } from '../src/build';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');

describe('reguła 2 i 4: granica outów i największy błąd (D-339)', () => {
  const c = compileContent(contentDir, 'pl', { kontrolaGeneratora: false });
  const n = (k: string) => c.numbers.find((x) => x.key === k);

  it('błąd z numbers.yaml = największy |reguła − dokładnie| dla 1…granica outów, we wszystkich trzech sytuacjach lekcji', () => {
    const granica = n('rule24.outs.max')?.value;
    expect(granica).toBe(10);
    // sytuacje: flop → river (47 kart, 2 karty, × 4), flop → turn (47, 1, × 2), turn → river (46, 1, × 2)
    const sytuacje: [number, 1 | 2][] = [[47, 2], [47, 1], [46, 1]];
    let max = 0;
    for (let o = 1; o <= (granica ?? 0); o++) {
      for (const [niewidoczne, karty] of sytuacje) max = Math.max(max, Math.abs(ruleOf2And4(o, karty) - hitProbability(o, niewidoczne, karty)));
    }
    expect(n('rule24.error.max.pp')?.value).toBeCloseTo(max * 100, 9);
    expect(n('rule24.error.max.pp')?.display).toBe('2');
  });

  it('lekcja m2.l1 i R-M2-002 biorą obie liczby przez {{n:}} (bez „2 punkty” i „10 outów” na sztywno)', () => {
    const lekcja = readFileSync(join(contentDir, 'pl/lessons/m2-l1-outy.md'), 'utf8');
    const notka = /:::note Skąd te liczby\n([\s\S]*?):::/.exec(lekcja)?.[1] ?? '';
    expect(notka).toContain('{{n:rule24.error.max.pp}} punkty procentowe');
    expect(notka).toContain('{{n:rule24.outs.max}}');
    expect(notka).not.toMatch(/\b2 punkty|\b10\b/); // „Reguła 2 i 4” to nazwa, nie liczba z rachunku
    const regula = readFileSync(join(contentDir, 'pl/rules.yaml'), 'utf8');
    const r2 = /- id: R-M2-002\n[\s\S]*?\n  because: "([^"]*)"/.exec(regula)?.[1] ?? '';
    expect(r2).toContain('{{n:rule24.error.max.pp}}');
    expect(r2).toContain('{{n:rule24.outs.max}}');
  });
});
