// HW (08-programista-502): funkcje pomocnicze skryptu zrzutów (hl-zrzuty.mjs), osobno, żeby dało się je przetestować.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

/** Wysokość widoku w pikselach CSS: najmniej wysokość telefonu, najwięcej sufit (ekran bez końca nie może zawiesić skryptu). */
export const WYSOKOSC_MIN_PX = 844;
export const WYSOKOSC_MAX_PX = 12000;

/**
 * Powiększa widok do wysokości treści: ekran przewija się wewnątrz ScrollView, więc `fullPage` mierzyłby tylko dokument (wysokość okna) i ucinał treść.
 * Wysokość = największy `scrollHeight` w drzewie (najwyższy przewijany element; elementy na pełną wysokość okna dają co najmniej wysokość widoku), w granicach WYSOKOSC_MIN_PX…WYSOKOSC_MAX_PX.
 */
export async function dopasujWysokosc(strona, szerokoscPx) {
  const tresc = await strona.evaluate(() => Math.max(...[...document.querySelectorAll('*')].map((e) => e.scrollHeight)));
  const wysokosc = Math.max(WYSOKOSC_MIN_PX, Math.min(tresc, WYSOKOSC_MAX_PX));
  await strona.setViewportSize({ width: szerokoscPx, height: wysokosc });
  await strona.waitForTimeout(300);
}

/** Pary plików z identycznym skrótem md5; puste, gdy każdy plik jest inny. */
export function powtorzoneZrzuty(katalog, nazwy) {
  const wgSkrotu = new Map();
  for (const nazwa of nazwy) {
    const skrot = createHash('md5').update(fs.readFileSync(path.join(katalog, nazwa))).digest('hex');
    wgSkrotu.set(skrot, [...(wgSkrotu.get(skrot) ?? []), nazwa]);
  }
  return [...wgSkrotu.values()].filter((g) => g.length > 1);
}
