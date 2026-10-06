import { termDefRevealsName, termNeedsEnglish, termText, type GeneratedDrill } from '@szkola/content-schema';
import { shuffle, type Rng } from '@szkola/poker-core';
import { TERMS, type AppTerm } from '@/data/content/terms.generated';
import { vocabText } from './text.pl';
import type { DrillInstance, DrillOption } from './types';

/**
 * Ćwiczenie słownictwa PL ↔ EN (decyzja właściciela 4.10.2026): termin z content/terms.yaml, cztery opcje.
 * Kierunki: pl-en (polska nazwa → angielska), en-pl (angielska → polska), skrót → nazwa angielska (UTG, CO, SB)
 * i def (definicja → polski termin z angielskim w nawiasie, wariant „słowniczek + ćwiczenie” z 6.10.2026).
 * O nazwy (pl-en, en-pl) pytamy tylko przy terminach, których polska nazwa różni się od angielskiej; o znaczenie (def)
 * przy każdym terminie z definicją, która nie zdradza jego nazwy (także flop, c-bet, equity).
 */

export type VocabMode = 'pl-en' | 'en-pl' | 'abbr' | 'def';
interface Entry extends AppTerm {
  key: string;
}

const ALL: Entry[] = Object.entries(TERMS as Record<string, AppTerm>).map(([key, t]) => ({ key, ...t }));

/**
 * Pary terminów, których definicje opisują prawie to samo albo jedno pojęcie zawiera drugie (np. barrel i second barrel).
 * W kierunku def nie stają obok siebie jako poprawna odpowiedź i dystraktor, bo pytanie miałoby dwie dobre odpowiedzi.
 */
export const DEF_CONFUSABLE: readonly (readonly [string, string])[] = [
  ['value', 'value-bet'],
  ['polarized', 'polarization'],
  ['board', 'community-cards'],
  ['street', 'betting-round'],
  ['barrel', 'second-barrel'],
  ['shove', 'stack-off'],
  ['shove', 'all-in'],
  ['all-in', 'stack-off'],
  ['wet', 'wetness'],
  ['texture', 'wetness'],
  ['utg', 'early-position'],
  ['button', 'late-position'],
  ['cutoff', 'late-position'],
  ['three-of-a-kind', 'set'],
  ['draw', 'flush-draw'],
  ['draw', 'straight-draw'],
  ['draw', 'oesd'],
  ['draw', 'gutshot'],
  ['draw', 'backdoor'],
  ['straight-draw', 'oesd'],
  ['straight-draw', 'gutshot'],
];

function confusable(a: string, b: string): boolean {
  return DEF_CONFUSABLE.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

/** Kierunki, w których można zapytać o termin. */
export function vocabModes(t: AppTerm): VocabMode[] {
  const out: VocabMode[] = [];
  if (termNeedsEnglish(t)) out.push('pl-en', 'en-pl');
  if (t.abbr && t.abbr.toLowerCase() !== t.en.toLowerCase()) out.push('abbr');
  if (t.def && !termDefRevealsName(t)) out.push('def');
  return out;
}

/** Tekst opcji: w kierunku def polski termin z nazwą angielską w nawiasie (reguła T-01), np. „kolor (flush)”, „flop”. */
const shown = (t: Entry, mode: VocabMode) => (mode === 'en-pl' ? t.pl : mode === 'def' ? termText(t) : t.en);

function options(target: Entry, mode: VocabMode, rng: Rng): Entry[] {
  // dystraktory najpierw z tego samego obszaru, potem z innych; każda opcja ma inny tekst
  const ok = (t: Entry) =>
    t.key !== target.key &&
    (mode === 'def' ? !confusable(t.key, target.key) : vocabModes(t).some((m) => m !== 'def')) &&
    (mode !== 'abbr' || termNeedsEnglish(t) || !!t.abbr);
  const same = shuffle(rng, ALL.filter((t) => ok(t) && t.area === target.area));
  const other = shuffle(rng, ALL.filter((t) => ok(t) && t.area !== target.area));
  const picked: Entry[] = [target];
  const texts = new Set([shown(target, mode).toLowerCase()]);
  for (const t of [...same, ...other]) {
    if (picked.length === 4) break;
    const s = shown(t, mode).toLowerCase();
    if (texts.has(s)) continue;
    texts.add(s);
    picked.push(t);
  }
  return shuffle(rng, picked);
}

function prompt(target: Entry, mode: VocabMode): string {
  if (mode === 'pl-en') return vocabText.promptPlEn(target.pl);
  if (mode === 'en-pl') return vocabText.promptEnPl(target.en);
  if (mode === 'abbr') return vocabText.promptAbbr(target.abbr!);
  return vocabText.promptDef(target.def!);
}

export function vocabBatch(d: GeneratedDrill, lessonId: string | null, rng: Rng, count: number, offset = 0): DrillInstance[] {
  const area = String(d.params.area);
  const dir = String(d.params.dir ?? 'both');
  // kierunek z params.dir: pl-en, en-pl, def albo both (wszystkie kierunki dostępne dla terminu)
  const usable = (t: Entry) => {
    const modes = vocabModes(t);
    return dir === 'def' ? modes.includes('def') : dir === 'both' ? modes.length > 0 : modes.some((m) => m !== 'def');
  };
  const pool = ALL.filter((t) => t.area === area && usable(t));
  if (pool.length === 0) throw new Error(`Zadanie ${d.id}: brak terminów w obszarze ${area}`);
  const order = shuffle(rng, pool);
  return Array.from({ length: count }, (_, j) => {
    const target = order[j % order.length]!;
    const modes = vocabModes(target);
    // termin tylko ze skrótem (Button/BTN) w kierunku pl-en / en-pl zawsze pyta o skrót
    const allowed =
      dir === 'both' ? modes : dir === 'def' ? ['def' as const] : modes.filter((m) => m === dir || (m === 'abbr' && !modes.includes(dir as VocabMode)));
    const mode = allowed[Math.floor(rng() * allowed.length)]!;
    const opts: DrillOption[] = options(target, mode, rng).map((t) => {
      const correct = t.key === target.key;
      return { text: shown(t, mode), correct, why: correct ? vocabText.right(t) : vocabText.wrong(t, mode === 'en-pl') };
    });
    return {
      kind: 'choice',
      key: `${d.id}#${offset + j}`,
      drillId: d.id,
      family: d.family,
      lessonId,
      rules: d.rules,
      prompt: prompt(target, mode),
      options: opts,
      explanation: vocabText.explanation(target),
    };
  });
}
