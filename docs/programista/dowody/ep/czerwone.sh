#!/bin/bash
# Czerwone przed kodem: testy z 24f32fb5, pliki src z rodzica commitu EK (bez zmian zachowania tego commitu).
WT=$(dirname "$0")/wt; cd "$WT" || exit 2
LOG=$(dirname "$0")/mutlog
rc() { # id commit pakiet plikisrc(:-rozdzielone) testy...
  id=$1; c=$2; pkg=$3; IFS=: read -ra src <<< "$4"; shift 4
  git checkout -q "$c^" -- "${src[@]}"
  (cd "$pkg" && if [ "$pkg" = apps/mobile ]; then npx jest --ci "$@"; else npx vitest run "$@"; fi > "$LOG/$id.log" 2>&1); kod=$?
  [ $kod -ne 0 ] && wynik="CZERWONY" || wynik="ZIELONY (test nie wykrywa braku zmiany)"
  echo "$id ($c^ src): $wynik (kod $kod) $(grep -E 'Tests +[0-9]|Tests: ' "$LOG/$id.log" | tail -1)"
  git checkout -q HEAD -- "${src[@]}"
}
rc R1-EI-001 3d5183e8 packages/poker-core packages/poker-core/src/scenario-gen.ts test/ei-turn-bet-zywe-outy.test.ts test/ef-turn-bet.test.ts
rc R2-EH2-EH3 becd739e packages/poker-core packages/poker-core/src/scenario-gen.ts test/scenario-dx.test.ts
rc R3-EI-003 becd739e tools/content-build tools/content-build/src/scenariusze.ts test/ef-defend-bramka.test.ts
rc R4-EI-006 738fefc9 tools/content-build tools/content-build/src/scenariusze.ts test/ef-defend-bramka.test.ts
rc R5-EH-1 ac6bde33 tools/content-build packages/poker-core/src/scenario-gen.ts test/ek-eh1-dolosowanie.test.ts
rc R6-ekran-pick-hand 1503e4c5 apps/mobile apps/mobile/src/features/scenariusz/wariant.ts:apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:apps/mobile/src/features/scenariusz/liczby.ts src/features/scenariusz/__tests__/ek-pick-hand-ekran.test.tsx
