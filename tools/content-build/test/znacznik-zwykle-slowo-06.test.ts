// Rola 06 (D-376): znacznik terminu {{t:…}} na słowie użytym w zwykłym sensie (16 miejsc z drugiego przeglądu en,
// docs/lokalizacja/dowody/przeglad-en-2026-11-09/rozstrzygniecia.md, „Błędy źródła pl dla roli 06”).
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { znacznikiZwyklegoSlowa } from '../src/znaczniki';

const pl = join(resolve(import.meta.dirname, '../../..'), 'content', 'pl');
const pliki = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? pliki(join(dir, d.name)) : /\.(md|ya?ml)$/.test(d.name) ? [join(dir, d.name)] : []));

describe('znacznik terminu na zwykłym słowie (D-376)', () => {
  it('content/pl nie ma znacznika na zwykłym słowie', () => {
    const bledy = pliki(pl).flatMap((f) =>
      readFileSync(f, 'utf8')
        .split('\n')
        .flatMap((linia, i) => znacznikiZwyklegoSlowa(linia).map((e) => `${f.slice(pl.length + 1)}:${i + 1} ${e}`)),
    );
    expect(bledy).toEqual([]);
  });

  it.each([
    ['Jaki plan {{t:fold|pasuje}}?'],
    ['{{t:fold|Pasuje}} {{t:spr}} {{n:geo.half.spr}}.'],
    ['Betuję, żeby {{t:call|sprawdzić}}, gdzie stoję'],
    ['tylko {{t:call|sprawdzasz}} decyzje w przegranych rozdaniach'],
    ['Na turnie plan {{t:call|sprawdzasz}} na nowo'],
    ['nic nie musisz {{t:call|sprawdzać}}'],
    ['Trenerzy {{t:bet|stawiają}} tę granicę przy fold to 3-bet'],
    ['wolisz wejść all-in, niż {{t:check|czekać}}, aż ktoś inny'],
    ['Turn to {{t:three-of-a-kind}}.'],
    ['ma za sobą cały {{t:board}}.'],
    ['Ten sam {{t:board}} (40, 30, 30).'],
    ['a resztę {{t:pot|puli}} dostaje za 2. miejsce'],
    ['czyli same {{t:top-pair|najwyższe pary}} i AKs.'],
  ])('łapie zwykły sens: %s', (t) => {
    expect(znacznikiZwyklegoSlowa(t)).not.toEqual([]);
  });

  it.each([
    ['Rywal {{t:fold|pasuje}} częściej niż {{t:alpha}}.'],
    ['Ręka, która czasem {{t:call|sprawdza}}, a czasem {{t:fold|pasuje}}?'],
    ['ale właśnie dlatego, że ty musisz {{t:call|sprawdzać}} ciasno'],
    ['Gracz, który {{t:call|sprawdzał}} dwie {{t:street|ulice}}'],
    ['Nie: duży bet {{t:bet|stawiają}} też najsilniejsze ręce.'],
    ['{{t:check|Czekam}} i oddaję {{t:pot|pulę}}'],
    ['Na turnie masz {{t:three-of-a-kind|trójkę}}.'],
    ['{{t:board}} K72 jest suchy.'],
    ['wiele {{t:top-pair|najwyższych par}} wygodnie zebrało trzy ulice'],
    ['Na turnie {{t:call|sprawdzasz}}, gdy masz equity.'],
    ['Masz {{t:top-pair|najwyższą parę}} i atakujesz.'],
    ['Ten sam {{t:board}}, ale masz inną rękę.'],
    ['{{t:check|Czekasz}}, aż rywal zbetuje, i podbijasz.'],
  ])('przepuszcza termin w sensie pokerowym: %s', (t) => {
    expect(znacznikiZwyklegoSlowa(t)).toEqual([]);
  });
});
