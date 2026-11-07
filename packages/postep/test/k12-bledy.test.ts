// K-12 (kontrole-07.md; tlo-i-bledy.md §4 „Polityka błędów projektu”): wstrzyknięty błąd SQLite przy zapisie → wartość
// `{ ok: false, powod }` (`brak_miejsca` dla SQLITE_FULL, `zapis_nieudany` dla SQLITE_IOERR i SQLITE_BUSY), dane sprzed kroku
// (transakcja wycofana), port działa dalej; `baza_uszkodzona` (SQLITE_CORRUPT, SQLITE_NOTADB) przy otwarciu → plik przemianowany
// na `postep-uszkodzona-<ms>.db` (te same bajty, nic nie usunięte), nowa pusta baza; błąd I/O przy otwarciu nie jest uszkodzeniem.
// Kody: sqlite.org/rescode.html (13 FULL, 10 IOERR, 778 IOERR_WRITE, 5 BUSY, 11 CORRUPT, 26 NOTADB).
// Punkt wstrzyknięcia nie zależy od SQL implementacji: przebieg próbny liczy wywołania adaptera, potem błąd na każdym z nich po kolei.
// `brak pliku treści → tresc_niedostepna` (trzecia część K-12) razem z K-06 (wybór pliku treści).
// Wersja 07 fix (D-224, przeniesiona przez 08 fix; L7-13b): jedyna zmiana — `zapiszKrok` z czwartym argumentem `nastepnyKrok` (D-224 pkt 3),
// typ z moduly.md.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { afterEach, describe, expect, it } from 'vitest';
import { type OdpowiedzKroku, type PortBazy, uruchomPostep, zapiszKrok, zapiszPowtorke } from '../src';
import { adapterNode, ile, integralnosc, otworzNode, TABELE_EKSPORTU, zawartosc, type Zdarzenie } from '../../../tests/narzedzia/postep-node';
import { plikiNode, sha256 } from '../../../tests/narzedzia/pliki-node';
import { T0, zbudujWzorzecV1 } from '../../../tests/narzedzia/wzorzec-bazy';
import { bladIO, katalogTymczasowy, przygotuj, sprzatnij } from './wspolne';


afterEach(sprzatnij);

const bladSQLite = (errcode: number) => Object.assign(new Error(`SQLite ${errcode}`), { code: 'ERR_SQLITE_ERROR', errcode, errstr: `kod ${errcode}` });
const TABELE = [...TABELE_EKSPORTU, 'uprawnienie_cache'];
const OPERACJE = {
  // nowy krok aktywności w toku (wzorzec: a-scen, krok 1)
  zapiszKrok: (port) => zapiszKrok(port, 'a-scen', { krok: 1, zadanie_id: 'z2', rodzina_id: 'r1', wybor: '{"akcja":"fold"}',
    ocena: 'zgodne', zaliczona: 1, czas_ms: 1200, odpowiedziano_ms: T0 + 10 }, 2),
  // karta r1 (UPSERT) + wpis logu
  zapiszPowtorke: (port) => zapiszPowtorke(port, { rodzina_id: 'r1', termin_ms: T0 + 86_400_000, stabilnosc: 4.2, trudnosc: 5.1,
    dni_zaplanowane: 1, kroki_nauki: 0, powtorzenia: 5, zapomnienia: 1, stan: 2, ostatnia_powtorka_ms: T0, zmieniono_ms: T0 + 1 },
  { odpowiedz_id: null, ocena_fsrs: 3, stan_przed: 2, termin_przed_ms: T0 - 1, powtorzono_ms: T0 }),
} satisfies Record<string, (port: PortBazy) => Promise<unknown>>;

// Port na wzorcu; po `uzbroj(cel, blad)` wywołanie adaptera nr `cel` i każde następne (liczone od uzbrojenia, bez `zamknij`) rzuca `blad`:
// błąd trwały, więc implementacja z własnym ponowieniem (np. po SQLITE_BUSY) też musi zwrócić `powod` (przegląd D-043, część 3).
async function zLicznikiem() {
  let uzbrojony = false, n = 0, cel = Infinity, blad: Error | null = null;
  const zdarzenie = (z: Zdarzenie) => {
    if (!uzbrojony || z.rodzaj === 'zamknij') return;
    n++;
    if (n >= cel && blad) throw blad;
  };
  const p = await przygotuj('wzorzec', { zdarzenie });
  return { ...p, uzbroj: (c: number, b: Error | null) => { uzbrojony = true; n = 0; cel = c; blad = b; }, rozbroj: () => { uzbrojony = false; }, licznik: () => n };
}

