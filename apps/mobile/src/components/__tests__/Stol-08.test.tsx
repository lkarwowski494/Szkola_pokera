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
});
