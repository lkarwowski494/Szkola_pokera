// CK 08-programista-002: punkt range-spot nie działa na ekranie scenariusza (brak danych zakresów, interfejsu wielu akcji), więc
// budowanie treści odrzuca taki szablon z czytelnym błędem zamiast przepuścić go do bazy; linia all-in jest dozwolona.
import { cpSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { compileContent } from '../src/build';
import { checkScenarioNaEkran, loadScenarioTemplates } from '../src/scenariusze';

const repo = resolve(import.meta.dirname, '../../..');
const contentDir = join(repo, 'content');
const fx = (dir: string, plik: string) => readFileSync(join(import.meta.dirname, 'fixtures', dir, plik), 'utf8');


const zTreścią = (pliki: Record<string, string>) => {
  const root = mkdtempSync(join(tmpdir(), 'scen-ck-'));
  try {
    cpSync(contentDir, join(root, 'content'), { recursive: true });
    for (const j of readdirSync(join(root, 'content'), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) rmSync(join(root, 'content', j, 'scenarios'), { recursive: true, force: true });
    symlinkSync(join(repo, 'tools'), join(root, 'tools'));
    symlinkSync(join(repo, 'docs'), join(root, 'docs'));
    mkdirSync(join(root, 'content/pl/scenarios'), { recursive: true });
    for (const [n, y] of Object.entries(pliki)) writeFileSync(join(root, 'content/pl/scenarios', n), y);
    return compileContent(join(root, 'content'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};

describe('szablony na ekranie scenariusza (CK, 08-programista-002)', () => {
  it('szablon z punktem range-spot: budowanie go przyjmuje (CX, D-866: ekran obsługuje akcje spotu; wcześniej D-755 odrzucał)', () => {
    expect(() => zTreścią({ 'sc-fx-rfi-btn.yaml': fx('range-spot', 'sc-fx-rfi-btn.yaml') })).not.toThrow(/nie jest jeszcze obsługiwany na ekranie scenariusza/);
  });
  it('szablon z linią all-in nie jest odrzucany jako nieobsługiwany na ekranie (ekran dostaje stackBb)', () => {
    const [w] = loadScenarioTemplates(join(import.meta.dirname, 'fixtures', 'scenariusze')).filter((x) => x.template.id === 'sc-fx-allin-draw');
    expect(w).toBeDefined();
    expect(checkScenarioNaEkran(w!.template)).toEqual([]);
  });
  it('fixture range-spot przechodzi bramkę ekranu (CX, D-866)', () => {
    for (const { template } of loadScenarioTemplates(join(import.meta.dirname, 'fixtures', 'range-spot'))) expect(checkScenarioNaEkran(template)).toEqual([]);
  });
});
