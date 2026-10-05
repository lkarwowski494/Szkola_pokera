import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { compileContent, contentDbFileName, readDbHash, staleContentDbs, writeContentDb } from './build';
import { termsModuleSource } from './terms';

const root = resolve(import.meta.dirname, '../../..');
const contentDir = join(root, 'content');
const outDir = join(root, 'apps/mobile/assets/content');
/** Terminy dla kodu aplikacji (teksty zadań generowanych, ćwiczenie słownictwa): moduł TS z tego samego terms.yaml. */
const termsModule = join(root, 'apps/mobile/src/data/content/terms.generated.ts');

const mode = process.argv[2] ?? 'build';

try {
  const content = compileContent(contentDir, 'pl');
  for (const w of content.warnings) console.warn(`uwaga: ${w}`);
  const dbPath = join(outDir, contentDbFileName());
  const termsSrc = termsModuleSource(content.terms);
  if (mode === 'check') {
    const current = readDbHash(dbPath);
    if (current !== content.hash) {
      console.error(`Baza treści jest nieaktualna (${current ?? 'brak'} ≠ ${content.hash}). Uruchom: pnpm content:build`);
      process.exit(1);
    }
    const stale = staleContentDbs(outDir);
    if (stale.length > 0) {
      console.error(`Stare bazy treści obok ${contentDbFileName()}: ${stale.join(', ')}. Uruchom: pnpm content:build`);
      process.exit(1);
    }
    if (!existsSync(termsModule) || readFileSync(termsModule, 'utf8') !== termsSrc) {
      console.error('Moduł terminów apps/mobile/src/data/content/terms.generated.ts jest nieaktualny. Uruchom: pnpm content:build');
      process.exit(1);
    }
    console.log(`Treść aktualna (${content.hash}): ${content.lessons.length} lekcji, ${content.rules.length} reguł, ${content.terms.length} terminów.`);
  } else {
    writeContentDb(content, outDir);
    mkdirSync(dirname(termsModule), { recursive: true });
    writeFileSync(termsModule, termsSrc);
    console.log(`Zapisano ${dbPath} (${content.hash}): ${content.lessons.length} lekcji, ${content.rules.length} reguł, ${content.numbers.length} liczb, ${content.terms.length} terminów.`);
  }
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}
