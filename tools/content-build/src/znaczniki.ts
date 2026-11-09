/**
 * Strażnik „znacznik terminu na zwykłym słowie” (rola 06, D-376). Kontrola T-02 wymusza znacznik {{t:…}} na każdej
 * polskiej formie terminu, więc autor oznacza też słowa użyte w zwykłym sensie („plan pasuje” = odpowiada, „sprawdzić,
 * gdzie stoję” = przekonać się, „turn to trójka” = karta 3, „ten sam stół” = układ stacków). Taki znacznik daje w pl
 * fałszywy nawias z nazwą angielską, a w przekładzie błędny termin (drugi przegląd en, 16 miejsc,
 * `docs/lokalizacja/dowody/przeglad-en-2026-11-09/rozstrzygniecia.md`). Wzorce poniżej to znane konteksty zwykłego
 * sensu; każdy ma poprawny odpowiednik, który przechodzi (test `znacznik-zwykle-slowo-06.test.ts`).
 * Kontrola dotyczy tekstu polskiego (źródło przekładu); w innych językach znacznik jest decyzją przekładu.
 */

export interface ZnacznikZwykleSlowo {
  wzorzec: RegExp;
  /** Co zamiast (krótko, do komunikatu błędu). */
  zamiast: string;
}

export const ZNACZNIK_ZWYKLE_SLOWO: readonly ZnacznikZwykleSlowo[] = [
  { wzorzec: /plan\s+\{\{t:fold\|/i, zamiast: '„plan pasuje” = odpowiada, nie fold' },
  { wzorzec: /\{\{t:fold\|[^}]*\}\}\s+\{\{t:spr\b/i, zamiast: '„pasuje SPR” = odpowiada SPR, nie fold' },
  { wzorzec: /\{\{t:call\|[^}]*\}\},?\s+gdzie\s/i, zamiast: '„sprawdzić, gdzie stoję” = przekonać się, nie call' },
  { wzorzec: /\{\{t:call\|[^}]*\}\}\s+(decyzje|plan|na nowo)/i, zamiast: '„sprawdzasz decyzje/plan” = przeglądasz, oceniasz, nie call' },
  { wzorzec: /plan\s+\{\{t:call\|/i, zamiast: '„plan sprawdzasz” = oceniasz, nie call' },
  { wzorzec: /nic\s+nie\s+musisz\s+\{\{t:call\|/i, zamiast: '„nic nie musisz sprawdzać” = przeglądać, nie call' },
  { wzorzec: /\{\{t:bet\|[^}]*\}\}\s+(tę\s+|tą\s+)?granic/i, zamiast: '„stawiają granicę” = wyznaczają, nie bet' },
  { wzorzec: /\{\{t:check\|czekać\}\},?\s+aż(?![\p{L}])/iu, zamiast: '„czekać, aż ktoś…” = zwykłe czekanie, nie check' },
  { wzorzec: /\b(turn|river|flop)\s+to\s+\{\{t:three-of-a-kind/i, zamiast: '„turn to trójka” = karta 3, nie układ trójka' },
  { wzorzec: /(\b(cały|całym)\s+\{\{t:board|\bten\s+sam\s+\{\{t:board\}\}\s*\()/i, zamiast: '„cały stół”, „ten sam stół (stacki)” = gracze lub stacki przy stole, nie karty wspólne; przy sensie kart wspólnych przeredaguj zdanie' },
  { wzorzec: /resztę\s+\{\{t:pot\|[^}]*\}\}\s+dostaje\s+za/i, zamiast: '„resztę puli dostaje za miejsce” = equity turnieju (ICM), nie pula rozdania' },
  { wzorzec: /\{\{t:top-pair\|[^}]*\}\}\s+i\s+A[KQJT][so]?(?![\p{L}])/u, zamiast: '„najwyższe pary i AK” przed flopem = pocket pary, nie top pair' },
];

/** Miejsca znacznika na zwykłym słowie w surowym tekście polskim (przed podstawieniem). */
export function znacznikiZwyklegoSlowa(text: string): string[] {
  const out: string[] = [];
  for (const z of ZNACZNIK_ZWYKLE_SLOWO) {
    const m = text.match(z.wzorzec);
    if (m) out.push(`„${m[0]}”: ${z.zamiast}`);
  }
  return out;
}
