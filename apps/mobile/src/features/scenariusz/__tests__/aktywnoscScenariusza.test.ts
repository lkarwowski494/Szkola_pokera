/// <reference types="jest" />
// Scenariusz jako aktywność (BT, krok F): start z historią odcisków, wznowienie tego samego wariantu (BR-GEN-001), zapis
// odpowiedzi, „Zagraj jeszcze raz” poza limitem i „Nowe rozdanie” z limitem (KO-043), nowy odcisk (BR-GEN-002).
// Port na node:sqlite jak w aktywnoscSesji-08.
import { KONFIGURACJA, type Limit } from '@szkola/domena';
import { aktywnoscWToku, odczytajOdciski, odpowiedziAktywnosci, wynikiScenariuszy, zuzyteDzis } from '@szkola/postep';
import { utworzZegar } from '@/platform/zegar';
import { portTestowy } from '@/test-utils/postepTestowy';
import { SC01 } from '@/test-utils/szablonSc01';
import { odpowiedzWScenariuszu, otworzScenariusz, type WejscieScenariusza } from '../aktywnoscScenariusza';

const T0 = Date.UTC(2026, 10, 10, 10);
const BEZ_LIMITU: Limit = { bezLimitu: true };
const WYCZERPANY: Limit = { bezLimitu: false, pozostalo: 0, odnowienieMs: T0 + 1000 };
const JEDEN: Limit = { bezLimitu: false, pozostalo: KONFIGURACJA.LIMIT_AKTYWNOSCI_DZIENNIE, odnowienieMs: T0 + 1000 };
let n = 0;
const wejscie = (o: Partial<WejscieScenariusza> = {}): WejscieScenariusza => ({
  szablon: SC01, poziom: 'sredni', tryb: 'nowe', limit: BEZ_LIMITU, ziarno: 1234, sesja: new Set(),
  zegar: utworzZegar({ kalendarz: () => 'Europe/Warsaw', intl: () => null }, () => T0), noweId: () => `s${++n}`, ...o,
});
const ok = <T,>(w: { ok: true; wartosc: T } | { ok: false; powod: string }): T => {
  if (!w.ok) throw new Error(`oczekiwano ok, jest ${w.powod}`);
  return w.wartosc;
};

describe('start i wznowienie', () => {
  it('nowy wariant: aktywność z planem (wariant, graf), odcisk w historii; ten sam odcisk zapisany przy ziarnie', async () => {
    const { port } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie()));
    expect(s.wariant.templateId).toBe('sc-01');
    expect(s.aktywnosc.rodzaj).toBe('scenariusz');
    expect(s.aktywnosc.plan.wariant).toEqual({ poziom: 'sredni', ziarno: s.wariant.seed });
    expect(s.aktywnosc.plan.trescId).toBe('sc-01');
    expect(s.wybory).toEqual([]);
    const h = ok(await odczytajOdciski(port, 'sc-01', 'sredni'));
    expect(h).toEqual([{ odcisk: s.wariant.fingerprint, ziarno: s.wariant.seed, zagranoMs: T0 }]);
  });
  it('wznowienie (nowy port na tym samym pliku): te same karty i odpowiedzi, bez nowego startu i bez limitu', async () => {
    const { port, sciezka } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie({ limit: JEDEN })));
    const po = ok(await odpowiedzWScenariuszu(port, s, 'call', 900, T0 + 5)).sesja;
    const { port: port2 } = await portTestowy(sciezka);
    const w = ok(await otworzScenariusz(port2, wejscie({ limit: WYCZERPANY })));
    expect(w.id).toBe(s.id);
    expect(w.wariant).toEqual(s.wariant);
    expect(w.wybory).toEqual(['call']);
    expect(w.aktywnosc.krok).toBe(po.aktywnosc.krok);
    expect(ok(await zuzyteDzis(port2, '2026-11-10'))).toBe(1);
  });
});

