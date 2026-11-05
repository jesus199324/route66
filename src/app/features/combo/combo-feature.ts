import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { MenuService } from '../../core/services/menu.service';
import { ToastService } from '../../core/services/toast.service';
import { Icon } from '../../shared/icon/icon';
import { PricePipe } from '../../shared/price/price.pipe';
import { ProductArt } from '../../shared/product-art/product-art';
import { RevealDirective } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'r66-combo-feature',
  imports: [ProductArt, Icon, PricePipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './combo-feature.html',
  styleUrl: './combo-feature.css',
})
export class ComboFeature {
  private readonly menu = inject(MenuService);
  private readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);

  protected readonly combo = this.menu.featured();
  protected readonly savings = this.menu.savings(this.combo);
  protected readonly includes = (this.combo.includes ?? [])
    .map((id) => this.menu.findById(id))
    .filter((p) => p !== undefined);
  protected readonly inCart = computed(() => this.cart.quantityOf(this.combo.id));

  protected add(): void {
    this.cart.add(this.combo.id);
    this.toast.show(`${this.combo.name} agregado al pedido`);
  }
}
