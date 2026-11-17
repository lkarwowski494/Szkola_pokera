// IO (IM-001, KO-121): znaczniki {{w:rozmiar}} (SC-27) i {{w:vpip}} (SC-30) niosą procent sformatowany w języku aplikacji (znak % w wartości),
// bo treść pisze „ok. {{w:rozmiar}} puli” bez „%” (12 języków). Wcześniej: „ok. 75 puli”.
import fs from 'node:fs';
import path from 'node:path';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { fillVariantMarkers, type ScenarioVariant } from '@szkola/poker-core';
import i18n from '@/i18n';
import { wartosciZnacznikow } from '../wariant';

// Zapis na sztywno (klucz `drill.format.percent`, KO-122: ta sama konwencja co zadania): de i fr „75 %”, reszta „75%”.
const OCZEKIWANE = { pl: '75%', en: '75%', de: '75 %', es: '75%', fr: '75 %', it: '75%', ja: '75%', ko: '75%', pt: '75%', 'pt-BR': '75%', vi: '75%', 'zh-Hant': '75%' } as const;
const JEZYKI = Object.keys(OCZEKIWANE) as (keyof typeof OCZEKIWANE)[];
const TRESC = path.resolve(__dirname, '../../../../../../content');
const szablon = { positions: { hero: 'BB', villain: 'BTN' } } as unknown as ScenarioTemplate;
const t = (k: string) => k;
const wariant = (point: unknown): ScenarioVariant => ({ hero: ['As', 'Kd'], board: ['2c', '7h', 'Td'], points: [point] }) as unknown as ScenarioVariant;
const geo = wariant({ point: 'geo-size', street: 'flop', pot: 20, stack: 42, spr: 2.1, streets: 3, fractionBig: 0.75, fractionSmall: 1 / 3, smallTotal: 60, correct: 'bet-big' });
const nit = wariant({ point: 'nit-3bet', vpip: 0.08 });

/** Wyjaśnienia akcji SC-27 z prawdziwego pliku treści języka (bez parsera YAML: wiersze `action:` i `explanation:` w tej kolejności). */
const wyjasnienia = (j: string): Record<string, string> => {
  const tekst = fs.readFileSync(path.join(TRESC, j, 'scenarios', 'sc-27.yaml'), 'utf8');
  const wynik: Record<string, string> = {};
  for (const m of tekst.matchAll(/- action: (bet-big|bet-small)\n\s+explanation: "((?:[^"\\]|\\.)*)"/g)) wynik[m[1]!] = m[2]!;
  return wynik;
};

describe('IO: {{w:rozmiar}} i {{w:vpip}} z procentem w języku aplikacji', () => {
  const jezykPrzed = i18n.language;
  afterAll(async () => { await i18n.changeLanguage(jezykPrzed); });
  for (const j of JEZYKI) {
    it(`${j}: SC-27 bet-big i bet-small po wypełnieniu znaczników zawierają „75%” w zapisie języka`, async () => {
      await i18n.changeLanguage(j);
      const w = wyjasnienia(j);
      expect(Object.keys(w).sort()).toEqual(['bet-big', 'bet-small'].filter((a) => w[a] !== undefined).sort());
      const oczekiwane = OCZEKIWANE[j];
            for (const akcja of ['bet-big', 'bet-small']) {
        const tekst = w[akcja]!;
        if (!tekst.includes('{{w:rozmiar}}')) continue; // bet-small nie zawsze podaje rozmiar: sprawdzamy tylko gdy znacznik jest
        expect(fillVariantMarkers(tekst, wartosciZnacznikow(geo, szablon, 0, t))).toContain(oczekiwane);
      }
      expect(w['bet-big']).toContain('{{w:rozmiar}}'); // bet-big zawsze używa znacznika: test nie przechodzi „na pusto”
    });
  }
  it('vpip (SC-30): wartość z procentem, zapis jak zadania (pl „8%”, de „8 %”)', async () => {
    for (const [j, o] of [['pl', '8%'], ['de', '8 %']] as const) {
      await i18n.changeLanguage(j);
      expect(wartosciZnacznikow(nit, szablon, 0, t).vpip).toBe(o);
    }
  });
});
