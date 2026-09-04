/**
 * Hermanos Jota — Catálogo de productos
 * Datos estáticos + helpers para cargar, filtrar y renderizar el catálogo.
 */

const PRODUCTS = [
  {
    id: 1,
    nombre: "Aparador Uspallata",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    descripcionCorta: "Almacenamiento amplio con silueta atemporal.",
    medidas: "180 × 45 × 75 cm",
    materiales: "Nogal macizo FSC®, herrajes de latón",
    acabado: "Aceite natural ecológico",
    apilables: "No",
    incluye: "Aparador completo, anclajes anti-vuelco y guía de cuidado",
    precio: 428000,
    imagen: "./Images/Aparador Uspallata.png",
    destacado: true,
  },
  {
    id: 2,
    nombre: "Biblioteca Recoleta",
    descripcion:
      "Estantería modular de ritmo vertical, pensada para libros, cerámica y objetos de colección. Un homenaje a los interiores clásicos de Recoleta, sin recargar el espacio.",
    descripcionCorta: "Estantería modular de nogal y estantes abiertos.",
    medidas: "90 × 35 × 220 cm",
    materiales: "Nogal argentino, contrachapado de abedul certificado FSC",
    acabado: "Barniz al agua de bajo VOC, mate",
    apilables: "Módulos apilables hasta 3 unidades",
    incluye: "Estructura, estantes regulables y kit de anclaje a muro",
    precio: 312000,
    imagen: "./Images/Biblioteca Recoleta.png",
    destacado: true,
  },
  {
    id: 3,
    nombre: "Butaca Mendoza",
    descripcion:
      "Butaca de lectura con respaldo envolvente y asiento profundo. Tapizado en lana virgen y estructura de madera curvada que invita a quedarse.",
    descripcionCorta: "Butaca envolvente tapizada en lana virgen.",
    medidas: "78 × 86 × 92 cm",
    materiales: "Estructura de roble, tapizado de lana merino, relleno de látex natural",
    acabado: "Aceite de linaza; tapizado con tratamiento antimanchas natural",
    apilables: "No",
    incluye: "Butaca y funda de protección para traslado",
    precio: 265000,
    imagen: "./Images/Butaca Mendoza.png",
    destacado: false,
  },
  {
    id: 4,
    nombre: "Sillón Copacabana",
    descripcion:
      "Sillón lounge de inspiración modernista: asiento bajo, brazos abiertos y una madera que dialoga con textiles cálidos. Ideal para rincones de conversación.",
    descripcionCorta: "Sillón lounge de inspiración modernista.",
    medidas: "85 × 90 × 78 cm",
    materiales: "Fresno macizo, cuerina vegetal, cinchas de yute",
    acabado: "Laca mate al agua; cuerina con cera de carnauba",
    apilables: "No",
    incluye: "Sillón y almohadón lumbar a tono",
    precio: 298000,
    imagen: "./Images/Sillón Copacabana.png",
    destacado: true,
  },
  {
    id: 5,
    nombre: "Mesa de Centro Araucaria",
    descripcion:
      "Mesa baja con sobre de madera maciza y un vaciado central para bandejas o libros. El veteado de cada pieza es único, como los bosques de araucarias.",
    descripcionCorta: "Mesa baja de madera maciza con vaciado central.",
    medidas: "120 × 70 × 40 cm",
    materiales: "Petiribí macizo, patas de acero recubierto",
    acabado: "Aceite duro natural, resistente al agua",
    apilables: "No",
    incluye: "Mesa, fieltros protectores y paño de mantenimiento",
    precio: 189000,
    imagen: "./Images/Mesa de Centro Araucaria.png",
    destacado: false,
  },
  {
    id: 6,
    nombre: "Mesa de Noche Aconcagua",
    descripcion:
      "Mesa de noche compacta con cajón silencioso y un estante abierto. Proporciones contenidas para dormitorios pequeños sin perder carácter.",
    descripcionCorta: "Mesa de noche compacta con cajón silencioso.",
    medidas: "50 × 40 × 55 cm",
    materiales: "Roble europeo, correderas de cierre suave, tirador de bronce",
    acabado: "Cera natural y aceite de tung",
    apilables: "No",
    incluye: "Mesa de noche y tornillería oculta",
    precio: 98000,
    imagen: "./Images/Mesa de Noche Aconcagua.png",
    destacado: false,
  },
  {
    id: 7,
    nombre: "Sofá Patagonia",
    descripcion:
      "Sofá de tres cuerpos con asiento profundo y respaldo de pluma. Líneas rectas, cojines desmontables y una paleta que evoca la estepa patagónica.",
    descripcionCorta: "Sofá de tres cuerpos con cojines desmontables.",
    medidas: "240 × 95 × 85 cm",
    materiales: "Estructura de eucalipto FSC, tapizado de lino, relleno mixto pluma/látex",
    acabado: "Lino prelavado; pies de nogal aceitado",
    apilables: "No",
    incluye: "Sofá, 3 respaldos, 2 almohadones y fundas extraíbles",
    precio: 890000,
    imagen: "./Images/Sofá Patagonia.png",
    destacado: true,
  },
  {
    id: 8,
    nombre: "Mesa Comedor Pampa",
    descripcion:
      "Mesa de comedor extensible para seis a ocho personas. El sobre continuo de madera invita a reuniones largas; las patas en A liberan espacio para las sillas.",
    descripcionCorta: "Mesa extensible para seis a ocho comensales.",
    medidas: "180–240 × 95 × 75 cm",
    materiales: "Paraíso macizo, mecanismo de extensión de acero, herrajes ocultos",
    acabado: "Aceite natural de uso intenso, satinado",
    apilables: "No",
    incluye: "Mesa, extensión central y llave de ajuste",
    precio: 540000,
    imagen: "./Images/Mesa Comedor Pampa.png",
    destacado: false,
  },
  {
    id: 9,
    nombre: "Sillas Córdoba",
    descripcion:
      "Set de sillas de comedor con asiento de contrachapado nogal y estructura tubular. Apilables, livianas y pensadas para el uso diario en casa o en el estudio.",
    descripcionCorta: "Set de 4 sillas apilables de nogal y acero.",
    medidas: "45 × 52 × 80 cm",
    materiales: "Contrachapado nogal, tubo de acero",
    acabado: "Laca mate, pintura epoxi",
    apilables: "Hasta 6 sillas",
    incluye: "Set de 4 sillas",
    precio: 246000,
    imagen: "./Images/Sillas Córdoba.png",
    destacado: false,
  },
  {
    id: 10,
    nombre: "Escritorio Costa",
    descripcion:
      "Escritorio de trabajo con cajonera lateral y pasacables integrado. Superficie amplia para laptop y lámpara, con la calidez de la madera a la vista.",
    descripcionCorta: "Escritorio con cajonera y pasacables integrado.",
    medidas: "140 × 70 × 75 cm",
    materiales: "Guatambú macizo, cajones de abedul, pasacables de cuero vegetal",
    acabado: "Aceite duro mate; interior de cajones en cera",
    apilables: "No",
    incluye: "Escritorio, cajonera de 3 cajones y bandeja organizadora",
    precio: 354000,
    imagen: "./Images/Escritorio Costa.png",
    destacado: false,
  },
  {
    id: 11,
    nombre: "Silla de Trabajo Belgrano",
    descripcion:
      "Silla de escritorio ergonómica con estructura de madera y asiento tapizado. Sin plásticos visibles: una pieza de oficio para jornadas largas.",
    descripcionCorta: "Silla ergonómica de madera y tapizado de lana.",
    medidas: "62 × 62 × 92–102 cm (altura regulable)",
    materiales: "Haya vaporizada, tapizado de lana, mecanismo de gas certificado",
    acabado: "Laca mate al agua; ruedas de goma para piso de madera",
    apilables: "No",
    incluye: "Silla, ruedas y patas fijas intercambiables",
    precio: 187000,
    imagen: "./Images/Silla de Trabajo Belgrano.png",
    destacado: false,
  },
];

