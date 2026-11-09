import { router } from 'expo-router';
import { Linking } from 'react-native';
import { usePortPostepu } from '@/data/postep';
import EkranZakupu from '@/features/zakup/EkranZakupu';
import { ADRES_PRYWATNOSCI, ADRES_WARUNKOW } from '@/platform/adresy';
import { sklepAplikacji } from '@/platform/zakupy';
import { odswiezDostep, useDostep } from '@/state/dostep';

/**
 * Ekran zakupu otwarty z ustawień (10-D01-02): ten sam `EkranZakupu` co stan przepływu sesji po wyczerpaniu limitu, bez
 * „Wróć do lekcji”. Dostęp po zakupie albo przywróceniu z odczytu sklepu (D-247), potem powrót do ustawień.
 * Wzór Treningu: app/paywall.tsx z wejściem `/paywall?reason=settings` (components/SubscriptionCard.tsx:25, odczyt 2026-11-09).
 */
export default function PurchaseRoute() {
  const port = usePortPostepu();
  return (
    <EkranZakupu
      sklep={sklepAplikacji()}
      onDostep={() => {
        void odswiezDostep(port, sklepAplikacji(), Date.now()).then((d) => {
          useDostep.setState({ pro: d });
          router.back();
        });
      }}
      onZamknij={() => router.back()}
      otworzWarunki={() => void Linking.openURL(ADRES_WARUNKOW)}
      otworzPrywatnosc={() => {
        if (ADRES_PRYWATNOSCI) void Linking.openURL(ADRES_PRYWATNOSCI);
      }}
    />
  );
}
