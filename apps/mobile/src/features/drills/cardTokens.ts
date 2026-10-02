const CARD_RE = /\[\[([2-9TJQKA][shdc](?: [2-9TJQKA][shdc])*)\]\]/g;

export type TextPart = { t: 'text'; v: string } | { t: 'cards'; v: string[] };

/** Rozbija tekst na fragmenty i karty zapisane jako [[As Kd]]. */
export function splitCardTokens(text: string): TextPart[] {
  const out: TextPart[] = [];
  let last = 0;
  for (const m of text.matchAll(CARD_RE)) {
    if (m.index! > last) out.push({ t: 'text', v: text.slice(last, m.index) });
    out.push({ t: 'cards', v: m[1]!.split(' ') });
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push({ t: 'text', v: text.slice(last) });
  return out;
}
