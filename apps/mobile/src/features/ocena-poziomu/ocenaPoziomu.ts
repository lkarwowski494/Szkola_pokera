import { createRng } from '@szkola/poker-core';
import { przejscieAktywnosci, startAktywnosci, type AktywnoscWToku, type Wynik, type Zegar } from '@szkola/domena';
import {
  aktywnoscWToku, odczytajUstawienie, porzucAktywnosc, zacznijAktywnosc, zakonczAktywnosc, zapiszKrok, zapiszUstawienie,
  type OdpowiedzKroku, type PortBazy, type PowodOdczytu, type PowodZapisu,
} from '@szkola/postep';
import type { DrillRow } from '@/data/content/repo';
import { gradeAnswer, ocenaSchematu } from '@/features/drills/grade';
import type { DrillInstance } from '@/features/drills/types';
import { parsujPunktStartu } from '@/features/kurs/faktyKursu';
import { buildLessonSession, zadaniaZestawu } from '@/features/session/build';

/**
 * Pierwsze uruchomienie i ocena poziomu (PR-01; BR-ONB-001, BR-ONB-002; moduly.md `ocenaPoziomu`, ADR 0010).
 * Pytania: pula egzaminów wybrana przez rolę 06 (docs/tresci/ocena-poziomu-pytania.md, odczyt 2026-11-08), po jednym na
 * moduł, w kolejności ścieżki. Ocena nie zakłada kart powtórek ani nie zmienia postępu lekcji (tamże: „Żadne pytanie nie
 * zmienia oceny zagrań ani postępu”). Ukończenie pierwszego uruchomienia = ustawienie `punkt_startu` (także „Pomiń” → M0).
 */
export const PYTANIA_OCENY: readonly { modulId: string; zadanieId: string }[] = [
  { modulId: 'm0', zadanieId: 'm0.exam.q1' },
  { modulId: 'm1', zadanieId: 'm1.exam.q2' },
  { modulId: 'm2', zadanieId: 'm2.exam.q5' },
  { modulId: 'm3', zadanieId: 'm3.exam.q2' },
  { modulId: 'm4', zadanieId: 'm4.exam.q1' },
  { modulId: 'm5', zadanieId: 'm5.exam.q2' },
  { modulId: 'm6', zadanieId: 'm6.exam.q5' },
  { modulId: 'm8', zadanieId: 'm8.exam.q1' },
];
const MODUL_ZADANIA = new Map(PYTANIA_OCENY.map((p) => [p.zadanieId, p.modulId]));

export type EtapStartu = 'gotowe' | 'powitanie' | 'ocena';
export interface Ocena {
  id: string;
  aktywnosc: AktywnoscWToku;
  items: readonly DrillInstance[];
  odpowiedzi: readonly boolean[]; // zaliczona? w kolejności kroków
  moduly: readonly string[]; // kolejność ścieżki do reguły wyniku
}
export interface WejscieOceny {
  wiersz(id: string): DrillRow | undefined;
  moduly: readonly string[]; // identyfikatory modułów w kolejności ścieżki (treść)
  ziarno: number; // kolejność odpowiedzi (losowana jak w egzaminie)
  zegar: Zegar;
  noweId(): string;
}
export type PowodOceny = PowodZapisu | PowodOdczytu | 'plan_niepoprawny' | 'limit_wyczerpany' | 'krok_niezgodny';

/**
 * Reguła wyniku (D-264): punkt startu = pierwszy moduł ścieżki, którego ocena nie potwierdziła — odpowiedź błędna,
 * pominięta albo moduł bez pytania (M7). Wszystkie poprawne → M7, jak w propozycji roli 06; błąd tylko w M8 nie przeskakuje
 * niesprawdzonego M7. Moduły przed punktem startu zalicza domena (`stanKursu`, `zaliczoneOcena`).
 */
export function punktStartuZOceny(moduly: readonly string[], poprawne: ReadonlySet<string>): string {
  for (const m of moduly) if (!poprawne.has(m)) return m;
  return moduly[moduly.length - 1] ?? '';
}

/** Etap pierwszego uruchomienia: punkt startu zapisany → „Dziś”; ocena w toku (przerwana) → ocena od początku; inaczej powitanie. */
export async function etapStartu(port: PortBazy): Promise<Wynik<EtapStartu, PowodOdczytu>> {
  const [u, w] = await Promise.all([odczytajUstawienie(port, 'punkt_startu'), aktywnoscWToku(port, 'ocena_poziomu')]);
  if (!u.ok) return u;
  if (!w.ok) return w;
  const p = parsujPunktStartu(u.wartosc);
  if (!p.ok) return p;
  if (p.wartosc) return { ok: true, wartosc: 'gotowe' };
  return { ok: true, wartosc: w.wartosc ? 'ocena' : 'powitanie' };
}

