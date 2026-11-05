/**
 * Set mínimo de íconos de trazo, basado en el estilo de Lucide (24×24, trazo 2, extremos redondeados).
 * Incluir solo los necesarios evita sumar una dependencia completa de íconos.
 */
const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

export const ICONS = {
  bag: ['M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z', 'M3 6h18', 'M16 10a4 4 0 0 1-8 0'],
  plus: ['M5 12h14', 'M12 5v14'],
  minus: ['M5 12h14'],
  close: ['M18 6 6 18', 'm6 6 12 12'],
  trash: ['M3 6h18', 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  pin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z', circle(12, 10, 3)],
  clock: [circle(12, 12, 10), 'M12 6v6l4 2'],
  phone: [
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
  ],
  instagram: ['M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z', circle(12, 12, 4), 'M17.5 6.5h.01'],
  chat: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  arrowRight: ['M5 12h14', 'm12 5 7 7-7 7'],
  arrowDown: ['M12 5v14', 'm19 12-7 7-7-7'],
  check: ['M20 6 9 17l-5-5'],
  flame: [
    'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z',
  ],
  star: ['M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26Z'],
  truck: [
    'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2',
    'M15 18H9',
    'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14',
    circle(17, 18, 2),
    circle(7, 18, 2),
  ],
  store: ['M3 9 4.5 4h15L21 9', 'M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0Z', 'M5 13v8h14v-8', 'M10 21v-5h4v5'],
  wheat: ['M12 22V8', 'M12 8c-3 0-4-2-4-5 3 0 4 2 4 5Z', 'M12 8c3 0 4-2 4-5-3 0-4 2-4 5Z', 'M12 14c-3 0-4-2-4-5 3 0 4 2 4 5Z', 'M12 14c3 0 4-2 4-5-3 0-4 2-4 5Z'],
  milk: ['M8 2h8', 'M9 2v3l-3 4v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9l-3-4V2', 'M6 13h12'],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICONS;
