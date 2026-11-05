import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Hace aparecer el elemento con un fade + desplazamiento cuando entra en pantalla.
 * Los estilos (.reveal / .is-visible) viven en styles.css.
 */
@Directive({
  selector: '[r66Reveal]',
  host: {
    class: 'reveal',
    '[style.--reveal-delay]': 'revealDelay() + "ms"',
  },
})
export class RevealDirective {
  readonly revealDelay = input(0);

  constructor() {
    const element: HTMLElement = inject(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        element.classList.add('is-visible');
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            element.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
