// Dane pokazowe do zrzutów sklepu (K-12, D-337): baza `postep.db` zbudowana tym samym kodem co w aplikacji (packages/postep:
// uruchomPostep z migracjami, zapiszUstawienie, oznaczTeoriePrzeczytana) przez adapter node:sqlite z testów. Wzór: Trening
// scripts/screens/store-seed.test.ts + scripts/ci/store-screenshots.sh:31–44 (stan zapisany w bazie aplikacji przed zrzutem; 2e4b0f8,
// odczyt 2026-11-09). Zawartość zmyślona: ukończone powitanie (punkt startu m0, jak „Pomiń” w ocenie poziomu), język aplikacji
// i przeczytana teoria pierwszych lekcji w kolejności kursu — bez danych osobowych i bez identyfikatorów urządzenia.
// Użycie: node scripts/ci/dane-pokazowe.mjs <katalog_wyjścia> <język>  → <katalog>/postep.db
import { mkdirSync, readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { tsImport } from 'tsx/esm/api';

const ROOT = resolve(fileURLToPath(new URL('../..', import.meta.url)));
/** Liczba lekcji z przeczytaną teorią (pierwsze w kolejności kursu): „Dziś” i lista lekcji pokazują postęp, nie pusty start. */
export const LEKCJI_PRZECZYTANYCH = 3;
/** Chwila zapisu danych pokazowych: stała, żeby baza była powtarzalna (2026-11-09 08:00 UTC). */
export const CHWILA = Date.UTC(2026, 10, 9, 8, 0, 0);

/** Lekcje w kolejności kursu: moduł (order w modules.yaml), potem order lekcji z front matter. */
export function lekcjeWKolejnosci(root = ROOT) {
  const moduly = parse(readFileSync(join(root, 'content/pl/modules.yaml'), 'utf8'));
  const kolejnoscModulu = new Map(moduly.map((m) => [m.id, m.order]));
  const kat = join(root, 'content/pl/lessons');
  return readdirSync(kat).filter((f) => f.endsWith('.md')).map((f) => {
    const t = readFileSync(join(kat, f), 'utf8');
    const fm = parse(t.slice(3, t.indexOf('\n---', 3)));
    return { id: fm.id, modul: fm.module ?? String(fm.id).split('.')[0], order: fm.order ?? 0 };
  }).sort((a, b) => (kolejnoscModulu.get(a.modul) ?? 99) - (kolejnoscModulu.get(b.modul) ?? 99) || a.order - b.order).map((l) => l.id);
}

const sprawdz = (w, co) => { if (!w.ok) throw new Error(`${co}: ${w.powod}`); return w.wartosc; };

export async function zbudujDanePokazowe(katalog, jezyk, root = ROOT) {
  const P = await tsImport(join(root, 'packages/postep/src/index.ts'), import.meta.url);
  const { adapterNode, otworzNode } = await tsImport(join(root, 'tests/narzedzia/postep-node.ts'), import.meta.url);
  const { plikiNode } = await tsImport(join(root, 'tests/narzedzia/pliki-node.ts'), import.meta.url);
  mkdirSync(katalog, { recursive: true });
  if (existsSync(join(katalog, 'postep.db'))) throw new Error(`${katalog}/postep.db już istnieje (dane pokazowe tylko do pustego katalogu)`);
  const { port } = await P.uruchomPostep({ katalog, pliki: plikiNode().pliki, otworz: async (s) => adapterNode(otworzNode(s)), terazMs: CHWILA });
  try {
    const lekcje = lekcjeWKolejnosci(root);
    sprawdz(await P.zapiszUstawienie(port, 'punkt_startu', { modulId: 'm0', ustawionoMs: CHWILA }, CHWILA), 'punkt_startu');
    sprawdz(await P.zapiszUstawienie(port, 'jezyk', jezyk, CHWILA), 'jezyk');
    for (const [i, id] of lekcje.slice(0, LEKCJI_PRZECZYTANYCH).entries()) sprawdz(await P.oznaczTeoriePrzeczytana(port, id, CHWILA + i * 60_000), `lekcja ${id}`);
    return { plik: join(katalog, 'postep.db'), lekcje: lekcje.slice(0, LEKCJI_PRZECZYTANYCH) };
  } finally {
    await port.zamknij();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [katalog, jezyk] = process.argv.slice(2);
  if (!katalog || !jezyk) { console.error('Użycie: node scripts/ci/dane-pokazowe.mjs <katalog_wyjścia> <język>'); process.exit(2); }
  zbudujDanePokazowe(resolve(katalog), jezyk).then((w) => console.log(`dane pokazowe (${jezyk}): ${w.lekcje.length} lekcji, plik postep.db`), (e) => { console.error(e.message); process.exit(1); });
}
