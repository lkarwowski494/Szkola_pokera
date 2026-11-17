# Recenzja dostępności RangeGrid (0eadd8dd..80ca26c2), niezależna

## Minimum kontrastu (własny skrypt k.py, WCAG 2.x, zieleń = felt1·0,85 na surface)
| motyw | onFelt/zieleń (f=1) | ink/podkładka surface (f<1) | kropka ink/zieleń | kropka ink/surface |
|---|---|---|---|---|
| light | 4,58 | 18,17 | 3,90 | 18,17 |
| dark | 8,92 | 13,48 | 7,82 | 13,48 |
| lightHigh | 5,49 | 18,17 | 3,25 | 18,17 |
| darkHigh | 10,42 | 13,48 | 9,14 | 13,48 |
Minimum: tekst 4,58 (light, f=1) ≥ 4,5; kropka 3,25 (lightHigh) ≥ 3. Odniesienie: bez reguły ink/zieleń 3,90/3,25 i onFelt/surface 1,02 (stąd wymóg).

## 1. Reguła i geometria (z kodu)
- RangeGrid.tsx:40 `pelne = groups[0].freqs[i] >= 1`; :51 podkładka `surface` gdy !pelne, `maxWidth: pole-2`, paddingH 1; :52 kolor `pelne ? onFelt : ink`, `allowFontScaling={false}`, `adjustsFontSizeToFit numberOfLines={1}`. Jedna gałąź: ink ⇔ podkładka. Zgodne z wymaganiem.
- skalowanie.ts `wymiaryEtykietySiatki`: fs = min(8·clamp(skala,1,1,3), 0,5·pole/1,25, (pole−10)/1,25, (pole−4)/2,2); lh = 1,25·fs = wys. podkładki.
## 2. Mieszczenie (pole = (W − 2·16)/13; Screen paddingHorizontal odstep.l, ui.tsx:24)
- 320: pole 22,15; fs 8,00 (x1) / 8,25 (AX5); 390: 27,54; 8,00 / 10,40; 430: 30,62; 8,00 / 10,40.
- Założenie: „AQo” SF Pro Text Semibold ≈ 2,04 em + trak ≈ 0,026 em/znak → ~2,12 em (zakres 2,07–2,2). Podkładka (tekst+2) ≤ pole−2 we wszystkich przypadkach; najciaśniej 320 AX5 przy 2,2 em: 20,15 = 20,15. Szerszy krój (Pogrubiony tekst) → adjustsFontSizeToFit zmniejsza tekst w podkładce; tekst nie wychodzi poza podkładkę (maxWidth, numberOfLines=1), komórka overflow:hidden.
- f=1: pasek grupy 0 ma width 100% (absoluteFill), etykieta onFelt bez podkładki leży w całości na zieleni; przy f<1 zawsze podkładka. Odstęp kropka–podkładka ≥ 1,92 pt (320 AX5).
## 3. Pasek widoczny: podkładka ≤ pole/2 wysokości (udzialWysokosci 0,5), nad i pod nią ≥ pole/4 (≥ 5,9 pt na 320) paska; pasek leży pod podkładką bez zmiany krycia. TAK.
## 4. Testy w worktree (env -u NODE_PATH npx jest RangeGrid siatka-etykieta-08 znak-kolor-etykiety-08 kontrast-pary-08 motyw-08): 7 plików, 110/110 PASS.
Mutacje: (a) próg 1→0,85: FAIL 12 (etykieta-kontrast-08); (b) brak podkładki: FAIL 10; (c) bez allowFontScaling: FAIL 3 (geometria-08); (d) podkładka felt1: FAIL 10. Wszystkie wykryte.
## 5. RangeGrid-uncertain: te same asercje (liczba kropek = |uncertain|, kropka w polu właściwej klasy, legenda tylko gdy niepusta, pętla po treści pl); zmieniony tylko selektor „•” → testID `kropka-*` z includeHiddenElements. znak-kolor: dla RangeGrid nadal kropka = kolor etykiety (ink) na polu f=0; na polu f=1 to już nie obowiązuje z założenia (kropka ink, etykieta onFelt) — zgodne ze specyfikacją, nie osłabienie.
## 6. Czytnik: accessibilityLabel siatki (RangeGrid.tsx:31, range.label) bez zmian w diffie; kropka accessibilityElementsHidden/importantForAccessibility="no"; podkładka to View bez etykiety. Bez pogorszenia.

## Znaleziska
- P0/P1: brak.
- P2: light f=1 ma 4,58 (zapas 0,08) — każda zmiana felt1/surface/onFelt łamie próg; strzeże para w paryZlozone (tokeny.ts) — OK, tylko odnotowane.
- P2: przed onLayout pole liczone z okna − 32; dla siatki w bloku `note` (Blocks.tsx:107, padding 16) pierwsza klatka ma pole o ~2,5 pt za duże → adjustsFontSizeToFit/overflow chronią; znika po pomiarze.
- P2 (poza diffem, istniejące): kropka ink na pasku warn w ciemnych motywach 2,23 (grupy 2–3, treść pl ich nie używa; nazwane w spec, strażnik w teście treści); legenda „mieszana” nieczytana przez VoiceOver, bo kontener accessible nadpisuje dzieci etykietą range.label.
