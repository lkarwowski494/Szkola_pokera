// K-06 i trzecia część K-12 (`tresc_niedostepna`, D-183 pkt 5): start treści na plikach w katalogu tymczasowym.
// Wyrocznie: ADR 0005 pkt 2 (jedna kopia na wersję, stary plik usuwany po udanym otwarciu nowego), pkt 4 (podmiana treści
// nigdy nie dotyka postępu), pkt 5 (manifest), „Potwierdzenie” (przerwanie przed przełączeniem zostawia stary plik);
// tlo-i-bledy.md §4 (`tresc_niedostepna`: ekran błędu, dane użytkownika nietknięte). Port plików i otwarcie: tests/narzedzia/tresc-node.ts.
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { KONFIGURACJA as K, przygotujTresc } from '../../../packages/domena/src';
import { sha256, sumyKatalogu } from '../../narzedzia/pliki-node';
import { plikiTresciNode, zbudujTresc, type WywolanieTresci } from '../../narzedzia/tresc-node';
import { katalogTymczasowy, sprzatnij } from '../../../packages/postep/test/wspolne';

const zamkniecia: (() => void)[] = [];
afterEach(() => { for (const z of zamkniecia.splice(0)) z(); sprzatnij(); });

const meta = (wersja: string, jezyk: string, format: number = K.TRESC_FORMAT) => ({ format: String(format), wersja, jezyk, min_wersja_aplikacji: '1.0.0' });
const NIEDOSTEPNA = { ok: false, powod: 'tresc_niedostepna' };
// Pliki obok treści, których start treści nie dotyka (ADR 0004, K-12, K-14; kopia przed migracją: tlo-i-bledy.md §4;
// obcy plik: usuwanie tylko `tresc-*.db`, nie „wszystko poza znanymi”): bajty muszą zostać te same.
const DANE = ['postep.db', 'postep.db-wal', 'postep.db-shm', 'postep.db-journal', 'postep-przed-v1.db', 'user.db', 'user.db-wal', 'postep-uszkodzona-1730000000000.db', 'notatka.txt'];

function srodowisko(o: { paczka: Record<string, Record<string, string> | null | 'smieci'>; urzadzenie?: Record<string, Record<string, string>> }) {
  const paczka = katalogTymczasowy(), katalog = katalogTymczasowy();
  for (const [n, m] of Object.entries(o.paczka)) {
    if (m === 'smieci') writeFileSync(join(paczka, n), Buffer.alloc(8192, 0x5a)); else zbudujTresc(join(paczka, n), m);
  }
  for (const [n, m] of Object.entries(o.urzadzenie ?? {})) zbudujTresc(join(katalog, n), m, 10);
  DANE.forEach((n, i) => writeFileSync(join(katalog, n), Buffer.from(`dane uzytkownika ${i} `.repeat(200))));
  return { paczka, katalog, danePrzed: sumaDanych(katalog), paczkaPrzed: sumyKatalogu(paczka) };
}
const sumaDanych = (k: string) => Object.fromEntries(DANE.map((n) => [n, sha256(join(k, n))]));
const tresciNaUrzadzeniu = (k: string) => readdirSync(k).filter((n) => n.startsWith('tresc-')).sort();

async function start(s: { paczka: string; katalog: string }, jezyk: string, wstrzyk: Parameters<typeof plikiTresciNode>[0] = {}) {
  const t = plikiTresciNode(wstrzyk);
  zamkniecia.push(t.zamknij);
  const wynik = await przygotujTresc({ paczka: s.paczka, katalog: s.katalog, jezyk, pliki: t.pliki, otworz: t.otworz, zamknij: t.zamknijBaze, obslugiwanyFormat: K.TRESC_FORMAT });
  return { wynik, wywolania: t.wywolania, otwarte: t.ileOtwartych() };
}
const ops = (w: WywolanieTresci[], op: WywolanieTresci['op']) => w.filter((x) => x.op === op);
const bladMiejsca = () => Object.assign(new Error('ENOSPC: no space left on device'), { code: 'ENOSPC' });

