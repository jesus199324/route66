import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CategoryId } from '../../core/models/product.model';
import { MenuService } from '../../core/services/menu.service';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'r66-menu-section',
  imports: [ProductCard, SectionHeading, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-section.html',
  styleUrl: './menu-section.css',
})
export class MenuSection {
  protected readonly menu = inject(MenuService);

  protected readonly active = signal<CategoryId>('burgers');
  protected readonly activeCategory = computed(
    () => this.menu.categories.find((c) => c.id === this.active()) ?? this.menu.categories[0],
  );
  protected readonly products = computed(() => this.menu.byCategory(this.active()));

  protected select(id: CategoryId): void {
    this.active.set(id);
  }

  /** Navegación con flechas entre pestañas (patrón WAI-ARIA tabs). */
  protected onTabKeydown(event: KeyboardEvent, index: number): void {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    const step = keys[event.key];
    if (!step) return;
    event.preventDefault();
    const categories = this.menu.categories;
    const next = categories[(index + step + categories.length) % categories.length];
    this.select(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  }
}
