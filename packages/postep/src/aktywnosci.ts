// Repozytorium aktywności (moduly.md: „krok + odpowiedź w jednej transakcji”; ADR 0010; dane.md: UPSERT kroku po przerwaniu).
import { OCENY_ODPOWIEDZI, type AkcjaPlanu, type AktywnoscWToku, type OcenaOdpowiedzi, type PlanAktywnosci, type RodzajAktywnosci, type Wynik, type WariantPlanu, type ZadaniePlanu } from '@szkola/domena';
import { powtorkaTx, type WierszKarty, type WierszLogu } from './powtorki';
import type { PowodOdczytu } from './ustawienia';
import type { PortBazy, Tx } from './port';
import type { PowodZapisu } from './daneUzytkownika';
import { jakoWynik } from './bledy';

export interface OdpowiedzKroku {
  krok: number; zadanie_id: string; rodzina_id: string; wybor: string; // wybor: JSON
  ocena: OcenaOdpowiedzi; zaliczona: 0 | 1; czas_ms: number; odpowiedziano_ms: number;
}
// Zapis odpowiedzi kroku (UPSERT po (aktywnosc_id, krok)) i przesunięcie `aktywnosc.krok` w jednej transakcji;
// wartość = id wiersza odpowiedzi (ten sam przy ponownym zapisie kroku).
// Następny krok podaje maszyna domeny (`przejscieAktywnosci`; w scenariuszu `dalej` z grafu, D-219), repozytorium zapisuje
// max(krok, nastepnyKrok): po zabiciu aplikacji po skoku wznowienie wraca do decyzji `dalej`, a ponowny zapis wcześniejszego
// kroku nie cofa przebiegu (moduly.md „Repozytoria”, przegląd D-043 05 fix).
export function zapiszKrok(port: PortBazy, aktywnoscId: string, odp: OdpowiedzKroku, nastepnyKrok: number, powtorka?: PowtorkaKroku): Promise<Wynik<number, PowodZapisu>> {
  return jakoWynik(() => port.transakcja(async (tx) => {
    const id = await odpowiedzTx(tx, aktywnoscId, odp, powtorka);
    const r = await tx.run('UPDATE aktywnosc SET krok = max(krok, ?) WHERE id = ?', [nastepnyKrok, aktywnoscId]);
    if (r.zmiany !== 1) throw new Error(`Brak aktywności ${aktywnoscId}`); // stan niemożliwy: klucz obcy odpowiedzi już to sprawdził
    return id;
  }));
}

// UPSERT odpowiedzi kroku (+ karta i log powtórki wskazujący tę odpowiedź) w transakcji wywołującego (moduly.md: powtórki
// „UPSERT odpowiedz + UPDATE krok (+ karta/log dla powtórek) w jednej transakcji”).
async function odpowiedzTx(tx: Tx, aktywnoscId: string, odp: OdpowiedzKroku, powtorka?: PowtorkaKroku): Promise<number> {
  const wiersze = await tx.all<unknown>(
    `INSERT INTO odpowiedz (aktywnosc_id, krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (aktywnosc_id, krok) DO UPDATE SET zadanie_id = excluded.zadanie_id, rodzina_id = excluded.rodzina_id,
       wybor = excluded.wybor, ocena = excluded.ocena, zaliczona = excluded.zaliczona, czas_ms = excluded.czas_ms,
       odpowiedziano_ms = excluded.odpowiedziano_ms
     RETURNING id`,
    [aktywnoscId, odp.krok, odp.zadanie_id, odp.rodzina_id, odp.wybor, odp.ocena, odp.zaliczona, odp.czas_ms, odp.odpowiedziano_ms],
  );
  const [w] = wiersze;
  if (!(typeof w === 'object' && w !== null && 'id' in w && typeof w.id === 'number')) throw new Error('UPSERT odpowiedzi bez id');
  if (powtorka) await powtorkaTx(tx, powtorka.karta, { ...powtorka.log, odpowiedz_id: w.id });
  return w.id;
}

// --- cz. 5 (rola 08): start, odczyt w toku, zakończenie, porzucenie, zużycie dnia (moduly.md „Maszyny stanów”, tabela `aktywnosc`) ---
export interface AktywnoscZapisana { id: string; aktywnosc: AktywnoscWToku }
export interface WynikTestuZapis { modulId: string; poprawne: number; wszystkie: number; zaliczony: boolean }
export interface PowtorkaKroku { karta: WierszKarty; log: Omit<WierszLogu, 'odpowiedz_id'> }
export interface Zakonczenie { ostatnia?: OdpowiedzKroku; powtorka?: PowtorkaKroku; wynikTestu?: WynikTestuZapis; lekcjaId?: string }

