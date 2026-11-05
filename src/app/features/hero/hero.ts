import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { LayerType } from '../../shared/art/art';
import { BurgerArt } from '../../shared/burger-art/burger-art';
import { Icon } from '../../shared/icon/icon';

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smooth = (v: number) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};

/**
 * Curva de "desarmado" según el progreso del scroll (0–1):
 * se abre entre 5% y 35%, se mantiene abierta y vuelve a armarse entre 62% y 90%.
 */
export function explodeAmount(progress: number): number {
  return smooth((progress - 0.05) / 0.3) * (1 - smooth((progress - 0.62) / 0.28));
}

@Component({
  selector: 'r66-hero',
  imports: [BurgerArt, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly cart = inject(CartService);

  private readonly section = viewChild.required<ElementRef<HTMLElement>>('section');
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  protected readonly layers: LayerType[] = [
    'bunTop',
    'sauce',
    'lettuce',
    'tomato',
    'onion',
    'cheese',
    'patty',
    'bunBottom',
  ];

  constructor() {
    const destroyRef = inject(DestroyRef);

    // La animación vive fuera del ciclo de Angular: solo escribe variables CSS en cada frame.
    afterNextRender(() => {
      const section = this.section().nativeElement;
      const stage = this.stage().nativeElement;
      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
      const stickyLayout = matchMedia('(min-width: 900px)');
      let frame = 0;

      const update = () => {
        frame = 0;
        if (reducedMotion.matches) {
          section.style.setProperty('--e', '0');
          return;
        }
        let progress: number;
        if (stickyLayout.matches) {
          // Escritorio: la sección mide más que la pantalla y el contenido queda "pegado".
          const rect = section.getBoundingClientRect();
          progress = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
        } else {
          // Mobile: progreso hasta que la hamburguesa sale por arriba de la pantalla.
          const rect = stage.getBoundingClientRect();
          const stageBottom = rect.bottom + window.scrollY;
          progress = clamp(window.scrollY / Math.max(1, stageBottom - 60));
        }
        section.style.setProperty('--p', progress.toFixed(3));
        section.style.setProperty('--e', explodeAmount(progress).toFixed(3));
      };

      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };

      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      update();

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      });
    });
  }
}
