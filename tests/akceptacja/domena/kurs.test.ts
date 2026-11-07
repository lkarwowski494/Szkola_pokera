// Testy akceptacyjne ścieżki kursu, testu modułu, ponownej oceny i prośby o ocenę (rola 07 E3 część 13, D-197).
// Wyrocznia: kryteria BRD (docs/brd/wymagania-nauka.md, wymagania-sklep.md) i parametry z KONFIGURACJA (D-106, D-110);
// moduły i lekcje to dane syntetyczne o kształcie content/pl/modules.yaml (kolejność M0–M13 jest daną, nie wynikiem kodu).
// 07 fix (L7-13a): `stanKursu` / `FaktyKursu` z moduly.md „Kurs” i D-216 (BR-ONB-003 A: niezaliczony test zdejmuje zaliczenie
// oceną; ponowna ocena je przywraca); ścieżka `nastepnaLekcja` wynika z zaliczeń, nie z pominięcia modułów przed punktem (D-224 pkt 4).
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  KONFIGURACJA as K,
  czyProsicOOcene,
  nastepnaLekcja,
  planLekcji,
  poKrokuLekcji,
  poPonownejOcenie,
  poTescieModulu,
  stanKursu,
  wynikTestuModulu,
  type FaktyKursu,
  type MiejsceProsby,
  type ModulKursu,
  type OdpowiedzTestu,
  type PostepKursu,
} from '../../../packages/domena/src';

const MODULY: ModulKursu[] = Array.from({ length: 14 }, (_, i) => ({ id: `M${i}`, lekcje: [`m${i}-l1`, `m${i}-l2`, `m${i}-l3`] }));
const PUSTY: PostepKursu = { ukonczoneLekcje: [], zaliczoneTestem: [], zaliczoneOcena: [], punktStartu: 'M0' };
const DZIEN = 86_400_000;

/** Odpowiedzi testu modułu: `bledne` pierwszych zadań błędnych, zadanie i ma lekcję m3-l(1 + i mod 3). */
function test15(bledne: number, modul = 'M3'): OdpowiedzTestu[] {
  const n = modul.slice(1);
  return Array.from({ length: K.TEST_MODULU_LICZBA_ZADAN }, (_, i) => ({
    zadanieId: `${modul}-z${i + 1}`,
    lekcjaId: `m${n}-l${1 + (i % 3)}`,
    poprawna: i >= bledne,
  }));
}
/** Największa liczba błędów, przy której test jest zaliczony (próg z konfiguracji, nie wpisany). */
const MAKS_BLEDOW = Math.floor(K.TEST_MODULU_LICZBA_ZADAN * (1 - K.TEST_MODULU_PROG) + 1e-9);

