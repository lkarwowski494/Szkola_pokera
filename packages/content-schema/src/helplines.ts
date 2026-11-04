import { z } from 'zod';

/**
 * Telefony i miejsca pomocy (content/helplines.yaml, B-058): jedno źródło prawdy dla ramki „Odpowiedzialna gra”
 * w lekcji M12-L4 i ekranu „Pomoc”. Rynki aplikacji (D-142) z decyzjami D-150–D-152; źródła i twierdzenia:
 * docs/tresci/e1-pomoc.md i rejestr docs/tresci/rejestr/pomoc.json. Nie należy do bazy treści, więc nie zmienia
 * CONTENT_SCHEMA_VERSION.
 */

const httpsUrl = z.string().regex(/^https:\/\/[^\s]+$/, 'adres https://');
/** Numer w zapisie do wyświetlenia: cyfry, spacje i łączniki („801 889 880”, „1-800-697-3738”, „9-8-8”, „15”). */
const phone = z.string().regex(/^\d([\d -]*\d)?$/, 'numer: cyfry, spacje i łączniki');
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
/** Kod regionu ISO 3166-2 (GB-WLS, CA-ON). */
const regionCode = z.string().regex(/^[A-Z]{2}-[A-Z0-9]{2,3}$/, 'kod regionu ISO 3166-2');
const entryId = z.string().regex(/^[a-z0-9-]+$/);

/**
 * Rodzaj pomocy; jeden na wpis, żeby linia hazardowa nie mieszała się z kryzysową. gambling: problem z hazardem;
 * support: poradnictwo psychologiczne (TW, D-151); crisis: kryzys psychiczny, myśli samobójcze; emergency: zagrożenie życia.
 */
export const HelplineKind = z.enum(['gambling', 'support', 'crisis', 'emergency']);
export type HelplineKind = z.infer<typeof HelplineKind>;

export const HelplineSource = z.object({ url: httpsUrl, quote: z.string().min(3) }).strict();

export const HelplineEntry = z
  .object({
    id: entryId,
    /** Identyfikator twierdzenia w rejestrze (H-US-1); content-build wymaga statusu „potwierdzone” (D-141). */
    claim: z.string().regex(/^H-[A-Z]+-\d+$/, 'twierdzenie rejestru: H-XX-1'),
    /** Kraj ISO 3166-1 alfa-2 albo „*” (pomoc międzynarodowa online). */
    country: z.string().regex(/^([A-Z]{2}|\*)$/, 'kod kraju (US) albo *'),
    /** Regiony, w których wpis obowiązuje; brak = cały kraj. */
    regions: z.array(regionCode).min(1).optional(),
    /** Wpis regionalny pokazywany także bez wybranego regionu (numer ogólnokrajowy, D-152). */
    national: z.literal(true).optional(),
    kind: HelplineKind,
    name: z.string().min(3),
    phone: phone.optional(),
    /** Zapis literowy numeru z `phone` („1-800-MY-RESET”), tylko do wyświetlenia. */
    vanity: z.string().regex(/^[0-9A-Z]([0-9A-Z -]*[0-9A-Z])?$/, 'zapis literowy: cyfry, wielkie litery, spacje, łączniki').optional(),
    /** Dodatkowe numery tego samego wpisu (np. numer lokalny, drugi numer alarmowy). */
    phone_alt: z.array(z.object({ phone, label: z.string().min(2).optional() }).strict()).min(1).optional(),
    sms: phone.optional(),
    hours: z.string().min(3).optional(),
    cost: z.string().min(3).optional(),
    language: z.string().min(3).optional(),
    operator: z.string().min(3).optional(),
    info: z.string().min(3).optional(),
    links: z.array(z.object({ label: z.string().min(2), url: httpsUrl }).strict()).optional(),
    /** Termin przeglądu krótszy niż dla całego pliku (np. VN: numery alarmowe w trakcie zmiany). */
    review_by: isoDate.optional(),
    /** Przeczytane źródło każdego wpisu: adres i dosłowny cytat (ADR-24), z pola `zrodla` twierdzenia w rejestrze. */
    sources: z.array(HelplineSource).min(1),
  })
  .strict()
  .refine((e) => e.phone || e.links?.length, 'wpis potrzebuje numeru albo linku')
  .refine((e) => !e.vanity || e.phone, 'zapis literowy wymaga numeru (phone)')
  .refine((e) => !e.phone_alt || e.phone, 'numery dodatkowe wymagają numeru głównego (phone)')
  .refine((e) => e.kind !== 'emergency' || e.phone, 'numer alarmowy wymaga numeru')
  .refine((e) => e.country !== '*' || (!e.regions && !e.phone), 'pomoc międzynarodowa: bez regionów i bez numeru telefonu')
  .refine((e) => (e.regions ?? []).every((r) => r.startsWith(`${e.country}-`)), 'region musi należeć do kraju wpisu')
  .refine((e) => !e.national || e.regions, 'national dotyczy tylko wpisu z regionami');
