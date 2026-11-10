// K-11 (plan-1.0 §4.1): metadane App Store Connect `store/app-store-metadata.json` w `pnpm run ci` (`test:kontrole`).
// Wzór: Trening `tests/store-metadata.test.ts:33–75` (2e4b0f8, odczyt 2026-11-09) — limity Apple, słowa kluczowe bez powtórzeń i bez słów
// z nazwy i podtytułu, bez marek i kwot. Przeniesione tu ze skryptu sesji M `docs/wydanie/dowody/sprawdz-metadane.py` (dowód
// `metadane-2026-11-09.txt`). Limity i cytaty Apple: `docs/wydanie/sklep.md` §1 (odczyt 2026-11-09). Zgodność opisu z kodem: mapa
// `docs/wydanie/sklep.md` §2 — każdy punkt „•” opisu musi mieć wiersz mapy z miejscem w kodzie (nowy punkt bez wiersza = czerwony test).
// Decyzja: D-334.
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { KONFIGURACJA } from '../../packages/domena/src/konfiguracja';

const repo = (p: string) => new URL(`../../${p}`, import.meta.url);
const czytaj = (p: string) => readFileSync(repo(p), 'utf8');
const json = <T>(p: string) => JSON.parse(czytaj(p)) as T;

type Pola = { name: string; subtitle: string; keywords: string; promotionalText: string; description: string };
const meta = json<{ _aliasy: Record<string, string>; lokalizacje: Record<string, Pola> }>('store/app-store-metadata.json');
const L = meta.lokalizacje;
const pl = json<Record<string, any>>('apps/mobile/src/i18n/locales/pl.json');
const klucz = (k: string): unknown => k.split('.').reduce<any>((o, x) => (o == null ? undefined : o[x]), pl);
const znaki = (s: string) => [...s].length;
const slowa = (s: string) => s.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);

// Nazwy aplikacji konkurencji (2.3.7): pełna nazwa przed dwukropkiem/myślnikiem, co najmniej 2 słowa (jak sprawdz-metadane.py).
// Bez wyłączeń: nasza nazwa to „PokerGym” (D-378); dawne wyłączenie „poker school” (D-309) usunięte w D-391 — w danych konkurencji
// nie ma aplikacji o tej nazwie, a fraza „poker school” w naszych metadanych ma być teraz wychwytywana jak każda inna nazwa.
const konkurencja = json<{ aplikacje: { nazwa: string }[] }>('docs/brd/dane/konkurencja-2026-11-03.json')
  .aplikacje.map((a) => a.nazwa.toLowerCase().split(/[:\-–|]/)[0]!.trim())
  .filter((b) => b.split(/\s+/).length >= 2);
// Marki i nazwy serwisów (sprawdz-metadane.py, lista „zakazane”, część marek).
const MARKI = ['wizard', 'gtow', 'pokerstars', 'ggpoker', 'partypoker', '888', 'wsop', 'winamax', 'upswing', 'run it once', 'pokercoaching', 'flopzilla'];
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const slowo = (s: string) => new RegExp(`(?<![\\p{L}\\p{N}])${esc(s)}(?![\\p{L}\\p{N}])`, 'iu');
const KWOTY = /\d+[.,]\d\d|(?<!\p{L})(zł|PLN|USD|EUR)(?!\p{L})|€|\$|£/u;
// NFR-ZGOD-002: bez obietnicy wygranej i zarobku. Zaprzeczenia („żetonów do wygrania”, „no chips to win”) dozwolone.
const OBIETNICA = /(?<!\p{L})(wygraj|wygrasz|wygrana|wygrywaj|zarobi|zarabia|gwarant|win (more|money|big|real|cash)|guarantee|profit|earn|make money|free trial|for kids|dla dzieci)/iu;

