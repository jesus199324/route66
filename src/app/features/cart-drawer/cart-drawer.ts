import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SITE } from '../../core/config/site.config';
import { FulfillmentMode } from '../../core/models/cart.model';
import { ProductArt as ProductArtModel } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { buildOrderMessage, whatsappUrl } from '../../core/utils/cart.utils';
import { Icon } from '../../shared/icon/icon';
import { PricePipe } from '../../shared/price/price.pipe';
import { ProductArt } from '../../shared/product-art/product-art';

@Component({
  selector: 'r66-cart-drawer',
  imports: [ReactiveFormsModule, Icon, PricePipe, ProductArt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
  host: {
    '(document:keydown.escape)': 'cart.close()',
  },
})
export class CartDrawer {
  protected readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);
  private readonly document = inject(DOCUMENT);
  private readonly fb = inject(FormBuilder);

  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  protected readonly delivery = SITE.delivery;
  protected readonly emptyArt: ProductArtModel = { kind: 'side', side: 'shake', flavor: 'strawberry' };

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    address: [''],
    notes: ['', Validators.maxLength(200)],
  });

  private lastFocused: HTMLElement | null = null;

  constructor() {
    // Bloquea el scroll del fondo y gestiona el foco al abrir/cerrar.
    effect(() => {
      const open = this.cart.isOpen();
      this.document.body.classList.toggle('no-scroll', open);
      if (open) {
        this.lastFocused = this.document.activeElement as HTMLElement | null;
        setTimeout(() => this.closeButton()?.nativeElement.focus(), 50);
      } else {
        this.lastFocused?.focus?.();
        this.lastFocused = null;
      }
    });

    // La dirección solo es obligatoria para delivery.
    effect(() => {
      const address = this.form.controls.address;
      address.setValidators(this.cart.mode() === 'delivery' ? [Validators.required, Validators.minLength(5)] : []);
      address.updateValueAndValidity();
    });
  }

  protected setMode(mode: FulfillmentMode): void {
    this.cart.mode.set(mode);
  }

  protected hasError(control: 'name' | 'address'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  protected freeDeliveryProgress(): number {
    const { subtotal } = this.cart.totals();
    return Math.min(100, Math.round((subtotal / this.delivery.freeFrom) * 100));
  }

  protected goToMenu(): void {
    this.cart.close();
    this.document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }

  protected clear(): void {
    this.cart.clear();
    this.toast.show('Pedido vaciado');
  }

  protected submit(): void {
    if (this.cart.isEmpty()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, address, notes } = this.form.getRawValue();
    const message = buildOrderMessage(
      this.cart.lines(),
      { name, address, notes, mode: this.cart.mode() },
      this.cart.totals(),
    );
    window.open(whatsappUrl(SITE.whatsapp, message), '_blank', 'noopener');

    this.cart.clear();
    this.cart.close();
    this.form.controls.notes.reset();
    this.toast.show('¡Pedido enviado! Te respondemos por WhatsApp', 3500);
  }
}
