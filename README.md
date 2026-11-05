# ROUTE 66 DINER

Landing page para una hamburguesería ficticia inspirada en los diners americanos de los años 50 y 60, sobre la Ruta 66.
Es un proyecto de portfolio: identidad visual propia, ilustraciones vectoriales hechas a mano y un flujo de pedido real que se envía por WhatsApp.

## Qué tiene

- **Hero animado.** La hamburguesa cae capa por capa al cargar la página. Al hacer scroll se desarma, muestra el nombre de cada ingrediente y se vuelve a armar.
- **Menú por categorías:** burgers, para picar, milkshakes y combos. Tiene pestañas accesibles (se navegan con las flechas) y cards con sellos (*best seller*, *veggie*, *picante*, etc.). Al pasar el mouse, la hamburguesa de la card se "abre".
- **Carrito persistente.** Se arma con un servicio basado en signals y se guarda en LocalStorage. Ofrece cantidades, delivery o retiro, barra de progreso hacia el envío gratis y validación del formulario.
- **Pedido por WhatsApp.** Genera un mensaje con el detalle, los totales y los datos del cliente, y abre `wa.me`.
- **Combo destacado.** El ahorro se calcula automáticamente a partir de los productos que incluye.
- **Estado "Abierto / Cerrado" en vivo.** Usa la hora de Montevideo y contempla horarios que pasan la medianoche.
- **Responsive y accesible.** Incluye skip link, foco visible, `aria-*` en el carrito y las pestañas, y respeta `prefers-reduced-motion`.
- **Sin imágenes externas.** Todo el arte es SVG propio (`src/app/shared/art/art.ts`), así que pesa poco y escala perfecto.

## Stack

- Angular 20: componentes standalone, signals, control flow (`@if`/`@for`) y **zoneless** (sin zone.js).
- TypeScript en modo estricto.
- HTML5 y CSS3 sin frameworks de estilos: custom properties, container queries y `position: sticky`.
- Reactive Forms para el checkout.
- Google Fonts: Bungee (títulos), Oswald (subtítulos) y Poppins (textos).
- Íconos de trazo con el estilo de Lucide, incluidos como un set mínimo propio (sin dependencia extra).

No tiene backend: el catálogo vive en `core/data/menu.data.ts` y se consume a través de `MenuService`.

## Cómo correrlo

Requisitos: Node.js 20.19+ o 22.12+.

```bash
npm install
npm start        # http://localhost:4200
npm run build    # build de producción en dist/
```

## Estructura

```
src/app
├── core/
│   ├── config/site.config.ts     # nombre, WhatsApp, dirección, horarios, envío
│   ├── data/menu.data.ts         # catálogo y categorías
│   ├── models/                   # Product, CartLine, OrderDetails…
│   ├── services/                 # Cart, Menu, Storage, Toast, OpeningHours
│   └── utils/                    # lógica pura y testeable (totales, mensaje, horarios)
├── shared/
│   ├── art/                      # ilustraciones SVG + componente que las renderiza
│   ├── burger-art/               # hamburguesa por capas (animable con la variable CSS --e)
│   ├── product-art/              # elige la ilustración según el producto
│   ├── icon/                     # íconos
│   ├── reveal/                   # directiva de aparición al hacer scroll
│   ├── price/                    # pipe de precio en UYU
│   └── section-heading/
├── layout/                       # navbar, marquee, footer, toast
└── features/                     # hero, menú, combo, historia, visitanos, carrito
```

## Cómo adaptarlo a un cliente real

1. Cambiá los datos del negocio en `core/config/site.config.ts`: número de WhatsApp, dirección, horarios y costo de envío.
2. Editá productos y precios en `core/data/menu.data.ts`. Cada burger se ilustra con una lista de capas, por ejemplo `['bunTop', 'cheese', 'patty', 'bunBottom']`.
3. Ajustá los colores en las variables de `src/styles.css` (`--cherry`, `--cream`, `--mustard`…).
4. Para usar fotos reales, reemplazá `ProductArt` en la card por un `<img>` con `NgOptimizedImage`.

## Decisiones técnicas

- **La animación del hero no pasa por Angular.** Un listener de scroll pasivo con `requestAnimationFrame` escribe una sola variable CSS (`--e`, de 0 a 1). Las capas calculan su desplazamiento en CSS con unidades `cqw`, así que no hay detección de cambios en cada frame.
- **El carrito persiste solo ids y cantidades.** Los precios siempre se resuelven desde el catálogo. Al restaurarse, los datos de LocalStorage se sanean: se descartan productos inexistentes, cantidades inválidas y duplicados.
- **La lógica de negocio vive en funciones puras** (`core/utils`), separadas de los servicios, para poder testearla sin TestBed.

## Próximos pasos posibles

- Tests unitarios de `cart.utils` y `hours.utils`.
- Mover el catálogo a una API o CMS sin tocar los componentes.
- SSR/prerender para mejorar el SEO.
- Selector de sabor de shake dentro del combo.

---

Marca ficticia creada como proyecto de portfolio. Diseño y desarrollo: Alfredo Albornoz.
