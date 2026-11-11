/// <reference types="node" />
// Wspólne dla testów CN (08-programista-001 CM): prawdziwa baza treści pl z macierzą equity dopisaną do kopii (jak robi budowanie,
// game_kit.equity169) i szablony-fikcje testowe jak fixture CA (sc-fx-*), nie treść aplikacji.
import { copyFileSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { ScenarioTemplate } from '@szkola/content-schema';
import type { SQLiteDatabase } from 'expo-sqlite';
import { sciezkaTresciPl } from './trescPl';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');

const tmp = mkdtempSync(join(tmpdir(), 'cn-kontekst-'));
const kopia = join(tmp, 'tresc.db');
copyFileSync(sciezkaTresciPl(), kopia);
const sqlite = new DatabaseSync(kopia);
const equityJson = readFileSync(join(__dirname, '../../../../tools/equity/equity169.json'), 'utf8');
sqlite.prepare("INSERT INTO game_kit (key, value) VALUES ('equity169', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(equityJson);
const dbSurowa = {
  getAllSync: <T,>(q: string, ...p: (string | number)[]) => sqlite.prepare(q).all(...p) as T[],
  getFirstSync: <T,>(q: string, ...p: (string | number)[]) => (sqlite.prepare(q).get(...p) as T | undefined) ?? null,
};
/** Dokładnie to, czego używa `getKontekstGeneratora` (odczyt synchroniczny z bazy treści). */
export const dbCn = dbSurowa as unknown as Pick<SQLiteDatabase, 'getAllSync' | 'getFirstSync'>;

const znaczniki = (zdanie: string) => `Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}. ${zdanie}`;
const akcje = (...a: string[]) => a.map((action) => ({ action, explanation: znaczniki(`Wyjaśnienie akcji ${action}.`) }));
const podstawa = { module: 'm5', situation: '-', table: '6max' as const, stackBb: 100 };

export const CBET = {
  ...podstawa, id: 'sc-cn-cbet', positions: { hero: 'BTN', villain: 'BB' }, levels: ['latwy'],
  bounds: { latwy: { flop: { height: ['high'], suits: ['rainbow'], ranks: ['disconnected'], wetness: ['dry'] }, holding: ['air'], expected: ['bet-small'], draws: [], reject: [] } },
  decisions: [{ street: 'flop', kind: 'cbet-case', rule: 'R-M5-007', actions: akcje('bet-small', 'check', 'bet-big') }],
} as unknown as ScenarioTemplate;
export const TROJBET = {
  ...podstawa, module: 'm4', id: 'sc-cn-3bet', positions: { hero: 'BTN', villain: 'CO' }, levels: ['latwy'],
  bounds: { latwy: { expected: ['raise'], draws: [], reject: [] } },
  decisions: [{ street: 'preflop', kind: 'size-spot', check: 'three-bet-size', rule: 'R-M4-001', openBb: 2.5, actions: akcje('raise', 'raise-small', 'raise-big') }],
} as unknown as ScenarioTemplate;
export const BEZ_LIMPU = {
  ...podstawa, module: 'm3', id: 'sc-cn-nolimp', positions: { hero: 'SB', villain: 'BB' }, levels: ['latwy'],
  bounds: { latwy: { expected: ['raise'], draws: [], reject: [] } },
  decisions: [{ street: 'preflop', kind: 'size-spot', check: 'no-limp', rule: 'R-M3-004', sb: true, actions: akcje('raise', 'limp') }],
} as unknown as ScenarioTemplate;
export const ICM = {
  ...podstawa, module: 'm11', id: 'sc-cn-icm', positions: { hero: 'BB', villain: 'SB' }, stackBb: 10, levels: ['latwy', 'sredni', 'trudny'],
  bounds: {
    latwy: { marginMin: 0.1, expected: ['fold'], draws: [], reject: [] },
    sredni: { marginMin: 0.05, marginMax: 0.15, expected: ['call'], draws: [], reject: [] },
    trudny: { marginMin: 0.01, marginMax: 0.1, chipsDiffer: true, expected: ['fold'], draws: [], reject: [] },
  },
  decisions: [{ street: 'preflop', kind: 'icm-call', spot: 'push.sb-10', rule: 'R-M11-009', actions: akcje('fold', 'call') }],
} as unknown as ScenarioTemplate;

