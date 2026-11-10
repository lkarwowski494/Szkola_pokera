import type { ScenarioTemplate } from '@szkola/content-schema';
import { przebiegScenariusza, type AkcjaPlanu, type OcenaOdpowiedzi, type PrzebiegScenariusza, type TrescScenariusza, type Wynik } from '@szkola/domena';
import { cardToString, fillVariantMarkers, type GeneratorTemplate, type ScenarioVariant, type VariantMarker } from '@szkola/poker-core';
import type { Position } from '@/features/drills/types';
import { KOLEJNOSC, nazwaPozycji } from '@/features/stol/uklad';

/**
 * Wariant scenariusza na ekranie (PR-05; BR-GEN-001, BR-OCE-001/002, D-557). Czyste funkcje: wariant (karty, pule, zakłady)
 * powstaje w generatorze poker-core, tu tylko widok, graf akcji, ocena kroków (przebiegScenariusza z domeny, RD-11) i teksty.
 *
 * Jednostki: pule i zakłady wariantu są w bb (szablon: `stackBb`, `pots` w bb; generator zaokrągla zakład do całego bb,
 * `scenario-gen.ts` `Math.round(pot * fraction)`), więc ekran pokazuje tylko bb i nie podaje ułamka puli (po zaokrągleniu
 * mógłby się różnić od nominalnego). `pot` generatora to pula przed zakładem rywala.
 */
export type Akcja = 'fold' | 'call';
/** Kolejność akcji na pasku: pas, sprawdzenie (jak w makiecie 04: najtańsza akcja pierwsza). */
export const AKCJE: readonly Akcja[] = ['fold', 'call'];

/**
 * Szablon z treści → szablon generatora (jedna definicja granic dla treści i generatora, BR-SZB-001). `stackBb` jest potrzebne
 * generatorowi do ograniczenia zakładu do stosu gracza (ŚR-203) i do linii `all-in` (F5); budowanie treści przekazuje je tak samo
 * (`tools/content-build/src/scenariusze.ts`, `checkScenarioGenerator`), więc ekran losuje te same warianty co kontrola (CK, 08-programista-001).
 */
export function naGenerator(s: ScenarioTemplate): GeneratorTemplate {
  return { id: s.id, stackBb: s.stackBb, levels: s.bounds, decisions: s.decisions.map((d) => d.kind === 'range-spot'
      ? { kind: d.kind, street: d.street, spot: d.spot }
      : { kind: d.kind, street: d.street, pots: d.pots, fractions: d.fractions, villain: d.villain }) };
}

/** Graf do planu aktywności (D-219): pas kończy rozdanie, sprawdzenie prowadzi do następnej decyzji albo do pokazania kart. */
export function grafWariantu(liczbaDecyzji: number): AkcjaPlanu[][] {
  return Array.from({ length: liczbaDecyzji }, (_, i): AkcjaPlanu[] => [
    { akcja: 'fold', dalej: 'koniec' },
    { akcja: 'call', dalej: i + 1 < liczbaDecyzji ? i + 1 : 'pokazanie' },
  ]);
}

/** Treść wariantu dla `przebiegScenariusza`: częstość 1 dla poprawnej akcji, 0 dla drugiej (ocena z rachunku, nie z solvera). */
export function trescZWariantu(v: ScenarioVariant): TrescScenariusza {
  const graf = grafWariantu(v.decisions.length);
  const [h0, h1] = v.hero;
  const [r0, r1] = v.villain;
  const [s0, s1, s2, s3, s4] = v.board;
  if (s0 === undefined || s1 === undefined || s2 === undefined || s3 === undefined || s4 === undefined) throw new Error('Wariant bez pięciu kart stołu');
  return {
    id: v.templateId,
    rekaGracza: [cardToString(h0), cardToString(h1)],
    rekaRywala: [cardToString(r0), cardToString(r1)],
    stol: [cardToString(s0), cardToString(s1), cardToString(s2), cardToString(s3), cardToString(s4)],
    decyzje: v.decisions.map((d, i) => ({
      ulica: d.street,
      akcje: (graf[i] ?? []).map((a) => ({
        akcja: a.akcja,
        czestosc: a.akcja === d.correct ? 1 : 0,
        rywal: null,
        dalej: a.dalej,
        wyjasnienie: '', // teksty składa `bloki` z szablonu (wyjaśnienia własnej akcji, BR-OCE-002)
      })),
    })),
  };
}

export function przebiegWariantu(v: ScenarioVariant, wybory: readonly Akcja[]): Wynik<PrzebiegScenariusza, 'akcja_niedostepna'> {
  return przebiegScenariusza(trescZWariantu(v), wybory);
}

