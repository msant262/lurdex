// LURDEX MAGAZINNE · Category page renderer
// Reads <body data-cat="slug"> and populates the page from data.js.

(function () {
  const slug = document.body.getAttribute('data-cat');
  if (!slug) return;
  const cat = LURDEX.categories.find(c => c.slug === slug);
  if (!cat) return;
  const products = LURDEX.byCat(slug);

  const $ = s => document.querySelector(s);

  $('[data-cat-num]') && ($('[data-cat-num]').textContent = `Universo ${cat.num} · ${products.length} peças`);
  $('[data-cat-title]') && ($('[data-cat-title]').textContent = cat.name);
  $('[data-cat-lead]') && ($('[data-cat-lead]').textContent = cat.desc);

  function render(filter) {
    let list = products;
    if (filter === 'new')        list = products.filter(p => p.badge === 'NOVO');
    if (filter === 'bestseller') list = products.filter(p => p.badge === 'MAIS VENDIDO');
    if (filter === 'edicao')     list = products.filter(p => p.badge === 'EDIÇÃO XII');
    if (!list.length) {
      $('[data-cat-grid]').innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: var(--s-7) 0; opacity:0.7;">
          <p style="font-family:var(--serif); font-size:24px; font-style:italic;">Nenhuma peça neste filtro ainda.</p>
        </div>`;
      return;
    }
    LURDEX.renderProductGrid('[data-cat-grid]', list);
  }
  render('all');

  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.getAttribute('data-filter'));
    });
  });
})();
