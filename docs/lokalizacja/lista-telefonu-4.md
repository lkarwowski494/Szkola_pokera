# ja, zh-Hant, pt-BR, fr: lista kontrolna telefonu

Stan: 2026-11-09, sesja AE (rola 09). Wydanie w kodzie: D-379–D-381 (konfiguracja jak K3 en, D-349); nazwy terminów K-05: D-367, D-372; krój CJK: D-368; słowniczek i nazwa pod ikoną: D-369; pt-PT → pt-BR: D-373. Punkty z `przygotowane/plan-ja-zh-Hant.md` §7 i `plan-pt-BR-fr.md` §7. E2E dla tych języków: brak osobnego flowu (koszt minut macOS) — ta lista go zastępuje.

Jak: Ustawienia iOS → Ogólne → Język i region (język telefonu) albo Ustawienia → PokerGym → Język (język tylko aplikacji). Po każdej zmianie wróć do aplikacji bez zamykania. Wynik: ✅ / ❌ + zrzut przy ❌.

| # | Ustawienie | Co sprawdzić | Wynik |
|---|---|---|---|
| T-cjk-1 | telefon w 日本語 | nazwa pod ikoną „PokerGym” (D-378); powitanie, „Dziś”, lekcja m0.l1 po japońsku; terminy w tekście po japońsku (コール, ポット — żadnego „call”, „pot” łacinką poza skrótami UTG, BTN, VPIP) | |
| T-cjk-2 | aplikacja ręcznie na ja przy telefonie w 繁體中文 (i odwrotnie) | kształt znaków 直 骨 角 jak w danym języku (D-368: naprawa dopiero po potwierdzeniu problemu) | |
| T-cjk-3 | ja i zh-Hant, największy tekst (XXXL i AX5), iPhone SE / 320 pt | tytuły i słowo stopnia na suknie: bez obcięć, krój jednolity (systemowy, bez mieszania z Literatą) | |
| T-cjk-4 | ja i zh-Hant | liczby w treści (`{{n:…}}`), procent bez spacji, daty w statystykach | |
| T-cjk-5 | ja i zh-Hant | ekran pomocy i ramka „Odpowiedzialna gra”: numery i nazwy organizacji jak w nakładce `helplines.yaml` | |
| T-pf-1 | telefon w Português (Brasil) | nazwa pod ikoną „PokerGym” (D-378); powitanie, „Hoje”, lekcja m0.l1 po portugalsku; terminy jak w `terms-nazwy` („pote”, „sequência”, „dois pares”), call/fold/check po angielsku | |
| T-pf-2 | telefon w Français | j.w. po francusku („grosse blinde”, „quinte”, „mise”); przy „:” i „?” wiersz nie łamie się przed znakiem (spacja nierozdzielająca); « » z odstępem | |
| T-pf-3 | telefon w Português (Portugal); potem Français (Canada) | aplikacja po portugalsku (pt-BR, D-373 — nie po angielsku); fr-CA → francuski | |
| T-pf-4 | pt-BR i fr | liczby: pt-BR „1.000”, „0,5”, „50%”; fr „1 000”, „0,5”, „50 %”; liczba mnoga w licznikach (fr: 0 i 1 → forma pojedyncza) | |
| T-pf-5 | pt-BR i fr | ekran pomocy i ramka „Odpowiedzialna gra” jak w `helplines.yaml`; m12-l4 „no mais tardar” / „au plus tard” | |
| T-pf-6 | pt-BR i fr; potem ja | słowniczek: nazwa lokalna pogrubiona, angielska pod spodem; szukanie „pote”/„pot”, „quinte”/„straight”, „コール”/„call” znajduje ten sam termin; gdy nazwa = angielska (pot, call w fr) — jedna linia | |
| T-pf-7 | fr i pt-BR, największy tekst, 320 pt | tytuły i przyciski („Continuer”, „Continuar”) bez obcięć — obcięcia do roli 04 | |