export type HelplineEntry = z.infer<typeof HelplineEntry>;

export const HelplinesFile = z
  .object({
    /** Data sprawdzenia danych u źródeł (RRRR-MM-DD). */
    checked: isoDate,
    /** Termin następnego przeglądu całego pliku. */
    review_by: isoDate,
    /** Zdanie do ramki w lekcji: gdzie w aplikacji są numery dla kraju użytkownika. */
    pointer: z.string().min(10),
    /** Kraje bez wpisu (D-142): tekst bez numeru i pomoc międzynarodowa online (id wpisów z country „*”). */
    fallback: z.object({ text: z.string().min(10), online: z.array(entryId).min(1) }).strict(),
    /** Nazwy regionów do listy wyboru (D-152), w kolejności wyświetlania. */
    regions: z.record(regionCode, z.string().min(2)),
    /** Nagłówek listy regionów na ekranie „Pomoc” (D-152). */
    regions_label: z.string().min(5),
    entries: z.array(HelplineEntry).min(1),
  })
  .strict();
export type HelplinesFile = z.infer<typeof HelplinesFile>;

/** Adres tel: z numeru do wyświetlenia („801 889 880” → „tel:801889880”, „9-8-8” → „tel:988”). */
export function telUri(phoneText: string): string {
  return `tel:${phoneText.replace(/[\s-]/g, '')}`;
}

/** Wynik wyboru numerów dla kraju i regionu (RD-12, D-152). */
export interface HelplineSelection<E = HelplineEntry> {
  /** Wpisy kraju w kolejności pliku: całokrajowe i (bez regionu) `national`, a z regionem także regionalne. */
  entries: E[];
  /** Regiony kraju z własnymi wpisami albo bez nich (lista wyboru pod numerem ogólnokrajowym); pusta, gdy kraj ich nie ma. */
  regions: { code: string; name: string }[];
  /** Pomoc międzynarodowa online (fallback.online), zawsze. */
  online: E[];
  /** Tylko dla kraju bez wpisów: tekst bez numeru (D-142). */
  fallbackText?: string;
}

/**
 * Wybór wpisów dla kraju (region urządzenia) i opcjonalnie regionu wybranego przez użytkownika (D-152: bez pytania
 * o region; region tylko z listy pod numerem ogólnokrajowym). Czysta funkcja: ekran „Pomoc” i testy wektorów RD-12.
 */
export function selectHelplines<E extends Pick<HelplineEntry, 'id' | 'country' | 'regions' | 'national'>>(
  file: { entries: readonly E[]; regions: Readonly<Record<string, string>>; fallback: { text: string; online: readonly string[] } },
  country: string,
  region?: string,
): HelplineSelection<E> {
  country = country.toUpperCase();
  // region z innego kraju (np. zapamiętany wybór) albo błędny kod: jak bez regionu, żeby nie zgubić wpisu ogólnokrajowego
  if (region && !region.startsWith(`${country}-`)) region = undefined;
  const own = file.entries.filter((e) => e.country === country);
  const online = file.fallback.online.flatMap((id) => file.entries.filter((e) => e.id === id));
  const entries = own.filter((e) => !e.regions || (region ? e.regions.includes(region) : !!e.national));
  const regions = own.some((e) => e.regions)
    ? Object.entries(file.regions)
        .filter(([code]) => code.startsWith(`${country}-`))
        .map(([code, name]) => ({ code, name }))
    : [];
  return own.length ? { entries, regions, online } : { entries: [], regions: [], online, fallbackText: file.fallback.text };
}

const MONTHS_GENITIVE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

/** „2026-10-05” → „5 października 2026”. */
export function formatPolishDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  const month = m ? MONTHS_GENITIVE[Number(m[2]) - 1] : undefined;
  if (!m || !month) throw new Error(`niepoprawna data ${iso}`);
  return `${Number(m[3])} ${month} ${m[1]}`;
}
