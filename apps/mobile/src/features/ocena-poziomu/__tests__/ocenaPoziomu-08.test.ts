/// <reference types="jest" />
// Pierwsze uruchomienie i ocena poziomu (rola 08 cz. 5b krok 3; PR-01, BR-ONB-001, BR-ONB-002; moduly.md `ocenaPoziomu`):
// etap startu z postep.db, aktywność `ocena_poziomu` bez limitu, „Pomiń” → porzucona i punkt startu M0, przerwana ocena
// od początku, zakończenie → `punkt_startu` (reguła wyniku D-264). Port na node:sqlite.
import type { Drill } from '@szkola/content-schema';
import type { DrillRow } from '@/data/content/repo';
import {
  PYTANIA_OCENY, etapStartu, odpowiedzOceny, pominOcene, punktStartuZOceny, zacznijOcene, zacznijOdPoczatku, type Ocena, type WejscieOceny,
} from '@/features/ocena-poziomu/ocenaPoziomu';
import { utworzZegar } from '@/platform/zegar';
import { portTestowy } from '@/test-utils/postepTestowy';

const T0 = Date.UTC(2026, 10, 8, 10);
const MODULY = ['m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'];
const choice = (id: string, family: string): Drill =>
  ({ kind: 'choice', id, family, rules: [], prompt: `P ${id}`, options: [{ text: 'A', correct: true, why: 'a' }, { text: 'B', correct: false, why: 'b' }, { text: 'C', correct: false, why: 'c' }] }) as unknown as Drill;
const WIERSZE = new Map<string, DrillRow>(PYTANIA_OCENY.map((p) => [p.zadanieId, { id: p.zadanieId, lessonId: null, family: `${p.modulId}.f`, drill: choice(p.zadanieId, `${p.modulId}.f`) }]));
let n = 0;
const wejscie = (o: Partial<WejscieOceny> = {}): WejscieOceny => ({
  wiersz: (id) => WIERSZE.get(id), moduly: MODULY, ziarno: 7,
  zegar: utworzZegar({ kalendarz: () => 'Europe/Warsaw', intl: () => null }, () => T0), noweId: () => `o${++n}`, ...o,
});
const indeks = (o: Ocena, dobra: boolean): number => {
  const it = o.items[o.odpowiedzi.length]!;
  if (it.kind !== 'choice') throw new Error('test: pytanie z wyborem');
  return it.options.findIndex((x) => x.correct === dobra);
};
async function zacznij(port: Parameters<typeof zacznijOcene>[0], w = wejscie()): Promise<Ocena> {
  const r = await zacznijOcene(port, w);
  if (!r.ok || !r.wartosc) throw new Error(r.ok ? 'pusta' : r.powod);
  return r.wartosc;
}
const punkt = (db: Awaited<ReturnType<typeof portTestowy>>['db']) => {
  const w = db.prepare("SELECT wartosc FROM ustawienie WHERE klucz = 'punkt_startu'").get() as { wartosc: string } | undefined;
  return w ? JSON.parse(w.wartosc) : null;
};

describe('reguła wyniku oceny (D-264)', () => {
  const poprawne = (...m: string[]) => new Set(m);
  it('pierwszy moduł ścieżki bez potwierdzenia: błąd w M2 → M2', () => {
    expect(punktStartuZOceny(MODULY, poprawne('m0', 'm1', 'm3', 'm4', 'm5', 'm6', 'm8'))).toBe('m2');
  });
  it('bez poprawnych odpowiedzi (BR-ONB-002 „bez znajomości zasad”) → M0', () => {
    expect(punktStartuZOceny(MODULY, poprawne())).toBe('m0');
  });
  it('wszystkie poprawne → M7 (pierwszy moduł bez pytania; docs/tresci/ocena-poziomu-pytania.md)', () => {
    expect(punktStartuZOceny(MODULY, new Set(PYTANIA_OCENY.map((p) => p.modulId)))).toBe('m7');
  });
  it('błąd tylko w M8 nie przeskakuje M7', () => {
    expect(punktStartuZOceny(MODULY, poprawne('m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6'))).toBe('m7');
  });
  it('pytania: najwyżej OCENA_POZIOMU_MAKS_PYTAN, z puli egzaminów wybranej przez 06', () => {
    expect(PYTANIA_OCENY.map((p) => p.zadanieId)).toEqual(['m0.exam.q1', 'm1.exam.q2', 'm2.exam.q5', 'm3.exam.q2', 'm4.exam.q1', 'm5.exam.q2', 'm6.exam.q5', 'm8.exam.q1']);
  });
});

