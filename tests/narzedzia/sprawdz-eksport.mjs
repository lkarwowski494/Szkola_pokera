// Kontrola pliku eksportu z telefonu przed commitem do tests/dane/eksport/ (strategia.md §4; ADR 0008; repo publiczne, zasada wspólna 14).
// Plik trafia do repo tylko bez błędów: pola koperty ADR 0008, tabele i kolumny z schemat.sql, bez adresów e-mail i nazw urządzeń.
// Uruchom: node tests/narzedzia/sprawdz-eksport.mjs <plik.json> [<schemat.sql> [<schemat-v2.sql> [<schemat-v3.sql>]]]   (kod 1 przy błędzie)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const POLA_KOPERTY = ['format', 'wersja_formatu', 'utworzono', 'aplikacja', 'dane'];
export const TABELE_EKSPORTU = ['ustawienie', 'postep_lekcji', 'aktywnosc', 'odpowiedz', 'wynik_testu', 'karta', 'log_powtorki', 'wariant_historia'];
// Pliki sprzed migracji v2 (D-532) nie mają `wariant_historia`; import traktuje brak jako pustą tabelę, więc kontrola też (jak domena/eksport.ts).
export const TABELE_OPCJONALNE = ['wariant_historia'];
const KOLUMNY_JSON = new Set(['wartosc', 'miejsce', 'plan', 'wybor']);
const EMAIL = /[^\s@"]+@[^\s@"]+\.[a-z]{2,}/i;
const URZADZENIE = /\b(iPhone|iPad|iPod|MacBook|iMac|Apple Watch|Galaxy|Pixel)\b/i;
const DLUGI_TEKST = 120; // dłuższy napis to uwaga (tekst wpisany ręcznie?), nie błąd: aplikacja nie ma pól tekstowych w tabelach eksportu

// Schemat bazy = v1 (schemat.sql) + migracje (schemat-v2.sql, D-532; schemat-v3.sql, ŚR-001): kolumny tabel z plików CREATE TABLE
// i dopisane przez `ALTER TABLE … ADD COLUMN`.
export function kolumnyZeSchematu(sql) {
  const wynik = {};
  for (const m of sql.matchAll(/CREATE TABLE (\w+) \(([\s\S]*?)\n\);/g)) {
    wynik[m[1]] = m[2].split('\n').map((l) => l.trim().match(/^([a-z_]+) (TEXT|INTEGER|REAL)\b/)?.[1]).filter(Boolean);
  }
  for (const m of sql.matchAll(/^ALTER TABLE (\w+) ADD COLUMN ([a-z_]+) (?:TEXT|INTEGER|REAL)\b/gm)) {
    if (wynik[m[1]]) wynik[m[1]].push(m[2]);
  }
  return wynik;
}

export function sprawdzEksport(tekst, schematSql) {
  const bledy = [], uwagi = [];
  let k;
  try { k = JSON.parse(tekst); } catch (e) { return { bledy: [`nie JSON: ${e.message}`], uwagi }; }
  if (typeof k !== 'object' || k === null || Array.isArray(k)) return { bledy: ['koperta nie jest obiektem'], uwagi };
  for (const p of Object.keys(k)) if (!POLA_KOPERTY.includes(p)) bledy.push(`pole koperty spoza ADR 0008: ${p}`);
  for (const p of POLA_KOPERTY) if (!(p in k)) bledy.push(`brak pola koperty: ${p}`);
  if (k.format !== 'szkola-pokera-postep') bledy.push(`format: ${JSON.stringify(k.format)}`);
  if (!Number.isInteger(k.wersja_formatu)) bledy.push('wersja_formatu nie jest liczbą całkowitą');
  if (typeof k.utworzono !== 'string' || Number.isNaN(Date.parse(k.utworzono))) bledy.push('utworzono nie jest datą ISO');
  const kolumny = kolumnyZeSchematu(schematSql);
  const dane = k.dane ?? {};
  for (const t of Object.keys(dane)) if (!TABELE_EKSPORTU.includes(t)) bledy.push(`tabela spoza eksportu: ${t}`);
  const napisy = (w, sciezka) => {
    if (typeof w === 'string') {
      if (EMAIL.test(w)) bledy.push(`${sciezka}: adres e-mail`);
      if (URZADZENIE.test(w)) bledy.push(`${sciezka}: nazwa urządzenia`);
      if (w.length > DLUGI_TEKST) uwagi.push(`${sciezka}: napis ${w.length} znaków (tekst wpisany ręcznie?)`);
    } else if (w && typeof w === 'object') for (const [kl, v] of Object.entries(w)) { napisy(kl, `${sciezka}<klucz>`); napisy(v, `${sciezka}.${kl}`); }
  };
  for (const t of TABELE_EKSPORTU) {
    if (dane[t] === undefined && TABELE_OPCJONALNE.includes(t)) continue;
    if (!Array.isArray(dane[t])) { bledy.push(`brak tabeli ${t}`); continue; }
    const dozwolone = new Set(kolumny[t] ?? []);
    dane[t].forEach((wiersz, i) => {
      for (const [kol, v] of Object.entries(wiersz ?? {})) {
        const sc = `${t}[${i}].${kol}`;
        if (!dozwolone.has(kol)) bledy.push(`${sc}: kolumna spoza schemat.sql`);
        if (KOLUMNY_JSON.has(kol) && typeof v === 'string') {
          try { napisy(JSON.parse(v), sc); } catch { bledy.push(`${sc}: nie JSON`); }
        } else napisy(v, sc);
      }
    });
  }
  return { bledy, uwagi };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [plik, schemat = fileURLToPath(new URL('../../docs/architektura/schemat.sql', import.meta.url)),
    schematV2 = fileURLToPath(new URL('../../docs/architektura/schemat-v2.sql', import.meta.url)),
    schematV3 = fileURLToPath(new URL('../../docs/architektura/schemat-v3.sql', import.meta.url))] = process.argv.slice(2);
  if (!plik) { console.error('użycie: node tests/narzedzia/sprawdz-eksport.mjs <plik.json> [<schemat.sql> [<schemat-v2.sql>]]'); process.exit(2); }
  const { bledy, uwagi } = sprawdzEksport(readFileSync(plik, 'utf8'), `${readFileSync(schemat, 'utf8')}\n${readFileSync(schematV2, 'utf8')}\n${readFileSync(schematV3, 'utf8')}`);
  for (const u of uwagi) console.log(`UWAGA ${u}`);
  for (const b of bledy) console.log(`BŁĄD  ${b}`);
  console.log(`${bledy.length} błędów, ${uwagi.length} uwag`);
  process.exit(bledy.length ? 1 : 0);
}
