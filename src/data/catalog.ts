// SINGLE SOURCE OF TRUTH for the product catalog.
// Synced from shop.quinocycle.com (live store) on 2026-08-18.
// When stock or prices change on the shop, update THIS file only —
// /shop/, /used-carton-boxes/, /kotak-pindah-rumah/, /kotak-terpakai/,
// the homepage price table and the kedai-kotak blog post all read from here.
// Images: /public/images/shop/*.webp (downloaded from shop.quinocycle.com).

export interface Box {
  id: string;
  cond: 'new' | 'used';
  name: string;        // English display name (matches shop.quinocycle.com listing)
  nameMS: string;      // Malay display name
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  dims: string;        // mm
  wall: 'Single Wall' | 'Double Wall' | '';  // '' = unspecified on the shop listing
  price: number;       // RM per unit
  inStock: boolean;
  use: string;         // English use-case
  useMS: string;       // Malay use-case
  img: string;
}

export const newBoxes: Box[] = [
  { id: 'n-xs',    cond: 'new', name: 'Mini Size New Carton Box XS',   nameMS: 'Kotak Baru Mini XS',        size: 'XS',  dims: '170 × 115 × 150 mm', wall: 'Single Wall', price: 1.10,  inStock: true, use: 'Jewellery, cosmetics, small items',      useMS: 'Aksesori, kosmetik, barang kecil',        img: '/images/shop/mini-size-new-carton-box-xs.webp' },
  { id: 'n-a4',    cond: 'new', name: 'Small Size Carton Box A4',      nameMS: 'Kotak Baru Kecil A4',       size: 'S',   dims: '310 × 220 × 220 mm', wall: 'Single Wall', price: 3.00,  inStock: true, use: 'Books, apparel, online orders',          useMS: 'Buku, pakaian, pesanan online',           img: '/images/shop/small-size-carton-box-a4.webp' },
  { id: 'n-jpm',   cond: 'new', name: 'Small Size Document Box JPM',   nameMS: 'Kotak Dokumen JPM',         size: 'S',   dims: '380 × 185 × 250 mm', wall: '',            price: 3.50,  inStock: true, use: 'Documents, files, office items',         useMS: 'Dokumen, fail, barang pejabat',           img: '/images/shop/small-size-document-box-jpm.webp' },
  { id: 'n-q440',  cond: 'new', name: 'Medium Size Box Q440',          nameMS: 'Kotak Baru Sederhana Q440', size: 'M',   dims: '440 × 310 × 310 mm', wall: '',            price: 3.50,  inStock: true, use: 'Home goods, general packing',            useMS: 'Barangan rumah, packing am',              img: '/images/shop/medium-size-box-q440.webp' },
  { id: 'n-a3',    cond: 'new', name: 'Medium Size Box A3',            nameMS: 'Kotak Baru Sederhana A3',   size: 'M',   dims: '440 × 310 × 230 mm', wall: 'Double Wall', price: 5.00,  inStock: true, use: 'Kitchenware, fragile goods',             useMS: 'Barangan dapur, pecah belah',             img: '/images/shop/medium-size-box-a3.webp' },
  { id: 'n-mr',    cond: 'new', name: 'Medium Size Box MR',            nameMS: 'Kotak Baru Sederhana MR',   size: 'M',   dims: '540 × 400 × 310 mm', wall: '',            price: 7.00,  inStock: true, use: 'Larger household items',                 useMS: 'Barangan rumah besar',                    img: '/images/shop/medium-size-box-mr.webp' },
  { id: 'n-nln',   cond: 'new', name: 'Large Size New Carton Box NLN', nameMS: 'Kotak Baru Besar NLN',      size: 'L',   dims: '590 × 390 × 390 mm', wall: 'Double Wall', price: 8.00,  inStock: true, use: 'Moving house, heavy goods',              useMS: 'Pindah rumah, barang berat',              img: '/images/shop/large-size-new-carton-box-nln.webp' },
  { id: 'n-xl',    cond: 'new', name: 'Jumbo Size Box XL',             nameMS: 'Kotak Jumbo XL',            size: 'XL',  dims: '485 × 485 × 500 mm', wall: 'Double Wall', price: 9.00,  inStock: true, use: 'Pillows, blankets, bulky light items',   useMS: 'Bantal, selimut, barang besar ringan',    img: '/images/shop/jumbo-size-box-xl.webp' },
  { id: 'n-bw800', cond: 'new', name: 'Jumbo XXL Cargo Box BW800',     nameMS: 'Kotak Kargo XXL BW800',     size: 'XXL', dims: '800 × 400 × 800 mm', wall: '',            price: 28.00, inStock: true, use: 'Cargo, bulk shipping',                   useMS: 'Kargo, penghantaran pukal',               img: '/images/shop/jumbo-xxl-cargo-box-bw800.webp' },
  { id: 'n-t760',  cond: 'new', name: 'Jumbo XXL Cargo Box T760',      nameMS: 'Kotak Kargo XXL T760',      size: 'XXL', dims: '760 × 760 × 760 mm', wall: '',            price: 38.00, inStock: true, use: 'Large cargo, equipment, export',         useMS: 'Kargo besar, peralatan, eksport',         img: '/images/shop/jumbo-xxl-cargo-box-t760.webp' },
];

