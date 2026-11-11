/// <reference types="jest" />
// DN (D-888, D-890; docs/design/scenariusz-akcje-i-liczby.md §3 „Kryteria akceptacji dla 08 («Liczby»)”): sekcja „Liczby” dla F2–F4 i nadkarty w draw-call.
// Oczekiwane liczby w testach liczone osobno od kodu (z wariantu i numbers.yaml), nie przepisane z wyniku funkcji.
import '@/i18n';
import i18n from '@/i18n';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react-native';
import { blindBb, deadBlindsBb, generateVariant, type ScenarioLevel, type ScenarioVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora, getScenarioTemplates } from '@/data/content/repo';
import { BEZ_LIMPU, CBET, dbCn, ICM, TROJBET } from '@/test-utils/kontekstCn';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { zdaniaLiczb } from '../liczby';
import { naGenerator, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const procent = (x: number, miejsca = 0) => `${(x * 100).toFixed(miejsca).replace('.', ',')}%`; // pl; osobno od formatujProcent
const bb = (x: number) => String(x).replace('.', ',');
const sesja = (szablon: ScenarioTemplate, poziom: ScenarioLevel, ziarno: number, wybory: Akcja[]): SesjaScenariusza => {
  const kontekst = getKontekstGeneratora(dbCn, szablon);
  return {
    id: 's1', szablon, poziom, wariant: generateVariant(naGenerator(szablon), poziom, ziarno, kontekst), wybory,
    ...(kontekst?.cbetSizes ? { rozmiaryCbet: kontekst.cbetSizes } : {}),
    aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: szablon.id } },
  } as unknown as SesjaScenariusza;
};
const liczba = (klucz: string): number => dbCn.getFirstSync<{ value: number }>('SELECT value FROM numbers WHERE key = ?', klucz)!.value;

describe('cbet-case: jedno zdanie z rozmiarami i ceną rywala f ÷ (1 + 2f) (kryterium 1)', () => {
  it('rozmiary z numbers.yaml; cena 20% (raz na 5) przy małym i 30% (raz na 3) przy dużym', () => {
    const f = liczba('cbet.size.small'), g = liczba('cbet.size.big');
    const cena = (x: number) => x / (1 + 2 * x); // sprawdzamy f do puli 1 + 2f
    const z = zdaniaLiczb(sesja(CBET, 'latwy', 5, ['check']), 0, 'check', t);
    expect(z).toHaveLength(1);
    expect(z[0]).toContain(`ok. ${procent(f)}`);
    expect(z[0]).toContain(`ok. ${procent(g)}`);
    expect(z[0]).toContain(`${procent(cena(f))} szans`);
    expect(z[0]).toContain(`raz na ${Math.round(1 / cena(f))}`);
    expect(z[0]).toContain(`${procent(cena(g))}, czyli raz na ${Math.round(1 / cena(g))}`);
    expect(z[0]).not.toContain('{{');
  });
});

describe('size-spot: cena rozmiaru dla rywala (kryterium 1, 5)', () => {
  const opcja = (w: ScenarioVariant, a: string): number => {
    const p = w.points[0]!;
    if (p.point !== 'size-spot') throw new Error('nie size-spot');
    return p.options.find((o) => o.action === a)!.bb!;
  };
  it('otwarcie z SB (no-limp): pula 2R, dopłata R − 1; limp: koszt 1 − blind', () => {
    const s = sesja(BEZ_LIMPU, 'latwy', 5, ['raise']);
    const R = opcja(s.wariant, 'raise');
    const cena = (R - 1) / (2 * R);
    const z = zdaniaLiczb(s, 0, 'raise', t);
    expect(z).toHaveLength(1);
    expect(z[0]).toContain(`do ${bb(R)} bb`);
    expect(z[0]).toContain(`dopłaca ${bb(R - 1)} bb do puli (pot) ${bb(2 * R)} bb`);
    expect(z[0]).toContain(`potrzebuje ${procent(cena)} szans`);
    expect(z[0]).toContain(`raz na ${Math.round(1 / cena)}`);
    const l = zdaniaLiczb(sesja(BEZ_LIMPU, 'latwy', 5, ['limp']), 0, 'limp', t);
    expect(l).toHaveLength(2); // standard + limp
    expect(l[1]).toContain(`Limp kosztuje ${bb(1 - blindBb('SB'))} bb`);
  });
  it('twój wybór inny niż standard: drugie zdanie z jego rozmiarem; ten sam rozmiar: jedno', () => {
    const s = sesja(TROJBET, 'latwy', 5, ['raise-big']);
    const z = zdaniaLiczb(s, 0, 'raise-big', t);
    expect(z).toHaveLength(2);
    expect(z[1]).toContain(`do ${bb(opcja(s.wariant, 'raise-big'))} bb`);
    expect(zdaniaLiczb(sesja(TROJBET, 'latwy', 5, ['raise']), 0, 'raise', t)).toHaveLength(1);
  });
  it('3-bet: dopłata R − O, pula 2R + martwe blindy (BTN wobec CO: 1,5 bb)', () => {
    const s = sesja(TROJBET, 'latwy', 5, ['raise']);
    const R = opcja(s.wariant, 'raise');
    const M = deadBlindsBb({ hero: 'BTN', villain: 'CO' });
    const cena = (R - 2.5) / (2 * R + M);
    const z = zdaniaLiczb(s, 0, 'raise', t);
    expect(z[0]).toContain(`dopłaca ${bb(R - 2.5)} bb do puli (pot) ${bb(2 * R + M)} bb`);
    expect(z[0]).toContain(`potrzebuje ${procent(cena)} szans`);
  });
});

