/**
 * Ilustraciones vectoriales propias de ROUTE 66 DINER.
 *
 * Archivo TypeScript puro (sin dependencias de Angular) para que el mismo arte
 * pueda reutilizarse en componentes, tests o herramientas de build.
 * Todas las piezas usan colores planos con sombras duras, en línea con la
 * estética retro de los carteles de diner de los años 50.
 */

export type LayerType =
  | 'bunTop'
  | 'lettuce'
  | 'tomato'
  | 'cheese'
  | 'patty'
  | 'veggiePatty'
  | 'bacon'
  | 'onion'
  | 'pickles'
  | 'sauce'
  | 'bunBottom';

export interface LayerArt {
  /** viewBox del SVG (ancho siempre 400). */
  viewBox: string;
  /** Solapamiento con la capa anterior, como fracción del ancho (margin-top negativo). */
  overlap: number;
  /** Nombre del ingrediente que se muestra en la animación del hero. */
  label: string;
  markup: string;
}

const OUTLINE = '#191919';

export const LAYERS: Record<LayerType, LayerArt> = {
  bunTop: {
    viewBox: '0 0 400 180',
    overlap: 0,
    label: 'Pan brioche',
    markup: `
      <path d="M22 162C22 72 102 14 200 14s178 58 178 148c0 9-6 14-14 14H36c-8 0-14-5-14-14Z" fill="#D9893B" stroke="${OUTLINE}" stroke-width="6"/>
      <path d="M25 140c58 18 292 18 350 0v22c0 9-6 14-14 14H39c-8 0-14-5-14-14Z" fill="#B8692A"/>
      <path d="M78 78c26-30 64-44 104-46" fill="none" stroke="#F4BC6C" stroke-width="14" stroke-linecap="round"/>
      <path d="M58 112c4-8 8-14 12-18" fill="none" stroke="#F4BC6C" stroke-width="10" stroke-linecap="round"/>
      <g fill="#FFF3D6" stroke="${OUTLINE}" stroke-width="2.5">
        <ellipse cx="200" cy="44" rx="9" ry="5" transform="rotate(-12 200 44)"/>
        <ellipse cx="248" cy="58" rx="9" ry="5" transform="rotate(18 248 58)"/>
        <ellipse cx="152" cy="64" rx="9" ry="5" transform="rotate(-24 152 64)"/>
        <ellipse cx="296" cy="88" rx="9" ry="5" transform="rotate(30 296 88)"/>
        <ellipse cx="214" cy="86" rx="9" ry="5" transform="rotate(6 214 86)"/>
        <ellipse cx="112" cy="104" rx="9" ry="5" transform="rotate(-30 112 104)"/>
        <ellipse cx="262" cy="112" rx="9" ry="5" transform="rotate(14 262 112)"/>
        <ellipse cx="170" cy="112" rx="9" ry="5" transform="rotate(-8 170 112)"/>
        <ellipse cx="330" cy="124" rx="9" ry="5" transform="rotate(38 330 124)"/>
        <ellipse cx="72" cy="132" rx="9" ry="5" transform="rotate(-36 72 132)"/>
      </g>`,
  },

  lettuce: {
    viewBox: '0 0 400 54',
    overlap: 0.045,
    label: 'Lechuga fresca',
    markup: `
      <path d="M8 22c14-16 26-16 38 0s26 16 38 0 26-16 38 0 26 16 38 0 26-16 38 0 26 16 38 0 26-16 38 0 26 16 38 0 26-16 38 0 26 16 38 0l-6 18c-120 18-246 18-364 0Z"
        fill="#74B843" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M40 30c40 6 90 8 140 6M220 36c50 2 100-2 140-8" fill="none" stroke="#A7DB6E" stroke-width="5" stroke-linecap="round"/>`,
  },

  tomato: {
    viewBox: '0 0 400 40',
    overlap: 0.035,
    label: 'Tomate',
    markup: `
      <rect x="26" y="5" width="178" height="30" rx="15" fill="#D7393B" stroke="${OUTLINE}" stroke-width="5"/>
      <rect x="196" y="5" width="178" height="30" rx="15" fill="#E5463F" stroke="${OUTLINE}" stroke-width="5"/>
      <g fill="#F7A08B">
        <ellipse cx="70" cy="20" rx="12" ry="5"/><ellipse cx="128" cy="20" rx="12" ry="5"/>
        <ellipse cx="248" cy="20" rx="12" ry="5"/><ellipse cx="318" cy="20" rx="12" ry="5"/>
      </g>`,
  },

  cheese: {
    viewBox: '0 0 400 62',
    overlap: 0.04,
    label: 'Cheddar fundido',
    markup: `
      <path d="M12 8h376v14h-38l-14 28c-3 6-11 6-14 0l-12-28H190l-12 20c-3 5-11 5-14 0l-12-20H70l-10 14c-3 5-10 5-13 0l-9-14H12Z"
        fill="#F2B632" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M30 14h120" stroke="#FFD86B" stroke-width="5" stroke-linecap="round"/>`,
  },

  patty: {
    viewBox: '0 0 400 78',
    overlap: 0.05,
    label: 'Medallón smash',
    markup: `
      <rect x="16" y="6" width="368" height="64" rx="30" fill="#5B2E1A" stroke="${OUTLINE}" stroke-width="6"/>
      <path d="M50 22c90-8 210-8 300 0" fill="none" stroke="#8A4A2A" stroke-width="7" stroke-linecap="round"/>
      <g fill="#3C1D10">
        <circle cx="72" cy="46" r="4"/><circle cx="118" cy="40" r="3"/><circle cx="160" cy="52" r="4"/>
        <circle cx="210" cy="42" r="3"/><circle cx="252" cy="54" r="4"/><circle cx="298" cy="42" r="3"/>
        <circle cx="336" cy="50" r="4"/><circle cx="96" cy="58" r="3"/><circle cx="280" cy="60" r="3"/>
      </g>`,
  },

  veggiePatty: {
    viewBox: '0 0 400 78',
    overlap: 0.05,
    label: 'Medallón de garbanzos',
    markup: `
      <rect x="16" y="6" width="368" height="64" rx="30" fill="#8C5A35" stroke="${OUTLINE}" stroke-width="6"/>
      <path d="M50 22c90-8 210-8 300 0" fill="none" stroke="#B67D4E" stroke-width="7" stroke-linecap="round"/>
      <g fill="#6DA341">
        <circle cx="80" cy="44" r="5"/><circle cx="150" cy="54" r="4"/><circle cx="220" cy="42" r="5"/>
        <circle cx="290" cy="54" r="4"/><circle cx="340" cy="44" r="4"/>
      </g>
      <g fill="#A3324A"><circle cx="118" cy="44" r="4"/><circle cx="256" cy="46" r="4"/><circle cx="190" cy="58" r="3"/></g>`,
  },

  bacon: {
    viewBox: '0 0 400 40',
    overlap: 0.035,
    label: 'Bacon crocante',
    markup: `
      <path d="M20 22c22-16 40 12 62-2s40 12 62-2 40 12 60-2" fill="none" stroke="${OUTLINE}" stroke-width="20" stroke-linecap="round"/>
      <path d="M20 22c22-16 40 12 62-2s40 12 62-2 40 12 60-2" fill="none" stroke="#A8402E" stroke-width="12" stroke-linecap="round"/>
      <path d="M20 22c22-16 40 12 62-2s40 12 62-2 40 12 60-2" fill="none" stroke="#F0A27E" stroke-width="3" stroke-linecap="round"/>
      <path d="M196 20c22-16 40 12 62-2s40 12 62-2 40 12 60-2" fill="none" stroke="${OUTLINE}" stroke-width="20" stroke-linecap="round"/>
      <path d="M196 20c22-16 40 12 62-2s40 12 62-2 40 12 60-2" fill="none" stroke="#B5482F" stroke-width="12" stroke-linecap="round"/>
      <path d="M196 20c22-16 40 12 62-2s40 12 62-2 40 12 60-2" fill="none" stroke="#F0A27E" stroke-width="3" stroke-linecap="round"/>`,
  },

  onion: {
    viewBox: '0 0 400 34',
    overlap: 0.03,
    label: 'Cebolla morada',
    markup: `
      <g fill="#F4E4F0" stroke="${OUTLINE}" stroke-width="4">
        <ellipse cx="90" cy="17" rx="62" ry="11"/><ellipse cx="200" cy="17" rx="62" ry="11"/><ellipse cx="310" cy="17" rx="62" ry="11"/>
      </g>
      <g fill="none" stroke="#9C4F9A" stroke-width="4">
        <ellipse cx="90" cy="17" rx="44" ry="6"/><ellipse cx="200" cy="17" rx="44" ry="6"/><ellipse cx="310" cy="17" rx="44" ry="6"/>
      </g>`,
  },

  pickles: {
    viewBox: '0 0 400 30',
    overlap: 0.03,
    label: 'Pepinillos',
    markup: `
      <g fill="#8DB24A" stroke="${OUTLINE}" stroke-width="4">
        <ellipse cx="80" cy="15" rx="44" ry="10"/><ellipse cx="170" cy="15" rx="44" ry="10"/>
        <ellipse cx="250" cy="15" rx="44" ry="10"/><ellipse cx="330" cy="15" rx="44" ry="10"/>
      </g>
      <g fill="#C9E08A"><ellipse cx="80" cy="15" rx="26" ry="4"/><ellipse cx="170" cy="15" rx="26" ry="4"/>
        <ellipse cx="250" cy="15" rx="26" ry="4"/><ellipse cx="330" cy="15" rx="26" ry="4"/></g>`,
  },

  sauce: {
    viewBox: '0 0 400 34',
    overlap: 0.03,
    label: 'Salsa 66',
    markup: `
      <path d="M22 10h356c4 0 6 4 4 7l-6 6c-6 6-14 6-20 0l-6-5-8 8c-6 6-16 6-22 0l-6-6H120l-10 9c-6 5-14 5-20 0l-8-9H52l-6 5c-6 5-14 4-18-2l-8-9c-2-3 0-4 2-4Z"
        fill="#E8743B" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>`,
  },

  bunBottom: {
    viewBox: '0 0 400 74',
    overlap: 0.05,
    label: 'Base tostada',
    markup: `
      <path d="M22 8h356c8 0 12 6 10 13l-10 36c-3 10-10 14-20 14H42c-10 0-17-4-20-14L12 21c-2-7 2-13 10-13Z"
        fill="#D9893B" stroke="${OUTLINE}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M16 12h368l-3 12H19Z" fill="#F2CB8E"/>
      <path d="M32 50c90 10 246 10 336 0" fill="none" stroke="#B8692A" stroke-width="8" stroke-linecap="round"/>`,
  },
};

