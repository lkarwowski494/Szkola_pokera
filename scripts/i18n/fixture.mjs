// Atrapa projektu dla testów skryptów przekładu i przeglądu (K3a): mały `content/pl`, `terms.yaml` i słownik interfejsu.
// Bez sieci: testy podmieniają fetch na atrapę albo na funkcję, która rzuca.
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';

export const LEKCJA_PL = `---
id: m0.l1
module: m0
order: 1
title: "Układy"
sub: "Co wygrywa z czym"
rules: [R-M0-001]
drills:
  - kind: choice
    id: m0.l1.q1
    rules: [R-M0-001]
    prompt: "W {{t:pot|puli}} jest {{n:ex.pot}}. Co robisz?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Potrzebujesz {{n:eq.bet-pot}}." }
      - { text: "Pasuję", why: "Za wcześnie." }
---

## Najwyższe układy

Poker królewski to [[As Ks Qs Js Ts]]. Dopłacasz {{n:ex.bet}} do {{t:pot|puli}}.

\`\`\`range
rfi.utg
\`\`\`

:::note
Zasada R-M0-001 obowiązuje zawsze. {{helplines}}
:::
`;

export const LEKCJA_EN = `---
id: m0.l1
module: m0
order: 1
title: "Hand rankings"
sub: "What beats what"
rules: [R-M0-001]
drills:
  - kind: choice
    id: m0.l1.q1
    rules: [R-M0-001]
    prompt: "The {{t:pot}} is {{n:ex.pot}}. What do you do?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{t:call}}", correct: true, why: "You need {{n:eq.bet-pot}}." }
      - { text: "Fold", why: "Too early." }
---

## The highest hands

A royal flush is [[As Ks Qs Js Ts]]. You put {{n:ex.bet}} into the {{t:pot}}.

\`\`\`range
rfi.utg
\`\`\`

:::note
Rule R-M0-001 always applies. {{helplines}}
:::
`;

export const EGZAMIN_PL = `# komentarz
module: m0
drills:
  - kind: choice
    id: m0.exam.q1
    rules: [R-M0-001]
    prompt: "Masz {{t:pot|pulę}} {{n:ex.pot}}."
    options:
      - { text: "Tak", correct: true, why: "Bo {{n:eq.bet-pot}}." }
`;

export const PL_JSON = {
  today: {
    title: 'Dziś',
    lessonOf: '{{modul}}, lekcja {{nr}}',
    reviewsDue_one: '{{count}} na dziś',
    reviewsDue_few: '{{count}} na dziś',
    reviewsDue_many: '{{count}} na dziś',
    reviewsDue_other: '{{count}} na dziś',
  },
};
export const KONTEKST = { 'today.title': 'Nagłówek ekranu. Ok. 4 znaki.', 'today.lessonOf': 'Wiersz lekcji. Parametry: modul, nr.', 'today.reviewsDue': 'Licznik powtórek. Parametr: count.' };

export const TERMS = `pot:
  pl: pula
  en: pot
  forms: [pula, puli]
call:
  pl: sprawdzenie
  en: call
  forms: [sprawdzenie]
fold:
  pl: pas
  en: fold
`;

const zapisz = (root, rel, tekst) => { const p = join(root, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, tekst); };

/** Nowy katalog z atrapą projektu; `zEn` dopisuje angielskie pliki (odniesienie dla kolejnych języków, D-289). */
export function atrapa({ zEn = false } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'k3a-'));
  zapisz(root, 'content/terms.yaml', TERMS);
  zapisz(root, 'content/pl/lessons/m0-l1-uklady.md', LEKCJA_PL);
  zapisz(root, 'content/pl/exams/m0.yaml', EGZAMIN_PL);
  zapisz(root, 'apps/mobile/src/i18n/locales/pl.json', JSON.stringify(PL_JSON, null, 2) + '\n');
  zapisz(root, 'apps/mobile/src/i18n/locales/pl.kontekst.json', JSON.stringify(KONTEKST, null, 2) + '\n');
  if (zEn) {
    zapisz(root, 'content/en/lessons/m0-l1-uklady.md', LEKCJA_EN);
    zapisz(root, 'apps/mobile/src/i18n/locales/en.json', JSON.stringify({ today: { title: 'Today', lessonOf: '{{modul}}, lesson {{nr}}', reviewsDue_one: '{{count}} due today', reviewsDue_other: '{{count}} due today' } }, null, 2) + '\n');
  }
  return root;
}

/** fetch, który kończy test błędem — dowód, że ścieżka nie dotyka sieci. */
export const fetchZakazany = () => { throw new Error('sieć zakazana w tym teście'); };

/** Atrapa API batchy: zapisuje wywołania, zwraca podane linie wyników. `odpowiedz(custom_id, params)` → tekst modelu. */
export function atrapaApi(odpowiedz) {
  const wywolania = []; let zadania = [];
  const ok = (cialo, tekst = false) => ({ ok: true, status: 200, json: async () => cialo, text: async () => (tekst ? cialo : JSON.stringify(cialo)) });
  const fetchFn = async (url, init) => {
    const u = new URL(url); wywolania.push({ metoda: init.method, sciezka: u.pathname, naglowki: init.headers, cialo: init.body ? JSON.parse(init.body) : null });
    if (u.pathname.endsWith('/count_tokens')) return ok({ input_tokens: 1000 });
    if (u.pathname === '/v1/messages/batches' && init.method === 'POST') { zadania = JSON.parse(init.body).requests; return ok({ id: 'msgbatch_test1', processing_status: 'in_progress' }); }
    if (u.pathname === '/v1/messages/batches/msgbatch_test1') return ok({ id: 'msgbatch_test1', processing_status: 'ended', results_url: 'https://api.anthropic.com/v1/messages/batches/msgbatch_test1/results' });
    if (u.pathname.endsWith('/results')) {
      const linie = zadania.map((z) => JSON.stringify({ custom_id: z.custom_id, result: { type: 'succeeded', message: { stop_reason: 'end_turn', content: [{ type: 'text', text: odpowiedz(z.custom_id, z.params) }], usage: { input_tokens: 10, output_tokens: 10 } } } }));
      return ok(linie.join('\n'), true);
    }
    throw new Error(`nieoczekiwane wywołanie ${init.method} ${u.pathname}`);
  };
  return { fetchFn, wywolania, zadania: () => zadania };
}
