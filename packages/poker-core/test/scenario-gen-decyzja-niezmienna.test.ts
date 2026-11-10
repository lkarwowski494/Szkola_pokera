// Recenzja BJ (sesja-bj-recenzja), znalezisko 08-programista-001 (WYS): test odtwarzający, CZERWONY na 886b2be, bez naprawy.
// BR-GEN-003 i słownik `docs/brd/wymagania-scenariusze.md`: „granice losowania — warunki szablonu, w których poprawna decyzja
// w każdym punkcie decyzji się nie zmienia”; „w 100% wariantów ocena każdej akcji jest taka, jak w szablonie” (D-533).
// Generator liczy poprawną akcję osobno dla każdego wariantu (`scenario-gen.ts`, pole `correct`), więc w granicach jednego
// poziomu raz wychodzi „call”, raz „fold”, a szablon (content-schema `ScenarioDecision`) nie ma pola z oceną oczekiwaną.
// Szablony jak w packages/poker-core/test/scenario-gen.test.ts autora (granice D-551), z oceną oczekiwaną `expected` (D-556).
// Przeniesiony z tests/akceptacja/generator/ w commicie naprawy (D-175). Asercja niezmienności bez zmian; dopisane: `expected` w
// szablonach (nowe pole formatu), asercja zgodności z `expected` i szablon C (łatwy „call” przy małych zakładach).
import { describe, expect, it } from 'vitest';
import { BET_FRACTIONS, generateVariant, type GeneratorTemplate, type ScenarioLevel } from '../src';

const G = {
  latwy: { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.1, marginMax: null, reject: ['rywal-ma-out-gracza', 'stol-sparowany'] },
  sredni: { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.02, marginMax: 0.1, reject: ['rywal-ma-out-gracza', 'stol-sparowany'] },
  trudny: { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.0001, marginMax: 0.02, reject: ['rywal-ma-out-gracza', 'stol-sparowany'] },
} as const;
const POZIOMY_GRANIC = {
  latwy: { ...G.latwy, expected: ['fold'] }, sredni: { ...G.sredni, expected: ['fold'] }, trudny: { ...G.trudny, expected: ['call'] },
} as const;
const SZABLON_A: GeneratorTemplate = { id: 'test-a', levels: POZIOMY_GRANIC, decisions: [{ street: 'flop', pots: [20, 40, 60, 100], fractions: BET_FRACTIONS }] };
// C: łatwy „call” — mały zakład (cena ≈ 8%) przy drawie ≥ 9 outów daje ≥ 10 pp przewagi.
const SZABLON_C: GeneratorTemplate = {
  id: 'test-c', levels: { latwy: { ...G.latwy, expected: ['call'] } }, decisions: [{ street: 'flop', pots: [20, 40, 60], fractions: [0.1] }],
};
const SZABLON_B: GeneratorTemplate = {
  id: 'test-b', levels: { latwy: { ...G.latwy, expected: ['fold', 'fold'] }, sredni: { ...G.sredni, expected: ['fold', 'call'] } },
  decisions: [{ street: 'flop', pots: [20, 40, 60], fractions: BET_FRACTIONS }, { street: 'turn', pots: [], fractions: BET_FRACTIONS }],
};

describe('08-programista-001 (BR-GEN-003): poprawna decyzja nie zmienia się między wariantami jednego poziomu', () => {
  for (const [nazwa, szablon] of [['A', SZABLON_A], ['B', SZABLON_B], ['C', SZABLON_C]] as const) {
    for (const poziom of ['latwy', 'sredni', 'trudny'] as ScenarioLevel[]) {
      if (!szablon.levels[poziom]) continue;
      it(`szablon ${nazwa}, poziom ${poziom}: jeden zestaw poprawnych akcji w 2000 wariantach`, () => {
        const zestawy = new Map<string, number>();
        for (let ziarno = 1; ziarno <= 2000; ziarno++) {
          const k = generateVariant(szablon, poziom, ziarno).decisions.map((d) => d.correct).join('>');
          zestawy.set(k, (zestawy.get(k) ?? 0) + 1);
        }
        expect(Object.fromEntries(zestawy), 'liczba wariantów na zestaw poprawnych akcji').toSatisfy((z: object) => Object.keys(z).length === 1);
        expect([...zestawy.keys()], 'zestaw zgodny z `expected` szablonu').toEqual([szablon.levels[poziom]!.expected.join('>')]);
      }, 120_000);
    }
  }
});
