// HW (08-programista-501, D-1790): tylko dla zrzutów web (metro.config.js podstawia ten moduł za `react-native-web/dist/exports/Dimensions`, gdy SZKOLA_ZRZUTY=1).
// react-native-web ma stałe `fontScale: 1`, więc `useWindowDimensions().fontScale` i `PixelRatio.getFontScale()` nie uruchamiały gałęzi układu dużego tekstu
// (SKALA_BEZ_PASKA, podstawaSegmentu, sufitTytulu). Tu `fontScale` pochodzi z `?fs=`, jak w iOS przy Dynamic Type; reszta wymiarów z oryginału.
import DimensionsWeb from 'react-native-web/dist/exports/Dimensions';
import { skalaTekstu } from './skala';

type Wymiary = { readonly fontScale: number; readonly height: number; readonly scale: number; readonly width: number };
type Zdarzenie = { readonly window: Wymiary; readonly screen: Wymiary };
type Uchwyt = (wymiary: Zdarzenie) => void;

const zeSkala = (w: Wymiary): Wymiary => ({ ...w, fontScale: skalaTekstu });
/** Oryginał zna tylko podany uchwyt; mapa pozwala wyrejestrować opakowany (useWindowDimensions robi to przy odmontowaniu). */
const opakowane = new Map<Uchwyt, Uchwyt>();

export default class Dimensions {
  static get(wymiar: 'window' | 'screen'): Wymiary { return zeSkala(DimensionsWeb.get(wymiar)); }
  static set(wymiary: { window?: Wymiary; screen?: Wymiary }): void { DimensionsWeb.set(wymiary); }
  static addEventListener(typ: 'change', uchwyt: Uchwyt): { remove(): void } {
    const opakowany: Uchwyt = (z) => uchwyt({ window: zeSkala(z.window), screen: zeSkala(z.screen) });
    opakowane.set(uchwyt, opakowany);
    return DimensionsWeb.addEventListener(typ, opakowany);
  }
  static removeEventListener(typ: 'change', uchwyt: Uchwyt): void {
    const opakowany = opakowane.get(uchwyt);
    if (!opakowany) return;
    opakowane.delete(uchwyt);
    DimensionsWeb.removeEventListener(typ, opakowany);
  }
}
