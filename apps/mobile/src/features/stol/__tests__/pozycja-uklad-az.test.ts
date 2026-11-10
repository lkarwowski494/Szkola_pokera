/// <reference types="jest" />
// KO-028 (sesja AZ), układ: linia pozycji to zwykły <Text> bez numberOfLines (Stol.tsx), więc się nie ucina, tylko zawija na
// granicy słów. Oszacowanie dla 320 pt: kolumna 320 − 2 × 16 pt marginesu, rozmiar treści 17 pt (tokeny: `tresc`), szerokość
// znaku ≤ 0,62 em (górna granica kroju systemowego). Nowa linia nie wprowadza słowa dłuższego niż mieści wiersz przy największym tekście systemu (ok. 312%) ani niż najdłuższe
// w dotychczasowej linii („(position):”), więc zawija się nie gorzej niż dziś.
import '@/i18n';
import i18n from 'i18next';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { KOLEJNOSC, opisKart } from '@/features/stol/uklad';
import { SLOWNIKI } from '@/i18n/slowniki';

const KOLUMNA_PT = 320 - 2 * 16;
const ROZMIAR_PT = 17;
const SZEROKOSC_ZNAKU_EM = 0.62;
const BEZ_SPACJI = ['ja', 'zh-Hant']; // pismo bez spacji: zawija się między znakami, więc słowa nie ma
const wiersze = (dl: number, mnoznik: number) => Math.ceil(dl / Math.floor(KOLUMNA_PT / (ROZMIAR_PT * mnoznik * SZEROKOSC_ZNAKU_EM)));
const najdluzszeSlowo = (s: string) => Math.max(...s.split(/\s+/).map((w) => w.length));

describe('KO-028: linia pozycji przy 320 pt', () => {
  it('Stol.tsx: tekst bez przebiegu (wiersz pozycji) nie ma numberOfLines', () => {
    const src = readFileSync(join(__dirname, '../../../components/Stol.tsx'), 'utf8').split('\n');
    const i = src.findIndex((l) => l.includes('return tekstKart ?'));
    expect(i).toBeGreaterThan(-1);
    expect(src[i]).not.toMatch(/numberOfLines/);
  });

  it('najdłuższa linia: do 3 wierszy przy domyślnym tekście, a nowe słowa mieszczą się w wierszu największego tekstu albo nie są dłuższe niż dotychczasowe', () => {
    const lista = Object.keys(SLOWNIKI).flatMap((j) =>
      KOLEJNOSC.map((p) => ({ j, p, nowa: opisKart({ position: p }, i18n.getFixedT(j)), stara: i18n.getFixedT(j)('table.yourPosition', { pos: p }) })),
    );
    const najdluzsza = lista.reduce((a, b) => (b.nowa.length > a.nowa.length ? b : a));
    console.info(
      `najdłuższa linia ${najdluzsza.j}/${najdluzsza.p}: ${najdluzsza.nowa.length} zn. „${najdluzsza.nowa}” → wierszy: ${wiersze(najdluzsza.nowa.length, 1)} (100%), ${wiersze(najdluzsza.nowa.length, 3.12)} (największy tekst systemu, ok. 312%)`,
    );
    expect(wiersze(najdluzsza.nowa.length, 1)).toBeLessThanOrEqual(3);
    for (const l of lista.filter((x) => !BEZ_SPACJI.includes(x.j))) {
      expect([l.j, l.p, najdluzszeSlowo(l.nowa) <= Math.max(najdluzszeSlowo(l.stara), Math.floor(KOLUMNA_PT / (ROZMIAR_PT * 3.12 * SZEROKOSC_ZNAKU_EM)))]).toEqual([l.j, l.p, true]);
    }
  });
});
