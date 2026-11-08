/**
 * Adresy otwierane z ekranu zakupu (monetyzacja.md:75: odnośniki do warunków i polityki prywatności; D-266).
 * Warunki: standardowa umowa licencyjna Apple, jak Trening `lib/products.ts:41` (odczyt 2026-11-08).
 * Polityka prywatności: [DO USTALENIA] — aplikacja poza portfelem Apps4brew, „osobna strona z materiałami później”
 * (CLAUDE.md, Stan projektu); adres podaje właściciel / rola 10 przed publikacją w App Store (zgłoszenie 08-F20).
 * Do tego czasu przycisk nic nie otwiera (TestFlight wewnętrzny, bez użytkowników).
 */
export const ADRES_WARUNKOW = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
export const ADRES_PRYWATNOSCI: string | null = null;

/**
 * Opinie (BR-OPIN-002, BR-OPIN-003): App Store ID aplikacji (strona „write-review”) i adres poczty do zgłoszeń. [DO USTALENIA]
 * właściciel / rola 10 (zgłoszenie 08-F23): aplikacja jest poza portfelem Apps4brew, więc adres wsparcia Treningu
 * (support@apps4brew.com, trening tests/public-repo.test.ts:241) nie pasuje. Do tego czasu sekcja „Opinie” w ustawieniach
 * i „Zgłoś błąd w tym zadaniu” są ukryte (D-270); systemowa prośba o ocenę (expo-store-review) działa bez ID.
 */
export const ID_APLIKACJI_SKLEPU: string | null = null;
export const ADRES_KONTAKTOWY: string | null = null;