// INSERT nowej aktywności; `porzuc` (wynik `porzuc_i_start` z `wejscieDoAktywnosci`) zamyka poprzednią w tej samej transakcji.
export function zacznijAktywnosc(port: PortBazy, id: string, a: AktywnoscWToku, porzuc?: { id: string; teraz: number }): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(() => port.transakcja(async (tx) => {
    if (porzuc) await zamknijTx(tx, porzuc.id, 'porzucona', porzuc.teraz);
    await tx.run(
      `INSERT INTO aktywnosc (id, rodzaj, stan, z_limitu, dzien_lokalny, strefa, plan, krok, start_ms, koniec_ms)
       VALUES (?, ?, 'w_toku', ?, ?, ?, ?, ?, ?, NULL)`,
      [id, a.rodzaj, a.zLimitu ? 1 : 0, a.dzienLokalny, a.strefa, JSON.stringify(a.plan), a.krok, a.startMs],
    );
  }));
}

// Najnowsza aktywność w toku danego rodzaju (wznowienie, ADR 0010 `wznow`). Wiersz niezgodny z kształtem → odczyt_nieudany.
export async function aktywnoscWToku(port: PortBazy, rodzaj: RodzajAktywnosci): Promise<Wynik<AktywnoscZapisana | null, PowodOdczytu>> {
  try {
    const [w] = await port.all<unknown>(
      `SELECT id, rodzaj, z_limitu, dzien_lokalny, strefa, plan, krok, start_ms FROM aktywnosc
       WHERE stan = 'w_toku' AND rodzaj = ? ORDER BY start_ms DESC, id DESC LIMIT 1`,
      [rodzaj],
    );
    if (w === undefined) return { ok: true, wartosc: null };
    const a = wierszWToku(w, rodzaj);
    return a ? { ok: true, wartosc: a } : { ok: false, powod: 'odczyt_nieudany' };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}

export async function odpowiedziAktywnosci(port: PortBazy, id: string): Promise<Wynik<OdpowiedzKroku[], PowodOdczytu>> {
  try {
    const wiersze = await port.all<unknown>(
      `SELECT krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms FROM odpowiedz
       WHERE aktywnosc_id = ? ORDER BY krok`,
      [id],
    );
    const wynik: OdpowiedzKroku[] = [];
    for (const w of wiersze) {
      const o = wierszOdpowiedzi(w);
      if (!o) return { ok: false, powod: 'odczyt_nieudany' };
      wynik.push(o);
    }
    return { ok: true, wartosc: wynik };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}

// `odpowiedz(ostatni)` → `zakonczona`: ostatnia odpowiedź (+ powtórka), koniec_ms, wynik_testu i ukończenie lekcji w jednej
// transakcji. Pierwsze ukończenie lekcji zostaje (COALESCE): powtórzenie lekcji nie przesuwa daty ukończenia.
export function zakonczAktywnosc(port: PortBazy, id: string, koniecMs: number, z: Zakonczenie = {}): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(() => port.transakcja(async (tx) => {
    if (z.ostatnia) await odpowiedzTx(tx, id, z.ostatnia, z.powtorka);
    await zamknijTx(tx, id, 'zakonczona', koniecMs);
    if (z.wynikTestu) {
      const t = z.wynikTestu;
      await tx.run('INSERT INTO wynik_testu (aktywnosc_id, modul_id, poprawne, wszystkie, zaliczony) VALUES (?, ?, ?, ?, ?)',
        [id, t.modulId, t.poprawne, t.wszystkie, t.zaliczony ? 1 : 0]);
    }
    if (z.lekcjaId !== undefined) {
      await tx.run(
        `INSERT INTO postep_lekcji (lekcja_id, ukonczono_ms, zmieniono_ms) VALUES (?, ?, ?)
         ON CONFLICT (lekcja_id) DO UPDATE SET ukonczono_ms = COALESCE(postep_lekcji.ukonczono_ms, excluded.ukonczono_ms),
           zmieniono_ms = excluded.zmieniono_ms`,
        [z.lekcjaId, koniecMs, koniecMs],
      );
    }
  }));
}

export function porzucAktywnosc(port: PortBazy, id: string, koniecMs: number): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(() => port.transakcja((tx) => zamknijTx(tx, id, 'porzucona', koniecMs)));
}

