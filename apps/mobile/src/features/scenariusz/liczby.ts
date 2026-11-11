import { formatujLiczbe, formatujProcent, type Jezyk } from '@szkola/jezyki';
import { deadBlindsBb, hitProbability, type SizeSpotVariantDecision } from '@szkola/poker-core';
import { jezykZadan } from '@/features/drills/text';
import type { SesjaScenariusza } from './aktywnoscScenariusza';
import { kwotaAkcji, nadkartyPunktu, widokDecyzji, type Akcja } from './wariant';

type TFn = (k: string, o?: Record<string, unknown>) => string;

/**
 * Zdania sekcji „Liczby” punktu decyzji (D-888, docs/design/scenariusz-akcje-i-liczby.md §3; BR-OCE-001: każda liczba z przełożeniem na sens).
 * Wszystkie wartości to parametry liczone tu z wariantu, szablonu i numbers.yaml (rachunek, szczebel 1 ADR-24); w kluczach nie ma liczb.
 * Pusta lista: punkt bez zdania (range-spot: częstości solvera to osobne zadanie) albo brak danych do rachunku (nie zgadujemy wartości).
 */
export function zdaniaLiczb(s: SesjaScenariusza, i: number, wybor: Akcja, t: TFn): string[] {
  const d = s.wariant.points[i];
  if (!d) return [];
  const j = jezykZadan();
  switch (d.point) {
    case 'draw-call': return zdaniaDrawCall(s, i, t, j);
    case 'cbet-case': return zdanieCbet(s, t, j);
    case 'size-spot': return zdaniaRozmiaru(s, i, d, wybor, t, j);
    case 'icm-call': return [t('scenario.numbers.icm', {
      equity: formatujProcent(d.handEquity, j), na10: Math.round(10 * d.handEquity), prog: formatujProcent(d.required, j), progZetony: formatujProcent(d.requiredChips, j),
    })];
    case 'range-spot': return [];
    case 'pick-hand': return []; // KO-072: liczby SDV/V/F wymagają nowych kluczy i18n (zadanie dla 06/09); brak zdania zamiast zgadniętego
    case 'list-hand':
    case 'river-catch':
    case 'defend':
    case 'turn-bet': return []; // brak liczb: ocena z listy klas (08-N4); widoku jeszcze nie ma
  }
}

const raz = (p: number): number => Math.max(1, Math.round(1 / p)); // „raz na N”, jak dotąd w linii draw-call

function zdaniaDrawCall(s: SesjaScenariusza, i: number, t: TFn, j: Jezyk): string[] {
  const d = s.wariant.points[i];
  if (d?.point !== 'draw-call') return [];
  const stol = s.wariant.board.slice(0, d.street === 'flop' ? 3 : 4);
  const nieznane = 52 - 2 - widokDecyzji(s.wariant, i).stol.length;
  const linia = t('scenario.numbers.line', {
    kwota: d.bet, pula: d.pot + d.bet, potrzeba: formatujProcent(d.required, j), razPotrzeba: raz(d.required),
    outy: d.outs, nieznane, trafisz: formatujProcent(d.hit, j, { miejsca: 1 }), razTrafisz: raz(d.hit),
  });
  const nadkarty = nadkartyPunktu(s.wariant, i); // ta sama definicja co warunek {{jesli:nadkarty}} w wyjaśnieniu (KO-073)
  if (nadkarty === 0) return [linia];
  if (d.correct === 'call') return [linia, t('scenario.numbers.overcardsCall', { nadkarty, nieznane })];
  // te same karty, które liczy generator: all-in rywala na flopie to dwie karty do końca (R-M2-002), inaczej jedna
  const spec = s.szablon.decisions[i];
  const dwieKarty = spec?.kind === 'draw-call' && spec.villain === 'all-in' && d.street === 'flop';
  const trafiszRazem = hitProbability(d.outs + nadkarty, nieznane, dwieKarty ? 2 : 1);
  return [linia, t('scenario.numbers.overcardsFold', { nadkarty, nieznane, trafiszRazem: formatujProcent(trafiszRazem, j, { miejsca: 1 }), potrzeba: formatujProcent(d.required, j) })];
}

/** Cena, jaką rozmiar c-betu f (ułamek puli) daje rywalowi: sprawdza f do puli 1 + 2f, więc potrzebuje f ÷ (1 + 2f) (R-M5-007). */
const cenaCbetu = (f: number): number => f / (1 + 2 * f);

function zdanieCbet(s: SesjaScenariusza, t: TFn, j: Jezyk): string[] {
  const r = s.rozmiaryCbet;
  if (!r) return [];
  const maly = cenaCbetu(r.small);
  const duzy = cenaCbetu(r.big);
  return [t('scenario.numbers.cbet', {
    maly: formatujProcent(r.small, j), duzy: formatujProcent(r.big, j),
    cenaMaly: formatujProcent(maly, j), razMaly: raz(maly), cenaDuzy: formatujProcent(duzy, j), razDuzy: raz(duzy),
  })];
}

function zdaniaRozmiaru(s: SesjaScenariusza, i: number, d: SizeSpotVariantDecision, wybor: Akcja, t: TFn, j: Jezyk): string[] {
  const pozycje = s.szablon.positions;
  if (!pozycje) return [];
  const rozmiar = (a: string): number | null => d.options.find((o) => o.action === a)?.bb ?? null;
  const standard = rozmiar('raise');
  const zdanie = (r: number): string => {
    // otwarcie: dopłata R − 1 do puli 2R + 0,5 (blind SB martwy), z SB 2R (twój mały blind jest w R); 3-bet: dopłata R − O do 2R + martwe blindy
    const trojbet = d.check === 'three-bet-size';
    const spec = s.szablon.decisions[i];
    const otwarcie = spec?.kind === 'size-spot' ? spec.openBb : undefined;
    if (trojbet && otwarcie === undefined) return '';
    const doplata = trojbet ? r - (otwarcie ?? 0) : r - 1;
    const pula = trojbet ? 2 * r + deadBlindsBb(pozycje) : pozycje.hero === 'SB' ? 2 * r : 2 * r + 0.5;
    const cena = doplata / pula;
    return t(trojbet ? 'scenario.numbers.size3bet' : 'scenario.numbers.sizeOpen', {
      bb: formatujLiczbe(r, j), doplata: formatujLiczbe(doplata, j), pula: formatujLiczbe(pula, j), cena: formatujProcent(cena, j), raz: raz(cena),
    });
  };
  const zdania: string[] = [];
  if (standard !== null) zdania.push(zdanie(standard));
  // kwota limpu z tej samej funkcji co liczba na przycisku (kryterium 5 §3; recenzja DO 08-programista-006)
  if (wybor === 'limp') {
    const limp = kwotaAkcji(d, 'limp', s.szablon);
    if (limp !== null) zdania.push(t('scenario.numbers.limp', { kwota: formatujLiczbe(limp, j) }));
  } else {
    const wybrany = rozmiar(wybor);
    if (wybrany !== null && wybrany !== standard) zdania.push(zdanie(wybrany));
  }
  return zdania.filter((z) => z !== '');
}
