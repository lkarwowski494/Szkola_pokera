// Recenzja BJ (sesja-bj-recenzja), znalezisko 08-programista-001 (WYS): test odtwarzający, CZERWONY na 886b2be, bez naprawy.
// BR-GEN-003 i słownik `docs/brd/wymagania-scenariusze.md`: „granice losowania — warunki szablonu, w których poprawna decyzja
// w każdym punkcie decyzji się nie zmienia”; „w 100% wariantów ocena każdej akcji jest taka, jak w szablonie” (D-533).
// Generator liczy poprawną akcję osobno dla każdego wariantu (`scenario-gen.ts`, pole `correct`), więc w granicach jednego
// poziomu raz wychodzi „call”, raz „fold”, a szablon (content-schema `ScenarioDecision`) nie ma pola z oceną oczekiwaną.
// Szablony jak w packages/poker-core/test/scenario-gen.test.ts autora (granice D-551). Test oczekujący (D-175): poza `pnpm run ci`;
// rola 08 przenosi go do pakietu w commicie, który go zazielenia (po zmianie formatu i generatora, nie przez zmianę asercji).
import { describe, expect, it } from 'vitest';
import { BET_FRACTIONS, generateVariant, type GeneratorTemplate, type ScenarioLevel } from '../../../packages/poker-core/src';

const POZIOMY_GRANIC = {
  latwy: { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.1, marginMax: null, reject: ['rywal-ma-out-gracza', 'stol-sparowany'] },
  sredni: { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.02, marginMax: 0.1, reject: ['rywal-ma-out-gracza', 'stol-sparowany'] },
  trudny: { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.0001, marginMax: 0.02, reject: ['rywal-ma-out-gracza', 'stol-sparowany'] },
} as const;
const SZABLON_A: GeneratorTemplate = { id: 'test-a', levels: POZIOMY_GRANIC, decisions: [{ street: 'flop', pots: [20, 40, 60, 100], fractions: BET_FRACTIONS }] };
const SZABLON_B: GeneratorTemplate = {
  id: 'test-b', levels: { latwy: POZIOMY_GRANIC.latwy, sredni: POZIOMY_GRANIC.sredni },
  decisions: [{ street: 'flop', pots: [20, 40, 60], fractions: BET_FRACTIONS }, { street: 'turn', pots: [], fractions: BET_FRACTIONS }],
};

describe('08-programista-001 (BR-GEN-003): poprawna decyzja nie zmienia się między wariantami jednego poziomu', () => {
  for (const [nazwa, szablon] of [['A', SZABLON_A], ['B', SZABLON_B]] as const) {
    for (const poziom of ['latwy', 'sredni', 'trudny'] as ScenarioLevel[]) {
      if (!szablon.levels[poziom]) continue;
      it(`szablon ${nazwa}, poziom ${poziom}: jeden zestaw poprawnych akcji w 2000 wariantach`, () => {
        const zestawy = new Map<string, number>();
        for (let ziarno = 1; ziarno <= 2000; ziarno++) {
          const k = generateVariant(szablon, poziom, ziarno).decisions.map((d) => d.correct).join('>');
          zestawy.set(k, (zestawy.get(k) ?? 0) + 1);
        }
        expect(Object.fromEntries(zestawy), 'liczba wariantów na zestaw poprawnych akcji').toSatisfy((z: object) => Object.keys(z).length === 1);
      }, 120_000);
    }
  }
});
