// K-06 (kontrole-07.md), część czysta: nazwa i wybór pliku treści, manifest `meta`, kolejka powtórek wobec treści.
// Wyrocznie: ADR 0005 pkt 2, 3, 5 (nazwa `tresc-<wersja>-<język>.db`, jedna kopia na wersję, manifest, pomijanie brakujących
// identyfikatorów), BR-DANE-004 „Zmiana treści lekcji”, tlo-i-bledy.md §4 (`tresc_niedostepna`). Relacja metamorficzna
// dla kolejki: usunięcie rodziny z treści = usunięcie jej karty z wejścia (reszta bez zmian).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { JEZYKI } from '../../../packages/jezyki/src';
import { KONFIGURACJA as K, kolejkaPowtorek, nazwaPlikuTresci, planTresci, sprawdzMetaTresci } from '../../../packages/domena/src';

const plik = (w: string, j: string) => `tresc-${w}-${j}.db`; // brzmienie z ADR 0005 pkt 2 (wyrocznia niezależna od kodu)
const NIEDOSTEPNA = { ok: false, powod: 'tresc_niedostepna' };
// Pliki, których start treści nie może usunąć (dane użytkownika: ADR 0004, K-12, K-14).
const DANE = ['postep.db', 'postep.db-journal', 'postep.db-wal', 'postep.db-shm', 'postep-przed-v1.db', 'user.db', 'user.db-wal', 'user.db-shm', 'postep-uszkodzona-1730000000000.db', 'notatka.txt', 'content-v6.db.bak'];

describe('AK-K-06: nazwa pliku treści', () => {
  it('AK-K-06-a nazwa zawiera wersję i język, także język z „-”', () => {
    expect(nazwaPlikuTresci('7', 'pl')).toBe('tresc-7-pl.db');
    expect(nazwaPlikuTresci('7', 'es-419')).toBe('tresc-7-es-419.db');
    expect(nazwaPlikuTresci('a1b2c3', 'zh-Hant')).toBe('tresc-a1b2c3-zh-Hant.db');
  });
});

