import { OpeningHours } from '../config/site.config';
import { formatHour } from './format';

export interface LocalTime {
  /** 0 = domingo */
  day: number;
  /** Hora decimal: 13.5 = 13:30 */
  hour: number;
}

export interface OpenStatus {
  isOpen: boolean;
  label: string;
}

/** Hora actual en la zona horaria del local, independiente de la zona del visitante. */
export function localTimeIn(timeZone: string, date = new Date()): LocalTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return { day: days.indexOf(get('weekday')), hour: Number(get('hour')) + Number(get('minute')) / 60 };
}

export function openStatus(hours: readonly OpeningHours[], now: LocalTime): OpenStatus {
  const byDay = (d: number) => hours.find((h) => h.day === ((d + 7) % 7));
  const today = byDay(now.day);
  const yesterday = byDay(now.day - 1);

  // Turno de ayer que se extiende pasada la medianoche (ej.: viernes hasta las 02:00).
  if (yesterday && yesterday.close > 24 && now.hour < yesterday.close - 24) {
    return { isOpen: true, label: `Abierto · cierra a las ${formatHour(yesterday.close)}` };
  }
  if (today && now.hour >= today.open && now.hour < today.close) {
    return { isOpen: true, label: `Abierto · cierra a las ${formatHour(today.close)}` };
  }
  if (today && now.hour < today.open) {
    return { isOpen: false, label: `Cerrado · abre hoy a las ${formatHour(today.open)}` };
  }
  const tomorrow = byDay(now.day + 1);
  return {
    isOpen: false,
    label: tomorrow ? `Cerrado · abre mañana a las ${formatHour(tomorrow.open)}` : 'Cerrado',
  };
}
