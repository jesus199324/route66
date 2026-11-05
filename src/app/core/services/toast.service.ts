import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
}

/** Notificaciones breves ("Agregado al pedido", "Pedido enviado", etc.). */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  private timer: ReturnType<typeof setTimeout> | undefined;

  readonly current = signal<Toast | null>(null);

  show(message: string, durationMs = 2400): void {
    clearTimeout(this.timer);
    this.current.set({ id: this.nextId++, message });
    this.timer = setTimeout(() => this.current.set(null), durationMs);
  }

  dismiss(): void {
    clearTimeout(this.timer);
    this.current.set(null);
  }
}
