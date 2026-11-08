import {
  KONFIGURACJA, przejscieAktywnosci, startAktywnosci, wejscieDoAktywnosci, type AktywnoscWToku, type Limit, type Wynik, type Zegar,
} from '@szkola/domena';
import {
  aktywnoscWToku, odczytajKarty, odpowiedziAktywnosci, zacznijAktywnosc, zakonczAktywnosc, zapiszKrok,
  type OdpowiedzKroku, type PortBazy, type PowodZapisu, type PowtorkaKroku,
} from '@szkola/postep';
import { newCard, review, type StoredCard } from '@szkola/srs';
import type { DrillRow } from '@/data/content/repo';
import { kartaZWiersza, logZPowtorki, wierszZKarty } from '@/data/postep';
import { gradeAnswer, isPass, ocenaSchematu } from '@/features/drills/grade';
import type { DrillAnswer, DrillInstance, GradeResult } from '@/features/drills/types';
import type { DrillContext } from '@/features/drills/engine';
import { odtworzZestaw, zadaniaZestawu } from './build';

/**
 * Sesja zadań jako aktywność (ADR 0010; moduly.md „Maszyny stanów”): lekcja, powtórki, test modułu. Każda odpowiedź
 * zapisana przed „Dalej” (odpowiedź + karta FSRS + log w jednej transakcji), ostatnia kończy aktywność; wznowienie po
 * przerwaniu odtwarza ten sam zestaw z planu (D-248) i odpowiedzi z bazy.
 */
export type RodzajSesji = 'lekcja' | 'powtorki' | 'test_modulu' | 'sesja';
export interface OdpowiedzSesji { item: DrillInstance; answer: DrillAnswer; grade: GradeResult; elapsedMs: number }
export interface Sesja {
  id: string;
  aktywnosc: AktywnoscWToku;
  items: readonly DrillInstance[];
  odpowiedzi: readonly OdpowiedzSesji[];
  karty: ReadonlyMap<string, StoredCard>;
}
export type PowodSesji = PowodZapisu | 'odczyt_nieudany' | 'limit_wyczerpany' | 'plan_niepoprawny';
export interface WejscieSesji {
  rodzaj: RodzajSesji;
  trescId: string | null;
  limit: Limit;
  pierwszePodejscieTestu: boolean;
  buduj(): DrillInstance[];
  wiersz(id: string): DrillRow | undefined;
  zegar: Zegar;
  noweId(): string;
  ctx?: DrillContext; // zakresy dla malowania i rangeDecision (przegląd D-043 P1)
}

/** Wejście: wznowienie aktywności w toku tego rodzaju i treści albo nowa; pusty zestaw → null (nic nie zapisane). */
export async function otworzSesje(port: PortBazy, w: WejscieSesji): Promise<Wynik<Sesja | null, PowodSesji>> {
  const [wToku, karty] = await Promise.all([aktywnoscWToku(port, w.rodzaj), odczytajKarty(port)]);
  if (!wToku.ok) return wToku;
  if (!karty.ok) return karty;
  const mapaKart = new Map(karty.wartosc.map((k) => [k.rodzina_id, kartaZWiersza(k)]));
  const wej = wejscieDoAktywnosci(w.rodzaj, w.trescId, wToku.wartosc?.aktywnosc ?? null, w.pierwszePodejscieTestu, w.limit);
  if (wej.akcja === 'ekran_zakupu') return { ok: false, powod: 'limit_wyczerpany' };
  if (wej.akcja === 'wznow' && wToku.wartosc) {
    const wznowiona = await wznow(port, wToku.wartosc.id, wej.aktywnosc, w, mapaKart);
    if (!wznowiona.ok || wznowiona.wartosc) return wznowiona;
    // zestaw nie do odtworzenia (zmiana treści): stara aktywność porzucona przy starcie nowej (D-248, nazwane w raporcie)
    return nowa(port, w, mapaKart, wToku.wartosc.id);
  }
  return nowa(port, w, mapaKart, wej.akcja === 'porzuc_i_start' && wToku.wartosc ? wToku.wartosc.id : null);
}

async function nowa(port: PortBazy, w: WejscieSesji, karty: Map<string, StoredCard>, porzuc: string | null): Promise<Wynik<Sesja | null, PowodSesji>> {
  const items = w.buduj();
  if (items.length === 0) return { ok: true, wartosc: null };
  const teraz = w.zegar.teraz();
  const strefa = w.zegar.strefa();
  const start = startAktywnosci({
    rodzaj: w.rodzaj, pierwszePodejscieTestu: w.pierwszePodejscieTestu, limit: w.limit, teraz, strefa,
    dzienLokalny: w.zegar.dzienLokalny(teraz, strefa),
    plan: { liczbaKrokow: items.length, trescId: w.trescId, zadania: zadaniaZestawu(items) },
  });
  if (!start.ok) return start;
  const id = w.noweId();
  const zapis = await zacznijAktywnosc(port, id, start.wartosc, porzuc ? { id: porzuc, teraz } : undefined);
  if (!zapis.ok) return zapis;
  return { ok: true, wartosc: { id, aktywnosc: start.wartosc, items, odpowiedzi: [], karty } };
}