describe('icm-call: equity, próg ICM i próg w grze o żetony z blindem (kryterium 4, D-890)', () => {
  it.each([['latwy', 1], ['sredni', 2], ['trudny', 3]] as const)('poziom %s: progZetony = (S − b) ÷ (2S) = 45%, equity i próg różne po zaokrągleniu, na10 w 2–9', (poziom, ziarno) => {
    const s = sesja(ICM, poziom, ziarno, ['call']);
    const p = s.wariant.points[0]!;
    if (p.point !== 'icm-call') throw new Error('nie icm-call');
    const z = zdaniaLiczb(s, 0, 'call', t);
    expect(z).toHaveLength(1);
    const prog = (10 - blindBb('BB')) / (2 * 10);
    expect(z[0]).toContain(`od ${procent(p.required)}`);
    expect(z[0]).toContain(`wystarczyłoby ${procent(prog)}`);
    expect(procent(prog)).toBe('45%');
    expect(procent(p.handEquity)).not.toBe(procent(p.required));
    const na10 = Math.round(10 * p.handEquity);
    expect(na10).toBeGreaterThanOrEqual(2);
    expect(na10).toBeLessThanOrEqual(9);
    expect(z[0]).toContain(`w ${na10} rozdaniach na 10`);
  });
});

describe('draw-call: nadkarty (kryterium 3)', () => {
  const szablony = getScenarioTemplates(dbCn).filter((x) => x.decisions.some((d) => d.kind === 'draw-call' || d.kind === undefined));
  it('baza ma szablony draw-call', () => expect(szablony.length).toBeGreaterThanOrEqual(3));
  it('zdanie o nadkartach tylko przy nadkarty > 0; dla correct = fold trafiszRazem < required we wszystkich wariantach (ziarna 1–60)', () => {
    let zNadkartami = 0, bezNadkart = 0, fold = 0;
    for (const szablon of szablony) {
      for (const poziom of szablon.levels as ScenarioLevel[]) {
        for (let ziarno = 1; ziarno <= 60; ziarno++) {
          let s: SesjaScenariusza;
          try { s = sesja(szablon, poziom, ziarno, ['fold']); } catch { continue; }
          const d = s.wariant.points[0]!;
          if (d.point !== 'draw-call') continue;
          const z = zdaniaLiczb(s, 0, 'fold', t);
          const ma = z.length === 2;
          if (ma) zNadkartami++; else bezNadkart++;
          expect(z.length).toBeGreaterThanOrEqual(1);
          expect(z.length).toBeLessThanOrEqual(2);
          if (ma && d.correct === 'fold') {
            fold++;
            const m = /trafisz w ([\d,]+)%/.exec(z[1]!);
            expect(m).not.toBeNull();
            expect(Number(m![1]!.replace(',', '.')) / 100).toBeLessThan(d.required);
          }
        }
      }
    }
    expect(zNadkartami).toBeGreaterThan(0);
    expect(bezNadkart).toBeGreaterThan(0);
    expect(fold).toBeGreaterThan(0);
  });
});

describe('klucze scenario.numbers.* nie mają cyfr poza znacznikami (kryterium 2)', () => {
  const slownik = (j: string) => JSON.parse(readFileSync(join(__dirname, `../../../i18n/locales/${j}.json`), 'utf8')) as { scenario: { numbers: Record<string, string> } };
  for (const j of ['pl', 'en']) {
    it(j, () => {
      const klucze = Object.keys(slownik(j).scenario.numbers);
      expect(klucze).toEqual(expect.arrayContaining(['cbet', 'sizeOpen', 'size3bet', 'limp', 'icm', 'overcardsFold', 'overcardsCall']));
      // dozwolone literały z dokumentu projektu: termin „3-bet” (odmiana) i skala „na 10” (N rozdań na 10); każda inna cyfra to liczba wpisana w kluczu
      for (const [k, v] of Object.entries(slownik(j).scenario.numbers)) expect([k, v.replace(/\{\{[^}]*\}\}/g, '').replace(/3-be\w*/g, '').replace(/\bna 10\b|\bin 10\b/g, '')]).not.toEqual([k, expect.stringMatching(/\d/)]);
    });
  }
});

describe('ekran: wiersz „Liczby” dla cbet-case, size-spot i icm-call; brak dla range-spot (kryterium 1)', () => {
  it.each([['cbet-case', CBET, 'check'], ['size-spot', TROJBET, 'raise'], ['icm-call', ICM, 'call']] as const)('%s ma wiersz „Liczby”', async (_n, szablon, wybor) => {
    await render(<PrzebiegScenariusza sesja={sesja(szablon, 'latwy', 5, [wybor])} faza="ocena" koniec bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
    expect(screen.getByTestId('liczby')).toBeTruthy();
  });
  it('zdaniaLiczb dla range-spot: pusta lista (częstości solvera to osobne zadanie)', () => {
    const wariant = { points: [{ point: 'range-spot', street: 'preflop', spot: 'rfi.utg', handClass: 'AA', options: [], correct: 'fold', freq: 1 }], board: [], hero: [0, 1] } as unknown as ScenarioVariant;
    const s = { wariant, szablon: CBET, wybory: [] } as unknown as SesjaScenariusza;
    expect(zdaniaLiczb(s, 0, 'fold', t)).toEqual([]);
  });
});
