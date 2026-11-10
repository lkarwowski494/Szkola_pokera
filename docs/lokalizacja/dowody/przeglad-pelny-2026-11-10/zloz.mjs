#!/usr/bin/env node
// Składa wyniki subagentów pełnego przeglądu (sesja AP, 2026-11-10): <język>/czesci/<CZĘŚĆ>.json → <język>/poprawki-<język>.json
// (format docs/lokalizacja/narzedzia/poprawki.mjs: { jezyk, cel, stary, nowy, waga, powod, grupa } + linia) i <język>/znaleziska.md.
// Kontrola każdej poprawki na plikach HEAD: `stary` dokładnie raz w `cel`, bez nowej linii, nowy ≠ stary, znaczniki {{n:…}}, [[…]], R-M…
// i klucze {{t:…}} te same w stary i nowy (różnica = ostrzeżenie do ręcznego obejrzenia). Niczego nie zmienia w content/ ani w kodzie.
//   node docs/lokalizacja/dowody/przeglad-pelny-2026-11-10/zloz.mjs <język>      (z katalogu repo; kod 1, gdy są odrzucone)
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const K = process.argv[2], D = `docs/lokalizacja/dowody/przeglad-pelny-2026-11-10`, C = join(D, K, 'czesci');
const podzial = JSON.parse(readFileSync(join(D, 'podzial.json'), 'utf8'));
const WAGI = ['KRYT', 'WYS', 'ŚR', 'NISKIE'];
const zn = (s) => [...s.matchAll(/\{\{n:[^}]*\}\}|\[\[[^\]]*\]\]|\bR-M\d+-\d+\b|\{\{t:[^}|]+|\{\{\s*(?![nt]:)[^{}|,\s]+/g)].map((m) => m[0].trim()).sort().join(' ');
const ok = [], zle = [], ostrz = [], braki = [];
// AP = poprawki sesji nadrzędnej po rozstrzygnięciu sprzeczności (czesci/AP.json); wykluczenia.json = wpisy części usunięte
// rozstrzygnięciem: [{ grupa, cel, stary, powod }] (dokładne dopasowanie grupa+cel+stary).
const czesci = [...Object.keys(podzial), ...(existsSync(join(C, 'AP.json')) ? ['AP'] : [])];
const pw = join(D, K, 'wykluczenia.json'), wykl = existsSync(pw) ? JSON.parse(readFileSync(pw, 'utf8')) : [], uzyteW = new Set();
for (const cz of czesci) {
  const p = join(C, `${cz}.json`);
  if (!existsSync(p) || !existsSync(join(C, `${cz}-uwagi.md`))) { braki.push(cz); continue; }
  let a; try { a = JSON.parse(readFileSync(p, 'utf8')); } catch (e) { zle.push(`${cz}: plik JSON nie parsuje się (${e.message})`); continue; }
  for (const x of a) {
    const iw = wykl.findIndex((w) => w.grupa === cz && w.cel === x.cel && w.stary === x.stary);
    if (iw >= 0) { uzyteW.add(iw); continue; }
    const opis = `${cz} ${x.cel}:${x.linia} „${String(x.stary).slice(0, 50)}”`;
    if (x.jezyk !== K || !WAGI.includes(x.waga) || typeof x.stary !== 'string' || typeof x.nowy !== 'string' || !x.stary || !x.powod) { zle.push(`${opis} — pola`); continue; }
    if (!existsSync(x.cel)) { zle.push(`${opis} — brak pliku cel`); continue; }
    const t = readFileSync(x.cel, 'utf8'), n = t.split(x.stary).length - 1;
    if (n !== 1) { zle.push(`${opis} — „stary” występuje ${n}×`); continue; }
    if (x.stary === x.nowy || /\n/.test(x.stary) || /\n/.test(x.nowy)) { zle.push(`${opis} — nowy = stary albo nowa linia`); continue; }
    const linia = t.slice(0, t.indexOf(x.stary)).split('\n').length;
    if (zn(x.stary) !== zn(x.nowy)) ostrz.push(`${opis} — znaczniki: [${zn(x.stary)}] → [${zn(x.nowy)}]`);
    ok.push({ jezyk: K, cel: x.cel, linia, stary: x.stary, nowy: x.nowy, waga: x.waga, powod: x.powod, grupa: cz });
  }
}
wykl.forEach((w, i) => { if (!uzyteW.has(i)) zle.push(`wykluczenie bez dopasowania: ${w.grupa} ${w.cel} „${String(w.stary).slice(0, 40)}”`); });
// kolizje: dwie poprawki, których `stary` nachodzą na siebie w tym samym pliku
const wgPliku = {};
for (const x of ok) (wgPliku[x.cel] ??= []).push(x);
const kolizje = [];
for (const [cel, xs] of Object.entries(wgPliku)) {
  const t = readFileSync(cel, 'utf8'), z = xs.map((x) => ({ x, a: t.indexOf(x.stary), b: t.indexOf(x.stary) + x.stary.length })).sort((p, q) => p.a - q.a);
  for (let i = 1; i < z.length; i++) if (z[i].a < z[i - 1].b) kolizje.push(`${cel}:${z[i].x.linia} — ${z[i - 1].x.grupa} „${z[i - 1].x.stary.slice(0, 30)}” ∩ ${z[i].x.grupa} „${z[i].x.stary.slice(0, 30)}”`);
}
ok.sort((p, q) => WAGI.indexOf(p.waga) - WAGI.indexOf(q.waga) || p.cel.localeCompare(q.cel) || p.linia - q.linia);
writeFileSync(join(D, K, `poprawki-${K}.json`), JSON.stringify(ok, null, 1) + '\n');
const licz = Object.fromEntries(WAGI.map((w) => [w, ok.filter((x) => x.waga === w).length]));
const kom = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const L = [`# Pełny przegląd przekładu ${K} — znaleziska z poprawką mechaniczną (sesja AP, 2026-11-10)`, '',
  `Wygenerowane przez \`zloz.mjs ${K}\` z plików \`czesci/*.json\` (nie edytuj ręcznie). Poprawki: \`poprawki-${K}.json\` (${ok.length}). Znaleziska bez poprawki mechanicznej, wzorce do ujednolicenia, pytania i pokrycie plików: \`czesci/<CZĘŚĆ>-uwagi.md\` oraz \`podsumowanie.md\`.`, '',
  `| Waga | Liczba |`, '|---|---|', ...WAGI.map((w) => `| ${w} | ${licz[w]} |`), `| **razem** | ${ok.length} |`, '',
  `Części bez wyniku: ${braki.length ? braki.join(', ') : 'brak'}. Wykluczone rozstrzygnięciem (wykluczenia.json): ${uzyteW.size}. Odrzucone przez kontrolę: ${zle.length}. Kolizje: ${kolizje.length}. Ostrzeżenia o znacznikach: ${ostrz.length}.`, ''];
for (const w of WAGI) {
  const xs = ok.filter((x) => x.waga === w); if (!xs.length) continue;
  L.push(`## ${w} (${xs.length})`, '', '| # | Część | plik:linia | Było | Ma być | Powód |', '|---|---|---|---|---|---|');
  xs.forEach((x, i) => L.push(`| ${i + 1} | ${x.grupa} | ${x.cel}:${x.linia} | ${kom(x.stary)} | ${kom(x.nowy)} | ${kom(x.powod)} |`));
  L.push('');
}
writeFileSync(join(D, K, 'znaleziska.md'), L.join('\n'));
console.log(`${K}: poprawek ${ok.length} ${JSON.stringify(licz)}; części bez wyniku: ${braki.join(',') || '—'}`);
for (const [n, xs] of [['ODRZUCONA', zle], ['KOLIZJA', kolizje], ['OSTRZEŻENIE', ostrz]]) for (const s of xs) console.log(`  ${n} ${s}`);
const wgCz = {}; for (const x of ok) (wgCz[x.grupa] ??= {})[x.waga] = (wgCz[x.grupa][x.waga] ?? 0) + 1;
console.log(JSON.stringify(wgCz));
process.exit(zle.length || kolizje.length ? 1 : 0);
