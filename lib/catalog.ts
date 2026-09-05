import packageData from "@/data/travel-packages.json";
import type { Locale } from "./i18n";

type Localized = { en: string; id: string };
type PriceMap = Record<string, number>;

type RawPackage = {
  slug: string;
  title: Localized;
  duration: string;
  destinations: string[];
  image: string;
  featured: boolean;
  prices: { standard: PriceMap; full: PriceMap };
};

type RawCar = {
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

type RawData = {
  currencyBase: string;
  currencyRates: Record<"MYR" | "SGD" | "IDR", number>;
  packages: RawPackage[];
  carRentals: RawCar[];
  hotelPartners: RawPartner[];
  restaurantPartners: RawPartner[];
  testimonials: RawTestimonial[];
};

const raw = packageData as RawData;

export type Currency = "MYR" | "SGD" | "IDR";
export type PackageType = "standard" | "full";

export type LocalizedPackage = Omit<RawPackage, "title"> & { title: string };
export type LocalizedCar = Omit<RawCar, "capacity"> & { capacity: string };
export type LocalizedPartner = Omit<RawPartner, "description"> & { description: string };
export type LocalizedTestimonial = Omit<RawTestimonial, "quote"> & { quote: string };

export type LocalizedCatalog = {
  currencyRates: RawData["currencyRates"];
  packages: LocalizedPackage[];
  carRentals: LocalizedCar[];
  hotelPartners: LocalizedPartner[];
  restaurantPartners: LocalizedPartner[];
  testimonials: LocalizedTestimonial[];
};

export function getCatalog(locale: Locale): LocalizedCatalog {
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
