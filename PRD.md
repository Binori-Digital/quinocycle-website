# Product Requirements Document
## Quinocycle.com.my — Carton Box Wholesale Website

**Version:** 1.0
**Date:** 2026-04-07
**Business:** Quinocycle — New & Used Carton Box Wholesale (Malaysia)

---

## 1. Business Overview

Quinocycle supplies new and used carton boxes in bulk to businesses across Malaysia. The website must serve as the primary digital storefront — generating leads, converting buyers, and establishing authority in the packaging and moving supplies space.

**Products offered:**
- New carton boxes (standard and custom sizes)
- Used/recycled carton boxes (eco-friendly, cost-saving option)
- Packaging materials (tape, bubble wrap, fillers — upsell)

---

## 2. Target Audiences

| Segment | Pain Points | Key Message |
|---|---|---|
| **Retail & SME Businesses** | Inconsistent box supply, high per-unit cost | "Never run out of stock. Buy in bulk, save more." |
| **Online Sellers / E-commerce** | Need affordable, right-sized boxes fast | "Pack every order right. Cheap boxes, bulk ready." |
| **Mover Companies** | Need large volume, mixed sizes, quick turnaround | "Moving more? We supply more. Fast bulk orders." |
| **Logistics Companies** | Reliability, consistent quality, invoicing | "Reliable supply. Volume pricing. B2B-friendly." |

---

## 3. Goals & Success Metrics

### Goals
1. Generate qualified inbound leads via WhatsApp / contact form
2. Enable direct product purchases via the mini store
3. Build trust and authority via the blog
4. Rank organically on Google Malaysia for carton box wholesale keywords

### Success Metrics
- WhatsApp / inquiry clicks per week
- Mini store orders per month
- Blog organic traffic (Google Search Console)
- Bounce rate < 50% on landing page
- Average session duration > 2 minutes

---

## 4. Design System

### Theme
- **Primary:** Yellow (`#F5C400`)
- **Secondary:** Black (`#111111`)
- **Neutral:** White (`#FFFFFF`), Light Grey (`#F5F5F5`)
- **Accent text:** Dark Grey (`#444444`)

### Principles
- Minimalist — no clutter, lots of white space
- Bold typography — large headings, short punchy copy
- Mobile-first — majority of Malaysian SME owners browse on phone
- Fast loading — optimised images, lazy load
- Clear CTAs — every section has one action

### Typography
- Headings: Bold sans-serif (e.g. Inter Black or Poppins Bold)
- Body: Regular weight, 16px minimum
- CTA buttons: All caps or bold, high contrast (black on yellow)

---

## 5. Site Architecture

```
quinocycle.com.my/
├── / (Landing Page)
├── /shop (Mini Online Store)
│   ├── /shop/new-boxes
│   ├── /shop/used-boxes
│   └── /shop/product/[slug]
├── /blog
│   └── /blog/[slug]
├── /about
└── /contact
```

---

## 6. Page-by-Page Requirements

---

### 6.1 Landing Page (`/`)

#### 6.1.1 Navigation Bar
- Logo (left) — "QUINOCYCLE" wordmark in black on yellow
- Nav links: Shop | Blog | About | Contact
- Sticky CTA button (right): "Order via WhatsApp" — black background, yellow text
- Mobile: hamburger menu

#### 6.1.2 Hero Section
- Full-width, high-contrast layout
- Background: Black or white with yellow accent strip
- Headline (large, bold): **"Malaysia's Wholesale Carton Box Supplier"**
- Subheadline: **"New & used boxes in bulk — for businesses, movers, and online sellers."**
- Two CTAs:
  - Primary: `Browse the Shop` (yellow button, black text)
  - Secondary: `WhatsApp Us Now` (black button, white text, WhatsApp icon)
- Hero visual: clean product photo or flat-lay of stacked carton boxes

#### 6.1.3 Trust Bar (below hero)
- Single row of social proof chips:
  - "500+ Businesses Served"
  - "Eco-Friendly Used Boxes Available"
  - "Fast Delivery Across Malaysia"
  - "Bulk Pricing, No Minimum" *(or actual minimum if applicable)*

#### 6.1.4 Audience Targeting Section — "Who We Serve"
Four cards, one per audience segment. Each card:
- Icon (bold, monochrome)
- Segment label (e.g. "Online Sellers")
- One-liner pain point solved
- Small CTA link: "See what we have for you →"

