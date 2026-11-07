// Testy akceptacyjne maszyn stanów (ADR 0010 „Potwierdzenie”: każde przejście z tabeli dozwolone, każde spoza tabeli → błąd;
// ADR 0007 pkt 3 i „Potwierdzenie”: wznowienie po północy bez sprawdzania limitu; D-109: tylko akcje z oceną).
// Wyrocznia: tabele przejść w docs/architektura/moduly.md „Maszyny stanów” przepisane niżej jako dane, parametry z konfiguracji
// (OCENA_POZIOMU_MAKS_PYTAN, LIMIT_AKTYWNOSCI_DZIENNIE), nie kod aplikacji. Pary (stan, zdarzenie), o których tabela milczy,
// są wypisane w NIEROZSTRZYGNIETE i wyłączone z testu wyczerpującego (luka dla 05, strategia.md §9 część 5).
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
} from '../../../packages/domena/src';

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
    startMs: T0, plan: { liczbaKrokow: 5 }, krok: 2, ...nadpisz,
  });
}
function scenariusz(krok = 0): AktywnoscWToku {
  return wToku({ rodzaj: 'scenariusz', krok, plan: { liczbaKrokow: 3, akcjeZOcena: [['fold', 'call'], ['check', 'bet_33'], ['fold', 'call', 'raise_3x']] } });
}

