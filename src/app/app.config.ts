import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';

/**
 * Aplicación zoneless: la detección de cambios la disparan los signals,
 * sin zone.js (menos peso y mejor rendimiento en la animación del hero).
 */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
};
