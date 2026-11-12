#!/usr/bin/env bash
# Kontrola szkiców szablonów sesji FD i FQ (rola 06; FQ: katalog szkiców jako 2. argument, domyślnie fd): pełne `content:build` (schemat, reguły, liczby, terminy, pojemność generatora,
# ŚR-103 b) na kopii roboczej repo ze szkicami w content/{pl,en}/scenarios i z WYŁĄCZONĄ tylko bramką ekranu
# (`checkScenarioNaEkran` zwraca []). Wyjątek nazwany (D-1356): bramka ekranu odrzuca rodzaje bez widoku, więc szkice nie mogą
# przejść jej, zanim 04/08 nie zrobią widoków; pozostałe kontrole działają bez zmian. Nic nie trafia do repo.
# Użycie: bash docs/tresci/narzedzia/fq-kontrola-szkicow.sh <katalog-roboczy> [fd|fq]
set -euo pipefail
REPO="$(git rev-parse --show-toplevel)"
WT="${1:?katalog roboczy}"; SZ="${2:-fd}"
rm -rf "$WT"; git -C "$REPO" worktree prune
git -C "$REPO" worktree add --detach "$WT" HEAD >/dev/null
ln -s "$REPO/node_modules" "$WT/node_modules"
for p in tools/content-build packages/poker-core packages/content-schema packages/jezyki; do
  [ -d "$REPO/$p/node_modules" ] && ln -s "$REPO/$p/node_modules" "$WT/$p/node_modules"
done
cp "$REPO"/content/pl/scenarios/*.yaml "$WT/content/pl/scenarios/"; cp "$REPO"/content/en/scenarios/*.yaml "$WT/content/en/scenarios/"
cp "$REPO"/docs/tresci/szablony-robocze/$SZ/pl/*.yaml "$WT/content/pl/scenarios/"
cp "$REPO"/docs/tresci/szablony-robocze/$SZ/en/*.yaml "$WT/content/en/scenarios/"
F="$WT/tools/content-build/src/scenariusze.ts"
grep -q '^export function checkScenarioNaEkran(t: ScenarioTemplate): string\[\] {$' "$F"
sed -i 's/^export function checkScenarioNaEkran(t: ScenarioTemplate): string\[\] {$/export function checkScenarioNaEkran(t: ScenarioTemplate): string[] { if (t) return [];/' "$F"
cd "$WT/tools/content-build"
set +e
npx tsx src/cli.ts build 2>&1 | grep -v "ExperimentalWarning\|trace-warnings\|^uwaga: .*m10"
KOD=${PIPESTATUS[0]}
set -e
# struktura pl = en (jak test szablony-bs): wszystko poza tekstami
cd "$REPO"
node -e '
const y=require("yaml"),fs=require("fs");const d="docs/tresci/szablony-robocze/"+process.argv[1]+"/";let bl=0;
const bez=(o)=>JSON.parse(JSON.stringify(o,(k,v)=>["situation","explanation"].includes(k)?undefined:v));
for(const f of fs.readdirSync(d+"pl")){const a=bez(y.parse(fs.readFileSync(d+"pl/"+f,"utf8"))),b=bez(y.parse(fs.readFileSync(d+"en/"+f,"utf8")));
 if(JSON.stringify(a)!==JSON.stringify(b)){console.log("struktura pl≠en: "+f);bl++;}}
console.log("struktura pl/en: "+(bl?bl+" różnic":"zgodna"));process.exit(bl?1:0);' "$SZ" || KOD=1
git -C "$REPO" worktree remove --force "$WT"
echo "kod wyjścia: $KOD"
exit "$KOD"
