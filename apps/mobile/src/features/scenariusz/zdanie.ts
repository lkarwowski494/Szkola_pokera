/**
 * Podział sytuacji szablonu na tytuł (pierwsze zdanie) i resztę (04-studio-projektowe-006; decyzja właściciela 2026-11-16 „(a) 1. zdanie tytułem”).
 * Własny skaner zamiast `Intl.Segmenter`: Hermes (iOS) go nie ma, a wynik ma być taki sam na każdym urządzeniu i w każdym z 35 języków.
 *
 * Znaki końca zdania:
 * - pełnej szerokości i podobne (ja, zh): `。！？｡` kończą zdanie od razu, bez spacji po nich;
 * - `!`, `?`, `؟` (ar), `।` `॥` (hi): koniec zdania, gdy po nich spacja albo koniec tekstu;
 * - `.` i `…`: jak wyżej, ale tylko gdy poprzedni znak nie jest cyfrą („3. Mai”, „12.5”) i następne słowo nie zaczyna się małą literą ani cyfrą
 *   („ok. 35%”, „np. króle”, „tzn.”); pismo bez wielkich liter (hangul) dzieli po kropce i spacji.
 * Zamykające nawiasy i cudzysłowy tuż po znaku końca należą do zdania.
 */
export interface PodzialSytuacji { readonly tytul: string; readonly reszta: string | null }

const KONIEC_BEZ_SPACJI = new Set(['。', '！', '？', '｡']);
const KONIEC_ZE_SPACJA = new Set(['!', '?', '؟', '।', '॥']);
const KONIEC_Z_WIELKA = new Set(['.', '…']);
const ZAMYKAJACE = new Set([')', ']', '"', "'", '”', '’', '»', '›', '」', '』', '）', '］']);
const SPACJA = /\s/u;
const MALA_LUB_CYFRA = /[\p{Ll}\p{Nd}]/u;
const CYFRA = /\p{Nd}/u;

export function podzielSytuacje(tekst: string): PodzialSytuacji {
  const znaki = Array.from(tekst);
  for (let i = 0; i < znaki.length; i++) {
    const z = znaki[i] as string;
    const bezSpacji = KONIEC_BEZ_SPACJI.has(z);
    if (!bezSpacji && !KONIEC_ZE_SPACJA.has(z) && !KONIEC_Z_WIELKA.has(z)) continue;
    // zamykające nawiasy i cudzysłowy oraz kolejne znaki końca („?!”, „…”) należą do zdania
    let koniec = i + 1;
    while (koniec < znaki.length && (ZAMYKAJACE.has(znaki[koniec] as string) || KONIEC_BEZ_SPACJI.has(znaki[koniec] as string) || KONIEC_ZE_SPACJA.has(znaki[koniec] as string))) koniec++;
    if (koniec >= znaki.length) return { tytul: tekst, reszta: null };
    if (!bezSpacji) {
      if (!SPACJA.test(znaki[koniec] as string)) continue;
      if (KONIEC_Z_WIELKA.has(z)) {
        if (i > 0 && CYFRA.test(znaki[i - 1] as string)) continue;
        let nast = koniec;
        while (nast < znaki.length && SPACJA.test(znaki[nast] as string)) nast++;
        if (nast < znaki.length && MALA_LUB_CYFRA.test(znaki[nast] as string)) continue;
      }
    }
    const reszta = znaki.slice(koniec).join('').trimStart();
    return reszta === '' ? { tytul: tekst, reszta: null } : { tytul: znaki.slice(0, koniec).join('').trimEnd(), reszta };
  }
  return { tytul: tekst, reszta: null };
}
