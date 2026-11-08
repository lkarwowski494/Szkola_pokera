/// <reference types="jest" />
// Wejście do aktywności z limitem (rola 08 cz. 5b krok 4; PR-03, PR-04; ADR 0007; BR-LIM-001–004; flowy 06, 09):
// aktywność w toku → wznowienie bez ekranu startu i bez sprawdzania limitu (BR-LIM-002-b); lekcja i pierwszy test → bez
// ekranu startu (BR-LIM-003); sesja, powtórki, test powtórny → ekran startu z licznikiem dnia (wyczerpany → zakup). Port node:sqlite.
import { KONFIGURACJA } from '@szkola/domena';
import { zacznijAktywnosc } from '@szkola/postep';
import { przygotujStart } from '@/features/start/wejscieStartu';
import { utworzZegar } from '@/platform/zegar';
import { portTestowy } from '@/test-utils/postepTestowy';

const T0 = Date.UTC(2026, 10, 8, 10); // 11:00 w Warszawie
const zegar = (t = T0) => utworzZegar({ kalendarz: () => 'Europe/Warsaw', intl: () => null }, () => t);
const POLNOC = Date.UTC(2026, 10, 8, 23); // 2026-11-09 00:00 w Warszawie
const aktywnosc = (rodzaj: 'sesja' | 'powtorki' | 'lekcja', zLimitu: boolean, trescId: string | null = null, dzien = '2026-11-08') => ({
  stan: 'w_toku' as const, rodzaj, zLimitu, dzienLokalny: dzien, strefa: 'Europe/Warsaw', startMs: T0 - 1000,
  plan: { liczbaKrokow: 3, trescId }, krok: 1,
});

describe('przygotujStart', () => {
  it('pierwsza aktywność dnia: ekran startu z LIMIT_AKTYWNOSCI_DZIENNIE i odnowieniem o północy telefonu', async () => {
    const { port } = await portTestowy();
    expect(await przygotujStart(port, { rodzaj: 'sesja', trescId: null, pierwszePodejscieTestu: false, pro: false, zegar: zegar() })).toEqual({
      ok: true, wartosc: { akcja: 'ekran_startu', limit: { bezLimitu: false, pozostalo: KONFIGURACJA.LIMIT_AKTYWNOSCI_DZIENNIE, odnowienieMs: POLNOC } },
    });
  });

  it('BR-LIM-001: limit zużyty przez inny rodzaj (wspólny limit, porzucona też liczy) → ekran startu z 0', async () => {
    const { port } = await portTestowy();
    await zacznijAktywnosc(port, 'a1', aktywnosc('sesja', true), undefined);
    await zacznijAktywnosc(port, 'a2', aktywnosc('sesja', true), { id: 'a1', teraz: T0 }); // a1 porzucona
    const w = await przygotujStart(port, { rodzaj: 'powtorki', trescId: null, pierwszePodejscieTestu: false, pro: false, zegar: zegar() });
    expect(w).toEqual({ ok: true, wartosc: { akcja: 'ekran_startu', limit: { bezLimitu: false, pozostalo: 0, odnowienieMs: POLNOC } } });
  });

  it('BR-LIM-002-b: aktywność w toku tego rodzaju → wznowienie bez ekranu startu, także po północy i przy zużytym limicie', async () => {
    const { port } = await portTestowy();
    await zacznijAktywnosc(port, 'a1', aktywnosc('sesja', true), undefined);
    const poPolnocy = await przygotujStart(port, { rodzaj: 'sesja', trescId: null, pierwszePodejscieTestu: false, pro: false, zegar: zegar(POLNOC + 60_000) });
    expect(poPolnocy).toMatchObject({ ok: true, wartosc: { akcja: 'wznow', limit: { bezLimitu: false, pozostalo: KONFIGURACJA.LIMIT_AKTYWNOSCI_DZIENNIE } } }); // nowy dzień: limit odnowiony, wznowienie i tak bez startu
  });

  it('w toku inna treść tego rodzaju (inny test) → ekran startu, nie wznowienie', async () => {
    const { port } = await portTestowy();
    await zacznijAktywnosc(port, 'a1', { ...aktywnosc('sesja', false, 'm1'), rodzaj: 'test_modulu' }, undefined);
    const w = await przygotujStart(port, { rodzaj: 'test_modulu', trescId: 'm2', pierwszePodejscieTestu: false, pro: false, zegar: zegar() });
    expect(w.ok && w.wartosc.akcja).toBe('ekran_startu');
  });

  it('BR-LIM-003: lekcja i pierwsze podejście do testu → bez ekranu startu, nawet przy zużytym limicie', async () => {
    const { port } = await portTestowy();
    await zacznijAktywnosc(port, 'a1', aktywnosc('sesja', true), undefined);
    for (const w of [
      await przygotujStart(port, { rodzaj: 'lekcja', trescId: 'm0.l1', pierwszePodejscieTestu: false, pro: false, zegar: zegar() }),
      await przygotujStart(port, { rodzaj: 'test_modulu', trescId: 'm0', pierwszePodejscieTestu: true, pro: false, zegar: zegar() }),
    ]) expect(w).toMatchObject({ ok: true, wartosc: { akcja: 'bez_ekranu', limit: { bezLimitu: false, pozostalo: 0 } } });
  });

  it('Pro: ekran startu bez licznika (bezLimitu)', async () => {
    const { port } = await portTestowy();
    await zacznijAktywnosc(port, 'a1', aktywnosc('sesja', true), undefined);
    expect(await przygotujStart(port, { rodzaj: 'powtorki', trescId: null, pierwszePodejscieTestu: false, pro: true, zegar: zegar() })).toEqual({
      ok: true, wartosc: { akcja: 'ekran_startu', limit: { bezLimitu: true } },
    });
  });

  it('wczorajsza aktywność z limitu nie zużywa dzisiejszego', async () => {
    const { port } = await portTestowy();
    await zacznijAktywnosc(port, 'a1', aktywnosc('powtorki', true, null, '2026-11-07'), undefined);
    const w = await przygotujStart(port, { rodzaj: 'sesja', trescId: null, pierwszePodejscieTestu: false, pro: false, zegar: zegar() });
    expect(w.ok && w.wartosc.akcja === 'ekran_startu' && !w.wartosc.limit.bezLimitu && w.wartosc.limit.pozostalo).toBe(KONFIGURACJA.LIMIT_AKTYWNOSCI_DZIENNIE);
  });
});
