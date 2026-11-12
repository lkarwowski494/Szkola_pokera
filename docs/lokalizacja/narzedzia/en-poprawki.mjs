#!/usr/bin/env node
// Sesja EN (rola 09, tryb fix, 2026-11-12): poprawki przekładu po EM (09-lokalizacja-001…010).
// Dane i kontrole w jednym miejscu: dla każdego ID lista zamian (stary → nowy, dokładnie `n` wystąpień) i kontrole akceptacyjne
// (wyrażenie regularne w plikach; oczekiwane 0 trafień). Kontrola czerwona = problem jest w treści; zielona = naprawione.
//
//   node docs/lokalizacja/narzedzia/en-poprawki.mjs sprawdz [ID…]   kod 1, gdy któraś kontrola ma trafienia
//   node docs/lokalizacja/narzedzia/en-poprawki.mjs zastosuj ID…    nakłada zamiany (każdy `stary` musi wystąpić `n` razy)
//   node docs/lokalizacja/narzedzia/en-poprawki.mjs mech            znaczniki {{n:}}/{{w:}}/{{t:}} i cyfry vs pl (rozbieżności na stdout)
//
// Zmienia tylko content/<język>/ dla języków innych niż pl i en (polecenie EN, zakaz pl/en).
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const KOREN = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const C = (...p) => join(KOREN, 'content', ...p);
const JEZYKI = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'pt-BR', 'vi', 'zh-Hant'];

/** Zamiana: plik względem content/<język>/. `re` = true → wyrażenie regularne z flagą g (liczy trafienia). */
const z = (jezyk, plik, stary, nowy, n = 1, re = false) => ({ jezyk, plik, stary, nowy, n, re });
/** Kontrola: plik albo katalog (rozszerzenia .yaml/.md) względem content/<język>/; `re` bez trafień. */
const k = (jezyk, cel, re, opis) => ({ jezyk, cel, re: new RegExp(re, 'u'), opis });

export const POPRAWKI = {};
export const nazwa = (id) => `09-lokalizacja-${id}`;
export function dodaj(id, def) { POPRAWKI[id] = def; }

// ---- definicje (po jednym bloku na znalezisko; dopisywane commit po commicie) ----
import { DEFINICJE } from './en-poprawki-dane.mjs';
for (const [id, def] of Object.entries(DEFINICJE(z, k))) dodaj(id, def);

// ---- silnik ----
const sciezki = (jezyk, cel) => {
  const p = C(jezyk, cel);
  if (!existsSync(p)) return [];
  try { return readdirSync(p, { recursive: true }).filter((f) => /\.(ya?ml|md)$/.test(f)).map((f) => join(p, f)); } catch { return [p]; }
};

export function sprawdz(ids) {
  let zle = 0;
  for (const id of ids) {
    const d = POPRAWKI[id];
    for (const kk of d.kontrole) {
      const trafienia = [];
      for (const f of sciezki(kk.jezyk, kk.cel)) {
        readFileSync(f, 'utf8').split('\n').forEach((l, i) => { if (!l.startsWith('#') && kk.re.test(l)) trafienia.push(`${f.replace(KOREN + '/', '')}:${i + 1}`); });
      }
      zle += trafienia.length;
      console.log(`${trafienia.length ? 'CZERWONE' : 'zielone '} ${nazwa(id)} ${kk.jezyk} ${kk.opis}: ${trafienia.length} trafień${trafienia.length ? ' (' + trafienia.slice(0, 6).join(', ') + (trafienia.length > 6 ? ', …' : '') + ')' : ''}`);
    }
  }
  return zle ? 1 : 0;
}

