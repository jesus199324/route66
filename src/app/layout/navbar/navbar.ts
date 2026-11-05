import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { OpeningHoursService } from '../../core/services/opening-hours.service';
import { Icon } from '../../shared/icon/icon';

interface NavLink {
  href: string;
  label: string;
}

@Component({
  selector: 'r66-navbar',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'menuOpen.set(false)',
  },
})
export class Navbar {
  protected readonly cart = inject(CartService);
  protected readonly hours = inject(OpeningHoursService);

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  protected readonly links: NavLink[] = [
    { href: '#menu', label: 'Menú' },
    { href: '#combo', label: 'Combos' },
    { href: '#historia', label: 'Historia' },
    { href: '#visitanos', label: 'Visitanos' },
  ];

  protected onScroll(): void {
    const scrolled = window.scrollY > 24;
    if (scrolled !== this.scrolled()) this.scrolled.set(scrolled);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected openCart(): void {
    this.menuOpen.set(false);
    this.cart.open();
  }
}
