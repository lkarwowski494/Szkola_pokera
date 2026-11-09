/// <reference types="jest" />
// 08 część 6 krok 1 (D-274): układ stołu z danych zadania (design-spec „`Stol`: zależy od danych zadania”, D-119; makieta
// docs/design/ekrany/e3.html, ekrany przed-decyzja i bez-pozycji).
import '@/i18n';
import i18n from 'i18next';
import { etykietaStolu, opisKart, opisReki, ukladStolu } from '@/features/stol/uklad';

const t = i18n.t.bind(i18n);

describe('ukladStolu', () => {
  it('6 miejsc w kolejności wskazówek zegara od ciebie (slot 0 = dół), stany z przebiegu akcji (makieta: CO, BTN, SB, BB, UTG, HJ)', () => {
    expect(ukladStolu('CO', 'UTG:fold,HJ:fold')).toEqual([
      { pozycja: 'CO', stan: 'ty', slot: 0 },
      { pozycja: 'BTN', stan: 'czeka', slot: 1 },
      { pozycja: 'SB', stan: 'czeka', slot: 2 },
      { pozycja: 'BB', stan: 'czeka', slot: 3 },
      { pozycja: 'UTG', stan: 'pas', slot: 4 },
      { pozycja: 'HJ', stan: 'pas', slot: 5 },
    ]);
  });

  it('akcja inna niż pas = „przebija” (L-1, D-274); pusty przebieg: wszyscy poza tobą czekają', () => {
    const bb = ukladStolu('BB', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold');
    expect(bb?.map((m) => `${m.pozycja}:${m.stan}`)).toEqual(['BB:ty', 'UTG:pas', 'HJ:pas', 'CO:pas', 'BTN:przebija', 'SB:pas']);
    expect(ukladStolu('UTG', '')?.filter((m) => m.stan === 'czeka')).toHaveLength(5);
  });

  it('złe dane przebiegu → null (brak zostaje brakiem, stół bez miejsc), nie zgadnięty układ', () => {
    expect(ukladStolu('CO', 'XYZ:fold')).toBeNull();
    expect(ukladStolu('CO', 'UTG')).toBeNull();
    expect(ukladStolu('CO', 'CO:fold')).toBeNull();
    // ta sama pozycja dwa razy w przebiegu (E2 cz. 6, mutacja M03: bez sprawdzenia powtórzeń wygrywał ostatni wpis)
    expect(ukladStolu('CO', 'UTG:fold,UTG:raise2.5')).toBeNull();
  });
});

describe('teksty stołu', () => {
  // D-275: makieta mówi „Stół: … czekają …”; w słowniku terminów „stół” = karty wspólne, „czekanie” = check, a terminy w tekstach
  // interfejsu mają znacznik {{t:…}} (nazwa angielska w nawiasie przy pierwszym użyciu w tekście) — stąd „Przy stole”, „po tobie”, „pas (fold)”.
  it('etykieta VoiceOver jak w makiecie, w terminologii aplikacji (D-275)', () => {
    const m = ukladStolu('CO', 'UTG:fold,HJ:fold')!;
    expect(etykietaStolu(m, ['Jc', '9d'], t)).toBe('Przy stole: UTG pas (fold), HJ pas (fold), ty na CO z J9o, po tobie BTN, SB i BB.');
  });

  it('etykieta z przebiciem i jednym graczem po tobie', () => {
    const m = ukladStolu('SB', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5')!;
    expect(etykietaStolu(m, ['As', 'Ks'], t)).toBe('Przy stole: UTG pas (fold), HJ pas (fold), CO pas (fold), BTN przebija (raise), ty na SB z AKs, po tobie BB.');
  });

  it('opis ręki pod stołem: klasa i dopisek o kolorach i kolejności (makieta: „J9o — różne kolory; UTG i HJ spasowali, po tobie BTN, SB i BB”)', () => {
    const m = ukladStolu('CO', 'UTG:fold,HJ:fold')!;
    expect(opisReki(m, ['Jc', '9d'], t)).toEqual({ klasa: 'J9o', dopisek: 'różne kolory; UTG i HJ spasowali (fold), po tobie BTN, SB i BB' });
    expect(opisReki(ukladStolu('BB', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold')!, ['7h', '7d'], t).dopisek).toBe(
      'para (pair); UTG, HJ, CO i SB spasowali (fold), BTN przebija (raise)',
    );
  });

  it('zadanie bez pozycji: opis kart tekstem („Twoje karty: J♣ 9♦. Na stole: 10♠ 7♥ 2♣.”)', () => {
    expect(opisKart({ hand: ['Jc', '9d'], board: ['Ts', '7h', '2c'] }, t)).toBe('Twoje karty: J♣ 9♦. Na stole (board): 10♠ 7♥ 2♣.');
    expect(opisKart({ board: ['Ts', '7h', '2c'] }, t)).toBe('Na stole (board): 10♠ 7♥ 2♣.');
  });

  it('A04-01 (D-282 pkt 1): karty rywala w opisie przed twoimi i wspólnymi — każda narysowana karta jest w opisie', () => {
    const table = { opp: ['Ac', 'Ad'], hand: ['Th', '9h'], board: ['As', '8c', '7d', 'Jh', '2s'] };
    expect(opisKart(table, t)).toBe('Karty rywala: A♣ A♦. Twoje karty: 10♥ 9♥. Na stole (board): A♠ 8♣ 7♦ J♥ 2♠.');
  });
});
