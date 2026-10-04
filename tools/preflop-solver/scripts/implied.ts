import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { categoryOf, classCombos, createRng, HandCategory, HAND_CLASSES, rankOf, strengthUnchecked } from '@szkola/poker-core';
// użycie: tsx scripts/implied.ts [PRÓBY=200000]  → tools/equity/implied169.json
// Dane do członu implied odds w modelu EQR (wariant pomiarowy, raport 10, sekcja „Naprawa modelu EQR”). Dla każdej klasy,
// na losowym pełnym stole (5 kart), Monte Carlo z ziarnem 1:
//  nut: ręka ma co najmniej dwie pary (para kieszonkowa: co najmniej seta), a ten układ wymaga obu kart ręki (żadna
//       z kart ręki osobno ze stołem nie daje tej samej kategorii): sety, strity i kolory z dwiema kartami ręki, dwie pary
//       z obiema kartami. To ręce, które
//       wygrywają duże pule od silnej jednej pary rywala (implied odds).
//  pay: ręka ma dokładnie jedną parę, z kartą ręki, nie niższą od najwyższej karty stołu (najwyższa para albo overpara).
//       To ręce, które płacą przy głębokich stackach (reverse implied odds).
//  mid: ręka ma dokładnie jedną parę z kartą ręki, niższą od najwyższej karty stołu (druga para i niżej, para kieszonkowa
//       pod kartą stołu). To ręce średniej siły, które według GTO Wizard („Equity Realization”) realizują najsłabiej.

const samples = Number(process.argv[2] ?? 200_000);
const rng = createRng(1);
const nut: number[] = [];
const pay: number[] = [];
const mid: number[] = [];
for (const hc of HAND_CLASSES) {
  const [a, b] = classCombos(hc)[0]!;
  const deck = Array.from({ length: 52 }, (_, i) => i).filter((c) => c !== a && c !== b);
  let n = 0;
  let p = 0;
  let md = 0;
  const board = [0, 0, 0, 0, 0];
  for (let s = 0; s < samples; s++) {
    // losowanie 5 kart bez zwracania (częściowe tasowanie)
    for (let i = 0; i < 5; i++) {
      const j = i + Math.floor(rng() * (deck.length - i));
      const t = deck[i]!;
      deck[i] = deck[j]!;
      deck[j] = t;
      board[i] = deck[i]!;
    }
    const cat = categoryOf(strengthUnchecked([a, b, ...board]));
    // para kieszonkowa plus para na stole to tylko dwie pary ze stołu, nie ukryta silna ręka
    const pocket = rankOf(a) === rankOf(b);
    if (cat < HandCategory.TwoPair || (cat === HandCategory.TwoPair && !pocket)) {
      const ca = categoryOf(strengthUnchecked([a, ...board]));
      const cb = categoryOf(strengthUnchecked([b, ...board]));
      if (cat < Math.min(ca, cb)) n++;
    } else if (cat === HandCategory.OnePair) {
      const top = Math.max(...board.map(rankOf));
      const br = board.map(rankOf);
      const ra = rankOf(a);
      const rb = rankOf(b);
      // para z kartą ręki: para kieszonkowa albo karta ręki sparowana ze stołem
      const pairRank = ra === rb ? ra : br.includes(ra) ? ra : br.includes(rb) ? rb : -1;
      if (pairRank >= 0 && pairRank >= top) p++;
      else if (pairRank >= 0) md++;
    }
  }
  nut.push(n / samples);
  pay.push(p / samples);
  mid.push(md / samples);
}
const out = resolve(import.meta.dirname, '../../equity/implied169.json');
const r4 = (x: number) => Math.round(x * 10000) / 10000;
writeFileSync(out, JSON.stringify({ samples, seed: 1, classes: HAND_CLASSES, nut: nut.map(r4), pay: pay.map(r4), mid: mid.map(r4) }));
for (const hc of ['AA', 'KK', '99', '66', '22', 'AKo', 'AKs', 'KQo', 'ATo', 'A5s', 'K6o', '76s', '54s', '72o', 'T9s']) {
  const i = HAND_CLASSES.indexOf(hc as never);
  console.log(`${hc}\tnut ${(nut[i]! * 100).toFixed(1)}%\tpay ${(pay[i]! * 100).toFixed(1)}%\tmid ${(mid[i]! * 100).toFixed(1)}%`);
}
console.log(`Zapisano ${out}`);
