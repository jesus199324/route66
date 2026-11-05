import { LayerType, SideArtKind } from '../../shared/art/art';

export type CategoryId = 'burgers' | 'sides' | 'shakes' | 'combos';

export interface Category {
  id: CategoryId;
  label: string;
  tagline: string;
}

export type ProductTag = 'best-seller' | 'nuevo' | 'veggie' | 'picante' | 'kids';

/** Describe cómo se ilustra un producto (arte vectorial propio, sin fotos). */
export type ProductArt =
  | { kind: 'burger'; layers: LayerType[] }
  | { kind: 'side'; side: SideArtKind; flavor?: string }
  | { kind: 'combo'; layers: LayerType[]; flavor: string };

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  /** Precio en pesos uruguayos (UYU), sin decimales. */
  price: number;
  art: ProductArt;
  tags?: ProductTag[];
  /** Solo combos: ids de los productos que incluye (se usa para calcular el ahorro). */
  includes?: string[];
}
