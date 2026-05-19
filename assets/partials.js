// LURDEX MAGAZINNE · Shared partials
// Injects nav, footer, bag drawer, search overlay, modal, toast into every page.

(function () {
  const ICONS = {
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    bag:    '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1.2 11.3a2 2 0 0 1-2 1.7H8.2a2 2 0 0 1-2-1.7L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    user:   '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    heart:  '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>',
    close:  '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    plus:   '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    minus:  '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>'
  };
  window.LURDEX = window.LURDEX || {};
  window.LURDEX.icons = ICONS;

  const PAGE = document.documentElement.getAttribute('data-page') || '';
  // Allow pages in subfolders (e.g., /brand/) to declare a base prefix
  // so nav/footer links resolve to the right place.
  const BASE = document.documentElement.getAttribute('data-base') || '';
  const at = (p) => BASE + p;

  const NAV_LINKS = [
    { href: at('casa.html'),    label: 'Casa',     id: 'casa' },
    { href: at('beleza.html'),  label: 'Beleza',   id: 'beleza' },
    { href: at('moda.html'),    label: 'Moda',     id: 'moda' },
    { href: at('edicoes.html'), label: 'Edições',  id: 'edicoes' },
    { href: at('marca.html'),   label: 'A Marca',  id: 'marca' }
  ];

  // -------- ANNOUNCE BAR + NAV --------
  const headerSlot = document.querySelector('[data-nav]');
  if (headerSlot) {
    const linksHtml = NAV_LINKS.map(l =>
      `<li><a href="${l.href}"${l.id === PAGE ? ' aria-current="page"' : ''}>${l.label}</a></li>`
    ).join('');
    const menuLinks = NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('');

    headerSlot.innerHTML = `
      <div class="announce" aria-hidden="true">
        <div class="announce-track">
          <span>Frete grátis acima de R$ 299</span>
          <span>Embrulho editorial sem custo</span>
          <span>Edição XII · Outono MMXXVI</span>
          <span>Curadoria importada</span>
          <span>Atendimento por WhatsApp</span>
          <span>Frete grátis acima de R$ 299</span>
          <span>Embrulho editorial sem custo</span>
          <span>Edição XII · Outono MMXXVI</span>
          <span>Curadoria importada</span>
          <span>Atendimento por WhatsApp</span>
        </div>
      </div>
      <nav class="nav" aria-label="Principal">
        <div class="container nav-inner">
          <button class="nav-burger" aria-label="Abrir menu" data-menu-open>
            <span></span><span></span><span></span>
          </button>
          <a class="nav-logo" href="${at('index.html')}">L<em>u</em>rdex</a>
          <ul class="nav-links">${linksHtml}</ul>
          <div class="nav-actions">
            <button class="nav-icon-btn" aria-label="Buscar" data-search-open>${ICONS.search}</button>
            <a class="nav-icon-btn" aria-label="Conta" href="#"></a>
            <button class="nav-icon-btn" aria-label="Sacola" data-bag-open>
              ${ICONS.bag}
              <span class="bag-count" data-bag-count data-count="0">0</span>
            </button>
          </div>
        </div>
      </nav>
      <div class="menu-drawer" data-menu>
        <div class="menu-backdrop" data-menu-close></div>
        <aside class="menu-panel" role="dialog" aria-label="Menu de navegação">
          <div class="menu-head">
            <a class="nav-logo" href="${at('index.html')}">L<em>u</em>rdex</a>
            <button class="menu-close" aria-label="Fechar menu" data-menu-close>${ICONS.close}</button>
          </div>
          <ul class="menu-links">${menuLinks}
            <li><a href="${at('produtos.html')}">Tudo</a></li>
            <li><a href="${at('manifesto.html')}"><em>Manifesto</em></a></li>
          </ul>
          <div class="menu-foot">
            <span>contato@lurdex.com.br</span>
            <span>@lurdex.magazinne</span>
            <span>São Paulo · Brasil</span>
          </div>
        </aside>
      </div>
    `;
  }

  // -------- FOOTER --------
  const footerSlot = document.querySelector('[data-footer]');
  if (footerSlot) {
    footerSlot.innerHTML = `
      <div class="container">
        <div class="foot-top">
          <a class="nav-logo" href="${at('index.html')}">L<em>u</em>rdex</a>
          <div class="foot-tag">Magazinne · Premium imports · MMXXVI</div>
        </div>
        <div class="foot-cols">
          <div class="foot-col">
            <h5>Compre</h5>
            <ul>
              <li><a href="${at('casa.html')}">Casa</a></li>
              <li><a href="${at('beleza.html')}">Beleza</a></li>
              <li><a href="${at('moda.html')}">Moda</a></li>
              <li><a href="${at('produtos.html')}">Ver tudo</a></li>
            </ul>
          </div>
          <div class="foot-col">
            <h5>Edições</h5>
            <ul>
              <li><a href="${at('edicao-xii.html')}">XII · Outono</a></li>
              <li><a href="${at('edicoes.html')}">Arquivo</a></li>
            </ul>
          </div>
          <div class="foot-col">
            <h5>Atendimento</h5>
            <ul>
              <li><a href="#">Trocas e devoluções</a></li>
              <li><a href="#">Política de frete</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div class="foot-col">
            <h5>Sobre</h5>
            <ul>
              <li><a href="${at('marca.html')}">A marca</a></li>
              <li><a href="${at('manifesto.html')}">Manifesto</a></li>
              <li><a href="${at('imprensa.html')}">Imprensa & design system</a></li>
            </ul>
          </div>
          <div class="foot-col foot-contact">
            <div>
              <h5>Contato</h5>
              <div>São Paulo · Brasil</div>
              <div>contato@lurdex.com.br</div>
            </div>
            <div class="foot-socials">
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">TikTok</a>
            </div>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© MMXXVI Lurdex Magazinne · O mundo, dentro de casa.</span>
          <span>CNPJ 00.000.000/0001-00</span>
        </div>
      </div>
    `;
  }

  // -------- BAG DRAWER --------
  const drawerHost = document.createElement('div');
  drawerHost.className = 'drawer';
  drawerHost.setAttribute('data-drawer', '');
  drawerHost.innerHTML = `
    <div class="drawer-backdrop" data-bag-close></div>
    <aside class="drawer-panel" role="dialog" aria-label="Sacola">
      <header class="drawer-head">
        <h3>Sua sacola</h3>
        <button class="menu-close" aria-label="Fechar" data-bag-close>${ICONS.close}</button>
      </header>
      <div class="drawer-body" data-bag-body></div>
      <footer class="drawer-foot" data-bag-foot></footer>
    </aside>
  `;
  document.body.appendChild(drawerHost);

  // -------- SEARCH OVERLAY --------
  const search = document.createElement('div');
  search.className = 'search-overlay';
  search.setAttribute('data-search', '');
  search.innerHTML = `
    <header class="search-head container">
      <input class="search-input" type="search" placeholder="O que está buscando?" data-search-input autocomplete="off">
      <button class="search-close" aria-label="Fechar" data-search-close>${ICONS.close}</button>
    </header>
    <div class="search-body container">
      <div class="search-suggest">Sugestões editoriais</div>
      <ul class="search-list">
        <li><a href="${at('edicao-xii.html')}">Edição XII</a></li>
        <li><a href="${at('casa.html')}">Castiçais</a></li>
        <li><a href="${at('beleza.html')}">Sérum noturno</a></li>
        <li><a href="${at('moda.html')}">Lenço Botanique</a></li>
        <li><a href="${at('produtos.html')}">Mais vendidos</a></li>
        <li><a href="${at('marca.html')}">A marca</a></li>
      </ul>
    </div>
  `;
  document.body.appendChild(search);

  // -------- TOAST --------
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('data-toast', '');
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  // -------- PRODUCT MODAL --------
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('data-modal', '');
  modal.innerHTML = `
    <div class="modal-back" data-modal-close></div>
    <div class="modal-card" role="dialog" aria-label="Detalhes do produto">
      <button class="modal-close" aria-label="Fechar" data-modal-close>${ICONS.close}</button>
      <div class="modal-grid" data-modal-body></div>
    </div>
  `;
  document.body.appendChild(modal);
})();
