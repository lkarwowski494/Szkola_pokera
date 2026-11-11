/// <reference types="jest" />
// Recenzja CP (D-043) zmian CN 9143dec..3ab616b (raport docs/programista/recenzje/recenzja-cn-3ab616b.md): testy odtwarzające WYS-001…003
// i wyrocznie niezależne od generatora. Naprawione w CR (docs/decyzje/CR.md): WYS-002 `it.failing` → `it`; WYS-001: bramka budowania wymaga pełnego
// zestawu akcji (D-815, test w tools/content-build/test/cp-recenzja-cn.test.ts), więc ekran nie dostaje szablonu z niepełnymi akcjami, a tu zostaje
// kontrakt ekranu dla pełnych szablonów (ŚR-004); WYS-003: icm-call poza ekranem do czasu projektu roli 04 (D-807, D-817), test bramki w content-build.
import '@/i18n';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react-native';
import {
  akcjeSzablonu, applyAction, generateVariant, gradeDecision, gradingKitFrom, HAND_CLASSES, startHand,
  type Card, type EvalRule, type HandState, type PlayerAction, type ScenarioLevel, type TableConfig, type Verdict,
} from '@szkola/poker-core';
import type { OcenaOdpowiedzi } from '@szkola/domena';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora } from '@/data/content/repo';
import { BEZ_LIMPU, CBET, dbCn, ICM, TROJBET } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { akcjePunktu, kwotaAkcji, naGenerator, ocenyAkcji, przebiegWariantu, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const wariant = (t: ScenarioTemplate, poziom: ScenarioLevel, ziarno: number) => generateVariant(naGenerator(t), poziom, ziarno, getKontekstGeneratora(dbCn, t));
const sesja = (szablon: ScenarioTemplate, wybory: Akcja[], poziom: ScenarioLevel = 'latwy', ziarno = 5): SesjaScenariusza => ({
  id: 's1', szablon, poziom, wariant: wariant(szablon, poziom, ziarno), wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: szablon.id } },
});
const ekran = async (s: SesjaScenariusza, faza: 'decyzja' | 'ocena') => {
  await render(<PrzebiegScenariusza sesja={s} faza={faza} koniec={faza === 'ocena'} bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
};
const bezAkcji = (t: ScenarioTemplate, akcja: string): ScenarioTemplate => {
  const b = structuredClone(t);
  const d = b.decisions[0]!;
  (d as { actions: { action: string }[] }).actions = d.actions.filter((a) => a.action !== akcja);
  return b;
};

// ---------- WYS-001 / ŚR-004: kontrakt ekranu dla szablonów, które przechodzą bramkę (pełny zestaw akcji, D-815) ----------
describe.each([['c-bet', CBET], ['3-bet', TROJBET], ['bez limpu', BEZ_LIMPU]] as const)('CR ŚR-004: kontrakt bramka ⇔ ekran, %s', (_nazwa, szablon) => {
  const akcje = akcjeSzablonu(szablon.decisions[0]!.kind, szablon.decisions[0]!.kind === 'size-spot' ? szablon.decisions[0]!.check : undefined) ?? [];
  it('akcje ekranu = akcje wymagane przez bramkę = akcje szablonu (jedna definicja, poker-core `akcjeSzablonu`)', () => {
    for (let z = 1; z <= 5; z++) {
      const v = wariant(szablon, 'latwy', z);
      expect([...akcjePunktu(v.points[0]!)].sort()).toEqual([...akcje].sort());
    }
    expect(szablon.decisions[0]!.actions.map((a) => a.action).sort()).toEqual([...akcje].sort());
  });
  it('ekran decyzji pokazuje przycisk każdej akcji', async () => {
    await ekran(sesja(szablon, []), 'decyzja');
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(akcje.length);
  });
  for (const a of akcje) {
    it(`ocena akcji ${a} renderuje się i niesie ocenę silnika gry (bloki z wyjaśnieniem własnej akcji)`, async () => {
      await ekran(sesja(szablon, [a as Akcja]), 'ocena');
      expect(tekstEkranu()).toMatch(new RegExp(`Wyjaśnienie akcji ${a}\\.`));
    });
  }
});

// ---------- WYS-002: ocena ekranu vs ocena reguły w silniku gry ----------
const liczba = (k: string): number => {
  const w = dbCn.getFirstSync<{ value: number }>('SELECT value FROM numbers WHERE key = ?', k);
  if (!w) throw new Error(`brak liczby ${k}`);
  return w.value;
};
const regulyKit = JSON.parse(dbCn.getFirstSync<{ value: string }>('SELECT value FROM game_kit WHERE key = ?', 'evalRules')!.value) as EvalRule[];
// kit bez spotów solvera (jak wyrocznia F3 w CA, D-698): ocenia sama reguła punktu
const kit = gradingKitFrom({ number: liczba, rules: regulyKit, spots: [], solverFile: '-', players: 6 });
const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
const OCENY: Partial<Record<Verdict, OcenaOdpowiedzi>> = { compliant: 'zgodne', acceptable: 'dopuszczalne', inaccuracy: 'niedokladnosc', mistake: 'blad' };
const naOcene = (v: Verdict): OcenaOdpowiedzi => {
  const o = OCENY[v];
  if (o === undefined) throw new Error(`werdykt silnika ${v} poza skalą ocen scenariusza`);
  return o;
};
const rozdanie = (holes: ([Card, Card] | null)[], board: Card[], seq: PlayerAction[]): HandState => seq.reduce((st, a) => applyAction(st, a), startHand(cfg, 1, { holes, board }));

/** Ocena silnika gry (gradeDecision, grading.ts) każdej akcji punktu: wyrocznia niezależna od generatora i od ekranu. */
function ocenaSilnika(t: ScenarioTemplate, poziom: ScenarioLevel, ziarno: number): { regula: string; oceny: Partial<Record<Akcja, OcenaOdpowiedzi>> } {
  const v = wariant(t, poziom, ziarno);
  const p = v.points[0]!;
  const oceny: Partial<Record<Akcja, OcenaOdpowiedzi>> = {};
  let regula = '';
  if (p.point === 'cbet-case') {
    // UTG, HJ, CO pas; BTN (3) otwiera 2,5 bb; SB pas; BB (5) sprawdza i czeka; decyzja BTN na flopie (jak wyrocznia F2 w CA)
    const holes: ([Card, Card] | null)[] = Array(6).fill(null);
    holes[3] = v.hero;
    holes[5] = v.villain;
    const st = rozdanie(holes, v.board.slice(0, 3), [{ type: 'fold' }, { type: 'fold' }, { type: 'fold' }, { type: 'raise', to: 2.5 * BB }, { type: 'fold' }, { type: 'call' }, { type: 'check' }]);
    const pula = st.seats.reduce((s, x) => s + x.committed, 0);
    for (const a of ['check', 'bet-small', 'bet-big'] as const) {
      const f = gradeDecision(st, a === 'check' ? { type: 'check' } : { type: 'bet', to: Math.round(pula * liczba(a === 'bet-small' ? 'cbet.size.small' : 'cbet.size.big')) }, kit);
      regula = f.ruleId ?? '';
      oceny[a] = naOcene(f.verdict);
    }
  } else if (p.point === 'size-spot' && p.check === 'three-bet-size') {
    // UTG, HJ pas; CO (2) otwiera openBb; decyzja BTN (3)
    const spec = t.decisions[0] as { openBb: number };
    const st = rozdanie(Array(6).fill(null), [], [{ type: 'fold' }, { type: 'fold' }, { type: 'raise', to: spec.openBb * BB }]);
    for (const o of p.options) {
      const f = gradeDecision(st, { type: 'raise', to: Math.round((o.bb ?? 0) * BB) }, kit);
      regula = f.ruleId ?? '';
      oceny[o.action] = naOcene(f.verdict);
    }
  } else if (p.point === 'size-spot' && p.check === 'no-limp') {
    // UTG, HJ, CO, BTN pas; decyzja SB (4): limp (sprawdzenie dużego blinda) albo podbicie
    const st = rozdanie(Array(6).fill(null), [], [{ type: 'fold' }, { type: 'fold' }, { type: 'fold' }, { type: 'fold' }]);
    for (const o of p.options) {
      const f = gradeDecision(st, o.action === 'limp' ? { type: 'call' } : { type: 'raise', to: Math.round((o.bb ?? 0) * BB) }, kit);
      regula = f.ruleId ?? '';
      oceny[o.action] = naOcene(f.verdict);
    }
  }
  return { regula, oceny };
}

describe('CP WYS-002: ocena akcji ekranu F2/F3 zgodna z oceną reguły w silniku gry', () => {
  it('wyrocznia: silnik gry ocenia c-bet (R-M5-007, best small) jako zgodne / dopuszczalne / niedokładność, 3-bet złym rozmiarem jako niedokładność', () => {
    const c = ocenaSilnika(CBET, 'latwy', 5);
    expect(c.regula).toBe('R-M5-007');
    expect(c.oceny).toEqual({ 'bet-small': 'zgodne', check: 'dopuszczalne', 'bet-big': 'niedokladnosc' });
    const r = ocenaSilnika(TROJBET, 'latwy', 5);
    expect(r.regula).toBe('R-M4-001');
    expect(r.oceny).toEqual({ raise: 'zgodne', 'raise-small': 'niedokladnosc', 'raise-big': 'niedokladnosc' });
  });
  it('ekran niesie werdykty reguły: c-bet rzadsza akcja dopuszczalna, zły rozmiar niedokładność (D-793, ADR-04)', () => {
    expect(ocenyAkcji(wariant(CBET, 'latwy', 5), 0)).toEqual({ 'bet-small': 'zgodne', check: 'dopuszczalne', 'bet-big': 'niedokladnosc' });
  });
  it('ocena kroku (przebiegWariantu, RD-11) = pasek ocen akcji, także dla dopuszczalnej i niedokładności', () => {
    for (const [t, wybory] of [[CBET, ['bet-small', 'check', 'bet-big']], [TROJBET, ['raise', 'raise-small', 'raise-big']]] as const) {
      const v = wariant(t, 'latwy', 5);
      const pasek = ocenyAkcji(v, 0);
      for (const a of wybory) {
        const p = przebiegWariantu(v, [a]);
        expect(p.ok && p.wartosc.kroki[0]!.ocena).toBe(pasek[a]);
      }
    }
  });
  it('ekran oceny: wybór dopuszczalnej akcji pokazuje „Dopuszczalna” i pasek ocen z całą listą akcji (dopuszczalna, zgodna, niedokładność)', async () => {
    await ekran(sesja(CBET, ['check']), 'ocena');
    expect(tekstEkranu()).toMatch(/Ocena: Dopuszczalna/);
    expect(tekstEkranu()).toMatch(/Czekam \(check\) dopuszczalna, twój wybór, Mały c-bet zgodna, Duży c-bet niedokładność/);
  });
  for (const [nazwa, t] of [['c-bet', CBET], ['3-bet', TROJBET], ['bez limpu', BEZ_LIMPU]] as const) {
    it(`${nazwa}: oceny ekranu = oceny silnika gry (5 ziaren)`, () => {
      for (let z = 1; z <= 5; z++) expect(ocenyAkcji(wariant(t, 'latwy', z), 0)).toEqual(ocenaSilnika(t, 'latwy', z).oceny);
    });
  }
});

// ---------- ICM: wyrocznia niezależna (Malmuth-Harville) i dane decyzji na ekranie ----------
/** Equity turniejowe Malmuth-Harville, liczone niezależnie od poker-core/icm.ts. */
function icm(stosy: number[], wyplaty: readonly number[]): number[] {
  const n = stosy.length;
  const eq = Array(n).fill(0) as number[];
  const krok = (zostali: number[], miejsce: number, p: number) => {
    if (miejsce >= wyplaty.length || zostali.length === 0) return;
    const suma = zostali.reduce((s, i) => s + stosy[i]!, 0);
    for (const i of zostali) {
      const pi = (p * stosy[i]!) / suma;
      eq[i]! += pi * wyplaty[miejsce]!;
      krok(zostali.filter((j) => j !== i), miejsce + 1, pi);
    }
  };
  krok(stosy.map((_, i) => i).filter((i) => stosy[i]! > 0), 0, 1);
  return eq;
}
const eqPo = (stosy: number[], wyplaty: readonly number[], kto: number) => (stosy[kto]! <= 0 ? 0 : icm(stosy, wyplaty)[kto]!);
const equity169 = JSON.parse(readFileSync(join(__dirname, '../../../../../../tools/equity/equity169.json'), 'utf8')) as { classes: string[]; pairs: number[][]; equity: number[][] };
const pushSb10 = (JSON.parse(dbCn.getFirstSync<{ actions: string }>('SELECT actions FROM ranges WHERE id = ?', 'push.sb-10')!.actions) as { label: string; freqs: number[] }[]).find((a) => a.label === 'all-in')!.freqs;
function equityKlasy(hc: string): number {
  const i = equity169.classes.indexOf(hc);
  let w = 0;
  let s = 0;
  equity169.classes.forEach((vc, j) => {
    const x = (pushSb10[HAND_CLASSES.indexOf(vc as (typeof HAND_CLASSES)[number])] ?? 0) * equity169.pairs[i]![j]!;
    w += x;
    s += x * equity169.equity[i]![j]!;
  });
  return s / w;
}

describe('CP ICM: ocena icm-call zgodna z niezależnym rachunkiem, kwoty ekranu zgodne z linią BB wobec all-inu SB', () => {
  it('wyrocznia Malmuth-Harville + equity wobec zakresu push.sb-10: poprawna akcja i próg jak w wariancie (3 poziomy × 8 ziaren)', () => {
    for (const poziom of ['latwy', 'sredni', 'trudny'] as const) {
      for (let z = 1; z <= 8; z++) {
        const p = wariant(ICM, poziom, z).points[0]!;
        if (p.point !== 'icm-call') throw new Error('nie icm-call');
        const ryzyko = Math.min(p.stacks[p.heroIndex]!, p.stacks[p.villainIndex]!);
        const po = (d: number) => p.stacks.map((x, j) => (j === p.heroIndex ? x + d : j === p.villainIndex ? x - d : x));
        const bbZet = ryzyko / ICM.stackBb; // 10 bb efektywnie: BB traci przy pasie swój blind 1 bb
        const wygrana = eqPo(po(ryzyko), p.payouts, p.heroIndex);
        const przegrana = eqPo(po(-ryzyko), p.payouts, p.heroIndex);
        const pas = eqPo(po(-bbZet), p.payouts, p.heroIndex);
        const prog = (pas - przegrana) / (wygrana - przegrana);
        const eq = equityKlasy(p.handClass);
        expect(p.required).toBeCloseTo(prog, 9);
        expect(p.handEquity).toBeCloseTo(eq, 9);
        expect(p.correct).toBe(eq >= prog ? 'call' : 'fold');
        expect(kwotaAkcji(p, 'call', ICM)).toBe(ICM.stackBb - 1); // all-in SB 10 bb, BB dopłaca 9 bb
      }
    }
  });
  it('warunek wstępny: na poziomie trudnym (chipsDiffer) poprawna akcja ICM jest przeciwna do rachunku żetonów, a stosy i wypłaty zmieniają próg', () => {
    const p = wariant(ICM, 'trudny', 5).points[0]!;
    if (p.point !== 'icm-call') throw new Error('nie icm-call');
    expect(p.correct).toBe('fold');
    expect(p.handEquity).toBeGreaterThanOrEqual(0.5);
    expect(new Set(p.stacks).size).toBeGreaterThan(1);
  });
  // WYS-003 (CR, D-817): ekran decyzji ICM nie pokazuje wypłat i stosów, więc icm-call jest poza `RODZAJE_NA_EKRANIE` (bramka); test odrzucenia: tools/content-build/test/cp-recenzja-cn.test.ts.
});
