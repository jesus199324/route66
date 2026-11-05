import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Encabezado de sección consistente: eyebrow + título display + bajada opcional. */
@Component({
  selector: 'r66-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'heading',
    '[class.heading--light]': 'tone() === "light"',
    '[class.heading--left]': 'align() === "left"',
  },
  template: `
    <span class="eyebrow">{{ eyebrow() }}</span>
    <h2 class="display heading__title" [attr.id]="titleId()">{{ title() }}</h2>
    @if (subtitle()) {
      <p class="heading__subtitle">{{ subtitle() }}</p>
    }
  `,
  styleUrl: './section-heading.css',
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly titleId = input<string>();
  readonly tone = input<'dark' | 'light'>('dark');
  readonly align = input<'center' | 'left'>('center');
}
