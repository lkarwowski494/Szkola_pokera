import { odstep } from '@/theme/tokeny';

/**
 * Układ rzędów kart na suknie stołu bez miejsc (D-476; design-spec „`Stol`”, D-119). Czysta funkcja: z szerokości pola
 * i liczby kart w rzędach daje rozmiar kart (lg → md → sm, gdy rząd się nie mieści) i wysokość owalu, żeby karty rywala,
 * board i gracza mieściły się w stole, a tekst pod stołem nie był zasłonięty. Rozmiary kart z `PlayingCard` (SIZES, stałe).
 */
export type RozmiarKart = 'sm' | 'md' | 'lg';
export type RzedyStolu = { opp: number; board: number; hero: number }; // liczba kart w rzędzie, 0 = brak rzędu
export const SZEROKOSC_KARTY: Record<RozmiarKart, number> = { sm: 22, md: 40, lg: 52 };
export const WYSOKOSC_KARTY: Record<RozmiarKart, number> = { sm: 30, md: 56, lg: 72 };
const ODSTEP_KART: Record<RozmiarKart, number> = { sm: 2, md: 6, lg: 6 }; // jak `CardRow`
const PODPIS = 21; // przypis.line (tokeny.ts), podpis rzędu bez skalowania czcionki
const MIEJSCE_W = 72; // jak w `Stol` (padding poziomy pola = połowa miejsca − odstep.s)
const PROPORCJA = 1.7; // owal 1.7 : 1 (makieta e3)
const BORDER = 2;
const PREFEROWANE: Record<keyof RzedyStolu, RozmiarKart> = { opp: 'md', board: 'md', hero: 'lg' };
const KOLEJNOSC: RozmiarKart[] = ['lg', 'md', 'sm'];

export function szerokoscRzedu(n: number, r: RozmiarKart): number {
  return n <= 0 ? 0 : n * SZEROKOSC_KARTY[r] + (n - 1) * ODSTEP_KART[r];
}

export function ukladRzedow(szerokoscPola: number, rzedy: RzedyStolu) {
  const szerokoscRamy = Math.max(0, szerokoscPola - 2 * (MIEJSCE_W / 2 - odstep.s));
  const szerokoscSukna = Math.max(0, szerokoscRamy - 2 * odstep.s - 2 * BORDER - 2 * odstep.l);
  const rozmiar = (k: keyof RzedyStolu): RozmiarKart => {
    const start = KOLEJNOSC.indexOf(PREFEROWANE[k]);
    return KOLEJNOSC.slice(start).find((r) => szerokoscRzedu(rzedy[k], r) <= szerokoscSukna) ?? 'sm';
  };
  const u = { opp: rozmiar('opp'), board: rozmiar('board'), hero: rozmiar('hero') };
  const elementy: number[] = [];
  if (rzedy.opp > 0) elementy.push(PODPIS, WYSOKOSC_KARTY[u.opp]);
  if (rzedy.board > 0) elementy.push(...(rzedy.opp > 0 ? [PODPIS] : []), WYSOKOSC_KARTY[u.board]);
  if (rzedy.hero > 0) elementy.push(WYSOKOSC_KARTY[u.hero]);
  const wysokoscTresci = elementy.reduce((a, b) => a + b, 0) + Math.max(0, elementy.length - 1) * odstep.s;
  const wysokoscSukna = wysokoscTresci + 2 * odstep.l;
  const wysokoscRamy = Math.max(Math.floor(szerokoscRamy / PROPORCJA), wysokoscSukna + 2 * odstep.s + 2 * BORDER);
  return { ...u, szerokoscRamy, szerokoscSukna, wysokoscSukna, wysokoscRamy };
}
