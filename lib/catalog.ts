import packageData from "@/data/travel-packages.json";
import type { Locale } from "./i18n";

type Localized = { en: string; id: string };
type PriceMap = Record<string, number>;

export type RawPackage = {
  slug: string;
  title: Localized;
  duration: string;
  destinations: string[];
  image: string;
  featured: boolean;
  prices: { standard: PriceMap; full: PriceMap };
};

export type RawCar = {
  name: string;
  capacity: Localized;
  prices: Record<"IDR" | "MYR" | "SGD", number>;
  image: string;
};

type RawPartner = {
  name: string;
  description: Localized;
  image: string;
};

type RawTestimonial = {
  name: string;
  location: string;
  rating: number;
  date: string;
  quote: Localized;
  published?: boolean;
};

export type RawCatalog = {
  currencyBase: string;
  currencyRates: Record<"MYR" | "SGD" | "IDR", number>;
  packages: RawPackage[];
  carRentals: RawCar[];
  hotelPartners: RawPartner[];
  restaurantPartners: RawPartner[];
  testimonials: RawTestimonial[];
};

export const fallbackCatalog = packageData as RawCatalog;
export const PAX_OPTIONS = ["4", "6", "8", "10", "12"] as const;

export type Currency = "MYR" | "SGD" | "IDR";
export type PackageType = "standard" | "full";

export type LocalizedPackage = Omit<RawPackage, "title"> & { title: string };
export type LocalizedCar = Omit<RawCar, "capacity"> & { capacity: string };
export type LocalizedPartner = Omit<RawPartner, "description"> & { description: string };
export type LocalizedTestimonial = Omit<RawTestimonial, "quote"> & { quote: string };

export type LocalizedCatalog = {
  currencyRates: RawCatalog["currencyRates"];
  packages: LocalizedPackage[];
  carRentals: LocalizedCar[];
  hotelPartners: LocalizedPartner[];
  restaurantPartners: LocalizedPartner[];
  testimonials: LocalizedTestimonial[];
};

export type PackageGroup = {
  slug: string;
  title: string;
  destinations: string[];
  image: string;
  durations: string[];
  optionCount: number;
  fromPrice: number;
  variants: LocalizedPackage[];
};

export function packageGroupSlug(pkg: Pick<RawPackage, "slug">) {
  return pkg.slug.replace(/-(?:3d2n|4d3n)$/i, "");
}

export function countPriceOptions(pkg: Pick<RawPackage, "prices">) {
  return (["standard", "full"] as const).reduce(
    (total, type) => total + Object.values(pkg.prices[type]).filter((value) => Number.isFinite(value)).length,
    0
  );
}

export function groupPackages(packages: LocalizedPackage[]): PackageGroup[] {
  const groups = new Map<string, PackageGroup>();

  for (const item of packages) {
    const slug = packageGroupSlug(item);
    const existing = groups.get(slug);
    const optionCount = countPriceOptions(item);
    const lowest = Math.min(...Object.values(item.prices.standard), ...Object.values(item.prices.full));

    if (!existing) {
      groups.set(slug, {
        slug,
        title: item.title,
        destinations: item.destinations,
        image: item.image,
        durations: [item.duration],
        optionCount,
        fromPrice: lowest,
        variants: [item],
      });
      continue;
    }

    existing.variants.push(item);
    existing.optionCount += optionCount;
    existing.fromPrice = Math.min(existing.fromPrice, lowest);
    if (!existing.durations.includes(item.duration)) existing.durations.push(item.duration);
  }

  return [...groups.values()].map((group) => ({
    ...group,
    durations: [...group.durations].sort((a, b) => a.localeCompare(b)),
  }));
}

export function getPackageGroup(packages: LocalizedPackage[], slug: string) {
  return groupPackages(packages).find((group) => group.slug === slug) ?? null;
}

export function getPackageGroupSlugs() {
  return [...new Set(fallbackCatalog.packages.map(packageGroupSlug))];
}

export type PriceDraft = {
  currencyRates: RawCatalog["currencyRates"];
  packages: { slug: string; prices: RawPackage["prices"] }[];
  carRentals: { name: string; prices: RawCar["prices"] }[];
};

export function localizeCatalog(raw: RawCatalog, locale: Locale): LocalizedCatalog {
  const pick = (value: Localized) => value[locale];
  return {
    currencyRates: raw.currencyRates,
    packages: raw.packages.map((item) => ({ ...item, title: pick(item.title) })),
    carRentals: raw.carRentals.map((item) => ({ ...item, capacity: pick(item.capacity) })),
    hotelPartners: raw.hotelPartners.map((item) => ({ ...item, description: pick(item.description) })),
    restaurantPartners: raw.restaurantPartners.map((item) => ({
      ...item,
      description: pick(item.description),
    })),
    testimonials: raw.testimonials.map((item) => ({ ...item, quote: pick(item.quote) })),
  };
}

export function applyPriceDraft(current: RawCatalog, draft: PriceDraft): RawCatalog {
  return {
    ...current,
    currencyRates: draft.currencyRates,
    packages: current.packages.map((pkg) => {
      const next = draft.packages.find((item) => item.slug === pkg.slug);
      return next ? { ...pkg, prices: next.prices } : pkg;
    }),
    carRentals: current.carRentals.map((car) => {
      const next = draft.carRentals.find((item) => item.name === car.name);
      return next ? { ...car, prices: next.prices } : car;
    }),
  };
}
