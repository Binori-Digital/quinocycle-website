---
title: "Warehouse Carton Labelling System: Build a Simple SKU Setup in a Day"
description: "Build a warehouse carton labelling system for under RM100: label anatomy with SKU, qty and date-in, colour codes, thermal vs handwritten costs, and count sheets."
category: "Warehouse Packaging"
img: "/images/blog-choose-box-size.jpg"
date: "2026-09-30"
readTime: "8 min"
lang: "en"
keywords:
  - "warehouse carton labelling system"
  - "simple sku system small warehouse"
  - "carton label format sku qty"
  - "thermal printer vs handwritten labels"
  - "colour coding warehouse stock"
  - "stock count sheet template"
  - "spreadsheet vs wms for sme"
  - "labelling cartoned stock malaysia"
directAnswer: "A working warehouse carton labelling system needs 4 fields on every box: SKU code, quantity, date-in and batch/PO reference — written on the side facing the aisle. Start with a marker pen and RM10 of label stickers; upgrade to a thermal printer (from around RM200) past 50 cartons a week. A spreadsheet running count beats WMS software for most SMEs under 500 SKUs."
faqs:
  - q: "What should a warehouse carton label include?"
    a: "Four fields minimum: SKU code, quantity inside, date received and a batch or PO reference. Optional but useful: a short plain-language description so temps don't need the code sheet. Write large enough to read from 2–3 metres, and always on the carton side that faces the aisle, never the top."
  - q: "How do I create simple SKU codes for my products?"
    a: "Use a short structured pattern: category, product, variant — for example TS-BLK-M for a black t-shirt in medium. Keep codes under 10 characters, avoid letters easily misread as numbers (O and 0, I and 1), and never encode information that changes, like price or supplier. Consistency matters more than cleverness."
  - q: "Is a thermal printer worth it for a small warehouse?"
    a: "Past roughly 50 cartons a week, yes. A basic thermal label printer costs around RM200–RM400 and blank labels work out to a few sen each with no ink to buy, versus near-zero equipment cost but slower, less legible handwritten labels. Below that volume, a good marker pen and RM10 sticker packs are perfectly adequate."
  - q: "Do I need WMS software or is a spreadsheet enough?"
    a: "Under roughly 500 SKUs and a handful of staff, a disciplined spreadsheet — SKU, location, running count, updated at receiving and packing — beats most WMS software: zero cost, no training, and everyone already knows Excel or Google Sheets. WMS earns its subscription when you hit multiple pickers, thousands of SKUs or barcode scanning needs."
  - q: "Where should labels go on stacked cartons in racking?"
    a: "On the side facing the picking aisle, upper half of the panel, one consistent corner. Top-of-box labels vanish the moment another carton stacks on top. For uniform double-wall cartons like the RM3.50 Yellow box, pick one corner — say top-left of the aisle-facing side — and apply it identically on every box."
---

Walk into a struggling stockroom and you will see the same scene: cartons everywhere, contents a mystery, and one person — always just one — who "knows where everything is". That person is your labelling system, and they take annual leave. Replacing tribal memory with labels takes a day and less than RM100, and it is the foundation that layout and [picking methods](/blog/warehouse-stock-picking-methods/) are built on.

## The Anatomy of a Carton Label That Works

Every carton of stock needs four fields, no exceptions:

| Field | Example | Why it matters |
|---|---|---|
| SKU code | TS-BLK-M | Identifies the item without opening the box |
| Quantity | QTY: 48 | Enables at-a-glance stock counts |
| Date-in | IN: 30/09/26 | Makes FIFO rotation possible |
| Batch/PO ref | PO-2609 | Traces stock to a supplier order if there's a defect |

Add a fifth, optional line — a short plain-language description ("T-shirt hitam, saiz M") — and even a part-timer hired for the 11.11 rush can work your stockroom without the code sheet.

Two rules on placement: write **big** (readable from 2–3 metres away, so pickers do not climb racking to squint) and label the **side facing the aisle**, never the top. The moment a second carton stacks on top, a top label ceases to exist.

## Designing SKU Codes You Won't Regret

Keep the pattern short and structured: **category – product – variant**. TS-BLK-M reads instantly as t-shirt, black, medium. Guidelines that save pain later:

- Under 10 characters. Long codes get truncated, misread and mis-copied.
- Avoid O/0 and I/1 together — on a handwritten label they are indistinguishable.
- Never encode things that change: price, supplier, storage location. When the price changes you do not want to relabel 200 cartons.
- One master list, one owner. New SKUs get created in the master sheet first, label second.

