// Testy akceptacyjne maszyn stanów (ADR 0010 „Potwierdzenie”: każde przejście z tabeli dozwolone, każde spoza tabeli → błąd;
// Poza zakresem tego pliku: trwałość kroku po zabiciu aplikacji (ADR 0010 „Test przerwania”, BR-CWI-004, R-07) — test portu
// `zapiszKrok` w części z repozytoriami; „niedokończone zadanie wraca” w następnej sesji — plan sesji (rola 08 z 05).
// ADR 0007 pkt 3 i „Potwierdzenie”: wznowienie po północy bez sprawdzania limitu; D-109: tylko akcje z oceną).
// Wyrocznia: tabele przejść w docs/architektura/moduly.md „Maszyny stanów” przepisane niżej jako dane, parametry z konfiguracji
// (OCENA_POZIOMU_MAKS_PYTAN, LIMIT_AKTYWNOSCI_DZIENNIE), nie kod aplikacji. Test wyczerpujący obejmuje każdą parę (stan, zdarzenie):
// pary dawniej nierozstrzygnięte rozstrzygnęła rola 05 (fix 05 2026-11-07, D-210, D-214: wiersze tabel zakupu i importu).
// Scenariusz z gałęziami (L7-13b, D-219): krok = indeks decyzji w treści; plan niesie szkielet grafu `decyzje[i] = [{ akcja, dalej }]`
// (zastępuje `akcjeZOcena`).
// Wersja 07 fix (D-224), przeniesiona przez 08 fix (L7-13b).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  KONFIGURACJA as K,
  STANY_IMPORTU,
  STANY_ZAKUPU,
  przejscieAktywnosci,
  przejscieImportu,
  przejscieZakupu,
  startAktywnosci,
  wejscieDoAktywnosci,
  type Aktywnosc,
  type AktywnoscWToku,
  type Limit,
  type PlanAktywnosci,
  type RodzajAktywnosci,
  type StanImportu,
  type StanZakupu,
  type ZdarzenieAktywnosci,
  type ZdarzenieImportu,
  type ZdarzenieZakupu,
} from '../src';

const WYCZERPANY: Limit = { bezLimitu: false, pozostalo: 0, odnowienieMs: 0 };
const JEDNA: Limit = { bezLimitu: false, pozostalo: K.LIMIT_AKTYWNOSCI_DZIENNIE, odnowienieMs: 0 };
const T0 = Date.UTC(2026, 10, 7, 21, 30); // 22:30 w Europe/Warsaw
const PO_POLNOCY = Date.UTC(2026, 10, 7, 23, 30); // 00:30 następnego dnia w Europe/Warsaw
const Z_LIMITU: RodzajAktywnosci[] = ['sesja', 'powtorki', 'scenariusz', 'test_modulu'];

function zamroz<T>(o: T): T {
  if (o && typeof o === 'object') {
    for (const v of Object.values(o)) zamroz(v);
    Object.freeze(o);
  }
  return o;
}
function wToku(nadpisz: Partial<AktywnoscWToku> = {}): AktywnoscWToku {
  return zamroz({
    stan: 'w_toku', rodzaj: 'sesja', zLimitu: true, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw',
    startMs: T0, plan: { liczbaKrokow: 5, trescId: null }, krok: 2, ...nadpisz,
  });
}
const PLAN_ZWYKLY: PlanAktywnosci = { liczbaKrokow: 3, trescId: null };
const planDla = (rodzaj: RodzajAktywnosci): PlanAktywnosci => (rodzaj === 'scenariusz' ? scenariusz().plan : rodzaj === 'test_modulu' ? { liczbaKrokow: 3, trescId: 'M3' } : PLAN_ZWYKLY);
type Dalej = number | 'pokazanie' | 'koniec';
type Decyzje = readonly (readonly { akcja: string; dalej: Dalej }[])[];
const planScenariusza = (decyzje: Decyzje, liczbaKrokow = decyzje.length, trescId = 'scn-a') => ({ liczbaKrokow, trescId, decyzje }) as PlanAktywnosci;
// Graf: 0 —call→ 1 —(check|bet_33)→ 2; 0 —raise→ 2 (skok przez decyzję 1); fold kończy (koniec), call/raise_3x w 2 → pokazanie.
const GRAF: Decyzje = [
  [{ akcja: 'fold', dalej: 'koniec' }, { akcja: 'call', dalej: 1 }, { akcja: 'raise', dalej: 2 }],
  [{ akcja: 'check', dalej: 2 }, { akcja: 'bet_33', dalej: 2 }],
  [{ akcja: 'fold', dalej: 'koniec' }, { akcja: 'call', dalej: 'pokazanie' }, { akcja: 'raise_3x', dalej: 'pokazanie' }],
];
function scenariusz(krok = 0): AktywnoscWToku {
  return wToku({ rodzaj: 'scenariusz', krok, plan: planScenariusza(GRAF) });
}

