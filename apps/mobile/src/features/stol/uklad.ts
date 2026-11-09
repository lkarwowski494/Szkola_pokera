import { classOf, parseCard } from '@szkola/poker-core';
import type { Position } from '@/features/drills/types';

/**
 * Układ i teksty stołu z danych zadania (08 cz. 6 krok 1, D-274; design-spec „`Stol`: zależy od danych zadania”, D-119).
 * Czyste funkcje: komponent `Stol` rysuje miejsca w slotach, a etykieta VoiceOver i opis pod stołem powstają z tych
 * samych danych. Stół 6-osobowy (wszystkie `content/ranges/spots.yaml`); slot 0 = dół (ty), dalej wskazówki zegara.
 */
export type StanMiejsca = 'ty' | 'pas' | 'czeka' | 'przebija';
export interface Miejsce {
  readonly pozycja: Position;
  readonly stan: StanMiejsca;
  readonly slot: number;
}
type TFn = (k: string, o?: Record<string, unknown>) => string;

/** Kolejność przy stole (zgodnie z ruchem wskazówek zegara = kolejność akcji przed flopem). */
export const KOLEJNOSC: readonly Position[] = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
const jestPozycja = (p: string): p is Position => (KOLEJNOSC as readonly string[]).includes(p);

/** Przebieg `UTG:fold,HJ:raise2.5` → miejsca; złe dane → null (stół bez miejsc, nie zgadnięty układ). */
export function ukladStolu(ty: Position, przebieg: string): Miejsce[] | null {
  const akcje = new Map<Position, 'pas' | 'przebija'>();
  for (const wpis of przebieg.split(',').map((s) => s.trim()).filter(Boolean)) {
    const [p, a] = wpis.split(':');
    if (!p || !a || !jestPozycja(p) || p === ty || akcje.has(p)) return null;
    akcje.set(p, a === 'fold' ? 'pas' : 'przebija');
  }
  const start = KOLEJNOSC.indexOf(ty);
  return KOLEJNOSC.map((_, i) => {
    const pozycja = KOLEJNOSC[(start + i) % KOLEJNOSC.length]!;
    return { pozycja, stan: pozycja === ty ? 'ty' : (akcje.get(pozycja) ?? 'czeka'), slot: i };
  });
}

/** „BTN, SB i BB” (spójnik z i18n). */
function lista(xs: readonly string[], t: TFn): string {
  if (xs.length <= 1) return xs.join('');
  return t('table.listAnd', { a: xs.slice(0, -1).join(', '), b: xs[xs.length - 1] });
}

/** Miejsca w kolejności akcji (UTG → BB), nie w kolejności slotów. */
const wgAkcji = (m: readonly Miejsce[]) => [...m].sort((a, b) => KOLEJNOSC.indexOf(a.pozycja) - KOLEJNOSC.indexOf(b.pozycja));

/** Klasa ręki („J9o”) z dwóch kart; brak kart = pusty napis. */
export function klasaReki(reka: readonly string[]): string {
  const [a, b] = reka;
  return a && b ? classOf(parseCard(a), parseCard(b)) : '';
}

export function etykietaStolu(m: readonly Miejsce[], reka: readonly string[], t: TFn): string {
  const czesci: string[] = [];
  const czekaja: string[] = [];
  for (const x of wgAkcji(m)) {
    if (x.stan === 'pas') czesci.push(t('table.seatFold', { pos: x.pozycja }));
    else if (x.stan === 'przebija') czesci.push(t('table.seatRaise', { pos: x.pozycja }));
    else if (x.stan === 'ty') czesci.push(t('table.seatHero', { pos: x.pozycja, hand: klasaReki(reka) }));
    else czekaja.push(x.pozycja);
  }
  if (czekaja.length) czesci.push(t('table.after', { list: lista(czekaja, t) }));
  return t('table.label', { list: czesci.join(', ') });
}

export function opisReki(m: readonly Miejsce[], reka: readonly string[], t: TFn): { klasa: string; dopisek: string } {
  const k = klasaReki(reka);
  const rodzaj = k.length === 2 ? t('table.pair') : k.endsWith('s') ? t('table.suited') : t('table.offsuit');
  const ja = m.find((x) => x.stan === 'ty');
  const po = ja ? wgAkcji(m).filter((x) => KOLEJNOSC.indexOf(x.pozycja) > KOLEJNOSC.indexOf(ja.pozycja) && x.stan === 'czeka') : [];
  const pas = wgAkcji(m).filter((x) => x.stan === 'pas').map((x) => x.pozycja);
  const przebija = wgAkcji(m).filter((x) => x.stan === 'przebija').map((x) => x.pozycja);
  const zdania = [
    pas.length ? t('table.folded', { count: pas.length, list: lista(pas, t) }) : null,
    przebija.length ? t('table.raised', { count: przebija.length, list: lista(przebija, t) }) : null,
    po.length ? t('table.after', { list: lista(po.map((x) => x.pozycja), t) }) : null,
  ].filter((s): s is string => s !== null);
  return { klasa: k, dopisek: [rodzaj, zdania.join(', ')].filter(Boolean).join('; ') };
}

const SYMBOL: Record<string, string> = { s: '♠', h: '♥', d: '♦', c: '♣' };
const WARTOSCI = new Set(['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']);

/** Nazwa karty dla czytnika z kluczy `card.rank.*` i `card.suit.*` („as pik”, A04-10/A04-11, D-284); zły kod zostaje kodem, bez zgadywania. */
export function nazwaKarty(c: string, t: TFn): string {
  const [r = '', s = ''] = c;
  if (!WARTOSCI.has(r) || !(s in SYMBOL)) return c;
  return t('card.name', { rank: t(`card.rank.${r}`), suit: t(`card.suit.${s}`) });
}
const karta = (c: string) => `${c[0] === 'T' ? '10' : (c[0] ?? '')}${SYMBOL[c[1] ?? ''] ?? ''}`;

/**
 * Zadanie bez pozycji: karty tekstem pod stołem (design-spec, makieta `bez-pozycji`); kolejność jak rzędy na suknie: rywal, ty, stół (D-282).
 * `nazwy`: wariant dla czytnika — nazwy kart („as pik i 10 kier”, makieta e3.html:118) zamiast symboli (A04-11); tekst widoczny zostaje z symbolami.
 */
export function opisKart(
  s: { opp?: readonly string[]; hand?: readonly string[]; board?: readonly string[]; position?: Position },
  t: TFn,
  o: { nazwy?: boolean } = {},
): string {
  const karty = (xs: readonly string[]) => (o.nazwy ? lista(xs.map((c) => nazwaKarty(c, t)), t) : xs.map(karta).join(' '));
  return [
    s.position ? t('table.yourPosition', { pos: s.position }) : null, // A04-04, D-282 pkt 2–3: pozycja bez przebiegu nie znika
    s.opp?.length ? t('table.oppCards', { cards: karty(s.opp) }) : null, // A04-01, D-282 pkt 1
    s.hand?.length ? t('table.yourCards', { cards: karty(s.hand) }) : null,
    s.board?.length ? t('table.board', { cards: karty(s.board) }) : null,
  ]
    .filter((x): x is string => x !== null)
    .join(' ');
}