describe('AK-BR-KURS-001: ukończenie lekcji i następna lekcja', () => {
  it('AK-BR-KURS-001-a po ostatniej części lekcji są ćwiczenia z tej lekcji; ukończona dopiero po ostatnim ćwiczeniu', () => {
    const plan = planLekcji({ id: 'm0-l1', czesci: ['c1', 'c2', 'c3'], cwiczenia: ['z1', 'z2'] });
    expect(plan.map((k) => k.rodzaj)).toEqual(['czesc', 'czesc', 'czesc', 'cwiczenie', 'cwiczenie']);
    expect(plan.filter((k) => k.rodzaj === 'cwiczenie').map((k) => k.id)).toEqual(['z1', 'z2']);
    for (let krok = 0; krok < plan.length - 1; krok++) expect(poKrokuLekcji(PUSTY, 'm0-l1', plan, krok).ukonczoneLekcje).toEqual([]);
    expect(poKrokuLekcji(PUSTY, 'm0-l1', plan, plan.length - 1).ukonczoneLekcje).toEqual(['m0-l1']);
    const inny: PostepKursu = { ukonczoneLekcje: ['m5-l1'], zaliczoneTestem: ['M2'], zaliczoneOcena: ['M0'], punktStartu: 'M1' };
    expect(poKrokuLekcji(inny, 'm1-l1', plan, plan.length - 1)).toEqual({ ...inny, ukonczoneLekcje: ['m5-l1', 'm1-l1'] });
  });

  it('AK-BR-KURS-001-b po ukończonej lekcji wskazana jest następna w kolejności M0–M13, także przez granicę modułu', () => {
    expect(nastepnaLekcja(MODULY, PUSTY)).toBe('m0-l1');
    expect(nastepnaLekcja(MODULY, { ...PUSTY, ukonczoneLekcje: ['m0-l1'] })).toBe('m0-l2');
    expect(nastepnaLekcja(MODULY, { ...PUSTY, ukonczoneLekcje: ['m0-l1', 'm0-l2', 'm0-l3'] })).toBe('m1-l1');
    const wszystkie = MODULY.flatMap((m) => m.lekcje);
    expect(nastepnaLekcja(MODULY, { ...PUSTY, ukonczoneLekcje: wszystkie })).toBeNull();
    // ścieżka zaczyna od punktu startu (BR-ONB-002): moduły przed nim są zaliczone oceną w stanie ze `stanKursu` (D-224 pkt 4)
    expect(nastepnaLekcja(MODULY, { ...PUSTY, punktStartu: 'M4', zaliczoneOcena: ['M0', 'M1', 'M2', 'M3'] })).toBe('m4-l1');
    // moduł przed punktem startu bez zaliczenia (zdjęte niezaliczonym testem, D-216) wraca na ścieżkę
    expect(nastepnaLekcja(MODULY, { ...PUSTY, punktStartu: 'M4', zaliczoneOcena: ['M0', 'M1', 'M3'] })).toBe('m2-l1');
  });

  it('AK-BR-KURS-001-c własność: wskazana lekcja nie jest ukończona, a każda wcześniejsza w kolejności kursu jest ukończona', () => {
    const wszystkie = MODULY.flatMap((m) => m.lekcje);
    fc.assert(
      fc.property(fc.subarray(wszystkie), (ukonczone) => {
        const l = nastepnaLekcja(MODULY, { ...PUSTY, ukonczoneLekcje: ukonczone });
        if (l === null) {
          expect(ukonczone.length).toBe(wszystkie.length);
          return;
        }
        expect(ukonczone).not.toContain(l);
        const idx = wszystkie.indexOf(l);
        expect(wszystkie.slice(0, idx).every((x) => ukonczone.includes(x))).toBe(true);
      }),
    );
  });
});

describe('AK-BR-KURS-002: test modułu (D-106)', () => {
  it('AK-BR-KURS-002-a zaliczony test M3 bez lekcji M3 → M3 zaliczony testem, ścieżka wskazuje M4', () => {
    const postep: PostepKursu = { ...PUSTY, ukonczoneLekcje: MODULY.slice(0, 3).flatMap((m) => m.lekcje) };
    const w = wynikTestuModulu(test15(MAKS_BLEDOW));
    expect(w.zaliczony).toBe(true);
    const po = poTescieModulu(postep, 'M3', w);
    expect(po.zaliczoneTestem).toContain('M3');
    expect(po.ukonczoneLekcje).toEqual(postep.ukonczoneLekcje);
    expect(nastepnaLekcja(MODULY, po)).toBe('m4-l1');
  });

  it('AK-BR-KURS-002-b niezaliczony → lekcje z błędnych zadań (bez powtórzeń) i moduł niezaliczony', () => {
    const w = wynikTestuModulu(test15(MAKS_BLEDOW + 1));
    expect(w.zaliczony).toBe(false);
    expect(w.bledneZadania).toEqual(Array.from({ length: MAKS_BLEDOW + 1 }, (_, i) => `M3-z${i + 1}`));
    expect(w.lekcjeDoPowtorki).toEqual(['m3-l1', 'm3-l2', 'm3-l3'].slice(0, Math.min(3, MAKS_BLEDOW + 1)));
    expect(poTescieModulu(PUSTY, 'M3', w).zaliczoneTestem).not.toContain('M3');
  });

  it('AK-BR-KURS-002-c granica progu: zaliczony wtedy i tylko wtedy, gdy odsetek poprawnych ≥ TEST_MODULU_PROG', () => {
    for (let b = 0; b <= K.TEST_MODULU_LICZBA_ZADAN; b++) {
      const poprawne = (K.TEST_MODULU_LICZBA_ZADAN - b) / K.TEST_MODULU_LICZBA_ZADAN;
      expect(wynikTestuModulu(test15(b)).zaliczony, `błędów: ${b}`).toBe(poprawne >= K.TEST_MODULU_PROG);
    }
  });

  it('AK-BR-KURS-002-d test niekompletny (liczba odpowiedzi ≠ TEST_MODULU_LICZBA_ZADAN) nie ma wyniku', () => {
    // wyjątek ze znacznikiem braku implementacji nie liczy się jako odrzucenie (inaczej test byłby zielony na zaślepce)
    const odrzuca = (f: () => unknown) => {
      try {
        f();
      } catch (e) {
        if (String((e as Error).message).includes('NIEZAIMPLEMENTOWANE')) throw e;
        return true;
      }
      return false;
    };
    expect(odrzuca(() => wynikTestuModulu(test15(0).slice(1)))).toBe(true);
    expect(odrzuca(() => wynikTestuModulu([...test15(0), ...test15(0).slice(0, 1)]))).toBe(true);
  });
});

