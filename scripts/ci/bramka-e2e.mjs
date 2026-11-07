#!/usr/bin/env node
// Bramka E2E przed wysyłką do TestFlight (D-170). Na TYM SAMYM commicie musi istnieć zielony przebieg e2e-ios.yml (każdy przebieg
// e2e-ios.yml uruchamia cały zestaw flowów z bramki; urządzenie i wygląd nie zawężają zestawu). Trwający przebieg: czeka. Czerwony
// albo brak: błąd z instrukcją. Analogia: Trening scripts/ci/bramka-e2e.sh (odczyt 2026-11-07, D-191). Odstępstwa nazwane:
// (1) Node zamiast basha — skrypty scripts/ci/ w tym repo są w Node z testami `node --test`; (2) bez filtra tytułu przebiegu —
// e2e-ios.yml nie ma pakietów ani wyboru flowów; (3) przebieg anulowany albo pominięty nie jest czerwony — nie mówi nic o kodzie
// (push anuluje poprzedni przebieg tej samej gałęzi, D-190), więc bez innego przebiegu kończy się jak „brak”; (4) błąd zapytania
// nie zmienia stanu — w Treningu pusta odpowiedź przy błędzie kończyła czekanie jako „brak” (przegląd D-043, 2026-11-07); po
// BLEDY_Z_RZEDU kolejnych błędach bramka pada z komunikatem o API. Jak w Treningu i D-178: zielony przebieg wygrywa także z
// nowszym czerwonym na tym samym SHA (flow migający zielony raz przechodzi; niestabilność łapie nocne zgłoszenie).
// Użycie: node scripts/ci/bramka-e2e.mjs <właściciel/repo> <sha>; wymaga `gh` i GH_TOKEN z actions: read.
// Zmienne: BRAMKA_POLL_SEC (60), BRAMKA_GRACE_POLLS (5 — sprawdzenia na pojawienie się przebiegu), BRAMKA_MAX_POLLS (75); każda musi być liczbą całkowitą > 0.
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const NIEISTOTNE = new Set(['cancelled', 'skipped', 'neutral', 'stale']);
const BLEDY_Z_RZEDU = 3;

/** Zmienna środowiskowa jako liczba całkowita > 0; brak → domyślna; inna wartość → wyjątek (NaN dałby czekanie bez końca). */
export function liczbaZmiennej(env, k, d) {
  if (env[k] === undefined || env[k] === '') return d;
  const n = Number(env[k]);
  if (!Number.isInteger(n) || n <= 0 || env[k].trim() !== env[k]) throw new Error(`${k}=${JSON.stringify(env[k])}: oczekiwana liczba całkowita > 0`);
  return n;
}

/** Stan bramki z listy przebiegów e2e-ios.yml na jednym commicie: ok > trwa > czerwony > brak. */
export function ocen(przebiegi) {
  const ok = przebiegi.find((r) => r.status === 'completed' && r.conclusion === 'success');
  if (ok) return { stan: 'ok', id: ok.id };
  const trwa = przebiegi.find((r) => r.status !== 'completed');
  if (trwa) return { stan: 'trwa', id: trwa.id };
  const zly = przebiegi.find((r) => r.status === 'completed' && !NIEISTOTNE.has(r.conclusion));
  if (zly) return { stan: 'czerwony', id: zly.id };
  const anulowany = przebiegi.find((r) => r.status === 'completed');
  return anulowany ? { stan: 'brak', anulowany: anulowany.id } : { stan: 'brak' };
}

/** Pętla czekania; zależności wstrzykiwane (testy). Zwraca kod wyjścia. */
export function czekaj({ pobierz, spij, pisz, sha, grace, max, pollSec = 60, wynik = () => {} }) {
  const krotki = sha.slice(0, 7);
  let s = { stan: 'brak' };
  let bledy = 0;
  for (let n = 1; ; n++) {
    try {
      s = ocen(pobierz());
      bledy = 0;
    } catch (e) {
      bledy++;
      if (bledy >= BLEDY_Z_RZEDU) {
        pisz(`::error::Bramka E2E: ${bledy} nieudane zapytania do GitHuba z rzędu (ostatnie: ${e.message}). Sprawdź stan GitHuba i uprawnienie actions: read, potem ponów TestFlight.`);
        return 1;
      }
      pisz(`Bramka E2E: błąd zapytania do GitHuba (${e.message}) — stan bez zmian, ponawiam`);
      spij(pollSec);
      continue;
    }
    if (s.stan === 'ok') {
      pisz(`Bramka E2E: OK — zielony przebieg e2e-ios.yml #${s.id} na commicie ${krotki}`);
      wynik('run', s.id);
      return 0;
    }
    if (s.stan === 'trwa') {
      if (n >= max) {
        pisz(`::error::Bramka E2E: limit czekania (${max} × ${pollSec} s) — przebieg e2e-ios.yml #${s.id} nadal trwa. Poczekaj na wynik i uruchom TestFlight ponownie.`);
        return 1;
      }
      pisz(`Bramka E2E: czekam na przebieg e2e-ios.yml #${s.id} (sprawdzenie ${n})`);
    } else if (s.stan === 'czerwony') {
      pisz(`::error::Bramka E2E: przebieg e2e-ios.yml #${s.id} na commicie ${krotki} jest czerwony — popraw, poczekaj na zielony przebieg i ponów.`);
      return 1;
    } else {
      if (n >= grace) {
        const an = s.anulowany ? ` (jest tylko anulowany albo pominięty #${s.anulowany})` : '';
        pisz(`::error::Bramka E2E: brak przebiegu e2e-ios.yml na commicie ${krotki}${an}. Uruchom Actions → „E2E iOS (symulator)” → Run workflow na tej gałęzi, poczekaj na zielony wynik i ponów TestFlight. Przed scaleniem e2e-ios.yml z main ręczne uruchomienie może być niedostępne — wtedy commit zmieniający plik spoza docs/, *.md, tests/, .claude/ uruchamia E2E przy pushu. Awaria E2E nie z winy kodu (maszyna): wejścia pomin_bramke_e2e + powod.`);
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
  let liczby;
  try {
    liczby = { pollSec: liczbaZmiennej(process.env, 'BRAMKA_POLL_SEC', 60), grace: liczbaZmiennej(process.env, 'BRAMKA_GRACE_POLLS', 5), max: liczbaZmiennej(process.env, 'BRAMKA_MAX_POLLS', 75) };
  } catch (e) {
    console.error(`::error::Bramka E2E: ${e.message}`);
    process.exit(2);
  }
  const kod = czekaj({
    pobierz: () =>
      JSON.parse(execFileSync('gh', ['api', `repos/${repo}/actions/workflows/e2e-ios.yml/runs?head_sha=${sha}&per_page=100`], { encoding: 'utf8' }))
        .workflow_runs.map(({ id, status, conclusion }) => ({ id, status, conclusion })),
    spij: (s) => execFileSync('sleep', [String(s)]),
    pisz: (t) => console.log(t),
    sha,
    ...liczby,
    wynik: (k, v) => process.env.GITHUB_OUTPUT && appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`),
  });
  process.exit(kod);
}
