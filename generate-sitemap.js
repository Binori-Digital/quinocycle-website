import fs from 'fs';
import path from 'path';

const blogDir = './src/pages/blog';

// Get all blog post files
const blogFiles = fs.readdirSync(blogDir)
  .filter(file => file.endsWith('.astro') && file !== 'index.astro')
  .map(file => file.replace('.astro', ''))
  .sort();

// Map files to their lastmod dates (based on commit dates)
const dateMap = {
  // 2026-04-13 batch (20 posts)
  'borong-pembungkusan-pasar-malam-0413': '2026-04-13',
  'bubble-wrap-anti-statik-elektronik-0413': '2026-04-13',
  'bubble-wrap-electronics-antistatic-0413': '2026-04-13',
  'carton-box-flute-types-guide-0413': '2026-04-13',
  'corrugated-sheets-dividers-furniture-0413': '2026-04-13',
  'custom-boxes-roi-branded-packaging-0413': '2026-04-13',
  'honeycomb-cardboard-marble-granite-tiles-0413': '2026-04-13',
  'honeycomb-jubin-marmar-granit-0413': '2026-04-13',
  'jenis-flute-kotak-kardus-panduan-0413': '2026-04-13',
  'kepingan-kadbod-lapisan-pelindung-0413': '2026-04-13',
  'kotak-kardus-baru-fb-penghantaran-0413': '2026-04-13',
  'kotak-terpakai-jimat-alam-sekitar-0413': '2026-04-13',
  'kotak-tersuai-pulangan-pelaburan-0413': '2026-04-13',
  'moving-subang-shah-alam-packing-0413': '2026-04-13',
  'new-carton-boxes-food-delivery-0413': '2026-04-13',
  'pindah-rumah-klang-valley-senarai-0413': '2026-04-13',
  'susunatur-stesen-packing-gudang-0413': '2026-04-13',
  'used-carton-boxes-sustainable-sme-0413': '2026-04-13',
  'warehouse-packing-station-workflow-0413': '2026-04-13',
  'wholesale-packaging-night-market-reseller-0413': '2026-04-13',
  
  // 2026-04-10 batch (20 posts)
  'carton-box-size-guide-ecommerce-malaysia': '2026-04-10',
  'panduan-saiz-kotak-kardus-ecommerce': '2026-04-10',
  'used-carton-boxes-near-me-balakong': '2026-04-10',
  'kotak-terpakai-berdekatan-balakong': '2026-04-10',
  'corrugated-cardboard-sheets-uses-malaysia': '2026-04-10',
  'kegunaan-kepingan-kadbod-gelombang-perniagaan': '2026-04-10',
  'honeycomb-cardboard-vs-bubble-wrap-malaysia': '2026-04-10',
  'kadbod-honeycomb-vs-bubble-wrap-barang-berat': '2026-04-10',
  'bubble-wrap-sizes-guide-malaysia': '2026-04-10',
  'panduan-saiz-bubble-wrap-penjual-online': '2026-04-10',
  'packaging-materials-guide-malaysia': '2026-04-10',
  'panduan-bahan-pembungkusan-malaysia-kos': '2026-04-10',
  'how-to-reduce-packaging-costs-warehouse-malaysia': '2026-04-10',
  'cara-kurang-kos-pembungkusan-gudang-malaysia': '2026-04-10',
  'packing-fragile-items-moving-malaysia': '2026-04-10',
  'cara-bungkus-barang-pecah-belah-pindah-rumah': '2026-04-10',
  'custom-box-design-tips-malaysia': '2026-04-10',
  'tips-reka-bentuk-kotak-tersuai-ecommerce-malaysia': '2026-04-10',
};

// Default to 2026-04-09 for earlier posts
const getLastMod = (slug) => dateMap[slug] || '2026-04-09';

// Generate sitemap XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n';

// Core pages
const corePages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/shop/', priority: '0.9', changefreq: 'weekly' },
  { loc: '/about/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact/', priority: '0.7', changefreq: 'monthly' },
];

xml += '  <!-- Core pages -->\n';
corePages.forEach(page => {
  xml += '  <url>\n';
  xml += `    <loc>https://www.quinocycle.com.my${page.loc}</loc>\n`;
  xml += `    <lastmod>2026-04-13</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '\n  <!-- Blog index -->\n';
xml += '  <url>\n';
xml += '    <loc>https://www.quinocycle.com.my/blog/</loc>\n';
xml += '    <lastmod>2026-04-13</lastmod>\n';
xml += '    <changefreq>weekly</changefreq>\n';
xml += '    <priority>0.8</priority>\n';
xml += '  </url>\n';

xml += '\n  <!-- Blog posts (' + blogFiles.length + ' total) -->\n';
blogFiles.forEach(slug => {
  const lastmod = getLastMod(slug);
  xml += '  <url>\n';
  xml += `    <loc>https://www.quinocycle.com.my/blog/${slug}/</loc>\n`;
  xml += `    <lastmod>${lastmod}</lastmod>\n`;
  xml += '    <changefreq>monthly</changefreq>\n';
  xml += '    <priority>0.7</priority>\n';
  xml += '  </url>\n';
});

xml += '\n</urlset>\n';

// Write to file
fs.writeFileSync('./public/sitemap.xml', xml);
console.log(`✓ Generated sitemap.xml with ${blogFiles.length} blog posts`);