describe('AK-BR-ONB-003: ponowna ocena poziomu', () => {
  const zPostepem: PostepKursu = { ukonczoneLekcje: ['m0-l1', 'm0-l2', 'm5-l1'], zaliczoneTestem: ['M2'], zaliczoneOcena: [], punktStartu: 'M0' };

  it('AK-BR-ONB-003-a punkt startu się zmienia, ukończone lekcje i moduły zaliczone testem zostają', () => {
    const po = poPonownejOcenie(zPostepem, MODULY, 'M4');
    expect(po.punktStartu).toBe('M4');
    expect(po.ukonczoneLekcje).toEqual(zPostepem.ukonczoneLekcje);
    expect(po.zaliczoneTestem).toEqual(zPostepem.zaliczoneTestem);
    expect(nastepnaLekcja(MODULY, po)).toBe('m4-l1');
    // ponowna ocena na wcześniejszy moduł zawęża zaliczenie oceną; zaliczone testem zostaje
    const wstecz = poPonownejOcenie({ ...po, zaliczoneOcena: ['M0', 'M1', 'M2', 'M3'] }, MODULY, 'M1');
    expect(wstecz.zaliczoneOcena).toEqual(['M0']);
    expect(wstecz.zaliczoneTestem).toEqual(['M2']);
    expect(wstecz.ukonczoneLekcje).toEqual(zPostepem.ukonczoneLekcje);
  });

  it('AK-BR-ONB-003-b niezaliczony test modułu zaliczonego oceną → lekcje M2 do powtórki, M2 zdjęty z zaliczenia oceną i wraca na ścieżkę (D-216)', () => {
    const po = poPonownejOcenie(PUSTY, MODULY, 'M3');
    expect(po.zaliczoneOcena).toEqual(['M0', 'M1', 'M2']);
    const w = wynikTestuModulu(test15(K.TEST_MODULU_LICZBA_ZADAN, 'M2'));
    expect(w.zaliczony).toBe(false);
    expect(w.lekcjeDoPowtorki).toEqual(['m2-l1', 'm2-l2', 'm2-l3']);
    expect(w.bledneZadania).toHaveLength(K.TEST_MODULU_LICZBA_ZADAN);
    const poTescie = poTescieModulu(po, 'M2', w);
    expect(poTescie.ukonczoneLekcje).toEqual(po.ukonczoneLekcje);
    expect(poTescie.zaliczoneOcena).toEqual(['M0', 'M1']);
    expect(poTescie.zaliczoneTestem).not.toContain('M2');
    // „Następna lekcja” prowadzi do lekcji z błędnych pytań; tu wszystkie lekcje M2 mają błędy, więc pierwsza z nich jest też
    // pierwszą nieukończoną (ogólny przypadek: zgłoszenie JAK-F07-01 dla 05/01)
    expect(nastepnaLekcja(MODULY, poTescie)).toBe(w.lekcjeDoPowtorki[0]);
  });

  it('AK-BR-ONB-003-c ponowna ocena po niezaliczonym teście przywraca zaliczenie oceną modułów przed nowym punktem (D-216)', () => {
    const zdjety: PostepKursu = { ...PUSTY, punktStartu: 'M3', zaliczoneOcena: ['M0', 'M1'] };
    expect(poPonownejOcenie(zdjety, MODULY, 'M3').zaliczoneOcena).toEqual(['M0', 'M1', 'M2']);
  });
});

