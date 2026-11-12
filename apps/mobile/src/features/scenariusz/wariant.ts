import type { ScenarioTemplate } from '@szkola/content-schema';
import { KONFIGURACJA, przebiegScenariusza, type AkcjaPlanu, type OcenaOdpowiedzi, type PrzebiegScenariusza, type TrescScenariusza, type Wynik } from '@szkola/domena';
import { AKCJE_CBET, blindBb, cardToString, fillVariantMarkers, overcardOutsAt, type GeneratorTemplate, type IcmCallVariantDecision, type ScenarioVariant, type VariantDecision, type VariantConditionValues, type VariantMarker, type WerdyktAkcji } from '@szkola/poker-core';
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
export type Akcja = '4bet' | 'hand-a' | 'hand-b' | 'fold' | 'call' | 'check' | 'bet' | 'bet-small' | 'bet-big' | 'raise' | 'raise-small' | 'raise-big' | 'limp' | 'all-in' | `raise ${number}` | `call ${number}`;
/**
 * Akcje stałe, jakie ekran zna. Punkt range-spot (CX, F1) ma akcje o nazwach z węzła solvera spotu (`content/ranges/spots.yaml`): `fold`, `call`,
 * `all-in` oraz `raise N` i `call N` z rozmiarem w bb (np. `raise 2.5`); te dwie ostatnie rozpoznaje `jestAkcja` wzorcem, bo lista rozmiarów należy do danych.
 */
export const AKCJE: readonly Akcja[] = ['4bet', 'hand-a', 'hand-b', 'fold', 'call', 'check', 'bet', 'bet-small', 'bet-big', 'raise', 'raise-small', 'raise-big', 'limp', 'all-in'];
/**
 * Zamknięte słownictwo akcji punktu list-hand (FG, D-1142): zbiór akcji niesie szablon (`decisions[i].actions`), ekran pokazuje te z listy w tej kolejności (najtańsza pierwsza);
 * akcja spoza listy to błąd treści (bramka budowania odrzuca ją wcześniej, `AKCJE_LISTY` w tools/content-build/src/scenariusze.ts; test przypięcia po obu stronach).
 */
export const AKCJE_LISTY = ['fold', 'check', 'call', 'limp', 'raise', '4bet', 'all-in'] as const satisfies readonly Akcja[];
type SpecPunktu = ScenarioTemplate['decisions'][number];
const ROZMIAR_SPOTU = /^(raise|call) \d+(\.\d+)?$/;
/** Czy napis to akcja ekranu (walidacja wyboru odczytanego z bazy i etykiet spotu na granicy z danymi). */
export const jestAkcja = (a: unknown): a is Akcja => typeof a === 'string' && (AKCJE.some((x) => x === a) || ROZMIAR_SPOTU.test(a));
const akcjaSpotu = (etykieta: string): Akcja => {
  if (!jestAkcja(etykieta)) throw new Error(`Akcja spotu spoza znanych etykiet: ${etykieta}`);
  return etykieta;
};

