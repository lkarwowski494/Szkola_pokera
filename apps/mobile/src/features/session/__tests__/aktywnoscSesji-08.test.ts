/// <reference types="jest" />
// Sesja jako aktywność (rola 08 cz. 5 krok 6): zapis każdej odpowiedzi, zakończenie, wznowienie z planu (BR-CWI-004, D-248),
// test modułu (wynik_testu, próg z KONFIGURACJA), zmiana treści, podwójne dotknięcie, błąd zapisu. Port na node:sqlite.
import type { Drill } from '@szkola/content-schema';
import { createRng } from '@szkola/poker-core';
import { KONFIGURACJA, type Limit } from '@szkola/domena';
import type { DrillRow } from '@/data/content/repo';
import { gradeAnswer } from '@/features/drills/grade';
import type { DrillAnswer } from '@/features/drills/types';
import { buildLessonSession } from '@/features/session/build';
import { odpowiedzWSesji, otworzSesje, type Sesja, type WejscieSesji } from '@/features/session/aktywnoscSesji';
import { utworzZegar } from '@/platform/zegar';
import { portTestowy } from '@/test-utils/postepTestowy';

const T0 = Date.UTC(2026, 10, 8, 10);
const choice = (id: string, family: string): Drill =>
  ({ kind: 'choice', id, family, rules: [], prompt: `P ${id}`, options: [{ text: 'A', correct: true, why: 'a' }, { text: 'B', correct: false, why: 'b' }] }) as unknown as Drill;
const ROWS: DrillRow[] = ['c1', 'c2', 'c3'].map((id, i) => ({ id, lessonId: 'l1', family: `f${i}`, drill: choice(id, `f${i}`) }));
const MAPA = new Map(ROWS.map((r) => [r.id, r]));
const BEZ_LIMITU: Limit = { bezLimitu: true };
let n = 0;
const wejscie = (o: Partial<WejscieSesji> = {}): WejscieSesji => ({
  rodzaj: 'lekcja', trescId: 'l1', limit: BEZ_LIMITU, pierwszePodejscieTestu: true,
  buduj: () => buildLessonSession(ROWS, createRng(5)), wiersz: (id) => MAPA.get(id),
  zegar: utworzZegar({ kalendarz: () => 'Europe/Warsaw', intl: () => null }, () => T0), noweId: () => `a${++n}`, ...o,
});
// Poprawna odpowiedź na zadanie z wyborem: indeks opcji oznaczonej jako poprawna (kolejność opcji losowana).
const dobra = (s: Sesja, krok: number): DrillAnswer => {
  const it = s.items[krok]!;
  if (it.kind !== 'choice') throw new Error('test: zadanie z wyborem');
  return { kind: 'choice', index: it.options.findIndex((o) => o.correct) };
};
async function odpowiedz(port: Parameters<typeof odpowiedzWSesji>[0], s: Sesja, answer: DrillAnswer, t = T0) {
  const w = await odpowiedzWSesji(port, s, { answer, grade: gradeAnswer(s.items[s.odpowiedzi.length]!, answer), elapsedMs: 1500 }, t);
  if (!w.ok) throw new Error(w.powod);
  return w.wartosc;
}
async function otworz(port: Parameters<typeof otworzSesje>[0], w = wejscie()) {
  const r = await otworzSesje(port, w);
  if (!r.ok || !r.wartosc) throw new Error(r.ok ? 'pusta' : r.powod);
  return r.wartosc;
}

