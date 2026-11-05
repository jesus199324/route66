import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProductArt as ProductArtModel } from '../../core/models/product.model';
import { sideArt } from '../art/art';
import { SvgArt } from '../art/svg-art';
import { BurgerArt } from '../burger-art/burger-art';

/** Elige la ilustración correcta según el tipo de producto. */
@Component({
  selector: 'r66-product-art',
  imports: [BurgerArt, SvgArt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-art.html',
  styleUrl: './product-art.css',
  host: { class: 'product-art' },
})
export class ProductArt {
  readonly art = input.required<ProductArtModel>();

  protected readonly burgerLayers = computed(() => {
    const art = this.art();
    return art.kind === 'burger' ? art.layers : null;
  });

  protected readonly side = computed(() => {
    const art = this.art();
    return art.kind === 'side' ? sideArt(art.side, art.flavor) : null;
  });

  protected readonly combo = computed(() => {
    const art = this.art();
    return art.kind === 'combo'
      ? { layers: art.layers, fries: sideArt('fries'), shake: sideArt('shake', art.flavor) }
      : null;
  });
}
