// LURDEX MAGAZINNE · App behaviors (nav, bag, search, modal, render helpers)

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const { products, byId, byCat, artFor, fmt, icons, imgFor } = window.LURDEX;
  // Base prefix for internal links so pages in subfolders (/brand/) resolve correctly.
  const BASE = document.documentElement.getAttribute('data-base') || '';
  const at = (p) => BASE + p;

  // Build an <img> that:
  //   1. tries the LOCAL path (assets/img/<seed>.jpg) first
  //   2. on 404, swaps to the REMOTE themed URL (Loremflickr/Pravatar)
  //   3. on second error, removes the <img> and shows the SVG art behind
  // Esc-safe HTML attrs.
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function twoTierImg(local, remote, alt, eager) {
    const onerr = `if(!this.dataset.tried){this.dataset.tried=1;this.src='${esc(remote)}';}else{this.remove();}`;
    return `<img class="img-real" src="${esc(local)}" alt="${esc(alt)}"
                 loading="${eager ? 'eager' : 'lazy'}" decoding="async"
                 onload="this.classList.add('loaded')"
                 onerror="${onerr}">`;
  }

  function imgHTML(product, w = 800, h = 800, eager = false) {
    const u = imgFor(product, w, h);
    const fallback = artFor(product.id, product.tone);
    if (!u) return `<div class="img-art">${fallback}</div>`;
    return `<div class="img-wrap">
      <div class="img-fallback">${fallback}</div>
      ${twoTierImg(u.local, u.remote, `${product.name} — ${product.cat_label}`, eager)}
    </div>`;
  }
  window.LURDEX.imgHTML = imgHTML;

  function aiImgHTML(prompt, seedKey, opts = {}) {
    const w = opts.w || 800, h = opts.h || 800, tone = opts.tone || 'lilac';
    const u = window.LURDEX.aiUrl(prompt, seedKey, w, h);
    const fallback = artFor(seedKey || prompt, tone);
    const alt = opts.alt || prompt.slice(0, 80);
    return `<div class="img-wrap">
      <div class="img-fallback">${fallback}</div>
      ${twoTierImg(u.local, u.remote, alt, opts.eager)}
    </div>`;
  }
  window.LURDEX.aiImgHTML = aiImgHTML;

  function hydrateAiImages(root = document) {
    root.querySelectorAll('[data-ai-img]').forEach(el => {
      const prompt = el.getAttribute('data-ai-img');
      const seed = el.getAttribute('data-ai-seed') || prompt.slice(0, 32);
      const w = parseInt(el.getAttribute('data-ai-w'), 10) || 800;
      const h = parseInt(el.getAttribute('data-ai-h'), 10) || 800;
      const tone = el.getAttribute('data-ai-tone') || 'lilac';
      const eager = el.hasAttribute('data-ai-eager');
      const alt = el.getAttribute('data-ai-alt');
      el.innerHTML = aiImgHTML(prompt, seed, { w, h, tone, eager, alt });
      el.removeAttribute('data-ai-img');
    });
  }
  window.LURDEX.hydrateAiImages = hydrateAiImages;

  // -------- BAG STATE --------
  const BAG_KEY = 'lurdex.bag.v1';
  const FAV_KEY = 'lurdex.fav.v1';
  const readJSON = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) || fallback; } catch { return fallback; } };
  const writeJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  let bag = readJSON(BAG_KEY, []);
  let favs = new Set(readJSON(FAV_KEY, []));

  function saveBag() { writeJSON(BAG_KEY, bag); renderBag(); }
  function saveFavs() { writeJSON(FAV_KEY, Array.from(favs)); }

  window.LURDEX.bag = {
    add(id, qty = 1) {
      const item = bag.find(i => i.id === id);
      if (item) item.qty += qty; else bag.push({ id, qty });
      saveBag();
      toast('Adicionado à sacola');
      openBag();
    },
    remove(id) { bag = bag.filter(i => i.id !== id); saveBag(); },
    setQty(id, qty) {
      const item = bag.find(i => i.id === id);
      if (!item) return;
      item.qty = Math.max(1, qty);
      saveBag();
    },
    count: () => bag.reduce((s, i) => s + i.qty, 0),
    total: () => bag.reduce((s, i) => s + (byId(i.id)?.price || 0) * i.qty, 0)
  };

  window.LURDEX.toggleFav = function (id) {
    if (favs.has(id)) favs.delete(id); else favs.add(id);
    saveFavs();
    document.querySelectorAll(`[data-product-id="${id}"]`).forEach(el => el.classList.toggle('faved', favs.has(id)));
  };
  window.LURDEX.isFav = id => favs.has(id);

  // -------- RENDER HELPERS --------
  function productCardHTML(p) {
    const faved = favs.has(p.id) ? ' faved' : '';
    const badge = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
    return `
      <article class="product${faved}" data-product-id="${p.id}" data-product-card>
        <div class="product-img">
          ${imgHTML(p, 600, 600)}
          ${badge}
          <button class="product-fav" aria-label="Favoritar" data-fav-toggle>${icons.heart}</button>
        </div>
        <div class="product-body">
          <div class="product-cat">${p.cat_label}</div>
          <h3 class="product-name">${p.name.replace(p.italic, `<em>${p.italic}</em>`)}</h3>
          <div class="product-meta">
            <span class="product-price">${fmt(p.price)}</span>
            <span class="product-rating">★ 4.8 (124)</span>
          </div>
        </div>
      </article>
    `;
  }
  window.LURDEX.renderProductGrid = function (target, list) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    el.innerHTML = list.map(productCardHTML).join('');
  };

  // -------- TOAST --------
  let toastTimer;
  function toast(msg) {
    const el = $('[data-toast]');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }
  window.LURDEX.toast = toast;

  // -------- BAG DRAWER --------
  function renderBag() {
    const body = $('[data-bag-body]');
    const foot = $('[data-bag-foot]');
    const count = window.LURDEX.bag.count();
    $$('[data-bag-count]').forEach(c => { c.textContent = count; c.setAttribute('data-count', count); });
    if (!body || !foot) return;

    if (!bag.length) {
      body.innerHTML = `<div class="drawer-empty">
        <p style="font-family:var(--serif); font-size:24px; font-style:italic; margin-bottom:12px;">Sua sacola está vazia.</p>
        <p style="font-size:13px; opacity:0.7;">Que tal começar pelas <a href="${at('edicao-xii.html')}" style="text-decoration:underline;">novidades da Edição XII</a>?</p>
      </div>`;
      foot.innerHTML = '';
      return;
    }

    body.innerHTML = bag.map(i => {
      const p = byId(i.id); if (!p) return '';
      return `<div class="bag-item">
        <div class="bag-item-img">${imgHTML(p, 240, 240)}</div>
        <div>
          <div class="bag-item-name">${p.name.replace(p.italic, `<em>${p.italic}</em>`)}</div>
          <div class="bag-item-meta">${p.cat_label}</div>
          <div class="bag-qty">
            <button data-bag-dec="${p.id}" aria-label="Diminuir">−</button>
            <span>${i.qty}</span>
            <button data-bag-inc="${p.id}" aria-label="Aumentar">+</button>
          </div>
        </div>
        <div class="bag-item-side">
          <span class="bag-item-price">${fmt(p.price * i.qty)}</span>
          <button class="bag-item-rm" data-bag-rm="${p.id}">Remover</button>
        </div>
      </div>`;
    }).join('');

    const total = window.LURDEX.bag.total();
    const freeShip = 299;
    const remaining = Math.max(0, freeShip - total);
    const pct = Math.min(100, (total / freeShip) * 100);
    const shipHTML = remaining
      ? `<div class="ship-meter">Faltam ${fmt(remaining)} para o frete grátis<div class="ship-meter-bar"><div style="width:${pct}%"></div></div></div>`
      : `<div class="ship-meter">Frete grátis aplicado ✓<div class="ship-meter-bar"><div style="width:100%"></div></div></div>`;

    foot.innerHTML = `
      ${shipHTML}
      <div class="drawer-row"><span>Subtotal</span><span>${fmt(total)}</span></div>
      <div class="drawer-row total"><span>Total</span><span>${fmt(total)}</span></div>
      <button class="btn btn-primary">Finalizar compra</button>
    `;
  }
  window.LURDEX.renderBag = renderBag;

  function openBag() {
    closeAll();
    $('[data-drawer]')?.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeBag() {
    $('[data-drawer]')?.classList.remove('open');
    document.documentElement.style.overflow = '';
  }

  // -------- MENU --------
  function openMenu() {
    closeAll();
    $('[data-menu]')?.classList.add('open');
    $('.nav')?.classList.add('menu-open');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeMenu() {
    $('[data-menu]')?.classList.remove('open');
    $('.nav')?.classList.remove('menu-open');
    document.documentElement.style.overflow = '';
  }

  // -------- SEARCH --------
  function openSearch() {
    closeAll();
    $('[data-search]')?.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => $('[data-search-input]')?.focus(), 50);
  }
  function closeSearch() {
    $('[data-search]')?.classList.remove('open');
    document.documentElement.style.overflow = '';
  }

  // -------- MODAL --------
  function openProduct(id) {
    const p = byId(id); if (!p) return;
    const body = $('[data-modal-body]'); if (!body) return;
    body.innerHTML = `
      <div class="modal-gallery">${imgHTML(p, 1000, 1000, true)}</div>
      <div class="modal-info">
        <div class="modal-cat">${p.cat_label}</div>
        <h2>${p.name.replace(p.italic, `<em>${p.italic}</em>`)}</h2>
        <div class="modal-price">${fmt(p.price)}</div>
        <p class="modal-desc">${p.desc}</p>
        <div class="modal-row">
          <div class="qty-input">
            <button data-modal-dec aria-label="Diminuir">−</button>
            <span data-modal-qty>1</span>
            <button data-modal-inc aria-label="Aumentar">+</button>
          </div>
          <button class="btn btn-primary" style="flex:1;" data-modal-add="${p.id}">Adicionar à sacola</button>
        </div>
        <button class="btn btn-secondary" style="width:100%;" data-modal-fav="${p.id}">
          ${window.LURDEX.isFav(p.id) ? '♥ Favorito' : '♡ Favoritar'}
        </button>
        <div style="margin-top: var(--s-5); padding-top: var(--s-4); border-top: 1px solid var(--border-soft); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.7; display: flex; flex-direction: column; gap: 8px;">
          <span>◊ Embrulho editorial sem custo</span>
          <span>◊ Frete grátis acima de R$ 299</span>
          <span>◊ Trocas em até 30 dias</span>
        </div>
      </div>
    `;
    $('[data-modal]')?.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeModal() {
    $('[data-modal]')?.classList.remove('open');
    document.documentElement.style.overflow = '';
  }
  window.LURDEX.openProduct = openProduct;

  function closeAll() {
    closeBag(); closeMenu(); closeSearch(); closeModal();
  }

  // -------- DELEGATED CLICK HANDLER --------
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-bag-open],[data-bag-close],[data-bag-inc],[data-bag-dec],[data-bag-rm],[data-menu-open],[data-menu-close],[data-search-open],[data-search-close],[data-modal-close],[data-modal-add],[data-modal-fav],[data-modal-inc],[data-modal-dec],[data-fav-toggle],[data-product-card]');
    if (!t) return;
    if (t.matches('[data-bag-open]'))   { openBag(); return; }
    if (t.matches('[data-bag-close]'))  { closeBag(); return; }
    if (t.matches('[data-menu-open]'))  { openMenu(); return; }
    if (t.matches('[data-menu-close]')) { closeMenu(); return; }
    if (t.matches('[data-search-open]')){ openSearch(); return; }
    if (t.matches('[data-search-close]')){ closeSearch(); return; }
    if (t.matches('[data-modal-close]')){ closeModal(); return; }

    const inc = t.getAttribute('data-bag-inc'); if (inc) { const it = bag.find(i=>i.id===inc); if(it) window.LURDEX.bag.setQty(inc, it.qty + 1); return; }
    const dec = t.getAttribute('data-bag-dec'); if (dec) { const it = bag.find(i=>i.id===dec); if(it) window.LURDEX.bag.setQty(dec, it.qty - 1); return; }
    const rm  = t.getAttribute('data-bag-rm');  if (rm)  { window.LURDEX.bag.remove(rm); return; }

    if (t.matches('[data-modal-inc],[data-modal-dec]')) {
      const span = $('[data-modal-qty]'); if (!span) return;
      let q = parseInt(span.textContent, 10) || 1;
      q = t.matches('[data-modal-inc]') ? q + 1 : Math.max(1, q - 1);
      span.textContent = q; return;
    }
    const addId = t.getAttribute('data-modal-add');
    if (addId) {
      const qty = parseInt($('[data-modal-qty]')?.textContent || '1', 10);
      window.LURDEX.bag.add(addId, qty);
      closeModal();
      return;
    }
    const favId = t.getAttribute('data-modal-fav');
    if (favId) { window.LURDEX.toggleFav(favId); t.innerHTML = window.LURDEX.isFav(favId) ? '♥ Favorito' : '♡ Favoritar'; return; }

    if (t.matches('[data-fav-toggle]')) {
      e.preventDefault(); e.stopPropagation();
      const card = t.closest('[data-product-id]');
      if (card) window.LURDEX.toggleFav(card.getAttribute('data-product-id'));
      return;
    }
    if (t.matches('[data-product-card]')) {
      const id = t.getAttribute('data-product-id');
      if (id) openProduct(id);
    }
  });

  // ESC closes everything
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  // Search behavior (filter list as you type)
  document.addEventListener('input', (e) => {
    if (!e.target.matches('[data-search-input]')) return;
    const q = e.target.value.toLowerCase().trim();
    const list = $('.search-list');
    if (!list) return;
    if (!q) {
      list.innerHTML = `
        <li><a href="${at('edicao-xii.html')}">Edição XII</a></li>
        <li><a href="${at('casa.html')}">Castiçais</a></li>
        <li><a href="${at('beleza.html')}">Sérum noturno</a></li>
        <li><a href="${at('moda.html')}">Lenço Botanique</a></li>
        <li><a href="${at('produtos.html')}">Mais vendidos</a></li>
        <li><a href="${at('marca.html')}">A marca</a></li>
      `;
      return;
    }
    const hits = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.cat_label.toLowerCase().includes(q) ||
      (p.desc || '').toLowerCase().includes(q)
    ).slice(0, 8);
    list.innerHTML = hits.length
      ? hits.map(p => `<li><a href="${at('produto.html')}?id=${p.id}">${p.name}</a></li>`).join('')
      : '<li style="opacity:0.6;">Nenhum resultado encontrado.</li>';
  });

  // -------- NEWSLETTER (web3forms) --------
  const W3F_KEY = '6bf4280a-cdf2-4d61-a5c4-5a365625cc50';
  const PAGE_NAMES = {
    'index': 'Home — O mundo, dentro de casa',
    'edicao-ix': 'Edição IX',
    'edicao-x': 'Edição X',
    'edicao-xi': 'Edição XI',
    'edicao-xii': 'Edição XII · Outono MMXXVI',
    'edicoes': 'Arquivo de Edições',
    'casa': 'Casa',
    'beleza': 'Beleza',
    'moda': 'Moda',
    'cozinha': 'Cozinha',
    'living': 'Living',
    'presentes': 'Presentes',
    'produtos': 'Produtos',
    'produto': 'Produto',
    'marca': 'A Marca',
    'manifesto': 'Manifesto',
    'imprensa': 'Imprensa & Design System'
  };
  function friendlyPage() {
    const file = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
    return PAGE_NAMES[file] || file;
  }
  function nowBR() {
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'long', timeStyle: 'short', timeZone: 'America/Sao_Paulo'
      }).format(new Date()) + ' (Brasília)';
    } catch {
      return new Date().toISOString();
    }
  }
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('.newsletter-form');
    if (!form) return;
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = (emailInput?.value || '').trim();
    if (!email) return;
    const btn = form.querySelector('button[type="submit"]');
    const originalLabel = btn?.textContent;
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
    try {
      const page = friendlyPage();
      const when = nowBR();
      const message =
        `Uma nova assinante entrou para a carta da Lurdex Magazinne.\n\n` +
        `• Email: ${email}\n` +
        `• Origem: ${page}\n` +
        `• Quando: ${when}\n\n` +
        `— Lurdex Magazinne · O mundo, dentro de casa.`;
      const payload = {
        access_key: W3F_KEY,
        subject: `✦ Nova assinante — ${page}`,
        from_name: 'Lurdex Magazinne · Newsletter',
        replyto: email,
        'Email da assinante': email,
        'Página de origem': page,
        'Data e hora': when,
        message,
        botcheck: ''
      };
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        const base = location.pathname.includes('/brand/') ? '../' : '';
        location.href = `${base}obrigado.html?e=${encodeURIComponent(email)}`;
      } else {
        toast(data.message || 'Não foi possível assinar. Tente novamente.');
        if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
      }
    } catch {
      toast('Sem conexão. Tente novamente em instantes.');
      if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
    }
  });

  // Initial render
  renderBag();
  // Hydrate any [data-ai-img] placeholders on the page (hero, tiles, feature art, etc.)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => hydrateAiImages());
  } else {
    hydrateAiImages();
  }
})();
