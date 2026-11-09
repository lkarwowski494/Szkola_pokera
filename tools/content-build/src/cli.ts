import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { compileAll, sprawdzTresci, trescModuleSource, writeContentDbs } from './build';
import { helplinesModuleSource } from './helplines';
import { parse as parseYaml } from 'yaml';
import { definicjeJezykow } from './definicje';
import { termsModuleSource } from './terms';

const root = resolve(import.meta.dirname, '../../..');
const contentDir = join(root, 'content');
const outDir = join(root, 'apps/mobile/assets/content');
/** Terminy dla kodu aplikacji (teksty zadań generowanych, ćwiczenie słownictwa): moduł TS z tego samego terms.yaml. */
const termsModule = join(root, 'apps/mobile/src/data/content/terms.generated.ts');
/** Telefony pomocy dla ekranu „Pomoc”: moduł TS z content/helplines.yaml (to samo źródło co ramka w lekcji M12-L4). */
const helplinesModule = join(root, 'apps/mobile/src/data/content/helplines.generated.ts');
/** Pliki treści na język dla aplikacji (D-232): wersja i mapa `require` z content-build. */
const trescModule = join(root, 'apps/mobile/src/data/content/tresc.generated.ts');

const mode = process.argv[2] ?? 'build';

try {
  // 35 baz z tych samych YAML (ADR 0005 pkt 1); pierwsza to źródło `pl` (moduły TS terminów i pomocy, ostrzeżenia)
  const tresci = compileAll(contentDir);
  const content = tresci.find((c) => c.locale === 'pl')!;
  for (const w of new Set(tresci.flatMap((c) => c.warnings))) console.warn(`uwaga: ${w}`);
  const termsSrc = termsModuleSource(content.terms, definicjeJezykow(contentDir, parseYaml(readFileSync(join(contentDir, 'terms.yaml'), 'utf8'))));
  const helplinesSrc = helplinesModuleSource(content.helplines);
  const trescSrc = trescModuleSource(tresci);
  if (mode === 'check') {
    const bledy = sprawdzTresci(tresci, outDir);
    if (bledy.length > 0) {
      console.error(`Bazy treści są nieaktualne (${bledy.length}):\n${bledy.map((b) => `  - ${b}`).join('\n')}\nUruchom: pnpm content:build`);
      process.exit(1);
    }
    if (!existsSync(termsModule) || readFileSync(termsModule, 'utf8') !== termsSrc) {
      console.error('Moduł terminów apps/mobile/src/data/content/terms.generated.ts jest nieaktualny. Uruchom: pnpm content:build');
      process.exit(1);
    }
    if (!existsSync(helplinesModule) || readFileSync(helplinesModule, 'utf8') !== helplinesSrc) {
      console.error('Moduł telefonów pomocy apps/mobile/src/data/content/helplines.generated.ts jest nieaktualny. Uruchom: pnpm content:build');
      process.exit(1);
    }
    if (!existsSync(trescModule) || readFileSync(trescModule, 'utf8') !== trescSrc) {
      console.error('Moduł plików treści apps/mobile/src/data/content/tresc.generated.ts jest nieaktualny. Uruchom: pnpm content:build');
      process.exit(1);
    }
    console.log(`Treść aktualna (${tresci.length} baz): ${content.lessons.length} lekcji, ${content.rules.length} reguł, ${content.terms.length} terminów.`);
  } else {
    const sciezki = writeContentDbs(tresci, outDir);
    mkdirSync(dirname(termsModule), { recursive: true });
    writeFileSync(termsModule, termsSrc);
    writeFileSync(helplinesModule, helplinesSrc);
    writeFileSync(trescModule, trescSrc);
    console.log(`Zapisano ${sciezki.length} baz treści w ${outDir}: ${content.lessons.length} lekcji, ${content.rules.length} reguł, ${content.numbers.length} liczb, ${content.terms.length} terminów.`);
  }
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}
