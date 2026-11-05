import { Injectable } from '@angular/core';

/**
 * Envoltorio seguro de LocalStorage: tolera modo privado, cuotas llenas,
 * JSON corrupto y entornos sin `window` (SSR / tests).
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly store: Storage | null = (() => {
    try {
      return typeof localStorage === 'undefined' ? null : localStorage;
    } catch {
      return null;
    }
  })();

  read<T>(key: string): T | null {
    try {
      const raw = this.store?.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  write(key: string, value: unknown): void {
    try {
      this.store?.setItem(key, JSON.stringify(value));
    } catch {
      /* cuota llena o almacenamiento bloqueado: el carrito sigue funcionando en memoria */
    }
  }

  remove(key: string): void {
    try {
      this.store?.removeItem(key);
    } catch {
      /* noop */
    }
  }
}
