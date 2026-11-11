// Testy odtwarzające recenzji CQ (rola 06, audit) treści CO 5637200..ad62a2d: 06-tresci-001…004 (WYSOKIE).
// Raport: docs/tresci/recenzje/recenzja-co-ad62a2d.md. `it.fails` = błąd istnieje; po naprawie zamienić `przypadek` na `it`.
// Wyrocznie liczone od zera (ICM Malmutha-Harville'a, równowaga push/fold, outy z rang), bez modelu generatora poza samym losowaniem wariantu.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { wybierzWariant } from '@szkola/domena';
import { analyseOutsSpot, classOf, generateVariant, OUTS_PER_OVERCARD_RANK, rankOf, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { checkScenarioNaEkran, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

// CS (naprawy 001–004): 001, 003 i 004 przeszły na `it`. 002: SC-34 (icm-call) wrócił do szkiców (D-825); jego test równowagi ICM zostaje
// jako `it.fails` na szkicu: warunek powrotu do content/ (odpowiedź odporna na zakres all-inu z równowagi ICM albo nazwane założenie).
const przypadek = it;
const odtwarzaBlad = it.fails;
const root = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(root, 'content', 'pl', 'scenarios')).map((x) => x.template);
const szablon = (id: string) => pl.find((t) => t.id === id)!;
const szkice = loadScenarioTemplates(join(root, 'docs', 'tresci', 'szablony-robocze')).map((x) => x.template);
const gen = (t: (typeof pl)[number]) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;
const eqf = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as { classes: string[]; equity: number[][]; pairs: number[][] };
const ctx = {
  spots: compileRanges(join(root, 'content')).spots,
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
  equity169: eqf,
  cbetCases: content.evalRules.find((r) => r.id === 'R-M5-007')!.check.cases!,
};

describe('06-tresci-001: każdy szablon z treści startuje na ekranie (CN/CR: kontekst generatora składa ekran, bramka odrzuca resztę)', () => {
  // Ekran (aktywnoscScenariusza.ts) losuje wariant z `kontekst` składanym z bazy treści (`getKontekstGeneratora`, ta sama funkcja co ctx wyżej);
  // szablon, którego ekran nie obsługuje (icm-call, range-spot, brak akcji), odrzuca bramka `checkScenarioNaEkran` już w budowaniu.
  // Test ekranu na prawdziwej bazie: apps/mobile .../cs-tresc-realna.test.tsx.
  for (const t of pl) {
    it(`${t.id}: bramka ekranu nie ma zastrzeżeń`, () => {
      expect(checkScenarioNaEkran(t)).toEqual([]);
    });
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: wariant powstaje tak jak w aplikacji (z kontekstem)`, () => {
        expect(() => wybierzWariant(gen(t), level, 1, { historia: [], sesja: new Set(), kontekst: ctx })).not.toThrow();
      });
    }
  }
  it('szkic SC-34 (icm-call z poziomem trudnym) jest odrzucany przez bramkę ekranu do czasu 06-tresci-002 i nie ma go w content/ (WYS-002; D-889, D-986)', () => {
    const sc34 = szkice.find((t) => t.id === 'sc-34')!;
    expect(checkScenarioNaEkran(sc34).join('\n')).toMatch(/poziom trudny.*06-tresci-002/);
    expect(pl.some((t) => t.id === 'sc-34' || t.decisions.some((d) => d.kind === 'icm-call'))).toBe(false);
  });
});

describe('06-tresci-002: SC-34 poziom trudny — przy ICM po obu stronach (równowaga push/fold) część wariantów ma odpowiedź „sprawdzam”', () => {
  const E = eqf.equity;
  const P = eqf.pairs;
  const n = eqf.classes.length;
  function icm(stacks: number[], payouts: readonly number[]): number[] {
    const out = stacks.map(() => 0);
    const rec = (zostali: number[], miejsce: number, p: number) => {
      if (miejsce >= payouts.length || zostali.length === 0) return;
      const suma = zostali.reduce((a, k) => a + stacks[k]!, 0);
      for (const k of zostali) {
        const pk = (p * stacks[k]!) / suma;
        out[k]! += pk * payouts[miejsce]!;
        rec(zostali.filter((z) => z !== k), miejsce + 1, pk);
      }
    };
    rec(stacks.map((_, i) => i).filter((i) => stacks[i]! > 0), 0, 1);
    return out;
  }
  /** Gracz `a` zyskuje `d` żetonów kosztem `b`. */
  const po = (s: number[], a: number, b: number, d: number) => s.map((x, i) => (i === a ? x + d : i === b ? x - d : x));
  /** Fictitious play SB (push/fold) wobec BB (call/fold), wypłaty ICM; zwraca uśrednioną strategię push SB na klasę. */
  function rownowagaPush(stacks: number[], payouts: readonly number[], h: number, s: number, iteracje = 400): number[] {
    const risk = Math.min(stacks[h]!, stacks[s]!);
    const bb = risk / 10;
    const bbPas = icm(po(stacks, s, h, bb), payouts);
    const sbPas = icm(po(stacks, h, s, 0.5 * bb), payouts);
    const wygrH = icm(po(stacks, h, s, risk), payouts);
    const przegrH = icm(po(stacks, s, h, risk), payouts);
    const prog = (bbPas[h]! - przegrH[h]!) / (wygrH[h]! - przegrH[h]!);
    const sumaP = Array(n).fill(0);
    let p = Array(n).fill(0.5);
    for (let it = 1; it <= iteracje; it++) {
      const q = Array.from({ length: n }, (_, j) => {
        let w = 0, e = 0;
        for (let i = 0; i < n; i++) { const x = P[j]![i]! * p[i]!; w += x; e += x * E[j]![i]!; }
        return w > 0 && e / w >= prog ? 1 : 0;
      });
      for (let i = 0; i < n; i++) {
        let tot = 0, wc = 0, ec = 0;
        for (let j = 0; j < n; j++) { tot += P[i]![j]!; const x = P[i]![j]! * q[j]!; wc += x; ec += x * E[i]![j]!; }
        const pc = wc / tot, eqs = wc > 0 ? ec / wc : 0;
        const evPush = (1 - pc) * bbPas[s]! + pc * (eqs * przegrH[s]! + (1 - eqs) * wygrH[s]!);
        sumaP[i] += evPush >= sbPas[s]! ? 1 : 0;
      }
      p = sumaP.map((x) => x / it);
    }
    return p;
  }
  odtwarzaBlad('SZKIC SC-34 trudny, ziarna 1–12: „pas” zostaje poprawny także wobec zakresu all-inu SB z równowagi ICM (warunek powrotu do content/)', () => {
    const t = szkice.find((x) => x.id === 'sc-34')!;
    const bledy: string[] = [];
    for (let seed = 1; seed <= 12; seed++) {
      const v = generateVariant(gen(t), 'trudny', seed, ctx);
      const pt = v.points[0] as { stacks: number[]; payouts: number[]; heroIndex: number; villainIndex: number; required: number; correct: string };
      const p = rownowagaPush(pt.stacks, pt.payouts, pt.heroIndex, pt.villainIndex);
      const hc = eqf.classes.indexOf(classOf(v.hero[0], v.hero[1]));
      let w = 0, e = 0;
      for (let i = 0; i < n; i++) { const x = P[hc]![i]! * p[i]!; w += x; e += x * E[hc]![i]!; }
      const decyzja = e / w >= pt.required ? 'call' : 'fold';
      if (decyzja !== pt.correct) bledy.push(`${seed}: ${classOf(v.hero[0], v.hero[1])} equity wobec zakresu ICM ${(e / w).toFixed(3)} ≥ próg ${pt.required.toFixed(3)}, szablon ${pt.correct}`);
    }
    expect(bledy).toEqual([]);
  }, 300_000);
});

describe('06-tresci-003: stała outów na parę = liczba z numbers.yaml (poker-core nie czyta plików)', () => {
  it('OUTS_PER_OVERCARD_RANK = pair.outs.per-rank', () => {
    expect(OUTS_PER_OVERCARD_RANK).toBe(content.numbers.find((n) => n.key === 'pair.outs.per-rank')!.value);
  });
});

describe('06-tresci-003: szablony draw-call — „pas” odporny także wtedy, gdy gracz ma karty wyższe od stołu (outy na parę jak D1 w numbers.yaml)', () => {
  // Wyrocznia niezależna od generatora: outy drawa (analyseOutsSpot) + 3 na każdą rangę karty gracza wyższą od najwyższej karty stołu w punkcie
  // (bez usuwania nakładania się, więc górna granica outów); pas wymaga, żeby także przy tych outach szansa nie przekraczała ceny
  // i implied odds nie wystarczały (R-M7-008: potrzeba = zakład × nietrafiające ÷ outy − pula po zakładzie > stos za pulą).
  // Przy oczekiwanym „call” dolna granica (same outy drawa) jest już sprawdzana testami szablony-bs.
  for (const id of ['sc-02', 'sc-03', 'sc-19']) {
    for (const level of ['latwy', 'sredni'] as ScenarioLevel[]) {
      // CV (CI 42958391331): sc-19 łatwy ~4 s przy limicie 5 s → timeout na obciążonym runnerze. Te same ziarna 1–1500, w 3 zakresach po 500
      // (każdy ~1,3 s), limit czasu bez zmian i bez osłabienia pokrycia.
      for (const [od, doZiarna] of [[1, 500], [501, 1000], [1001, 1500]] as const) przypadek(`${id} ${level}: z kartami wyższymi od stołu pas zostaje odporny na cenę i implied odds (ziarna ${od}–${doZiarna})`, () => {
        const t = szablon(id);
        if (!t.levels.includes(level)) return;
        const bledy: string[] = [];
        for (let seed = od; seed <= doZiarna && bledy.length < 5; seed++) {
          const v = generateVariant(gen(t), level, seed);
          let zaklady = 0;
          v.decisions.forEach((d, i) => {
            const stol = v.board.slice(0, d.street === 'flop' ? 3 : 4);
            const top = Math.max(...stol.map(rankOf));
            const wyzsze = new Set(v.hero.map(rankOf).filter((r) => r > top)).size;
            const outy = analyseOutsSpot(v.hero, stol)!.outs + 3 * wyzsze;
            const nieznane = 52 - 2 - stol.length;
            const spec = t.decisions[i] as { villain?: string };
            const trafienie = spec.villain === 'all-in' && d.street === 'flop' ? 1 - ((nieznane - outy) * (nieznane - outy - 1)) / (nieznane * (nieznane - 1)) : outy / nieznane;
            const cena = d.bet / (d.pot + 2 * d.bet);
            zaklady += d.bet;
            if (d.correct !== 'fold' || wyzsze === 0) return;
            const potrzeba = (d.bet * (nieznane - outy)) / outy - (d.pot + d.bet);
            const martwe = 0.5; // pozycje BTN–BB w sc-02, sc-03 i sc-19: martwy SB 0,5 bb
            const zaPula = Math.max(0, t.stackBb! - (v.decisions[0]!.pot - martwe) / 2 - zaklady);
            if (trafienie >= cena || potrzeba <= zaPula) bledy.push(`${seed}#${i + 1}: ${outy} outów (${wyzsze} wyższe), szansa ${trafienie.toFixed(3)} / cena ${cena.toFixed(3)}, implied ${potrzeba.toFixed(1)} ≤ ${zaPula.toFixed(1)} bb`);
          });
        }
        expect(bledy).toEqual([]);
      });
    }
  }
});