describe('AK-K-06: plan treści (wybór pliku, kopia, usunięcie starych)', () => {
  const paczka = JEZYKI.map((j) => plik('7', j));

  it('AK-K-06-b pierwsze uruchomienie: plik języka z paczki, kopia, nic do usunięcia', () => {
    expect(planTresci({ wPaczce: paczka, naUrzadzeniu: DANE, jezyk: 'pl' })).toEqual({
      ok: true, wartosc: { plik: 'tresc-7-pl.db', kopiuj: true, usunPoOtwarciu: [] },
    });
  });
  it('AK-K-06-c ta sama wersja już na urządzeniu → bez kopii (ADR 0005 pkt 2, forceOverwrite: false)', () => {
    expect(planTresci({ wPaczce: paczka, naUrzadzeniu: [...DANE, 'tresc-7-pl.db'], jezyk: 'pl' })).toEqual({
      ok: true, wartosc: { plik: 'tresc-7-pl.db', kopiuj: false, usunPoOtwarciu: [] },
    });
  });
  it('AK-K-06-d nowa wersja treści → jedna kopia, stary plik do usunięcia po otwarciu, dane użytkownika nie', () => {
    const w = planTresci({ wPaczce: paczka, naUrzadzeniu: [...DANE, 'tresc-6-pl.db'], jezyk: 'pl' });
    expect(w).toEqual({ ok: true, wartosc: { plik: 'tresc-7-pl.db', kopiuj: true, usunPoOtwarciu: ['tresc-6-pl.db'] } });
  });
  it('AK-K-06-e zmiana języka → kopia nowego języka, plik poprzedniego do usunięcia (na urządzeniu tylko aktywny język)', () => {
    const w = planTresci({ wPaczce: paczka, naUrzadzeniu: ['tresc-7-pl.db', ...DANE], jezyk: 'de' });
    expect(w).toEqual({ ok: true, wartosc: { plik: 'tresc-7-de.db', kopiuj: true, usunPoOtwarciu: ['tresc-7-pl.db'] } });
  });
  it.each([
    ['es', 'tresc-7-es.db', 'tresc-7-es-419.db'],
    ['es-419', 'tresc-7-es-419.db', 'tresc-7-es.db'],
    ['pt', 'tresc-7-pt.db', 'tresc-7-pt-BR.db'],
    ['pt-BR', 'tresc-7-pt-BR.db', 'tresc-7-pt.db'],
  ])('AK-K-06-f język %s nie myli się z językiem o wspólnym przedrostku', (jezyk, oczekiwany, inny) => {
    const w = planTresci({ wPaczce: paczka, naUrzadzeniu: [inny], jezyk });
    expect(w).toEqual({ ok: true, wartosc: { plik: oczekiwany, kopiuj: true, usunPoOtwarciu: [inny] } });
  });
  it('AK-K-06-g brak pliku języka w paczce → tresc_niedostepna (bez zastępowania innym językiem)', () => {
    expect(planTresci({ wPaczce: paczka.filter((p) => p !== 'tresc-7-ja.db'), naUrzadzeniu: DANE, jezyk: 'ja' })).toEqual(NIEDOSTEPNA);
    expect(planTresci({ wPaczce: [], naUrzadzeniu: ['tresc-6-pl.db'], jezyk: 'pl' })).toEqual(NIEDOSTEPNA);
    // tylko plik z innego języka o wspólnym przedrostku
    expect(planTresci({ wPaczce: ['tresc-7-es-419.db'], naUrzadzeniu: [], jezyk: 'es' })).toEqual(NIEDOSTEPNA);
  });
  it('AK-K-06-h własność: plik z paczki i dokładnie tego języka; usuwane tylko inne `tresc-*.db` z urządzenia', () => {
    const wersja = fc.stringMatching(/^[0-9a-z]{1,8}$/);
    // obce nazwy spoza wzorca `tresc-*.db` (usuwanie „wszystkiego poza znanymi plikami” ma paść)
    const obca = fc.stringMatching(/^[a-z][a-z0-9.-]{0,11}$/).filter((n) => !/^tresc-.*\.db$/.test(n));
    const jezyk = fc.constantFrom(...JEZYKI);
    const nazwaTresci = fc.tuple(wersja, jezyk).map(([w, j]) => plik(w, j));
    fc.assert(fc.property(
      wersja, jezyk, fc.uniqueArray(nazwaTresci, { maxLength: 6 }), fc.subarray(DANE), fc.uniqueArray(obca, { maxLength: 4 }),
      (w, j, staraTresc, dane, obce) => {
        const wPaczce = JEZYKI.map((x) => plik(w, x));
        const naUrzadzeniu = [...staraTresc, ...dane, ...obce];
        const r = planTresci({ wPaczce, naUrzadzeniu, jezyk: j });
        expect(r.ok).toBe(true);
        if (!r.ok) return;
        expect(r.wartosc.plik).toBe(plik(w, j));
        expect(r.wartosc.kopiuj).toBe(!naUrzadzeniu.includes(plik(w, j)));
        expect([...r.wartosc.usunPoOtwarciu].sort()).toEqual(staraTresc.filter((p) => p !== plik(w, j)).sort());
      },
    ));
  });
});

describe('AK-K-06: manifest `meta` (ADR 0005 pkt 5)', () => {
  const meta = (z: Record<string, string> = {}) => ({ format: String(K.TRESC_FORMAT), wersja: '7', jezyk: 'pl', min_wersja_aplikacji: '1.0.0', ...z });

  it('AK-K-06-i manifest zgodny z nazwą i obsługiwanym formatem → przyjęty', () => {
    expect(sprawdzMetaTresci(meta(), 'tresc-7-pl.db', K.TRESC_FORMAT)).toEqual({
      ok: true, wartosc: { format: K.TRESC_FORMAT, wersja: '7', jezyk: 'pl', minWersjaAplikacji: '1.0.0' },
    });
    expect(sprawdzMetaTresci(meta({ jezyk: 'pt-BR' }), 'tresc-7-pt-BR.db', K.TRESC_FORMAT)).toMatchObject({ ok: true });
  });
  it('AK-K-06-j format nowszy niż obsługiwany → odrzucony', () => {
    expect(sprawdzMetaTresci(meta({ format: String(K.TRESC_FORMAT + 1) }), 'tresc-7-pl.db', K.TRESC_FORMAT)).toEqual(NIEDOSTEPNA);
  });
  it.each([
    ['brak tabeli meta', null],
    ['brak `format`', { wersja: '7', jezyk: 'pl', min_wersja_aplikacji: '1.0.0' }],
    ['brak `wersja`', { format: '1', jezyk: 'pl', min_wersja_aplikacji: '1.0.0' }],
    ['brak `jezyk`', { format: '1', wersja: '7', min_wersja_aplikacji: '1.0.0' }],
    ['brak `min_wersja_aplikacji`', { format: '1', wersja: '7', jezyk: 'pl' }],
    ['format niecałkowity', { format: '1.5', wersja: '7', jezyk: 'pl', min_wersja_aplikacji: '1.0.0' }],
    ['format nieliczbowy', { format: 'jeden', wersja: '7', jezyk: 'pl', min_wersja_aplikacji: '1.0.0' }],
    ['format pusty', { format: '', wersja: '7', jezyk: 'pl', min_wersja_aplikacji: '1.0.0' }],
    ['język inny niż w nazwie', { format: '1', wersja: '7', jezyk: 'de', min_wersja_aplikacji: '1.0.0' }],
    ['język z przedrostkiem nazwy', { format: '1', wersja: '7', jezyk: 'pt', min_wersja_aplikacji: '1.0.0' }],
    ['wersja inna niż w nazwie', { format: '1', wersja: '6', jezyk: 'pl', min_wersja_aplikacji: '1.0.0' }],
  ])('AK-K-06-k %s → tresc_niedostepna', (_opis, m) => {
    const nazwa = _opis === 'język z przedrostkiem nazwy' ? 'tresc-7-pt-BR.db' : 'tresc-7-pl.db';
    expect(K.TRESC_FORMAT).toBe(1); // przypadki wyżej zakładają format 1
    expect(sprawdzMetaTresci(m, nazwa, K.TRESC_FORMAT)).toEqual(NIEDOSTEPNA);
  });
});

