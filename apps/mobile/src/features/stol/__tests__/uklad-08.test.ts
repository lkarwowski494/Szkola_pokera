/// <reference types="jest" />
// 08 część 6 krok 1 (D-274): układ stołu z danych zadania (design-spec „`Stol`: zależy od danych zadania”, D-119; makieta
// docs/design/ekrany/e3.html, ekrany przed-decyzja i bez-pozycji).
import '@/i18n';
import i18n from 'i18next';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { etykietaStolu, KOLEJNOSC, nazwaKarty, opisKart, opisReki, ukladStolu } from '@/features/stol/uklad';

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

  // Tytuł zmieniony w sesji T (D-338): „przebija” tylko dla raise; asercje bez zmian.
  it('raise = „przebija” (L-1, D-274); pusty przebieg: wszyscy poza tobą czekają', () => {
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

  it('akcja bez stanu stołu (call, limp, allin, check) → null, nie „przebija” (D-314 ryzyko, D-338)', () => {
    // stół zna tylko pas i przebicie; sprawdzenie (call) nazwane „przebija” byłoby błędnym twierdzeniem
    expect(ukladStolu('BTN', 'UTG:raise2.5,HJ:call')).toBeNull();
    expect(ukladStolu('BB', 'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:call')).toBeNull();
    expect(ukladStolu('BB', 'SB:limp')).toBeNull();
    expect(ukladStolu('BB', 'SB:allin')).toBeNull();
    expect(ukladStolu('BB', 'SB:check')).toBeNull();
  });

  it('każda ścieżka stołu z content/ranges/spots.yaml daje układ (strażnik danych, D-338)', () => {
    const tekst = readFileSync(join(__dirname, '../../../../../../content/ranges/spots.yaml'), 'utf8');
    // wpisy listy „- id: …”: hero i path w obrębie jednego wpisu (kolejność pól dowolna); bez spotów 9-max (`solver:`
    // preflop-9max, tylko kontrola reguł i tryb gry, nie zadania ze stołem) i push/fold („…bb|”, stół się nie buduje)
    const pary = tekst
      .split(/^- id: /m)
      .slice(1)
      .map((w) => [w, /^\s+hero: (\w+)$/m.exec(w)?.[1], /^\s+path: "([^"]*)"$/m.exec(w)?.[1]] as const)
      .filter(([w, h, pr]) => h !== undefined && pr !== undefined && !pr.includes('|') && !/^\s+solver: preflop-9max/m.test(w));
    expect(pary.length).toBeGreaterThanOrEqual(9); // 9 spotów 6-max ze ścieżką stołu (bez „…bb|”) w spots.yaml, 2026-11-09
    for (const [, hero, przebieg] of pary) {
      const ty = KOLEJNOSC.find((p) => p === hero);
      expect([przebieg, ty && ukladStolu(ty, przebieg!) ? 'ok' : 'null']).toEqual([przebieg, 'ok']);
    }
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

  it('A04-11 (audyt roli 04): wariant dla czytnika — nazwy kart zamiast symboli (makieta e3.html:118), ta sama kolejność', () => {
    const table = { opp: ['Ac', 'Ad'], hand: ['Th', '9h'], board: ['As', '8c', '7d', 'Jh', '2s'] };
    expect(opisKart(table, t, { nazwy: true })).toBe(
      'Karty rywala: as trefl i as karo. Twoje karty: 10 kier i 9 kier. Na stole (board): as pik, 8 trefl, 7 karo, walet kier i 2 pik.',
    );
    expect(opisKart(table, t, { nazwy: true })).not.toMatch(/[♠♥♦♣]/);
  });

  it('A04-11: nazwaKarty — brzmienie pl jak dotąd w PlayingCard; zły kod zostaje kodem (bez zgadywania)', () => {
    expect(['As', 'Kh', 'Qd', 'Jc', 'Ts', '2h'].map((c) => nazwaKarty(c, t))).toEqual(['as pik', 'król kier', 'dama karo', 'walet trefl', '10 pik', '2 kier']);
    expect(nazwaKarty('Xx', t)).toBe('Xx');
  });
});
