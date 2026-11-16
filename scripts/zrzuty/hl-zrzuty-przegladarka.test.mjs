// HW (08-programista-502): zrzut obejmuje całą treść ekranu przewijanego wewnątrz (jak ScrollView w react-native-web).
// Wymaga Playwright z Chromium (jak `pnpm zrzuty:web`), więc biegnie lokalnie: `pnpm test:zrzuty` (KO-114, 2026-11-16); w CI na GitHubie Chromium nie ma.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { dopasujWysokosc, WYSOKOSC_MAX_PX, WYSOKOSC_MIN_PX } from './hl-zrzuty-lib.mjs';
const { chromium } = createRequire(import.meta.url)('playwright');

/** Strona jak ekran RN-web: dokument ma wysokość okna, a treść przewija się w środku. */
const stronaZPrzewijaniem = (wysokoscTresci) => `<!doctype html><html style="height:100%"><body style="margin:0;height:100%">
<div style="display:flex;flex-direction:column;height:100%;overflow:hidden"><div id="s" style="flex:1;overflow-y:auto"><div style="height:${wysokoscTresci}px;background:linear-gradient(red,blue)"></div></div></div></body></html>`;
/** Wysokość PNG w pikselach (nagłówek IHDR, bajty 20–23). */
const wysokoscPng = (bufor) => bufor.readUInt32BE(20);

async function zrzut(wysokoscTresci, przed) {
  const przegladarka = await chromium.launch();
  try {
    const strona = await (await przegladarka.newContext({ viewport: { width: 390, height: WYSOKOSC_MIN_PX }, deviceScaleFactor: 1 })).newPage();
    await strona.setContent(stronaZPrzewijaniem(wysokoscTresci));
    await przed(strona);
    return { png: await strona.screenshot({ fullPage: true }), widok: strona.viewportSize() };
  } finally { await przegladarka.close(); }
}

test('08-programista-502: zrzut ekranu dłuższego niż 844 px obejmuje całą treść przewijaną w środku', async () => {
  const { png } = await zrzut(2000, (s) => dopasujWysokosc(s, 390));
  assert.ok(wysokoscPng(png) >= 2000, `zrzut ma ${wysokoscPng(png)} px, treść 2000 px`);
});

test('08-programista-502: krótki ekran zostaje przy wysokości telefonu, bardzo długi jest ucięty do sufitu', async () => {
  const krotki = await zrzut(300, (s) => dopasujWysokosc(s, 390));
  assert.equal(wysokoscPng(krotki.png), WYSOKOSC_MIN_PX);
  const dlugi = await zrzut(WYSOKOSC_MAX_PX * 3, (s) => dopasujWysokosc(s, 390));
  assert.equal(wysokoscPng(dlugi.png), WYSOKOSC_MAX_PX);
});
