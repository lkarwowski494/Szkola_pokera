/// <reference types="jest" />
/// <reference types="node" />
// M2-koordynator-napraw-001 / 06-tresci-502 (KO-129): siatka w lekcji oznacza klasy `uncertain` spotu
// tak samo jak ćwiczenie malowania (PaintGrid): znak „•” w polu, legenda `paint.legendMixed` tylko gdy są takie klasy.
import '@/i18n';
import i18n from 'i18next';
import { render, screen } from '@testing-library/react-native';
import { HAND_CLASSES } from '@szkola/poker-core';
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
  it('spot z uncertain: jeden „•” na klasę, legenda „mieszana”', async () => {
    const uncertain = ['T2s', 'K7o', '75o'];
    await render(<RangeGrid spot={{ ...spotBase, uncertain }} />);
    expect(screen.getAllByText('•')).toHaveLength(uncertain.length);
    expect(screen.getByText('X-MIXED')).toBeTruthy();
  });

  it('spot bez uncertain (brak pola i pusta lista): zero znaków, brak legendy', async () => {
    await render(<RangeGrid spot={spotBase} />);
    expect(screen.queryAllByText('•')).toHaveLength(0);
    expect(screen.queryByText('X-MIXED')).toBeNull();
    await render(<RangeGrid spot={{ ...spotBase, uncertain: [] }} />);
    expect(screen.queryAllByText('•')).toHaveLength(0);
    expect(screen.queryByText('X-MIXED')).toBeNull();
  });

  it('znak stoi w polu klasy z listy (nie w innym)', async () => {
    const { toJSON } = await render(<RangeGrid spot={{ ...spotBase, uncertain: ['T2s'] }} />);
    const znalezione: string[] = [];
    const przejdz = (n: unknown): void => {
      if (!n || typeof n !== 'object') return;
      const node = n as { children?: unknown[] };
      const dzieci = node.children ?? [];
      const teksty = dzieci.filter((c): c is string => typeof c === 'string');
      const sa = dzieci.filter((c): c is { type: string; children?: unknown[] } => typeof c === 'object' && c !== null);
      const etykiety = sa.map((c) => (c.children ?? []).filter((x): x is string => typeof x === 'string').join(''));
      if (etykiety.includes('•') && etykiety.some((e) => HAND_CLASSES.includes(e as never))) {
        znalezione.push(etykiety.find((e) => HAND_CLASSES.includes(e as never))!);
      }
      void teksty;
      sa.forEach(przejdz);
    };
    przejdz(toJSON());
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

  it('liczba „•” = liczba klas niepewnych dla wszystkich spotów; spoty bez uncertain bez znaków', async () => {
    for (const s of spoty) {
      const { unmount } = await render(<RangeGrid spot={s} />);
      const n = s.uncertain?.length ?? 0;
      expect({ id: s.id, kropki: screen.queryAllByText('•').length }).toEqual({ id: s.id, kropki: n });
      expect({ id: s.id, legenda: screen.queryByText('X-MIXED') !== null }).toEqual({ id: s.id, legenda: n > 0 });
      await unmount();
    }
    console.log(`sprawdzonych siatek: ${spoty.length}`);
  });
});