describe('AK-L7-13a: stanKursu — zaliczenia jako pochodna faktów (moduly.md „Kurs”, D-216)', () => {
  const T = 1_000_000;
  const fakty = (f: Partial<FaktyKursu>): FaktyKursu => ({ ukonczoneLekcje: [], punktStartu: null, testy: [], ...f });
  const posortowane = (x: readonly string[]) => [...x].sort();

  it('AK-L7-13a-a „Pomiń” (punkt startu null), bez testów → start w pierwszym module, nic nie zaliczone, lekcje bez zmian', () => {
    expect(stanKursu(MODULY, fakty({ ukonczoneLekcje: ['m0-l1'] }))).toEqual({ ukonczoneLekcje: ['m0-l1'], zaliczoneTestem: [], zaliczoneOcena: [], punktStartu: 'M0' });
  });
  it('AK-L7-13a-b punkt startu M3 → M0–M2 zaliczone oceną, ścieżka od m3-l1', () => {
    const p = stanKursu(MODULY, fakty({ punktStartu: { modulId: 'M3', ustawionoMs: T } }));
    expect([p.punktStartu, posortowane(p.zaliczoneOcena)]).toEqual(['M3', ['M0', 'M1', 'M2']]);
    expect(nastepnaLekcja(MODULY, p)).toBe('m3-l1');
  });
  it('AK-L7-13a-c niezaliczony test M2 po ustawieniu punktu → M2 bez zaliczenia oceną, ścieżka wraca do m2-l1', () => {
    const p = stanKursu(MODULY, fakty({ punktStartu: { modulId: 'M3', ustawionoMs: T }, testy: [{ modulId: 'M2', zaliczony: false, koniecMs: T + 1 }] }));
    expect(posortowane(p.zaliczoneOcena)).toEqual(['M0', 'M1']);
    expect(p.zaliczoneTestem).toEqual([]);
    expect(nastepnaLekcja(MODULY, p)).toBe('m2-l1');
  });
  it('AK-L7-13a-d niezaliczony test M2 przed ustawieniem punktu (koniecMs ≤ ustawionoMs) → M2 nadal zaliczony oceną', () => {
    for (const koniecMs of [T - 1, T]) {
      const p = stanKursu(MODULY, fakty({ punktStartu: { modulId: 'M3', ustawionoMs: T }, testy: [{ modulId: 'M2', zaliczony: false, koniecMs }] }));
      expect(posortowane(p.zaliczoneOcena), `koniecMs ${koniecMs - T}`).toEqual(['M0', 'M1', 'M2']);
    }
  });
  it('AK-L7-13a-e zaliczony co najmniej jeden test → zaliczone testem, także gdy później był niezaliczony', () => {
    const p = stanKursu(MODULY, fakty({ testy: [{ modulId: 'M5', zaliczony: true, koniecMs: T }, { modulId: 'M5', zaliczony: false, koniecMs: T + 5 }, { modulId: 'M6', zaliczony: false, koniecMs: T }] }));
    expect(p.zaliczoneTestem).toEqual(['M5']);
  });
  it('AK-L7-13a-f własność: zaliczone oceną tylko przed punktem i bez niezaliczonego testu po ustawieniu; następna lekcja nigdy z zaliczonego modułu', () => {
    const modul = fc.integer({ min: 0, max: MODULY.length - 1 }).map((i) => `M${i}`);
    const test = fc.record({ modulId: modul, zaliczony: fc.boolean(), koniecMs: fc.integer({ min: T - 10, max: T + 10 }) });
    const punkt = fc.option(fc.record({ modulId: modul, ustawionoMs: fc.constant(T) }), { nil: null });
    fc.assert(fc.property(punkt, fc.array(test, { maxLength: 8 }), fc.subarray(MODULY.flatMap((m) => m.lekcje)), (punktStartu, testy, ukonczoneLekcje) => {
      const p = stanKursu(MODULY, { ukonczoneLekcje, punktStartu, testy });
      const ip = punktStartu ? MODULY.findIndex((m) => m.id === punktStartu.modulId) : 0;
      expect(p.punktStartu).toBe(punktStartu?.modulId ?? 'M0');
      for (const m of p.zaliczoneOcena) {
        expect(MODULY.findIndex((x) => x.id === m)).toBeLessThan(ip);
        expect(testy.some((t) => t.modulId === m && !t.zaliczony && t.koniecMs > T)).toBe(false);
      }
      for (let i = 0; i < ip; i++) {
        const m = MODULY[i]!.id;
        if (!testy.some((t) => t.modulId === m && !t.zaliczony && t.koniecMs > T)) expect(p.zaliczoneOcena).toContain(m);
      }
      expect(posortowane(p.zaliczoneTestem)).toEqual(posortowane([...new Set(testy.filter((t) => t.zaliczony).map((t) => t.modulId))]));
      const l = nastepnaLekcja(MODULY, p);
      if (l !== null) {
        const m = MODULY.find((x) => x.lekcje.includes(l))!.id;
        expect(p.zaliczoneOcena).not.toContain(m);
        expect(p.zaliczoneTestem).not.toContain(m);
        expect(ukonczoneLekcje).not.toContain(l);
      }
    }));
  });
});