describe('AK-K-06: start treści na plikach', () => {
  it('AK-K-06-l pierwsze uruchomienie: kopia pliku języka, manifest przyjęty, plik = bajty z paczki, dane nietknięte', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl'), 'tresc-7-en.db': meta('7', 'en') } });
    const { wynik, wywolania, otwarte } = await start(s, 'pl');
    expect(wynik).toMatchObject({ ok: true, wartosc: { plik: 'tresc-7-pl.db', meta: { format: K.TRESC_FORMAT, wersja: '7', jezyk: 'pl' } } });
    expect(tresciNaUrzadzeniu(s.katalog)).toEqual(['tresc-7-pl.db']);
    expect(sha256(join(s.katalog, 'tresc-7-pl.db'))).toBe(s.paczkaPrzed['tresc-7-pl.db']);
    // ostatnio otwarty (zwrócony) jest plik roboczy; plików z paczki nikt nie otwiera; poza zwróconą bazą nic nie zostaje otwarte
    expect(ops(wywolania, 'otworz').at(-1)?.z).toBe(join(s.katalog, 'tresc-7-pl.db'));
    expect(ops(wywolania, 'otworz').filter((w) => w.z.startsWith(s.paczka))).toEqual([]);
    expect(otwarte).toBe(1);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
    expect(sumyKatalogu(s.paczka)).toEqual(s.paczkaPrzed);
  });

  it('AK-K-06-m kolejny start tej samej wersji: bez kopii i bez usuwania', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl') } });
    expect((await start(s, 'pl')).wynik).toMatchObject({ ok: true });
    const przed = sumyKatalogu(s.katalog);
    const drugi = await start(s, 'pl');
    expect(drugi.wynik).toMatchObject({ ok: true, wartosc: { plik: 'tresc-7-pl.db' } });
    expect(ops(drugi.wywolania, 'kopiuj')).toEqual([]);
    expect(sumyKatalogu(s.katalog)).toEqual(przed); // idempotentne sprzątanie dozwolone, stan katalogu ten sam
  });

  it('AK-K-06-n nowa wersja treści: jedna kopia, stary plik usunięty dopiero po otwarciu nowego, postęp nietknięty', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl') }, urzadzenie: { 'tresc-6-pl.db': meta('6', 'pl') } });
    const { wynik, wywolania, otwarte } = await start(s, 'pl');
    expect(wynik).toMatchObject({ ok: true, wartosc: { plik: 'tresc-7-pl.db', meta: { wersja: '7' } } });
    expect(otwarte).toBe(1);
    expect(ops(wywolania, 'kopiuj').map((w) => w.z)).toEqual([join(s.paczka, 'tresc-7-pl.db')]);
    expect(tresciNaUrzadzeniu(s.katalog)).toEqual(['tresc-7-pl.db']);
    const i = wywolania.findIndex((w) => w.op === 'usun' && w.z === join(s.katalog, 'tresc-6-pl.db'));
    const j = wywolania.findIndex((w) => w.op === 'otworz' && w.z === join(s.katalog, 'tresc-7-pl.db'));
    expect(j).toBeGreaterThanOrEqual(0);
    expect(i).toBeGreaterThan(j);
    expect(wywolania.filter((w) => w.op !== 'lista' && w.op !== 'otworz' && DANE.some((n) => [w.z, w.na].includes(join(s.katalog, n))))).toEqual([]);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
  });

  it('AK-K-06-o przerwana kopia nowej wersji: stary plik i postęp zostają; następny start instaluje pełny nowy plik', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl') }, urzadzenie: { 'tresc-6-pl.db': meta('6', 'pl') } });
    const stary = sha256(join(s.katalog, 'tresc-6-pl.db'));
    const pierwszy = await start(s, 'pl', { przerwij: (w) => (w.op === 'kopiuj' ? bladMiejsca() : null) });
    expect(pierwszy.wynik).toHaveProperty('ok'); // wynik, nie wyjątek
    if (pierwszy.wynik.ok) { // dozwolone: stary plik albo pełny nowy, nigdy połowa
      expect([stary, s.paczkaPrzed['tresc-7-pl.db']]).toContain(sha256(ops(pierwszy.wywolania, 'otworz').at(-1)!.z));
    }
    expect(sha256(join(s.katalog, 'tresc-6-pl.db'))).toBe(stary);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
    zamkniecia.splice(0).forEach((z) => z());

    const drugi = await start(s, 'pl');
    expect(drugi.wynik).toMatchObject({ ok: true, wartosc: { plik: 'tresc-7-pl.db', meta: { wersja: '7' } } });
    const otwarty = ops(drugi.wywolania, 'otworz').at(-1)!.z;
    expect(sha256(otwarty)).toBe(s.paczkaPrzed['tresc-7-pl.db']); // nie połowa pliku z przerwanej kopii
    expect(tresciNaUrzadzeniu(s.katalog)).toEqual(['tresc-7-pl.db']);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
  });

  it('AK-K-06-q zabicie procesu w trakcie kopii (bez `catch`): następny start instaluje pełny nowy plik', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl') }, urzadzenie: { 'tresc-6-pl.db': meta('6', 'pl') } });
    const stary = sha256(join(s.katalog, 'tresc-6-pl.db'));
    let zabity = false; // po połowie kopii każda operacja portu i otwarcie rzucają: kod sprzątający nie ma jak zadziałać
    const t = plikiTresciNode({ przerwij: (w) => (w.op === 'kopiuj' ? ((zabity = true), new Error('proces zabity')) : null), blad: () => (zabity ? new Error('proces zabity') : null) });
    zamkniecia.push(t.zamknij);
    await przygotujTresc({ paczka: s.paczka, katalog: s.katalog, jezyk: 'pl', pliki: t.pliki, zamknij: t.zamknijBaze, obslugiwanyFormat: K.TRESC_FORMAT,
      otworz: async (x) => { if (zabity) throw new Error('proces zabity'); return t.otworz(x); } }).catch(() => undefined);
    expect(sha256(join(s.katalog, 'tresc-6-pl.db'))).toBe(stary);
    zamkniecia.splice(0).forEach((z) => z());

    const drugi = await start(s, 'pl');
    expect(drugi.wynik).toMatchObject({ ok: true, wartosc: { plik: 'tresc-7-pl.db', meta: { wersja: '7' } } });
    expect(sha256(ops(drugi.wywolania, 'otworz').at(-1)!.z)).toBe(s.paczkaPrzed['tresc-7-pl.db']);
    expect(tresciNaUrzadzeniu(s.katalog)).toEqual(['tresc-7-pl.db']);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
  });

  it('AK-K-06-p zmiana języka: kopia nowego języka, plik poprzedniego usunięty po otwarciu', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl'), 'tresc-7-de.db': meta('7', 'de') }, urzadzenie: { 'tresc-7-pl.db': meta('7', 'pl') } });
    const { wynik } = await start(s, 'de');
    expect(wynik).toMatchObject({ ok: true, wartosc: { plik: 'tresc-7-de.db', meta: { jezyk: 'de' } } });
    expect(tresciNaUrzadzeniu(s.katalog)).toEqual(['tresc-7-de.db']);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
  });
});

