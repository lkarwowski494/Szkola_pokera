/// <reference types="jest" />
// Wariant scenariusza na ekranie: graf akcji, ocena kroków (RD-11), widok decyzji w bb, wyjaśnienia ze znacznikami wariantu
// (BR-OCE-001/002, D-557), jednostki bb (BS: pule i zakłady w bb, zakład zaokrąglony do 1 bb).
import { generateVariant } from '@szkola/poker-core';
import { naGenerator, grafWariantu, ocenyAkcji, przebiegWariantu, widokDecyzji, bloki, wartosciZnacznikow } from '../wariant';
import { SC01 } from '@/test-utils/szablonSc01';

const t = (k: string, o?: Record<string, unknown>) => (o ? `${k}:${JSON.stringify(o)}` : k);
const wariant = (poziom: 'latwy' | 'sredni' | 'trudny' = 'latwy', ziarno = 7) => generateVariant(naGenerator(SC01), poziom, ziarno);

describe('graf akcji wariantu', () => {
  it('pas kończy rozdanie, sprawdzenie prowadzi do następnej decyzji, a po ostatniej do pokazania kart', () => {
    expect(grafWariantu(2)).toEqual([[{ akcja: 'fold', dalej: 'koniec' }, { akcja: 'call', dalej: 1 }], [{ akcja: 'fold', dalej: 'koniec' }, { akcja: 'call', dalej: 'pokazanie' }]]);
    expect(grafWariantu(1)).toEqual([[{ akcja: 'fold', dalej: 'koniec' }, { akcja: 'call', dalej: 'pokazanie' }]]);
  });
});

describe('widok decyzji: wszystko w bb', () => {
  it('pula po zakładzie rywala = pula przed + zakład; do sprawdzenia = zakład (całkowite bb); karty stołu zależą od ulicy', () => {
    const v = wariant('sredni', 11);
    const [flop, turn] = [widokDecyzji(v, 0), widokDecyzji(v, 1)];
    expect(flop.ulica).toBe('flop');
    expect(flop.stol).toHaveLength(3);
    expect(flop.doSprawdzeniaBb).toBe(v.decisions[0]!.bet);
    expect(flop.pulaBb).toBe(v.decisions[0]!.pot + v.decisions[0]!.bet);
    expect(Number.isInteger(flop.doSprawdzeniaBb) && Number.isInteger(flop.pulaBb)).toBe(true);
    expect(turn.ulica).toBe('turn');
    expect(turn.stol).toHaveLength(4);
    expect(turn.pulaBb).toBe(v.decisions[0]!.pot + 2 * v.decisions[0]!.bet + v.decisions[1]!.bet); // pula po sprawdzeniu flopa + zakład na turnie
  });
});

describe('ocena kroku (RD-11): tylko jedna akcja jest zgodna', () => {
  it('oczekiwane „call”: sprawdzenie zgodne, pas błąd; oceny obu akcji do paska', () => {
    const v = wariant();
    expect(v.decisions[0]!.correct).toBe('call');
    expect(ocenyAkcji(v, 0)).toEqual({ call: 'zgodne', fold: 'blad' });
  });
  it('przebieg: wybory → oceny kroków, koniec po pasie, pokazanie po sprawdzeniu ostatniej decyzji; bez wygranej w liczbach', () => {
    const v = wariant();
    const p = przebiegWariantu(v, ['call', 'fold']);
    expect(p.ok && p.wartosc.kroki.map((k) => k.ocena)).toEqual(['zgodne', 'blad']);
    expect(p.ok && p.wartosc.koniec).toBe('koniec');
    const p2 = przebiegWariantu(v, ['call', 'call']);
    expect(p2.ok && p2.wartosc.koniec).toBe('pokazanie');
    expect(p2.ok && p2.wartosc.pokazanie?.zwyciezca).toMatch(/gracz|rywal|remis/);
    expect(przebiegWariantu(v, ['fold', 'call']).ok).toBe(false); // po pasie nie ma następnej decyzji
  });
});

describe('znaczniki wariantu w wyjaśnieniach (D-557)', () => {
  it('ręka, stół, pozycje z wariantu podstawione; karty jako [[…]] do RichText, nic z {{w: nie zostaje', () => {
    const v = wariant();
    const w = wartosciZnacznikow(v, SC01, 0, t);
    expect(w.reka).toMatch(/^\[\[[2-9TJQKA][shdc] [2-9TJQKA][shdc]\]\]$/);
    expect(w.stol).toMatch(/^\[\[([2-9TJQKA][shdc] ){2}[2-9TJQKA][shdc]\]\]$/);
    const b = bloki(v, SC01, 0, 'fold', t);
    for (const blok of b) expect(blok.tekst).not.toContain('{{w:');
  });
  it('błąd: dwa bloki (dlaczego twoja słabsza, dlaczego najlepsza lepsza); zgodne: blok „dobrze” i rozwijane „dlaczego nie” drugiej akcji', () => {
    const v = wariant();
    const zle = bloki(v, SC01, 0, 'fold', t);
    expect(zle.map((b) => [b.rodzaj, b.akcja])).toEqual([['slabsza', 'fold'], ['lepsza', 'call']]);
    const dobrze = bloki(v, SC01, 0, 'call', t);
    expect(dobrze.map((b) => [b.rodzaj, b.akcja])).toEqual([['dobrze', 'call'], ['dlaczego_nie', 'fold']]);
    expect(dobrze[1]!.tekst).toContain('Pas oddaje pulę');
  });
  it('turn: stół z czterema kartami', () => {
    const v = wariant();
    expect(wartosciZnacznikow(v, SC01, 1, t).stol.split(' ')).toHaveLength(4);
  });
});
