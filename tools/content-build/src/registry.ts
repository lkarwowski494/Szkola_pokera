import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Strażnik powiązań z rejestrem twierdzeń (D-141, rola 06 E2). Tekst aplikacji nie może używać liczby ({{n:klucz}},
 * odpowiedź zadania liczbowego), reguły (pole rules lekcji i zadań, rule w przypadku c-betu) ani twierdzenia numeru
 * pomocy (claim w helplines.yaml), którego wpis w rejestrze ma status inny niż „potwierdzone”. Wyjątek: parametry
 * produktowe z rejestr/bez-twierdzen.json. Liczby używane tylko przez siatki, boty i ocenę (params „n:klucz”, refs)
 * nie są tekstem i nie są tu sprawdzane.
 *
 * Źródło statusów: docs/tresci/rejestr.json (scalony przez docs/tresci/narzedzia/scal-rejestr.mjs) i
 * docs/tresci/rejestr/bez-twierdzen.json, czytane wprost z katalogu docs/tresci obok katalogu treści. Bez kopii
 * w content/: druga kopia statusów mogłaby się rozjechać z rejestrem.
 */

export interface Registry {
  /** id wpisu (n:klucz, R-M0-001, H-US-1) → status (potwierdzone, otwarte, sprzeczne). */
  status: Map<string, string>;
  /** Liczby bez twierdzeń (parametry produktowe, dane zadań) jako n:klucz. */
  exempt: Set<string>;
}

export interface RegistryUse {
  /** Plik treści względem content/ (lessons/m0-l1-uklady.md, exams/m3.yaml, pl/rules.yaml, helplines.yaml). */
  plik: string;
  /** Miejsce w pliku: sekcja lekcji, id zadania, id reguły, id wpisu pomocy. */
  gdzie: string;
  /** id wpisu rejestru. */
  id: string;
}

export interface RegistryViolation extends RegistryUse {
  status: string;
}

export function loadRegistry(dir: string): Registry {
  const path = join(dir, 'rejestr.json');
  if (!existsSync(path)) throw new Error(`strażnik rejestru: brak ${path} (scal partie: node docs/tresci/narzedzia/scal-rejestr.mjs)`);
  const rows = JSON.parse(readFileSync(path, 'utf8')) as { id: string; status: string }[];
  const bezPath = join(dir, 'rejestr', 'bez-twierdzen.json');
  const bez = existsSync(bezPath) ? (JSON.parse(readFileSync(bezPath, 'utf8')) as { klucz: string }[]) : [];
  return { status: new Map(rows.map((w) => [w.id, w.status])), exempt: new Set(bez.map((b) => `n:${b.klucz}`)) };
}

/** Użycia, których wpis nie jest „potwierdzone” (albo go brak), z pominięciem kluczy bez twierdzeń. Bez powtórzeń. */
export function registryViolations(uses: readonly RegistryUse[], reg: Registry): RegistryViolation[] {
  const out: RegistryViolation[] = [];
  const seen = new Set<string>();
  for (const u of uses) {
    if (reg.exempt.has(u.id)) continue;
    const status = reg.status.get(u.id) ?? 'brak wpisu';
    if (status === 'potwierdzone') continue;
    const k = `${u.plik}|${u.gdzie}|${u.id}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ ...u, status });
  }
  return out;
}

/**
 * Lista przejściowa (tylko na czas scalania równoległych poprawek E2; koordynator usuwa plik po scaleniu): naruszenia
 * z tej listy (para plik + id) są ostrzeżeniem, nie błędem. Nowe naruszenia przerywają budowanie, a wyjątek, którego
 * już nie ma w treści, daje ostrzeżenie „zbędny wyjątek”.
 */
export const TRANSITIONAL_FILE = 'tools/content-build/rejestr-przejsciowe.json';

export interface TransitionalList {
  wyjatki: { plik: string; id: string }[];
}

export function loadTransitional(path: string | null): TransitionalList {
  if (!path || !existsSync(path)) return { wyjatki: [] };
  return JSON.parse(readFileSync(path, 'utf8')) as TransitionalList;
}

/** Dzieli naruszenia na błędy i ostrzeżenia według listy przejściowej. */
export function applyTransitional(violations: readonly RegistryViolation[], list: TransitionalList): { errors: string[]; warnings: string[] } {
  const key = (x: { plik: string; id: string }) => `${x.plik}|${x.id}`;
  const allowed = new Set(list.wyjatki.map(key));
  const errors: string[] = [];
  const byKey = new Map<string, RegistryViolation[]>();
  for (const v of violations) {
    if (allowed.has(key(v))) byKey.set(key(v), [...(byKey.get(key(v)) ?? []), v]);
    else errors.push(`${v.plik} (${v.gdzie}): ${v.id} — wpis rejestru ma status „${v.status}”`);
  }
  const warnings = [...byKey.values()].map(
    (vs) => `strażnik rejestru (lista przejściowa ${TRANSITIONAL_FILE}): ${vs[0]!.plik}: ${vs[0]!.id} — „${vs[0]!.status}” (${vs.map((v) => v.gdzie).join(', ')})`,
  );
  for (const w of list.wyjatki) if (!byKey.has(key(w))) warnings.push(`strażnik rejestru: zbędny wyjątek ${w.plik}: ${w.id} w ${TRANSITIONAL_FILE} (usuń go)`);
  return { errors, warnings };
}
