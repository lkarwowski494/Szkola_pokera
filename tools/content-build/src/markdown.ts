import { Lexer, type Token, type Tokens } from 'marked';
import type { Block, Inline } from '@szkola/content-schema';

/**
 * Kompilacja Markdown → małe drzewo JSON (ADR-16). Obsługiwane:
 * nagłówki ## i ###, akapity, listy, tabele, **pogrubienie**, *kursywa*,
 * karty w tekście: [[As Ks]], wzór: blok ```formula, ramka: :::note Tytuł … :::
 */

const CARD_RE = /\[\[([2-9TJQKA][shdc](?: [2-9TJQKA][shdc])*)\]\]/g;

function splitCards(text: string, style: { b?: true; i?: true }): Inline[] {
  const out: Inline[] = [];
  let last = 0;
  for (const m of text.matchAll(CARD_RE)) {
    if (m.index! > last) out.push({ t: 'text', v: text.slice(last, m.index), ...style });
    out.push({ t: 'cards', v: m[1]!.split(' ') });
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push({ t: 'text', v: text.slice(last), ...style });
  return out;
}

function decode(s: string): string {
  return s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function inline(tokens: Token[] | undefined, style: { b?: true; i?: true } = {}): Inline[] {
  const out: Inline[] = [];
  for (const tok of tokens ?? []) {
    switch (tok.type) {
      case 'text':
      case 'escape': {
        const t = tok as Tokens.Text;
        if (t.tokens && t.tokens.length) out.push(...inline(t.tokens, style));
        else out.push(...splitCards(decode(t.text), style));
        break;
      }
      case 'strong':
        out.push(...inline((tok as Tokens.Strong).tokens, { ...style, b: true }));
        break;
      case 'em':
        out.push(...inline((tok as Tokens.Em).tokens, { ...style, i: true }));
        break;
      case 'codespan':
        out.push({ t: 'text', v: decode((tok as Tokens.Codespan).text), ...style });
        break;
      case 'br':
        out.push({ t: 'text', v: '\n', ...style });
        break;
      default:
        throw new Error(`Nieobsługiwany element w tekście: ${tok.type}`);
    }
  }
  return merge(out);
}

/** Scala sąsiednie fragmenty tekstu o tym samym stylu. */
function merge(items: Inline[]): Inline[] {
  const out: Inline[] = [];
  for (const it of items) {
    const prev = out[out.length - 1];
    if (prev && prev.t === 'text' && it.t === 'text' && prev.b === it.b && prev.i === it.i) prev.v += it.v;
    else out.push({ ...it } as Inline);
  }
  return out;
}

function blocks(tokens: Token[]): Block[] {
  const out: Block[] = [];
  for (const tok of tokens) {
    switch (tok.type) {
      case 'space':
        break;
      case 'heading': {
        const h = tok as Tokens.Heading;
        if (h.depth !== 2 && h.depth !== 3) throw new Error(`Dozwolone nagłówki: ## i ### (jest ${'#'.repeat(h.depth)})`);
        out.push({ t: 'h', level: h.depth, c: inline(h.tokens) });
        break;
      }
      case 'paragraph':
        out.push({ t: 'p', c: inline((tok as Tokens.Paragraph).tokens) });
        break;
      case 'list': {
        const l = tok as Tokens.List;
        out.push({
          t: 'list',
          ordered: l.ordered,
          items: l.items.map((item) => {
            const parts = item.tokens.flatMap((x) => (x.type === 'text' || x.type === 'paragraph' ? [x] : []));
            if (parts.length !== item.tokens.filter((x) => x.type !== 'space').length) {
              throw new Error('Listy zagnieżdżone nie są obsługiwane');
            }
            return merge(parts.flatMap((p) => inline((p as Tokens.Text).tokens ?? [p])));
          }),
        });
        break;
      }
      case 'table': {
        const t = tok as Tokens.Table;
        out.push({ t: 'table', head: t.header.map((c) => inline(c.tokens)), rows: t.rows.map((r) => r.map((c) => inline(c.tokens))) });
        break;
      }
      case 'code': {
        const c = tok as Tokens.Code;
        if (c.lang !== 'formula') throw new Error('Dozwolony tylko blok ```formula');
        out.push({ t: 'formula', v: c.text });
        break;
      }
      default:
        throw new Error(`Nieobsługiwany blok Markdown: ${tok.type}`);
    }
  }
  return out;
}

export function compileMarkdown(source: string): Block[] {
  const out: Block[] = [];
  // ramki :::note Tytuł … ::: wycinamy przed lekserem
  const re = /^:::note[ \t]*(.*)\n([\s\S]*?)\n:::[ \t]*$/gm;
  let last = 0;
  for (const m of source.matchAll(re)) {
    out.push(...blocks(Lexer.lex(source.slice(last, m.index))));
    out.push({ t: 'note', title: m[1]!.trim(), c: blocks(Lexer.lex(m[2]!)) });
    last = m.index! + m[0].length;
  }
  out.push(...blocks(Lexer.lex(source.slice(last))));
  return out;
}
