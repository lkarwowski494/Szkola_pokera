/// <reference types="jest" />
// CN (08-programista-001 CM): ekran scenariusza przekazuje generatorowi pełny GeneratorContext z bazy treści, więc szablony cbet-case (F2),
// size-spot (F3) i icm-call (F4) dają poprawny plan na ekranie (nie „plan_niepoprawny”), z akcjami własnymi dla punktu. Baza treści jest
// prawdziwa (tresc-*-pl.db: spoty, progi, reguły oceny); macierz equity dla icm-call dopisana do kopii bazy jak robi budowanie (game_kit.equity169).
// Szablony to fikcje testowe jak fixture CA (sc-fx-*), nie treść aplikacji.
import type { ScenarioTemplate } from '@szkola/content-schema';
import { generateVariant, type ScenarioLevel } from '@szkola/poker-core';
import { utworzZegar } from '@/platform/zegar';
import { BEZ_LIMPU, CBET, dbCn, ICM, TROJBET } from '@/test-utils/kontekstCn';
import { portTestowy } from '@/test-utils/postepTestowy';
import { SC01 } from '@/test-utils/szablonSc01';
import { getKontekstGeneratora } from '@/data/content/repo';
import { akcjePunktu, bloki, grafPunktow, kwotaAkcji, naGenerator, poprawnaAkcja, widokDecyzji } from '../wariant';
import { odpowiedzWScenariuszu, otworzScenariusz, type WejscieScenariusza } from '../aktywnoscScenariusza';

const db = dbCn;

const PRZYPADKI: { szablon: ScenarioTemplate; poziom: ScenarioLevel; akcje: string[]; poprawna: string }[] = [
  { szablon: CBET, poziom: 'latwy', akcje: ['check', 'bet-small', 'bet-big'], poprawna: 'bet-small' },
  { szablon: TROJBET, poziom: 'latwy', akcje: ['raise-small', 'raise', 'raise-big'], poprawna: 'raise' },
  { szablon: BEZ_LIMPU, poziom: 'latwy', akcje: ['limp', 'raise'], poprawna: 'raise' },
  { szablon: ICM, poziom: 'latwy', akcje: ['fold', 'call'], poprawna: 'fold' },
  { szablon: ICM, poziom: 'sredni', akcje: ['fold', 'call'], poprawna: 'call' },
  { szablon: ICM, poziom: 'trudny', akcje: ['fold', 'call'], poprawna: 'fold' },
];
const T0 = Date.UTC(2026, 10, 11, 10);
let n = 0;
const wejscie = (o: Partial<WejscieScenariusza>): WejscieScenariusza => ({
  szablon: SC01, poziom: 'sredni', tryb: 'nowe', limit: { bezLimitu: true }, ziarno: 77, sesja: new Set(),
  zegar: utworzZegar({ kalendarz: () => 'Europe/Warsaw', intl: () => null }, () => T0), noweId: () => `cn${++n}`, ...o,
});

describe('getKontekstGeneratora: kontekst z bazy treści', () => {
  it('szablon z samą linią draw-call nie potrzebuje kontekstu (undefined, jak dotąd)', () => {
    expect(getKontekstGeneratora(db, SC01)).toBeUndefined();
  });
  it('szablon z punktem F2–F4: spoty, progi, przypadki c-betu, reguły rozmiaru i macierz equity z bazy', () => {
    const k = getKontekstGeneratora(db, ICM);
    expect(k?.spots.map((s) => s.id)).toContain('push.sb-10');
    expect(k?.spots.length).toBe((db.getFirstSync<{ n: number }>('SELECT count(*) AS n FROM ranges')?.n ?? -1));
    expect(k?.thresholds).toEqual({
      mixedMin: db.getFirstSync<{ value: number }>("SELECT value FROM numbers WHERE key = 'range.mixed.min'")?.value,
      mixedLow: db.getFirstSync<{ value: number }>("SELECT value FROM numbers WHERE key = 'range.mixed.low'")?.value,
    });
    expect(k?.cbetCases?.length).toBeGreaterThan(0);
    expect(k?.sizeRules?.map((r) => r.check.kind)).toEqual(expect.arrayContaining(['open-size', 'three-bet-size', 'no-limp']));
    expect(k?.equity169?.classes.length).toBe(169);
  });
  it('baza bez progów oceny zakresów: undefined (generator odmówi punktu, bez zgadywanych wartości)', () => {
    const bez = { ...db, getFirstSync: ((q: string, ...p: never[]) => (/FROM numbers/.test(q) ? null : (db.getFirstSync as (q: string, ...p: never[]) => unknown)(q, ...p))) as typeof db.getFirstSync };
    expect(getKontekstGeneratora(bez, CBET)).toBeUndefined();
  });
});

