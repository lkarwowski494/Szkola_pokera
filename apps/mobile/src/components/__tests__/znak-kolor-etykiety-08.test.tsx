/// <reference types="jest" />
// M1-audytor-generalny-067 / 068 (04-studio-projektowe-001, -002): znak „•” (klasa niepewna / „mieszana”) ma kolor
// etykiety ręki w tym samym polu (RangeGrid: ink),
// a nie `muted`, który na zielonym polu i na primaryBg ma kontrast poniżej 3:1.
import '@/i18n';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { HAND_CLASSES } from '@szkola/poker-core';
import { RangeGrid } from '@/components/RangeGrid';

type N = { type?: string; props?: { style?: unknown }; children?: (N | string)[] | null };

/** Pary (etykieta ręki, kolor etykiety, kolor znaku) dla pól, które mają znak „•”. */
function poleZeZnakiem(drzewo: unknown): { hand: string; etykieta: unknown; znak: unknown }[] {
  const wynik: { hand: string; etykieta: unknown; znak: unknown }[] = [];
  const kolor = (n: N) => StyleSheet.flatten(n.props?.style as never)?.color;
  const tekst = (n: N | string) => (typeof n === 'string' ? n : (n.children ?? []).filter((c): c is string => typeof c === 'string').join(''));
  const przejdz = (n: N | string | null | undefined): void => {
    if (!n || typeof n === 'string') return;
    const dzieci = (n.children ?? []).filter((c): c is N => typeof c === 'object' && c !== null);
    const znak = dzieci.find((c) => tekst(c) === '•');
    const etykieta = dzieci.find((c) => HAND_CLASSES.includes(tekst(c) as never));
    if (znak && etykieta) wynik.push({ hand: tekst(etykieta), etykieta: kolor(etykieta), znak: kolor(znak) });
    dzieci.forEach(przejdz);
  };
  przejdz(drzewo as N);
  return wynik;
}

const spotBase = { id: 'x', title: 'Tytuł', hero: 'BB', path: '', playPercent: 0.4, groups: [] };

describe('znak „•” ma kolor etykiety ręki w polu', () => {
  it('RangeGrid (004-001): kolor znaku = kolor etykiety (ink), nie muted', async () => {
    const { toJSON } = await render(<RangeGrid spot={{ ...spotBase, uncertain: ['T2s', 'K7o', '75o'] }} />);
    const pola = poleZeZnakiem(toJSON());
    expect(pola.map((p) => p.hand).sort()).toEqual(['75o', 'K7o', 'T2s']);
    for (const p of pola) expect(p.znak).toBe(p.etykieta);
  });
});
