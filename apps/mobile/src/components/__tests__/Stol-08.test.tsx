/// <reference types="jest" />
// 08 część 6 krok 3 (D-274): `Stol` zależy od danych zadania (design-spec „`Stol`”, D-119; makieta e3 przed-decyzja, bez-pozycji).
// Jest nie liczy układu ani kolorów (RNTL: „Tests don't execute native code”): tu struktura, miejsca i opis dla czytnika;
// wygląd sprawdzają zrzuty (lista dla właściciela, plan-08 część 6).
import '@/i18n';
import i18n from 'i18next';
import { render, screen } from '@testing-library/react-native';
import { Stol } from '@/components/Stol';
import { SZEROKOSC_KARTY } from '@/features/stol/ukladRzedow';
import { etykietaStolu, nazwaKarty, opisKart, opisReki, ukladStolu } from '@/features/stol/uklad';

const t = i18n.t.bind(i18n);

describe('Stol', () => {
  it('zadanie z pozycją: 6 miejsc ze stanem, ty ze stanem „ty”, etykieta VoiceOver z danych, opis ręki tekstem pod stołem', async () => {
    const table = { hand: ['Jc', '9d'], position: 'CO' as const, path: 'UTG:fold,HJ:fold' };
    await render(<Stol table={table} />);
    const m = ukladStolu('CO', table.path)!;
    expect(screen.getByRole('image').props.accessibilityLabel).toBe(etykietaStolu(m, table.hand, t));
    for (const x of m) expect(screen.getByTestId(`miejsce-${x.pozycja}`).props.accessibilityValue).toEqual({ text: x.stan });
    const o = opisReki(m, table.hand, t);
    expect(screen.getByText(o.klasa)).toBeTruthy();
    expect(screen.getByText(o.dopisek)).toBeTruthy();
  });

  it('zadanie bez pozycji: owal bez miejsc (żadnych pustych ani wyszarzonych), karty opisane tekstem pod stołem', async () => {
    const table = { hand: ['Jc', '9d'], board: ['Ts', '7h', '2c'] };
    await render(<Stol table={table} />);
    expect(screen.queryAllByTestId(/^miejsce-/)).toHaveLength(0);
    // A04-11: etykieta czytnika z nazw kart, tekst widoczny z symbolami (czytnik dostaje ten sam tekst z nazw)
    expect(screen.getByRole('image').props.accessibilityLabel).toBe(opisKart(table, t, { nazwy: true }));
    expect(screen.getByText(opisKart(table, t)).props.accessibilityLabel).toBe(opisKart(table, t, { nazwy: true }));
  });

  it('złe dane przebiegu: stół bez miejsc i opis kart zamiast zgadniętego układu (brak zostaje brakiem)', async () => {
    const table = { hand: ['Jc', '9d'], position: 'CO' as const, path: 'XYZ:fold' };
    await render(<Stol table={table} />);
    expect(screen.queryAllByTestId(/^miejsce-/)).toHaveLength(0);
    expect(screen.getByRole('image').props.accessibilityLabel).toBe(opisKart(table, t, { nazwy: true }));
  });

  it('A04-01 (D-282 pkt 1): zadanie z kartami rywala — etykieta i opis zawierają każdą narysowaną kartę, rzędy podpisane „Rywal” i „Na stole”', async () => {
    const table = { opp: ['Ac', 'Ad'], hand: ['Th', '9h'], board: ['As', '8c', '7d', 'Jh', '2s'] };
    await render(<Stol table={table} />);
    const etykieta: string = screen.getByRole('image').props.accessibilityLabel;
    // A04-11: etykieta z nazw kart („as trefl”), nie z symboli
    for (const c of [...table.opp, ...table.hand, ...table.board]) expect(etykieta).toContain(nazwaKarty(c, t));
    expect(etykieta.indexOf('Karty rywala')).toBeGreaterThanOrEqual(0);
    expect(screen.getByText('Rywal')).toBeTruthy();
    expect(screen.getByText('Na stole (board)')).toBeTruthy();
  });

  it('A04-01: bez kart rywala rzędy bez podpisów (makieta `bez-pozycji` bez zmian)', async () => {
    await render(<Stol table={{ hand: ['Jc', '9d'], board: ['Ts', '7h', '2c'] }} />);
    expect(screen.queryByText('Rywal')).toBeNull();
  });

  it('A04-04 (D-282 pkt 2): sama pozycja bez kart i przebiegu — bez owalu i pustej grafiki, wiersz „Twoja pozycja: BB”', async () => {
    await render(<Stol table={{ position: 'BB' }} />);
    expect(screen.queryByRole('image')).toBeNull();
    expect(screen.getByText('Twoja pozycja (position): BB.')).toBeTruthy();
  });

  it('A04-04 (D-282 pkt 3): pozycja z kartami bez przebiegu — stół bez miejsc, pozycja w etykiecie i opisie', async () => {
    const table = { hand: ['Ah', 'Kd'], board: ['Ts', '7h', '2c'], position: 'BTN' as const };
    await render(<Stol table={table} />);
    expect(screen.queryAllByTestId(/^miejsce-/)).toHaveLength(0);
    const etykieta: string = screen.getByRole('image').props.accessibilityLabel;
    expect(etykieta).toBe('Twoja pozycja (position): BTN. Twoje karty: as kier i król karo. Na stole (board): 10 pik, 7 kier i 2 trefl.');
    expect(screen.getByText('Twoja pozycja (position): BTN. Twoje karty: A♥ K♦. Na stole (board): 10♠ 7♥ 2♣.')).toBeTruthy(); // A04-11: widoczny tekst z symbolami
  });
});


