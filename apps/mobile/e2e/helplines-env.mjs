// Zmienne dla flowów z treści (jedno źródło: content/), żeby flow nie powielał tekstów wpisanych w YAML (JAK-E0-01: flow
// słowniczka szukał „bańka” po zmianie terminu na `bubble`). 04-pomoc.yaml: content/helplines.yaml przez moduł wygenerowany;
// 03-slowniczek.yaml: content/terms.yaml. Wypisuje argumenty `-e KLUCZ=wartość` dla `maestro test`, po jednym w linii.
import { readFileSync } from 'node:fs';
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
};

// Słowniczek: pierwszy termin, którego nazwa polska różni się od angielskiej — wyszukiwanie po angielsku ma pokazać nazwę polską.
function slowniczek() {
  const terms = parse(readFileSync(new URL('../../../content/terms.yaml', import.meta.url), 'utf8'));
  const t = Object.values(terms).find((x) => x && x.pl && x.en && x.pl.toLowerCase() !== x.en.toLowerCase());
  if (!t) throw new Error('content/terms.yaml: brak terminu z różną nazwą polską i angielską');
  const regex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return { GLOSS_QUERY: t.en, GLOSS_PL: `${regex(t.pl)}.*` };
}
for (const [k, v] of Object.entries(env)) console.log(`-e\n${k}=${v}`);
