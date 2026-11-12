// 08-N4 (sesja EF): schemat i bramka budowania punktu list-hand; ekran go obsługuje od FG.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { AKCJE_LISTY_EKRANU, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'list-hand'))[0]!;
const sctx = { ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)), numberKeys: new Set<string>(), moduleIds: new Set(['m4']) };
const kopia = (f: (b: any) => void) => { const b = structuredClone(fx.template) as any; f(b); return ScenarioTemplate.parse(b); };
const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, 'sc-fx-lista.yaml', sctx).join('\n');

describe('08-N4: bramka list-hand', () => {
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('nieznana klasa ręki', () => { expect(blad(kopia((b) => { b.decisions[0].entries[0].hands = ['AAs']; }))).toMatch(/nieznana klasa ręki AAs/); });
  it('klasa w dwóch wpisach', () => { expect(blad(kopia((b) => { b.decisions[0].entries[2].hands = ['AA']; }))).toMatch(/AA.*więcej niż jednym/); });
  it('akcja wpisu bez wyjaśnienia (BR-OCE-002)', () => { expect(blad(kopia((b) => { b.decisions[0].entries[0].correct = 'raise'; }))).toMatch(/raise.*nie ma wyjaśnienia/); });
  it('oczekiwana akcja poziomu, której żaden wpis nie ma jako poprawnej', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['fold']; }))).toMatch(/żaden wpis listy nie ma akcji oczekiwanej fold/); });
  it('ekran obsługuje list-hand (FG: apps/mobile fg-list-hand-ekran.test.tsx), więc bramka ekranu przepuszcza fixture', () => { expect(checkScenarioNaEkran(fx.template)).toEqual([]); });
  it('akcja spoza słownictwa ekranu jest odrzucana przez bramkę ekranu (nazwy akcji list-hand zna tylko słownik scenario.action)', () => {
    expect(checkScenarioNaEkran(kopia((b) => { b.decisions[0].actions[2] = { action: 'squeeze', explanation: 'x' }; })).join('\n')).toMatch(/list-hand: ekran nie nazywa akcji squeeze/);
  });
  it('słownictwo akcji list-hand ekranu: przypięcie (to samo literalnie w apps/mobile AKCJE_LISTY)', () => {
    expect([...AKCJE_LISTY_EKRANU]).toEqual(['fold', 'check', 'call', 'limp', 'raise', '4bet', 'all-in']);
  });
});

describe('08-N4: pojemność list-hand (próg = liczba klas z listy dla akcji oczekiwanej, jak D-1040)', () => {
  it('lista z mniej niż 40 klasami przechodzi kontrolę generatora, a z liczbą odcisków < klas nie', async () => {
    const { checkScenarioGenerator } = await import('../src/scenariusze');
    expect(checkScenarioGenerator(fx.template, undefined, 2000)).toEqual([]);
    expect(checkScenarioGenerator(fx.template, undefined, 2).join('\n')).toMatch(/pojemność/);
  });
});
