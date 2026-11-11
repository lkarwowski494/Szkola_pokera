// Test skrótu wersji zdań (przeglad.sha) w scal-rejestr.mjs: przegląd twierdzenia krytycznego jest ważny tylko dla
// wersji tekstu, którą widział recenzent. Zmiana wpisu pomocy albo lekcji używającej reguły unieważnia przegląd.
// Uruchamianie: node --test docs/tresci/narzedzia/scal-rejestr.test.mjs (z katalogu głównego repo; część pnpm test:skrypty).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, symlinkSync, rmSync, realpathSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const repo = resolve(new URL('../../..', import.meta.url).pathname);
const ZAST = 'weryfikacja zastępcza (subagent)';

function kopia() {
  const d = mkdtempSync(join(tmpdir(), 'scal-rejestr-'));
  for (const p of ['content/pl/rules.yaml', 'content/pl/lessons', 'content/pl/exams', 'content/numbers.yaml', 'content/terms.yaml', 'content/helplines.yaml', 'docs/tresci/rejestr', 'docs/tresci/narzedzia/scal-rejestr.mjs', 'docs/tresci/narzedzia/kontrole-tresci.mjs', 'tools/content-build/package.json']) {
    cpSync(join(repo, p), join(d, p), { recursive: true });
  }
  // pnpm: node_modules/yaml to dowiązanie względne do magazynu; w kopii wskazujemy rzeczywistą ścieżkę pakietu
  mkdirSync(join(d, 'tools/content-build/node_modules'), { recursive: true });
  const yaml = dirname(createRequire(join(repo, 'tools/content-build/package.json')).resolve('yaml/package.json'));
  symlinkSync(realpathSync(yaml), join(d, 'tools/content-build/node_modules/yaml'));
  return d;
}
const uruchom = (d, ...a) => spawnSync(process.execPath, ['docs/tresci/narzedzia/scal-rejestr.mjs', ...a], { cwd: d, encoding: 'utf8' });
const skrotZ = (out, id) => out.match(new RegExp(`^SKRÓT ${id} ([0-9a-f]{12})`, 'm'))?.[1];
function ustawPrzeglad(d, partia, id, sha) {
  const p = join(d, 'docs/tresci/rejestr', partia), r = JSON.parse(readFileSync(p, 'utf8'));
  r.find((w) => w.id === id).przeglad = { kto: ZAST, data: '2026-11-04', sha };
  writeFileSync(p, JSON.stringify(r, null, 1) + '\n');
}

