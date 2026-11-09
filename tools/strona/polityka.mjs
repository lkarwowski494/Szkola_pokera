// Strona polityki prywatności (K-10, D-307, D-308): site/privacy.html składana z docs/wydanie/polityka-prywatnosci/{pl,en}.md,
// jedna strona dwujęzyczna jak Trening site/privacy.html (2e4b0f8, odczyt 2026-11-09). Jedno źródło treści: pliki .md;
// test tests/narzedzia/strona.test.mjs pilnuje, że site/privacy.html = wynik tego skryptu. Bez skryptów, czcionek
// i zasobów zewnętrznych (standard marki: bez śledzenia). Użycie: node tools/strona/polityka.mjs [--zapisz]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const korzen = join(dirname(fileURLToPath(import.meta.url)), '../..');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const wiersz = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/** Podzbiór Markdown z plików polityki: #, ##, akapity, listy „- ”, **pogrubienie**; komentarze HTML pomijane. */
export function mdNaHtml(md) {
  const tekst = md.replace(/<!--[\s\S]*?-->/g, '').trim();
  const out = [];
  for (const blok of tekst.split(/\n\s*\n/)) {
    const linie = blok.split('\n').map((l) => l.trim()).filter(Boolean);
    if (linie.length === 0) continue;
    if (linie[0].startsWith('## ')) out.push(`<h2>${wiersz(linie[0].slice(3))}</h2>`);
    else if (linie[0].startsWith('# ')) out.push(`<h1>${wiersz(linie[0].slice(2))}</h1>`);
    else if (linie.every((l) => l.startsWith('- '))) out.push(`<ul>\n${linie.map((l) => `  <li>${wiersz(l.slice(2))}</li>`).join('\n')}\n</ul>`);
    else out.push(`<p>${wiersz(linie.join(' '))}</p>`);
  }
  return out.join('\n');
}

export const STYL = `<style>
  :root { color-scheme: light dark; --bg: #f4f3ef; --fg: #1b1c1f; --muted: #55585e; --line: #d6d4cc; }
  @media (prefers-color-scheme: dark) { :root { --bg: #121316; --fg: #ecebe6; --muted: #a9abb0; --line: #34363b; } }
  body { margin: 0; background: var(--bg); color: var(--fg); font: 16px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  main { max-width: 720px; margin: 0 auto; padding: 24px 16px 48px; }
  h1 { font-size: 26px; margin: 0 0 4px; } h2 { font-size: 19px; margin: 28px 0 8px; }
  hr { border: 0; border-top: 1px solid var(--line); margin: 36px 0; }
  a { color: inherit; } nav { margin: 0 0 20px; font-size: 14px; } nav a { margin-right: 14px; }
</style>`;

export function stronaPolityki() {
  const md = (j) => readFileSync(join(korzen, 'docs/wydanie/polityka-prywatnosci', `${j}.md`), 'utf8');
  return `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PokerGym — polityka prywatności / Privacy Policy</title>
${STYL}
</head>
<body>
<main>
<!-- Plik generowany: node tools/strona/polityka.mjs --zapisz. Źródło: docs/wydanie/polityka-prywatnosci/pl.md i en.md (dowody plik:linia: README.md §2 tamże).
     Nie edytuj ręcznie; zmiana działania aplikacji dotycząca danych → zmiana .md i ponowne złożenie przed wydaniem. -->
<nav><a href="support.html">Wsparcie / Support</a><a href="#en">English</a></nav>
<section lang="pl" id="pl">
${mdNaHtml(md('pl'))}
</section>
<hr>
<section lang="en" id="en">
${mdNaHtml(md('en'))}
</section>
</main>
</body>
</html>
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv.includes('--zapisz')) {
  writeFileSync(join(korzen, 'site/privacy.html'), stronaPolityki());
  console.log('site/privacy.html zapisany');
}
