/// <reference types="jest" />
// Strażnik 08 część 6 krok 7 (D-274, D-259): ekran sesji bez kolorów przejściowych (stopnie bez koloru, design-spec
// „Znaczenie kolorów”), stół z `Stol` (także w przeglądzie egzaminu), zadania ze strategią przez `PanelDecyzji`.
// Kontrola statyczna: ekran sesji nie ma testu renderu (baza, router, sklep); zachowanie panelu — `PanelDecyzji-08`.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const sesja = readFileSync(join(__dirname, '..', 'app', 'session.tsx'), 'utf8');

describe('ekran sesji (08 cz. 6 krok 7)', () => {
  it('bez tk.przejsciowe (wyjątek D-259 kończy się na ekranie sesji)', () => {
    expect(sesja.match(/przejsciowe/g) ?? []).toEqual([]);
  });

  it('stół przez `Stol`, nie `TableFelt`; zadania ze strategią przez `PanelDecyzji`', () => {
    expect(sesja).not.toMatch(/TableFelt/);
    expect(sesja).toMatch(/<Stol table=\{item\.table\}/);
    expect(sesja).toMatch(/<Stol table=\{r\.item\.table\}/);
    expect(sesja).toMatch(/<PanelDecyzji\b/);
  });

  it('A04-08: odpowiedzi po ocenie bez przezroczystości (wyjaśnienie `muted` 15 pt przy opacity 0,75 ma 4,07:1 < 4,5); stan niosą obwódka i znak', () => {
    expect(sesja).not.toMatch(/answered && !oznaczona \? 0\.\d+/);
    expect(sesja).toMatch(/opacity: pressed \? 0\.85 : 1/);
  });
});

