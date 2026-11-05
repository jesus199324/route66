import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Cinta infinita estilo cartel de ruta. El contenido se duplica para que el loop no tenga cortes. */
@Component({
  selector: 'r66-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee" [class.marquee--red]="tone() === 'red'" [class.marquee--mustard]="tone() === 'mustard'" aria-hidden="true">
      <div class="marquee__track">
        @for (copy of [0, 1]; track copy) {
          <div class="marquee__group">
            @for (item of items(); track $index) {
              <span class="marquee__item">{{ item }}</span>
              <span class="marquee__sep">★</span>
            }
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './marquee.css',
})
export class Marquee {
  readonly items = input<string[]>([
    'Smash burgers',
    'Milkshakes espesos',
    'Papas doble cocción',
    'Pan brioche del día',
    'Abierto hasta tarde',
    'Delivery & take away',
  ]);
  readonly tone = input<'black' | 'red' | 'mustard'>('black');
}