describe('sesja jako aktywność', () => {
  it('start lekcji: aktywność w toku z planem (zadania = kroki), bez limitu (BR-LIM-003), krok 0', async () => {
    const { port, db } = await portTestowy();
    const s = await otworz(port);
    expect(s.odpowiedzi).toHaveLength(0);
    const w = db.prepare('SELECT rodzaj, stan, z_limitu, dzien_lokalny, strefa, krok, plan FROM aktywnosc').get() as Record<string, unknown>;
    expect({ ...w, plan: JSON.parse(String(w.plan)).zadania.map((z: { id: string }) => z.id) }).toEqual({
      rodzaj: 'lekcja', stan: 'w_toku', z_limitu: 0, dzien_lokalny: '2026-11-08', strefa: 'Europe/Warsaw', krok: 0, plan: s.items.map((i) => i.drillId),
    });
  });
  it('każda odpowiedź zapisana z kartą FSRS i logiem; ostatnia kończy aktywność i lekcję', async () => {
    const { port, db } = await portTestowy();
    let s = await otworz(port);
    for (let k = 0; k < 3; k++) {
      const r = await odpowiedz(port, s, k === 1 ? { kind: 'choice', index: 1 - (dobra(s, 1) as { index: number }).index } : dobra(s, k), T0 + k);
      expect(r.zakonczona).toBe(k === 2);
      s = r.sesja;
      expect(db.prepare('SELECT count(*) AS n FROM odpowiedz').get()).toEqual({ n: k + 1 });
    }
    expect(db.prepare('SELECT stan, koniec_ms FROM aktywnosc').get()).toEqual({ stan: 'zakonczona', koniec_ms: T0 + 2 });
    expect(db.prepare('SELECT ocena, zaliczona FROM odpowiedz ORDER BY krok').all()).toEqual([
      { ocena: 'zgodne', zaliczona: 1 }, { ocena: 'blad', zaliczona: 0 }, { ocena: 'zgodne', zaliczona: 1 },
    ]);
    expect([(db.prepare('SELECT count(*) AS n FROM karta').get() as { n: number }).n, (db.prepare('SELECT count(*) AS n FROM log_powtorki WHERE odpowiedz_id IS NOT NULL').get() as { n: number }).n]).toEqual([3, 3]);
    expect(db.prepare("SELECT ukonczono_ms FROM postep_lekcji WHERE lekcja_id = 'l1'").get()).toEqual({ ukonczono_ms: T0 + 2 });
  });
  it('wznowienie po zabiciu aplikacji: nowy port na tym samym pliku → te same zadania, odpowiedzi i krok (BR-CWI-004)', async () => {
    const { port, sciezka } = await portTestowy();
    let s = await otworz(port);
    s = (await odpowiedz(port, s, dobra(s, 0))).sesja;
    s = (await odpowiedz(port, s, { kind: 'choice', index: 1 - (dobra(s, 1) as { index: number }).index })).sesja;
    await port.zamknij();
    const { port: port2, db } = await portTestowy(sciezka);
    const w = await otworz(port2, wejscie({ buduj: () => { throw new Error('wznowienie nie buduje nowego zestawu'); } }));
    expect(w.id).toBe(s.id);
    expect(w.items.map((i) => [i.drillId, i.prompt])).toEqual(s.items.map((i) => [i.drillId, i.prompt]));
    expect(w.odpowiedzi.map((o) => [o.grade, o.elapsedMs])).toEqual([['correct', 1500], ['wrong', 1500]]);
    expect(w.aktywnosc.krok).toBe(2);
    expect(db.prepare('SELECT count(*) AS n FROM aktywnosc').get()).toEqual({ n: 1 });
  });
  it('test modułu: ostatnia odpowiedź zapisuje wynik_testu; zaliczenie progiem KONFIGURACJA.TEST_MODULU_PROG', async () => {
    const { port, db } = await portTestowy();
    let s = await otworz(port, wejscie({ rodzaj: 'test_modulu', trescId: 'm1' }));
    for (let k = 0; k < 3; k++) s = (await odpowiedz(port, s, k < 2 ? dobra(s, k) : { kind: 'choice', index: 1 - (dobra(s, k) as { index: number }).index })).sesja;
    expect(db.prepare('SELECT modul_id, poprawne, wszystkie, zaliczony FROM wynik_testu').get()).toEqual({
      modul_id: 'm1', poprawne: 2, wszystkie: 3, zaliczony: 2 / 3 >= KONFIGURACJA.TEST_MODULU_PROG ? 1 : 0,
    });
  });
  it('pusty zestaw (np. brak powtórek) → null, nic nie zapisane', async () => {
    const { port, db } = await portTestowy();
    expect(await otworzSesje(port, wejscie({ rodzaj: 'powtorki', trescId: null, buduj: () => [] }))).toEqual({ ok: true, wartosc: null });
    expect(db.prepare('SELECT count(*) AS n FROM aktywnosc').get()).toEqual({ n: 0 });
  });
  it('lekcja w toku, ale treść zmieniona (zadanie zniknęło) → stara porzucona, nowa z nowym zestawem', async () => {
    const { port, db } = await portTestowy();
    const s = await otworz(port);
    await odpowiedz(port, s, dobra(s, 0));
    const zmieniona = new Map(MAPA); zmieniona.delete('c2');
    const rows2 = ROWS.filter((r) => r.id !== 'c2');
    const w = await otworz(port, wejscie({ wiersz: (id) => zmieniona.get(id), buduj: () => buildLessonSession(rows2, createRng(6)) }));
    expect(w.id).not.toBe(s.id);
    expect(w.items).toHaveLength(2);
    expect(db.prepare('SELECT id, stan FROM aktywnosc ORDER BY start_ms, id').all()).toEqual([{ id: s.id, stan: 'porzucona' }, { id: w.id, stan: 'w_toku' }]);
  });
  it('inna lekcja w toku → porzucona przy starcie tej (moduly.md `porzuc`)', async () => {
    const { port, db } = await portTestowy();
    const s = await otworz(port);
    const w = await otworz(port, wejscie({ trescId: 'l2' }));
    expect(db.prepare('SELECT id, stan FROM aktywnosc ORDER BY id').all()).toEqual([{ id: s.id, stan: 'porzucona' }, { id: w.id, stan: 'w_toku' }]);
  });
  it('podwójne dotknięcie (odpowiedź na krok już zapisany) → krok_niezgodny, bez drugiego zapisu', async () => {
    const { port, db } = await portTestowy();
    const s = await otworz(port);
    await odpowiedz(port, s, dobra(s, 0));
    const w = await odpowiedzWSesji(port, { ...s, aktywnosc: { ...s.aktywnosc, krok: 1 } }, { answer: dobra(s, 0), grade: 'correct', elapsedMs: 1 }, T0);
    expect(w).toEqual({ ok: false, powod: 'krok_niezgodny' });
    expect(db.prepare('SELECT count(*) AS n FROM odpowiedz').get()).toEqual({ n: 1 });
  });
  it('błąd zapisu → powód, sesja bez zmian (odpowiedź nie liczy się jako dana)', async () => {
    const { port, db } = await portTestowy();
    const s = await otworz(port);
    const zepsuty = { ...port, transakcja: async () => { throw Object.assign(new Error('full'), { errcode: 13 }); } };
    expect(await odpowiedzWSesji(zepsuty, s, { answer: dobra(s, 0), grade: 'correct', elapsedMs: 1 }, T0)).toEqual({ ok: false, powod: 'brak_miejsca' });
    expect(db.prepare('SELECT count(*) AS n FROM odpowiedz').get()).toEqual({ n: 0 });
  });
});
