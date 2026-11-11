// E2E iOS: podział flowów Maestro na części (równoległe joby macOS w e2e-ios.yml; DT, 2026-11-11).
// Wzór: Trening e2e-ios.yml:5–7, 121–133 (macierz `shard`, podział skryptem; odczyt 2026-11-11). Odstępstwo nazwane: wagi to liczba
// kroków flowu (linie „- ” w pliku), nie zmierzone czasy — Trening ma czasy z przebiegu (e2e-shards.json), tu jest 9 małych flowów.
// Zachowanie flowów, progów i bramek bez zmian: część dostaje kopię katalogu e2e z config.yaml, wspolne/ i oczekujace/ oraz
// WYŁĄCZNIE swoimi flowami z katalogu głównego (config `flows: '*.yaml'` uruchamia dokładnie je, kolejność i continueOnFailure jak dotąd).
// Użycie:
//   e2e-podzial.mjs czesc <N> <M> <katalog-e2e> <katalog-wyjscia>  → kopia dla części N z M, lista flowów części na stdout
//   e2e-podzial.mjs sprawdz <M> <katalog-e2e>                       → kod 1, gdy części nie dają razem dokładnie wszystkich flowów
//   e2e-podzial.mjs razem <katalog-e2e> <katalog-wyników>           → kod 1, gdy raporty części (wyniki/<część>/report.xml + ponowienia) nie mają zielonego każdego flowu
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mapaFlowow, oczekiwane, przypadki } from './e2e-ponowienia.mjs';

/** Flowy w katalogu głównym (bez config.yaml), posortowane po nazwie. */
export function flowyBramki(katalog) {
  return readdirSync(katalog).filter((f) => f.endsWith('.yaml') && f !== 'config.yaml').sort();
}

export const waga = (katalog, plik) => readFileSync(join(katalog, plik), 'utf8').split('\n').filter((l) => /^\s*- /.test(l)).length || 1;

/** Zachłannie (najcięższy do najlżejszej części); remis wagi → nazwa; wynik deterministyczny. Zwraca M list posortowanych po nazwie. */
export function podziel(flowy, wagi, m) {
  const czesci = Array.from({ length: m }, () => ({ suma: 0, flowy: [] }));
  for (const f of [...flowy].sort((a, b) => wagi[b] - wagi[a] || a.localeCompare(b))) {
    const c = czesci.reduce((min, x) => (x.suma < min.suma ? x : min));
    c.flowy.push(f);
    c.suma += wagi[f];
  }
  return czesci.map((c) => c.flowy.sort());
}

export function czesci(katalog, m) {
  const flowy = flowyBramki(katalog);
  return podziel(flowy, Object.fromEntries(flowy.map((f) => [f, waga(katalog, f)])), m);
}

/** Błędy podziału: pusta część, powtórzony albo brakujący flow. Pusta lista = lista flowów przed i po identyczna. */
export function bledy(katalog, m) {
  const wszystkie = flowyBramki(katalog);
  const c = czesci(katalog, m);
  const razem = c.flat();
  const e = [];
  c.forEach((x, i) => x.length || e.push(`część ${i + 1} jest pusta`));
  for (const f of razem) if (razem.indexOf(f) !== razem.lastIndexOf(f)) e.push(`flow ${f} w więcej niż jednej części`);
  for (const f of wszystkie) if (!razem.includes(f)) e.push(`flow ${f} w żadnej części`);
  if (razem.length !== wszystkie.length) e.push(`liczba flowów po podziale ${razem.length} ≠ przed ${wszystkie.length}`);
  return e;
}

/** Flowy bramki bez zielonego wyniku w raportach części (pierwszy przebieg albo ponowienie). Pusta lista = wszystkie wykonane i zielone. */
export function brakujace(katalogE2e, raporty) {
  const zielone = new Set(raporty.flatMap(przypadki).filter((p) => p.ok).map((p) => p.nazwa));
  return oczekiwane(mapaFlowow(katalogE2e)).filter((n) => !zielone.has(n));
}

function raportyCzesci(katalog) {
  if (!existsSync(katalog)) return [];
  return readdirSync(katalog, { withFileTypes: true }).filter((d) => d.isDirectory()).flatMap((d) =>
    readdirSync(join(katalog, d.name)).filter((f) => /^(report|ponowienie-\d+)\.xml$/.test(f)).map((f) => readFileSync(join(katalog, d.name, f), 'utf8')));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [polecenie, ...a] = process.argv.slice(2);
  if (polecenie === 'czesc') {
    const [n, m, katalog, wyjscie] = a;
    const lista = czesci(katalog, Number(m))[Number(n) - 1];
    if (!lista?.length) { console.error(`część ${n}/${m} pusta albo poza zakresem`); process.exit(1); }
    rmSync(wyjscie, { recursive: true, force: true });
    mkdirSync(wyjscie, { recursive: true });
    cpSync(katalog, wyjscie, { recursive: true });
    for (const f of flowyBramki(wyjscie)) if (!lista.includes(f)) rmSync(join(wyjscie, f));
    console.log(lista.join('\n'));
  } else if (polecenie === 'sprawdz') {
    const [m, katalog] = a;
    const e = bledy(katalog, Number(m));
    if (e.length) { console.error(e.join('\n')); process.exit(1); }
    console.log(`flowów ${flowyBramki(katalog).length} w ${m} częściach: ${czesci(katalog, Number(m)).map((c) => c.length).join(' + ')} (bez braków i powtórzeń)`);
  } else if (polecenie === 'razem') {
    const [katalog, wyniki] = a;
    const brak = brakujace(katalog, raportyCzesci(wyniki));
    const n = oczekiwane(mapaFlowow(katalog)).length;
    if (brak.length) { console.log(`## E2E razem\n\n- brak zielonego wyniku: ${brak.join(', ')}`); process.exit(1); }
    console.log(`## E2E razem\n\n- wszystkie ${n} flowów bramki wykonane i zielone (części razem)`);
  } else {
    console.error('użycie: e2e-podzial.mjs czesc <N> <M> <katalog-e2e> <wyjscie> | sprawdz <M> <katalog-e2e> | razem <katalog-e2e> <wyniki>');
    process.exit(2);
  }
}
