#!/bin/bash
# Mutanty EP na 24f32fb5 (worktree w scratchpadzie). Każdy: zmiana w src, uruchomienie wskazanych testów, cofnięcie.
WT=$(dirname "$0")/wt; cd "$WT" || exit 2
G=packages/poker-core/src/scenario-gen.ts
run() { # id plik-src perl-wyrażenie katalog-pakietu testy...
  id=$1; f=$2; expr=$3; pkg=$4; shift 4
  perl -0pi -e "$expr" "$f"
  if git diff --quiet -- "$f"; then echo "$id: MUTANT NIEZASTOSOWANY"; return; fi
  (cd "$pkg" && if [ "$pkg" = apps/mobile ]; then npx jest --ci "$@"; else npx vitest run "$@"; fi > /tmp/claude-0/-home-user-Szkola-pokera/2e9c7830-dacc-5fb0-b05c-feb9a9b428d9/scratchpad/mutlog/$id.log 2>&1); kod=$?
  [ $kod -ne 0 ] && wynik="ZABITY" || wynik="PRZEŻYŁ"
  echo "$id: $wynik (kod $kod) $(grep -E 'Tests +[0-9]' /tmp/claude-0/-home-user-Szkola-pokera/2e9c7830-dacc-5fb0-b05c-feb9a9b428d9/scratchpad/mutlog/$id.log | tail -1)"
  git checkout -q -- "$f"
}
run M01-bez-zywego-outu $G 's/if \(\!FULL_DECK\.some\(\(c\) => \!znane\.has\(c\) && strength\(\[\.\.\.villain, \.\.\.turn, c\]\) < strength\(\[\.\.\.hero, \.\.\.turn, c\]\)\)\) return null;//' packages/poker-core test/ei-turn-bet-zywe-outy.test.ts test/ef-turn-bet.test.ts
run M02-strong-z-outow $G "s/\(h\.cls === 'strong' && \(h\.pairKind === 'overpair' \|\| h\.pairKind === 'top'\)\)/h.cls === 'strong'/" packages/poker-core test/ei-turn-bet-zywe-outy.test.ts test/ef-turn-bet.test.ts
run M03-prog-0.7 $G 's/const DEFEND_BIG_MIN = 0\.75;/const DEFEND_BIG_MIN = 0.7;/' packages/poker-core test/scenario-dx.test.ts
run M04-gutshot-null $G "s/if \(outs > 0\) return 'call';/if (outs > 0) return null;/" packages/poker-core test/scenario-dx.test.ts
run M05-backdoor-strita-bez-progu-T $G "s/if \(hasStraightBackdoor\(hero, flop\) && hero\.every\(\(c\) => rankOf\(c\) >= BACKDOOR_HIGH_MIN\)\) return 'call';/if (hasStraightBackdoor(hero, flop)) return 'call';/" packages/poker-core test/scenario-dx.test.ts
run M06-blockers-bez-F $G 's/a\.v < b\.v && a\.f >= b\.f \? 0 : b\.v < a\.v && b\.f >= a\.f \? 1/a.v < b.v ? 0 : b.v < a.v ? 1/' packages/poker-core test/ek-pick-hand.test.ts
run M07-blockers-F-scisle $G 's/a\.v < b\.v && a\.f >= b\.f \? 0 : b\.v < a\.v && b\.f >= a\.f \? 1/a.v < b.v \&\& a.f > b.f ? 0 : b.v < a.v \&\& b.f > a.f ? 1/' packages/poker-core test/ek-pick-hand.test.ts
run M08-sdv-remis-jako-wygrana $G 's/filter\(\(c\) => moja < strength\(\[\.\.\.c, \.\.\.board\]\)\)/filter((c) => moja <= strength([...c, ...board]))/' packages/poker-core test/ek-pick-hand.test.ts
run M09-showdown-bez-warunku-drugiej $G 's/correct = a\.sdv === 0 && b\.sdv > 0 \? 0 : b\.sdv === 0 && a\.sdv > 0 \? 1 : null;/correct = a.sdv === 0 ? 0 : b.sdv === 0 ? 1 : null;/' packages/poker-core test/ek-pick-hand.test.ts
run M10-bez-dolosowania-flopu $G 's/for \(let n = 0; n < FLOP_REDEALS && \!textureMatches\(classifyFlop\(rest\.slice\(2, 5\)\), b\.flop \?\? \{\}\); n\+\+\) rest = dealCards\(rng, 7, hero\);//' tools/content-build test/ek-eh1-dolosowanie.test.ts
run M11-pick-hand-wspolne-klasy $G 's/if \(wspolne\.length > 0\) throw/if (false) throw/' packages/poker-core test/ek-pick-hand.test.ts
run M12-bramka-bez-zaokraglenia tools/content-build/src/scenariusze.ts 's/if \(bet > 0 && bet \/ pot > 0\.4/if (false \&\& bet > 0 \&\& bet \/ pot > 0.4/' tools/content-build test/ef-defend-bramka.test.ts
run M13-ocena-druga-reka-blad apps/mobile/src/features/scenariusz/wariant.ts "s/return a === d\.correct \? 'zgodne' : 'niedokladnosc';/return a === d.correct ? 'zgodne' : 'blad';/" apps/mobile src/features/scenariusz/__tests__/ek-pick-hand-ekran.test.tsx
run M14-bramka-defend-pozycja tools/content-build/src/scenariusze.ts "s/if \(t\.positions\.hero \!== 'BB'\)/if (false)/" tools/content-build test/ef-defend-bramka.test.ts
