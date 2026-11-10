import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Sesja AU (2026-11-10, rola 09): znaleziska WYS pełnego przeglądu 9 języków (docs/lokalizacja/dowody/przeglad-pelny-2026-11-10/).
// Test odtwarza każde znalezisko na plikach w repo: czerwony przed nałożeniem poprawek, zielony po.
const KORZEN = join(__dirname, '../../../../..');
const czytaj = (sciezka: string) => readFileSync(join(KORZEN, sciezka), 'utf8');

describe('WYS przeglądu pełnego: dane użytkownika i treść', () => {
  it('ja data.replaceBody: postęp Z TELEFONU zostaje zastąpiony postępem Z PLIKU (kierunek jak pl.json)', () => {
    const ja = JSON.parse(czytaj('apps/mobile/src/i18n/locales/ja.json')) as { data: { replaceBody: string } };
    const pl = JSON.parse(czytaj('apps/mobile/src/i18n/locales/pl.json')) as { data: { replaceBody: string } };
    expect(pl.data.replaceBody.startsWith('Postęp z pliku zastąpi postęp zapisany w tym telefonie')).toBe(true);
    // „AがBに置き換わります” = A zostaje zastąpione przez B; podmiotem (A) ma być postęp zapisany w telefonie.
    expect(ja.data.replaceBody.startsWith('このスマートフォンに保存されている進捗が、ファイルの進捗に置き換わります。')).toBe(true);
  });

  it('es m4-l4:33: „todos se retiran hasta ti” (fold), nie „pasan” (= check)', () => {
    const t = czytaj('content/es/lessons/m4-l4-limperzy.md');
    expect(t).toContain('todos se retiran hasta ti');
    expect(t).not.toContain('todos pasan hasta ti');
  });

  // Zgubione znaczniki {{t:…}} przy niezmienionym sensie zdania (pl ma znacznik). [plik, fragment z przywróconym znacznikiem]
  const ZNACZNIKI: Array<[string, string]> = [
    ['content/fr/rules.yaml', "vous {{t:bet|misez}} plus souvent un {{t:second-barrel|second barrel}}"],
    ['content/fr/rules.yaml', 'if: "vous {{t:bet|misez}} en probe bet au turn"'],
    ['content/fr/rules.yaml', "l'adversaire {{t:bet|mise}} le {{t:second-barrel|second barrel}} avec"],
    ['content/fr/lessons/m5-l3-czestotliwosc-rozmiar.md', 'Une main sans {{t:pair|paire}} rate le flop'],
    ['content/fr/lessons/m8-l3-blokery.md', 'La {{t:big-blind|grosse blinde}} checke à la river.'],
    ['content/de/rules.yaml', '{{t:fold|foldest}} du öfter als {{n:alpha.bet-third}}'],
    ['content/de/rules.yaml', '{{t:fold|foldet}} dein Gegner eine schlechtere Hand, gewinnst du denselben'],
    ['content/de/rules.yaml', '{{t:fold|foldet}} dein Gegner selten, spielen'],
    ['content/de/lessons/m8-l1-value.md', '{{t:fold|folden}} schlechtere Hände meist'],
    ['content/de/lessons/m8-l1-value.md', '{{t:street|Streets}} {{t:call|gecallt}} hat'],
    ['content/vi/rules.yaml', '(số {{t:street|vòng cược}} là đơn giản hóa)'],
    ['content/vi/rules.yaml', 'khi họ {{t:bluff|bluff}} thừa, bạn luôn'],
    ['content/vi/exams/m5.yaml', 'Cược bằng cả {{t:pot|pot}} rủi ro'],
  ];
  it.each(ZNACZNIKI)('znacznik przywrócony: %s → %s', (plik, fragment) => {
    expect(czytaj(plik)).toContain(fragment);
  });
});
