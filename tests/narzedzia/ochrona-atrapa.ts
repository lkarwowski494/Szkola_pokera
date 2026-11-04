// Atrapa OchronaTla (ADR 0013 pkt 2) do testów K-10: zapisuje kolejność wywołań we wspólnym dzienniku z adapterem.
import type { OchronaTla } from '../../packages/domena/src';

export function atrapaOchrony(dziennik: string[], { odmowa = false } = {}) {
  let nastepny = 1;
  const handlery = new Set<(id: number) => void>();
  const zakonczenia = new Map<number, number>();
  const otwarte = new Set<number>();
  const ochrona: OchronaTla = {
    rozpocznij(nazwa) {
      if (odmowa) { dziennik.push(`rozpocznij:${nazwa}:-1`); return -1; }
      const id = nastepny++;
      otwarte.add(id); zakonczenia.set(id, 0); dziennik.push(`rozpocznij:${nazwa}`);
      return id;
    },
    zakoncz(id) { zakonczenia.set(id, (zakonczenia.get(id) ?? 0) + 1); otwarte.delete(id); dziennik.push(`zakoncz:${id}`); },
    naWygasniecie(fn) { handlery.add(fn); return () => handlery.delete(fn); },
  };
  return {
    ochrona,
    wygasnij() { for (const id of [...otwarte]) for (const h of [...handlery]) h(id); },
    zakonczenia, // id → liczba wywołań zakoncz (ma być 1)
    otwarte,
  };
}
