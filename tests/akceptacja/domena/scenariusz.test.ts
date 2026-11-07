// Testy akceptacyjne scenariusza rozdania (BR-SCN-001–004, D-109; rola 07 E3 część 13, D-197). Wyrocznia: kryteria BRD,
// wektory RD-10-W3/W4 i RD-11-W6/W7 z tests/wektory/brd.json (nie wpisane liczby) i scenariusz syntetyczny poniżej —
// dane treści o kształcie TrescScenariusza (treść scenariuszy pisze rola 06), z ręką ustaloną tak, że gracz ma fulla
// (K♠ K♦ + K♥ 7♥ 7♣), a rywal kolor (A♥ 3♥ + K♥ 7♥ 2♥ 9♥).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { przebiegScenariusza, type OcenaOdpowiedzi, type TrescScenariusza } from '../../../packages/domena/src';

const WEKTORY = JSON.parse(readFileSync(new URL('../../wektory/brd.json', import.meta.url), 'utf8')) as { id: string; wejscie: Record<string, number>; oczekiwane: Record<string, unknown> }[];
const wektor = (id: string) => WEKTORY.find((v) => v.id === id)!;
const NA_OCENE: Record<string, OcenaOdpowiedzi> = { zgodne: 'zgodne', dopuszczalne: 'dopuszczalne', niedokładność: 'niedokladnosc', błąd: 'blad' };
const W6 = wektor('RD-11-W6');
const W7 = wektor('RD-11-W7');

const SCN: TrescScenariusza = {
  id: 'scn-test-full-kolor',
  rekaGracza: ['Ks', 'Kd'],
  rekaRywala: ['Ah', '3h'],
  stol: ['Kh', '7h', '7c', '2h', '9h'],
  decyzje: [
    { ulica: 'preflop', akcje: [
      { akcja: 'raise', czestosc: 0.95, rywal: 'call', dalej: 1, wyjasnienie: 'Para króli otwiera zawsze.' },
      { akcja: 'call', czestosc: 0.05, rywal: 'check', dalej: 2, wyjasnienie: 'Sprawdzenie rzadkie; rywal czekuje do turnu.' }, // gałąź: skok przez flop
    ] },
    { ulica: 'flop', akcje: [
      { akcja: 'bet', czestosc: 0.8, rywal: 'call', dalej: 2, wyjasnienie: 'Trójka na stole z kolorem w drodze: zakład.' },
      { akcja: 'check', czestosc: 0.2, rywal: 'check', dalej: 2, wyjasnienie: 'Czek rzadziej.' },
    ] },
    { ulica: 'turn', akcje: [
      { akcja: 'bet', czestosc: 0.9, rywal: 'call', dalej: 3, wyjasnienie: 'Full: zakład dla wartości.' },
      { akcja: 'check', czestosc: 0.1, rywal: 'bet', dalej: 3, wyjasnienie: 'Czek oddaje inicjatywę.' },
    ] },
    { ulica: 'river', akcje: [
      { akcja: 'raise', czestosc: W6.wejscie['f_max [-]']!, rywal: 'call', dalej: 'pokazanie', wyjasnienie: 'Podbicie: rywal z kolorem zapłaci, a full wygrywa.' },
      { akcja: 'call', czestosc: W6.wejscie['f [-]']!, rywal: null, dalej: 'pokazanie', wyjasnienie: 'Sprawdzenie traci wartość.' },
      { akcja: 'fold', czestosc: W7.wejscie['f [-]']!, rywal: null, dalej: 'koniec', wyjasnienie: 'Pas z fullem oddaje pulę, którą wygrywasz.' },
      { akcja: 'allin', czestosc: 1 - W6.wejscie['f_max [-]']! - W6.wejscie['f [-]']!, rywal: 'call', dalej: 'pokazanie', wyjasnienie: 'All-in też dla wartości.' },
    ] },
  ],
};
const ZGODNA_LINIA = ['raise', 'bet', 'bet', 'raise'];
function ok<T>(w: { ok: true; wartosc: T } | { ok: false; powod: string }): T {
  if (!w.ok) throw new Error(`oczekiwano ok, jest ${w.powod}`);
  return w.wartosc;
}

