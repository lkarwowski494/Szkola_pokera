import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
import { formatPolishDate, HelplinesFile, selectHelplines, telUri } from '@szkola/content-schema';
import { findBrandNames } from '../src/brands';
import { compileContent } from '../src/build';
import { displayHost, expandHelplines, helplinesMarkdown, helplinesModuleSource, loadHelplines } from '../src/helplines';

const root = resolve(import.meta.dirname, '../../..');
const file = HelplinesFile.parse(parseYaml(readFileSync(join(root, 'content/helplines.yaml'), 'utf8')));
const h = loadHelplines(file);

/** Numery (główny i dodatkowe) wpisów danego rodzaju w wyniku selectHelplines. */
const phones = (sel: ReturnType<typeof selectHelplines>, kind: string) =>
  sel.entries.filter((e) => e.kind === kind).flatMap((e) => [e.phone, ...(e.phone_alt ?? []).map((a) => a.phone)].filter(Boolean));

describe('telefony pomocy (helplines.yaml): rynki aplikacji (D-142, e1-pomoc.md §6)', () => {
  it('ma 9 rynków i pomoc międzynarodową; każdy wpis ma twierdzenie z rejestru i przeczytane źródło (https i cytat)', () => {
    expect([...new Set(h.entries.map((e) => e.country))].sort()).toEqual(['*', 'BR', 'CA', 'DE', 'FR', 'GB', 'JP', 'TW', 'US', 'VN']);
    for (const e of h.entries) {
      expect(e.claim).toMatch(/^H-[A-Z]+-\d+$/);
      expect(e.sources.length).toBeGreaterThan(0);
      for (const s of e.sources) expect(s.url).toMatch(/^https:\/\//);
    }
    // bez wpisów polskich (brak storefrontu PL) i bez twierdzeń otwartych (Nowa Szkocja, terytoria, linie TW/VN)
    expect(h.entries.some((e) => e.country === 'PL')).toBe(false);
    expect(h.entries.map((e) => e.claim)).not.toEqual(expect.arrayContaining(['H-CA-10']));
    for (const c of ['H-CA-10', 'H-CA-14', 'H-TW-1', 'H-VN-1', 'H-VN-2']) expect(h.entries.map((e) => e.claim)).not.toContain(c);
    expect(h.checkedText).toBe('Dane sprawdzone: 4 listopada 2026');
  });

  it('decyzje D-150: FR 8.00–23.00, US „bez opłat za usługę” (nie „bezpłatnie”), Irlandia Płn. bez linku do dunlewey.net', () => {
    const fr = h.entries.find((e) => e.id === 'fr-jis')!;
    expect(fr.hours).toBe('codziennie 8.00–23.00');
    const us = h.entries.find((e) => e.id === 'us-ncpg')!;
    expect(us.cost).toMatch(/^bez opłat za usługę/);
    expect(JSON.stringify(h.entries)).not.toMatch(/dunlewey\.net/);
    // Gambling Therapy: źródło nie podaje strefy czasowej ani „free”
    const gt = h.entries.find((e) => e.id === 'int-gambling-therapy')!;
    expect(gt.hours).toBeUndefined();
    expect(gt.cost).toBeUndefined();
  });

  it('wektory RD-12 (e1-pomoc.md §7): kraj i region wybierają numery', () => {
    const us = selectHelplines(h, 'US');
    expect(phones(us, 'gambling')).toEqual(['1-800-697-3738']);
    expect(us.entries.find((e) => e.kind === 'gambling')!.vanity).toBe('1-800-MY-RESET');
    expect(phones(us, 'crisis')).toEqual(['988']);
    expect(phones(us, 'emergency')).toEqual(['911']);
    expect(us.regions).toEqual([]);
    expect(us.fallbackText).toBeUndefined();

    // D-152: bez regionu numer ogólnokrajowy i lista regionów z własnymi numerami
    const gb = selectHelplines(h, 'GB');
    expect(phones(gb, 'gambling')).toEqual(['0808 8020 133']);
    expect(phones(gb, 'crisis')).toEqual(['116 123']);
    expect(phones(gb, 'emergency')).toEqual(['999']);
    expect(gb.regions.map((r) => r.code)).toEqual(['GB-ENG', 'GB-SCT', 'GB-WLS', 'GB-NIR']);
    expect(phones(selectHelplines(h, 'GB', 'GB-ENG'), 'gambling')).toEqual(['0808 8020 133']);
    expect(phones(selectHelplines(h, 'GB', 'GB-WLS'), 'gambling')).toEqual(['0808 281 9265']);
    const nir = selectHelplines(h, 'GB', 'GB-NIR');
    expect(phones(nir, 'gambling')).toEqual(['0808 8020 133', '08000 886 725']);
    expect(phones(nir, 'crisis')).toEqual(['116 123', '0808 808 8000']);
    expect(phones(selectHelplines(h, 'GB', 'GB-SCT'), 'crisis')).toEqual(['116 123', '111']);

    const ca = selectHelplines(h, 'CA');
    expect(phones(ca, 'gambling')).toEqual([]);
    expect(phones(ca, 'crisis')).toEqual(['9-8-8']);
    expect(phones(ca, 'emergency')).toEqual(['9-1-1']);
    expect(ca.regions).toHaveLength(13);
    const prov: [string, string[]][] = [
      ['CA-ON', ['1-866-531-2600']],
      ['CA-BC', ['1-888-795-6111']],
      ['CA-QC', ['1 800 461-0140', '514 527-0140']],
      ['CA-AB', ['1-866-332-2322']],
      ['CA-SK', ['1-800-306-6789']],
      ['CA-MB', ['1-800-463-1554']],
      ['CA-NB', ['1-866-355-5550']],
      ['CA-NS', []],
      ['CA-PE', ['1-855-255-4255']],
      ['CA-NL', ['811']],
      ['CA-NU', []],
    ];
    for (const [r, g] of prov) expect([r, phones(selectHelplines(h, 'CA', r), 'gambling')]).toEqual([r, g]);
    expect(phones(selectHelplines(h, 'CA', 'CA-NS'), 'crisis')).toEqual(['9-8-8', '1-888-429-8167']);
    expect(phones(selectHelplines(h, 'CA', 'CA-NU'), 'emergency')).toEqual(['9-1-1']);

    const jp = selectHelplines(h, 'JP');
    expect(phones(jp, 'gambling')).toEqual([]);
    expect(jp.entries.find((e) => e.kind === 'gambling')!.links![0]!.url).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
    expect(phones(jp, 'crisis')).toEqual(['0120-061-338', '0120-279-338']);
    expect(phones(jp, 'emergency')).toEqual(['119']);
    const br = selectHelplines(h, 'BR');
    expect(phones(br, 'gambling')).toEqual([]);
    expect(phones(br, 'crisis')).toEqual(['188']);
    expect(phones(br, 'emergency')).toEqual(['192']);
    const fr = selectHelplines(h, 'FR');
    expect(phones(fr, 'gambling')).toEqual(['09 74 75 13 13']);
    expect(phones(fr, 'crisis')).toEqual(['3114']);
    expect(phones(fr, 'emergency')).toEqual(['15', '112']);
    // D-151: TW 1925 i ośrodki, VN numer alarmowy; bez linii hazardowej
    const tw = selectHelplines(h, 'TW');
    expect(phones(tw, 'gambling')).toEqual([]);
    expect(phones(tw, 'crisis')).toEqual(['1925']);
    expect(tw.entries.filter((e) => e.kind === 'support').map((e) => e.id)).toEqual(['tw-centers']);
    expect(phones(tw, 'emergency')).toEqual(['119']);
    const vn = selectHelplines(h, 'VN');
    expect(vn.entries.map((e) => e.kind)).toEqual(['emergency']);
    expect(phones(vn, 'emergency')).toEqual(['113', '115']);
    const de = selectHelplines(h, 'DE');
    expect(phones(de, 'gambling')).toEqual(['0800 1 37 27 00', '0173 29 37 359']);
    expect(phones(de, 'crisis')).toEqual(['0800 111 0 111', '0800 111 0 222', '116 123']);
    expect(phones(de, 'emergency')).toEqual(['112']);

    // pomoc międzynarodowa online: zawsze; kraj bez wpisu (AU, PL): tylko tekst i pomoc online, bez żadnego numeru
    for (const sel of [us, gb, ca, jp, br, fr, tw, vn, de]) expect(sel.online.map((e) => e.id)).toEqual(['int-gambling-therapy']);
    for (const c of ['AU', 'PL']) {
      const none = selectHelplines(h, c);
      expect(none.entries).toEqual([]);
      expect(none.fallbackText).toBe('W zagrożeniu życia dzwoń na lokalny numer alarmowy.');
      expect(none.online.map((e) => e.id)).toEqual(['int-gambling-therapy']);
      expect(none.online.some((e) => e.phone)).toBe(false);
    }
  });

  it('każdy kraj ma numer alarmowy; numer z wpisu hazardowego nie występuje we wpisie kryzysowym tego kraju', () => {
    for (const c of ['US', 'GB', 'CA', 'JP', 'BR', 'FR', 'TW', 'VN', 'DE']) {
      expect([c, h.entries.some((e) => e.country === c && e.kind === 'emergency' && e.phone)]).toEqual([c, true]);
      const sel = h.entries.filter((e) => e.country === c);
      const nums = (k: string) => sel.filter((e) => e.kind === k).flatMap((e) => [e.phone, ...(e.phone_alt ?? []).map((a) => a.phone)]).filter(Boolean);
      for (const n of nums('gambling')) expect(nums('crisis')).not.toContain(n);
    }
  });

  it('pomocnicze: tel: bez spacji i łączników, data po polsku, domena', () => {
    expect(telUri('801 889 880')).toBe('tel:801889880');
    expect(telUri('1-800-697-3738')).toBe('tel:18006973738');
    expect(telUri('9-8-8')).toBe('tel:988');
    expect(formatPolishDate('2026-01-31')).toBe('31 stycznia 2026');
    expect(() => formatPolishDate('2026-13-01')).toThrow();
    expect(displayHost('https://www.gov.pl/web/x')).toBe('gov.pl');
  });

  it('schemat odrzuca wpis bez źródła, adres inny niż https, nieznany rodzaj i region spoza kraju', () => {
    const bad = structuredClone(file);
    bad.entries[0]!.sources = [];
    expect(HelplinesFile.safeParse(bad).success).toBe(false);
    const http = structuredClone(file);
    http.entries[0]!.sources[0]!.url = 'http://www.ncpgambling.org/';
    expect(HelplinesFile.safeParse(http).success).toBe(false);
    const kind = structuredClone(file) as unknown as { entries: { kind: string }[] };
    kind.entries[0]!.kind = 'hotline';
    expect(HelplinesFile.safeParse(kind).success).toBe(false);
    const region = structuredClone(file);
    region.entries.find((e) => e.id === 'gb-wales')!.regions = ['CA-ON'];
    expect(HelplinesFile.safeParse(region).success).toBe(false);
  });

  it('content-build odrzuca link do domeny spoza źródeł wpisu (dunlewey.net), nieznany region, powtórzony numer w kraju i brak numeru alarmowego', () => {
    const link = structuredClone(file);
    link.entries.find((e) => e.id === 'gb-ni-dunlewey')!.links = [{ label: 'Strona', url: 'https://dunlewey.net/' }];
    expect(() => loadHelplines(link)).toThrow(/dunlewey\.net.*spoza źródeł/);
    const reg = structuredClone(file);
    reg.entries.find((e) => e.id === 'ca-on')!.regions = ['CA-XX'];
    expect(() => loadHelplines(reg)).toThrow(/nieznany region CA-XX/);
    const dup = structuredClone(file);
    dup.entries.find((e) => e.id === 'gb-ni-lifeline')!.phone = '116 123';
    expect(() => loadHelplines(dup)).toThrow(/116 123 powtarza się/);
    const noEmergency = structuredClone(file);
    noEmergency.entries = noEmergency.entries.filter((e) => e.id !== 'de-112');
    expect(() => loadHelplines(noEmergency)).toThrow(/DE: brak numeru alarmowego/);
    const online = structuredClone(file);
    online.fallback.online = ['us-ncpg'];
    expect(() => loadHelplines(online)).toThrow(/fallback\.online/);
  });

  it('znacznik {{helplines}} w lekcji: pomoc międzynarodowa i odesłanie do ekranu „Pomoc”, bez numerów jednego kraju', () => {
    const used = { count: 0 };
    const out = expandHelplines('Pomoc:\n\n{{helplines}}\n', h, 'test', used);
    expect(used.count).toBe(1);
    expect(out).toContain('- **Gambling Therapy (Gordon Moody, Wielka Brytania)**.');
    expect(out).toContain('Gambling Therapy: gordonmoody.org.uk.');
    expect(out).toContain('Telefony pomocy dla Twojego kraju znajdziesz w aplikacji, w ekranie „Pomoc”.');
    expect(out).toContain('W zagrożeniu życia dzwoń na lokalny numer alarmowy.');
    expect(out).toContain('Dane sprawdzone: 4 listopada 2026.');
    for (const e of h.entries) if (e.phone) expect(out).not.toContain(e.phone);
  });

  it('numer z pliku wpisany ręcznie w lekcji przerywa budowanie (także zapis bez spacji i łączników); krótkie numery i lata nie', () => {
    const used = { count: 0 };
    expect(() => expandHelplines('Zadzwoń: 0808 8020 133', h, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 08088020133', h, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 1-800-697-3738', h, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 1 800 697 3738', h, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 1-800-MY-RESET', h, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 0800 111 0 222', h, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Patrz {{helplines}} niżej', h, 'test', used)).toThrow(/sam w linii/);
    // numery krótsze niż 5 cyfr (112, 1925, 3114) nie są sprawdzane (lata, liczby rąk); numer w środku dłuższego ciągu cyfr też nie
    expect(() => expandHelplines('W 112 rozdaniach, rok 1925, 3114 rąk, ciąg 1080880201330.', h, 'test', used)).not.toThrow();
  });

  it('lekcja M12-L4 i moduł ekranu „Pomoc” mają te same dane (jedno źródło)', () => {
    const content = compileContent(join(root, 'content'), 'pl');
    const lesson = JSON.stringify(content.lessons.find((l) => l.id === 'm12.l4')!.body);
    const md = helplinesMarkdown(h);
    const src = helplinesModuleSource(content.helplines);
    for (const e of h.entries) {
      for (const v of [e.phone, e.hours, e.cost, e.vanity, e.sms].filter((x): x is string => !!x)) expect(src).toContain(JSON.stringify(v));
    }
    for (const e of h.entries.filter((x) => x.country === '*')) {
      expect(lesson).toContain(e.name);
      expect(md).toContain(e.name);
    }
    expect(lesson).toContain(h.pointer);
    // w module aplikacji nie ma ani jednej nazwy spoza helplines.yaml (bez nazw pokoi, ADR-13; lista marek: src/brands.ts)
    expect(findBrandNames(src)).toEqual([]);
    // pełna kompilacja treści (z pulą egzaminacyjną) przekracza domyślne 5 s na wolniejszej maszynie
  }, 30_000);
});
