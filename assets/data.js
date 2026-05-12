// LURDEX MAGAZINNE · Data layer
// All categories, products and editions live here so pages share state.

window.LURDEX = window.LURDEX || {};

LURDEX.categories = [
  { slug: 'casa',     num: '01', name: 'Casa',     tone: 'lilac',  desc: 'Mesa posta, decoração e os pequenos rituais do dia.', count: 24 },
  { slug: 'beleza',   num: '02', name: 'Beleza',   tone: 'rose',   desc: 'Skincare importado, perfumaria e ferramentas de toilette.', count: 18 },
  { slug: 'moda',     num: '03', name: 'Moda',     tone: 'wine',   desc: 'Acessórios, lenços, bolsas e peças de coleção.', count: 21 },
  { slug: 'cozinha',  num: '04', name: 'Cozinha',  tone: 'sage',   desc: 'Utensílios, louças e o melhor da copa europeia.', count: 16 },
  { slug: 'presentes', num: '05', name: 'Presentes', tone: 'cream', desc: 'Edições limitadas e kits para ocasiões especiais.', count: 12 },
  { slug: 'living',   num: '06', name: 'Living',   tone: 'dark',   desc: 'Aromas, livros e objetos para o estar.', count: 14 }
];

LURDEX.products = [
  { id: 'p01', name: 'Castiçal Maison', italic: 'Maison', cat: 'casa', cat_label: 'Casa · Decoração',
    price: 289, badge: 'NOVO', tone: 'lilac',
    desc: 'Castiçal duplo em latão escovado, acabamento à mão. Edição limitada de 120 peças, importado da Toscana.',
    keywords: 'candle,brass,minimal,interior' },
  { id: 'p02', name: 'Espelho Atelier', italic: 'Atelier', cat: 'casa', cat_label: 'Casa · Decoração',
    price: 549, tone: 'rose',
    desc: 'Espelho de mesa com moldura em madeira de demolição, finalizada em verniz fosco. Detalhes em metal envelhecido.',
    keywords: 'mirror,vintage,interior,still-life' },
  { id: 'p03', name: 'Sérum Crepúsculo', italic: 'Crepúsculo', cat: 'beleza', cat_label: 'Beleza · Skincare',
    price: 419, badge: 'EM ALTA', tone: 'rose',
    desc: 'Sérum noturno com retinal encapsulado e bakuchiol. Frasco em vidro âmbar soprado, conta-gotas em vidro temperado.',
    keywords: 'skincare,bottle,beauty,minimal' },
  { id: 'p04', name: 'Perfume Linhas', italic: 'Linhas', cat: 'beleza', cat_label: 'Beleza · Perfumaria',
    price: 689, tone: 'wine',
    desc: 'Eau de parfum unissex. Notas de bergamota italiana, íris, vetiver do Haiti e âmbar cinza. 100ml.',
    keywords: 'perfume,bottle,luxury,fragrance' },
  { id: 'p05', name: 'Lenço Botanique', italic: 'Botanique', cat: 'moda', cat_label: 'Moda · Acessórios',
    price: 379, badge: 'EDIÇÃO XII', tone: 'sage',
    desc: 'Lenço quadrado 90×90cm em seda twill, estampa exclusiva inspirada nos jardins do Vaticano. Acabamento orlado à mão.',
    keywords: 'silk,scarf,fashion,fabric' },
  { id: 'p06', name: 'Bolsa Carteira', italic: 'Carteira', cat: 'moda', cat_label: 'Moda · Bolsas',
    price: 1289, tone: 'aubergine',
    desc: 'Bolsa em couro italiano vegetal-tanned, costuras à mão. Forro em algodão acetinado. Alça removível incluída.',
    keywords: 'handbag,leather,fashion,minimal' },
  { id: 'p07', name: 'Bule Cerâmica', italic: 'Cerâmica', cat: 'cozinha', cat_label: 'Cozinha · Mesa',
    price: 329, badge: 'MAIS VENDIDO', tone: 'cream',
    desc: 'Bule de chá em porcelana feita à mão em Stoke-on-Trent. Capacidade 800ml. Infusor em aço inox.',
    keywords: 'teapot,ceramic,tea,minimal' },
  { id: 'p08', name: 'Conjunto Copo', italic: 'Copo', cat: 'cozinha', cat_label: 'Cozinha · Copos',
    price: 459, tone: 'lilac',
    desc: 'Conjunto com 6 copos em cristal lapidado, base hexagonal. Capacidade 320ml. Embalagem para presente inclusa.',
    keywords: 'crystal,glass,cocktail,minimal' },
  { id: 'p09', name: 'Caixa Presente', italic: 'Presente', cat: 'presentes', cat_label: 'Presentes · Kits',
    price: 689, badge: 'LIMITADO', tone: 'rose',
    desc: 'Caixa curada com vela aromática, sabonete artesanal, sachet de lavanda e cartão personalizado.',
    keywords: 'giftbox,ribbon,luxury,present' },
  { id: 'p10', name: 'Vela Aurora', italic: 'Aurora', cat: 'living', cat_label: 'Living · Aromas',
    price: 219, tone: 'lilac',
    desc: 'Vela de soja com 60h de queima. Notas de cassis, peônia e madeiras claras. Recipiente em vidro pintado à mão.',
    keywords: 'candle,cozy,interior,minimal' },
  { id: 'p11', name: 'Diário Moleskine', italic: 'Diário', cat: 'living', cat_label: 'Living · Objetos',
    price: 189, tone: 'aubergine',
    desc: 'Caderno costurado à mão, capa em couro reciclado, miolo em papel marfim 90g, fita marcador em seda.',
    keywords: 'notebook,leather,journal,desk' },
  { id: 'p12', name: 'Cachepot Botânico', italic: 'Botânico', cat: 'casa', cat_label: 'Casa · Jardim',
    price: 269, tone: 'sage',
    desc: 'Cachepot em cerâmica esmaltada para plantas até 18cm. Acabamento crackelê, base com furo de drenagem.',
    keywords: 'plant,ceramic,planter,green' }
];

