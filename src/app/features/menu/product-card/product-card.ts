import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Product, ProductTag } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { MenuService } from '../../../core/services/menu.service';
import { ToastService } from '../../../core/services/toast.service';
import { Icon } from '../../../shared/icon/icon';
import { PricePipe } from '../../../shared/price/price.pipe';
import { ProductArt } from '../../../shared/product-art/product-art';

const TAGS: Record<ProductTag, { label: string; tone: string }> = {
  'best-seller': { label: 'Best seller', tone: 'stamp--red' },
  nuevo: { label: 'Nuevo', tone: '' },
  veggie: { label: 'Veggie', tone: 'stamp--green' },
  picante: { label: 'Picante', tone: 'stamp--black' },
  kids: { label: 'Kids', tone: 'stamp--cream' },
};

@Component({
  selector: 'r66-product-card',
  imports: [ProductArt, Icon, PricePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private readonly cart = inject(CartService);
  private readonly menu = inject(MenuService);
  private readonly toast = inject(ToastService);

  readonly product = input.required<Product>();

  protected readonly quantity = computed(() => this.cart.quantityOf(this.product().id));
  protected readonly savings = computed(() => this.menu.savings(this.product()));
  protected readonly tags = computed(() => (this.product().tags ?? []).map((tag) => TAGS[tag]));

  protected add(): void {
    this.cart.add(this.product().id);
    this.toast.show(`${this.product().name} agregada al pedido`);
  }

  protected increment(): void {
    this.cart.increment(this.product().id);
  }

  protected decrement(): void {
    this.cart.decrement(this.product().id);
  }
}