describe('pierwsze uruchomienie z postep.db', () => {
  it('pusty postęp → powitanie; ocena w toku → powitanie (wybór na starcie, D-475); punkt startu → gotowe', async () => {
    const { port } = await portTestowy();
    expect(await etapStartu(port)).toEqual({ ok: true, wartosc: 'powitanie' });
    const o = await zacznij(port);
    expect(await etapStartu(port)).toEqual({ ok: true, wartosc: 'powitanie' });
    expect((await pominOcene(port, o, T0, 'm0')).ok).toBe(true);
    expect(await etapStartu(port)).toEqual({ ok: true, wartosc: 'gotowe' });
  });

  it('start: aktywność ocena_poziomu w toku, bez limitu, plan = pytania w kolejności', async () => {
    const { port, db } = await portTestowy();
    const o = await zacznij(port);
    const w = db.prepare('SELECT rodzaj, stan, z_limitu, krok, plan FROM aktywnosc').get() as Record<string, unknown>;
    expect({ ...w, plan: JSON.parse(String(w.plan)).zadania.map((z: { id: string }) => z.id) }).toEqual({
      rodzaj: 'ocena_poziomu', stan: 'w_toku', z_limitu: 0, krok: 0, plan: PYTANIA_OCENY.map((p) => p.zadanieId),
    });
    expect(o.items.map((i) => i.drillId)).toEqual(PYTANIA_OCENY.map((p) => p.zadanieId));
  });

  it('pytanie, którego nie ma w treści, jest pomijane; brak wszystkich → null, nic nie zapisane', async () => {
    const { port, db } = await portTestowy();
    const o = await zacznij(port, wejscie({ wiersz: (id) => (id === 'm2.exam.q5' ? undefined : WIERSZE.get(id)) }));
    expect(o.items).toHaveLength(PYTANIA_OCENY.length - 1);
    const pusta = await portTestowy();
    expect(await zacznijOcene(pusta.port, wejscie({ wiersz: () => undefined }))).toEqual({ ok: true, wartosc: null });
    expect(pusta.db.prepare('SELECT COUNT(*) AS n FROM aktywnosc').get()).toEqual({ n: 0 });
    void db;
  });

  it('BR-ONB-001-b „Pomiń”: aktywność porzucona, punkt startu M0, bez odpowiedzi i bez kart powtórek', async () => {
    const { port, db } = await portTestowy();
    const o = await zacznij(port);
    expect(await pominOcene(port, o, T0 + 5, 'm0')).toEqual({ ok: true, wartosc: undefined });
    expect(db.prepare('SELECT stan, koniec_ms FROM aktywnosc').get()).toEqual({ stan: 'porzucona', koniec_ms: T0 + 5 });
    expect(punkt(db)).toEqual({ modulId: 'm0', ustawionoMs: T0 + 5 });
    expect(db.prepare('SELECT COUNT(*) AS n FROM karta').get()).toEqual({ n: 0 });
  });

  it('BR-ONB-001 „Zacznij od początku” (D-475): bez oceny w toku → M0; z przerwaną oceną → M0 i aktywność porzucona, postęp pusty', async () => {
    const pusta = await portTestowy();
    expect(await zacznijOdPoczatku(pusta.port, T0, 'm0')).toEqual({ ok: true, wartosc: undefined });
    expect(punkt(pusta.db)).toEqual({ modulId: 'm0', ustawionoMs: T0 });
    const { port, db } = await portTestowy();
    const o = await zacznij(port);
    await odpowiedzOceny(port, o, indeks(o, true), T0 + 1);
    expect(await zacznijOdPoczatku(port, T0 + 5, 'm0')).toEqual({ ok: true, wartosc: undefined });
    expect(db.prepare('SELECT stan FROM aktywnosc').get()).toEqual({ stan: 'porzucona' });
    expect(punkt(db)).toEqual({ modulId: 'm0', ustawionoMs: T0 + 5 });
    expect(db.prepare('SELECT COUNT(*) AS n FROM karta').get()).toEqual({ n: 0 });
    expect(await etapStartu(port)).toEqual({ ok: true, wartosc: 'gotowe' });
  });

  it('„Pomiń” na powitaniu (bez aktywności) też ustawia M0', async () => {
    const { port, db } = await portTestowy();
    expect((await pominOcene(port, null, T0, 'm0')).ok).toBe(true);
    expect(punkt(db)).toEqual({ modulId: 'm0', ustawionoMs: T0 });
  });

  it('BR-ONB-001-a/BR-ONB-002: wszystkie odpowiedzi → zakończona, punkt startu z reguły wyniku, odpowiedzi zapisane, bez kart', async () => {
    const { port, db } = await portTestowy();
    let o = await zacznij(port);
    let wynik: string | null = null;
    for (let k = 0; k < o.items.length; k++) {
      const dobra = PYTANIA_OCENY[k]!.modulId !== 'm3'; // błąd w M3
      const r = await odpowiedzOceny(port, o, indeks(o, dobra), T0 + k + 1);
      if (!r.ok) throw new Error(r.powod);
      o = r.wartosc.ocena;
      wynik = r.wartosc.punktStartu;
      if (k < o.items.length - 1) expect(wynik).toBeNull();
    }
    expect(wynik).toBe('m3');
    expect(db.prepare('SELECT stan, krok FROM aktywnosc').get()).toEqual({ stan: 'zakonczona', krok: PYTANIA_OCENY.length - 1 });
    expect(punkt(db)).toEqual({ modulId: 'm3', ustawionoMs: T0 + PYTANIA_OCENY.length });
    expect(db.prepare('SELECT COUNT(*) AS n, SUM(zaliczona) AS z FROM odpowiedz').get()).toEqual({ n: PYTANIA_OCENY.length, z: PYTANIA_OCENY.length - 1 });
    expect(db.prepare('SELECT COUNT(*) AS n FROM karta').get()).toEqual({ n: 0 });
    expect(await etapStartu(port)).toEqual({ ok: true, wartosc: 'gotowe' });
  });

  it('BR-ONB-001 „Przerwana ocena”: po ponownym uruchomieniu ekran wyboru (D-475); „Przejdź test” zaczyna od początku (stara porzucona), postęp pusty', async () => {
    const { port, sciezka } = await portTestowy();
    const o = await zacznij(port);
    const r = await odpowiedzOceny(port, o, indeks(o, true), T0 + 1);
    expect(r.ok).toBe(true);
    await port.zamknij();
    const drugi = await portTestowy(sciezka);
    expect(await etapStartu(drugi.port)).toEqual({ ok: true, wartosc: 'powitanie' });
    const nowa = await zacznij(drugi.port);
    expect(nowa.odpowiedzi).toHaveLength(0);
    expect(drugi.db.prepare('SELECT stan, krok FROM aktywnosc ORDER BY start_ms, id').all()).toEqual([
      { stan: 'porzucona', krok: 1 },
      { stan: 'w_toku', krok: 0 },
    ]);
    expect(punkt(drugi.db)).toBeNull();
    expect(drugi.db.prepare('SELECT COUNT(*) AS n FROM postep_lekcji').get()).toEqual({ n: 0 });
  });

  it('BR-ONB-001 „Nie wiem” (D-475): zapisane jako nie wiem (odróżnialne), niezaliczone, ocena kroku jak błędna, następne pytanie', async () => {
    const { port, db } = await portTestowy();
    const o = await zacznij(port);
    const r = await odpowiedzOceny(port, o, null, T0 + 1);
    if (!r.ok) throw new Error(r.powod);
    expect(r.wartosc.punktStartu).toBeNull();
    expect(r.wartosc.ocena.odpowiedzi).toEqual([false]);
    const w = db.prepare('SELECT zadanie_id, wybor, zaliczona FROM odpowiedz').get() as { zadanie_id: string; wybor: string; zaliczona: number };
    expect(w.zaliczona).toBe(0);
    expect(JSON.parse(w.wybor)).toEqual({ nieWiem: true });
  });

  it('BR-ONB-001 „Nie wiem” nie zawyża poziomu: same „Nie wiem” → M0; „Nie wiem” w M3 przy reszcie poprawnej → M3', async () => {
    for (const nieWiemWModule of [null, 'm3']) {
      const { port, db } = await portTestowy();
      let o = await zacznij(port);
      let wynik: string | null = null;
      for (let k = 0; k < o.items.length; k++) {
        const nie = nieWiemWModule === null || PYTANIA_OCENY[k]!.modulId === nieWiemWModule;
        const r = await odpowiedzOceny(port, o, nie ? null : indeks(o, true), T0 + k + 1);
        if (!r.ok) throw new Error(r.powod);
        o = r.wartosc.ocena;
        wynik = r.wartosc.punktStartu;
      }
      expect(wynik).toBe(nieWiemWModule ?? 'm0');
      expect(punkt(db)).toMatchObject({ modulId: nieWiemWModule ?? 'm0' });
      expect(db.prepare('SELECT COUNT(*) AS n FROM karta').get()).toEqual({ n: 0 });
    }
  });

  it('ponowny zapis tego samego kroku (podwójne dotknięcie): jeden wiersz odpowiedzi, krok 1', async () => {
    const { port, db } = await portTestowy();
    const o = await zacznij(port);
    const i = indeks(o, true);
    await Promise.all([odpowiedzOceny(port, o, i, T0 + 1), odpowiedzOceny(port, o, i, T0 + 2)]);
    expect(db.prepare('SELECT COUNT(*) AS n FROM odpowiedz').get()).toEqual({ n: 1 });
    expect(db.prepare('SELECT krok FROM aktywnosc').get()).toEqual({ krok: 1 });
  });
});
