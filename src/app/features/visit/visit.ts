import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE } from '../../core/config/site.config';
import { OpeningHoursService } from '../../core/services/opening-hours.service';
import { formatHour } from '../../core/utils/format';
import { whatsappUrl } from '../../core/utils/cart.utils';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'r66-visit',
  imports: [Icon, RevealDirective, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './visit.html',
  styleUrl: './visit.css',
})
export class Visit {
  protected readonly hours = inject(OpeningHoursService);
  protected readonly site = SITE;

  /** Lunes primero, domingo al final. */
  protected readonly schedule = [...SITE.hours.slice(1), SITE.hours[0]].map((h) => ({
    ...h,
    range: `${formatHour(h.open)} – ${formatHour(h.close)}`,
  }));

  protected readonly mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${SITE.address}, ${SITE.city}`,
  )}`;
  protected readonly chatUrl = whatsappUrl(SITE.whatsapp, `¡Hola ${SITE.name}! Tengo una consulta 🍔`);
  protected readonly instagramUrl = `https://instagram.com/${SITE.instagram}`;
}
