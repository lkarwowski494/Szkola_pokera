/// <reference types="jest" />
// A04-10 (audyt roli 04, D-284): teksty widoczne i etykiety czytnika przez `t()`, nie wpisane w kod.
// Dowód zachowania: drugi język testowy z oznaczonymi tekstami — komponent z napisem na sztywno nadal pokazuje polski.
import '@/i18n';
import i18n from 'i18next';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react-native';
import { HAND_CLASSES } from '@szkola/poker-core';
import { PaintGrid } from '@/components/PaintGrid';
import { RangeGrid } from '@/components/RangeGrid';
import { PlayingCard } from '@/components/PlayingCard';
import { RenderErrorScreen } from '@/components/RenderErrorScreen';
import type { PaintCell } from '@/features/drills/grade';

const TEST = {
  paint: {
    legendPlay: 'X-PLAY',
    legendMiss: 'X-MISS',
    legendExtra: 'X-EXTRA',
    legendMixed: 'X-MIXED',
    hint: 'X-HINT',
    cell: '{{hand}} / {{state}}',
    state: {
      painted: 'X-PAINTED',
      fold: 'X-FOLD',
      hit: 'X-HIT',
      miss: 'X-SMISS',
      extra: 'X-SEXTRA',
      mixed: 'X-SMIXED',
      none: 'X-NONE',
    },
  },
  range: { label: 'X-RANGE {{title}} {{pct}}', playPercent: 'X-PCT {{pct}}' },
  card: {
    name: '{{rank}}-OF-{{suit}}',
    rank: { '2': 'R2', '3': 'R3', '4': 'R4', '5': 'R5', '6': 'R6', '7': 'R7', '8': 'R8', '9': 'R9', T: 'R10', J: 'RJ', Q: 'RQ', K: 'RK', A: 'RA' },
    suit: { s: 'SPADES', h: 'HEARTS', d: 'DIAMONDS', c: 'CLUBS' },
  },
  errors: { render: { title: 'X-ETITLE', body: 'X-EBODY', retry: 'X-ERETRY' } },
};

beforeAll(async () => {
  i18n.addResourceBundle('en', 'translation', TEST, true, true);
  await i18n.changeLanguage('en');
});
afterAll(async () => {
  await i18n.changeLanguage('pl');
});

describe('A04-10: teksty przez t()', () => {
  it('PaintGrid przed oceną: podpowiedź i stan pola z t()', async () => {
    const painted = HAND_CLASSES.map((_, i) => i === 0);
    await render(<PaintGrid painted={painted} onChange={() => undefined} />);
    expect(screen.getByText('X-HINT')).toBeTruthy();
    expect(screen.getByLabelText(`${HAND_CLASSES[0]} / X-PAINTED`)).toBeTruthy();
    expect(screen.getByLabelText(`${HAND_CLASSES[1]} / X-FOLD`)).toBeTruthy();
  });

  it('PaintGrid po ocenie: legenda i stany pól z t()', async () => {
    const stany: PaintCell[] = ['hit', 'miss', 'extra', 'mixed', 'none'];
    const result = HAND_CLASSES.map((_, i) => stany[i % stany.length]!);
    await render(<PaintGrid painted={HAND_CLASSES.map(() => false)} result={result} />);
    for (const s of ['X-PLAY', 'X-MISS', 'X-EXTRA', 'X-MIXED']) expect(screen.getByText(s)).toBeTruthy();
    const klucz = { hit: 'X-HIT', miss: 'X-SMISS', extra: 'X-SEXTRA', mixed: 'X-SMIXED', none: 'X-NONE' };
    stany.forEach((s, i) => expect(screen.getByLabelText(`${HAND_CLASSES[i]} / ${klucz[s]}`)).toBeTruthy());
  });

  it('RangeGrid: etykieta i podpis procentu z t(), liczba w formacie języka', async () => {
    const spot = { id: 'x', title: 'Tytuł', hero: 'BTN', path: '', playPercent: 0.425, groups: [] };
    await render(<RangeGrid spot={spot} />);
    expect(screen.getByLabelText('X-RANGE Tytuł 42.5')).toBeTruthy();
    expect(screen.getByText('X-PCT 42.5')).toBeTruthy();
  });

  it('PlayingCard: nazwa karty dla czytnika z kluczy card.rank / card.suit', async () => {
    await render(<PlayingCard code="As" />);
    expect(screen.getByLabelText('RA-OF-SPADES')).toBeTruthy();
    await render(<PlayingCard code="Td" />);
    expect(screen.getByLabelText('R10-OF-DIAMONDS')).toBeTruthy();
    await render(<PlayingCard code="7c" />);
    expect(screen.getByLabelText('R7-OF-CLUBS')).toBeTruthy();
  });

  it('RenderErrorScreen: tytuł, opis i przycisk z t()', async () => {
    await render(<RenderErrorScreen onRetry={() => undefined} />);
    for (const s of ['X-ETITLE', 'X-EBODY', 'X-ERETRY']) expect(screen.getByText(s)).toBeTruthy();
  });

  it('_layout: „Wróć” w nagłówku z t(), nie wpisane w kod (strażnik statyczny: układ główny bez testu renderu)', () => {
    const kod = readFileSync(join(__dirname, '../../app/_layout.tsx'), 'utf8');
    expect(kod).not.toMatch(/headerBackTitle:\s*['"`]/);
    expect(kod).toMatch(/headerBackTitle:\s*t\('nav\.back'\)/);
  });
});