LURDEX.editions = [
  { slug: 'xii', num: 'XII', title: 'Outono', subtitle: 'MMXXVI', current: true,
    cover_tone: 'lilac',
    intro: 'Doze peças escolhidas para o desacelerar do outono. Texturas mornas, paleta de fim de tarde, o ritual do chá retomado.',
    stats: [
      { lbl: 'Peças', val: '48' },
      { lbl: 'Atelieres', val: '12' },
      { lbl: 'Países', val: '7' }
    ]
  },
  { slug: 'xi', num: 'XI', title: 'Estio', subtitle: 'MMXXVI',
    cover_tone: 'sage',
    intro: 'A leveza do alto verão em peças frescas, vidros translúcidos e tecidos respiráveis.',
    stats: [
      { lbl: 'Peças', val: '36' },
      { lbl: 'Atelieres', val: '9' },
      { lbl: 'Países', val: '5' }
    ]
  },
  { slug: 'x', num: 'X', title: 'Primavera', subtitle: 'MMXXVI',
    cover_tone: 'rose',
    intro: 'O despertar da estação em florais botânicos, porcelanas claras e perfumes herbáceos.',
    stats: [
      { lbl: 'Peças', val: '42' },
      { lbl: 'Atelieres', val: '11' },
      { lbl: 'Países', val: '6' }
    ]
  },
  { slug: 'ix', num: 'IX', title: 'Inverno', subtitle: 'MMXXV',
    cover_tone: 'wine',
    intro: 'O recolhimento em peças encorpadas, madeiras escuras e fragrâncias densas.',
    stats: [
      { lbl: 'Peças', val: '54' },
      { lbl: 'Atelieres', val: '14' },
      { lbl: 'Países', val: '8' }
    ]
  }
];

