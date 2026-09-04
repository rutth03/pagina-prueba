/**
 * Hermanos Jota — Lógica global
 * Carrito (localStorage), navegación, catálogo asíncrono, detalle y contacto.
 */

const CART_STORAGE_KEY = "hermanosJotaCart";

const Cart = {
  getItems() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  save(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    this.updateBadge();
    this.renderDrawer();
  },

  count() {
    return this.getItems().reduce((total, item) => total + item.quantity, 0);
  },

  add(product) {
    const items = this.getItems();
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        quantity: 1,
      });
    }
    this.save(items);
  },

  setQuantity(id, quantity) {
    const next = this.getItems()
      .map((item) => (item.id === id ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);
    this.save(next);
  },

  remove(id) {
    this.save(this.getItems().filter((item) => item.id !== id));
  },

  clear() {
    this.save([]);
  },

  updateBadge() {
    const count = this.count();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(count);
      el.hidden = count === 0;
    });
  },

  renderDrawer() {
    const list = document.querySelector("[data-cart-list]");
    const totalEl = document.querySelector("[data-cart-total]");
    if (!list || !totalEl) return;

    const items = this.getItems();
    list.innerHTML = "";

    if (!items.length) {
      list.innerHTML = `<li class="cart-empty">Tu carrito está vacío.</li>`;
      totalEl.textContent = formatPrice(0);
      return;
    }

    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${item.imagen}" alt="" width="64" height="64">
        <div>
          <p class="cart-item__name">${item.nombre}</p>
          <p class="cart-item__meta">${formatPrice(item.precio)} · ×${item.quantity}</p>
          <div class="cart-item__actions">
            <button type="button" data-qty-minus="${item.id}" aria-label="Quitar una unidad">−</button>
            <button type="button" data-qty-plus="${item.id}" aria-label="Agregar una unidad">+</button>
            <button type="button" class="linkish" data-remove="${item.id}">Quitar</button>
          </div>
        </div>
      `;
      fragment.appendChild(li);
    });
    list.appendChild(fragment);

    const total = items.reduce((sum, item) => sum + item.precio * item.quantity, 0);
    totalEl.textContent = formatPrice(total);
  },
};

function currentPage() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  return file === "" ? "index.html" : file;
}

function initNav() {
  const page = currentPage();
  document.querySelectorAll("[data-nav] a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
}

function initCartUI() {
  const drawer = document.querySelector("[data-cart-drawer]");
  const overlay = document.querySelector("[data-cart-overlay]");
  const openers = document.querySelectorAll("[data-open-cart]");
  const closer = document.querySelector("[data-close-cart]");

  const open = () => {
    drawer?.classList.add("is-open");
    overlay?.classList.add("is-open");
    drawer?.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    drawer?.classList.remove("is-open");
    overlay?.classList.remove("is-open");
    drawer?.setAttribute("aria-hidden", "true");
  };

  openers.forEach((btn) => btn.addEventListener("click", open));
  closer?.addEventListener("click", close);
  overlay?.addEventListener("click", close);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  document.querySelector("[data-cart-list]")?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.dataset.qtyMinus) {
      const id = Number(target.dataset.qtyMinus);
      const item = Cart.getItems().find((entry) => entry.id === id);
      if (item) Cart.setQuantity(id, item.quantity - 1);
    }
    if (target.dataset.qtyPlus) {
      const id = Number(target.dataset.qtyPlus);
      const item = Cart.getItems().find((entry) => entry.id === id);
      if (item) Cart.setQuantity(id, item.quantity + 1);
    }
    if (target.dataset.remove) {
      Cart.remove(Number(target.dataset.remove));
    }
  });

  Cart.updateBadge();
  Cart.renderDrawer();
}

async function initHome() {
  const grid = document.querySelector("[data-featured-grid]");
  const loader = document.querySelector("[data-loader]");
  if (!grid) return;

  loader?.removeAttribute("hidden");
  const products = await fetchProducts(550);
  const featured = products.filter((product) => product.destacado).slice(0, 4);
  loader?.setAttribute("hidden", "");
  renderProductGrid(grid, featured);
}

async function initCatalog() {
  const grid = document.querySelector("[data-catalog-grid]");
  const loader = document.querySelector("[data-loader]");
  const search = document.querySelector("[data-product-search]");
  const countEl = document.querySelector("[data-result-count]");
  if (!grid) return;

  loader?.removeAttribute("hidden");
  grid.setAttribute("aria-busy", "true");

  const products = await fetchProducts(800);
  let visible = products;

  const paint = () => {
    renderProductGrid(grid, visible);
    if (countEl) {
      countEl.textContent =
        visible.length === products.length
          ? `${visible.length} piezas`
          : `${visible.length} de ${products.length} piezas`;
    }
  };

  loader?.setAttribute("hidden", "");
  grid.setAttribute("aria-busy", "false");
  paint();

  search?.addEventListener("input", (event) => {
    const query = event.target.value;
    visible = filterProductsByName(products, query);
    paint();
  });
}

function initProductDetail() {
  const root = document.querySelector("[data-product-detail]");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id"));
  const notFound = document.querySelector("[data-product-not-found]");

  if (!product) {
    root.hidden = true;
    if (notFound) notFound.hidden = false;
    return;
  }

  root.hidden = false;
  if (notFound) notFound.hidden = true;

  document.title = `${product.nombre} — Hermanos Jota`;

  root.querySelector("[data-product-image]").src = product.imagen;
  root.querySelector("[data-product-image]").alt = product.nombre;
  root.querySelector("[data-product-name]").textContent = product.nombre;
  root.querySelector("[data-product-price]").textContent = formatPrice(product.precio);
  root.querySelector("[data-product-copy]").textContent = product.descripcion;
  root.querySelector("[data-spec-medidas]").textContent = product.medidas;
  root.querySelector("[data-spec-materiales]").textContent = product.materiales;
  root.querySelector("[data-spec-acabado]").textContent = product.acabado;
  root.querySelector("[data-spec-apilables]").textContent = product.apilables;
  root.querySelector("[data-spec-incluye]").textContent = product.incluye;

  const addBtn = root.querySelector("[data-add-to-cart]");
  const feedback = root.querySelector("[data-add-feedback]");

  addBtn?.addEventListener("click", () => {
    Cart.add(product);
    if (feedback) {
      feedback.textContent = `${product.nombre} se agregó al carrito.`;
      feedback.hidden = false;
    }
    document.querySelector("[data-open-cart]")?.focus();
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const success = document.querySelector("[data-form-success]");

  const clearErrors = () => {
    form.querySelectorAll("[data-error-for]").forEach((el) => {
      el.textContent = "";
    });
    form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
  };

  const showError = (field, message) => {
    const input = form.querySelector(`[name="${field}"]`);
    const error = form.querySelector(`[data-error-for="${field}"]`);
    input?.classList.add("is-invalid");
    if (error) error.textContent = message;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    if (success) success.hidden = true;

    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const email = String(data.get("email") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();

    let valid = true;
    if (!nombre) {
      showError("nombre", "Ingresá tu nombre.");
      valid = false;
    }
    if (!email) {
      showError("email", "Ingresá tu correo electrónico.");
      valid = false;
    } else if (!isValidEmail(email)) {
      showError("email", "El formato del correo no es válido.");
      valid = false;
    }
    if (!mensaje) {
      showError("mensaje", "Escribí un mensaje.");
      valid = false;
    }

    if (!valid) return;

    form.reset();
    if (success) {
      success.hidden = false;
      success.innerHTML = `
        <strong>Gracias, ${nombre}.</strong>
        Recibimos tu consulta y te responderemos a <em>${email}</em> a la brevedad.
      `;
      success.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCartUI();
  initHome();
  initCatalog();
  initProductDetail();
  initContactForm();
});
