#!/usr/bin/env node
// Bramka E2E przed wysyłką do TestFlight (D-170). Na TYM SAMYM commicie musi istnieć zielony przebieg e2e.yml (każdy przebieg
// e2e.yml uruchamia cały zestaw flowów z bramki; urządzenie i wygląd nie zawężają zestawu). Trwający przebieg: czeka. Czerwony
// albo brak: błąd z instrukcją. Analogia: Trening scripts/ci/bramka-e2e.sh (odczyt 2026-11-07, D-191). Odstępstwa nazwane:
// (1) Node zamiast basha — skrypty scripts/ci/ w tym repo są w Node z testami `node --test`; (2) bez filtra tytułu przebiegu —
// e2e.yml nie ma pakietów ani wyboru flowów; (3) przebieg anulowany albo pominięty nie jest czerwony — nie mówi nic o kodzie
// (push anuluje poprzedni przebieg tej samej gałęzi, D-190), więc bez innego przebiegu kończy się jak „brak”.
// Użycie: node scripts/ci/bramka-e2e.mjs <właściciel/repo> <sha>; wymaga `gh` i GH_TOKEN z actions: read.
// Zmienne: BRAMKA_POLL_SEC (60), BRAMKA_GRACE_POLLS (5 — sprawdzenia na pojawienie się przebiegu), BRAMKA_MAX_POLLS (60).
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const NIEISTOTNE = new Set(['cancelled', 'skipped', 'neutral', 'stale']);

/** Stan bramki z listy przebiegów e2e.yml na jednym commicie: ok > trwa > czerwony > brak. */
export function ocen(przebiegi) {
  const ok = przebiegi.find((r) => r.status === 'completed' && r.conclusion === 'success');
  if (ok) return { stan: 'ok', id: ok.id };
  const trwa = przebiegi.find((r) => r.status !== 'completed');
  if (trwa) return { stan: 'trwa', id: trwa.id };
  const zly = przebiegi.find((r) => r.status === 'completed' && !NIEISTOTNE.has(r.conclusion));
  if (zly) return { stan: 'czerwony', id: zly.id };
  return { stan: 'brak' };
}

/** Pętla czekania; zależności wstrzykiwane (testy). Zwraca kod wyjścia. */
export function czekaj({ pobierz, spij, pisz, sha, grace, max, pollSec = 60, wynik = () => {} }) {
  const krotki = sha.slice(0, 7);
  for (let n = 1; ; n++) {
    let przebiegi = [];
    try {
      przebiegi = pobierz();
    } catch (e) {
      pisz(`Bramka E2E: błąd zapytania do GitHuba (${e.message}) — liczę jako brak danych`);
    }
    const s = ocen(przebiegi);
    if (s.stan === 'ok') {
      pisz(`Bramka E2E: OK — zielony przebieg e2e.yml #${s.id} na commicie ${krotki}`);
      wynik('run', s.id);
      return 0;
    }
    if (s.stan === 'trwa') {
      if (n >= max) {
        pisz(`::error::Bramka E2E: limit czekania (${max} × ${pollSec} s) — przebieg e2e.yml #${s.id} nadal trwa. Poczekaj na wynik i uruchom TestFlight ponownie.`);
        return 1;
      }
      pisz(`Bramka E2E: czekam na przebieg e2e.yml #${s.id} (sprawdzenie ${n})`);
    } else if (s.stan === 'czerwony') {
      pisz(`::error::Bramka E2E: przebieg e2e.yml #${s.id} na commicie ${krotki} jest czerwony — popraw, poczekaj na zielony przebieg i ponów.`);
      return 1;
    } else {
      if (n >= grace) {
        pisz(`::error::Bramka E2E: brak przebiegu e2e.yml na commicie ${krotki}. Uruchom Actions → „E2E (Maestro, symulator iOS)” → Run workflow na tej gałęzi, poczekaj na zielony wynik i ponów TestFlight. Awaria E2E nie z winy kodu (maszyna): wejścia pomin_bramke_e2e + powod.`);
        return 1;
      }
      pisz(`Bramka E2E: jeszcze brak przebiegu E2E dla ${krotki} (sprawdzenie ${n} z ${grace})`);
    }
    spij(pollSec);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const [repo, sha] = process.argv.slice(2);
  if (!repo || !sha) {
    console.error('Użycie: bramka-e2e.mjs <właściciel/repo> <sha>');
    process.exit(2);
  }
  const liczba = (k, d) => (process.env[k] ? Number(process.env[k]) : d);
  const kod = czekaj({
    pobierz: () =>
      JSON.parse(execFileSync('gh', ['api', `repos/${repo}/actions/workflows/e2e.yml/runs?head_sha=${sha}&per_page=100`], { encoding: 'utf8' }))
        .workflow_runs.map(({ id, status, conclusion }) => ({ id, status, conclusion })),
    spij: (s) => execFileSync('sleep', [String(s)]),
    pisz: (t) => console.log(t),
    sha,
    pollSec: liczba('BRAMKA_POLL_SEC', 60),
    grace: liczba('BRAMKA_GRACE_POLLS', 5),
    max: liczba('BRAMKA_MAX_POLLS', 60),
    wynik: (k, v) => process.env.GITHUB_OUTPUT && appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`),
  });
  process.exit(kod);
}
