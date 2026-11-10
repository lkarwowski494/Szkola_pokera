// KO-056 e / NIS-006 (recenzja BZ): progi range.mixed.* nie mają zgadniętych wartości zapasowych (0,035 i 0,25 w dwóch miejscach).
// Brak liczby w numbers.yaml albo brak kontekstu generatora to błąd z nazwą brakującego elementu, nie cichy wynik z liczbą spoza źródła.
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileContent } from '../src/build';
import { checkScenarioGenerator, loadScenarioTemplates } from '../src/scenariusze';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');

describe('NIS-006: brak zgadywanych progów range.mixed.*', () => {
  it('budowanie bez liczby range.mixed.min przy istniejących szablonach to błąd z nazwą liczby', () => {
    const root = mkdtempSync(join(tmpdir(), 'progi-'));
    try {
      cpSync(contentDir, join(root, 'content'), { recursive: true });
      cpSync(join(contentDir, '..', 'tools'), join(root, 'tools'), { recursive: true });
      cpSync(join(contentDir, '..', 'docs', 'tresci'), join(root, 'docs', 'tresci'), { recursive: true });
      const p = join(root, 'content', 'numbers.yaml');
      writeFileSync(p, readFileSync(p, 'utf8').split('\n').filter((l) => !l.startsWith('range.mixed.min:')).join('\n'));
      expect(() => compileContent(join(root, 'content'), 'pl')).toThrow(/szablony scenariuszy: brak liczby range\.mixed\.min/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }, 120_000);
  it('checkScenarioGenerator bez kontekstu dla range-spot zgłasza brak GeneratorContext, nie wstawia progów', () => {
    const t = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'range-spot')).find((x) => x.template.id === 'sc-fx-rfi-btn')!.template as ScenarioTemplate;
    expect(checkScenarioGenerator(t).join('\n')).toMatch(/wymaga danych zakresów \(GeneratorContext\)/);
  });
});
