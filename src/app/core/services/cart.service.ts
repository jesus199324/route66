import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { FulfillmentMode, StoredCartItem } from '../models/cart.model';
import { buildLines, calculateTotals, MAX_QUANTITY, sanitizeItems } from '../utils/cart.utils';
import { MenuService } from './menu.service';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'r66.cart.v1';

/**
 * Estado global del carrito basado en signals.
 * Se persiste automáticamente en LocalStorage con un `effect`.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly menu = inject(MenuService);
  private readonly storage = inject(StorageService);

  private readonly items = signal<StoredCartItem[]>(
    sanitizeItems(this.storage.read<unknown>(STORAGE_KEY), (id) => !!this.menu.findById(id)),
  );

  /** Panel lateral del carrito abierto/cerrado. */
  readonly isOpen = signal(false);
  /** Modalidad elegida en el checkout; afecta el costo de envío. */
  readonly mode = signal<FulfillmentMode>('delivery');

  readonly lines = computed(() => buildLines(this.items(), (id) => this.menu.findById(id)));
  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly isEmpty = computed(() => this.count() === 0);
  readonly totals = computed(() => calculateTotals(this.lines(), this.mode()));

  constructor() {
    effect(() => this.storage.write(STORAGE_KEY, this.items()));
  }

  quantityOf(productId: string): number {
    return this.items().find((i) => i.productId === productId)?.quantity ?? 0;
  }

  add(productId: string, quantity = 1): void {
    if (!this.menu.findById(productId)) return;
    this.items.update((items) => {
      const existing = items.find((i) => i.productId === productId);
      if (!existing) return [...items, { productId, quantity: Math.min(quantity, MAX_QUANTITY) }];
      return items.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_QUANTITY) } : i,
      );
    });
  }

  increment(productId: string): void {
    this.add(productId, 1);
  }

  decrement(productId: string): void {
    this.items.update((items) =>
      items
        .map((i) => (i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }

  remove(productId: string): void {
    this.items.update((items) => items.filter((i) => i.productId !== productId));
  }

  clear(): void {
    this.items.set([]);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