describe('AK-BR-DANE-004-b: kolejka powtórek po zmianie treści', () => {
  type Karta = { familyId: string; due: number; reps: number };
  const T = 1_800_000_000_000;
  // kolejność wejścia inna niż terminów (wykrywa sortowanie wejścia w miejscu)
  const A = { familyId: 'f-a', due: T - 4000, reps: 1 }, B = { familyId: 'f-b', due: T - 3000, reps: 2 }, C = { familyId: 'f-c', due: T - 2000, reps: 5 };
  const karty: Karta[] = [
    C,
    { familyId: 'f-przyszla', due: T + 1, reps: 1 },
    B,
    { familyId: 'f-usunieta', due: T - 5000, reps: 3 }, // najbardziej zaległa, rodziny już nie ma w treści
    A,
  ];
  const wTresci = new Set(['f-a', 'f-b', 'f-c', 'f-przyszla']);

  it('AK-BR-DANE-004-b usunięta rodzina pominięta bez błędu, pozostałe w kolejności terminów, wejście nietknięte', () => {
    const kopia = structuredClone(karty);
    expect(kolejkaPowtorek(karty, wTresci, T)).toEqual([A, B, C]);
    expect(karty).toEqual(kopia);
  });
  it('AK-BR-DANE-004-b karta usuniętej rodziny nie zajmuje miejsca w limicie', () => {
    expect(kolejkaPowtorek(karty, wTresci, T, 2)).toEqual([A, B]);
  });
  it('AK-BR-DANE-004-b termin równy „teraz” jest do powtórki; późniejszy nie', () => {
    expect(kolejkaPowtorek([{ familyId: 'f-a', due: T, reps: 0 }, { familyId: 'f-b', due: T + 1, reps: 0 }], wTresci, T)).toEqual([{ familyId: 'f-a', due: T, reps: 0 }]);
  });
  it('AK-BR-DANE-004-b relacja: rodzina usunięta z treści = karta usunięta z wejścia', () => {
    const rodzina = fc.constantFrom('r1', 'r2', 'r3', 'r4', 'r5', 'r6');
    const karta = fc.record({ familyId: rodzina, due: fc.integer({ min: T - 10, max: T + 10 }), reps: fc.nat(9) });
    const wszystkie = new Set(['r1', 'r2', 'r3', 'r4', 'r5', 'r6']);
    fc.assert(fc.property(
      fc.uniqueArray(karta, { selector: (k) => k.familyId, maxLength: 6 }), fc.subarray([...wszystkie]), fc.option(fc.integer({ min: 0, max: 6 }), { nil: undefined }),
      (k, obecne, limit) => {
        const zTresci = new Set(obecne);
        const wynik = kolejkaPowtorek(k, zTresci, T, limit);
        expect(wynik).toEqual(kolejkaPowtorek(k.filter((x) => zTresci.has(x.familyId)), wszystkie, T, limit));
        expect(wynik.every((x) => zTresci.has(x.familyId) && x.due <= T)).toBe(true);
        expect(wynik.map((x) => x.due)).toEqual([...wynik.map((x) => x.due)].sort((a, b) => a - b));
      },
    ));
  });
});