describe('D-476: stół z trzema rzędami (rywal 2 + board 5 + gracz 2)', () => {
  const table = { opp: ['Ac', 'Ad'], hand: ['Th', '9h'], board: ['As', '8c', '7d', 'Jh', '2s'] };
  const stylRamy = (): Record<string, unknown> => {
    const s = screen.getByTestId('stol-rama').props.style;
    return Array.isArray(s) ? Object.assign({}, ...s.flat(Infinity).filter(Boolean)) : s;
  };
  const wysokoscRamy = () => stylRamy().height as number | undefined;
  const szerokoscKarty = (kod: string): number => {
    const k = screen.getAllByLabelText(nazwaKarty(kod, t))[0]!;
    const s = k.props.style;
    return (Array.isArray(s) ? Object.assign({}, ...s.flat(Infinity).filter(Boolean)) : s).width;
  };

  it.each([320, 390])('po pomiarze (%i pt ekranu) owal dostaje wysokość z układu rzędów, nie z samej proporcji 1,7:1', async (ekran) => {
    const { fireEvent } = require('@testing-library/react-native');
    const { ukladRzedow } = require('@/features/stol/ukladRzedow');
    await render(<Stol table={table} />);
    const pole = ekran - 32;
    await fireEvent(screen.getByRole('image'), 'layout', { nativeEvent: { layout: { width: pole, height: 0, x: 0, y: 0 } } });
    const u = ukladRzedow(pole, { opp: 2, board: 5, hero: 2 });
    expect(wysokoscRamy()).toBe(u.wysokoscRamy);
    // proporcja 1,7:1 musi być zdjęta (aspectRatio: undefined), inaczej na urządzeniu wysokość ramy znów zależy od proporcji
    expect(stylRamy()).toHaveProperty('aspectRatio', undefined);
    // rozmiar kart board z układu rzędów: 320 pt → „sm” (22 pt), 390 pt → „md” (40 pt); karty rywala i gracza z układu też
    expect(szerokoscKarty('8c')).toBe(SZEROKOSC_KARTY[u.board]);
    expect(szerokoscKarty('Ac')).toBe(SZEROKOSC_KARTY[u.opp]);
    expect(szerokoscKarty('Th')).toBe(SZEROKOSC_KARTY[u.hero]);
    expect(szerokoscKarty('8c')).toBe(ekran === 320 ? 22 : 40);
    expect(u.wysokoscRamy).toBeGreaterThan(Math.floor(u.szerokoscRamy / 1.7)); // stary układ (sama proporcja) był za niski
  });
});
