// ŚR-002 (recenzja CT, CV): trwała kontrola wersji generatora na PRAWDZIWYCH szablonach z content/pl (syntetyczny wzorzec w
// poker-core nie złapał zmiany CS). Zasada: pod tą samą GENERATOR_WERSJA każdy odcisk dla stałych ziaren musi być identyczny;
// zmiana wyniku generatora (albo treści szablonu) = podniesienie wersji i przeliczenie pliku w tym samym commicie:
//   GENERATOR_ODCISKI_ZAPISZ=1 pnpm --filter <pakiet content-build> exec vitest run test/generator-odciski.test.ts
// Wszystkie szablony z content/pl objęte kontrolą (sc-12 włączony po scaleniu CU, D-854).
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GENERATOR_WERSJA, generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const PLIK = join(import.meta.dirname, 'generator-odciski.json');
const POMINIETE = new Set<string>(); // D-852 cofnięte w D-854: sc-12 włączony po scaleniu CU
const ZIARNA = 200;
const templates = loadScenarioTemplates(join(root, 'content', 'pl', 'scenarios')).map((x) => x.template).filter((t) => !POMINIETE.has(t.id));
// Kontekst jak w aplikacji i w teście CT (zakresy z content/, progi i przypadki c-betu z reguły R-M5-007); od DU także reguły rozmiaru
// (size-spot, SC-06) i macierz equity (icm-call, SC-34), bez których generator odmawia tych punktów.
const ctx = {
  spots: compileRanges(join(root, 'content')).spots,
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
  cbetCases: content.evalRules.find((r) => r.id === 'R-M5-007')!.check.cases!,
  sizeRules: content.evalRules.filter((r) => ['open-size', 'three-bet-size', 'no-limp'].includes(r.check.kind)),
  equity169: JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')),
};
const gen = (t: (typeof templates)[number]) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

function oblicz(): Record<string, { sha: string; ziarno1: string }> {
  const wynik: Record<string, { sha: string; ziarno1: string }> = {};
  for (const t of templates) {
    for (const level of t.levels as ScenarioLevel[]) {
      const odciski: string[] = [];
      for (let seed = 1; seed <= ZIARNA; seed++) odciski.push(generateVariant(gen(t), level, seed, ctx).fingerprint);
      wynik[`${t.id}|${level}`] = { sha: createHash('sha256').update(odciski.join('\n')).digest('hex').slice(0, 16), ziarno1: odciski[0] ?? '' };
    }
  }
  return wynik;
}

describe('ŚR-002: odciski prawdziwych szablonów są związane z GENERATOR_WERSJA', () => {
  it(`ziarna 1–${ZIARNA} każdego szablonu i poziomu dają odciski zapisane dla tej wersji`, () => {
    const teraz = { wersja: GENERATOR_WERSJA, ziarna: ZIARNA, odciski: oblicz() };
    if (process.env.GENERATOR_ODCISKI_ZAPISZ === '1') writeFileSync(PLIK, JSON.stringify(teraz, null, 2) + '\n');
    const zapis: unknown = JSON.parse(readFileSync(PLIK, 'utf8'));
    // Różna wersja w pliku i w kodzie = podniesiono (albo cofnięto) wersję bez przeliczenia pliku; zła para też ma być czerwona.
    expect(zapis).toEqual(teraz);
  }, 600_000);
});