describe('AK-K-11: store/app-store-metadata.json', () => {
  it('AK-K-11-a lokalizacje źródłowe pl i en-US; aliasy en-GB/en-CA/en-AU wskazują istniejącą lokalizację (D-309)', () => {
    expect(Object.keys(L)).toEqual(expect.arrayContaining(['pl', 'en-US']));
    for (const [alias, cel] of Object.entries(meta._aliasy)) expect([alias, cel in L, alias in L]).toEqual([alias, true, false]);
  });

  it('AK-K-11-b limity Apple: nazwa 2–30, podtytuł ≤ 30, tekst promocyjny ≤ 170, opis ≤ 4000 znaków; pola niepuste', () => {
    for (const [l, v] of Object.entries(L)) {
      expect({ l, nazwa: znaki(v.name) >= 2 && znaki(v.name) <= 30, podtytul: znaki(v.subtitle) <= 30, promo: znaki(v.promotionalText) > 0 && znaki(v.promotionalText) <= 170, opis: znaki(v.description) > 0 && znaki(v.description) <= 4000 })
        .toEqual({ l, nazwa: true, podtytul: true, promo: true, opis: true });
    }
  });

  it('AK-K-11-c słowa kluczowe: ≤ 100 B, każde > 2 znaki, przecinki bez spacji, bez powtórzeń i bez słów z nazwy i podtytułu', () => {
    for (const [l, v] of Object.entries(L)) {
      const kw = v.keywords.split(',');
      const wlasne = new Set([...slowa(v.name), ...slowa(v.subtitle)]);
      expect({ l, bajty: Buffer.byteLength(v.keywords, 'utf8') <= 100, krotkie: kw.filter((k) => znaki(k) <= 2), spacje: /\s/.test(v.keywords), powtorzenia: kw.filter((k, i) => kw.indexOf(k) !== i), zNazwy: kw.filter((k) => wlasne.has(k.toLowerCase())) })
        .toEqual({ l, bajty: true, krotkie: [], spacje: false, powtorzenia: [], zNazwy: [] });
    }
  });

  it('AK-K-11-d bez nazw innych aplikacji i marek (2.3.7), bez kwot i walut (strona produktu Apple), bez obietnicy wygranej (NFR-ZGOD-002)', () => {
    expect(konkurencja.length).toBeGreaterThan(20); // lista z danych BRD, nie pusta
    for (const [l, v] of Object.entries(L)) {
      for (const [pole, tekst] of Object.entries(v)) {
        const bez = tekst.replace(/https?:\/\/\S+/g, ''); // adres EULA Apple nie jest kwotą ani marką
        expect({ l, pole, konkurencja: konkurencja.filter((k) => slowo(k).test(bez)), marki: MARKI.filter((m) => slowo(m).test(bez)), kwoty: KWOTY.test(bez), obietnica: bez.match(OBIETNICA)?.[0] ?? null })
          .toEqual({ l, pole, konkurencja: [], marki: [], kwoty: false, obietnica: null });
      }
    }
  });

  it('AK-K-11-e strażnik samego sprawdzenia: obietnica i kwota wykrywane, „learn”/„żetonów do wygrania” nie (sklep.md §3)', () => {
    expect(['Wygraj teraz', 'Win more at the tables', 'za 10,99 zł', 'only $9'].map((t) => OBIETNICA.test(t) || KWOTY.test(t))).toEqual([true, true, true, true]);
    expect(['learn poker rules', 'nie ma żetonów do wygrania', 'no chips to win', 'złe zagranie'].map((t) => OBIETNICA.test(t) || KWOTY.test(t))).toEqual([false, false, false, false]);
  });

  it('AK-K-11-f opis: link Warunków Apple (EULA) i Polityki prywatności (adres albo wstawka do podmiany, D-308)', () => {
    const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
    for (const [l, v] of Object.entries(L)) {
      expect({ l, eula: v.description.includes(EULA), prywatnosc: /(Polityka prywatności|Privacy Policy): (https:\/\/\S+|\[ADRES PRYWATNOSCI\]|\[PRIVACY URL\])/.test(v.description) })
        .toEqual({ l, eula: true, prywatnosc: true });
    }
  });
});