/* ------------------------------------------------------------------ */
/*  Acompañamientos y bebidas                                          */
/* ------------------------------------------------------------------ */

export type SideArtKind = 'fries' | 'cheeseFries' | 'rings' | 'shake';

export interface SideArt {
  viewBox: string;
  markup: string;
}

function fries(cheese: boolean): SideArt {
  const sticks = [
    [84, 44, -16], [108, 24, -9], [134, 34, -4], [158, 12, -1], [182, 28, 3], [206, 10, 6], [230, 30, 11], [252, 46, 17],
    [120, 54, -12], [196, 50, 9],
  ]
    .map(
      ([x, y, r]) =>
        `<rect x="${x}" y="${y}" width="26" height="130" rx="4" transform="rotate(${r} ${x + 11} ${y + 130})" fill="#F6C443" stroke="${OUTLINE}" stroke-width="4"/>`,
    )
    .join('');
  const topping = cheese
    ? `<path d="M90 92c20-18 40 6 60-8s40 10 60-6 38 8 54-4l4 20c-8 12-18 22-26 10-10 14-22 4-32 14-10-10-20 6-34-4-12 12-24-2-34 4-10-6-20 6-28-6Z" fill="#F2A322" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
       <g fill="#A8402E" stroke="${OUTLINE}" stroke-width="2.5"><rect x="118" y="88" width="16" height="10" rx="3"/><rect x="170" y="80" width="16" height="10" rx="3"/><rect x="226" y="86" width="16" height="10" rx="3"/></g>`
    : '';
  return {
    viewBox: '0 0 360 280',
    markup: `
      ${sticks}
      ${topping}
      <path d="M70 112h220l-26 150c-2 10-8 14-18 14H114c-10 0-16-4-18-14Z" fill="#B92732" stroke="${OUTLINE}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M84 126h192l-6 32H90Z" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="4"/>
      <text x="180" y="150" text-anchor="middle" font-family="Bungee, Impact, sans-serif" font-size="20" fill="#B92732">R66</text>
      <circle cx="180" cy="214" r="26" fill="#F3E6C9" stroke="${OUTLINE}" stroke-width="4"/>
      <text x="180" y="222" text-anchor="middle" font-family="Bungee, Impact, sans-serif" font-size="20" fill="#191919">66</text>`,
  };
}

