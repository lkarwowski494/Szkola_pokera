/**
 * Cytaty w polach źródeł (source, population, note w content/*.yaml): najwyżej 2 zdania i 250 znaków
 * (decyzja właściciela z 9.10.2026: w repozytorium tylko krótkie cytaty z adresem; dłuższe treści na Dysku).
 */
export const QUOTE_MAX_SENTENCES = 2;
export const QUOTE_MAX_CHARS = 250;

/** Zdania cytatu: granica zdania to . ! ? … przed spacją i wielką literą (liczby i skróty jej nie tworzą). */
function sentenceCount(quote: string): number {
  return (quote.match(/[.!?…](?=\s+["„(]?[A-ZĄĆĘŁŃÓŚŹŻ])/g) ?? []).length + 1;
}

/** Błędy cytatów w jednym polu (pusta lista = w porządku). */
export function checkSourceQuotes(text: string): string[] {
  const errors: string[] = [];
  for (const m of text.matchAll(/„([^”]*)”/g)) {
    const q = m[1]!;
    if (q.length > QUOTE_MAX_CHARS) errors.push(`cytat dłuższy niż ${QUOTE_MAX_CHARS} znaków: „${q.slice(0, 40)}…”`);
    else if (sentenceCount(q) > QUOTE_MAX_SENTENCES) errors.push(`cytat dłuższy niż ${QUOTE_MAX_SENTENCES} zdania: „${q.slice(0, 40)}…”`);
  }
  return errors;
}
