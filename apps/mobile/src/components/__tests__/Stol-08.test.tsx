/// <reference types="jest" />
// 08 część 6 krok 3 (D-274): `Stol` zależy od danych zadania (design-spec „`Stol`”, D-119; makieta e3 przed-decyzja, bez-pozycji).
// Jest nie liczy układu ani kolorów (RNTL: „Tests don't execute native code”): tu struktura, miejsca i opis dla czytnika;
// wygląd sprawdzają zrzuty (lista dla właściciela, plan-08 część 6).
import '@/i18n';
import i18n from 'i18next';
import { render, screen } from '@testing-library/react-native';
import { Stol } from '@/components/Stol';
import { etykietaStolu, opisKart, opisReki, ukladStolu } from '@/features/stol/uklad';

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
    expect(screen.getByRole('image').props.accessibilityLabel).toBe(opisKart(table, t));
    expect(screen.getByText(opisKart(table, t))).toBeTruthy();
  });

  it('złe dane przebiegu: stół bez miejsc i opis kart zamiast zgadniętego układu (brak zostaje brakiem)', async () => {
    const table = { hand: ['Jc', '9d'], position: 'CO' as const, path: 'XYZ:fold' };
    await render(<Stol table={table} />);
    expect(screen.queryAllByTestId(/^miejsce-/)).toHaveLength(0);
    expect(screen.getByRole('image').props.accessibilityLabel).toBe(opisKart(table, t));
  });

  it('A04-01 (D-282 pkt 1): zadanie z kartami rywala — etykieta i opis zawierają każdą narysowaną kartę, rzędy podpisane „Rywal” i „Na stole”', async () => {
    const table = { opp: ['Ac', 'Ad'], hand: ['Th', '9h'], board: ['As', '8c', '7d', 'Jh', '2s'] };
    await render(<Stol table={table} />);
    const etykieta: string = screen.getByRole('image').props.accessibilityLabel;
    const nazwa = (c: string) => `${c[0] === 'T' ? '10' : c[0]}${({ s: '♠', h: '♥', d: '♦', c: '♣' } as Record<string, string>)[c[1]!]}`;
    for (const c of [...table.opp, ...table.hand, ...table.board]) expect(etykieta).toContain(nazwa(c));
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
    expect(etykieta).toBe('Twoja pozycja (position): BTN. Twoje karty: A♥ K♦. Na stole (board): 10♠ 7♥ 2♣.');
    expect(screen.getByText(etykieta)).toBeTruthy();
  });
});

