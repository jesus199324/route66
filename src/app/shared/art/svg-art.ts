import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Renderiza ilustraciones de `art.ts`.
 * El marcado proviene exclusivamente de constantes internas del proyecto (nunca de datos
 * del usuario), por eso es seguro marcarlo como confiable.
 */
@Component({
  selector: 'r66-svg-art',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    [attr.viewBox]="viewBox()"
    aria-hidden="true"
    focusable="false"
    [innerHTML]="safeMarkup()"
  ></svg>`,
  styles: `
    :host {
      display: block;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
  `,
})
export class SvgArt {
  private readonly sanitizer = inject(DomSanitizer);

  readonly viewBox = input.required<string>();
  readonly markup = input.required<string>();

  protected readonly safeMarkup = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.markup()));
}
