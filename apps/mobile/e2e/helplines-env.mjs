// Zmienne dla flowu 04-pomoc.yaml z wygenerowanego modułu (jedno źródło: content/helplines.yaml), żeby flow nie
// powielał numerów. Wypisuje argumenty `-e KLUCZ=wartość` dla `maestro test`, po jednym w linii.
import { readFileSync } from 'node:fs';

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
};
for (const [k, v] of Object.entries(env)) console.log(`-e\n${k}=${v}`);
