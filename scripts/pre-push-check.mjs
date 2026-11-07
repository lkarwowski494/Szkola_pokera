// Hook PreToolUse (Bash) przed `git push` agenta (D-171, zasada wspólna 21 / D-050): szybkie bramki, pełny zestaw w CI.
// Wejście: JSON na stdin z `tool_input.command`. Polecenie bez `git push` → kod 0 od razu. Porażka bramki → kod 2
// (Claude Code blokuje wywołanie i przekazuje stderr agentowi). Pomiar 2026-11-07: typy 8,0 s, i18n 0,2 s,
// content:check 1,8 s, tresci:rejestr 0,5 s. PRE_PUSH_BRAMKI (JSON [[nazwa, polecenie]]) podmienia listę — tylko w teście.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KORZEN = process.env.CLAUDE_PROJECT_DIR || join(dirname(fileURLToPath(import.meta.url)), '..');
const BRAMKI = process.env.PRE_PUSH_BRAMKI
  ? JSON.parse(process.env.PRE_PUSH_BRAMKI)
  : [
      ['typy', 'pnpm -s typecheck'],
      ['i18n', 'pnpm -s i18n'],
      ['content:check', 'pnpm -s content:check'],
      ['tresci:rejestr', 'pnpm -s tresci:rejestr'],
    ];

/** `git push` jako polecenie (także po `cd … &&`, `;`, z `git -C dir push`), nie fragment innego słowa. */
export const toPush = (polecenie) => /(^|[;&|(]\s*|\s)git(\s+-C\s+\S+)?\s+push\b/.test(polecenie);

function main() {
  let wejscie = null;
  try {
    wejscie = JSON.parse(readFileSync(0, 'utf8'));
  } catch {
    process.exit(0); // nie nasze wejście: nie blokujemy
  }
  const polecenie = String(wejscie?.tool_input?.command ?? '');
  if (!toPush(polecenie)) process.exit(0);
  for (const [nazwa, cmd] of BRAMKI) {
    const r = spawnSync(cmd, { cwd: KORZEN, shell: true, encoding: 'utf8' });
    if (r.status !== 0) {
      const wynik = `${r.stdout ?? ''}${r.stderr ?? ''}`.trim().split('\n').slice(-30).join('\n');
      process.stderr.write(`pre-push: bramka „${nazwa}” (${cmd}) zakończona kodem ${r.status}. Push zablokowany; napraw i uruchom pełne \`pnpm run ci\`.\n${wynik}\n`);
      process.exit(2);
    }
  }
  process.exit(0);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) main();
