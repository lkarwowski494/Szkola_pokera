// Narzędzia testów ekranów (rola 07 E3, D-187): atrapa sklepu z wstrzymywaniem odpowiedzi i kontrola NFR-DOST-002
// (każdy element dotykowy ma rolę i nazwę dla czytnika ekranu). Układu, rozmiaru celu i dużego tekstu Jest nie liczy
// (RNTL: „Tests don't execute native code”) — to lista „tylko telefon” (strategia.md §8).
import { screen } from '@testing-library/react-native';
import type { OdczytProduktow, ProduktSklepu, SklepEkranu } from '@/features/zakup/EkranZakupu';

/** Plany US z decyzji cenowej właściciela 2026-11-03 (CLAUDE.md, BR-ZAK-001); identyfikatory z konfiguracja.ts (ADR 0006). */
export const PRODUKTY_US: readonly ProduktSklepu[] = [
  { id: 'pl.lkarwowski.szkolapokera.kwartal', cena: '$9.99', okres: 'kwartal' },
  { id: 'pl.lkarwowski.szkolapokera.rok', cena: '$14.99', okres: 'rok' },
  { id: 'pl.lkarwowski.szkolapokera.dozywotni', cena: '$19.99', okres: null },
];

type Odp<T> = { promise: Promise<T>; rozwiaz(v: T): void };
function odroczona<T>(): Odp<T> {
  let rozwiaz!: (v: T) => void;
  const promise = new Promise<T>((r) => (rozwiaz = r));
  return { promise, rozwiaz };
}

/** Atrapa portu sklepu: liczy wywołania; `wstrzymaj*` zatrzymuje odpowiedź do ręcznego rozwiązania (podwójne dotknięcie). */
export function atrapaSklepu(odczyt: OdczytProduktow = { ok: true, produkty: PRODUKTY_US }) {
  const wywolania = { produkty: 0, kup: [] as string[], przywroc: 0 };
  let wynikKup: Awaited<ReturnType<SklepEkranu['kup']>> = 'zakonczony';
  let wynikPrzywroc: Awaited<ReturnType<SklepEkranu['przywroc']>> = 'zakonczony';
  let wstrzymanyKup: Odp<typeof wynikKup> | null = null;
  const sklep: SklepEkranu = {
    async produkty() {
      wywolania.produkty++;
      return odczyt;
    },
    kup(id) {
      wywolania.kup.push(id);
      return wstrzymanyKup ? wstrzymanyKup.promise : Promise.resolve(wynikKup);
    },
    async przywroc() {
      wywolania.przywroc++;
      return wynikPrzywroc;
    },
  };
  return {
    sklep,
    wywolania,
    ustawOdczyt(o: OdczytProduktow) {
      odczyt = o;
    },
    ustawKup(w: typeof wynikKup) {
      wynikKup = w;
    },
    ustawPrzywroc(w: typeof wynikPrzywroc) {
      wynikPrzywroc = w;
    },
    wstrzymajKup() {
      wstrzymanyKup = odroczona();
      return wstrzymanyKup;
    },
  };
}

type Wezel = { type: unknown; props: Record<string, unknown>; children: (Wezel | string)[] };
const ROLE_DOTYKOWE = new Set(['button', 'link', 'switch', 'checkbox', 'radio', 'tab', 'menuitem', 'togglebutton', 'imagebutton', 'adjustable']);

function tekst(n: Wezel | string): string {
  if (typeof n === 'string') return n;
  return n.children.map(tekst).join(' ');
}

/** Nazwa dla czytnika: accessibilityLabel / aria-label, inaczej tekst potomków (jak VoiceOver dla elementu `accessible`). */
export function nazwaDostepna(element: unknown): string {
  const n = element as Wezel;
  const etykieta = (n.props.accessibilityLabel ?? n.props['aria-label']) as string | undefined;
  return (etykieta ?? tekst(n)).replace(/\s+/g, ' ').trim();
}

/** NFR-DOST-002 (część sprawdzalna w Node): elementy z obsługą dotyku bez roli albo bez nazwy. */
export function elementyBezRoliLubNazwy(): string[] {
  const bledy: string[] = [];
  const odwiedz = (n: Wezel | string) => {
    if (typeof n === 'string') return;
    const dotykowy = typeof n.props.onClick === 'function' || typeof n.props.onPress === 'function';
    if (dotykowy) {
      const rola = (n.props.accessibilityRole ?? n.props.role) as string | undefined;
      const nazwa = nazwaDostepna(n);
      if (!rola || !ROLE_DOTYKOWE.has(rola) || !nazwa) bledy.push(`rola=${rola ?? '—'} nazwa="${nazwa}"`);
    }
    n.children.forEach(odwiedz);
  };
  odwiedz(screen.root as unknown as Wezel);
  return bledy;
}

/** Co przeczyta czytnik ekranu: element `accessible` czyta się jako całość (etykieta albo tekst potomków), bez zaglądania głębiej. */
export function tekstCzytany(): string {
  const czesci: string[] = [];
  const odwiedz = (n: Wezel | string) => {
    if (typeof n === 'string') return void czesci.push(n);
    if (n.props.accessible === true) return void czesci.push(nazwaDostepna(n));
    n.children.forEach(odwiedz);
  };
  odwiedz(screen.root as unknown as Wezel);
  return czesci.join(' ').replace(/\s+/g, ' ');
}

/** Sam tekst widoczny (bez etykiet czytnika). */
export function tekstWidoczny(): string {
  return tekst(screen.root as unknown as Wezel).replace(/\s+/g, ' ');
}

/** Cały tekst ekranu z etykietami czytnika (do wzorców „nie zawiera”: czytnik też to ogłasza). */
export function tekstEkranu(): string {
  const czesci: string[] = [];
  const odwiedz = (n: Wezel | string) => {
    if (typeof n === 'string') return void czesci.push(n);
    const etykieta = n.props.accessibilityLabel ?? n.props['aria-label'];
    if (typeof etykieta === 'string') czesci.push(etykieta);
    n.children.forEach(odwiedz);
  };
  odwiedz(screen.root as unknown as Wezel);
  return czesci.join(' ').replace(/\s+/g, ' ');
}