// Mapa opisu → kod (docs/wydanie/sklep.md §2). Każdy wiersz: wzorzec punktu pl i en oraz kontrola miejsca w kodzie.
type Wiersz = { co: string; pl: RegExp; en: RegExp; kod: () => boolean | string };
const plik = (p: string) => existsSync(repo(p));
const liczba = (re: RegExp, tekst: string) => Number(tekst.match(re)?.[1]);
const STOPNIE = ['zgodne', 'dopuszczalne', 'niedokladnosc', 'blad'] as const;
const MAPA: Wiersz[] = [
  { co: 'moduły kursu', pl: /^• Moduły po kolei:/, en: /^• Modules in order:/, kod: () => plik('content/pl/modules.yaml') && plik('apps/mobile/src/app/lesson') },
  { co: 'terminy i słowniczek', pl: /słowniczku/, en: /glossary/, kod: () => plik('apps/mobile/src/app/glossary.tsx') && typeof klucz('glossary') === 'object' },
  { co: 'ocena poziomu', pl: /ocena poziomu na start \(do \d+ pytań, możesz ją pominąć\)/, en: /placement check at the start \(up to \d+ questions, skippable\)/, kod: () => typeof klucz('welcome.startFresh') === 'string' && typeof klucz('placement.startAt') === 'string' },
  { co: 'egzamin modułu', pl: /Egzamin modułu \(\d+ zadań\)/, en: /module exam \(\d+ questions\)/, kod: () => KONFIGURACJA.TEST_MODULU_LICZBA_ZADAN > 0 },
  { co: 'cztery stopnie oceny', pl: /^• Decyzje z oceną w czterech stopniach: /, en: /^• Decisions graded on four levels: /, kod: () => STOPNIE.every((s) => typeof klucz(`grade.${s}`) === 'string') },
  { co: 'wyjaśnienie z liczbami', pl: /^• Wyjaśnienie z liczbami/, en: /^• An explanation with the numbers/, kod: () => plik('packages/domena/src/wyjasnienie.ts') },
  { co: 'rodzaje odpowiedzi', pl: /Wybór akcji, odpowiedzi liczbowe i malowanie zakresów/, en: /Choose an action, enter a number or paint a hand range/, kod: () => typeof klucz('session.chooseAction') === 'string' && typeof klucz('session.numberLabel') === 'string' && typeof klucz('paint') === 'object' },
  { co: 'sesja przerwana i wznowiona', pl: /^• Krótka sesja ćwiczeń: możesz ją przerwać/, en: /^• Short practice sessions: stop any time/, kod: () => plik('apps/mobile/src/app/session.tsx') && KONFIGURACJA.SESJA_LICZBA_ZADAN > 0 },
  { co: 'powtórki rozłożone w czasie', pl: /powtórkach rozłożonych w czasie/, en: /spaced reviews/, kod: () => plik('packages/srs/package.json') && plik('apps/mobile/src/app/(tabs)/review.tsx') },
  { co: 'statystyki postępu', pl: /^• Trafność, najsłabsze rodzaje zadań, seria dni i wskaźnik zaawansowania/, en: /^• Accuracy, weakest question types, day streak and an advancement score/, kod: () => ['progress.accuracy', 'progress.weakest', 'progress.streak_one'].every((k) => typeof klucz(k) === 'string') && typeof klucz('advancement') === 'object' },
  { co: 'przypomnienie', pl: /^• Opcjonalne codzienne przypomnienie/, en: /^• Optional daily reminder/, kod: () => typeof klucz('settings.reminder') === 'string' && czytaj('apps/mobile/src/app/settings.tsx').length > 0 },
  { co: 'offline, bez konta, reklam i śledzenia', pl: /^• Działa offline, bez konta, bez reklam i bez śledzenia/, en: /^• Works offline, with no account, no ads and no tracking/, kod: () => {
    const m = json<{ expo: { ios: { privacyManifests: { NSPrivacyCollectedDataTypes: unknown[]; NSPrivacyTracking?: boolean } } } }>('apps/mobile/app.json').expo.ios.privacyManifests;
    return m.NSPrivacyCollectedDataTypes.length === 0 && m.NSPrivacyTracking !== true;
  } },
  { co: 'eksport, import, usunięcie', pl: /eksport do pliku, import na innym telefonie, usunięcie postępu/, en: /export it to a file, import it on another phone, or erase it/, kod: () => plik('apps/mobile/src/app/data.tsx') && typeof klucz('settings.reset') === 'string' },
  { co: 'ekran Pomoc', pl: /^• Ekran „Pomoc”/, en: /^• A Help screen/, kod: () => plik('apps/mobile/src/app/help.tsx') && plik('content/helplines.yaml') },
];

