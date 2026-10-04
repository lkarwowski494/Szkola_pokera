import { termNeedsEnglish, type GeneratedDrill } from '@szkola/content-schema';
import { shuffle, type Rng } from '@szkola/poker-core';
import { TERMS, type AppTerm } from '@/data/content/terms.generated';
import { vocabText } from './text.pl';
import type { DrillInstance, DrillOption } from './types';

/**
 * Ćwiczenie słownictwa PL ↔ EN (decyzja właściciela 4.10.2026): termin z content/terms.yaml, cztery opcje.
 * Kierunki: pl-en (polska nazwa → angielska), en-pl (angielska → polska) i skrót → nazwa angielska (UTG, CO, SB).
 * Pytamy tylko o terminy, których polska nazwa różni się od angielskiej albo które mają skrót.
 */

type Mode = 'pl-en' | 'en-pl' | 'abbr';
interface Entry extends AppTerm {
  key: string;
}

const ALL: Entry[] = Object.entries(TERMS as Record<string, AppTerm>).map(([key, t]) => ({ key, ...t }));

/** Kierunki, w których można zapytać o termin. */
export function vocabModes(t: AppTerm): Mode[] {
  const out: Mode[] = [];
  if (termNeedsEnglish(t)) out.push('pl-en', 'en-pl');
  if (t.abbr && t.abbr.toLowerCase() !== t.en.toLowerCase()) out.push('abbr');
  return out;
}

const shown = (t: Entry, mode: Mode) => (mode === 'en-pl' ? t.pl : t.en);

function options(target: Entry, mode: Mode, rng: Rng): Entry[] {
  // dystraktory najpierw z tego samego obszaru, potem z innych; każda opcja ma inny tekst
  const ok = (t: Entry) => t.key !== target.key && vocabModes(t).length > 0 && (mode !== 'abbr' || termNeedsEnglish(t) || !!t.abbr);
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

export function vocabBatch(d: GeneratedDrill, lessonId: string | null, rng: Rng, count: number, offset = 0): DrillInstance[] {
  const area = String(d.params.area);
  const dir = String(d.params.dir ?? 'both');
  const pool = ALL.filter((t) => t.area === area && vocabModes(t).length > 0);
  if (pool.length === 0) throw new Error(`Zadanie ${d.id}: brak terminów w obszarze ${area}`);
  const order = shuffle(rng, pool);
  return Array.from({ length: count }, (_, j) => {
    const target = order[j % order.length]!;
    const modes = vocabModes(target);
    // kierunek z params.dir, jeśli termin go dopuszcza; termin tylko ze skrótem (Button/BTN) zawsze pyta o skrót
    const allowed = dir === 'both' ? modes : modes.filter((m) => m === dir || (m === 'abbr' && !modes.includes(dir as Mode)));
    const mode = (allowed.length ? allowed : modes)[Math.floor(rng() * (allowed.length || modes.length))]!;
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
      prompt: mode === 'pl-en' ? vocabText.promptPlEn(target.pl) : mode === 'en-pl' ? vocabText.promptEnPl(target.en) : vocabText.promptAbbr(target.abbr!),
      options: opts,
      explanation: vocabText.explanation(target),
    };
  });
}
