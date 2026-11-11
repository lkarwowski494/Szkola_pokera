/// <reference types="jest" />
// CN (NIS-004 CM, D-787): wznowienie rozdania po aktualizacji treści. Plan zapisuje odcisk wariantu; gdy ten sam szablon i ziarno dają dziś inne
// karty albo pulę (zmiana `pots` przy tej samej liczbie decyzji), wznowienie nie podkłada ich pod zapisane odpowiedzi: zaczyna nowe rozdanie.
import type { ScenarioTemplate } from '@szkola/content-schema';
import { generateVariant } from '@szkola/poker-core';
import { aktywnoscWToku, odpowiedziAktywnosci } from '@szkola/postep';
import { utworzZegar } from '@/platform/zegar';
import { portTestowy } from '@/test-utils/postepTestowy';
import { SC01 } from '@/test-utils/szablonSc01';
import { odpowiedzWScenariuszu, otworzScenariusz, type WejscieScenariusza } from '../aktywnoscScenariusza';
import { naGenerator, odciskWariantu } from '../wariant';

const T0 = Date.UTC(2026, 10, 11, 10);
let n = 0;
// ziarno 1000: warunek wstępny pierwszego testu (te same karty przy innych pulach) zależy od ziarna; od CS WYS-003 (nadkarty) ziarno 1234 go nie spełnia, 1000 tak
const wejscie = (o: Partial<WejscieScenariusza>): WejscieScenariusza => ({
  szablon: SC01, poziom: 'sredni', tryb: 'nowe', limit: { bezLimitu: true }, ziarno: 1000, sesja: new Set(),
  zegar: utworzZegar({ kalendarz: () => 'Europe/Warsaw', intl: () => null }, () => T0), noweId: () => `w${++n}`, ...o,
});
const ok = <T,>(w: { ok: true; wartosc: T } | { ok: false; powod: string }): T => {
  if (!w.ok) throw new Error(`oczekiwano ok, jest ${w.powod}`);
  return w.wartosc;
};
// ta sama liczba decyzji i granice, inne pule pierwszej decyzji (aktualizacja treści szablonu)
const ZMIENIONY: ScenarioTemplate = { ...SC01, decisions: SC01.decisions.map((d, i) => (i === 0 && d.kind === 'draw-call' ? { ...d, pots: [40, 44, 48, 52] } : d)) as ScenarioTemplate['decisions'] };

describe('wznowienie po zmianie szablonu (NIS-004)', () => {
  it('warunek wstępny: zmieniona pula daje z tego samego ziarna te same karty (fingerprint generatora równy), ale inną treść wariantu (odcisk planu inny)', async () => {
    const { port } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie({})));
    const inny = generateVariant(naGenerator(ZMIENIONY), 'sredni', s.wariant.seed);
    expect(inny.fingerprint).toBe(s.wariant.fingerprint);
    expect(odciskWariantu(inny)).not.toBe(odciskWariantu(s.wariant));
    expect(odciskWariantu(s.wariant)).toBe(odciskWariantu(generateVariant(naGenerator(SC01), 'sredni', s.wariant.seed))); // deterministyczny
  });
  it('ten sam szablon: wznowienie bez zmian (ten sam wariant i odpowiedzi)', async () => {
    const { port, sciezka } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie({})));
    ok(await odpowiedzWScenariuszu(port, s, 'call', 900, T0 + 5));
    const { port: port2 } = await portTestowy(sciezka);
    const w = ok(await otworzScenariusz(port2, wejscie({})));
    expect(w.id).toBe(s.id);
    expect(w.wybory).toEqual(['call']);
  });
  it('zmieniony szablon: nowe rozdanie (inne id i wariant), stara aktywność porzucona z zachowanymi odpowiedziami', async () => {
    const { port, sciezka } = await portTestowy();
    const s = ok(await otworzScenariusz(port, wejscie({})));
    ok(await odpowiedzWScenariuszu(port, s, 'call', 900, T0 + 5));
    const { port: port2 } = await portTestowy(sciezka);
    const w = ok(await otworzScenariusz(port2, wejscie({ szablon: ZMIENIONY })));
    expect(w.id).not.toBe(s.id);
    expect(w.wybory).toEqual([]);
    expect(w.aktywnosc.plan.wariant?.odcisk).toBe(odciskWariantu(w.wariant));
    const wToku = ok(await aktywnoscWToku(port2, 'scenariusz'));
    expect(wToku?.id).toBe(w.id);
    expect(ok(await odpowiedziAktywnosci(port2, s.id)).map((o) => o.krok)).toEqual([0]); // odpowiedzi zostają (porzucenie nie kasuje)
  });
});