export const usedBoxes: Box[] = [
  { id: 'u-ain',    cond: 'used', name: 'Used Carton Box Ain',    nameMS: 'Kotak Terpakai Ain',    size: 'S',  dims: '320 × 165 × 230 mm', wall: 'Single Wall', price: 0.90, inStock: false, use: 'Books, accessories, small items',       useMS: 'Buku, aksesori, barang kecil',         img: '/images/shop/small-size-used-carton-box-ain.webp' },
  { id: 'u-hamee',  cond: 'used', name: 'Used Carton Hamee 12',   nameMS: 'Kotak Terpakai Hamee 12', size: 'S', dims: '340 × 280 × 260 mm', wall: 'Single Wall', price: 1.20, inStock: false, use: 'Books, apparel, stationery',            useMS: 'Buku, pakaian, alat tulis',            img: '/images/shop/small-size-used-carton-hamee-12.webp' },
  { id: 'u-dua',    cond: 'used', name: 'Used Carton DUA',        nameMS: 'Kotak Terpakai DUA',    size: 'M',  dims: '360 × 240 × 390 mm', wall: 'Double Wall', price: 1.50, inStock: false, use: 'Bottles, tall items',                   useMS: 'Botol, barang tinggi',                 img: '/images/shop/medium-size-used-carton-dua.webp' },
  { id: 'u-mg',     cond: 'used', name: 'Used Carton MG',         nameMS: 'Kotak Terpakai MG',     size: 'S',  dims: '380 × 230 × 270 mm', wall: 'Double Wall', price: 1.70, inStock: true,  use: 'Moving house, parcel shipping',         useMS: 'Pindah rumah, pos barang',             img: '/images/shop/small-size-used-carton-mg.webp' },
  { id: 'u-bary',   cond: 'used', name: 'Used Carton Box Bary',   nameMS: 'Kotak Terpakai Bary',   size: 'S',  dims: '300 × 200 × 250 mm', wall: 'Double Wall', price: 1.80, inStock: true,  use: 'Kitchen items, small electronics',      useMS: 'Barangan dapur, elektronik kecil',     img: '/images/shop/small-size-used-carton-box-bary.webp' },
  { id: 'u-bt',     cond: 'used', name: 'Used Carton Box BT',     nameMS: 'Kotak Terpakai BT',     size: 'S',  dims: '390 × 250 × 230 mm', wall: 'Double Wall', price: 2.20, inStock: true,  use: 'Moving house, storage',                 useMS: 'Pindah rumah, simpanan',               img: '/images/shop/small-size-used-carton-box-bt.webp' },
  { id: 'u-yellow', cond: 'used', name: 'Used Carton Box Yellow', nameMS: 'Kotak Terpakai Yellow', size: 'M',  dims: '460 × 330 × 310 mm', wall: 'Double Wall', price: 3.50, inStock: true,  use: 'Moving house, retail packing',          useMS: 'Pindah rumah, packing runcit',         img: '/images/shop/medium-size-used-carton-box-yellow.webp' },
  { id: 'u-vital',  cond: 'used', name: 'Used Carton Box Vital',  nameMS: 'Kotak Terpakai Vital',  size: 'M',  dims: '530 × 380 × 260 mm', wall: 'Double Wall', price: 3.50, inStock: true,  use: 'Home goods, store-room storage',        useMS: 'Barangan rumah, simpanan stor',        img: '/images/shop/medium-size-used-carton-box-vital.webp' },
  { id: 'u-alp5',   cond: 'used', name: 'Used Carton Box ALP 5',  nameMS: 'Kotak Terpakai ALP 5',  size: 'L',  dims: '580 × 480 × 400 mm', wall: 'Single Wall', price: 3.50, inStock: true,  use: 'Bulky light items, apparel',            useMS: 'Barang besar ringan, pakaian',         img: '/images/shop/large-size-used-carton-box-alp-5.webp' },
  { id: 'u-alp6',   cond: 'used', name: 'Used Carton Box ALP 6',  nameMS: 'Kotak Terpakai ALP 6',  size: 'L',  dims: '580 × 480 × 460 mm', wall: 'Single Wall', price: 3.50, inStock: false, use: 'Bulky light items',                     useMS: 'Barang besar ringan',                  img: '/images/shop/large-size-used-carton-box-alp-6.webp' },
  { id: 'u-ever',   cond: 'used', name: 'Used Carton EVER',       nameMS: 'Kotak Terpakai EVER',   size: 'M',  dims: '490 × 310 × 290 mm', wall: 'Double Wall', price: 4.00, inStock: false, use: 'Heavy goods (super solid)',             useMS: 'Barang berat (super solid)',           img: '/images/shop/medium-size-super-solid-used-carton-ever.webp' },
  { id: 'u-pdc',    cond: 'used', name: 'Used Carton Box PDC',    nameMS: 'Kotak Terpakai PDC',    size: 'L',  dims: '590 × 380 × 380 mm', wall: 'Double Wall', price: 5.00, inStock: true,  use: 'House/office moving, files',            useMS: 'Pindah rumah/pejabat, fail',           img: '/images/shop/large-size-used-carton-box-pdc.webp' },
  { id: 'u-golden', cond: 'used', name: 'Used Carton Box Golden', nameMS: 'Kotak Terpakai Golden', size: 'XL', dims: '510 × 510 × 510 mm', wall: 'Double Wall', price: 6.00, inStock: true,  use: 'Jumbo — pillows, blankets, cargo',      useMS: 'Jumbo — bantal, selimut, kargo',       img: '/images/shop/jumbo-size-used-carton-box-golden.webp' },
];

export const allBoxes: Box[] = [...newBoxes, ...usedBoxes];
export const usedInStock = usedBoxes.filter(b => b.inStock);
export const cheapestUsedInStock = Math.min(...usedInStock.map(b => b.price));   // RM1.70 (MG)
export const cheapestNew = Math.min(...newBoxes.map(b => b.price));              // RM1.10 (XS)
export const SHOP_URL = 'https://shop.quinocycle.com';
export const CATALOG_CHECKED = '2026-08-18';