Resist the urge to over-engineer. A five-SKU business does not need a nine-segment code — it needs consistency.

## Colour Codes: The Layer Your Eyes Read First

Colour is faster than text. Assign one colour per product category — a strip of coloured tape or a coloured dot sticker beside the label:

- Red = electronics, Blue = apparel, Green = consumables, Yellow = fragile.

Now a picker heading for apparel scans for blue at walking pace instead of reading every label, and a red carton sitting in the apparel zone announces itself as misplaced from across the room. Coloured tape costs a few ringgit a roll; keep the legend printed at the packing table and on the racking end-caps. This pairs naturally with the zoned layout in our [small warehouse layout guide](/blog/susun-atur-gudang-kecil-sme/) — one colour per zone, one glance to spot strays.

## Handwritten vs Thermal Printer: The Honest Cost Comparison

| | Marker + stickers | Thermal label printer |
|---|---|---|
| Upfront cost | ~RM10–RM20 | ~RM200–RM400 |
| Cost per label | Under 5 sen | A few sen (no ink — thermal paper) |
| Speed | ~30–60 sec per carton | ~5 sec per carton |
| Legibility | Depends on handwriting | Always consistent |
| Barcode-ready | No | Yes — future scanning option |
| Best for | Under ~50 cartons/week | 50+ cartons/week |

The honest advice: start handwritten. A marker pen system that runs every day beats a printer still in its box. The upgrade point is volume — past roughly 50 cartons a week, the printer pays for itself in labour within months, and thermal printing opens the door to barcodes later without changing your SKU system.

> **Tip:** Whatever you print or write on, standardise the label position — same corner, same side, every carton. Uniform cartons make this effortless: on a stack of [Yellow used boxes](/used-carton-boxes/) (460 × 330 × 310 mm, RM3.50, double wall), identically-placed labels line up into a readable column, and a missing label is obvious immediately.

## The Running Count Sheet: Live Stock Without Software

A label tells you what is in one carton; a running count sheet tells you what is in the whole stockroom. One spreadsheet, one row per SKU:

**SKU | Description | Location | Qty in | Qty out | Running balance | Last updated**

The discipline that makes it work is a single rule: **stock only moves when the sheet moves.** Receiving logs cartons in before they hit the rack; packing logs quantities out at the end of each session (batch it — per-order updates are unrealistic without scanning). Do a quick cycle count of a few SKUs each week rather than one giant painful year-end count, and the sheet stays honest.

Google Sheets is ideal here: free, live on the packing-table phone, and multiple staff can update without emailing files around.

## When a Spreadsheet Beats WMS — and When It Stops

For most Malaysian SMEs the spreadsheet is not the compromise; it is the right tool. Under roughly 500 SKUs, one or two people touching stock, single location — a disciplined sheet gives you 90% of a WMS at 0% of the cost, with no subscription, no training and no vendor lock-in.

WMS software earns its monthly fee when specific pains appear: multiple pickers working simultaneously (spreadsheet update conflicts), thousands of SKUs, barcode scanning to kill mispicks, or marketplace integrations syncing stock across Shopee, Lazada and TikTok Shop in real time. Until one of those pains is yours weekly, keep the RM99-a-month subscription money and spend RM20 of it on markers and tape.

## Set It Up This Week

Day one: write the SKU master list and colour legend. Day two: label everything currently on the racking, oldest stock first (the date-in field will be an estimate — that is fine). From day three, enforce the one rule that keeps the whole system alive: nothing enters the stockroom unlabelled — not "will label later", not "it's obvious what's inside". Brief every staff member on the label format in one five-minute huddle, and pin an example label at the receiving area so there is never an excuse.

Consistent labels work best on consistent cartons — one or two standard sizes that stack square and present labels at the same height. Our Balakong warehouse stocks uniform used cartons from RM0.90 and new from RM1.10; browse the [full carton range](/carton-box/) with exact dimensions or order at [shop.quinocycle.com](https://shop.quinocycle.com) — free delivery in KL and Selangor from RM300, wholesale rates from RM1,000. Or just [WhatsApp us a photo of your stockroom](https://wa.me/60168916381?text=Hi%2C%20I%20need%20uniform%20cartons%20for%20my%20stockroom) and we will recommend a carton size that fits your racking and your labels.