describe('AK-K-12-tresc: tresc_niedostepna (tlo-i-bledy.md §4), bez wyjątku i bez dotykania danych', () => {
  it('AK-K-12-tresc-a brak pliku języka w paczce → tresc_niedostepna, katalog bez zmian', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl') }, urzadzenie: { 'tresc-6-ja.db': meta('6', 'ja') } });
    const przed = sumyKatalogu(s.katalog);
    const { wynik, wywolania } = await start(s, 'ja');
    expect(wynik).toEqual(NIEDOSTEPNA);
    expect(sumyKatalogu(s.katalog)).toEqual(przed);
    expect(ops(wywolania, 'kopiuj').concat(ops(wywolania, 'przemianuj'))).toEqual([]);
  });

  it('AK-K-12-tresc-b format nowszy niż obsługiwany → tresc_niedostepna; poprzedni plik treści i postęp zostają', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl', K.TRESC_FORMAT + 1) }, urzadzenie: { 'tresc-6-pl.db': meta('6', 'pl') } });
    const stary = sha256(join(s.katalog, 'tresc-6-pl.db'));
    const { wynik, otwarte } = await start(s, 'pl');
    expect(wynik).toEqual(NIEDOSTEPNA);
    expect(otwarte).toBe(0); // odrzucona baza zamknięta
    expect(sha256(join(s.katalog, 'tresc-6-pl.db'))).toBe(stary);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
  });

  it.each([
    ['plik w paczce nie jest bazą SQLite', 'smieci' as const],
    ['plik bez tabeli meta', null],
    ['manifest z innym językiem', meta('7', 'de')],
  ])('AK-K-12-tresc-c %s → tresc_niedostepna, bez wyjątku; poprzedni plik i postęp zostają', async (_o, m) => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': m }, urzadzenie: { 'tresc-6-pl.db': meta('6', 'pl') } });
    const stary = sha256(join(s.katalog, 'tresc-6-pl.db'));
    const { wynik, otwarte } = await start(s, 'pl');
    expect(wynik).toEqual(NIEDOSTEPNA);
    expect(otwarte).toBe(0);
    expect(sha256(join(s.katalog, 'tresc-6-pl.db'))).toBe(stary);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
  });

  it('AK-K-12-tresc-d brak miejsca przy pierwszej kopii (bez starego pliku) → tresc_niedostepna, bez wyjątku, postęp nietknięty', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl') } });
    expect((await start(s, 'pl', { przerwij: (w) => (w.op === 'kopiuj' ? bladMiejsca() : null) })).wynik).toEqual(NIEDOSTEPNA);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
    zamkniecia.splice(0).forEach((z) => z());
    // po zwolnieniu miejsca następny start działa (niepełny plik nie blokuje)
    expect((await start(s, 'pl')).wynik).toMatchObject({ ok: true, wartosc: { plik: 'tresc-7-pl.db' } });
  });

  it('AK-K-12-tresc-e błąd listowania katalogu → tresc_niedostepna, bez wyjątku', async () => {
    const s = srodowisko({ paczka: { 'tresc-7-pl.db': meta('7', 'pl') } });
    const { wynik } = await start(s, 'pl', { blad: (w) => (w.op === 'lista' ? Object.assign(new Error('EIO: i/o error'), { code: 'EIO' }) : null) });
    expect(wynik).toEqual(NIEDOSTEPNA);
    expect(sumaDanych(s.katalog)).toEqual(s.danePrzed);
  });
});
