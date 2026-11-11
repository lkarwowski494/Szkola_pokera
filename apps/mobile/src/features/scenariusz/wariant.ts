import type { ScenarioTemplate } from '@szkola/content-schema';
import { KONFIGURACJA, przebiegScenariusza, type AkcjaPlanu, type OcenaOdpowiedzi, type PrzebiegScenariusza, type TrescScenariusza, type Wynik } from '@szkola/domena';
import { AKCJE_CBET, blindBb, cardToString, fillVariantMarkers, type GeneratorTemplate, type ScenarioVariant, type VariantDecision, type VariantMarker, type WerdyktAkcji } from '@szkola/poker-core';
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
/**
 * Akcje punktów decyzji na ekranie (CN, D-783): pas i sprawdzenie (draw-call, icm-call), czekanie i c-bet mały/duży (cbet-case),
 * rozmiar podbicia albo limp (size-spot). Identyfikatory jak w szablonie (`actions[].action`) i w wyborze zapisanym w bazie.
 */
export type Akcja = 'fold' | 'call' | 'check' | 'bet-small' | 'bet-big' | 'raise' | 'raise-small' | 'raise-big' | 'limp';
/** Wszystkie akcje, jakie ekran zna (walidacja wyboru odczytanego z bazy). */
export const AKCJE: readonly Akcja[] = ['fold', 'call', 'check', 'bet-small', 'bet-big', 'raise', 'raise-small', 'raise-big', 'limp'];

/** Kolejność akcji na pasku: najtańsza pierwsza (jak w makiecie 04); dla size-spot limp, mały rozmiar, standard, duży. */
const KOLEJNOSC_SIZE: readonly Akcja[] = ['limp', 'raise-small', 'raise', 'raise-big'];
export function akcjePunktu(p: VariantDecision): readonly Akcja[] {
  switch (p.point) {
    case 'draw-call':
    case 'icm-call':
      return ['fold', 'call'];
    case 'cbet-case':
      return AKCJE_CBET;
    case 'size-spot':
      return KOLEJNOSC_SIZE.filter((a) => p.options.some((o) => o.action === a));
    case 'range-spot':
      throw new Error('range-spot nie jest obsługiwany na ekranie scenariusza (D-755)');
  }
}
/** Poprawna akcja punktu (rachunek generatora). */
export function poprawnaAkcja(p: VariantDecision): Akcja {
  if (p.point === 'range-spot') throw new Error('range-spot nie jest obsługiwany na ekranie scenariusza (D-755)');
  return p.correct;
}
type Pozycje = Pick<ScenarioTemplate, 'stackBb' | 'positions'>;
/**
 * Kwota akcji w bb do jej nazwy: sprawdzenie draw-call = zakład rywala; sprawdzenie icm-call = cały stos za blindem gracza (pas kosztuje
 * blind, więc sprawdzenie dopłaca resztę, jak rachunek progu w generatorze); podbicie = rozmiar z wariantu; limp = dopłata do dużego blinda.
 * null: akcja bez kwoty (pas, czekanie, c-bet bez puli w wariancie).
 */
export function kwotaAkcji(p: VariantDecision, a: Akcja, s: Pozycje): number | null {
  if (p.point === 'draw-call') return a === 'call' ? p.bet : null;
  if (p.point === 'icm-call') return a === 'call' && typeof s.stackBb === 'number' ? s.stackBb - blindBb(s.positions.hero) : null;
  if (p.point === 'size-spot') return a === 'limp' ? 1 - blindBb(s.positions.hero) : (p.options.find((o) => o.action === a)?.bb ?? null);
  return null;
}

/**
 * Szablon z treści → szablon generatora (jedna definicja granic dla treści i generatora, BR-SZB-001). `stackBb` jest potrzebne
 * generatorowi do ograniczenia zakładu do stosu gracza (ŚR-203) i do linii `all-in` (F5); budowanie treści przekazuje je tak samo
 * (`tools/content-build/src/scenariusze.ts`, `checkScenarioGenerator`), więc ekran losuje te same warianty co kontrola (CK, 08-programista-001).
 */