// Zużycie limitu dnia lokalnego (ADR 0007): aktywności z limitu w każdym stanie (porzucona też zużyła start).
export async function zuzyteDzis(port: PortBazy, dzien: string): Promise<Wynik<number, PowodOdczytu>> {
  try {
    const [w] = await port.all<unknown>('SELECT count(*) AS n FROM aktywnosc WHERE z_limitu = 1 AND dzien_lokalny = ?', [dzien]);
    if (!(typeof w === 'object' && w !== null && 'n' in w && typeof w.n === 'number')) return { ok: false, powod: 'odczyt_nieudany' };
    return { ok: true, wartosc: w.n };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}

// Zamknięcie tylko z `w_toku` (stany końcowe, ADR 0010): inny stan albo brak wiersza → wyjątek → zapis_nieudany, wycofanie.
async function zamknijTx(tx: Tx, id: string, stan: 'zakonczona' | 'porzucona', koniecMs: number): Promise<void> {
  const r = await tx.run("UPDATE aktywnosc SET stan = ?, koniec_ms = ? WHERE id = ? AND stan = 'w_toku'", [stan, koniecMs, id]);
  if (r.zmiany !== 1) throw new Error(`Aktywność ${id} nie jest w toku`);
}

const POZIOMY = ['latwy', 'sredni', 'trudny'] as const;
const liczbaCalkowita = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v);

function wierszOdpowiedzi(w: unknown): OdpowiedzKroku | null {
  if (typeof w !== 'object' || w === null) return null;
  if (!('krok' in w) || !liczbaCalkowita(w.krok) || !('zadanie_id' in w) || typeof w.zadanie_id !== 'string') return null;
  if (!('rodzina_id' in w) || typeof w.rodzina_id !== 'string' || !('wybor' in w) || typeof w.wybor !== 'string') return null;
  if (!('ocena' in w) || !('zaliczona' in w) || (w.zaliczona !== 0 && w.zaliczona !== 1)) return null;
  if (!('czas_ms' in w) || !liczbaCalkowita(w.czas_ms) || !('odpowiedziano_ms' in w) || !liczbaCalkowita(w.odpowiedziano_ms)) return null;
  const ocena = OCENY_ODPOWIEDZI.find((o) => o === w.ocena);
  if (ocena === undefined) return null;
  return { krok: w.krok, zadanie_id: w.zadanie_id, rodzina_id: w.rodzina_id, wybor: w.wybor, ocena, zaliczona: w.zaliczona, czas_ms: w.czas_ms, odpowiedziano_ms: w.odpowiedziano_ms };
}

function wierszWToku(w: unknown, rodzaj: RodzajAktywnosci): AktywnoscZapisana | null {
  if (typeof w !== 'object' || w === null) return null;
  if (!('id' in w) || typeof w.id !== 'string' || !('z_limitu' in w) || (w.z_limitu !== 0 && w.z_limitu !== 1)) return null;
  if (!('dzien_lokalny' in w) || typeof w.dzien_lokalny !== 'string' || !('strefa' in w) || typeof w.strefa !== 'string') return null;
  if (!('krok' in w) || !liczbaCalkowita(w.krok) || !('start_ms' in w) || !liczbaCalkowita(w.start_ms)) return null;
  if (!('plan' in w) || typeof w.plan !== 'string') return null;
  const plan = parsujPlan(JSON.parse(w.plan) as unknown);
  if (!plan) return null;
  return { id: w.id, aktywnosc: { stan: 'w_toku', rodzaj, zLimitu: w.z_limitu === 1, dzienLokalny: w.dzien_lokalny, strefa: w.strefa, startMs: w.start_ms, plan, krok: w.krok } };
}

