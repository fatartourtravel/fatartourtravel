import type { Currency } from "./catalog";

export function formatMoney(value: number, currency: Currency) {
  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat(currency === "MYR" ? "ms-MY" : "en-SG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
