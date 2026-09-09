import { defineCollection, z } from 'astro:content';

// Scheduled blog posts (drip publishing).
// Each markdown file in src/content/posts/ carries a `date` (YYYY-MM-DD, MYT).
// A post is only built — page, blog index card, sitemap entry — once that date
// arrives. The GitHub Actions workflow rebuilds the site every night just after
// midnight MYT, so each post goes live automatically on its day.
// To preview unpublished posts locally: PREVIEW_ALL=1 npm run build

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),           // meta description + blog-index excerpt
    category: z.string(),              // must match a category in blog/index.astro
    img: z.string(),                   // hero image path under /images/
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // go-live date (MYT)
    readTime: z.string(),              // e.g. "8 min"
    lang: z.enum(['en', 'ms', 'zh', 'ko', 'ja']).default('en'),
    keywords: z.array(z.string()).default([]),
    directAnswer: z.string(),          // 40–60 word AEO answer, rendered at #direct-answer
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { posts };

// Shared helper: "today" in Malaysia time (UTC+8), as YYYY-MM-DD.
export const todayMYT = () => new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);

// True when a post should be visible in this build.
export const isLive = (date: string) => process.env.PREVIEW_ALL === '1' || date <= todayMYT();
