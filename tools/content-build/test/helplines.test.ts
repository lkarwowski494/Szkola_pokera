import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
import { formatPolishDate, type HelplineSelection, HelplinesFile, selectHelplines, telUri } from '@szkola/content-schema';
import { findBrandNames } from '../src/brands';
import { compileContent } from '../src/build';
import { displayHost, expandHelplines, helplinesMarkdown, helplinesModuleSource, loadHelplines } from '../src/helplines';

const root = resolve(import.meta.dirname, '../../..');
const file = HelplinesFile.parse(parseYaml(readFileSync(join(root, 'content/helplines.yaml'), 'utf8')));
const h = loadHelplines(file);

/** Numery (główny i dodatkowe) wpisów danego rodzaju w wyniku selectHelplines. */
const phones = (sel: HelplineSelection, kind: string) =>
  sel.entries.filter((e) => e.kind === kind).flatMap((e) => [e.phone, ...(e.phone_alt ?? []).map((a) => a.phone)].filter(Boolean));

/**
 * Wpisy syntetyczne do testów mechaniki (schemat, kontrole loadHelplines, wybór kraju i regionu). Od D-158 plik treści
 * nie ma numerów krajowych, ale kod ekranu „Pomoc” jeszcze je obsługuje (uproszczenie: rola 08), więc mechanika ma
 * własne dane testowe, a dane prawdziwe sprawdza osobny blok niżej. Numery i adresy są fikcyjne (example.org).
 */
const src = (id: string) => [{ url: `https://${id}.example.org/`, quote: 'cytat testowy' }];
const fixture: HelplinesFile = HelplinesFile.parse({
  checked: '2026-11-04',
  review_by: '2027-11-04',
  pointer: 'Odesłanie testowe do ekranu „Pomoc”.',
  fallback: { claim: 'H-INT-2', text: 'Tekst testowy bez numeru.', online: ['int-test'] },
  regions_label: 'Regiony testowe',
  regions: { 'GB-ENG': 'Anglia', 'GB-WLS': 'Walia', 'CA-ON': 'Ontario' },
  entries: [
    { id: 'gb-nat', claim: 'H-GB-1', country: 'GB', regions: ['GB-ENG', 'GB-WLS'], national: true, kind: 'gambling', name: 'Linia GB', phone: '0808 0000 001', sources: src('gb-nat') },
    { id: 'gb-wales', claim: 'H-GB-2', country: 'GB', regions: ['GB-WLS'], kind: 'gambling', name: 'Linia Walia', phone: '0808 0000 002', links: [{ label: 'Strona', url: 'https://gb-wales.example.org/x' }], sources: src('gb-wales') },
    { id: 'gb-999', claim: 'H-GB-3', country: 'GB', kind: 'emergency', name: 'Alarm GB', phone: '999', sources: src('gb-999') },
    { id: 'us-line', claim: 'H-US-1', country: 'US', kind: 'gambling', name: 'Linia US', phone: '1-800-000-0001', vanity: '1-800-TEST', sources: src('us-line') },
    { id: 'us-911', claim: 'H-US-2', country: 'US', kind: 'emergency', name: 'Alarm US', phone: '911', sources: src('us-911') },
    { id: 'int-test', claim: 'H-INT-1', country: '*', kind: 'gambling', name: 'Pomoc online', links: [{ label: 'Strona', url: 'https://int-test.example.org/' }], sources: src('int-test') },
  ],
});