/** Simula una llamada asíncrona al catálogo (p. ej. una API). */
function fetchProducts(delay = 700) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS.map((product) => ({ ...product })));
    }, delay);
  });
}

function getProductById(id) {
  const numericId = Number(id);
  return PRODUCTS.find((product) => product.id === numericId) || null;
}

function getFeaturedProducts() {
  return PRODUCTS.filter((product) => product.destacado);
}

function filterProductsByName(products, query) {
  const term = query.trim().toLowerCase();
  if (!term) return products;
  return products.filter((product) => product.nombre.toLowerCase().includes(term));
}

function formatPrice(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.innerHTML = `
    <a class="product-card__media" href="producto.html?id=${product.id}" aria-label="Ver ${product.nombre}">
      <img src="${product.imagen}" alt="${product.nombre}" loading="lazy" width="600" height="450">
    </a>
    <div class="product-card__body">
      <h3 class="product-card__title">
        <a href="producto.html?id=${product.id}">${product.nombre}</a>
      </h3>
      <p class="product-card__excerpt">${product.descripcionCorta}</p>
      <div class="product-card__footer">
        <p class="product-card__price">${formatPrice(product.precio)}</p>
        <a class="text-link" href="producto.html?id=${product.id}">Ver detalle</a>
      </div>
    </div>
  `;
  return article;
}

function renderProductGrid(container, products) {
  if (!container) return;
  container.innerHTML = "";

  if (!products.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No encontramos piezas con ese nombre. Probá con otra búsqueda.";
    container.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  products.forEach((product) => fragment.appendChild(createProductCard(product)));
  container.appendChild(fragment);
}
