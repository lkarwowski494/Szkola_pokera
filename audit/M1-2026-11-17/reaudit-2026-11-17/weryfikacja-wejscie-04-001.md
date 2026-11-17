### 04-studio-projektowe-001 · Kropka klasy niepewnej w siatce lekcji prawie niewidoczna na zielonym polu w motywie jasnym
- Poziom: P1
- Realność: realny · Pewność: wysoka
- Dowód: `apps/mobile/src/components/RangeGrid.tsx:42` kropka w kolorze „styles.mark, { color: tk.muted }”; pole w zakresie to `felt1` z `opacity: 0.85` na `surface` (`apps/mobile/src/components/RangeGrid.tsx:34`). Wynik `dowody/kontrast-kropka.txt` (kod 1): light 1,60:1, lightHigh 2,01:1 (próg 3); dark 4,79:1, darkHigh 7,75:1; na białym polu 7,39:1 i więcej. `dowody/pod-kropka.txt`: 71 z 263 klas niepewnych ma pasek ≥ 95% szerokości (kropka na zieleni), 17 na granicy 75–95%; w BB vs BTN: T2s 1,0, K8o 0,99, Q8o 1,0, K7o 1, 75o 0,98. Replika: `zrzuty/siatka-bb-vs-btn-light-390.png` (kropki przy K7o, Q8o, K8o, T2s, 75o ciemne na zieleni, przy 1× ledwie widoczne), dla porównania `zrzuty/siatka-bb-vs-btn-dark-390.png`.
- Kroki w aplikacji: motyw jasny → Lekcje → M4 „Obrona dużego blinda” → siatka pod akapitem o rękach w kolorze → szukaj kropki przy K7o lub Q8o.
### 04-studio-projektowe-002 · Kropka „mieszana” w malowaniu poniżej 3:1 na pomalowanym polu
- Katalog dowodów: audit/M1-2026-11-17/reaudit-2026-11-17/04-studio-projektowe/
