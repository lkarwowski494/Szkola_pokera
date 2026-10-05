// Zmienne dla flowu 04-pomoc.yaml z wygenerowanego modułu (jedno źródło: content/helplines.yaml), żeby flow nie
// powielał numerów. Wypisuje argumenty `-e KLUCZ=wartość` dla `maestro test`, po jednym w linii.
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/data/content/helplines.generated.ts', import.meta.url), 'utf8');
const json = src.slice(src.indexOf('= {') + 2, src.lastIndexOf('};') + 1);
const h = JSON.parse(json);
const phones = h.entries.filter((e) => e.phone);
const env = {
  HELP_FIRST_NAME: h.entries[0].name,
  HELP_FIRST_PHONE: phones[0].phone,
  HELP_LAST_PHONE: phones[phones.length - 1].phone,
  HELP_ABROAD: h.abroadText,
  HELP_CHECKED: h.checkedText,
};
for (const [k, v] of Object.entries(env)) console.log(`-e\n${k}=${v}`);
