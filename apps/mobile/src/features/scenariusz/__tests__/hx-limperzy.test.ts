/// <reference types="jest" />
// HX (D-1734, D-1736; docs/design/scenariusz-i-ocena.md „Limperzy na stole i w dzienniku”, kryteria 1–2): kto limpuje przed graczem i ile jest w puli.
// Reguła D-1800 (opcja A): limperami są OSTATNIE `limpers` miejsc przed graczem w kolejności akcji, wcześniejsze spasowały; BB nigdy nie jest przed graczem,
// SB limpuje za 0,5 bb (dopłaca do 1 bb). Pula = blindy 1,5 bb + wpłaty limperów.
import { przebiegLimperow, przedGraczem, pulaPrzedDecyzjaBb } from '../limperzy';

const stany = (hero: string, n: number) => przedGraczem(hero, n)?.map((w) => `${w.pozycja}:${w.akcja}`);

describe('HX D-1734: kto limpuje przed graczem', () => {
  it('hero CO, 1 limper → UTG pas, HJ limp (makieta „iso-1-limper”)', () => {
    expect(stany('CO', 1)).toEqual(['UTG:pas', 'HJ:limp']);
    expect(przebiegLimperow('CO', 1)).toBe('UTG:fold,HJ:limp');
  });
  it('hero SB, 2 limperów → UTG i HJ pas, CO i BTN limp (ostatnie dwa miejsca przed graczem)', () => {
    expect(stany('SB', 2)).toEqual(['UTG:pas', 'HJ:pas', 'CO:limp', 'BTN:limp']);
    expect(przebiegLimperow('SB', 2)).toBe('UTG:fold,HJ:fold,CO:limp,BTN:limp');
  });
  it('hero BB, 4 limperów → UTG pas, HJ, CO, BTN i SB limp; wpis SB to „limp 0,5 bb”', () => {
    expect(stany('BB', 4)).toEqual(['UTG:pas', 'HJ:limp', 'CO:limp', 'BTN:limp', 'SB:limp']);
    expect(przedGraczem('BB', 4)?.map((w) => w.kwotaBb)).toEqual([0, 1, 1, 1, 0.5]);
  });
  it('wszyscy przed graczem limpują: hero BTN, 3 limperów → UTG, HJ, CO limp', () => {
    expect(stany('BTN', 3)).toEqual(['UTG:limp', 'HJ:limp', 'CO:limp']);
  });
  it('kwota limpa: 1 bb (SB 0,5 bb), pas 0', () => {
    expect(przedGraczem('CO', 1)?.map((w) => w.kwotaBb)).toEqual([0, 1]);
  });
  it('liczba limperów spoza 1…miejsca przed graczem, ułamek, brak miejsc przed graczem i pozycja spoza 6-max dają null (bez zgadywania)', () => {
    expect(przedGraczem('CO', 0)).toBeNull();
    expect(przedGraczem('CO', 3)).toBeNull(); // przed CO są tylko UTG i HJ
    expect(przedGraczem('CO', 1.5)).toBeNull();
    expect(przedGraczem('UTG', 1)).toBeNull();
    expect(przedGraczem('UTG1', 1)).toBeNull(); // 9-max: układ 9 miejsc nie jest zaprojektowany
    expect(przebiegLimperow('CO', 3)).toBeNull();
  });
});

describe('HX D-1736: pula przed decyzją', () => {
  it.each([
    ['CO', 1, 2.5],
    ['SB', 2, 3.5],
    ['BB', 4, 5],
    ['BTN', 3, 4.5],
    ['BB', 1, 2], // jedyny limper to SB: dopłaca 0,5 bb
  ] as const)('hero %s, %i limperów → pula %f bb', (hero, n, pula) => {
    expect(pulaPrzedDecyzjaBb(hero, n)).toBe(pula);
  });
  it('zły układ → null', () => {
    expect(pulaPrzedDecyzjaBb('CO', 0)).toBeNull();
    expect(pulaPrzedDecyzjaBb('UTG', 1)).toBeNull();
  });
});