// SVG art generator — used by product images, hero, category tiles.
// Returns an inline SVG string with a tonal composition.
LURDEX.artFor = function (key, tone) {
  const palettes = {
    lilac:     { bg: '#DCC9F0', fg: '#8E6FB8', acc: '#F5EFE6' },
    rose:      { bg: '#E8B4C8', fg: '#C97A98', acc: '#FBF7EF' },
    sage:      { bg: '#A8C4A2', fg: '#6E9B72', acc: '#FBF7EF' },
    wine:      { bg: '#8B2942', fg: '#E8B4C8', acc: '#F5EFE6' },
    cream:     { bg: '#EDE3D2', fg: '#8E6FB8', acc: '#2A1F38' },
    aubergine: { bg: '#2A1F38', fg: '#B89AD6', acc: '#F5EFE6' },
    dark:      { bg: '#2A1F38', fg: '#B89AD6', acc: '#F5EFE6' }
  };
  const p = palettes[tone] || palettes.lilac;
  // Deterministic-ish hash by key for variety
  let h = 0; for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  const variant = h % 5;
  const shapes = {
    0: `<circle cx="50%" cy="42%" r="32%" fill="${p.fg}"/><rect x="20%" y="68%" width="60%" height="6%" fill="${p.acc}" opacity="0.6"/>`,
    1: `<rect x="22%" y="20%" width="56%" height="58%" rx="50%" fill="${p.fg}"/><circle cx="74%" cy="76%" r="6%" fill="${p.acc}"/>`,
    2: `<path d="M50,15 Q80,30 80,55 Q80,85 50,85 Q20,85 20,55 Q20,30 50,15Z" fill="${p.fg}" transform="scale(1.4) translate(-15,-15)"/>`,
    3: `<circle cx="35%" cy="45%" r="22%" fill="${p.fg}"/><circle cx="68%" cy="62%" r="14%" fill="${p.fg}" opacity="0.7"/>`,
    4: `<rect x="30%" y="14%" width="40%" height="72%" rx="20%" fill="${p.fg}"/><line x1="0" y1="80%" x2="100%" y2="80%" stroke="${p.acc}" stroke-width="1.5"/>`
  };
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="${p.bg}"/>${shapes[variant]}
  </svg>`;
};

// Prototype images via Loremflickr (keyword-based, instant, no rate limit).
// Stable seed/lock keeps the same image across reloads.
// To swap for AI-generated, see LURDEX.aiUrlPollinations below.

// djb2-style hash — order-sensitive (so 'p01' and 'p10' differ).
LURDEX.seedFrom = function (key) {
  let h = 5381;
  const s = String(key);
  for (let i = 0; i < s.length; i++) h = (((h << 5) + h) ^ s.charCodeAt(i)) >>> 0;
  return h;
};

// Auto-extract keywords from a long descriptive prompt: prefer comma-segments
// or fall back to the first few non-stop words.
const STOP = new Set('editorial,photo,photograph,product,still,life,of,a,an,the,on,with,and,in,for,by,from,to,at,as,is,are,soft,light,style,aesthetic,magazine,vogue,minimal,premium,luxury,mood,centered,composition,orientation,portrait,landscape,close,up,close-up,view,palette,natural,daylight,window,golden,hour,moody,dramatic'.split(','));
function keywordsFromPrompt(prompt) {
  if (!prompt) return 'minimal,interior';
  // If prompt looks comma-tagged ("candle,brass,minimal"), use as-is.
  if (/^[a-z0-9,\-]+$/i.test(prompt) && prompt.includes(',')) return prompt;
  const words = prompt.toLowerCase()
    .replace(/[^a-z\s\-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP.has(w));
  // Dedup, keep first 4
  const out = [];
  for (const w of words) { if (!out.includes(w)) out.push(w); if (out.length >= 4) break; }
  return out.join(',') || 'minimal,interior';
}
LURDEX.keywordsFromPrompt = keywordsFromPrompt;

// Curated Unsplash photos — handpicked editorial images per slot.
// Each value is the `photo-<id>-<hash>` portion of the Unsplash CDN URL.
// Source: unsplash.com search results matching the slot's subject.
const UNSPLASH = {
  // Products
  p01: '1663872585222-b99f36d10223', // brass candlestick
  p02: '1606241018160-4985a8ab5dec', // vintage mirror
  p03: '1616750819456-5cdee9b85d22', // skincare bottle
  p04: '1523293182086-7651a899d37f', // perfume bottle
  p05: '1606259458027-54d2a728b6ab', // silk scarf
  p06: '1548036328-c9fa89d128fa',    // leather handbag
  p07: '1757071461288-6eedd1e08ee6', // ceramic teapot
  p08: '1769118440711-58b7a58ffe8f', // crystal glasses
  p09: '1601307666167-910027240bcd', // gift box with ribbon
  p10: '1663323868074-c0c639a82fbd', // candle aesthetic
  p11: '1637868796504-32f45a96d5a0', // leather notebook
  p12: '1629380321590-3b3f75d66dec', // ceramic planter

  // Home: hero, manifesto feature, campaign band
  'lurdex-hero':      '1743267217186-7dee9dde6d4f', // woman with pampas vase
  'lurdex-manifesto': '1512909006721-3d6018887383', // gift wrapping hands
  'campaign-band':    '1613545325278-f24b0cae1224', // luxury home interior

  // Home editorial tiles
  'ed-tile-1': '1635811831672-179f83a049be', // tea cup steam
  'ed-tile-2': '1536392706976-e486e2ba97af', // dinner table setting
  'ed-tile-3': '1718963581743-10d76f92d42f', // fashion atelier
  'ed-tile-4': '1656214286228-08fdbf520d1e', // marble bathroom

  // Home manifesto pillar minis (4 squares)
  'pillar-mini-1': '1669051759318-e3f68b839d1d', // ceramic still life
  'pillar-mini-2': '1593900119363-1556f45e0c65', // silk ribbon detail
  'pillar-mini-3': '1455390582262-044cdead277a', // handwritten letter
  'pillar-mini-4': '1635612316999-4621560634be', // autumn leaves

  // Testimonial avatars (portraits)
  'avatar-mariana': '1506863530036-1efeddceb993', // elegant woman 30s
  'avatar-luisa':   '1567516364473-233c4b6fcfbe', // young woman smile
  'avatar-camila':  '1655133317714-7fc57c911439', // mature woman

  // Category tiles (home) — distinct from product cards on the same page
  'cat-casa':      '1634665810235-011d663754e7', // cozy interior linen
  'cat-beleza':    '1630893173621-33f717488924', // spa aesthetic flatlay
  'cat-moda':      '1756725520224-8fe4bdd87983', // fashion editorial flatlay
  'cat-cozinha':   '1525973779373-015bdf68e579', // kitchen ceramic bowls
  'cat-presentes': '1593900119363-1556f45e0c65', // silk ribbon detail
  'cat-living':    '1737296968653-2c0620ee5836', // moody candlelight

  // Category page feature arts — distinct from cat tiles AND product cards
  'casa-feature':     '1536392706976-e486e2ba97af', // dinner table setting
  'beleza-feature':   '1656214286228-08fdbf520d1e', // marble bathroom counter
  'moda-feature':     '1619043518800-7f14be467dca', // folded silk fabric
  'cozinha-feature':  '1757071461288-6eedd1e08ee6', // ceramic teapot still life
  'presentes-feature':'1601307666167-910027240bcd', // gift box with ribbon
  'living-feature':   '1737296968653-2c0620ee5836', // moody candlelight

  // Editions covers
  'edicao-xii': '1635612316999-4621560634be', // autumn leaves
  'edicao-xi':  '1769107805528-964f4de0e342', // summer linen
  'edicao-x':   '1575178094668-132dc931ad35', // peonies vase
  'edicao-ix':  '1737296968653-2c0620ee5836', // moody winter

  // Edicao XII page
  'ed-xii-hero': '1578500383798-3255e44ab1c3', // pampas grass vase
  'banner-1':    '1663872585222-b99f36d10223', // candlestick
  'banner-2':    '1575178094668-132dc931ad35', // peonies vase
  'banner-3':    '1591122523233-22037c1dec9f', // olive branches

  // Past editions (archive pages)
  'ed-xi-hero':  '1769107805528-964f4de0e342', // summer linen interior
  'ed-x-hero':   '1575178094668-132dc931ad35', // peonies vase
  'ed-ix-hero':  '1737296968653-2c0620ee5836', // moody winter still life

  // Marca page
  'founder-portrait':  '1590883981100-30832064c22f', // older woman with tea
  'pillar-curadoria':  '1718963581743-10d76f92d42f', // fashion atelier
  'pillar-cuidado':    '1512909006721-3d6018887383', // gift wrapping
  'pillar-acesso':     '1455390582262-044cdead277a'  // handwritten letter
};

function unsplashUrl(photoId, w, h) {
  // Unsplash CDN supports width/height/fit/crop via query params.
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;
}

// Each slot has two URLs: a LOCAL path (assets/img/<seed>.jpg) tried first,
// and a REMOTE Unsplash URL as fallback. Use `tools/gen-images.py` if you
// want to bake higher-quality OpenAI-generated images into the local files.
function localPath(seedStr) {
  return `assets/img/${seedStr}.jpg`;
}
function remoteUrl(seedStr, prompt, w, h) {
  const photoId = UNSPLASH[seedStr];
  if (photoId) return unsplashUrl(photoId, w, h);
  // Unknown slot → graceful generic fallback (cream linen still life).
  return unsplashUrl('1635811831672-179f83a049be', w, h);
}

LURDEX.aiUrl = function (prompt, seedKey, w = 800, h = 800) {
  const seedStr = String(seedKey || (prompt || 'lurdex').slice(0, 48))
    .replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
  return {
    local: localPath(seedStr),
    remote: remoteUrl(seedStr, prompt, w, h)
  };
};

LURDEX.imgFor = function (product, w = 800, h = 800) {
  if (!product) return null;
  return {
    local: localPath(product.id),
    remote: remoteUrl(product.id, product.name || '', w, h)
  };
};

// Optional: AI-generated via Pollinations (rate-limited per IP to 1 concurrent).
LURDEX.aiUrlPollinations = function (prompt, seedKey, w = 800, h = 800) {
  if (!prompt) return null;
  const seed = LURDEX.seedFrom(seedKey || prompt.slice(0, 32));
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${seed}&nologo=true&enhance=true`;
};

LURDEX.fmt = n => 'R$ ' + n.toFixed(2).replace('.', ',');

LURDEX.byCat = cat => LURDEX.products.filter(p => p.cat === cat);
LURDEX.byId  = id  => LURDEX.products.find(p => p.id === id);