/** Kolejność akcji na pasku: najtańsza pierwsza (jak w makiecie 04); dla size-spot limp, mały rozmiar, standard, duży. */
const KOLEJNOSC_SIZE: readonly Akcja[] = ['limp', 'raise-small', 'raise', 'raise-big'];
export function akcjePunktu(p: VariantDecision, spec?: SpecPunktu): readonly Akcja[] {
  switch (p.point) {
    case 'draw-call':
    case 'icm-call':
    case 'river-catch': // FG (D-1143): jak draw-call na riverze, pas albo sprawdzenie zakładu rywala
    case 'defend': // FG (D-1144): jak draw-call na flopie, pas albo sprawdzenie c-betu rywala
      return ['fold', 'call'];
    case 'cbet-case':
      return AKCJE_CBET;
    case 'size-spot':
      return KOLEJNOSC_SIZE.filter((a) => p.options.some((o) => o.action === a));
    case 'range-spot':
      return p.options.map((o) => akcjaSpotu(o.action)); // kolejność węzła solvera: pas, sprawdzenie, rosnące podbicia, all-in
    case 'pick-hand':
      return ['hand-a', 'hand-b']; // KO-072: wybór jednej z dwóch rąk; nazwa akcji to karty ręki (EkranScenariusza.tekstAkcji)
    case 'turn-bet':
    case 'flop-size': // FL (08-FD-3, D-1419): ten sam widok co turn-bet, ulica flop
      return ['bet-small', 'bet-big']; // FG (D-1147): mały albo duży zakład na turnie, najtańszy pierwszy
    case 'river-value': // KO-091 (FR): bet albo czekanie na riverze, bez kwoty; najtańsza (czekanie) pierwsza
      return ['check', 'bet'];
    case 'list-hand': {
      // FG: zbiór akcji z szablonu (wariant niesie tylko akcję poprawną i dopuszczalne), bez szablonu nie zgadujemy zbioru
      if (spec?.kind !== 'list-hand') throw new Error('list-hand: zbiór akcji pochodzi z szablonu punktu (przekaż specyfikację decyzji)');
      const ids: readonly string[] = spec.actions.map((x) => x.action);
      const obce = ids.filter((x) => !(AKCJE_LISTY as readonly string[]).includes(x));
      if (obce.length > 0) throw new Error(`list-hand: akcja spoza słownictwa ekranu: ${obce.join(', ')} (AKCJE_LISTY)`);
      return AKCJE_LISTY.filter((a) => ids.includes(a));
    }
  }
}
/** Poprawna akcja punktu (rachunek generatora albo akcja oczekiwana z częstości solvera, range-spot). */
export function poprawnaAkcja(p: VariantDecision): Akcja {
  if (p.point === 'river-value' || p.point === 'pick-hand' || p.point === 'turn-bet' || p.point === 'flop-size' || p.point === 'river-catch' || p.point === 'defend') return p.correct;
  if (p.point === 'list-hand') return akcjaSpotu(p.correct); // FG: akcja poprawna wpisu listy; spoza znanych etykiet błąd z nazwą
  return p.point === 'range-spot' ? akcjaSpotu(p.correct) : p.correct;
}
/**
 * Liczba przebić przed graczem w spocie solvera (D-886: „przebicie” wobec „3-bet”). `GeneratorContext` nie niesie ścieżki akcji spotu,
 * więc liczba wynika z rodziny spotu w `content/ranges/spots.yaml` (id): otwarcia i push/fold bez przebicia (0), obrona przed otwarciem z jednym (1);
 * `call.*` (sprawdzenie all-inu) nie ma podbicia. Nieznana rodzina (np. spot z 4-betem) to błąd z nazwą spotu, bez cichej nazwy „przebicie”;
 * 4-bet (`scenario.action.fourBet`) dochodzi razem z pierwszym takim spotem.
 */