describe.each(PRZYPADKI)('$szablon.id / $poziom: ekran z kontekstem', ({ szablon, poziom, akcje: oczekiwane, poprawna }) => {
  const kontekst = getKontekstGeneratora(db, szablon);
  it('bez kontekstu: „plan_niepoprawny” (stan sprzed CN, opisany w recenzji CM ŚR-001)', async () => {
    const { port } = await portTestowy();
    const r = await otworzScenariusz(port, wejscie({ szablon, poziom }));
    expect(r).toEqual({ ok: false, powod: 'plan_niepoprawny' });
  });
  it('z kontekstem: rozdanie startuje, plan ma jeden krok z akcjami punktu, a wariant jest w granicach poziomu', async () => {
    const { port } = await portTestowy();
    const r = await otworzScenariusz(port, wejscie({ szablon, poziom, kontekst }));
    if (!r.ok) throw new Error(`otworzScenariusz: ${r.powod}`);
    const v = r.wartosc.wariant;
    expect(v.points).toHaveLength(1);
    expect(akcjePunktu(v.points[0]!)).toEqual(oczekiwane);
    expect(poprawnaAkcja(v.points[0]!)).toBe(poprawna);
    expect(r.wartosc.aktywnosc.plan.liczbaKrokow).toBe(1);
    expect(r.wartosc.aktywnosc.plan.decyzje).toEqual(grafPunktow(v));
    expect(r.wartosc.aktywnosc.plan.decyzje?.[0]?.map((a) => a.akcja)).toEqual(oczekiwane);
    expect(v.fingerprint).toBe(generateVariant(naGenerator(szablon), poziom, v.seed, kontekst).fingerprint);
  });
  it('poprawna akcja = „zgodne” i koniec; każda inna = „błąd”; wyniki zapisane w bazie postępu', async () => {
    for (const a of oczekiwane) {
      const { port } = await portTestowy();
      const s = await otworzScenariusz(port, wejscie({ szablon, poziom, kontekst }));
      if (!s.ok) throw new Error(`otworzScenariusz: ${s.powod}`);
      const o = await odpowiedzWScenariuszu(port, s.wartosc, a as never, 800, T0 + 1);
      if (!o.ok) throw new Error(`odpowiedz ${a}: ${o.powod}`);
      expect(o.wartosc.koniec).toBe('koniec');
      expect(o.wartosc.sesja.aktywnosc.stan).toBe('zakonczona');
      const dobra = a === poprawna;
      const bl = bloki(s.wartosc.wariant, szablon, 0, a as never, (k) => k);
      expect(bl.map((b) => b.rodzaj)).toEqual(dobra ? ['dobrze', ...oczekiwane.filter((x) => x !== a).map(() => 'dlaczego_nie')] : ['slabsza', 'lepsza']);
    }
  });
  it('wznowienie rozdania w toku odtwarza ten sam wariant z kontekstem', async () => {
    const { port, sciezka } = await portTestowy();
    const s = await otworzScenariusz(port, wejscie({ szablon, poziom, kontekst }));
    if (!s.ok) throw new Error(`otworzScenariusz: ${s.powod}`);
    const { port: port2 } = await portTestowy(sciezka);
    const w = await otworzScenariusz(port2, wejscie({ szablon, poziom, kontekst, ziarno: 5 }));
    if (!w.ok) throw new Error(`wznowienie: ${w.powod}`);
    expect(w.wartosc.id).toBe(s.wartosc.id);
    expect(w.wartosc.wariant).toEqual(s.wartosc.wariant);
  });
});

describe('widok i kwoty akcji', () => {
  it('icm-call: pula i dopłata z stosu i blinda gracza (BB 1 bb przy 10 bb: pula 11 bb, dopłata 9 bb)', () => {
    const k = getKontekstGeneratora(db, ICM);
    const v = generateVariant(naGenerator(ICM), 'latwy', 3, k);
    const w = widokDecyzji(v, 0, ICM);
    expect(w).toMatchObject({ ulica: 'preflop', stol: [], pulaBb: 11, doSprawdzeniaBb: 9 });
    expect(kwotaAkcji(v.points[0]!, 'call', ICM)).toBe(9);
    expect(kwotaAkcji(v.points[0]!, 'fold', ICM)).toBeNull();
  });
  it('size-spot: kwoty z wariantu (3-bet z open 2,5 bb) i limp jako dopłata do blinda (SB 0,5 bb)', () => {
    const v3 = generateVariant(naGenerator(TROJBET), 'latwy', 3, getKontekstGeneratora(db, TROJBET));
    const p3 = v3.points[0]!;
    const standard = p3.point === 'size-spot' ? p3.options.find((o) => o.action === 'raise')?.bb : undefined;
    expect(standard).toBeGreaterThan(2.5);
    expect(kwotaAkcji(p3, 'raise', TROJBET)).toBe(standard);
    const vl = generateVariant(naGenerator(BEZ_LIMPU), 'latwy', 3, getKontekstGeneratora(db, BEZ_LIMPU));
    expect(kwotaAkcji(vl.points[0]!, 'limp', BEZ_LIMPU)).toBe(0.5);
  });
  it('cbet-case: flop widoczny, bez puli i kwot', () => {
    const v = generateVariant(naGenerator(CBET), 'latwy', 3, getKontekstGeneratora(db, CBET));
    expect(widokDecyzji(v, 0, CBET)).toMatchObject({ ulica: 'flop', pulaBb: null, doSprawdzeniaBb: null });
    expect(widokDecyzji(v, 0, CBET).stol).toHaveLength(3);
  });
});
