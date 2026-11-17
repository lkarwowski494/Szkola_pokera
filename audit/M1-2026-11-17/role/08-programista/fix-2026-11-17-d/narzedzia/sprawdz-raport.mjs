import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
const arg = process.argv.slice(2);
const [raport, repo = '.', baza = dirname(raport)] = arg;
const tekst = readFileSync(raport, 'utf8'); const bledy = [];
const ref = /`?((?:[\w@.()[\]+-]+\/)*[\w@.()[\]+-]+\.[A-Za-z0-9]+):(\d+)(?:[-–](\d+))?`?/g;
for (const [nr, w] of tekst.split('\n').entries()) for (const m of w.matchAll(ref)) {
  const [, plik, od] = m; if (/^https?$/.test(plik)) continue;
  const s = resolve(repo, plik); if (!existsSync(s) || !statSync(s).isFile()) { bledy.push(`w${nr+1}: brak pliku ${plik}`); continue; }
  if (Number(od) > readFileSync(s, 'utf8').split('\n').length) bledy.push(`w${nr+1}: ${plik}:${od} poza plikiem`);
}
for (const [nr, w] of tekst.split('\n').entries()) for (const m of w.matchAll(/(?:^|[\s(`])((?:dowody|zrzuty)\/[\w./-]+)/g)) if (!existsSync(join(baza, m[1]))) bledy.push(`w${nr+1}: brak dowodu ${m[1]}`);
for (const r of [/AKIA[0-9A-Z]{16}/, /gh[pousr]_[A-Za-z0-9]{30,}/, /sk-[A-Za-z0-9_-]{20,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/]) if (r.test(tekst)) bledy.push('sekret? ' + r.source);
bledy.forEach((b) => console.log('BŁĄD', b)); console.log(bledy.length ? `${bledy.length} błędów` : 'OK: odwołania, pliki dowodów i sekrety sprawdzone'); process.exit(bledy.length ? 1 : 0);