export function przebiciaWSpocie(spot: string): number {
  const rodzina = spot.replace(/^nine\./, '').split('.')[0];
  if (rodzina === 'rfi' || rodzina === 'push' || rodzina === 'call') return 0;
  if (rodzina === 'vs-open') return 1;
  throw new Error(`Spot ${spot}: nieznana liczba przebić przed graczem (D-886: nazwa „przebicie” albo „3-bet”)`);
}
/** Rodzaj kwoty przy akcji (D-886): `pay` = dopłata (sprawdzenie, limp), `to` = rozmiar całkowity (przebicie, 3-bet), `all` = cały stos. */
export type RodzajKwoty = 'pay' | 'to' | 'all';
/** Klucz nazwy z grupy `scenario.action` i rodzaj kwoty akcji w punkcie (docs/design/scenariusz-akcje-i-liczby.md §1). */
export interface OpisAkcji { readonly klucz: string; readonly kwota: RodzajKwoty | null }
export function opisAkcji(p: VariantDecision, a: Akcja): OpisAkcji {
  const nazwa = (klucz: string, kwota: RodzajKwoty | null): OpisAkcji => ({ klucz: `scenario.action.${klucz}`, kwota });
  if (a === 'hand-a' || a === 'hand-b') throw new Error('hand-a i hand-b nie mają nazwy z grupy scenario.action: nazwą jest zapis kart ręki (tekstAkcji)');
  if (a === '4bet') return nazwa('fourBet', null); // FG: list-hand (D-1142); bez kwoty, szablon nie podaje rozmiaru
  if (a === 'fold') return nazwa('fold', null);
  if (a === 'check') return nazwa('check', null);
  if (a === 'bet') return nazwa('bet', null); // KO-091 (FR): river-value, zakład bez kwoty (wariant jej nie niesie)
  // FM (D-1430): turn-bet i flop-size to dwa rozmiary tego samego zagrania: ta sama nazwa „zakład”, kwota w drugiej linii; „c-bet” tylko w cbet-case
  if (a === 'bet-small' || a === 'bet-big') return p.point === 'turn-bet' || p.point === 'flop-size' ? nazwa('bet', 'pay') : nazwa(a === 'bet-small' ? 'betSmall' : 'betBig', null);
  if (a === 'limp') return nazwa('limp', 'pay');
  if (a === 'all-in') return nazwa('allIn', 'all');
  if (a === 'call' || a.startsWith('call ')) return nazwa('call', 'pay');
  // podbicie: size-spot wg rodzaju kontroli, range-spot wg liczby przebić w spocie
  if (p.point === 'size-spot') return nazwa(p.check === 'three-bet-size' ? 'threeBet' : 'raise', 'to');
  if (p.point === 'range-spot') return nazwa(przebiciaWSpocie(p.spot) === 0 ? 'raise' : 'threeBet', 'to');
  return nazwa('raise', 'to');
}
type Pozycje = Pick<ScenarioTemplate, 'stackBb' | 'positions'>;
/**
 * Kwota akcji w bb do jej nazwy: sprawdzenie draw-call = zakład rywala; sprawdzenie icm-call = cały stos za blindem gracza (pas kosztuje
 * blind, więc sprawdzenie dopłaca resztę, jak rachunek progu w generatorze); podbicie = rozmiar z wariantu; limp = dopłata do dużego blinda.
 * null: akcja bez kwoty (pas, czekanie, c-bet bez puli w wariancie).
 */