Segments:
1. **Retail & SME** — "Stock up your shelves. Never run out."
2. **Online Sellers** — "Right-sized boxes for every product you ship."
3. **Mover Companies** — "High-volume orders, fast turnaround."
4. **Logistics & Warehousing** — "Consistent supply. B2B invoicing available."

#### 6.1.5 Product Highlights Section — "What We Sell"
- Two column split: New Boxes | Used Boxes
- Each side:
  - Photo
  - Key benefits (3 bullet points)
  - Price indication or "Request Quote"
  - CTA: `Shop Now`
- Yellow divider or strip separating the two

#### 6.1.6 How It Works Section
Three-step horizontal flow (icon + label + description):
1. **Browse & Pick** — Choose your box type and size
2. **Order or WhatsApp** — Place order online or chat with us
3. **Deliver to Your Door** — Fast delivery anywhere in Malaysia

#### 6.1.7 Why Choose Quinocycle Section
Four feature tiles (icon + headline + 1-line description):
- Competitive Bulk Pricing
- New & Used Options (eco-conscious)
- Flexible Order Quantities
- Responsive Customer Support (WhatsApp)

#### 6.1.8 Testimonials Section
- 3 quote cards, rotating carousel on mobile
- Each card: quote text, customer name, business type
- Background: light grey or yellow strip

#### 6.1.9 Blog Preview Section
- Section label: "From the Blog"
- 3 latest blog post cards (thumbnail, title, date, read more link)
- CTA: `View All Articles`

#### 6.1.10 Final CTA Banner
- Full-width black or yellow banner
- Headline: **"Ready to Order? Let's Talk."**
- Two buttons: `Shop Now` + `WhatsApp Us`

#### 6.1.11 Footer
- Logo + one-line tagline
- Links: Shop | Blog | About | Contact | Privacy Policy
- Contact: WhatsApp number, email address
- Social icons (if applicable)
- © 2026 Quinocycle. All rights reserved.

---

### 6.2 Mini Online Store (`/shop`)

#### Purpose
Enable customers to browse products, see pricing, and place orders (or be directed to WhatsApp for bulk/custom quotes).

#### Store Requirements

**Product Listing Page (`/shop`)**
- Filter bar: Category (New / Used), Size, Price range
- Product grid (2-col mobile, 3-col desktop)
- Each product card:
  - Photo
  - Product name + size (e.g. "Double Wall Box — L30 x W20 x H20 cm")
  - Price per unit / per bundle
  - "New" or "Used" badge
  - `Add to Cart` button

**Product Detail Page (`/shop/product/[slug]`)**
- Product photos (1 main + gallery)
- Full specs: dimensions, material (single/double wall), condition
- Quantity selector + price calculator (auto-updates total)
- Stock status indicator
- CTA: `Add to Cart` + `Buy Now`
- WhatsApp fallback: "Need a custom quote? → WhatsApp Us"
- Related products

**Cart & Checkout**
- Simple cart drawer or page
- Checkout form: Name, company, phone, email, delivery address
- Payment: Manual bank transfer (FPX/online banking) initially
- Order confirmation via email + WhatsApp notification
- Order summary page

**Store Admin Needs** *(for content management)*
- Add/edit products with photos and specs
- Manage stock levels
- View and update order statuses

---

### 6.3 Blog (`/blog`)

#### Purpose
Drive organic search traffic and educate customers. Target keywords like "how to choose carton box size", "used carton box supplier KL", "eco packaging Malaysia".

#### Blog Requirements

**Blog Listing Page (`/blog`)**
- Grid of articles: thumbnail, category tag, title, date, excerpt
- Category filter: Packaging Tips | Moving Guides | Sustainability | Business Tips
- Search bar

**Article Page (`/blog/[slug]`)**
- Full article with rich text (headers, bullet lists, images)
- Author name + date
- Category tag
- Related articles (3 cards at bottom)
- Social share buttons (WhatsApp, Facebook, X)
- CTA banner at end: "Need boxes? → Shop Now"

**Suggested Initial Blog Topics**
1. How to Choose the Right Carton Box Size for Your Business
2. New vs Used Carton Boxes — Which Is Right for You?
3. How Online Sellers Can Cut Packaging Costs by 40%
4. Moving House in Malaysia? Here's How Many Boxes You'll Need
5. Why Recycled Carton Boxes Are Good for Your Business and the Planet

---

