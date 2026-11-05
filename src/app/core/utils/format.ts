import { SITE } from '../config/site.config';

const priceFormatter = new Intl.NumberFormat(SITE.locale, {
  style: 'currency',
  currency: SITE.currency,
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 0,
});

/** 420 → "$ 420" */
export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

/** 26 → "02:00", 12 → "12:00" */
export function formatHour(hour: number): string {
  const h = hour % 24;
  return `${String(h).padStart(2, '0')}:00`;
}
