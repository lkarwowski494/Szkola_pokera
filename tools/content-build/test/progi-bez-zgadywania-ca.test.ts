// KO-056 e / NIS-006 (recenzja BZ): progi range.mixed.* nie mają zgadniętych wartości zapasowych (0,035 i 0,25 w dwóch miejscach).
// Brak liczby w numbers.yaml albo brak kontekstu generatora to błąd z nazwą brakującego elementu, nie cichy wynik z liczbą spoza źródła.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioGenerator, loadScenarioTemplates } from '../src/scenariusze';

describe('NIS-006: brak zgadywanych progów range.mixed.*', () => {
  it('źródła budowania nie zawierają literałów zapasowych progów (0,035 i 0,25)', () => {
    // Usunięcie liczby z numbers.yaml zatrzymują wcześniej reguły, które jej używają (R-M13-002), więc zachowanie sprawdza kontrola mechaniczna na źródle.
    for (const f of ['build.ts', 'scenariusze.ts']) {
      const kod = readFileSync(join(resolve(import.meta.dirname, '../src'), f), 'utf8').split('\n').filter((l) => !l.trim().startsWith('//'));
      expect(kod.filter((l) => /0\.035|0\.25\b/.test(l)), f).toEqual([]);
    }
  });
  it('checkScenarioGenerator bez kontekstu dla range-spot zgłasza brak GeneratorContext, nie wstawia progów', () => {
    const t = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'range-spot')).find((x) => x.template.id === 'sc-fx-rfi-btn')!.template as ScenarioTemplate;
    expect(checkScenarioGenerator(t).join('\n')).toMatch(/wymaga danych zakresów \(GeneratorContext\)/);
  });
});