test('zmiana wpisu pomocy unieważnia przegląd zastępczy H-INT-1', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-INT-1');
    assert.match(sha ?? '', /^[0-9a-f]{12}$/);
    ustawPrzeglad(d, 'pomoc.json', 'H-INT-1', sha);
    assert.doesNotMatch(uruchom(d, '--przeglad', 'zastępczy').stdout, /H-INT-1: (krytyczne bez|przegląd dotyczy)/);
    const h = join(d, 'content/helplines.yaml');
    writeFileSync(h, readFileSync(h, 'utf8').replace('wsparcie emocjonalne online', 'wsparcie online'));
    const po = uruchom(d, '--przeglad', 'zastępczy');
    assert.match(po.stdout, /BŁĄD rejestr H-INT-1: przegląd dotyczy innej wersji zdań/);
    assert.equal(po.status, 1);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('zmiana lekcji z regułą krytyczną unieważnia przegląd; z --przed-przegladem to uwaga', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'R-M12-011');
    ustawPrzeglad(d, 'm12-m13.json', 'R-M12-011', sha);
    const l = join(d, 'content/pl/lessons/m12-l4-bankroll.md');
    writeFileSync(l, readFileSync(l, 'utf8') + '\nNowe zdanie.\n');
    assert.match(uruchom(d, '--przeglad', 'zastępczy').stdout, /BŁĄD rejestr R-M12-011: przegląd dotyczy innej wersji zdań/);
    assert.match(uruchom(d, '--przed-przegladem').stdout, /UWAGA rejestr R-M12-011: przegląd dotyczy innej wersji zdań/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('przegląd zastępczy bez polityki --przeglad zastępczy jest błędem', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-INT-1');
    ustawPrzeglad(d, 'pomoc.json', 'H-INT-1', sha);
    assert.match(uruchom(d).stdout, /BŁĄD rejestr H-INT-1: krytyczne bez przeglądu człowieka \(zastępczy bez polityki D-027\)/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('D-158: zmiana zdania ogólnego (fallback.text) unieważnia przegląd H-INT-2; twierdzenie fallback.claim liczy się do pokrycia', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-INT-2');
    assert.match(sha ?? '', /^[0-9a-f]{12}$/);
    ustawPrzeglad(d, 'pomoc.json', 'H-INT-2', sha);
    assert.doesNotMatch(uruchom(d, '--przeglad', 'zastępczy').stdout, /H-INT-2: (krytyczne bez|przegląd dotyczy)/);
    const h = join(d, 'content/helplines.yaml');
    writeFileSync(h, readFileSync(h, 'utf8').replace('specjalistą zdrowia psychicznego', 'psychologiem'));
    assert.match(uruchom(d, '--przeglad', 'zastępczy').stdout, /BŁĄD rejestr H-INT-2: przegląd dotyczy innej wersji zdań/);
    writeFileSync(h, readFileSync(h, 'utf8').replace('claim: H-INT-2', 'claim: H-INT-9'));
    assert.match(uruchom(d, '--przed-przegladem').stdout, /BŁĄD pokrycie: brak wpisu H-INT-9/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

// Rola 09, K2d: treść krytyczna w języku innym niż polski wymaga zapisu kontroli (a) dla wersji zdań tego języka.
test('content/en bez kontroli (a) = błąd; zapis ze skrótem en = zgodne; zmiana zdania en unieważnia', () => {
  const d = kopia();
  try {
    // stan wyjściowy niezależny od repo: bez content/en i bez zapisów przeglad_jezyki (od D-345 repo ma oba dla en)
    rmSync(join(d, 'content/en'), { recursive: true, force: true });
    for (const f of readdirSync(join(d, 'docs/tresci/rejestr')).filter((x) => x.endsWith('.json'))) {
      const pf = join(d, 'docs/tresci/rejestr', f), a = JSON.parse(readFileSync(pf, 'utf8'));
      if (Array.isArray(a)) { for (const w of a) delete w.przeglad_jezyki; writeFileSync(pf, JSON.stringify(a, null, 1) + '\n'); }
    }
    for (const p of ['lessons', 'exams', 'rules.yaml']) cpSync(join(d, 'content/pl', p), join(d, 'content/en', p), { recursive: true });
    cpSync(join(d, 'content/helplines.yaml'), join(d, 'content/en/helplines.yaml'));
    const r1 = uruchom(d, '--przeglad', 'zastępczy');
    assert.match(r1.stdout, /H-INT-2: treść krytyczna w en bez kontroli \(a\)/);
    assert.equal(r1.status, 1);
    const sha = r1.stdout.match(/^SKRÓT en H-INT-2 ([0-9a-f]{12})/m)?.[1] ?? uruchom(d, '--przed-przegladem', '--skroty').stdout.match(/^SKRÓT en H-INT-2 ([0-9a-f]{12})/m)?.[1];
    assert.match(sha ?? '', /^[0-9a-f]{12}$/);
    const p = join(d, 'docs/tresci/rejestr/pomoc.json'), r = JSON.parse(readFileSync(p, 'utf8'));
    r.find((w) => w.id === 'H-INT-2').przeglad_jezyki = { en: { kto: ZAST, data: '2026-11-09', sha, kontrola: 'a' } };
    writeFileSync(p, JSON.stringify(r, null, 1) + '\n');
    assert.doesNotMatch(uruchom(d, '--przeglad', 'zastępczy').stdout, /H-INT-2: (treść krytyczna w en|kontrola \(a\) w en)/);
    const h = join(d, 'content/en/helplines.yaml');
    writeFileSync(h, readFileSync(h, 'utf8').replace(/text: 'Jeśli rozpoznajesz/, "text: 'If you recognise"));
    assert.match(uruchom(d, '--przeglad', 'zastępczy').stdout, /H-INT-2: kontrola \(a\) w en dotyczy innej wersji zdań/);
  } finally {
    rmSync(d, { recursive: true, force: true });
  }
});

// Rola 09, K2d (otwarte nr 2 sesji V): termin krytyczny w języku ≠ pl ma w skrócie definicję z content/<j>/terms-def.yaml —
// w en ekran słowniczka pokazuje tę definicję, więc jej zmiana unieważnia kontrolę (a). Bez tego skrót brał tylko terms.yaml.
test('zmiana definicji en (terms-def.yaml) zmienia skrót en terminu krytycznego, a skrót pl zostaje', () => {
  const d = kopia();
  try {
    mkdirSync(join(d, 'content/en'), { recursive: true });
    cpSync(join(repo, 'content/en/terms-def.yaml'), join(d, 'content/en/terms-def.yaml'));
    const skroty = () => uruchom(d, '--przed-przegladem', '--skroty').stdout;
    const s1 = skroty();
    const en1 = s1.match(/^SKRÓT en t:bankroll ([0-9a-f]{12})/m)?.[1], pl1 = skrotZ(s1, 't:bankroll');
    assert.match(en1 ?? '', /^[0-9a-f]{12}$/);
    const p = join(d, 'content/en/terms-def.yaml');
    writeFileSync(p, readFileSync(p, 'utf8').replace(/^bankroll: .*$/m, 'bankroll: Money set aside only for playing.'));
    const s2 = skroty();
    assert.notEqual(s2.match(/^SKRÓT en t:bankroll ([0-9a-f]{12})/m)?.[1], en1);
    assert.equal(skrotZ(s2, 't:bankroll'), pl1);
    assert.equal(s2.match(/^SKRÓT en t:risk-of-ruin ([0-9a-f]{12})/m)?.[1], s1.match(/^SKRÓT en t:risk-of-ruin ([0-9a-f]{12})/m)?.[1]);
  } finally {
    rmSync(d, { recursive: true, force: true });
  }
});

// 06-tresci-001 (recenzja BX, opcja b): przekład treści krytycznej zapisuje skrót wersji pl, z której powstał
// (przeglad_jezyki.<j>.sha_pl); zmiana pl bez przekładu = błąd w każdym języku. Dlaczego: skrót języka liczy się ze źródeł
// tego języka, więc sama zmiana pl go nie unieważniała, a CI przechodziło (BN 06-tresci-006, BX 06-tresci-001).
const J11 = ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt-BR', 'pt', 'vi', 'zh-Hant'];
function odnow(d) {
  // symuluje przegląd po przekładzie: zapisuje bieżące skróty pl, języka i sha_pl we wszystkich wpisach krytycznych
  const out = uruchom(d, '--przed-przegladem', '--skroty').stdout;
  const pl = (id) => out.match(new RegExp(`^SKRÓT ${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} ([0-9a-f]{12})`, 'm'))?.[1];
  const jz = (j, id) => out.match(new RegExp(`^SKRÓT ${j} ${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} ([0-9a-f]{12})`, 'm'))?.[1];
  const kat = join(d, 'docs/tresci/rejestr');
  for (const f of readdirSync(kat).filter((x) => x.endsWith('.json') && x !== 'bez-twierdzen.json')) {
    const p = join(kat, f), a = JSON.parse(readFileSync(p, 'utf8'));
    for (const w of a) {
      if (!w.krytyczne || !pl(w.id)) continue;
      if (w.przeglad) w.przeglad.sha = pl(w.id);
      for (const j of J11) if (w.przeglad_jezyki?.[j]) Object.assign(w.przeglad_jezyki[j], { sha: jz(j, w.id), sha_pl: pl(w.id) });
    }
    writeFileSync(p, JSON.stringify(a, null, 1) + '\n');
  }
}
test('06-tresci-001: zmiana why w pl bez przekładu = błąd R-M12-009 w 11 językach; po przekładzie i zapisie sha_pl 0 błędów', () => {
  const d = kopia();
  try {
    for (const j of J11) cpSync(join(repo, 'content', j), join(d, 'content', j), { recursive: true });
    odnow(d); // stan wyjściowy: zapisy zgodne z bieżącymi źródłami (sha_pl dopisane)
    const baza = uruchom(d, '--przeglad', 'zastępczy');
    assert.equal(baza.status, 0, baza.stdout);
    const plik = join(d, 'content/pl/exams/m12.yaml');
    const t = readFileSync(plik, 'utf8');
    assert.ok(t.includes('Dodatni winrate nie chroni przed {{t:variance|wariancją}}: ryzyko'));
    writeFileSync(plik, t.replace('Dodatni winrate nie chroni przed {{t:variance|wariancją}}: ryzyko', 'Dodatni winrate nie chroni przed {{t:variance|wariancją}} w żadnej próbie: ryzyko'));
    // przegląd pl zmienia się także (skrót pl), ale to osobny błąd; tu liczy się brak przekładu w każdym języku
    const po = uruchom(d, '--przeglad', 'zastępczy');
    assert.equal(po.status, 1);
    for (const j of J11) assert.match(po.stdout, new RegExp(`BŁĄD rejestr R-M12-009: przekład w ${j} powstał z innej wersji pl`), `brak błędu dla ${j}`);
    // przekład (zmiana tekstu w każdym języku) i zapis skrótów: 0 błędów
    for (const j of J11) { const pj = join(d, 'content', j, 'exams/m12.yaml'); writeFileSync(pj, readFileSync(pj, 'utf8') + '\n# przekład zmiany pl\n'); }
    odnow(d);
    const koniec = uruchom(d, '--przeglad', 'zastępczy');
    assert.equal(koniec.status, 0, koniec.stdout);
    assert.doesNotMatch(koniec.stdout, /przekład w \S+ powstał/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('06-tresci-001: z --przed-przegladem zmiana pl bez przekładu to uwaga, nie błąd', () => {
  const d = kopia();
  try {
    for (const j of J11) cpSync(join(repo, 'content', j), join(d, 'content', j), { recursive: true });
    odnow(d);
    const plik = join(d, 'content/pl/exams/m12.yaml');
    writeFileSync(plik, readFileSync(plik, 'utf8') + '\n# zmiana\n');
    const r = uruchom(d, '--przed-przegladem');
    assert.match(r.stdout, /UWAGA rejestr R-M12-009: przekład w en powstał z innej wersji pl/);
    assert.doesNotMatch(r.stdout, /BŁĄD rejestr R-M12-009: przekład/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('ŚR-2 (recenzja DB): usunięcie sha_pl z wpisu spoza listy dozwolonych to BŁĄD (zapadka), z --przed-przegladem uwaga', () => {
  const d = kopia();
  try {
    for (const j of J11) cpSync(join(repo, 'content', j), join(d, 'content', j), { recursive: true });
    odnow(d);
    assert.equal(uruchom(d, '--przeglad', 'zastępczy').status, 0);
    const wytnij = (partia, id, j) => {
      const p = join(d, 'docs/tresci/rejestr', partia), r = JSON.parse(readFileSync(p, 'utf8'));
      delete r.find((w) => w.id === id).przeglad_jezyki[j].sha_pl;
      writeFileSync(p, JSON.stringify(r, null, 1) + '\n');
    };
    wytnij('m12-m13.json', 'R-M12-009', 'en');
    const po = uruchom(d, '--przeglad', 'zastępczy');
    assert.equal(po.status, 1, po.stdout);
    assert.match(po.stdout, /BŁĄD rejestr R-M12-009: przegląd w en bez sha_pl/);
    const przed = uruchom(d, '--przed-przegladem');
    assert.doesNotMatch(przed.stdout, /BŁĄD rejestr R-M12-009: przegląd w en bez sha_pl/);
    assert.match(przed.stdout, /UWAGA rejestr R-M12-009: przegląd w en bez sha_pl/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('ŚR-2: wpis z listy dozwolonych bez sha_pl (np. t:bankroll) nie jest błędem, tylko uwagą zbiorczą', () => {
  const d = kopia();
  try {
    for (const j of J11) cpSync(join(repo, 'content', j), join(d, 'content', j), { recursive: true });
    odnow(d);
    const kat = join(d, 'docs/tresci/rejestr');
    for (const f of readdirSync(kat).filter((x) => x.endsWith('.json') && x !== 'bez-twierdzen.json')) {
      const p = join(kat, f), a = JSON.parse(readFileSync(p, 'utf8'));
      for (const w of a) if (w.id === 't:bankroll') for (const j of J11) delete w.przeglad_jezyki?.[j]?.sha_pl;
      writeFileSync(p, JSON.stringify(a, null, 1) + '\n');
    }
    const r = uruchom(d, '--przeglad', 'zastępczy');
    assert.equal(r.status, 0, r.stdout);
    assert.match(r.stdout, /UWAGA przeglad_jezyki bez sha_pl/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});
