/// <reference types="jest" />
import '@/i18n';
import i18n from 'i18next';
import { render, screen } from '@testing-library/react-native';
import { RuleCard } from '@/components/RuleCard';
import { formatRuleSources } from '@/components/ruleSources';
import type { RuleRow } from '@/data/content/repo';

// Node ma Intl.PluralRules; polyfill dla Hermesa (moduł ESM) jest tu zbędny.
jest.mock('@formatjs/intl-pluralrules/polyfill.js', () => ({}));
jest.mock('@formatjs/intl-pluralrules/locale-data/pl.js', () => ({}));

const t = i18n.t.bind(i18n);
const rule = (extra: Partial<RuleRow>): RuleRow => ({
  id: 'R-M4-005',
  moduleId: 'm4',
  level: 'gto',
  ifText: 'Button wobec otwarcia CO',
  thenText: 'częściej 3-bet niż sprawdzenie',
  because: 'tak grają rozwiązania solverów',
  sources: [{ kind: 'math', n: 1 }],
  population: null,
  ...extra,
});

describe('źródła reguły: rodzaj i liczba (decyzja właściciela z 9.10.2026)', () => {
  it('rachunek: bez dopisku „jedno źródło”', () => {
    expect(formatRuleSources([{ kind: 'math', n: 1 }], t)).toBe('Źródło: rachunek');
  });
  it('kilka rodzajów: liczba niezależnych źródeł przy każdym rodzaju', () => {
    expect(
      formatRuleSources(
        [
          { kind: 'solver-pub', n: 2 },
          { kind: 'training', n: 3 },
        ],
        t,
      ),
    ).toBe('Źródła: opublikowane rozwiązania solverów (2 niezależne); serwisy szkoleniowe (3)');
    expect(
      formatRuleSources(
        [
          { kind: 'math', n: 1 },
          { kind: 'book', n: 2 },
          { kind: 'solver-app', n: 1 },
          { kind: 'solver-pub', n: 5 },
        ],
        t,
      ),
    ).toBe('Źródła: rachunek; książki teorii pokera (2); solver aplikacji; opublikowane rozwiązania solverów (5 niezależnych)');
  });
  it('jedno źródło (poza rachunkiem) jest oznaczone', () => {
    expect(formatRuleSources([{ kind: 'training', n: 1 }], t)).toBe('Źródło: serwis szkoleniowy (jedno źródło)');
    expect(formatRuleSources([{ kind: 'population', n: 1 }], t)).toBe('Źródło: dane o populacji (jedno źródło)');
    expect(formatRuleSources([{ kind: 'solver-pub', n: 1 }], t)).toBe('Źródło: opublikowane rozwiązanie solvera (jedno źródło)');
  });

  it('karta pokazuje rodzaj i liczbę źródeł oraz populację, a bez showSource nic z tego', async () => {
    const r = rule({
      level: 'exploit',
      sources: [
        { kind: 'population', n: 1 },
        { kind: 'training', n: 2 },
      ],
      population: 'gracze rekreacyjni NL25 6-max w dużym pokoju online',
    });
    const view = await render(<RuleCard rule={r} showSource />);
    expect(screen.getByText('Źródła: dane o populacji; serwisy szkoleniowe (2). Populacja: gracze rekreacyjni NL25 6-max w dużym pokoju online')).toBeTruthy();
    await view.rerender(<RuleCard rule={r} />);
    expect(screen.queryByText(/Źródła:/)).toBeNull();
  });
});