describe('K-12 błąd zapisu → powod, dane sprzed kroku', () => {
  for (const [nazwa, op] of Object.entries(OPERACJE)) {
    for (const [errcode, powod] of [[13, 'brak_miejsca'], [10, 'zapis_nieudany'], [778, 'zapis_nieudany'], [5, 'zapis_nieudany']] as const) {
      it(`K-12: ${nazwa}, błąd ${errcode} na każdym wywołaniu adaptera po kolei → { ok: false, powod: '${powod}' }, baza bez zmian`, async () => {
        const proba = await zLicznikiem();
        proba.uzbroj(Infinity, null);
        expect(await op(proba.port)).toMatchObject({ ok: true });
        const wywolan = proba.licznik();
        expect(wywolan).toBeGreaterThan(0);
        for (let i = 1; i <= wywolan; i++) {
          const t = await zLicznikiem();
          const przed = zawartosc(t.db, TABELE);
          t.uzbroj(i, bladSQLite(errcode));
          expect(await op(t.port), `błąd na wywołaniu ${i}/${wywolan}`).toEqual({ ok: false, powod });
          t.rozbroj();
          expect(t.db.isTransaction, `otwarta transakcja po błędzie na wywołaniu ${i}`).toBe(false);
          expect(zawartosc(t.db, TABELE), `zmiana danych po błędzie na wywołaniu ${i}`).toEqual(przed);
          expect(integralnosc(t.db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
          expect(await op(t.port), `port nie działa po błędzie na wywołaniu ${i}`).toMatchObject({ ok: true });
        }
      });
    }
  }
  it('K-12: po błędzie SQLITE_FULL port działa dalej: ponowienie tego samego kroku zapisuje go raz (odpowiedź z ekranu do ponowienia)', async () => {
    const t = await zLicznikiem();
    t.uzbroj(1, bladSQLite(13));
    expect(await OPERACJE.zapiszKrok(t.port)).toEqual({ ok: false, powod: 'brak_miejsca' });
    t.rozbroj();
    expect(await OPERACJE.zapiszKrok(t.port)).toMatchObject({ ok: true });
    expect((t.db.prepare("SELECT count(*) AS n FROM odpowiedz WHERE aktywnosc_id = 'a-scen' AND krok = 1").get() as { n: number }).n).toBe(1);
    expect((t.db.prepare("SELECT krok FROM aktywnosc WHERE id = 'a-scen'").get() as { krok: number }).krok).toBe(2);
  });
});

// Start z plików: `otworz` przez adapter node:sqlite; połączenia zamykane w teście.
async function start(katalog: string, o: { zdarzenie?: (z: Zdarzenie) => void } = {}) {
  const { pliki, wywolania } = plikiNode();
  const otworz = async (s: string) => adapterNode(otworzNode(s), o.zdarzenie);
  const w = await uruchomPostep({ katalog, pliki, otworz, terazMs: T0 });
  return { ...w, wywolania };
}
const odczyt = (s: string) => {
  const db = new DatabaseSync(s, { readOnly: true });
  try {
    return { wersja: (db.prepare('PRAGMA user_version').get() as { user_version: number }).user_version, aktywnosci: ile(db, 'aktywnosc'),
      ustawienia: ile(db, 'ustawienie'), ...integralnosc(db) };
  } finally { db.close(); }
};

describe('K-12 baza uszkodzona przy otwarciu', () => {
  const USZKODZENIA: Record<string, (s: string) => void> = {
    'SQLITE_NOTADB (plik bez nagłówka SQLite)': (s) => writeFileSync(s, Buffer.alloc(8192, 0x41)),
    'SQLITE_CORRUPT (zniszczony nagłówek strony 1, user_version czytelne)': (s) => {
      zbudujWzorzecV1(s);
      const b = readFileSync(s);
      b.fill(0x7f, 108, 140); // nagłówek b-drzewa sqlite_schema za 100-bajtowym nagłówkiem pliku (sqlite.org/fileformat2.html §1.6)
      writeFileSync(s, b);
    },
  };
  for (const [nazwa, uszkodz] of Object.entries(USZKODZENIA)) {
    it(`K-12: ${nazwa} → plik przemianowany na postep-uszkodzona-<ms>.db z tymi samymi bajtami, nowa pusta baza v1, nic nie usunięte`, async () => {
      const k = katalogTymczasowy();
      const sciezka = join(k, 'postep.db');
      uszkodz(sciezka);
      const suma = sha256(sciezka);
      const { port, uszkodzona, wywolania } = await start(k);
      expect(uszkodzona).toBe(join(k, `postep-uszkodzona-${T0}.db`));
      expect(sha256(uszkodzona!)).toBe(suma);
      expect(wywolania.filter((w) => w.op === 'usun')).toEqual([]);
      await port.zamknij();
      expect(odczyt(sciezka)).toEqual({ wersja: 1, aktywnosci: 0, ustawienia: 0, integrity: 'ok', kluczeObce: 0 });
    });
  }
  // Zero utraty (zasada wspólna 10): każdy plik sprzed startu zostaje gdzieś w katalogu z tymi samymi bajtami (multizbiór sum).
  const sumy = (k: string) => readdirSync(k).map((n) => sha256(join(k, n))).sort();
  const zawiera = (po: string[], przed: string[]) => { const r = [...po]; return przed.every((x) => { const i = r.indexOf(x); if (i < 0) return false; r.splice(i, 1); return true; }); };
  it('K-12: kolizja nazwy (postep-uszkodzona-<ms>.db już istnieje, ten sam terazMs) → oba pliki zachowane', async () => {
    const k = katalogTymczasowy();
    writeFileSync(join(k, `postep-uszkodzona-${T0}.db`), 'wcześniejsza kopia');
    writeFileSync(join(k, 'postep.db'), Buffer.alloc(8192, 0x41));
    const przed = sumy(k), sumaUszkodzonej = sha256(join(k, 'postep.db'));
    const { port, uszkodzona } = await start(k);
    await port.zamknij();
    expect(uszkodzona).not.toBeNull();
    expect(sha256(uszkodzona!), 'zwrócona ścieżka ma bajty uszkodzonej bazy').toBe(sumaUszkodzonej);
    expect(zawiera(sumy(k), przed), 'plik sprzed startu zniknął albo zmienił bajty').toBe(true);
  });
  it('K-12: przemianowanie uszkodzonej bazy się nie udaje → plik postep.db bez zmian, nic nie usunięte, bez nowej bazy na jego miejscu', async () => {
    const k = katalogTymczasowy();
    const sciezka = join(k, 'postep.db');
    writeFileSync(sciezka, Buffer.alloc(8192, 0x41));
    const suma = sha256(sciezka);
    const { pliki, wywolania } = plikiNode({ blad: (w) => (w.op === 'przemianuj' ? Object.assign(new Error('EIO'), { code: 'EIO' }) : null) });
    const otworz = async (s: string) => adapterNode(otworzNode(s));
    const wynik = await uruchomPostep({ katalog: k, pliki, otworz, terazMs: T0 }).then((w) => w, (e: unknown) => e);
    expect(String(wynik)).not.toMatch(/NIEZAIMPLEMENTOWANE/);
    expect(wywolania.filter((w) => w.op === 'usun')).toEqual([]);
    expect(sha256(sciezka)).toBe(suma);
  });
  it('K-12: zdrowa baza → uszkodzona = null, bez przemianowania, dane bez zmian', async () => {
    const k = katalogTymczasowy();
    const sciezka = join(k, 'postep.db');
    zbudujWzorzecV1(sciezka);
    const kontrola = new DatabaseSync(sciezka, { readOnly: true });
    const przed = zawartosc(kontrola, TABELE);
    kontrola.close();
    const { port, uszkodzona, wywolania } = await start(k);
    expect(uszkodzona).toBeNull();
    expect(wywolania.filter((w) => w.op !== 'istnieje')).toEqual([]);
    await port.zamknij();
    const po = new DatabaseSync(sciezka, { readOnly: true });
    expect(zawartosc(po, TABELE)).toEqual(przed);
    po.close();
  });
  it('K-12: brak pliku → nowa pusta baza v1, uszkodzona = null', async () => {
    const k = katalogTymczasowy();
    const { port, uszkodzona } = await start(k);
    expect(uszkodzona).toBeNull();
    await port.zamknij();
    expect(odczyt(join(k, 'postep.db'))).toMatchObject({ wersja: 1, aktywnosci: 0, integrity: 'ok' });
  });
  it('K-12: SQLITE_IOERR przy otwarciu zdrowej bazy nie jest uszkodzeniem: plik nie przemianowany ani usunięty, bajty bez zmian', async () => {
    const k = katalogTymczasowy();
    const sciezka = join(k, 'postep.db');
    zbudujWzorzecV1(sciezka);
    const suma = sha256(sciezka);
    const { pliki, wywolania } = plikiNode();
    const otworz = async (s: string) => adapterNode(otworzNode(s), (z) => { if (z.rodzaj !== 'zamknij') throw bladIO(); });
    const wynik = await uruchomPostep({ katalog: k, pliki, otworz, terazMs: T0 }).then(() => 'otwarto', (e: unknown) => e);
    expect(String(wynik)).not.toMatch(/NIEZAIMPLEMENTOWANE/);
    expect(wywolania.filter((w) => w.op !== 'istnieje')).toEqual([]);
    expect(existsSync(join(k, `postep-uszkodzona-${T0}.db`))).toBe(false);
    expect(sha256(sciezka)).toBe(suma);
  });
});
