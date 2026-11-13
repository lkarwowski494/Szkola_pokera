// HD (06, audit, D-043): niezależne porównanie baz treści dwóch commitów; klucz główny z PRAGMA table_info (nie z listy nazw tabel).
// Użycie: node docs/tresci/narzedzia/hd-d043-bazy.mjs <katalog przed> <katalog po> (pliki <język>.db); kod 1 = zniknęło ID, tabela albo baza.
import { DatabaseSync } from 'node:sqlite';
import { readdirSync } from 'node:fs';
const [przed, po] = process.argv.slice(2);
let bledy = 0; const sumy = {};
const bazyA = readdirSync(przed).sort(), bazyB = readdirSync(po).sort();
for (const f of bazyA) if (!bazyB.includes(f)) { bledy++; console.log(`BRAK BAZY ${f}`); }
for (const f of bazyB) {
  const a = new DatabaseSync(`${przed}/${f}`, { readOnly: true }), b = new DatabaseSync(`${po}/${f}`, { readOnly: true });
  const tab = (db) => db.prepare("select name from sqlite_master where type='table'").all().map((r) => r.name).sort();
  for (const t of tab(a)) {
    if (!tab(b).includes(t)) { bledy++; console.log(`${f}: BRAK TABELI ${t}`); continue; }
    const pk = a.prepare(`pragma table_info(${t})`).all().filter((c) => c.pk > 0).sort((x, y) => x.pk - y.pk).map((c) => c.name);
    const kl = pk.length ? pk : ['rowid'];
    const klucze = (db) => new Set(db.prepare(`select ${kl.join(',')} from ${t}`).all().map((r) => kl.map((k) => r[k]).join('|')));
    const ka = klucze(a), kb = klucze(b);
    const znikle = [...ka].filter((k) => !kb.has(k)), nowe = [...kb].filter((k) => !ka.has(k));
    if (znikle.length) { bledy++; console.log(`${f} ${t}: ZNIKŁO ${znikle.length}: ${znikle.slice(0, 10).join(', ')}`); }
    if (nowe.length) { sumy[`${t}`] ??= new Set(); nowe.forEach((k) => sumy[t].add(k)); sumy[`${t}#${f}`] = nowe.length; }
  }
}
for (const [t, s] of Object.entries(sumy)) if (!t.includes('#')) console.log(`nowe w ${t} (suma po bazach, unikalne): ${[...s].slice(0, 20).join(', ')}${s.size > 20 ? ' …' : ''}`);
console.log(`baz przed ${bazyA.length}, po ${bazyB.length}; ${bledy ? `BŁĘDY: ${bledy}` : 'OK: żadne ID, tabela ani baza nie zniknęła'}`);
process.exit(bledy ? 1 : 0);