export function naGenerator(s: ScenarioTemplate): GeneratorTemplate {
  // Ta sama konwersja co `checkScenarioGenerator` (tools/content-build/src/scenariusze.ts): decyzje i granice wprost z treści, jedna definicja
  // dla kontroli i ekranu (CL: po scaleniu CJ unia punktów decyzji i `positions` weszły do generatora; test CK porównuje oba warianty).
  return { id: s.id, stackBb: s.stackBb, positions: s.positions, levels: s.bounds, decisions: s.decisions } as GeneratorTemplate;
}

/**
 * Odcisk wariantu do planu aktywności (CN, NIS-004 CM, D-787): `fingerprint` generatora (ręka i flop do izomorfizmu kolorów) plus skrót FNV-1a
 * całej treści wariantu (karty, pule, zakłady, poprawne akcje, stosy ICM). Sam `fingerprint` nie wykrywa zmiany puli szablonu przy tych samych
 * kartach, a wznowienie podkładałoby wtedy inną pulę pod zapisane odpowiedzi.
 */
export function odciskWariantu(v: ScenarioVariant): string {
  let h = 0x811c9dc5;
  for (const c of JSON.stringify({ hero: v.hero, villain: v.villain, board: v.board, points: v.points })) h = Math.imul(h ^ c.charCodeAt(0), 0x01000193) >>> 0;
  return `${v.fingerprint}#${h.toString(16).padStart(8, '0')}`;
}

/** Graf do planu aktywności (D-219): pas kończy rozdanie, sprawdzenie prowadzi do następnej decyzji albo do pokazania kart. */
export function grafWariantu(liczbaDecyzji: number): AkcjaPlanu[][] {
  return Array.from({ length: liczbaDecyzji }, (_, i): AkcjaPlanu[] => [
    { akcja: 'fold', dalej: 'koniec' },
    { akcja: 'call', dalej: i + 1 < liczbaDecyzji ? i + 1 : 'pokazanie' },
  ]);
}

/**
 * Graf wariantu (CN, D-783): linia draw-call jak dotąd; szablon z jednym punktem cbet-case, size-spot albo icm-call kończy rozdanie
 * każdą akcją (bez pokazania kart: rozdanie nie ma dalszego przebiegu do pokazania).
 */
export function grafPunktow(v: ScenarioVariant): AkcjaPlanu[][] {
  if (v.points.every((p) => p.point === 'draw-call')) return grafWariantu(v.points.length);
  return v.points.map((p) => akcjePunktu(p).map((akcja): AkcjaPlanu => ({ akcja, dalej: 'koniec' })));
}

/**
 * Ocena akcji punktu wariantu (CR WYS-002): c-bet i rozmiar niosą werdykty reguły silnika gry (`verdicts` wariantu, poker-core: `cbetVerdict`,
 * `sizeVerdict`), więc ekran ocenia jak tryb gry (zgodne / dopuszczalne / niedokładność / błąd), a nie „błąd” dla każdej akcji poza najlepszą.
 * Draw-call i icm-call to rachunek z dwiema akcjami: poprawna zgodne, druga błąd.
 */
const NA_OCENE_EKRANU = { compliant: 'zgodne', acceptable: 'dopuszczalne', inaccuracy: 'niedokladnosc', mistake: 'blad' } as const;
function ocenaAkcji(d: VariantDecision, a: string): OcenaOdpowiedzi {
  if (d.point === 'cbet-case' || d.point === 'size-spot') {
    const w = (d.verdicts as Partial<Record<string, WerdyktAkcji>>)[a];
    if (w === undefined) throw new Error(`Akcja ${a} nie należy do punktu ${d.point}`);
    return NA_OCENE_EKRANU[w];
  }
  return a === poprawnaAkcja(d) ? 'zgodne' : 'blad';
}
/**
 * Częstość do `przebiegScenariusza` (RD-11, `rangeVerdict`): ocena akcji zamieniona na częstość leżącą w jej przedziale progów z konfiguracji domeny,
 * żeby ocena kroku (`przebiegWariantu`) i pasek ocen (`ocenyAkcji`) pochodziły z tej samej tabeli `ocenaAkcji`.
 */