export function kwotaAkcji(p: VariantDecision, a: Akcja, s: Pozycje): number | null {
  if (p.point === 'draw-call' || p.point === 'river-catch' || p.point === 'defend') return a === 'call' ? p.bet : null;
  if (p.point === 'turn-bet' || p.point === 'flop-size') return a === 'bet-small' ? p.betSmall : a === 'bet-big' ? p.betBig : null;
  if (p.point === 'icm-call') return a === 'call' ? (ukladIcm(p, s)?.doSprawdzeniaBb ?? null) : null;
  if (p.point === 'size-spot') return a === 'limp' ? 1 - blindBb(s.positions.hero) : (p.options.find((o) => o.action === a)?.bb ?? null);
  if (p.point === 'range-spot') {
    // Kwoty z etykiety węzła solvera (spots.yaml): „raise N” = podbicie do N bb; „call N” = dopłata do N bb za blindem gracza; bez liczby: all-in = stos,
    // „call” (spoty call.*: sprawdzenie all-inu rywala) = stos za blindem gracza, jak w icm-call.
    const stos = typeof s.stackBb === 'number' ? s.stackBb : null;
    if (a === 'all-in') return stos;
    if (a === 'call') return stos === null ? null : stos - blindBb(s.positions.hero);
    const m = /^(raise|call) (\d+(?:\.\d+)?)$/.exec(a);
    if (!m) return null;
    return m[1] === 'raise' ? Number(m[2]) : Number(m[2]) - blindBb(s.positions.hero);
  }
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
export function grafPunktow(v: ScenarioVariant, s?: Pick<ScenarioTemplate, 'decisions'>): AkcjaPlanu[][] {
  if (v.points.every((p) => p.point === 'draw-call')) return grafWariantu(v.points.length);
  const ostatni = v.points.length - 1;
  return v.points.map((p, i) =>
    akcjePunktu(p, s?.decisions[i]).map((akcja): AkcjaPlanu => {
      // linia preflop → flop (CX): pas i all-in kończą rozdanie, pozostałe akcje range-spot prowadzą do następnej decyzji (draw-call); ostatnie sprawdzenie pokazuje karty
      if (p.point === 'range-spot') return { akcja, dalej: i < ostatni && akcja !== 'fold' && akcja !== 'all-in' ? i + 1 : 'koniec' };
      if (p.point === 'draw-call') return { akcja, dalej: akcja === 'fold' ? 'koniec' : i < ostatni ? i + 1 : 'pokazanie' };
      return { akcja, dalej: 'koniec' };
    }),
  );
}

/**
 * Ocena akcji punktu wariantu (CR WYS-002): c-bet i rozmiar niosą werdykty reguły silnika gry (`verdicts` wariantu, poker-core: `cbetVerdict`,
 * `sizeVerdict`), więc ekran ocenia jak tryb gry (zgodne / dopuszczalne / niedokładność / błąd), a nie „błąd” dla każdej akcji poza najlepszą.
 * Draw-call i icm-call to rachunek z dwiema akcjami: poprawna zgodne, druga błąd.
 */
const NA_OCENE_SPOTU = { correct: 'zgodne', acceptable: 'dopuszczalne', inaccuracy: 'niedokladnosc', wrong: 'blad' } as const;
const NA_OCENE_EKRANU = { compliant: 'zgodne', acceptable: 'dopuszczalne', inaccuracy: 'niedokladnosc', mistake: 'blad' } as const;
function ocenaAkcji(d: VariantDecision, a: string): OcenaOdpowiedzi {
  if (d.point === 'range-spot') {
    // werdykt rangeVerdict z wariantu (ADR-26): zgodna / dopuszczalna (ręka mieszana, ADR-04) / niedokładność / błąd
    const o = d.options.find((x) => x.action === a);
    if (o === undefined) throw new Error(`Akcja ${a} nie należy do punktu range-spot`);
    return NA_OCENE_SPOTU[o.verdict];
  }
  if (d.point === 'cbet-case' || d.point === 'size-spot') {
    const w = (d.verdicts as Partial<Record<string, WerdyktAkcji>>)[a];
    if (w === undefined) throw new Error(`Akcja ${a} nie należy do punktu ${d.point}`);
    return NA_OCENE_EKRANU[w];
  }
  if (d.point === 'list-hand') return a === d.correct || (d.alsoCorrect?.includes(a) ?? false) ? 'zgodne' : d.acceptable.includes(a) ? 'dopuszczalne' : 'blad'; // FG: akcja dopuszczalna z wpisu listy (ADR-04, D-1142)
  if (d.point === 'turn-bet' || d.point === 'flop-size') return a === d.correct ? 'zgodne' : 'niedokladnosc'; // FG: mały zakład to zły rozmiar, nie błąd (analogia size-spot/cbet-case, CR WYS-002; D-1375)
  if (d.point === 'pick-hand') return a === d.correct ? 'zgodne' : 'niedokladnosc'; // SC-23a/b: druga ręka to niedokładność, nie błąd (D-1054, zrodla-krok-e.md)
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
export function trescZWariantu(v: ScenarioVariant, s?: Pick<ScenarioTemplate, 'decisions'>): TrescScenariusza {
  const graf = grafPunktow(v, s);
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

export function przebiegWariantu(v: ScenarioVariant, wybory: readonly Akcja[], s?: Pick<ScenarioTemplate, 'decisions'>): Wynik<PrzebiegScenariusza, 'akcja_niedostepna'> {
  return przebiegScenariusza(trescZWariantu(v, s), wybory);
}

/** Oceny akcji w punkcie decyzji (pasek ocen po decyzji): z tabeli `ocenaAkcji`, jak ocena kroku w `przebiegWariantu`. */
export function ocenyAkcji(v: ScenarioVariant, indeks: number, s?: Pick<ScenarioTemplate, 'decisions'>): Readonly<Partial<Record<Akcja, OcenaOdpowiedzi>>> {
  const d = v.points[indeks];
  if (!d) throw new Error(`Wariant nie ma decyzji ${indeks}`);
  return Object.fromEntries(akcjePunktu(d, s?.decisions[indeks]).map((a): [Akcja, OcenaOdpowiedzi] => [a, ocenaAkcji(d, a)]));
}

export interface WidokDecyzji {
  indeks: number;
  ulica: 'preflop' | 'flop' | 'turn' | 'river';
  /** Karty stołu widoczne w tej decyzji (np. „Kh”); przed flopem pusta lista. */
  stol: string[];
  /** Pula w bb po zakładzie rywala (to, o co grasz); null: punkt bez puli w wariancie (cbet-case, size-spot). */
  pulaBb: number | null;
  /** Ile bb trzeba dopłacić, żeby sprawdzić; null: punkt bez sprawdzenia. */
  doSprawdzeniaBb: number | null;
}
/** Wiersz listy stosów punktu icm-call (D-889): stos w bb, udział względem największego stołu (pasek) i rola gracza. */
export interface WierszStosuIcm {
  rola: 'ty' | 'rywal' | 'inny';
  /** Litera gracza spoza pary (A, B) jak w `drill.icm.player`; null dla ciebie i rywala. */
  litera: string | null;
  /** Stos w bb z wariantu, zaokrąglony do jednego miejsca po przecinku (zapis bez końcowego zera robi formatowanie liczby). */
  stosBb: number;
  /** Stos ÷ największy stos przy stole (0…1): długość paska stosu. */
  udzial: number;
}
export interface UkladIcm {
  /** Kolejność miejsc od ciebie: ty, rywal, potem pozostali (A, B) w kolejności stosów wariantu. */
  wiersze: readonly WierszStosuIcm[];
  wyplaty: readonly number[];
  liczbaGraczy: number;
  /** Stos rywala w bb: ile wszedł all-in (dziennik); może przekraczać twój stos. */
  stosRywalaBb: number;
  /** Twój stos ≤ stosu rywala: sprawdzenie stawia cały twój stos, przegrana kończy turniej bez nagrody. */
  caleStosTy: boolean;
  /** Pula do wygrania po sprawdzeniu (przed twoją dopłatą): mniejszy stos pary + twój blind; nadwyżka rywala ponad twój stos wraca do niego (D-985). */
  pulaBb: number;
  /** Dopłata: mniejszy stos pary − twój blind. */
  doSprawdzeniaBb: number;
}
const miejsce1 = (x: number): number => Math.round(x * 10) / 10;
/**
 * Układ punktu icm-call z wariantu (D-889): stosy wszystkich graczy w bb (1 bb = mniejszy stos pary ÷ `stackBb`, generator `scenario-gen.ts`),
 * pula i dopłata z jednej funkcji (kryterium 3). Bez `stackBb` w szablonie null (generator takiego szablonu nie zbuduje: wymaga stackBb).
 */
export function ukladIcm(d: IcmCallVariantDecision, s: Pozycje): UkladIcm | null {
  if (typeof s.stackBb !== 'number' || !(s.stackBb > 0)) return null;
  const mojStos = d.stacks[d.heroIndex];
  const stosRywala = d.stacks[d.villainIndex];
  if (mojStos === undefined || stosRywala === undefined) return null;
  const mniejszy = Math.min(mojStos, stosRywala);
  const bbNaZeton = s.stackBb / mniejszy;
  const najwiekszy = Math.max(...d.stacks);
  const inni = d.stacks.map((_, i) => i).filter((i) => i !== d.heroIndex && i !== d.villainIndex);
  const wiersz = (i: number, rola: WierszStosuIcm['rola'], litera: string | null): WierszStosuIcm => ({ rola, litera, stosBb: miejsce1((d.stacks[i] ?? 0) * bbNaZeton), udzial: (d.stacks[i] ?? 0) / najwiekszy });
  const blind = blindBb(s.positions.hero);
  return {
    wiersze: [wiersz(d.heroIndex, 'ty', null), wiersz(d.villainIndex, 'rywal', null), ...inni.map((i, k) => wiersz(i, 'inny', 'ABC'[k] ?? null))],
    wyplaty: d.payouts,
    liczbaGraczy: d.stacks.length,
    stosRywalaBb: miejsce1(stosRywala * bbNaZeton),
    caleStosTy: mojStos <= stosRywala,
    pulaBb: s.stackBb + blind,
    doSprawdzeniaBb: s.stackBb - blind,
  };
}

/** `s` potrzebne tylko dla icm-call (stos i blind gracza wchodzą do puli i dopłaty); bez niego icm-call nie ma kwot. */
export function widokDecyzji(v: ScenarioVariant, indeks: number, s?: Pozycje): WidokDecyzji {
  const d = v.points[indeks];
  if (!d) throw new Error(`Wariant nie ma decyzji ${indeks}`);
  const stol = v.board.slice(0, d.street === 'preflop' ? 0 : d.street === 'flop' ? 3 : d.street === 'turn' ? 4 : 5).map(cardToString);
  if (d.point === 'draw-call' || d.point === 'river-catch' || d.point === 'defend') return { indeks, ulica: d.street, stol, pulaBb: d.pot + d.bet, doSprawdzeniaBb: d.bet };
  if (d.point === 'turn-bet' || d.point === 'flop-size') return { indeks, ulica: d.street, stol, pulaBb: d.pot, doSprawdzeniaBb: null }; // FG: gracz stawia, więc sama pula (bez „do sprawdzenia”)
  if (d.point === 'icm-call' && s) {
    const u = ukladIcm(d, s);
    if (u) return { indeks, ulica: 'preflop', stol, pulaBb: u.pulaBb, doSprawdzeniaBb: u.doSprawdzeniaBb };
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

/**
 * Nadkarty punktu draw-call: ta sama definicja co zdanie „Liczby” (`zdaniaDrawCall`): karta gracza wyższa od wszystkich kart stołu
 * w tym punkcie (`overcardOutsAt` > 0, KO-073, D-1115). Poza draw-call 0.
 */
export function nadkartyPunktu(v: ScenarioVariant, indeks: number): number {
  const d = v.points[indeks];
  if (d?.point !== 'draw-call') return 0;
  return overcardOutsAt(v.hero, v.board.slice(0, d.street === 'flop' ? 3 : 4));
}

/** Warunki bloków {{jesli:…}} wyjaśnienia w punkcie decyzji (KO-073). */
export function warunkiWariantu(v: ScenarioVariant, indeks: number): VariantConditionValues {
  return { nadkarty: nadkartyPunktu(v, indeks) > 0 };
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
  const warunki = warunkiWariantu(v, indeks);
  const tekst = (a: Akcja): string => {
    // EP-001: w pick-hand tekst wybiera rola ręki (poprawna = best-hand, druga = other-hand), bo strona A/B jest losowa
    const klucz = d.point === 'pick-hand' ? (a === d.correct ? 'best-hand' : 'other-hand') : a;
    const wyjasnienie = spec.actions.find((x) => (x.action as string) === klucz)?.explanation;
    if (wyjasnienie === undefined) throw new Error(`${s.id}: brak wyjaśnienia akcji ${klucz}`);
    // KO-072: w pick-hand {{w:reka}} to ręka tej akcji (hand-a = A, hand-b = B), nie zawsze pierwsza
    const reka = d.point === 'pick-hand' ? d.hands[a === 'hand-b' ? 1 : 0] : null;
    return fillVariantMarkers(wyjasnienie, reka ? { ...wartosci, reka: karty(reka.map(cardToString)) } : wartosci, warunki);
  };
  // „dobrze” wynika z oceny wyboru, nie z równości z jedną „poprawną” akcją: w ręce mieszanej (range-spot, ADR-04) kilka akcji jest zgodnych (DC WYS-001)
  const poprawna = poprawnaAkcja(d);
  return ocenaAkcji(d, wybor) === 'zgodne'
    ? [{ rodzaj: 'dobrze', akcja: wybor, tekst: tekst(wybor) }, ...akcjePunktu(d, spec).filter((a) => a !== wybor).map((a): Blok => ({ rodzaj: 'dlaczego_nie', akcja: a, tekst: tekst(a) }))]
    : [{ rodzaj: 'slabsza', akcja: wybor, tekst: tekst(wybor) }, { rodzaj: 'lepsza', akcja: poprawna, tekst: tekst(poprawna) }];
}