describe('06-tresci-004: SC-11 i SC-12 „Otworzyłeś z Buttona” z ręką, której zakres otwarcia BTN aplikacji nie gra', () => {
  const pf = JSON.parse(readFileSync(join(root, 'content/ranges/preflop-6max-100bb.json'), 'utf8')) as { spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[] };
  const btn = pf.spots.find((s) => s.path === 'UTG:fold,HJ:fold,CO:fold' && s.player === 'BTN')!;
  const otwarcie = btn.strategy[btn.actions.indexOf('raise 2.5')]!;
  for (const id of ['sc-11', 'sc-12']) {
    for (const level of ['latwy', 'sredni'] as ScenarioLevel[]) {
      przypadek(`${id} ${level}: ręka gracza ma dodatnią częstość otwarcia z BTN (preflop-6max-100bb.json)`, () => {
        const t = szablon(id);
        const poza: string[] = [];
        for (let seed = 1; seed <= 300 && poza.length < 5; seed++) {
          const v = generateVariant(gen(t), level, seed, ctx);
          const hc = classOf(v.hero[0], v.hero[1]);
          if (!((otwarcie[hc] ?? 0) > 0)) poza.push(`${seed}: ${hc}`);
        }
        expect(poza).toEqual([]);
      });
    }
  }
});
