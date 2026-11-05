import { Injectable } from '@angular/core';
import { CATEGORIES, FEATURED_PRODUCT_ID, PRODUCTS } from '../data/menu.data';
import { CategoryId, Product } from '../models/product.model';

/**
 * Fuente única del catálogo. Hoy lee datos locales; mañana puede leer de una API
 * manteniendo la misma interfaz pública.
 */
@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly byId = new Map(PRODUCTS.map((p) => [p.id, p]));

  readonly categories = CATEGORIES;
  readonly products = PRODUCTS;

  byCategory(category: CategoryId): Product[] {
    return this.products.filter((p) => p.category === category);
  }

  findById(id: string): Product | undefined {
    return this.byId.get(id);
  }

  /** Diferencia entre comprar los productos sueltos y el combo (0 si no es combo). */
  savings(product: Product): number {
    if (!product.includes?.length) return 0;
    const separately = product.includes.reduce((sum, id) => sum + (this.findById(id)?.price ?? 0), 0);
    return Math.max(0, separately - product.price);
  }

  featured(): Product {
    return this.byId.get(FEATURED_PRODUCT_ID) ?? this.products[0];
  }
}
