// dzienLokalny (rola 08 cz. 5): ten sam dzień co limit (ADR 0007 pkt 1) — strefa z przesunięciem niecałkowitym i granica północy.
import { describe, expect, it } from 'vitest';
import { dzienLokalny } from '../src';

describe('dzienLokalny', () => {
  it('ta sama chwila w różnych strefach daje różne dni; minuta przed i po północy w Warszawie', () => {
    const t = Date.UTC(2026, 10, 7, 23, 30); // 00:30 8 XI w Warszawie (CET), 18:30 7 XI w Nowym Jorku
    expect(dzienLokalny(t, 'Europe/Warsaw')).toBe('2026-11-08');
    expect(dzienLokalny(t, 'America/New_York')).toBe('2026-11-07');
    expect(dzienLokalny(Date.UTC(2026, 10, 7, 22, 59), 'Europe/Warsaw')).toBe('2026-11-07');
    expect(dzienLokalny(Date.UTC(2026, 10, 7, 23, 0), 'Europe/Warsaw')).toBe('2026-11-08');
    expect(dzienLokalny(Date.UTC(2026, 10, 7, 18, 14), 'Asia/Kathmandu')).toBe('2026-11-07'); // 23:59 (UTC+5:45)
    expect(dzienLokalny(Date.UTC(2026, 10, 7, 18, 15), 'Asia/Kathmandu')).toBe('2026-11-08');
  });
});
