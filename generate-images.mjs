/**
 * Quinocycle Image Generator
 * Uses Google Gemini Imagen 3 REST API (no npm packages needed — requires Node 18+).
 *
 * Usage:
 *   GEMINI_API_KEY=your_key node generate-images.mjs
 *
 * Get a free API key at: https://aistudio.google.com/apikey
 */

import fs from 'fs';
import path from 'path';

// Gemini API key is optional — used for Gemini models if billing is enabled.
// Falls back to Pollinations.ai (free, no key required).
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const USE_GEMINI = !!GEMINI_KEY;

const OUTPUT_DIR = './public/images';
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Image definitions
// aspectRatio options: "1:1" | "4:3" | "3:4" | "16:9" | "9:16"
// ---------------------------------------------------------------------------
const IMAGES = [
  // ── HERO ──────────────────────────────────────────────────────────────────
  {
    filename: 'hero-boxes.jpg',
    aspectRatio: '16:9',
    prompt:
      'Dark cinematic dramatic warehouse scene, towering stacks of brown corrugated carton boxes, industrial overhead lights casting sharp shadows, rich deep shadows, high contrast, photorealistic, professional product photography, golden light beam, moody cinematic atmosphere, no people',
  },

  // ── PRODUCT PANELS ────────────────────────────────────────────────────────
  {
    filename: 'product-new.jpg',
    aspectRatio: '3:4',
    prompt:
      'Pristine brand new corrugated cardboard boxes neatly stacked on a pallet, clean brown cardboard, fresh manufacturing texture, studio product photography, dark background, dramatic lighting, professional, no text, no logos',
  },
  {
    filename: 'product-used.jpg',
    aspectRatio: '3:4',
    prompt:
      'Slightly worn but structurally strong recycled eco-friendly cardboard boxes stacked neatly, natural worn texture, dark moody background, dramatic side lighting, photorealistic, sustainable packaging, no text, no logos',
  },

  // ── SHOP PRODUCT CARDS ────────────────────────────────────────────────────
  {
    filename: 'box-new-s.jpg',
    aspectRatio: '4:3',
    prompt:
      'Single small new corrugated cardboard box, clean crisp brown cardboard, isolated on very dark charcoal background, cinematic product photography, sharp edges, dramatic lighting from above-left, three-quarter view, no text, no labels',
  },
  {
    filename: 'box-new-m.jpg',
    aspectRatio: '4:3',
    prompt:
      'Single medium new corrugated cardboard box, pristine brown cardboard, isolated on very dark charcoal background, cinematic product photography, dramatic studio lighting, three-quarter view, no text, no labels',
  },
  {
    filename: 'box-new-l.jpg',
    aspectRatio: '4:3',
    prompt:
      'Single large new double-wall corrugated cardboard box, thick strong brown cardboard, isolated on very dark charcoal background, cinematic product photography, dramatic lighting, visible corrugated texture, no text, no labels',
  },
  {
    filename: 'box-new-xl.jpg',
    aspectRatio: '4:3',
    prompt:
      'Single extra large new double-wall corrugated cardboard box, heavy-duty thick brown cardboard, isolated on very dark charcoal background, cinematic product photography, imposing size, dramatic lighting, no text, no labels',
  },
  {
    filename: 'box-used-s.jpg',
    aspectRatio: '4:3',
    prompt:
      'Single small recycled used corrugated cardboard box, slightly worn texture, eco-friendly second-life packaging, very dark matte background, dramatic side lighting, photorealistic, structurally intact, no text, no labels',
  },
  {
    filename: 'box-used-m.jpg',
    aspectRatio: '4:3',
    prompt:
      'Single medium recycled used corrugated cardboard box, eco-friendly worn texture, very dark matte background, cinematic product photography, warm side lighting, sustainable packaging aesthetic, no text, no labels',
  },
  {
    filename: 'box-used-l.jpg',
    aspectRatio: '4:3',
    prompt:
      'Single large recycled used double-wall cardboard box, sturdy eco-friendly appearance, natural worn brown cardboard, very dark atmospheric background, dramatic product lighting, no text, no labels',
  },
  {
    filename: 'box-used-xl.jpg',
    aspectRatio: '4:3',
    prompt:
      'Single extra large recycled used double-wall cardboard box, heavy-duty eco-friendly worn cardboard, very dark moody background, dramatic lighting, sustainable warehouse aesthetic, no text, no labels',
  },

  // ── AUDIENCE SECTION ──────────────────────────────────────────────────────
  {
    filename: 'audience-retail.jpg',
    aspectRatio: '4:3',
    prompt:
      'Organised Malaysian retail store backroom with cardboard boxes stacked on shelves, warm shopfront lighting, cinematic atmosphere, photorealistic, no visible faces',
  },
  {
    filename: 'audience-online.jpg',
    aspectRatio: '4:3',
    prompt:
      'Online seller workspace with carton boxes and e-commerce parcels, organised packing table, cinematic overhead shot, warm home office lighting, photorealistic, no visible faces',
  },
  {
    filename: 'audience-mover.jpg',
    aspectRatio: '4:3',
    prompt:
      'Stacked cardboard moving boxes inside a moving truck being loaded, dramatic cinematic lighting, strong contrast, photorealistic, no visible faces',
  },
  {
    filename: 'audience-logistics.jpg',
    aspectRatio: '4:3',
    prompt:
      'Large logistics warehouse with tall shelves loaded with cardboard boxes and pallets, industrial overhead lighting, cinematic scale, photorealistic, no people',
  },

  // ── BLOG FEATURED IMAGES ──────────────────────────────────────────────────
  {
    filename: 'blog-choose-box-size.jpg',
    aspectRatio: '16:9',
    prompt:
      'Person measuring a cardboard box with a yellow measuring tape, various sizes of carton boxes laid out on a warehouse floor, cinematic overhead perspective, dramatic lighting, photorealistic, no visible faces',
  },
  {
    filename: 'blog-new-vs-used.jpg',
    aspectRatio: '16:9',
    prompt:
      'Side-by-side comparison of a brand new pristine cardboard box and a used recycled cardboard box on a dark surface, dramatic split lighting, cinematic product photography, photorealistic, no text',
  },
  {
    filename: 'blog-cut-packaging-costs.jpg',
    aspectRatio: '16:9',
    prompt:
      'E-commerce seller packing product orders into cardboard boxes with a calculator and coins showing cost savings, warm workspace lighting, overhead cinematic angle, photorealistic, no visible faces',
  },
  {
    filename: 'blog-movers-guide.jpg',
    aspectRatio: '16:9',
    prompt:
      'Neat rows of packed labelled cardboard boxes in a living room ready for moving day, organised and systematic, cinematic natural window light, photorealistic, no visible faces',
  },

  // ── OG DEFAULT ────────────────────────────────────────────────────────────
  {
    filename: 'og-default.jpg',
    aspectRatio: '16:9',
    prompt:
      'Premium wholesale carton boxes, stacks of clean brown cardboard boxes on a dark dramatic background, golden yellow accent lighting, cinematic and professional, photorealistic, no text',
  },
];