describe('AK-ADR0010-akt: aktywnosc — start i przejścia z tabeli', () => {
  it('AK-ADR0010-akt-a start dozwolony: w_toku, krok 0, zLimitu z mozeStartowac, dzień i strefa ze startu', () => {
    const plan: PlanAktywnosci = { liczbaKrokow: 5 };
    const wej = { pierwszePodejscieTestu: false, limit: JEDNA, plan, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' };
    expect(startAktywnosci({ ...wej, rodzaj: 'sesja' })).toEqual({
      ok: true,
      wartosc: { stan: 'w_toku', rodzaj: 'sesja', zLimitu: true, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw', startMs: T0, plan, krok: 0 },
    });
    expect(startAktywnosci({ ...wej, rodzaj: 'lekcja', limit: WYCZERPANY })).toMatchObject({ ok: true, wartosc: { stan: 'w_toku', krok: 0, zLimitu: false } });
  });

  it.each(Z_LIMITU)('AK-BR-LIM-001-start limit wyczerpany: %s → bez startu (stan przepływu „ekran zakupu”)', (rodzaj) => {
    const r = startAktywnosci({ rodzaj, pierwszePodejscieTestu: false, limit: WYCZERPANY, plan: scenariusz().plan, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' });
    expect(r).toEqual({ ok: false, powod: 'limit_wyczerpany' }); // plan poprawny dla każdego rodzaju (z akcjami dla scenariusza)
  });

  it('AK-ADR0010-akt-plan plan bez kroków albo scenariusz bez akcji z oceną dla każdego kroku → plan_niepoprawny', () => {
    const wej = { pierwszePodejscieTestu: false, limit: JEDNA, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' };
    expect(startAktywnosci({ ...wej, rodzaj: 'sesja', plan: { liczbaKrokow: 0 } })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
    expect(startAktywnosci({ ...wej, rodzaj: 'scenariusz', plan: { liczbaKrokow: 2 } })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
    expect(startAktywnosci({ ...wej, rodzaj: 'scenariusz', plan: { liczbaKrokow: 2, akcjeZOcena: [['fold']] } })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
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
      let a: Aktywnosc = wToku({ krok: 0, plan: { liczbaKrokow: n } });
      for (const z of ciag) {
        const r = przejscieAktywnosci(zamroz(a), z);
        if (a.stan !== 'w_toku') { expect(r).toEqual({ ok: false, powod: 'przejscie_niedozwolone' }); continue; }
        if (!r.ok) continue;
        expect(r.wartosc.krok).toBeGreaterThanOrEqual(a.krok);
        if (r.wartosc.stan === 'w_toku') expect(r.wartosc.krok).toBeLessThan(n);
        a = r.wartosc;
      }
    }));
  });
});

describe('AK-BR-LIM-002 i ADR 0007 pkt 3: rozpoczęta aktywność kończy się bez ekranu zakupu', () => {
  it.each(['sesja', 'scenariusz'] as const)('AK-BR-LIM-002-a %s z limitu: wszystkie kroki do zakonczona (przejścia nie zależą od limitu)', (rodzaj) => {
    const start = startAktywnosci({ rodzaj, pierwszePodejscieTestu: false, limit: JEDNA, plan: scenariusz().plan, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' });
    expect(start).toMatchObject({ ok: true, wartosc: { zLimitu: true } });
    if (!start.ok) return;
    let a: Aktywnosc = start.wartosc;
    for (let krok = 0; krok < 3; krok++) {
      const r = przejscieAktywnosci(zamroz(a), { typ: 'odpowiedz', krok, akcja: scenariusz().plan.akcjeZOcena![krok]![0], teraz: PO_POLNOCY + krok });
      expect(r.ok, `krok ${krok}`).toBe(true);
      if (r.ok) a = r.wartosc;
    }
    expect(a.stan).toBe('zakonczona');
  });

  it.each(Z_LIMITU)('AK-BR-LIM-002-b wznowienie po północy: %s w toku z wczoraj, limit dziś wyczerpany → wznow, nie ekran zakupu', (rodzaj) => {
    const a = wToku({ rodzaj, dzienLokalny: '2026-11-07' });
    expect(wejscieDoAktywnosci(rodzaj, a, false, WYCZERPANY)).toEqual({ akcja: 'wznow', aktywnosc: a });
  });

  it('AK-ADR0007-3 bez aktywności w toku decyzja zapada przy starcie: wyczerpany → ekran zakupu; jest limit → start z limitu; lekcja → start poza limitem', () => {
    expect(wejscieDoAktywnosci('sesja', null, false, WYCZERPANY)).toEqual({ akcja: 'ekran_zakupu' });
    expect(wejscieDoAktywnosci('sesja', null, false, JEDNA)).toEqual({ akcja: 'start', zLimitu: true });
    expect(wejscieDoAktywnosci('lekcja', null, false, WYCZERPANY)).toEqual({ akcja: 'start', zLimitu: false });
    expect(wejscieDoAktywnosci('test_modulu', null, true, WYCZERPANY)).toEqual({ akcja: 'start', zLimitu: false });
  });
});

describe('AK-D109: scenariusz przyjmuje tylko akcje z oceną', () => {
  it('AK-D109-a akcja z oceną w tym kroku → w_toku, krok + 1', () => {
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

describe('AK-BR-ONB-001: ocena poziomu (maszyna)', () => {
  it('AK-BR-ONB-001-b „Pomiń” na każdym kroku → porzucona', () => {
    for (let krok = 0; krok < K.OCENA_POZIOMU_MAKS_PYTAN; krok++) {
      const a = wToku({ rodzaj: 'ocena_poziomu', zLimitu: false, krok, plan: { liczbaKrokow: K.OCENA_POZIOMU_MAKS_PYTAN } });
      expect(przejscieAktywnosci(a, { typ: 'porzuc', teraz: T0 }), `krok ${krok}`).toMatchObject({ ok: true, wartosc: { stan: 'porzucona' } });
    }
  });
  it('AK-BR-ONB-001-d najwyżej OCENA_POZIOMU_MAKS_PYTAN pytań (D-105): plan dłuższy odrzucony albo skrócony; nie dłuższy — dokładnie tyle odpowiedzi', () => {
    for (let n = 1; n <= K.OCENA_POZIOMU_MAKS_PYTAN + 4; n++) {
      const r = startAktywnosci({ rodzaj: 'ocena_poziomu', pierwszePodejscieTestu: false, limit: WYCZERPANY, plan: { liczbaKrokow: n }, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw' });
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
];
// Tabela milczy (luka dla 05): powrót z brak_zakupow; zakup innego planu po zakonczony; transakcja z nasłuchu w bezczynny
// (np. zgoda rodzica po ponownym uruchomieniu — dostęp i tak daje `decyzja` z odczytu sklepu); anulowanie przywracania.
const NIEROZSTRZYGNIETE_ZAKUP = new Set(['brak_zakupow/komunikat_zamkniety', 'zakonczony/kup', 'bezczynny/transakcja_z_nasluchu', 'w_toku:przywroc/anulowano']);

describe('AK-ADR0010-zak: zakup — tabela przejść (BR-ZAK-002, R-48)', () => {
  it.each(TABELA_ZAKUPU)('AK-ADR0010-zak-a %s + %s → %s', (z, typ, na) => {
    expect(przejscieZakupu(STAN_Z[z], ZDARZENIA_Z[typ])).toEqual({ ok: true, wartosc: STAN_Z[na] });
  });
  it('AK-ADR0010-zak-b każda para spoza tabeli → przejscie_niedozwolone', () => {
    const wTabeli = new Set(TABELA_ZAKUPU.map(([z, t]) => `${z}/${t}`));
    expect(new Set(Object.values(STAN_Z).map((s) => s.stan))).toEqual(new Set(STANY_ZAKUPU)); // test obejmuje każdy stan
    for (const z of Object.keys(STAN_Z) as KluczZakupu[]) for (const typ of Object.keys(ZDARZENIA_Z) as ZdarzenieZakupu['typ'][]) {
      const para = `${z}/${typ}`;
      if (wTabeli.has(para) || NIEROZSTRZYGNIETE_ZAKUP.has(para)) continue;
      expect(przejscieZakupu(STAN_Z[z], ZDARZENIA_Z[typ]), para).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
    }
  });
  it.each(['w_toku:kup', 'w_toku:przywroc', 'oczekuje'] as const)('AK-BR-ZAK-002-c drugi zakup albo przywracanie w stanie %s → przejscie_niedozwolone (R-48)', (z) => {
    expect(przejscieZakupu(STAN_Z[z], ZDARZENIA_Z.kup)).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
    expect(przejscieZakupu(STAN_Z[z], ZDARZENIA_Z.przywroc)).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
  });
});

// --- import: tabela z moduly.md ---
const ZDARZENIA_I: ZdarzenieImportu[] = [
  { typ: 'plik_wybrany' },
  ...(['ok', 'bledny_plik', 'nowsza_wersja'] as const).flatMap((wynik) => [true, false].map((istniejacyPostep) => ({ typ: 'zwalidowano' as const, wynik, istniejacyPostep }))),
  { typ: 'potwierdz' }, { typ: 'zapisano' }, { typ: 'blad_zapisu' },
];
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
  it('AK-BR-DANE-002-b przy istniejącym postępie każda droga do zapisu przechodzi przez potwierdzenie (przeszukanie wszystkich ciągów)', () => {
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
  it.each(['bledny_plik', 'nowsza_wersja'] as const)('AK-BR-DANE-002-c/-d wynik walidacji %s nie prowadzi do zapisu (postęp bez zmian)', (wynik) => {
    expect(przejscieImportu('walidacja', { typ: 'zwalidowano', wynik, istniejacyPostep: true })).toEqual({ ok: true, wartosc: wynik });
    for (const z of ZDARZENIA_I) expect(przejscieImportu(wynik, z)).toEqual({ ok: false, powod: 'przejscie_niedozwolone' });
  });
});