### 6.4 About Page (`/about`)
- Company story (brief, human, trustworthy)
- Mission: affordable, eco-friendly packaging for Malaysian businesses
- Team photo (optional)
- WhatsApp CTA

### 6.5 Contact Page (`/contact`)
- WhatsApp CTA (primary)
- Contact form: Name, Company, Phone, Message
- Business hours
- Location / service area (Malaysia-wide)

---

## 7. Functional Requirements

| Feature | Priority | Notes |
|---|---|---|
| WhatsApp floating button | P0 | Visible on all pages, mobile-friendly |
| Mobile responsive design | P0 | Mobile-first |
| Product catalogue with filtering | P0 | |
| Shopping cart + checkout | P1 | Manual payment initially |
| Blog CMS | P1 | Easy to publish without code |
| SEO meta tags per page | P1 | Title, description, OG tags |
| Product image gallery | P1 | |
| Contact / quote form | P1 | |
| Email order confirmation | P1 | |
| Google Analytics | P1 | |
| Customer testimonials | P2 | |
| Search functionality | P2 | Site-wide + blog |
| Product stock management | P2 | |
| Discount / promo codes | P3 | Future |
| Customer accounts | P3 | Future |
| Live chat | P3 | Future |

---

## 8. Non-Functional Requirements

- **Performance:** Lighthouse score ≥ 85 on mobile
- **SEO:** Semantic HTML, structured data for products, sitemap.xml, robots.txt
- **Accessibility:** WCAG AA contrast ratios (yellow + black combination passes)
- **Security:** HTTPS, form spam protection (honeypot or reCAPTCHA)
- **Hosting:** Malaysia-based or CDN with low latency to SEA
- **Language:** English primary; Bahasa Malaysia secondary (future)

---

## 9. Technology Recommendations

| Layer | Recommendation | Reason |
|---|---|---|
| Framework | Next.js (React) | SEO-friendly, fast, great ecosystem |
| Styling | Tailwind CSS | Rapid UI, consistent design tokens |
| CMS / Blog | Sanity.io or Contentful | Easy non-technical content editing |
| E-commerce | Custom Next.js store or Medusa.js | Full control, no Shopify fees |
| Database | PostgreSQL (via Supabase) | Free tier, managed, real-time |
| Payments | iPay88 / Billplz (Malaysia) | FPX local bank transfers |
| Hosting | Vercel (Next.js) | Free tier, auto-scaling, CDN |
| WhatsApp | wa.me deep link + floating button | Zero cost, highest conversion |
| Analytics | Google Analytics 4 + Search Console | Free, industry standard |
| Images | Cloudinary | Optimised delivery, free tier |

---

## 10. Content Requirements

### Copy Tone of Voice
- Direct and confident — no fluff
- Practical and solutions-focused
- Friendly but professional
- Malaysian English acceptable (Manglish sparingly for blog)

### Images Needed
- Hero shot: stacked carton boxes (clean, well-lit)
- Product photos: each SKU from multiple angles
- Process/lifestyle: boxes being packed, loaded into vans
- Blog thumbnails: illustrative, branded with yellow accent

---

## 11. Phased Rollout

### Phase 1 — MVP (Launch Ready)
- Landing page (all sections)
- Static product catalogue with WhatsApp CTA (no cart yet)
- Contact page
- Basic SEO setup
- Mobile responsive

### Phase 2 — Store Live
- Full mini store with cart and checkout
- Manual bank transfer payment
- Order confirmation email
- Product management admin

### Phase 3 — Blog & Growth
- Blog CMS live
- 5 seed articles published
- Google Search Console connected
- Analytics dashboard

### Phase 4 — Optimisation
- Customer accounts
- Promo codes
- Bahasa Malaysia version
- Retargeting pixels (Meta / Google Ads)

---

## 12. Open Questions

1. What is the minimum order quantity (MOQ) for wholesale pricing?
2. Are there fixed price tiers or is pricing always quoted per inquiry?
3. Which geographic areas does delivery cover (Klang Valley only vs nationwide)?
4. Is there a physical address / pickup option?
5. Will the blog be written in-house or outsourced?
6. What payment methods should be supported at launch (FPX, cash, cheque)?
7. Are there existing product photos or will new ones be needed?
8. Should the used box inventory be shown with available quantity (live stock)?

---

*PRD prepared for Quinocycle.com.my — Subject to revision based on stakeholder feedback.*
