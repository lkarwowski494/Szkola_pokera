/// <reference types="jest" />
// 10-US-01, 10-US-02, 10-JP-01 (D-297, D-299, przyjęte D-301; docs/wydanie/legalnosc/US.md Z-1/Z-3, JP.md 4b/4d):
// ekran zakupu mówi, JAK anulować subskrypcję i z jakim SKUTKIEM, przed przyciskami (widoczne bez dotykania planu),
// bez samodzielnego „w każdej chwili” (wytyczne CAA, JP.md 4d).
import '@/i18n';
import { render, screen } from '@testing-library/react-native';
import EkranZakupu, { type PropsEkranuZakupu } from '@/features/zakup/EkranZakupu';
import { atrapaSklepu, PRODUKTY_US, tekstEkranu } from '@/test-utils/ekrany/wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

async function wyrenderuj(atrapa = atrapaSklepu()) {
  const props: PropsEkranuZakupu = {
    sklep: atrapa.sklep,
    onDostep: jest.fn(),
    onZamknij: jest.fn(),
    onWrocDoLekcji: jest.fn(),
    otworzWarunki: jest.fn(),
    otworzPrywatnosc: jest.fn(),
  };
  await render(<EkranZakupu {...props} />);
  await screen.findAllByRole('button', { name: /\$9\.99|\$19\.99/ });
}

const JAK = /ustawieniach konta Apple/;
const SKUTEK_ODNOWIENIE = /nie odnowi się/;
const SKUTEK_DOSTEP = /do końca opłaconego okresu/;

describe('10-US-01 / 10-JP-01: zdanie o anulowaniu subskrypcji', () => {
  it('plany odnawialne: widoczny tekst mówi, gdzie anulować i jaki jest skutek (koniec odnawiania, dostęp do końca okresu)', async () => {
    await wyrenderuj();
    const zdanie = screen.getByText(JAK);
    expect(zdanie.props.children).toMatch(SKUTEK_ODNOWIENIE);
    expect(zdanie.props.children).toMatch(SKUTEK_DOSTEP);
  });

  it('10-JP-01: bez samodzielnego „w każdej chwili” / „kiedy zechcesz” na ekranie', async () => {
    await wyrenderuj();
    expect(tekstEkranu()).not.toMatch(/w (każdej|dowolnej) chwili|kiedy zechcesz/i);
  });

  it('10-US-02: zdanie stoi po planach i przed „Przywróć zakupy” (widoczne przed decyzją, nie tylko w etykiecie czytnika)', async () => {
    await wyrenderuj();
    const tekst = tekstEkranu();
    const zdanie = tekst.search(JAK);
    expect(zdanie).toBeGreaterThan(tekst.indexOf('$19.99'));
    expect(zdanie).toBeLessThan(tekst.indexOf('Przywróć zakupy'));
  });

  it('tylko zakup jednorazowy: bez zdania o anulowaniu (nie ma czego anulować)', async () => {
    await wyrenderuj(atrapaSklepu({ ok: true, produkty: PRODUKTY_US.filter((p) => p.okres === null) }));
    expect(screen.queryByText(JAK)).toBeNull();
  });
});
