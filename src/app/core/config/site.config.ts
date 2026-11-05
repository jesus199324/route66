/**
 * Datos del negocio centralizados en un solo lugar.
 * ROUTE 66 DINER es una marca ficticia: reemplazá estos valores por los de un cliente real.
 */
export const SITE = {
  name: 'ROUTE 66 DINER',
  /** Número de WhatsApp en formato internacional, sin "+" ni espacios. */
  whatsapp: '59899066066',
  phoneDisplay: '+598 99 066 066',
  instagram: 'route66diner.uy',
  address: 'Bv. Mother Road 1956',
  city: 'Montevideo, Uruguay',
  timeZone: 'America/Montevideo',
  currency: 'UYU',
  locale: 'es-UY',
  delivery: {
    fee: 90,
    freeFrom: 1500,
    eta: '30–45 min',
  },
  /**
   * Horario por día de la semana (0 = domingo). Las horas pueden pasar de 24
   * para indicar que el local cierra después de medianoche (ej.: 26 = 02:00).
   */
  hours: [
    { day: 0, label: 'Domingo', open: 12, close: 23 },
    { day: 1, label: 'Lunes', open: 18, close: 24 },
    { day: 2, label: 'Martes', open: 12, close: 24 },
    { day: 3, label: 'Miércoles', open: 12, close: 24 },
    { day: 4, label: 'Jueves', open: 12, close: 24 },
    { day: 5, label: 'Viernes', open: 12, close: 26 },
    { day: 6, label: 'Sábado', open: 12, close: 26 },
  ],
} as const;

export type OpeningHours = (typeof SITE.hours)[number];
