/// <reference types="jest" />
// Krok 1 części 4 (ADR 0009 pkt 1–2): zamiast Sentry lokalny dziennik bez wysyłki i granica błędu ekranu.
// Zastępuje observability/__tests__/crashReports.test.tsx (sprawdzał opcje Sentry, którego ADR 0009 nie dopuszcza).
// A04-10: ekran zastępczy bierze teksty z t(); w aplikacji i18n inicjuje import w _layout przed granicą błędu
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { KONFIGURACJA } from '@szkola/domena';

jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '9.9.9' } } }));

function load() {
  let mod!: typeof import('@/platform/dziennik');
  jest.isolateModules(() => {
    mod = require('@/platform/dziennik');
  });
  return mod;
}

describe('dziennik lokalny (ADR 0009 pkt 2)', () => {
  it('wpis: czas, kod, ekran, wersja aplikacji; bez treści błędu', () => {
    const d = load();
    d.zapiszBlad('link_niedostepny', 'help', 1_000);
    expect(d.wpisyDziennika()).toEqual([{ ms: 1_000, kod: 'link_niedostepny', ekran: 'help', wersja: '9.9.9' }]);
  });

  it(`pierścień: najwyżej DZIENNIK_MAKS_WPISOW (${KONFIGURACJA.DZIENNIK_MAKS_WPISOW}) ostatnich wpisów, najstarsze wypadają`, () => {
    const d = load();
    const n = KONFIGURACJA.DZIENNIK_MAKS_WPISOW;
    for (let i = 0; i < n + 3; i++) d.zapiszBlad('wyjatek_ekranu', null, i);
    const w = d.wpisyDziennika();
    expect(w).toHaveLength(n);
    expect(w[0]!.ms).toBe(3);
    expect(w[n - 1]!.ms).toBe(n + 2);
  });

  it('granica błędu: ekran zastępczy, wpis wyjatek_ekranu, „Spróbuj ponownie” montuje drzewo od nowa', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    let d!: typeof import('@/platform/dziennik');
    let G!: typeof import('@/components/GranicaBledu');
    jest.isolateModules(() => {
      d = require('@/platform/dziennik');
      G = require('@/components/GranicaBledu');
    });
    const { RenderErrorScreen } = require('@/components/RenderErrorScreen');
    let fail = true;
    function Boom() {
      if (fail) throw new Error('render');
      return <Text>działa</Text>;
    }
    await render(
      <G.GranicaBledu fallback={({ resetError }) => <RenderErrorScreen onRetry={resetError} />}>
        <Boom />
      </G.GranicaBledu>,
    );
    expect(screen.getByText('Coś poszło nie tak')).toBeTruthy();
    expect(d.wpisyDziennika().map((w) => w.kod)).toEqual(['wyjatek_ekranu']);
    fail = false;
    await fireEvent.press(screen.getByText('Spróbuj ponownie'));
    expect(screen.getByText('działa')).toBeTruthy();
  });

  it('uszkodzony zapis w user.db: parseSeen zwraca null i dopisuje odczyt_nieudany', () => {
    let d!: typeof import('@/platform/dziennik');
    let c!: typeof import('@/features/advancement/contentChange');
    jest.isolateModules(() => {
      d = require('@/platform/dziennik');
      c = require('@/features/advancement/contentChange');
    });
    expect(c.parseSeen('{zepsute')).toBeNull();
    expect(c.parseSeen(null)).toBeNull();
    expect(d.wpisyDziennika().map((w) => w.kod)).toEqual(['odczyt_nieudany']);
  });

  // 08 cz. 5b krok 6 (ADR 0009 pkt 2, D-240): wpisy trafiają do tabeli `dziennik` w postep.db; przed otwarciem bazy czekają
  // w pamięci i zapisują się po podłączeniu, w kolejności; tabela przycięta do DZIENNIK_MAKS_WPISOW.
  describe('dziennik w postep.db', () => {
    const { portTestowy } = require('@/test-utils/postepTestowy') as typeof import('@/test-utils/postepTestowy');
    const wiersze = (db: { prepare(s: string): { all(): unknown[] } }) => db.prepare('SELECT ms, kod, ekran, wersja FROM dziennik ORDER BY id').all();
    const czekaj = () => new Promise((r) => setTimeout(r, 0));

    it('wpisy sprzed otwarcia bazy zapisane po podłączeniu, kolejne od razu', async () => {
      const d = load();
      const { port, db } = await portTestowy();
      d.zapiszBlad('tresc_niedostepna', null, 1);
      d.zapiszBlad('link_niedostepny', 'help', 2);
      const odlacz = d.podlaczDziennik(port);
      await d.dziennikZapisany();
      d.zapiszBlad('zapis_nieudany', 'sesja', 3);
      await d.dziennikZapisany();
      expect(wiersze(db)).toEqual([
        { ms: 1, kod: 'tresc_niedostepna', ekran: null, wersja: '9.9.9' },
        { ms: 2, kod: 'link_niedostepny', ekran: 'help', wersja: '9.9.9' },
        { ms: 3, kod: 'zapis_nieudany', ekran: 'sesja', wersja: '9.9.9' },
      ]);
      odlacz();
      d.zapiszBlad('odczyt_nieudany', null, 4);
      await d.dziennikZapisany();
      expect(wiersze(db)).toHaveLength(3); // po odłączeniu (zamknięcie portu) tylko pamięć
      expect(d.wpisyDziennika()).toHaveLength(4);
    });

    it('ponowne podłączenie (ponowny start bazy) nie dubluje już zapisanych wpisów', async () => {
      const d = load();
      const { port, db } = await portTestowy();
      d.zapiszBlad('tresc_niedostepna', null, 1);
      d.podlaczDziennik(port)();
      await d.dziennikZapisany();
      d.zapiszBlad('baza_nowsza', null, 2);
      d.podlaczDziennik(port);
      await d.dziennikZapisany();
      expect(wiersze(db)).toEqual([
        { ms: 1, kod: 'tresc_niedostepna', ekran: null, wersja: '9.9.9' },
        { ms: 2, kod: 'baza_nowsza', ekran: null, wersja: '9.9.9' },
      ]);
    });

    it(`tabela przycięta do DZIENNIK_MAKS_WPISOW (${KONFIGURACJA.DZIENNIK_MAKS_WPISOW})`, async () => {
      const d = load();
      const { port, db } = await portTestowy();
      d.podlaczDziennik(port);
      for (let i = 0; i < KONFIGURACJA.DZIENNIK_MAKS_WPISOW + 2; i++) d.zapiszBlad('wyjatek_ekranu', null, i);
      await d.dziennikZapisany();
      const w = wiersze(db) as { ms: number }[];
      expect(w).toHaveLength(KONFIGURACJA.DZIENNIK_MAKS_WPISOW);
      expect(w[0]?.ms).toBe(2);
    });

    it('błąd zapisu do bazy: bez wyjątku i bez nowego wpisu o tym błędzie (bez pętli)', async () => {
      const d = load();
      const { port } = await portTestowy();
      const zepsuty = { ...port, transakcja: async () => { throw Object.assign(new Error('io'), { errcode: 10 }); } };
      d.podlaczDziennik(zepsuty);
      expect(() => d.zapiszBlad('zapis_nieudany', null, 1)).not.toThrow();
      await d.dziennikZapisany();
      await czekaj();
      expect(d.wpisyDziennika().map((w) => w.kod)).toEqual(['zapis_nieudany']);
    });
  });
});

