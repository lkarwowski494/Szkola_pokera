// HL (D-1670): zrzuty ekranów scenariusza z Expo web + Playwright Chromium. Użycie: pnpm zrzuty:web
// 1) eksport web z wejściem zastępczym (SZKOLA_ZRZUTY=1 → apps/mobile/zrzuty-web/wejscie.tsx), 2) serwer statyczny, 3) zrzuty do docs/design/dowody/hl-*.png.
// Ekrany: start, decyzja, ocena-zgodna, ocena-blad; szerokości 390 i 320 pt; rozmiar domyślny i „AX5”.
// HX (D-1730, D-1734): `HL_EKRANY=start-sc29,start-sc04,iso-co` wybiera ekrany (nazwy z apps/mobile/zrzuty-web/wejscie.tsx), `HL_PREFIKS=hx` zmienia przedrostek plików (domyślnie hl);
// dla ekranów `start-*` skrypt wypisuje też liczbę wierszy tytułu (wiersze liczone z prostokątów tekstu tytułu).
// „AX5” to PRZYBLIŻENIE: react-native-web nie stosuje skali czcionki systemu, więc zrzutowe `Text` (apps/mobile/zrzuty-web/rn.tsx) mnoży fontSize i lineHeight
// przez 3,12 (53/17 pt, Dynamic Type AX5) z sufitem maxFontSizeMultiplier i bez allowFontScaling={false}, jak iOS. Jeden mnożnik, bez krzywej stylów Dynamic Type.
// Wysokość widoku = wysokość treści (HW, 08-programista-502): ekran przewija się wewnątrz ScrollView, więc `fullPage` sam ucinałby zrzut do okna.
// IH (D-1903, pytanie IF opcja A): `HL_LOCALE=de-DE` ustawia język przeglądarki (interfejs z `@/i18n` wybiera język z przeglądarki), `HL_NAGL` to nagłówek przebiegu w tym języku
// (domyślnie „Scenariusz”), `HL_PODSUM` etykieta przycisku podsumowania („Zobacz podsumowanie”); kontrole nie zależą wtedy od polskiego, a zrzuty de powstają z repo.
// Kontrole: tekst poza szerokością ekranu, przewijanie poziome, na ekranach oceny pasek ocen i „Zobacz podsumowanie” w kadrze, żadne dwa zrzuty z tym samym md5. Przy rozmiarze domyślnym → kod wyjścia 1; przy AX5 tylko INFO (znane znaleziska audytu HH).
import { execFileSync } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { dopasujWysokosc, powtorzoneZrzuty } from './hl-zrzuty-lib.mjs';
const { chromium } = createRequire(import.meta.url)('playwright');
const korzen = path.resolve(import.meta.dirname, '../..');
const dist = process.env.HL_DIST ?? path.join(korzen, '.expo/zrzuty-web');
const wyjscie = path.join(korzen, 'docs/design/dowody');
const AX5 = 3.12;
if (!process.env.HL_BEZ_EKSPORTU) {
  fs.rmSync(dist, { recursive: true, force: true });
  execFileSync('pnpm', ['--filter', '@szkola/mobile', 'exec', 'expo', 'export', '--platform', 'web', '--clear', '--output-dir', dist], { cwd: korzen, stdio: 'inherit', env: { ...process.env, SZKOLA_ZRZUTY: '1', CI: '1' } });
}
const mime = { '.js': 'text/javascript', '.html': 'text/html', '.png': 'image/png', '.ttf': 'font/ttf', '.json': 'application/json' };
const srv = http.createServer((q, r) => {
  let p = path.join(dist, decodeURIComponent(q.url.split('?')[0]));
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(dist, 'index.html');
  r.writeHead(200, { 'content-type': mime[path.extname(p)] ?? 'application/octet-stream' });
  fs.createReadStream(p).pipe(r);
}).listen(0);
const port = srv.address().port;
fs.mkdirSync(wyjscie, { recursive: true });
const przeglad = await chromium.launch();
let problemy = 0;
const przedrostek = process.env.HL_PREFIKS ?? 'hl';
const jezykPrzegladarki = process.env.HL_LOCALE ?? 'pl-PL';
const etykietaPodsumowania = process.env.HL_PODSUM ?? 'Zobacz podsumowanie';
const naglowekPrzebiegu = process.env.HL_NAGL ?? 'Scenariusz';
const ekrany = process.env.HL_EKRANY ? process.env.HL_EKRANY.split(',') : ['start', 'decyzja', 'ocena-zgodna', 'ocena-blad'];
for (const ekran of ekrany) {
  for (const szer of [390, 320]) {
    for (const ax5 of [false, true]) {
      const ctx = await przeglad.newContext({ viewport: { width: szer, height: 844 }, deviceScaleFactor: 2, colorScheme: 'light', locale: jezykPrzegladarki });
      const strona = await ctx.newPage();
      const bledy = [];
      strona.on('pageerror', (e) => bledy.push(String(e).slice(0, 200)));
      await strona.goto(`http://localhost:${port}/?ekran=${ekran}&fs=${ax5 ? AX5 : 1}`, { waitUntil: 'networkidle' });
      await strona.waitForTimeout(500);
      await dopasujWysokosc(strona, szer);
      const wynik = await strona.evaluate(({ ocena, przebieg, ax5: duzy, tytul, podsumowanie, naglowekTekst }) => {
        const W = document.documentElement.clientWidth; const out = [];
        for (const e of document.querySelectorAll('*')) {
          const txt = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
          if (!txt) continue;
          const r = e.getBoundingClientRect();
          if (r.width && (r.right > W + 1 || r.left < -1)) out.push(`poza ekranem: „${txt.slice(0, 30)}”`);
        }
        if (document.documentElement.scrollWidth > W + 1) out.push(`przewijanie poziome ${document.documentElement.scrollWidth}>${W}`);
        if (ocena) {
          const H = window.innerHeight;
          const pasek = document.querySelector('[role="img"][aria-label]');
          if (!pasek) out.push('brak paska ocen');
          else if (pasek.getBoundingClientRect().bottom > H) out.push('pasek ocen poza kadrem zrzutu');
          const przycisk = [...document.querySelectorAll('*')].find((e) => e.childElementCount === 0 && e.textContent.trim() === podsumowanie);
          if (!przycisk) out.push(`brak „${podsumowanie}”`);
          else if (przycisk.getBoundingClientRect().bottom > H) out.push(`„${podsumowanie}” poza kadrem zrzutu`);
        }
        if (przebieg) {
          // HW (08-programista-501): przy AX5 nagłówek przebiegu musi się ułożyć w kolumnę (gałąź układu zależna od fontScale), przy tekście domyślnym w wiersz.
          const naglowek = [...document.querySelectorAll('[role="heading"]')].find((e) => e.textContent.trim() === naglowekTekst);
          const kierunek = naglowek ? getComputedStyle(naglowek.parentElement).flexDirection : 'brak nagłówka';
          const oczekiwany = duzy ? 'column' : 'row';
          if (kierunek !== oczekiwany) out.push(`brak układu dużego tekstu: nagłówek przebiegu flexDirection=${kierunek}, oczekiwano ${oczekiwany}`);
        }
        let wiersze = null; let rozmiarTytulu = null;
        if (tytul) {
          const h = document.querySelector('[role="heading"]');
          if (h) {
            const rg = document.createRange(); rg.selectNodeContents(h);
            wiersze = new Set([...rg.getClientRects()].filter((q) => q.width).map((q) => Math.round(q.top))).size;
            rozmiarTytulu = getComputedStyle(h).fontSize;
          }
        }
        return { out, tekst: document.body.innerText.length, wiersze, rozmiarTytulu };
      }, { ocena: ekran.startsWith('ocena'), przebieg: !ekran.startsWith('start') && !ekran.startsWith('po-ocenie'), ax5, tytul: ekran.startsWith('start-'), podsumowanie: etykietaPodsumowania, naglowekTekst: naglowekPrzebiegu });
      const nazwa = `${przedrostek}-${ekran}-${szer}${ax5 ? '-ax5' : ''}.png`;
      if (wynik.wiersze !== null) console.log(`TYTUL ${nazwa}: wierszy ${wynik.wiersze}, rozmiar ${wynik.rozmiarTytulu}`);
      if (wynik.tekst < 20) bledy.push('pusty ekran');
      await strona.screenshot({ path: path.join(wyjscie, nazwa), fullPage: true });
      const twarde = (x) => !ax5 || bledy.includes(x) || /kadrem|brak |układu/.test(x);
      for (const x of [...wynik.out, ...bledy]) { console.log(`${twarde(x) ? '' : 'INFO '}${nazwa}: ${x}`); if (twarde(x)) problemy++; }
      await ctx.close();
    }
  }
}
await przeglad.close(); srv.close();
const nazwyZrzutow = ekrany.flatMap((e) => [390, 320].flatMap((w) => [`${przedrostek}-${e}-${w}.png`, `${przedrostek}-${e}-${w}-ax5.png`]));
for (const grupa of powtorzoneZrzuty(wyjscie, nazwyZrzutow)) { console.log(`identyczne zrzuty (md5): ${grupa.join(', ')}`); problemy++; }
console.log(problemy ? `problemy: ${problemy}` : `OK: ${nazwyZrzutow.length} zrzutów w ${path.relative(korzen, wyjscie)}`);
process.exit(problemy ? 1 : 0);
