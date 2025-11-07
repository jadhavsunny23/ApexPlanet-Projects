

const PRODUCTS = [
  { id: 'p1', title: 'Cozy Hoodie', price: 1499.00, category: 'Clothing', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60' },
  { id: 'p2', title: 'Comfy Sneakers', price: 2999.00, category: 'Footwear', img: 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880' },
  { id: 'p3', title: 'Minimal Backpack', price: 1899.50, category: 'Accessories', img: 'https://images.unsplash.com/photo-1509762774605-f07235a08f1f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: 'p4', title: 'Stylish Watch', price: 5499.99, category: 'Accessories', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=60' },
  { id: 'p5', title: 'Desk Lamp', price: 1299.00, category: 'Home', img: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=800&q=60' },
  { id: 'p6', title: 'Sunglasses', price: 899.00, category: 'Accessories', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=60' },
  { id: 'p7', title: 'Cup set', price: 649.00, category: 'Home', img: 'https://plus.unsplash.com/premium_photo-1680172800003-7a6bfc963129?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'},
  { id: 'p8', title: 'Charger', price: 599.00, category: 'Accessories', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074'},
  
];

// Utility
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ---------- Cart logic ---------- */
const CART_KEY = 'grayshop_cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  refreshNavCount();
}

function refreshNavCount() {
  const count = Object.values(cart).reduce((s,i)=> s + i.qty, 0);
  const navEls = $$('#navCount');
  navEls.forEach(el => el.textContent = count);
}

/* Add to cart (id) */
function addToCart(id, qty = 1) {
  const prod = PRODUCTS.find(p => p.id === id);
  if (!prod) return;
  if (!cart[id]) cart[id] = { ...prod, qty: 0 };
  cart[id].qty += qty;
  saveCart();
  // if current page has cart list, re-render
  renderCartPage && renderCartPage();
  // small feedback (optional)
  if (typeof window !== 'undefined') {
    // show tiny toast (console fallback)
    console.log(`Added ${prod.title} x${qty} to cart`);
  }
}

/* Remove one or all */
function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  saveCart();
  renderCartPage && renderCartPage();
}

/* Clear cart */
function clearCart() {
  cart = {};
  saveCart();
  renderCartPage && renderCartPage();
}

/* ---------- Rendering for home (featured) ---------- */
function renderHomeFeatured() {
  const grid = $('#homeGrid');
  if (!grid) return;
  grid.innerHTML = '';
  // show first 3 as featured
  PRODUCTS.slice(0,3).forEach(p => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img loading="lazy" src="${p.img}" alt="${escapeHtml(p.title)}">
      <h4>${escapeHtml(p.title)}</h4>
      <div class="price">₹${p.price.toFixed(2)}</div>
      <div class="actions">
        <button class="btn" data-action="view" data-id="${p.id}">Details</button>
        <button class="btn primary" data-action="add" data-id="${p.id}">Add</button>
      </div>
    `;
    grid.appendChild(el);
  });
}

/* ---------- Products page rendering, search/filter/sort ---------- */
function populateCategoryFilter() {
  const select = $('#categoryFilter');
  if (!select) return;
  const cats = Array.from(new Set(PRODUCTS.map(p => p.category)));
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });
}

function renderProductsGrid(list) {
  const grid = $('#productGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  list.forEach(p => {
    const a = document.createElement('article');
    a.className = 'card';
    a.innerHTML = `
      <img loading="lazy" src="${p.img}" alt="${escapeHtml(p.title)}">
      <h4>${escapeHtml(p.title)}</h4>
      <div class="price">₹${p.price.toFixed(2)}</div>
      <div class="actions">
        <button class="btn" data-action="view" data-id="${p.id}">Details</button>
        <button class="btn primary" data-action="add" data-id="${p.id}">Add to cart</button>
      </div>
    `;
    frag.appendChild(a);
  });
  grid.appendChild(frag);
}

/* Search / Filter / Sort */
function applyFilters() {
  const q = ($('#searchInput') ? $('#searchInput').value.trim().toLowerCase() : '');
  const cat = ($('#categoryFilter') ? $('#categoryFilter').value : 'all');
  const sort = ($('#sortSelect') ? $('#sortSelect').value : 'default');

  let result = PRODUCTS.slice().filter(p => {
    const matchQ = q === '' || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchCat = cat === 'all' || p.category === cat;
    return matchQ && matchCat;
  });

  if (sort === 'price-asc') result.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);

  renderProductsGrid(result);
}

/* ---------- Cart page renderer ---------- */
function renderCartPage() {
  const listEl = $('#cartList');
  const subtotalEl = $('#subtotal');
  const shippingEl = $('#shipping');
  const totalEl = $('#total');
  if (!listEl) return; // not on cart page

  listEl.innerHTML = '';
  let subtotal = 0;
  Object.values(cart).forEach(item => {
    subtotal += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      <img loading="lazy" src="${item.img}" alt="${escapeHtml(item.title)}">
      <div style="flex:1">
        <div style="font-weight:600">${escapeHtml(item.title)}</div>
        <div style="color:var(--muted)">₹${item.price.toFixed(2)} × ${item.qty}</div>
      </div>
      <div style="text-align:right">
        <div style="font-weight:700">₹${(item.price * item.qty).toFixed(2)}</div>
        <div style="margin-top:6px">
          <button class="btn" data-action="dec" data-id="${item.id}">−</button>
          <button class="btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
      </div>
    `;
    listEl.appendChild(li);
  });

  const shipping = subtotal > 0 ? 49.00 : 0.00;
  const total = subtotal + shipping;
  subtotalEl.textContent = subtotal.toFixed(2);
  shippingEl.textContent = shipping.toFixed(2);
  totalEl.textContent = total.toFixed(2);

  // bind qty buttons
  listEl.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (action === 'inc') changeQty(id, 1);
      if (action === 'dec') changeQty(id, -1);
    });
  });
}

/* ---------- Helpers ---------- */
function escapeHtml(str){ return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }

/* ---------- Wire up page events ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // refresh nav count everywhere
  refreshNavCount();

  // Home featured
  renderHomeFeatured();

  // Products page setup
  if ($('#productGrid')) {
    populateCategoryFilter();
    applyFilters();

    // search/filter event listeners
    $('#searchInput').addEventListener('input', () => applyFilters());
    $('#categoryFilter').addEventListener('change', () => applyFilters());
    $('#sortSelect').addEventListener('change', () => applyFilters());

    // delegate add/view buttons
    $('#productGrid').addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (action === 'add') addToCart(id, 1);
      if (action === 'view') {
        alert('Product details are part of future expansion. For now, try adding to cart from here.');
      }
    });
  }

  // Cart page actions
  if ($('#cartList')) {
    renderCartPage();
    $('#clearCart').addEventListener('click', () => {
      if (confirm('Clear the cart?')) clearCart();
    });
    $('#checkout').addEventListener('click', () => {
      if (Object.keys(cart).length === 0) {
        alert('Your cart is empty.');
        return;
      }
      // Simulate checkout: clear cart and show simple success
      clearCart();
      alert('Thank you! This is a demo checkout — no payment processed.');
    });
  }


  // Contact form demo behaviour
  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#contactName').value.trim();
      const email = $('#contactEmail').value.trim();
      const msg = $('#contactMessage').value.trim();
      if (!name || !email || !msg) {
        alert('Please complete all fields.');
        return;
      }
      // simulate send
      alert('Message sent! (Demo) — thank you, ' + name + '.');
      contactForm.reset();
    });
  }
});
