// Wektory reguł RD-01–RD-10 z tests/wektory/brd.json (rola 01; policzone niezależnie od kodu, `docs/brd/reguly.md:6`) połączone z funkcjami
// wskazanymi w polu „Kod” reguły (`docs/brd/reguly.md`). Oczekiwana wartość pochodzi z pliku wektorów, nigdy z kodu.
// RD-11 (4 stopnie oceny, L-06) i RD-12 (zastąpione przez D-158, D-168) są poza tym plikiem.
// OCZEKUJACE: wektory, które obecny kod łamie (znane usterki z ID); biegną w tests/akceptacja (D-175), reszta w pakiecie poker-core.
import { alpha, callEv, geometricFraction, hitProbability, icmEquities, mdf, requiredEquity, ruleOf2And4, spr } from '../../packages/poker-core/src';
import wektory from './brd.json';

export interface Wektor { regula: string; id: string; wejscie: Record<string, unknown>; oczekiwane: Record<string, unknown>; tolerancja?: number; rodzaj: string; pochodzenie: string; miejsce: string }
export interface Przypadek { id: string; miejsce: string; uruchom: () => number | number[]; oczekiwane: number | number[] | 'błąd danych'; tolerancja: number }

const BRAK = 'brak';
const liczba = (v: unknown): number => (v === BRAK ? (undefined as unknown as number) : (v as number));
const lista = (v: unknown): number[] => (v === BRAK ? (undefined as unknown as number[]) : String(v).split(';').map((s) => Number(s.trim().replace(',', '.'))));
const wynik = (v: unknown): number | number[] | 'błąd danych' => (v === 'błąd danych' ? v : typeof v === 'number' ? v : lista(v));

const wywolanie: Record<string, (w: Record<string, unknown>) => () => number | number[]> = {
  'RD-01': (w) => () => requiredEquity(liczba(w['P [żetony]']), liczba(w['B [żetony]'])),
  'RD-02': (w) => () => mdf(liczba(w['P [żetony]']), liczba(w['B [żetony]'])),
  'RD-03': (w) => () => alpha(liczba(w['P [żetony]']), liczba(w['B [żetony]'])),
  'RD-04': (w) => () => hitProbability(liczba(w['o [karty]']), liczba(w['n [karty]']), liczba(w['k [karty]']) as 1 | 2),
  // reguła 2 i 4: wektor w procentach, funkcja zwraca ułamek (math.ts:64 „w procentach jako ułamek”)
  'RD-05': (w) => () => ruleOf2And4(liczba(w['o [karty]']), liczba(w['k [karty]']) as 1 | 2) * 100,
  'RD-06': (w) => () => spr(liczba(w['S [żetony]']), liczba(w['P [żetony]'])),
  'RD-07': (w) => () => geometricFraction(liczba(w['SPR [-]']), liczba(w['u [ulice]'])),
  // callEv przyjmuje pulę po zakładzie (P + B) i kwotę do sprawdzenia B (reguly.md:137)
  'RD-08': (w) => () => callEv(liczba(w['e [-]']), liczba(w['P [żetony]']) + liczba(w['B [żetony]']), liczba(w['B [żetony]'])),
  'RD-09': (w) => () => icmEquities(lista(w['s [żetony]']), lista(w['w [%]'])),
};

export const PRZYPADKI: Przypadek[] = (wektory as unknown as Wektor[])
  .filter((w) => w.regula in wywolanie)
  .map((w) => ({ id: w.id, miejsce: w.miejsce, uruchom: wywolanie[w.regula]!(w.wejscie), oczekiwane: wynik(Object.values(w.oczekiwane)[0]), tolerancja: w.tolerancja ?? 0 }));

/** Wektory, które obecny kod łamie, z powodem; rola 08 usuwa wpis w commicie, który naprawia funkcję. */
export const OCZEKUJACE: Record<string, string> = {
  'RD-05-W6': 'ER-11 / RYZ-03: ruleOf2And4 nie odrzuca liczby outów < 0',
  'RD-05-W7': 'ER-11 / RYZ-03: ruleOf2And4 nie odrzuca brakującej liczby outów',
  'RD-08-W4': 'ER-11 / RYZ-03: callEv nie odrzuca equity spoza [0, 1]',
};

export function sprawdz(p: Przypadek, expect: (v: unknown, m?: string) => any): void {
  if (p.oczekiwane === 'błąd danych') {
    expect(p.uruchom, `${p.id} (${p.miejsce}): błąd danych ma być odrzucony`).toThrow();
    return;
  }
  const w = p.uruchom();
  const ocz = Array.isArray(p.oczekiwane) ? p.oczekiwane : [p.oczekiwane];
  const got = Array.isArray(w) ? w : [w];
  expect(got.length, `${p.id}: liczba wartości`).toBe(ocz.length);
  ocz.forEach((o, i) => expect(Math.abs(got[i]! - o), `${p.id} (${p.miejsce}): ${got[i]} wobec ${o} ± ${p.tolerancja}`).toBeLessThanOrEqual(p.tolerancja + 1e-12));
}
