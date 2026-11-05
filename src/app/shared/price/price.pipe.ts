import { Pipe, PipeTransform } from '@angular/core';
import { formatPrice } from '../../core/utils/format';

/** {{ 420 | price }} → "$ 420" (pesos uruguayos, sin decimales). */
@Pipe({ name: 'price' })
export class PricePipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return value == null ? '' : formatPrice(value);
  }
}
