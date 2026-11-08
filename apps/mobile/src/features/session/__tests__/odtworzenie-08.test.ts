/// <reference types="jest" />
// D-248 (rola 08 cz. 5): zestaw zadań odtwarzany z planu aktywności — wznowienie pokazuje te same zadania (BR-CWI-004, flow 06).
import type { Drill } from '@szkola/content-schema';
import { createRng } from '@szkola/poker-core';
import type { DrillRow } from '@/data/content/repo';
import { buildExamSession, buildFamilySession, buildLessonSession, odtworzZestaw, zadaniaZestawu } from '@/features/session/build';
import type { DrillInstance } from '@/features/drills/types';

const gen = (id: string, family: string, generator: string, count = 3, params: Record<string, string> = {}): Drill =>
  ({ kind: 'generated', id, family, rules: [], generator, params, count }) as unknown as Drill;
const choice = (id: string, family: string): Drill =>
  ({ kind: 'choice', id, family, rules: [], prompt: 'P', options: [{ text: 'A', correct: true, why: 'a' }, { text: 'B', correct: false, why: 'b' }, { text: 'C', correct: false, why: 'c' }] }) as unknown as Drill;
const row = (d: Drill, lessonId: string | null = 'l1'): DrillRow => ({ id: d.id, lessonId, family: d.family, drill: d });

const LEKCJA: DrillRow[] = [row(choice('c1', 'fa')), row(gen('g1', 'fb', 'potOdds', 3)), row(gen('v1', 'fc', 'vocab', 4, { area: 'hands', dir: 'both' })), row(choice('c2', 'fa'))];
const mapa = new Map(LEKCJA.map((r) => [r.id, r]));
// Porównanie bez klucza (klucz nadaje odtworzenie według pozycji) — treść, opcje, odpowiedź, stół.
const bezKlucza = (xs: readonly DrillInstance[]) => xs.map(({ key: _k, ...r }) => r);

describe('D-248 odtworzenie zestawu z planu', () => {
  it('lekcja: plan ma tyle zadań, ile kroków; odtworzenie daje te same zadania (także generowane i serię słownictwa)', () => {
    const items = buildLessonSession(LEKCJA, createRng(7));
    const plan = zadaniaZestawu(items);
    expect(plan).toHaveLength(items.length);
    expect(plan.map((z) => z.id)).toEqual(items.map((i) => i.drillId));
    expect(plan.every((z) => Number.isInteger(z.ziarno))).toBe(true);
    const znow = odtworzZestaw(plan, (id) => mapa.get(id));
    expect(znow && bezKlucza(znow)).toEqual(bezKlucza(items));
  });
  it('powtórki i egzamin: odtworzenie daje te same zadania', () => {
    const rows = ['a', 'b', 'c'].map((f) => row(gen(`d.${f}`, f, 'potOdds')));
    const m = new Map(rows.map((r) => [r.id, r]));
    const powt = buildFamilySession(rows, ['a', 'b', 'c'], createRng(3), 2);
    expect(bezKlucza(odtworzZestaw(zadaniaZestawu(powt), (id) => m.get(id)) ?? [])).toEqual(bezKlucza(powt));
    const egz = buildExamSession({ modulePool: [], moduleLessons: rows, earlierPool: [], earlierLessons: [] }, createRng(4), undefined, 6);
    expect(bezKlucza(odtworzZestaw(zadaniaZestawu(egz), (id) => m.get(id)) ?? [])).toEqual(bezKlucza(egz));
  });
  it('klucze odtworzonych zadań są unikalne', () => {
    const znow = odtworzZestaw(zadaniaZestawu(buildLessonSession(LEKCJA, createRng(7))), (id) => mapa.get(id)) ?? [];
    expect(new Set(znow.map((i) => i.key)).size).toBe(znow.length);
  });
  it('zadania, którego nie ma już w treści → null', () => {
    const plan = zadaniaZestawu(buildLessonSession(LEKCJA, createRng(7)));
    expect(odtworzZestaw(plan, (id) => (id === 'g1' ? undefined : mapa.get(id)))).toBeNull();
  });
});