describe('AK-ADR0010-akt: aktywnosc — start i przejścia z tabeli', () => {
  it('AK-ADR0010-akt-a start dozwolony: w_toku, krok 0, zLimitu z mozeStartowac, dzień i strefa ze startu', () => {
    const plan: PlanAktywnosci = { liczbaKrokow: 5, trescId: null };
    const wej = { pierwszePodejscieTestu: false, limit: JEDNA, plan, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' };
    expect(startAktywnosci({ ...wej, rodzaj: 'sesja' })).toEqual({
      ok: true,
      wartosc: { stan: 'w_toku', rodzaj: 'sesja', zLimitu: true, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw', startMs: T0, plan, krok: 0 },
    });
    expect(startAktywnosci({ ...wej, rodzaj: 'lekcja', limit: WYCZERPANY })).toMatchObject({ ok: true, wartosc: { stan: 'w_toku', krok: 0, zLimitu: false } });
  });

  it.each(Z_LIMITU)('AK-BR-LIM-001-start limit wyczerpany: %s → bez startu (stan przepływu „ekran zakupu”)', (rodzaj) => {
    const r = startAktywnosci({ rodzaj, pierwszePodejscieTestu: false, limit: WYCZERPANY, plan: planDla(rodzaj), teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' });
    expect(r).toEqual({ ok: false, powod: 'limit_wyczerpany' });
  });

  it('AK-BR-LIM-003-start pierwsze podejście do testu modułu i Pro: start przy wyczerpanym limicie, zLimitu = false (ADR 0007, schemat.sql)', () => {
    const wej = { plan: planDla('test_modulu'), teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' };
    expect(startAktywnosci({ ...wej, rodzaj: 'test_modulu', pierwszePodejscieTestu: true, limit: WYCZERPANY })).toMatchObject({ ok: true, wartosc: { zLimitu: false } });
    expect(startAktywnosci({ ...wej, rodzaj: 'sesja', plan: PLAN_ZWYKLY, pierwszePodejscieTestu: false, limit: { bezLimitu: true } })).toMatchObject({ ok: true, wartosc: { zLimitu: false } });
  });

  it('AK-ADR0010-akt-plan plan bez kroków albo scenariusz bez szkieletu decyzji → plan_niepoprawny', () => {
    const wej = { pierwszePodejscieTestu: false, limit: JEDNA, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' };
    expect(startAktywnosci({ ...wej, rodzaj: 'sesja', plan: { liczbaKrokow: 0, trescId: null } })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
    expect(startAktywnosci({ ...wej, rodzaj: 'scenariusz', plan: { liczbaKrokow: 2, trescId: 'scn-a' } })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
  });

  // D-219 „Start”: każde `dalej` liczbowe > własny indeks i < liczby decyzji, każda decyzja ma ≥ 1 akcję, liczbaKrokow = liczba decyzji.
  it('AK-D219-plan-a poprawny graf ze skokiem → start dozwolony, plan zapisany bez zmian', () => {
    const wej = { pierwszePodejscieTestu: false, limit: JEDNA, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' };
    const plan = planScenariusza(GRAF);
    expect(startAktywnosci({ ...wej, rodzaj: 'scenariusz', plan })).toMatchObject({ ok: true, wartosc: { stan: 'w_toku', krok: 0, plan } });
  });
  it.each<[string, Decyzje, number?]>([
    ['decyzja bez akcji', [[{ akcja: 'call', dalej: 1 }], []]],
    ['dalej = własny indeks (cykl)', [[{ akcja: 'call', dalej: 1 }], [{ akcja: 'check', dalej: 1 }]]],
    ['dalej wstecz', [[{ akcja: 'call', dalej: 1 }], [{ akcja: 'check', dalej: 0 }]]],
    ['dalej = liczba decyzji (poza grafem)', [[{ akcja: 'call', dalej: 2 }], [{ akcja: 'check', dalej: 'koniec' }]]],
    ['dalej ujemne', [[{ akcja: 'call', dalej: -1 }]]],
    ['dalej niecałkowite', [[{ akcja: 'call', dalej: 0.5 }], [{ akcja: 'check', dalej: 'koniec' }]]],
    ['liczbaKrokow ≠ liczba decyzji', GRAF, 4],
  ])('AK-D219-plan-b %s → plan_niepoprawny', (_opis, decyzje, liczbaKrokow) => {
    const wej = { pierwszePodejscieTestu: false, limit: JEDNA, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' };
    expect(startAktywnosci({ ...wej, rodzaj: 'scenariusz', plan: planScenariusza(decyzje, liczbaKrokow) })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
  });

  it('AK-ADR0010-akt-b odpowiedz(krok = bieżący), nie ostatni → w_toku, krok + 1, reszta bez zmian; argument niezmieniony', () => {
    const a = wToku();
    expect(przejscieAktywnosci(a, { typ: 'odpowiedz', krok: 2, teraz: T0 + 1 })).toEqual({ ok: true, wartosc: { ...a, krok: 3 } });
  });

  it('AK-ADR0010-akt-c odpowiedz(ostatni) → zakonczona z koniecMs = chwila odpowiedzi', () => {
    const a = wToku({ krok: 4 });
    expect(przejscieAktywnosci(a, { typ: 'odpowiedz', krok: 4, teraz: T0 + 9 })).toMatchObject({ ok: true, wartosc: { stan: 'zakonczona', koniecMs: T0 + 9 } });
  });

  it.each([1, 3, 7, -1])('AK-ADR0010-akt-d odpowiedz(krok %i ≠ bieżący 2) → krok_niezgodny (np. podwójne naciśnięcie po zapisie)', (krok) => {
    expect(przejscieAktywnosci(wToku(), { typ: 'odpowiedz', krok, teraz: T0 })).toEqual({ ok: false, powod: 'krok_niezgodny' });
  });

  it('AK-ADR0010-akt-e wznow → ten sam stan (odczyt, bez zapisu)', () => {
    const a = wToku();
    expect(przejscieAktywnosci(a, { typ: 'wznow' })).toEqual({ ok: true, wartosc: a });
  });

  it('AK-ADR0010-akt-f porzuc → porzucona z koniecMs, krok bez zmian', () => {
    expect(przejscieAktywnosci(wToku(), { typ: 'porzuc', teraz: T0 + 5 })).toEqual({
      ok: true, wartosc: { ...wToku(), stan: 'porzucona', koniecMs: T0 + 5 },
    });
  });

  const zdarzenia: ZdarzenieAktywnosci[] = [
    { typ: 'odpowiedz', krok: 2, teraz: T0 }, { typ: 'odpowiedz', krok: 4, teraz: T0 }, { typ: 'wznow' }, { typ: 'porzuc', teraz: T0 },
  ];
  it.each(['zakonczona', 'porzucona'] as const)('AK-ADR0010-akt-g %s + każde zdarzenie → przejscie_niedozwolone', (stan) => {
    const a: Aktywnosc = zamroz({ ...wToku(), stan, koniecMs: T0 });
    for (const z of zdarzenia) expect(przejscieAktywnosci(a, z), z.typ).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
  });

  it('AK-ADR0010-akt-h własność: losowy ciąg zdarzeń — krok nie maleje i nie wychodzi poza plan, stan końcowy nie wraca do w_toku', () => {
    const zdarzenie = fc.oneof(
      fc.record({ typ: fc.constant('odpowiedz' as const), krok: fc.integer({ min: -1, max: 6 }), teraz: fc.integer({ min: T0, max: T0 + 1e6 }) }),
      fc.constant({ typ: 'wznow' as const }),
      fc.record({ typ: fc.constant('porzuc' as const), teraz: fc.integer({ min: T0, max: T0 + 1e6 }) }),
    );
    fc.assert(fc.property(fc.integer({ min: 1, max: 6 }), fc.array(zdarzenie, { maxLength: 15 }), (n, ciag) => {
      let a: Aktywnosc = wToku({ krok: 0, plan: { liczbaKrokow: n, trescId: null } });
      for (const z of ciag) {
        const r = przejscieAktywnosci(zamroz(a), z);
        if (a.stan !== 'w_toku') { expect(r).toEqual({ ok: false, powod: 'przejscie_niedozwolone' }); continue; }
        if (!r.ok) continue;
        expect(r.wartosc.krok).toBeGreaterThanOrEqual(a.krok);
        if (r.wartosc.stan === 'w_toku') expect(r.wartosc.krok).toBeLessThan(n);
        a = r.wartosc;
      }
    }), { includeErrorInReport: true });
  });
});

describe('AK-BR-LIM-002 i ADR 0007 pkt 3: rozpoczęta aktywność kończy się bez ekranu zakupu', () => {
  it.each(['sesja', 'scenariusz'] as const)('AK-BR-LIM-002-a %s z limitu: wszystkie kroki do zakonczona (przejścia nie zależą od limitu)', (rodzaj) => {
    const start = startAktywnosci({ rodzaj, pierwszePodejscieTestu: false, limit: JEDNA, plan: planDla(rodzaj), teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' });
    expect(start).toMatchObject({ ok: true, wartosc: { zLimitu: true } });
    if (!start.ok) return;
    let a: Aktywnosc = start.wartosc;
    const SCIEZKA = ['call', 'check', 'call']; // scenariusz: 0 → 1 → 2 → pokazanie (akcja tylko w scenariuszu)
    for (let i = 0; i < 3 && a.stan === 'w_toku'; i++) {
      const akcja = rodzaj === 'scenariusz' ? { akcja: SCIEZKA[i] } : {};
      const r = przejscieAktywnosci(zamroz(a), { typ: 'odpowiedz', krok: a.krok, ...akcja, teraz: PO_POLNOCY + i });
      expect(r.ok, `odpowiedź ${i}`).toBe(true);
      if (r.ok) a = r.wartosc;
    }
    expect(a.stan).toBe('zakonczona');
  });

  // Niezależność od daty wynika z sygnatury (bez „dziś”); test sprawdza, że wznowienie nie zależy od limitu ani od dnia startu.
  const LIMITY: [string, Limit][] = [['wyczerpany', WYCZERPANY], ['jedna', JEDNA], ['Pro', { bezLimitu: true }]];
  for (const rodzaj of Z_LIMITU) {
    it.each(LIMITY)(`AK-BR-LIM-002-b ${rodzaj} w toku z poprzedniego dnia, ta sama treść, limit %s → wznow (nie nowa aktywność, nie ekran zakupu)`, (_n, limit) => {
      const a = wToku({ rodzaj, dzienLokalny: '2026-11-06', plan: planDla(rodzaj) });
      expect(wejscieDoAktywnosci(rodzaj, a.plan.trescId, a, false, limit)).toEqual({ akcja: 'wznow', aktywnosc: a });
    });
  }

  it('AK-BR-LIM-002-c w toku scenariusz A, użytkownik wybiera B: jest limit → porzuć A i zacznij B; limit wyczerpany → ekran zakupu, A nietknięty', () => {
    const a = { ...scenariusz(1), dzienLokalny: '2026-11-06' }; // A z poprzedniego dnia: dziś limit jeszcze jest
    expect(wejscieDoAktywnosci('scenariusz', 'scn-b', a, false, JEDNA)).toEqual({ akcja: 'porzuc_i_start', porzuc: a, zLimitu: true });
    expect(wejscieDoAktywnosci('scenariusz', 'scn-b', a, false, WYCZERPANY)).toEqual({ akcja: 'ekran_zakupu' });
  });

  it('AK-BR-LIM-002-d inna treść poza limitem (lekcja; pierwsze podejście do testu modułu) przy wyczerpanym limicie → porzuć i zacznij, zLimitu = false', () => {
    const l = wToku({ rodzaj: 'lekcja', zLimitu: false, plan: { liczbaKrokow: 4, trescId: 'm1-l1' } });
    expect(wejscieDoAktywnosci('lekcja', 'm1-l2', l, false, WYCZERPANY)).toEqual({ akcja: 'porzuc_i_start', porzuc: l, zLimitu: false });
    const t = wToku({ rodzaj: 'test_modulu', plan: { liczbaKrokow: 3, trescId: 'M2' } });
    expect(wejscieDoAktywnosci('test_modulu', 'M3', t, true, WYCZERPANY)).toEqual({ akcja: 'porzuc_i_start', porzuc: t, zLimitu: false });
  });

  it('AK-ADR0007-3 bez aktywności w toku decyzja zapada przy starcie: wyczerpany → ekran zakupu; jest limit → start z limitu; lekcja → start poza limitem', () => {
    expect(wejscieDoAktywnosci('sesja', null, null, false, WYCZERPANY)).toEqual({ akcja: 'ekran_zakupu' });
    expect(wejscieDoAktywnosci('sesja', null, null, false, JEDNA)).toEqual({ akcja: 'start', zLimitu: true });
    expect(wejscieDoAktywnosci('lekcja', 'm1-l1', null, false, WYCZERPANY)).toEqual({ akcja: 'start', zLimitu: false });
    expect(wejscieDoAktywnosci('test_modulu', 'M3', null, true, WYCZERPANY)).toEqual({ akcja: 'start', zLimitu: false });
  });
});

describe('AK-D109: scenariusz przyjmuje tylko akcje z oceną', () => {
  it('AK-D109-a akcja z oceną w tym kroku → w_toku, krok = dalej tej akcji', () => {
    expect(przejscieAktywnosci(scenariusz(1), { typ: 'odpowiedz', krok: 1, akcja: 'bet_33', teraz: T0 })).toMatchObject({ ok: true, wartosc: { stan: 'w_toku', krok: 2 } });
  });
  it.each([
    ['spoza drzewa', 'all_in'],
    ['z oceną w innym kroku', 'fold'],
    ['brak akcji', undefined],
  ])('AK-D109-b akcja %s → akcja_niedostepna, bez zmiany stanu', (_opis, akcja) => {
    expect(przejscieAktywnosci(scenariusz(1), { typ: 'odpowiedz', krok: 1, akcja, teraz: T0 })).toEqual({ ok: false, powod: 'akcja_niedostepna' });
  });
});

describe('AK-D219: scenariusz z gałęziami (krok = indeks decyzji w treści)', () => {
  it('AK-D219-a skok: raise w decyzji 0 → w_toku z krok 2 (decyzja 1 pominięta), reszta stanu bez zmian', () => {
    const a = scenariusz(0);
    expect(przejscieAktywnosci(a, { typ: 'odpowiedz', krok: 0, akcja: 'raise', teraz: T0 + 1 })).toEqual({ ok: true, wartosc: { ...a, krok: 2 } });
  });
  it('AK-D219-b po skoku odpowiedź dla pominiętej decyzji 1 → krok_niezgodny (podwójne naciśnięcie, stary ekran)', () => {
    expect(przejscieAktywnosci(scenariusz(2), { typ: 'odpowiedz', krok: 1, akcja: 'check', teraz: T0 })).toEqual({ ok: false, powod: 'krok_niezgodny' });
  });
  it.each([
    [0, 'fold', 'koniec'], [2, 'call', 'pokazanie'], [2, 'fold', 'koniec'],
  ] as const)('AK-D219-c decyzja %i, akcja %s (dalej: %s) → zakonczona z koniecMs, krok bez zmian', (krok, akcja, _dalej) => {
    const a = scenariusz(krok);
    expect(przejscieAktywnosci(a, { typ: 'odpowiedz', krok, akcja, teraz: T0 + 7 })).toEqual({ ok: true, wartosc: { ...a, stan: 'zakonczona', koniecMs: T0 + 7 } });
  });
  it('AK-D219-d własność: losowy poprawny graf i losowe wybory — każde przejście ustawia krok = dalej (rośnie, < liczby decyzji), koniec najwyżej po liczbie decyzji odpowiedzi', () => {
    const graf = fc.integer({ min: 1, max: 6 }).chain((n) =>
      fc.tuple(...Array.from({ length: n }, (_, i) =>
        fc.array(fc.oneof(
          ...(i + 1 < n ? [fc.integer({ min: i + 1, max: n - 1 })] : []),
          fc.constantFrom<'pokazanie' | 'koniec'>('pokazanie', 'koniec'),
        ), { minLength: 1, maxLength: 3 }).map((dalej) => dalej.map((d, j) => ({ akcja: `a${j}`, dalej: d as Dalej }))),
      )));
    fc.assert(fc.property(graf, fc.array(fc.nat(), { minLength: 6, maxLength: 6 }), (decyzje, wybory) => {
      const start = startAktywnosci({ rodzaj: 'scenariusz', pierwszePodejscieTestu: false, limit: JEDNA, plan: planScenariusza(decyzje), teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' });
      expect(start.ok).toBe(true);
      if (!start.ok) return;
      let a: Aktywnosc = start.wartosc, odpowiedzi = 0;
      while (a.stan === 'w_toku') {
        const opcje = decyzje[a.krok]!, wybrana = opcje[wybory[odpowiedzi]! % opcje.length]!;
        const r = przejscieAktywnosci(zamroz(a), { typ: 'odpowiedz', krok: a.krok, akcja: wybrana.akcja, teraz: T0 });
        expect(r.ok).toBe(true);
        if (!r.ok) return;
        if (typeof wybrana.dalej === 'number') expect(r.wartosc).toMatchObject({ stan: 'w_toku', krok: wybrana.dalej });
        else expect(r.wartosc).toMatchObject({ stan: 'zakonczona', krok: a.krok });
        a = r.wartosc; odpowiedzi++;
        expect(odpowiedzi).toBeLessThanOrEqual(decyzje.length);
      }
    }), { includeErrorInReport: true });
  });
});

describe('AK-BR-ONB-001: ocena poziomu (maszyna)', () => {
  it('AK-BR-ONB-001-b „Pomiń” na każdym kroku → porzucona', () => {
    for (let krok = 0; krok < K.OCENA_POZIOMU_MAKS_PYTAN; krok++) {
      const a = wToku({ rodzaj: 'ocena_poziomu', zLimitu: false, krok, plan: { liczbaKrokow: K.OCENA_POZIOMU_MAKS_PYTAN, trescId: null } });
      expect(przejscieAktywnosci(a, { typ: 'porzuc', teraz: T0 }), `krok ${krok}`).toMatchObject({ ok: true, wartosc: { stan: 'porzucona' } });
    }
  });
  it('AK-BR-ONB-001-d najwyżej OCENA_POZIOMU_MAKS_PYTAN pytań (D-105): plan dłuższy odrzucony albo skrócony; nie dłuższy — dokładnie tyle odpowiedzi', () => {
    for (let n = 1; n <= K.OCENA_POZIOMU_MAKS_PYTAN + 4; n++) {
      const r = startAktywnosci({ rodzaj: 'ocena_poziomu', pierwszePodejscieTestu: false, limit: WYCZERPANY, plan: { liczbaKrokow: n, trescId: null }, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' });
      if (n <= K.OCENA_POZIOMU_MAKS_PYTAN) expect(r.ok, `n=${n}`).toBe(true);
      if (!r.ok) { expect(r.powod).toBe('plan_niepoprawny'); continue; }
      let a: Aktywnosc = r.wartosc, odpowiedzi = 0;
      while (a.stan === 'w_toku' && odpowiedzi <= K.OCENA_POZIOMU_MAKS_PYTAN) {
        const p = przejscieAktywnosci(zamroz(a), { typ: 'odpowiedz', krok: a.krok, teraz: T0 });
        expect(p.ok).toBe(true);
        if (!p.ok) break;
        a = p.wartosc; odpowiedzi++;
      }
      expect(a.stan, `n=${n}`).toBe('zakonczona');
      expect(odpowiedzi, `n=${n}`).toBe(Math.min(n, K.OCENA_POZIOMU_MAKS_PYTAN));
    }
  });
});

// --- zakup: tabela z moduly.md; klucz stanu „w_toku:kup” / „w_toku:przywroc” ---
type KluczZakupu = 'bezczynny' | 'w_toku:kup' | 'w_toku:przywroc' | 'oczekuje' | 'zakonczony' | 'blad' | 'brak_zakupow';
const STAN_Z: Record<KluczZakupu, StanZakupu> = {
  bezczynny: { stan: 'bezczynny' }, 'w_toku:kup': { stan: 'w_toku', operacja: 'kup' }, 'w_toku:przywroc': { stan: 'w_toku', operacja: 'przywroc' },
  oczekuje: { stan: 'oczekuje' }, zakonczony: { stan: 'zakonczony' }, blad: { stan: 'blad' }, brak_zakupow: { stan: 'brak_zakupow' },
};
const ZDARZENIA_Z: Record<ZdarzenieZakupu['typ'], ZdarzenieZakupu> = {
  kup: { typ: 'kup', produkt: K.PRODUKTY_ODBLOKOWUJACE[1] }, przywroc: { typ: 'przywroc' }, transakcja_zakonczona: { typ: 'transakcja_zakonczona' },
  anulowano: { typ: 'anulowano' }, oczekuje: { typ: 'oczekuje' }, transakcja_z_nasluchu: { typ: 'transakcja_z_nasluchu' },
  blad_sklepu: { typ: 'blad_sklepu' }, brak_zakupow: { typ: 'brak_zakupow' }, komunikat_zamkniety: { typ: 'komunikat_zamkniety' },
};
const TABELA_ZAKUPU: [KluczZakupu, ZdarzenieZakupu['typ'], KluczZakupu][] = [
  ['bezczynny', 'kup', 'w_toku:kup'],
  ['w_toku:kup', 'transakcja_zakonczona', 'zakonczony'],
  ['w_toku:kup', 'anulowano', 'bezczynny'],
  ['w_toku:kup', 'oczekuje', 'oczekuje'],
  ['oczekuje', 'transakcja_z_nasluchu', 'zakonczony'],
  ['w_toku:kup', 'blad_sklepu', 'blad'],
  ['w_toku:przywroc', 'blad_sklepu', 'blad'],
  ['blad', 'komunikat_zamkniety', 'bezczynny'],
  ['bezczynny', 'przywroc', 'w_toku:przywroc'],
  ['w_toku:przywroc', 'transakcja_zakonczona', 'zakonczony'],
  ['w_toku:przywroc', 'brak_zakupow', 'brak_zakupow'],
  ['w_toku:przywroc', 'anulowano', 'bezczynny'], // wiersz „w_toku | anulowanie” obejmuje też przywracanie (logowanie do konta)
  ['brak_zakupow', 'komunikat_zamkniety', 'bezczynny'], // D-214
  ['oczekuje', 'przywroc', 'w_toku:przywroc'], // D-214: odmowa rodzica zwykle nie daje zdarzenia
];
// `w_toku` niesie operację (moduly.md „Uzupełnienie”, D-210): `oczekuje` tylko z kupna, `brak_zakupow` tylko z przywracania.
// Każda para spoza tabeli → przejscie_niedozwolone: m.in. kup/przywroc po zakonczony, transakcja z nasłuchu w bezczynny,
// kup i komunikat_zamkniety w oczekuje, kup/przywroc w brak_zakupow, brak_zakupow przy kupnie, oczekuje przy przywracaniu.

describe('AK-ADR0010-zak: zakup — tabela przejść (BR-ZAK-002, R-48)', () => {
  it.each(TABELA_ZAKUPU)('AK-ADR0010-zak-a %s + %s → %s', (z, typ, na) => {
    expect(przejscieZakupu(STAN_Z[z], ZDARZENIA_Z[typ])).toEqual({ ok: true, wartosc: STAN_Z[na] });
  });
  it('AK-ADR0010-zak-b każda para spoza tabeli → przejscie_niedozwolone', () => {
    const wTabeli = new Set(TABELA_ZAKUPU.map(([z, t]) => `${z}/${t}`));
    expect(new Set(Object.values(STAN_Z).map((s) => s.stan))).toEqual(new Set(STANY_ZAKUPU)); // test obejmuje każdy stan
    for (const z of Object.keys(STAN_Z) as KluczZakupu[]) for (const typ of Object.keys(ZDARZENIA_Z) as ZdarzenieZakupu['typ'][]) {
      const para = `${z}/${typ}`;
      if (wTabeli.has(para)) continue;
      expect(przejscieZakupu(STAN_Z[z], ZDARZENIA_Z[typ]), para).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
    }
  });
  it.each([
    ['zakonczony', 'kup'], ['zakonczony', 'przywroc'], ['bezczynny', 'transakcja_z_nasluchu'], ['oczekuje', 'komunikat_zamkniety'],
    ['brak_zakupow', 'kup'], ['brak_zakupow', 'przywroc'], ['w_toku:kup', 'brak_zakupow'], ['w_toku:przywroc', 'oczekuje'],
  ] as const)('AK-D210-zak pary dawniej nierozstrzygnięte poza tabelą: %s + %s → przejscie_niedozwolone, stan bez zmian', (z, typ) => {
    expect(przejscieZakupu(STAN_Z[z], ZDARZENIA_Z[typ])).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
  });
  it.each(['w_toku:kup', 'w_toku:przywroc', 'oczekuje'] as const)('AK-BR-ZAK-002-c drugi zakup w stanie %s → przejscie_niedozwolone (R-48)', (z) => {
    expect(przejscieZakupu(STAN_Z[z], ZDARZENIA_Z.kup)).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
  });
});

// --- import: tabela z moduly.md ---
const ZDARZENIA_I: ZdarzenieImportu[] = [
  { typ: 'plik_wybrany' },
  ...(['ok', 'bledny_plik', 'nowsza_wersja'] as const).flatMap((wynik) => [true, false].map((istniejacyPostep) => ({ typ: 'zwalidowano' as const, wynik, istniejacyPostep }))),
  { typ: 'potwierdz' }, { typ: 'zapisano' }, { typ: 'blad_zapisu' }, { typ: 'anuluj' },
];
// Rezygnacja (`anuluj`, D-210): w każdym stanie → przejscie_niedozwolone (maszyna bez stanu rezygnacji; ekran zamyka przepływ),
// nigdy do zapisu — `oczekiwanyImport` nie ma dla niej wiersza.
function oczekiwanyImport(s: StanImportu, z: ZdarzenieImportu): StanImportu | null {
  if (s === 'wybor_pliku' && z.typ === 'plik_wybrany') return 'walidacja';
  if (s === 'walidacja' && z.typ === 'zwalidowano') return z.wynik !== 'ok' ? z.wynik : z.istniejacyPostep ? 'potwierdzenie' : 'zapis';
  if (s === 'potwierdzenie' && z.typ === 'potwierdz') return 'zapis';
  if (s === 'zapis' && z.typ === 'zapisano') return 'gotowe';
  if (s === 'zapis' && z.typ === 'blad_zapisu') return 'blad_zapisu';
  return null;
}

describe('AK-ADR0010-imp: import — tabela przejść (BR-DANE-002)', () => {
  it('AK-ADR0010-imp-a każda para (stan, zdarzenie): z tabeli → następny stan, spoza → przejscie_niedozwolone', () => {
    for (const s of STANY_IMPORTU) for (const z of ZDARZENIA_I) {
      const na = oczekiwanyImport(s, z);
      expect(przejscieImportu(s, z), `${s} + ${JSON.stringify(z)}`).toEqual(na ? { ok: true, wartosc: na } : { ok: false, powod: 'przejscie_niedozwolone' });
    }
  });
  it('AK-BR-DANE-002-b przy istniejącym postępie każda droga do zapisu przechodzi przez potwierdzenie (przeszukanie wszystkich ciągów, także z rezygnacją)', () => {
    const zIstniejacym = ZDARZENIA_I.filter((z) => z.typ !== 'zwalidowano' || z.istniejacyPostep);
    const kolejka: [StanImportu, boolean][] = [['wybor_pliku', false]];
    const odwiedzone = new Set<string>();
    while (kolejka.length) {
      const [s, potwierdzono] = kolejka.shift()!;
      if (odwiedzone.has(`${s}/${potwierdzono}`)) continue;
      odwiedzone.add(`${s}/${potwierdzono}`);
      for (const z of zIstniejacym) {
        const r = przejscieImportu(s, z);
        if (!r.ok) continue;
        const p = potwierdzono || z.typ === 'potwierdz';
        if (r.wartosc === 'zapis') expect(p, `${s} + ${z.typ} → zapis bez potwierdzenia`).toBe(true);
        kolejka.push([r.wartosc, p]);
      }
    }
    expect(odwiedzone.has('zapis/true')).toBe(true);
  });
  it.each(['wybor_pliku', 'walidacja', 'potwierdzenie'] as const)('AK-D210-imp anuluj w %s → przejscie_niedozwolone (dawniej nierozstrzygnięte)', (s) => {
    expect(przejscieImportu(s, { typ: 'anuluj' })).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
  });
  it.each(['bledny_plik', 'nowsza_wersja'] as const)('AK-BR-DANE-002-c/-d wynik walidacji %s nie prowadzi do zapisu (postęp bez zmian)', (wynik) => {
    expect(przejscieImportu('walidacja', { typ: 'zwalidowano', wynik, istniejacyPostep: true })).toEqual({ ok: true, wartosc: wynik });
    for (const z of ZDARZENIA_I) expect(przejscieImportu(wynik, z)).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
  });
});
