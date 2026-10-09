import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// Reguła właściciela nr 5 (9.10.2026), wytyczne Apple 2.3.7 i 5.2.1: w tekstach aplikacji
// nie ma nazw innych aplikacji, serwisów, sal, marek ani nazwisk autorów.
// Źródła są w polach źródeł reguł, nie w lekcjach i egzaminach.
// TODO: przy scalaniu z gałęzią porzadki-zrodla przełączyć na wspólną listę marek.
const BRANDS: RegExp[] = [
  /GTO\s*Wizard/i, /Preflop\s*Wizard/i, /\bUpswing/i, /PokerCoaching/i, /\bGG\s*Poker/i, /PokerStars/i,
  /\bWPT\b/i, /Pio\s*Solver/i, /\bDeepfold/i, /SplitSuit/i, /GTO\s*Gecko/i, /Beyond\s*GTO/i,
  /Poker\s*Academy/i, /ThinkGTO/i, /PokerBank/i, /PokerListings/i, /PokerStrategy/i, /FlopTurnRiver/i,
  /PokerCharts/i, /Primedope/i, /GipsyTeam/i, /Tombos/i, /BlackRain/i, /Checkreplay/i, /Bluffaces/i,
  /Run\s*It\s*Once/i, /Hold'?em\s*Manager/i, /PokerTracker/i, /Hand2Note/i, /Natural\s*8/i, /partypoker/i,
  /\b888/i, /Winamax/i, /Flopzilla/i, /Equilab/i, /\bGTO\s*\+/i, /Monker/i, /\bHRC\b/i, /Holdem\s*Resources/i,
  /ICMizer/i, /Simple\s*GTO/i, /GTO\s*Base/i, /\bOdin\b/i, /Snowie/i, /DeepSolver/i, /Jesolver/i, /\bWSOP\b/i,
  /iPoker/i, /\bIgnition\b/i, /Bovada/i, /Americas\s*Cardroom/i, /\bACR\b/, /Unibet/i,
  /\bChen\b/, /Ankenman/i, /\bJanda\b/i, /Acevedo/i, /\bFlynn/i, /\bMehta/i, /\bMiller/i, /Brokos/i,
  /Tendler/i, /Harrington/i, /Sklansky/i, /Malmuth/i, /Harville/i, /Negreanu/i, /Kill\s*Everyone/i,
  /Mental\s*Game\s*of\s*Poker/i, /Mathematics\s*of\s*Poker/i, /Pailiku/i, /Palom[aä]ki/i, /\bBaron/, /Hershey/i,
  /van\s*Loon/i, /Ganzfried/i, /Sandholm/i,
];

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content', 'pl');

function brandHits(dir: string): string[] {
  const hits: string[] = [];
  for (const f of readdirSync(join(contentDir, dir)).sort()) {
    readFileSync(join(contentDir, dir, f), 'utf8')
      .split('\n')
      .forEach((line, i) => {
        // Klucze {{n:…}} nie są widoczne dla użytkownika.
        const visible = line.replace(/\{\{n:[^}]*\}\}/g, '');
        for (const re of BRANDS) {
          const m = visible.match(re);
          if (m) hits.push(`${dir}/${f}:${i + 1}: ${m[0]}`);
        }
      });
  }
  return hits;
}

describe('nazwy marek w treści', () => {
  it('lekcje nie zawierają nazw marek ani autorów', () => {
    expect(brandHits('lessons')).toEqual([]);
  });
  it('egzaminy nie zawierają nazw marek ani autorów', () => {
    expect(brandHits('exams')).toEqual([]);
  });
});