const CZESTOSC_OCENY: Readonly<Record<OcenaOdpowiedzi, number>> = {
  zgodne: 1,
  dopuszczalne: (KONFIGURACJA.OCENA_PROG_DOPUSZCZALNE + KONFIGURACJA.OCENA_PROG_MIESZANA_DOLNY) / 2,
  niedokladnosc: KONFIGURACJA.OCENA_PROG_DOPUSZCZALNE / 2,
  blad: 0,
};

/** Treść wariantu dla `przebiegScenariusza`: częstość z oceny akcji (reguła silnika gry albo rachunek, nie solver). */
export function trescZWariantu(v: ScenarioVariant): TrescScenariusza {
  const graf = grafPunktow(v);
  const [h0, h1] = v.hero;
  const [r0, r1] = v.villain;
  const [s0, s1, s2, s3, s4] = v.board;
  if (s0 === undefined || s1 === undefined || s2 === undefined || s3 === undefined || s4 === undefined) throw new Error('Wariant bez pięciu kart stołu');
  return {
    id: v.templateId,
    rekaGracza: [cardToString(h0), cardToString(h1)],
    rekaRywala: [cardToString(r0), cardToString(r1)],
    stol: [cardToString(s0), cardToString(s1), cardToString(s2), cardToString(s3), cardToString(s4)],
    decyzje: v.points.map((d, i) => ({
      ulica: d.street,
      akcje: (graf[i] ?? []).map((a) => ({
        akcja: a.akcja,
        czestosc: CZESTOSC_OCENY[ocenaAkcji(d, a.akcja)],
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

/** Oceny akcji w punkcie decyzji (pasek ocen po decyzji): z tabeli `ocenaAkcji`, jak ocena kroku w `przebiegWariantu`. */
export function ocenyAkcji(v: ScenarioVariant, indeks: number): Readonly<Partial<Record<Akcja, OcenaOdpowiedzi>>> {
  const d = v.points[indeks];
  if (!d) throw new Error(`Wariant nie ma decyzji ${indeks}`);
  return Object.fromEntries(akcjePunktu(d).map((a): [Akcja, OcenaOdpowiedzi] => [a, ocenaAkcji(d, a)]));
}

export interface WidokDecyzji {
  indeks: number;
  ulica: 'preflop' | 'flop' | 'turn';
  /** Karty stołu widoczne w tej decyzji (np. „Kh”); przed flopem pusta lista. */
  stol: string[];
  /** Pula w bb po zakładzie rywala (to, o co grasz); null: punkt bez puli w wariancie (cbet-case, size-spot). */
  pulaBb: number | null;
  /** Ile bb trzeba dopłacić, żeby sprawdzić; null: punkt bez sprawdzenia. */
  doSprawdzeniaBb: number | null;
}
/** `s` potrzebne tylko dla icm-call (stos i blind gracza wchodzą do puli i dopłaty); bez niego icm-call nie ma kwot. */
export function widokDecyzji(v: ScenarioVariant, indeks: number, s?: Pozycje): WidokDecyzji {
  const d = v.points[indeks];
  if (!d || d.point === 'range-spot') throw new Error(`Wariant nie ma decyzji ${indeks}`);
  const stol = v.board.slice(0, d.street === 'preflop' ? 0 : d.street === 'flop' ? 3 : 4).map(cardToString);
  if (d.point === 'draw-call') return { indeks, ulica: d.street, stol, pulaBb: d.pot + d.bet, doSprawdzeniaBb: d.bet };
  if (d.point === 'icm-call' && s && typeof s.stackBb === 'number') {
    const blind = blindBb(s.positions.hero);
    return { indeks, ulica: 'preflop', stol, pulaBb: s.stackBb + blind, doSprawdzeniaBb: s.stackBb - blind };
  }
  return { indeks, ulica: d.street, stol, pulaBb: null, doSprawdzeniaBb: null };
}

type TFn = (k: string, o?: Record<string, unknown>) => string;
const jestPozycja = (p: string): p is Position => (KOLEJNOSC as readonly string[]).includes(p);
// Stół 6-osobowy ma nazwy w słowniku; inne pozycje szablonu (UTG1, LJ…) zostają skrótem, nie zgadniętą nazwą.
const pozycja = (p: string, t: TFn): string => (jestPozycja(p) ? nazwaPozycji(p, t) : p);
const karty = (cs: readonly string[]) => `[[${cs.join(' ')}]]`;

/** {{w:stol}}: karty stołu; przed flopem nazwa ulicy (CN D-784: bez nowego klucza, `scenario.street.preflop` małymi literami). */
const stolZnacznika = (stol: readonly string[], t: TFn): string => (stol.length === 0 ? t('scenario.street.preflop').toLowerCase() : karty(stol));

/** Wartości znaczników {{w:…}} w punkcie decyzji: karty jako [[…]] dla RichText, pozycje z szablonu (D-557). */
export function wartosciZnacznikow(v: ScenarioVariant, s: ScenarioTemplate, indeks: number, t: TFn): Record<VariantMarker, string> {
  return {
    reka: karty(v.hero.map(cardToString)),
    stol: stolZnacznika(widokDecyzji(v, indeks).stol, t),
    pozycja: pozycja(s.positions.hero, t),
    rywal: s.positions.villain, // skrót (D-650): w szablonie stoi po przyimku („rywal z BB”), pełna nazwa zepsułaby odmianę
  };
}

export type RodzajBloku = 'slabsza' | 'lepsza' | 'dobrze' | 'dlaczego_nie';
export interface Blok { rodzaj: RodzajBloku; akcja: Akcja; tekst: string }

/**
 * Wyjaśnienia po decyzji (BR-OCE-002, D-544): błąd i niedokładność — dwa bloki (dlaczego twoja akcja słabsza, dlaczego najlepsza
 * lepsza); akcja zgodna — blok „dobrze” i rozwijane „dlaczego nie” każdej innej akcji punktu (jedna przy pasie i sprawdzeniu, dwie
 * przy c-becie i rozmiarze). Tekst akcji pochodzi z szablonu (pisze go rola 06).
 */
export function bloki(v: ScenarioVariant, s: ScenarioTemplate, indeks: number, wybor: Akcja, t: TFn): Blok[] {
  const d = v.points[indeks];
  const spec = s.decisions[indeks];
  if (!d || !spec) throw new Error(`Brak decyzji ${indeks}`);
  const wartosci = wartosciZnacznikow(v, s, indeks, t);
  const tekst = (a: Akcja): string => {
    const wyjasnienie = spec.actions.find((x) => x.action === a)?.explanation;
    if (wyjasnienie === undefined) throw new Error(`${s.id}: brak wyjaśnienia akcji ${a}`);
    return fillVariantMarkers(wyjasnienie, wartosci);
  };
  const poprawna = poprawnaAkcja(d);
  return wybor === poprawna
    ? [{ rodzaj: 'dobrze', akcja: wybor, tekst: tekst(wybor) }, ...akcjePunktu(d).filter((a) => a !== wybor).map((a): Blok => ({ rodzaj: 'dlaczego_nie', akcja: a, tekst: tekst(a) }))]
    : [{ rodzaj: 'slabsza', akcja: wybor, tekst: tekst(wybor) }, { rodzaj: 'lepsza', akcja: poprawna, tekst: tekst(poprawna) }];
}