describe('AK-BR-OPIN-001: prośba o ocenę (D-110)', () => {
  const T = Date.UTC(2026, 10, 7, 12);
  const POD: MiejsceProsby[] = ['podsumowanie_lekcji', 'podsumowanie_sesji'];
  const INNE: MiejsceProsby[] = ['zadanie', 'ocena_poziomu', 'zakup', 'pierwsze_uruchomienie'];

  it('AK-BR-OPIN-001-a od PROSBA_O_OCENE_OD_PRACY skończonych prac, na podsumowaniu lekcji albo sesji → prośba; wcześniej nie', () => {
    for (const miejsce of POD) {
      expect(czyProsicOOcene({ miejsce, skonczonePrace: K.PROSBA_O_OCENE_OD_PRACY, ostatniaProsbaMs: null, teraz: T })).toBe(true);
      expect(czyProsicOOcene({ miejsce, skonczonePrace: K.PROSBA_O_OCENE_OD_PRACY - 1, ostatniaProsbaMs: null, teraz: T })).toBe(false);
    }
  });

  it('AK-BR-OPIN-001-b w trakcie zadania, oceny poziomu, na zakupie i przy pierwszym uruchomieniu → nigdy', () => {
    fc.assert(
      fc.property(fc.constantFrom(...INNE), fc.nat(1000), fc.option(fc.nat(), { nil: null }), (miejsce, skonczonePrace, ostatnia) => {
        expect(czyProsicOOcene({ miejsce, skonczonePrace, ostatniaProsbaMs: ostatnia, teraz: T })).toBe(false);
      }),
    );
  });

  it('AK-BR-OPIN-001-c mniej niż PROSBA_O_OCENE_ODSTEP_DNI od poprzedniej prośby → nie; dokładnie odstęp → tak', () => {
    const odstep = K.PROSBA_O_OCENE_ODSTEP_DNI * DZIEN;
    const wej = { miejsce: 'podsumowanie_lekcji' as const, skonczonePrace: K.PROSBA_O_OCENE_OD_PRACY + 5 };
    expect(czyProsicOOcene({ ...wej, ostatniaProsbaMs: T - odstep + 60_000, teraz: T })).toBe(false);
    expect(czyProsicOOcene({ ...wej, ostatniaProsbaMs: T - odstep, teraz: T })).toBe(true);
  });
});

describe('AK-BR-OPIN-001-d: dostęp niezależny od oceny (kontrola statyczna)', () => {
  const zrodlo = (p: string) =>
    readFileSync(new URL(p, import.meta.url), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');
  it('AK-BR-OPIN-001-d decyzja o dostępie i limit nie czytają oceny ani prośby (dostep.ts, limit.ts bez ocena/prośba/review)', () => {
    for (const p of ['../../../packages/domena/src/dostep.ts', '../../../packages/domena/src/limit.ts'])
      expect(zrodlo(p), p).not.toMatch(/prosb|review|ocenaSklep|rating/i);
  });
  it('AK-BR-OPIN-001-e systemowa prośba (requestReview) wywoływana najwyżej w jednym pliku aplikacji', () => {
    const pliki: string[] = [];
    const chodz = (d: string) => {
      for (const e of readdirSync(d, { withFileTypes: true })) {
        const s = join(d, e.name);
        if (e.isDirectory()) chodz(s);
        else if (/\.tsx?$/.test(e.name) && !/\.test\.tsx?$/.test(e.name) && /requestReview\s*\(/.test(readFileSync(s, 'utf8'))) pliki.push(s);
      }
    };
    chodz(fileURLToPath(new URL('../../../apps/mobile/src/', import.meta.url)));
    expect(pliki.length).toBeLessThanOrEqual(1);
  });
});