function rings(): SideArt {
  const ring = (cx: number, cy: number, r: number) => `
    <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.62}" fill="#E3A447" stroke="${OUTLINE}" stroke-width="5"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.52}" ry="${r * 0.3}" fill="#F3E6C9" stroke="${OUTLINE}" stroke-width="4"/>
    <path d="M${cx - r * 0.7} ${cy - r * 0.32}c${r * 0.3} -${r * 0.22} ${r * 0.7} -${r * 0.26} ${r} -${r * 0.2}" fill="none" stroke="#F9D08A" stroke-width="5" stroke-linecap="round"/>`;
  return {
    viewBox: '0 0 360 280',
    markup: `
      <ellipse cx="180" cy="236" rx="150" ry="30" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5"/>
      <path d="M40 226c40 22 240 22 280 0" fill="none" stroke="#B92732" stroke-width="6" stroke-dasharray="14 10"/>
      ${ring(120, 196, 70)}${ring(240, 192, 68)}${ring(180, 140, 72)}${ring(190, 84, 56)}`,
  };
}

const SHAKE_FLAVORS: Record<string, { body: string; top: string }> = {
  vanilla: { body: '#F7EBCF', top: '#FFF8E8' },
  chocolate: { body: '#7A4A30', top: '#A06A48' },
  strawberry: { body: '#F2A3B3', top: '#FBD0D8' },
  mustard: { body: '#F2C46B', top: '#FBE2A6' },
};