describe('AK-BR-SCN-001: powtarzalność scenariusza', () => {
  it('AK-BR-SCN-001-a te same decyzje → te same akcje rywala i te same karty stołu (z treści, na każdej ulicy)', () => {
    const a = ok(przebiegScenariusza(SCN, ZGODNA_LINIA));
    const b = ok(przebiegScenariusza(SCN, ZGODNA_LINIA));
    expect(b).toEqual(a);
    expect(a.kroki.map((k) => k.stolWidoczny.length)).toEqual([0, 3, 4, 5]);
    a.kroki.forEach((k) => expect(k.stolWidoczny).toEqual(SCN.stol.slice(0, k.stolWidoczny.length)));
    expect(a.kroki.map((k) => k.rywal)).toEqual(['call', 'call', 'call', 'call']);
  });
  it('AK-BR-SCN-001-c przebieg bez źródeł losowości i zegara (kontrola statyczna packages/domena/src/scenariusz.ts)', () => {
    const zrodlo = readFileSync(new URL('../../../packages/domena/src/scenariusz.ts', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
    expect(zrodlo).not.toMatch(/Math\.random|Date\.now|new Date\(|crypto\./);
  });
  it('AK-BR-SCN-001-d gałąź treści (skok do decyzji 2) i prefiks wyborów: ulice z treści, przebieg w toku bez podsumowania końca', () => {
    const p = ok(przebiegScenariusza(SCN, ['call', 'bet']));
    expect(p.kroki.map((k) => k.ulica)).toEqual(['preflop', 'turn']);
    expect(p.kroki[1]!.stolWidoczny).toEqual(SCN.stol.slice(0, 4));
    expect(p.koniec).toBe('w_toku');
    expect(p.pokazanie).toBeNull();
  });
  it('AK-D109-scn wybór spoza akcji z oceną → akcja_niedostepna', () => {
    expect(przebiegScenariusza(SCN, ['raise', 'overbet'])).toEqual({ ok: false, powod: 'akcja_niedostepna' });
  });
});

describe('AK-BR-SCN-002: koniec scenariusza bez wygranej i salda', () => {
  it('AK-BR-SCN-002-a podsumowanie to oceny decyzji; w całym wyniku nie ma pola wygranej, salda, puli ani stosu', () => {
    const p = ok(przebiegScenariusza(SCN, ZGODNA_LINIA));
    expect(Object.keys(p.podsumowanie)).toEqual(['oceny']);
    expect(p.podsumowanie.oceny).toHaveLength(p.kroki.length);
    const klucze: string[] = [];
    (function zbierz(o: unknown) {
      if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) (klucze.push(k), zbierz(v));
    })(p);
    expect(klucze.filter((k) => /wygr|wygran|saldo|stos|stack|zeton|żeton|chip|pula|pot|bankroll|ranking/i.test(k))).toEqual([]);
  });
});

describe('AK-BR-SCN-003: ocena decyzji w scenariuszu (RD-11)', () => {
  it('AK-BR-SCN-003-a sprawdzenie z częstością 0,0349 wobec 0,7151 → „niedokładność” (RD-11-W6) z wyjaśnieniem najczęstszego zagrania', () => {
    const p = ok(przebiegScenariusza(SCN, ['raise', 'bet', 'bet', 'call']));
    const river = p.kroki[3]!;
    expect(river.ocena).toBe(NA_OCENE[String(W6.oczekiwane['ocena [-]'])]);
    expect(river.wyjasnienie).toContain(SCN.decyzje[3]!.akcje[0]!.wyjasnienie);
  });
  it('AK-BR-SCN-003-b zagranie z częstością 0 → „błąd” (RD-11-W7), a scenariusz kończy się z wyjaśnieniem (dalej: koniec)', () => {
    const p = ok(przebiegScenariusza(SCN, ['raise', 'bet', 'bet', 'fold']));
    expect(p.kroki[3]!.ocena).toBe(NA_OCENE[String(W7.oczekiwane['ocena [-]'])]);
    expect(p.koniec).toBe('koniec');
    expect(p.pokazanie).toBeNull();
    expect(p.kroki[3]!.wyjasnienie).toContain(SCN.decyzje[3]!.akcje[2]!.wyjasnienie);
  });
});

describe('AK-BR-SCN-004: pokazanie kart', () => {
  it('AK-BR-SCN-004-b karty i rozstrzygnięcie te same przy każdym rozegraniu (BR-SCN-001)', () => {
    expect(ok(przebiegScenariusza(SCN, ZGODNA_LINIA)).pokazanie).toEqual(ok(przebiegScenariusza(SCN, ZGODNA_LINIA)).pokazanie);
  });
  const liczba = (n: number) => new RegExp(String(n).replace(/\B(?=(\d{3})+$)/g, '[\\s\\u00a0\\u202f]?'));
  it('AK-BR-SCN-004-a full gracza wobec koloru rywala → wygrywa gracz, wyjaśnienie podaje 3744 układów fulla i 5108 koloru (RD-10-W3, -W4)', () => {
    const p = ok(przebiegScenariusza(SCN, ZGODNA_LINIA));
    expect(p.koniec).toBe('pokazanie');
    expect(p.pokazanie?.zwyciezca).toBe('gracz');
    expect(p.pokazanie?.wyjasnienie).toMatch(liczba(Number(wektor('RD-10-W3').oczekiwane['liczba [układy]'])));
    expect(p.pokazanie?.wyjasnienie).toMatch(liczba(Number(wektor('RD-10-W4').oczekiwane['liczba [układy]'])));
  });
});