/** Oceny obu akcji w punkcie decyzji (pasek ocen po decyzji): poprawna „zgodne”, druga „błąd” (RD-11, częstości 1 i 0). */
export function ocenyAkcji(v: ScenarioVariant, indeks: number): Record<Akcja, OcenaOdpowiedzi> {
  const d = v.decisions[indeks];
  if (!d) throw new Error(`Wariant nie ma decyzji ${indeks}`);
  return { fold: d.correct === 'fold' ? 'zgodne' : 'blad', call: d.correct === 'call' ? 'zgodne' : 'blad' };
}

export interface WidokDecyzji {
  indeks: number;
  ulica: 'flop' | 'turn';
  /** Karty stołu widoczne w tej decyzji (np. „Kh”). */
  stol: string[];
  /** Pula w bb po zakładzie rywala (to, o co grasz). */
  pulaBb: number;
  /** Ile bb trzeba dopłacić, żeby sprawdzić. */
  doSprawdzeniaBb: number;
}
export function widokDecyzji(v: ScenarioVariant, indeks: number): WidokDecyzji {
  const d = v.decisions[indeks];
  if (!d) throw new Error(`Wariant nie ma decyzji ${indeks}`);
  return { indeks, ulica: d.street, stol: v.board.slice(0, d.street === 'flop' ? 3 : 4).map(cardToString), pulaBb: d.pot + d.bet, doSprawdzeniaBb: d.bet };
}

type TFn = (k: string, o?: Record<string, unknown>) => string;
const jestPozycja = (p: string): p is Position => (KOLEJNOSC as readonly string[]).includes(p);
// Stół 6-osobowy ma nazwy w słowniku; inne pozycje szablonu (UTG1, LJ…) zostają skrótem, nie zgadniętą nazwą.
const pozycja = (p: string, t: TFn): string => (jestPozycja(p) ? nazwaPozycji(p, t) : p);
const karty = (cs: readonly string[]) => `[[${cs.join(' ')}]]`;

/** Wartości znaczników {{w:…}} w punkcie decyzji: karty jako [[…]] dla RichText, pozycje z szablonu (D-557). */
export function wartosciZnacznikow(v: ScenarioVariant, s: ScenarioTemplate, indeks: number, t: TFn): Record<VariantMarker, string> {
  return {
    reka: karty(v.hero.map(cardToString)),
    stol: karty(widokDecyzji(v, indeks).stol),
    pozycja: pozycja(s.positions.hero, t),
    rywal: s.positions.villain, // skrót (D-650): w szablonie stoi po przyimku („rywal z BB”), pełna nazwa zepsułaby odmianę
  };
}

export type RodzajBloku = 'slabsza' | 'lepsza' | 'dobrze' | 'dlaczego_nie';
export interface Blok { rodzaj: RodzajBloku; akcja: Akcja; tekst: string }

/**
 * Wyjaśnienia po decyzji (BR-OCE-002, D-544): błąd i niedokładność — dwa bloki (dlaczego twoja akcja słabsza, dlaczego najlepsza
 * lepsza); akcja zgodna — blok „dobrze” i rozwijany „dlaczego nie” drugiej akcji. Tekst akcji pochodzi z szablonu (pisze go rola 06).
 */
export function bloki(v: ScenarioVariant, s: ScenarioTemplate, indeks: number, wybor: Akcja, t: TFn): Blok[] {
  const d = v.decisions[indeks];
  const spec = s.decisions[indeks];
  if (!d || !spec) throw new Error(`Brak decyzji ${indeks}`);
  const wartosci = wartosciZnacznikow(v, s, indeks, t);
  const tekst = (a: Akcja): string => {
    const wyjasnienie = spec.actions.find((x) => x.action === a)?.explanation;
    if (wyjasnienie === undefined) throw new Error(`${s.id}: brak wyjaśnienia akcji ${a}`);
    return fillVariantMarkers(wyjasnienie, wartosci);
  };
  const inna: Akcja = wybor === 'fold' ? 'call' : 'fold';
  return wybor === d.correct
    ? [{ rodzaj: 'dobrze', akcja: wybor, tekst: tekst(wybor) }, { rodzaj: 'dlaczego_nie', akcja: inna, tekst: tekst(inna) }]
    : [{ rodzaj: 'slabsza', akcja: wybor, tekst: tekst(wybor) }, { rodzaj: 'lepsza', akcja: d.correct, tekst: tekst(d.correct) }];
}