describe('odpowiedzi', () => {
  it('call, call: oceny zapisane, po ostatniej koniec z pokazaniem kart; wynikiScenariuszy widzi wariant', async () => {
    const { port } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie()));
    const r1 = ok(await odpowiedzWScenariuszu(port, s, 'call', 800, T0 + 1));
    expect(r1.koniec).toBeNull();
    const r2 = ok(await odpowiedzWScenariuszu(port, r1.sesja, 'call', 700, T0 + 2));
    expect(r2.koniec).toBe('pokazanie');
    const zapisane = ok(await odpowiedziAktywnosci(port, s.id));
    expect(zapisane.map((o) => [o.krok, o.ocena, o.zaliczona])).toEqual([[0, 'zgodne', 1], [1, 'zgodne', 1]]);
    expect(ok(await wynikiScenariuszy(port))).toEqual([{ trescId: 'sc-01', poziom: 'sredni', startMs: T0, oceny: ['zgodne', 'zgodne'] }]);
    expect(ok(await aktywnoscWToku(port, 'scenariusz'))).toBeNull();
  });
  it('pas na flopie kończy rozdanie jednym błędem (bez drugiej decyzji)', async () => {
    const { port } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie()));
    const r = ok(await odpowiedzWScenariuszu(port, s, 'fold', 500, T0 + 1));
    expect(r.koniec).toBe('koniec');
    expect(ok(await wynikiScenariuszy(port))[0]?.oceny).toEqual(['blad']);
  });
  it('podwójne dotknięcie tego samego kroku jest idempotentne (UPSERT po (aktywnosc, krok)): jeden wiersz, krok nie cofnięty', async () => {
    const { port } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie()));
    ok(await odpowiedzWScenariuszu(port, s, 'call', 500, T0 + 1));
    ok(await odpowiedzWScenariuszu(port, s, 'call', 500, T0 + 2)); // ten sam stan sprzed zapisu, ta sama odpowiedź
    expect(ok(await odpowiedziAktywnosci(port, s.id))).toHaveLength(1);
    const wToku = ok(await aktywnoscWToku(port, 'scenariusz'));
    expect(wToku?.aktywnosc.krok).toBe(1);
  });
  it('sesja w niezgodnym stanie (odpowiedzi bez przesunięcia kroku) → krok_niezgodny, nic nie zapisane', async () => {
    const { port } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie()));
    expect(await odpowiedzWScenariuszu(port, { ...s, wybory: ['call'] }, 'call', 500, T0 + 2)).toEqual({ ok: false, powod: 'krok_niezgodny' });
    expect(ok(await odpowiedziAktywnosci(port, s.id))).toHaveLength(0);
  });
});

describe('powtórka i nowe rozdanie (KO-043, BR-GEN-002)', () => {
  it('„Zagraj jeszcze raz” przy wyczerpanym limicie: ten sam wariant, poza limitem; „Nowe rozdanie” → limit_wyczerpany', async () => {
    const { port } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie({ limit: JEDEN })));
    ok(await odpowiedzWScenariuszu(port, s, 'fold', 500, T0 + 1)); // koniec
    const powtorka = ok(await otworzScenariusz(port, wejscie({ tryb: 'powtorka', limit: WYCZERPANY, noweId: () => 'p1' })));
    expect(powtorka.wariant.fingerprint).toBe(s.wariant.fingerprint);
    expect(powtorka.wariant.hero).toEqual(s.wariant.hero);
    expect(powtorka.aktywnosc.zLimitu).toBe(false);
    ok(await odpowiedzWScenariuszu(port, powtorka, 'fold', 500, T0 + 2)); // powtórka rozegrana do końca; inaczej „nowe” wznowiłoby ją
    expect(await otworzScenariusz(port, wejscie({ limit: WYCZERPANY, noweId: () => 'n1' }))).toEqual({ ok: false, powod: 'limit_wyczerpany' });
  });
  it('nowe rozdanie po ukończonym: inny odcisk niż 20 ostatnich; odciski sesji też wykluczone', async () => {
    const { port } = await portTestowy();
    const widziane = new Set<string>();
    let ziarno = 1;
    for (let i = 0; i < 6; i++) {
      const s = ok(await otworzScenariusz(port, wejscie({ ziarno: (ziarno += 7919), sesja: widziane, noweId: () => `r${i}` })));
      expect(widziane.has(s.wariant.fingerprint)).toBe(false);
      widziane.add(s.wariant.fingerprint);
      ok(await odpowiedzWScenariuszu(port, s, 'fold', 100, T0 + i)); // zamyka aktywność
    }
    expect(ok(await odczytajOdciski(port, 'sc-01', 'sredni'))).toHaveLength(6);
  });
  it('powtórka bez historii zachowuje się jak nowy wariant (nie ma czego powtarzać)', async () => {
    const { port } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie({ tryb: 'powtorka', limit: JEDEN })));
    expect(s.aktywnosc.zLimitu).toBe(true);
  });
});
