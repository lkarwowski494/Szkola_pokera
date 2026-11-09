import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { Button, Screen } from '@/components/ui';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

/**
 * Ekran zakupu (PR-06; BR-ZAK-001–003, stan przepływu BR-LIM-001; maszyna `zakup`, ADR 0010).
 * Ceny i okresy wyłącznie ze sklepu (`cena` sformatowana przez sklep w walucie storefrontu), nigdy wpisane w kodzie.
 * Adapter sklepu (expo-iap, ADR 0006) mieszka w apps/mobile/src/platform/; ekran dostaje go jako port (atrapa w testach).
 */
export type ProduktSklepu = { id: string; cena: string; okres: 'kwartal' | 'rok' | null }; // null = dożywotni (jednorazowy)
export type OdczytProduktow = { ok: true; produkty: readonly ProduktSklepu[] } | { ok: false; powod: 'brak_sieci' | 'blad' };
export interface SklepEkranu {
  produkty(): Promise<OdczytProduktow>;
  kup(id: string): Promise<'zakonczony' | 'anulowany' | 'oczekuje' | 'blad'>;
  przywroc(): Promise<'zakonczony' | 'brak_zakupow' | 'blad'>;
}
export type PropsEkranuZakupu = {
  sklep: SklepEkranu;
  onDostep(): void; // dostęp odblokowany (zakup albo przywrócenie) — bez ponownego uruchomienia (BR-ZAK-002)
  onZamknij(): void;
  onWrocDoLekcji(): void; // „Wróć do lekcji” (BR-LIM-001, słownik interakcji design-spec.md)
  otworzWarunki(): void; // Terms of Use
  otworzPrywatnosc(): void; // polityka prywatności
};

type Komunikat = 'brak_zakupow' | 'oczekuje' | 'blad_zakupu' | 'blad_przywracania' | null;

/** Opis planu dla oka i czytnika: okres i odnawianie przy subskrypcji, „jednorazowy” przy dożywotnim (BR-ZAK-001). */
function klucze(p: ProduktSklepu) {
  if (p.okres === 'kwartal') return { nazwa: 'purchase.plan.quarter', opis: 'purchase.renewsQuarter' };
  if (p.okres === 'rok') return { nazwa: 'purchase.plan.year', opis: 'purchase.renewsYear' };
  return { nazwa: 'purchase.plan.lifetime', opis: 'purchase.oneTime' };
}

