/**
 * Pasek strategii (08 cz. 6 krok 4, D-274; design-spec „`PasekStrategii`”, element firmowy D-116). Przed decyzją równe
 * segmenty-przyciski, które nic nie zdradzają; po ocenie te same granice przesunięte do częstości solvera, znacznik nad
 * twoim wyborem i podpisy z procentami. Zadanie bez strategii (pytania z teorii): segmenty zostają równe, bez procentów.
 */
type TFn = (k: string, o?: Record<string, unknown>) => string;
export interface OpcjaPaska {
  readonly text: string;
  /** Częstość solvera (0–1); brak = zadanie bez strategii. */
  readonly czestosc?: number;
}
export interface Segment {
  readonly indeks: number;
  readonly tekst: string;
  /** Udział w szerokości paska (0–1; suma 1). */
  readonly szerokosc: number;
  /** Procent do podpisu („80”, „<1”) albo null przed oceną i bez strategii. */
  readonly procent: string | null;
  readonly twoj: boolean;
}

/** Zadanie ze strategią solvera: każda opcja ma częstość (zadania z zakresu); inaczej lista odpowiedzi. */
export const maStrategie = (o: readonly OpcjaPaska[]) => o.length > 0 && o.every((x) => typeof x.czestosc === 'number' && Number.isFinite(x.czestosc) && x.czestosc >= 0);

/** „80”; akcja grana, ale rzadziej niż 0,5% → „<1” (nie „0”, które znaczy „wcale”). */
function procent(f: number): string {
  const p = Math.round(f * 100);
  return p === 0 && f > 0 ? '<1' : String(p);
}

/** `wybor`: null = przed decyzją, -1 = brak wyboru (czas minął), inaczej indeks opcji. */
export function segmentyPaska(opcje: readonly OpcjaPaska[], wybor: number | null): Segment[] {
  const poOcenie = wybor !== null && maStrategie(opcje);
  const suma = poOcenie ? opcje.reduce((s, o) => s + (o.czestosc ?? 0), 0) : 0;
  return opcje.map((o, i) => ({
    indeks: i,
    tekst: o.text,
    szerokosc: poOcenie && suma > 0 ? (o.czestosc ?? 0) / suma : 1 / opcje.length,
    procent: poOcenie ? procent(o.czestosc ?? 0) : null,
    twoj: wybor === i,
  }));
}

/** Opis dla czytnika po ocenie („Strategia solvera dla J9o: Pas 80 procent, … Twój wybór: Przebicie.”); bez strategii null. */
export function opisPaska(opcje: readonly OpcjaPaska[], wybor: number | null, klasa: string, t: TFn): string | null {
  if (wybor === null || !maStrategie(opcje)) return null;
  const s = segmentyPaska(opcje, wybor);
  const lista = s.map((x) => t('strategy.item', { action: x.tekst, pct: x.procent })).join(', ');
  const twoj = s.find((x) => x.twoj);
  return [t('strategy.label', { hand: klasa, list: lista }), twoj ? t('strategy.yourChoice', { action: twoj.tekst }) : null].filter(Boolean).join(' ');
}
