import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LAYERS, LayerType } from '../art/art';
import { SvgArt } from '../art/svg-art';

interface RenderedLayer {
  type: LayerType;
  viewBox: string;
  markup: string;
  label: string;
  /** margin-top negativo en % del ancho, para que las capas se apoyen unas sobre otras. */
  overlap: string;
  /** Desplazamiento vertical al "desarmar" la hamburguesa, en unidades cqw. */
  offset: number;
  /** Rotación máxima al desarmar, en grados. */
  tilt: number;
}

/**
 * Hamburguesa ilustrada a partir de una lista de capas.
 *
 * La separación entre capas se controla con la variable CSS `--e` (0 = armada, 1 = desarmada),
 * que puede venir de cualquier ancestro: el hero la actualiza con el scroll y las cards la
 * cambian en :hover. Así la animación no dispara detección de cambios de Angular.
 */
@Component({
  selector: 'r66-burger-art',
  imports: [SvgArt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './burger-art.html',
  styleUrl: './burger-art.css',
  host: {
    class: 'burger',
    '[class.burger--labels]': 'labels()',
    '[class.burger--drop]': 'drop()',
    '[class.burger--live]': 'live()',
    '[style.--n]': 'rendered().length',
  },
})
export class BurgerArt {
  readonly layers = input.required<LayerType[]>();
  /** Muestra el nombre de cada ingrediente al desarmar. */
  readonly labels = input(false);
  /** Animación de entrada: las capas caen una por una. */
  readonly drop = input(false);
  /** Sin transición CSS: el valor de --e se actualiza cuadro a cuadro desde afuera. */
  readonly live = input(false);
  /** Separación entre capas al desarmar (cqw por capa). */
  readonly spread = input(6);

  protected readonly rendered = computed<RenderedLayer[]>(() => {
    const list = this.layers();
    const middle = (list.length - 1) / 2;
    return list.map((type, i) => {
      const art = LAYERS[type];
      return {
        type,
        viewBox: art.viewBox,
        markup: art.markup,
        label: art.label,
        overlap: i === 0 ? '0' : `-${(art.overlap * 100).toFixed(2)}%`,
        offset: Number(((i - middle) * this.spread()).toFixed(2)),
        tilt: i % 2 === 0 ? -3 : 3,
      };
    });
  });
}
