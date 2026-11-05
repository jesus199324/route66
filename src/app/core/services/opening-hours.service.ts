import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { SITE } from '../config/site.config';
import { localTimeIn, OpenStatus, openStatus } from '../utils/hours.utils';

/** Calcula si el local está abierto ahora (en hora de Montevideo) y se actualiza cada minuto. */
@Injectable({ providedIn: 'root' })
export class OpeningHoursService {
  readonly hours = SITE.hours;
  readonly status = signal<OpenStatus>(this.compute());
  readonly today = signal(localTimeIn(SITE.timeZone).day);

  constructor() {
    const interval = setInterval(() => {
      this.status.set(this.compute());
      this.today.set(localTimeIn(SITE.timeZone).day);
    }, 60_000);
    inject(DestroyRef).onDestroy(() => clearInterval(interval));
  }

  private compute(): OpenStatus {
    return openStatus(SITE.hours, localTimeIn(SITE.timeZone));
  }
}
