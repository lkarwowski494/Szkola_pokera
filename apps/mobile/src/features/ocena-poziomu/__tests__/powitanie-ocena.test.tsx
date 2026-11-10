/// <reference types="jest" />
// Testy oczekujące PR-01 (rola 07 E3, D-187; R-35, R-36; BR-ONB-001, BR-ONB-002, BR-ONB-004, NFR-DOST-002).
// Logika oceny (przejścia, „Pomiń” → porzucona i punkt startu M0, przerwanie) jest w tests/akceptacja/domena/maszyny.test.ts;
// tu ekran: elementy po roli i nazwie oraz wywołania akcji. Przerwana ocena po ponownym uruchomieniu (ekran wyboru, D-475) — PierwszeUruchomienie-08.test.tsx i E2E 05.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { KONFIGURACJA } from '@szkola/domena';
const { OCENA_POZIOMU_MAKS_PYTAN, OCENA_POZIOMU_CZAS_S } = KONFIGURACJA;
import EkranPowitania from '@/features/powitanie/EkranPowitania';
import { EkranPytaniaOceny, EkranWynikuOceny } from '@/features/ocena-poziomu/EkranyOceny';
import { NAZWY, ZNACZENIA } from '@/test-utils/ekrany/teksty';
import { elementyBezRoliLubNazwy, tekstEkranu } from '@/test-utils/ekrany/wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

describe('BR-ONB-004 pierwszy ekran', () => {
  it('AK-BR-ONB-004: tekst mówi o nauce decyzji w pokerze bez gry na pieniądze; bez obietnicy wygranej i gry online', async () => {
    await render(<EkranPowitania onTest={jest.fn()} onOdPoczatku={jest.fn()} />);
    const tekst = tekstEkranu();
    expect(tekst).toMatch(ZNACZENIA.decyzje);
    expect(tekst).toMatch(ZNACZENIA.bezPieniedzy);
    for (const zakazany of ZNACZENIA.zakazanePowitanie) expect(tekst).not.toMatch(zakazany);
  });

  it('AK-BR-ONB-001-wybor: dwie akcje „Przejdź test poziomujący” (główna) i „Zacznij od początku”, każda woła swoją funkcję; NFR-DOST-002', async () => {
    const onTest = jest.fn();
    const onOdPoczatku = jest.fn();
    await render(<EkranPowitania onTest={onTest} onOdPoczatku={onOdPoczatku} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.przejdzTest }));
    expect(onTest).toHaveBeenCalledTimes(1);
    expect(onOdPoczatku).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.odPoczatku }));
    expect(onOdPoczatku).toHaveBeenCalledTimes(1);
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });

  it('AK-BR-ONB-001-wybor-info: informacja o długości testu: najwyżej 8 pytań, ok. 2 minuty (OCENA_POZIOMU_MAKS_PYTAN, OCENA_POZIOMU_CZAS_S)', async () => {
    await render(<EkranPowitania onTest={jest.fn()} onOdPoczatku={jest.fn()} />);
    expect(tekstEkranu()).toContain(`${OCENA_POZIOMU_MAKS_PYTAN}`);
    expect(tekstEkranu()).toContain(`${OCENA_POZIOMU_CZAS_S / 60}`);
    expect(tekstEkranu()).not.toMatch(/pomiń|pominąć/i);
  });
});

describe('BR-ONB-001 ocena poziomu: ekran pytania', () => {
  const odpowiedzi = ['Nie znam zasad', 'Znam zasady', 'Gram regularnie'];

  it.each(Array.from({ length: OCENA_POZIOMU_MAKS_PYTAN }, (_, i) => i + 1))(
    'AK-BR-ONB-001-nie-wiem: „Nie wiem” na ekranie pytania %i z OCENA_POZIOMU_MAKS_PYTAN woła onNieWiem, bez odpowiedzi; „Pomiń” nie ma (D-475)',
    async (numer) => {
      const onNieWiem = jest.fn();
      const onOdpowiedz = jest.fn();
      await render(
        <EkranPytaniaOceny numer={numer} liczba={OCENA_POZIOMU_MAKS_PYTAN} tresc="Jak dobrze znasz pokera?" odpowiedzi={odpowiedzi} onOdpowiedz={onOdpowiedz} onNieWiem={onNieWiem} />,
      );
      expect(screen.queryByRole('button', { name: /pomiń/i })).toBeNull();
      await fireEvent.press(screen.getByRole('button', { name: NAZWY.nieWiem }));
      expect(onNieWiem).toHaveBeenCalledTimes(1);
      expect(onOdpowiedz).not.toHaveBeenCalled();
    },
  );

  it('AK-BR-ONB-001-a: każda odpowiedź jest przyciskiem z nazwą i woła onOdpowiedz ze swoim indeksem; NFR-DOST-002', async () => {
    const onOdpowiedz = jest.fn();
    await render(<EkranPytaniaOceny numer={1} liczba={OCENA_POZIOMU_MAKS_PYTAN} tresc="Jak dobrze znasz pokera?" odpowiedzi={odpowiedzi} onOdpowiedz={onOdpowiedz} onNieWiem={jest.fn()} />);
    for (const [i, o] of odpowiedzi.entries()) {
      await fireEvent.press(screen.getByRole('button', { name: new RegExp(o) }));
      expect(onOdpowiedz).toHaveBeenLastCalledWith(i);
    }
    expect(screen.getByText('Jak dobrze znasz pokera?')).toBeTruthy();
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });
});

describe('BR-ONB-001/002 ocena poziomu: wynik', () => {
  it('AK-BR-ONB-001-a-wynik: punkt startu i przycisk rozpoczęcia nauki; bez ekranu zakupu (D-105)', async () => {
    const onZacznij = jest.fn();
    await render(<EkranWynikuOceny punktStartu={{ modul: 'M0', tytulLekcji: 'Zasady gry' }} zaliczoneOcena={[]} onZacznij={onZacznij} />);
    expect(tekstEkranu()).toMatch(/M0/);
    expect(tekstEkranu()).toMatch(/Zasady gry/);
    await fireEvent.press(screen.getByRole('button', { name: ZNACZENIA.start }));
    expect(onZacznij).toHaveBeenCalledTimes(1);
    expect(tekstEkranu()).not.toMatch(/\$|zł|€|kup|Pro\b|cen[ay]/i);
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });

  it('AK-BR-ONB-002-b: moduły M0–M2 zaliczone oceną są wymienione, punkt startu M3', async () => {
    await render(<EkranWynikuOceny punktStartu={{ modul: 'M3', tytulLekcji: 'Pozycja przy stole' }} zaliczoneOcena={['M0', 'M1', 'M2']} onZacznij={jest.fn()} />);
    const tekst = tekstEkranu();
    for (const m of ['M0', 'M1', 'M2', 'M3']) expect(tekst).toMatch(new RegExp(`\\b${m}\\b`));
  });
});