// Plan z JSON kolumny `plan` (kształt PlanAktywnosci, D-219, D-248); pola nieznane pomijane, znane sprawdzane.
export function parsujPlan(v: unknown): PlanAktywnosci | null {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return null;
  if (!('liczbaKrokow' in v) || !liczbaCalkowita(v.liczbaKrokow)) return null;
  if (!('trescId' in v) || (v.trescId !== null && typeof v.trescId !== 'string')) return null;
  const plan: { liczbaKrokow: number; trescId: string | null; decyzje?: AkcjaPlanu[][]; zadania?: ZadaniePlanu[]; wariant?: WariantPlanu } = { liczbaKrokow: v.liczbaKrokow, trescId: v.trescId };
  if ('decyzje' in v && v.decyzje !== undefined) {
    if (!Array.isArray(v.decyzje)) return null;
    const decyzje: AkcjaPlanu[][] = [];
    for (const akcje of v.decyzje as unknown[]) {
      if (!Array.isArray(akcje)) return null;
      const lista: AkcjaPlanu[] = [];
      for (const x of akcje as unknown[]) {
        if (typeof x !== 'object' || x === null || !('akcja' in x) || typeof x.akcja !== 'string' || !('dalej' in x)) return null;
        const dalej = x.dalej;
        if (!(liczbaCalkowita(dalej) || dalej === 'pokazanie' || dalej === 'koniec')) return null;
        lista.push({ akcja: x.akcja, dalej });
      }
      decyzje.push(lista);
    }
    plan.decyzje = decyzje;
  }
  if ('zadania' in v && v.zadania !== undefined) {
    if (!Array.isArray(v.zadania)) return null;
    const zadania: ZadaniePlanu[] = [];
    for (const x of v.zadania as unknown[]) {
      if (typeof x !== 'object' || x === null || !('id' in x) || typeof x.id !== 'string' || !('ziarno' in x) || !liczbaCalkowita(x.ziarno)) return null;
      zadania.push({ id: x.id, ziarno: x.ziarno });
    }
    plan.zadania = zadania;
  }
  if ('wariant' in v && v.wariant !== undefined) {
    const w = v.wariant;
    if (typeof w !== 'object' || w === null || !('poziom' in w) || !('ziarno' in w) || !liczbaCalkowita(w.ziarno)) return null;
    const poziom = POZIOMY.find((p) => p === w.poziom);
    if (poziom === undefined) return null;
    plan.wariant = { poziom, ziarno: w.ziarno };
  }
  return plan;
}

// Wynik ukończonego wariantu scenariusza do poziomu automatycznego (BR-POZ-002, D-534): szablon, poziom z planu, oceny decyzji
// w kolejności kroków. Tylko aktywności zakończone, z co najmniej jedną odpowiedzią i z wariantem w planie.
export interface WynikScenariusza { trescId: string; poziom: WariantPlanu['poziom']; startMs: number; oceny: OcenaOdpowiedzi[] }
export async function wynikiScenariuszy(port: PortBazy): Promise<Wynik<WynikScenariusza[], PowodOdczytu>> {
  try {
    const wiersze = await port.all<unknown>(
      `SELECT a.id AS id, a.plan AS plan, a.start_ms AS start_ms, o.ocena AS ocena FROM aktywnosc a
       JOIN odpowiedz o ON o.aktywnosc_id = a.id WHERE a.rodzaj = 'scenariusz' AND a.stan = 'zakonczona'
       ORDER BY a.start_ms ASC, a.id ASC, o.krok ASC`,
    );
    const wynik: WynikScenariusza[] = [];
    let ostatniId: string | null = null;
    for (const w of wiersze) {
      if (typeof w !== 'object' || w === null || !('id' in w) || typeof w.id !== 'string' || !('plan' in w) || typeof w.plan !== 'string') return { ok: false, powod: 'odczyt_nieudany' };
      if (!('start_ms' in w) || !liczbaCalkowita(w.start_ms) || !('ocena' in w)) return { ok: false, powod: 'odczyt_nieudany' };
      const ocena = OCENY_ODPOWIEDZI.find((o) => o === w.ocena);
      if (ocena === undefined) return { ok: false, powod: 'odczyt_nieudany' };
      if (w.id === ostatniId) {
        wynik[wynik.length - 1]?.oceny.push(ocena);
        continue;
      }
      ostatniId = w.id;
      const plan = parsujPlan(JSON.parse(w.plan) as unknown);
      if (!plan) return { ok: false, powod: 'odczyt_nieudany' };
      if (plan.trescId === null || plan.wariant === undefined) { ostatniId = null; continue; } // bez wariantu: nie z tego generatora
      wynik.push({ trescId: plan.trescId, poziom: plan.wariant.poziom, startMs: w.start_ms, oceny: [ocena] });
    }
    return { ok: true, wartosc: wynik };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}