describe('AK-K-11: opis zgodny z kodem (mapa docs/wydanie/sklep.md §2)', () => {
  for (const l of ['pl', 'en-US'] as const) {
    it(`AK-K-11-g ${l}: każdy punkt „•” opisu ma wiersz mapy, a każdy wiersz mapy — punkt w opisie`, () => {
      const punkty = L[l]!.description.split('\n').filter((x) => x.startsWith('• '));
      const re = (w: Wiersz) => (l === 'pl' ? w.pl : w.en);
      expect({ bezMapy: punkty.filter((p) => !MAPA.some((w) => re(w).test(p))), bezPunktu: MAPA.filter((w) => !punkty.some((p) => re(w).test(p))).map((w) => w.co) })
        .toEqual({ bezMapy: [], bezPunktu: [] });
    });
  }

  it('AK-K-11-h każdy wiersz mapy ma miejsce w kodzie (plik, klucz tekstu albo parametr)', () => {
    expect(MAPA.filter((w) => w.kod() !== true).map((w) => w.co)).toEqual([]);
  });

  it('AK-K-11-i liczby w opisie z KONFIGURACJA (sklep.md §2: 8, 15, 1 — zmiana parametru wymaga zmiany tekstu)', () => {
    const { pl: p, 'en-US': e } = { pl: L.pl!.description, 'en-US': L['en-US']!.description };
    expect({
      ocenaPl: liczba(/do (\d+) pytań/, p), ocenaEn: liczba(/up to (\d+) questions/, e),
      egzaminPl: liczba(/Egzamin modułu \((\d+) zadań\)/, p), egzaminEn: liczba(/module exam \((\d+) questions\)/, e),
    }).toEqual({ ocenaPl: KONFIGURACJA.OCENA_POZIOMU_MAKS_PYTAN, ocenaEn: KONFIGURACJA.OCENA_POZIOMU_MAKS_PYTAN, egzaminPl: KONFIGURACJA.TEST_MODULU_LICZBA_ZADAN, egzaminEn: KONFIGURACJA.TEST_MODULU_LICZBA_ZADAN });
    // Limit dnia słownie: „jedną darmową aktywność dziennie” / „one free activity per day” (LIMIT_AKTYWNOSCI_DZIENNIE = 1).
    const slownie: Record<number, [RegExp, RegExp]> = { 1: [/jedną darmową aktywność dziennie/, /one free activity per day/] };
    const [rePl, reEn] = slownie[KONFIGURACJA.LIMIT_AKTYWNOSCI_DZIENNIE] ?? [/$^/, /$^/];
    expect({ pl: rePl.test(p), en: reEn.test(e) }).toEqual({ pl: true, en: true });
  });

  it('AK-K-11-j stopnie oceny w opisie pl = teksty interfejsu (grade.*); w en cztery nazwy', () => {
    const plStopnie = L.pl!.description.match(/czterech stopniach: ([^\n]+)/)?.[1]?.split(/, /).map((s) => s.trim());
    expect(plStopnie).toEqual(STOPNIE.map((s) => String(klucz(`grade.${s}`)).toLowerCase()));
    expect(L['en-US']!.description.match(/four levels: ([^\n]+)/)?.[1]?.split(/, /)).toHaveLength(STOPNIE.length);
  });

  it('AK-K-11-k plany w opisie = produkty odblokowujące (kwartał, rok, dożywotni; ADR 0006)', () => {
    expect(KONFIGURACJA.PRODUKTY_ODBLOKOWUJACE.map((p) => p.split('.').pop())).toEqual(['kwartal', 'rok', 'dozywotni']);
    expect({ pl: /subskrypcja kwartalna albo roczna[^\n]*jednorazowy dostęp dożywotni/.test(L.pl!.description), en: /quarterly or yearly subscription[^\n]*one-time lifetime unlock/.test(L['en-US']!.description) })
      .toEqual({ pl: true, en: true });
  });

  it('AK-K-11-l bez funkcji spoza 1.0 i bez liczby języków: scenariusze (F-12, D-305), solver, trening na czas (ADR 0011)', () => {
    for (const [l, v] of Object.entries(L)) {
      const t = `${v.subtitle} ${v.keywords} ${v.promotionalText} ${v.description}`;
      expect({ l, poza: t.match(/scenariusz|scenario|solver|na czas|timed|\b\d+ (języków|languages)\b/iu)?.[0] ?? null }).toEqual({ l, poza: null });
    }
  });
});

describe('AK-K-11: store/review-notes.md', () => {
  it('AK-K-11-m notatki en (sekcja „English”) ≤ 4000 B (pole Notes App Review, sklep.md §1)', () => {
    const en = czytaj('store/review-notes.md').split(/^## English[^\n]*\n/m)[1]?.split(/^## /m)[0] ?? '';
    expect(en.trim().length).toBeGreaterThan(200);
    expect(Buffer.byteLength(en.trim(), 'utf8')).toBeLessThanOrEqual(4000);
  });
});
