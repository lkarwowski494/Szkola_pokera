// Zmienne dla flowów z treści (jedno źródło: content/), żeby flow nie powielał tekstów wpisanych w YAML (JAK-E0-01: flow
// słowniczka szukał „bańka” po zmianie terminu na `bubble`). 04-pomoc.yaml: content/helplines.yaml przez moduł wygenerowany;
// 03-slowniczek.yaml: content/terms.yaml. Wypisuje argumenty `-e KLUCZ=wartość` dla `maestro test`, po jednym w linii.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';

const src = readFileSync(new URL('../src/data/content/helplines.generated.ts', import.meta.url), 'utf8');
const json = src.slice(src.indexOf('= {') + 2, src.lastIndexOf('};') + 1);
const h = JSON.parse(json);
// D-158: bez numerów krajowych; ekran pokazuje zdanie ogólne i pomoc międzynarodową online (link)
const online = h.entries.find((e) => e.id === h.fallback.online[0]);
const link = online.links[0];
const env = {
  // etykieta dostępności przycisku (i18n help.openA11y), bo Maestro na iOS widzi przycisk po etykiecie, nie po napisie
  HELP_LINK: `${link.label}: otwórz ${link.url.replace(/^https:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')} w przeglądarce`,
  HELP_ABROAD: h.abroadText,
  HELP_CHECKED: h.checkedText,
  ...slowniczek(),
  // flowy oczekujące (oczekujace/, D-189): pierwsza lekcja M0 = punkt startu po „Zacznij od początku” (BR-ONB-001, D-475)
  LEKCJA_START_TYTUL: tytulPierwszejLekcji('pl'),
  LEKCJA_START_TYTUL_EN: tytulPierwszejLekcji('en'),
  // 08-drugi-jezyk.yaml (K7, D-353): teksty ekranów en ze słownika aplikacji; wzorzec Maestro = pełne dopasowanie
  ...tekstyEn(),
};

// Słowniki interfejsu (apps/mobile/src/i18n/locales): powitanie, przyciski i tytuł ekranu „Język” w en, tytuł „Język” w pl.
function tekstyEn() {
  const slownik = (j) => JSON.parse(readFileSync(new URL(`../src/i18n/locales/${j}.json`, import.meta.url), 'utf8'));
  const klucz = (s, k) => {
    const w = k.split('.').reduce((o, x) => o?.[x], s);
    if (typeof w !== 'string' || !w.trim()) throw new Error(`locales: brak klucza ${k}`);
    return w;
  };
  const re = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const en = slownik('en');
  const pl = slownik('pl');
  return {
    POWITANIE_EN: `.*${re(klucz(en, 'welcome.noMoney'))}.*`,
    OD_POCZATKU_EN: re(klucz(en, 'welcome.startFresh')),
    JEZYK_TYTUL_EN: re(klucz(en, 'language.title')),
    JEZYK_TYTUL_PL: re(klucz(pl, 'language.title')),
  };
}

// Słowniczek: pierwszy termin, którego nazwa polska różni się od angielskiej — wyszukiwanie po angielsku ma pokazać nazwę polską.
function slowniczek() {
  const terms = parse(readFileSync(new URL('../../../content/terms.yaml', import.meta.url), 'utf8'));
  const t = Object.values(terms).find((x) => x && x.pl && x.en && x.pl.toLowerCase() !== x.en.toLowerCase());
  if (!t) throw new Error('content/terms.yaml: brak terminu z różną nazwą polską i angielską');
  const regex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return { GLOSS_QUERY: t.en, GLOSS_PL: `${regex(t.pl)}.*` };
}
// Tytuł lekcji m0 z order: 1 z front matter content/<język>/lessons/*.md jako wzorzec Maestro (pełne dopasowanie, więc `.*`).
// Brak katalogu języka (przekład roli 09 jeszcze nie istnieje) → wartownik, którego żaden ekran nie pokaże: flow pada
// na asercji, zamiast dopasować pusty tekst.
function tytulPierwszejLekcji(jezyk) {
  const kat = new URL(`../../../content/${jezyk}/lessons/`, import.meta.url);
  if (!existsSync(kat)) return `BRAK content/${jezyk} (rola 09)`;
  for (const plik of readdirSync(kat).filter((f) => f.endsWith('.md'))) {
    const tekst = readFileSync(new URL(plik, kat), 'utf8');
    const fm = tekst.startsWith('---') ? parse(tekst.slice(3, tekst.indexOf('\n---', 3))) : null;
    if (fm?.module === 'm0' && fm.order === 1) return `.*${fm.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*`;
  }
  throw new Error(`content/${jezyk}/lessons: brak lekcji m0 z order: 1`);
}
for (const [k, v] of Object.entries(env)) console.log(`-e\n${k}=${v}`);