// null = zestaw albo odpowiedzi nie do odtworzenia z obecnej treści (wywołujący zaczyna nową aktywność).
async function wznow(port: PortBazy, id: string, a: AktywnoscWToku, w: WejscieSesji, karty: Map<string, StoredCard>): Promise<Wynik<Sesja | null, PowodSesji>> {
  let items: DrillInstance[] | null = null;
  try {
    // ctx: zakresy dla malowania i rangeDecision; wyjątek silnika zadań (np. brak zakresu po zmianie treści) = zestaw
    // nie do odtworzenia → nowa aktywność, nie zawieszony ekran (przegląd D-043 P1)
    items = a.plan.zadania ? odtworzZestaw(a.plan.zadania, w.wiersz, w.ctx) : null;
  } catch {
    items = null;
  }
  if (!items || items.length !== a.plan.liczbaKrokow) return { ok: true, wartosc: null };
  const zapisane = await odpowiedziAktywnosci(port, id);
  if (!zapisane.ok) return zapisane;
  const odpowiedzi: OdpowiedzSesji[] = [];
  for (const o of zapisane.wartosc) {
    const item = items[o.krok];
    const answer = parsujWybor(o.wybor);
    if (!item || item.drillId !== o.zadanie_id || !answer) return { ok: true, wartosc: null };
    odpowiedzi.push({ item, answer, grade: gradeAnswer(item, answer), elapsedMs: o.czas_ms }); // ten sam zestaw → ta sama ocena
  }
  if (odpowiedzi.length !== a.krok) return { ok: true, wartosc: null };
  return { ok: true, wartosc: { id, aktywnosc: a, items, odpowiedzi, karty } };
}

/** Odpowiedź na bieżący krok; ostatnia kończy aktywność (wynik testu, ukończenie lekcji) w tej samej transakcji. */
export async function odpowiedzWSesji(
  port: PortBazy,
  s: Sesja,
  o: { answer: DrillAnswer; grade: GradeResult; elapsedMs: number },
  teraz: number,
): Promise<Wynik<{ sesja: Sesja; zakonczona: boolean }, PowodSesji | 'krok_niezgodny'>> {
  const krok = s.odpowiedzi.length;
  const item = s.items[krok];
  const nast = przejscieAktywnosci(s.aktywnosc, { typ: 'odpowiedz', krok, teraz });
  if (!item || !nast.ok) return { ok: false, powod: 'krok_niezgodny' };
  const elapsedMs = Math.max(0, Math.round(o.elapsedMs));
  // karta FSRS rodziny po każdej odpowiedzi (jak dotąd recordAnswer: pierwsza odpowiedź zakłada kartę)
  const przed = s.karty.get(item.family) ?? newCard(item.family, teraz);
  const fsrs = review(przed, {
    correct: isPass(o.grade),
    ...(o.grade === 'close' ? { close: true } : {}),
    ...(o.grade === 'acceptable' ? { acceptable: true } : {}),
    ...(item.kind === 'paint' ? { untimed: true } : {}),
    elapsedMs,
  }, teraz);
  const powtorka: PowtorkaKroku = { karta: wierszZKarty(fsrs.card, teraz), log: logZPowtorki(fsrs.log) };
  const { ocena, zaliczona } = ocenaSchematu(o.grade);
  const odp: OdpowiedzKroku = {
    krok, zadanie_id: item.drillId, rodzina_id: item.family, wybor: JSON.stringify({ answer: o.answer }), ocena, zaliczona,
    czas_ms: elapsedMs, odpowiedziano_ms: teraz,
  };
  const odpowiedzi = [...s.odpowiedzi, { item, answer: o.answer, grade: o.grade, elapsedMs }];
  const karty = new Map(s.karty).set(item.family, fsrs.card);
  if (nast.wartosc.stan === 'w_toku') {
    const w = await zapiszKrok(port, s.id, odp, nast.wartosc.krok, powtorka);
    if (!w.ok) return w;
    return { ok: true, wartosc: { sesja: { ...s, aktywnosc: nast.wartosc, odpowiedzi, karty }, zakonczona: false } };
  }
  const poprawne = odpowiedzi.filter((x) => isPass(x.grade)).length;
  const w = await zakonczAktywnosc(port, s.id, teraz, {
    ostatnia: odp, powtorka,
    ...(s.aktywnosc.rodzaj === 'test_modulu' && s.aktywnosc.plan.trescId
      ? { wynikTestu: { modulId: s.aktywnosc.plan.trescId, poprawne, wszystkie: s.items.length, zaliczony: poprawne / s.items.length >= KONFIGURACJA.TEST_MODULU_PROG } }
      : {}),
    ...(s.aktywnosc.rodzaj === 'lekcja' && s.aktywnosc.plan.trescId ? { lekcjaId: s.aktywnosc.plan.trescId } : {}),
  });
  if (!w.ok) return w;
  return { ok: true, wartosc: { sesja: { ...s, odpowiedzi, karty }, zakonczona: true } };
}

// Wybór zapisany jako {"answer": DrillAnswer}; kształt sprawdzany przy odczycie (dane z bazy, zasada „parsowanie”).
function parsujWybor(json: string): DrillAnswer | null {
  let v: unknown;
  try { v = JSON.parse(json); } catch { return null; }
  if (typeof v !== 'object' || v === null || !('answer' in v)) return null;
  const a = v.answer;
  if (typeof a !== 'object' || a === null || !('kind' in a)) return null;
  const liczby = (x: unknown): x is number[] => Array.isArray(x) && x.every((n) => typeof n === 'number');
  switch (a.kind) {
    case 'choice': return 'index' in a && typeof a.index === 'number' ? { kind: 'choice', index: a.index } : null;
    case 'numeric': return 'value' in a && typeof a.value === 'number' ? { kind: 'numeric', value: a.value } : null;
    case 'texture': return 'picks' in a && liczby(a.picks) ? { kind: 'texture', picks: a.picks } : null;
    case 'paint': return 'painted' in a && Array.isArray(a.painted) && a.painted.every((b) => typeof b === 'boolean') ? { kind: 'paint', painted: a.painted } : null;
    case 'timeout': return { kind: 'timeout' };
    default: return null;
  }
}
