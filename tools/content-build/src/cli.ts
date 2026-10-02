import { join, resolve } from 'node:path';
import { compileContent, contentDbFileName, readDbHash, writeContentDb } from './build';

const root = resolve(import.meta.dirname, '../../..');
const contentDir = join(root, 'content');
const outDir = join(root, 'apps/mobile/assets/content');

const mode = process.argv[2] ?? 'build';

try {
  const content = compileContent(contentDir, 'pl');
  for (const w of content.warnings) console.warn(`uwaga: ${w}`);
  const dbPath = join(outDir, contentDbFileName());
  if (mode === 'check') {
    const current = readDbHash(dbPath);
    if (current !== content.hash) {
      console.error(`Baza treści jest nieaktualna (${current ?? 'brak'} ≠ ${content.hash}). Uruchom: pnpm content:build`);
      process.exit(1);
    }
    console.log(`Treść aktualna (${content.hash}): ${content.lessons.length} lekcji, ${content.rules.length} reguł.`);
  } else {
    writeContentDb(content, outDir);
    console.log(`Zapisano ${dbPath} (${content.hash}): ${content.lessons.length} lekcji, ${content.rules.length} reguł, ${content.numbers.length} liczb.`);
  }
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}
