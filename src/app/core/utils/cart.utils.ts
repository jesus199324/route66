import { SITE } from '../config/site.config';
import { CartLine, FulfillmentMode, OrderDetails, StoredCartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { formatPrice } from './format';

export const MAX_QUANTITY = 20;

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
  /** Cuánto falta para el envío gratis (0 si ya aplica o si es retiro en local). */
  missingForFreeDelivery: number;
}

/** Limpia datos restaurados de LocalStorage: descarta ids desconocidos, cantidades inválidas y duplicados. */
export function sanitizeItems(raw: unknown, exists: (id: string) => boolean): StoredCartItem[] {
  if (!Array.isArray(raw)) return [];
  const merged = new Map<string, number>();
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const { productId, quantity } = entry as Partial<StoredCartItem>;
    if (typeof productId !== 'string' || !exists(productId)) continue;
    if (typeof quantity !== 'number' || !Number.isFinite(quantity)) continue;
    const qty = Math.floor(quantity);
    if (qty < 1) continue;
    merged.set(productId, Math.min(MAX_QUANTITY, (merged.get(productId) ?? 0) + qty));
  }
  return [...merged].map(([productId, quantity]) => ({ productId, quantity }));
}

export function buildLines(items: StoredCartItem[], find: (id: string) => Product | undefined): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of items) {
    const product = find(item.productId);
    if (product) lines.push({ product, quantity: item.quantity, total: product.price * item.quantity });
  }
  return lines;
}

export function calculateTotals(lines: CartLine[], mode: FulfillmentMode): CartTotals {
  const subtotal = lines.reduce((sum, line) => sum + line.total, 0);
  const { fee, freeFrom } = SITE.delivery;
  const isDelivery = mode === 'delivery' && subtotal > 0;
  const deliveryFee = isDelivery && subtotal < freeFrom ? fee : 0;
  const missingForFreeDelivery = isDelivery ? Math.max(0, freeFrom - subtotal) : 0;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee, missingForFreeDelivery };
}

export function buildOrderMessage(lines: CartLine[], details: OrderDetails, totals: CartTotals): string {
  const rows = lines.map((l) => `• ${l.quantity} × ${l.product.name} — ${formatPrice(l.total)}`);
  const modeLine =
    details.mode === 'delivery' ? `🚗 Delivery a: ${details.address.trim()}` : '🏁 Retiro en el local';
  return [
    `¡Hola ${SITE.name}! Quiero hacer un pedido 🍔`,
    '',
    ...rows,
    '',
    `Subtotal: ${formatPrice(totals.subtotal)}`,
    details.mode === 'delivery'
      ? `Envío: ${totals.deliveryFee === 0 ? 'gratis' : formatPrice(totals.deliveryFee)}`
      : null,
    `*Total: ${formatPrice(totals.total)}*`,
    '',
    `👤 ${details.name.trim()}`,
    modeLine,
    details.notes.trim() ? `📝 ${details.notes.trim()}` : null,
  ]
    .filter((row): row is string => row !== null)
    .join('\n');
}

export function whatsappUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
