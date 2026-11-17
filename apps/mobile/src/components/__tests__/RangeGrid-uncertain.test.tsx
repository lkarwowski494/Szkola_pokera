/// <reference types="jest" />
/// <reference types="node" />
// M2-koordynator-napraw-001 / 06-tresci-502 (KO-129): siatka w lekcji oznacza klasy `uncertain` spotu
// tak samo jak ćwiczenie malowania (PaintGrid): znak w polu, legenda `paint.legendMixed` tylko gdy są takie klasy.
// KO-132 / D-2020: znak w siatce lekcji to kropka (View, testID `kropka-<klasa>`), nie tekst „•”; zachowanie bez zmian: kropka tylko dla klas z `uncertain`.
import '@/i18n';
import i18n from 'i18next';
import { render, screen } from '@testing-library/react-native';
import { RangeGrid } from '@/components/RangeGrid';
import { sciezkaTresciPl } from '@/test-utils/trescPl';
import type { RangeSpot } from '@/data/content/repo';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');

beforeAll(async () => {
  i18n.addResourceBundle('en', 'translation', { paint: { legendMixed: 'X-MIXED' }, range: { label: 'X-RANGE {{title}} {{pct}}', playPercent: 'X-PCT {{pct}}' } }, true, true);
  await i18n.changeLanguage('en');
});
afterAll(async () => {
  await i18n.changeLanguage('pl');
});

const spotBase = { id: 'x', title: 'Tytuł', hero: 'BB', path: '', playPercent: 0.4, groups: [] };

describe('RangeGrid: klasy niepewne (uncertain)', () => {
  it('spot z uncertain: jedna kropka na klasę, legenda „mieszana”', async () => {
    const uncertain = ['T2s', 'K7o', '75o'];
    await render(<RangeGrid spot={{ ...spotBase, uncertain }} />);
    expect(screen.getAllByTestId(/^kropka-/)).toHaveLength(uncertain.length);
    expect(screen.getByText('X-MIXED')).toBeTruthy();
  });

  it('spot bez uncertain (brak pola i pusta lista): zero kropek, brak legendy', async () => {
    await render(<RangeGrid spot={spotBase} />);
    expect(screen.queryAllByTestId(/^kropka-/)).toHaveLength(0);
    expect(screen.queryByText('X-MIXED')).toBeNull();
    await render(<RangeGrid spot={{ ...spotBase, uncertain: [] }} />);
    expect(screen.queryAllByTestId(/^kropka-/)).toHaveLength(0);
    expect(screen.queryByText('X-MIXED')).toBeNull();
  });

  it('kropka stoi w polu klasy z listy (nie w innym)', async () => {
    const { toJSON } = await render(<RangeGrid spot={{ ...spotBase, uncertain: ['T2s'] }} />);
    type N = { type?: string; props?: { testID?: string }; children?: (N | string)[] | null };
    const tekst = (n: N | string): string => (typeof n === 'string' ? n : (n.children ?? []).map(tekst).join(''));
    const znalezione: string[] = [];
    const przejdz = (n: N | string | null | undefined): void => {
      if (!n || typeof n === 'string') return;
      const dzieci = (n.children ?? []).filter((c): c is N => typeof c === 'object' && c !== null);
      // pole = węzeł, którego bezpośrednim dzieckiem jest kropka; etykieta = jedyna klasa w tekście tego pola
      if (dzieci.some((c) => c.props?.testID?.startsWith('kropka-'))) znalezione.push(tekst(n));
      else dzieci.forEach(przejdz);
    };
    przejdz(toJSON() as unknown as N);
    expect(znalezione).toEqual(['T2s']);
  });
});

describe('RangeGrid na treści pl: siatka oznacza dokładnie klasy uncertain każdego spotu', () => {
  const db = new DatabaseSync(sciezkaTresciPl(), { readOnly: true });
  const spoty = (db.prepare('SELECT id, title, hero, path, play_percent, groups, uncertain FROM ranges').all() as {
    id: string; title: string; hero: string; path: string; play_percent: number; groups: string; uncertain: string;
  }[]).map((r): RangeSpot => ({ id: r.id, title: r.title, hero: r.hero, path: r.path, playPercent: r.play_percent, groups: JSON.parse(r.groups), uncertain: JSON.parse(r.uncertain) }));
  const zUncertain = spoty.filter((s) => (s.uncertain?.length ?? 0) > 0);

  it('co najmniej 8 spotów z uncertain, w tym 4 BB', () => {
    console.log(`spotów: ${spoty.length}, z uncertain: ${zUncertain.length}, BB: ${zUncertain.filter((s) => s.id.includes('vs-open.bb')).length}`);
    expect(zUncertain.length).toBeGreaterThanOrEqual(8);
    expect(zUncertain.filter((s) => s.id.includes('vs-open.bb')).length).toBeGreaterThanOrEqual(4);
  });

  it('liczba kropek = liczba klas niepewnych dla wszystkich spotów; spoty bez uncertain bez kropek', async () => {
    for (const s of spoty) {
      const { unmount } = await render(<RangeGrid spot={s} />);
      const n = s.uncertain?.length ?? 0;
      expect({ id: s.id, kropki: screen.queryAllByTestId(/^kropka-/).length }).toEqual({ id: s.id, kropki: n });
      expect({ id: s.id, legenda: screen.queryByText('X-MIXED') !== null }).toEqual({ id: s.id, legenda: n > 0 });
      await unmount();
    }
    console.log(`sprawdzonych siatek: ${spoty.length}`);
  });
});