/**
 * Nowa ocena od pierwszego pytania; ocena w toku (przerwana) zostaje porzucona w tej samej transakcji (BR-ONB-001-c:
 * „ocenę od początku”). Pytania, których nie ma w treści, są pomijane; żadne → null, nic nie zapisane.
 */
export async function zacznijOcene(port: PortBazy, w: WejscieOceny): Promise<Wynik<Ocena | null, PowodOceny>> {
  const wToku = await aktywnoscWToku(port, 'ocena_poziomu');
  if (!wToku.ok) return wToku;
  const wiersze = PYTANIA_OCENY.map((p) => w.wiersz(p.zadanieId)).filter((r): r is DrillRow => r !== undefined);
  const items = buildLessonSession(wiersze, createRng(w.ziarno));
  if (items.length === 0) return { ok: true, wartosc: null };
  const teraz = w.zegar.teraz();
  const strefa = w.zegar.strefa();
  const start = startAktywnosci({
    rodzaj: 'ocena_poziomu', pierwszePodejscieTestu: false, limit: { bezLimitu: true }, teraz, strefa,
    dzienLokalny: w.zegar.dzienLokalny(teraz, strefa),
    plan: { liczbaKrokow: items.length, trescId: null, zadania: zadaniaZestawu(items) },
  });
  if (!start.ok) return start;
  const id = w.noweId();
  const zapis = await zacznijAktywnosc(port, id, start.wartosc, wToku.wartosc ? { id: wToku.wartosc.id, teraz } : undefined);
  if (!zapis.ok) return zapis;
  return { ok: true, wartosc: { id, aktywnosc: start.wartosc, items, odpowiedzi: [], moduly: w.moduly } };
}

/**
 * Odpowiedź na bieżące pytanie (zapis przed następnym ekranem). Ostatnia: najpierw `punkt_startu`, potem zakończenie
 * aktywności — przerwanie między zapisami zostawia ukończone pierwsze uruchomienie, nie powtórzoną ocenę.
 */
export async function odpowiedzOceny(
  port: PortBazy,
  o: Ocena,
  indeks: number,
  teraz: number,
): Promise<Wynik<{ ocena: Ocena; punktStartu: string | null }, PowodOceny>> {
  const krok = o.odpowiedzi.length;
  const item = o.items[krok];
  const nast = przejscieAktywnosci(o.aktywnosc, { typ: 'odpowiedz', krok, teraz });
  if (!item || !nast.ok) return { ok: false, powod: 'krok_niezgodny' };
  const answer = { kind: 'choice' as const, index: indeks };
  const { ocena, zaliczona } = ocenaSchematu(gradeAnswer(item, answer));
  const odp: OdpowiedzKroku = {
    krok, zadanie_id: item.drillId, rodzina_id: item.family, wybor: JSON.stringify({ answer }), ocena, zaliczona, czas_ms: 0,
    odpowiedziano_ms: teraz,
  };
  const odpowiedzi = [...o.odpowiedzi, zaliczona === 1];
  if (nast.wartosc.stan === 'w_toku') {
    const z = await zapiszKrok(port, o.id, odp, nast.wartosc.krok);
    if (!z.ok) return z;
    return { ok: true, wartosc: { ocena: { ...o, aktywnosc: nast.wartosc, odpowiedzi }, punktStartu: null } };
  }
  const poprawne = new Set(o.items.flatMap((it, i) => (odpowiedzi[i] ? [MODUL_ZADANIA.get(it.drillId) ?? ''] : [])));
  const punkt = punktStartuZOceny(o.moduly, poprawne);
  const u = await zapiszUstawienie(port, 'punkt_startu', { modulId: punkt, ustawionoMs: teraz }, teraz);
  if (!u.ok) return u;
  const z = await zakonczAktywnosc(port, o.id, teraz, { ostatnia: odp });
  if (!z.ok) return z;
  return { ok: true, wartosc: { ocena: { ...o, odpowiedzi }, punktStartu: punkt } };
}

/** „Pomiń” (BR-ONB-001-b): punkt startu = pierwszy moduł, ocena w toku porzucona (moduly.md `ocenaPoziomu`). */
export async function pominOcene(port: PortBazy, o: Ocena | null, teraz: number, pierwszyModul: string): Promise<Wynik<void, PowodZapisu>> {
  const u = await zapiszUstawienie(port, 'punkt_startu', { modulId: pierwszyModul, ustawionoMs: teraz }, teraz);
  if (!u.ok) return u;
  return o ? porzucAktywnosc(port, o.id, teraz) : { ok: true, wartosc: undefined };
}