export function zastosuj(ids) {
  let kod = 0;
  for (const id of ids) {
    for (const zm of POPRAWKI[id].zamiany) {
      const p = C(zm.jezyk, zm.plik);
      let t = readFileSync(p, 'utf8');
      // Komentarze (#…) nie są tekstem aplikacji: zamiany tylko w liniach niekomentarzowych.
      const linie = t.split('\n');
      let ile = 0;
      for (let i = 0; i < linie.length; i++) {
        if (linie[i].trimStart().startsWith('#')) continue;
        if (zm.re) {
          const r = new RegExp(zm.stary, 'gu');
          linie[i] = linie[i].replace(r, () => (ile++, zm.nowy));
        } else {
          const cz = linie[i].split(zm.stary);
          if (cz.length > 1) { ile += cz.length - 1; linie[i] = cz.join(zm.nowy); }
        }
      }
      if (ile !== zm.n) { console.log(`BŁĄD ${nazwa(id)} ${zm.jezyk}/${zm.plik}: „${String(zm.stary).slice(0, 50)}” występuje ${ile}× (oczekiwano ${zm.n}×); plik bez zmian`); kod = 1; continue; }
      writeFileSync(p, linie.join('\n'));
      console.log(`ok ${nazwa(id)} ${zm.jezyk}/${zm.plik}: ${ile}×`);
    }
  }
  return kod;
}

// Kontrola mechaniczna: te same liście tekstowe w pl i w języku; porównanie znaczników i cyfr.
function liscie(o, sc = '', w = {}) {
  if (typeof o === 'string') w[sc] = o;
  else if (Array.isArray(o)) o.forEach((x, i) => liscie(x, `${sc}[${x && x.id ? x.id : i}]`, w));
  else if (o && typeof o === 'object') for (const [kk, v] of Object.entries(o)) liscie(v, `${sc}.${kk}`, w);
  return w;
}
const znacz = (s) => ({
  n: [...s.matchAll(/\{\{n:([^}|]+)/g)].map((m) => m[1]).sort().join(','),
  w: [...s.matchAll(/\{\{w:([^}|]+)/g)].map((m) => m[1]).sort().join(','),
  t: [...new Set([...s.matchAll(/\{\{t:([^}|]+)/g)].map((m) => m[1]))].sort().join(','),
  cyfry: s.replace(/\{\{[^}]*\}\}/g, ' ').replace(/\[T:[^\]]*\]/g, ' ').match(/\d+/g)?.join(',') ?? '',
});
export function mech() {
  const yaml = createRequire(join(KOREN, 'package.json'))('yaml');
  const wyn = [];
  const pliki = (j) => ['rules.yaml', ...readdirSync(C(j, 'scenarios')).map((f) => `scenarios/${f}`), ...(existsSync(C(j, 'exams')) ? readdirSync(C(j, 'exams')).map((f) => `exams/${f}`) : [])];
  for (const j of JEZYKI) {
    for (const f of pliki(j)) {
      if (!f.endsWith('.yaml') || !existsSync(C('pl', f))) continue;
      const a = liscie(yaml.parse(readFileSync(C('pl', f), 'utf8')));
      const b = liscie(yaml.parse(readFileSync(C(j, f), 'utf8')));
      for (const [sc, tb] of Object.entries(b)) {
        if (!(sc in a)) continue;
        const za = znacz(a[sc]), zb = znacz(tb);
        for (const kk of ['n', 'w', 't', 'cyfry']) if (za[kk] !== zb[kk]) wyn.push(`${j} ${f}${sc} [${kk}] pl=${za[kk]} | ${j}=${zb[kk]}`);
      }
    }
  }
  wyn.sort();
  for (const l of wyn) console.log(l);
  console.log(`rozbieżności: ${wyn.length}`);
  return 0;
}

if (process.argv[1] && process.argv[1] === fileURLToPath(import.meta.url)) {
  const [kmd, ...ids] = process.argv.slice(2);
  const wybrane = ids.length ? ids.map((i) => i.replace(/^09-lokalizacja-/, '')) : Object.keys(POPRAWKI);
  const bez = wybrane.filter((i) => !POPRAWKI[i]);
  if (bez.length) { console.log(`brak definicji: ${bez.join(', ')}`); process.exit(2); }
  process.exit(kmd === 'sprawdz' ? sprawdz(wybrane) : kmd === 'zastosuj' ? zastosuj(wybrane) : kmd === 'mech' ? mech() : (console.log('użycie: patrz nagłówek'), 2));
}