describe('telefony pomocy (helplines.yaml): dane po D-158 (bez numerów krajowych)', () => {
  it('tylko pomoc międzynarodowa online i zdanie ogólne z twierdzeniem; każdy wpis ma twierdzenie i przeczytane źródło (https i cytat)', () => {
    expect(h.entries.map((e) => e.id)).toEqual(['int-gambling-therapy']);
    expect(h.entries.some((e) => e.phone || e.phone_alt || e.sms)).toBe(false);
    for (const e of h.entries) {
      expect(e.claim).toMatch(/^H-[A-Z]+-\d+$/);
      expect(e.sources.length).toBeGreaterThan(0);
      for (const s of e.sources) expect(s.url).toMatch(/^https:\/\//);
    }
    expect(h.fallback.claim).toBe('H-INT-2');
    expect(h.fallback.text).toMatch(/lekarzem albo specjalistą zdrowia psychicznego/);
    expect(h.fallback.text).toMatch(/lokalny numer alarmowy/);
    expect(h.fallback.text).not.toMatch(/\d/);
    expect(Object.keys(h.regions)).toEqual([]);
    expect(h.checkedText).toBe('Dane sprawdzone: 4 listopada 2026');
    // Gambling Therapy: źródło nie podaje strefy czasowej ani „free”
    const gt = h.entries[0]!;
    expect(gt.hours).toBeUndefined();
    expect(gt.cost).toBeUndefined();
  });

  it('każdy kraj (także z dawnych rynków D-142) dostaje to samo: zdanie ogólne i Gambling Therapy, bez żadnego numeru', () => {
    for (const c of ['US', 'GB', 'CA', 'JP', 'BR', 'FR', 'TW', 'VN', 'DE', 'AU', 'PL', '']) {
      const sel = selectHelplines(h, c);
      expect([c, sel.entries]).toEqual([c, []]);
      expect(sel.regions).toEqual([]);
      expect(sel.fallbackText).toBe(h.fallback.text);
      expect(sel.online.map((e) => e.id)).toEqual(['int-gambling-therapy']);
      expect(sel.online.some((e) => e.phone)).toBe(false);
    }
  });
});

describe('mechanika pomocy na danych testowych (schemat, kontrole, wybór kraju i regionu)', () => {
  const fh = loadHelplines(fixture);
  it('wybór kraju i regionu: numer ogólnokrajowy bez regionu, regionalny po wyborze, kraj bez wpisu: tekst i pomoc online', () => {
    const us = selectHelplines(fh, 'US');
    expect(phones(us, 'gambling')).toEqual(['1-800-000-0001']);
    expect(phones(us, 'emergency')).toEqual(['911']);
    expect(us.regions).toEqual([]);
    expect(us.fallbackText).toBeUndefined();
    const gb = selectHelplines(fh, 'GB');
    expect(phones(gb, 'gambling')).toEqual(['0808 0000 001']);
    expect(gb.regions.map((r) => r.code)).toEqual(['GB-ENG', 'GB-WLS']);
    expect(phones(selectHelplines(fh, 'GB', 'GB-WLS'), 'gambling')).toEqual(['0808 0000 001', '0808 0000 002']);
    const none = selectHelplines(fh, 'AU');
    expect(none.entries).toEqual([]);
    expect(none.fallbackText).toBe('Tekst testowy bez numeru.');
    for (const sel of [us, gb, none]) expect(sel.online.map((e) => e.id)).toEqual(['int-test']);
  });

  it('każdy kraj ma numer alarmowy', () => {
    for (const c of ['US', 'GB']) expect([c, fh.entries.some((e) => e.country === c && e.kind === 'emergency' && e.phone)]).toEqual([c, true]);
  });

  it('pomocnicze: tel: bez spacji i łączników, data po polsku, domena', () => {
    expect(telUri('801 889 880')).toBe('tel:801889880');
    expect(telUri('1-800-697-3738')).toBe('tel:18006973738');
    expect(telUri('9-8-8')).toBe('tel:988');
    expect(formatPolishDate('2026-01-31')).toBe('31 stycznia 2026');
    expect(() => formatPolishDate('2026-13-01')).toThrow();
    expect(displayHost('https://www.gov.pl/web/x')).toBe('gov.pl');
  });

  it('schemat wymaga twierdzenia dla zdania ogólnego (fallback.claim, D-158)', () => {
    const noClaim = structuredClone(fixture) as unknown as { fallback: { claim?: string } };
    delete noClaim.fallback.claim;
    expect(HelplinesFile.safeParse(noClaim).success).toBe(false);
  });

  it('schemat odrzuca wpis bez źródła, adres inny niż https, nieznany rodzaj i region spoza kraju', () => {
    const bad = structuredClone(fixture);
    bad.entries[0]!.sources = [];
    expect(HelplinesFile.safeParse(bad).success).toBe(false);
    const http = structuredClone(fixture);
    http.entries[0]!.sources[0]!.url = 'http://gb-nat.example.org/';
    expect(HelplinesFile.safeParse(http).success).toBe(false);
    const kind = structuredClone(fixture) as unknown as { entries: { kind: string }[] };
    kind.entries[0]!.kind = 'hotline';
    expect(HelplinesFile.safeParse(kind).success).toBe(false);
    const region = structuredClone(fixture);
    region.entries.find((e) => e.id === 'gb-wales')!.regions = ['CA-ON'];
    expect(HelplinesFile.safeParse(region).success).toBe(false);
  });

  it('content-build odrzuca link do domeny spoza źródeł wpisu (np. domena przekierowująca, D-150), nieznany region, powtórzony numer w kraju i brak numeru alarmowego', () => {
    const link = structuredClone(fixture);
    link.entries.find((e) => e.id === 'gb-wales')!.links = [{ label: 'Strona', url: 'https://dunlewey.net/' }];
    expect(() => loadHelplines(link)).toThrow(/dunlewey\.net.*spoza źródeł/);
    const reg = structuredClone(fixture);
    reg.entries.find((e) => e.id === 'gb-wales')!.regions = ['GB-XX'];
    expect(() => loadHelplines(reg)).toThrow(/nieznany region GB-XX/);
    const dup = structuredClone(fixture);
    dup.entries.find((e) => e.id === 'gb-wales')!.phone = '0808 0000 001';
    expect(() => loadHelplines(dup)).toThrow(/0808 0000 001 powtarza się/);
    const noEmergency = structuredClone(fixture);
    noEmergency.entries = noEmergency.entries.filter((e) => e.id !== 'us-911');
    expect(() => loadHelplines(noEmergency)).toThrow(/US: brak numeru alarmowego/);
    const online = structuredClone(fixture);
    online.fallback.online = ['us-line'];
    expect(() => loadHelplines(online)).toThrow(/fallback\.online/);
  });

  it('znacznik {{helplines}} w lekcji: pomoc międzynarodowa, odesłanie do ekranu „Pomoc” i zdanie ogólne (dane prawdziwe)', () => {
    const used = { count: 0 };
    const out = expandHelplines('Pomoc:\n\n{{helplines}}\n', h, 'test', used);
    expect(used.count).toBe(1);
    expect(out).toContain('- **Gambling Therapy (Gordon Moody)**.');
    expect(out).toContain('Gambling Therapy: gamblingtherapy.org.');
    expect(out).toContain(h.pointer);
    expect(out).toContain(h.fallback.text);
    expect(out).toContain('Dane sprawdzone: 4 listopada 2026.');
    expect(out.replace('4 listopada 2026', '')).not.toMatch(/\d{3}/);
  });

  it('numer z pliku wpisany ręcznie w lekcji przerywa budowanie (także zapis bez spacji i łączników); krótkie numery i lata nie', () => {
    const used = { count: 0 };
    expect(() => expandHelplines('Zadzwoń: 0808 0000 001', fh, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 08080000001', fh, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 1-800-000-0001', fh, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 1 800 000 0001', fh, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 1-800-TEST', fh, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Patrz {{helplines}} niżej', fh, 'test', used)).toThrow(/sam w linii/);
    // numery krótsze niż 5 cyfr (911, 999) nie są sprawdzane (lata, liczby rąk); numer w środku dłuższego ciągu cyfr też nie
    expect(() => expandHelplines('W 911 rozdaniach, rok 1999, ciąg 1080800000011.', fh, 'test', used)).not.toThrow();
  });

  it('lekcja M12-L4 i moduł ekranu „Pomoc” mają te same dane (jedno źródło)', () => {
    const content = compileContent(join(root, 'content'), 'pl', { kontrolaGeneratora: false });
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
    expect(lesson).toContain(h.fallback.text);
    // twierdzenie zdania ogólnego zostaje w repozytorium (jak źródła), nie trafia do aplikacji
    expect(src).not.toContain('H-INT-2');
    expect(src).not.toContain('"sources"');
    // w module aplikacji nie ma ani jednej nazwy spoza helplines.yaml (bez nazw pokoi, ADR-13; lista marek: src/brands.ts)
    expect(findBrandNames(src)).toEqual([]);
    // pełna kompilacja treści (z pulą egzaminacyjną) przekracza domyślne 5 s na wolniejszej maszynie
  }, 30_000);
});

describe('selectHelplines: region spoza kraju i wielkość liter (przegląd E2, 2026-11-04; dane testowe)', () => {
  it('region innego kraju działa jak brak regionu: linia ogólnokrajowa GB nie znika', () => {
    const ids = selectHelplines(fixture, 'GB', 'CA-ON').entries.map((e) => e.id);
    expect(ids).toContain('gb-nat');
    expect(ids).toEqual(selectHelplines(fixture, 'GB').entries.map((e) => e.id));
  });
  it('kod kraju małymi literami daje te same wpisy', () => {
    expect(selectHelplines(fixture, 'us').entries.map((e) => e.id)).toEqual(selectHelplines(fixture, 'US').entries.map((e) => e.id));
    expect(selectHelplines(fixture, 'us').fallbackText).toBeUndefined();
  });
});