// ---------------------------------------------------------------------------
// Dimensions map for aspect ratios
// ---------------------------------------------------------------------------
const DIMS = {
  '16:9': { w: 1280, h: 720 },
  '4:3':  { w: 1024, h: 768 },
  '3:4':  { w: 768,  h: 1024 },
  '1:1':  { w: 1024, h: 1024 },
};

// ---------------------------------------------------------------------------
// Generator — uses Gemini (if key + billing) or Pollinations.ai (free fallback)
// ---------------------------------------------------------------------------
async function generateImage({ filename, prompt, aspectRatio }) {
  const outPath = path.join(OUTPUT_DIR, filename);

  if (fs.existsSync(outPath)) {
    console.log(`  ↷ Skip (exists): ${filename}`);
    return true;
  }

  console.log(`  ⟳ Generating: ${filename} ...`);

  try {
    if (USE_GEMINI) {
      return await generateViaGemini({ outPath, prompt, aspectRatio });
    } else {
      return await generateViaPollinations({ outPath, filename, prompt, aspectRatio });
    }
  } catch (err) {
    console.error(`  ✗ Failed: ${filename} — ${err.message}`);
    return false;
  }
}

async function generateViaGemini({ outPath, prompt, aspectRatio }) {
  const model = 'gemini-2.5-flash-image';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
  const { w, h } = DIMS[aspectRatio] || DIMS['4:3'];
  const body = {
    contents: [{ parts: [{ text: `${prompt}. Output at ${w}x${h} pixels.` }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  };
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) { const t = await res.text(); throw new Error(`HTTP ${res.status}: ${t}`); }
  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
  if (!imgPart) throw new Error(`No image in response`);
  const ext = imgPart.inlineData.mimeType === 'image/png' ? 'png' : 'jpg';
  const actualPath = outPath.replace(/\.\w+$/, `.${ext}`);
  fs.writeFileSync(actualPath, Buffer.from(imgPart.inlineData.data, 'base64'));
  console.log(`  ✓ Saved (Gemini): ${path.basename(actualPath)}`);
  return true;
}

async function generateViaPollinations({ outPath, filename, prompt, aspectRatio }) {
  const { w, h } = DIMS[aspectRatio] || DIMS['4:3'];
  const seed = Math.floor(Math.random() * 9999);
  const encodedPrompt = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${w}&height=${h}&seed=${seed}&nologo=true&enhance=true&model=flux`;

  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const contentType = res.headers.get('content-type') || '';
  const ext = contentType.includes('png') ? 'png' : 'jpg';
  const actualPath = outPath.replace(/\.\w+$/, `.${ext}`);

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(actualPath, buf);
  console.log(`  ✓ Saved (Pollinations): ${path.basename(actualPath)}`);
  return true;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\nQuinocycle Image Generator`);
  console.log(`Backend: ${USE_GEMINI ? 'Gemini (gemini-2.5-flash-image)' : 'Pollinations.ai (flux, free)'}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Images: ${IMAGES.length} total\n`);

  let success = 0;
  let fail = 0;

  for (const img of IMAGES) {
    const ok = await generateImage(img);
    if (ok) success++; else fail++;
    // Small delay to respect rate limits (10 QPM on free tier)
    await new Promise(r => setTimeout(r, 800));
  }

  console.log(`\n──────────────────────────────────`);
  console.log(`✓ Generated: ${success}  ✗ Failed: ${fail}`);
  console.log(`\nAll images saved to: ${OUTPUT_DIR}`);
  console.log('Now run: npm run build  (or npm run dev)');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
