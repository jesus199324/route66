import { Product } from './product.model';

/** Lo que se persiste en LocalStorage: solo id y cantidad (los precios se resuelven siempre desde el catálogo). */
export interface StoredCartItem {
  productId: string;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
  total: number;
}

export type FulfillmentMode = 'delivery' | 'pickup';

export interface OrderDetails {
  name: string;
  mode: FulfillmentMode;
  address: string;
  notes: string;
}