export default function EkranZakupu({ sklep, onDostep, onZamknij, onWrocDoLekcji, otworzWarunki, otworzPrywatnosc }: PropsEkranuZakupu): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const [odczyt, ustawOdczyt] = useState<OdczytProduktow | null>(null);
  const [komunikat, ustawKomunikat] = useState<Komunikat>(null);
  const [zajety, ustawZajety] = useState(false);
  const wToku = useRef(false); // R-48: drugie dotknięcie przed odpowiedzią sklepu nie zaczyna drugiego zakupu

  const pobierz = useCallback(() => {
    ustawOdczyt(null);
    void sklep.produkty().then(ustawOdczyt, () => ustawOdczyt({ ok: false, powod: 'blad' }));
  }, [sklep]);
  useEffect(pobierz, [pobierz]);

  const zSklepem = async (dzialanie: () => Promise<void>) => {
    if (wToku.current) return;
    wToku.current = true;
    ustawZajety(true);
    ustawKomunikat(null);
    try {
      await dzialanie();
    } finally {
      wToku.current = false;
      ustawZajety(false);
    }
  };
  const kup = (id: string) =>
    zSklepem(async () => {
      const w = await sklep.kup(id).catch(() => 'blad' as const);
      if (w === 'zakonczony') onDostep();
      else if (w === 'oczekuje') ustawKomunikat('oczekuje');
      else if (w === 'blad') ustawKomunikat('blad_zakupu');
    });
  const przywroc = () =>
    zSklepem(async () => {
      const w = await sklep.przywroc().catch(() => 'blad' as const);
      if (w === 'zakonczony') onDostep();
      else ustawKomunikat(w === 'brak_zakupow' ? 'brak_zakupow' : 'blad_przywracania');
    });

  const tekstKomunikatu: Record<Exclude<Komunikat, null>, string> = {
    brak_zakupow: t('purchase.noPurchases'),
    oczekuje: t('purchase.pending'),
    blad_zakupu: t('purchase.failed'),
    blad_przywracania: t('purchase.restoreFailed'),
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button variant="ghost" label={t('purchase.close')} onPress={onZamknij} />
      </View>
      <Text accessibilityRole="header" style={[styl.tytul, { color: tk.ink }]}>
        {t('purchase.title')}
      </Text>
      <Text style={[styl.tresc, { color: tk.ink }]}>{t('purchase.unlocks')}</Text>
      {odczyt === null ? <Text style={[styl.przypis, { color: tk.muted }]}>{t('purchase.loading')}</Text> : null}
      {odczyt !== null && !odczyt.ok ? (
        <View style={{ gap: odstep.m }}>
          <Text accessibilityRole="alert" style={[styl.tresc, { color: tk.alert }]}>
            {t('purchase.pricesUnavailable')}
          </Text>
          <Button label={t('purchase.retry')} onPress={pobierz} />
        </View>
      ) : null}
      {odczyt?.ok ? (
        <View style={{ gap: odstep.s }}>
          {odczyt.produkty.map((p) => {
            const k = klucze(p);
            const nazwa = t(k.nazwa);
            const opis = t(k.opis);
            return (
              <Pressable
                key={p.id}
                accessibilityRole="button"
                accessibilityLabel={`${nazwa}, ${p.cena}. ${opis}`}
                accessibilityState={{ disabled: zajety }}
                onPress={() => void kup(p.id)}
                style={({ pressed }) => ({
                  padding: odstep.l,
                  borderRadius: promien.przycisk,
                  borderWidth: 1.5,
                  borderColor: tk.separator,
                  backgroundColor: tk.surface,
                  gap: odstep.xs,
                  opacity: zajety ? 0.6 : pressed ? 0.85 : 1,
                })}
              >
                <Text style={[styl.przypis, { color: tk.muted }]}>{nazwa}</Text>
                <Text style={[styl.tytul, { color: tk.ink, fontVariant: ['tabular-nums', 'lining-nums'] }]}>{p.cena}</Text>
                <Text style={[styl.przypis, { color: tk.muted }]}>{opis}</Text>
              </Pressable>
            );
          })}
          {/* 10-US-01/02, 10-JP-01 (D-301): jak anulować i z jakim skutkiem, widoczne przed decyzją; tylko przy planie odnawialnym */}
          {odczyt.produkty.some((p) => p.okres !== null) ? <Text style={[styl.przypis, { color: tk.muted }]}>{t('purchase.cancelInfo')}</Text> : null}
        </View>
      ) : null}
      {komunikat ? (
        <Text accessibilityRole="alert" style={[styl.tresc, { color: komunikat === 'oczekuje' || komunikat === 'brak_zakupow' ? tk.ink : tk.alert }]}>
          {tekstKomunikatu[komunikat]}
        </Text>
      ) : null}
      <View style={{ gap: odstep.s }}>
        <Button variant="ghost" label={t('purchase.restore')} onPress={() => void przywroc()} disabled={zajety} />
        <Button variant="ghost" label={t('start.backToLesson')} onPress={onWrocDoLekcji} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: odstep.l, justifyContent: 'center' }}>
        <Button variant="ghost" accessibilityRole="link" label={t('purchase.terms')} onPress={otworzWarunki} />
        <Button variant="ghost" accessibilityRole="link" label={t('purchase.privacy')} onPress={otworzPrywatnosc} />
      </View>
    </Screen>
  );
}