function shake(flavor: string): SideArt {
  const c = SHAKE_FLAVORS[flavor] ?? SHAKE_FLAVORS['vanilla'];
  return {
    viewBox: '0 0 360 300',
    markup: `
      <path d="M206 6l-24 92" stroke="${OUTLINE}" stroke-width="18" stroke-linecap="round"/>
      <path d="M206 6l-24 92" stroke="#B92732" stroke-width="10" stroke-linecap="round"/>
      <path d="M204 14l-4 14M196 44l-4 14M188 74l-4 14" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M112 96c-6-26 20-40 36-30 6-24 48-28 60-6 18-12 46 4 40 30 18 6 18 30 0 34H112c-18-4-18-28 0-28Z"
        fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="184" cy="56" r="14" fill="#B92732" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M186 42c4-14 14-22 24-24" fill="none" stroke="${OUTLINE}" stroke-width="4" stroke-linecap="round"/>
      <path d="M100 124h160l-22 128H122Z" fill="${c.body}" stroke="${OUTLINE}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M104 146h152" stroke="${c.top}" stroke-width="8"/>
      <path d="M122 160l14 84" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="10" stroke-linecap="round"/>
      <path d="M122 252h116l-8 18H130Z" fill="#C9CED3" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M150 270h60v14c0 8-6 12-14 12h-32c-8 0-14-4-14-12Z" fill="#E4E8EB" stroke="${OUTLINE}" stroke-width="5"/>`,
  };
}

export function sideArt(kind: SideArtKind, flavor = 'vanilla'): SideArt {
  switch (kind) {
    case 'fries':
      return fries(false);
    case 'cheeseFries':
      return fries(true);
    case 'rings':
      return rings();
    case 'shake':
      return shake(flavor);
  }
}

/** Arma un SVG completo a partir de un viewBox y su contenido. */
export function svgDocument(viewBox: string, markup: string, className = ''): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="${className}" aria-hidden="true" focusable="false">${markup}</svg>`;
}
