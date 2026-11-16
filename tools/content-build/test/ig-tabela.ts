// IG: tabela głębokości startu (stack, który widzi ekran startu: `stackBb`) vs. zapotrzebowanie wariantów dla wszystkich szablonów `content/pl`.
// Uruchomienie: `cd tools/content-build && npx tsx test/ig-tabela.ts > ../../docs/tresci/dowody/ig-stos-start.txt`. Tylko odczyt.
// Spr-call/geo-size: próbka ziaren z generatora (start = stack + wkład gracza). Pozostałe rodzaje: rachunek ze specyfikacji (wkład przed flopem + największy zakład z pul i ułamków).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { deadBlindsBb, type Equity169Data, type GeneratorContext } from '@szkola/poker-core';
import { loadScenarioTemplates } from '../src/scenariusze';
import { compileRanges } from '../src/ranges';
import { probkiStosow, wkladGracza } from './stos-start';

const korzen = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(korzen, 'content', 'pl', 'scenarios')).map((x) => x.template);
const ctx = { spots: compileRanges(join(korzen, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: JSON.parse(readFileSync(join(korzen, 'tools/equity/equity169.json'), 'utf8')) as Equity169Data } as unknown as GeneratorContext;
const f = (x: number) => String(Math.round(x * 100) / 100);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function zapotrzebowanie(t: any): { opis: string; max: number | null } {
  const d = t.decisions[0];
  const pos = t.positions;
  const pot = (d.pots ?? []) as number[];
  const max = (a: number[]) => Math.max(...a);
  switch (d.kind) {
    case 'defend': case 'river-catch': case 'draw-call': {
      if (pot.length === 0) return { opis: 'bez puli w szablonie', max: null };
      const w = Math.max(...pot.map((p) => wkladGracza(p, pos) + p * max(d.fractions)));
      return { opis: `wkład + sprawdzenie największego zakładu (pula ${f(max(pot))}, ułamek ${f(max(d.fractions))})`, max: w };
    }
    case 'turn-bet': case 'flop-size': return { opis: `wkład + duży zakład gracza (pula ${f(max(pot))}, ułamek ${f(d.big)})`, max: Math.max(...pot.map((p) => wkladGracza(p, pos) + p * d.big)) };
    case 'check-raise': return { opis: `wkład + podbicie do ${f(d.multipliers.big)}× c-betu (pula ${f(max(pot))})`, max: Math.max(...pot.map((p) => wkladGracza(p, pos) + p * d.cbet * d.multipliers.big)) };
    case 'icm-call': return { opis: 'z konstrukcji: 1 bb = mniejszy stos pary ÷ stackBb (dp-icm-d889)', max: t.stackBb };
    default: return { opis: `bez pól stosu w wariancie (${d.kind})`, max: null };
  }
}

console.log('# IG: głębokość startu (stackBb z ekranu startu) a wymagania wariantów; 33 szablony content/pl; data: 2026-11-16');
console.log('# start wariantu = stack za pulą + wkład gracza; wkład = (pula − martwe blindy) ÷ 2, martwe = 1,5 − blind gracza − blind rywala (deadBlindsBb)');
console.log('id\tstackBb\trodzaj\tpoziom\tstart_min\tstart_max\tzgodne_z_stackBb\tpróbka/uwaga');
for (const t of pl) {
  const rodzaj = t.decisions.map((d: { kind?: string }) => d.kind).join('+');
  if (t.decisions.some((d: { kind?: string }) => d.kind === 'spr-call' || d.kind === 'geo-size')) {
    const p = probkiStosow(t, ctx, 150);
    for (const level of t.levels) {
      const s = p.filter((x) => x.level === level).map((x) => x.start);
      const [mn, mx] = [Math.min(...s), Math.max(...s)];
      console.log([t.id, t.stackBb, rodzaj, level, f(mn), f(mx), mn === t.stackBb && mx === t.stackBb ? 'TAK' : `NIE (${s.filter((x) => x !== t.stackBb).length}/${s.length} par pula×stack ≠ stackBb)`, `${s.length} par z 150 ziaren`].join('\t'));
    }
  } else {
    const z = zapotrzebowanie(t);
    console.log([t.id, t.stackBb, rodzaj, '*', '-', z.max === null ? '-' : f(z.max), z.max === null ? 'n/d (stackBb jedynym stosem)' : z.max <= t.stackBb ? 'TAK (zapotrzebowanie ≤ stackBb)' : `NIE (${f(z.max)} > ${t.stackBb}; sprawdź przycinanie ŚR-203)`, z.opis].join('\t'));
  }
}
void deadBlindsBb;
