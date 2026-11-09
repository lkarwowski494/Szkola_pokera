/// <reference types="jest" />
// A04-03 + 08-F25 (D-283 pkt 1–2): ogłoszenia VoiceOver i powrót na górę z fokusem po „Dalej”.
// Wzór: Trening `lib/announce.ts:1–10` i strażnik `tests/interaction-guards.test.ts:88` (main, odczyt 2026-11-09).
// `accessibilityLiveRegion` w React Native działa tylko na Androidzie, więc na iOS komunikat ogłasza
// `AccessibilityInfo.announceForAccessibility` (RN 0.88.1, AccessibilityInfo.js:456).
import '@/i18n';
import i18n from 'i18next';
import { render } from '@testing-library/react-native';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { useRef, type RefObject } from 'react';
import { AccessibilityInfo, Text, View, type HostInstance, type ScrollViewInstance } from 'react-native';
import { announce, useAnnounce, useNoweZadanie } from '@/features/dostepnosc/announce';
import { PanelDecyzji } from '@/features/stol/PanelDecyzji';
import { opisPaska } from '@/features/stol/pasek';
import type { ChoiceInstance } from '@/features/drills/types';

const t = i18n.t.bind(i18n);
const SRC = join(__dirname, '..', '..', '..');

let ogloszenia: jest.SpyInstance;
let zdarzenia: jest.SpyInstance;
beforeEach(() => {
  ogloszenia = jest.spyOn(AccessibilityInfo, 'announceForAccessibility').mockImplementation(() => {});
  zdarzenia = jest.spyOn(AccessibilityInfo, 'sendAccessibilityEvent').mockImplementation(() => {});
  ogloszenia.mockClear(); // atrapa RN (jest/setup) to już jest.fn: spyOn zwraca ją z wywołaniami z poprzednich testów
  zdarzenia.mockClear();
});
afterEach(() => jest.restoreAllMocks());

function Ogloszenie({ tekst }: { tekst: string | null }) {
  useAnnounce(tekst);
  return null;
}

describe('announce / useAnnounce', () => {
  it('announce przekazuje tekst do VoiceOver', () => {
    announce('Ocena: Zgodna');
    expect(ogloszenia).toHaveBeenCalledWith('Ocena: Zgodna');
  });

  it('useAnnounce: ogłasza przy zmianie na niepusty tekst; null i ten sam tekst — bez ogłoszenia', async () => {
    const r = await render(<Ogloszenie tekst={null} />);
    expect(ogloszenia).not.toHaveBeenCalled();
    await r.rerender(<Ogloszenie tekst="Błąd zapisu" />);
    await r.rerender(<Ogloszenie tekst="Błąd zapisu" />);
    expect(ogloszenia).toHaveBeenCalledTimes(1);
    expect(ogloszenia).toHaveBeenLastCalledWith('Błąd zapisu');
  });
});

describe('useNoweZadanie (08-F25)', () => {
  const przewin = jest.fn();
  // atrapa przewijania (Jest nie ma natywnego ScrollView); fokus na prawdziwym widoku
  const przewijanie = { current: { scrollTo: przewin } } as unknown as RefObject<ScrollViewInstance>;
  function Ekran({ idx }: { idx: number }) {
    const f = useRef<HostInstance>(null);
    useNoweZadanie(idx, przewijanie, f);
    return (
      <View ref={f} accessible>
        <Text>Zadanie {idx}</Text>
      </View>
    );
  }

  it('po zmianie zadania: przewinięcie na górę i fokus VoiceOver na początek zadania; przy pierwszym renderze nic', async () => {
    const r = await render(<Ekran idx={0} />);
    expect(przewin).not.toHaveBeenCalled();
    expect(zdarzenia).not.toHaveBeenCalled();
    await r.rerender(<Ekran idx={1} />);
    expect(przewin).toHaveBeenCalledWith({ y: 0, animated: false });
    expect(zdarzenia).toHaveBeenCalledWith(expect.anything(), 'focus');
  });
});

describe('PanelDecyzji ogłasza ocenę (A04-03)', () => {
  const ITEM: ChoiceInstance = {
    kind: 'choice', key: 'k', drillId: 'rfi.co', family: 'rfi', lessonId: null, rules: [], prompt: 'CO',
    table: { hand: ['Jc', '9d'], position: 'CO', path: 'UTG:fold,HJ:fold' },
    options: [
      { text: 'Pas', correct: true, why: 'a', czestosc: 0.8, pas: true },
      { text: 'Przebicie', correct: false, acceptable: true, why: 'b', czestosc: 0.2 },
    ],
  };

  it('przed decyzją cisza; po ocenie ogłoszenie „Ocena: …” i opis paska', async () => {
    const r = await render(<PanelDecyzji item={ITEM} rekord={null} />);
    expect(ogloszenia).not.toHaveBeenCalled();
    await r.rerender(<PanelDecyzji item={ITEM} rekord={{ answer: { kind: 'choice', index: 1 }, grade: 'acceptable' }} />);
    const opis = opisPaska(ITEM.options, 1, 'J9o', t)!;
    expect(ogloszenia).toHaveBeenCalledTimes(1);
    expect(ogloszenia).toHaveBeenCalledWith(t('grade.announce', { ocena: t('grade.label', { slowo: t('grade.dopuszczalne') }), opis }));
  });

  it('czas minął: ogłoszenie „Czas minął” i opis paska', async () => {
    await render(<PanelDecyzji item={ITEM} rekord={{ answer: { kind: 'timeout' }, grade: 'wrong' }} />);
    const opis = opisPaska(ITEM.options, -1, 'J9o', t)!;
    expect(ogloszenia).toHaveBeenCalledWith(t('grade.announce', { ocena: t('session.timeout'), opis }));
  });
});

describe('strażnik (D-283; Trening tests/interaction-guards.test.ts:88)', () => {
  const pliki = (k: string): string[] =>
    readdirSync(k).flatMap((n) => {
      const p = join(k, n);
      return statSync(p).isDirectory() ? (n === '__tests__' ? [] : pliki(p)) : /\.tsx?$/.test(n) ? [p] : [];
    });

  it('accessibilityLiveRegion tylko w pomocniku (działa tylko na Androidzie); pomocnik używa announceForAccessibility', () => {
    const trafienia = pliki(SRC).filter((p) => /accessibilityLiveRegion/.test(readFileSync(p, 'utf8'))).map((p) => relative(SRC, p));
    expect(trafienia.filter((p) => p !== join('features', 'dostepnosc', 'announce.ts'))).toEqual([]);
    expect(readFileSync(join(SRC, 'features', 'dostepnosc', 'announce.ts'), 'utf8')).toMatch(/announceForAccessibility/);
  });

  it('ekran sesji: ogłasza nagłówek oceny i błąd zapisu, po „Dalej” wraca na górę z fokusem', () => {
    const sesja = readFileSync(join(SRC, 'app', 'session.tsx'), 'utf8');
    expect(sesja.match(/useAnnounce\(/g) ?? []).toHaveLength(2);
    expect(sesja).toMatch(/useNoweZadanie\(idx,/);
  });
});
